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

export const isPasswordCorrect = (password: string): boolean => {
	return (
		password.trim() !== '' &&
		password.length >= 4 &&
		/^[a-zA-Z0-9]+$/.test(password)
	);
};
