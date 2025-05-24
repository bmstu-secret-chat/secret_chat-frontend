import { ConfigProvider, ConfigProviderProps } from 'antd';
import ruRu from 'antd/locale/ru_RU';
import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { BeforeRender } from '@/features/app/ui';
import { WsMessageHandler } from '@/shared/lib';
import { AppContextProvider } from '@/shared/model';
import { Sidebar } from '@/widgets';

type Locale = ConfigProviderProps['locale'];

export const metadata: Metadata = {
	title: 'SafeChat',
	description:
		'SafeChat - защищенный мессенджер с end-to-end шифрованием для безопасного общения. Конфиденциальность ваших данных - наш главный приоритет.',
	keywords:
		'safe chat, безопасный чат, защищенный мессенджер, конфиденциальное общение, end-to-end шифрование, приватность',
	authors: [{ name: 'SafeChat Team' }],
	openGraph: {
		title: 'SafeChat - Безопасное общение',
		description: 'Защищенный мессенджер с end-to-end шифрованием',
		type: 'website',
		locale: 'ru_RU',
		siteName: 'SafeChat',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'SafeChat - Безопасное общение',
		description: 'Защищенный мессенджер с end-to-end шифрованием',
	},
	verification: {
		google: 'DkzgMUQapXjzr_nyt8DzTLunAbeJ8VNt4RBYlikkb2Y',
		yandex: '25b4c84eab2dca13',
	},
	alternates: {
		canonical: 'https://safe-chat.ru',
	},
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
							<WsMessageHandler />
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
