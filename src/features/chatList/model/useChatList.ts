'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export const useChatList = () => {
	const router = useRouter();
	const pathname = usePathname();

	const isChatPage = !pathname.includes('/chats/');

	const chats = [{ id: 1, link: '/chats/1' }];

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
