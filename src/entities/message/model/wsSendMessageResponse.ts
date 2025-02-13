import { EWsMessageResponseStatus } from '@/shared/model';

export type TWsMessageResponseApi = {
	chat_id: string;
	status: EWsMessageResponseStatus;
};

export type TWsMessageResponseModel = {
	chatId: string;
	status: EWsMessageResponseStatus;
};

export class WsSendMessageResponse {
	chatId: string;
	status: EWsMessageResponseStatus;

	constructor({ chatId, status }: TWsMessageResponseModel) {
		this.chatId = chatId;
		this.status = status;
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TWsMessageResponseApi): WsSendMessageResponse {
		return new WsSendMessageResponse({
			chatId: from.chat_id,
			status: from.status,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsMessageResponseApi {
		return {
			chat_id: this.chatId,
			status: this.status,
		};
	}
}
