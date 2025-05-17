'use client';

import { OTPProps } from 'antd/es/input/OTP';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UsersService } from '@/entities/user/api';
import { deleteUserAction, setUserAction } from '@/entities/user/model';
import { SIGNUP_URL } from '@/features/signup/config';
import { validateSignupFields } from '@/features/signup/lib';
import { AuthorizationService } from '@/shared/api/AuthorizationService';
import { useQueryParams } from '@/shared/hooks';
import {
	generateKeyPair,
	SafeChatDB,
	showError,
	showToast,
} from '@/shared/lib';
import { EQueryParams } from '@/shared/model';

export const useSignup = () => {
	const dispatch = useDispatch();
	const pathname = usePathname();
	const router = useRouter();
	const searchParams = useSearchParams();

	const { page, setQueryParam } = useQueryParams();

	const db = new SafeChatDB();
	const authorizationService = new AuthorizationService();
	const usersService = new UsersService();

	const [stylesLoaded, setStylesLoaded] = useState(false);
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [phone, setPhone] = useState('');
	const [phoneError, setPhoneError] = useState(false);
	const [email, setEmail] = useState('');
	const [emailError, setEmailError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);
	const [code, setCode] = useState('');
	const [codeError, setCodeError] = useState(false);
	const [isCodeButtonDisabled, setIsCodeButtonDisabled] = useState(false);
	const [codeButtonTimer, setCodeButtonTimer] = useState(0);

	const handlePhoneChange = useCallback(
		(value: string) => {
			setPhone(value);
		},
		[setPhone],
	);

	const handleCodeChange = useCallback(
		(value: string) => {
			setCode(value);
		},
		[setCode],
	);

	const phoneProps: OTPProps = {
		onChange: handlePhoneChange,
		value: phone,
	};

	const codeProps: OTPProps = {
		onChange: handleCodeChange,
		value: code,
	};

	const handleUsernameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUsername(e.target.value);
		},
		[],
	);

	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
		},
		[],
	);

	const handlePasswordChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPassword(e.target.value);
		},
		[],
	);

	const handlePasswordConfirmChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setPasswordConfirm(e.target.value);
		},
		[],
	);

	const handleNext1ButtonClick = () => {
		const { isValid, message, invalidFields } = validateSignupFields(
			username,
			phone,
			email,
			password,
			passwordConfirm,
		);

		if (!isValid) {
			if (invalidFields.includes('username')) {
				setUsernameError(true);
			} else {
				setUsernameError(false);
			}

			if (invalidFields.includes('email')) {
				setEmailError(true);
			} else {
				setEmailError(false);
			}

			if (invalidFields.includes('phone')) {
				setPhoneError(true);
			} else {
				setPhoneError(false);
			}

			showToast('error', message, 5);
			return;
		}

		setUsernameError(false);
		setEmailError(false);
		setPhoneError(false);

		setQueryParam(EQueryParams.PAGE, '2');
	};

	const handleNext2ButtonClick = async () => {
		if (!password) {
			setPasswordError(true);
			showToast('error', 'Пароль не может быть пустым');
			return;
		}

		const { isValid, message, invalidFields } = validateSignupFields(
			username,
			phone,
			email,
			password,
			passwordConfirm,
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

			if (invalidFields.includes('passwordConfirm')) {
				setPasswordConfirmError(true);
			} else {
				setPasswordConfirmError(false);
			}

			showToast('error', message, 5);
			return;
		}

		setUsernameError(false);
		setPasswordError(false);
		setPasswordConfirmError(false);

		setQueryParam(EQueryParams.PAGE, '3');
	};

	const handleSendCodeButtonClick = async () => {
		if (!email) {
			showToast('error', 'Введите почту');
			return;
		}

		try {
			await authorizationService.sendCode(email);
			setIsCodeButtonDisabled(true);
			setCodeButtonTimer(30);

			const interval = setInterval(() => {
				setCodeButtonTimer((prev) => {
					if (prev <= 1) {
						clearInterval(interval);
						setIsCodeButtonDisabled(false);
						return 0;
					}
					return prev - 1;
				});
			}, 1000);
		} catch (error) {
			showError(error);
		}
	};

	const handleFirstScreenKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
		if (e.key === 'Enter') {
			handleNext1ButtonClick();
		}
	};

	const handleSecondScreenKeyDown = (
		e: React.KeyboardEvent<HTMLDivElement>,
	) => {
		switch (e.key) {
			case 'Enter':
				handleNext2ButtonClick();
				break;
			case 'Escape':
				setQueryParam(EQueryParams.PAGE, '1');
				break;
		}
	};

	const handleCreateAccountButtonClick = async () => {
		if (!code) {
			showToast('error', 'Введите код подтверждения');
			setCodeError(true);

			return;
		}

		setCodeError(false);

		await signup(username, phone, email, password, code);
	};

	const signup = async (
		username: string,
		phone: string,
		email: string,
		password: string,
		code: string,
	) => {
		try {
			const { publicKey, privateKey } = await generateKeyPair();

			const user = await authorizationService.signup(
				{
					username,
					phone,
					email,
					password,
				},
				code,
			);

			await usersService.uploadPublicKey(user.id, publicKey);
			await db.saveValue(user.id, privateKey);

			dispatch(setUserAction(user));

			router.push('/chats');
		} catch (error) {
			showError(error);

			dispatch(deleteUserAction());

			return;
		}
	};

	useEffect(() => {
		// рендерим после загрузки стилей
		setStylesLoaded(true);
	}, []);

	useEffect(() => {
		if (
			pathname === SIGNUP_URL &&
			searchParams.get(EQueryParams.PAGE) !== '1' &&
			username === ''
		) {
			setQueryParam(EQueryParams.PAGE, '1');
		}
	}, [setQueryParam, pathname, searchParams, username]);

	return {
		page,
		stylesLoaded,
		searchParams,
		username,
		usernameError,
		email,
		emailError,
		phoneError,
		password,
		passwordError,
		passwordConfirm,
		passwordConfirmError,
		phoneProps,
		codeProps,
		codeError,
		isCodeButtonDisabled,
		codeButtonTimer,
		handleUsernameChange,
		handleEmailChange,
		handlePasswordChange,
		handlePasswordConfirmChange,
		setQueryParam,
		handleNext1ButtonClick,
		handleNext2ButtonClick,
		handleSendCodeButtonClick,
		handleCreateAccountButtonClick,
		handleFirstScreenKeyDown,
		handleSecondScreenKeyDown,
	};
};
