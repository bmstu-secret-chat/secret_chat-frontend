'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

interface UserContextType {
	userId: string;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [userId] = useState<string>(() => {
		if (typeof window !== 'undefined') {
			const storedUserId = localStorage.getItem('userId');
			return storedUserId ? storedUserId : uuidv4();
		}

		return '';
	});

	useEffect(() => {
		if (typeof window !== 'undefined') {
			localStorage.setItem('userId', userId);
		}
	}, [userId]);

	return (
		<UserContext.Provider value={{ userId }}>{children}</UserContext.Provider>
	);
};

export const useUser = (): UserContextType => {
	const context = useContext(UserContext);
	if (!context) {
		throw new Error('useUser must be used within a UserProvider');
	}
	return context;
};
