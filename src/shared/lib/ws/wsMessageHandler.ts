'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	useSendMessageResponseHandler,
	useSendMessageHandler,
} from '@/shared/lib/ws';
import {
	useCreateChatHandler,
	useDeleteChatHandler,
	useClearChatHandler,
} from '@/shared/lib/ws/handlers';
import {
	EWsMessageType,
	TWSListenerCallback,
	WsMessageBase,
} from '@/shared/model';
import { useWebSocketContext } from '@/shared/model/contexts';
import { EWsEvent } from '@/shared/model/enums';

export const WsMessageHandler = () => {
	const { addListener, removeListener } = useWebSocketContext();

	const dispatch = useDispatch();

	const { sendMessageHandler } = useSendMessageHandler();
	const { sendMessageResponseHandler } = useSendMessageResponseHandler();
	const { createChatHandler } = useCreateChatHandler();
	const { deleteChatHandler } = useDeleteChatHandler();
	const { clearChatHandler } = useClearChatHandler();

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
					case EWsMessageType.CREATE_CHAT:
						createChatHandler(wsMessage);
						break;
					case EWsMessageType.DELETE_CHAT:
						deleteChatHandler(wsMessage);
						break;
					case EWsMessageType.CLEAR_CHAT:
						clearChatHandler(wsMessage);
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
