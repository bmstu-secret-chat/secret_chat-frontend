import {
	TWsClearChatApi,
	TWsClearChatModel,
	TWsCreateChatApi,
	TWsCreateChatModel,
	TWsDeleteChatApi,
	TWsDeleteChatModel,
	WsClearChat,
	WsCreateChat,
	WsDeleteChat,
} from '@/entities/chat/model';
import {
	TWsMessageMessageApi,
	TWsMessageResponseApi,
	TWsMessageResponseModel,
	TWsSendMessageModel,
	WsSendMessage,
	WsSendMessageResponse,
} from '@/entities/message/model';
import { Message } from '@/shared/model';

export enum EWsMessageType {
	SEND_MESSAGE = 'send_message',
	SEND_MESSAGE_RESPONSE = 'send_message_response',
	CREATE_CHAT = 'create_chat',
	DELETE_CHAT = 'delete_chat',
	CLEAR_CHAT = 'clear_chat',
}

export type TWsMessageBaseModel = {
	id: string;
	type: EWsMessageType;
	payload:
		| TWsSendMessageModel
		| TWsMessageResponseModel
		| TWsCreateChatModel
		| TWsDeleteChatModel
		| TWsClearChatModel;
};

type TWsMessageBaseApi = {
	id: string;
	type: EWsMessageType;
	payload:
		| TWsMessageResponseApi
		| TWsMessageMessageApi
		| TWsCreateChatApi
		| TWsDeleteChatApi
		| TWsClearChatApi;
};

export class WsMessageBase {
	id: string;
	type: EWsMessageType;
	payload:
		| WsSendMessage
		| WsSendMessageResponse
		| WsCreateChat
		| WsDeleteChat
		| WsClearChat;

	constructor(
		id: string,
		type: EWsMessageType,
		payload:
			| TWsSendMessageModel
			| TWsMessageResponseModel
			| TWsCreateChatModel
			| TWsDeleteChatModel
			| TWsClearChatModel,
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
			case EWsMessageType.CREATE_CHAT:
				this.payload = new WsCreateChat(payload as TWsCreateChatModel);
				break;
			case EWsMessageType.DELETE_CHAT:
				this.payload = new WsDeleteChat(payload as TWsDeleteChatModel);
				break;
			case EWsMessageType.CLEAR_CHAT:
				this.payload = new WsClearChat(payload as TWsClearChatModel);
				break;
			default:
				throw new Error(`Неизвестный тип сообщения: ${type}`);
		}
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: TWsMessageBaseApi): WsMessageBase {
		let payload:
			| TWsSendMessageModel
			| TWsMessageResponseModel
			| TWsCreateChatModel
			| TWsDeleteChatModel
			| TWsClearChatModel;

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
			case EWsMessageType.CREATE_CHAT:
				payload = WsCreateChat.createFromApi(from.payload as TWsCreateChatApi);
				break;
			case EWsMessageType.DELETE_CHAT:
				payload = WsDeleteChat.createFromApi(from.payload as TWsDeleteChatApi);
				break;
			case EWsMessageType.CLEAR_CHAT:
				payload = WsClearChat.createFromApi(from.payload as TWsClearChatApi);
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
		let payload: TWsMessageMessageApi | TWsDeleteChatApi;

		switch (this.type) {
			case EWsMessageType.SEND_MESSAGE:
				payload = (this.payload as WsSendMessage).toApi();
				break;
			case EWsMessageType.DELETE_CHAT:
				payload = (this.payload as WsDeleteChat).toApi();
				break;
			case EWsMessageType.CLEAR_CHAT:
				payload = (this.payload as WsClearChat).toApi();
				break;
			default:
				throw new Error(`Неизвестный тип сообщения: ${this.type}`);
		}

		return {
			...this,
			payload,
		};
	}

	toMessage(): Message {
		if (this.type !== EWsMessageType.SEND_MESSAGE) {
			throw new Error(
				`Переданный тип сообщения не является корректным: ${this.type}`,
			);
		}

		return new Message({
			id: this.id,
			serialNumber: 0,
			dialogId: this.payload.chatId,
			userId: (this.payload as WsSendMessage).userId,
			status: (this.payload as WsSendMessage).status,
			content: (this.payload as WsSendMessage).content,
			timeCreate: (this.payload as WsSendMessage).time,
		});
	}
}
