'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectActiveChat,
	deleteActiveChatAction,
	setActiveChatAction,
} from '@/entities/chat/model';
import { selectMessages, TWsSendMessageModel } from '@/entities/message/model';
import { useScreenWidth } from '@/shared/hooks';
import { useSendMessage, vibrate } from '@/shared/lib';

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

		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('keydown', handleEscape);
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
