import { UserInfo } from '@/types/User/UserInfo';
import { UserWithPwModel } from '@/types/User/UserWithPW';
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
				url: `/api/auth/signup/`,
				method: RequestMethods.POST,
			},
			{
				name: 'login',
				url: `/api/auth/login/`,
				method: RequestMethods.POST,
			},
			{
				name: 'logout',
				url: `/api/auth/logout/`,
				method: RequestMethods.POST,
			},
			{ name: 'check', url: `/api/auth/check/`, method: RequestMethods.GET },
		];
	}

	async signup(user: UserWithPwModel): Promise<UserInfo> {
		const configItem = this.getConfigItem('signup');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
			user,
		);

		return UserInfo.createFromApi(response);
	}

	async login(user: UserWithPwModel): Promise<UserInfo> {
		const configItem = this.getConfigItem('login');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
			user,
		);

		return UserInfo.createFromApi(response);
	}

	async logout(): Promise<void> {
		const configItem = this.getConfigItem('logout');

		await this.makeHttpRequest(configItem.method, configItem.url);
	}

	async check(): Promise<UserInfo> {
		const configItem = this.getConfigItem('check');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
		);

		return UserInfo.createFromApi(response);
	}
}
