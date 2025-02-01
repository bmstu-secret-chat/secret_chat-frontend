import React from 'react';
import NonAuthRoute from '@/shared/utils/nonAuthRoute/NonAuthRoute';

export default function Signup({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <NonAuthRoute>{children}</NonAuthRoute>;
}
