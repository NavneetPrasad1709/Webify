import { ImageResponse } from "next/og";

// Generated Open Graph image (1200×630) - dark/indigo Webify card.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Webify - Senior-led AI & software product engineering";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#08080b",
          padding: "72px",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 32,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          WEBIFY
          <span style={{ color: "#6366f1", marginLeft: 4 }}>*</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 800,
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              maxWidth: 980,
            }}
          >
            We build AI-first products that actually ship.
          </div>
          <div
            style={{
              marginTop: 24,
              fontSize: 28,
              color: "rgba(255,255,255,0.6)",
              maxWidth: 880,
            }}
          >
            Senior-led AI &amp; software product engineering - India &amp; worldwide.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            color: "rgba(255,255,255,0.45)",
          }}
        >
          <div
            style={{
              width: 10,
              height: 10,
              borderRadius: 9999,
              background: "#6366f1",
              marginRight: 12,
            }}
          />
          AI products · Web platforms · Mobile apps
        </div>
      </div>
    ),
    { ...size },
  );
}
