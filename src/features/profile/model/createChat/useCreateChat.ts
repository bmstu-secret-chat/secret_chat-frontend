'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { ChatService } from '@/entities/chat/api';
import { addChatAction } from '@/entities/chat/model';
import { showToast } from '@/shared/lib';

export const useCreateChat = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isFetching, setIsFetching] = useState(false);

	const isProfileModalOpen = !!document.querySelector('.profile-modal');

	const createChat = useCallback(
		async (withUserId: string) => {
			setIsFetching(true);

			try {
				const chatService = new ChatService();
				const newChat = await chatService.createChat(withUserId);

				if (isProfileModalOpen) {
					router.back();
				}

				dispatch(addChatAction(newChat));

				setTimeout(() => {
					router.push(`/chats/${newChat.id}`);
				}, 500);
			} catch (error: unknown) {
				if (error instanceof Error) {
					showToast('error', error.message);
				} else {
					showToast('error', 'Ошибка при выполнеии действия');
				}
			} finally {
				setIsFetching(false);
			}
		},
		[dispatch, router, isProfileModalOpen],
	);

	return {
		isFetching,
		createChat,
	};
};
