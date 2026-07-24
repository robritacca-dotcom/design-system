import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/combobox",
  "A filterable select that narrows options as you type, with multi-select chips, grouping, and async loading."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
