import { IconArrowLeft, IconTrashX } from '@tabler/icons-react';
import React from 'react';
import { useChatHeader } from '@/features/chat/model';
import { cn } from '@/shared/lib';
import { EChatType } from '@/shared/model';
import { RenderIf } from '@/shared/utils';

export const ChatHeader: React.FC = () => {
	const { handleBackButtonClick, handleSecretChatExit, activeChat } =
		useChatHeader();

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
			<span>{activeChat?.user?.username}</span>
			<RenderIf condition={activeChat?.type === EChatType.SECRET}>
				<IconTrashX
					className={'cursor-pointer'}
					onClick={handleSecretChatExit}
				/>
			</RenderIf>
		</header>
	);
};
