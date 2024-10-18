import ChatPage from '@/app/chats/_chatsMenu/page';
export default function Layout({
	children,
	// chatId,
}: {
	children: React.ReactNode;
	// chatId: React.ReactNode;
}) {
	return (
		<>
			<ChatPage />
			{children}
			{/*{chatId}*/}
		</>
	);
}
