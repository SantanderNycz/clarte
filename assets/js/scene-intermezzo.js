// ─── OBJECT #2 — INTERMEZZO: ROLO FACIAL DE JADE ─────────
// Jade facial roller modelled on the reference photo:
//   • two green jade barrel-stones (oval/olive), the top one larger;
//   • a jade stone HANDLE with champagne-gold ferrule collars at each end;
//   • thin champagne-gold WIRE yokes — a short stem off each collar that
//     splits into a triangular fork to the two ends of the roller, with a
//     thin axle running through each stone.
// Stone is matte-polished; the slim metal frame keeps a light metallic sheen.
// Rotates on scroll (40% slower than before).
// Canvas position: full-width intermezzo band between philosophy and collections.

import { makeRenderer } from './three-helpers.js';
import { scroll } from './scroll-tracker.js';

export function initIntermezzoScene() {
  const canvas = document.getElementById('canvas-intermezzo');
  if (!canvas) return;

  const renderer = makeRenderer(canvas, 0xE4E0DA, false);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
  camera.position.z = 8;

  const roller = new THREE.Group();
  scene.add(roller);

  // ── materials ──
  const jadeMat = new THREE.MeshPhongMaterial({
    color: 0x9DB177,       // green jade — soft marbled green
    shininess: 16,         // matte-polished stone
    specular: 0x20241a,
    transparent: true,
    opacity: 0.98,
  });
  const metalMat = new THREE.MeshPhongMaterial({
    color: 0xCCC4A6,       // pale champagne gold frame
    shininess: 55,         // slim metal keeps a light sheen
    specular: 0x7a7460,
  });

  const UP = new THREE.Vector3(0, 1, 0);
  const V = (x, y, z) => new THREE.Vector3(x, y, z);

  // helper: a cylinder spanning exactly from p0 to p1 (guarantees connection)
  function connect(p0, p1, radius, mat) {
    const dir = new THREE.Vector3().subVectors(p1, p0);
    const len = dir.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 20), mat);
    m.position.copy(p0).add(p1).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(UP, dir.normalize());
    return m;
  }

  // ── jade stone handle (cabo) ──
  const handleTopY = 1.0, handleBotY = -1.0;
  const handle = new THREE.Mesh(
    new THREE.CylinderGeometry(0.17, 0.17, handleTopY - handleBotY, 40),
    jadeMat
  );
  roller.add(handle);

  // champagne ferrule collars where the wire yokes meet the handle
  [handleTopY, handleBotY].forEach(y => {
    const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.2, 0.26, 36), metalMat);
    collar.position.y = y;
    roller.add(collar);
  });

  // ── helper: one jade roller head + its triangular wire yoke ──
  function buildRollerHead(collarEndY, apexY, rollY, rollR, rollHalf) {
    // short stem off the collar, along the axis, to the fork apex
    roller.add(connect(V(0, collarEndY, 0), V(0, apexY, 0), 0.045, metalMat));

    // jade barrel stone (oval/olive) — a sphere stretched along its axle (X)
    const spin = new THREE.Group();
    const stone = new THREE.Mesh(new THREE.SphereGeometry(rollR, 48, 32), jadeMat);
    stone.scale.set(rollHalf / rollR, 1, 1);   // stretch to an olive shape
    spin.add(stone);
    spin.position.set(0, rollY, 0);
    roller.add(spin);

    // thin axle rod through the stone
    roller.add(connect(V(-rollHalf - 0.03, rollY, 0), V(rollHalf + 0.03, rollY, 0), 0.028, metalMat));

    // two fork arms: apex → each end of the roller (the triangle)
    [-1, 1].forEach(s => {
      roller.add(connect(V(0, apexY, 0), V(s * rollHalf, rollY, 0), 0.036, metalMat));
    });

    return spin;
  }

  // top roller larger than the bottom one (as in the photo)
  const topSpin = buildRollerHead(handleTopY + 0.13, 1.42, 1.95, 0.42, 0.74);
  const botSpin = buildRollerHead(handleBotY - 0.13, -1.42, -1.90, 0.34, 0.56);

  // tilt the whole roller diagonally, as held in the reference photo
  roller.rotation.z = 0.42;
  roller.rotation.x = 0.12;

  // ── lighting — soft; enough for the stone to read + a touch of metal sheen ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dl = new THREE.DirectionalLight(0xFFF8F0, 0.85);
  dl.position.set(5, 7, 6);
  scene.add(dl);
  const dl2 = new THREE.DirectionalLight(0xC8B89A, 0.35);
  dl2.position.set(-6, -4, 2);
  scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xffffff, 0.25);
  dl3.position.set(0, -5, 5);
  scene.add(dl3);

  let rotY = 0, floatT = 0;

  function resize() {
    const w = canvas.clientWidth || 1400;
    const h = canvas.clientHeight || 380;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  function tick() {
    requestAnimationFrame(tick);
    floatT += 0.007;

    // scroll drives rotation — 40% slower scroll response than before
    rotY += 0.005 + scroll.delta * 0.0096;
    roller.rotation.y = rotY;
    // each stone also spins on its own axle
    topSpin.rotation.x = rotY * 1.4;
    botSpin.rotation.x = rotY * 1.1;

    roller.position.y = Math.sin(floatT * 0.5) * 0.1;

    renderer.render(scene, camera);
  }
  tick();
}
