// ─── OBJECT #1 — HERO: FRASCO DE SÉRUM (conta-gotas) ─────
// Amber glass serum bottle with a black dropper cap + rubber bulb,
// a thin glass pipette descending into the amber liquid, and bubbles.
// Translucent amber glass. Scroll → rotation direction & speed.
// Canvas position: hero section — shifted left so more of it is visible.

import { makeRenderer } from './three-helpers.js';
import { scroll, updateScrollVelocity } from './scroll-tracker.js';

export function initHeroScene() {
  const canvas = document.getElementById('canvas-hero');
  if (!canvas) return;

  const renderer = makeRenderer(canvas);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
  camera.position.z = 9;

  const bottle = new THREE.Group();
  scene.add(bottle);

  // ── materials ──
  // amber glass body — translucent warm brown like the reference photo
  const amberGlass = new THREE.MeshPhongMaterial({
    color: 0x8A4A1E,
    transparent: true,
    opacity: 0.5,
    shininess: 420,
    specular: 0xffffff,
    side: THREE.DoubleSide,
  });
  // amber serum liquid inside
  const liquidMat = new THREE.MeshPhongMaterial({
    color: 0xC2742E,
    transparent: true,
    opacity: 0.6,
    shininess: 120,
    specular: 0xffe6c0,
  });
  // black plastic / rubber for cap, collar, bulb, stem top
  const blackMat = new THREE.MeshPhongMaterial({
    color: 0x181613,
    shininess: 90,
    specular: 0x555555,
  });
  const blackShiny = new THREE.MeshPhongMaterial({
    color: 0x222019,
    shininess: 180,
    specular: 0x888888,
  });
  // thin glass pipette tube inside the bottle
  const pipetteMat = new THREE.MeshPhongMaterial({
    color: 0xD9C9B0,
    transparent: true,
    opacity: 0.35,
    shininess: 300,
    specular: 0xffffff,
  });

  // ── body (main cylinder) ──
  const body = new THREE.Mesh(new THREE.CylinderGeometry(0.72, 0.72, 3.2, 64), amberGlass);
  bottle.add(body);

  // ── amber liquid inside (slightly inset, shorter) ──
  const liquid = new THREE.Mesh(new THREE.CylinderGeometry(0.64, 0.64, 2.6, 48), liquidMat);
  liquid.position.y = -0.2;
  bottle.add(liquid);

  // ── rounded base ──
  const base = new THREE.Mesh(new THREE.SphereGeometry(0.72, 48, 24, 0, Math.PI * 2, Math.PI / 2, Math.PI / 2), amberGlass);
  base.position.y = -1.6;
  bottle.add(base);

  // ── shoulder taper ──
  const shoulder = new THREE.Mesh(new THREE.CylinderGeometry(0.34, 0.72, 0.5, 64), amberGlass);
  shoulder.position.y = 1.85;
  bottle.add(shoulder);

  // ── short glass neck ──
  const neck = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.32, 0.4, 48), amberGlass);
  neck.position.y = 2.25;
  bottle.add(neck);

  // ── black screw collar (ribbed cap base) ──
  const collar = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.62, 48), blackShiny);
  collar.position.y = 2.7;
  bottle.add(collar);

  // ── black rubber bulb (squeeze top) ──
  const bulbStem = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.26, 0.4, 32), blackMat);
  bulbStem.position.y = 3.12;
  bottle.add(bulbStem);

  const bulb = new THREE.Mesh(new THREE.SphereGeometry(0.32, 32, 32), blackMat);
  bulb.scale.set(1, 1.25, 1);
  bulb.position.y = 3.66;
  bottle.add(bulb);

  // ── glass pipette tube descending into the liquid ──
  const pipette = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.045, 3.2, 24), pipetteMat);
  pipette.position.y = 0.6;
  bottle.add(pipette);

  // pipette tip
  const pipetteTip = new THREE.Mesh(new THREE.CylinderGeometry(0.045, 0.015, 0.2, 16), pipetteMat);
  pipetteTip.position.y = -1.0;
  bottle.add(pipetteTip);

  // ── label placeholder (thin flat panel on body) ──
  const label = new THREE.Mesh(
    new THREE.BoxGeometry(1.25, 1.4, 0.04),
    new THREE.MeshPhongMaterial({ color: 0xF0EBE3, transparent: true, opacity: 0.5 })
  );
  label.position.set(0, -0.3, 0.73);
  bottle.add(label);

  // ── bubbles inside the liquid ──
  const bubbles = [];
  for (let i = 0; i < 10; i++) {
    const r = 0.03 + Math.random() * 0.05;
    const b = new THREE.Mesh(
      new THREE.SphereGeometry(r, 12, 12),
      new THREE.MeshPhongMaterial({ color: 0xFFF1D8, transparent: true, opacity: 0.5, shininess: 200 })
    );
    const ang = Math.random() * Math.PI * 2;
    const rad = Math.random() * 0.5;
    b.position.set(Math.cos(ang) * rad, -1.3 + Math.random() * 2.4, Math.sin(ang) * rad);
    bottle.add(b);
    bubbles.push({ mesh: b, speed: 0.002 + Math.random() * 0.004 });
  }

  // position & tilt whole bottle — moved left (x smaller) so more is visible
  bottle.position.set(0.5, -0.5, 0);
  bottle.rotation.z = -0.12;

  // ── ambient droplets floating nearby ──
  const drops = [];
  [[-2.6, 1.2, 0.5], [2.4, 2.0, -0.3], [-2.0, -2.2, 0.2], [2.8, -1.0, 0.4]].forEach(([x, y, z]) => {
    const d = new THREE.Mesh(
      new THREE.SphereGeometry(0.13, 20, 20),
      new THREE.MeshPhongMaterial({ color: 0xC8B89A, transparent: true, opacity: 0.55, shininess: 200 })
    );
    d.position.set(x, y, z);
    scene.add(d);
    drops.push({ mesh: d, oy: y, phase: Math.random() * Math.PI * 2 });
  });

  scene.add(new THREE.AmbientLight(0xffffff, 0.55));
  const dl1 = new THREE.DirectionalLight(0xFFFBF0, 1.8);
  dl1.position.set(5, 8, 6);
  scene.add(dl1);
  const dl2 = new THREE.DirectionalLight(0xC8B89A, 0.6);
  dl2.position.set(-7, -3, 3);
  scene.add(dl2);
  const dl3 = new THREE.DirectionalLight(0xffffff, 0.4);
  dl3.position.set(0, -6, 5);
  scene.add(dl3);

  let rotY = 0, floatT = 0;

  function resize() {
    const w = canvas.clientWidth || 800;
    const h = canvas.clientHeight || 900;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  function tick() {
    requestAnimationFrame(tick);
    updateScrollVelocity();
    floatT += 0.008;

    rotY += 0.004 + scroll.delta * 0.014;
    bottle.rotation.y = rotY;
    bottle.position.y = -0.5 + Math.sin(floatT * 0.55) * 0.18;

    // bubbles drift upward and recycle
    bubbles.forEach(b => {
      b.mesh.position.y += b.speed;
      if (b.mesh.position.y > 1.1) b.mesh.position.y = -1.3;
    });

    drops.forEach(d => {
      d.mesh.position.y = d.oy + Math.sin(floatT * 0.6 + d.phase) * 0.14;
      d.mesh.rotation.y += 0.008;
    });

    renderer.render(scene, camera);
  }
  tick();
}
