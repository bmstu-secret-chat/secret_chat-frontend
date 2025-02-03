'use client';

import { OTPProps } from 'antd/es/input/OTP';
import dayjs from 'dayjs';
import React, { useCallback, useEffect, useState } from 'react';
import { TUserInfoModel, UserInfo } from '@/entities/user/model';
import { ErrorFiled } from '@/features/profile/model/useProfile';
import { EmitterEvents, eventEmitter, formatDateDDMMYYYY } from '@/shared/lib';

export const useProfileEdit = (
	userInfo: TUserInfoModel,
	editedUserInfo: TUserInfoModel,
	fieldsWithError: ErrorFiled[],
	changeUserField: (field: Partial<UserInfo>) => void,
) => {
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

	return {
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
	};
};
