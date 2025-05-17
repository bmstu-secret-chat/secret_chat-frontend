'use client';

import { useState, useEffect } from 'react';

const MOBILE_DISPLAY_WIDTH = 768;
const TABLET_DISPLAY_WIDTH = 1024;

export const useScreenWidth = () => {
	const [size, setSize] = useState<number>(0);

	const isMobileDevice = size <= MOBILE_DISPLAY_WIDTH;
	const isTabletDevice = size <= TABLET_DISPLAY_WIDTH;
	const isPcDevice = size > TABLET_DISPLAY_WIDTH;

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			setSize(screenWidth);
		};

		document.addEventListener('resize', handleResize);
		setSize(window.innerWidth);

		return () => {
			document.removeEventListener('resize', handleResize);
		};
	}, []);

	return { size, isMobileDevice, isTabletDevice, isPcDevice };
};
