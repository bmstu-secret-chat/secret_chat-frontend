import { useState, useEffect } from 'react';

const MOBILE_DISPLAY_WIDTH = 768;

export const useScreenWidth = () => {
	const [size, setSize] = useState<number>(window.innerWidth);

	const isMobileDevice = size <= MOBILE_DISPLAY_WIDTH;

	useEffect(() => {
		const handleResize = () => {
			const screenWidth = window.innerWidth;
			setSize(screenWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return { size, isMobileDevice };
};
