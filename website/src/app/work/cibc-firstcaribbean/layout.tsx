import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "CIBC FirstCaribbean — Mobile Banking Platform",
  description:
    "Case study: leading design for CIBC FirstCaribbean's new mobile banking platform across iOS and Android at Devbridge — designing for multi-country, multi-currency international banking.",
};

export default function CibcFirstCaribbeanLayout({ children }: { children: React.ReactNode }) {
  return children;
}
