import React from 'react';
import { cn } from '@/shared/lib';

type Props = {
	className?: string;
	onClick?: () => void;
	children: React.ReactNode;
};

export const ButtonShimmer: React.FC<Props> = ({
	className,
	onClick,
	children,
}) => {
	return (
		<button
			className={cn(
				'inline-flex animate-shimmer items-center justify-center',
				'rounded-[8px] border border-slate-800 transition-colors',
				'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]',
				'bg-[length:200%_100%] font-medium text-slate-400',
				'hover:text-white hover:border-white hover:bg-[position:-100%_0]',
				'w-max flex-grow h-10 mt-2 px-4',
				className,
			)}
			onClick={onClick}
		>
			{children}
		</button>
	);
};
