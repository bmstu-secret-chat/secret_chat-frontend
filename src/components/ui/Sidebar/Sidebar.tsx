'use client';

import {
	IconArrowLeft,
	IconBrandTabler,
	IconSettings,
	IconUserBolt,
} from '@tabler/icons-react';
import React, { useState } from 'react';
import {
	SidebarLib,
	SidebarBody,
	SidebarLink,
} from '@/components/lib/Sidebar/Sidebar';
import useAuthorization from '@/hooks/useAuthorization';
import { cn } from '@/lib/utils';

export const Sidebar = () => {
	const { logout } = useAuthorization();

	const upperLinks = [
		{
			label: 'Chats',
			href: '/chats',
			icon: (
				<IconBrandTabler className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Profile',
			href: '#',
			icon: (
				<IconUserBolt className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Settings',
			href: '/login',
			icon: (
				<IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
	];

	const downLinks = [
		{
			label: 'Logout',
			href: '/signup',
			action: logout,
			icon: (
				<IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				'top-0 left-0 rounded-md fixed z-10 h-screen flex flex-col md:flex-row',
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
	);
};
