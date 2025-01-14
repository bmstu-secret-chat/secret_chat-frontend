'use client';

import { IconX, IconEdit, IconDeviceFloppy } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { UsersService } from '@/app/api/UsersService';
import { BackgroundGradient } from '@/components/lib/BackgroundGradient/BackgroundGradient';
import UserProfileEdit from '@/components/ui/UserProfileEdit/UserProfileEdit';
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
		<div className={cn('flex items-center justify-center', 'w-full h-screen')}>
			<BackgroundGradient
				className={cn(
					'w-[70vw] sm:w-[40vw] min-h-[450px]',
					'rounded-[22px] bg-white dark:bg-zinc-900',
					'overflow-hidden',
				)}
			>
				<motion.div
					className={cn('absolute flex p-4 sm:p-10 ', 'w-full')}
					initial={{ x: '0' }}
					animate={{ x: !isEditMode ? '0' : '-120%' }}
					transition={{ duration: 0.5 }}
				>
					<IconEdit onClick={() => setIsEditMode(true)} />
					<UserProfileInfo userInfo={userInfo} />
				</motion.div>
				<motion.div
					className={cn('absolute p-4 sm:p-10 ', 'w-full')}
					initial={{ x: '120%' }}
					animate={{ x: isEditMode ? '0%' : '120%' }}
					transition={{ duration: 0.5 }}
				>
					<IconX onClick={() => setIsEditMode(false)} />
					<IconDeviceFloppy onClick={() => setIsEditMode(false)} />
					<UserProfileEdit userInfo={userInfo} />
				</motion.div>
			</BackgroundGradient>
		</div>
	) : null;
}
