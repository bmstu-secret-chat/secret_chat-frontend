import React from 'react';
import { SignupForm } from '@/features/signup/ui';
import { cn } from '@/shared/lib';

export function SignupPage() {
	return (
		<div
			className={cn(
				'flex flex-col items-center justify-center h-screen overflow-hidden',
			)}
		>
			<SignupForm />
		</div>
	);
}
