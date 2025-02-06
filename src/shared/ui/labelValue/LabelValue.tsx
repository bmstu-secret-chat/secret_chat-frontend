'use client';

import React from 'react';
import { useScreenWidth } from '@/shared/hooks';
import { cn } from '@/shared/lib';

type Item = {
	label?: React.ReactNode;
	value: React.ReactNode;
};

type Props = {
	item: Item;
	style?: React.CSSProperties;
};

export const LabelValue: React.FC<Props> = ({ item, style }) => {
	const { isPcDevice } = useScreenWidth();

	return (
		<div style={style}>
			<h3 className='text-xl font-bold dark:text-white text-black'>
				{item.value}
			</h3>
			<p
				className={cn(
					'text-sm text-gray-500 dark:text-neutral-500',
					!isPcDevice && 'whitespace-pre-line',
				)}
			>
				{item.label}
			</p>
		</div>
	);
};
