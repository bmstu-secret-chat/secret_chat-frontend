import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { Sidebar } from '@/components/ui/Sidebar/Sidebar';
import { AppContextProvider } from '@/contexts/AppContextProvider';
import { cn } from '@/lib/utils';
import Ws from '@/utils/ws';

export const metadata: Metadata = {
	title: 'Create Next App',
	description: 'Generated by create next app',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang='ru'
			className='dark'
		>
			<body>
				<AppContextProvider>
					<ConfigProvider
						theme={{
							token: {
								colorPrimary: '#1f1f1f',
								colorBgBase: '#000000',
								colorTextBase: '#ffffff',
							},
						}}
					>
						<Ws />
						<Sidebar />
						<div className={cn('ml-[60px]')}>{children}</div>
					</ConfigProvider>
				</AppContextProvider>
			</body>
		</html>
	);
}
