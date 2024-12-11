import { NextRequest, NextResponse } from 'next/server';

const PAGES_PATHS = ['/', '/login', '/signup', '/chats'];

// Разрешённые страницы без авторизации
const PUBLIC_PAGES_PATHS = ['/', '/login', '/signup'];

// Страницы, доступные только неавторизованным пользователям
const NON_AUTH_PAGES_PATHS = ['/login', '/signup'];

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;

	// Проверяем, начинается ли путь с '/api'
	if (pathname.startsWith('/api')) {
		const newUrl = request.nextUrl.clone();
		newUrl.host = 'localhost:8000'; // Изменяем порт

		// Убираем '/api' из начала пути и добавляем слеш в конце, если его нет
		newUrl.pathname = pathname.replace(/^\/api/, '').replace(/\/?$/, '/');

		// Переписываем запрос на новый URL
		return NextResponse.rewrite(newUrl + '/');
	}

	/* TODO: придумать то, что будет корректно работать
	 * сейчас при авторизации запрос отправляется без рефреш токена (
	 * поскольку он еще не успел установиться), поэтому не происходит
	 * перехода на главную
	 */
	const isAuthorized = request.cookies.get('refresh');

	if (PAGES_PATHS.includes(pathname)) {
		if (!isAuthorized && !PUBLIC_PAGES_PATHS.includes(pathname)) {
			const loginUrl = new URL('/login', request.url);
			return NextResponse.redirect(loginUrl);
		} else if (isAuthorized && NON_AUTH_PAGES_PATHS.includes(pathname)) {
			const chatsUrl = new URL('/chats', request.url);
			return NextResponse.redirect(chatsUrl);
		}
	}

	return NextResponse.next();
}
