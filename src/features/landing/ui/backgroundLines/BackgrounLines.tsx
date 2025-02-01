'use client';

import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/entities/user/model';
import { cn } from '@/shared/lib';
import { BackgroundLines } from '@/shared/ui';

export function BackgroundLinesLanding() {
	const router = useRouter();

	const currentUser = useSelector(selectCurrentUser);

	const handleClick = useCallback(
		() => (currentUser ? router.push('/chats') : router.push('/login')),
		[router, currentUser],
	);

	return (
		<BackgroundLines
			user={currentUser}
			className='flex items-center justify-center w-full flex-col px-4'
		>
			<h2
				className={cn(
					'bg-clip-text text-transparent text-center bg-gradient-to-b',
					'from-neutral-600 to-white text-4xl md:text-5xl lg:text-7xl',
					'font-sans relative z-20 font-bold tracking-tight',
				)}
			>
				Safe chat
			</h2>
			<p
				className={cn(
					'text-sm md:text-lg lg:text-2xl text-neutral-400 text-center',
					'max-w-[60vw] md:max-w-[40vw] px-2 py-4 mx-auto whitespace-pre-line',
				)}
			>
				{
					'Ваши сообщения — только для ваших глаз. Общайтесь свободно, оставаясь в тайне!'
				}
			</p>
			<button
				className={cn(
					'inline-flex animate-shimmer items-center justify-center',
					'rounded-md border border-slate-800 transition-colors',
					'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]',
					'bg-[length:200%_100%] font-medium text-slate-400',
					'py-2 px-4 text-xs md:text-sm lg:text-lg cursor-pointer z-10',
				)}
				onClick={handleClick}
			>
				Начать общаться
			</button>
		</BackgroundLines>
	);
}
