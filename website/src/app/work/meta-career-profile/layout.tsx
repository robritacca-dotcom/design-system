import type { Metadata } from "next";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Career Profile Vision — Meta";
const description =
  "Case study: how I redesigned the platform millions of Meta candidates use to interview, prep, and sign offers — turning a maze of disconnected tools into one guided, personal journey.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/meta-career-profile" },
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
