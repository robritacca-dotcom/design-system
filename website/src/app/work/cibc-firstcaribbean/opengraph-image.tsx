import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "CIBC FirstCaribbean — Banking Platform";

export default function Image() {
  return buildCaseStudyOgImage("CIBC FirstCaribbean — Banking Platform");
}
