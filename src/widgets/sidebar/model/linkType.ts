import React from 'react';

export type TLink = {
	label: React.ReactNode;
	icon: React.JSX.Element | React.ReactNode;
	href: string;
	action?: () => Promise<void> | void;
};
