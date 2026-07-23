import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/tabs",
  "Tab navigation with underline indicator, icon support, compact size, and full-width mode."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
