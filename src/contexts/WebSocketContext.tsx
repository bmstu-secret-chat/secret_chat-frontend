'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEnv } from '@/contexts/EnvContext';
import { useUser } from '@/contexts/UserContext';
import {
	addMessageAction,
	updateMessageAction,
} from '@/stores/Messages/MessagesState';
import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';
import { WsMessage } from '@/types/WsMessages';

export enum WSEventType {
	OPEN = 'open',
	CLOSE = 'close',
	ERROR = 'error',
	MESSAGE = 'message',
}

export type WSListenerCallback = (
	event: WSEventType,
	data?: MessageEvent | CloseEvent | Event,
) => void;

interface WebSocketContextType {
	readyState: ReadyState;
	lastMessage: MessageEvent | null;
	addListener: (callback: WSListenerCallback) => void;
	removeListener: (callback: WSListenerCallback) => void;
	send: (data: string | ArrayBuffer | Blob | ArrayBufferView) => void;
}

const WebSocketContext = createContext<WebSocketContextType | undefined>(
	undefined,
);

export const useWebSocketContext = (): WebSocketContextType => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw new Error(
			'useWebSocketContext must be used within a WebSocketProvider',
		);
	}
	return context;
};

const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [listeners, setListeners] = useState<WSListenerCallback[]>([]);
	const [readyState, setReadyState] = useState<ReadyState>(ReadyState.CLOSED);
	const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

	const { apiUrl } = useEnv();
	const wsUrl = `wss://${apiUrl}/api/realtime/messenger/`;
	const { userId } = useUser();

	const dispatch = useDispatch();

	const {
		sendMessage,
		lastMessage: message,
		readyState: state,
	} = useWebSocket(wsUrl, {
		onOpen: () => {
			setReadyState(ReadyState.OPEN);
			notifyListeners(WSEventType.OPEN);
		},
		onClose: (event) => {
			setReadyState(ReadyState.CLOSED);
			notifyListeners(WSEventType.CLOSE, event);
		},
		onError: (event) => {
			notifyListeners(WSEventType.ERROR, event);
		},
		onMessage: (message) => {
			setLastMessage(message);
			notifyListeners(WSEventType.MESSAGE, message);
		},
		shouldReconnect: () => true,
	});

	const notifyListeners = (
		event: WSEventType,
		data?: MessageEvent | CloseEvent | Event,
	) => {
		listeners.forEach((callback) => callback(event, data));
	};

	const addListener = (callback: WSListenerCallback) => {
		setListeners((prev) => [...prev, callback]);
	};

	const removeListener = (callback: WSListenerCallback) => {
		setListeners((prev) => prev.filter((listener) => listener !== callback));
	};

	const send = (data: string | ArrayBuffer | Blob | ArrayBufferView) => {
		if (typeof data !== 'string') return;

		const messageContent = data.trim();
		if (!messageContent || messageContent.length === 0) {
			return;
		}

		const message = WsMessage.create(
			userId,
			WsMessageStatusEnum.SENT,
			messageContent,
		);

		dispatch(addMessageAction(message.toPlain()));

		sendMessage(JSON.stringify(message.toApi()));

		// если сервак не отвечает в течение 5 секунд, то ставим ошибку
		setTimeout(() => {
			dispatch(
				updateMessageAction({
					status: WsMessageStatusEnum.ERROR,
					time: message.message.time,
				}),
			);
		}, 5 * 1000);
	};

	useEffect(() => {
		setLastMessage(message);
		setReadyState(state);
	}, [message, state]);

	return (
		<WebSocketContext.Provider
			value={{ readyState, lastMessage, addListener, removeListener, send }}
		>
			{children}
		</WebSocketContext.Provider>
	);
};

export default WebSocketProvider;
