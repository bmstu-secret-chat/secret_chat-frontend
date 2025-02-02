import { EWsMessageStatus } from '@/shared/model';

export type TWsMessageMessageApi = {
	user_id: string;
	message: {
		content: string;
		time: string;
	};
};

export type TWsMessageResponseApi = {
	status: EWsMessageStatus;
	time: string;
};

export type TWsMessageModel = {
	userId: string;
	status: EWsMessageStatus;
	content: string;
	time: string;
};

export class WsMessage {
	userId: string;
	status: EWsMessageStatus;
	message: {
		content: string;
		time: string;
	};

	constructor(
		userId: string,
		status: EWsMessageStatus,
		message: { content: string; time: string },
	) {
		this.userId = userId;
		this.status = status;
		this.message = message;
	}

	/**
	 * Создает экземпляр модели с текущем временем
	 */
	static create(userId: string, status: EWsMessageStatus, content: string) {
		return new WsMessage(userId, status, {
			content,
			time: new Date().getTime().toString(),
		});
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createMessageFromApi(from: TWsMessageMessageApi): WsMessage {
		return new WsMessage(from.user_id, EWsMessageStatus.RECEIVED, {
			...from.message,
		});
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsMessageMessageApi {
		return {
			user_id: this.userId,
			message: { ...this.message },
		};
	}

	/**
	 * Преобразует в простой объект
	 */
	toPlain(): TWsMessageModel {
		return {
			userId: this.userId,
			status: this.status,
			content: this.message.content,
			time: this.message.time,
		};
	}
}
