# Bing Webmaster Tools setup

## Status

Unknown. No Bing verification file (`BingSiteAuth.xml` returns 404) and no
`msvalidate.01` meta tag exist, which is normal if the site was **imported
from Google Search Console** (import verifies through Google). Claude could
not log in to check.

## Your steps (about 3 minutes, after Search Console is confirmed)

1. Open https://www.bing.com/webmasters and sign in (Microsoft or Google account).
2. If webify.org.in is already listed, open it and skip to step 5.
3. Choose **Import from Google Search Console**, approve the Google
   permission prompt, tick `webify.org.in`, confirm. Bing verifies it through
   Google and copies the sitemap.
4. If import is not offered, use **Add manually** > `https://www.webify.org.in`
   > HTML meta tag method, and send the `content` value to Claude; it goes into
   `src/app/layout.tsx` metadata (`verification.other["msvalidate.01"]`).
5. **Sitemaps**: confirm `https://www.webify.org.in/sitemap.xml` is listed.
6. **URL Inspection**: inspect the homepage and confirm it is indexable.
7. Look for **AI Performance** in the left menu (see AI_PERFORMANCE_REPORT.md).

## Why Bing matters here

Bing's index is used by Microsoft Copilot and is one of the sources other
AI search products draw on. IndexNow (already live) pushes URL changes to
Bing directly.
