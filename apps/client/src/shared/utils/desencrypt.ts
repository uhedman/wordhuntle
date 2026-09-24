const SECRET = "DPQS282CqPFwkR5lVmwoMO1AsF3CArUp";

function hexStringToArrayBuffer(hexString: string): Uint8Array<ArrayBuffer> {
	const bytes = new Uint8Array(Math.ceil(hexString.length / 2));
	for (let i = 0; i < bytes.length; i++) {
		bytes[i] = parseInt(hexString.substring(i * 2, i * 2 + 2), 16);
	}
	return bytes;
}

async function getKeyFromSeed(seed: number): Promise<CryptoKey> {
	const encoder = new TextEncoder();
	const data = encoder.encode(seed.toString() + SECRET);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	return crypto.subtle.importKey(
		"raw",
		hashBuffer,
		{ name: "AES-CBC" },
		false,
		["decrypt"]
	);
}

async function decryptRaw(encrypted: string, seed: number): Promise<string> {
	const [ivHex, dataHex] = encrypted.split(":");
	const key = await getKeyFromSeed(seed);
	
	const iv = hexStringToArrayBuffer(ivHex);
	const encryptedData = hexStringToArrayBuffer(dataHex);

	const decryptedBuffer = await crypto.subtle.decrypt(
		{
			name: "AES-CBC",
			iv: iv,
		},
		key,
		encryptedData
	);

	const decoder = new TextDecoder();
	return decoder.decode(decryptedBuffer);
}

export async function decrypt(encrypted: string, seed: number): Promise<string[]> {
	const raw = await decryptRaw(encrypted, seed);
	return JSON.parse(raw);
}

export async function decryptOne(encrypted: string, seed: number): Promise<string> {
	return await decryptRaw(encrypted, seed);
}
