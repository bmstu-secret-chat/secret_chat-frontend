export type TWsClearChatApi = {
	chat_id: string;
};

export type TWsClearChatModel = {
	chatId: string;
};

export class WsClearChat {
	chatId: string;

	constructor({ chatId }: TWsClearChatModel) {
		this.chatId = chatId;
	}

	/**
	 * Полученный чат из API-объекта
	 */
	static createFromApi(from: TWsClearChatApi): WsClearChat {
		return new WsClearChat({
			chatId: from.chat_id,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsClearChatApi {
		return {
			chat_id: this.chatId,
		};
	}
}
