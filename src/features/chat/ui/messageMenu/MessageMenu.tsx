import { IconCopy, IconEdit, IconTrash } from '@tabler/icons-react';
import { Button } from 'antd';

export const MessageMenu = () => {
	return (
		<div className={'flex flex-col'}>
			<Button type={'text'}>
				<div className={'flex gap-4 w-full'}>
					<IconCopy />
					<span>Копировать текст</span>
				</div>
			</Button>
			<Button type={'text'}>
				<div className={'flex gap-4 w-full'}>
					<IconEdit />
					<span>Редактировать</span>
				</div>
			</Button>
			<Button type={'text'}>
				<div className={'flex gap-4 w-full'}>
					<IconTrash />
					<span>Удалить</span>
				</div>
			</Button>
		</div>
	);
};
