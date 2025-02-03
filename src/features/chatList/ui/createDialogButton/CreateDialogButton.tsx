import { IconMessagePlus, IconLockPlus, IconPlus } from '@tabler/icons-react';
import { FloatButton } from 'antd';
import React, { memo } from 'react';
import { useCreateDialog } from '@/features/chatList/model';
import { cn } from '@/shared/lib';
import { RenderIf } from '@/shared/utils';

export const CreateDialogButton: React.FC = memo(() => {
	const {
		canRender,
		buttonRef,
		open,
		toggleFloatButtonClick,
		handleGroupClick,
		handleSecretGroupClick,
	} = useCreateDialog();

	return (
		<RenderIf condition={canRender}>
			<div ref={buttonRef}>
				<FloatButton.Group
					className={cn('fixed bottom-8 right-8 z-[2]')}
					open={open}
					shape={'circle'}
					trigger={'click'}
					icon={<IconPlus />}
					onClick={toggleFloatButtonClick}
				>
					<FloatButton
						icon={<IconLockPlus />}
						onClick={handleSecretGroupClick}
					/>
					<FloatButton
						icon={<IconMessagePlus />}
						onClick={handleGroupClick}
					/>
				</FloatButton.Group>
			</div>
		</RenderIf>
	);
});

CreateDialogButton.displayName = 'CreateDialogButton';
