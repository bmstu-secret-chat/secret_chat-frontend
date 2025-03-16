import { showToast } from '@/shared/lib';
import { deleteValue, getValue, saveValue } from '@/shared/lib/db';

const PRIVATE_KEY_NAME = 'private_key';

export const setPrivateKey = async (privateKey: Uint8Array) => {
	try {
		await saveValue(PRIVATE_KEY_NAME, privateKey);
	} catch (error: unknown) {
		if (error instanceof Error) {
			showToast('error', error.message);
		} else {
			showToast('error', 'Ошибка при выполнеии действия');
		}
	}
};

export const getPrivateKey = async (): Promise<Uint8Array | null> => {
	try {
		const privateKey = await getValue(PRIVATE_KEY_NAME);

		return privateKey ? privateKey : null;
	} catch (error: unknown) {
		if (error instanceof Error) {
			showToast('error', error.message);
		} else {
			showToast('error', 'Ошибка при выполнеии действия');
		}

		return null;
	}
};

export const deletePrivateKey = async (): Promise<void> => {
	try {
		await deleteValue(PRIVATE_KEY_NAME);
	} catch (error: unknown) {
		if (error instanceof Error) {
			showToast('error', error.message);
		} else {
			showToast('error', 'Ошибка при выполнеии действия');
		}
	}
};
