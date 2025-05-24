import { useDispatch, useSelector } from 'react-redux';
import { addMessageAction } from '@/entities/message/model';
import { selectCurrentUser } from '@/entities/user/model';
import { decryptMessage, SafeChatDB, showError, vibrate } from '@/shared/lib';
import { WsMessageBase } from '@/shared/model';

export const useSendMessageHandler = () => {
	const user = useSelector(selectCurrentUser);
	const dispatch = useDispatch();

	const sendMessageHandler = async (wsMessage: WsMessageBase) => {
		if (!user) {
			showError('Пользователь не найден');
			return;
		}

		const db = new SafeChatDB();
		const myPrivateKey = await db.getValue(user.id);
		if (!myPrivateKey) {
			showError('Ключ шифрования не найден');
			return;
		}

		let message = wsMessage.toMessage();

		try {
			const decryptedContent = await decryptMessage(
				wsMessage.toMessage().content,
				myPrivateKey,
			);
			message = { ...message, content: decryptedContent };
		} catch {
			message = { ...message, content: 'Ошибка расшифровки сообщения' };
		}

		vibrate(20);
		dispatch(addMessageAction(message));
	};

	return { sendMessageHandler };
};
