import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectActiveChat } from '@/entities/chat/model';
import { EmitterEvents, eventEmitter } from '@/shared/lib';

export const useChatHeader = () => {
	const router = useRouter();

	const activeChat = useSelector(selectActiveChat);

	const handleBackButtonClick = useCallback(
		() => router.push('/chats'),
		[router],
	);

	const handleSecretChatExit = useCallback(
		() => eventEmitter.emit(EmitterEvents.MODAL_OPEN_SECRET_CHAT_DELETE),
		[],
	);

	const handleClearChat = useCallback(
		() => eventEmitter.emit(EmitterEvents.MODAL_OPEN_CHAT_CLEAR),
		[],
	);

	const handleUsernameClick = useCallback(() => {
		if (!activeChat?.user) return;

		router.push(`/profile/${activeChat.user.id}`);
	}, [router, activeChat]);

	return {
		handleBackButtonClick,
		handleSecretChatExit,
		handleUsernameClick,
		handleClearChat,
		activeChat,
	};
};
