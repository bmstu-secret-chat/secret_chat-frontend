import { RequestMethods, ServiceBase } from './ServiceBase';

export class UtilsService extends ServiceBase {
	private static instance: UtilsService;

	constructor() {
		super();
		if (UtilsService.instance) {
			return UtilsService.instance;
		}

		UtilsService.instance = this;
		this.config = [
			{
				name: 'uploadImage',
				url: '/api/backend/storage/upload-image/',
				method: RequestMethods.POST,
			},
		];
	}

	/**
	 * Получение информации о пользователе
	 * @param imageBase64
	 */
	async uploadImage(imageBase64: string): Promise<string> {
		const configItem = this.getConfigItem('uploadImage');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
			{ file: imageBase64 },
		);

		return response.url;
	}
}
