import { IconLogout2 } from '@tabler/icons-react';
import React from 'react';

export const logout = (action: () => Promise<void>) => ({
	label: 'Выйти',
	href: '/login',
	action,
	icon: (
		<IconLogout2 className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
	),
});
