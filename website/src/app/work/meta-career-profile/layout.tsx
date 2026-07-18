import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Career Profile Vision — Meta",
  description:
    "Case study: how I redesigned the platform millions of Meta candidates use to interview, prep, and sign offers — turning a maze of disconnected tools into one guided, personal journey.",
};

export default function MetaCareerProfileLayout({ children }: { children: React.ReactNode }) {
  return children;
}
