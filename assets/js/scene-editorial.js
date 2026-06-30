// ─── OBJECT #3 — EDITORIAL: ESPONJA DE SILICONE ──────────
// Silicone facial cleansing pad: teardrop/egg-shaped mint body,
// front face densely covered in soft silicone nubs, smooth back
// with a circular power button. Dark section — lit so the mint reads.
// Scroll: the whole pad rotates, revealing the nub face then the button.
// Canvas position: right side of the dark editorial section.

import { makeRenderer } from './three-helpers.js';
import { scroll } from './scroll-tracker.js';

export function initEditorialScene() {
  const canvas = document.getElementById('canvas-editorial');
  if (!canvas) return;

  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 100);
  camera.position.z = 8;

  const pad = new THREE.Group();
  scene.add(pad);

  // ── materials ──
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0xAFE3D1,        // soft mint silicone
    emissive: 0x3A7A66,     // self-glow so the mint reads on the dark editorial bg
    shininess: 70,
    specular: 0x9fd9c4,
  });
  const nubMat = new THREE.MeshPhongMaterial({
    color: 0xC8F0E0,        // lighter mint for the nubs
    emissive: 0x46907A,
    shininess: 50,
    specular: 0x8fcdb8,
  });
  const buttonMat = new THREE.MeshPhongMaterial({
    color: 0x8FD3BC,        // slightly deeper mint for the power button
    shininess: 120,
    specular: 0xffffff,
  });
  const iconMat = new THREE.MeshPhongMaterial({
    color: 0x5FA890,
    shininess: 60,
  });

  // ── egg / teardrop body (flattened ellipsoid) ──
  const R = 1.15;
  const sx = 0.92, sy = 1.28, sz = 0.5;
  const body = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 48), bodyMat);
  body.scale.set(sx, sy, sz);
  pad.add(body);

  // semi-axes of the ellipsoid (for placing nubs on the surface)
  const a = R * sx, b = R * sy, c = R * sz;

  // ── front-face silicone nubs (dense grid inside the egg outline) ──
  const nubGeo = new THREE.CylinderGeometry(0.028, 0.018, 0.12, 8);
  const cols = 22, rows = 28;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = ((i / (cols - 1)) - 0.5) * 2 * a;
      const y = ((j / (rows - 1)) - 0.5) * 2 * b * 1.02;
      const t = (x * x) / (a * a) + (y * y) / (b * b);
      if (t > 0.86) continue;                         // keep inside the egg
      const z = c * Math.sqrt(Math.max(0, 1 - t));    // ride the curved surface
      const nub = new THREE.Mesh(nubGeo, nubMat);
      nub.position.set(x, y, z + 0.04);
      nub.rotation.x = Math.PI / 2;                   // point outward (+Z)
      pad.add(nub);
    }
  }

  // ── power button on the smooth back face ──
  const button = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.06, 32), buttonMat);
  button.rotation.x = Math.PI / 2;
  button.position.set(0, -0.55, -(c - 0.02));
  pad.add(button);

  // power icon: a ring + a short vertical bar
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.018, 12, 32, Math.PI * 1.6), iconMat);
  ring.rotation.x = Math.PI / 2;
  ring.rotation.z = Math.PI / 2;
  ring.position.set(0, -0.55, -(c + 0.02));
  pad.add(ring);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.09, 8), iconMat);
  bar.position.set(0, -0.5, -(c + 0.02));
  pad.add(bar);

  // tilt naturally and nudge toward the panel side
  pad.rotation.z = 0.18;
  pad.rotation.x = -0.1;
  pad.position.set(0.8, 0.2, 0);

  // lighting — bright enough that mint reads on the dark bg, with a warm rim
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dl1 = new THREE.DirectionalLight(0xffffff, 2.0);
  dl1.position.set(6, 7, 6);
  scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xC8B89A, 1.2);  // warm argile rim
  dl2.position.set(-7, -2, 3);
  scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xBEE6D6, 0.8);
  dl3.position.set(0, -6, 4);
  scene.add(dl3);

  let rotY = 0, floatT = 0;

  function resize() {
    const w = canvas.clientWidth || 800;
    const h = canvas.clientHeight || 600;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  function tick() {
    requestAnimationFrame(tick);
    floatT += 0.007;

    // scroll → rotation direction and speed (reveals nubs ↔ button)
    rotY += 0.003 + scroll.delta * 0.012;
    pad.rotation.y = rotY;
    pad.position.y = 0.2 + Math.sin(floatT * 0.5) * 0.14;

    renderer.render(scene, camera);
  }
  tick();
}
