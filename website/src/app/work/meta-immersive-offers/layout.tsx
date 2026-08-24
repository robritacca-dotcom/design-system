import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Designing a job offer candidates can step inside";
const description =
  "Case study: leading design on Meta's Immersive Offers, a Horizon Worlds experience that reimagined the job offer stage in VR, from creative brief to internal pilot.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/meta-immersive-offers" },
  openGraph: pageOpenGraph(title, description, "/work/meta-immersive-offers", "article"),
};

export default function MetaImmersiveOffersLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "meta-immersive-offers", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
