import type { Metadata } from "next";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "CIBC FirstCaribbean — Banking Platform";
const description =
  "Case study: leading design for CIBC FirstCaribbean's new banking platform across iOS and Android at Devbridge — designing for multi-country, multi-currency international banking.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/cibc-firstcaribbean" },
};

export default function CibcFirstCaribbeanLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "cibc-firstcaribbean", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
