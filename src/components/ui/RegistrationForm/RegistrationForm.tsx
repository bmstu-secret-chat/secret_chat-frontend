'use client';
// import {
// 	IconBrandGithub,
// 	IconBrandGoogle,
// 	IconBrandOnlyfans,
// } from '@tabler/icons-react';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import type { GetProps } from 'antd';
import { Input as AntInput } from 'antd';
import { motion } from 'framer-motion';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { Input } from '@/components/lib/Input/Input';
import { Label } from '@/components/lib/Label/Label';
import useQueryParams from '@/hooks/useQueryParams';
import { cn } from '@/lib/utils';
import { QueryParams } from '@/types/QueryParams';

type OTPProps = GetProps<typeof Input.OTP>;

export function SignupFormDemo() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const { page, setQueryParam } = useQueryParams();

	const [stylesLoaded, setStylesLoaded] = useState(false);
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

	const sharedProps: OTPProps = {
		onChange,
		onInput,
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
				<div className='max-w-md w-full mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black'>
					<h2 className='font-bold text-xl text-neutral-800 dark:text-neutral-200'>
						Регистрация в SecretChat
					</h2>
					<p className='text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300'>
						Создайте аккаунт, чтобы начать пользоваться самым защищенным
						мессенджером
					</p>
					<form
						className='relative gap-4 my-8 overflow-hidden min-h-[340px]'
						onSubmit={handleSubmit}
					>
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
								// type='submit'
								onClick={() => {
									if (username.trim() == '') {
										setUsernameError(true);
										return;
									}

									setUsernameError(false);
									setQueryParam(QueryParams.PAGE, '2');
								}}
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
									/>
								</LabelInputContainer>
								<LabelInputContainer className='my-2 mb-8'>
									<Label htmlFor='password_repeat'>Повторите пароль</Label>
									<Input
										id='password_repeat'
										placeholder='••••••••'
										type='password'
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
										// type='submit'
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
									>
										Создать аккаунт
									</button>
								</div>
							</>
						</motion.div>
					</form>
				</div>
			)}
		</>
	);
}

const BottomGradient = () => {
	return (
		<>
			<span className='group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent' />
			<span className='group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent' />
		</>
	);
};

const LabelInputContainer = ({
	children,
	className,
}: {
	children: React.ReactNode;
	className?: string;
}) => {
	return (
		<div className={cn('flex flex-col space-y-2 w-full', className)}>
			{children}
		</div>
	);
};

const Divider = () => {
	return (
		<div
			className={cn(
				'bg-gradient-to-r from-transparent via-neutral-700',
				'to-transparent my-8 h-[1px] w-full',
			)}
		/>
	);
};
