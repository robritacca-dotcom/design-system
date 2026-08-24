import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Designing a job offer candidates can step inside";

export default function Image() {
  return buildCaseStudyOgImage("Designing a job offer candidates can step inside");
}
