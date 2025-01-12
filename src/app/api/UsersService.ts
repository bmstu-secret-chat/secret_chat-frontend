/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import { UserInfo } from '@/types/User/UserInfo';
import { RequestMethods, ServiceBase } from './ServiceBase';

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
		];
	}

	/**
	 * Получение информации о пользователе
	 * @param id - Идентификатор пользователя
	 */
	async getUserInfo(id: string): Promise<UserInfo> {
		const configItem = this.getConfigItem('getUserInfo');

		try {
			const response = await this.makeHttpRequest(
				configItem.method,
				`${configItem.url}${id}/`,
			);

			return new UserInfo(response.user_id, response.username);
		} catch (error: any) {
			console.error('Error fetching user info:', error.message);
			throw new Error(`Failed to fetch user info: ${error.message}`);
		}
	}
}
