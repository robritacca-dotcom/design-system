import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/toast",
  "Temporary notification with status variants, auto-dismiss, and stacking via ToastProvider."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
