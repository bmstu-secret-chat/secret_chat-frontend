import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TWsMessageModel,
	TWsMessageResponseApi,
} from '@/entities/message/model';
import { EWsMessageStatus } from '@/shared/model/enums';
import { RootState } from '@/shared/model/stores';

type MessageSlice = {
	messages: TWsMessageModel[];
};

const initialState: MessageSlice = {
	messages: [],
};

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<TWsMessageModel[]>) => {
			state.messages = action.payload;
		},
		addMessage: (state, action: PayloadAction<TWsMessageModel>) => {
			state.messages = [...state.messages, action.payload];
		},
		updateMessage: (state, action: PayloadAction<TWsMessageResponseApi>) => {
			state.messages = state.messages.map((message) =>
				message.time === action.payload.time &&
				message.status === EWsMessageStatus.SENT
					? { ...message, status: action.payload.status }
					: message,
			);
		},
		deleteMessages: (state) => {
			state.messages = [];
		},
	},
});

export const selectMessages = (state: RootState): MessageSlice['messages'] =>
	state.message.messages;

export const {
	setMessages: setMessagesAction,
	addMessage: addMessageAction,
	updateMessage: updateMessageAction,
	deleteMessages: deleteMessagesAction,
} = messageSlice.actions;

export const messageReducer = messageSlice.reducer;
