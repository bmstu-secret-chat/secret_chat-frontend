/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { AuthorizationService } from '@/app/api/AuthorizationService';
import { showToast } from '@/components/utils/showToast';
import {
	deleteCurrentUserAction,
	setCurrentUserAction,
} from '@/stores/Users/CurrentUserState';

const useAuthorization = () => {
	const dispatch = useDispatch();

	const authorizationService = new AuthorizationService();

	const signup = async (username: string, password: string) => {
		try {
			const user = await authorizationService.signup({ username, password });
			dispatch(setCurrentUserAction(user));
		} catch (error: any) {
			showToast('error', error.message);
			dispatch(deleteCurrentUserAction());
			throw error;
		}
	};

	const login = async (username: string, password: string) => {
		try {
			const user = await authorizationService.login({ username, password });
			dispatch(setCurrentUserAction(user));
		} catch (error: any) {
			showToast('error', error.message);
			dispatch(deleteCurrentUserAction());
			throw error;
		}
	};

	const logout = async () => {
		try {
			await authorizationService.logout();
			dispatch(deleteCurrentUserAction());
		} catch (error: any) {
			showToast('error', error.message);
		}
	};

	const checkAuthorization = async () => {
		try {
			const user = await authorizationService.check();
			dispatch(setCurrentUserAction(user));
		} catch {
			// TODO
		}
	};

	return {
		signup,
		login,
		logout,
		checkAuthorization,
	};
};

export default useAuthorization;
