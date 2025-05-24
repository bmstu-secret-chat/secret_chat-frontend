import { EMessageStatus } from '@/shared/model';

export type MessageApi = {
	id: string;
	serial_number: number;
	dialog_id: string;
	user_id: string;
	content: string;
	time_create: string;
};

export type MessageModel = {
	id: string;
	serialNumber: number;
	dialogId: string;
	userId: string;
	status: EMessageStatus;
	content: string;
	timeCreate: string;
};

export class Message {
	id: string;
	serialNumber: number;
	dialogId: string;
	userId: string;
	status: EMessageStatus;
	content: string;
	timeCreate: string;

	constructor({
		id,
		serialNumber,
		dialogId,
		userId,
		status,
		content,
		timeCreate,
	}: MessageModel) {
		this.id = id;
		this.serialNumber = serialNumber;
		this.dialogId = dialogId;
		this.userId = userId;
		this.status = status;
		this.content = content;
		this.timeCreate = timeCreate;
	}

	/**
	 * Полученное сообщение из API-объекта
	 */
	static createFromApi(from: MessageApi): Message {
		return new Message({
			id: from.id,
			serialNumber: from.serial_number,
			dialogId: from.dialog_id,
			userId: from.user_id,
			status: EMessageStatus.RECEIVED,
			content: from.content,
			timeCreate: from.time_create,
		});
	}
}
