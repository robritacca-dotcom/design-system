import type { Metadata } from "next";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Meta — Offer Creation Flow";
const description =
  "Case study: improving the velocity between hire decision and offer extension at Meta. 9% faster overall offer velocity, 23.7% reduction in comp approval time, live since July 2022 to 8,000+ recruiters.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/meta-offers" },
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
