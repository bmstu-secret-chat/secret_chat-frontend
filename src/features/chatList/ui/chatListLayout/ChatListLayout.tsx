'use client';

import React from 'react';
import { ChatListProvider, useChatList } from '@/features/chatList/model';
import { ChatList } from '@/features/chatList/ui';
import { cn } from '@/shared/lib';
import { AuthRoute } from '@/shared/utils';

export function ChatListLayout({ children }: { children: React.ReactNode }) {
	const { isChatListPage } = useChatList();

	return (
		<AuthRoute>
			<ChatListProvider>
				<div className={cn('flex relative flex-col md:w-[30vw] h-screen')}>
					<div className={cn(isChatListPage ? '' : 'md:block hidden')}>
						<ChatList />
					</div>
					{/* <CreateDialogButton /> */}
					{children}
				</div>
			</ChatListProvider>
		</AuthRoute>
	);
}
