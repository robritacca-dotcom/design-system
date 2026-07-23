import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/app-sidebar",
  "Collapsible navigation rail with accordion sub-items, category headings, and profile section."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
