import React, { forwardRef } from 'react';
import { Virtuoso } from 'react-virtuoso';
import { useChat } from '@/features/chat/model';
import { Message, MessageInput, ChatHeader } from '@/features/chat/ui';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';
import { ClearChatModal } from '@/widgets/modals/clearChat/ui';
import { DeleteSecretChatModal } from '@/widgets/modals/deleteSecretChat/ui';

const VirtuosoList = forwardRef<HTMLDivElement>((props, ref) => (
	<div
		{...props}
		ref={ref}
		className='px-2'
	/>
));
VirtuosoList.displayName = 'VirtuosoList';

export const ChatPage = ({ chatId }: { chatId: string }) => {
	const {
		activeChat,
		messagesContainerRef,
		messages,
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
					className={cn(
						'flex absolute flex-col items-center',
						'w-full h-[calc(100vh-64px-76px)] top-[64px]',
						'bg-neutral-800',
					)}
				>
					<Virtuoso
						ref={messagesContainerRef}
						className='w-full h-full'
						data={messages}
						itemContent={(index, msg) => (
							<Message
								key={msg.id}
								msg={msg}
							/>
						)}
						alignToBottom
						followOutput='smooth'
						firstItemIndex={0}
						initialTopMostItemIndex={messages.length - 1}
						components={{
							List: VirtuosoList,
						}}
					/>
				</div>

				<MessageInput
					value={content}
					setValue={setContent}
					onSubmit={onSubmit}
				/>

				<ClearChatModal chat={activeChat || undefined} />
				<DeleteSecretChatModal chat={activeChat || undefined} />
			</div>
		</RenderIf>
	);
};
