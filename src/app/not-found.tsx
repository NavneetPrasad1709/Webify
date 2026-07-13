import type { Metadata } from "next";
import NotFoundSection from "@/components/pages/not-found/NotFoundSection";

export const metadata: Metadata = {
  title: "Page Not Found",
  description:
    "Oops! This Page Lost Its Power. Head back to the Webify homepage.",
};

export default function NotFound() {
  return <NotFoundSection />;
}
