import * as THREE from 'three';
import {
  GameState,
  DifficultyMode,
  GRAVITY,
  MAX_FALL_SPEED,
  MAX_RAIN,
  ARENA_BOUNDS,
  FORM_CONFIGS,
  STAGE_WEATHER,
  ENEMY_CONFIGS,
} from './config.js';
import { WebAudioSynth } from './audio.js';
import {
  createPlayerMesh,
  createEnemyMesh,
  createBossMesh,
  createDragonMesh,
  createCageMesh,
  createRockMesh,
  createSpikeMesh,
  createSpikeGateMesh,
  createPlatformMesh,
  createParallaxLayers,
  createRainbowGroup,
} from './models.js';
import { getStageLayout } from './levels.js';

// =========================================================
// DOM REFERENCES
// =========================================================
const canvas = document.getElementById('gameCanvas');
const hudContainer = document.getElementById('hudContainer');
const stageBannerEl = document.getElementById('stageBanner');
const formBadgeEl = document.getElementById('formBadge');
const hpBarFill = document.getElementById('hpBarFill');
const hpHeartsEl = document.getElementById('hpHearts');
const twistBarFill = document.getElementById('twistBarFill');
const twistValueText = document.getElementById('twistValueText');
const scoreValueEl = document.getElementById('scoreValue');
const comboBadgeEl = document.getElementById('comboBadge');
const highScoreValueEl = document.getElementById('highScoreValue');
const bossHpContainer = document.getElementById('bossHpContainer');
const bossHpFill = document.getElementById('bossHpFill');
const bossArmorFill = document.getElementById('bossArmorFill');
const bossHpText = document.getElementById('bossHpText');
const menuOverlay = document.getElementById('menuOverlay');
const menuBestEl = document.getElementById('menuBest');
const gameOverOverlay = document.getElementById('gameOverOverlay');
const gameOverReasonEl = document.getElementById('gameOverReason');
const finalScoreTextEl = document.getElementById('finalScoreText');
const victoryOverlay = document.getElementById('victoryOverlay');
const victoryStatsEl = document.getElementById('victoryStats');
const startBtn = document.getElementById('startBtn');
const restartBtn = document.getElementById('restartBtn');
const victoryRestartBtn = document.getElementById('victoryRestartBtn');
const muteBtn = document.getElementById('muteBtn');
const sealSlots = [1, 2, 3, 4].map((i) => document.getElementById(`sealSlot${i}`));
const formSlots = [1, 2, 3, 4, 5].map((i) => document.getElementById(`formSlot${i}`));
const dragonDialogueOverlay = document.getElementById('dragonDialogueOverlay');
const dragonSpeakerEl = document.getElementById('dragonSpeaker');
const dragonDialogueTextEl = document.getElementById('dragonDialogueText');
const statSpEl = document.getElementById('statSp');
const statAtkEl = document.getElementById('statAtk');
const statSpdEl = document.getElementById('statSpd');
const statHpEl = document.getElementById('statHp');
const statSpiritEl = document.getElementById('statSpirit');
const upgradeOverlay = document.getElementById('upgradeOverlay');
const upgradeSpText = document.getElementById('upgradeSpText');
const upAtkBtn = document.getElementById('upAtkBtn');
const upSpdBtn = document.getElementById('upSpdBtn');
const upHpBtn = document.getElementById('upHpBtn');
const upSpiritBtn = document.getElementById('upSpiritBtn');
const upAtkTitle = document.getElementById('upAtkTitle');
const upSpdTitle = document.getElementById('upSpdTitle');
const upHpTitle = document.getElementById('upHpTitle');
const upSpiritTitle = document.getElementById('upSpiritTitle');
const upAtkDesc = document.getElementById('upAtkDesc');
const upSpdDesc = document.getElementById('upSpdDesc');
const upHpDesc = document.getElementById('upHpDesc');
const upSpiritDesc = document.getElementById('upSpiritDesc');
const continueStageBtn = document.getElementById('continueStageBtn');
const pauseBtn = document.getElementById('pauseBtn');
const pauseOverlay = document.getElementById('pauseOverlay');
const resumeBtn = document.getElementById('resumeBtn');
const pauseRestartBtn = document.getElementById('pauseRestartBtn');
const stormOverlay = document.getElementById('stormOverlay');
const lightningFlashOverlay = document.getElementById('lightningFlashOverlay');
const weatherBadgeEl = document.getElementById('weatherBadge');
const devModeBtn = document.getElementById('devModeBtn');
const devBadgeEl = document.getElementById('devBadge');
const diffNormalBtn = document.getElementById('diffNormalBtn');
const diffDevilBtn = document.getElementById('diffDevilBtn');
const devilBadgeEl = document.getElementById('devilBadge');

// =========================================================
// THREE.JS RENDERER, SCENE, CAMERA & LIGHTS
// =========================================================
const renderer = new THREE.WebGLRenderer({
  canvas,
  antialias: true,
  powerPreference: 'high-performance',
  alpha: false,
});
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const scene = new THREE.Scene();
const skyColor = new THREE.Color(STAGE_WEATHER[0].skyHex);
scene.background = skyColor;
scene.fog = new THREE.FogExp2(STAGE_WEATHER[0].skyHex, STAGE_WEATHER[0].fogDensity);

const STAGE_BG_PATHS = {
  0: './Assets/bg_stage1_bo_ao_nuoc_lu.jpg',
  1: './Assets/bg_man1_hem_nui_da.jpg',
  2: './Assets/rung_am_u.png',
  3: './Assets/bg_man3_bien_may.png',
  4: './Assets/bg_man4_cong_thien_dinh.png',
  5: './Assets/danh_boss.png',
};
const SPECIAL_BG_PATHS = {
  dragonSummon: './Assets/trieu_hoi_rong_than.png',
  victory: './Assets/ending.png',
};
const stageBgTextures = {};
const specialBgTextures = {};
const textureLoader = new THREE.TextureLoader();
for (const [idxStr, path] of Object.entries(STAGE_BG_PATHS)) {
  const idx = Number(idxStr);
  textureLoader.load(path, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    stageBgTextures[idx] = tex;
    if (stageIndex === idx && gameState !== GameState.VICTORY && gameState !== GameState.CUTSCENE_DRAGON) {
      scene.background = tex;
    }
  });
}
for (const [key, path] of Object.entries(SPECIAL_BG_PATHS)) {
  textureLoader.load(path, (tex) => {
    tex.colorSpace = THREE.SRGBColorSpace;
    specialBgTextures[key] = tex;
    if (key === 'dragonSummon' && gameState === GameState.CUTSCENE_DRAGON) {
      scene.background = tex;
    } else if (key === 'victory' && gameState === GameState.VICTORY) {
      scene.background = tex;
    }
  });
}

const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 120);
let camX = 0;
camera.position.set(camX, 2.0, 22.0);
camera.lookAt(camX, 1.5, 0.0);

const ambientLight = new THREE.AmbientLight(0x94a3b8, 0.75);
scene.add(ambientLight);

const dirLight = new THREE.DirectionalLight(0xe2e8f0, 1.25);
dirLight.position.set(8, 16, 12);
dirLight.castShadow = true;
dirLight.shadow.mapSize.set(1024, 1024);
dirLight.shadow.camera.near = 1;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -20;
dirLight.shadow.camera.right = 20;
dirLight.shadow.camera.top = 15;
dirLight.shadow.camera.bottom = -15;
scene.add(dirLight);
scene.add(dirLight.target);

const playerPointLight = new THREE.PointLight(0x4ade80, 2.0, 9.0);
scene.add(playerPointLight);

const { layer1: parallax1, layer2: parallax2, layer3: parallax3 } = createParallaxLayers();
parallax1.visible = false;
parallax2.visible = false;
parallax3.visible = false;
scene.add(parallax1, parallax2, parallax3);

const rainbowGroup = createRainbowGroup();
scene.add(rainbowGroup);

// =========================================================
// FLOOD WATER & RAIN OBJECT POOL (MAX_RAIN = 360)
// =========================================================
const floodWaterMat = new THREE.MeshStandardMaterial({
  color: 0x0284c7,
  transparent: true,
  opacity: 0.65,
  roughness: 0.25,
  metalness: 0.1,
});
const floodWaterMesh = new THREE.Mesh(new THREE.BoxGeometry(900, 10, 8), floodWaterMat);
floodWaterMesh.position.set(0, -9.8, 0);
floodWaterMesh.receiveShadow = true;
scene.add(floodWaterMesh);

const rainGroup = new THREE.Group();
scene.add(rainGroup);
const rainGeo = new THREE.BoxGeometry(0.04, 0.65, 0.04);
const rainMat = new THREE.MeshBasicMaterial({ color: 0xbae6fd, transparent: true, opacity: 0.55 });
const rainPool = [];
for (let i = 0; i < MAX_RAIN; i++) {
  const drop = new THREE.Mesh(rainGeo, rainMat);
  drop.position.set((Math.random() - 0.5) * 36, Math.random() * 18 - 6, (Math.random() - 0.5) * 8);
  rainGroup.add(drop);
  rainPool.push(drop);
}

// =========================================================
// SHARED GEOMETRIES & OBJECT POOLS (PROJECTILES & PARTICLES)
// =========================================================
const sharedSphereGeo = new THREE.SphereGeometry(1, 10, 10);
const sharedBoxGeo = new THREE.BoxGeometry(1, 1, 1);
const sharedConeGeo = new THREE.ConeGeometry(0.22, 0.7, 6);
const sharedTorusGeo = new THREE.TorusGeometry(1, 0.12, 8, 32);

const projMaterials = {
  frog: new THREE.MeshBasicMaterial({ color: 0x4ade80 }),
  bee: new THREE.MeshBasicMaterial({ color: 0xfacc15 }),
  melee: new THREE.MeshBasicMaterial({ color: 0xf97316, transparent: true, opacity: 0.65 }),
  enemy: new THREE.MeshBasicMaterial({ color: 0xfef08a }),
  bossOrb: new THREE.MeshBasicMaterial({ color: 0x38bdf8 }),
  reflected: new THREE.MeshBasicMaterial({ color: 0x22d3ee }),
};

const projectilePool = [];
for (let i = 0; i < 64; i++) {
  const mesh = new THREE.Mesh(sharedSphereGeo, projMaterials.frog);
  mesh.visible = false;
  scene.add(mesh);
  projectilePool.push({
    active: false,
    mesh,
    pos: new THREE.Vector3(),
    vel: new THREE.Vector3(),
    owner: 'player', // 'player' | 'enemy'
    kind: 'bullet',  // 'bullet' | 'melee' | 'bossOrb' | 'cloudBolt'
    shape: 'circle', // 'circle' | 'aabb'
    radius: 0.3,
    w: 1,
    h: 1,
    damage: 1,
    ttl: 0,
    pierceCount: 1,
    knockback: 2,
    stunEnemy: 0,
    hitIds: new Set(),
  });
}

const particlePool = [];
const particleGeo = new THREE.BoxGeometry(1, 1, 1);
for (let i = 0; i < 260; i++) {
  const mat = new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 1 });
  const mesh = new THREE.Mesh(particleGeo, mat);
  mesh.visible = false;
  scene.add(mesh);
  particlePool.push({
    active: false,
    mesh,
    vel: new THREE.Vector3(),
    life: 0,
    maxLife: 1,
    gravity: -16,
  });
}

function spawn3DParticles(pos, count, colorHex, speed, size, life, gravity = -16) {
  let spawned = 0;
  for (let i = 0; i < particlePool.length && spawned < count; i++) {
    const p = particlePool[i];
    if (!p.active) {
      p.active = true;
      p.life = life;
      p.maxLife = life;
      p.gravity = gravity;
      p.mesh.visible = true;
      p.mesh.position.set(pos.x, pos.y, pos.z);
      p.mesh.scale.setScalar(size);
      p.mesh.material.color.setHex(colorHex);
      p.mesh.material.opacity = 1;
      const angle = Math.random() * Math.PI * 2;
      const spd = speed * (0.4 + Math.random() * 0.7);
      p.vel.set(
        Math.cos(angle) * spd,
        Math.sin(angle) * spd * 0.8 + speed * 0.25,
        (Math.random() - 0.5) * spd * 0.6
      );
      spawned++;
    }
  }
}

// Shockwave rings for Perfect Morph
const shockwaves = [];
function spawnShockwave(pos) {
  const mat = new THREE.MeshBasicMaterial({ color: 0xfacc15, transparent: true, opacity: 0.9 });
  const mesh = new THREE.Mesh(sharedTorusGeo, mat);
  mesh.position.set(pos.x, pos.y, 0.2);
  mesh.scale.setScalar(0.5);
  scene.add(mesh);
  shockwaves.push({ mesh, timer: 0, duration: 0.25 });
}

// =========================================================
// GAME STATE & ENTITIES
// =========================================================
let gameState = GameState.MENU;
let stageIndex = 0;
let score = 0;
let highScore = Number(localStorage.getItem('CKT_HIGH_SCORE') || 0);
let fastestTime = Number(localStorage.getItem('CKT_FASTEST_CLEAR_TIME') || 0);
let totalRunTime = 0;
let twistMultiplier = 1;
let maxReachedX = 0;
let lastScoreMilestoneX = 0;

let hitStopTimer = 0;
let shakeIntensity = 0;
let shakeDuration = 0;
let shakeTimer = 0;
let lightningTimer = 0;
let lightningFlash = 0;
let cutsceneTimer = 0;
let pendingNextStage = 0;
let devMode = false;
let difficultyMode = DifficultyMode.NORMAL;
let elapsed = 0;

const playerStats = {
  skillPoints: 0,
  atkLevel: 1,
  spdLevel: 1,
  hpLevel: 1,
  spiritLevel: 1,
};

const playerMesh = createPlayerMesh();
scene.add(playerMesh);

const player = {
  mesh: playerMesh,
  pos: new THREE.Vector3(3, 1, 0),
  vel: new THREE.Vector3(0, 0, 0),
  facing: 1,
  formId: 1,
  unlockedForms: [1],
  hp: 3,
  maxHp: 3,
  spiritEnergy: 100.0,
  maxSpirit: 100.0,
  isGrounded: false,
  jumpsLeft: 1,
  iFrameTimer: 0.0,
  stunTimer: 0.0,
  attackCooldown: 0.0,
  dashTimer: 0.0,
  perfectMorphWindow: 0.0,
};

const stageGroup = new THREE.Group();
scene.add(stageGroup);

let platforms = [];
let enemies = [];
let rocks = [];
let spikes = [];
let spikeGates = [];
let trollTraps = [];
let cage = null;
let boss = null;
let bossLightningPillars = [];
let dragonMesh = null;
let cutsceneAllies = [];
let healthDrops = [];
const healthDropMat = new THREE.MeshStandardMaterial({
  color: 0xef4444,
  emissive: 0xf43f5e,
  emissiveIntensity: 0.75,
  roughness: 0.3,
});

// =========================================================
// INPUT HANDLING
// =========================================================
const keys = {};
let jumpJustPressed = false;
let attackHeld = false;
let attackJustPressed = false;

window.addEventListener('keydown', (e) => {
  const code = e.code;
  if (['Space', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(code)) {
    e.preventDefault();
  }
  const wasDown = !!keys[code];
  keys[code] = true;

  WebAudioSynth.unlock();

  if (gameState === GameState.MENU && code === 'Space' && !wasDown) {
    startGame();
    return;
  }

  if (gameState === GameState.UPGRADE_POPUP && (code === 'Space' || code === 'Enter') && !wasDown) {
    closeUpgradePopup();
    return;
  }

  if ((gameState === GameState.PLAYING || gameState === GameState.PAUSED) && (code === 'KeyP' || code === 'Escape') && !wasDown) {
    togglePause();
    return;
  }

  if (gameState === GameState.VICTORY && code === 'KeyR' && !wasDown) {
    returnToMenu();
    return;
  }

  if ((gameState === GameState.GAMEOVER || gameState === GameState.PAUSED) && code === 'KeyR' && !wasDown) {
    resetGame();
    return;
  }

  if ((code === 'Backquote' || code === 'F2') && !wasDown) {
    e.preventDefault();
    toggleDevMode();
    return;
  }

  if (code === 'KeyM' && !wasDown) {
    toggleMute();
    return;
  }

  if (gameState !== GameState.PLAYING) return;

  if ((code === 'KeyW' || code === 'Space' || code === 'ArrowUp') && !wasDown) {
    jumpJustPressed = true;
  }

  if (code === 'KeyJ') {
    attackHeld = true;
    if (!wasDown) attackJustPressed = true;
  }

  // Morph keys [1]-[5]
  if (code.startsWith('Digit') && !wasDown) {
    const id = Number(code.replace('Digit', ''));
    if (id >= 1 && id <= 5 && player.unlockedForms.includes(id)) {
      switchForm(id, true);
    }
  }

  // Cycle [Q] / [E]
  if ((code === 'KeyQ' || code === 'KeyE') && !wasDown && player.unlockedForms.length > 1) {
    const idx = player.unlockedForms.indexOf(player.formId);
    const dir = code === 'KeyE' ? 1 : -1;
    const nextIdx = (idx + dir + player.unlockedForms.length) % player.unlockedForms.length;
    switchForm(player.unlockedForms[nextIdx], true);
  }
});

let lastWheelSwitch = 0;
window.addEventListener('wheel', (e) => {
  if (gameState !== GameState.PLAYING || player.unlockedForms.length <= 1) return;
  const now = performance.now();
  if (now - lastWheelSwitch < 60) return;
  lastWheelSwitch = now;
  const idx = player.unlockedForms.indexOf(player.formId);
  const dir = e.deltaY > 0 ? 1 : -1;
  const nextIdx = (idx + dir + player.unlockedForms.length) % player.unlockedForms.length;
  switchForm(player.unlockedForms[nextIdx], true);
}, { passive: true });

window.addEventListener('keyup', (e) => {
  keys[e.code] = false;
  if (e.code === 'KeyJ') attackHeld = false;
});

canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    WebAudioSynth.unlock();
    if (gameState === GameState.PLAYING) {
      attackHeld = true;
      attackJustPressed = true;
    }
  }
});

window.addEventListener('mouseup', (e) => {
  if (e.button === 0) attackHeld = false;
});

function toggleMute() {
  WebAudioSynth.setMuted(!WebAudioSynth.isMuted());
  muteBtn.textContent = WebAudioSynth.isMuted() ? '🔇 Tắt tiếng [M]' : '🔊 Âm thanh [M]';
  muteBtn.blur();
}
function togglePause() {
  pauseBtn.blur();
  resumeBtn.blur();
  if (gameState === GameState.PLAYING) {
    for (const k in keys) keys[k] = false;
    attackHeld = false;
    jumpJustPressed = false;
    attackJustPressed = false;
    gameState = GameState.PAUSED;
    pauseOverlay.classList.remove('hidden');
  } else if (gameState === GameState.PAUSED) {
    gameState = GameState.PLAYING;
    pauseOverlay.classList.add('hidden');
  }
}
function toggleDevMode() {
  devMode = !devMode;
  devModeBtn.blur();
  devModeBtn.textContent = devMode ? '🛠️ Dev: ON [`]' : '🛠️ Dev: OFF [`]';
  devModeBtn.style.background = devMode ? 'rgba(161,98,7,0.9)' : 'rgba(30,41,59,0.85)';
  devBadgeEl.classList.toggle('hidden', !devMode);
}
function setDifficultyMode(mode) {
  difficultyMode = mode;
  const isDevil = mode === DifficultyMode.DEVIL;
  diffNormalBtn.style.background = isDevil ? 'rgba(30,41,59,0.85)' : 'rgba(34,197,94,0.22)';
  diffNormalBtn.style.borderColor = isDevil ? 'rgba(34,197,94,0.35)' : '#22c55e';
  diffDevilBtn.style.background = isDevil ? 'rgba(220,38,38,0.35)' : 'rgba(30,41,59,0.85)';
  diffDevilBtn.style.borderColor = isDevil ? '#ef4444' : 'rgba(239,68,68,0.45)';
  devilBadgeEl.classList.toggle('hidden', !isDevil);
}
diffNormalBtn.addEventListener('click', () => setDifficultyMode(DifficultyMode.NORMAL));
diffDevilBtn.addEventListener('click', () => setDifficultyMode(DifficultyMode.DEVIL));

const pauseMenuBtn = document.getElementById('pauseMenuBtn');
muteBtn.addEventListener('click', toggleMute);
devModeBtn.addEventListener('click', toggleDevMode);
pauseBtn.addEventListener('click', togglePause);
resumeBtn.addEventListener('click', togglePause);
pauseRestartBtn.addEventListener('click', () => {
  WebAudioSynth.unlock();
  resetGame();
});
pauseMenuBtn.addEventListener('click', () => {
  WebAudioSynth.unlock();
  returnToMenu();
});
document.querySelectorAll('.stage-select-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    WebAudioSynth.unlock();
    const stage = Number(btn.dataset.stage || 0);
    startGame(stage);
  });
});
startBtn.addEventListener('click', () => {
  WebAudioSynth.unlock();
  startGame(0);
});
restartBtn.addEventListener('click', () => {
  WebAudioSynth.unlock();
  resetGame();
});
victoryRestartBtn.addEventListener('click', () => {
  WebAudioSynth.unlock();
  returnToMenu();
});

function getUpgradeCost(level) {
  return Math.ceil(level / 2);
}

function refreshUpgradePopupUI() {
  const atkCost = getUpgradeCost(playerStats.atkLevel);
  const spdCost = getUpgradeCost(playerStats.spdLevel);
  const hpCost = getUpgradeCost(playerStats.hpLevel);
  const spiritCost = getUpgradeCost(playerStats.spiritLevel);

  upgradeSpText.textContent = `ĐIỂM KỸ NĂNG (SP): ${playerStats.skillPoints}`;
  upAtkTitle.textContent = `⚔️ SỨC MẠNH (ATK Lv.${playerStats.atkLevel})`;
  upSpdTitle.textContent = `⚡ TỐC ĐỘ (SPD Lv.${playerStats.spdLevel})`;
  upHpTitle.textContent = `❤️ SINH LỰC (HP Lv.${playerStats.hpLevel})`;
  upSpiritTitle.textContent = `🌀 LINH KHÍ (LK Lv.${playerStats.spiritLevel})`;

  upAtkDesc.textContent = `+10% Sát thương mọi hình dạng (Tốn ${atkCost} SP)`;
  upSpdDesc.textContent = `+6% Tốc độ di chuyển & lướt (Tốn ${spdCost} SP)`;
  upHpDesc.textContent = `+1 Tim tối đa & Hồi +1 Tim (Tốn ${hpCost} SP)`;
  upSpiritDesc.textContent = `+10 Linh Khí tối đa & +10% Hồi phục (Tốn ${spiritCost} SP)`;

  upAtkBtn.disabled = playerStats.skillPoints < atkCost;
  upSpdBtn.disabled = playerStats.skillPoints < spdCost;
  upHpBtn.disabled = playerStats.skillPoints < hpCost;
  upSpiritBtn.disabled = playerStats.skillPoints < spiritCost;
}

function applyStatUpgrade(statKey) {
  const levelMap = {
    atk: playerStats.atkLevel,
    spd: playerStats.spdLevel,
    hp: playerStats.hpLevel,
    spirit: playerStats.spiritLevel,
  };
  const cost = getUpgradeCost(levelMap[statKey]);
  if (playerStats.skillPoints < cost) return;

  playerStats.skillPoints -= cost;
  if (statKey === 'atk') playerStats.atkLevel++;
  else if (statKey === 'spd') playerStats.spdLevel++;
  else if (statKey === 'hp') {
    playerStats.hpLevel++;
    player.maxHp = 3 + (playerStats.hpLevel - 1);
    player.hp = Math.min(player.maxHp, player.hp + 1);
  } else if (statKey === 'spirit') {
    playerStats.spiritLevel++;
    player.maxSpirit = 100.0 + (playerStats.spiritLevel - 1) * 10.0;
    player.spiritEnergy = Math.min(player.maxSpirit, player.spiritEnergy + 10.0);
  }
  WebAudioSynth.playUpgrade();
  spawn3DParticles(player.pos, 18, 0xfacc15, 7.5, 0.22, 0.45);
  refreshUpgradePopupUI();
  updateHUD();
}

function closeUpgradePopup() {
  upgradeOverlay.classList.add('hidden');
  if (pendingNextStage === 5) {
    clearStageObjects();
    gameState = GameState.CUTSCENE_DRAGON;
    cutsceneTimer = 7.0;
    ambientLight.intensity = 0.45;
    player.mesh.visible = false;
    scene.background = specialBgTextures.dragonSummon || skyColor;
    parallax1.visible = false;
    parallax2.visible = false;
    parallax3.visible = false;

    // Golden cloud stage for all 5 animals gathering together
    const cloudStage = createPlatformMesh(12, 1.0, 0x4338ca, 0xfacc15);
    cloudStage.position.set(0, -1.6, 0);
    stageGroup.add(cloudStage);

    const allyXs = [-4.0, -2.0, 0.0, 2.0, 4.0];
    for (let id = 1; id <= 5; id++) {
      const ally = createPlayerMesh();
      for (let f = 1; f <= 5; f++) {
        ally.userData.forms[f].visible = f === id;
      }
      ally.position.set(allyXs[id - 1], -0.4, 0.4);
      ally.rotation.y = id <= 3 ? 0.2 : Math.PI - 0.2;
      scene.add(ally);
      cutsceneAllies.push(ally);
      spawn3DParticles(ally.position, 14, FORM_CONFIGS[id].colorHex, 7.0, 0.24, 0.9);
    }

    dragonMesh = createDragonMesh();
    dragonMesh.position.set(-10, -2, -2);
    scene.add(dragonMesh);

    dragonSpeakerEl.textContent = '🐸 CÓC & ĐỒNG ĐỘI (HỔ • GẤU • CÁO • ONG):';
    dragonDialogueTextEl.textContent =
      '"Xin Long Thần hãy đưa chúng con bay lên Điện Ngọc Hoàng, hỏi tội Ông Trời gây mưa bão lụt lội!"';
    dragonDialogueOverlay.classList.remove('hidden');

    WebAudioSynth.playDragonSummon();
    triggerShake(0.40, 1.40);
  } else {
    loadStage(pendingNextStage);
    gameState = GameState.PLAYING;
    updateHUD();
  }
}

upAtkBtn.addEventListener('click', () => { WebAudioSynth.unlock(); applyStatUpgrade('atk'); });
upSpdBtn.addEventListener('click', () => { WebAudioSynth.unlock(); applyStatUpgrade('spd'); });
upHpBtn.addEventListener('click', () => { WebAudioSynth.unlock(); applyStatUpgrade('hp'); });
upSpiritBtn.addEventListener('click', () => { WebAudioSynth.unlock(); applyStatUpgrade('spirit'); });
continueStageBtn.addEventListener('click', () => { WebAudioSynth.unlock(); closeUpgradePopup(); });

// =========================================================
// JUICE HELPERS
// =========================================================
function triggerShake(intensity, duration) {
  if (intensity >= shakeIntensity || shakeTimer <= 0) {
    shakeIntensity = intensity;
    shakeDuration = duration;
    shakeTimer = duration;
  }
}

function addScore(pts) {
  score += Math.round(pts);
}

// =========================================================
// FORM SWITCHING & TWIST ENGINE
// =========================================================
function switchForm(newId, isManual = true) {
  if (newId === player.formId) return;
  if (!player.unlockedForms.includes(newId)) return;

  const oldCfg = FORM_CONFIGS[player.formId];
  const cfg = FORM_CONFIGS[newId];

  const forms = player.mesh.userData.forms;
  if (forms[player.formId]) forms[player.formId].visible = false;
  if (forms[newId]) forms[newId].visible = true;

  // Keep feet planted at the same bottom Y when changing form height
  player.pos.y += (cfg.h - oldCfg.h) * 0.5;
  player.mesh.position.copy(player.pos);

  player.formId = newId;
  playerPointLight.color.setHex(cfg.colorHex);
  player.jumpsLeft = player.isGrounded ? cfg.maxJumps : Math.max(0, cfg.maxJumps - 1);

  if (isManual) {
    player.perfectMorphWindow = 0.20;
    spawn3DParticles(player.pos, 18, cfg.colorHex, 8.0, 0.22, 0.45);
    triggerShake(0.15, 0.10);
    WebAudioSynth.playMorph(newId);
  }
}

function triggerPerfectMorph(hazardBullet = null) {
  if (hazardBullet) {
    hazardBullet.active = false;
    hazardBullet.mesh.visible = false;
  }
  player.iFrameTimer = Math.max(player.iFrameTimer, 0.35);
  player.perfectMorphWindow = 0;

  spawnShockwave(player.pos);
  spawn3DParticles(player.pos, 28, 0xfacc15, 11.0, 0.28, 0.60);

  // Stun all enemies within 5.5 units for 2.0s
  for (const en of enemies) {
    if (Math.hypot(en.pos.x - player.pos.x, en.pos.y - player.pos.y) <= 5.5) {
      en.stunTimer = 2.0;
    }
  }

  player.spiritEnergy = Math.min(player.maxSpirit, player.spiritEnergy + 30.0);
  twistMultiplier = Math.min(10, twistMultiplier + 1);
  hitStopTimer = 0.04;
  triggerShake(0.45, 0.22);
  WebAudioSynth.playPerfectMorph();
}

// =========================================================
// STAGE LOADING & CLEANUP
// =========================================================
function clearStageObjects() {
  while (stageGroup.children.length > 0) {
    stageGroup.remove(stageGroup.children[0]);
  }
  for (const p of projectilePool) {
    p.active = false;
    p.mesh.visible = false;
  }
  platforms = [];
  enemies = [];
  rocks = [];
  spikes = [];
  spikeGates = [];
  trollTraps = [];
  healthDrops = [];
  cage = null;
  boss = null;
  bossLightningPillars = [];
  for (const ally of cutsceneAllies) {
    scene.remove(ally);
  }
  cutsceneAllies = [];
}

function loadStage(idx) {
  clearStageObjects();
  stageIndex = idx;
  const weather = STAGE_WEATHER[idx];
  const layout = getStageLayout(idx);
  const isDevil = difficultyMode === DifficultyMode.DEVIL;

  devilBadgeEl.classList.toggle('hidden', !isDevil);
  skyColor.setHex(weather.skyHex);
  scene.background = stageBgTextures[idx] || skyColor;
  const showParallax = !STAGE_BG_PATHS[idx];
  parallax1.visible = showParallax;
  parallax2.visible = showParallax;
  parallax3.visible = showParallax;
  scene.fog.color.setHex(weather.skyHex);
  scene.fog.density = weather.fogDensity;
  ambientLight.intensity = weather.ambientIntensity;
  lightningTimer = weather.lightningInterval;

  weatherBadgeEl.textContent = weather.weatherLabel;
  stormOverlay.style.opacity = String(weather.vignetteOpacity);
  stormOverlay.style.backdropFilter = `blur(${weather.blurPx}px)`;
  lightningFlashOverlay.style.opacity = '0';

  // Platforms
  const stageBiomes = ['mud', 'stone', 'forest', 'cloud', 'cloud', 'palace'];
  const biome = stageBiomes[idx] || 'stone';
  layout.platforms.forEach((pf, pIdx) => {
    const w = pf.x2 - pf.x1;
    const cx = (pf.x1 + pf.x2) * 0.5;
    const cy = pf.topY - pf.h * 0.5;
    const mesh = createPlatformMesh(w, pf.h, pf.color, pf.topColor, biome);
    mesh.position.set(cx, cy, 0);
    stageGroup.add(mesh);

    const pfObj = {
      x1: pf.x1,
      x2: pf.x2,
      topY: pf.topY,
      origTopY: pf.topY,
      origX1: pf.x1,
      origX2: pf.x2,
      origCx: cx,
      origCy: cy,
      h: pf.h,
      mesh,
      trollType: null,
      trollState: 'idle', // 'idle' | 'shake' | 'active' | 'done'
      trollTimer: 0,
      slideDir: pIdx % 2 === 0 ? 1 : -1,
    };

    // Level Devil Troll Platforms!
    if (isDevil && pIdx > 0) {
      if (idx === 5 && pf.topY > 0) {
        // Boss arena side platforms collapse & respawn
        pfObj.trollType = 'fall_respawn';
      } else if (pf.topY > 0 && pIdx % 2 === 1) {
        pfObj.trollType = 'fall';
      } else if (pf.topY > 0 && pIdx % 2 === 0) {
        pfObj.trollType = 'slide';
      }
    }
    platforms.push(pfObj);
  });

  // Level Devil Pop-up Surprise Spikes!
  if (isDevil && idx < 5) {
    const step = idx === 4 ? 65 : 42;
    for (let sx = 24; sx < weather.maxX - 18; sx += step) {
      // Place popup spike on solid ground where a platform exists at y=0
      const onGround = layout.platforms.some((p) => p.topY === 0 && sx > p.x1 + 3 && sx < p.x2 - 3);
      if (onGround) {
        const sMesh = createSpikeMesh(2.4);
        sMesh.position.set(sx, -0.75, 0);
        stageGroup.add(sMesh);
        const sObj = { pos: new THREE.Vector3(sx, -0.75, 0), w: 2.4, h: 0.6, mesh: sMesh };
        spikes.push(sObj);
        trollTraps.push({
          type: 'popupSpike',
          x: sx,
          targetY: 0.25,
          triggered: false,
          spikeObj: sObj,
        });
      }
    }
    // Extra sneaky pop-up spike right before the cage!
    if (layout.cage) {
      const cx = layout.cage.x - 4.2;
      const sMesh = createSpikeMesh(2.0);
      sMesh.position.set(cx, -0.75, 0);
      stageGroup.add(sMesh);
      const sObj = { pos: new THREE.Vector3(cx, -0.75, 0), w: 2.0, h: 0.6, mesh: sMesh };
      spikes.push(sObj);
      trollTraps.push({
        type: 'popupSpike',
        x: cx,
        targetY: 0.25,
        triggered: false,
        spikeObj: sObj,
      });
    }
  }

  // Enemies
  let eid = 1;
  for (const ed of layout.enemies) {
    const cfg = ENEMY_CONFIGS[ed.type];
    const mesh = createEnemyMesh(ed.type);
    mesh.position.set(ed.x, ed.y, 0);
    stageGroup.add(mesh);
    enemies.push({
      id: eid++,
      type: ed.type,
      mesh,
      pos: new THREE.Vector3(ed.x, ed.y, 0),
      vel: new THREE.Vector3(cfg.speed, 0, 0),
      w: cfg.w,
      h: cfg.h,
      hp: cfg.hp,
      maxHp: cfg.hp,
      speed: cfg.speed,
      scoreReward: cfg.scoreReward,
      colorHex: cfg.colorHex,
      patrolMinX: ed.patrolMinX,
      patrolMaxX: ed.patrolMaxX,
      baseY: ed.baseY ?? ed.y,
      stunTimer: 0,
      flashTimer: 0,
      aiTimer: Math.random() * 1.5,
      chargeTimer: 0,
      telegraphTimer: 0,
    });
  }

  // Breakable Rocks
  for (const r of layout.rocks) {
    const mesh = createRockMesh(r.w, r.h);
    mesh.position.set(r.x, r.y, 0);
    stageGroup.add(mesh);
    rocks.push({
      pos: new THREE.Vector3(r.x, r.y, 0),
      w: r.w,
      h: r.h,
      hp: 2.0,
      flashTimer: 0,
      mesh,
    });
  }

  // Spike Traps
  for (const s of layout.spikes) {
    const mesh = createSpikeMesh(s.w);
    mesh.position.set(s.x, s.y, 0);
    stageGroup.add(mesh);
    spikes.push({
      pos: new THREE.Vector3(s.x, s.y, 0),
      w: s.w,
      h: 0.6,
      mesh,
    });
  }

  // Full-height Spike Gates (Fox Dash only)
  for (const sg of layout.spikeGates || []) {
    const mesh = createSpikeGateMesh(sg.w, sg.gapBottomY, sg.gapTopY);
    mesh.position.set(sg.x, 0, 0);
    stageGroup.add(mesh);
    spikeGates.push({
      x: sg.x,
      w: sg.w,
      gapBottomY: sg.gapBottomY,
      gapTopY: sg.gapTopY,
      mesh,
    });
  }

  // Spirit Cage
  if (layout.cage) {
    const coreColor = layout.cage.unlockFormId ? FORM_CONFIGS[layout.cage.unlockFormId].colorHex : 0xfacc15;
    const mesh = createCageMesh(coreColor);
    mesh.position.set(layout.cage.x, layout.cage.y, 0);
    stageGroup.add(mesh);
    cage = {
      pos: new THREE.Vector3(layout.cage.x, layout.cage.y, 0),
      w: 2.0,
      h: 2.2,
      hp: layout.cage.hp,
      maxHp: layout.cage.hp,
      unlockFormId: layout.cage.unlockFormId,
      flashTimer: 0,
      mesh,
    };
  }

  // Boss Ông Trời in Stage 5
  if (idx === 5) {
    const bMesh = createBossMesh();
    bMesh.position.set(0, 4.8, 0);
    stageGroup.add(bMesh);
    boss = {
      pos: new THREE.Vector3(0, 4.8, 0),
      w: 4.5,
      h: 5.5,
      hp: 40.0,
      maxHp: 40.0,
      armorHp: 10.0,
      maxArmorHp: 10.0,
      armorBroken: false,
      attackTimer: 1.8,
      attackPattern: 0,
      flashTimer: 0,
      mesh: bMesh,
    };
  }

  // Reset player position for stage
  player.pos.set(layout.spawn.x, layout.spawn.y, 0);
  player.vel.set(0, 0, 0);
  player.facing = 1;
  player.mesh.rotation.y = 0;
  player.isGrounded = false;
  maxReachedX = layout.spawn.x;
  lastScoreMilestoneX = layout.spawn.x;
  camX = idx === 5 ? 0 : Math.max(weather.minX + 14.2, Math.min(weather.maxX - 14.2, player.pos.x + 3.5));

  stageBannerEl.textContent = weather.banner;
  bossHpContainer.classList.toggle('hidden', idx !== 5);
}

// =========================================================
// START / RESET / ENDGAME
// =========================================================
let selectedStartStage = 0;

function startGame(startStage = 0) {
  selectedStartStage = startStage;
  resetGame(startStage);
}

function returnToMenu() {
  clearStageObjects();
  pauseOverlay.classList.add('hidden');
  victoryOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  upgradeOverlay.classList.add('hidden');
  dragonDialogueOverlay.classList.add('hidden');
  hudContainer.classList.add('hidden');
  bossHpContainer.classList.add('hidden');
  rainbowGroup.visible = false;
  rainGroup.visible = true;
  stormOverlay.style.opacity = '0';
  stormOverlay.style.backdropFilter = 'blur(0px)';
  lightningFlashOverlay.style.opacity = '0';
  selectedStartStage = 0;
  menuBestEl.textContent =
    highScore > 0
      ? `Kỷ lục: ${highScore.toLocaleString()} điểm` + (fastestTime > 0 ? ` | Thời gian nhanh nhất: ${fastestTime}s` : '')
      : 'Chưa có kỷ lục — Hãy là người đầu tiên triệu hồi Long Thần!';
  gameState = GameState.MENU;
  menuOverlay.classList.remove('hidden');
}

function resetGame(startStage = selectedStartStage) {
  selectedStartStage = startStage;
  score = 0;
  totalRunTime = 0;
  twistMultiplier = 1;
  hitStopTimer = 0;
  shakeTimer = 0;
  shakeIntensity = 0;
  lightningFlash = 0;

  // Unlock all forms earned prior to startStage
  player.unlockedForms = [1];
  for (let s = 0; s < Math.min(startStage, 4); s++) {
    const fId = STAGE_WEATHER[s].unlockFormId;
    if (fId && !player.unlockedForms.includes(fId)) {
      player.unlockedForms.push(fId);
    }
  }

  playerStats.skillPoints = 0;
  playerStats.atkLevel = 1;
  playerStats.spdLevel = 1;
  playerStats.hpLevel = 1;
  playerStats.spiritLevel = 1;

  player.hp = 3;
  player.maxHp = 3;
  player.maxSpirit = 100.0;
  player.spiritEnergy = 100.0;
  player.iFrameTimer = 0;
  player.stunTimer = 0;
  player.attackCooldown = 0;
  player.dashTimer = 0;
  player.perfectMorphWindow = 0;
  player.jumpsLeft = 1;
  player.mesh.visible = true;

  // Ensure form 1 visible
  const forms = player.mesh.userData.forms;
  for (let i = 1; i <= 5; i++) {
    forms[i].visible = i === 1;
  }
  player.formId = 1;
  playerPointLight.color.setHex(FORM_CONFIGS[1].colorHex);

  for (let i = 0; i < sealSlots.length; i++) {
    sealSlots[i].classList.toggle('unlocked', i < startStage);
  }

  rainGroup.visible = true;
  rainbowGroup.visible = false;
  if (dragonMesh) {
    scene.remove(dragonMesh);
    dragonMesh = null;
  }

  menuOverlay.classList.add('hidden');
  pauseOverlay.classList.add('hidden');
  upgradeOverlay.classList.add('hidden');
  dragonDialogueOverlay.classList.add('hidden');
  gameOverOverlay.classList.add('hidden');
  victoryOverlay.classList.add('hidden');
  hudContainer.classList.remove('hidden');

  loadStage(startStage);
  gameState = GameState.PLAYING;
  updateHUD();
}

function triggerGameOver(reason) {
  gameState = GameState.GAMEOVER;
  if (score > highScore) {
    highScore = score;
    localStorage.setItem('CKT_HIGH_SCORE', String(highScore));
  }
  gameOverReasonEl.textContent = reason;
  finalScoreTextEl.textContent = `Điểm đạt được: ${Math.floor(score).toLocaleString()} | Kỷ lục: ${highScore.toLocaleString()}`;
  gameOverOverlay.classList.remove('hidden');
  WebAudioSynth.playPlayerDamaged();
}

let victorySeqTimer = 0;
let victoryBoomTimer = 0;

function triggerVictory() {
  gameState = GameState.VICTORY_SEQUENCE;
  victorySeqTimer = 3.2;
  victoryBoomTimer = 0;
  bossHpContainer.classList.add('hidden');
  weatherBadgeEl.textContent = '🌤️ BÃO TAN DẦN — ÔNG TRỜI ĐANG KHUẤT PHỤC!';

  // Clear active hazards during cinematic
  for (const p of projectilePool) {
    if (p.active && p.owner === 'enemy') {
      p.active = false;
      p.mesh.visible = false;
    }
  }
  for (const pil of bossLightningPillars) {
    stageGroup.remove(pil.mesh);
  }
  bossLightningPillars = [];
  for (const en of enemies) {
    spawn3DParticles(en.pos, 10, en.colorHex, 6.0, 0.2, 0.4);
    stageGroup.remove(en.mesh);
  }
  enemies = [];

  triggerShake(0.45, 0.35);
  WebAudioSynth.playBreakArmor();
}

function finishVictory() {
  gameState = GameState.VICTORY;
  const timeBonus = Math.max(0, Math.round((150 - totalRunTime) * 50));
  score += 5000 + timeBonus;

  if (score > highScore) {
    highScore = score;
    localStorage.setItem('CKT_HIGH_SCORE', String(highScore));
  }
  if (fastestTime === 0 || totalRunTime < fastestTime) {
    fastestTime = Number(totalRunTime.toFixed(1));
    localStorage.setItem('CKT_FASTEST_CLEAR_TIME', String(fastestTime));
  }

  rainGroup.visible = false;
  rainbowGroup.visible = true;
  rainbowGroup.position.set(0, -1.5, -7.0);
  stormOverlay.style.opacity = '0';
  stormOverlay.style.backdropFilter = 'blur(0px)';
  lightningFlashOverlay.style.opacity = '0';
  weatherBadgeEl.textContent = '☀️ TRỜI QUANG MÂY TẠNH — CẦU VỒNG 7 SẮC';
  skyColor.setHex(0x38bdf8);
  scene.background = specialBgTextures.victory || skyColor;
  parallax1.visible = false;
  parallax2.visible = false;
  parallax3.visible = false;
  scene.fog.color.setHex(0x38bdf8);
  scene.fog.density = 0.005;
  ambientLight.intensity = 1.15;

  spawn3DParticles(new THREE.Vector3(0, 6, -1), 160, 0xfacc15, 9.0, 0.25, 2.5, -2.5);
  WebAudioSynth.playVictory();

  victoryStatsEl.innerHTML =
    `Tổng điểm: <strong style="color:#facc15">${Math.floor(score).toLocaleString()}</strong><br/>` +
    `Thời gian dừng mưa: <strong>${totalRunTime.toFixed(1)}s</strong> (Kỷ lục: ${fastestTime.toFixed(1)}s)`;
  victoryOverlay.classList.remove('hidden');
}

// =========================================================
// PROJECTILE SPAWNER
// =========================================================
function spawnProjectile(opts) {
  for (const p of projectilePool) {
    if (!p.active) {
      p.active = true;
      p.owner = opts.owner;
      p.kind = opts.kind;
      p.shape = opts.shape || 'circle';
      p.pos.set(opts.x, opts.y, 0);
      p.vel.set(opts.vx, opts.vy, 0);
      p.radius = opts.radius || 0.3;
      p.w = opts.w || 1;
      p.h = opts.h || 1;
      const atkMult = opts.owner === 'player' ? 1 + (playerStats.atkLevel - 1) * 0.10 : 1;
      p.damage = (opts.damage || 1) * atkMult;
      p.ttl = opts.ttl || 0.5;
      p.pierceCount = opts.pierceCount || 1;
      p.knockback = opts.knockback || 2;
      p.stunEnemy = opts.stunEnemy || 0;
      p.hitIds.clear();

      p.mesh.geometry = opts.shape === 'aabb' ? sharedBoxGeo : opts.kind === 'bee' ? sharedConeGeo : sharedSphereGeo;
      p.mesh.material = projMaterials[opts.matKey || 'frog'];
      if (opts.shape === 'aabb') {
        p.mesh.scale.set(p.w, p.h, 0.8);
      } else if (opts.kind === 'bee') {
        p.mesh.scale.setScalar(1.0);
        p.mesh.rotation.z = opts.vx >= 0 ? -Math.PI * 0.5 : Math.PI * 0.5;
      } else {
        p.mesh.scale.setScalar(p.radius);
        p.mesh.rotation.z = 0;
      }
      p.mesh.position.copy(p.pos);
      p.mesh.visible = true;
      return p;
    }
  }
  return null;
}

// =========================================================
// UPDATE SYSTEMS
// =========================================================
function updateTwistSpirit(dt) {
  const cfg = FORM_CONFIGS[player.formId];
  let rate = cfg.spiritDelta;
  if (rate > 0) {
    rate *= 1 + (playerStats.spiritLevel - 1) * 0.10;
  }
  player.spiritEnergy = Math.max(0.0, Math.min(player.maxSpirit, player.spiritEnergy + rate * dt));

  if (player.formId !== 1 && player.spiritEnergy <= 0.0) {
    switchForm(1, false);
    twistMultiplier = 1;
    triggerShake(0.25, 0.20);
    spawn3DParticles(player.pos, 12, 0x94a3b8, 6.0, 0.20, 0.40);
    WebAudioSynth.playStun();
  }

  if (player.perfectMorphWindow > 0) {
    player.perfectMorphWindow = Math.max(0, player.perfectMorphWindow - dt);
  }
}

function handlePlayerAttack() {
  const cfg = FORM_CONFIGS[player.formId];

  if (player.stunTimer > 0 || player.attackCooldown > 0) return;
  if (!attackJustPressed) return;

  if (player.formId === 4) {
    if (player.spiritEnergy < cfg.dashCost) return;
    player.spiritEnergy -= cfg.dashCost;
    player.dashTimer = 0.22;
    player.attackCooldown = cfg.attackCooldown;
    spawnProjectile({
      owner: 'player',
      kind: 'melee',
      shape: 'aabb',
      x: player.pos.x + player.facing * 0.5,
      y: player.pos.y,
      vx: player.facing * cfg.attackSpeed,
      vy: 0,
      w: cfg.attackW,
      h: cfg.attackH,
      damage: cfg.attackDamage,
      ttl: cfg.attackTtl,
      pierceCount: cfg.pierceCount,
      knockback: cfg.knockback,
      matKey: 'melee',
    });
    WebAudioSynth.playAttack(4);
    return;
  }

  player.attackCooldown = cfg.attackCooldown;
  WebAudioSynth.playAttack(player.formId);

  if (player.formId === 1) {
    spawnProjectile({
      owner: 'player',
      kind: 'bullet',
      shape: 'circle',
      x: player.pos.x + player.facing * 0.6,
      y: player.pos.y + 0.1,
      vx: player.facing * cfg.attackSpeed,
      vy: 0,
      radius: cfg.attackRadius,
      damage: cfg.attackDamage,
      ttl: cfg.attackTtl,
      pierceCount: cfg.pierceCount,
      knockback: cfg.knockback,
      stunEnemy: 0.6,
      matKey: 'frog',
    });
  } else if (player.formId === 2) {
    player.vel.x = player.facing * cfg.attackSpeed;
    spawnProjectile({
      owner: 'player',
      kind: 'melee',
      shape: 'aabb',
      x: player.pos.x + player.facing * 1.1,
      y: player.pos.y,
      vx: player.facing * cfg.attackSpeed,
      vy: 0,
      w: cfg.attackW,
      h: cfg.attackH,
      damage: cfg.attackDamage,
      ttl: cfg.attackTtl,
      pierceCount: cfg.pierceCount,
      knockback: cfg.knockback,
      matKey: 'melee',
    });
  } else if (player.formId === 3) {
    triggerShake(0.22, 0.12);
    spawn3DParticles(new THREE.Vector3(player.pos.x, player.pos.y - 0.6, 0), 12, 0xb45309, 6.0, 0.22, 0.35);
    spawnProjectile({
      owner: 'player',
      kind: 'melee',
      shape: 'aabb',
      x: player.pos.x + player.facing * 0.6,
      y: player.pos.y,
      vx: 0,
      vy: 0,
      w: cfg.attackW,
      h: cfg.attackH,
      damage: cfg.attackDamage,
      ttl: cfg.attackTtl,
      pierceCount: cfg.pierceCount,
      knockback: cfg.knockback,
      matKey: 'melee',
    });
  } else if (player.formId === 5) {
    spawnProjectile({
      owner: 'player',
      kind: 'bee',
      shape: 'circle',
      x: player.pos.x + player.facing * 0.6,
      y: player.pos.y,
      vx: player.facing * cfg.attackSpeed,
      vy: 0,
      radius: cfg.attackRadius,
      damage: cfg.attackDamage,
      ttl: cfg.attackTtl,
      pierceCount: cfg.pierceCount,
      knockback: cfg.knockback,
      matKey: 'bee',
    });
  }
}

function updatePlayerPhysics(dt) {
  const cfg = FORM_CONFIGS[player.formId];
  const weather = STAGE_WEATHER[stageIndex];

  if (player.iFrameTimer > 0) player.iFrameTimer = Math.max(0, player.iFrameTimer - dt);
  if (player.attackCooldown > 0) player.attackCooldown = Math.max(0, player.attackCooldown - dt);
  if (player.dashTimer > 0) player.dashTimer = Math.max(0, player.dashTimer - dt);

  if (player.stunTimer > 0) {
    player.stunTimer = Math.max(0, player.stunTimer - dt);
    player.vel.x = 0;
  } else {
    const right = keys['KeyD'] || keys['ArrowRight'] ? 1 : 0;
    const left = keys['KeyA'] || keys['ArrowLeft'] ? 1 : 0;
    const dirX = right - left;

    if (dirX !== 0) {
      player.facing = dirX;
      player.mesh.rotation.y = dirX > 0 ? 0 : Math.PI;
    }

    const spdMult = 1 + (playerStats.spdLevel - 1) * 0.06;
    if (player.dashTimer > 0 && player.formId === 4) {
      player.vel.x = player.facing * 22.0 * spdMult;
      player.vel.y = 0;
    } else {
      const baseSpd = devMode ? Math.max(cfg.moveSpeed, 12.0) : cfg.moveSpeed;
      player.vel.x = dirX * baseSpd * spdMult;
    }

    // Jump / Fly
    const jumpHeld = keys['KeyW'] || keys['Space'] || keys['ArrowUp'];
    const downHeld = keys['KeyS'] || keys['ArrowDown'];
    if (devMode) {
      player.vel.y = ((jumpHeld ? 1 : 0) - (downHeld ? 1 : 0)) * 10.0;
    } else if (player.formId === 5) {
      if (jumpHeld) {
        player.vel.y = 6.5;
      } else {
        player.vel.y = Math.max(-5.5, player.vel.y - 14.0 * dt);
      }
    } else if (jumpJustPressed && player.jumpsLeft > 0) {
      player.vel.y = cfg.jumpVel;
      player.jumpsLeft--;
      player.isGrounded = false;
      WebAudioSynth.playJump();
    }
  }

  // Gravity (skip during Dev Mode, Fox dash, or Bee flight)
  if (!devMode && !(player.dashTimer > 0 && player.formId === 4) && player.formId !== 5) {
    player.vel.y = Math.max(MAX_FALL_SPEED, player.vel.y + GRAVITY * (cfg.gravityScale || 1.0) * dt);
  }

  const prevBottom = player.pos.y - cfg.h * 0.5;
  player.pos.x += player.vel.x * dt;
  player.pos.y += player.vel.y * dt;
  player.pos.z = 0;

  // Stage X bounds
  if (stageIndex === 5) {
    player.pos.x = Math.max(ARENA_BOUNDS.minX + cfg.w * 0.5, Math.min(ARENA_BOUNDS.maxX - cfg.w * 0.5, player.pos.x));
    player.pos.y = Math.min(devMode ? 16.0 : ARENA_BOUNDS.maxY, player.pos.y);
  } else {
    player.pos.x = Math.max(weather.minX + cfg.w * 0.5, Math.min(weather.maxX - cfg.w * 0.5, player.pos.x));
    player.pos.y = Math.min(devMode ? 16.0 : 11.0, player.pos.y);
  }

  // RockObstacle horizontal collision
  for (const r of rocks) {
    if (
      Math.abs(player.pos.x - r.pos.x) < (cfg.w + r.w) * 0.5 &&
      Math.abs(player.pos.y - r.pos.y) < (cfg.h + r.h) * 0.5
    ) {
      if (player.pos.x < r.pos.x) {
        player.pos.x = r.pos.x - (cfg.w + r.w) * 0.5;
      } else {
        player.pos.x = r.pos.x + (cfg.w + r.w) * 0.5;
      }
      player.vel.x = 0;
    }
  }

  // Full-height Spike Gates (blocks flying over/under; only Fox [4] Dash passes through spike gap)
  for (const sg of spikeGates) {
    if (Math.abs(player.pos.x - sg.x) < (cfg.w + sg.w) * 0.5) {
      const pTop = player.pos.y + cfg.h * 0.5;
      const pBot = player.pos.y - cfg.h * 0.5;
      const hitsTopOrBottomPillar = pTop > sg.gapTopY || pBot < sg.gapBottomY;
      const isFoxDashing = player.formId === 4 && player.dashTimer > 0;
      if (hitsTopOrBottomPillar || !isFoxDashing) {
        if (!hitsTopOrBottomPillar && !isFoxDashing) {
          damagePlayer(null);
        }
        if (player.pos.x < sg.x) {
          player.pos.x = sg.x - (cfg.w + sg.w) * 0.5;
        } else {
          player.pos.x = sg.x + (cfg.w + sg.w) * 0.5;
        }
        player.vel.x = 0;
      }
    }
  }

  // Platform landing collision
  player.isGrounded = false;
  const newBottom = player.pos.y - cfg.h * 0.5;
  if (player.vel.y <= 0) {
    for (const pf of platforms) {
      const withinX = player.pos.x + cfg.w * 0.42 > pf.x1 && player.pos.x - cfg.w * 0.42 < pf.x2;
      if (withinX && prevBottom >= pf.topY - 0.55 && newBottom <= pf.topY) {
        player.pos.y = pf.topY + cfg.h * 0.5;
        player.vel.y = 0;
        player.isGrounded = true;
        player.jumpsLeft = cfg.maxJumps;
        break;
      }
    }
  }

  // Progress score every 10.0 units
  if (stageIndex < 5 && player.pos.x > maxReachedX) {
    maxReachedX = player.pos.x;
    if (maxReachedX - lastScoreMilestoneX >= 10.0) {
      lastScoreMilestoneX += 10.0;
      addScore(50 * twistMultiplier);
    }
  }

  // Flood drown check
  if (!devMode && player.pos.y < weather.floodLevelY) {
    triggerGameOver('Bạn đã bị nước lũ Thiên Đình nhấn chìm!');
    return;
  }

  // Visual updates on player mesh
  player.mesh.position.copy(player.pos);
  playerPointLight.position.set(player.pos.x, player.pos.y + 0.8, 2.0);
  if (player.iFrameTimer > 0) {
    player.mesh.visible = Math.floor(player.iFrameTimer * 20) % 2 === 0;
  } else {
    player.mesh.visible = true;
  }

  // Bee wings visuals
  const beeGroup = player.mesh.userData.forms[5];
  if (beeGroup && beeGroup.userData.wings) {
    const flap = Math.sin(elapsed * 32) * 0.45;
    beeGroup.userData.wings[0].rotation.x = 0.25 + flap;
    beeGroup.userData.wings[1].rotation.x = -0.25 - flap;
  }
}

function updateEnemies(dt) {
  for (let i = enemies.length - 1; i >= 0; i--) {
    const en = enemies[i];

    if (en.flashTimer > 0) {
      en.flashTimer = Math.max(0, en.flashTimer - dt);
      const hex = en.flashTimer > 0 ? 0xffffff : 0x000000;
      for (const m of en.mesh.userData.flashMaterials) {
        m.emissive.setHex(hex);
      }
    }

    if (en.stunTimer > 0) {
      en.stunTimer = Math.max(0, en.stunTimer - dt);
      en.mesh.position.copy(en.pos);
      continue;
    }

    const dx = player.pos.x - en.pos.x;
    const absDx = Math.abs(dx);

    if (en.type === 'minion') {
      if (absDx < 9.0) {
        en.vel.x = Math.sign(dx || 1) * en.speed;
      } else {
        if (en.pos.x <= en.patrolMinX) en.vel.x = en.speed;
        if (en.pos.x >= en.patrolMaxX) en.vel.x = -en.speed;
      }
      en.pos.x += en.vel.x * dt;
      en.pos.x = Math.max(en.patrolMinX, Math.min(en.patrolMaxX, en.pos.x));
    } else if (en.type === 'elite') {
      if (en.chargeTimer > 0) {
        en.chargeTimer -= dt;
        en.pos.x += en.vel.x * dt;
      } else if (en.telegraphTimer > 0) {
        en.telegraphTimer -= dt;
        for (const m of en.mesh.userData.flashMaterials) m.emissive.setHex(0xef4444);
        if (en.telegraphTimer <= 0) {
          for (const m of en.mesh.userData.flashMaterials) m.emissive.setHex(0x000000);
          en.chargeTimer = 0.35;
          en.vel.x = Math.sign(dx || 1) * 11.0;
        }
      } else {
        en.aiTimer += dt;
        if (absDx > 5.0 && absDx < 9.0) {
          en.pos.x += Math.sign(dx) * en.speed * dt;
        }
        if (en.aiTimer >= 2.4 && absDx < 10.0) {
          en.aiTimer = 0;
          en.telegraphTimer = 0.4;
        }
      }
      en.pos.x = Math.max(en.patrolMinX, Math.min(en.patrolMaxX, en.pos.x));
    } else if (en.type === 'darkcloud') {
      en.pos.x += en.vel.x * dt;
      if (en.pos.x <= en.patrolMinX) en.vel.x = en.speed;
      if (en.pos.x >= en.patrolMaxX) en.vel.x = -en.speed;
      en.pos.y = en.baseY + Math.sin(elapsed * 2.0 + en.id) * 0.5;

      en.aiTimer += dt;
      if (en.aiTimer >= 2.6 && absDx < 16.0) {
        en.aiTimer = 0;
        spawnProjectile({
          owner: 'enemy',
          kind: 'cloudBolt',
          shape: 'circle',
          x: en.pos.x,
          y: en.pos.y - 0.6,
          vx: 0,
          vy: -11.0,
          radius: 0.32,
          damage: 1,
          ttl: 1.5,
          pierceCount: 1,
          matKey: 'enemy',
        });
      }
    }

    en.mesh.rotation.y = en.vel.x >= 0 ? 0 : Math.PI;
    en.mesh.position.copy(en.pos);
  }
}

function updateBoss(dt) {
  if (!boss) return;

  if (boss.flashTimer > 0) {
    boss.flashTimer = Math.max(0, boss.flashTimer - dt);
    const hex = boss.flashTimer > 0 ? 0xffffff : 0x000000;
    for (const m of boss.mesh.userData.flashMaterials) {
      m.emissive.setHex(hex);
    }
  }

  boss.pos.x = Math.sin(elapsed * 0.9) * 2.5;
  boss.pos.y = 4.8 + Math.sin(elapsed * 1.8) * 0.25;
  boss.mesh.position.copy(boss.pos);
  if (boss.mesh.userData.drum) {
    boss.mesh.userData.drum.rotation.z += dt * 0.6;
  }
  if (boss.mesh.userData.armorShell) {
    boss.mesh.userData.armorShell.visible = boss.armorHp > 0;
  }

  // Boss 3-attack cycle every 2.5s
  boss.attackTimer -= dt;
  if (boss.attackTimer <= 0) {
    boss.attackTimer = 2.5;
    const pat = boss.attackPattern % 3;
    boss.attackPattern++;

    if (pat === 0) {
      // 1. Sét Dọc Trống Mưa: 3 red telegraph pillars (1.4u wide)
      const xs = [player.pos.x, -7 + Math.random() * 6, 1 + Math.random() * 6];
      for (const px of xs) {
        const pillarMat = new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.35 });
        const pillarMesh = new THREE.Mesh(sharedBoxGeo, pillarMat);
        pillarMesh.scale.set(1.4, 12.0, 0.5);
        pillarMesh.position.set(px, 4.0, -0.2);
        stageGroup.add(pillarMesh);
        bossLightningPillars.push({ x: px, timer: 0.75, activeTime: 0.30, struck: false, mesh: pillarMesh });
      }
    } else if (pat === 1) {
      // 2. Sóng Xung Kích Trống Sấm: 2 orbs along floor y = 0.8
      spawnProjectile({
        owner: 'enemy',
        kind: 'bossOrb',
        shape: 'circle',
        x: boss.pos.x - 1.2,
        y: 0.8,
        vx: -10.5,
        vy: 0,
        radius: 0.48,
        damage: 1,
        ttl: 2.2,
        pierceCount: 1,
        matKey: 'bossOrb',
      });
      spawnProjectile({
        owner: 'enemy',
        kind: 'bossOrb',
        shape: 'circle',
        x: boss.pos.x + 1.2,
        y: 0.8,
        vx: 10.5,
        vy: 0,
        radius: 0.48,
        damage: 1,
        ttl: 2.2,
        pierceCount: 1,
        matKey: 'bossOrb',
      });
    } else {
      // 3. Triệu Hồi Mây Đen (max 2)
      const currentClouds = enemies.filter((e) => e.type === 'darkcloud').length;
      const toSpawn = Math.min(2 - currentClouds, 2);
      for (let c = 0; c < toSpawn; c++) {
        const cx = (c === 0 ? -6.5 : 6.5) + (Math.random() - 0.5) * 2;
        const cfg = ENEMY_CONFIGS.darkcloud;
        const mesh = createEnemyMesh('darkcloud');
        mesh.position.set(cx, 5.5, 0);
        stageGroup.add(mesh);
        enemies.push({
          id: Date.now() + c,
          type: 'darkcloud',
          mesh,
          pos: new THREE.Vector3(cx, 5.5, 0),
          vel: new THREE.Vector3(cfg.speed * (c === 0 ? 1 : -1), 0, 0),
          w: cfg.w,
          h: cfg.h,
          hp: cfg.hp,
          maxHp: cfg.hp,
          speed: cfg.speed,
          scoreReward: cfg.scoreReward,
          colorHex: cfg.colorHex,
          patrolMinX: -11,
          patrolMaxX: 11,
          baseY: 5.5,
          stunTimer: 0,
          flashTimer: 0,
          aiTimer: 0.5,
        });
      }
    }
  }

  // Update Boss Lightning Pillars
  for (let i = bossLightningPillars.length - 1; i >= 0; i--) {
    const pil = bossLightningPillars[i];
    if (!pil.struck) {
      pil.timer -= dt;
      if (pil.timer <= 0) {
        pil.struck = true;
        pil.mesh.material.color.setHex(0xfef08a);
        pil.mesh.material.opacity = 0.88;
        WebAudioSynth.playLightning();
        triggerShake(0.20, 0.12);
      }
    } else {
      pil.activeTime -= dt;
      // Check player hit by lightning pillar
      const pCfg = FORM_CONFIGS[player.formId];
      if (Math.abs(player.pos.x - pil.x) < (1.4 + pCfg.w) * 0.5 && player.pos.y < 10.0 && player.pos.y > -2.0) {
        damagePlayer(null);
      }
      if (pil.activeTime <= 0) {
        stageGroup.remove(pil.mesh);
        bossLightningPillars.splice(i, 1);
      }
    }
  }
}

function updateProjectiles(dt) {
  for (const p of projectilePool) {
    if (!p.active) continue;
    p.ttl -= dt;
    p.pos.x += p.vel.x * dt;
    p.pos.y += p.vel.y * dt;
    p.mesh.position.copy(p.pos);

    if (p.ttl <= 0 || p.pierceCount <= 0 || Math.abs(p.pos.x - camX) > 18) {
      p.active = false;
      p.mesh.visible = false;
    }
  }
}

function damagePlayer(hazardBullet) {
  if (devMode) return;
  // Step 1: Perfect Morph (highest priority)
  if (player.perfectMorphWindow > 0) {
    triggerPerfectMorph(hazardBullet);
    return;
  }
  // Step 2: Fox Dash immunity
  if (player.formId === 4 && player.dashTimer > 0) {
    return;
  }
  // Step 4: Take Damage
  if (player.iFrameTimer > 0) return;

  let dmg = player.formId === 4 ? 2 : 1;
  if (player.formId === 3) {
    dmg = Math.max(1, Math.ceil(dmg * 0.5));
  }
  player.hp = Math.max(0, player.hp - dmg);

  if (player.formId === 5) {
    // Bee is fragile: knockback & force back to Frog [1]
    switchForm(1, false);
    player.vel.y = 6.0;
    player.vel.x = -player.facing * 5.0;
  }

  player.iFrameTimer = player.formId === 3 ? 1.3 : 1.0;
  twistMultiplier = 1;
  hitStopTimer = 0.08;
  triggerShake(0.45, 0.25);
  spawn3DParticles(player.pos, 14, 0xef4444, 7.0, 0.22, 0.45);
  WebAudioSynth.playPlayerDamaged();

  if (hazardBullet) {
    hazardBullet.active = false;
    hazardBullet.mesh.visible = false;
  }

  if (player.hp <= 0) {
    triggerGameOver('Bạn đã hết sinh lực trước Thiên Đình!');
  }
}

function updateCollisions() {
  const pCfg = FORM_CONFIGS[player.formId];

  // 1. Player Projectiles / Melee vs Enemies, Rocks, Cage, Boss
  for (const p of projectilePool) {
    if (!p.active || p.owner !== 'player') continue;

    // vs Enemies
    for (let i = enemies.length - 1; i >= 0; i--) {
      const en = enemies[i];
      if (p.hitIds.has(en.id)) continue;

      const hit =
        p.shape === 'aabb'
          ? Math.abs(p.pos.x - en.pos.x) < (p.w + en.w) * 0.5 && Math.abs(p.pos.y - en.pos.y) < (p.h + en.h) * 0.5
          : Math.hypot(p.pos.x - en.pos.x, p.pos.y - en.pos.y) < p.radius + Math.max(en.w, en.h) * 0.45;

      if (hit) {
        p.hitIds.add(en.id);
        p.pierceCount--;
        const eliteMult =
          en.type === 'elite' && player.formId !== 2 && player.formId !== 3 ? 0.6 : 1.0;
        en.hp -= p.damage * eliteMult;
        en.flashTimer = 0.07;
        if (p.stunEnemy > 0) en.stunTimer = Math.max(en.stunTimer, p.stunEnemy);
        const dir = Math.sign(en.pos.x - player.pos.x) || 1;
        en.pos.x = Math.max(en.patrolMinX, Math.min(en.patrolMaxX, en.pos.x + dir * p.knockback * 0.12));

        hitStopTimer = 0.04;
        triggerShake(0.22, 0.12);
        spawn3DParticles(en.pos, 10, 0xffffff, 6.5, 0.18, 0.35);
        WebAudioSynth.playHitEnemy();

        if (en.hp <= 0) {
          spawn3DParticles(en.pos, 14, en.colorHex, 7.0, 0.25, 0.50);
          addScore(en.scoreReward * twistMultiplier);
          playerStats.skillPoints += en.type === 'elite' ? 2 : 1;
          if (Math.random() < 0.20) {
            spawnHealthDrop(en.pos);
          }
          stageGroup.remove(en.mesh);
          enemies.splice(i, 1);
        }
      }
    }

    // vs Breakable Rocks (Bear [3] slam)
    if (player.formId === 3 && p.kind === 'melee') {
      for (let i = rocks.length - 1; i >= 0; i--) {
        const r = rocks[i];
        const hit = Math.abs(p.pos.x - r.pos.x) < (p.w + r.w) * 0.5 && Math.abs(p.pos.y - r.pos.y) < (p.h + r.h) * 0.5;
        if (hit && !p.hitIds.has(r)) {
          p.hitIds.add(r);
          r.hp -= p.damage;
          spawn3DParticles(r.pos, 14, 0x92400e, 7.5, 0.25, 0.45);
          if (r.hp <= 0) {
            stageGroup.remove(r.mesh);
            rocks.splice(i, 1);
          }
        }
      }
    }

    // vs Spirit Cage
    if (cage && !p.hitIds.has('cage')) {
      const hit =
        p.shape === 'aabb'
          ? Math.abs(p.pos.x - cage.pos.x) < (p.w + cage.w) * 0.5 && Math.abs(p.pos.y - cage.pos.y) < (p.h + cage.h) * 0.5
          : Math.hypot(p.pos.x - cage.pos.x, p.pos.y - cage.pos.y) < p.radius + 1.1;
      if (hit) {
        p.hitIds.add('cage');
        p.pierceCount--;
        cage.hp -= p.damage;
        const cageCol = cage.unlockFormId ? FORM_CONFIGS[cage.unlockFormId].colorHex : 0xfacc15;
        spawn3DParticles(cage.pos, 10, cageCol, 6.0, 0.2, 0.4);
        WebAudioSynth.playHitEnemy();
        if (cage.hp <= 0) {
          rescueCage();
        }
      }
    }

    // vs Boss Ông Trời
    if (boss && !p.hitIds.has('boss')) {
      const hit =
        p.shape === 'aabb'
          ? Math.abs(p.pos.x - boss.pos.x) < (p.w + boss.w) * 0.5 && Math.abs(p.pos.y - boss.pos.y) < (p.h + boss.h) * 0.5
          : Math.hypot(p.pos.x - boss.pos.x, p.pos.y - boss.pos.y) < p.radius + 2.4;
      if (hit) {
        p.hitIds.add('boss');
        p.pierceCount--;
        let dmg = p.damage;
        if (boss.armorHp > 0) {
          const armorMult = player.formId === 2 || player.formId === 3 ? 2.0 : 0.5;
          boss.armorHp = Math.max(0, boss.armorHp - dmg * armorMult);
          if (boss.armorHp <= 0 && !boss.armorBroken) {
            boss.armorBroken = true;
            hitStopTimer = 0.05;
            triggerShake(0.50, 0.25);
            spawn3DParticles(boss.pos, 24, 0xf97316, 10.0, 0.30, 0.55);
            WebAudioSynth.playBreakArmor();
          }
        } else {
          boss.hp = Math.max(0, boss.hp - dmg);
        }
        boss.flashTimer = 0.07;
        addScore(500 * twistMultiplier);
        hitStopTimer = 0.04;
        triggerShake(0.22, 0.12);
        spawn3DParticles(p.pos, 10, 0xffffff, 6.5, 0.18, 0.35);
        WebAudioSynth.playHitEnemy();

        if (boss.hp <= 0) {
          triggerVictory();
          return;
        }
      }
    }
  }

  // 2. Enemy / EnemyBullet / SpikeTrap vs Player
  for (const p of projectilePool) {
    if (!p.active || p.owner !== 'enemy') continue;
    const hit = Math.hypot(p.pos.x - player.pos.x, p.pos.y - player.pos.y) < p.radius + Math.max(pCfg.w, pCfg.h) * 0.45;
    if (hit) {
      damagePlayer(p);
    }
  }

  for (const en of enemies) {
    if (en.stunTimer > 0) continue;
    const hit =
      Math.abs(player.pos.x - en.pos.x) < (pCfg.w + en.w) * 0.45 &&
      Math.abs(player.pos.y - en.pos.y) < (pCfg.h + en.h) * 0.45;
    if (hit) {
      damagePlayer(null);
    }
  }

  for (const s of spikes) {
    const hit =
      Math.abs(player.pos.x - s.pos.x) < (pCfg.w + s.w) * 0.48 &&
      Math.abs(player.pos.y - s.pos.y) < (pCfg.h + s.h) * 0.48;
    if (hit) {
      damagePlayer(null);
    }
  }
}

function rescueCage() {
  const newForm = cage.unlockFormId;
  if (newForm && !player.unlockedForms.includes(newForm)) {
    player.unlockedForms.push(newForm);
  }
  const sealIdx = stageIndex; // 0..3 -> sealSlots[0..3]
  if (sealSlots[sealIdx]) {
    sealSlots[sealIdx].classList.add('unlocked');
  }

  addScore(1000 * twistMultiplier);
  playerStats.skillPoints += 2;
  player.hp = Math.min(player.maxHp, player.hp + 1);
  WebAudioSynth.playRescue();
  const burstColor = newForm ? FORM_CONFIGS[newForm].colorHex : 0xfacc15;
  spawn3DParticles(cage.pos, 26, burstColor, 9.0, 0.25, 0.65);

  // Freeze time and open Stage-Clear Upgrade Popup
  pendingNextStage = stageIndex + 1;
  gameState = GameState.UPGRADE_POPUP;
  refreshUpgradePopupUI();
  updateHUD();
  upgradeOverlay.classList.remove('hidden');
}

function updateParticlesAndShockwaves(dt) {
  for (const p of particlePool) {
    if (!p.active) continue;
    p.life -= dt;
    p.vel.y += p.gravity * dt;
    p.mesh.position.x += p.vel.x * dt;
    p.mesh.position.y += p.vel.y * dt;
    p.mesh.position.z += p.vel.z * dt;
    p.mesh.material.opacity = Math.max(0, p.life / p.maxLife);
    if (p.life <= 0) {
      p.active = false;
      p.mesh.visible = false;
    }
  }

  for (let i = shockwaves.length - 1; i >= 0; i--) {
    const sw = shockwaves[i];
    sw.timer += dt;
    const t = Math.min(1, sw.timer / sw.duration);
    sw.mesh.scale.setScalar(0.5 + t * 5.0);
    sw.mesh.material.opacity = 1 - t;
    if (sw.timer >= sw.duration) {
      scene.remove(sw.mesh);
      shockwaves.splice(i, 1);
    }
  }
}

function spawnHealthDrop(pos) {
  const mesh = new THREE.Mesh(sharedBoxGeo, healthDropMat);
  mesh.scale.setScalar(0.55);
  mesh.position.set(pos.x, pos.y + 0.2, 0);
  stageGroup.add(mesh);
  healthDrops.push({
    pos: new THREE.Vector3(pos.x, pos.y + 0.2, 0),
    baseY: pos.y + 0.2,
    mesh,
  });
}

function updateHealthDrops(dt) {
  const pCfg = FORM_CONFIGS[player.formId];
  for (let i = healthDrops.length - 1; i >= 0; i--) {
    const hd = healthDrops[i];
    hd.pos.y = hd.baseY + Math.sin(elapsed * 4.5 + i) * 0.22;
    hd.mesh.position.copy(hd.pos);
    hd.mesh.rotation.y += dt * 2.5;

    const hit =
      Math.abs(player.pos.x - hd.pos.x) < (pCfg.w + 0.7) * 0.5 &&
      Math.abs(player.pos.y - hd.pos.y) < (pCfg.h + 0.7) * 0.5;
    if (hit) {
      player.hp = Math.min(player.maxHp, player.hp + 1);
      spawn3DParticles(hd.pos, 14, 0xf43f5e, 6.0, 0.20, 0.45);
      WebAudioSynth.playHeal();
      stageGroup.remove(hd.mesh);
      healthDrops.splice(i, 1);
    }
  }
}

function updateTrollTraps(dt) {
  if (difficultyMode !== DifficultyMode.DEVIL) return;
  const pCfg = FORM_CONFIGS[player.formId];
  const pBottom = player.pos.y - pCfg.h * 0.5;

  for (const pf of platforms) {
    if (!pf.trollType) continue;

    if (pf.trollType === 'fall' || pf.trollType === 'fall_respawn') {
      if (pf.trollState === 'idle') {
        const onTop =
          player.isGrounded &&
          player.pos.x + pCfg.w * 0.4 > pf.x1 &&
          player.pos.x - pCfg.w * 0.4 < pf.x2 &&
          Math.abs(pBottom - pf.topY) < 0.35;
        if (onTop) {
          pf.trollState = 'shake';
          pf.trollTimer = 0.24;
          WebAudioSynth.playHitEnemy();
        }
      } else if (pf.trollState === 'shake') {
        pf.trollTimer -= dt;
        pf.mesh.position.x = pf.origCx + (Math.random() - 0.5) * 0.24;
        if (pf.trollTimer <= 0) {
          pf.trollState = 'active';
          pf.trollTimer = 3.5;
          pf.mesh.position.x = pf.origCx;
          spawn3DParticles(new THREE.Vector3(pf.origCx, pf.topY, 0), 10, 0xef4444, 5.0, 0.2, 0.4);
        }
      } else if (pf.trollState === 'active') {
        pf.topY -= 16.0 * dt;
        pf.mesh.position.y -= 16.0 * dt;
        pf.trollTimer -= dt;
        if (pf.trollType === 'fall_respawn' && pf.trollTimer <= 0) {
          pf.topY = pf.origTopY;
          pf.mesh.position.set(pf.origCx, pf.origCy, 0);
          pf.trollState = 'idle';
        }
      }
    } else if (pf.trollType === 'slide') {
      if (pf.trollState === 'idle') {
        if (Math.abs(player.pos.x - pf.origCx) < (pf.x2 - pf.x1) * 0.5 + 2.0 && player.pos.y > pf.topY - 1.5) {
          pf.trollState = 'active';
          pf.trollTimer = 4.2; // distance to slide
          WebAudioSynth.playJump();
        }
      } else if (pf.trollState === 'active') {
        const step = Math.min(pf.trollTimer, 18.0 * dt);
        const dx = step * pf.slideDir;
        pf.x1 += dx;
        pf.x2 += dx;
        pf.mesh.position.x += dx;
        pf.trollTimer -= step;
        if (pf.trollTimer <= 0) {
          pf.trollState = 'done';
        }
      }
    }
  }

  for (const trap of trollTraps) {
    if (trap.type === 'popupSpike') {
      if (!trap.triggered && Math.abs(player.pos.x - trap.x) < 2.8) {
        trap.triggered = true;
        spawn3DParticles(new THREE.Vector3(trap.x, 0.2, 0), 10, 0xef4444, 6.0, 0.18, 0.35);
        WebAudioSynth.playAttack(2);
      }
      if (trap.triggered && trap.spikeObj.pos.y < trap.targetY) {
        trap.spikeObj.pos.y = Math.min(trap.targetY, trap.spikeObj.pos.y + 18.0 * dt);
        trap.spikeObj.mesh.position.y = trap.spikeObj.pos.y;
      }
    }
  }
}

function updateWeatherAndFlood(dt) {
  const weather = gameState === GameState.MENU ? STAGE_WEATHER[0] : STAGE_WEATHER[stageIndex];

  // Rain Pool
  if (gameState !== GameState.VICTORY) {
    for (let i = 0; i < MAX_RAIN; i++) {
      const drop = rainPool[i];
      if (i < weather.rainCount) {
        drop.visible = true;
        drop.position.x += weather.rainVelX * dt;
        drop.position.y += weather.rainVelY * dt;
        if (drop.position.y < -6.5) {
          drop.position.y = 11.5 + Math.random() * 2;
          drop.position.x = camX + (Math.random() - 0.5) * 36;
        }
        if (drop.position.x < camX - 18) drop.position.x += 36;
      } else {
        drop.visible = false;
      }
    }
  }

  // Lightning flash in Stages 3-5
  if (gameState === GameState.PLAYING && weather.lightningInterval > 0) {
    lightningTimer -= dt;
    if (lightningTimer <= 0) {
      lightningTimer = weather.lightningInterval;
      lightningFlash = 0.22;
      WebAudioSynth.playLightning();
    }
  }
  if (lightningFlash > 0) {
    lightningFlash = Math.max(0, lightningFlash - dt);
    const f = lightningFlash / 0.22;
    ambientLight.intensity = weather.ambientIntensity + f * 1.4;
    lightningFlashOverlay.style.opacity = String(f * 0.45);
    if (gameState !== GameState.CUTSCENE_DRAGON && gameState !== GameState.VICTORY && !stageBgTextures[stageIndex]) {
      skyColor.setHex(f > 0.5 ? 0x64748b : weather.skyHex);
      scene.background = skyColor;
    }
  } else if (gameState === GameState.PLAYING) {
    ambientLight.intensity = weather.ambientIntensity;
    lightningFlashOverlay.style.opacity = '0';
    if (!stageBgTextures[stageIndex]) {
      skyColor.setHex(weather.skyHex);
      scene.background = skyColor;
    }
  }

  // Flood Water level
  const targetWaterY =
    gameState === GameState.VICTORY
      ? -8.0 - 5.0
      : weather.floodLevelY - 5.0 + Math.sin(elapsed * 2.5) * 0.12;
  floodWaterMesh.position.x = camX;
  floodWaterMesh.position.y += (targetWaterY - floodWaterMesh.position.y) * (1 - Math.exp(-3.0 * dt));
}

function updateCameraJuice(dt) {
  const weather = STAGE_WEATHER[stageIndex];
  let targetCamX = camX;

  if (gameState === GameState.MENU) {
    targetCamX = Math.sin(elapsed * 0.4) * 3.0;
    camX = targetCamX;
  } else if (gameState === GameState.PLAYING || gameState === GameState.CUTSCENE_DRAGON) {
    if (stageIndex === 5 || gameState === GameState.CUTSCENE_DRAGON) {
      targetCamX = 0.0;
    } else {
      targetCamX = Math.max(weather.minX + 14.2, Math.min(weather.maxX - 14.2, player.pos.x + 3.5));
    }
    camX += (targetCamX - camX) * (1 - Math.exp(-8.0 * dt));
  }

  let shakeOffsetX = 0;
  let shakeOffsetY = 0;
  if (shakeTimer > 0) {
    shakeTimer = Math.max(0, shakeTimer - dt);
    const mag = shakeIntensity * (shakeTimer / Math.max(0.01, shakeDuration));
    shakeOffsetX = (Math.random() * 2 - 1) * mag;
    shakeOffsetY = (Math.random() * 2 - 1) * mag;
  }

  camera.position.set(camX + shakeOffsetX, 2.0 + shakeOffsetY, 22.0);
  camera.lookAt(camX + shakeOffsetX, 1.5 + shakeOffsetY, 0.0);

  // Follow directional light & parallax layers
  dirLight.position.set(camX + 8, 16, 12);
  dirLight.target.position.set(camX, 0, 0);
  dirLight.target.updateMatrixWorld();

  parallax1.position.x = camX * 0.85;
  parallax2.position.x = camX * 0.55;
  parallax3.position.x = camX * 0.25;
}

function updateHUD() {
  const cfg = FORM_CONFIGS[player.formId];
  formBadgeEl.textContent = `DẠNG [${player.formId}]: ${cfg.name.toUpperCase()}`;
  formBadgeEl.style.color = cfg.cssColor;
  formBadgeEl.style.borderColor = cfg.cssColor;

  hpBarFill.style.width = `${(player.hp / player.maxHp) * 100}%`;
  hpHeartsEl.textContent = '❤️'.repeat(player.hp) + '🖤'.repeat(player.maxHp - player.hp);

  const spiritPct = (player.spiritEnergy / player.maxSpirit) * 100;
  twistBarFill.style.width = `${spiritPct}%`;
  twistBarFill.style.background = spiritPct < 20 ? '#ef4444' : cfg.cssColor;
  twistBarFill.classList.toggle('low-spirit', spiritPct < 20);
  twistValueText.textContent = `LINH KHÍ: ${Math.round(player.spiritEnergy)}/${Math.round(player.maxSpirit)}`;

  statSpEl.textContent = `SP: ${playerStats.skillPoints}`;
  statAtkEl.textContent = `ATK Lv.${playerStats.atkLevel}`;
  statSpdEl.textContent = `SPD Lv.${playerStats.spdLevel}`;
  statHpEl.textContent = `HP Lv.${playerStats.hpLevel}`;
  statSpiritEl.textContent = `LK Lv.${playerStats.spiritLevel}`;

  scoreValueEl.textContent = `SCORE: ${Math.floor(score).toLocaleString()}`;
  highScoreValueEl.textContent = `BEST: ${Math.max(highScore, Math.floor(score)).toLocaleString()}`;

  if (twistMultiplier > 1) {
    comboBadgeEl.textContent = `x${twistMultiplier} PERFECT!`;
    comboBadgeEl.style.opacity = '1';
  } else {
    comboBadgeEl.textContent = 'x1';
    comboBadgeEl.style.opacity = '0.45';
  }

  for (let i = 1; i <= 5; i++) {
    const slot = formSlots[i - 1];
    if (!slot) continue;
    const unlocked = player.unlockedForms.includes(i);
    slot.classList.toggle('locked', !unlocked);
    slot.classList.toggle('active', player.formId === i);
  }

  if (boss && stageIndex === 5) {
    bossHpFill.style.width = `${(boss.hp / boss.maxHp) * 100}%`;
    bossArmorFill.style.width = `${(boss.armorHp / boss.maxArmorHp) * 100}%`;
    bossHpText.textContent =
      boss.armorHp > 0
        ? `ÔNG TRỜI: ${boss.hp.toFixed(1)}/${boss.maxHp} | GIÁP TRỐNG SẤM: ${boss.armorHp.toFixed(1)}`
        : `ÔNG TRỜI: ${boss.hp.toFixed(1)}/${boss.maxHp} (VỠ GIÁP!)`;
  }
}

// =========================================================
// MAIN ANIMATION LOOP (60 FPS)
// =========================================================
const clock = new THREE.Clock();
menuBestEl.textContent =
  highScore > 0
    ? `Kỷ lục: ${highScore.toLocaleString()} điểm` + (fastestTime > 0 ? ` | Thời gian nhanh nhất: ${fastestTime}s` : '')
    : 'Chưa có kỷ lục — Hãy là người đầu tiên triệu hồi Long Thần!';

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
  requestAnimationFrame(animate);
  const dt = Math.min(clock.getDelta(), 0.05);

  if (gameState === GameState.UPGRADE_POPUP || gameState === GameState.PAUSED) {
    // Freeze time while Stage-Clear Upgrade Popup or Pause Overlay is open
    renderer.render(scene, camera);
    return;
  }

  elapsed += dt;

  if (gameState === GameState.MENU) {
    player.mesh.position.set(0, -0.5 + Math.sin(elapsed * 3.0) * 0.15, 0);
    player.mesh.rotation.y = Math.sin(elapsed * 0.8) * 0.35;
    playerPointLight.position.set(0, 0.5, 2.0);
    updateWeatherAndFlood(dt);
    updateCameraJuice(dt);
    renderer.render(scene, camera);
    return;
  }

  if (gameState === GameState.CUTSCENE_DRAGON) {
    cutsceneTimer -= dt;
    const progress = 1 - Math.max(0, cutsceneTimer / 7.0);

    // Animate all 5 animal allies cheering & rising slightly
    for (let i = 0; i < cutsceneAllies.length; i++) {
      const ally = cutsceneAllies[i];
      ally.position.y = -0.4 + Math.abs(Math.sin(elapsed * 5.0 + i * 0.9)) * 0.45;
      if (progress > 0.72) {
        ally.position.y += (progress - 0.72) * 16.0;
      }
    }

    if (cutsceneTimer < 3.6) {
      dragonSpeakerEl.textContent = '🐉 LONG THẦN:';
      dragonDialogueTextEl.textContent =
        '"Lòng dũng cảm của muôn loài đã thấu trời xanh! Hãy bám chắc, ta sẽ đưa các ngươi vượt mây lên Thiên Đình!"';
    }

    if (dragonMesh) {
      dragonMesh.position.set(0, 0, 0);
      const headX = -14 + progress * 30;
      const headY = -0.5 + Math.sin(progress * Math.PI) * 5.0 + progress * 4.5;
      const headZ = -1.5 + progress * 1.0;
      const segs = dragonMesh.userData.segments;
      for (let i = 0; i < segs.length; i++) {
        const phase = elapsed * 5.5 - i * 0.40;
        segs[i].position.set(
          headX - i * 0.78,
          headY + Math.sin(phase) * 1.25,
          headZ
        );
        segs[i].rotation.z = Math.cos(phase) * 0.24;
      }
      const [l1, l2] = dragonMesh.userData.lights;
      l1.position.set(headX + Math.cos(elapsed * 4.0) * 2.4, headY + Math.sin(elapsed * 4.0) * 2.4, headZ + 1.8);
      l2.position.set(headX + Math.cos(-elapsed * 4.0) * 2.4, headY + Math.sin(-elapsed * 4.0) * 2.4, headZ + 1.8);

      const fxColors = [0xfacc15, 0x38bdf8, 0x4ade80, 0xe879f9];
      const fxCol = fxColors[Math.floor(elapsed * 12) % fxColors.length];
      spawn3DParticles(new THREE.Vector3(headX, headY, headZ), 5, fxCol, 7.5, 0.28, 0.85);
      if (Math.random() < 0.08) {
        spawnShockwave(new THREE.Vector3(headX, headY, headZ));
      }
    }
    updateParticlesAndShockwaves(dt);
    updateWeatherAndFlood(dt);
    updateCameraJuice(dt);
    renderer.render(scene, camera);

    if (cutsceneTimer <= 0) {
      if (dragonMesh) {
        scene.remove(dragonMesh);
        dragonMesh = null;
      }
      dragonDialogueOverlay.classList.add('hidden');
      player.mesh.visible = true;
      loadStage(5);
      gameState = GameState.PLAYING;
    }
    return;
  }

  if (gameState === GameState.VICTORY_SEQUENCE) {
    victorySeqTimer -= dt;
    const t = 1 - Math.max(0, victorySeqTimer / 3.2); // 0 -> 1

    // Phase 1 (0..0.55): Boss shakes, flashes & explodes repeatedly before vanishing
    if (boss) {
      if (t < 0.55) {
        boss.mesh.position.set(
          boss.pos.x + (Math.random() - 0.5) * 0.45,
          boss.pos.y - t * 1.4 + (Math.random() - 0.5) * 0.35,
          0
        );
        boss.mesh.scale.setScalar(Math.max(0.2, 1 - t * 0.6));
        const flashWhite = Math.floor(elapsed * 24) % 2 === 0;
        for (const m of boss.mesh.userData.flashMaterials) {
          m.emissive.setHex(flashWhite ? 0xffffff : 0xf97316);
        }
        victoryBoomTimer -= dt;
        if (victoryBoomTimer <= 0) {
          victoryBoomTimer = 0.16;
          const bx = boss.pos.x + (Math.random() - 0.5) * 3.2;
          const by = boss.pos.y + (Math.random() - 0.5) * 3.6;
          const boomColors = [0xfacc15, 0xf97316, 0xef4444, 0xffffff];
          spawn3DParticles(new THREE.Vector3(bx, by, 0.5), 18, boomColors[Math.floor(Math.random() * 4)], 8.5, 0.28, 0.65);
          spawnShockwave(new THREE.Vector3(bx, by, 0.2));
          triggerShake(0.28, 0.14);
          WebAudioSynth.playHitEnemy();
        }
      } else {
        // Final massive explosion
        spawn3DParticles(boss.pos, 60, 0xfacc15, 12.0, 0.35, 1.2);
        spawnShockwave(boss.pos);
        triggerShake(0.55, 0.35);
        WebAudioSynth.playBreakArmor();
        stageGroup.remove(boss.mesh);
        boss = null;
      }
    }

    // Phase 2 (0..1): Gradually stop rain, clear storm blur/fog, brighten sky, raise rainbow
    const clearT = Math.min(1, Math.max(0, (t - 0.15) / 0.85));
    const activeDrops = Math.round(360 * (1 - clearT));
    for (let i = 0; i < MAX_RAIN; i++) {
      const drop = rainPool[i];
      if (i < activeDrops) {
        drop.visible = true;
        drop.position.x += -7.5 * (1 - clearT * 0.6) * dt;
        drop.position.y += -28.0 * dt;
        if (drop.position.y < -6.5) {
          drop.position.y = 11.5 + Math.random() * 2;
          drop.position.x = camX + (Math.random() - 0.5) * 36;
        }
      } else {
        drop.visible = false;
      }
    }

    const curBlur = 1.6 * (1 - clearT);
    const curVig = 0.42 * (1 - clearT);
    stormOverlay.style.opacity = String(curVig.toFixed(2));
    stormOverlay.style.backdropFilter = `blur(${curBlur.toFixed(2)}px)`;
    ambientLight.intensity = 0.40 + clearT * 0.75;
    scene.fog.density = 0.030 * (1 - clearT) + 0.005 * clearT;

    // Lerp sky color from dark storm (0x050811) to bright blue (0x38bdf8)
    skyColor.setHex(0x050811).lerp(new THREE.Color(0x38bdf8), clearT);
    if (!stageBgTextures[5]) {
      scene.background = skyColor;
    }
    scene.fog.color.copy(skyColor);

    if (clearT > 0.35) {
      rainbowGroup.visible = true;
      const rT = (clearT - 0.35) / 0.65;
      rainbowGroup.position.set(0, -6.0 + rT * 4.5, -7.0);
    }

    // Lower flood water smoothly
    floodWaterMesh.position.y += (-13.0 - floodWaterMesh.position.y) * (1 - Math.exp(-2.5 * dt));

    updateParticlesAndShockwaves(dt);
    updateCameraJuice(dt);
    renderer.render(scene, camera);

    if (victorySeqTimer <= 0) {
      finishVictory();
    }
    return;
  }

  if (gameState === GameState.PLAYING) {
    totalRunTime += dt;
    WebAudioSynth.updateBGM(dt, stageIndex === 5, true);

    if (hitStopTimer > 0) {
      hitStopTimer -= dt;
      updateCameraJuice(dt);
    } else {
      handlePlayerAttack();
      updateTwistSpirit(dt);
      updateTrollTraps(dt);
      updatePlayerPhysics(dt);
      if (gameState === GameState.PLAYING) {
        updateBoss(dt);
        updateEnemies(dt);
        updateProjectiles(dt);
        updateCollisions();
        updateHealthDrops(dt);
        updateParticlesAndShockwaves(dt);
        updateWeatherAndFlood(dt);
        updateCameraJuice(dt);
        updateHUD();
      }
    }
  } else {
    // VICTORY or GAMEOVER background particles & water
    updateParticlesAndShockwaves(dt);
    updateWeatherAndFlood(dt);
    updateCameraJuice(dt);
  }

  jumpJustPressed = false;
  attackJustPressed = false;
  renderer.render(scene, camera);
}

animate();
