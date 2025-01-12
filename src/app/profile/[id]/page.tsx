'use client';

import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UsersService } from '@/app/api/UsersService';
import { showToast } from '@/components/utils/showToast';
import { UserInfo } from '@/types/User/UserInfo';

export default function Chat({ params }: { params: { id: string } }) {
	const { id } = params;

	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	const usersService = new UsersService();

	const loadUserInfo = async (userId: string) => {
		try {
			const user = await usersService.getUserInfo(userId);
			setUserInfo(user);
		} catch (error: any) {
			showToast('error', error.message);
		}
	};

	useEffect(() => {
		// if (isNaN(Number(id))) {
		// 	notFound();
		// }

		loadUserInfo(id);
	}, [id, loadUserInfo]);

	return userInfo ? <div>{JSON.stringify(userInfo)}</div> : null;
}
