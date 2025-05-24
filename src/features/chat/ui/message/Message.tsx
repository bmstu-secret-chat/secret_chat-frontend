import React, { memo } from 'react';
import { useMessage } from '@/features/chat/model';
import { MessageMenu, MessageStatus } from '@/features/chat/ui';
import { cn, formatTimeHHmm } from '@/shared/lib';
import { MessageModel } from '@/shared/model';
import { Popover } from '@/shared/ui';

type Props = {
	msg: MessageModel;
};

export const Message: React.FC<Props> = memo(({ msg: message }: Props) => {
	const { isMenuOpen, fromMe, setIsMenuOpen, handleClick, handleContextMenu } =
		useMessage(message.userId);

	return (
		<div
			className={cn('w-full flex', fromMe ? 'justify-end' : 'justify-start')}
		>
			<Popover
				content={
					<MessageMenu
						content={message.content}
						setIsMenuOpen={setIsMenuOpen}
					/>
				}
				open={isMenuOpen}
			>
				<div
					className={cn(
						'flex flex-col my-2 px-4 py-2 max-w-max',
						'rounded-tl-[18px] rounded-tr-[18px] tablet:max-w-[40vw] max-w-[70vw]',
						fromMe
							? 'bg-zinc-700 rounded-bl-[18px]'
							: 'bg-zinc-950 rounded-br-[18px]',
					)}
					onContextMenu={handleContextMenu}
					onClick={handleClick}
				>
					<span className={cn('text-white leading-tight break-words')}>
						{message.content}
					</span>
					<div className={cn('flex justify-end mt-2 gap-2 text-white')}>
						<span>{formatTimeHHmm(message.timeCreate)}</span>
						<MessageStatus status={message.status} />
					</div>
				</div>
			</Popover>
		</div>
	);
});

Message.displayName = 'Message';
