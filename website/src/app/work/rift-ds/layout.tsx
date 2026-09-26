import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Building Rift DS: the rules that hold";
const description =
  "Seven months building a design system where breaking a rule fails the build: tokens by hand, documents an agent executes, and validators that make the rules stick.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/rift-ds" },
  openGraph: pageOpenGraph(title, description, "/work/rift-ds", "article"),
};

export default function RiftDsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "rift-ds", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
