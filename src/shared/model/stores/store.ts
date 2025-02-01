import { configureStore } from '@reduxjs/toolkit';
import { userReducer } from '@/entities/user/model/userSlice';
import { messagesReducer } from '@/stores/Messages/MessagesState';

export const store = configureStore({
	reducer: {
		messages: messagesReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
