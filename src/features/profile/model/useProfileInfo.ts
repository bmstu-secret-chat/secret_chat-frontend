import { UserInfo } from '@/entities/user/model';
import { formatLastOnline } from '@/shared/lib';

export const useProfileInfo = (
	userInfo: UserInfo,
	currentUser: UserInfo | null,
) => {
	const isCurrentUser = userInfo.id === currentUser?.id;

	const upperFields = [
		{
			label:
				isCurrentUser || userInfo.isOnline
					? 'В сети'
					: `Заходил(а) \n ${formatLastOnline(userInfo.lastOnline)}`,
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

	return { isCurrentUser, upperFields, downFields };
};
