import { Image } from 'antd';
import React from 'react';
import { useSelector } from 'react-redux';
import userDefaultAvatar from '@/assets/images/user-default-avatar.png';
import LabelValue from '@/components/ui/LabelValue/LabelValue';
import UploadImage from '@/components/ui/UploadImage/UploadImage';
import { cn } from '@/lib/utils';
import { selectCurrentUser } from '@/stores/Users/CurrentUserState';
import { UserInfo } from '@/types/User/UserInfo';

type Props = {
	userInfo: UserInfo;
	setUserAvatar: (link: string) => void;
	deleteUserAvatar: () => void;
};

const UserProfileInfo: React.FC<Props> = ({
	userInfo,
	setUserAvatar,
	deleteUserAvatar,
}) => {
	const currentUser = useSelector(selectCurrentUser);
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

export default UserProfileInfo;
