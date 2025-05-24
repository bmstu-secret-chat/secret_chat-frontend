import { Input as AntInput } from 'antd';
import React from 'react';
import { UserInfo, TUserInfoModel } from '@/entities/user/model';
import { ErrorFiled, useProfileEdit } from '@/features/profile/model';
import { cn } from '@/shared/lib';
import { Input, Label, LabelInputContainer, TextArea } from '@/shared/ui';
import { DatePicker } from '@/shared/ui/datePicker/DatePicker';

type Props = {
	userInfo: TUserInfoModel;
	editedUserInfo: TUserInfoModel;
	changeUserField: (field: Partial<UserInfo>) => void;
	fieldsWithError: ErrorFiled[];
};

export const ProfileEdit: React.FC<Props> = ({
	userInfo,
	editedUserInfo,
	changeUserField,
	fieldsWithError,
}) => {
	const {
		username,
		usernameError,
		phoneError,
		sharedProps,
		email,
		emailError,
		aboutMe,
		birthday,
		handleUsernameChange,
		handleUsernameBlur,
		handleEmailChange,
		handleEmailBlur,
		handleAboutMeChange,
		handleAboutMeBlur,
		handleBirthdayChange,
	} = useProfileEdit(
		userInfo,
		editedUserInfo,
		fieldsWithError,
		changeUserField,
	);

	return (
		<div
			className={cn(
				'flex flex-col gap-2 w-full mt-8 px-4 overflow-y-auto',
				'h-[calc(50vh-4rem)] md:h-[calc(50vh-7rem)]',
			)}
		>
			<LabelInputContainer className='my-2'>
				<Label htmlFor='password_confirm'>Имя пользователя</Label>
				<Input
					id='username'
					placeholder='Tyler'
					type='text'
					value={username}
					isError={usernameError}
					onChange={handleUsernameChange}
					onBlur={handleUsernameBlur}
				/>
			</LabelInputContainer>

			<LabelInputContainer className='my-2'>
				<Label htmlFor='phone'>Номер телефона (8‑123‑456‑78‑90)</Label>
				<AntInput.OTP
					disabled
					length={11}
					variant='filled'
					type={'number'}
					style={phoneError ? { border: '1px solid red', borderRadius: 4 } : {}}
					{...sharedProps}
				/>
			</LabelInputContainer>

			<LabelInputContainer className='my-2 cursor-not-allowed pointer-events-none'>
				<Label htmlFor='email'>Почта</Label>
				<Input
					disabled
					id='email'
					placeholder='projectmayhem@fc.com'
					type='email'
					value={email}
					isError={emailError}
					onChange={handleEmailChange}
					onBlur={handleEmailBlur}
				/>
			</LabelInputContainer>

			<LabelInputContainer className='my-2'>
				<Label htmlFor='about_me'>О себе</Label>
				<TextArea
					id='about_me'
					placeholder='Герой нашего времени'
					value={aboutMe || ''}
					onChange={handleAboutMeChange}
					onBlur={handleAboutMeBlur}
				/>
			</LabelInputContainer>

			<LabelInputContainer className='my-2'>
				<Label htmlFor='date_of_birth'>Дата рождения</Label>
				<DatePicker
					defaultValue={birthday}
					onChange={handleBirthdayChange}
				/>
			</LabelInputContainer>
		</div>
	);
};
