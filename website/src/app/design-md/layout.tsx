import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design MD",
  description:
    "The design language in one file — tokens, typography, colours, and every component spec in a downloadable markdown reference.",
};

export default function DesignMdLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
