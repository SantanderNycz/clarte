// ─── OBJECT #2 — INTERMEZZO: ROLO FACIAL DE QUARTZO ──────
// Facial roller: a central rosé-gold handle (cabo) with a Y-fork at each
// end whose two prongs connect the handle tip to the axle of a rose-quartz
// roller — large at top, small at bottom. The prongs physically span from
// the handle end to each roller end, so nothing reads as loose.
// Matte finish (low specular) — no plastic glare. Rotates on scroll.
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

  // ── matte materials (specular near black — no shine) ──
  const stoneMat = new THREE.MeshPhongMaterial({
    color: 0xF0CCC6,   // rose quartz — soft pink
    shininess: 4,
    specular: 0x0d0d0d,   // matte — specular near black, no glare
    transparent: true,
    opacity: 0.96,
  });
  const metalMat = new THREE.MeshPhongMaterial({
    color: 0xDDA083,   // rosé gold frame / handle, matte
    shininess: 4,
    specular: 0x0d0d0d,
  });
  const darkMetalMat = new THREE.MeshPhongMaterial({
    color: 0xC08868,   // deeper rosé gold (pins / end cap)
    shininess: 4,
    specular: 0x0b0b0b,
  });

  const UP = new THREE.Vector3(0, 1, 0);

  // helper: a cylinder spanning exactly from p0 to p1 (guarantees connection)
  function connect(p0, p1, radius, mat) {
    const dir = new THREE.Vector3().subVectors(p1, p0);
    const len = dir.length();
    const m = new THREE.Mesh(new THREE.CylinderGeometry(radius, radius, len, 20), mat);
    m.position.copy(p0).add(p1).multiplyScalar(0.5);
    m.quaternion.setFromUnitVectors(UP, dir.normalize());
    return m;
  }

  // ── central handle (cabo) — vertical, reaching toward both rollers ──
  const handleTopY = 1.12, handleBotY = -1.12;
  roller.add(connect(
    new THREE.Vector3(0, handleBotY, 0),
    new THREE.Vector3(0, handleTopY, 0),
    0.12, metalMat
  ));

  // ferrule rings where the forks meet the handle
  [handleTopY - 0.08, handleBotY + 0.08].forEach(y => {
    const ring = new THREE.Mesh(new THREE.CylinderGeometry(0.16, 0.16, 0.16, 32), metalMat);
    ring.position.y = y;
    roller.add(ring);
  });

  // ── helper: build one roller head (barrel + caps spin; pins + prongs static) ──
  function buildRollerHead(handleEndY, rollY, rollRadius, rollLen, prongRadius) {
    // spinning group: barrel + rounded end caps
    const spin = new THREE.Group();
    const barrel = new THREE.Mesh(
      new THREE.CylinderGeometry(rollRadius, rollRadius, rollLen, 64),
      stoneMat
    );
    barrel.rotation.z = Math.PI / 2;   // lie along X
    spin.add(barrel);
    [-1, 1].forEach(s => {
      const cap = new THREE.Mesh(
        new THREE.SphereGeometry(rollRadius * 1.02, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2),
        stoneMat
      );
      cap.position.x = s * (rollLen / 2);
      cap.rotation.z = s < 0 ? Math.PI / 2 : -Math.PI / 2;
      spin.add(cap);
    });
    spin.position.set(0, rollY, 0);
    roller.add(spin);

    // static axle pins just beyond each roller end
    [-1, 1].forEach(s => {
      const pin = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 0.18, 16), darkMetalMat);
      pin.rotation.z = Math.PI / 2;
      pin.position.set(s * (rollLen / 2 + 0.09), rollY, 0);
      roller.add(pin);
    });

    // fork prongs: handle tip → each roller axle end (these close the gap)
    [-1, 1].forEach(s => {
      roller.add(connect(
        new THREE.Vector3(0, handleEndY, 0),
        new THREE.Vector3(s * (rollLen / 2), rollY, 0),
        prongRadius, metalMat
      ));
    });

    return spin;
  }

  // top = large roller, bottom = small roller — both forks tied to the handle
  const topSpin = buildRollerHead(handleTopY, 1.55, 0.62, 1.25, 0.06);
  const botSpin = buildRollerHead(handleBotY, -1.55, 0.40, 0.80, 0.055);

  // tilt the whole roller diagonally, as held in the reference photo
  roller.rotation.z = 0.42;
  roller.rotation.x = 0.12;

  // ── lighting — softened so the matte finish doesn't glare ──
  scene.add(new THREE.AmbientLight(0xffffff, 0.7));
  const dl = new THREE.DirectionalLight(0xFFF8F0, 0.7);
  dl.position.set(5, 7, 6);
  scene.add(dl);
  const dl2 = new THREE.DirectionalLight(0xC8B89A, 0.3);
  dl2.position.set(-6, -4, 2);
  scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xffffff, 0.2);
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
    topSpin.rotation.x = rotY * 1.4;
    botSpin.rotation.x = rotY * 1.1;

    roller.position.y = Math.sin(floatT * 0.5) * 0.1;

    renderer.render(scene, camera);
  }
  tick();
}
