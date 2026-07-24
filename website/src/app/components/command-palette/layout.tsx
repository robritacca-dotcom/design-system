import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/command-palette",
  "A modal Cmd+K launcher that searches a grouped command list, with keyboard navigation and shortcut hints."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
