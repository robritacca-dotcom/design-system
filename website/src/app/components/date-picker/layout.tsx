import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/date-picker",
  "Inline calendar with month navigation, day selection, and today indicator."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
