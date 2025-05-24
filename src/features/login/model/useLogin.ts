'use client';

import { OTPProps } from 'antd/es/input/OTP';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UsersService } from '@/entities/user/api';
import {
	deleteMyPublicKeyAction,
	deleteUserAction,
	setMyPublicKeyAction,
	setUserAction,
	UserShortInfo,
} from '@/entities/user/model';
import { LOGIN_URL } from '@/features/login/config';
import { validateLoginFields } from '@/features/login/lib';
import { AuthorizationService } from '@/shared/api/AuthorizationService';
import { useQueryParams } from '@/shared/hooks';
import { decryptKey, SafeChatDB, showError, showToast } from '@/shared/lib';
import { EQueryParams } from '@/shared/model';

export const useLogin = () => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { page, setQueryParam } = useQueryParams();

	const db = new SafeChatDB();
	const authorizationService = new AuthorizationService();
	const usersService = new UsersService();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [key, setKey] = useState('');
	const [keyError, setKeyError] = useState(false);
	const [user, setUser] = useState<UserShortInfo | null>(null);

	const handleKeyChange = useCallback(
		(value: string) => {
			setKey(value);
		},
		[setKey],
	);

	const sharedProps: OTPProps = {
		onChange: handleKeyChange,
		value: key,
	};

	const login = async (username: string, password: string) => {
		try {
			const user = await authorizationService.login({ username, password });
			const myPublicKey = await usersService.getPublicKey(user.id);

			dispatch(setMyPublicKeyAction(myPublicKey));
			dispatch(setUserAction(user));
		} catch (error) {
			showError(error);
			dispatch(deleteUserAction());
			dispatch(deleteMyPublicKeyAction());

			throw error;
		}
	};

	const handleNextButtonClick = async () => {
		const db = new SafeChatDB();

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
			const user = await usersService.getUserInfoByName(username);
			const privateKey = await db.getValue(user.id);

			if (privateKey) {
				await login(username, password);
				router.push('/chats');
			} else {
				setUser(user);
				setQueryParam(EQueryParams.PAGE, '2');
			}
		} catch (error) {
			showError(error);

			setUser(null);
			setUsernameError(true);
			setPasswordError(true);
		}
	};

	const handleLoginButtonClick = async () => {
		if (!user) {
			showToast('error', 'Пользователь не найден');
			return;
		}

		if (!key) {
			showToast('error', 'Введите код подтверждения');
			setKeyError(true);

			return;
		}
		setKeyError(false);

		try {
			const encryptedKey = await usersService.getPrivateKey(username);
			const privateKey = decryptKey(encryptedKey, +key);

			if (!privateKey) {
				showToast('error', 'Неверный код подтверждения');
				setKeyError(true);

				return;
			}

			await db.saveValue(user.id, privateKey);

			await login(username, password);
			router.push('/chats');
		} catch (error) {
			showError(error);

			setUsernameError(true);
			setPasswordError(true);
		}
	};

	useEffect(() => {
		if (
			pathname === LOGIN_URL &&
			searchParams.get(EQueryParams.PAGE) !== '1' &&
			username === ''
		) {
			setQueryParam(EQueryParams.PAGE, '1');
		}
	}, [setQueryParam, pathname, searchParams, username]);

	return {
		page,
		searchParams,
		username,
		password,
		usernameError,
		passwordError,
		keyError,
		sharedProps,
		setQueryParam,
		setUsername,
		setPassword,
		handleNextButtonClick,
		handleLoginButtonClick,
	};
};
