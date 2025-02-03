'use client';

import Link from 'next/link';
import React from 'react';
import { useLogin } from '@/features/login/model';
import { cn } from '@/shared/lib';
import {
	BottomGradient,
	Divider,
	Input,
	Label,
	LabelInputContainer,
} from '@/shared/ui';

export function LoginForm() {
	const {
		username,
		password,
		usernameError,
		passwordError,
		setUsername,
		setPassword,
		handleLoginButtonClick,
	} = useLogin();

	return (
		<div
			className={cn(
				'relative flex flex-col justify-center items-center',
				'sm:max-w-md max-w-[20rem] w-full mx-auto rounded-2xl p-4 md:p-8',
				'shadow-input bg-white dark:bg-black',
			)}
		>
			<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
				Вход в Safechat
			</h2>
			<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
				Войдите в свой аккаунт, чтобы начать пользоваться самым защищенным
				мессенджером
			</p>
			<div className='relative  w-full gap-4 my-8 overflow-hidden min-h-[320px]'>
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
			</div>

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
