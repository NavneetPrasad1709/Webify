# IndexNow

## Status: live (set up before this audit)

- Key file served at `https://www.webify.org.in/4feb207863173016fd94bf65d93f5135.txt`
  (from `public/`). IndexNow keys are public by design: the protocol requires
  the key file to be publicly readable, so committing it is correct.
- Script: `npm run indexnow` (`scripts/indexnow.mjs`) reads the live sitemap
  and submits every URL to `api.indexnow.org`, which shares submissions with
  Bing, Yandex, Seznam and Naver.

**IndexNow does not submit anything to Google.** Google reads the sitemap via
Search Console.

## When to run it

After a deploy that adds, changes or removes pages, once the deploy is live:

```
npm run indexnow
```

Expected output: `IndexNow: 200 OK for N URLs` (202 is also success).

## For this release

Run it once after deploying: the new SaaS Development page and the new
article need to be picked up. Do not run it repeatedly for unchanged URLs; it
is meant for changes.

## Possible improvement (not done)

The script submits the whole sitemap each time. With 37 URLs that is fine.
If the site grows past a few hundred URLs, submit only changed URLs (diff
the sitemap `lastmod` against the last run).
