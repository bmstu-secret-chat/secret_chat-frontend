'use client';

import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ChatInput from '@/components/ui/ChatInput/ChatInput';
import {
	useWebSocketContext,
	WSListenerCallback,
} from '@/contexts/WebSocketContext';
import { cn } from '@/lib/utils';

export default function Chat({ params }: { params: { id: string } }) {
	const { id } = params;

	if (isNaN(Number(id))) {
		notFound();
	}

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<string[]>([]);
	const { addListener, removeListener, send } = useWebSocketContext();

	useEffect(() => {
		const listener: WSListenerCallback = (event, data) => {
			if (event === 'message' && data instanceof MessageEvent) {
				setMessages((prevMessages) => [...prevMessages, data.data]);
			}
		};
		addListener(listener);

		return () => {
			removeListener(listener);
		};
	}, []);

	const sendMessage = () => {
		if (message.trim()) {
			send(message);
		}
	};

	return (
		<div
			className={cn(
				'flex absolute flex-col',
				'md:ml-[30vw] md:w-[calc(70vw-60px)] w-[calc(100vw-60px)]',
				'h-full overflow-y-auto',
			)}
		>
			<h1>Чат {id}</h1>
			<ul>
				{messages.map((msg, index) => (
					<li key={index}>{msg}</li>
				))}
			</ul>
			<ChatInput
				value={message}
				setValue={setMessage}
				onSubmit={sendMessage}
			/>
		</div>
	);
}
