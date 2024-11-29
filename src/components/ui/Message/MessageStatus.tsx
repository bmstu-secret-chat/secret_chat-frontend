import {
	CheckOutlined,
	CloseOutlined,
	LoadingOutlined,
} from '@ant-design/icons';
import React from 'react';

const MessageStatus: React.FC<{
	status: 'sent' | 'received' | 'error';
}> = ({ status }) => {
	switch (status) {
		case 'sent':
			return <LoadingOutlined />;
		case 'received':
			return <CheckOutlined />;
		case 'error':
			return <CloseOutlined />;
	}
};

export default MessageStatus;
