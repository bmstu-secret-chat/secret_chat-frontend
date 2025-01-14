'use client';

import { IconX, IconEdit, IconDeviceFloppy } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { UsersService } from '@/app/api/UsersService';
import { BackgroundGradient } from '@/components/lib/BackgroundGradient/BackgroundGradient';
import UserProfileInfo from '@/components/ui/UserProfileInfo/UserProfileInfo';
import { showToast } from '@/components/utils/showToast';
import { cn } from '@/lib/utils';
import { UserInfo } from '@/types/User/UserInfo';

export default function Profile({ params }: { params: { id: string } }) {
	const { id } = params;

	const [isEditMode, setIsEditMode] = useState(false);

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
		loadUserInfo(id);
	}, [id, loadUserInfo]);

	return userInfo ? (
		<div
			className={cn(
				'relative flex flex-col items-center justify-center ',
				'w-full h-screen',
			)}
		>
			<BackgroundGradient
				className={cn(
					'flex',
					'rounded-[22px] max-w-sm p-4 sm:p-10 bg-white dark:bg-zinc-900',
					'overflow-hidden',
				)}
			>
				<motion.div
					initial={{ x: '0' }}
					animate={{ x: !isEditMode ? '0' : '-150%' }}
					transition={{ duration: 0.5 }}
					layout
				>
					<IconEdit onClick={() => setIsEditMode(true)} />
					<UserProfileInfo userInfo={userInfo} />
				</motion.div>
				<motion.div
					initial={{ x: '100%' }}
					animate={{ x: isEditMode ? '-200%' : '100%' }}
					transition={{ duration: 0.5 }}
					layout
				>
					<IconX onClick={() => setIsEditMode(false)} />
					<IconDeviceFloppy onClick={() => setIsEditMode(false)} />
					Редактирование Редактирование Редактирование Редактирование
					Редактирование Редактирование Редактирование Редактирование
					Редактирование Редактирование Редактирование Редактирование
				</motion.div>
			</BackgroundGradient>
		</div>
	) : null;
}
