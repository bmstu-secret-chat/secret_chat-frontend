'use client';

import { useEffect, useRef } from 'react';
import { useScreenWidth } from '@/shared/hooks';

export const useMessageInput = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { isPcDevice } = useScreenWidth();

	const placeholders = [
		'Как забеременеть в 16?',
		'Кто такой Тайлер Дёрден?',
		'Где скрывается Эндрю Лэддис?',
		'Как собрать свой собственный ПК?',
		'Кто такой Джаваскрипт?',
	];

	useEffect(() => {
		if (isPcDevice) {
			inputRef.current?.focus();
		}
	}, [isPcDevice]);

	return {
		inputRef,
		placeholders,
	};
};
