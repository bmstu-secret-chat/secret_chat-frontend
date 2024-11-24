'use client';

import { notFound } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import ChatInput from '@/components/ui/ChatInput/ChatInput';
import Message from '@/components/ui/Message';
import {
	useWebSocketContext,
	WSListenerCallback,
} from '@/contexts/WebSocketContext';
import { cn } from '@/lib/utils';

type MessageProps = {
	fromMe: boolean;
	content: string;
};

export default function Chat({ params }: { params: { id: string } }) {
	const { id } = params;

	if (isNaN(Number(id))) {
		notFound();
	}

	const [message, setMessage] = useState('');
	const [messages, setMessages] = useState<MessageProps[]>([
		{ fromMe: true, content: 'Привет! Как дела?' },
		{ fromMe: false, content: 'Привет! Все хорошо, спасибо. У тебя как?' },
		{ fromMe: true, content: 'Тоже все отлично, спасибо!' },
		{ fromMe: false, content: 'Чем занят сегодня?' },
		{ fromMe: true, content: 'Работаю над новым проектом.' },
		{ fromMe: false, content: 'Звучит интересно! Расскажи подробнее.' },
		{ fromMe: true, content: 'Это приложение для совместных тренировок.' },
		{ fromMe: false, content: 'Вау, отличная идея!' },
		{ fromMe: true, content: 'Спасибо! А ты чем занимаешься?' },
		{ fromMe: false, content: 'Учусь новому. Пробую Next.js.' },
		{ fromMe: true, content: 'Next.js — крутая штука. Мне нравится.' },
		{ fromMe: false, content: 'Согласен. Уже чувствую себя увереннее.' },
		{ fromMe: true, content: 'Если что, пиши, помогу разобраться.' },
		{ fromMe: false, content: 'Обязательно. Спасибо!' },
		{ fromMe: false, content: 'Учусь новому. Пробую Next.js.' },
		{ fromMe: true, content: 'Next.js — крутая штука. Мне нравится.' },
		{ fromMe: false, content: 'Согласен. Уже чувствую себя увереннее.' },
		{ fromMe: true, content: 'Если что, пиши, помогу разобраться.' },
		{ fromMe: false, content: 'Обязательно. Спасибо!' },
		{ fromMe: true, content: 'Не за что. Удачи!' },
	]);

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
				'flex absolute flex-col items-center p-2',
				'md:ml-[30vw] md:w-[calc(70vw-60px)] w-[calc(100vw-60px)]',
				'h-full overflow-y-auto bg-neutral-800',
			)}
		>
			<h1
				className={cn(
					'flex absolute top-0 justify-center items-center p-2',
					'w-full h-[64px] bg-neutral-800',
					'border-b border-neutral-700',
				)}
			>
				Чат {id}
			</h1>
			<div
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
