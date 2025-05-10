'use client';

import { useCallback, useEffect, useState } from 'react';
import { UsersService } from '@/entities/user/api';
import { showError, encryptKey } from '@/shared/lib';

const INTERVAL = 60_000;

export const useKeyGenerator = () => {
	const [key, setKey] = useState<number>(0);

	const setEncryptedKey = useCallback(async (secretKey: Uint8Array) => {
		try {
			const usersService = new UsersService();
			await usersService.uploadPrivateKey(secretKey);
		} catch (error) {
			showError(error);
		}
	}, []);

	const generateAndSetRandomNumber = useCallback(() => {
		const randomNumber = Math.floor(Math.random() * 1_000_000);
		const numberToSet = +String(randomNumber).padStart(6, '0');
		setKey(numberToSet);

		// TODO: использовать приватный ключ
		const secretKey = new TextEncoder().encode('PRIVATE_KEY');

		const encryptedKey = encryptKey(secretKey, numberToSet);
		setEncryptedKey(encryptedKey);
	}, [setEncryptedKey]);

	useEffect(() => {
		const interval = setInterval(() => {
			generateAndSetRandomNumber();
		}, INTERVAL);

		generateAndSetRandomNumber();

		return () => clearInterval(interval);
	}, [generateAndSetRandomNumber]);

	return { key };
};
