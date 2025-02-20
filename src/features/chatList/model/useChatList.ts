'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectChatList } from '@/entities/chat/model';

export const useChatList = () => {
	const pathname = usePathname();

	const chats = useSelector(selectChatList);

	const [isChatListPage, setIsChatPage] = useState<boolean>(
		!pathname.includes('/chats/'),
	);

	useEffect(() => {
		setIsChatPage(!pathname.includes('/chats/'));
	}, [pathname]);

	return { isChatListPage, chats };
};
