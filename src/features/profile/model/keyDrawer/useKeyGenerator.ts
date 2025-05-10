'use client';

import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UsersService } from '@/entities/user/api';
import { selectCurrentUser } from '@/entities/user/model';
import { showError, encryptKey, SafeChatDB } from '@/shared/lib';

const INTERVAL = 60_000;

export const useKeyGenerator = () => {
	const user = useSelector(selectCurrentUser);

	const [key, setKey] = useState<number>(0);

	const setEncryptedKey = useCallback(async (secretKey: string) => {
		try {
			const usersService = new UsersService();
			await usersService.uploadPrivateKey(secretKey);
		} catch (error) {
			showError(error);
		}
	}, []);

	const generateAndSetRandomNumber = useCallback(async () => {
		if (!user) {
			showError('Пользователь не найден');
			return;
		}

		const db = new SafeChatDB();

		const randomNumber = Math.floor(Math.random() * 1_000_000);
		const numberToSet = +String(randomNumber).padStart(6, '0');
		setKey(numberToSet);

		const privateKey = await db.getValue(user.id);
		const encryptedKey = encryptKey(privateKey as string, numberToSet);
		setEncryptedKey(encryptedKey);
	}, [setEncryptedKey, user]);

	useEffect(() => {
		const interval = setInterval(() => {
			generateAndSetRandomNumber();
		}, INTERVAL);

		generateAndSetRandomNumber();

		return () => clearInterval(interval);
	}, [generateAndSetRandomNumber]);

	return { key };
};
