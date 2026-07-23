import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/app-layout",
  "Full-page template pairing the collapsible App sidebar with a centred content area."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
