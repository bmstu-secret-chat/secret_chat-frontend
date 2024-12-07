import React from 'react';
import { SignupFormDemo } from '@/components/ui/RegistrationForm/RegistrationForm';
import { Sparkles } from '@/components/ui/Sparkles/Sparkles';
import { cn } from '@/lib/utils';

export default function Login() {
	return (
		<div className={cn('flex flex-col items-center justify-center h-screen')}>
			{/*<Sparkles />*/}
			<SignupFormDemo />
		</div>
	);
}
