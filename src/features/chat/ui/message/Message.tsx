import React, { memo } from 'react';
import { useMessage } from '@/features/chat/model';
import { MessageMenu, MessageStatus } from '@/features/chat/ui';
import { cn } from '@/shared/lib';
import { formatTime } from '@/shared/lib/formatTime';
import { Popover } from '@/shared/ui';
import { WsMessageModel } from '@/types/WsMessages';

type Props = {
	msg: WsMessageModel;
};

export const Message: React.FC<Props> = memo(
	({ msg: { userId, status, content, time } }: Props) => {
		const { popoverRef, isMenuOpen, fromMe, handleClick, handleContextMenu } =
			useMessage(userId);

		return (
			<div
				className={cn('w-full flex', fromMe ? 'justify-end' : 'justify-start')}
			>
				<Popover
					content={<MessageMenu />}
					open={isMenuOpen}
				>
					<div
						ref={popoverRef}
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
							{content}
						</span>
						<div className={cn('flex justify-end mt-2 gap-2 text-white')}>
							<span>{formatTime(time)}</span>
							<MessageStatus status={status} />
						</div>
					</div>
				</Popover>
			</div>
		);
	},
);

Message.displayName = 'Message';
