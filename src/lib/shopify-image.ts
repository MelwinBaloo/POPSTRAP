/**
 * Shopify CDN image helpers.
 * Shopify's image CDN accepts ?width=, ?height=, ?crop= query params
 * and returns a responsive, optimized image (auto WebP/AVIF via Accept header).
 */

function withParams(url: string, params: Record<string, string | number>) {
  if (!url) return url;
  try {
    const u = new URL(url);
    for (const [k, v] of Object.entries(params)) {
      u.searchParams.set(k, String(v));
    }
    return u.toString();
  } catch {
    return url;
  }
}

export function shopifyImage(url: string, width: number, height?: number) {
  return withParams(url, height ? { width, height, crop: "center" } : { width });
}

export function shopifySrcSet(url: string, widths: number[], height?: (w: number) => number) {
  return widths
    .map((w) => `${shopifyImage(url, w, height?.(w))} ${w}w`)
    .join(", ");
}
