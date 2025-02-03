import { ERequestMethods } from '@/shared/model/enums';

export type TServiceConfig = {
	name: string;
	url: string;
	method: ERequestMethods;
};
