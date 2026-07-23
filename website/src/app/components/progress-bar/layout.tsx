import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/progress-bar",
  "Horizontal bar indicating completion progress with status variants and optional label."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
