'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface EnvConfig {
	apiUrl: string;
}

const EnvContext = createContext<EnvConfig | undefined>(undefined);

interface EnvProviderProps {
	children: ReactNode;
}

export const EnvProvider: React.FC<EnvProviderProps> = ({ children }) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!apiUrl) {
		throw new Error(
			'NEXT_PUBLIC_API_URL is not defined in the environment variables',
		);
	}

	const envConfig: EnvConfig = {
		apiUrl,
	};

	return (
		<EnvContext.Provider value={envConfig}>{children}</EnvContext.Provider>
	);
};

// Кастомный хук для использования контекста
export const useEnv = (): EnvConfig => {
	const context = useContext(EnvContext);
	if (context === undefined) {
		throw new Error('useEnv must be used within an EnvProvider');
	}
	return context;
};
