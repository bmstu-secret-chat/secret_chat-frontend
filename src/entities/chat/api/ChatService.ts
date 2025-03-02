import { Chat } from '@/entities/chat/model';
import { ServiceBase } from '@/shared/api/ServiceBase';
import { ERequestMethods } from '@/shared/model';

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

	async createSecretChat(withUserId: string): Promise<void> {
		const configItem = this.getConfigItem('createSecretChat');

		return await this.makeHttpRequest(configItem.method, configItem.url, {
			with_user_id: withUserId,
		});
	}

	async createChat(withUserId: string): Promise<string> {
		const configItem = this.getConfigItem('createChat');

		return await this.makeHttpRequest(configItem.method, configItem.url, {
			with_user_id: withUserId,
		});
	}
}
