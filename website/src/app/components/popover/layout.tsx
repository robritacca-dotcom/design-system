import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/popover",
  "Contextual overlay panel with click and hover triggers, positioned relative to its anchor."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
