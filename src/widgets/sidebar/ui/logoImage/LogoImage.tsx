import React from 'react';
import safeChat from '@/assets/images/safe-chat.png';

export const LogoImage = () => {
	return (
		<img
			src={safeChat.src}
			alt={'safe chat'}
			className='text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0'
		/>
	);
};
