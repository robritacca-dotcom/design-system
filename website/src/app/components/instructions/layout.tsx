import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/instructions",
  "Step-by-step guidance with numbered badges, connecting lines, and horizontal layout."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
