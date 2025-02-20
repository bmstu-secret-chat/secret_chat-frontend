import React from 'react';
import { AuthRoute } from '@/shared/utils';

export default function Profile({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <AuthRoute>{children}</AuthRoute>;
}
