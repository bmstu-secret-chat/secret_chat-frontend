'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

const CHATS_URL = '/chats';

export const useCreateDialog = () => {
	const pathname = usePathname();

	const buttonRef = useRef<HTMLDivElement>(null);
	const [open, setOpen] = useState<boolean>(false);

	const canRender = pathname === CHATS_URL;

	const toggleFloatButtonClick = () => setOpen(!open);

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

	return {
		canRender,
		buttonRef,
		open,
		toggleFloatButtonClick,
		handleGroupClick,
		handleSecretGroupClick,
	};
};
