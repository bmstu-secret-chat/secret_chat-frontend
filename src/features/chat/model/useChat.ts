'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { VirtuosoHandle } from 'react-virtuoso';
import { ChatService } from '@/entities/chat/api';
import {
	deleteActiveChatAction,
	deleteTheirPublicKeyAction,
	selectActiveChat,
	selectChatList,
	selectTheirPublicKey,
	setActiveChatAction,
	setTheirPublicKeyAction,
} from '@/entities/chat/model';
import {
	selectMessagesByChat,
	setMessagesAction,
} from '@/entities/message/model';
import { UsersService } from '@/entities/user/api';
import { selectCurrentUser } from '@/entities/user/model';
import { useScreenWidth } from '@/shared/hooks';
import { SafeChatDB, showError, useSendMessage, vibrate } from '@/shared/lib';
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
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	const theirPublicKey = useSelector(selectTheirPublicKey);

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

				// eslint-disable-next-line @typescript-eslint/no-unused-vars
				const privateKey = await db.getValue(user.id);

				const receivedMessages = await chatService.getMessagesFromChat(
					dialogId,
					0,
					TOTAL_MESSAGES,
				);

				dispatch(setMessagesAction({ dialogId, messages: receivedMessages }));
			} catch (error) {
				showError(error);
			}
		},
		[dispatch, user],
	);

	const getTheirPublicKey = useCallback(async () => {
		if (!companionId) {
			showError('Собеседник не найдет');
			return;
		}

		const usersService = new UsersService();

		try {
			const theirPubKey = await usersService.getPublicKey(companionId);

			dispatch(setTheirPublicKeyAction(theirPubKey));
		} catch (error) {
			dispatch(deleteTheirPublicKeyAction());
			showError(error);
		}
	}, [dispatch, companionId]);

	const onSubmit = () => {
		if (!activeChat) {
			return;
		}

		sendMessage(chatId, content, activeChat.type);
		if (isTabletDevice) vibrate(10);
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
		getTheirPublicKey();

		return () => {
			dispatch(deleteTheirPublicKeyAction());
		};
	}, [dispatch, getTheirPublicKey]);

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
