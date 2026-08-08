/* Branded HTML email templates.

   Written as table-based, inline-styled markup on purpose: Gmail, Outlook and
   Apple Mail strip <style> blocks and ignore flexbox/grid, so layout has to
   come from tables and every rule has to sit on the element. Pure functions
   with no imports, so a preview script can render them exactly as sent.

   The design follows the site: black blocks, oversized uppercase display type,
   monospace eyebrows, cobalt used structurally rather than as decoration. */

export type LeadEmail = {
  firstName: string;
  companyName: string;
  email: string;
  projectType: string;
  timeline: string;
  message: string;
};

const INK = "#000000";
const COBALT = "#0051ff";
const FILL = "#f3f3f3";
const BORDER = "#e6e6e6";
const MUTED = "#6a6a6a";
const FONT =
  "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";
const MONO = "'SF Mono',SFMono-Regular,Consolas,'Liberation Mono',Menlo,monospace";

const esc = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

/** Monospace uppercase label, the site's eyebrow. */
const eyebrow = (text: string, color = MUTED) =>
  `<p style="margin:0;font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:${color}">${esc(text)}</p>`;

/** Bulletproof pill button: a table so Outlook renders the background. */
function button(href: string, label: string, bg = COBALT, fg = "#ffffff") {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td align="center" bgcolor="${bg}" style="border-radius:999px">
      <a href="${href}" style="display:inline-block;padding:16px 34px;font-family:${FONT};font-size:15px;font-weight:700;color:${fg};text-decoration:none;border-radius:999px">${label}</a>
    </td>
  </tr></table>`;
}

function shell(inner: string, footerNote: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"></head>
<body style="margin:0;padding:0;background:${FILL};-webkit-font-smoothing:antialiased">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FILL};padding:28px 14px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:20px;overflow:hidden">
      ${inner}
    </table>
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%">
      <tr><td align="center" style="padding:24px 10px;font-family:${FONT};font-size:12px;line-height:1.7;color:${MUTED}">
        ${footerNote}
      </td></tr>
    </table>
  </td></tr>
</table>
</body></html>`;
}

/** Sent to the studio inbox. Built to be scanned in three seconds. */
export function leadNotificationEmail(lead: LeadEmail, siteUrl: string) {
  const row = (label: string, value: string, isLink = false) => `
    <tr>
      <td style="padding:16px 0;border-bottom:1px solid ${BORDER};font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${MUTED};width:140px;vertical-align:top">${esc(label)}</td>
      <td style="padding:16px 0;border-bottom:1px solid ${BORDER};font-family:${FONT};font-size:16px;font-weight:600;color:${INK};vertical-align:top">${
        isLink
          ? `<a href="mailto:${esc(value)}" style="color:${COBALT};text-decoration:none;font-weight:600">${esc(value)}</a>`
          : esc(value)
      }</td>
    </tr>`;

  const inner = `
    <!-- Black hero: who wrote in, at a glance -->
    <tr><td bgcolor="${INK}" style="background:${INK};padding:30px 36px 34px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>${eyebrow("New project inquiry", COBALT)}</td>
          <td align="right"><img src="${siteUrl}/assets/webify-logo-white.png" width="82" alt="Webify" style="display:block;width:82px;height:auto;border:0"></td>
        </tr>
      </table>
      <p style="margin:24px 0 0;font-family:${FONT};font-size:40px;line-height:1.05;font-weight:800;letter-spacing:-.03em;color:#ffffff;text-transform:uppercase">${esc(lead.firstName)}</p>
      <p style="margin:6px 0 0;font-family:${FONT};font-size:18px;font-weight:600;color:${COBALT}">${esc(lead.companyName)}</p>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:20px"><tr>
        <td bgcolor="#1c1c1c" style="background:#1c1c1c;border-radius:999px;padding:9px 18px;font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.12em;text-transform:uppercase;color:#ffffff">Wants to launch: ${esc(lead.timeline)}</td>
      </tr></table>
    </td></tr>

    <!-- Details -->
    <tr><td style="padding:8px 36px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${row("Email", lead.email, true)}
        ${row("What they need", lead.projectType)}
      </table>
    </td></tr>

    <!-- Message -->
    <tr><td style="padding:28px 36px 0">
      ${eyebrow("Message")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;background:${FILL};border-radius:14px">
        <tr><td style="padding:22px 24px;font-family:${FONT};font-size:16px;line-height:1.7;color:${INK}">${nl2br(lead.message)}</td></tr>
      </table>
    </td></tr>

    <!-- Action -->
    <tr><td style="padding:30px 36px 40px">
      ${button(`mailto:${lead.email}?subject=${encodeURIComponent(`Re: your project (${lead.companyName})`)}`, `Reply to ${esc(lead.firstName)}`)}
      <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;color:${MUTED}">You promise a reply within 24 hours. Replying to this email reaches ${esc(lead.firstName)} directly.</p>
    </td></tr>`;

  return shell(
    inner,
    `Sent from the contact form at <a href="${siteUrl}" style="color:${MUTED}">webify.org.in</a>`
  );
}

/** Sent to the person who wrote in, so they know it landed. */
export function clientConfirmationEmail(
  lead: LeadEmail,
  siteUrl: string,
  bookingUrl: string,
  inbox: string
) {
  const work = [
    { img: "vexel", name: "Vexel AI", kind: "SaaS product", slug: "vexel-ai" },
    { img: "dental", name: "Dental Health", kind: "Local business", slug: "dental-health" },
    { img: "evergreen", name: "EverGreen", kind: "Real estate", slug: "evergreen-studio" },
  ]
    .map(
      (w) => `
      <td width="33.33%" style="padding:0 5px;vertical-align:top">
        <a href="${siteUrl}/project/${w.slug}" style="text-decoration:none">
          <img src="${siteUrl}/assets/email/${w.img}.jpg" width="172" alt="${w.name}" style="display:block;width:100%;max-width:172px;height:auto;border:0;border-radius:10px">
          <p style="margin:10px 0 0;font-family:${FONT};font-size:14px;font-weight:700;color:${INK}">${w.name}</p>
          <p style="margin:2px 0 0;font-family:${MONO};font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:${MUTED}">${w.kind}</p>
        </a>
      </td>`
    )
    .join("");

  const inner = `
    <!-- Black hero -->
    <tr><td bgcolor="${INK}" style="background:${INK};padding:38px 36px 40px" align="center">
      <img src="${siteUrl}/assets/webify-logo-white.png" width="128" alt="Webify" style="display:block;width:128px;height:auto;border:0;margin:0 auto">
      <p style="margin:32px 0 0;font-family:${FONT};font-size:34px;line-height:1.1;font-weight:800;letter-spacing:-.03em;color:#ffffff;text-transform:uppercase">Thanks, ${esc(lead.firstName)}.<br>Your message is in.</p>
    </td></tr>

    <!-- Promise + CTA -->
    <tr><td style="padding:34px 36px 0" align="center">
      <p style="margin:0;font-family:${FONT};font-size:17px;line-height:1.65;color:${INK}">A senior team member reads every inquiry personally and replies <strong>within 24 hours</strong>.</p>
    </td></tr>
    <tr><td style="padding:26px 36px 0" align="center">
      ${button(bookingUrl, "Book a 20 minute intro call")}
      <p style="margin:14px 0 0;font-family:${FONT};font-size:14px;color:${MUTED}">Free, no obligation. Or just wait for our reply.</p>
    </td></tr>

    <!-- Recap -->
    <tr><td style="padding:32px 36px 0">
      ${eyebrow("What you sent")}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px;background:${FILL};border-radius:14px">
        <tr><td style="padding:22px 24px;font-family:${FONT};font-size:15px;line-height:1.7;color:${INK}">${nl2br(lead.message)}</td></tr>
      </table>
    </td></tr>

    <!-- Work strip -->
    <tr><td style="padding:34px 31px 0">
      <div style="padding:0 5px">${eyebrow("While you wait, some of our work")}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px">
        <tr>${work}</tr>
      </table>
    </td></tr>

    <!-- Signature -->
    <tr><td style="padding:34px 36px 40px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr><td style="border-top:1px solid ${BORDER};padding-top:24px;font-family:${FONT};font-size:15px;line-height:1.65;color:${INK}">
          <strong style="font-weight:700">Navneet Prasad</strong><br>
          <span style="color:${MUTED}">Founder, Webify</span><br>
          <a href="mailto:${inbox}" style="color:${COBALT};text-decoration:none">${inbox}</a>
        </td></tr>
      </table>
    </td></tr>`;

  return shell(
    inner,
    `Webify, Tech Zone IV, Greater Noida, Uttar Pradesh 201318<br><a href="${siteUrl}" style="color:${MUTED}">webify.org.in</a>`
  );
}
