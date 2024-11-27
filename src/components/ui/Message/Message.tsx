import React, { useEffect, useRef, useState } from 'react';
import Popover from '@/components/lib/Popover/Popover';
import { cn } from '@/lib/utils';

type MessageProps = {
	fromMe: boolean;
	content: string;
	status: React.ReactNode;
};

const Message: React.FC<MessageProps> = ({ fromMe, content, status }) => {
	const popoverRef = useRef<HTMLDivElement | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

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
				title={'Выберите действие'}
				content={
					<div>
						<p>Content</p>
						<p>Content</p>
					</div>
				}
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
				>
					<span className={cn('text-white leading-tight break-words')}>
						{content}
					</span>
					<div className={cn('flex justify-end mt-2 gap-2')}>
						<div>10:50:45</div>
						<div>{status}</div>
					</div>
				</div>
			</Popover>
		</div>
	);
};

export default Message;
