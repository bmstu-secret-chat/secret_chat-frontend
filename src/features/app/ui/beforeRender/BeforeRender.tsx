'use client';

import React from 'react';
import { useBeforeRender } from '@/features/app/model';
import { RenderIf } from '@/shared/utils';

type Props = {
	children: React.ReactNode;
};

export const BeforeRender: React.FC<Props> = ({ children }) => {
	const { canRender, user } = useBeforeRender();

	return (
		<RenderIf
			condition={canRender}
			className={user ? 'ml-[60px] ' : ''}
		>
			{children}
		</RenderIf>
	);
};
