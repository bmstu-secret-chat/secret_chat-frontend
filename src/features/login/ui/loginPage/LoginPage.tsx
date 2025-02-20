import React from 'react';
import { LoginForm } from '@/features/login/ui';
import { cn } from '@/shared/lib';

export function LoginPage() {
	return (
		<div className={cn('flex flex-col items-center justify-center h-screen')}>
			<LoginForm />
		</div>
	);
}
