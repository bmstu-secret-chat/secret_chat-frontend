'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useRef } from 'react';

export const useProfileModal = () => {
	const router = useRouter();
	const pathname = usePathname();

	const modalRef = useRef<HTMLDivElement>(null);

	const handleClickOutside = useCallback(
		(event: MouseEvent) => {
			if (
				modalRef.current &&
				(event.target as HTMLElement).classList.contains('profile-page') &&
				modalRef.current.contains(event.target as Node)
			) {
				router.back();
			}
		},
		[router],
	);

	const handleEscape = useCallback(
		(event: KeyboardEvent) => {
			if (event.key === 'Escape' && pathname.includes('/profile/')) {
				router.back();
			}
		},
		[router, pathname],
	);

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [handleClickOutside]);

	useEffect(() => {
		window.addEventListener('keydown', handleEscape);

		return () => {
			window.removeEventListener('keydown', handleEscape);
		};
	}, [handleEscape]);

	return { modalRef };
};
