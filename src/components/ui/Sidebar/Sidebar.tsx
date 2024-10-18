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
import { cn } from '@/lib/utils';

export const Sidebar = () => {
	const links = [
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
			href: '#',
			icon: (
				<IconSettings className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
		{
			label: 'Logout',
			href: '#',
			icon: (
				<IconArrowLeft className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
			),
		},
	];

	const [open, setOpen] = useState(false);

	return (
		<div
			className={cn(
				'rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-neutral-500 flex-1 mx-auto border border-neutral-200 dark:border-neutral-700 overflow-hidden',
			)}
		>
			<SidebarLib
				open={open}
				setOpen={setOpen}
			>
				<SidebarBody className='justify-between gap-10'>
					<div className='flex flex-col flex-1 overflow-y-auto overflow-x-hidden'>
						<div className='mt-8 flex flex-col gap-2'>
							{links.map((link, idx) => (
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
