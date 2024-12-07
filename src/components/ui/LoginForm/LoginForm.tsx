'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import { Input } from '@/components/lib/Input/Input';
import { Label } from '@/components/lib/Label/Label';
import BottomGradient from '@/components/ui/BottomGradient/BottomGradient';
import Divider from '@/components/ui/Divider/Divider';
import LabelInputContainer from '@/components/ui/LabelInputContainer/LabelInputContainer';
import { cn } from '@/lib/utils';

export function LoginForm() {
	const [username, setUsername] = useState('');

	const [usernameError, setUsernameError] = useState(false);

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		console.log('Form submitted');
	};

	const onChange: OTPProps['onChange'] = (text) => {
		console.log('onChange:', text);
	};

	const onInput: OTPProps['onInput'] = (value) => {
		console.log('onInput:', value);
	};

	return (
		<div
			className={cn(
				'relative flex flex-col justify-center items-center',
				'max-w-md w-full mx-auto rounded-2xl p-4 md:p-8',
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
			<form
				className='relative  w-full gap-4 my-8 overflow-hidden min-h-[320px]'
				onSubmit={handleSubmit}
			>
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
				>
					Войти
				</button>
			</form>

			<div className={cn('absolute bottom-8 w-full')}>
				<Divider />
				<div className={cn('flex flex-row items-center justify-center gap-2 ')}>
					Еще нет аккаунта?
					<Link
						href='/signup'
						className={cn('text-white font-bold')}
					>
						Создать
					</Link>
				</div>
			</div>
		</div>
	);
}
