import { CopyOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button } from 'antd';

const MessageMenu = () => {
	return (
		<div className={'flex flex-col'}>
			<Button type={'text'}>
				<div className={'flex gap-4 w-full'}>
					<CopyOutlined />
					<span>Копировать текст</span>
				</div>
			</Button>
			<Button type={'text'}>
				<div className={'flex gap-4 w-full'}>
					<EditOutlined />
					<span>Редактировать</span>
				</div>
			</Button>
			<Button type={'text'}>
				<div className={'flex gap-4 w-full'}>
					<DeleteOutlined />
					<span>Удалить</span>
				</div>
			</Button>
		</div>
	);
};

export default MessageMenu;
