'use client';

import { notFound } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import ChatInput from '@/components/ui/ChatInput/ChatInput';
import Message from '@/components/ui/Message/Message';
import {
	useWebSocketContext,
	WSListenerCallback,
} from '@/contexts/WebSocketContext';
import { cn } from '@/lib/utils';

type MessageDto = {
	fromMe: boolean;
	content: string;
	status: 'sent' | 'received' | 'error';
};

export default function Chat({ params }: { params: { id: string } }) {
	const messagesContainerRef = useRef<HTMLDivElement>(null);

	const { id } = params;

	if (isNaN(Number(id))) {
		notFound();
	}

	const randomStatus = (): MessageDto['status'] => {
		const statuses: MessageDto['status'][] = ['sent', 'received', 'error'];
		return statuses[Math.floor(Math.random() * statuses.length)];
	};

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<MessageDto[]>([
		{ fromMe: true, content: 'Привет! Как дела?', status: randomStatus() },
		{
			fromMe: false,
			content: 'Привет! Все хорошо, спасибо. У тебя как?',
			status: randomStatus(),
		},
		{
			fromMe: true,
			content: 'Тоже все отлично, спасибо!',
			status: randomStatus(),
		},
		{ fromMe: false, content: 'Чем занят сегодня?', status: randomStatus() },
		{
			fromMe: true,
			content: 'Работаю над новым проектом.',
			status: randomStatus(),
		},
		{
			fromMe: false,
			content: 'Звучит интересно! Расскажи подробнее.',
			status: randomStatus(),
		},
		{
			fromMe: true,
			content: 'Это приложение для совместных тренировок.',
			status: randomStatus(),
		},
		{ fromMe: false, content: 'Вау, отличная идея!', status: randomStatus() },
		{
			fromMe: true,
			content: 'Спасибо! А ты чем занимаешься?',
			status: randomStatus(),
		},
		{
			fromMe: false,
			content: 'Учусь новому. Пробую Next.js.',
			status: randomStatus(),
		},
		{
			fromMe: true,
			content: 'Next.js — крутая штука. Мне нравится.',
			status: randomStatus(),
		},
		{
			fromMe: false,
			content: 'Согласен. Уже чувствую себя увереннее.',
			status: randomStatus(),
		},
		{
			fromMe: true,
			content: 'Если что, пиши, помогу разобраться.',
			status: randomStatus(),
		},
		{ fromMe: false, content: 'Обязательно. Спасибо!', status: randomStatus() },
		{ fromMe: true, content: 'Не за что. Удачи!', status: randomStatus() },
	]);

	const { addListener, removeListener, send } = useWebSocketContext();

	useEffect(() => {
		const listener: WSListenerCallback = (event, data) => {
			if (event === 'message' && data instanceof MessageEvent) {
				setMessages((prevMessages) => [...prevMessages, data.data]);
			}
		};
		addListener(listener);

		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current.scrollHeight,
		});

		return () => {
			removeListener(listener);
		};
		// eslint-disable-next-line  react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current.scrollHeight,
			behavior: 'smooth',
		});
	}, [messages]);

	const sendMessage = () => {
		if (message.trim()) {
			send(message);
		}

		setMessages((prevMessages) => [
			...prevMessages,
			{ fromMe: true, content: message, status: randomStatus() },
		]);
	};

	return (
		<div
			className={cn(
				'flex absolute flex-col items-center p-2',
				'md:ml-[30vw] md:w-[calc(70vw-60px)] w-[calc(100vw-60px)]',
				'h-full overflow-y-auto bg-neutral-800',
			)}
		>
			<span
				className={cn(
					'flex absolute top-0 justify-center items-center p-2',
					'w-full h-[64px] bg-neutral-800',
					'border-b border-neutral-700 text-white font-normal text-xl',
				)}
			>
				Чат {id}
			</span>
			<div
				ref={messagesContainerRef}
				className={cn(
					'flex absolute flex-col items-center p-2 top-[64px]',
					'w-full h-[calc(100vh-64px-76px)] overflow-y-auto bg-neutral-800',
				)}
			>
				{messages.map((msg, index) => (
					<Message
						key={index}
						fromMe={msg.fromMe}
						content={msg.content}
						status={msg.status}
					/>
				))}
			</div>
			<ChatInput
				value={message}
				setValue={setMessage}
				onSubmit={sendMessage}
			/>
		</div>
	);
}
