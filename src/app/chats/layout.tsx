'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ChatsList from '@/app/chats/_chatsList/page';
import ProtectedRoute from '@/components/utils/ProtectedRoute';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [showChatsList, setShowChatsList] = useState(false);

	useEffect(() => {
		const isChatPage = pathname.includes('/chats/');
		setShowChatsList(!isChatPage);

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

	return (
		<ProtectedRoute>
			<div className={cn('flex relative flex-col md:w-[30vw] h-screen')}>
				<div className={cn(showChatsList ? '' : 'md:block hidden')}>
					<ChatsList />
				</div>
				{children}
			</div>
		</ProtectedRoute>
	);
}
