/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
'use client';

// import {
// 	IconBrandGithub,
// 	IconBrandGoogle,
// 	IconBrandOnlyfans,
// } from '@tabler/icons-react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
// import type { GetProps } from 'antd';
import { Input as AntInput } from 'antd';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/lib/Input/Input';
import { Label } from '@/components/lib/Label/Label';
import BottomGradient from '@/components/ui/BottomGradient/BottomGradient';
import Divider from '@/components/ui/Divider/Divider';
import LabelInputContainer from '@/components/ui/LabelInputContainer/LabelInputContainer';
import { showToast } from '@/components/utils/showToast';
import useAuthorization from '@/hooks/useAuthorization';
import useQueryParams from '@/hooks/useQueryParams';
import { cn } from '@/lib/utils';
import { QueryParams } from '@/types/QueryParams';
import { validateSignupFields } from '@/utils/validateAuthorizationFields';

export function SignupForm() {
	const pathname = usePathname();
	const router = useRouter();

	const searchParams = useSearchParams();
	const { page, setQueryParam } = useQueryParams();

	const [stylesLoaded, setStylesLoaded] = useState(false);
	const [username, setUsername] = useState('');
	const [usernameError, setUsernameError] = useState(false);
	const [password, setPassword] = useState('');
	const [passwordError, setPasswordError] = useState(false);
	const [passwordConfirm, setPasswordConfirm] = useState('');
	const [passwordConfirmError, setPasswordConfirmError] = useState(false);

	const { signup } = useAuthorization();

	const onChange = (text: any) => {
		console.log('onChange:', text);
	};

	const onInput = (value: any) => {
		console.log('onInput:', value);
	};

	const sharedProps = {
		onChange,
		onInput,
	};

	const handleNextButtonClick = () => {
		const { isValid, message, invalidFields } = validateSignupFields(username);

		if (!isValid) {
			if (invalidFields.includes('username')) {
				setUsernameError(true);
			} else {
				setUsernameError(false);
			}

			showToast('error', message, 5);
			return;
		}

		setUsernameError(false);

		setQueryParam(QueryParams.PAGE, '2');
	};

	const handleSignupButtonClick = async () => {
		const { isValid, message, invalidFields } = validateSignupFields(
			username,
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

		try {
			await signup(username, password);
			router.push('/chats');
		} catch {
			// TODO: handle error
		}
	};

	useEffect(() => {
		// рендерим после загрузки стилей
		setStylesLoaded(true);
	}, []);

	useEffect(() => {
		if (
			pathname === '/signup' &&
			searchParams.get(QueryParams.PAGE) !== '1' &&
			username === ''
		) {
			setQueryParam(QueryParams.PAGE, '1');
		}
	}, [setQueryParam, pathname, searchParams, username]);

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
					<div className='relative  w-full gap-4 my-8 overflow-hidden min-h-[390px]'>
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
								<Label htmlFor='email'>Почта</Label>
								<Input
									id='email'
									placeholder='projectmayhem@fc.com'
									type='email'
								/>
							</LabelInputContainer>

							<LabelInputContainer className='my-2'>
								<Label htmlFor='phone'>Номер телефона</Label>
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
										onChange={(e) => setPassword(e.target.value)}
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
										onChange={(e) => setPasswordConfirm(e.target.value)}
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
