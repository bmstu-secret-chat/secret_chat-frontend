import React from 'react';
import { SignupForm } from '@/components/ui/SignupForm/SignupForm';
import { cn } from '@/lib/utils';

export default function Signup() {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center h-screen overflow-hidden',
			)}
		>
			{/*<Sparkles />*/}
			<SignupForm />
		</div>
	);
}
