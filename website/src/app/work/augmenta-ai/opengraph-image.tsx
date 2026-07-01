import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Augmenta Construction Platform";

export default function Image() {
  return buildCaseStudyOgImage("Augmenta Construction Platform");
}
