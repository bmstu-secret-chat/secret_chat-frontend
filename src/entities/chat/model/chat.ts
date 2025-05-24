import { TUserShortInfoApi, UserShortInfo } from '@/entities/user/model';
import { EChatType } from '@/shared/model';

type TChatApi = {
	id: string;
	type: EChatType;
	last_action_time: string;
	user: TUserShortInfoApi;
};

export type TChatModel = {
	id: string;
	type: EChatType;
	lastActionTime: string;
	user: UserShortInfo;
};

export class Chat {
	id: string;
	type: EChatType;
	lastActionTime: string;
	user: UserShortInfo;

	constructor(
		id: string,
		chatType: EChatType,
		lastActionTime: string,
		user: UserShortInfo,
	) {
		this.id = id;
		this.type = chatType;
		this.lastActionTime = lastActionTime;
		this.user = user;
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TChatApi): Chat {
		return new Chat(
			from.id,
			from.type,
			from.last_action_time,
			UserShortInfo.createFromApi(from.user),
		);
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TChatApi {
		return {
			id: this.id,
			type: this.type,
			last_action_time: this.lastActionTime,
			user: this.user.toApi(),
		};
	}
}
