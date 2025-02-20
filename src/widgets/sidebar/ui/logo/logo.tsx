'use client';

import { LoadingOutlined } from '@ant-design/icons';
import React, { useEffect, useState } from 'react';
import { TLink } from '@/widgets/sidebar/model';
import { LogoImage } from '@/widgets/sidebar/ui';

const LogoLabel = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);
	const [dots, setDots] = useState('.'); // Состояние для точек

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		let interval: NodeJS.Timeout;
		if (!isOnline) {
			interval = setInterval(() => {
				setDots((prev) => {
					if (prev === '.') return '..';
					if (prev === '..') return '...';
					return '.';
				});
			}, 500);
		}

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
			if (interval) clearInterval(interval);
		};
	}, [isOnline]);

	return isOnline ? (
		'Safechat'
	) : (
		<span className='flex items-center'>
			Соединение
			<span className='inline-block w-4 text-left'>{dots}</span>
		</span>
	);
};

const LogoIcon = () => {
	const [isOnline, setIsOnline] = useState(navigator.onLine);

	useEffect(() => {
		const handleOnline = () => setIsOnline(true);
		const handleOffline = () => setIsOnline(false);

		window.addEventListener('online', handleOnline);
		window.addEventListener('offline', handleOffline);

		return () => {
			window.removeEventListener('online', handleOnline);
			window.removeEventListener('offline', handleOffline);
		};
	}, []);

	return isOnline ? <LogoImage /> : <LoadingOutlined />;
};

export const logo: TLink = {
	label: <LogoLabel />,
	href: '/',
	icon: <LogoIcon />,
};
