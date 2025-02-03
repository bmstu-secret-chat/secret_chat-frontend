import React, { memo } from 'react';
import { useMessageInput } from '@/features/chat/model';
import { cn } from '@/shared/lib';
import { VanishInput } from '@/shared/ui';

type Props = {
	value: string;
	setValue: (value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export const MessageInput: React.FC<Props> = memo(
	({ value, setValue, onSubmit }: Props) => {
		const { inputRef, placeholders } = useMessageInput();

		return (
			<div
				className={cn(
					'flex absolute bottom-0 items-center justify-center',
					'w-full h-[76px] border-t border-neutral-700 bg-neutral-800',
				)}
			>
				<VanishInput
					inputRef={inputRef}
					value={value}
					placeholders={placeholders}
					setValue={setValue}
					onSubmit={onSubmit}
				/>
			</div>
		);
	},
);

MessageInput.displayName = 'MessageInput';
