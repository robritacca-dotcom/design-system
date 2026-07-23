import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/table",
  "Data table with flexible cell content, striped rows, compact sizing, and support for icons, inputs, buttons, and interactive controls."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
