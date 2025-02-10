// export type TWsMessageMessageApi = {
// 	user_id: string;
// 	message: {
// 		content: string;
// 		time: string;
// 	};
// };
//
// export type TWsMessageResponseApi = {
// 	status: EWsMessageStatus;
// 	time: string;
// };

import {
	TWsMessageMessageApi,
	TWsSendMessageModel,
	WsSendMessage,
} from '@/entities/message/model/wsSendMessage';

export enum EWsMessageType {
	SEND_MESSAGE = 'send_message',
	SEND_MESSAGE_RESPONSE = 'send_message_response',
	CREATE_CHAT = 'create_chat',
	DELETE_CHAT = 'delete_chat',
}

export type TWsMessageBaseModel = {
	id: string;
	type: EWsMessageType;
	payload: TWsSendMessageModel;
};

type TWsMessageBaseApi = {
	id: string;
	type: EWsMessageType;
	payload: TWsMessageMessageApi;
};

export class WsMessageBase {
	id: string;
	type: EWsMessageType;
	payload: WsSendMessage;

	constructor(id: string, type: EWsMessageType, payload: TWsSendMessageModel) {
		this.id = id;
		this.type = type;
		this.payload = new WsSendMessage(payload);
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TWsMessageBaseApi): WsMessageBase {
		return new WsMessageBase(
			from.id,
			from.type,
			WsSendMessage.createFromApi(from.payload),
		);
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsMessageBaseApi {
		return {
			...this,
			payload: this.payload.toApi(),
		};
	}
}
