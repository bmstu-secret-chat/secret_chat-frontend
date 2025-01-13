'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { UsersService } from '@/app/api/UsersService';
import { showToast } from '@/components/utils/showToast';
import { UserInfo } from '@/types/User/UserInfo';

export default function Chat({ params }: { params: { id: string } }) {
	const { id } = params;

	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

	const loadUserInfo = useCallback(async (id: string) => {
		try {
			const usersService = new UsersService();
			const user = await usersService.getUserInfo(id);
			setUserInfo(user);
		} catch (error: any) {
			if (error.message.includes('EREQUESTPENDING')) {
				return;
			}

			showToast('error', error.message);
		}
	}, []);

	useEffect(() => {
		// if (isNaN(Number(id))) {
		// 	notFound();
		// }

		loadUserInfo(id);
	}, [id, loadUserInfo]);

	return userInfo ? <div>{JSON.stringify(userInfo)}</div> : null;
}
