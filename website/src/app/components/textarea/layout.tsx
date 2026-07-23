import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/textarea",
  "Multi-line text input with character counter, resize control, helper text, and error states."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
