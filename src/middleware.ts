import { NextRequest, NextResponse } from 'next/server';

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

	// Если путь не содержит '/api', возвращаем запрос без изменений
	return NextResponse.next();
}
