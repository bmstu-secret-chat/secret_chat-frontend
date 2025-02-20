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
				name: 'createSecretChat',
				url: `/api/backend/chats/secret-chat/create/`,
				method: ERequestMethods.POST,
			},
		];
	}

	async createSecretChat(withUserId: string): Promise<void> {
		const configItem = this.getConfigItem('createSecretChat');

		return await this.makeHttpRequest(configItem.method, configItem.url, {
			with_user_id: withUserId,
		});
	}
}
