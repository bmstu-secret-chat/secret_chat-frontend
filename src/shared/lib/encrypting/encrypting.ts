'use client';

import nacl from 'tweetnacl';

async function importPublicKey(publicKeyBase64: string): Promise<CryptoKey> {
	const binaryString = atob(publicKeyBase64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	return await window.crypto.subtle.importKey(
		'spki',
		bytes,
		{
			name: 'RSA-OAEP',
			hash: 'SHA-256',
		},
		true,
		['encrypt'],
	);
}

async function importPrivateKey(privateKeyBase64: string): Promise<CryptoKey> {
	const binaryString = atob(privateKeyBase64);
	const bytes = new Uint8Array(binaryString.length);
	for (let i = 0; i < binaryString.length; i++) {
		bytes[i] = binaryString.charCodeAt(i);
	}

	return await window.crypto.subtle.importKey(
		'pkcs8',
		bytes,
		{
			name: 'RSA-OAEP',
			hash: 'SHA-256',
		},
		true,
		['decrypt'],
	);
}

async function generateAESKey(): Promise<CryptoKey> {
	return await window.crypto.subtle.generateKey(
		{
			name: 'AES-GCM',
			length: 256,
		},
		true,
		['encrypt', 'decrypt'],
	);
}

export async function encryptMessage(
	message: string,
	myPublicKey: string,
	theirPublicKey: string,
): Promise<string> {
	// Генерируем случайный AES ключ для шифрования сообщения
	const aesKey = await generateAESKey();
	const theirPubKey = await importPublicKey(theirPublicKey);
	const myPubKey = await importPublicKey(myPublicKey);

	// Экспортируем AES ключ
	const exportedAesKey = await window.crypto.subtle.exportKey('raw', aesKey);

	// Шифруем AES ключ публичным ключом получателя
	const encryptedKeyForThem = await window.crypto.subtle.encrypt(
		{ name: 'RSA-OAEP' },
		theirPubKey,
		exportedAesKey,
	);

	// Шифруем AES ключ своим публичным ключом
	const encryptedKeyForMe = await window.crypto.subtle.encrypt(
		{ name: 'RSA-OAEP' },
		myPubKey,
		exportedAesKey,
	);

	// Шифруем сообщение с помощью AES
	const encoder = new TextEncoder();
	const data = encoder.encode(message);
	const iv = window.crypto.getRandomValues(new Uint8Array(12));
	const encryptedData = await window.crypto.subtle.encrypt(
		{
			name: 'AES-GCM',
			iv: iv,
		},
		aesKey,
		data,
	);

	// Объединяем оба зашифрованных ключа, IV и зашифрованные данные
	const encryptedKeyForThemArray = new Uint8Array(encryptedKeyForThem);
	const encryptedKeyForMeArray = new Uint8Array(encryptedKeyForMe);
	const encryptedDataArray = new Uint8Array(encryptedData);

	// 8 байт для длин двух ключей (по 4 байта на каждый)
	const combined = new Uint8Array(
		8 +
			encryptedKeyForThemArray.length +
			encryptedKeyForMeArray.length +
			12 +
			encryptedDataArray.length,
	);

	// Записываем длины зашифрованных ключей (по 4 байта)
	const keyLength1 = encryptedKeyForThemArray.length;
	const keyLength2 = encryptedKeyForMeArray.length;
	combined[0] = (keyLength1 >> 24) & 0xff;
	combined[1] = (keyLength1 >> 16) & 0xff;
	combined[2] = (keyLength1 >> 8) & 0xff;
	combined[3] = keyLength1 & 0xff;
	combined[4] = (keyLength2 >> 24) & 0xff;
	combined[5] = (keyLength2 >> 16) & 0xff;
	combined[6] = (keyLength2 >> 8) & 0xff;
	combined[7] = keyLength2 & 0xff;

	// Копируем оба зашифрованных ключа, IV и данные
	let offset = 8;
	combined.set(encryptedKeyForThemArray, offset);
	offset += encryptedKeyForThemArray.length;
	combined.set(encryptedKeyForMeArray, offset);
	offset += encryptedKeyForMeArray.length;
	combined.set(iv, offset);
	offset += 12;
	combined.set(encryptedDataArray, offset);

	return btoa(String.fromCharCode(...combined));
}

export async function decryptMessage(
	encryptedMessage: string,
	myPrivateKey: string,
): Promise<string> {
	const myPrivKey = await importPrivateKey(myPrivateKey);

	// Декодируем base64 в массив байт
	const combined = new Uint8Array(
		atob(encryptedMessage)
			.split('')
			.map((c) => c.charCodeAt(0)),
	);

	// Читаем длины зашифрованных ключей
	const keyLength1 =
		(combined[0] << 24) |
		(combined[1] << 16) |
		(combined[2] << 8) |
		combined[3];
	const keyLength2 =
		(combined[4] << 24) |
		(combined[5] << 16) |
		(combined[6] << 8) |
		combined[7];

	// Извлекаем оба зашифрованных ключа, IV и данные
	let offset = 8;
	const encryptedKeyForThem = combined.slice(offset, offset + keyLength1);
	offset += keyLength1;
	const encryptedKeyForMe = combined.slice(offset, offset + keyLength2);
	offset += keyLength2;
	const iv = combined.slice(offset, offset + 12);
	offset += 12;
	const encryptedData = combined.slice(offset);

	// Пробуем расшифровать AES ключ своим приватным ключом
	let aesKeyBuffer: any;
	try {
		// Сначала пробуем расшифровать ключ для получателя
		aesKeyBuffer = await window.crypto.subtle.decrypt(
			{ name: 'RSA-OAEP' },
			myPrivKey,
			encryptedKeyForThem,
		);
	} catch {
		// Если не получилось, значит мы отправитель, пробуем расшифровать второй ключ
		aesKeyBuffer = await window.crypto.subtle.decrypt(
			{ name: 'RSA-OAEP' },
			myPrivKey,
			encryptedKeyForMe,
		);
	}

	// Импортируем расшифрованный AES ключ
	const aesKey = await window.crypto.subtle.importKey(
		'raw',
		aesKeyBuffer,
		{ name: 'AES-GCM', length: 256 },
		true,
		['decrypt'],
	);

	// Расшифровываем данные
	const decryptedData = await window.crypto.subtle.decrypt(
		{
			name: 'AES-GCM',
			iv: iv,
		},
		aesKey,
		encryptedData,
	);

	return new TextDecoder().decode(decryptedData);
}

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
