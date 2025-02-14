import { Modal } from 'antd';
import React from 'react';
import { useDeleteSecretChatModal } from '@/widgets/modals/deleteSecretChat/model';

type Props = {
	chatId: string | null;
};

export const DeleteSecretChatModal: React.FC<Props> = ({ chatId }) => {
	const { isOpen, handleOk, handleCancel } = useDeleteSecretChatModal(chatId);

	return (
		<Modal
			title='Выход из секретного чата'
			open={isOpen}
			okText={'Да, удалить'}
			onOk={handleOk}
			onCancel={handleCancel}
			cancelText={'Не удалять'}
		>
			<p>
				Вы уверены, что хотите выйти из секретного чата? Все сообщения в нем
				будут удалены.
			</p>
		</Modal>
	);
};
