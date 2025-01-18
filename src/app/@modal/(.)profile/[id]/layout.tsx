'use client';

import React, { ReactNode } from 'react';
import AuthRoute from '@/components/utils/AuthRoute';

export default function ProfileModalLayout({
	children,
}: {
	children: ReactNode;
}) {
	return <AuthRoute>{children}</AuthRoute>;
}
