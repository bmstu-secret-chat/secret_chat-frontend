'use client';

import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import React, { ReactNode } from 'react';
import AuthRoute from '@/components/utils/AuthRoute';

export default function ProfileModalLayout({
	children,
}: {
	children: ReactNode;
}) {
	const router = useRouter();

	const handleClose = () => {
		router.back();
	};

	return (
		<AuthRoute>
			<Modal
				open
				onCancel={handleClose}
				footer={null}
				width={600}
				maskClosable
			>
				{children}
			</Modal>
		</AuthRoute>
	);
}
