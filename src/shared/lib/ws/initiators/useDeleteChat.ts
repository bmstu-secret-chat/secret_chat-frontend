import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { deleteChatAction, TWsDeleteChatModel } from '@/entities/chat/model';
import {
	EWsMessageType,
	useWebSocketContext,
	WsMessageBase,
} from '@/shared/model';

export const useDeleteChat = () => {
	const dispatch = useDispatch();
	const router = useRouter();

	const { sendWsMessage } = useWebSocketContext();

	const deleteChat = (chatId: string) => {
		const message = new WsMessageBase(uuidv4(), EWsMessageType.DELETE_CHAT, {
			chatId,
		});

		sendWsMessage(JSON.stringify(message.toApi()));

		dispatch(deleteChatAction((message.payload as TWsDeleteChatModel).chatId));
		router.push('/chats');
	};

	return { deleteChat };
};
