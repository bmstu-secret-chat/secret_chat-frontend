'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import useWebSocket, { ReadyState } from 'react-use-websocket';
import {
	addMessageAction,
	updateMessageAction,
	WsMessage,
} from '@/entities/message/model';
import { selectCurrentUser } from '@/entities/user/model';
import { EWsEvent, EWsMessageStatus } from '@/shared/model';
import { useEnv } from '@/shared/model/contexts';

export type TWSListenerCallback = (
	event: EWsEvent,
	data?: MessageEvent | CloseEvent | Event,
) => void;

interface IWebSocketContextType {
	readyState: ReadyState;
	lastMessage: MessageEvent | null;
	addListener: (callback: TWSListenerCallback) => void;
	removeListener: (callback: TWSListenerCallback) => void;
	send: (data: string | ArrayBuffer | Blob | ArrayBufferView) => void;
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
	const wsUrl = `wss://${apiUrl}/api/realtime/${user?.id}`;

	const dispatch = useDispatch();

	const {
		sendMessage,
		lastMessage: message,
		readyState: state,
		getWebSocket,
	} = useWebSocket(user ? wsUrl : null, {
		// Подключаемся только если есть пользователь
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

	const send = (data: string | ArrayBuffer | Blob | ArrayBufferView) => {
		if (typeof data !== 'string' || !user) return;

		const messageContent = data.trim();
		if (!messageContent || messageContent.length === 0) {
			return;
		}

		const message = WsMessage.create(
			user.id,
			EWsMessageStatus.SENT,
			messageContent,
		);

		dispatch(addMessageAction(message.toPlain()));

		sendMessage(JSON.stringify(message.toApi()));

		// Если сервер не отвечает в течение 5 секунд, ставим ошибку
		setTimeout(() => {
			dispatch(
				updateMessageAction({
					status: EWsMessageStatus.ERROR,
					time: message.message.time,
				}),
			);
		}, 5 * 1000);
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
			value={{ readyState, lastMessage, addListener, removeListener, send }}
		>
			{children}
		</WebSocketContext.Provider>
	);
};
