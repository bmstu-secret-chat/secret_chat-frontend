import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';

export type WsMessageMessageApi = {
	type: 'message' | 'create-chat';
	user_id: string;
	message: {
		content: string;
		time: string;
		channel_id: string;
	};
};

export type WsMessageResponseApi = {
	status: WsMessageStatusEnum;
	time: string;
};

export type WsMessageModel = {
	userId: string;
	status: WsMessageStatusEnum;
	content: string;
	time: string;
};

export class WsMessage {
	userId: string;
	status: WsMessageStatusEnum;
	message: {
		content: string;
		time: string;
	};

	constructor(
		userId: string,
		status: WsMessageStatusEnum,
		message: { content: string; time: string },
	) {
		this.userId = userId;
		this.status = status;
		this.message = message;
	}

	/**
	 * Создает экземпляр модели с текущем временем
	 */
	static create(userId: string, status: WsMessageStatusEnum, content: string) {
		return new WsMessage(userId, status, {
			content,
			time: new Date().getTime().toString(),
		});
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createMessageFromApi(from: WsMessageMessageApi): WsMessage {
		return new WsMessage(from.user_id, WsMessageStatusEnum.RECEIVED, {
			...from.message,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): WsMessageMessageApi {
		return {
			user_id: this.userId,
			message: { ...this.message },
		};
	}

	/**
	 * Преобразует в простой объект
	 */
	toPlain(): WsMessageModel {
		return {
			userId: this.userId,
			status: this.status,
			content: this.message.content,
			time: this.message.time,
		};
	}
}
