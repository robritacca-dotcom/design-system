import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Design System",
  description: "Overview of the robr0 design system architecture and documentation.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
