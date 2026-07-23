import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/toggle-group",
  "A set of two-state buttons that can be toggled on or off, supporting text and icon items."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
