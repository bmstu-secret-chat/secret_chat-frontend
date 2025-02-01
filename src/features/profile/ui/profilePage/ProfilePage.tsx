import {
	IconX,
	IconEdit,
	IconDeviceFloppy,
	IconTrash,
} from '@tabler/icons-react';
import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import { useProfile } from '@/features/profile/model';
import { ProfileEdit, ProfileInfo, ProfileDelete } from '@/features/profile/ui';
import { cn } from '@/shared/lib';
import { BackgroundGradient } from '@/shared/ui';

export const ProfilePage = ({ userId }: { userId: string }) => {
	const {
		currentUser,
		userInfo,
		isEditMode,
		isCurrentUser,
		editedUserInfo,
		fieldsWithError,
		setIsEditMode,
		setUserAvatar,
		deleteUserAvatar,
		handleSaveBtnClick,
		handleCancelBtnClick,
		handleDeleteBtnClick,
		changeUserField,
	} = useProfile(userId);

	if (!userInfo) return null;

	return (
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

						<ProfileInfo
							userInfo={userInfo}
							currentUser={currentUser}
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
							<ProfileEdit
								userInfo={userInfo}
								editedUserInfo={editedUserInfo}
								changeUserField={changeUserField}
								fieldsWithError={fieldsWithError}
							/>
						</motion.div>
					)}
				</AnimatePresence>
			</BackgroundGradient>

			<ProfileDelete currentUser={currentUser} />
		</div>
	);
};
