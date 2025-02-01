'use client';

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
	deleteUserAction,
	selectCurrentUser,
	selectIsAuthorized,
} from '@/entities/user/model';
import { AuthorizationService } from '@/shared/api/AuthorizationService';
import { showToast } from '@/shared/lib';
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
		} catch (error: any) {
			showToast('error', error.message);
		}
	};

	const logoLink = logo;
	const upperLinks = [chats, profile(currentUser)];
	const downLinks = [logoutLink(logout)];

	return {
		isAuthorized,
		logoLink,
		upperLinks,
		downLinks,
		open,
		setOpen,
	};
};
