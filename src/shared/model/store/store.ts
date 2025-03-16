import { configureStore } from '@reduxjs/toolkit';
import { chatReducer } from '@/entities/chat/model';
import { messageReducer } from '@/entities/message/model/messageSlice';
import { userReducer } from '@/entities/user/model';

export const store = configureStore({
	reducer: {
		user: userReducer,
		chat: chatReducer,
		message: messageReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;
