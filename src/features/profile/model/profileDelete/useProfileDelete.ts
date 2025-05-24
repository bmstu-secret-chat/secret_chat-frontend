'use client';

import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UsersService } from '@/entities/user/api';
import {
	deleteMyPublicKeyAction,
	deleteUserAction,
	UserInfo,
} from '@/entities/user/model';
import { EmitterEvents, eventEmitter, showError } from '@/shared/lib';

export const useProfileDelete = (currentUser: UserInfo | null) => {
	const router = useRouter();
	const dispatch = useDispatch();

	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const deleteUserAccount = useCallback(
		async (userId: string) => {
			const usersService = new UsersService();

			try {
				await usersService.deleteUserAccount(userId);
				dispatch(deleteUserAction());
				dispatch(deleteMyPublicKeyAction());
			} catch (error) {
				showError(error);
			}
		},
		[dispatch],
	);

	const deleteUser = useCallback(async (): Promise<boolean> => {
		if (!currentUser) {
			return false;
		}

		setIsFetching(true);

		try {
			await deleteUserAccount(currentUser.id);
			return true;
		} catch (error) {
			showError(error);

			return false;
		} finally {
			setIsFetching(false);
		}
	}, [deleteUserAccount, currentUser]);

	const handleOk = useCallback(async () => {
		const isQuerySuccess = await deleteUser();

		if (!isQuerySuccess) {
			return;
		}

		setIsOpen(false);

		router.push('/login');
	}, [deleteUser, router]);

	const handleCancel = useCallback(() => {
		setIsOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	useEffect(() => {
		eventEmitter.on(EmitterEvents.MODAL_OPEN_USER_PROFILE_DELETE, openModal);

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_USER_PROFILE_DELETE, openModal);
		};
	}, [openModal]);

	return {
		isOpen,
		isFetching,
		handleOk,
		handleCancel,
	};
};
