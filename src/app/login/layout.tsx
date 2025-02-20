import React from 'react';
import { NonAuthRoute } from '@/shared/utils';

export default function Login({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <NonAuthRoute>{children}</NonAuthRoute>;
}
