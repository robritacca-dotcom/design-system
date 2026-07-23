import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/input",
  "Text input with label, placeholder, left and right icons, helper text, and error states."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
