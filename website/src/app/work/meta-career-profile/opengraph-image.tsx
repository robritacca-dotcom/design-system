import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Career Profile vision at Meta";

export default function Image() {
  return buildCaseStudyOgImage("Career Profile vision at Meta");
}
