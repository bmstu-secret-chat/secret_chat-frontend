import { Drawer } from 'antd';
import type React from 'react';

import { useKeyDrawer } from '@/features/profile/model';
import { KeyGenerator } from '@/features/profile/ui';

type Props = {
	open: boolean;
	setOpen: (open: boolean) => void;
};

export const KeyDrawer: React.FC<Props> = ({ open, setOpen }) => {
	const { onClose } = useKeyDrawer(setOpen);

	return (
		<Drawer
			title='Вход с нового устройства'
			onClose={onClose}
			open={open}
		>
			<KeyGenerator />
		</Drawer>
	);
};
