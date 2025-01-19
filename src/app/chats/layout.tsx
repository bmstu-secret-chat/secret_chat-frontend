'use client';

import { useRouter, usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ChatsList from '@/app/chats/_chatsList/page';
import CreateDialogButton from '@/components/ui/CreateDialogButton/CreateDialogButton';
import AuthRoute from '@/components/utils/AuthRoute';
import { cn } from '@/lib/utils';

export default function Layout({ children }: { children: React.ReactNode }) {
	const router = useRouter();
	const pathname = usePathname();
	const [isChatPage, setIsChatPage] = useState(false);

	useEffect(() => {
		setIsChatPage(!pathname.includes('/chats/'));

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
		<AuthRoute>
			<div className={cn('flex relative flex-col md:w-[30vw] h-screen')}>
				<div className={cn(isChatPage ? '' : 'md:block hidden')}>
					<ChatsList />
				</div>
				<CreateDialogButton />
				{children}
			</div>
		</AuthRoute>
	);
}
