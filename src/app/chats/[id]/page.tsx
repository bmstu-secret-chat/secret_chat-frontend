// app/chat/page.tsx
'use client';

import { notFound } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import ChatInput from '@/components/ui/ChatInput/ChatInput';
import Message from '@/components/ui/Message/Message';
import { useWebSocketContext } from '@/contexts/WebSocketContext';
import { useScreenWidth } from '@/hooks/useScreenWidth';
import { cn } from '@/lib/utils';
import { selectMessages } from '@/stores/Messages/MessagesState';
import vibrate from '@/utils/vibrate';

export default function Chat({ params }: { params: { id: string } }) {
	const messagesContainerRef = useRef<HTMLDivElement>(null);
	const [content, setContent] = useState('');

	const { isTabletDevice } = useScreenWidth();

	// const [isLoading, setIsLoading] = useState(true); // состояние загрузки
	//
	// const loadMessages = async () => {
	// 	await new Promise((resolve) => {
	// 		setTimeout(resolve, 5 * 1000);
	// 	});
	// 	setIsLoading(false);
	// };
	//
	// useEffect(() => {
	// 	loadMessages();
	// }, []);

	const messages = useSelector(selectMessages);

	const { id } = params;

	if (isNaN(Number(id))) {
		notFound();
	}

	const { send } = useWebSocketContext();

	useEffect(() => {
		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current.scrollHeight,
		});
	}, []);

	useEffect(() => {
		messagesContainerRef.current?.scrollTo({
			top: messagesContainerRef.current.scrollHeight,
			behavior: 'smooth',
		});
	}, [messages]);

	const sendMessage = () => {
		send(content);
		if (isTabletDevice) vibrate(10);
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
				{/*{isLoading && (*/}
				{/*	<Skeleton*/}
				{/*		active*/}
				{/*		paragraph={{ rows: 5 }}*/}
				{/*	/>*/}
				{/*)}*/}
				{messages.map((msg, index) => (
					<Message
						key={index}
						msg={msg}
					/>
				))}
			</div>
			<ChatInput
				value={content}
				setValue={setContent}
				onSubmit={sendMessage}
			/>
		</div>
	);
}
