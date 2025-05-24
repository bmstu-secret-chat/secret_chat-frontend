import { Modal } from 'antd';
import React from 'react';
import { TChatModel } from '@/entities/chat/model';
import { EChatType } from '@/shared/model';
import { RenderIf } from '@/shared/utils';
import { useClearChatModal } from '@/widgets/modals/clearChat/model';

type Props = {
	chat?: TChatModel;
};

export const ClearChatModal: React.FC<Props> = ({ chat }) => {
	const { isOpen, handleOk, handleCancel } = useClearChatModal(chat);

	return (
		<RenderIf condition={chat?.type === EChatType.DEFAULT}>
			<Modal
				title='Удалить историю сообщений'
				open={isOpen}
				okText={'Да, удалить'}
				onOk={handleOk}
				onCancel={handleCancel}
				cancelText={'Не удалять'}
			>
				<p>Вы уверены, что хотите удалить все сообщения из чата?</p>
			</Modal>
		</RenderIf>
	);
};
