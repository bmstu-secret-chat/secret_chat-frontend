import React from 'react';
import { cn } from '@/lib/utils';
import { UserInfo } from '@/types/User/UserInfo';

type Props = {
	userInfo: UserInfo;
};

const UserProfileInfo: React.FC<Props> = ({ userInfo }) => {
	return <div style={{ height: 100 }}>{JSON.stringify(userInfo)}</div>;
};

export default UserProfileInfo;
