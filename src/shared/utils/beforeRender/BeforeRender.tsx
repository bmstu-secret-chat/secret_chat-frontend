'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '@/entities/user/model';
import useAuthorization from '@/hooks/useAuthorization';
import { RenderIf } from '@/shared/utils';

type Props = {
	children: React.ReactNode;
};

export const BeforeRender: React.FC<Props> = ({ children }) => {
	const user = useSelector(selectCurrentUser);

	const { checkAuthorization } = useAuthorization();

	const [canRender, setCanRender] = useState(false);

	const beforeRender = async () => {
		await checkAuthorization();
		setTimeout(() => setCanRender(true), 500);
	};

	useEffect(() => {
		beforeRender();

		// Монтирование
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<RenderIf
			condition={canRender}
			className={user ? 'ml-[60px] ' : ''}
		>
			{children}
		</RenderIf>
	);
};
