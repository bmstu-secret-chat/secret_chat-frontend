import type { DatePickerProps } from 'antd';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import React from 'react';
import 'dayjs/locale/ru';

const dateFormat = 'DD.MM.YYYY';

type Props = {
	defaultValue: string | null;
	onChange?: DatePickerProps['onChange'];
};

const BirthdayDatePicker: React.FC<Props> = ({
	defaultValue: defaultValueRaw,
	onChange,
}) => {
	const defaultValue = defaultValueRaw
		? dayjs(defaultValueRaw, dateFormat)
		: null;
	const today = dayjs();

	return (
		<DatePicker
			format={dateFormat}
			defaultValue={defaultValue}
			onChange={onChange}
			size={'large'}
			minDate={dayjs('01.01.1970', dateFormat)}
			maxDate={dayjs(today, dateFormat)}
		/>
	);
};

export default BirthdayDatePicker;
