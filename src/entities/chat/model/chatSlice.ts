import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TChatModel } from '@/entities/chat/model/chat';
import { RootState } from '@/shared/model/stores';

type ChatSlice = {
	chatList: TChatModel[];
};

const initialState: ChatSlice = {
	chatList: [],
};

export const chatSlice = createSlice({
	name: 'chatSlice',
	initialState,
	reducers: {
		setChats: (state, action: PayloadAction<TChatModel[]>) => {
			state.chatList = action.payload;
		},
		addChat: (state, action: PayloadAction<TChatModel>) => {
			state.chatList.push(action.payload);
		},
		deleteChat: (state, action: PayloadAction<string>) => {
			state.chatList = state.chatList.filter(
				(chat) => chat.id !== action.payload,
			);
		},
		deleteChats: (state) => {
			state.chatList = [];
		},
	},
});

export const {
	setChats: setChatsAction,
	addChat: addChatAction,
	deleteChat: deleteChatAction,
	deleteChats: deleteChatsAction,
} = chatSlice.actions;

export const selectChatList = (state: RootState): ChatSlice['chatList'] =>
	(state.chat as ChatSlice).chatList;

export const chatReducer = chatSlice.reducer;
