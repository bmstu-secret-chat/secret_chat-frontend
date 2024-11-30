import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/stores/store';
import { WsMessageStatusEnum } from '@/types/WsMessageStatus.enum';
import { WsMessageModel } from '@/types/WsMessages';

export type MessagesState = {
	messages: WsMessageModel[];
};

const initialState: MessagesState = {
	messages: [],
};

export const messagesSlice = createSlice({
	name: 'messages',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<WsMessageModel[]>) => {
			state.messages = action.payload;
		},
		addMessage: (state, action: PayloadAction<WsMessageModel>) => {
			state.messages = [...state.messages, action.payload];
		},
		updateMessage: (state, action: PayloadAction<WsMessageModel>) => {
			state.messages = state.messages.map((message) =>
				message.time === action.payload.time &&
				message.status === WsMessageStatusEnum.SENT
					? { ...message, status: action.payload.status }
					: message,
			);
		},
		deleteMessages: (state) => {
			state.messages = [];
		},
	},
});

export const selectMessages = (state: RootState): MessagesState['messages'] =>
	state.messages.messages;

export const {
	setMessages: setMessagesAction,
	addMessage: addMessageAction,
	updateMessage: updateMessageAction,
	deleteMessages: deleteMessagesAction,
} = messagesSlice.actions;

export const messagesReducer = messagesSlice.reducer;
