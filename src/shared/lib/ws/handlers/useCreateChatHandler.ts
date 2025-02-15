'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import {
	addChatAction,
	TChatModel,
	TWsCreateChatModel,
} from '@/entities/chat/model';
import { showToast, vibrate } from '@/shared/lib';
import { WsMessageBase } from '@/shared/model';

export const useCreateChatHandler = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const createChatHandler = (wsMessage: WsMessageBase) => {
		const newChat: TChatModel = {
			id: (wsMessage.payload as TWsCreateChatModel).chatId,
			type: (wsMessage.payload as TWsCreateChatModel).type,
			users: [],
		};

		vibrate(20);
		dispatch(addChatAction(newChat));

		setTimeout(() => {
			router.push(`/chats/${newChat.id}`);

			showToast('info', 'С вами начали секретный чат');
		}, 500);
	};

	return { createChatHandler };
};
