'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { deleteChatAction, TWsDeleteChatModel } from '@/entities/chat/model';
import { WsMessageBase } from '@/shared/model';

export const useDeleteChatHandler = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const deleteChatHandler = (wsMessage: WsMessageBase) => {
		dispatch(
			deleteChatAction((wsMessage.payload as TWsDeleteChatModel).chatId),
		);

		router.push('/chats');
	};

	return { deleteChatHandler };
};
