import React, { useEffect, useRef, useState } from 'react';
import Popover from '@/components/lib/Popover/Popover';
import MessageMenu from '@/components/ui/Message/MessageMenu';
import MessageStatus from '@/components/ui/Message/MessageStatus';
import { useUser } from '@/contexts/UserContext';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { cn } from '@/lib/utils';
import { WsMessageModel } from '@/types/WsMessages';
import { formatTime } from '@/utils/formatTime';

type Props = {
	msg: WsMessageModel;
};

const Message: React.FC<Props> = ({
	msg: { userId, status, content, time },
}) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { isMobileDevice } = useScreenWidth();
	const { userId: currentUserId } = useUser();
	const fromMe = currentUserId === userId;

	const handleClick = () => {
		if (isMobileDevice) setIsMenuOpen(true);
	};

	const handleContextMenu = (event: React.MouseEvent<HTMLDivElement>) => {
		event.preventDefault();
		setIsMenuOpen(true);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				popoverRef.current &&
				!popoverRef.current.contains(event.target as Node)
			) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

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
};

export default Message;
