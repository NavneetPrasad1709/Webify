/**
 * Durable lead storage on a private Vercel Blob store.
 *
 * Why: email is a notification, not a record. Resend can accept a lead
 * notification (HTTP 200) and bounce it minutes later, so every lead is
 * written here first and survives any email failure.
 *
 * Layout (all private, never publicly readable):
 *   leads/<leadId>.json                  the submission
 *   leads/<leadId>/sent.json             Resend email ids for that lead
 *   leads/<leadId>/events/<ts>-<type>.json   delivery events from the webhook
 *   webhook/processed/<svixId>.json      idempotency markers
 *   webhook/alerts/<key>.json            one-time alert markers (e.g. delays)
 *
 * Configured when the project has a connected Blob store (BLOB_STORE_ID with
 * Vercel OIDC, or BLOB_READ_WRITE_TOKEN). Without one, storage is skipped
 * and the caller falls back to best-effort in-memory behaviour; this is
 * logged so it is never silent.
 */

import { BlobNotFoundError, get, head, put } from "@vercel/blob";

/* put() without allowOverwrite rejects an existing pathname with a
   bad_request whose message says it already exists. Match that wording only,
   so "store does not exist" (a configuration fault) is never read as
   "already done". */
const alreadyExists = (err: unknown) =>
  err instanceof Error && /already exists/i.test(err.message);

export function storageConfigured(): boolean {
  return Boolean(process.env.BLOB_STORE_ID || process.env.BLOB_READ_WRITE_TOKEN);
}

const json = (value: unknown) => JSON.stringify(value, null, 2);

async function write(pathname: string, value: unknown, allowOverwrite = false) {
  await put(pathname, json(value), {
    access: "private",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite,
  });
}

/** True if a blob exists. Throws on transport errors (caller decides). */
async function exists(pathname: string): Promise<boolean> {
  try {
    await head(pathname);
    return true;
  } catch (err) {
    if (err instanceof BlobNotFoundError) return false;
    throw err;
  }
}

async function read<T>(pathname: string): Promise<T | null> {
  const res = await get(pathname, { access: "private", useCache: false });
  if (!res || res.statusCode !== 200 || !res.stream) return null;
  return JSON.parse(await new Response(res.stream).text()) as T;
}

export type StoredLead = {
  id: string;
  receivedAt: string;
  firstName: string;
  companyName: string;
  projectType: string;
  email: string;
  timeline: string;
  message: string;
};

export const saveLead = (lead: StoredLead) => write(`leads/${lead.id}.json`, lead);

export const getLead = (id: string) => read<StoredLead>(`leads/${id}.json`);

export const saveSentIds = (id: string, ids: Record<string, string | null>) =>
  write(`leads/${id}/sent.json`, ids, true);

export const recordEvent = (owner: string, event: Record<string, unknown>) =>
  write(
    `leads/${owner}/events/${Date.now()}-${String(event.type).replace(/[^a-z._-]/gi, "")}.json`,
    event
  );

/* Idempotency markers. Written only after an event is fully handled, so a
   failed attempt can be retried by Resend without being skipped. */
export const wasProcessed = (svixId: string) => exists(`webhook/processed/${svixId}.json`);
export async function markProcessed(svixId: string) {
  try {
    await write(`webhook/processed/${svixId}.json`, { at: new Date().toISOString() });
  } catch (err) {
    // Already marked by a concurrent retry: fine. Anything else bubbles up.
    if (!alreadyExists(err)) throw err;
  }
}

/** Claim a one-time alert. Returns false when it was already claimed. */
export async function claimAlert(key: string): Promise<boolean> {
  try {
    await write(`webhook/alerts/${key}.json`, { at: new Date().toISOString() });
    return true;
  } catch (err) {
    if (alreadyExists(err)) return false;
    throw err;
  }
}
