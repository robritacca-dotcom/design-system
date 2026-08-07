import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Augmenta Construction Platform";
const description =
  "Case study: turning automation into usability, the redesign behind 42% faster outcomes for Augmenta's generative electrical raceway platform.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/augmenta-ai" },
  openGraph: pageOpenGraph(title, description, "/work/augmenta-ai", "article"),
};

export default function AugmentaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "augmenta-ai", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
