/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */

export enum RequestMethods {
	GET = 'GET',
	POST = 'POST',
	PUT = 'PUT',
	DELETE = 'DELETE',
}

export type ConfigType = {
	name: string;
	url: string;
	method: RequestMethods;
};

export abstract class ServiceBase {
	protected pendingRequests: { [key: string]: boolean } = {};
	protected config: ConfigType[] = [];

	protected getConfigItem(name: string): ConfigType {
		const configItem = this.config.find((item) => item.name === name);

		if (!configItem) {
			throw new Error(`Не найдена конфигурация для ${name}`);
		}

		return configItem;
	}

	protected async makeHttpRequest(
		method: RequestMethods,
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
						method === RequestMethods.POST ? 'application/json' : '',
					...headers,
				},
				credentials: 'include',
				...(body && { body: JSON.stringify(body) }),
				...(method === RequestMethods.GET && { next: { revalidate: 60 } }),
			};

			const response = await fetch(url, options);

			if (!response.ok) {
				const errorData = await response.json();
				throw errorData.error || 'HTTP request failed';
			}

			return response.json();
		} finally {
			// Убираем флаг после завершения запроса
			delete this.pendingRequests[url];
		}
	}
}
