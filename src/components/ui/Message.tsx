import React from 'react';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { cn } from '@/lib/utils';

type MessageProps = {
	fromMe: boolean;
	content: string;
};

const Message: React.FC<MessageProps> = ({ fromMe, content }) => {
	return (
		<div
			className={cn('w-full flex', fromMe ? 'justify-end' : 'justify-start')}
		>
			<span
				className={cn(
					'my-2 px-4 py-2 max-w-max leading-tight break-all',
					'text-white rounded-tl-[18px] rounded-tr-[18px] tablet:max-w-[40vw] max-w-[70vw]',
					fromMe
						? 'bg-zinc-700 rounded-bl-[18px]'
						: 'bg-zinc-950 rounded-br-[18px]',
				)}
			>
				{content}
			</span>
		</div>
	);
};

export default Message;
