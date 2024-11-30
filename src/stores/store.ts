import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from '@/stores/Messages/MessagesState';

const store = configureStore({
	reducer: {
		messages: messagesReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
