'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useChatList = () => {
	const router = useRouter();
	const pathname = usePathname();

	const isChatPage = !pathname.includes('/chats/');

	const chats = [
		{ id: 1, link: '/chats/1' },
		// { id: 2, link: '/chats/2' },
		// { id: 3, link: '/chats/3' },
		// { id: 4, link: '/chats/4' },
		// { id: 5, link: '/chats/5' },
		// { id: 6, link: '/chats/6' },
		// { id: 7, link: '/chats/7' },
		// { id: 8, link: '/chats/8' },
		// { id: 9, link: '/chats/9' },
		// { id: 10, link: '/chats/10' },
		// { id: 11, link: '/chats/11' },
	];

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
