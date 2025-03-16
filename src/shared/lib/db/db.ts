/* eslint-disable @typescript-eslint/no-explicit-any */

import Dexie from 'dexie';

type TKeyValuePair = {
	id: string;
	value: any;
};

class SafeChatDB extends Dexie {
	keyValueStore: Dexie.Table<TKeyValuePair, string>;

	constructor() {
		super('SafeChatDB');

		this.version(1).stores({
			keyValueStore: 'id',
		});

		this.keyValueStore = this.table('keyValueStore');
	}
}

export const db = new SafeChatDB();

export const initDB = async () => {
	await db.open();
};

export const saveValue = async (id: string, value: any): Promise<void> => {
	await db.keyValueStore.put({ id, value });
};

export const getValue = async (id: string): Promise<any | null> => {
	const record = await db.keyValueStore.get(id);
	return record ? record.value : null;
};

export const deleteValue = async (id: string): Promise<void> => {
	await db.keyValueStore.delete(id);
};
