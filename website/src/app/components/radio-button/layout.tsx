import { pageMetadata } from "@/config/navigation";

export const metadata = pageMetadata(
  "/components/radio-button",
  "Radio button and radio group with vertical and horizontal layouts, animated dot indicator."
);

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
