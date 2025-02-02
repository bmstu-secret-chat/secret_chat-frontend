import type { DatePickerProps } from 'antd';
import { DatePicker as AntdDatePicker } from 'antd';
import type { SizeType } from 'antd/es/config-provider/SizeContext';
import dayjs from 'dayjs';
import React from 'react';
import 'dayjs/locale/ru';

const dateFormat = 'DD.MM.YYYY';

type Props = {
	defaultValue: string | null;
	size?: SizeType;
	onChange?: DatePickerProps['onChange'];
};

export const DatePicker: React.FC<Props> = ({
	defaultValue: defaultValueRaw,
	size,
	onChange,
}) => {
	const defaultValue = defaultValueRaw
		? dayjs(defaultValueRaw, dateFormat)
		: null;
	const today = dayjs();

	return (
		<AntdDatePicker
			format={dateFormat}
			defaultValue={defaultValue}
			onChange={onChange}
			size={size || 'large'}
			minDate={dayjs('01.01.1970', dateFormat)}
			maxDate={dayjs(today, dateFormat)}
		/>
	);
};
