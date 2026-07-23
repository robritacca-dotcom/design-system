import type { Metadata } from "next";

// Standalone asset preview (the animated rr logo), not a real page — keep it
// out of search and out of the sitemap/nav.
export const metadata: Metadata = {
  title: "rr logo",
  robots: { index: false, follow: false },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
