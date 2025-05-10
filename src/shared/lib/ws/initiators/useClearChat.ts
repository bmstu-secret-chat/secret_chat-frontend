import { v4 as uuidv4 } from 'uuid';
import { EWsMessageType, WsMessageBase } from '@/shared/model';
import { useWebSocketContext } from '@/shared/model/contexts';

export const useClearChat = () => {
	const { sendWsMessage } = useWebSocketContext();

	const clearChat = (chatId: string) => {
		const message = new WsMessageBase(uuidv4(), EWsMessageType.CLEAR_CHAT, {
			chatId,
		});

		sendWsMessage(JSON.stringify(message.toApi()));
	};

	return { clearChat };
};
