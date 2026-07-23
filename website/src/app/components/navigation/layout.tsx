import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/navigation",
  "Desktop and mobile navigation components including top-level nav bar, collapsed mobile bar, and hamburger slide-out menu."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
