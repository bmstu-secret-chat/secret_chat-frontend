'use client';

import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import { Input as AntInput, Button } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';
import { useSignup } from '@/features/signup/model';
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

export function SignupForm() {
	const {
		page,
		stylesLoaded,
		searchParams,
		username,
		usernameError,
		phoneError,
		email,
		emailError,
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
	} = useSignup();

	return (
		<>
			{stylesLoaded && searchParams.get(EQueryParams.PAGE) && (
				<div
					className={cn(
						'relative flex flex-col justify-center items-center',
						'sm:max-w-md max-w-[20rem] w-full mx-auto rounded-2xl p-4 md:p-8',
						'shadow-input bg-white dark:bg-black overflow-hidden',
					)}
				>
					<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
						Регистрация в Safechat
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
							onKeyDown={handleFirstScreenKeyDown}
						>
							<LabelInputContainer className='my-2'>
								<Label htmlFor='username'>Имя пользователя</Label>
								<Input
									id='username'
									placeholder='SafechatUser'
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
									placeholder='user@safechat.com'
									type='email'
									value={email}
									isError={emailError}
									onChange={handleEmailChange}
								/>
							</LabelInputContainer>

							<LabelInputContainer className='my-2'>
								<Label htmlFor='phone'>Номер телефона (8‑123‑456‑78‑90)</Label>
								<AntInput.OTP
									length={11}
									variant='filled'
									type={'number'}
									style={{
										border: phoneError ? '1px solid red' : 'none',
										borderRadius: 6,
									}}
									{...phoneProps}
								/>
							</LabelInputContainer>

							<Divider />

							<button
								type='button'
								className={cn(
									'flex items-center justify-center gap-2',
									'bg-gradient-to-br relative group/btn from-black',
									'from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white',
									'rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]',
								)}
								onClick={handleNext1ButtonClick}
							>
								<span>Далее</span>
								<IconArrowRight className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
								<BottomGradient />
							</button>
						</motion.div>

						<motion.div
							className={cn('absolute w-full')}
							initial={{ x: '120%' }}
							animate={{
								x: page === '2' ? '0' : page === '3' ? '-120%' : '120%',
							}}
							transition={{ duration: 0.5 }}
							layout
							onKeyDown={handleSecondScreenKeyDown}
						>
							<LabelInputContainer className='my-2'>
								<Label htmlFor='username_info'>Имя пользователя</Label>
								<Input
									id='username_info'
									placeholder='SafechatUser'
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

								<button
									type='button'
									className={cn(
										'flex items-center justify-center gap-2',
										'bg-gradient-to-br relative group/btn from-black',
										'from-zinc-900 to-zinc-900 bg-zinc-800 w-full text-white',
										'rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]',
									)}
									onClick={handleNext2ButtonClick}
								>
									<span>Далее</span>
									<IconArrowRight className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
									<BottomGradient />
								</button>
							</div>
						</motion.div>

						<motion.div
							className={cn('absolute w-full')}
							initial={{ x: '120%' }}
							animate={{ x: page === '3' ? '0' : '120%' }}
							transition={{ duration: 0.5 }}
							layout
						>
							<LabelInputContainer className='my-2 h-[142px]'>
								<Label htmlFor='phone'>Введите код подтверждения</Label>
								<AntInput.OTP
									length={6}
									size={'large'}
									variant='filled'
									type={'number'}
									style={{
										border: codeError ? '1px solid red' : 'none',
										borderRadius: 6,
									}}
									{...codeProps}
								/>

								<span className={cn('text-center text-neutral-600 pt-4 px-1')}>
									Для отправки кода подтверждения на почту нажмите на кнопку
									ниже
								</span>
							</LabelInputContainer>

							<div className='flex justify-center pt-[16px]'>
								<Button
									type='primary'
									size={'large'}
									onClick={handleSendCodeButtonClick}
									disabled={isCodeButtonDisabled}
								>
									{isCodeButtonDisabled
										? `Подождите ${codeButtonTimer}с`
										: 'Отправить код'}
								</Button>
							</div>

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
									onClick={() => setQueryParam(EQueryParams.PAGE, '2')}
								>
									<IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
									Назад
									<BottomGradient />
								</button>

								<ButtonShimmer
									className={'w-full mt-0 px-0'}
									onClick={handleCreateAccountButtonClick}
								>
									Создать аккаунт
								</ButtonShimmer>
							</div>
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
