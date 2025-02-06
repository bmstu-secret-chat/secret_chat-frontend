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
				const chat = await chatService.createChat(withUserId);

				if (isProfileModalOpen) {
					router.back();
				}

				setTimeout(() => router.push(`/chats/${chat.id}`), 100);
			} catch (error: any) {
				showToast('error', error.message);
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
