export type ValidationResponse = {
	isValid: boolean;
	message: string;
	invalidFields: string[];
};

export const isUsernameCorrect = (username: string): boolean => {
	return (
		username.trim() !== '' &&
		username.length >= 4 &&
		/^[a-zA-Z0-9]+$/.test(username)
	);
};

export const isEmailCorrect = (email: string): boolean => {
	const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
	return emailPattern.test(email);
};

const isPasswordCorrect = (password: string): boolean => {
	return (
		password.trim() !== '' &&
		password.length >= 4 &&
		/^[a-zA-Z0-9]+$/.test(password)
	);
};

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
