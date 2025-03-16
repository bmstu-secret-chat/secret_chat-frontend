import { EChatType } from '@/shared/model';

export type TWsCreateChatApi = {
	chat_id: string;
	with_user_id: string;
	chat_type: EChatType;
};

export type TWsCreateChatModel = {
	chatId: string;
	withUserId: string;
	type: EChatType;
};

export class WsCreateChat {
	chatId: string;
	withUserId: string;
	type: EChatType;

	constructor({ chatId, withUserId, type }: TWsCreateChatModel) {
		this.chatId = chatId;
		this.withUserId = withUserId;
		this.type = type;
	}

	/**
	 * Полученный чат из API-объекта
	 */
	static createFromApi(from: TWsCreateChatApi): WsCreateChat {
		return new WsCreateChat({
			chatId: from.chat_id,
			withUserId: from.with_user_id,
			type: from.chat_type,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsCreateChatApi {
		return {
			chat_id: this.chatId,
			with_user_id: this.withUserId,
			chat_type: this.type,
		};
	}
}
