import { configureStore } from '@reduxjs/toolkit';
import { messageReducer } from '@/entities/message/model';
import { userReducer } from '@/entities/user/model';

export const store = configureStore({
	reducer: {
		message: messageReducer,
		user: userReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
