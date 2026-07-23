import type { Metadata } from "next";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Designing Embedded AI Experiences Inside ChatGPT and Claude";
const description =
  "Case study: leading design for TurboTax's embedded AI experiences during one of the first large-scale launches inside major AI platforms.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/embedded-ai-turbotax" },
};

export default function EmbeddedAiTurbotaxLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "embedded-ai-turbotax", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
