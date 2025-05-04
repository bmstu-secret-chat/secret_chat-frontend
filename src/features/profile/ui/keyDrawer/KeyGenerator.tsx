import React from 'react';
import { useKeyGenerator } from '@/features/profile/model';
import { AnimatedCounter } from '@/shared/ui';

export const KeyGenerator: React.FC = () => {
	const { key } = useKeyGenerator();

	return (
		<div className={'flex flex-col gap-4 h-full'}>
			<h1 className={'text-xl'}>
				Введите этот код после авторизации на новом устройстве
			</h1>
			<AnimatedCounter
				className={'m-4'}
				value={key}
				places={[100_000, 10_000, 1_000, 100, 10, 1]}
				fontSize={64}
				padding={5}
				gap={10}
				textColor='white'
				fontWeight={900}
			/>
		</div>
	);
};
