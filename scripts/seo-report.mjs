// Weekly Search Console report for www.webify.org.in. Read-only.
//
//   npm run seo:report            -> writes reports/seo/<date>/*
//
// One-time setup (see docs/SEO_AUTOMATION_SETUP.md):
//   1. Google Cloud project -> enable "Google Search Console API".
//   2. OAuth client of type "Desktop app" -> download JSON to
//      .seo/client_secret.json  (gitignored; never commit it).
//   3. Run the command. A browser consent link is printed once; approve it.
//      The refresh token is stored in .seo/token.json (gitignored).
//
// Scope: https://www.googleapis.com/auth/webmasters.readonly  (no write access)
// No dependencies: plain fetch + a one-shot loopback server for the consent.

import fs from "node:fs";
import path from "node:path";
import http from "node:http";

const PROPERTY = process.env.GSC_PROPERTY || "sc-domain:webify.org.in";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";
const DIR = ".seo";
const SECRET = path.join(DIR, "client_secret.json");
const TOKEN = path.join(DIR, "token.json");

function fail(msg) {
  console.error(`\n[seo-report] ${msg}\n`);
  process.exit(1);
}

if (!fs.existsSync(SECRET)) {
  fail(`Missing ${SECRET}. Follow docs/SEO_AUTOMATION_SETUP.md step 1-2 first. Nothing was fetched.`);
}
const { installed } = JSON.parse(fs.readFileSync(SECRET, "utf8"));
if (!installed) fail(`${SECRET} must be a "Desktop app" OAuth client.`);

async function tokenRequest(body) {
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: installed.client_id, client_secret: installed.client_secret, ...body }),
  });
  const json = await res.json();
  if (!res.ok) fail(`Token error: ${json.error} ${json.error_description || ""}`);
  return json;
}

async function consent() {
  const server = http.createServer();
  await new Promise((r) => server.listen(0, "127.0.0.1", r));
  const redirect = `http://127.0.0.1:${server.address().port}`;
  const url = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  url.search = new URLSearchParams({
    client_id: installed.client_id, redirect_uri: redirect, response_type: "code",
    scope: SCOPE, access_type: "offline", prompt: "consent",
  }).toString();
  console.log(`\nOpen this link, sign in with the Search Console owner account, and approve read-only access:\n\n${url}\n`);
  const code = await new Promise((resolve) => {
    server.on("request", (req, res) => {
      const c = new URL(req.url, redirect).searchParams.get("code");
      res.end(c ? "Webify SEO report: access granted. You can close this tab." : "No code received.");
      if (c) resolve(c);
    });
  });
  server.close();
  const tok = await tokenRequest({ code, redirect_uri: redirect, grant_type: "authorization_code" });
  fs.mkdirSync(DIR, { recursive: true });
  fs.writeFileSync(TOKEN, JSON.stringify({ refresh_token: tok.refresh_token }), { mode: 0o600 });
  return tok.access_token;
}

async function accessToken() {
  if (!fs.existsSync(TOKEN)) return consent();
  const { refresh_token } = JSON.parse(fs.readFileSync(TOKEN, "utf8"));
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_id: installed.client_id, client_secret: installed.client_secret, refresh_token, grant_type: "refresh_token" }),
  });
  if (res.status === 400) {
    console.log("[seo-report] Saved authorisation expired or was revoked; asking again.");
    fs.rmSync(TOKEN);
    return consent();
  }
  const json = await res.json();
  if (!res.ok) fail(`Token refresh failed: ${json.error}`);
  return json.access_token;
}

const token = await accessToken();
const api = async (url, body) => {
  const res = await fetch(url, {
    method: body ? "POST" : "GET",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined,
  });
  const json = await res.json();
  if (!res.ok) fail(`${res.status} from Search Console: ${json.error?.message || "unknown"}`);
  return json;
};

const site = encodeURIComponent(PROPERTY);
const base = `https://searchconsole.googleapis.com/webmasters/v3/sites/${site}`;
const day = (n) => new Date(Date.now() - n * 864e5).toISOString().slice(0, 10);
// Search Console data lags ~2-3 days; compare the last 7 settled days with the 7 before.
const cur = { startDate: day(9), endDate: day(3) };
const prev = { startDate: day(16), endDate: day(10) };

const query = (range, dimensions, rowLimit = 25) =>
  api(`${base}/searchAnalytics/query`, { ...range, dimensions, rowLimit }).then((r) => r.rows || []);

const [totalsCur, totalsPrev, queries, pages, countries, devices, sitemaps] = await Promise.all([
  query(cur, []), query(prev, []), query(cur, ["query"]), query(cur, ["page"]),
  query(cur, ["country"], 10), query(cur, ["device"], 5), api(`${base}/sitemaps`),
]);

const sum = (rows) => rows[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
const t = sum(totalsCur), p = sum(totalsPrev);
const delta = (a, b) => (b ? `${(((a - b) / b) * 100).toFixed(0)}%` : "n/a (no prior data)");
const noData = totalsCur.length === 0;

const out = path.join("reports", "seo", cur.endDate);
fs.mkdirSync(out, { recursive: true });
const write = (name, data) => fs.writeFileSync(path.join(out, name), data);
write("weekly-search-performance.json", JSON.stringify({ property: PROPERTY, range: cur, totals: t, previous: p, queries, pages, countries, devices }, null, 2));
write("weekly-search-performance.csv", ["type,key,clicks,impressions,ctr,position",
  ...[["query", queries], ["page", pages], ["country", countries], ["device", devices]].flatMap(([type, rows]) =>
    rows.map((r) => [type, JSON.stringify(r.keys[0]), r.clicks, r.impressions, r.ctr.toFixed(4), r.position.toFixed(1)].join(",")))].join("\n"));
write("sitemap-status.json", JSON.stringify(sitemaps, null, 2));

const top = (rows, n = 10) => rows.slice(0, n).map((r) => `| ${r.keys[0]} | ${r.clicks} | ${r.impressions} | ${(r.ctr * 100).toFixed(1)}% | ${r.position.toFixed(1)} |`).join("\n") || "| (no rows) | | | | |";
write("weekly-seo-summary.md", `# Webify search report, ${cur.startDate} to ${cur.endDate}

Property: \`${PROPERTY}\`. Source: Google Search Console API (read-only).
${noData ? "\n**No search data was returned for this range.** That means no impressions were recorded, or the property is new; it is not the same as a measured zero for a mature site.\n" : ""}
| Metric | This week | Previous week | Change |
| --- | --- | --- | --- |
| Clicks | ${t.clicks} | ${p.clicks} | ${delta(t.clicks, p.clicks)} |
| Impressions | ${t.impressions} | ${p.impressions} | ${delta(t.impressions, p.impressions)} |
| CTR | ${(t.ctr * 100).toFixed(2)}% | ${(p.ctr * 100).toFixed(2)}% | |
| Avg position | ${t.position.toFixed(1)} | ${p.position.toFixed(1)} | |

## Top queries
| Query | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
${top(queries)}

## Top pages
| Page | Clicks | Impressions | CTR | Position |
| --- | --- | --- | --- | --- |
${top(pages)}

## Sitemaps
${(sitemaps.sitemap || []).map((s) => `- ${s.path}: last downloaded ${s.lastDownloaded || "never"}, ${s.errors || 0} errors, ${s.warnings || 0} warnings`).join("\n") || "- None submitted to this property."}
`);
console.log(`[seo-report] Wrote ${out}`);
