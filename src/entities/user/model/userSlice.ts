import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserInfo } from '@/entities/user/model/userInfo';
import { RootState } from '@/shared/model';

type UserSlice = {
	isAuthorized: boolean;
	user: UserInfo | null;
	myPublicKey: string | null;
};

const initialState: UserSlice = {
	isAuthorized: false,
	user: null,
	myPublicKey: null,
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
		setMyPublicKey: (state, action: PayloadAction<string>) => {
			state.myPublicKey = action.payload;
		},
		deleteMyPublicKey: (state) => {
			state.myPublicKey = null;
		},
	},
});

export const selectCurrentUser = (state: RootState): UserSlice['user'] =>
	state.user.user;

export const selectIsAuthorized = (
	state: RootState,
): UserSlice['isAuthorized'] => state.user.isAuthorized;

export const selectMyPublicKey = (state: RootState): UserSlice['myPublicKey'] =>
	state.user.myPublicKey;

export const {
	setUser: setUserAction,
	deleteUser: deleteUserAction,
	setMyPublicKey: setMyPublicKeyAction,
	deleteMyPublicKey: deleteMyPublicKeyAction,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
