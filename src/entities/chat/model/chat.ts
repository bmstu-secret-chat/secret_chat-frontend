import { TUserShortInfoApi, UserShortInfo } from '@/entities/user/model';
import { EChatType } from '@/shared/model';

export type TChatApi = {
	id: string;
	type: EChatType;
	users: TUserShortInfoApi[];
};

export type TChatModel = {
	id: string;
	type: EChatType;
	users: UserShortInfo[];
};

export class Chat {
	id: string;
	type: EChatType;
	users: UserShortInfo[];

	constructor(id: string, chatType: EChatType, users: UserShortInfo[]) {
		this.id = id;
		this.type = chatType;
		this.users = users;
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TChatApi): Chat {
		return new Chat(
			from.id,
			from.type,
			from.users.map((user) => UserShortInfo.createFromApi(user)),
		);
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TChatApi {
		return {
			id: this.id,
			type: this.type,
			users: this.users.map((user) => user.toApi()),
		};
	}
}
