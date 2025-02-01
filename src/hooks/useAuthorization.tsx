/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch } from 'react-redux';
import { UsersService } from '@/entities/user/api/usersService';
import { AuthorizationService } from '@/shared/api/AuthorizationService';
import { showToast } from '@/shared/lib/showToast';

const useAuthorization = () => {
	const dispatch = useDispatch();

	const usersService = new UsersService();
	const authorizationService = new AuthorizationService();

	const checkAuthorization = async () => {
		try {
			const user = await authorizationService.check();
			dispatch(setCurrentUserAction(user));
		} catch {
			// TODO
		}
	};

	const deleteUserAccount = async (userId: string) => {
		try {
			await usersService.deleteUserAccount(userId);
			dispatch(deleteCurrentUserAction());
		} catch (error: any) {
			showToast('error', error.message);
		}
	};

	return {
		logout,
		checkAuthorization,
		deleteUserAccount,
	};
};

export default useAuthorization;
