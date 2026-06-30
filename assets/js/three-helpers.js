// ─── THREE.JS SHARED HELPERS ─────────────────────────────
// THREE is loaded as a global script tag (CDN r128) before these modules,
// so it's available on `window.THREE` without an import.

export function makeRenderer(canvas, clearColor = 0x000000, alpha = true) {
  const r = new THREE.WebGLRenderer({ canvas, alpha, antialias: true });
  r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  if (alpha) {
    r.setClearColor(0x000000, 0);
  } else {
    r.setClearColor(clearColor, 1);
  }
  return r;
}
