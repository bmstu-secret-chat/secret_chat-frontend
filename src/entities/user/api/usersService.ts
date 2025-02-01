import { UserInfo } from '@/entities/user/model/userInfo';
import { RequestMethods, ServiceBase } from '../../../shared/api/ServiceBase';

export class UsersService extends ServiceBase {
	private static instance: UsersService;

	constructor() {
		super();
		if (UsersService.instance) {
			return UsersService.instance;
		}

		UsersService.instance = this;
		this.config = [
			{
				name: 'getUserInfo',
				url: '/api/backend/users/user/',
				method: RequestMethods.GET,
			},
			{
				name: 'updateUserInfo',
				url: '/api/backend/users/user/',
				method: RequestMethods.PUT,
			},
			{
				name: 'deleteUserAccount',
				url: '/api/backend/users/user/',
				method: RequestMethods.DELETE,
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
}
