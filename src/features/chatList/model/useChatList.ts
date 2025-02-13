'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectChatList } from '@/entities/chat/model';

export const useChatList = () => {
	const router = useRouter();
	const pathname = usePathname();

	const isChatPage = !pathname.includes('/chats/');

	const chats = useSelector(selectChatList);

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

	return { isChatPage, chats };
};
