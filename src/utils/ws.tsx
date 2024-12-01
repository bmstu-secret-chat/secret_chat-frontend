'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	useWebSocketContext,
	WSEventType,
	WSListenerCallback,
} from '@/contexts/WebSocketContext';
import {
	addMessageAction,
	updateMessageAction,
} from '@/stores/Messages/MessagesState';
import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';
import { WsMessage, WsMessageResponseApi } from '@/types/WsMessages';

const WsUtils = () => {
	const { addListener, removeListener } = useWebSocketContext();

	const dispatch = useDispatch();

	useEffect(() => {
		const listener: WSListenerCallback = (event, data) => {
			if (event === WSEventType.MESSAGE && data instanceof MessageEvent) {
				const wsMessage = JSON.parse(data.data);

				// Новое сообщение
				if (wsMessage?.message?.content) {
					const message = WsMessage.createMessageFromApi(wsMessage);
					dispatch(addMessageAction(message.toPlain()));
				}
				// Обновление сообщения
				else {
					const message: WsMessageResponseApi = {
						status:
							wsMessage.status === 'ok'
								? WsMessageStatusEnum.RECEIVED
								: WsMessageStatusEnum.ERROR,
						time: wsMessage.time,
					};
					// console.log(message);
					dispatch(updateMessageAction(message));
				}
			}
		};
		addListener(listener);

		return () => {
			removeListener(listener);
		};
		// eslint-disable-next-line  react-hooks/exhaustive-deps
	}, [dispatch]);

	return null;
};

export default WsUtils;
