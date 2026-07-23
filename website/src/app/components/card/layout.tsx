import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/card",
  "Card components for previews, navigation, and token documentation — from content cards to colour swatches and typography specimens."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
