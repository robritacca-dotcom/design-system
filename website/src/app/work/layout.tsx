import { sectionMetadata } from "@/config/navigation";

const metadataBase = sectionMetadata(
  "Work",
  "Selected case studies on product, AI, and design systems."
);

/* Safe to set here even though this layout wraps the case studies: every one
   of them declares its own canonical, so none inherits this. Without it the
   section landing was the one indexable page on the site with no canonical at
   all, which validate-seo.mjs found. */
export const metadata = {
  ...metadataBase,
  alternates: { canonical: "/work" },
};

export default function WorkLayout({ children }: { children: React.ReactNode }) {
  return children;
}
