# Brand kit

Everything needed to set up the channels that bring clients, written out so
each one is paste-and-upload rather than an afternoon of writing copy into
someone else's text box.

| File | What it is | Blocked? |
| --- | --- | --- |
| [linkedin/PAGE-CONTENT.md](linkedin/PAGE-CONTENT.md) | Company page: every field, tagline, About, 20 specialties | **Yes.** Needs domain email |
| [linkedin/PERSONAL-PROFILE.md](linkedin/PERSONAL-PROFILE.md) | Headline, About, Experience, Featured, Skills | No |
| [upwork/PROFILE.md](upwork/PROFILE.md) | Title, overview, rate, portfolio entries | No |
| [outreach/TEMPLATES.md](outreach/TEMPLATES.md) | Upwork proposals, LinkedIn DMs, cold email, white-label | No |
| [linkedin/cover-1128x191.png](linkedin/cover-1128x191.png) | Page and profile banner | No |
| [linkedin/logo-300x300.png](linkedin/logo-300x300.png) | Page logo | No |

## The one blocker

LinkedIn will not create a company page without an email address on the
company domain. Gmail, Outlook and Yahoo are all rejected. Every address on
webify.org.in currently hard bounces with `550 5.1.1`, because the domain's MX
points at Google Workspace but no mailbox exists there.

Google does not need renewing to fix this. A Zoho account already exists and
the Forever Free plan costs nothing; what is left is about twenty minutes of
DNS in Hostinger: delete the `SMTP.GOOGLE.COM` MX record, add three Zoho MX
records, a verification TXT, an SPF TXT, and a DKIM TXT.

Two things that follow it and are easy to forget. `contact@webify.org.in` has
to be removed from Resend's suppression list, or mail to it keeps getting
dropped even once the mailbox exists. And `LEAD_INBOX` in the Vercel
environment moves back from the Gmail fallback to the real address.

## The order that gets a client fastest

1. **Upwork profile and ten proposals a day.** The only channel where the
   buyer already has budget, intent, and a job posted. Nothing here is blocked.
2. **Personal LinkedIn profile.** What a prospect opens after your message.
   Pages have almost no organic reach; profiles do.
3. **White-label outreach to design studios.** Slower to land, but it repeats,
   and you need no brand of your own for it.
4. **The company page,** once email works. It is a credibility asset that gets
   checked, not a channel that produces anything on its own.

Doing four before one is the common mistake, because it feels like progress
and asks nothing of you.
