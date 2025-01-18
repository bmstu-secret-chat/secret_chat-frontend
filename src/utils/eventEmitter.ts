import EventEmitter from 'eventemitter3';

export enum EmitterEvents {
	RESET_EDITED_USER = 'user/edited/reset',
	MODAL_OPEN_USER_PROFILE_DELETE = 'modal/open/user/profile/delete',
}

const eventEmitter = new EventEmitter();
export default eventEmitter;
