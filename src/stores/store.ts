import { configureStore } from '@reduxjs/toolkit';
import { messagesReducer } from '@/stores/Messages/MessagesState';
import { currentUserReducer } from '@/stores/Users/CurrentUserState';

const store = configureStore({
	reducer: {
		messages: messagesReducer,
		currentUser: currentUserReducer,
	},
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
