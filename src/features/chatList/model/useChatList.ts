'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const useChatList = () => {
	const router = useRouter();
	const pathname = usePathname();

	const [isChatPage, setIsChatPage] = useState(false);

	const chats = [
		{ id: 1, link: '/chatList/1' },
		// { id: 2, link: '/chatList/2' },
		// { id: 3, link: '/chatList/3' },
		// { id: 4, link: '/chatList/4' },
		// { id: 5, link: '/chatList/5' },
		// { id: 6, link: '/chatList/6' },
		// { id: 7, link: '/chatList/7' },
		// { id: 8, link: '/chatList/8' },
		// { id: 9, link: '/chatList/9' },
		// { id: 10, link: '/chatList/10' },
		// { id: 11, link: '/chatList/11' },
	];

	useEffect(() => {
		setIsChatPage(!pathname.includes('/chatList/'));

		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
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
