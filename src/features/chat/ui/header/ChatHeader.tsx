import { IconArrowLeft, IconTrashX } from '@tabler/icons-react';
import React from 'react';
import { useChatHeader } from '@/features/chat/model';
import { cn } from '@/shared/lib';

type Props = {
	chatId?: string;
};

export const ChatHeader: React.FC<Props> = ({ chatId }) => {
	const { handleBackButtonClick, handleSecretChatExit } = useChatHeader();

	return (
		<header
			className={cn(
				'flex absolute top-0 left-0 justify-between items-center',
				'py-2 sm:px-4 px-2 w-full h-[64px] bg-neutral-800',
				'border-b border-neutral-700 text-white font-normal text-xl',
			)}
		>
			<IconArrowLeft
				className={'cursor-pointer'}
				onClick={handleBackButtonClick}
			/>
			<span>Чат {chatId}</span>
			<IconTrashX
				className={'cursor-pointer'}
				onClick={handleSecretChatExit}
			/>
		</header>
	);
};
