import React from 'react';
import { useChatList, useSearch } from '@/features/chatList/model';
import {
	ChatItem,
	EmptyContent,
	Search,
	UserItem,
} from '@/features/chatList/ui';
import { cn } from '@/shared/lib';

export const ChatList = () => {
	const { chats } = useChatList();
	const { foundedUsers } = useSearch();

	return (
		<div
			className={cn(
				'h-screen overflow-y-auto',
				'bg-zinc-950',
				'border-r border-neutral-700',
			)}
		>
			<Search />
			{/* Сначала пользователи из поиска*/}
			{foundedUsers.length > 0 ? (
				foundedUsers.map((user) => (
					<UserItem
						key={user.id}
						user={user}
					/>
				))
			) : chats.length > 0 ? (
				// Затем список чатов
				chats.map((chat) => (
					<ChatItem
						key={chat.id}
						chat={chat}
					/>
				))
			) : (
				// А если чатов нет, то плейсхолдер
				<EmptyContent />
			)}
		</div>
	);
};
