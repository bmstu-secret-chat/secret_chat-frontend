import React, { ReactNode } from 'react';
import { AuthRoute } from '@/shared/utils';

export default function ProfileModalLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <AuthRoute>{children}</AuthRoute>;
}
