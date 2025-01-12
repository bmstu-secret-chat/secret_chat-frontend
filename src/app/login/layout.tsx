import React from 'react';
import NonAuthRoute from '@/components/utils/NonAuthRoute';

export default function Login({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <NonAuthRoute>{children}</NonAuthRoute>;
}
