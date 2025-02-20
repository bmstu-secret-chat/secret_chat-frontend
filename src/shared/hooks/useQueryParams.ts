import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { EQueryParams } from '@/shared/model';

export const useQueryParams = () => {
	const searchParams = useSearchParams();
	const pathname = usePathname();
	const router = useRouter();

	const page = searchParams.get(EQueryParams.PAGE);
	const edit = searchParams.get(EQueryParams.EDIT);

	const setQueryParam = (key: EQueryParams, value: string | string[]) => {
		const newSearchParams = new URLSearchParams(searchParams.toString());

		if (Array.isArray(value)) {
			// Если передан массив, заменяем текущий параметр или добавляем новые значения
			newSearchParams.delete(key);
			value.forEach((val) => {
				if (val && val.length > 0) {
					newSearchParams.append(key, val);
				}
			});
		} else {
			// Если передано одно значение, обновляем или удаляем параметр
			if (!value || value.length === 0) {
				newSearchParams.delete(key);
			} else {
				newSearchParams.set(key, value);
			}
		}

		router.push(`${pathname}?${newSearchParams.toString()}`);
	};

	return {
		page,
		edit,
		setQueryParam,
	};
};
