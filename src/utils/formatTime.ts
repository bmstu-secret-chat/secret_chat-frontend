import dayjs, { extend, locale } from 'dayjs';
import 'dayjs/locale/ru';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

locale('ru');
extend(utc);
extend(timezone);

export const formatTime = (time: string): string => {
	try {
		const timeInMs = parseInt(time, 10);
		return dayjs(timeInMs).format('HH:mm');
	} catch {
		return 'error';
	}
};
