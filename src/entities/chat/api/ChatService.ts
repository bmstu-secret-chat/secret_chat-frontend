import { Chat } from '@/entities/chat/model';
import { ServiceBase } from '@/shared/api';
import { EChatType, ERequestMethods } from '@/shared/model';

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
				name: 'createChat',
				url: `/api/backend/chat/create`,
				method: ERequestMethods.POST,
			},
		];
	}

	async createChat(withUserId: string): Promise<Chat> {
		const configItem = this.getConfigItem('createChat');

		try {
			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				withUserId,
			);

			return Chat.createFromApi(response);
		} catch (error: any) {
			console.error(error);
			return new Chat(withUserId, EChatType.SECRET, []);
		}
	}
}
