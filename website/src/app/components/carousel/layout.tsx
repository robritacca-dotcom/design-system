import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/carousel",
  "Sliding content viewer with navigation arrows, dot indicators, auto-play, and keyboard support."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
