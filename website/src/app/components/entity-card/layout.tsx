import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/entity-card",
  "Compact display-only card with a centred icon or image and a label — powers the Icons and Logos galleries."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
