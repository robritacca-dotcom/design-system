import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Career Profile Vision — Meta";

export default function Image() {
  return buildCaseStudyOgImage("Career Profile Vision — Meta");
}
