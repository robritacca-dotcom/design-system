import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/drawer",
  "An edge-anchored modal panel that slides in from any side, for filter panels, detail views, and mobile navigation."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
