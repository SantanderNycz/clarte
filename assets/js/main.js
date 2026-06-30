// ─── MAIN — entry point ──────────────────────────────────
// Imports and initialises all modules.
// THREE is loaded via a separate <script> tag in index.html (CDN r128),
// making it available as a global — no ESM import needed for it here.

import { I18N, applyLanguage } from './i18n.js';
import { initHeroScene } from './scene-hero.js';
import { initIntermezzoScene } from './scene-intermezzo.js';
import { initEditorialScene } from './scene-editorial.js';
import { initReveal } from './reveal.js';

// ── Language switcher ──
document.querySelectorAll('.lang-btn').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.getAttribute('data-lang')));
});

// initial language: French by default (per project brief),
// but respect a prior in-session choice if present
let initialLang = 'fr';
try {
  const stored = sessionStorage.getItem('clarte_lang');
  if (stored && I18N[stored]) initialLang = stored;
} catch (e) {}

applyLanguage(initialLang);

// ── 3D scenes ──
// THREE must be loaded before these run; the CDN <script> tag precedes
// this module in index.html, so it is guaranteed to be available.
initHeroScene();
initIntermezzoScene();
initEditorialScene();

// ── Reveal animation ──
initReveal();
