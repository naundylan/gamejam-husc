import * as THREE from 'three';

function makeMat(color, opts = {}) {
  return new THREE.MeshStandardMaterial({
    color,
    roughness: opts.roughness ?? 0.55,
    metalness: opts.metalness ?? 0.12,
    emissive: opts.emissive ?? 0x000000,
    emissiveIntensity: opts.emissiveIntensity ?? 1.0,
    transparent: opts.transparent ?? false,
    opacity: opts.opacity ?? 1.0,
  });
}

function addBox(group, w, h, d, mat, x = 0, y = 0, z = 0, rx = 0, ry = 0, rz = 0) {
  const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
  mesh.position.set(x, y, z);
  mesh.rotation.set(rx, ry, rz);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  return mesh;
}

function addEyes(group, x, y, zSpread = 0.22, size = 0.14) {
  const whiteMat = makeMat(0xffffff, { emissive: 0xffffff, emissiveIntensity: 0.2 });
  const pupilMat = makeMat(0x0f172a);
  addBox(group, size, size, size, whiteMat, x, y, zSpread);
  addBox(group, size, size, size, whiteMat, x, y, -zSpread);
  addBox(group, size * 0.5, size * 0.6, size * 0.5, pupilMat, x + size * 0.35, y, zSpread);
  addBox(group, size * 0.5, size * 0.6, size * 0.5, pupilMat, x + size * 0.35, y, -zSpread);
}

// =========================================================
// 6-FORM VOXEL PLAYER MESH
// =========================================================
export function createPlayerMesh() {
  const root = new THREE.Group();
  const forms = {};

  // 1. CÓC (Frog - 1.0 x 1.0, 0x22c55e)
  {
    const g = new THREE.Group();
    const green = makeMat(0x22c55e);
    const belly = makeMat(0xbbf7d0);
    const crown = makeMat(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.35 });
    addBox(g, 0.88, 0.62, 0.84, green, 0, -0.08, 0);
    addBox(g, 0.65, 0.22, 0.72, belly, 0.08, -0.28, 0);
    // Bulging frog eyes
    addBox(g, 0.28, 0.28, 0.26, green, 0.22, 0.32, 0.24);
    addBox(g, 0.28, 0.28, 0.26, green, 0.22, 0.32, -0.24);
    addEyes(g, 0.34, 0.32, 0.24, 0.16);
    // Legs
    addBox(g, 0.36, 0.25, 0.24, green, -0.26, -0.36, 0.36);
    addBox(g, 0.36, 0.25, 0.24, green, -0.26, -0.36, -0.36);
    // Tiny jade crown
    addBox(g, 0.26, 0.14, 0.26, crown, -0.05, 0.30, 0);
    forms[1] = g;
    root.add(g);
  }

  // 2. HỔ (Tiger - 1.6 x 1.3, 0xf97316)
  {
    const g = new THREE.Group();
    const orange = makeMat(0xf97316);
    const stripe = makeMat(0x1e293b);
    const cream = makeMat(0xfef3c7);
    // Body
    addBox(g, 1.15, 0.72, 0.82, orange, -0.1, -0.05, 0);
    addBox(g, 0.16, 0.74, 0.84, stripe, -0.3, -0.04, 0);
    addBox(g, 0.16, 0.74, 0.84, stripe, 0.1, -0.04, 0);
    // Head & snout
    addBox(g, 0.62, 0.60, 0.72, orange, 0.48, 0.22, 0);
    addBox(g, 0.24, 0.24, 0.44, cream, 0.72, 0.08, 0);
    addBox(g, 0.18, 0.18, 0.18, orange, 0.42, 0.56, 0.24);
    addBox(g, 0.18, 0.18, 0.18, orange, 0.42, 0.56, -0.24);
    addEyes(g, 0.74, 0.28, 0.22, 0.15);
    // Legs & tail
    addBox(g, 0.24, 0.45, 0.24, orange, 0.35, -0.44, 0.26);
    addBox(g, 0.24, 0.45, 0.24, orange, 0.35, -0.44, -0.26);
    addBox(g, 0.24, 0.45, 0.24, orange, -0.48, -0.44, 0.26);
    addBox(g, 0.24, 0.45, 0.24, orange, -0.48, -0.44, -0.26);
    addBox(g, 0.55, 0.14, 0.14, orange, -0.82, 0.15, 0, 0, 0, 0.45);
    g.visible = false;
    forms[2] = g;
    root.add(g);
  }

  // 3. GẤU (Bear - 1.8 x 1.8, 0x92400e)
  {
    const g = new THREE.Group();
    const brown = makeMat(0x92400e);
    const darkBrown = makeMat(0x451a03);
    const tan = makeMat(0xd97706);
    // Massive torso
    addBox(g, 1.35, 1.15, 1.15, brown, 0, -0.1, 0);
    addBox(g, 0.9, 0.75, 1.18, tan, 0.18, -0.18, 0);
    // Head
    addBox(g, 0.85, 0.75, 0.88, brown, 0.32, 0.56, 0);
    addBox(g, 0.32, 0.28, 0.48, tan, 0.68, 0.44, 0);
    addBox(g, 0.22, 0.22, 0.2, darkBrown, 0.25, 0.96, 0.32);
    addBox(g, 0.22, 0.22, 0.2, darkBrown, 0.25, 0.96, -0.32);
    addEyes(g, 0.70, 0.64, 0.24, 0.15);
    // Heavy legs & paws
    addBox(g, 0.40, 0.52, 0.38, darkBrown, 0.36, -0.66, 0.36);
    addBox(g, 0.40, 0.52, 0.38, darkBrown, 0.36, -0.66, -0.36);
    addBox(g, 0.40, 0.52, 0.38, darkBrown, -0.38, -0.66, 0.36);
    addBox(g, 0.40, 0.52, 0.38, darkBrown, -0.38, -0.66, -0.36);
    g.visible = false;
    forms[3] = g;
    root.add(g);
  }

  // 4. CÁO (Fox - 1.2 x 1.1, 0xef4444)
  {
    const g = new THREE.Group();
    const red = makeMat(0xef4444);
    const white = makeMat(0xf8fafc);
    // Sleek body
    addBox(g, 0.95, 0.54, 0.62, red, -0.05, -0.1, 0);
    // Head & pointed snout
    addBox(g, 0.52, 0.48, 0.56, red, 0.38, 0.18, 0);
    addBox(g, 0.28, 0.20, 0.30, white, 0.62, 0.08, 0);
    // Big fox ears
    addBox(g, 0.16, 0.28, 0.14, red, 0.30, 0.52, 0.20);
    addBox(g, 0.16, 0.28, 0.14, red, 0.30, 0.52, -0.20);
    addEyes(g, 0.58, 0.24, 0.18, 0.13);
    // Fluffy white-tipped tail
    addBox(g, 0.55, 0.26, 0.26, red, -0.65, 0.08, 0, 0, 0, 0.35);
    addBox(g, 0.24, 0.26, 0.26, white, -0.88, 0.16, 0, 0, 0, 0.35);
    // Legs
    addBox(g, 0.18, 0.38, 0.18, red, 0.25, -0.38, 0.20);
    addBox(g, 0.18, 0.38, 0.18, red, 0.25, -0.38, -0.20);
    addBox(g, 0.18, 0.38, 0.18, red, -0.32, -0.38, 0.20);
    addBox(g, 0.18, 0.38, 0.18, red, -0.32, -0.38, -0.20);
    g.visible = false;
    forms[4] = g;
    root.add(g);
  }

  // 5. ONG (Bee - 0.9 x 0.9, 0xfacc15)
  {
    const g = new THREE.Group();
    const yellow = makeMat(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.2 });
    const black = makeMat(0x0f172a);
    const wingMat = makeMat(0xe0f2fe, { transparent: true, opacity: 0.72, emissive: 0xbae6fd, emissiveIntensity: 0.2 });
    // Striped body
    addBox(g, 0.78, 0.54, 0.58, yellow, 0, 0, 0);
    addBox(g, 0.16, 0.56, 0.60, black, -0.12, 0, 0);
    addBox(g, 0.16, 0.56, 0.60, black, 0.14, 0, 0);
    // Stinger
    addBox(g, 0.24, 0.12, 0.12, black, -0.48, -0.04, 0);
    addEyes(g, 0.36, 0.10, 0.18, 0.14);
    // Wings (tagged for flutter animation)
    const wingL = addBox(g, 0.36, 0.08, 0.52, wingMat, -0.05, 0.34, 0.36, 0.25, 0, 0);
    const wingR = addBox(g, 0.36, 0.08, 0.52, wingMat, -0.05, 0.34, -0.36, -0.25, 0, 0);
    g.userData.wings = [wingL, wingR];
    g.visible = false;
    forms[5] = g;
    root.add(g);
  }

  root.userData.forms = forms;
  return root;
}

// =========================================================
// ENEMY MESHES (Minion, Elite, DarkCloud)
// =========================================================
export function createEnemyMesh(type) {
  const g = new THREE.Group();
  const flashMaterials = [];

  if (type === 'minion') {
    const armor = makeMat(0x64748b);
    const helm = makeMat(0x94a3b8);
    const spear = makeMat(0x38bdf8, { emissive: 0x0284c7, emissiveIntensity: 0.4 });
    flashMaterials.push(armor, helm);
    addBox(g, 0.85, 0.90, 0.72, armor, 0, -0.1, 0);
    addBox(g, 0.65, 0.52, 0.65, helm, 0, 0.48, 0);
    addBox(g, 0.20, 0.24, 0.20, spear, 0, 0.82, 0);
    addBox(g, 0.75, 0.12, 0.12, spear, 0.45, 0.0, 0.42);
    addEyes(g, 0.32, 0.48, 0.18, 0.12);
  } else if (type === 'elite') {
    const stone = makeMat(0x475569);
    const core = makeMat(0xf43f5e, { emissive: 0xe11d48, emissiveIntensity: 0.5 });
    flashMaterials.push(stone, core);
    addBox(g, 1.30, 1.25, 1.00, stone, 0, -0.15, 0);
    addBox(g, 0.88, 0.62, 0.82, stone, 0, 0.64, 0);
    addBox(g, 0.48, 0.42, 1.05, core, 0, 0.05, 0);
    addBox(g, 0.36, 0.50, 0.36, stone, 0.66, 0.25, 0.48);
    addBox(g, 0.36, 0.50, 0.36, stone, 0.66, 0.25, -0.48);
    addEyes(g, 0.44, 0.66, 0.22, 0.15);
  } else if (type === 'darkcloud') {
    const cloud = makeMat(0x334155);
    const storm = makeMat(0x1e293b);
    const spark = makeMat(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.8 });
    flashMaterials.push(cloud, storm);
    addBox(g, 1.90, 0.75, 1.00, cloud, 0, 0, 0);
    addBox(g, 1.20, 0.55, 0.90, storm, -0.25, 0.45, 0);
    addBox(g, 0.95, 0.50, 0.85, cloud, 0.42, 0.36, 0);
    addBox(g, 0.28, 0.45, 0.28, spark, 0, -0.48, 0);
  }

  g.userData.flashMaterials = flashMaterials;
  return g;
}

// =========================================================
// BOSS ÔNG TRỜI (4.5 x 5.5 on Ngai Mây Đen)
// =========================================================
export function createBossMesh() {
  const g = new THREE.Group();
  const flashMaterials = [];

  const cloudThrone = makeMat(0x1e293b);
  const robe = makeMat(0x7c3aed, { emissive: 0x4c1d95, emissiveIntensity: 0.3 });
  const gold = makeMat(0xfacc15, { emissive: 0xca8a04, emissiveIntensity: 0.4 });
  const skin = makeMat(0xfde68a);
  const beard = makeMat(0xf8fafc);
  const armorMat = makeMat(0x38bdf8, {
    transparent: true,
    opacity: 0.42,
    emissive: 0x0284c7,
    emissiveIntensity: 0.6,
  });

  flashMaterials.push(robe, gold, skin);

  // Dark Cloud Throne
  addBox(g, 4.4, 1.1, 2.2, cloudThrone, 0, -2.0, 0);
  addBox(g, 3.2, 0.9, 1.8, cloudThrone, 0, -1.2, -0.4);

  // Robed Torso
  addBox(g, 2.3, 2.4, 1.6, robe, 0, 0.2, 0);
  addBox(g, 2.5, 0.45, 1.7, gold, 0, -0.6, 0);

  // Head & Jade Emperor Crown
  addBox(g, 1.4, 1.35, 1.3, skin, 0, 1.75, 0);
  addBox(g, 1.7, 0.38, 1.5, gold, 0, 2.50, 0);
  addBox(g, 0.45, 0.55, 0.45, gold, 0, 2.85, 0);
  // White beard
  addBox(g, 0.9, 1.1, 0.35, beard, 0, 0.95, 0.65);

  // Glowing eyes facing -Z/camera + left/right
  const eyeMat = makeMat(0xfef08a, { emissive: 0xfacc15, emissiveIntensity: 1.0 });
  addBox(g, 0.24, 0.18, 0.15, eyeMat, -0.34, 1.85, 0.68);
  addBox(g, 0.24, 0.18, 0.15, eyeMat, 0.34, 1.85, 0.68);

  // Thunder Drum (Trống Sấm) on back
  const drum = addBox(g, 3.4, 3.4, 0.35, gold, 0, 0.8, -1.1);
  // Armor aura shell
  const armorShell = new THREE.Mesh(new THREE.BoxGeometry(4.2, 4.8, 2.6), armorMat);
  armorShell.position.set(0, 0.2, 0);
  g.add(armorShell);

  g.userData.flashMaterials = flashMaterials;
  g.userData.armorShell = armorShell;
  g.userData.drum = drum;
  return g;
}

// =========================================================
// LONG THẦN VOXEL 3D (15 segments + 2 orbiting PointLights)
// =========================================================
export function createDragonMesh() {
  const g = new THREE.Group();
  const segGeo = new THREE.BoxGeometry(0.9, 0.9, 0.9);
  const bodyMat = makeMat(0xfacc15, { emissive: 0xfacc15, emissiveIntensity: 0.75 });
  const headMat = makeMat(0xfef08a, { emissive: 0xfacc15, emissiveIntensity: 0.95 });
  const hornMat = makeMat(0xef4444, { emissive: 0xdc2626, emissiveIntensity: 0.5 });

  const segments = [];
  for (let i = 0; i < 15; i++) {
    const seg = new THREE.Mesh(segGeo, i === 0 ? headMat : bodyMat);
    const scale = i === 0 ? 1.35 : Math.max(0.45, 1.05 - i * 0.04);
    seg.scale.setScalar(scale);
    seg.castShadow = true;
    if (i === 0) {
      // Horns & whiskers
      addBox(seg, 0.22, 0.6, 0.22, hornMat, -0.25, 0.7, 0.32, 0, 0, 0.3);
      addBox(seg, 0.22, 0.6, 0.22, hornMat, -0.25, 0.7, -0.32, 0, 0, 0.3);
    }
    g.add(seg);
    segments.push(seg);
  }

  const light1 = new THREE.PointLight(0xfacc15, 2.5, 12.0);
  const light2 = new THREE.PointLight(0xfacc15, 2.5, 12.0);
  g.add(light1, light2);

  g.userData.segments = segments;
  g.userData.lights = [light1, light2];
  return g;
}

// =========================================================
// WORLD OBJECTS: CAGE, ROCK, SPIKE, PLATFORM
// =========================================================
export function createCageMesh(colorHex) {
  const g = new THREE.Group();
  const barMat = makeMat(0x94a3b8, { metalness: 0.6, roughness: 0.3 });
  const spiritMat = makeMat(colorHex, { emissive: colorHex, emissiveIntensity: 0.85 });

  // Outer cage frame (2.0 x 2.2)
  addBox(g, 2.0, 0.18, 1.6, barMat, 0, -1.0, 0);
  addBox(g, 2.0, 0.18, 1.6, barMat, 0, 1.0, 0);
  for (const bx of [-0.9, -0.3, 0.3, 0.9]) {
    addBox(g, 0.12, 2.0, 0.12, barMat, bx, 0, 0.7);
    addBox(g, 0.12, 2.0, 0.12, barMat, bx, 0, -0.7);
  }
  // Glowing trapped spirit core
  const core = addBox(g, 0.85, 0.85, 0.85, spiritMat, 0, 0, 0);
  g.userData.core = core;
  g.userData.flashMaterials = [barMat];
  return g;
}

export function createRockMesh(w, h) {
  const g = new THREE.Group();
  const rockMat = makeMat(0x78350f, { roughness: 0.85 });
  const crackMat = makeMat(0xf59e0b, { emissive: 0xd97706, emissiveIntensity: 0.35 });
  addBox(g, w, h, 1.8, rockMat, 0, 0, 0);
  addBox(g, w * 0.4, h * 0.25, 1.86, crackMat, 0, 0.15, 0);
  g.userData.flashMaterials = [rockMat];
  return g;
}

export function createSpikeMesh(w) {
  const g = new THREE.Group();
  const baseMat = makeMat(0x334155);
  const spikeMat = makeMat(0xef4444, { emissive: 0xb91c1c, emissiveIntensity: 0.4 });
  addBox(g, w, 0.22, 1.4, baseMat, 0, -0.25, 0);
  const count = Math.max(2, Math.floor(w / 0.65));
  const step = w / count;
  const coneGeo = new THREE.ConeGeometry(0.22, 0.65, 4);
  for (let i = 0; i < count; i++) {
    const spike = new THREE.Mesh(coneGeo, spikeMat);
    spike.position.set(-w * 0.5 + step * (i + 0.5), 0.15, 0);
    spike.castShadow = true;
    g.add(spike);
  }
  return g;
}

export function createSpikeGateMesh(w, gapBottomY = 0, gapTopY = 2.2) {
  const g = new THREE.Group();
  const pillarMat = makeMat(0x1e293b, { roughness: 0.75, metalness: 0.25 });
  const rimMat = makeMat(0xef4444, { emissive: 0xdc2626, emissiveIntensity: 0.55 });
  const spikeMat = makeMat(0xef4444, { emissive: 0xb91c1c, emissiveIntensity: 0.45 });

  // Upper solid pillar (blocks flying over)
  const topH = 14.0;
  addBox(g, w, topH, 2.2, pillarMat, 0, gapTopY + topH * 0.5, 0);
  addBox(g, w + 0.12, 0.24, 2.3, rimMat, 0, gapTopY + 0.12, 0);

  // Lower solid pillar (blocks flying under)
  const botH = 8.0;
  addBox(g, w, botH, 2.2, pillarMat, 0, gapBottomY - botH * 0.5, 0);
  addBox(g, w + 0.12, 0.24, 2.3, rimMat, 0, gapBottomY - 0.12, 0);

  // Spikes inside the small gap (floor & ceiling of gap)
  const count = Math.max(3, Math.floor(w / 0.65));
  const step = w / count;
  const coneGeo = new THREE.ConeGeometry(0.20, 0.62, 4);
  for (let i = 0; i < count; i++) {
    const sx = -w * 0.5 + step * (i + 0.5);
    const sBot = new THREE.Mesh(coneGeo, spikeMat);
    sBot.position.set(sx, gapBottomY + 0.30, 0);
    g.add(sBot);

    const sTop = new THREE.Mesh(coneGeo, spikeMat);
    sTop.rotation.z = Math.PI;
    sTop.position.set(sx, gapTopY - 0.30, 0);
    g.add(sTop);
  }
  return g;
}

export function createPlatformMesh(w, h, colorHex = 0x334155, topColorHex = 0x475569) {
  const g = new THREE.Group();
  const bodyMat = makeMat(colorHex, { roughness: 0.8 });
  const topMat = makeMat(topColorHex, { roughness: 0.6 });
  addBox(g, w, h, 2.8, bodyMat, 0, 0, 0);
  addBox(g, w + 0.08, 0.24, 2.9, topMat, 0, h * 0.5 - 0.1, 0);
  return g;
}

// =========================================================
// PARALLAX 3 LAYERS (z = -4, z = -8, z = -14)
// =========================================================
export function createParallaxLayers() {
  const layer1 = new THREE.Group(); // z = -4: Trees / stone pillars / cloud temples
  layer1.position.z = -4;
  const layer2 = new THREE.Group(); // z = -8: Mountains / waterfalls
  layer2.position.z = -8;
  const layer3 = new THREE.Group(); // z = -14: Storm clouds / Heavenly sky
  layer3.position.z = -14;

  const pillarMat = makeMat(0x1e293b, { roughness: 0.9 });
  const treeMat = makeMat(0x14532d, { roughness: 0.85 });
  const mountainMat = makeMat(0x0f172a, { roughness: 0.95 });
  const cloudMat = makeMat(0x334155, { transparent: true, opacity: 0.65 });

  for (let x = -40; x <= 420; x += 10) {
    // Layer 1 props
    const h1 = 4 + ((Math.abs(x * 13) % 5) * 1.2);
    addBox(layer1, 1.1, h1, 1.1, pillarMat, x, h1 * 0.5 - 3.5, 0);
    if (x % 20 === 0) {
      addBox(layer1, 2.6, 2.0, 1.4, treeMat, x, h1 - 2.6, 0);
    }
  }

  for (let x = -50; x <= 420; x += 18) {
    // Layer 2 mountains
    const mh = 9 + (Math.abs(x * 7) % 7);
    const mw = 10 + (Math.abs(x * 3) % 5);
    addBox(layer2, mw, mh, 2.5, mountainMat, x, mh * 0.5 - 5.5, 0);
  }

  for (let x = -60; x <= 420; x += 16) {
    // Layer 3 storm clouds
    const cy = 6.5 + (Math.abs(x * 5) % 4);
    addBox(layer3, 9.5, 2.2, 2.0, cloudMat, x, cy, 0);
  }

  return { layer1, layer2, layer3 };
}

// =========================================================
// 7-BAND RAINBOW FOR VICTORY
// =========================================================
export function createRainbowGroup() {
  const g = new THREE.Group();
  const colors = [0xef4444, 0xf97316, 0xfacc15, 0x22c55e, 0x06b6d4, 0x3b82f6, 0xa855f7];
  colors.forEach((hex, idx) => {
    const geo = new THREE.TorusGeometry(10.5 - idx * 0.45, 0.22, 8, 48, Math.PI);
    const mat = makeMat(hex, { emissive: hex, emissiveIntensity: 0.65, transparent: true, opacity: 0.85 });
    const arc = new THREE.Mesh(geo, mat);
    g.add(arc);
  });
  g.position.set(0, -1.5, -7.0);
  g.visible = false;
  return g;
}
