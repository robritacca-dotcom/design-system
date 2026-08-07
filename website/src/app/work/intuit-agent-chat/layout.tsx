import type { Metadata } from "next";
import { pageOpenGraph } from "@/config/navigation";
import { buildCaseStudyJsonLd } from "@/lib/structuredData";

const title = "Intuit Agent Chat platform";
const description =
  "Case study: the official conversational AI platform for all of Intuit. Designed and built from 0 → 1 across web, iOS, and Android. Live in QuickBooks and TurboTax.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/work/intuit-agent-chat" },
  openGraph: pageOpenGraph(title, description, "/work/intuit-agent-chat", "article"),
};

export default function IntuitAgentChatLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            buildCaseStudyJsonLd({ slug: "intuit-agent-chat", headline: title, description })
          ),
        }}
      />
      {children}
    </>
  );
}
