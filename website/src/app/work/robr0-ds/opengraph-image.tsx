import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Building robr0 DS — a one-person design system, end to end";

export default function Image() {
  return buildCaseStudyOgImage("Building robr0 DS — a one-person design system, end to end");
}
