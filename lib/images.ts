/** Builds an Unsplash CDN URL. next/image handles resizing; we only pin crop + quality. */
export function unsplash(id: string, opts: { w?: number; face?: boolean } = {}) {
  const params = new URLSearchParams({ auto: "format", fit: "crop", w: String(opts.w ?? 1800), q: "80" });
  if (opts.face) params.set("crop", "faces");
  return `https://images.unsplash.com/photo-${id}?${params.toString()}`;
}
