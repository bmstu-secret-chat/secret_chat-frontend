export type TWsDeleteChatApi = {
	chat_id: string;
};

export type TWsDeleteChatModel = {
	chatId: string;
};

export class WsDeleteChat {
	chatId: string;

	constructor({ chatId }: TWsDeleteChatModel) {
		this.chatId = chatId;
	}

	/**
	 * Полученный чат из API-объекта
	 */
	static createFromApi(from: TWsDeleteChatApi): WsDeleteChat {
		return new WsDeleteChat({
			chatId: from.chat_id,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsDeleteChatApi {
		return {
			chat_id: this.chatId,
		};
	}
}
