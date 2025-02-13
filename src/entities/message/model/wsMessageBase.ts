import {
	TWsMessageMessageApi,
	TWsSendMessageModel,
	WsSendMessage,
	TWsMessageResponseApi,
	TWsMessageResponseModel,
	WsSendMessageResponse,
} from '@/entities/message/model';

export enum EWsMessageType {
	SEND_MESSAGE = 'send_message',
	SEND_MESSAGE_RESPONSE = 'send_message_response',
	CREATE_CHAT = 'create_chat',
	DELETE_CHAT = 'delete_chat',
}

export type TWsMessageBaseModel = {
	id: string;
	type: EWsMessageType;
	payload: TWsSendMessageModel | TWsMessageResponseModel;
};

type TWsMessageBaseApi = {
	id: string;
	type: EWsMessageType;
	payload: TWsMessageResponseApi | TWsMessageMessageApi;
};

export class WsMessageBase {
	id: string;
	type: EWsMessageType;
	payload: WsSendMessage | WsSendMessageResponse;

	constructor(
		id: string,
		type: EWsMessageType,
		payload: TWsSendMessageModel | TWsMessageResponseModel,
	) {
		this.id = id;
		this.type = type;

		switch (type) {
			case EWsMessageType.SEND_MESSAGE:
				this.payload = new WsSendMessage(payload as TWsSendMessageModel);
				break;
			case EWsMessageType.SEND_MESSAGE_RESPONSE:
				this.payload = new WsSendMessageResponse(
					payload as TWsMessageResponseModel,
				);
				break;
			default:
				throw new Error(`Неизвестный тип сообщения: ${type}`);
		}
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TWsMessageBaseApi): WsMessageBase {
		let payload: TWsSendMessageModel | TWsMessageResponseModel;

		switch (from.type) {
			case EWsMessageType.SEND_MESSAGE:
				payload = WsSendMessage.createFromApi(
					from.payload as TWsMessageMessageApi,
				);
				break;
			case EWsMessageType.SEND_MESSAGE_RESPONSE:
				payload = WsSendMessageResponse.createFromApi(
					from.payload as TWsMessageResponseApi,
				);
				break;
			default:
				throw new Error(`Неизвестный тип сообщения: ${from.type}`);
		}

		return new WsMessageBase(from.id, from.type, payload);
	}

	/**
	 * Конвертирует экземпляр модели в API-формат
	 */
	toApi(): TWsMessageBaseApi {
		let payload: TWsMessageMessageApi | TWsMessageResponseApi;

		switch (this.type) {
			case EWsMessageType.SEND_MESSAGE:
				payload = (this.payload as WsSendMessage).toApi();
				break;
			case EWsMessageType.SEND_MESSAGE_RESPONSE:
				payload = (this.payload as WsSendMessageResponse).toApi();
				break;
			default:
				throw new Error(`Неизвестный тип сообщения: ${this.type}`);
		}

		return {
			...this,
			payload,
		};
	}
}
