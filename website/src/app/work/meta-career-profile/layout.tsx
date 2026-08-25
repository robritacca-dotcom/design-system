import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Career Profile vision at Meta";
const description =
  "Case study: a team vision for the platform millions of Meta candidates use to interview, prep and sign offers: three page typologies, a timeline that drives the content, and a self-serve offer.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/meta-career-profile" },
  openGraph: pageOpenGraph(title, description, "/work/meta-career-profile", "article"),
};

export default function MetaCareerProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "meta-career-profile", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
