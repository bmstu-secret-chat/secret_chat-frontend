'use client';

import React, { useEffect, useState } from 'react';
import RenderIf from '@/components/utils/RenderIf';
import useAuthorization from '@/hooks/useAuthorization';

type Props = {
	children: React.ReactNode;
};

const BeforeRender: React.FC<Props> = ({ children }) => {
	const { checkAuthorization } = useAuthorization();

	const [canRender, setCanRender] = useState(false);

	const beforeRender = async () => {
		await checkAuthorization();
		setCanRender(true);
	};

	useEffect(() => {
		beforeRender();

		// Монтирование
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return <RenderIf condition={canRender}>{children}</RenderIf>;
};

export default BeforeRender;
