import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/dropdown-menu",
  "Contextual menu with sections, sub-menus, keyboard shortcuts, and inset-gap hover styling."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
