import type { Metadata } from "next";

// Standalone scratch page for reviewing the chat primitives stacked as a
// widget. Linked from nowhere, kept out of search, and safe to delete once
// the real chat widget exists.
export const metadata: Metadata = {
  title: "Chat widget test",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
