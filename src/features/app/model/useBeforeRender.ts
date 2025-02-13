'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser, setUserAction } from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api';

export const useBeforeRender = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectCurrentUser);

	const [canRender, setCanRender] = useState(false);

	const authorizationService = new AuthorizationService();

	const checkAuthorization = async () => {
		try {
			const user = await authorizationService.check();
			dispatch(setUserAction(user));
		} catch {
			// TODO
		}
	};

	const beforeRender = async () => {
		await checkAuthorization();
		// Даем всем настройкам установиться, затем пропускаем дальше
		setTimeout(() => setCanRender(true), 500);
	};

	useEffect(() => {
		beforeRender();

		// Монтирование
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return { canRender, user };
};
