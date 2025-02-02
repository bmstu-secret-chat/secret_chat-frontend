import { Input as AntInput } from 'antd';
import { OTPProps } from 'antd/es/input/OTP';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { UserInfo, TUserInfoModel } from '@/entities/user/model';
import { ErrorFiled } from '@/features/profile/model';
import { cn, eventEmitter, EmitterEvents } from '@/shared/lib';
import { formatDateDDMMYYYY } from '@/shared/lib/formatTime';
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
	const [username, setUsername] = useState(editedUserInfo.username);
	const [phone, setPhone] = useState(editedUserInfo.phone);
	const [email, setEmail] = useState(editedUserInfo.email);
	const [aboutMe, setAboutMe] = useState(editedUserInfo.aboutMe);
	const [birthday, setBirthday] = useState(editedUserInfo.birthday);

	const usernameError = fieldsWithError.find(
		(field) => field.field === 'username',
	)?.isError;
	const phoneError = fieldsWithError.find(
		(field) => field.field === 'phone',
	)?.isError;
	const emailError = fieldsWithError.find(
		(field) => field.field === 'email',
	)?.isError;

	// Change handlers
	// -------------------
	const handleUsernameChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setUsername(e.target.value);
		},
		[],
	);

	const handlePhoneChange = useCallback(
		(value: string) => {
			changeUserField({ phone: value });
		},
		[changeUserField],
	);

	const handleEmailChange = useCallback(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setEmail(e.target.value);
		},
		[],
	);

	const handleAboutMeChange = useCallback(
		(e: React.ChangeEvent<HTMLTextAreaElement>) => {
			const value = e.target.value;
			setAboutMe(value.length > 0 ? value : null);
		},
		[],
	);

	const handleBirthdayChange = useCallback(
		(rawDate: dayjs.Dayjs) => {
			const date = rawDate ? formatDateDDMMYYYY(rawDate) : null;
			changeUserField({ birthday: date });
		},
		[changeUserField],
	);

	// Blur handlers
	// -------------------
	const handleUsernameBlur = useCallback(() => {
		changeUserField({ username });
	}, [changeUserField, username]);

	const handleEmailBlur = useCallback(() => {
		changeUserField({ email });
	}, [changeUserField, email]);

	const handleAboutMeBlur = useCallback(() => {
		changeUserField({ aboutMe });
	}, [changeUserField, aboutMe]);

	const handleReset = useCallback(() => {
		setUsername(userInfo.username);
		setPhone(userInfo.phone);
		setEmail(userInfo.email);
		setAboutMe(userInfo.aboutMe);
		setBirthday(userInfo.birthday);
	}, [userInfo]);

	const sharedProps: OTPProps = {
		onChange: handlePhoneChange,
		value: phone,
	};

	useEffect(() => {
		eventEmitter.on(EmitterEvents.RESET_EDITED_USER, handleReset);

		return () => {
			eventEmitter.off(EmitterEvents.RESET_EDITED_USER, handleReset);
		};
	}, [handleReset]);

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
					length={11}
					variant='filled'
					type={'number'}
					style={phoneError ? { border: '1px solid red', borderRadius: 4 } : {}}
					{...sharedProps}
				/>
			</LabelInputContainer>

			<LabelInputContainer className='my-2'>
				<Label htmlFor='email'>Почта</Label>
				<Input
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
