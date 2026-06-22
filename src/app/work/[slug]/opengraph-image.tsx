import { ImageResponse } from "next/og";
import { getCaseStudy, getCaseStudySlugs } from "@/lib/work";

// Per-case-study Open Graph card (1200×630), generated at build time.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Webify case study";

export const dynamicParams = false;
export function generateStaticParams() {
  return getCaseStudySlugs().map((slug) => ({ slug }));
}

export default async function CaseStudyOgImage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const study = getCaseStudy(slug);
  const name = study?.name ?? "Case study";
  const tagline = study?.tagline ?? "";
  const discipline = study?.discipline ?? "";

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
            justifyContent: "space-between",
            fontSize: 30,
            fontWeight: 800,
            letterSpacing: "-0.03em",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            WEBIFY
            <span style={{ color: "#6366f1", marginLeft: 4 }}>*</span>
          </div>
          <div style={{ fontSize: 22, fontWeight: 600, color: "rgba(255,255,255,0.55)" }}>
            {discipline}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 22, color: "#818cf8", marginBottom: 18, letterSpacing: "0.1em" }}>
            CASE STUDY
          </div>
          <div
            style={{
              fontSize: 76,
              fontWeight: 800,
              lineHeight: 1.0,
              letterSpacing: "-0.03em",
              maxWidth: 1000,
            }}
          >
            {name}
          </div>
          {tagline ? (
            <div
              style={{
                marginTop: 24,
                fontSize: 30,
                lineHeight: 1.25,
                color: "rgba(255,255,255,0.62)",
                maxWidth: 920,
              }}
            >
              {tagline}
            </div>
          ) : null}
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
          Senior-led AI &amp; software product engineering
        </div>
      </div>
    ),
    { ...size },
  );
}
