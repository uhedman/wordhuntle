import crypto from "crypto";

const algorithm = "aes-256-cbc";
const IV_LENGTH = 16;

const secret = process.env.ENCRYPTION_SECRET || "ENCRYPTION_SECRET";

function getKeyFromSeed(seed: number): Buffer {
  return crypto
    .createHash("sha256")
    .update(seed + secret)
    .digest();
}

export function encrypt(text: string, seed: number): string {
  const iv = crypto.randomBytes(IV_LENGTH);
  const key = getKeyFromSeed(seed);
  const cipher = crypto.createCipheriv(algorithm, key, iv);
  const encrypted = Buffer.concat([
    cipher.update(text, "utf8"),
    cipher.final(),
  ]);
  return iv.toString("hex") + ":" + encrypted.toString("hex");
}
