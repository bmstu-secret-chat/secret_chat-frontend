'use client';

import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '@/stores/Users/CurrentUserState';

export default function NonAuthRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const isAuthorized = useSelector(selectIsAuthorized);

	useEffect(() => {
		if (isAuthorized) {
			router.push('/');
		}
	}, [isAuthorized, router]);

	return !isAuthorized ? children : null;
}
