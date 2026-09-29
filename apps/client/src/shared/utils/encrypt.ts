const secret = import.meta.env.VITE_ENCRYPTION_SECRET || "ENCRYPTION_SECRET";

function arrayBufferToHexString(buffer: ArrayBuffer): string {
	const bytes = new Uint8Array(buffer);
	return Array.from(bytes)
		.map((b) => b.toString(16).padStart(2, "0"))
		.join("");
}

async function getKeyFromSeed(seed: number): Promise<CryptoKey> {
	const encoder = new TextEncoder();
	const data = encoder.encode(seed.toString() + secret);
	const hashBuffer = await crypto.subtle.digest("SHA-256", data);

	return crypto.subtle.importKey(
		"raw",
		hashBuffer,
		{ name: "AES-CBC" },
		false,
		["encrypt"],
	);
}

export async function encrypt(text: string, seed: number): Promise<string> {
	const key = await getKeyFromSeed(seed);
	const iv = crypto.getRandomValues(new Uint8Array(16));
	const encoder = new TextEncoder();
	const data = encoder.encode(text);

	const encryptedBuffer = await crypto.subtle.encrypt(
		{
			name: "AES-CBC",
			iv: iv,
		},
		key,
		data,
	);

	return (
		arrayBufferToHexString(iv.buffer) +
		":" +
		arrayBufferToHexString(encryptedBuffer)
	);
}
