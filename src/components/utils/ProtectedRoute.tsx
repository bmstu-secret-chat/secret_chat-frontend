import { useRouter } from 'next/navigation';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectIsAuthorized } from '@/stores/Users/CurrentUserState';

export default function ProtectedRoute({
	children,
}: {
	children: React.ReactNode;
}) {
	const router = useRouter();

	const isAuthorized = useSelector(selectIsAuthorized);

	useEffect(() => {
		if (!isAuthorized) {
			router.push('/login');
		}
	}, [isAuthorized, router]);

	return isAuthorized ? children : null;
}
