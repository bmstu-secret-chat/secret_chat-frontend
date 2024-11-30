'use client';

import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
	useWebSocketContext,
	WSEventType,
	WSListenerCallback,
} from '@/contexts/WebSocketContext';
import { addMessageAction } from '@/stores/Messages/MessagesState';
import { WsMessage } from '@/types/WsMessages';

const WsUtils = () => {
	const { addListener, removeListener } = useWebSocketContext();

	const dispatch = useDispatch();

	useEffect(() => {
		const listener: WSListenerCallback = (event, data) => {
			if (event === WSEventType.MESSAGE && data instanceof MessageEvent) {
				const message = WsMessage.createFromApi(JSON.parse(data.data));
				dispatch(addMessageAction(message.toPlain()));
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
