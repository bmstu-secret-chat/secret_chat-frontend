import dayjs, { extend, locale } from 'dayjs';
import 'dayjs/locale/ru';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

locale('ru');
extend(utc);
extend(timezone);

export const formatTimeHHmm = (time: string): string => {
	try {
		const timeInMs = parseInt(time, 10);

		const adjustedTimeInMs =
			timeInMs >= 9999999999 ? timeInMs : timeInMs * 1000;

		return dayjs(adjustedTimeInMs).format('HH:mm');
	} catch {
		return 'error';
	}
};

export const formatTimeDDMMYYHHmm = (time: string): string => {
	const timeInMs = parseInt(time, 10);
	const adjustedTimeInMs = +time >= 9999999999 ? time : timeInMs * 1000;

	return dayjs(adjustedTimeInMs).format('DD.MM в HH:mm');
};

export const formatDateDDMMYYYY = (
	date: Date | dayjs.Dayjs | string,
): string => {
	return dayjs(date).format('DD.MM.YYYY');
};
