'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { useEnv } from '@/contexts/EnvContext';

export type WSListenerCallback = (
	event: string,
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
			notifyListeners('open');
		},
		onClose: (event) => {
			setReadyState(ReadyState.CLOSED);
			notifyListeners('close', event);
		},
		onError: (event) => {
			notifyListeners('error', event);
		},
		onMessage: (message) => {
			setLastMessage(message);
			notifyListeners('message', message);
		},
		shouldReconnect: () => true,
	});

	const notifyListeners = (
		event: string,
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
