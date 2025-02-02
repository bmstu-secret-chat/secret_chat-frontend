'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { vibrate } from '@/shared/lib/index';
import {
	useWebSocketContext,
	WSEventEnum,
	TWSListenerCallback,
} from '@/shared/model/contexts/webSocketContext';
import {
	addMessageAction,
	updateMessageAction,
} from '@/stores/Messages/MessagesState';
import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';
import { WsMessage, WsMessageResponseApi } from '@/types/WsMessages';

export const WsMessageListener = () => {
	const { addListener, removeListener } = useWebSocketContext();

	const dispatch = useDispatch();

	useEffect(() => {
		const messageListener: TWSListenerCallback = (event, data) => {
			if (event === WSEventEnum.MESSAGE && data instanceof MessageEvent) {
				const wsMessage = JSON.parse(data.data);

				// Новое сообщение
				if (wsMessage?.message?.content) {
					vibrate(20);
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
					dispatch(updateMessageAction(message));
				}
			}
		};

		addListener(messageListener);

		return () => {
			removeListener(messageListener);
		};
		// eslint-disable-next-line  react-hooks/exhaustive-deps
	}, [dispatch]);

	return null;
};
