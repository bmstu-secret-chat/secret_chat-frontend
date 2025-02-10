import { EWsMessageStatus } from '@/shared/model';

export type TWsMessageMessageApi = {
	user_id: string;
	chat_id: string;
	message: {
		content: string;
		time: string;
	};
};
//
// export type TWsMessageResponseApi = {
// 	status: EWsMessageStatus;
// 	time: string;
// };

export type TWsSendMessageModel = {
	userId: string;
	chatId: string;
	status: EWsMessageStatus;
	content: string;
	time: string;
};

export class WsSendMessage {
	userId: string;
	chatId: string;
	status: EWsMessageStatus;
	content: string;
	time: string;

	constructor({ userId, chatId, status, content, time }: TWsSendMessageModel) {
		this.userId = userId;
		this.chatId = chatId;
		this.status = status;
		this.content = content;
		this.time = time;
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TWsMessageMessageApi): WsSendMessage {
		return new WsSendMessage({
			userId: from.user_id,
			chatId: from.chat_id,
			status: EWsMessageStatus.RECEIVED,
			content: from.message.content,
			time: from.message.time,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsMessageMessageApi {
		return {
			user_id: this.userId,
			chat_id: this.chatId,
			message: { content: this.content, time: this.time },
		};
	}
}
