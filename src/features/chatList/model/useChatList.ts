'use client';

import { usePathname } from 'next/navigation';
import { useSelector } from 'react-redux';
import { selectChatList } from '@/entities/chat/model';

export const useChatList = () => {
	const pathname = usePathname();

	const isChatPage = !pathname.includes('/chats/');

	const chats = useSelector(selectChatList);

	return { isChatPage, chats };
};
