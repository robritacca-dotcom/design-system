import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meta — Offer Creation Flow",
  description:
    "Case study: improving the velocity between hire decision and offer extension at Meta. 9% faster overall offer velocity, 23.7% reduction in comp approval time, live since July 2022 to 8,000+ recruiters.",
};

export default function MetaOffersLayout({ children }: { children: React.ReactNode }) {
  return children;
}
