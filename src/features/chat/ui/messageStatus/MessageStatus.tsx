import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';

export const MessageStatus: React.FC<{
	status: WsMessageStatusEnum;
}> = ({ status }) => {
	switch (status) {
		case WsMessageStatusEnum.SENT:
			return <LoadingOutlined />;
		case WsMessageStatusEnum.RECEIVED:
			return <CheckOutlined />;
		case WsMessageStatusEnum.ERROR:
			return <CloseOutlined />;
	}
};
