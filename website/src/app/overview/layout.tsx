import type { Metadata } from "next";
import { buildDesignSystemJsonLd } from "@/lib/structuredData";

export const metadata: Metadata = {
  alternates: { canonical: "/overview" },
  title: "Overview of robr0 DS",
  description:
    "An overview of robr0 DS, the personal design system I built to make this site — how the pipeline comes together, and the artifacts you can take and reuse.",
};

export default function OverviewLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(buildDesignSystemJsonLd()),
        }}
      />
      {children}
    </>
  );
}
