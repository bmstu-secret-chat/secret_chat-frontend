'use client';

import { TypewriterEffectSmooth, BackgroundLines } from '@/shared/ui';

export function EmptyContent() {
	const words = [
		{
			text: 'Найдите',
		},
		{
			text: 'пользователя,',
		},
		{
			text: 'чтобы',
		},
		{
			text: 'начать',
			className: 'text-blue-500 dark:text-blue-500',
		},
		{
			text: 'общение.',
			className: 'text-blue-500 dark:text-blue-500',
		},
	];
	return (
		<BackgroundLines className='flex items-center justify-center w-full flex-col px-4'>
			<TypewriterEffectSmooth words={words} />
		</BackgroundLines>
	);
}
