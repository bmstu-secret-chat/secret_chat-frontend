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

export const encryptKey = (data: string, key: number): string => {
	const dataBytes = new TextEncoder().encode(data);
	const keyBytes = nacl
		.hash(new TextEncoder().encode(key.toString()))
		.slice(0, 32);
	const nonce = nacl.randomBytes(24);
	const encrypted = nacl.secretbox(dataBytes, nonce, keyBytes);
	const combined = new Uint8Array([...nonce, ...encrypted]);
	return Buffer.from(combined).toString('base64');
};

export const decryptKey = (encrypted: string, key: number): string => {
	const encryptedBytes = Buffer.from(encrypted, 'base64');
	const keyBytes = nacl
		.hash(new TextEncoder().encode(key.toString()))
		.slice(0, 32);
	const nonce = encryptedBytes.slice(0, 24);
	const data = encryptedBytes.slice(24);
	const decrypted = nacl.secretbox.open(data, nonce, keyBytes);

	if (!decrypted) {
		throw new Error('Неверный ключ');
	}

	return new TextDecoder().decode(decrypted);
};
