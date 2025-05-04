import React from 'react';
import { cn } from '@/shared/lib';

type Props = {
	className?: string;
};

export const Divider: React.FC<Props> = ({ className }) => {
	return (
		<div
			className={cn(
				'bg-gradient-to-r from-transparent via-neutral-700',
				'to-transparent my-8 h-[1px] w-full',
				className && className,
			)}
		/>
	);
};
