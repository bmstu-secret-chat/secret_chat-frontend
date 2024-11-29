'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEnv } from '@/contexts/EnvContext';

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

	const {
		sendMessage,
		lastMessage: message,
		readyState: state,
	} = useWebSocket(apiUrl, {
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
		sendMessage(data);
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
