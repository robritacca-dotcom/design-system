import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Meta: Offer Creation Flow";

export default function Image() {
  return buildCaseStudyOgImage("Meta: Offer Creation Flow");
}
