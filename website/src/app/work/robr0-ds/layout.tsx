import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Building robr0 DS: the rules that hold";
const description =
  "Six months building a design system where breaking a rule fails the build: tokens by hand, documents an agent executes, and validators that make the rules stick.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/robr0-ds" },
  openGraph: pageOpenGraph(title, description, "/work/robr0-ds", "article"),
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
