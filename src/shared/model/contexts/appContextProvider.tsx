'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ToastProvider } from '@/shared/lib';
import { WebSocketProvider, EnvProvider, store } from '@/shared/model';

export const AppContextProvider = ({
	children,
}: {
	children: React.ReactNode;
}) => (
	<Provider store={store}>
		<ToastProvider>
			<EnvProvider>
				<WebSocketProvider>{children}</WebSocketProvider>
			</EnvProvider>
		</ToastProvider>
	</Provider>
);
