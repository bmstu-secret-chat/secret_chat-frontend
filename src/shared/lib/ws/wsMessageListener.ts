'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { WsMessageBase, EWsMessageType } from '@/entities/message/model';
import {
	useSendMessageResponseHandler,
	useSendMessageHandler,
} from '@/shared/lib/ws/handlers';
import {
	useWebSocketContext,
	TWSListenerCallback,
} from '@/shared/model/contexts/webSocketContext';
import { EWsEvent } from '@/shared/model/enums';

export const WsMessageListener = () => {
	const { addListener, removeListener } = useWebSocketContext();

	const dispatch = useDispatch();

	const { sendMessageHandler } = useSendMessageHandler();
	const { sendMessageResponseHandler } = useSendMessageResponseHandler();

	useEffect(() => {
		const messageListener: TWSListenerCallback = (event, data) => {
			if (event === EWsEvent.MESSAGE && data instanceof MessageEvent) {
				const wsMessage = WsMessageBase.createFromApi(JSON.parse(data.data));

				switch (wsMessage.type) {
					case EWsMessageType.SEND_MESSAGE:
						sendMessageHandler(wsMessage);
						break;

					case EWsMessageType.SEND_MESSAGE_RESPONSE:
						sendMessageResponseHandler(wsMessage);
						break;
					default:
						break;
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
