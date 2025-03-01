'use client';

import { TypewriterEffectSmooth } from '@/shared/ui';

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
	return <TypewriterEffectSmooth words={words} />;
}
