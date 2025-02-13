import { useDispatch } from 'react-redux';
import { addMessageAction, WsMessageBase } from '@/entities/message/model';
import { vibrate } from '@/shared/lib';

export const useSendMessageHandler = () => {
	const dispatch = useDispatch();

	const sendMessageHandler = (wsMessage: WsMessageBase) => {
		vibrate(20);
		dispatch(addMessageAction(wsMessage));
	};

	return { sendMessageHandler };
};
