'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUserAction,
	selectCurrentUser,
	selectIsAuthorized,
} from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api';
import { showToast } from '@/shared/lib';
import { TLink } from '@/widgets/sidebar/model';
import {
	chats,
	logo,
	profile,
	logout as logoutLink,
} from '@/widgets/sidebar/ui';

export const useSidebar = () => {
	const dispatch = useDispatch();

	const authorizationService = new AuthorizationService();

	const isAuthorized = useSelector(selectIsAuthorized);
	const currentUser = useSelector(selectCurrentUser);

	const [open, setOpen] = useState(false);

	const logout = async () => {
		try {
			await authorizationService.logout();
			dispatch(deleteUserAction());
		} catch (error: unknown) {
			if (error instanceof Error) {
				showToast('error', error.message);
			} else {
				showToast('error', 'Ошибка при выполнеии действия');
			}
		}
	};

	const logoLink: TLink = logo;
	const upperLinks: TLink[] = [chats, profile(currentUser)];
	const downLinks: TLink[] = [logoutLink(logout)];

	return {
		isAuthorized,
		logoLink,
		upperLinks,
		downLinks,
		open,
		setOpen,
	};
};
