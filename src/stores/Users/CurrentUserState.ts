import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/stores/store';
import { UserInfo } from '@/types/User/UserInfo';

export type CurrentUserState = {
	isAuthorized: boolean;
	user: UserInfo | null;
};

const initialState: CurrentUserState = {
	isAuthorized: false,
	user: null,
};

export const currentUserSlice = createSlice({
	name: 'currentUser',
	initialState,
	reducers: {
		setCurrentUser: (state, action: PayloadAction<UserInfo>) => {
			state.user = action.payload;
			state.isAuthorized = true;
		},
		deleteCurrentUser: (state) => {
			state.user = null;
			state.isAuthorized = false;
		},
	},
});

export const selectCurrentUser = (state: RootState): CurrentUserState['user'] =>
	state.currentUser.user;

export const selectIsAuthorized = (
	state: RootState,
): CurrentUserState['isAuthorized'] => state.currentUser.isAuthorized;

export const {
	setCurrentUser: setCurrentUserAction,
	deleteCurrentUser: deleteCurrentUserAction,
} = currentUserSlice.actions;

export const currentUserReducer = currentUserSlice.reducer;
