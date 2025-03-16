import { EChatType, EMessageStatus } from '@/shared/model/enums';

export type TWsMessageMessageApi = {
	user_id: string;
	chat_id: string;
	chat_type: EChatType;
	message: {
		content: string;
		time: string;
	};
};

export type TWsSendMessageModel = {
	userId: string;
	chatId: string;
	chatType: EChatType;
	status: EMessageStatus;
	content: string;
	time: string;
};

export class WsSendMessage {
	userId: string;
	chatId: string;
	chatType: EChatType;
	status: EMessageStatus;
	content: string;
	time: string;

	constructor({
		userId,
		chatId,
		chatType,
		status,
		content,
		time,
	}: TWsSendMessageModel) {
		this.userId = userId;
		this.chatId = chatId;
		this.chatType = chatType;
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
			chatType: from.chat_type,
			status: EMessageStatus.RECEIVED,
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
			chat_type: this.chatType,
			message: { content: this.content, time: this.time },
		};
	}
}
