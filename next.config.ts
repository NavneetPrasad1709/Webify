import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Serve modern formats from the optimizer.
    formats: ["image/avif", "image/webp"],
    // Remote hosts the site pulls imagery from. `search` omitted so query-string
    // URLs (Unsplash / higgs resizers) still match.
    remotePatterns: [
      { protocol: "https", hostname: "d8j0ntlcm91z4.cloudfront.net" },
      { protocol: "https", hostname: "images.higgs.ai" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;
