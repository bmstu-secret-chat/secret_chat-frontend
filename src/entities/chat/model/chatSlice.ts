import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TChatModel } from '@/entities/chat/model/chat';
import { RootState } from '@/shared/model';

type ChatSlice = {
	chatList: TChatModel[];
	activeChat: TChatModel | null;
};

const initialState: ChatSlice = {
	chatList: [],
	activeChat: null,
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

			if (state.activeChat?.id === action.payload) {
				state.activeChat = null;
			}
		},
		deleteChats: (state) => {
			state.chatList = [];
		},
		setActiveChat: (state, action: PayloadAction<string>) => {
			state.activeChat =
				state.chatList.find((chat) => chat.id === action.payload) || null;
		},
		clearActiveChat: (state) => {
			state.activeChat = null;
		},
	},
});

export const {
	setChats: setChatsAction,
	addChat: addChatAction,
	deleteChat: deleteChatAction,
	deleteChats: deleteChatsAction,
	setActiveChat: setActiveChatAction,
	clearActiveChat: clearActiveChatAction,
} = chatSlice.actions;

export const selectChatList = (state: RootState): ChatSlice['chatList'] =>
	(state.chat as ChatSlice).chatList;

export const selectActiveChat = (state: RootState): ChatSlice['activeChat'] =>
	(state.chat as ChatSlice).activeChat;

export const chatReducer = chatSlice.reducer;
