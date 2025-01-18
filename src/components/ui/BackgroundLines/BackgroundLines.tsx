'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { BackgroundLines } from '@/components/lib/BackgroundLines/BackgroundLines';
import { cn } from '@/lib/utils';
import { selectCurrentUser } from '@/stores/Users/CurrentUserState';

export function BackgroundLinesLanding() {
	const currentUser = useSelector(selectCurrentUser);

	return (
		<BackgroundLines
			user={currentUser}
			className='flex items-center justify-center w-full flex-col px-4'
		>
			<h2
				className={cn(
					'bg-clip-text text-transparent text-center bg-gradient-to-b',
					'from-neutral-600 to-white text-4xl md:text-5xl lg:text-7xl',
					'font-sans py-4 relative z-20 font-bold tracking-tight',
				)}
			>
				Safe chat
			</h2>
			<p
				className={cn(
					'text-sm md:text-lg lg:text-2xl text-neutral-400 text-center',
					'max-w-[60vw] md:max-w-[40vw] px-2 mx-auto whitespace-pre-line',
				)}
			>
				{
					'Ваши сообщения — только для ваших глаз. Общайтесь свободно, оставаясь в тайне!'
				}
			</p>
		</BackgroundLines>
	);
}
