import Link from 'next/link';
import React, { memo } from 'react';
import { TChatModel } from '@/entities/chat/model/chat';
import { cn } from '@/shared/lib';

type Props = {
	chat: TChatModel;
};

export const ChatItem: React.FC<Props> = memo(({ chat }: Props) => {
	return (
		<Link href={`/chats/${chat.id}`}>
			<span
				className={cn(
					'flex justify-start items-center h-[100px] p-8',
					'border-b border-neutral-700 overflow-hidden pc:hover:bg-black',
					'text-white',
				)}
			>
				Чат c {chat.users[0].username}
			</span>
		</Link>
	);
});

ChatItem.displayName = 'ChatItem';
