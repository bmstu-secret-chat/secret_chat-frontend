import { Button, Image } from 'antd';
import React from 'react';
import { userDefaultAvatar } from '@/assets';
import { UserInfo } from '@/entities/user/model';
import {
	useCreateChat,
	useCreateSecretChat,
	useProfileInfo,
} from '@/features/profile/model';
import { cn } from '@/shared/lib';
import { LabelValue, UploadImage } from '@/shared/ui';
import { RenderIf } from '@/shared/utils';

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
	const { isCurrentUser, upperFields, downFields } = useProfileInfo(
		userInfo,
		currentUser,
	);

	const { createChat } = useCreateChat();
	const { isFetching: isSecretChatFetching, createSecretChat } =
		useCreateSecretChat();

	return (
		<div
			className={cn(
				'flex flex-col gap-4 px-4 w-full overflow-y-auto',
				'h-[calc(50vh-2rem)] sm:h-[calc(50vh-5rem)]',
			)}
		>
			<div className={cn('flex items-center gap-4')}>
				<div className={'w-1/4 min-w-[80px]'}>
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

			<RenderIf
				condition={!isCurrentUser}
				className={'flex flex-col justify-center w-max gap-3'}
			>
				<button
					className={cn(
						'inline-flex animate-shimmer items-center justify-center',
						'rounded-[8px] border border-slate-800 transition-colors',
						'bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)]',
						'bg-[length:200%_100%] font-medium text-slate-400',
						'w-full flex-grow h-10',
					)}
					onClick={() => createChat(userInfo.id)}
				>
					Написать сообщение
				</button>
				<Button
					className={'py-2 px-4'}
					type={'default'}
					size={'large'}
					loading={isSecretChatFetching}
					onClick={() => createSecretChat(userInfo.id)}
				>
					Создать секретный чат
				</Button>
			</RenderIf>

			{downFields.map((item, index) => (
				<LabelValue
					key={index}
					item={item}
				/>
			))}
		</div>
	);
};
