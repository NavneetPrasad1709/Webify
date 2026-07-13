import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Webify",
    short_name: "Webify",
    description:
      "Webify is a senior-led design and engineering studio shipping brand systems, product design, and web experiences built for clarity, pace, and scale.",
    start_url: "/",
    display: "browser",
    background_color: "#000000",
    theme_color: "#0051ff",
    icons: [
      { src: "/icon.png", sizes: "512x512", type: "image/png" },
      { src: "/apple-icon.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
