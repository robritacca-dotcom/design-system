import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/toggle-switch",
  "Binary on/off toggle control with sliding thumb and check indicator, used for settings like theme switching."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
