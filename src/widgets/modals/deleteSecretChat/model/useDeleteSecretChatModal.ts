'use client';

import { useCallback, useEffect, useState } from 'react';
import { EmitterEvents, eventEmitter } from '@/shared/lib';
import { useDeleteChat } from '@/shared/lib/ws/initiators';

export const useDeleteSecretChatModal = (chatId: string | null) => {
	const { deleteChat } = useDeleteChat();

	const [isOpen, setIsOpen] = useState(false);

	const handleOk = useCallback(async () => {
		if (!chatId) return;

		deleteChat(chatId);
	}, [deleteChat, chatId]);

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
