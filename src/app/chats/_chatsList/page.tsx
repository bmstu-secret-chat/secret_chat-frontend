'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

const ChatsList = () => {
	const chats = [
		{ id: 1, link: '/chats/1' },
		{ id: 2, link: '/chats/2' },
		{ id: 3, link: '/chats/3' },
		{ id: 4, link: '/chats/4' },
		{ id: 5, link: '/chats/5' },
		{ id: 6, link: '/chats/6' },
		{ id: 7, link: '/chats/7' },
		{ id: 8, link: '/chats/8' },
		{ id: 9, link: '/chats/9' },
		{ id: 10, link: '/chats/10' },
		{ id: 11, link: '/chats/11' },
	];

	return (
		<div
			className={cn('h-screen overflow-y-auto', 'border-r border-neutral-700')}
		>
			{chats.map((chat) => (
				<Link
					key={chat.id}
					href={chat.link}
				>
					<div
						className={cn(
							'flex justify-start items-center h-[100px] p-8',
							'border-b border-neutral-700 overflow-hidden pc:hover:bg-black',
						)}
					>
						Чат {chat.id}
					</div>
				</Link>
			))}
		</div>
	);
};

export default ChatsList;
