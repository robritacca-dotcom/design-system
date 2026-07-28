import type { Metadata } from "next";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Building robr0 DS: a one-person design system, end to end";
const description =
  "Why I built a personal design system from scratch, and how an AI-augmented spec-to-code pipeline let me ship a polished site alone.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/robr0-ds" },
};

export default function Robr0DsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "robr0-ds", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
