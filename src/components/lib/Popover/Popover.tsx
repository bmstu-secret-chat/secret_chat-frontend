import { Popover as AntdPopover } from 'antd';
import React from 'react';

type Props = {
	open: boolean;
	title?: string;
	content: React.ReactNode;
	children: React.ReactNode;
};

const Popover: React.FC<Props> = ({ open, title, content, children }) => (
	<AntdPopover
		open={open}
		title={title}
		content={content}
	>
		{children}
	</AntdPopover>
);

export default Popover;
