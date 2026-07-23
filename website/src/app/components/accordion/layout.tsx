import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/accordion",
  "Collapsible content sections for organising related information."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
