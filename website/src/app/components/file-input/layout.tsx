import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/file-input",
  "A click-or-drop upload zone paired with a controlled file list showing size, progress, and per-file errors."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
