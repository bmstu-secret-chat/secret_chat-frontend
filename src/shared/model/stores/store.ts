import { configureStore } from '@reduxjs/toolkit';
import { messageReducer } from '@/entities/message/model';
import { userReducer } from '@/entities/user/model';

export const store = configureStore({
	reducer: {
		user: userReducer,
		message: messageReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
