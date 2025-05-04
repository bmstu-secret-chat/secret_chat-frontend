'use client';

import { OTPProps } from 'antd/es/input/OTP';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUserAction, setUserAction } from '@/entities/user/model';
import { LOGIN_URL } from '@/features/login/config';
import { validateLoginFields } from '@/features/login/lib';
import { AuthorizationService } from '@/shared/api/AuthorizationService';
import { useQueryParams } from '@/shared/hooks';
import { showError, showToast } from '@/shared/lib';
import { EQueryParams } from '@/shared/model';

export const useLogin = () => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { page, setQueryParam } = useQueryParams();

	const authorizationService = new AuthorizationService();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);
	const [key, setKey] = useState('');
	const [keyError] = useState(false);

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
			dispatch(setUserAction(user));
		} catch (error) {
			showError(error);
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
			setQueryParam(EQueryParams.PAGE, '2');
			return;

			await login(username, password);
			router.push('/chats');
		} catch {
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
		handleLoginButtonClick,
	};
};
