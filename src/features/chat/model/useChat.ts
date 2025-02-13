'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from '@/entities/message/model';
import { useScreenWidth } from '@/shared/hooks';
import { vibrate } from '@/shared/lib';
import { useSendMessage } from '@/shared/lib/ws/initiators/useSendMessage';

export const useChat = (chatId: string) => {
	const router = useRouter();
	const pathname = usePathname();

	const messages = useSelector(selectMessages);

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
		messages,
		content,
		setContent,
		onSubmit,
	};
};
