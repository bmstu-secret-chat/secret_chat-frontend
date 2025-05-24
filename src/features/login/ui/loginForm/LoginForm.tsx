'use client';

import { IconArrowLeft } from '@tabler/icons-react';
import { Input as AntInput } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { useLogin } from '@/features/login/model';
import { cn } from '@/shared/lib';
import { EQueryParams } from '@/shared/model';
import {
	BottomGradient,
	ButtonShimmer,
	Divider,
	Input,
	Label,
	LabelInputContainer,
} from '@/shared/ui';

export function LoginForm() {
	const {
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
	} = useLogin();

	return (
		searchParams.get(EQueryParams.PAGE) && (
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
				<div className='relative w-full gap-4 my-8 overflow-hidden min-h-[320px]'>
					<motion.div
						className={cn('absolute w-full')}
						initial={{ x: '0' }}
						animate={{ x: page === '1' ? '0' : '-120%' }}
						transition={{ duration: 0.5 }}
						layout
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
								value={password}
								isError={passwordError}
								onChange={(e) => setPassword(e.target.value)}
							/>
						</LabelInputContainer>

						<Divider />
						<BottomGradient />

						<ButtonShimmer
							onClick={handleNextButtonClick}
							className={'w-full'}
						>
							Войти
						</ButtonShimmer>
					</motion.div>

					<motion.div
						className={cn('absolute w-full')}
						initial={{ x: '120%' }}
						animate={{ x: page === '2' ? '0' : '120%' }}
						transition={{ duration: 0.5 }}
						layout
					>
						<LabelInputContainer className='my-2 h-[140px]'>
							<Label htmlFor='phone'>Введите код подтверждения</Label>
							<AntInput.OTP
								length={6}
								size={'large'}
								variant='filled'
								type={'number'}
								style={{
									border: keyError ? '1px solid red' : 'none',
									borderRadius: 6,
								}}
								{...sharedProps}
							/>

							<span className={cn('text-center text-neutral-600 pt-4')}>
								Код подтверждения находится в прифиле на авторизованном
								устройстве
							</span>
						</LabelInputContainer>

						<Divider className='mb-10' />
						<div className={cn('flex flex-row items-center gap-4')}>
							<button
								type='button'
								className={cn(
									'flex items-center justify-center gap-2',
									'bg-gradient-to-br relative group/btn from-black',
									'from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white',
									'rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]',
									'w-full flex-grow',
								)}
								onClick={() => setQueryParam(EQueryParams.PAGE, '1')}
							>
								<IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
								Назад
								<BottomGradient />
							</button>

							<ButtonShimmer
								className={'w-full mt-0 px-0'}
								onClick={handleLoginButtonClick}
							>
								Войти
							</ButtonShimmer>
						</div>
					</motion.div>
				</div>

				<div className={cn('absolute bottom-8 w-full text-white')}>
					<Divider />
					<div
						className={cn('flex flex-row items-center justify-center gap-2 ')}
					>
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
		)
	);
}
