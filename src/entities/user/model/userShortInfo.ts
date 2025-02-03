export type TUserShortInfoApi = {
	id: string;
	username: string;
	phone: string;
	email: string;
	avatar: string | null;
	about_me: string | null;
	birthday: string | null;
};

export type TUserShortInfoModel = {
	id: string;
	username: string;
	avatar: string | null;
};

export class UserShortInfo {
	id: string;
	username: string;
	avatar: string | null;

	constructor({ id, username, avatar }: TUserShortInfoModel) {
		this.id = id;
		this.username = username;
		this.avatar = avatar;
	}

	static createFromApi(user: TUserShortInfoApi) {
		return new UserShortInfo({ ...user });
	}

	toApi() {
		return {
			username: this.username,
			avatar: this.avatar,
		};
	}
}
