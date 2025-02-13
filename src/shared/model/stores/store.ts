import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from '@/entities/chat/model';
import { messageReducer } from '@/entities/message/model';
import { userReducer } from '@/entities/user/model';

export const store = configureStore({
	reducer: {
		message: messageReducer,
		user: userReducer,
		chat: chatReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
