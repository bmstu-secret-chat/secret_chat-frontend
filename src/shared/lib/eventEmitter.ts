import EventEmitter from 'eventemitter3';

export enum EmitterEvents {
	RESET_EDITED_USER = 'user/edited/reset',
	MODAL_OPEN_USER_PROFILE_DELETE = 'modal/open/user_profile/delete',
	MODAL_OPEN_SECRET_CHAT_DELETE = 'modal/open/secret_chat/delete',
	MODAL_OPEN_CHAT_CLEAR = 'modal/open/chat/clear',
}

export const eventEmitter = new EventEmitter();
