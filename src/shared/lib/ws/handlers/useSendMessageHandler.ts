import { useDispatch } from 'react-redux';
import { addMessageAction } from '@/entities/message/model';
import { vibrate } from '@/shared/lib';
import { WsMessageBase } from '@/shared/model';

export const useSendMessageHandler = () => {
	const dispatch = useDispatch();

	const sendMessageHandler = (wsMessage: WsMessageBase) => {
		vibrate(20);
		dispatch(addMessageAction(wsMessage.toMessage()));
	};

	return { sendMessageHandler };
};
