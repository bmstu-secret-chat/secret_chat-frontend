'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addChatAction, TChatModel } from '@/entities/chat/model';
import { TWsCreateChatModel } from '@/entities/chat/model/wsCreateChat';
import { WsMessageBase } from '@/entities/message/model';
import { vibrate } from '@/shared/lib';

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

		setTimeout(() => router.push(`/chats/${newChat.id}`), 500);
	};

	return { createChatHandler };
};
