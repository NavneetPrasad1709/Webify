# Google Search Console setup

## What is already true (checked 6 Nov 2026)

- The DNS for webify.org.in has a `google-site-verification=FZiuAj...` TXT
  record. That is the record Google uses to verify a **Domain property**
  (`sc-domain:webify.org.in`), so the property was very likely added and
  verified already.
- Sitemap exists at `https://www.webify.org.in/sitemap.xml` (200, 37 URLs, valid).

## What could not be checked

Claude had no access to your Google account in this session (the Chrome
browser connection was not active), so these are unconfirmed: whether the
property exists in your account, whether the sitemap was submitted, and any
indexing data.

## Your steps (about 5 minutes)

1. Open https://search.google.com/search-console and sign in with the Google
   account that owns webify.org.in.
2. In the property picker, look for **webify.org.in** (Domain property).
   - If it is there: open it. Do not add a second property.
   - If it is not there: Add property > Domain > `webify.org.in`. Google will
     find the existing TXT record and verify immediately.
3. **Sitemaps** > enter `sitemap.xml` > Submit. Status should read "Success".
4. **URL Inspection** > paste each URL > **Request indexing**:
   - `https://www.webify.org.in/`
   - `https://www.webify.org.in/service/saas-development`
   - `https://www.webify.org.in/service/custom-software`
   - `https://www.webify.org.in/service/ai-development`
   - `https://www.webify.org.in/blog/what-a-saas-mvp-needs-on-day-one`
5. In URL Inspection, click **Test live URL** once for the homepage and check
   "Page can be indexed" (this confirms the real Googlebot is not blocked).

Submitting a sitemap or requesting indexing does not guarantee indexing or
ranking; it only tells Google the pages exist.

## Next: reporting

Once the property is confirmed, set up the read-only API report in
`SEO_AUTOMATION_SETUP.md`.
