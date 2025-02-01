'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserAction, setUserAction } from '@/entities/user/model';
import { validateLoginFields } from '@/features/login/lib';
import { AuthorizationService } from '@/shared/api/AuthorizationService';
import { showToast } from '@/shared/lib';

export const useLogin = () => {
	const router = useRouter();
	const dispatch = useDispatch();

	const authorizationService = new AuthorizationService();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

	const login = async (username: string, password: string) => {
		try {
			const user = await authorizationService.login({ username, password });
			dispatch(setUserAction(user));
		} catch (error: any) {
			showToast('error', error.message);
			dispatch(deleteUserAction());

			throw error;
		}
	};

	const handleLoginButtonClick = async () => {
		const { isValid, message, invalidFields } = validateLoginFields(
			username,
			password,
		);

		if (!isValid) {
			if (invalidFields.includes('username')) {
				setUsernameError(true);
			} else {
				setUsernameError(false);
			}

			if (invalidFields.includes('password')) {
				setPasswordError(true);
			} else {
				setPasswordError(false);
			}

			showToast('error', message, 5);
			return;
		}

		setUsernameError(false);
		setPasswordError(false);

		try {
			await login(username, password);
			router.push('/chats');
		} catch {
			setUsernameError(true);
			setPasswordError(true);
		}
	};

	return {
		username,
		password,
		usernameError,
		passwordError,
		setUsername,
		setPassword,
		handleLoginButtonClick,
	};
};
