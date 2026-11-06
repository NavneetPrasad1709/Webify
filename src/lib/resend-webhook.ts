/**
 * Resend webhook signature verification.
 *
 * Resend signs webhooks with Svix. The documented manual verification:
 *   signed content = `${svix-id}.${svix-timestamp}.${rawBody}`
 *   key            = base64-decode(secret without the "whsec_" prefix)
 *   expected       = base64(HMAC-SHA256(key, signed content))
 *   header         = space-separated "v1,<signature>" entries; any match passes
 * Timestamps older or newer than 5 minutes are rejected (replay protection).
 * Implemented with node:crypto so no extra dependency is needed.
 */

import { createHmac, timingSafeEqual } from "node:crypto";

const TOLERANCE_SECONDS = 5 * 60;

export type SvixHeaders = { id: string | null; timestamp: string | null; signature: string | null };

export function verifyResendSignature(
  rawBody: string,
  headers: SvixHeaders,
  secret: string,
  nowSeconds = Math.floor(Date.now() / 1000)
): boolean {
  const { id, timestamp, signature } = headers;
  if (!id || !timestamp || !signature || !secret) return false;

  const ts = Number(timestamp);
  if (!Number.isFinite(ts) || Math.abs(nowSeconds - ts) > TOLERANCE_SECONDS) return false;

  let key: Buffer;
  try {
    key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  } catch {
    return false;
  }
  if (key.length === 0) return false;

  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${rawBody}`).digest();

  return signature.split(" ").some((part) => {
    const [version, sig] = part.split(",");
    if (version !== "v1" || !sig) return false;
    const given = Buffer.from(sig, "base64");
    return given.length === expected.length && timingSafeEqual(given, expected);
  });
}

/** Resend sends tags as an object; older payloads used an array. Accept both. */
export function readTags(raw: unknown): Record<string, string> {
  if (Array.isArray(raw)) {
    return Object.fromEntries(
      raw
        .filter((t): t is { name: string; value: string } => typeof t?.name === "string")
        .map((t) => [t.name, String(t.value)])
    );
  }
  if (raw && typeof raw === "object") {
    return Object.fromEntries(Object.entries(raw).map(([k, v]) => [k, String(v)]));
  }
  return {};
}

/** "neel@example.com" -> "n***@example.com", for logs only. */
export const maskEmail = (address: string) =>
  address.replace(/^(.)[^@]*(@.*)$/, "$1***$2");
