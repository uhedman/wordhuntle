import CryptoJS from "crypto-js";

const SECRET = "DPQS282CqPFwkR5lVmwoMO1AsF3CArUp";

function getKeyFromSeed(seed: number): CryptoJS.lib.WordArray {
  return CryptoJS.SHA256(seed + SECRET);
}

function decryptRaw(encrypted: string, seed: number): string {
  const [ivHex, dataHex] = encrypted.split(":");
  const key = getKeyFromSeed(seed);
  const iv = CryptoJS.enc.Hex.parse(ivHex);
  const encryptedWords = CryptoJS.enc.Hex.parse(dataHex);

  const cipherParams = CryptoJS.lib.CipherParams.create({
    ciphertext: encryptedWords,
  });

  const decrypted = CryptoJS.AES.decrypt(cipherParams, key, { iv });
  return decrypted.toString(CryptoJS.enc.Utf8);
}

export function decrypt(encrypted: string, seed: number): string[] {
  return JSON.parse(decryptRaw(encrypted, seed));
}

export function decryptOne(encrypted: string, seed: number): string {
  return decryptRaw(encrypted, seed);
}
