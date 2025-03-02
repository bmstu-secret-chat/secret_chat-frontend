import { ServiceBase } from '@/shared/api/ServiceBase';
import { ERequestMethods, WsMessageBase } from '@/shared/model';

export class MessageService extends ServiceBase {
	private static instance: MessageService;

	constructor() {
		super();
		if (MessageService.instance) {
			return MessageService.instance;
		}

		MessageService.instance = this;
		this.config = [
			{
				name: 'getMessagesFromChat',
				url: `/api/backend/messages/`,
				method: ERequestMethods.GET,
			},
		];
	}

	async getMessagesFromChat(
		dialogId: string,
		firstMessageIndex: number,
		count: number,
	): Promise<WsMessageBase[]> {
		// TODO: сменить тип класса
		const configItem = this.getConfigItem('getMessagesFromChat');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}?dialog_id=${dialogId}&first_message_index=${firstMessageIndex}&count=${count}`,
		);

		return response.map(WsMessageBase.createFromApi);
	}
}
