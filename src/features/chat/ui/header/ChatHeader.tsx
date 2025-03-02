import { IconArrowLeft, IconTrashX } from '@tabler/icons-react';
import React from 'react';
import { useChatHeader } from '@/features/chat/model';
import { cn } from '@/shared/lib';
import { EChatType } from '@/shared/model';

export const ChatHeader: React.FC = () => {
	const {
		handleBackButtonClick,
		handleSecretChatExit,
		handleUsernameClick,
		activeChat,
	} = useChatHeader();

	return (
		<header
			className={cn(
				'flex absolute top-0 left-0 justify-between items-center',
				'py-2 sm:px-8 px-4 w-full h-[64px] bg-neutral-800',
				'border-b border-neutral-700 text-white font-normal text-xl',
			)}
		>
			<IconArrowLeft
				className={'cursor-pointer'}
				onClick={handleBackButtonClick}
			/>

			<span
				className={'cursor-pointer'}
				onClick={handleUsernameClick}
			>
				{activeChat?.user?.username}
			</span>

			{activeChat?.type === EChatType.SECRET ? (
				<IconTrashX
					className={'cursor-pointer'}
					onClick={handleSecretChatExit}
				/>
			) : (
				<div />
			)}
		</header>
	);
};
