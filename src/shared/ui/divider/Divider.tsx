import React from 'react';
import { cn } from '@/shared/lib';

export const Divider = () => {
	return (
		<div
			className={cn(
				'bg-gradient-to-r from-transparent via-neutral-700',
				'to-transparent my-8 h-[1px] w-full',
			)}
		/>
	);
};
