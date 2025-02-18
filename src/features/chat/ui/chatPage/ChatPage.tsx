import React from 'react';
import { useChat } from '@/features/chat/model';
import { Message, MessageInput, ChatHeader } from '@/features/chat/ui';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { DeleteSecretChatModal } from '@/widgets/modals/deleteSecretChat';

export const ChatPage = ({ chatId }: { chatId: string }) => {
	const {
		activeChat,
		messagesContainerRef,
		messagesFromActiveChat: messages,
		content,
		canRender,
		setContent,
		onSubmit,
	} = useChat(chatId);

	return (
		<RenderIf condition={canRender}>
			<div
				className={cn(
					'flex absolute top-0 flex-col items-center p-2',
					'md:ml-[30vw] md:w-[calc(70vw-60px)] w-[calc(100vw-60px)]',
					'h-full overflow-y-auto bg-neutral-800',
				)}
			>
				<ChatHeader />
				<div
					ref={messagesContainerRef}
					className={cn(
						'flex absolute flex-col items-center p-2 top-[64px]',
						'w-full h-[calc(100vh-64px-76px)] overflow-y-auto bg-neutral-800',
					)}
				>
					{/*{isLoading && (*/}
					{/*	<Skeleton*/}
					{/*		active*/}
					{/*		paragraph={{ rows: 5 }}*/}
					{/*	/>*/}
					{/*)}*/}
					{messages.map((msg) => (
						<Message
							key={msg.id}
							msg={msg}
						/>
					))}
				</div>
				<MessageInput
					value={content}
					setValue={setContent}
					onSubmit={onSubmit}
				/>

				<DeleteSecretChatModal chatId={activeChat?.id} />
			</div>
		</RenderIf>
	);
};
