import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';
import { EMessageStatus } from '@/shared/model';

export const MessageStatus: React.FC<{
	status: EMessageStatus;
}> = ({ status }) => {
	switch (status) {
		case EMessageStatus.SENT:
			return <LoadingOutlined />;
		case EMessageStatus.RECEIVED:
			return <CheckOutlined />;
		case EMessageStatus.ERROR:
			return <CloseOutlined />;
	}
};
