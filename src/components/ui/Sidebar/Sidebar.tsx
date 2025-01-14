'use client';

import { IconArrowLeft, IconUserCog, IconMessages } from '@tabler/icons-react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import {
	SidebarLib,
	SidebarBody,
	SidebarLink,
} from '@/components/lib/Sidebar/Sidebar';
import useAuthorization from '@/hooks/useAuthorization';
import { cn } from '@/lib/utils';
import {
	selectCurrentUser,
	selectIsAuthorized,
} from '@/stores/Users/CurrentUserState';

export const Sidebar = () => {
	const isAuthorized = useSelector(selectIsAuthorized);
	const currentUser = useSelector(selectCurrentUser);

	const { logout } = useAuthorization();

	const upperLinks = [
		{
			label: 'Chats',
			href: '/chats',
			icon: (
				<IconMessages className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Profile',
			href: currentUser ? `/profile/${currentUser.userId}` : '#',
			icon: (
				<IconUserCog className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
	];

	const downLinks = [
		{
			label: 'Logout',
			href: '/login',
			action: logout,
			icon: (
				<IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
	];

	const [open, setOpen] = useState(false);

	return isAuthorized ? (
		<div
			className={cn(
				'top-0 left-0 rounded-md fixed z-[100] h-screen flex flex-col md:flex-row',
				'mx-auto border border-neutral-700 overflow-hidden',
			)}
		>
			<SidebarLib
				open={open}
				setOpen={setOpen}
			>
				<SidebarBody className='justify-between gap-10'>
					<div className='flex flex-col flex-1 justify-between overflow-hidden'>
						<div className='mt-8 flex flex-col gap-2'>
							{upperLinks.map((link, idx) => (
								<SidebarLink
									key={idx}
									link={link}
								/>
							))}
						</div>
						<div className='mb-16 flex flex-col gap-2'>
							{downLinks.map((link, idx) => (
								<SidebarLink
									key={idx}
									link={link}
								/>
							))}
						</div>
					</div>
				</SidebarBody>
			</SidebarLib>
		</div>
	) : null;
};
