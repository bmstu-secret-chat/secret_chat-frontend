import Link from 'next/link';
import React, { memo } from 'react';
import { cn } from '@/shared/lib';

type Props = {
	id: number;
	link: string;
};

export const ChatLink: React.FC<Props> = memo(({ id, link }: Props) => {
	return (
		<Link href={link}>
			<span
				className={cn(
					'flex justify-start items-center h-[100px] p-8',
					'border-b border-neutral-700 overflow-hidden pc:hover:bg-black',
					'text-white',
				)}
			>
				Чат {id}
			</span>
		</Link>
	);
});

ChatLink.displayName = 'ChatLink';
