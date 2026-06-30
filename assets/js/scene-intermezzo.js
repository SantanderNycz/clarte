// ─── OBJECT #2 — INTERMEZZO: ROLO FACIAL ─────────────────
// Facial roller: two cylindrical rollers (large + small) connected
// by a thin handle bar with end caps. Rotates on scroll.
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
    opacity: 0.9,
  });
  const metalMat = new THREE.MeshPhongMaterial({
    color: 0xDDA083,   // rosé gold frame
    shininess: 340,
    specular: 0xfff0e6,
  });
  const darkMetalMat = new THREE.MeshPhongMaterial({
    color: 0xC08868,   // deeper rosé gold (pins / end cap)
    shininess: 220,
    specular: 0xffe0cc,
  });

  // ── large roller head ──
  const largeRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.75, 0.75, 1.6, 64), stoneMat);
  largeRoll.rotation.z = Math.PI / 2;
  largeRoll.position.set(0, 0.9, 0);
  roller.add(largeRoll);

  // end caps for large roller
  [-0.82, 0.82].forEach(x => {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.76, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2), stoneMat);
    cap.position.set(x, 0.9, 0);
    cap.rotation.z = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    roller.add(cap);
  });

  // axle pins for large roller
  [-0.88, 0.88].forEach(x => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 0.18, 16), metalMat);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(x, 0.9, 0);
    roller.add(pin);
  });

  // ── handle connecting yoke ──
  // left arm
  const armL = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.1, 16), metalMat);
  armL.position.set(-0.96, 0.35, 0);
  roller.add(armL);
  // right arm
  const armR = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 1.1, 16), metalMat);
  armR.position.set(0.96, 0.35, 0);
  roller.add(armR);

  // ── handle bar ──
  const handle = new THREE.Mesh(new THREE.CylinderGeometry(0.11, 0.11, 2.0, 32), metalMat);
  handle.rotation.z = Math.PI / 2;
  handle.position.set(0, -0.22, 0);
  roller.add(handle);

  // ── small roller head (other end of handle) ──
  const smallRoll = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.9, 48), stoneMat);
  smallRoll.rotation.z = Math.PI / 2;
  smallRoll.position.set(0, -1.2, 0);
  roller.add(smallRoll);

  // end caps small
  [-0.48, 0.48].forEach(x => {
    const cap = new THREE.Mesh(new THREE.SphereGeometry(0.43, 24, 12, 0, Math.PI * 2, 0, Math.PI / 2), stoneMat);
    cap.position.set(x, -1.2, 0);
    cap.rotation.z = x < 0 ? Math.PI / 2 : -Math.PI / 2;
    roller.add(cap);
  });

  // axle pins small
  [-0.5, 0.5].forEach(x => {
    const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.06, 0.14, 12), darkMetalMat);
    pin.rotation.z = Math.PI / 2;
    pin.position.set(x, -1.2, 0);
    roller.add(pin);
  });

  // bottom end cap of handle
  const endCap = new THREE.Mesh(new THREE.SphereGeometry(0.15, 20, 20), darkMetalMat);
  endCap.position.set(0, -1.55, 0);
  roller.add(endCap);

  // tilt the whole roller naturally
  roller.rotation.z = 0.35;
  roller.rotation.x = 0.15;

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

    // scroll drives direction and speed of rotation
    rotY += 0.005 + scroll.delta * 0.016;
    roller.rotation.y = rotY;
    // the rollers themselves spin on their own axis as the whole object rotates
    largeRoll.rotation.x = rotY * 1.4;
    smallRoll.rotation.x = rotY * 1.1;

    roller.position.y = Math.sin(floatT * 0.5) * 0.1;

    renderer.render(scene, camera);
  }
  tick();
}
