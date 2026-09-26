import { buildOgImage, ogImageSize, ogImageContentType } from "@/lib/ogImage";

export const size = ogImageSize;
export const contentType = ogImageContentType;
export const alt = "Rift DS, an AI-ready React design system by Robert Ritacca";

export default function Image() {
  return buildOgImage(
    "Rift DS, an AI-ready React design system",
    "Design system"
  );
}
