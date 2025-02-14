import { IconMessages } from '@tabler/icons-react';
import React from 'react';
import { TLink } from '@/widgets/sidebar/model';

export const chats = (action: () => void): TLink => ({
	label: 'Чаты',
	href: '/chats',
	action,
	icon: (
		<IconMessages className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0' />
	),
});
