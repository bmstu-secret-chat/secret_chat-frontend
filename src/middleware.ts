import { NextRequest, NextResponse } from 'next/server';

// const SERVER_URL = process.env.NEXT_PUBLIC_API_URL;

// const PAGES_PATHS = ['/', '/login', '/signup', '/chats'];

// Разрешённые страницы без авторизации
// const PUBLIC_PAGES_PATHS = ['/', '/login', '/signup'];

// Страницы, доступные только неавторизованным пользователям
// const NON_AUTH_PAGES_PATHS = ['/login', '/signup'];
//
// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function middleware(request: NextRequest) {
	// const { pathname, searchParams } = request.nextUrl;
	// if (pathname.startsWith('/api')) {
	// 	const newUrl = request.nextUrl.clone();
	// newUrl.host = `${SERVER_URL}:8000`;

	// Убираем '/api' из начала пути и добавляем слеш в конце, если его нет
	// newUrl.pathname = pathname.replace(/^\/api/, '');
	//
	// return NextResponse.rewrite(newUrl + '/');
	// }

	// const isAuthorized = searchParams.get('auth')
	// 	? searchParams.get('auth') === 'true'
	// 	: !!request.cookies.get('refresh');
	//
	// if (PAGES_PATHS.includes(pathname)) {
	// 	if (!isAuthorized && !PUBLIC_PAGES_PATHS.includes(pathname)) {
	// 		const loginUrl = new URL('/login', request.url);
	// 		return NextResponse.redirect(loginUrl);
	// 	} else if (isAuthorized && NON_AUTH_PAGES_PATHS.includes(pathname)) {
	// 		const chatsUrl = new URL('/chats', request.url);
	// 		return NextResponse.redirect(chatsUrl);
	// 	}
	// }

	return NextResponse.next();
}
