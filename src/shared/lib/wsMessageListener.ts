'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	addMessageAction,
	updateMessageAction,
	WsMessage,
	TWsMessageResponseApi,
} from '@/entities/message/model';
import { vibrate } from '@/shared/lib/index';
import {
	useWebSocketContext,
	TWSListenerCallback,
} from '@/shared/model/contexts/webSocketContext';
import { EWsEvent, EWsMessageStatus } from '@/shared/model/enums';

export const WsMessageListener = () => {
	const { addListener, removeListener } = useWebSocketContext();

	const dispatch = useDispatch();

	useEffect(() => {
		const messageListener: TWSListenerCallback = (event, data) => {
			if (event === EWsEvent.MESSAGE && data instanceof MessageEvent) {
				const wsMessage = JSON.parse(data.data);

				// Новое сообщение
				if (wsMessage?.message?.content) {
					vibrate(20);
					const message = WsMessage.createMessageFromApi(wsMessage);
					dispatch(addMessageAction(message.toPlain()));
				}
				// Обновление сообщения
				else {
					const message: TWsMessageResponseApi = {
						status:
							wsMessage.status === 'ok'
								? EWsMessageStatus.RECEIVED
								: EWsMessageStatus.ERROR,
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
