'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VirtuosoHandle } from 'react-virtuoso';
import { ChatService } from '@/entities/chat/api';
import {
	deleteActiveChatAction,
	selectActiveChat,
	selectChatList,
	setActiveChatAction,
} from '@/entities/chat/model';
import {
	selectMessagesByChat,
	setMessagesAction,
} from '@/entities/message/model';
import { UsersService } from '@/entities/user/api';
import { selectCurrentUser, selectMyPublicKey } from '@/entities/user/model';
import { useScreenWidth } from '@/shared/hooks';
import {
	SafeChatDB,
	showError,
	useSendMessage,
	vibrate,
	decryptMessage,
	encryptMessage,
} from '@/shared/lib';
import { EChatType } from '@/shared/model';

const TOTAL_MESSAGES = 1_000_000;

export const useChat = (chatId: string) => {
	const router = useRouter();
	const pathname = usePathname();

	const dispatch = useDispatch();

	const user = useSelector(selectCurrentUser);
	const chats = useSelector(selectChatList);
	const messages = useSelector(selectMessagesByChat(chatId));
	const activeChat = useSelector(selectActiveChat);
	const myPublicKey = useSelector(selectMyPublicKey);
	const companionId = activeChat?.user.id;

	const messagesContainerRef = useRef<VirtuosoHandle>(null);

	const [content, setContent] = useState('');
	const [canRender, setCanRender] = useState(false);

	const { isTabletDevice } = useScreenWidth();

	const { sendMessage } = useSendMessage();

	const getMessages = useCallback(
		async (dialogId: string) => {
			if (!user) {
				showError('Пользователь не найден');
				return;
			}

			try {
				const db = new SafeChatDB();
				const chatService = new ChatService();

				const myPrivateKey = await db.getValue(user.id);
				if (!myPrivateKey) {
					showError('Ключ шифрования не найден');
					return;
				}

				const receivedMessages = await chatService.getMessagesFromChat(
					dialogId,
					0,
					TOTAL_MESSAGES,
				);

				const decryptedMessages = await Promise.all(
					receivedMessages.map(async (message) => {
						if (!message.content) return message;

						try {
							const decryptedContent = await decryptMessage(
								message.content,
								myPrivateKey,
							);
							return { ...message, content: decryptedContent };
						} catch {
							return { ...message, content: 'Ошибка расшифровки сообщения' };
						}
					}),
				);

				dispatch(setMessagesAction({ dialogId, messages: decryptedMessages }));
			} catch (error) {
				showError(error);
			}
		},
		[dispatch, user],
	);

	const onSubmit = async () => {
		if (!activeChat || !content.trim() || !user || !companionId) {
			return;
		}

		try {
			const usersService = new UsersService();
			const theirPublicKey = await usersService.getPublicKey(companionId);

			if (!myPublicKey || !theirPublicKey) {
				showError('Ключи шифрования не найдены');
				return;
			}

			const encryptedContent = await encryptMessage(
				content,
				myPublicKey,
				theirPublicKey,
			);

			sendMessage(chatId, content, encryptedContent, activeChat.type);

			if (isTabletDevice) vibrate(10);
			setContent('');
		} catch (error) {
			showError('Ошибка отправки сообщения: ' + error);
		}
	};

	useEffect(() => {
		if (!activeChat || activeChat.type !== EChatType.DEFAULT) {
			return;
		}

		getMessages(activeChat.id);
	}, [getMessages, activeChat]);

	useEffect(() => {
		dispatch(setActiveChatAction(chatId));

		return () => {
			dispatch(deleteActiveChatAction());
		};
	}, [dispatch, chats, chatId]);

	useEffect(() => {
		setCanRender(!!activeChat?.id);
	}, [activeChat]);

	// Escape
	useEffect(() => {
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && pathname.includes('/chats/')) {
				router.push('/chats');
			}
		};

		document.addEventListener('keydown', handleEscape);

		return () => {
			document.removeEventListener('keydown', handleEscape);
		};
	}, [pathname, router]);

	return {
		messagesContainerRef,
		messages,
		content,
		activeChat,
		canRender,
		setContent,
		onSubmit,
	};
};
