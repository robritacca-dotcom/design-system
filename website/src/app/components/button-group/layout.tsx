import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/button-group",
  "Horizontal and vertical button group layouts for related actions and navigation patterns."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
