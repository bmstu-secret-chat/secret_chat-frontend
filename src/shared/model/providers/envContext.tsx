'use client';

import React, { createContext, useContext, ReactNode } from 'react';

interface IEnvConfig {
	apiUrl: string;
}

const EnvContext = createContext<IEnvConfig | undefined>(undefined);

interface IEnvProviderProps {
	children: ReactNode;
}

export const EnvProvider: React.FC<IEnvProviderProps> = ({ children }) => {
	const apiUrl = process.env.NEXT_PUBLIC_API_URL;

	if (!apiUrl) {
		throw new Error(
			'NEXT_PUBLIC_API_URL is not defined in the environment variables',
		);
	}

	const envConfig: IEnvConfig = {
		apiUrl,
	};

	return (
		<EnvContext.Provider value={envConfig}>{children}</EnvContext.Provider>
	);
};

export const useEnv = (): IEnvConfig => {
	const context = useContext(EnvContext);
	if (context === undefined) {
		throw new Error('useEnv must be used within an EnvProvider');
	}
	return context;
};
