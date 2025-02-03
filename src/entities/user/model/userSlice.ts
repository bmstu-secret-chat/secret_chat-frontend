import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/entities/user/model/userInfo';
import { RootState } from '@/shared/model/stores';

type UserSlice = {
	isAuthorized: boolean;
	user: UserInfo | null;
};

const initialState: UserSlice = {
	isAuthorized: false,
	user: null,
};

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthorized = true;
		},
		deleteUser: (state) => {
			state.user = null;
			state.isAuthorized = false;
		},
	},
});

export const selectCurrentUser = (state: RootState): UserSlice['user'] =>
	state.user.user;

export const selectIsAuthorized = (
	state: RootState,
): UserSlice['isAuthorized'] => state.user.isAuthorized;

export const { setUser: setUserAction, deleteUser: deleteUserAction } =
	userSlice.actions;

export const userReducer = userSlice.reducer;
