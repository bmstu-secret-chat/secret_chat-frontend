'use client';

import { useDispatch } from 'react-redux';
import { TWsClearChatModel } from '@/entities/chat/model';
import { deleteMessagesFromChatAction } from '@/entities/message/model';
import { showToast } from '@/shared/lib';
import { WsMessageBase } from '@/shared/model';

export const useClearChatHandler = () => {
	const dispatch = useDispatch();

	const clearChatHandler = (wsMessage: WsMessageBase) => {
		const chatId = (wsMessage.payload as TWsClearChatModel).chatId;

		dispatch(deleteMessagesFromChatAction(chatId));

		showToast('info', 'История сообщений очищена');
	};

	return { clearChatHandler };
};
