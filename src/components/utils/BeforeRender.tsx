'use client';

import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import RenderIf from '@/components/utils/RenderIf';
import useAuthorization from '@/hooks/useAuthorization';
import { selectCurrentUser } from '@/stores/Users/CurrentUserState';

type Props = {
	children: React.ReactNode;
};

const BeforeRender: React.FC<Props> = ({ children }) => {
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

export default BeforeRender;
