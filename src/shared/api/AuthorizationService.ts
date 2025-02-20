import { TUserWithPwModel, UserInfo } from '@/entities/user/model';
import { ERequestMethods } from '@/shared/model';
import { ServiceBase } from './ServiceBase';

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
				method: ERequestMethods.POST,
			},
			{
				name: 'login',
				url: `/api/auth/login/`,
				method: ERequestMethods.POST,
			},
			{
				name: 'logout',
				url: `/api/auth/logout/`,
				method: ERequestMethods.POST,
			},
			{ name: 'check', url: `/api/auth/check/`, method: ERequestMethods.GET },
		];
	}

	async signup(user: TUserWithPwModel): Promise<UserInfo> {
		const configItem = this.getConfigItem('signup');

		const response = await this.makeHttpRequest(
			configItem.method,
			configItem.url,
			user,
		);

		return UserInfo.createFromApi(response);
	}

	async login(user: TUserWithPwModel): Promise<UserInfo> {
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
