'use client';

import { useCallback, useEffect, useState } from 'react';
import { TChatModel } from '@/entities/chat/model';
import { EmitterEvents, eventEmitter, useClearChat } from '@/shared/lib';
import { EChatType } from '@/shared/model';

export const useClearChatModal = (chat?: TChatModel) => {
	const { clearChat } = useClearChat();

	const [isOpen, setIsOpen] = useState(false);

	const handleOk = useCallback(async () => {
		if (chat?.id && chat.type === EChatType.DEFAULT) {
			clearChat(chat.id);
		}
	}, [clearChat, chat]);

	const handleCancel = useCallback(() => {
		setIsOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	useEffect(() => {
		eventEmitter.on(EmitterEvents.MODAL_OPEN_CHAT_CLEAR, openModal);

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_CHAT_CLEAR, openModal);
		};
	}, [openModal]);

	return {
		isOpen,
		handleOk,
		handleCancel,
	};
};
