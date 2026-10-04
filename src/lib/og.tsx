import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";

/* Per-route social cards. Most traffic arrives through a pasted link in a DM,
   a proposal or a Slack channel, so the card has to say which page it is,
   not just repeat the brand. Same brand blue as the root card. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

export async function ogImage({
  eyebrow,
  title,
}: {
  eyebrow: string;
  title: string;
}) {
  const [font, logo] = await Promise.all([
    readFile(join(process.cwd(), "src/assets/fonts/Inter-ExtraBold.ttf")),
    readFile(join(process.cwd(), "src/assets/og-logo.png")),
  ]);
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;
  const size = title.length > 48 ? 64 : title.length > 28 ? 76 : 92;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          background: "#0051FF",
          color: "#FFFFFF",
          fontFamily: "Inter",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={240} height={88} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 26,
              letterSpacing: 6,
              textTransform: "uppercase",
              opacity: 0.85,
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              marginTop: 18,
              fontSize: size,
              lineHeight: 1.02,
              letterSpacing: -2,
              textTransform: "uppercase",
              maxWidth: 1050,
            }}
          >
            {title}
          </div>
        </div>
        <div style={{ fontSize: 26, opacity: 0.85 }}>www.webify.org.in</div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [{ name: "Inter", data: font, weight: 800, style: "normal" }],
    }
  );
}
