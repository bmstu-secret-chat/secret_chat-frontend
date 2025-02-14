'use client';

import { debounce } from 'lodash';
import { useCallback, useMemo, useState } from 'react';
import { UsersService } from '@/entities/user/api';
import { useChatListContext } from '@/features/chatList/model';
import { showToast } from '@/shared/lib';

export const useSearch = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const { foundedUsers, setFoundedUsers } = useChatListContext();

	const handleChange = (value: string) => {
		setSearchValue(value);

		if (value.trim().length > 2) {
			updateSearchValue(value);
		} else {
			setFoundedUsers([]);
		}
	};

	const searchUsers = useCallback(
		async (username: string) => {
			const usersService = new UsersService();
			const users = await usersService.findUsersByUsername(username);
			setFoundedUsers(users);
		},
		[setFoundedUsers],
	);

	const updateSearchValue = useMemo(
		() =>
			debounce(async (value: string) => {
				try {
					await searchUsers(value);
				} catch (error: unknown) {
					if (error instanceof Error) {
						showToast('error', error.message);
					} else {
						showToast('error', 'Ошибка при выполнеии действия');
					}
				}
			}, 500),
		[searchUsers],
	);

	return { searchValue, foundedUsers, handleChange };
};
