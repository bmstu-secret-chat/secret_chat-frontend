import React from 'react';
import AuthRoute from '@/components/utils/AuthRoute';

export default function Profile({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AuthRoute>{children}</AuthRoute>;
}
