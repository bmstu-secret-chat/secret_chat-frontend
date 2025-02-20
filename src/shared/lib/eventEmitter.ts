import EventEmitter from 'eventemitter3';

export enum EmitterEvents {
	RESET_EDITED_USER = 'user/edited/reset',
	MODAL_OPEN_USER_PROFILE_DELETE = 'modal/open/user/profile/delete',
	MODAL_OPEN_SECRET_CHAT_DELETE = 'modal/open/secret/chat/delete',
}

export const eventEmitter = new EventEmitter();
