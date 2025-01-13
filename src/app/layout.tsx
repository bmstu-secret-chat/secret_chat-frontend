import { ConfigProvider } from 'antd';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { Sidebar } from '@/components/ui/Sidebar/Sidebar';
import BeforeRender from '@/components/utils/BeforeRender';
import { AppContextProvider } from '@/contexts/AppContextProvider';
import { cn } from '@/lib/utils';
import Ws from '@/utils/ws';

export const metadata: Metadata = {
	title: 'Safe chat',
	description: 'The most secure messenger',
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
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
						<BeforeRender>
							<Ws />
							<Sidebar />
							<div className={cn('ml-[60px] bg-zinc-950')}>{children}</div>

							{modal}
						</BeforeRender>
					</ConfigProvider>
				</AppContextProvider>
			</body>
		</html>
	);
}
