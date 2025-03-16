import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TWsMessageResponseModel } from '@/entities/message/model';
import { RootState } from '@/shared/model';
import { EWsMessageResponseStatus } from '@/shared/model/enums/';
import { EMessageStatus } from '@/shared/model/enums/messageStatus';
import { MessageModel, WsMessageBase } from '@/shared/model/types';

type MessageSlice = {
	messagesByChat: Record<string, MessageModel[]>;
};

const initialState: MessageSlice = {
	messagesByChat: {},
};

export const messageSlice = createSlice({
	name: 'message',
	initialState,
	reducers: {
		setMessages: (
			state,
			action: PayloadAction<{ dialogId: string; messages: MessageModel[] }>,
		) => {
			const { dialogId, messages } = action.payload;
			state.messagesByChat[dialogId] = messages;
		},
		addMessage: (state, action: PayloadAction<MessageModel>) => {
			const { dialogId } = action.payload;
			if (!state.messagesByChat[dialogId]) {
				state.messagesByChat[dialogId] = [];
			}
			state.messagesByChat[dialogId].push(action.payload);
		},
		updateMessage: (state, action: PayloadAction<WsMessageBase>) => {
			const { id, payload } = action.payload;
			const dialogId = (action.payload.payload as TWsMessageResponseModel)
				.chatId;

			const chatMessages = state.messagesByChat[dialogId];

			if (chatMessages) {
				state.messagesByChat[dialogId] = chatMessages.map((message) =>
					message.id === id && message.status === EMessageStatus.SENT
						? {
								...message,
								status:
									(payload as TWsMessageResponseModel).status ===
									EWsMessageResponseStatus.OK
										? EMessageStatus.RECEIVED
										: EMessageStatus.ERROR,
							}
						: message,
				);
			}
		},
		deleteMessagesFromChat: (state, action: PayloadAction<string>) => {
			const dialogId = action.payload;
			delete state.messagesByChat[dialogId];
		},
		deleteMessages: (state) => {
			state.messagesByChat = {};
		},
	},
});

export const {
	setMessages: setMessagesAction,
	addMessage: addMessageAction,
	updateMessage: updateMessageAction,
	deleteMessagesFromChat: deleteMessagesFromChatAction,
	deleteMessages: deleteMessagesAction,
} = messageSlice.actions;

export const selectMessagesByChat =
	(dialogId: string) =>
	(state: RootState): MessageModel[] =>
		(state.message as MessageSlice).messagesByChat[dialogId] || [];

export const messageReducer = messageSlice.reducer;
