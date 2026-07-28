import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Designing embedded AI experiences inside ChatGPT and Claude";

export default function Image() {
  return buildCaseStudyOgImage("Designing embedded AI experiences inside ChatGPT and Claude");
}
