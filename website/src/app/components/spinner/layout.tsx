import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/spinner",
  "Animated circular loading indicator available in three sizes and primary or neutral variants."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
