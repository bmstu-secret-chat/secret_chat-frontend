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

type Props = Readonly<{
	children: React.ReactNode;
}>;

const RootLayout: React.FC<Props> = ({ children }) => {
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
						</BeforeRender>
					</ConfigProvider>
				</AppContextProvider>
			</body>
		</html>
	);
};

export default RootLayout;
