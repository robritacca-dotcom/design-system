import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/date-input",
  "Date input with native picker, calendar icon, label, and validation states."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
