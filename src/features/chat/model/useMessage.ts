'use client';

import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/entities/user/model';
import { useScreenWidth } from '@/shared/hooks';
import { vibrate } from '@/shared/lib';

export const useMessage = (userId: string) => {
	const currentUser = useSelector(selectCurrentUser);

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

	return {
		isMenuOpen,
		fromMe,
		setIsMenuOpen,
		handleClick,
		handleContextMenu,
	};
};
