'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteChatAction, TWsDeleteChatModel } from '@/entities/chat/model';
import { deleteMessagesFromChatAction } from '@/entities/message/model';
import { showToast } from '@/shared/lib';
import { WsMessageBase } from '@/shared/model';

export const useDeleteChatHandler = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const deleteChatHandler = (wsMessage: WsMessageBase) => {
		const chatId = (wsMessage.payload as TWsDeleteChatModel).chatId;

		dispatch(deleteChatAction(chatId));
		dispatch(deleteMessagesFromChatAction(chatId));
		router.push('/chats');

		showToast('info', 'Секретный чат удален');
	};

	return { deleteChatHandler };
};
