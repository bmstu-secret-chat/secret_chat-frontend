/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

import {
	createUserWithPwApi,
	UserInfo,
	UserWithPwModel,
} from '@/types/User/UserInfo';
import { RequestMethods, ServiceBase } from './ServiceBase';

export class AuthorizationService extends ServiceBase {
	private static instance: AuthorizationService;

	constructor() {
		super();
		if (AuthorizationService.instance) {
			return AuthorizationService.instance;
		}

		AuthorizationService.instance = this;
		this.config = [
			{
				name: 'signup',
				url: `/api/register`,
				method: RequestMethods.POST,
			},
			{
				name: 'login',
				url: `/api/login`,
				method: RequestMethods.POST,
			},
			{
				name: 'logout',
				url: `/api/logout`,
				method: RequestMethods.POST,
			},
			{ name: 'check', url: `/api/check`, method: RequestMethods.GET },
		];
	}

	async signup(user: UserWithPwModel): Promise<UserInfo> {
		try {
			const configItem = this.getConfigItem('signup');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				createUserWithPwApi(user),
			);

			return new UserInfo(response.user_id, response.username);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async login(user: UserWithPwModel): Promise<UserInfo> {
		try {
			const configItem = this.getConfigItem('login');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
				createUserWithPwApi(user),
			);

			return new UserInfo(response.user_id, response.username);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async logout(): Promise<void> {
		try {
			const configItem = this.getConfigItem('logout');

			return await this.makeHttpRequest(configItem.method, configItem.url);
		} catch (error: any) {
			throw new Error(error);
		}
	}

	async check(): Promise<UserInfo> {
		try {
			const configItem = this.getConfigItem('check');

			const response = await this.makeHttpRequest(
				configItem.method,
				configItem.url,
			);

			return new UserInfo(response.user_id, response.username);
		} catch (error: any) {
			throw new Error(error);
		}
	}
}
