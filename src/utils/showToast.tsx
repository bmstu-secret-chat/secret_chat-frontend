import { ConfigProvider, theme, notification } from 'antd';
import type { NotificationPlacement } from 'antd/es/notification/interface';
import React from 'react';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

let openToast: (
	type: NotificationType,
	message: string,
	duration?: number,
	description?: string,
	placement?: NotificationPlacement,
) => void;

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
	children,
}) => {
	const [api, contextHolder] = notification.useNotification();

	openToast = (
		type,
		message,
		duration = 3,
		description,
		placement = 'topRight',
	) => {
		api[type]({
			message,
			description,
			showProgress: true,
			pauseOnHover: true,
			duration,
			placement,
		});
	};

	return (
		<ConfigProvider
			theme={{
				algorithm: theme.darkAlgorithm,
			}}
		>
			{contextHolder}
			{children}
		</ConfigProvider>
	);
};

export const showToast = (
	type: NotificationType,
	message: string,
	duration?: number,
	description?: string,
	placement?: NotificationPlacement,
) => {
	if (!openToast) {
		throw new Error(
			'NotificationProvider is not initialized. Wrap your app in <NotificationProvider>.',
		);
	}
	openToast(type, message, duration, description, placement);
};
