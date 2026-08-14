import { buildCaseStudyOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Building robr0 DS: the rules that hold";

export default function Image() {
  return buildCaseStudyOgImage("Building robr0 DS: the rules that hold");
}
