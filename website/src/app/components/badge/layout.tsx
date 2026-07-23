import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/badge",
  "Small inline status labels with info, positive, warning, error, and neutral variants."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
