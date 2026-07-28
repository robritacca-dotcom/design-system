import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Intuit Agent Chat platform";

export default function Image() {
  return buildCaseStudyOgImage("Intuit Agent Chat platform");
}
