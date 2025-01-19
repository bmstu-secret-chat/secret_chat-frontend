'use client';
import { IconMessagePlus, IconLockPlus, IconPlus } from '@tabler/icons-react';
import { FloatButton } from 'antd';
import { usePathname } from 'next/navigation';
import React, { memo, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const CHATS_URL = '/chats';

const CreateDialogButton: React.FC = () => {
	const pathname = usePathname();

	const buttonRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const handleGroupClick = () => {
		setOpen(false);
	};

	const handleSecretGroupClick = () => {
		setOpen(false);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				buttonRef.current &&
				!buttonRef.current.contains(event.target as Node)
			) {
				setOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	return (
		pathname === CHATS_URL && (
			<div ref={buttonRef}>
				<FloatButton.Group
					className={cn('fixed bottom-8 right-8 z-[2]')}
					open={open}
					shape={'circle'}
					trigger={'click'}
					icon={<IconPlus />}
					onClick={() => setOpen(!open)}
				>
					<FloatButton
						icon={<IconLockPlus />}
						onClick={handleSecretGroupClick}
					/>
					<FloatButton
						icon={<IconMessagePlus />}
						onClick={handleGroupClick}
					/>
				</FloatButton.Group>
			</div>
		)
	);
};

export default memo(CreateDialogButton);
