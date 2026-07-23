import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/button",
  "Primary and secondary button variants in default and compact sizes, with icon support and multiple states."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
