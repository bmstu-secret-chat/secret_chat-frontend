'use client';

import { useEffect, useRef } from 'react';
import { useScreenWidth } from '@/shared/hooks';

export const useMessageInput = () => {
	const inputRef = useRef<HTMLInputElement | null>(null);

	const { isPcDevice } = useScreenWidth();

	const placeholders = [
		"What's the first rule of Fight Club?",
		'Who is Tyler Durden?',
		'Where is Andrew Laeddis Hiding?',
		'Write a Javascript method to reverse a string',
		'How to assemble your own PC?',
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
