import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Meta: Structured compensation capture";
const description =
  "Case study: replacing Meta's free-text compensation notes with structured, validated capture. 23.7% faster comp approvals, 51% more validated data captured, live since July 2022 to the whole recruiting org.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/meta-offers" },
  openGraph: pageOpenGraph(title, description, "/work/meta-offers", "article"),
};

export default function MetaOffersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "meta-offers", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
