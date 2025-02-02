import { Modal } from 'antd';
import React from 'react';
import { UserInfo } from '@/entities/user/model';
import { useProfileDelete } from '@/features/profile/model';

type Props = {
	currentUser: UserInfo | null;
};

export const ProfileDelete: React.FC<Props> = ({ currentUser }) => {
	const { isOpen, isFetching, handleOk, handleCancel } =
		useProfileDelete(currentUser);

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
