/* eslint-disable @typescript-eslint/no-explicit-any */

import Dexie from 'dexie';

type TKeyValuePair = {
	id: string;
	value: any;
};

export class SafeChatDB extends Dexie {
	private static instance: SafeChatDB;
	keyValueStore!: Dexie.Table<TKeyValuePair, string>;

	constructor() {
		super('SafeChatDB');

		if (SafeChatDB.instance) {
			return SafeChatDB.instance;
		}

		SafeChatDB.instance = this;
		this.version(1).stores({
			keyValueStore: 'id',
		});

		this.keyValueStore = this.table('keyValueStore');
	}

	async init(): Promise<void> {
		await this.open();
	}

	async saveValue(id: string, value: any): Promise<void> {
		await this.keyValueStore.put({ id, value });
	}

	async getValue(id: string): Promise<any | null> {
		const record = await this.keyValueStore.get(id);
		return record ? record.value : null;
	}

	async deleteValue(id: string): Promise<void> {
		await this.keyValueStore.delete(id);
	}
}
