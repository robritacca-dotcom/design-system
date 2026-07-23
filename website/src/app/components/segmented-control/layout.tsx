import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/segmented-control",
  "Pill-style toggle between related views with keyboard navigation and icon support."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
