import { useDispatch } from 'react-redux';
import { updateMessageAction, WsMessageBase } from '@/entities/message/model';

export const useSendMessageResponseHandler = () => {
	const dispatch = useDispatch();

	const sendMessageResponseHandler = (wsMessage: WsMessageBase) => {
		dispatch(updateMessageAction(wsMessage));
	};

	return { sendMessageResponseHandler };
};
