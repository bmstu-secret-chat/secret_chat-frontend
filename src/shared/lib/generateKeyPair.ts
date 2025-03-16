import nacl from 'tweetnacl';

export const generateKeyPair = (): {
	publicKey: Uint8Array;
	privateKey: Uint8Array;
} => {
	const keyPair = nacl.box.keyPair();

	const publicKey = keyPair.publicKey;
	const privateKey = keyPair.secretKey;

	return { publicKey, privateKey };
};
