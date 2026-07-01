import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Designing Embedded AI Experiences Inside ChatGPT and Claude";

export default function Image() {
  return buildCaseStudyOgImage("Designing Embedded AI Experiences Inside ChatGPT and Claude");
}
