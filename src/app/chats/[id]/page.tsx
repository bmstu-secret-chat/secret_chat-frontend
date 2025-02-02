'use client';

import React from 'react';
import { ChatPage } from '@/features/chat/ui';

export default function Chat({ params }: { params: { id: string } }) {
	return <ChatPage chatId={params.id} />;
}
