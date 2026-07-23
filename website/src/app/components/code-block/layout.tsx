import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/code-block",
  "Monospace code with a header and one-click copy."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
