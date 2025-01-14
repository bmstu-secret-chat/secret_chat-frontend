import React from 'react';
import LabelValue from '@/components/ui/LabelValue/LabelValue';
import { cn } from '@/lib/utils';
import { UserInfo } from '@/types/User/UserInfo';

type Props = {
	userInfo: UserInfo;
};

const UserProfileInfo: React.FC<Props> = ({ userInfo }) => {
	const userFields = [
		{
			label: 'Имя пользователя',
			value: userInfo.username,
		},
		{
			label: 'Имя пользователя',
			value: userInfo.username,
		},
		{
			label: 'Имя пользователя',
			value: userInfo.username,
		},
		{
			label: 'Имя пользователя',
			value: userInfo.username,
		},
		{
			label: 'Имя пользователя',
			value: userInfo.username,
		},
		{
			label: 'Идентификатор',
			value: userInfo.userId,
		},
	];

	return (
		<div className={cn('flex flex-col gap-2 w-full h-[350px] overflow-y-auto')}>
			{userFields.map((item, index) => (
				<LabelValue
					key={index}
					item={item}
				/>
			))}
		</div>
	);
};

export default UserProfileInfo;
