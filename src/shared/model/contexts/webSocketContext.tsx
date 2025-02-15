'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import { selectCurrentUser } from '@/entities/user/model';
import { EWsEvent, useEnv } from '@/shared/model';

export type TWSListenerCallback = (
	event: EWsEvent,
	data?: MessageEvent | CloseEvent | Event,
) => void;

interface IWebSocketContextType {
	readyState: ReadyState;
	lastMessage: MessageEvent | null;
	addListener: (callback: TWSListenerCallback) => void;
	removeListener: (callback: TWSListenerCallback) => void;
	sendWsMessage: (data: string) => void;
}

const WebSocketContext = createContext<IWebSocketContextType | undefined>(
	undefined,
);

export const useWebSocketContext = (): IWebSocketContextType => {
	const context = useContext(WebSocketContext);
	if (!context) {
		throw new Error(
			'useWebSocketContext must be used within a WebSocketProvider',
		);
	}
	return context;
};

export const WebSocketProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [listeners, setListeners] = useState<TWSListenerCallback[]>([]);
	const [readyState, setReadyState] = useState<ReadyState>(ReadyState.CLOSED);
	const [lastMessage, setLastMessage] = useState<MessageEvent | null>(null);

	const user = useSelector(selectCurrentUser);

	const { apiUrl } = useEnv();
	const wsUrl = `wss://${apiUrl}/api/realtime/${user?.id}/`;

	const {
		sendMessage: sendWsMessage,
		lastMessage: message,
		readyState: state,
		getWebSocket,
		// Подключаемся только если есть пользователь
	} = useWebSocket(user ? wsUrl : null, {
		onOpen: () => {
			setReadyState(ReadyState.OPEN);
			notifyListeners(EWsEvent.OPEN);
		},
		onClose: (event) => {
			setReadyState(ReadyState.CLOSED);
			notifyListeners(EWsEvent.CLOSE, event);
		},
		onError: (event) => {
			notifyListeners(EWsEvent.ERROR, event);
		},
		onMessage: (message) => {
			setLastMessage(message);
			notifyListeners(EWsEvent.MESSAGE, message);
		},
		shouldReconnect: () => !!user,
	});

	const notifyListeners = (
		event: EWsEvent,
		data?: MessageEvent | CloseEvent | Event,
	) => {
		listeners.forEach((callback) => callback(event, data));
	};

	const addListener = (callback: TWSListenerCallback) => {
		setListeners((prev) => [...prev, callback]);
	};

	const removeListener = (callback: TWSListenerCallback) => {
		setListeners((prev) => prev.filter((listener) => listener !== callback));
	};

	useEffect(() => {
		setLastMessage(message);
		setReadyState(state);
	}, [message, state]);

	useEffect(() => {
		const ws = getWebSocket();
		if (!user && ws) {
			ws.close();
		}
	}, [user, getWebSocket]);

	return (
		<WebSocketContext.Provider
			value={{
				readyState,
				lastMessage,
				addListener,
				removeListener,
				sendWsMessage,
			}}
		>
			{children}
		</WebSocketContext.Provider>
	);
};
