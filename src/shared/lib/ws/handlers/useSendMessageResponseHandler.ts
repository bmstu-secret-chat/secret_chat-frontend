import { useDispatch } from 'react-redux';
import { updateMessageAction } from '@/entities/message/model';
import { WsMessageBase } from '@/shared/model';

export const useSendMessageResponseHandler = () => {
	const dispatch = useDispatch();

	const sendMessageResponseHandler = (wsMessage: WsMessageBase) => {
		dispatch(updateMessageAction(wsMessage));
	};

	return { sendMessageResponseHandler };
};
