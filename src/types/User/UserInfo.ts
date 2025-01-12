export type UserInfoApi = {
	user_id: string;
	username: string;
};

export type UserWithPwModel = {
	username?: string;
	password?: string;
};

export type UserWithPwApi = {
	username: string;
	password: string;
};

export const createUserWithPwApi = (from: UserWithPwModel): UserWithPwApi => {
	if (!from.username || !from.password) {
		throw new Error('Все поля должны быть заполнены');
	}

	return {
		username: from.username,
		password: from.password,
	};
};

export class UserInfo {
	userId: string;
	username: string;

	constructor(userId: string, userName: string) {
		this.userId = userId;
		this.username = userName;
	}

	toApi(): UserInfoApi {
		return {
			user_id: this.userId,
			username: this.username,
		};
	}
}
