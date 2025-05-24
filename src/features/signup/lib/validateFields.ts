import {
	isEmailCorrect,
	isPasswordCorrect,
	isPhoneNumberCorrect,
	isUsernameCorrect,
	ValidationResponse,
} from '@/shared/lib';

export const validateSignupFields = (
	username: string,
	phone?: string,
	email?: string,
	password?: string,
	passwordConfirm?: string,
): ValidationResponse => {
	const usernameTrimmed = username?.trim();
	const emailTrimmed = email?.trim();
	const passwordTrimmed = password?.trim();
	const passwordConfirmTrimmed = passwordConfirm?.trim();

	if (passwordTrimmed && passwordTrimmed === '') {
		return {
			isValid: false,
			message: 'Пароль не может быть пустым',
			invalidFields: ['password'],
		};
	}

	if (!usernameTrimmed || !isUsernameCorrect(usernameTrimmed)) {
		return {
			isValid: false,
			message:
				'Имя должно быть не короче 4 символов и содержать только латиницу и цифры',
			invalidFields: ['username'],
		};
	}

	if (!emailTrimmed || !isEmailCorrect(emailTrimmed)) {
		return {
			isValid: false,
			message: 'Укажите корректную почту',
			invalidFields: ['email'],
		};
	}

	if (!phone || !isPhoneNumberCorrect(phone)) {
		return {
			isValid: false,
			message: 'Телефон должен состоять из 11 цифр и начинаться на "8"',
			invalidFields: ['phone'],
		};
	}

	if (passwordTrimmed && !isPasswordCorrect(passwordTrimmed)) {
		return {
			isValid: false,
			message:
				'Пароль должен быть не короче 4 символов и содержать только латиницу и цифры',
			invalidFields: ['password'],
		};
	}

	if (passwordTrimmed !== passwordConfirmTrimmed) {
		console.log(passwordTrimmed, passwordConfirmTrimmed);
		return {
			isValid: false,
			message: 'Пароли не совпадают',
			invalidFields: ['password', 'passwordConfirm'],
		};
	}

	return { isValid: true, message: '', invalidFields: [] };
};
