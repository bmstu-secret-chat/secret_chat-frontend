import React from 'react';

type Item = {
	label?: React.ReactNode;
	value: React.ReactNode;
};

type Props = {
	item: Item;
	style?: React.CSSProperties;
};

export const LabelValue: React.FC<Props> = ({ item, style }) => {
	return (
		<div style={style}>
			<h3 className='text-xl font-bold dark:text-white text-black'>
				{item.value}
			</h3>
			<p className='text-sm text-gray-500 dark:text-neutral-500'>
				{item.label}
			</p>
		</div>
	);
};
