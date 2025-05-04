import nacl from 'tweetnacl';

export const encryptWithNonce = (data: Uint8Array, key: number) => {
	const keyBytes = nacl
		.hash(new TextEncoder().encode(key.toString()))
		.slice(0, 32);
	const nonce = nacl.randomBytes(24);
	const encrypted = nacl.secretbox(data, nonce, keyBytes);
	return new Uint8Array([...nonce, ...encrypted]);
};

export const decryptWithNonce = (encrypted: Uint8Array, key: number) => {
	const keyBytes = nacl
		.hash(new TextEncoder().encode(key.toString()))
		.slice(0, 32);
	const nonce = encrypted.slice(0, 24);
	const data = encrypted.slice(24);

	return nacl.secretbox.open(data, nonce, keyBytes);
};
