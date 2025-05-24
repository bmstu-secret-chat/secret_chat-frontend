import { v4 as uuidv4 } from 'uuid';
import { EWsMessageType, WsMessageBase } from '@/shared/model';
import { useWebSocketContext } from '@/shared/model/contexts';

export const useDeleteChat = () => {
	const { sendWsMessage } = useWebSocketContext();

	const deleteChat = (chatId: string) => {
		const message = new WsMessageBase(uuidv4(), EWsMessageType.DELETE_CHAT, {
			chatId,
		});

		sendWsMessage(JSON.stringify(message.toApi()));
	};

	return { deleteChat };
};
