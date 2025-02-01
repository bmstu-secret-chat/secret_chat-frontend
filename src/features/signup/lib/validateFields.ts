import {
	isPasswordCorrect,
	isUsernameCorrect,
	ValidationResponse,
} from '@/shared/lib';

export const validateSignupFields = (
	username: string,
	password?: string,
	passwordConfirm?: string,
): ValidationResponse => {
	const passwordTrimmed = password?.trim();
	const passwordConfirmTrimmed = passwordConfirm?.trim();

	if (passwordTrimmed === '') {
		return {
			isValid: false,
			message: 'Пароль не может быть пустым',
			invalidFields: ['password'],
		};
	}

	if (!isUsernameCorrect(username)) {
		return {
			isValid: false,
			message:
				'Имя должно быть не короче 4 символов и содержать только литиницу и цифры',
			invalidFields: ['username'],
		};
	}

	if (passwordTrimmed && !isPasswordCorrect(passwordTrimmed)) {
		return {
			isValid: false,
			message:
				'Пароль должен быть не короче 4 символов и содержать только литиницу и цифры',
			invalidFields: ['password'],
		};
	}

	if (passwordTrimmed !== passwordConfirmTrimmed) {
		return {
			isValid: false,
			message: 'Пароли не совпадают',
			invalidFields: ['password', 'passwordConfirm'],
		};
	}

	return { isValid: true, message: '', invalidFields: [] };
};
