import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import {
	addMessageAction,
	updateMessageAction,
} from '@/entities/message/model';
import { selectCurrentUser } from '@/entities/user/model';
import {
	EWsMessageResponseStatus,
	EWsMessageStatus,
	EWsMessageType,
	useWebSocketContext,
	WsMessageBase,
} from '@/shared/model';

export const useSendMessage = () => {
	const dispatch = useDispatch();

	const user = useSelector(selectCurrentUser);

	const { sendWsMessage } = useWebSocketContext();

	const sendMessage = (chatId: string, data: string) => {
		const messageContent = data.trim();
		if (!messageContent || messageContent.length === 0) {
			return;
		}

		const message = new WsMessageBase(uuidv4(), EWsMessageType.SEND_MESSAGE, {
			userId: user!.id,
			chatId,
			status: EWsMessageStatus.SENT,
			content: messageContent,
			time: new Date().getTime().toString(),
		});

		dispatch(addMessageAction(message));

		sendWsMessage(JSON.stringify(message.toApi()));

		// Если сервер не отвечает в течение 5 секунд, ставим ошибку
		const messageWithError = new WsMessageBase(
			message.id,
			EWsMessageType.SEND_MESSAGE_RESPONSE,
			{
				chatId,
				status: EWsMessageResponseStatus.ERROR,
			},
		);

		setTimeout(() => {
			dispatch(updateMessageAction(messageWithError));
		}, 5 * 1000);
	};

	return { sendMessage };
};
