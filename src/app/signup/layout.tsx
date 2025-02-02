import React from 'react';
import { NonAuthRoute } from '@/shared/utils';

export default function Signup({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <NonAuthRoute>{children}</NonAuthRoute>;
}
