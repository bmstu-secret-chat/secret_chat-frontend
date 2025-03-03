'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectActiveChat,
	deleteActiveChatAction,
	setActiveChatAction,
} from '@/entities/chat/model';
import { MessageService } from '@/entities/message/api';
import {
	deleteMessagesAction,
	selectMessages,
	setMessagesAction,
	TWsSendMessageModel,
} from '@/entities/message/model';
import { useScreenWidth } from '@/shared/hooks';
import { showToast, useSendMessage, vibrate } from '@/shared/lib';

export const useChat = (chatId: string) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();

	const messages = useSelector(selectMessages);
	const activeChat = useSelector(selectActiveChat);

	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const [content, setContent] = useState('');
	const [canRender, setCanRender] = useState(false);

	const { isTabletDevice } = useScreenWidth();

	const { sendMessage } = useSendMessage();

	const messagesFromActiveChat = useMemo(
		() =>
			messages.filter(
				(message) =>
					(message.payload as TWsSendMessageModel).chatId === activeChat?.id,
			),
		[messages, activeChat],
	);

	const getMessages = useCallback(async () => {
		try {
			const messageService = new MessageService();

			const receivedMessages = await messageService.getMessagesFromChat(
				chatId,
				0,
				50,
			);

			dispatch(setMessagesAction(receivedMessages));
		} catch (error: unknown) {
			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		}
	}, [dispatch, chatId]);

	useEffect(() => {
		getMessages();

		return () => {
			dispatch(deleteMessagesAction());
		};
	}, [dispatch, getMessages]);

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
	}, [messages.length]);

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
		sendMessage(chatId, content);
		if (isTabletDevice) vibrate(10);
	};

	return {
		messagesContainerRef,
		messagesFromActiveChat,
		content,
		activeChat,
		canRender,
		setContent,
		onSubmit,
	};
};
