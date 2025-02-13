import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
	TWsMessageBaseModel,
	TWsSendMessageModel,
	TWsMessageResponseModel,
} from '@/entities/message/model';
import {
	EWsMessageResponseStatus,
	EWsMessageStatus,
} from '@/shared/model/enums';
import { RootState } from '@/shared/model/stores';

type MessageSlice = {
	messages: TWsMessageBaseModel[];
};

const initialState: MessageSlice = {
	messages: [],
};

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessages: (state, action: PayloadAction<TWsMessageBaseModel[]>) => {
			state.messages = action.payload;
		},
		addMessage: (state, action: PayloadAction<TWsMessageBaseModel>) => {
			state.messages.push(action.payload);
		},
		updateMessage: (state, action: PayloadAction<TWsMessageBaseModel>) => {
			state.messages = state.messages.map((message) => {
				if (message.id === action.payload.id) {
					const currentPayload = message.payload as TWsSendMessageModel;
					const responsePayload = action.payload
						.payload as TWsMessageResponseModel;

					if (currentPayload.status !== EWsMessageStatus.SENT) {
						return message;
					}

					const newPayload: TWsSendMessageModel = {
						...currentPayload,
						status:
							responsePayload.status === EWsMessageResponseStatus.OK
								? EWsMessageStatus.RECEIVED
								: EWsMessageStatus.ERROR,
					};

					return { ...message, payload: newPayload };
				}
				return message;
			});
		},
		deleteMessages: (state) => {
			state.messages = [];
		},
	},
});

export const {
	setMessages: setMessagesAction,
	addMessage: addMessageAction,
	updateMessage: updateMessageAction,
	deleteMessages: deleteMessagesAction,
} = messageSlice.actions;

export const selectMessages = (state: RootState): MessageSlice['messages'] =>
	(state.message as MessageSlice).messages;

export const messageReducer = messageSlice.reducer;
