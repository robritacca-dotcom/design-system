import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/avatar",
  "User profile image with initials and icon fallback, status indicator, and multiple sizes."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
