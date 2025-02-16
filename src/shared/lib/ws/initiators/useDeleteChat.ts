'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteChatAction } from '@/entities/chat/model';
import { deleteMessagesFromChatAction } from '@/entities/message/model';
import {
	EWsMessageType,
	WsMessageBase,
	useWebSocketContext,
} from '@/shared/model';

export const useDeleteChat = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { sendWsMessage } = useWebSocketContext();

	const deleteChat = (chatId: string) => {
		const message = new WsMessageBase(uuidv4(), EWsMessageType.DELETE_CHAT, {
			chatId,
		});

		sendWsMessage(JSON.stringify(message.toApi()));

		// TODO: remove
		dispatch(deleteChatAction(chatId));
		dispatch(deleteMessagesFromChatAction(chatId));

		router.push('/chats');
	};

	return { deleteChat };
};
