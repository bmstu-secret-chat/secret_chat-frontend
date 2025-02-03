import {
	isEmailCorrect,
	isUsernameCorrect,
	ValidationResponse,
} from '@/shared/lib';

const isPhoneNumberCorrect = (phoneNumber: string): boolean => {
	return /^8\d{10}$/.test(phoneNumber);
};

export const validateUserInfoFields = (
	username?: string,
	phone?: string,
	email?: string,
): ValidationResponse => {
	const usernameTrimmed = username?.trim();
	const emailTrimmed = email?.trim();

	if (!usernameTrimmed || !isUsernameCorrect(usernameTrimmed)) {
		return {
			isValid: false,
			message:
				'Имя должно быть не короче 4 символов и содержать только латиницу и цифры',
			invalidFields: ['username'],
		};
	}

	if (!phone || !isPhoneNumberCorrect(phone)) {
		return {
			isValid: false,
			message: 'Телефон должен состоять из 11 цифр и начинаться на "8"',
			invalidFields: ['phone'],
		};
	}

	if (!emailTrimmed || !isEmailCorrect(emailTrimmed)) {
		return {
			isValid: false,
			message: 'Укажите корректную почту',
			invalidFields: ['email'],
		};
	}

	return { isValid: true, message: '', invalidFields: [] };
};
