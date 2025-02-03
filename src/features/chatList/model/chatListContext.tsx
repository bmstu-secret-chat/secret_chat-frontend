'use client';

import React, { createContext, useContext, ReactNode, useState } from 'react';
import { TUserShortInfoModel } from '@/entities/user/model';

interface IChatListConfig {
	foundedUsers: TUserShortInfoModel[];
	setFoundedUsers: (users: TUserShortInfoModel[]) => void;
}

const ChatListContext = createContext<IChatListConfig | undefined>(undefined);

interface IChatListProviderProps {
	children: ReactNode;
}

export const ChatListProvider: React.FC<IChatListProviderProps> = ({
	children,
}) => {
	const [foundedUsers, setFoundedUsers] = useState<TUserShortInfoModel[]>([]);

	const chatListConfig: IChatListConfig = {
		foundedUsers,
		setFoundedUsers,
	};

	return (
		<ChatListContext.Provider value={chatListConfig}>
			{children}
		</ChatListContext.Provider>
	);
};

export const useChatListContext = (): IChatListConfig => {
	const context = useContext(ChatListContext);
	if (context === undefined) {
		throw new Error(
			'useChatListContext must be used within an ChatListContext',
		);
	}
	return context;
};
