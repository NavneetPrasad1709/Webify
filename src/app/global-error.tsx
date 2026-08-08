"use client";

/* Last resort. This one replaces the root layout, so it cannot use the site's
   fonts, tokens, Nav or Footer: anything imported from the layout tree is
   exactly what may have just thrown. Everything below is therefore inline and
   self-contained by design, not by neglect. */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
          background: "#000000",
          color: "#ffffff",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif",
          WebkitFontSmoothing: "antialiased",
        }}
      >
        <div style={{ maxWidth: "40rem", textAlign: "center" }}>
          <p
            style={{
              margin: 0,
              fontSize: "13px",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#0051ff",
              fontWeight: 600,
            }}
          >
            Webify
          </p>
          <h1
            style={{
              margin: "16px 0 0",
              fontSize: "clamp(30px, 6vw, 52px)",
              lineHeight: 1.04,
              letterSpacing: "-0.03em",
              fontWeight: 800,
            }}
          >
            The site failed to load
          </h1>
          <p
            style={{
              margin: "20px auto 0",
              maxWidth: "46ch",
              fontSize: "16px",
              lineHeight: 1.65,
              color: "#e6e6e6",
            }}
          >
            Something went wrong before the page could render. Reloading usually
            fixes it. If it does not, email us and we will look into it.
          </p>
          <div
            style={{
              marginTop: "32px",
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                appearance: "none",
                border: 0,
                cursor: "pointer",
                borderRadius: "999px",
                padding: "13px 26px",
                fontSize: "14px",
                fontWeight: 600,
                background: "#0051ff",
                color: "#ffffff",
                fontFamily: "inherit",
              }}
            >
              Reload
            </button>
            <a
              href="mailto:contact@webify.org.in?subject=Site%20error"
              style={{
                borderRadius: "999px",
                padding: "13px 26px",
                fontSize: "14px",
                fontWeight: 600,
                background: "#252525",
                color: "#ffffff",
                textDecoration: "none",
              }}
            >
              Email Us
            </a>
          </div>
          {error.digest ? (
            <p
              style={{
                marginTop: "28px",
                fontSize: "12px",
                letterSpacing: "0.06em",
                color: "#8a8a8a",
                fontFamily: "ui-monospace, SFMono-Regular, Consolas, monospace",
              }}
            >
              Reference {error.digest}
            </p>
          ) : null}
        </div>
      </body>
    </html>
  );
}
