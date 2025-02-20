'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/entities/user/model';
import { useScreenWidth } from '@/shared/hooks';
import { vibrate } from '@/shared/lib';

export const useMessage = (userId: string) => {
	const currentUser = useSelector(selectCurrentUser);

	const popoverRef = useRef<HTMLDivElement | null>(null);

	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { isTabletDevice } = useScreenWidth();

	const fromMe = currentUser?.id === userId;

	const handleClick = () => {
		if (isTabletDevice) {
			setIsMenuOpen(true);
			vibrate(20);
		}
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

	return {
		popoverRef,
		isMenuOpen,
		fromMe,
		handleClick,
		handleContextMenu,
	};
};
