import { IconCopy } from '@tabler/icons-react';
import { Button, message } from 'antd';
import { useEffect, useRef } from 'react';

type Props = {
	content: string;
	setIsMenuOpen: (isMenuOpen: boolean) => void;
};

export const MessageMenu = ({ content, setIsMenuOpen }: Props) => {
	const [messageApi, contextHolder] = message.useMessage();
	const menuRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
				setIsMenuOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => document.removeEventListener('mousedown', handleClickOutside);
	}, [setIsMenuOpen]);

	const handleCopy = () => {
		navigator.clipboard.writeText(content);
		messageApi.info('Текст скопирован');
		setIsMenuOpen(false);
	};

	return (
		<div
			ref={menuRef}
			className={'flex flex-col'}
		>
			{contextHolder}
			<Button
				type={'text'}
				onClick={handleCopy}
			>
				<div className={'flex gap-4 w-full'}>
					<IconCopy />
					<span>Копировать текст</span>
				</div>
			</Button>
		</div>
	);
};
