import React from 'react';
import { LoginForm } from '@/components/ui/LoginForm/LoginForm';
import { cn } from '@/lib/utils';

export default function Login() {
	return (
		<div className={cn('flex flex-col items-center justify-center h-screen')}>
			<LoginForm />
		</div>
	);
}
