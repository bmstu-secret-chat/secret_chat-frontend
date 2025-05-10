import { publicEncrypt, privateDecrypt } from 'crypto';
import nacl from 'tweetnacl';

export const encryptMessage = (message: string, publicKey: string): string => {
	const buffer = Buffer.from(message, 'utf8');
	const encrypted = publicEncrypt(publicKey, buffer);
	return encrypted.toString('base64');
};

export const decryptMessage = (
	encryptedMessage: string,
	privateKey: string,
): string => {
	const buffer = Buffer.from(encryptedMessage, 'base64');
	const decrypted = privateDecrypt(privateKey, buffer);
	return decrypted.toString('utf8');
};

export const encryptKey = (data: Uint8Array, key: number) => {
	const keyBytes = nacl
		.hash(new TextEncoder().encode(key.toString()))
		.slice(0, 32);
	const nonce = nacl.randomBytes(24);
	const encrypted = nacl.secretbox(data, nonce, keyBytes);
	return new Uint8Array([...nonce, ...encrypted]);
};

export const decryptKey = (encrypted: Uint8Array, key: number) => {
	const keyBytes = nacl
		.hash(new TextEncoder().encode(key.toString()))
		.slice(0, 32);
	const nonce = encrypted.slice(0, 24);
	const data = encrypted.slice(24);

	return nacl.secretbox.open(data, nonce, keyBytes);
};
