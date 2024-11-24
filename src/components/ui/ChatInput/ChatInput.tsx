import React from 'react';
import { VanishInput } from '@/components/lib/VanishInput/VanishInput';
import { cn } from '@/lib/utils';

type Props = {
	value: string;
	setValue: (value: string) => void;
	onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

export default function ChatInput({ value, setValue, onSubmit }: Props) {
	const placeholders = [
		"What's the first rule of Fight Club?",
		'Who is Tyler Durden?',
		'Where is Andrew Laeddis Hiding?',
		'Write a Javascript method to reverse a string',
		'How to assemble your own PC?',
	];

	return (
		<div
			className={cn(
				'flex absolute bottom-0 items-center justify-center',
				'w-full h-[76px] border-t border-neutral-700 bg-neutral-800',
			)}
		>
			<VanishInput
				value={value}
				placeholders={placeholders}
				setValue={setValue}
				onSubmit={onSubmit}
			/>
		</div>
	);
}
