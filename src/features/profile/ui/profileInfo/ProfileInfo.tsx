import { Image } from 'antd';
import React from 'react';
import { userDefaultAvatar } from '@/assets';
import { UserInfo } from '@/entities/user/model';
import { cn } from '@/shared/lib';
import { LabelValue, UploadImage } from '@/shared/ui';

type Props = {
	userInfo: UserInfo;
	currentUser: UserInfo | null;
	setUserAvatar: (link: string) => void;
	deleteUserAvatar: () => void;
};

export const ProfileInfo: React.FC<Props> = ({
	userInfo,
	currentUser,
	setUserAvatar,
	deleteUserAvatar,
}) => {
	const isCurrentUser = userInfo.id === currentUser?.id;

	const upperFields = [
		{
			label: 'Имя пользователя',
			value: userInfo.username,
		},
	].filter((item) => item.value);

	const downFields = [
		{
			label: 'Телефон',
			value: userInfo.phone,
		},
		{
			label: 'Почта',
			value: userInfo.email,
		},
		{
			label: 'О себе',
			value: userInfo.aboutMe,
		},
		{
			label: 'Дата рождения',
			value: userInfo.birthday,
		},
	].filter((item) => item.value);

	return (
		<div
			className={cn(
				'flex flex-col gap-4 px-4 w-full overflow-y-auto',
				'h-[calc(50vh-2rem)] sm:h-[calc(50vh-5rem)]',
			)}
		>
			<div className={cn('flex items-center gap-4')}>
				<div className={'w-1/4'}>
					{isCurrentUser ? (
						<UploadImage
							initialFile={userInfo.avatar}
							setLink={setUserAvatar}
							removeLink={deleteUserAvatar}
						/>
					) : (
						<Image src={userInfo.avatar || userDefaultAvatar.src} />
					)}
				</div>

				<div className={'w-3/4'}>
					{upperFields.map((item, index) => (
						<LabelValue
							key={index}
							item={item}
						/>
					))}
				</div>
			</div>

			{downFields.map((item, index) => (
				<LabelValue
					key={index}
					item={item}
				/>
			))}
		</div>
	);
};
