import { Popover as AntdPopover } from 'antd';
import React from 'react';

type Props = {
	className?: string;
	open: boolean;
	title?: string;
	content: React.ReactNode;
	children: React.ReactNode;
};

export const Popover: React.FC<Props> = ({
	className,
	open,
	title,
	content,
	children,
}) => (
	<AntdPopover
		className={className}
		open={open}
		title={title}
		content={content}
	>
		{children}
	</AntdPopover>
);
