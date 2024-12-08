'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { AuthorizationService } from '@/app/api/AuthorizationService';
import { Input } from '@/components/lib/Input/Input';
import { Label } from '@/components/lib/Label/Label';
import BottomGradient from '@/components/ui/BottomGradient/BottomGradient';
import Divider from '@/components/ui/Divider/Divider';
import LabelInputContainer from '@/components/ui/LabelInputContainer/LabelInputContainer';
import { cn } from '@/lib/utils';
import { showToast } from '@/utils/showToast';
import { validateLoginFields } from '@/utils/validateAuthorizationFields';

export function LoginForm() {
	const authorizationService = new AuthorizationService();

	const [username, setUsername] = useState('');
	const [password, setPassword] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [passwordError, setPasswordError] = useState(false);

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
			const user = await authorizationService.login({ username, password });
			console.log(user);
		} catch (error: any) {
			showToast('error', error.message);
		}
	};

	return (
		<div
			className={cn(
				'relative flex flex-col justify-center items-center',
				'sm:max-w-md max-w-[20rem] w-full mx-auto rounded-2xl p-4 md:p-8',
				'shadow-input bg-white dark:bg-black',
			)}
		>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Вход в SecretChat
			</h2>
			<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
				Войдите в свой аккаунт, чтобы начать пользоваться самым защищенным
				мессенджером
			</p>
			<form className='relative  w-full gap-4 my-8 overflow-hidden min-h-[320px]'>
				<LabelInputContainer className='my-2'>
					<Label htmlFor='username'>Имя пользователя</Label>
					<Input
						id='username'
						placeholder='Tyler'
						type='text'
						value={username}
						isError={usernameError}
						onChange={(e) => setUsername(e.target.value)}
					/>
				</LabelInputContainer>

				<LabelInputContainer className='my-2'>
					<Label htmlFor='password'>Пароль</Label>
					<Input
						id='password'
						placeholder='••••••••'
						type='password'
						value={password}
						isError={passwordError}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</LabelInputContainer>

				<Divider />
				<BottomGradient />

				<button
					className={cn(
						'inline-flex animate-shimmer items-center justify-center',
						'rounded-md border border-slate-800 transition-colors',
						'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]',
						'bg-[length:200%_100%] font-medium text-slate-400',
						'w-full flex-grow h-10',
					)}
					onClick={handleLoginButtonClick}
				>
					Войти
				</button>
			</form>

			<div className={cn('absolute bottom-8 w-full text-white')}>
				<Divider />
				<div className={cn('flex flex-row items-center justify-center gap-2 ')}>
					Еще нет аккаунта?
					<Link
						href='/signup'
						className={cn('font-bold')}
					>
						Создать
					</Link>
				</div>
			</div>
		</div>
	);
}
