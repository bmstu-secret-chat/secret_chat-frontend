import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UsersService } from '@/entities/user/api';
import {
	UserInfo,
	TUserInfoModel,
	selectCurrentUser,
} from '@/entities/user/model';
import { showToast, eventEmitter, EmitterEvents } from '@/shared/lib';
import { validateUserInfoFields } from '../lib';

export type ErrorFiled = {
	field: string;
	isError: boolean;
};

export const useProfile = (id: string) => {
	const currentUser = useSelector(selectCurrentUser);

	const [isEditMode, setIsEditMode] = useState(false);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [editedUserInfo, setEditedUserInfo] = useState<TUserInfoModel | null>(
		null,
	);
	const [fieldsWithError, setFieldsError] = useState<ErrorFiled[]>([]);

	const loadUserInfo = useCallback(
		async (id: string) => {
			try {
				const usersService = new UsersService();
				const user = await usersService.getUserInfo(id);
				setUserInfo(user);
				setIsCurrentUser(user.id === currentUser?.id);
				setEditedUserInfo(user);
			} catch (error: any) {
				showToast('error', error.message);
			}
		},
		[currentUser],
	);

	const updateUserInfo = useCallback(async (editedUserInfo: TUserInfoModel) => {
		try {
			const usersService = new UsersService();
			const updatedUser = new UserInfo(editedUserInfo);
			await usersService.updateUserInfo(updatedUser);

			return true;
		} catch (error: any) {
			showToast('error', error.message);

			return false;
		}
	}, []);

	const handleSaveBtnClick = async () => {
		if (!userInfo || !editedUserInfo) return;

		const { isValid, message, invalidFields } = validateUserInfoFields(
			editedUserInfo.username,
			editedUserInfo.phone,
			editedUserInfo.email,
		);

		if (!isValid) {
			setFieldsError(
				['username', 'phone', 'email'].map((field) => ({
					field,
					isError: invalidFields.includes(field),
				})),
			);
			showToast('error', message, 5);

			return;
		}

		const isInfoUpdated = await updateUserInfo(editedUserInfo);
		if (isInfoUpdated) {
			await loadUserInfo(userInfo.id);
			setIsEditMode(false);
		}
	};

	const handleCancelBtnClick = () => {
		setIsEditMode(false);
		setEditedUserInfo(userInfo);
		eventEmitter.emit(EmitterEvents.RESET_EDITED_USER);
	};

	const handleDeleteBtnClick = () => {
		eventEmitter.emit(EmitterEvents.MODAL_OPEN_USER_PROFILE_DELETE);
	};

	useEffect(() => {
		loadUserInfo(id);
	}, [id, loadUserInfo]);

	return {
		currentUser,
		userInfo,
		isEditMode,
		isCurrentUser,
		editedUserInfo,
		fieldsWithError,
		setIsEditMode,
		setUserAvatar: useCallback(
			(link: string) =>
				userInfo && updateUserInfo({ ...userInfo, avatar: link }),
			[userInfo, updateUserInfo],
		),
		deleteUserAvatar: useCallback(
			() => userInfo && updateUserInfo({ ...userInfo, avatar: null }),
			[userInfo, updateUserInfo],
		),
		handleSaveBtnClick,
		handleCancelBtnClick,
		handleDeleteBtnClick,
		changeUserField: (field: Partial<UserInfo>) =>
			setEditedUserInfo((prev) => (prev ? { ...prev, ...field } : null)),
	};
};
