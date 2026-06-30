// ─── OBJECT #2 — INTERMEZZO: ROLO FACIAL DE QUARTZO ──────
// Facial roller: a long central rosé-gold handle (cabo) with a fork at
// each end holding a rose-quartz roller — large at top, small at bottom.
// The whole tool is tilted diagonally. Rotates on scroll.
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

  const stoneMat = new THREE.MeshPhongMaterial({
    color: 0xF0CCC6,   // rose quartz — soft translucent pink
    shininess: 260,
    specular: 0xffffff,
    transparent: true,
    opacity: 0.92,
  });
  const metalMat = new THREE.MeshPhongMaterial({
    color: 0xDDA083,   // rosé gold frame / handle
    shininess: 340,
    specular: 0xfff0e6,
  });
  const darkMetalMat = new THREE.MeshPhongMaterial({
    color: 0xC08868,   // deeper rosé gold (pins / end cap)
    shininess: 220,
    specular: 0xffe0cc,
  });

  // ── central handle (the long shaft / cabo) — vertical ──
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.12, 1.7, 32), metalMat);
  roller.add(handle);

  // ferrule rings near each end of the handle
  const ferruleTop = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.16, 32), metalMat);
  ferruleTop.position.y = 0.78;
  roller.add(ferruleTop);
  const ferruleBot = new THREE.Mesh(new THREE.CylinderGeometry(0.15, 0.15, 0.16, 32), metalMat);
  ferruleBot.position.y = -0.78;
  roller.add(ferruleBot);

  // ── helper: build a fork + roller assembly at a given height ──
  function buildRollerHead(y, rollRadius, rollLen, armSpread, armLen) {
    const head = new THREE.Group();

    // rose-quartz barrel roller (axis horizontal → along X)
    const roll = new THREE.Mesh(
      new THREE.CylinderGeometry(rollRadius, rollRadius, rollLen, 64),
      stoneMat
    );
    roll.rotation.z = Math.PI / 2;
    head.add(roll);

    // rounded end caps
    [-1, 1].forEach(s => {
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(rollRadius * 1.02, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        stoneMat
      );
      cap.position.x = s * (rollLen / 2);
      cap.rotation.z = s < 0 ? Math.PI / 2 : -Math.PI / 2;
      head.add(cap);
    });

    // axle pins
    [-1, 1].forEach(s => {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.2, 16), darkMetalMat);
      pin.rotation.z = Math.PI / 2;
      pin.position.x = s * (rollLen / 2 + 0.12);
      head.add(pin);
    });

    // fork arms splaying from the handle up/down to each axle
    [-1, 1].forEach(s => {
      const arm = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, armLen, 16), metalMat);
      arm.position.set(s * armSpread * 0.5, -Math.sign(y) * armLen * 0.42, 0);
      arm.rotation.z = s * Math.sign(y) * 0.62;   // splay outward toward the roller
      head.add(arm);
    });

    head.position.y = y;
    return { group: head, roll };
  }

  // top = large roller, bottom = small roller
  const top = buildRollerHead(1.5, 0.62, 1.3, 1.3, 0.85);
  const bottom = buildRollerHead(-1.5, 0.4, 0.85, 0.85, 0.8);
  roller.add(top.group);
  roller.add(bottom.group);

  // tilt the whole roller diagonally, as held in the reference photo
  roller.rotation.z = 0.42;
  roller.rotation.x = 0.12;

  scene.add(new THREE.AmbientLight(0xffffff, 0.6));
  const dl = new THREE.DirectionalLight(0xFFF8F0, 2.0);
  dl.position.set(5, 7, 6);
  scene.add(dl);
  const dl2 = new THREE.DirectionalLight(0xC8B89A, 0.5);
  dl2.position.set(-6, -4, 2);
  scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xffffff, 0.3);
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

    // scroll drives direction and speed of the whole-tool rotation
    rotY += 0.005 + scroll.delta * 0.016;
    roller.rotation.y = rotY;
    // each roller barrel also spins on its own axis
    top.roll.rotation.x = rotY * 1.4;
    bottom.roll.rotation.x = rotY * 1.1;

    roller.position.y = Math.sin(floatT * 0.5) * 0.1;

    renderer.render(scene, camera);
  }
  tick();
}
