import nacl from 'tweetnacl';
import { decodeUTF8, encodeUTF8 } from 'tweetnacl-util';

export const encryptMessage = (
	message: string,
	theirPublicKey: Uint8Array,
	myPrivateKey: Uint8Array,
): Uint8Array => {
	const nonce = nacl.randomBytes(nacl.box.nonceLength);
	const messageUint8 = decodeUTF8(message);
	const encrypted = nacl.box(messageUint8, nonce, theirPublicKey, myPrivateKey);
	const fullMessage = new Uint8Array(nonce.length + encrypted.length);
	fullMessage.set(nonce);
	fullMessage.set(encrypted, nonce.length);

	return fullMessage;
};

export const decryptMessage = (
	encryptedMessage: Uint8Array,
	theirPublicKey: Uint8Array,
	myPrivateKey: Uint8Array,
): string | null => {
	const nonce = encryptedMessage.slice(0, nacl.box.nonceLength);
	const message = encryptedMessage.slice(nacl.box.nonceLength);
	const decrypted = nacl.box.open(message, nonce, theirPublicKey, myPrivateKey);

	return decrypted ? encodeUTF8(decrypted) : null;
};
