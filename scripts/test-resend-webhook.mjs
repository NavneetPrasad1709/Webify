// End-to-end test for /api/resend-webhook and lead tagging in /api/contact.
// Sends NO real email: Resend is replaced by a local mock via RESEND_API_URL.
//
//   npm run build && npm run test:webhook
//
// Starts `next start` on a spare port with test-only env, a mock Resend API,
// fires signed webhook payloads, and asserts responses and alerts.

import http from "node:http";
import { spawn } from "node:child_process";
import { createHmac, randomBytes } from "node:crypto";

const MOCK_PORT = 4599;
const APP_PORT = 3124;
const BASE = `http://127.0.0.1:${APP_PORT}`;
const SECRET = `whsec_${randomBytes(24).toString("base64")}`;

// ---- mock Resend --------------------------------------------------------
const sent = [];
let failNext = 0;
const mock = http.createServer((req, res) => {
  let body = "";
  req.on("data", (c) => (body += c));
  req.on("end", () => {
    if (failNext > 0) {
      failNext--;
      res.writeHead(500).end("{}");
      return;
    }
    sent.push(JSON.parse(body || "{}"));
    res.writeHead(200, { "Content-Type": "application/json" }).end(JSON.stringify({ id: `mock_${sent.length}` }));
  });
});
await new Promise((r) => mock.listen(MOCK_PORT, "127.0.0.1", r));

// ---- app with test env (process env wins over .env.local) ---------------
const env = {
  ...process.env,
  RESEND_API_URL: `http://127.0.0.1:${MOCK_PORT}`,
  RESEND_API_KEY: "re_test_not_real",
  RESEND_WEBHOOK_SECRET: SECRET,
  WEBIFY_LEAD_ALERT_EMAIL: "alerts@example.invalid",
  LEAD_INBOX: "inbox@example.invalid",
  BLOB_STORE_ID: "",
  BLOB_READ_WRITE_TOKEN: "",
};
const app = spawn(process.execPath, ["node_modules/next/dist/bin/next", "start", "-p", String(APP_PORT)], {
  env,
  stdio: ["ignore", "pipe", "pipe"],
});
let appLog = "";
app.stdout.on("data", (d) => (appLog += d));
app.stderr.on("data", (d) => (appLog += d));
for (let i = 0; i < 60; i++) {
  try {
    await fetch(BASE);
    break;
  } catch {
    await new Promise((r) => setTimeout(r, 500));
  }
}

// ---- helpers ------------------------------------------------------------
function sign(id, ts, body, secret = SECRET) {
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  return "v1," + createHmac("sha256", key).update(`${id}.${ts}.${body}`).digest("base64");
}
async function hook(event, { id = `msg_${randomBytes(6).toString("hex")}`, ts = Math.floor(Date.now() / 1000), badSig = false, raw } = {}) {
  const body = raw ?? JSON.stringify(event);
  const signature = badSig ? sign(id, ts, body, `whsec_${randomBytes(24).toString("base64")}`) : sign(id, ts, body);
  const res = await fetch(`${BASE}/api/resend-webhook`, {
    method: "POST",
    headers: { "Content-Type": "application/json", "svix-id": id, "svix-timestamp": String(ts), "svix-signature": signature },
    body,
  });
  return { status: res.status, id };
}
const ev = (type, kind = "lead_notify", emailId = `em_${randomBytes(4).toString("hex")}`) => ({
  type,
  created_at: new Date().toISOString(),
  data: { email_id: emailId, to: ["inbox@example.invalid"], subject: "x", tags: { kind, lead: "testlead0001" }, bounce: { message: "550 5.1.1 user unknown" } },
});

const results = [];
function check(name, cond, detail = "") {
  results.push({ name, pass: Boolean(cond), detail });
}
const alerts = () => sent.filter((m) => m.tags?.some?.((t) => t.value === "alert"));

// ---- cases ----------------------------------------------------------------
let r, before;

before = alerts().length;
r = await hook(ev("email.delivered"));
check("delivered: 200, no alert", r.status === 200 && alerts().length === before, `status ${r.status}`);

before = alerts().length;
const bounced = ev("email.bounced");
r = await hook(bounced);
const bounceAlert = alerts().at(-1);
check("bounced lead notification: 200 + one alert", r.status === 200 && alerts().length === before + 1 && /BOUNCED/.test(bounceAlert?.subject ?? ""), `status ${r.status}, subject "${bounceAlert?.subject}"`);
const bouncedId = r.id;

before = alerts().length;
r = await hook(bounced, { id: bouncedId });
check("duplicate event id: 200, no second alert", r.status === 200 && alerts().length === before, `status ${r.status}`);

before = alerts().length;
r = await hook(ev("email.suppressed"));
check("suppressed: 200 + one alert", r.status === 200 && alerts().length === before + 1, `status ${r.status}`);

before = alerts().length;
const delayed = ev("email.delivery_delayed");
await hook(delayed);
r = await hook(delayed); // a second delay event (new event id) for the same email
check("delivery delayed twice: one alert only", r.status === 200 && alerts().length === before + 1, `alerts +${alerts().length - before}`);

before = alerts().length;
r = await hook(ev("email.complained"));
check("complained: 200 + one alert", r.status === 200 && alerts().length === before + 1, `status ${r.status}`);

before = alerts().length;
r = await hook(ev("email.bounced"), { badSig: true });
check("invalid signature: 401, no alert", r.status === 401 && alerts().length === before, `status ${r.status}`);

r = await hook(ev("email.bounced"), { ts: Math.floor(Date.now() / 1000) - 3600 });
check("stale timestamp (replay): 401", r.status === 401, `status ${r.status}`);

r = await hook(null, { raw: "{not json" });
check("malformed payload: 400", r.status === 400, `status ${r.status}`);

before = alerts().length;
r = await hook(ev("email.bounced", "alert"));
check("event about an alert email: ignored, no loop", r.status === 200 && alerts().length === before, `status ${r.status}`);

before = alerts().length;
failNext = 1;
const tmp = ev("email.bounced");
r = await hook(tmp);
const firstStatus = r.status;
r = await hook(tmp, { id: r.id }); // Resend retries the same event id
check("temporary failure: 5xx, then retry succeeds with one alert", firstStatus >= 500 && r.status === 200 && alerts().length === before + 1, `first ${firstStatus}, retry ${r.status}, alerts +${alerts().length - before}`);

// Contact route: both emails carry kind + lead tags.
const sentBefore = sent.length;
const cr = await fetch(`${BASE}/api/contact`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({ "first-name": "Test", email: "visitor@example.invalid", message: "Webhook test lead, mock only." }),
});
const newMail = sent.slice(sentBefore);
const tagOf = (m, n) => m.tags?.find?.((t) => t.name === n)?.value;
check(
  "contact form: 200, notification + confirmation tagged with the same lead id",
  cr.status === 200 && newMail.length === 2 && tagOf(newMail[0], "kind") === "lead_notify" && tagOf(newMail[1], "kind") === "lead_autoreply" && tagOf(newMail[0], "lead") && tagOf(newMail[0], "lead") === tagOf(newMail[1], "lead"),
  `status ${cr.status}, emails ${newMail.length}`
);

// ---- report ---------------------------------------------------------------
app.kill();
mock.close();
for (const t of results) console.log(`${t.pass ? "PASS" : "FAIL"}  ${t.name}${t.pass ? "" : `  (${t.detail})`}`);
const failed = results.filter((t) => !t.pass).length;
console.log(`\n${results.length - failed}/${results.length} passed. Real emails sent: 0 (all went to the local mock).`);
if (failed) {
  console.log("\n--- app log tail ---\n" + appLog.split("\n").slice(-30).join("\n"));
  process.exit(1);
}
process.exit(0);
