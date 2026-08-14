import { Open_Sans } from "next/font/google";

/**
 * Open Sans is the typeface the Augmenta product sets, and the covers page is
 * the only surface that needs it. Loading it here rather than in the root
 * layout keeps it off every other page; the cover reads it through
 * --font-open-sans and falls back to the platform UI face without it.
 */
export const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-open-sans",
  display: "swap",
});
