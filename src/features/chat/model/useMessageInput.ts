'use client';

import { useEffect, useRef } from 'react';
import { useScreenWidth } from '@/shared/hooks';

export const useMessageInput = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { isPcDevice } = useScreenWidth();

	const placeholders = [
		'Как стать senior в 21?',
		'А они точно не читают мой диалог?',
		'Как собрать собственный ПК?',
		'Что лучше, Windows или Mac?',
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
