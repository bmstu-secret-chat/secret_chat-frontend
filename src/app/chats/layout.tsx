import React from 'react';
import { ChatListLayout } from '@/features/chatList/ui';

export default function Layout({ children }: { children: React.ReactNode }) {
	return <ChatListLayout>{children}</ChatListLayout>;
}
