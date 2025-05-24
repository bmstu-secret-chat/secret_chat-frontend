/* eslint-disable import/no-named-as-default-member */
import dayjs from 'dayjs';
import 'dayjs/locale/ru';

import customParseFormat from 'dayjs/plugin/customParseFormat';
import duration from 'dayjs/plugin/duration';
import isBetween from 'dayjs/plugin/isBetween';
import quarterOfYear from 'dayjs/plugin/quarterOfYear';
import relativeTime from 'dayjs/plugin/relativeTime';
import utc from 'dayjs/plugin/utc';

dayjs.extend(customParseFormat);
dayjs.extend(duration);
dayjs.extend(isBetween);
dayjs.extend(quarterOfYear);
dayjs.extend(relativeTime);
dayjs.extend(utc);

dayjs.locale('ru');

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

export const formatLastOnline = (lastOnline: string) => {
	const now = dayjs();
	const lastOnlineDate = dayjs(+lastOnline * 1000);
	const delta = dayjs.duration(lastOnlineDate.diff(now));

	return delta.humanize(true);
};
