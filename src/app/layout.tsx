import type { Metadata } from 'next';
import React from 'react';
import './globals.css';
import { RootLayoutComponent } from '@/features/app/ui';

export const metadata: Metadata = {
	title: 'Safechat',
	description: 'The most secure messenger',
};

export default function RootLayout({
	children,
	modal,
}: {
	children: React.ReactNode;
	modal: React.ReactNode;
}) {
	return <RootLayoutComponent modal={modal}>{children}</RootLayoutComponent>;
}
