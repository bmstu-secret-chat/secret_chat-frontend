import React from 'react';
import { useSearch } from '@/features/chatList/model';
import { cn } from '@/shared/lib';
import { Input } from '@/shared/ui';

export const Search: React.FC = () => {
	const { searchValue, handleChange } = useSearch();

	return (
		<div
			className={cn(
				'sticky top-0 p-4 bg-zinc-950',
				'border-b border-neutral-700',
			)}
		>
			<Input
				id='search'
				className={'rounded-3xl'}
				placeholder='Поиск пользователей'
				type='text'
				value={searchValue}
				onChange={(event) => handleChange(event.target.value)}
				onClear={() => handleChange('')}
			/>
		</div>
	);
};
