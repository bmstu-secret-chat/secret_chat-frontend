'use client';

import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMessages } from '@/entities/message/model';
import { useScreenWidth } from '@/shared/hooks';
import { vibrate } from '@/shared/lib';
import { useWebSocketContext } from '@/shared/model';

export const useChat = () => {
	const messages = useSelector(selectMessages);

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
	}, [messages.length]);

	const sendMessage = () => {
		send(content);
		if (isTabletDevice) vibrate(10);
	};

	return {
		messagesContainerRef,
		messages,
		content,
		setContent,
		sendMessage,
	};
};
