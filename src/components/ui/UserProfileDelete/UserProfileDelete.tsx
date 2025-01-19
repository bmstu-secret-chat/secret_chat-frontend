import { Modal } from 'antd';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuthorization from '@/hooks/useAuthorization';
import { selectCurrentUser } from '@/stores/Users/CurrentUserState';
import eventEmitter, { EmitterEvents } from '@/utils/eventEmitter';

const UserProfileDeleteModal = () => {
	const router = useRouter();

	const currentUser = useSelector(selectCurrentUser);

	const { deleteUserAccount } = useAuthorization();

	const [isOpen, setIsOpen] = useState(false);
	const [isFetching, setIsFetching] = useState(false);

	const deleteUser = useCallback(async (): Promise<boolean> => {
		if (!currentUser) {
			return false;
		}

		setIsFetching(true);

		try {
			await deleteUserAccount(currentUser.id);
			return true;
		} catch (error: any) {
			console.error(error);

			return false;
		} finally {
			setIsFetching(false);
		}
	}, [deleteUserAccount, currentUser]);

	const handleOk = useCallback(async () => {
		const isQuerySuccess = await deleteUser();

		if (!isQuerySuccess) {
			return;
		}

		setIsOpen(false);

		router.push('/login');
	}, [deleteUser, router]);

	const handleCancel = useCallback(() => {
		setIsOpen(false);
	}, []);

	const openModal = useCallback(() => {
		setIsOpen(true);
	}, []);

	useEffect(() => {
		eventEmitter.on(EmitterEvents.MODAL_OPEN_USER_PROFILE_DELETE, openModal);

		return () => {
			eventEmitter.off(EmitterEvents.MODAL_OPEN_USER_PROFILE_DELETE, openModal);
		};
	}, [openModal]);

	return (
		<Modal
			title='Удаление профиля'
			open={isOpen}
			okText={'Да, удалить'}
			onOk={handleOk}
			onCancel={handleCancel}
			cancelText={'Не удалять'}
			confirmLoading={isFetching}
		>
			<p>Вы уверены, что хотите удалить свой профиль?</p>
		</Modal>
	);
};

export default UserProfileDeleteModal;
