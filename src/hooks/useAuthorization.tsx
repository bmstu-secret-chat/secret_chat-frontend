import { useDispatch, useSelector } from 'react-redux';
import { AuthorizationService } from '@/app/api/AuthorizationService';
import { showToast } from '@/components/utils/showToast';
import {
	deleteCurrentUserAction,
	selectIsAuthorized,
	setCurrentUserAction,
} from '@/stores/Users/CurrentUserState';

const useAuthorization = () => {
	const dispatch = useDispatch();

	const authorizationService = new AuthorizationService();

	const isAuthorized = useSelector(selectIsAuthorized);

	const signup = async (username: string, password: string) => {
		try {
			const user = await authorizationService.signup({ username, password });
			dispatch(setCurrentUserAction(user));
		} catch (error: any) {
			showToast('error', error.message);
			dispatch(deleteCurrentUserAction());
		}
	};

	const login = async (username: string, password: string) => {
		try {
			const user = await authorizationService.login({ username, password });
			dispatch(setCurrentUserAction(user));
		} catch (error: any) {
			showToast('error', error.message);
			dispatch(deleteCurrentUserAction());
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
			await authorizationService.check();
		} catch {
			// TODO
		}
	};

	return {
		isAuthorized,
		signup,
		login,
		logout,
		checkAuthorization,
	};
};

export default useAuthorization;
