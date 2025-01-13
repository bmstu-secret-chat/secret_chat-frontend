'use client';

import { CommentOutlined, LockOutlined, PlusOutlined } from '@ant-design/icons';
import { FloatButton } from 'antd';
import React, { memo, useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const CreateDialogButton: React.FC = () => {
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
		<div ref={buttonRef}>
			<FloatButton.Group
				className={cn('fixed bottom-8 right-8 z-[2]')}
				open={open}
				shape={'circle'}
				trigger={'click'}
				icon={<PlusOutlined />}
				onClick={() => setOpen(!open)}
			>
				<FloatButton
					icon={<LockOutlined />}
					onClick={handleSecretGroupClick}
				/>
				<FloatButton
					icon={<CommentOutlined />}
					onClick={handleGroupClick}
				/>
			</FloatButton.Group>
		</div>
	);
};

export default memo(CreateDialogButton);
