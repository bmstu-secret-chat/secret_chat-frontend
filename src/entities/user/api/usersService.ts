import { UserShortInfo, UserInfo } from '@/entities/user/model';
import { ServiceBase } from '@/shared/api';
import { ERequestMethods } from '@/shared/model';

export class UsersService extends ServiceBase {
	private static instance: UsersService;
	private readonly baseUrl = '/api/backend/users/';

	constructor() {
		super();
		if (UsersService.instance) {
			return UsersService.instance;
		}

		UsersService.instance = this;
		this.config = [
			{
				name: 'getUserInfo',
				url: `${this.baseUrl}user/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'getUserInfoByName',
				url: `${this.baseUrl}user/by_name/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'updateUserInfo',
				url: `${this.baseUrl}user/`,
				method: ERequestMethods.PUT,
			},
			{
				name: 'deleteUserAccount',
				url: `${this.baseUrl}user/`,
				method: ERequestMethods.DELETE,
			},
			{
				name: 'findUsersByUsername',
				url: '/api/backend/search',
				method: ERequestMethods.GET,
			},
			{
				name: 'getPublicKey',
				url: `${this.baseUrl}`,
				method: ERequestMethods.GET,
			},
			{
				name: 'uploadPublicKey',
				url: `${this.baseUrl}`,
				method: ERequestMethods.POST,
			},
			{
				name: 'getPrivateKey',
				url: `${this.baseUrl}private-key/get/`,
				method: ERequestMethods.GET,
			},
			{
				name: 'uploadPrivateKey',
				url: `${this.baseUrl}private-key/save/`,
				method: ERequestMethods.POST,
			},
		];
	}

	/**
	 * Получение информации о пользователе
	 * @param id - Идентификатор пользователя
	 */
	async getUserInfo(id: string): Promise<UserInfo> {
		const configItem = this.getConfigItem('getUserInfo');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}${id}/`,
		);

		return UserInfo.createFromApi(response);
	}

	/**
	 * Получение информации о пользователе
	 * @param username - Идентификатор или имя пользователя
	 */
	async getUserInfoByName(username: string): Promise<UserShortInfo> {
		const configItem = this.getConfigItem('getUserInfoByName');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}?username=${username}`,
		);

		return UserShortInfo.createFromApi(response);
	}

	/**
	 * Изменение информации о пользователе
	 * @param user - Данные пользователя
	 */
	async updateUserInfo(user: UserInfo): Promise<void> {
		const configItem = this.getConfigItem('updateUserInfo');

		return await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}${user.id}/`,
			user.toApi(),
			{
				'Content-Type': 'application/json',
			},
		);
	}

	/**
	 * Удаление аккаунта пользователя
	 * @param id - Идентификатор пользователя
	 */
	async deleteUserAccount(id: string): Promise<void> {
		const configItem = this.getConfigItem('deleteUserAccount');

		return await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}${id}/`,
		);
	}

	/**
	 * Получение информации о пользователе
	 * @param username - Имя пользователя
	 */
	async findUsersByUsername(username: string): Promise<UserShortInfo[]> {
		const configItem = this.getConfigItem('findUsersByUsername');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}?username=${username}`,
		);

		return response.map(UserShortInfo.createFromApi);
	}

	/**
	 * Получение публичного ключа пользователя
	 * @param userId
	 */
	async getPublicKey(userId: string): Promise<string> {
		const configItem = this.getConfigItem('getPublicKey');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}${userId}/key/`,
		);

		return response.public_key;
	}

	/**
	 * Загрузка публичного ключа
	 * @param publicKey
	 */
	async uploadPublicKey(userId: string, publicKey: string): Promise<void> {
		const configItem = this.getConfigItem('uploadPublicKey');

		await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}${userId}/key/`,
			{
				public_key: publicKey,
			},
		);
	}

	/**
	 * Получение приватного ключа
	 * @param username
	 */
	async getPrivateKey(username: string): Promise<string> {
		const configItem = this.getConfigItem('getPrivateKey');

		const response = await this.makeHttpRequest(
			configItem.method,
			`${configItem.url}?username=${username}`,
		);

		return response.private_key;
	}

	/**
	 * Загрузка приватного ключа
	 * @param privateKey
	 */
	async uploadPrivateKey(privateKey: string): Promise<void> {
		const configItem = this.getConfigItem('uploadPrivateKey');

		await this.makeHttpRequest(configItem.method, configItem.url, {
			private_key: privateKey,
		});
	}
}
