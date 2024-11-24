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
					'my-2 px-4 py-2 max-w-max leading-tight',
					'text-white rounded-tl-full rounded-tr-full',
					fromMe
						? 'bg-zinc-700 rounded-bl-full'
						: 'bg-zinc-950 rounded-br-full',
				)}
			>
				{content}
			</span>
		</div>
	);
};

export default Message;
