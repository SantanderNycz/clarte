// ─── OBJECT #3 — EDITORIAL: ESPONJA/ESCOVA DE SILICONE ───
// Silicone facial cleansing brush: teardrop/egg-shaped mint body whose
// front face is densely packed with soft silicone bristles. Each bristle
// fans outward along the body's surface normal (longer at the centre,
// shorter at the rim) with a rounded tip — giving real relief/texture so
// the object reads as a brush, not a flat silhouette. The smooth back
// carries a circular power button.
// Matte silicone shading + soft, dimmed lighting (~35% less glow than the
// earlier pass) so it stays opaque rather than shiny. Rotates on scroll.

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

  // ── matte silicone materials (specular pushed near black for an opaque look) ──
  const bodyMat = new THREE.MeshPhongMaterial({
    color: 0x9CD9C4,
    emissive: 0x0c1d17,
    shininess: 4,
    specular: 0x0d0d0d,
  });
  const bristleMat = new THREE.MeshPhongMaterial({
    color: 0xB6E6D4,
    shininess: 3,
    specular: 0x0b0b0b,
  });
  const tipMat = new THREE.MeshPhongMaterial({
    color: 0xCDEFE2,
    shininess: 5,
    specular: 0x101010,
  });
  const buttonMat = new THREE.MeshPhongMaterial({
    color: 0x82CBB2,
    shininess: 12,
    specular: 0x1c1c1c,
  });
  const iconMat = new THREE.MeshPhongMaterial({ color: 0x4E9580, shininess: 4 });

  // ── egg / teardrop body (flattened ellipsoid) ──
  const R = 1.15, sx = 0.92, sy = 1.28, sz = 0.55;
  const body = new THREE.Mesh(new THREE.SphereGeometry(R, 64, 48), bodyMat);
  body.scale.set(sx, sy, sz);
  pad.add(body);

  const a = R * sx, b = R * sy, c = R * sz;  // ellipsoid semi-axes

  // ── collect bristle placements across the front (+Z) face ──
  const up = new THREE.Vector3(0, 1, 0);
  const place = [];
  const cols = 26, rows = 32;
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      const x = ((i / (cols - 1)) - 0.5) * 2 * a * 1.03;
      const y = ((j / (rows - 1)) - 0.5) * 2 * b * 1.03;
      const t = (x * x) / (a * a) + (y * y) / (b * b);
      if (t > 0.94) continue;                              // stay inside the egg
      const z = c * Math.sqrt(Math.max(0, 1 - t));
      // outward surface normal of the ellipsoid at this point
      const n = new THREE.Vector3(x / (a * a), y / (b * b), z / (c * c)).normalize();
      const len = 0.22 - t * 0.09 + Math.random() * 0.03;  // short, subtle bristles
      place.push({ x, y, z, n, len });
    }
  }
  const N = place.length;

  // ── bristles as InstancedMesh (efficient — 2 draw calls for ~hundreds) ──
  // tapered cylinder, unit height (1), centred → scaled per instance
  const bristleGeo = new THREE.CylinderGeometry(0.013, 0.022, 1, 7);
  const bristles = new THREE.InstancedMesh(bristleGeo, bristleMat, N);
  // rounded silicone tip
  const tipGeo = new THREE.SphereGeometry(0.019, 8, 6);
  const tips = new THREE.InstancedMesh(tipGeo, tipMat, N);

  const dummy = new THREE.Object3D();
  const q = new THREE.Quaternion();
  for (let k = 0; k < N; k++) {
    const p = place[k];
    q.setFromUnitVectors(up, p.n);             // align cylinder +Y with the normal

    // bristle body: centre sits at surface + normal * (len / 2)
    dummy.position.set(
      p.x + p.n.x * p.len * 0.5,
      p.y + p.n.y * p.len * 0.5,
      p.z + p.n.z * p.len * 0.5
    );
    dummy.quaternion.copy(q);
    dummy.scale.set(1, p.len, 1);
    dummy.updateMatrix();
    bristles.setMatrixAt(k, dummy.matrix);

    // rounded tip: at surface + normal * len
    dummy.position.set(
      p.x + p.n.x * p.len,
      p.y + p.n.y * p.len,
      p.z + p.n.z * p.len
    );
    dummy.quaternion.identity();
    dummy.scale.set(1, 1, 1);
    dummy.updateMatrix();
    tips.setMatrixAt(k, dummy.matrix);
  }
  bristles.instanceMatrix.needsUpdate = true;
  tips.instanceMatrix.needsUpdate = true;
  pad.add(bristles);
  pad.add(tips);

  // ── power button on the smooth back face ──
  const button = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.07, 32), buttonMat);
  button.rotation.x = Math.PI / 2;
  button.position.set(0, -0.55, -(c - 0.01));
  pad.add(button);

  // power icon (ring + bar) raised slightly proud of the button
  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.085, 0.018, 12, 32, Math.PI * 1.6), iconMat);
  ring.rotation.x = Math.PI / 2;
  ring.rotation.z = Math.PI / 2;
  ring.position.set(0, -0.55, -(c + 0.03));
  pad.add(ring);
  const bar = new THREE.Mesh(new THREE.CylinderGeometry(0.016, 0.016, 0.09, 8), iconMat);
  bar.position.set(0, -0.5, -(c + 0.03));
  pad.add(bar);

  // tilt so the bristle face is angled toward the camera; nudge to panel side
  pad.rotation.z = 0.15;
  pad.rotation.x = -0.08;
  pad.position.set(0.7, 0.2, 0);

  // ── lighting — soft + dimmed ~35% from the earlier pass (opaque, not shiny) ──
  scene.add(new THREE.AmbientLight(0xC8EFE3, 0.62));
  const dl1 = new THREE.DirectionalLight(0xffffff, 0.55);
  dl1.position.set(4, 6, 7);
  scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xC8B89A, 0.29);   // gentle warm rim
  dl2.position.set(-7, -1, 3);
  scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xBEE6D6, 0.2);
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

    // scroll → rotation direction and speed (reveals bristle face ↔ button)
    rotY += 0.003 + scroll.delta * 0.012;
    pad.rotation.y = rotY;
    pad.position.y = 0.2 + Math.sin(floatT * 0.5) * 0.14;

    renderer.render(scene, camera);
  }
  tick();
}
