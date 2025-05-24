import Link from 'next/link';
import React, { memo } from 'react';
import { userDefaultAvatar } from '@/assets';
import { TChatModel } from '@/entities/chat/model/chat';
import { useChatItem } from '@/features/chatList/model';
import { cn } from '@/shared/lib';
import { EChatType } from '@/shared/model';

type Props = {
	chat: TChatModel;
};

export const ChatItem: React.FC<Props> = memo(({ chat }: Props) => {
	const { isActiveChat } = useChatItem(chat.id);

	return (
		<Link href={`/chats/${chat.id}`}>
			<span
				className={cn(
					'flex justify-start items-center h-[100px] p-8 gap-4',
					'border-y border-neutral-700 overflow-hidden pc:hover:bg-black',
					'text-white',
					isActiveChat && 'bg-zinc-900',
				)}
			>
				<img
					className={'rounded-md bg-gray-300 w-[50px] h-[50px] object-cover'}
					src={chat.user.avatar || userDefaultAvatar.src}
					alt={chat.user.username}
				/>
				{chat.type === EChatType.DEFAULT ? 'Чат' : 'Секретный чат'} c{' '}
				{chat.user.username}
			</span>
		</Link>
	);
});

ChatItem.displayName = 'ChatItem';
