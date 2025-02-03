export type TUserInfoApi = {
	id: string;
	username: string;
	phone: string;
	email: string;
	avatar: string | null;
	about_me: string | null;
	birthday: string | null;
};

export type TUserInfoModel = {
	id: string;
	username: string;
	phone: string;
	email: string;
	avatar: string | null;
	aboutMe: string | null;
	birthday: string | null;
};

export type TUserShortInfoModel = {
	id: string;
	username: string;
	phone: string;
	email: string;
	avatar: string | null;
	aboutMe: string | null;
	birthday: string | null;
};

export class UserInfo {
	id: string;
	username: string;
	phone: string;
	email: string;
	avatar: string | null;
	aboutMe: string | null;
	birthday: string | null;

	constructor({
		id,
		username,
		phone,
		email,
		avatar,
		aboutMe,
		birthday,
	}: TUserInfoModel) {
		this.id = id;
		this.username = username;
		this.phone = phone;
		this.email = email;
		this.avatar = avatar;
		this.aboutMe = aboutMe;
		this.birthday = birthday;
	}

	static createFromApi(user: TUserInfoApi) {
		return new UserInfo({ aboutMe: user.about_me, ...user });
	}

	toApi() {
		return {
			username: this.username,
			phone: this.phone,
			email: this.email,
			avatar: this.avatar,
			about_me: this.aboutMe,
			birthday: this.birthday,
		};
	}
}
