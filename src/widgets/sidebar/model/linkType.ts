import React from 'react';

export type TLink = {
	label: React.ReactNode;
	href: string;
	action?: () => Promise<void>;
	icon: React.JSX.Element | React.ReactNode;
};
