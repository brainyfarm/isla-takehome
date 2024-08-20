import crypto from "crypto";

export function generateHash(text) {
  return crypto.createHash("sha256").update(text.trim()).digest("hex");
}
