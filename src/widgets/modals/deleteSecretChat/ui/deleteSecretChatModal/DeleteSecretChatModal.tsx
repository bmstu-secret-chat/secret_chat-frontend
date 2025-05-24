import { Modal } from 'antd';
import React from 'react';
import { TChatModel } from '@/entities/chat/model';
import { EChatType } from '@/shared/model';
import { RenderIf } from '@/shared/utils';
import { useDeleteSecretChatModal } from '@/widgets/modals/deleteSecretChat/model';

type Props = {
	chat?: TChatModel;
};

export const DeleteSecretChatModal: React.FC<Props> = ({ chat }) => {
	const { isOpen, handleOk, handleCancel } = useDeleteSecretChatModal(chat);

	return (
		<RenderIf condition={chat?.type === EChatType.SECRET}>
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
		</RenderIf>
	);
};
