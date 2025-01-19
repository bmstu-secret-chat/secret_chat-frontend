import React from 'react';
import { Lamp } from '@/components/ui/Lamp/Lamp';
import { cn } from '@/lib/utils';

const ChatPage = () => {
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

export default ChatPage;
