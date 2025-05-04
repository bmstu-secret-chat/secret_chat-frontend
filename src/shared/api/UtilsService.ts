import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model';

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
				method: ERequestMethods.POST,
			},
			{
				name: 'uploadKey',
				url: '/api/backend/users/private-key-save/',
				method: ERequestMethods.POST,
			},
		];
	}

	/**
	 * Загрузка изображения
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

	/**
	 * Загрузка ключа
	 * @param secretKey
	 */
	async uploadKey(secretKey: Uint8Array): Promise<void> {
		const configItem = this.getConfigItem('uploadKey');

		await this.makeHttpRequest(configItem.method, configItem.url, {
			private_key: secretKey,
		});
	}
}
