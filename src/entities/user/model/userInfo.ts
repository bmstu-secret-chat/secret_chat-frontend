import { UserShortInfo } from '@/entities/user/model';

export type TUserInfoApi = {
	id: string;
	username: string;
	phone: string;
	email: string;
	is_online: boolean;
	last_online: string;
	avatar: string | null;
	about_me: string | null;
	birthday: string | null;
};

export type TUserInfoModel = {
	id: string;
	username: string;
	phone: string;
	email: string;
	isOnline: boolean;
	lastOnline: string;
	avatar: string | null;
	aboutMe: string | null;
	birthday: string | null;
};

export class UserInfo {
	id: string;
	username: string;
	phone: string;
	email: string;
	isOnline: boolean;
	lastOnline: string;
	avatar: string | null;
	aboutMe: string | null;
	birthday: string | null;

	constructor({
		id,
		username,
		phone,
		email,
		isOnline,
		lastOnline,
		avatar,
		aboutMe,
		birthday,
	}: TUserInfoModel) {
		this.id = id;
		this.username = username;
		this.phone = phone;
		this.email = email;
		this.isOnline = isOnline;
		this.lastOnline = lastOnline;
		this.avatar = avatar;
		this.aboutMe = aboutMe;
		this.birthday = birthday;
	}

	static createFromApi(user: TUserInfoApi) {
		return new UserInfo({
			isOnline: user.is_online,
			lastOnline: user.last_online,
			aboutMe: user.about_me,
			...user,
		});
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

	toShortInfo(): UserShortInfo {
		return new UserShortInfo({
			id: this.id,
			username: this.username,
			avatar: this.avatar,
		});
	}
}
