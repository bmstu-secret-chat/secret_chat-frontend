import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';

export type WsMessageReceiveApi = {
	user_id: string;
	status: WsMessageStatusEnum;
	message: {
		content: string;
		time: string;
	};
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
			time: new Date().toISOString(),
		});
	}

	/**
	 * Создает экземпляр модели из API-объекта
	 */
	static createFromApi(from: WsMessageReceiveApi): WsMessage {
		return new WsMessage(from.user_id, from.status, { ...from.message });
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): WsMessageReceiveApi {
		return {
			user_id: this.userId,
			status: this.status,
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
