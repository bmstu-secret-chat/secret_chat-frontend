'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const useRemoveQueryParam = () => {
	const searchParams = useSearchParams();

	useEffect(() => {
		if (searchParams.has('auth')) {
			const updatedQuery = new URLSearchParams(searchParams);
			updatedQuery.delete('auth');

			const pathname = window.location.pathname;

			const newUrl = `${pathname}?${updatedQuery.toString()}`;

			window.history.replaceState(null, '', newUrl);
		}
	}, [searchParams]);
};

export default useRemoveQueryParam;
