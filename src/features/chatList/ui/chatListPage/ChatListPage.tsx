import React from 'react';
import { Lamp } from '@/features/chatList/ui';
import { cn } from '@/shared/lib';

export const ChatListPage = () => {
	return (
		<div
			className={cn(
				'flex absolute flex-col justify-center items-center',
				'ml-[30vw] w-[calc(70vw-60px)] h-full',
				'md:flex hidden',
				'overflow-hidden ',
			)}
		>
			<Lamp />
		</div>
	);
};
