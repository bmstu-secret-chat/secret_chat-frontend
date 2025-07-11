import { ERequestMethods } from '../model/enums/requestMethods';
import { TServiceConfig } from '../model/types/serviceConfig';

const REFRESH_URL = '/api/auth/refresh/';
const URLS_WITHOUT_TOKEN = [
	'/api/auth/login/',
	'/api/auth/signup/',
	'/api/auth/code/',
	'/api/backend/users/user/by_name',
	'/api/backend/users/private-key/get/',
];

export abstract class ServiceBase {
	protected pendingRequests: { [key: string]: boolean } = {};
	protected config: TServiceConfig[] = [];

	protected getConfigItem(name: string): TServiceConfig {
		const configItem = this.config.find((item) => item.name === name);

		if (!configItem) {
			throw new Error(`Не найдена конфигурация для ${name}`);
		}

		return configItem;
	}

	private getAccessToken(): string | null {
		const match = document.cookie.match(/(?:^|;\s*)access=([^;]*)/);
		return match ? decodeURIComponent(match[1]) : null;
	}

	private isTokenExpiring(token: string): boolean {
		try {
			const payloadBase64 = token.split('.')[1];
			const payload = JSON.parse(atob(payloadBase64));
			const currentTime = Math.floor(Date.now() / 1000);
			const expirationTime = payload.exp || 0;

			return expirationTime - currentTime < 5 * 60;
		} catch {
			return true;
		}
	}

	private async refreshAccessToken(): Promise<void> {
		const response = await fetch(REFRESH_URL, {
			method: ERequestMethods.GET,
			credentials: 'include',
		});

		if (!response.ok) {
			const errorData = await response.json();
			throw errorData.error || 'Не удалось обновить токен';
		}
	}

	private async checkAccessToken(url: string): Promise<void> {
		if (
			URLS_WITHOUT_TOKEN.some(
				(allowedUrl) => url === allowedUrl || url.includes(allowedUrl),
			)
		) {
			return;
		}

		let token = this.getAccessToken();

		if (!token || this.isTokenExpiring(token)) {
			await this.refreshAccessToken();
			token = this.getAccessToken();

			if (!token) {
				throw new Error('Не удалось получить новый токен');
			}
		}
	}

	protected async makeHttpRequest(
		method: ERequestMethods,
		url: string,
		body?: any,
		headers?: Record<string, string>,
	): Promise<any> {
		// Если запрос уже в процессе, игнорируем новый запрос
		if (this.pendingRequests[url]) {
			throw new Error('EREQUESTPENDING: Запрос уже в процессе');
		}

		// Устанавливаем флаг, что запрос активен
		this.pendingRequests[url] = true;

		try {
			const options: RequestInit = {
				method,
				headers: {
					'Content-Type':
						method === ERequestMethods.POST ? 'application/json' : '',
					...headers,
				},
				credentials: 'include',
				...(body && { body: JSON.stringify(body) }),
				...(method === ERequestMethods.GET && { next: { revalidate: 60 } }),
			};

			const response = await fetch(url, options);

			if (!response.ok) {
				const errorData = await response.json();
				throw new Error(errorData.error || 'HTTP request failed');
			}

			return response.json();
		} finally {
			// Убираем флаг после завершения запроса
			delete this.pendingRequests[url];
		}
	}
}
