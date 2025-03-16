'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatService } from '@/entities/chat/api';
import {
	deleteActiveChatAction,
	selectActiveChat,
	setActiveChatAction,
} from '@/entities/chat/model';
import {
	selectMessagesByChat,
	setMessagesAction,
} from '@/entities/message/model';
import { useScreenWidth } from '@/shared/hooks';
import { showToast, useSendMessage, vibrate } from '@/shared/lib';
import { EChatType } from '@/shared/model';

export const useChat = (chatId: string) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();

	const messages = useSelector(selectMessagesByChat(chatId));
	const activeChat = useSelector(selectActiveChat);

	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const [content, setContent] = useState('');
	const [canRender, setCanRender] = useState(false);

	const { isTabletDevice } = useScreenWidth();

	const { sendMessage } = useSendMessage();

	const getMessages = useCallback(
		async (dialogId: string) => {
			try {
				const chatService = new ChatService();

				const receivedMessages = await chatService.getMessagesFromChat(
					dialogId,
					0,
					50,
				);

				dispatch(setMessagesAction({ dialogId, messages: receivedMessages }));
			} catch (error: unknown) {
				if (error instanceof Error) {
					showToast('error', error.message);
				} else {
					showToast('error', 'Ошибка при выполнеии действия');
				}
			}
		},
		[dispatch],
	);

	useEffect(() => {
		if (activeChat && activeChat.type === EChatType.DEFAULT) {
			getMessages(activeChat.id);
		}
	}, [getMessages, activeChat]);

	useEffect(() => {
		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current.scrollHeight,
		});
	}, []);

	useEffect(() => {
		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current.scrollHeight,
			behavior: 'smooth',
		});
	}, [messages]);

	useEffect(() => {
		dispatch(setActiveChatAction(chatId));

		return () => {
			dispatch(deleteActiveChatAction());
		};
	}, [dispatch, chatId]);

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

	const onSubmit = () => {
		if (!activeChat) {
			return;
		}

		sendMessage(chatId, content, activeChat.type);
		if (isTabletDevice) vibrate(10);
	};

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
