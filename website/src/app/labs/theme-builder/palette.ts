/**
 * Client-side palette extraction for the theme builder.
 *
 * The uploaded image is drawn small, every opaque pixel is binned by
 * quantized RGB, and the highest-scoring bins are picked with a minimum
 * mutual distance so the result reads as a palette rather than six shades
 * of one colour. Saturated bins are boosted: a logo's mark should outrank
 * its white field.
 */

const SAMPLE_SIZE = 64;
const BIN_SHIFT = 4; // 16 levels per channel
const MIN_DISTANCE_SQ = 70 * 70;

interface Bin {
  count: number;
  r: number;
  g: number;
  b: number;
}

const toHex = (r: number, g: number, b: number): string =>
  "#" +
  [r, g, b]
    .map((c) => Math.round(Math.min(255, Math.max(0, c))).toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase();

export const hexToRgb = (hex: string): [number, number, number] => {
  const h = hex.replace("#", "");
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
};

const saturationOf = (r: number, g: number, b: number): number => {
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  return max === 0 ? 0 : (max - min) / max;
};

const luminanceOf = (r: number, g: number, b: number): number =>
  (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;

const distSq = (a: Bin, b: Bin): number =>
  (a.r - b.r) ** 2 + (a.g - b.g) ** 2 + (a.b - b.b) ** 2;

/** An image file as a data URL. The site's CSP allows data: images but not
    blob: ones, so previews and extraction both ride this form. */
export const readAsDataUrl = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(new Error("The file could not be read."));
    reader.readAsDataURL(file);
  });

const loadImage = (src: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => reject(new Error("The image could not be decoded."));
    image.src = src;
  });

/** The dominant colours of an image, strongest first, as uppercase hex. */
export async function extractPalette(src: string, count = 6): Promise<string[]> {
  const image = await loadImage(src);
  const canvas = document.createElement("canvas");
  const scale = SAMPLE_SIZE / Math.max(image.width, image.height, 1);
  canvas.width = Math.max(1, Math.round(image.width * scale));
  canvas.height = Math.max(1, Math.round(image.height * scale));
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return [];
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  const { data } = ctx.getImageData(0, 0, canvas.width, canvas.height);

  const bins = new Map<number, Bin>();
  for (let i = 0; i < data.length; i += 4) {
    if (data[i + 3] < 128) continue; // transparent pixels carry no colour
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const key =
      ((r >> BIN_SHIFT) << 8) | ((g >> BIN_SHIFT) << 4) | (b >> BIN_SHIFT);
    const bin = bins.get(key);
    if (bin) {
      bin.count += 1;
      bin.r += r;
      bin.g += g;
      bin.b += b;
    } else {
      bins.set(key, { count: 1, r, g, b });
    }
  }

  const averaged = [...bins.values()].map((bin) => ({
    count: bin.count,
    r: bin.r / bin.count,
    g: bin.g / bin.count,
    b: bin.b / bin.count,
  }));

  const scored = averaged
    .map((bin) => ({
      bin,
      score: bin.count * (0.15 + saturationOf(bin.r, bin.g, bin.b)),
    }))
    .sort((a, b) => b.score - a.score);

  const picked: Bin[] = [];
  for (const { bin } of scored) {
    if (picked.length >= count) break;
    if (picked.some((p) => distSq(p, bin) < MIN_DISTANCE_SQ)) continue;
    picked.push(bin);
  }

  return picked.map((bin) => toHex(bin.r, bin.g, bin.b));
}

/**
 * The palette entry that would make a workable action colour: saturated
 * enough to read as deliberate, and mid-toned enough to hold a label.
 * Null when nothing qualifies (a monochrome logo, a photo of fog).
 */
export function suggestBrand(palette: string[]): string | null {
  for (const hex of palette) {
    const [r, g, b] = hexToRgb(hex);
    const lum = luminanceOf(r, g, b);
    if (saturationOf(r, g, b) >= 0.25 && lum >= 0.08 && lum <= 0.72) return hex;
  }
  return null;
}
