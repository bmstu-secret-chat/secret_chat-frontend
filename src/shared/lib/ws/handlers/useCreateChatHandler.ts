'use client';

import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { addChatAction, Chat, TWsCreateChatModel } from '@/entities/chat/model';
import { UsersService } from '@/entities/user/api';
import { showToast, vibrate } from '@/shared/lib';
import { WsMessageBase } from '@/shared/model';

export const useCreateChatHandler = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const createChatHandler = async (wsMessage: WsMessageBase) => {
		const usersService = new UsersService();
		const companion = await usersService.getUserInfo(
			(wsMessage.payload as TWsCreateChatModel).withUserId,
		);

		const newChat = new Chat(
			(wsMessage.payload as TWsCreateChatModel).chatId,
			(wsMessage.payload as TWsCreateChatModel).type,
			[companion.toShortInfo()],
		);

		vibrate(20);
		dispatch(addChatAction(newChat));

		setTimeout(() => {
			router.push(`/chats/${newChat.id}`);

			showToast(
				'info',
				`Создан секретный час с пользователем ${companion.username}`,
			);
		}, 500);
	};

	return { createChatHandler };
};
