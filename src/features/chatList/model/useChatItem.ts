import { useSelector } from 'react-redux';
import { selectActiveChat } from '@/entities/chat/model';

export const useChatItem = (chatId: string) => {
	const activeChat = useSelector(selectActiveChat);

	const isActiveChat = activeChat?.id === chatId;

	return { isActiveChat };
};
