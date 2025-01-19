'use client';

import {
	IconX,
	IconEdit,
	IconDeviceFloppy,
	IconTrash,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import React, { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { UsersService } from '@/app/api/UsersService';
import { BackgroundGradient } from '@/components/lib/BackgroundGradient/BackgroundGradient';
import UserProfileDeleteModal from '@/components/ui/UserProfileDelete/UserProfileDelete';
import UserProfileEdit from '@/components/ui/UserProfileEdit/UserProfileEdit';
import UserProfileInfo from '@/components/ui/UserProfileInfo/UserProfileInfo';
import { showToast } from '@/components/utils/showToast';
import { cn } from '@/lib/utils';
import { selectCurrentUser } from '@/stores/Users/CurrentUserState';
import { UserInfo, UserInfoModel } from '@/types/User/UserInfo';
import eventEmitter, { EmitterEvents } from '@/utils/eventEmitter';
import { validateUserInfoFields } from '@/utils/validateUserInfoFields';

export type ErrorFiled = {
	field: string;
	isError: boolean;
};

export default function Profile({ params }: { params: { id: string } }) {
	const { id } = params;
	const currentUser = useSelector(selectCurrentUser);

	const [isEditMode, setIsEditMode] = useState(false);
	const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
	const [isCurrentUser, setIsCurrentUser] = useState(false);
	const [editedUserInfo, setEditedUserInfo] = useState<UserInfoModel | null>(
		null,
	);
	const [fieldsWithError, setFieldsError] = useState<ErrorFiled[]>([]);

	const setErrorForField = (fieldName: string, isError: boolean) => {
		setFieldsError((prev) => {
			const existingFieldIndex = prev.findIndex(
				(item) => item.field === fieldName,
			);
			if (existingFieldIndex !== -1) {
				const updatedFields = [...prev];
				updatedFields[existingFieldIndex].isError = isError;
				return updatedFields;
			} else {
				return [...prev, { field: fieldName, isError }];
			}
		});
	};

	const changeUserField = (field: Partial<UserInfo>) => {
		setEditedUserInfo((prev) => (prev ? { ...prev, ...field } : null));
	};

	const loadUserInfo = useCallback(
		async (id: string) => {
			try {
				const usersService = new UsersService();
				const user = await usersService.getUserInfo(id);
				setUserInfo(user);
				setIsCurrentUser(user.id === currentUser?.id);
				setEditedUserInfo(user);
			} catch (error: any) {
				if (error.message.includes('EREQUESTPENDING')) {
					return;
				}

				showToast('error', error.message);
			}
		},
		[currentUser],
	);

	const updateUserInfo = useCallback(
		async (editedUserInfo: UserInfoModel): Promise<boolean> => {
			try {
				const usersService = new UsersService();
				const updatedUser = new UserInfo(editedUserInfo);
				await usersService.updateUserInfo(updatedUser);

				return true;
			} catch (error: any) {
				if (!error.message.includes('EREQUESTPENDING')) {
					showToast('error', error.message);
				}

				return false;
			}
		},
		[],
	);

	const handleSaveBtnClick = async () => {
		if (!userInfo || !editedUserInfo) {
			return;
		}

		const { isValid, message, invalidFields } = validateUserInfoFields(
			editedUserInfo.username,
			editedUserInfo.phone,
			editedUserInfo.email,
		);

		if (!isValid) {
			if (invalidFields.includes('username')) {
				setErrorForField('username', true);
			} else {
				setErrorForField('username', false);
			}

			if (invalidFields.includes('phone')) {
				setErrorForField('phone', true);
			} else {
				setErrorForField('phone', false);
			}

			if (invalidFields.includes('email')) {
				setErrorForField('email', true);
			} else {
				setErrorForField('email', false);
			}

			showToast('error', message, 5);
			return;
		}

		setErrorForField('username', false);
		setErrorForField('phone', false);
		setErrorForField('email', false);

		const isInfoUpdated = await updateUserInfo(editedUserInfo);

		if (!isInfoUpdated) {
			return;
		}

		await loadUserInfo(userInfo.id);
		setIsEditMode(false);
	};

	const handleCancelBtnClick = () => {
		setIsEditMode(false);
		setEditedUserInfo(userInfo);
		eventEmitter.emit(EmitterEvents.RESET_EDITED_USER);
	};

	const handleDeleteBtnClick = async () => {
		eventEmitter.emit(EmitterEvents.MODAL_OPEN_USER_PROFILE_DELETE);
	};

	const setUserAvatar = useCallback(
		async (link: string) => {
			if (!userInfo) {
				return;
			}

			const isInfoUpdated = await updateUserInfo({
				...userInfo,
				avatar: link,
			});

			if (!isInfoUpdated) {
				return;
			}

			await loadUserInfo(userInfo.id);
		},
		[loadUserInfo, updateUserInfo, userInfo],
	);

	const deleteUserAvatar = useCallback(async () => {
		if (!userInfo) {
			return;
		}

		const isInfoUpdated = await updateUserInfo({
			...userInfo,
			avatar: null,
		});

		if (!isInfoUpdated) {
			return;
		}

		await loadUserInfo(userInfo.id);
	}, [loadUserInfo, updateUserInfo, userInfo]);

	useEffect(() => {
		loadUserInfo(id);
	}, [id, loadUserInfo]);

	return userInfo ? (
		<div className={cn('flex items-center justify-center', 'w-full h-screen')}>
			<BackgroundGradient
				className={cn(
					'w-[70vw] md:w-[40vw] h-[50vh]',
					'rounded-[22px] bg-zinc-900',
					'overflow-hidden',
				)}
			>
				<AnimatePresence>
					<motion.div
						key={1}
						className={cn(
							'absolute flex p-4 md:p-10 gap-2 sm:gap-4 md:gap-8',
							'w-full',
						)}
						initial={{ x: '0' }}
						animate={{ x: !isEditMode ? '0' : '-120%' }}
						transition={{ duration: 0.5 }}
					>
						{isCurrentUser && (
							<>
								<IconEdit
									className={cn('absolute right-4 top-4 cursor-pointer')}
									onClick={() => setIsEditMode(true)}
								/>
								<IconTrash
									className={cn('absolute right-4 bottom-4 cursor-pointer')}
									onClick={handleDeleteBtnClick}
								/>
							</>
						)}

						<UserProfileInfo
							userInfo={userInfo}
							setUserAvatar={setUserAvatar}
							deleteUserAvatar={deleteUserAvatar}
						/>
					</motion.div>
					{isCurrentUser && editedUserInfo && (
						<motion.div
							key={2}
							className={cn('absolute flex p-4 md:p-10', 'w-full')}
							initial={{ x: '120%' }}
							animate={{ x: isEditMode ? '0%' : '120%' }}
							transition={{ duration: 0.5 }}
						>
							<div
								className={cn(
									'absolute z-10 top-0 left-0 p-4',
									'flex justify-between w-full bg-zinc-900',
								)}
							>
								<IconX
									className={'cursor-pointer'}
									onClick={handleCancelBtnClick}
								/>
								<IconDeviceFloppy
									className={'cursor-pointer'}
									onClick={handleSaveBtnClick}
								/>
							</div>
							<UserProfileEdit
								userInfo={userInfo}
								editedUserInfo={editedUserInfo}
								changeUserField={changeUserField}
								fieldsWithError={fieldsWithError}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</BackgroundGradient>

			<UserProfileDeleteModal />
		</div>
	) : null;
}
