'use client';

import { Globe } from '@/features/chatList/ui';
import { cn } from '@/shared/lib';

export function EmptyContent() {
	return (
		<div className={cn('flex flex-col items-center justify-center bg-black')}>
			<Globe />
		</div>
	);
}
