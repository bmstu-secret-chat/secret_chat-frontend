import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { EWsMessageStatus } from '@/shared/model';

export const MessageStatus: React.FC<{
	status: EWsMessageStatus;
}> = ({ status }) => {
	switch (status) {
		case EWsMessageStatus.SENT:
			return <LoadingOutlined />;
		case EWsMessageStatus.RECEIVED:
			return <CheckOutlined />;
		case EWsMessageStatus.ERROR:
			return <CloseOutlined />;
	}
};
