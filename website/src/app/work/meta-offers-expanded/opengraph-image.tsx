import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Meta: Structured compensation capture";

export default function Image() {
  return buildCaseStudyOgImage("Meta: Structured compensation capture");
}
