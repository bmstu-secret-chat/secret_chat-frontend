import Link from 'next/link';
import React, { memo } from 'react';
import { userDefaultAvatar } from '@/assets';
import { TUserShortInfoModel } from '@/entities/user/model';
import { cn } from '@/shared/lib';

type Props = {
	user: TUserShortInfoModel;
};

export const UserItem: React.FC<Props> = memo(({ user }: Props) => {
	return (
		<Link
			href={`/profile/${user.id}`}
			className={cn(
				'flex justify-start items-center h-[100px] p-8',
				'gap-4',
				'border-b border-neutral-700 overflow-hidden pc:hover:bg-black',
				'text-white',
			)}
		>
			<img
				className={'rounded-md bg-gray-300 w-[50px] h-[50px] object-cover'}
				src={user.avatar || userDefaultAvatar.src}
				alt={user.username}
			/>
			{user.username}
		</Link>
	);
});

UserItem.displayName = 'UserItem';
