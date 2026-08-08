/* Branded HTML email templates.

   Table-based, inline-styled markup on purpose: Gmail, Outlook and Apple Mail
   strip <style> blocks and ignore flexbox/grid, so layout comes from tables and
   every rule sits on the element. Pure functions with no imports, so a preview
   script renders them exactly as sent.

   Design: the site's language pushed into email. Each message is built from
   full-bleed colour blocks rather than a header strip on white, oversized
   uppercase display type, monospace eyebrows, and one lime marker where the
   eye should land first. Cobalt carries the brand, black carries structure. */

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
const LIME = "#f3f696";
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

const eyebrow = (text: string, color: string) =>
  `<p style="margin:0;font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.18em;text-transform:uppercase;color:${color}">${esc(text)}</p>`;

/** Bulletproof pill button: a table so Outlook renders the background. */
function button(href: string, label: string, bg: string, fg: string) {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>
    <td align="center" bgcolor="${bg}" style="border-radius:999px">
      <a href="${href}" style="display:inline-block;padding:17px 36px;font-family:${FONT};font-size:15px;font-weight:700;letter-spacing:-.01em;color:${fg};text-decoration:none;border-radius:999px">${label}</a>
    </td>
  </tr></table>`;
}

function shell(inner: string, footerNote: string) {
  return `<!doctype html>
<html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light only"><meta name="supported-color-schemes" content="light only"></head>
<body style="margin:0;padding:0;background:${FILL};-webkit-font-smoothing:antialiased">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${FILL};padding:26px 14px">
  <tr><td align="center">
    <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:600px;max-width:100%;background:#ffffff;border-radius:22px;overflow:hidden">
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

/** Sent to the studio inbox. A dispatch: who, how urgent, what they said. */
export function leadNotificationEmail(lead: LeadEmail, siteUrl: string) {
  const row = (label: string, value: string, isLink = false) => `
    <tr>
      <td style="padding:15px 0;border-bottom:1px solid ${BORDER};font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:${MUTED};width:132px;vertical-align:top">${esc(label)}</td>
      <td style="padding:15px 0;border-bottom:1px solid ${BORDER};font-family:${FONT};font-size:16px;font-weight:600;color:${INK};vertical-align:top">${
        isLink
          ? `<a href="mailto:${esc(value)}" style="color:${COBALT};text-decoration:none;font-weight:600">${esc(value)}</a>`
          : esc(value)
      }</td>
    </tr>`;

  const inner = `
    <!-- Lime rule: the one marker that says this is a lead, not a newsletter -->
    <tr><td bgcolor="${LIME}" style="background:${LIME};height:8px;line-height:8px;font-size:0">&nbsp;</td></tr>

    <!-- Black dispatch header -->
    <tr><td bgcolor="${INK}" style="background:${INK};padding:32px 38px 36px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        <tr>
          <td>${eyebrow("New project inquiry", LIME)}</td>
          <td align="right"><img src="${siteUrl}/assets/webify-logo-white.png" width="76" alt="Webify" style="display:block;width:76px;height:auto;border:0"></td>
        </tr>
      </table>
      <p style="margin:26px 0 0;font-family:${FONT};font-size:46px;line-height:.98;font-weight:800;letter-spacing:-.035em;color:#ffffff;text-transform:uppercase">${esc(lead.firstName)}</p>
      <p style="margin:10px 0 0;font-family:${FONT};font-size:19px;font-weight:600;letter-spacing:-.01em;color:${COBALT}">${esc(lead.companyName)}</p>
    </td></tr>

    <!-- Cobalt urgency band -->
    <tr><td bgcolor="${COBALT}" style="background:${COBALT};padding:16px 38px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td style="font-family:${MONO};font-size:11px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#c8d9ff">Wants to launch</td>
        <td align="right" style="font-family:${FONT};font-size:15px;font-weight:700;color:#ffffff">${esc(lead.timeline)}</td>
      </tr></table>
    </td></tr>

    <!-- Details -->
    <tr><td style="padding:14px 38px 0">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        ${row("Email", lead.email, true)}
        ${row("What they need", lead.projectType)}
      </table>
    </td></tr>

    <!-- Message, marked with a cobalt rail -->
    <tr><td style="padding:28px 38px 0">
      ${eyebrow("In their words", MUTED)}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px">
        <tr>
          <td width="4" bgcolor="${COBALT}" style="background:${COBALT};width:4px;border-radius:4px 0 0 4px;font-size:0">&nbsp;</td>
          <td style="padding:20px 24px;background:${FILL};font-family:${FONT};font-size:17px;line-height:1.65;color:${INK}">${nl2br(lead.message)}</td>
        </tr>
      </table>
    </td></tr>

    <!-- Action -->
    <tr><td style="padding:30px 38px 42px">
      ${button(`mailto:${lead.email}?subject=${encodeURIComponent(`Re: your project (${lead.companyName})`)}`, `Reply to ${esc(lead.firstName)}`, INK, "#ffffff")}
      <p style="margin:16px 0 0;font-family:${FONT};font-size:13px;line-height:1.6;color:${MUTED}">You promise a reply within 24 hours. Replying to this email reaches ${esc(lead.firstName)} directly.</p>
    </td></tr>`;

  return shell(
    inner,
    `Sent from the contact form at <a href="${siteUrl}" style="color:${MUTED}">webify.org.in</a>`
  );
}

/** Sent to the person who wrote in: confirmation, expectations, and proof. */
export function clientConfirmationEmail(
  lead: LeadEmail,
  siteUrl: string,
  bookingUrl: string,
  inbox: string
) {
  /* A real sequence, so numbering carries information rather than decoration.
     Same four steps the contact page promises. */
  const steps = [
    ["01", "Intro call", "We reply in 24 hours and talk within 48."],
    ["02", "Scope and quote", "A fixed price in writing within 3 working days."],
    ["03", "Design and build", "Weekly sprints with a shared board."],
    ["04", "Launch", "Plus 30 days of post-launch support."],
  ]
    .map(
      ([n, title, body], i) => `
      <tr>
        <td width="52" style="padding:${i === 0 ? "0" : "18px"} 0 0;vertical-align:top;font-family:${MONO};font-size:13px;font-weight:700;letter-spacing:.06em;color:${COBALT}">${n}</td>
        <td style="padding:${i === 0 ? "0" : "18px"} 0 0;vertical-align:top">
          <p style="margin:0;font-family:${FONT};font-size:17px;font-weight:700;letter-spacing:-.01em;color:#ffffff">${title}</p>
          <p style="margin:4px 0 0;font-family:${FONT};font-size:15px;line-height:1.55;color:#a8a8a8">${body}</p>
        </td>
      </tr>`
    )
    .join("");

  const work = [
    { img: "vexel", name: "Vexel AI", kind: "SaaS product", slug: "vexel-ai" },
    { img: "dental", name: "Dental Health", kind: "Local business", slug: "dental-health" },
    { img: "evergreen", name: "EverGreen", kind: "Real estate", slug: "evergreen-studio" },
  ]
    .map(
      (w) => `
      <td width="33.33%" style="padding:0 5px;vertical-align:top">
        <a href="${siteUrl}/project/${w.slug}" style="text-decoration:none">
          <img src="${siteUrl}/assets/email/${w.img}.jpg" width="172" alt="${w.name}" style="display:block;width:100%;max-width:172px;height:auto;border:0;border-radius:9px">
          <p style="margin:10px 0 0;font-family:${FONT};font-size:14px;font-weight:700;color:${INK}">${w.name}</p>
          <p style="margin:2px 0 0;font-family:${MONO};font-size:10px;letter-spacing:.1em;text-transform:uppercase;color:${MUTED}">${w.kind}</p>
        </a>
      </td>`
    )
    .join("");

  const inner = `
    <!-- Cobalt hero: the boldest thing the brand does -->
    <tr><td bgcolor="${COBALT}" style="background:${COBALT};padding:40px 38px 44px">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>
        <td><img src="${siteUrl}/assets/webify-logo-white.png" width="92" alt="Webify" style="display:block;width:92px;height:auto;border:0"></td>
        <td align="right">${eyebrow("Message received", "#c8d9ff")}</td>
      </tr></table>
      <p style="margin:34px 0 0;font-family:${FONT};font-size:42px;line-height:.98;font-weight:800;letter-spacing:-.035em;color:#ffffff;text-transform:uppercase">Thanks,<br>${esc(lead.firstName)}.</p>
      <p style="margin:18px 0 0;font-family:${FONT};font-size:18px;line-height:1.55;font-weight:500;color:#dbe6ff;max-width:400px">Your message is in. A senior team member reads every inquiry personally and replies within 24 hours.</p>
    </td></tr>

    <!-- Black: what happens next, a real sequence -->
    <tr><td bgcolor="${INK}" style="background:${INK};padding:34px 38px 38px">
      ${eyebrow("What happens next", LIME)}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:22px">
        ${steps}
      </table>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin-top:32px"><tr><td>
        ${button(bookingUrl, "Skip the wait, book a call", COBALT, "#ffffff")}
      </td></tr></table>
      <p style="margin:14px 0 0;font-family:${FONT};font-size:13px;color:#8d8d8d">20 minutes, free, no obligation.</p>
    </td></tr>

    <!-- White: their message back to them -->
    <tr><td style="padding:34px 38px 0">
      ${eyebrow("What you sent", MUTED)}
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:12px">
        <tr>
          <td width="4" bgcolor="${FILL}" style="background:${FILL};width:4px;font-size:0">&nbsp;</td>
          <td style="padding:20px 24px;background:${FILL};font-family:${FONT};font-size:16px;line-height:1.65;color:${INK};border-radius:0 10px 10px 0">${nl2br(lead.message)}</td>
        </tr>
      </table>
    </td></tr>

    <!-- Work -->
    <tr><td style="padding:36px 33px 0">
      <div style="padding:0 5px">${eyebrow("Recent work", MUTED)}</div>
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="margin-top:14px">
        <tr>${work}</tr>
      </table>
    </td></tr>

    <!-- Signature -->
    <tr><td style="padding:34px 38px 42px">
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
