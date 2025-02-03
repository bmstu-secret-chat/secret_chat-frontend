'use client';

import React from 'react';
import { useProfileModal } from '@/features/profile/model';
import { cn } from '@/shared/lib';

export const ProfileModal: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const { modalRef } = useProfileModal();

	return (
		<div
			className={cn(
				'absolute z-[500] top-0 left-0 backdrop-blur-sm',
				'flex items-center justify-center',
				'w-screen h-screen',
			)}
			ref={modalRef}
		>
			{children}
		</div>
	);
};
