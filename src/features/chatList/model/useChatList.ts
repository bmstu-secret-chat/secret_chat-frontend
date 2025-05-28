'use client';

import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ChatService } from '@/entities/chat/api';
import { selectChatList, setChatsAction } from '@/entities/chat/model';
import { showError } from '@/shared/lib';

export const useChatList = () => {
	const pathname = usePathname();
	const dispatch = useDispatch();

	const chats = useSelector(selectChatList);

	const [isChatListPage, setIsChatPage] = useState<boolean>(
		!pathname.includes('/chats/'),
	);

	const getChatsList = useCallback(async () => {
		try {
			const chatService = new ChatService();
			const receivedChats = await chatService.getChatsList();

			dispatch(setChatsAction(receivedChats));
		} catch (error) {
			showError(error);
		}
	}, [dispatch]);

	useEffect(() => {
		setIsChatPage(!pathname.includes('/chats/'));
	}, [pathname]);

	useEffect(() => {
		getChatsList();
	}, [getChatsList]);

	return { isChatListPage, chats };
};
