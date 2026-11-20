// Web Audio API Procedural Synth & Pentatonic BGM Sequencer

const PENTATONIC_SCALE = [261.6, 293.7, 329.6, 392.0, 440.0];
const BGM_PATTERN = [0, 2, 3, 4, 3, 2, 1, 0, 2, 4, 3, 2, 1, 3, 2, 1];

export const WebAudioSynth = (() => {
  let ctx = null;
  let muted = false;
  let bgmTimer = 0;
  let bgmStep = 0;
  let noiseBuffer = null;

  function ensureCtx() {
    if (!ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return null;
      ctx = new AudioCtx();
    }
    if (ctx.state === 'suspended') {
      ctx.resume().catch(() => {});
    }
    return ctx;
  }

  function getNoiseBuffer(c) {
    if (noiseBuffer) return noiseBuffer;
    const len = c.sampleRate * 1.5;
    const buf = c.createBuffer(1, len, c.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) {
      data[i] = Math.random() * 2 - 1;
    }
    noiseBuffer = buf;
    return buf;
  }

  function playTone(type, startHz, endHz, dur, vol, delay = 0) {
    if (muted) return;
    try {
      const c = ensureCtx();
      if (!c) return;
      const now = c.currentTime + delay;
      const osc = c.createOscillator();
      const gain = c.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(Math.max(20, startHz), now);
      osc.frequency.exponentialRampToValueAtTime(Math.max(20, endHz), now + dur);
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(gain);
      gain.connect(c.destination);
      osc.start(now);
      osc.stop(now + dur + 0.01);
    } catch (_) {}
  }

  function playThunder(dur = 1.2, vol = 0.4) {
    if (muted) return;
    try {
      const c = ensureCtx();
      if (!c) return;
      const now = c.currentTime;
      const src = c.createBufferSource();
      src.buffer = getNoiseBuffer(c);

      const filter = c.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, now);
      filter.frequency.exponentialRampToValueAtTime(40, now + dur);

      const gain = c.createGain();
      gain.gain.setValueAtTime(vol, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + dur);

      src.connect(filter);
      filter.connect(gain);
      gain.connect(c.destination);
      src.start(now);
      src.stop(now + dur);
    } catch (_) {}
  }

  return {
    unlock() {
      ensureCtx();
    },

    setMuted(v) {
      muted = v;
    },

    isMuted() {
      return muted;
    },

    playMorph(formId) {
      switch (formId) {
        case 1: playTone('sine', 140, 90, 0.14, 0.25); break;
        case 2: playTone('sawtooth', 110, 55, 0.14, 0.25); break;
        case 3: playTone('triangle', 80, 40, 0.14, 0.25); break;
        case 4: playTone('sine', 420, 880, 0.14, 0.25); break;
        case 5: playTone('square', 660, 740, 0.14, 0.20); break;
        default: playTone('sine', 240, 480, 0.14, 0.22);
      }
    },

    playPerfectMorph() {
      playTone('sine', 523, 1046, 0.25, 0.35);
      playTone('triangle', 659, 1318, 0.25, 0.30);
    },

    playHitEnemy() {
      playTone('square', 220, 90, 0.08, 0.22);
    },

    playBreakArmor() {
      playTone('sawtooth', 160, 45, 0.22, 0.35);
    },

    playPlayerDamaged() {
      playTone('sawtooth', 180, 60, 0.20, 0.35);
    },

    playStun() {
      playTone('sawtooth', 260, 75, 0.25, 0.25);
    },

    playJump() {
      playTone('sine', 200, 420, 0.09, 0.12);
    },

    playAttack(formId) {
      if (formId === 1) playTone('sine', 520, 260, 0.08, 0.14);
      else if (formId === 2) playTone('sawtooth', 190, 85, 0.10, 0.18);
      else if (formId === 3) playTone('triangle', 110, 45, 0.16, 0.24);
      else if (formId === 4) playTone('sine', 600, 1100, 0.10, 0.16);
      else if (formId === 5) playTone('square', 780, 520, 0.06, 0.10);
    },

    playReflect() {
      playTone('triangle', 680, 1240, 0.14, 0.22);
    },

    playRescue() {
      playTone('sine', 440, 880, 0.15, 0.22, 0.0);
      playTone('sine', 554, 1108, 0.18, 0.22, 0.08);
    },

    playUpgrade() {
      playTone('sine', 523.25, 659.25, 0.10, 0.20, 0.0);
      playTone('sine', 659.25, 1046.5, 0.16, 0.22, 0.06);
    },

    playHeal() {
      playTone('sine', 440, 660, 0.10, 0.18, 0.0);
      playTone('sine', 660, 880, 0.12, 0.18, 0.05);
    },

    playDragonSummon() {
      playThunder(1.20, 0.40);
    },

    playLightning() {
      playThunder(0.45, 0.22);
    },

    playVictory() {
      // C5-D5-E5-G5-A5-C6
      const notes = [523.25, 587.33, 659.25, 783.99, 880.0, 1046.5];
      notes.forEach((hz, idx) => {
        playTone('sine', hz, hz * 1.01, 0.22, 0.26, idx * 0.11);
      });
    },

    updateBGM(dt, isBoss, isPlaying) {
      if (muted || !isPlaying) return;
      const bpm = isBoss ? 145 : 110;
      const stepInterval = 60 / bpm / 2; // 8th notes
      bgmTimer += dt;
      if (bgmTimer >= stepInterval) {
        bgmTimer -= stepInterval;
        const noteIdx = BGM_PATTERN[bgmStep % BGM_PATTERN.length];
        const freq = PENTATONIC_SCALE[noteIdx] * (isBoss && bgmStep % 4 === 0 ? 0.5 : 1.0);
        playTone(isBoss ? 'triangle' : 'sine', freq, freq * 0.99, stepInterval * 0.85, isBoss ? 0.045 : 0.032);
        bgmStep++;
      }
    },
  };
})();
