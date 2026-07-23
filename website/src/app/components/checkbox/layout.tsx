import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/checkbox",
  "Custom checkbox with check and indeterminate states, keyboard accessible with animated transitions."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
