'use client';

import { debounce } from 'lodash';
import React, { useCallback, useMemo, useState } from 'react';
import { UsersService } from '@/entities/user/api';
import { useChatListContext } from '@/features/chatList/model';
import { showToast } from '@/shared/lib';

export const useSearch = () => {
	const [searchValue, setSearchValue] = useState<string>('');

	const { foundedUsers, setFoundedUsers } = useChatListContext();

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
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
				} catch (error: any) {
					showToast('error', error.message);
				}
			}, 500),
		[searchUsers],
	);

	return { searchValue, foundedUsers, handleChange };
};
