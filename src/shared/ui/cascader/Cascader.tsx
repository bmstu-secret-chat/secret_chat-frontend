import type { CascaderProps } from 'antd';
import { Cascader as AntdCascader } from 'antd';
import React from 'react';

type Option = {
	value: string;
	label: string;
	children?: Option[];
};

type Props = {
	options: Option[];
	placeholder: string;
	onChange?: CascaderProps<Option>['onChange'];
};

export const Cascader: React.FC<Props> = ({
	options,
	placeholder,
	onChange,
}) => (
	<AntdCascader
		options={options}
		onChange={onChange}
		placeholder={placeholder}
	/>
);
