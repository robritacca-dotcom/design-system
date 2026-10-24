import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Rift DS: a design system that can look like anything";

export default function Image() {
  return buildCaseStudyOgImage("Rift DS: a design system that can look like anything");
}
