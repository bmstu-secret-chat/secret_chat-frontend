import { Chat } from '@/entities/chat/model';
import { ServiceBase } from '@/shared/api';
import { ERequestMethods, Message, type MessageModel } from '@/shared/model';

export class ChatService extends ServiceBase {
	private static instance: ChatService;

	constructor() {
		super();
		if (ChatService.instance) {
			return ChatService.instance;
		}

		ChatService.instance = this;
		this.config = [
			{
				name: 'getChatInfo',
				url: `/api/backend/chats/chat/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'getChatsList',
				url: `/api/backend/chats/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'getMessagesFromChat',
				url: `/api/backend/chats/chat_id/messages`,
				method: ERequestMethods.GET,
			},
			{
				name: 'createSecretChat',
				url: `/api/backend/chats/secret-chat/create/`,
				method: ERequestMethods.POST,
			},
			{
				name: 'createChat',
				url: `/api/backend/chats/chat/create/`,
				method: ERequestMethods.POST,
			},
		];
	}

	async getChatInfo(chatId: string): Promise<Chat> {
		const configItem = this.getConfigItem('createSecretChat');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}${chatId}/`,
		);

		return Chat.createFromApi(response);
	}

	async getChatsList(): Promise<Chat[]> {
		const configItem = this.getConfigItem('getChatsList');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
		);

		return response.map(Chat.createFromApi);
	}

	async getMessagesFromChat(
		dialogId: string,
		firstMessageIndex: number,
		count: number,
	): Promise<MessageModel[]> {
		const configItem = this.getConfigItem('getMessagesFromChat');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url.replace('chat_id', dialogId)}?first_message_index=${firstMessageIndex}&count=${count}`,
		);

		return response.map(Message.createFromApi);
	}

	async createSecretChat(withUserId: string): Promise<void> {
		const configItem = this.getConfigItem('createSecretChat');

		await this.makeHttpRequest(configItem.method, configItem.url, {
			with_user_id: withUserId,
		});
	}

	async createChat(withUserId: string): Promise<Chat> {
		const configItem = this.getConfigItem('createChat');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
			{
				with_user_id: withUserId,
			},
		);

		return Chat.createFromApi(response);
	}
}
