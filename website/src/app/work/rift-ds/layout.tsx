import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Rift DS: a design system that can look like anything";
const description =
  "An open-source design system built by one designer: React components, complete themes, a playground that turns a DESIGN.md into a theme, and an AI chat widget.";

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
