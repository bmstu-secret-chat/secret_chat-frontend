'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { TChatModel } from '@/entities/chat/model';
import { EmitterEvents, eventEmitter } from '@/shared/lib';
import { useDeleteChat } from '@/shared/lib/ws/initiators';
import { EChatType } from '@/shared/model';

export const useDeleteSecretChatModal = (chat?: TChatModel) => {
	const router = useRouter();

	const { deleteChat } = useDeleteChat();

	const [isOpen, setIsOpen] = useState(false);

	const handleOk = useCallback(async () => {
		if (chat?.id && chat.type === EChatType.SECRET) {
			deleteChat(chat.id);
		} else {
			router.push('/chats');
		}
	}, [router, deleteChat, chat]);

	const handleCancel = useCallback(() => {
		setIsOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	useEffect(() => {
		eventEmitter.on(EmitterEvents.MODAL_OPEN_SECRET_CHAT_DELETE, openModal);

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_SECRET_CHAT_DELETE, openModal);
		};
	}, [openModal]);

	return {
		isOpen,
		handleOk,
		handleCancel,
	};
};
