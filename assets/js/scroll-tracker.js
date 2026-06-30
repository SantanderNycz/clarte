// ─── SCROLL VELOCITY TRACKER ─────────────────────────────
// Tracks scroll direction and speed each frame via exponential smoothing.
// Exported `scroll` object is read by all three 3D scene modules.

export const scroll = {
  y: 0,
  prev: 0,
  delta: 0,      // px/frame — positive = scrolling down, negative = up
  velocity: 0,   // smoothed value
};

window.addEventListener('scroll', () => { scroll.y = window.scrollY; }, { passive: true });

export function updateScrollVelocity() {
  const raw = scroll.y - scroll.prev;
  scroll.prev = scroll.y;
  scroll.velocity = scroll.velocity * 0.7 + raw * 0.3; // exponential smoothing
  scroll.delta = scroll.velocity;
}
