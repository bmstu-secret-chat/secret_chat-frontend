import ChatsList from '@/app/chats/_chatsList/page';
export default function Layout({ children }: { children: React.ReactNode }) {
	return (
		<>
			<ChatsList />
			{children}
		</>
	);
}
