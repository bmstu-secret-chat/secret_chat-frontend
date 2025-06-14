'use client';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UsersService } from '@/entities/user/api';
import {
	selectCurrentUser,
	setMyPublicKeyAction,
	setUserAction,
} from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api';
import { showError, SafeChatDB } from '@/shared/lib';

export const useBeforeRender = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectCurrentUser);

	const [canRender, setCanRender] = useState(false);

	const authorizationService = new AuthorizationService();
	const usersService = new UsersService();

	const checkAuthorization = async () => {
		try {
			const user = await authorizationService.check();
			const myPublicKey = await usersService.getPublicKey(user.id);

			dispatch(setUserAction(user));
			dispatch(setMyPublicKeyAction(myPublicKey));
		} catch {
			// TODO
		}
	};

	const beforeRender = async () => {
		// Подключение к БД
		try {
			const db = new SafeChatDB();
			await db.init();
		} catch (error) {
			showError(error);
		}

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
