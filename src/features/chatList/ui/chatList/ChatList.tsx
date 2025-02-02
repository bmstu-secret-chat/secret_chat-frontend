import Link from 'next/link';
import { useChatList } from '@/features/chatList/model';
import { cn } from '@/shared/lib';

export const ChatList = () => {
	const { chats } = useChatList();

	return (
		<div
			className={cn(
				'h-screen overflow-y-auto',
				'bg-zinc-950',
				'border-r border-neutral-700',
			)}
		>
			{chats.map((chat) => (
				<Link
					key={chat.id}
					href={chat.link}
				>
					<span
						className={cn(
							'flex justify-start items-center h-[100px] p-8',
							'border-b border-neutral-700 overflow-hidden pc:hover:bg-black',
							'text-white',
						)}
					>
						Чат {chat.id}
					</span>
				</Link>
			))}
		</div>
	);
};
