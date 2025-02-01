import { IconLogout2 } from '@tabler/icons-react';
import React from 'react';
import { UserInfo } from '@/entities/user/model';

export const profile = (currentUser: UserInfo | null) => ({
	label: 'Profile',
	href: currentUser ? `/profile/${currentUser.id}` : '#',
	icon: (
		<IconLogout2 className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
	),
});
