import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { EmitterEvents, eventEmitter } from '@/shared/lib';

export const useChatHeader = () => {
	const router = useRouter();

	const handleBackButtonClick = useCallback(
		() => router.push('/chats'),
		[router],
	);

	const handleSecretChatExit = useCallback(
		() => eventEmitter.emit(EmitterEvents.MODAL_OPEN_SECRET_CHAT_DELETE),
		[],
	);

	return { handleBackButtonClick, handleSecretChatExit };
};
