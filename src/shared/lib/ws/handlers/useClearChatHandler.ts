'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
	deleteChatAction,
	type TWsClearChatModel,
} from '@/entities/chat/model';
import { deleteMessagesFromChatAction } from '@/entities/message/model';
import { showToast } from '@/shared/lib';
import type { WsMessageBase } from '@/shared/model';

export const useClearChatHandler = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const clearChatHandler = (wsMessage: WsMessageBase) => {
		const chatId = (wsMessage.payload as TWsClearChatModel).chatId;

		dispatch(deleteChatAction(chatId));
		dispatch(deleteMessagesFromChatAction(chatId));
		router.push('/chats');

		showToast('info', 'История сообщений очищена');
	};

	return { clearChatHandler };
};
