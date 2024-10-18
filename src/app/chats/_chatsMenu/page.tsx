// app/chat/page.tsx
import Link from 'next/link';

const ChatPage = () => {
	return (
		<div>
			<h1>Чаты</h1>
			<ul>
				<li>
					<Link href='/chats/1'>Чат 1</Link>
				</li>
				<li>
					<Link href='/chats/2'>Чат 2</Link>
				</li>
				<li>
					<Link href='/chats/3'>Чат 3</Link>
				</li>
			</ul>
		</div>
	);
};

export default ChatPage;
