import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "CIBC FirstCaribbean: banking platform";

export default function Image() {
  return buildCaseStudyOgImage("CIBC FirstCaribbean: banking platform");
}
