import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TChatModel } from '@/entities/chat/model/chat';
import { RootState } from '@/shared/model';

type ChatSlice = {
	chatList: TChatModel[];
	activeChat: TChatModel | null;
	theirPublicKey: string | null;
};

const initialState: ChatSlice = {
	chatList: [],
	activeChat: null,
	theirPublicKey: null,
};

export const chatSlice = createSlice({
	name: 'chatSlice',
	initialState,
	reducers: {
		setChats: (state, action: PayloadAction<TChatModel[]>) => {
			state.chatList = action.payload;
		},
		addChat: (state, action: PayloadAction<TChatModel>) => {
			const chatExists = state.chatList.some(
				(chat) => chat.id === action.payload.id,
			);

			if (!chatExists) {
				state.chatList.push(action.payload);
			}
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
		deleteActiveChat: (state) => {
			state.activeChat = null;
		},
		setTheirPublicKey: (state, action: PayloadAction<string>) => {
			state.theirPublicKey = action.payload;
		},
		deleteTheirPublicKey: (state) => {
			state.theirPublicKey = null;
		},
	},
});

export const {
	setChats: setChatsAction,
	addChat: addChatAction,
	deleteChat: deleteChatAction,
	deleteChats: deleteChatsAction,
	setActiveChat: setActiveChatAction,
	deleteActiveChat: deleteActiveChatAction,
	setTheirPublicKey: setTheirPublicKeyAction,
	deleteTheirPublicKey: deleteTheirPublicKeyAction,
} = chatSlice.actions;

export const selectChatList = (state: RootState): ChatSlice['chatList'] =>
	(state.chat as ChatSlice).chatList;

export const selectActiveChat = (state: RootState): ChatSlice['activeChat'] =>
	(state.chat as ChatSlice).activeChat;

export const selectTheirPublicKey = (
	state: RootState,
): ChatSlice['theirPublicKey'] => (state.chat as ChatSlice).theirPublicKey;

export const chatReducer = chatSlice.reducer;
