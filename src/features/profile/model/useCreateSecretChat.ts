'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useState } from 'react';
import { ChatService } from '@/entities/chat/api';
import { showToast } from '@/shared/lib';

export const useCreateSecretChat = () => {
	const router = useRouter();

	const [isFetching, setIsFetching] = useState(false);

	const isProfileModalOpen = !!document.querySelector('.profile-modal');

	const createSecretChat = useCallback(
		async (withUserId: string) => {
			setIsFetching(true);

			try {
				const chatService = new ChatService();
				await chatService.createSecretChat(withUserId);

				if (isProfileModalOpen) {
					router.back();
				}

				// setTimeout(() => router.push(`/chats/${chat.id}`), 100);
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
		[router, isProfileModalOpen],
	);

	return {
		isFetching,
		createSecretChat,
	};
};
