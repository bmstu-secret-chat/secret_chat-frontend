import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model';

export class UtilsService extends ServiceBase {
	private static instance: UtilsService;
	private readonly baseUrl = '/api/backend';

	constructor() {
		super();
		if (UtilsService.instance) {
			return UtilsService.instance;
		}

		UtilsService.instance = this;
		this.config = [
			{
				name: 'uploadImage',
				url: `${this.baseUrl}/storage/upload-image/`,
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
}
