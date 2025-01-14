import React from 'react';
import { Input } from '@/components/lib/Input/Input';
import { Label } from '@/components/lib/Label/Label';
import LabelInputContainer from '@/components/ui/LabelInputContainer/LabelInputContainer';
import { cn } from '@/lib/utils';
import { UserInfo } from '@/types/User/UserInfo';

type Props = {
	userInfo: UserInfo;
};

const UserProfileEdit: React.FC<Props> = ({ userInfo }) => {
	return (
		<div className={cn('flex flex-col gap-2 w-full h-[350px] overflow-y-auto')}>
			<LabelInputContainer className='my-2 mb-8'>
				<Label htmlFor='password_confirm'>Имя пользователя</Label>
				<Input
					id='username'
					placeholder='Tyler'
					type='text'
					value={userInfo.username}
					// isError={passwordConfirmError}
					// onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
			</LabelInputContainer>
			<LabelInputContainer className='my-2 mb-8'>
				<Label htmlFor='password_confirm'>Имя пользователя</Label>
				<Input
					id='username'
					placeholder='Tyler'
					type='text'
					value={userInfo.username}
					// isError={passwordConfirmError}
					// onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
			</LabelInputContainer>
			<LabelInputContainer className='my-2 mb-8'>
				<Label htmlFor='password_confirm'>Имя пользователя</Label>
				<Input
					id='username'
					placeholder='Tyler'
					type='text'
					value={userInfo.username}
					// isError={passwordConfirmError}
					// onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
			</LabelInputContainer>
			<LabelInputContainer className='my-2 mb-8'>
				<Label htmlFor='password_confirm'>Идентификатор</Label>
				<Input
					id='username'
					placeholder='Tyler'
					type='text'
					value={userInfo.userId}
					// isError={passwordConfirmError}
					// onChange={(e) => setPasswordConfirm(e.target.value)}
				/>
			</LabelInputContainer>
		</div>
	);
};

export default UserProfileEdit;
