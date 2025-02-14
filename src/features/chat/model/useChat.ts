'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	selectActiveChat,
	setActiveChatAction,
} from '@/entities/chat/model/chatSlice';
import { selectMessages } from '@/entities/message/model';
import { useScreenWidth } from '@/shared/hooks';
import { EmitterEvents, eventEmitter, vibrate } from '@/shared/lib';
import { useSendMessage } from '@/shared/lib/ws/initiators';

export const useChat = (chatId: string) => {
	const router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();

	const messages = useSelector(selectMessages);
	const activeChat = useSelector(selectActiveChat);

	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const [content, setContent] = useState('');

	const { isTabletDevice } = useScreenWidth();

	const { sendMessage } = useSendMessage();

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
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape' && pathname.includes('/chats/')) {
				eventEmitter.emit(EmitterEvents.MODAL_OPEN_SECRET_CHAT_DELETE);
			}
		};

		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('keydown', handleEscape);
		};
	}, [pathname, router]);

	useEffect(() => {
		dispatch(setActiveChatAction(chatId));

		return () => {
			dispatch(setActiveChatAction(null));
		};
	}, [dispatch, chatId]);

	const onSubmit = () => {
		sendMessage(chatId, content);
		if (isTabletDevice) vibrate(10);
	};

	return {
		messagesContainerRef,
		messages,
		content,
		activeChat,
		setContent,
		onSubmit,
	};
};
