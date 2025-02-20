export type TUserShortInfoApi = {
	id: string;
	username: string;
	avatar: string | null;
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

	static createFromApi(user: TUserShortInfoApi): UserShortInfo {
		return new UserShortInfo({ ...user });
	}

	toApi(): TUserShortInfoApi {
		return {
			id: this.id,
			username: this.username,
			avatar: this.avatar,
		};
	}
}
