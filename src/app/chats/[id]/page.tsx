import { notFound } from 'next/navigation'; // Импортируем функцию для обработки ошибки

export default async function ChatDetailPage({
	params,
}: {
	params: { id: string };
}) {
	const { id } = params;

	if (isNaN(Number(id))) {
		notFound();
	}

	return (
		<div>
			<h1>Чат {id}</h1>
			<p>Здесь будет содержимое чата {id}.</p>
		</div>
	);
}
