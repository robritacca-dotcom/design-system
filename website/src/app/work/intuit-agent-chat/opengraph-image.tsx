import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Intuit Agent Chat Platform";

export default function Image() {
  return buildCaseStudyOgImage("Intuit Agent Chat Platform");
}
