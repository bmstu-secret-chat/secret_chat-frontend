'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from '@/components/utils/showToast';
import { EnvProvider } from '@/contexts/EnvContext';
import { UserProvider } from '@/contexts/UserContext';
import WebSocketProvider from '@/contexts/WebSocketContext';
import store from '@/stores/store';

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<Provider store={store}>
		<ToastProvider>
			<EnvProvider>
				<UserProvider>
					<WebSocketProvider>{children}</WebSocketProvider>
				</UserProvider>
			</EnvProvider>
		</ToastProvider>
	</Provider>
);
