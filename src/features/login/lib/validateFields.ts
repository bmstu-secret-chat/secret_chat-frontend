import {
	isPasswordCorrect,
	isUsernameCorrect,
	ValidationResponse,
} from '@/shared/lib';

export const validateLoginFields = (
	username: string,
	password: string,
): ValidationResponse => {
	const passwordTrimmed = password.trim();

	if (!isUsernameCorrect(username)) {
		return {
			isValid: false,
			message:
				'Имя должно быть не короче 4 символов и содержать только литиницу и цифры',
			invalidFields: ['username'],
		};
	}

	if (!isPasswordCorrect(passwordTrimmed)) {
		return {
			isValid: false,
			message:
				'Пароль должен быть не короче 4 символов и содержать только литиницу и цифры',
			invalidFields: ['password'],
		};
	}

	return { isValid: true, message: '', invalidFields: [] };
};
