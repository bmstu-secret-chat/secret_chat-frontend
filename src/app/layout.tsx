import { ConfigProvider, ConfigProviderProps } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { WsMessageListener } from '@/shared/lib';
import { AppContextProvider } from '@/shared/model';
import { BeforeRender } from '@/shared/utils';
import { Sidebar } from '@/widgets';

type Locale = ConfigProviderProps['locale'];

export const metadata: Metadata = {
	title: 'Safe chatList',
	description: 'The most secure messenger',
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	const locale: Locale = ruRu;

	return (
		<html
			lang='ru'
			className='dark'
		>
			<body className='bg-zinc-950'>
				<AppContextProvider>
					<ConfigProvider
						locale={locale}
						theme={{
							token: {
								colorPrimary: '#1f1f1f',
								colorBgBase: '#000000',
								colorTextBase: '#ffffff',
							},
						}}
					>
						<BeforeRender>
							<WsMessageListener />
							<Sidebar />
							{children}
							{modal}
						</BeforeRender>
					</ConfigProvider>
				</AppContextProvider>
			</body>
		</html>
	);
}
