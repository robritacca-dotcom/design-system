import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/tooltip",
  "Contextual text label that appears on hover or focus with position and delay options."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
