'use client';

import React from 'react';
import { useChatList } from '@/features/chatList/model';
import { ChatList, CreateDialogButton } from '@/features/chatList/ui';
import { cn } from '@/shared/lib';
import { AuthRoute } from '@/shared/utils';

export function ChatListLayout({ children }: { children: React.ReactNode }) {
	const { isChatPage } = useChatList();

	return (
		<AuthRoute>
			<div className={cn('flex relative flex-col md:w-[30vw] h-screen')}>
				<div className={cn(isChatPage ? '' : 'md:block hidden')}>
					<ChatList />
				</div>
				<CreateDialogButton />
				{children}
			</div>
		</AuthRoute>
	);
}
