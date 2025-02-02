'use client';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Input as AntInput } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { useSignup } from '@/features/signup/model';
import { cn } from '@/shared/lib';
import {
	BottomGradient,
	Divider,
	Input,
	Label,
	LabelInputContainer,
} from '@/shared/ui';
import { QueryParams } from '@/types/QueryParams';

export function SignupForm() {
	const {
		page,
		stylesLoaded,
		searchParams,
		username,
		usernameError,
		email,
		password,
		passwordError,
		passwordConfirm,
		passwordConfirmError,
		sharedProps,
		handleUsernameChange,
		handleEmailChange,
		handlePasswordChange,
		handlePasswordConfirmChange,
		setQueryParam,
		handleNextButtonClick,
		handleSignupButtonClick,
	} = useSignup();

	return (
		<>
			{stylesLoaded && searchParams.get(QueryParams.PAGE) && (
				<div
					className={cn(
						'relative flex flex-col justify-center items-center',
						'sm:max-w-md max-w-[20rem] w-full mx-auto rounded-2xl p-4 md:p-8',
						'shadow-input bg-white dark:bg-black overflow-hidden',
					)}
				>
					<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
						Регистрация в SecretChat
					</h2>
					<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
						Создайте аккаунт, чтобы начать пользоваться самым защищенным
						мессенджером
					</p>
					<div className='relative w-full gap-4 my-8 overflow-hidden min-h-[390px]'>
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
									onChange={handleUsernameChange}
								/>
							</LabelInputContainer>

							<LabelInputContainer className='my-2'>
								<Label htmlFor='email'>Почта</Label>
								<Input
									id='email'
									placeholder='projectmayhem@fc.com'
									type='email'
									value={email}
									// isError={emailError}
									onChange={handleEmailChange}
								/>
							</LabelInputContainer>

							<LabelInputContainer className='my-2'>
								<Label htmlFor='phone'>Номер телефона (8‑123‑456‑78‑90)</Label>
								<AntInput.OTP
									length={11}
									variant='filled'
									type={'number'}
									{...sharedProps}
								/>
							</LabelInputContainer>

							<Divider />

							<button
								className={cn(
									'flex items-center justify-center gap-2',
									'bg-gradient-to-br relative group/btn from-black',
									'from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white',
									'rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]',
								)}
								onClick={handleNextButtonClick}
							>
								<span>Далее</span>
								<IconArrowRight className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
								<BottomGradient />
							</button>
						</motion.div>
						<motion.div
							className={cn('absolute w-full')}
							initial={{ x: '120%' }}
							animate={{ x: page === '2' ? '0' : '120%' }}
							transition={{ duration: 0.5 }}
							layout
						>
							<>
								<LabelInputContainer className='my-2'>
									<Label htmlFor='username_info'>Имя пользователя</Label>
									<Input
										id='username_info'
										placeholder='Tyler'
										type='text'
										value={username}
										disabled
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
										onChange={handlePasswordChange}
									/>
								</LabelInputContainer>
								<LabelInputContainer className='my-2 mb-8'>
									<Label htmlFor='password_confirm'>Повторите пароль</Label>
									<Input
										id='password_confirm'
										placeholder='••••••••'
										type='password'
										value={passwordConfirm}
										isError={passwordConfirmError}
										onChange={handlePasswordConfirmChange}
									/>
								</LabelInputContainer>
								<Divider />
								<div className={cn('flex flex-row items-center gap-4')}>
									<button
										className={cn(
											'flex items-center justify-center gap-2',
											'bg-gradient-to-br relative group/btn from-black',
											'from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white',
											'rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]',
											'w-full flex-grow',
										)}
										onClick={() => setQueryParam(QueryParams.PAGE, '1')}
									>
										<IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
										Назад
										<BottomGradient />
									</button>
									<button
										className={cn(
											'inline-flex animate-shimmer items-center justify-center',
											'rounded-md border border-slate-800 transition-colors',
											'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]',
											'bg-[length:200%_100%] font-medium text-slate-400',
											'w-full flex-grow h-10',
										)}
										onClick={handleSignupButtonClick}
									>
										Создать аккаунт
									</button>
								</div>
							</>
						</motion.div>
					</div>

					<div className={cn('absolute bottom-8 w-full')}>
						<Divider />
						<div
							className={cn(
								'flex flex-row items-center justify-center gap-2 text-white',
							)}
						>
							Уже есть аккаунт?
							<Link
								href='/login'
								className={cn('text-white font-bold')}
							>
								Войти
							</Link>
						</div>
					</div>
				</div>
			)}
		</>
	);
}
