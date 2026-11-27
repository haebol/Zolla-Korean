// Web Audio API Rhythm Drum Machine + Optional 3 Existing Melodies + Beat-Locked Voice Overdub & Staccato TTS

import { findBestKoreanVoice, isKoreanSpeechEnabled } from './audio';

export type BeatPresetId = 'boombap' | 'clap' | 'march';
export type MelodyOverlayId = 'none' | 'retro2d' | 'memeShorts' | 'chillLounge' | 'latin' | 'carol';

export interface ChantTickPayload {
  stepInBar: number; // 0..15
  beatInBar: number; // 0..3
  audioTime: number;
  beatDurSec: number;
}

const MELODY_NOTE_FREQ: Record<string, number> = {
  E2: 82.41, F2: 87.31, 'F#2': 92.5, G2: 98.0, 'G#2': 103.83, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, 'F#3': 185.0, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.0, 'G#4': 415.3, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5, E6: 1318.51,
};

// Adapted from existing 3 tracks (64-step 4-bar 16th-note grids)
const RETRO_LEAD: (string | null)[] = [
  'E5', null, 'G5', null, 'C6', null, 'G5', null, 'E5', null, 'C5', 'D5', 'E5', null, 'G5', null,
  'A5', null, 'F5', null, 'G5', null, 'E5', null, 'F5', null, 'D5', null, 'E5', null, 'C5', null,
  'D5', 'F5', 'A5', null, 'G5', null, 'B5', null, 'C6', null, 'A5', null, 'G5', null, 'E5', null,
  'F5', null, 'G5', null, 'E5', null, 'C5', null, 'D5', 'G5', 'B5', null, 'G5', null, null, null,
];
const RETRO_BASS: (string | null)[] = [
  'C3', null, null, null, 'G3', null, null, null, 'C3', null, null, null, 'E3', null, 'G3', null,
  'F3', null, null, null, 'E3', null, null, null, 'D3', null, 'G3', null, 'C3', null, null, null,
  'D3', null, null, null, 'G3', null, null, null, 'A3', null, 'F3', null, 'G3', null, 'E3', null,
  'F3', null, 'G3', null, 'C3', null, 'A3', null, 'G3', null, 'D3', null, 'G3', null, null, null,
];

const MEME_LEAD: (string | null)[] = [
  'E5', null, 'E5', 'F5', 'E5', null, 'D5', null, 'C5', null, 'B4', 'C5', 'D5', null, 'B4', null,
  'E5', null, 'G5', 'F5', 'E5', null, 'D5', 'C5', 'B4', null, 'C5', 'B4', 'A4', null, 'B4', null,
  'E5', 'E5', null, 'F5', 'E5', 'D5', 'C5', null, 'G5', 'G5', null, 'F5', 'E5', 'D5', 'C5', null,
  'B4', 'C5', 'D5', 'E5', 'F5', 'E5', 'D5', 'C5', 'B4', null, 'E5', null, 'E6', null, null, null,
];
const MEME_BASS: (string | null)[] = [
  'E2', null, null, 'E2', null, null, 'E2', null, 'A2', null, null, 'G2', 'F2', null, 'E2', null,
  'E2', null, null, 'E2', null, null, 'G2', null, 'B2', null, null, 'A2', 'G2', null, 'B2', null,
  'E2', null, 'E2', null, 'C3', null, 'B2', null, 'G2', null, 'G2', null, 'F2', null, 'E2', null,
  'B2', null, null, 'B2', 'C3', null, 'B2', null, 'E2', null, 'E2', null, null, null, null, null,
];

const CHILL_LEAD: (string | null)[] = [
  'A4', null, 'C5', null, 'E5', null, null, 'D5', 'C5', null, null, null, 'G4', null, 'A4', null,
  'B4', null, 'D5', null, 'G5', null, null, 'E5', 'D5', null, null, null, null, null, 'B4', null,
  'C5', null, 'E5', null, 'F5', null, null, 'E5', 'D5', null, 'C5', null, 'A4', null, null, null,
  'B4', null, 'D5', null, 'E5', null, null, 'D5', 'C5', null, null, null, null, null, 'G4', null,
];
const CHILL_CHORDS: Record<number, string[]> = {
  0: ['F3', 'A3', 'C4', 'E4'],
  16: ['E3', 'G3', 'B3', 'D4'],
  32: ['D3', 'F3', 'A3', 'C4'],
  48: ['C3', 'E3', 'G3', 'B3'],
};

const LATIN_LEAD: (string | null)[] = [
  'A4', null, 'A4', 'C5', 'B4', null, 'A4', null, 'E5', null, 'D5', 'C5', 'B4', null, 'G4', null,
  'A4', 'C5', 'E5', null, 'D5', null, 'C5', 'B4', 'C5', null, 'B4', 'A4', 'G#4', null, 'B4', null,
  'C5', 'C5', null, 'D5', 'E5', 'D5', 'C5', null, 'D5', 'D5', null, 'E5', 'G5', 'E5', 'D5', null,
  'E5', 'D5', 'C5', 'B4', 'A4', 'B4', 'C5', 'D5', 'E5', null, 'A5', null, 'E5', null, null, null,
];
const LATIN_BASS: (string | null)[] = [
  'A2', null, null, 'A2', null, null, 'A2', null, 'D3', null, null, 'C3', 'B2', null, 'A2', null,
  'A2', null, null, 'A2', null, null, 'C3', null, 'E2', null, null, 'D3', 'E2', null, 'G#2', null,
  'F2', null, 'F2', null, 'G2', null, 'E2', null, 'D2', null, 'D2', null, 'G2', null, 'E2', null,
  'E2', null, null, 'E2', 'F2', null, 'E2', null, 'A2', null, 'A2', null, null, null, 'E2', null,
];

const CAROL_LEAD: (string | null)[] = [
  'D5', null, 'G5', 'A5', 'B5', null, 'G5', null, 'F#5', null, 'D5', null, 'B4', null, 'D5', null,
  'E5', null, 'G5', 'F#5', 'E5', null, 'C5', null, 'D5', null, 'A4', 'B4', 'C5', null, 'D5', null,
  'B4', 'D5', 'G5', null, 'F#5', null, 'E5', 'D5', 'E5', null, 'G5', null, 'B5', null, 'A5', null,
  'G5', null, 'E5', 'D5', 'C5', null, 'A4', 'B4', 'D5', null, 'F#5', null, 'G5', null, null, null,
];
const CAROL_BASS: (string | null)[] = [
  'G2', null, null, null, 'D3', null, null, null, 'F#2', null, null, null, 'B2', null, null, null,
  'C3', null, null, null, 'G2', null, null, null, 'D2', null, null, null, 'A2', null, 'D3', null,
  'G2', null, null, null, 'B2', null, null, null, 'E2', null, null, null, 'E3', null, null, null,
  'A2', null, null, null, 'C3', null, null, null, 'D2', null, null, null, 'G2', null, 'D3', null,
];
const CAROL_CHORDS: Record<number, string[]> = {
  0: ['G3', 'B3', 'D4', 'F#4'],
  16: ['C3', 'E3', 'G3', 'B3'],
  32: ['G3', 'B3', 'D4', 'F#4'],
  48: ['A3', 'C4', 'E4', 'G4'],
};

let sharedCtx: AudioContext | null = null;
let sharedNoiseBuf: AudioBuffer | null = null;
let masterRhythmGain: GainNode | null = null;
let activeVoiceSource: AudioBufferSourceNode | null = null;
let activeChantUtterance: SpeechSynthesisUtterance | null = null;

export function getChantAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!sharedCtx) {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioCtx) {
      sharedCtx = new AudioCtx();
    }
  }
  if (sharedCtx && sharedCtx.state === 'suspended') {
    void sharedCtx.resume();
  }
  return sharedCtx;
}

function ensureMasterGain(ctx: AudioContext, level: number): GainNode {
  if (!masterRhythmGain || masterRhythmGain.context !== ctx) {
    masterRhythmGain = ctx.createGain();
    masterRhythmGain.gain.setValueAtTime(level, ctx.currentTime);
    masterRhythmGain.connect(ctx.destination);
  }
  return masterRhythmGain;
}

export function setChantMasterVolume(volume0to1: number, muted: boolean): void {
  const ctx = getChantAudioContext();
  if (!ctx) return;
  const g = ensureMasterGain(ctx, muted ? 0 : volume0to1);
  g.gain.setTargetAtTime(muted ? 0 : Math.max(0, Math.min(1, volume0to1)), ctx.currentTime, 0.02);
}

function getNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (sharedNoiseBuf && sharedNoiseBuf.sampleRate === ctx.sampleRate) {
    return sharedNoiseBuf;
  }
  const len = Math.floor(ctx.sampleRate * 0.25);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const ch = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    ch[i] = Math.random() * 2 - 1;
  }
  sharedNoiseBuf = buf;
  return buf;
}

function trigKick(ctx: AudioContext, dest: AudioNode, time: number, accent = 1.0): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.setValueAtTime(148, time);
  osc.frequency.exponentialRampToValueAtTime(42, time + 0.13);
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(0.55 * accent, time + 0.008);
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.22);
  osc.connect(gain);
  gain.connect(dest);
  osc.start(time);
  osc.stop(time + 0.24);
}

function trigSnare(ctx: AudioContext, dest: AudioNode, time: number, accent = 1.0): void {
  // Body tone
  const osc = ctx.createOscillator();
  const bodyG = ctx.createGain();
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(195, time);
  osc.frequency.exponentialRampToValueAtTime(105, time + 0.08);
  bodyG.gain.setValueAtTime(0.24 * accent, time);
  bodyG.gain.exponentialRampToValueAtTime(0.001, time + 0.11);
  osc.connect(bodyG);
  bodyG.connect(dest);
  osc.start(time);
  osc.stop(time + 0.12);

  // Crisp wire noise
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.setValueAtTime(1800, time);
  const ng = ctx.createGain();
  ng.gain.setValueAtTime(0.26 * accent, time);
  ng.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
  src.connect(hp);
  hp.connect(ng);
  ng.connect(dest);
  src.start(time);
  src.stop(time + 0.15);
}

export function trigClap(ctx: AudioContext, dest: AudioNode, time: number, big = true): void {
  // Multi-tap organic hand-clap bursts ("짝!")
  const taps = big ? [0, 0.011, 0.023, 0.036] : [0, 0.012, 0.024];
  taps.forEach((offset, idx) => {
    const t = time + offset;
    const src = ctx.createBufferSource();
    src.buffer = getNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.frequency.setValueAtTime(big ? 1650 : 1450, t);
    bp.Q.setValueAtTime(1.4, t);
    const g = ctx.createGain();
    const peak = idx === taps.length - 1 ? (big ? 0.34 : 0.22) : big ? 0.22 : 0.15;
    const dur = idx === taps.length - 1 ? 0.14 : 0.03;
    g.gain.setValueAtTime(0.001, t);
    g.gain.linearRampToValueAtTime(peak, t + 0.004);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(bp);
    bp.connect(g);
    g.connect(dest);
    src.start(t);
    src.stop(t + dur + 0.01);
  });
}

function trigHiHat(ctx: AudioContext, dest: AudioNode, time: number, open = false, accent = 1.0): void {
  const src = ctx.createBufferSource();
  src.buffer = getNoiseBuffer(ctx);
  const hp = ctx.createBiquadFilter();
  hp.type = 'highpass';
  hp.frequency.setValueAtTime(6800, time);
  const g = ctx.createGain();
  const dur = open ? 0.12 : 0.04;
  g.gain.setValueAtTime((open ? 0.13 : 0.09) * accent, time);
  g.gain.exponentialRampToValueAtTime(0.0008, time + dur);
  src.connect(hp);
  hp.connect(g);
  g.connect(dest);
  src.start(time);
  src.stop(time + dur + 0.01);
}

function trigWoodblock(ctx: AudioContext, dest: AudioNode, time: number, high = false, accent = 1.0): void {
  const osc = ctx.createOscillator();
  const g = ctx.createGain();
  osc.type = 'triangle';
  const freq = high ? 1180 : 860;
  osc.frequency.setValueAtTime(freq, time);
  osc.frequency.exponentialRampToValueAtTime(freq * 0.82, time + 0.045);
  g.gain.setValueAtTime(0.001, time);
  g.gain.linearRampToValueAtTime(0.16 * accent, time + 0.004);
  g.gain.exponentialRampToValueAtTime(0.001, time + 0.065);
  osc.connect(g);
  g.connect(dest);
  osc.start(time);
  osc.stop(time + 0.075);
}

function scheduleMelodyOverlayStep(
  ctx: AudioContext,
  dest: AudioNode,
  melody: MelodyOverlayId,
  globalStep: number,
  time: number,
  stepDur: number
): void {
  if (melody === 'none') return;
  const s = globalStep % 64;

  if (melody === 'retro2d') {
    const lead = RETRO_LEAD[s];
    const bass = RETRO_BASS[s];
    if (lead && MELODY_NOTE_FREQ[lead]) {
      const osc = ctx.createOscillator();
      const lp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[lead], time);
      lp.type = 'lowpass';
      lp.frequency.setValueAtTime(2400, time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.075, time + 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 1.4);
      osc.connect(lp);
      lp.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 1.45);
    }
    if (bass && MELODY_NOTE_FREQ[bass]) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[bass], time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.14, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 2.2);
      osc.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 2.3);
    }
    return;
  }

  if (melody === 'memeShorts') {
    const lead = MEME_LEAD[s];
    const bass = MEME_BASS[s];
    if (lead && MELODY_NOTE_FREQ[lead]) {
      const osc = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[lead], time);
      bp.type = 'bandpass';
      bp.Q.setValueAtTime(1.7, time);
      bp.frequency.setValueAtTime(Math.min(3200, MELODY_NOTE_FREQ[lead] * 2), time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.085, time + 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 1.2);
      osc.connect(bp);
      bp.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 1.25);
    }
    if (bass && MELODY_NOTE_FREQ[bass]) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[bass] * 1.5, time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.16, time + 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 1.6);
      osc.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 1.7);
    }
    return;
  }

  if (melody === 'latin') {
    const lead = LATIN_LEAD[s];
    const bass = LATIN_BASS[s];
    if (lead && MELODY_NOTE_FREQ[lead]) {
      const f = MELODY_NOTE_FREQ[lead];
      const osc = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(f * 0.94, time);
      osc.frequency.exponentialRampToValueAtTime(f, time + 0.025);
      bp.type = 'bandpass';
      bp.Q.setValueAtTime(1.8, time);
      bp.frequency.setValueAtTime(Math.min(3400, f * 2.1), time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.09, time + 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 1.25);
      osc.connect(bp);
      bp.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 1.3);
    }
    if (bass && MELODY_NOTE_FREQ[bass]) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[bass] * 1.7, time);
      osc.frequency.exponentialRampToValueAtTime(Math.max(42, MELODY_NOTE_FREQ[bass] * 0.85), time + 0.08);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.16, time + 0.008);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 1.6);
      osc.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 1.7);
    }
    if (s % 4 === 0 || s % 16 === 6 || s % 16 === 10) {
      [540, 810].forEach((freq) => {
        const cb = ctx.createOscillator();
        const bp = ctx.createBiquadFilter();
        const g = ctx.createGain();
        cb.type = 'square';
        cb.frequency.setValueAtTime(freq, time);
        bp.type = 'bandpass';
        bp.Q.setValueAtTime(3.2, time);
        bp.frequency.setValueAtTime(720, time);
        g.gain.setValueAtTime(0.036, time);
        g.gain.exponentialRampToValueAtTime(0.001, time + 0.07);
        cb.connect(bp);
        bp.connect(g);
        g.connect(dest);
        cb.start(time);
        cb.stop(time + 0.08);
      });
    }
    return;
  }

  if (melody === 'carol') {
    const chord = CAROL_CHORDS[s];
    if (chord) {
      chord.forEach((n) => {
        const f = MELODY_NOTE_FREQ[n];
        if (!f) return;
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, time);
        g.gain.setValueAtTime(0.0005, time);
        g.gain.linearRampToValueAtTime(0.035, time + 0.025);
        g.gain.exponentialRampToValueAtTime(0.0008, time + stepDur * 6.5);
        osc.connect(g);
        g.connect(dest);
        osc.start(time);
        osc.stop(time + stepDur * 6.6);
      });
    }
    const lead = CAROL_LEAD[s];
    if (lead && MELODY_NOTE_FREQ[lead]) {
      const f = MELODY_NOTE_FREQ[lead];
      const osc = ctx.createOscillator();
      const over = ctx.createOscillator();
      const g = ctx.createGain();
      const og = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, time);
      over.type = 'triangle';
      over.frequency.setValueAtTime(f * 2, time);
      g.gain.setValueAtTime(0.0008, time);
      g.gain.linearRampToValueAtTime(0.1, time + 0.01);
      g.gain.exponentialRampToValueAtTime(0.0008, time + stepDur * 2.5);
      og.gain.setValueAtTime(0.0005, time);
      og.gain.linearRampToValueAtTime(0.025, time + 0.006);
      og.gain.exponentialRampToValueAtTime(0.0005, time + stepDur * 1.1);
      osc.connect(g);
      over.connect(og);
      g.connect(dest);
      og.connect(dest);
      osc.start(time);
      over.start(time);
      osc.stop(time + stepDur * 2.55);
      over.stop(time + stepDur * 1.15);
    }
    const bass = CAROL_BASS[s];
    if (bass && MELODY_NOTE_FREQ[bass]) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[bass], time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.11, time + 0.015);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 3.0);
      osc.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 3.1);
    }
    if (s % 4 === 0) {
      [2637, 3136].forEach((freq) => {
        const j = ctx.createOscillator();
        const jg = ctx.createGain();
        j.type = 'sine';
        j.frequency.setValueAtTime(freq, time);
        jg.gain.setValueAtTime(0.0005, time);
        jg.gain.linearRampToValueAtTime(0.012, time + 0.004);
        jg.gain.exponentialRampToValueAtTime(0.0005, time + 0.065);
        j.connect(jg);
        jg.connect(dest);
        j.start(time);
        j.stop(time + 0.075);
      });
    }
    return;
  }

  // chillLounge warm electric piano chords + melody
  const chord = CHILL_CHORDS[s];
  if (chord) {
    chord.forEach((n) => {
      const f = MELODY_NOTE_FREQ[n];
      if (!f) return;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(f, time);
      g.gain.setValueAtTime(0.001, time);
      g.gain.linearRampToValueAtTime(0.04, time + 0.03);
      g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 7.5);
      osc.connect(g);
      g.connect(dest);
      osc.start(time);
      osc.stop(time + stepDur * 7.6);
    });
  }
  const lead = CHILL_LEAD[s];
  if (lead && MELODY_NOTE_FREQ[lead]) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(MELODY_NOTE_FREQ[lead], time);
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.075, time + 0.02);
    g.gain.exponentialRampToValueAtTime(0.001, time + stepDur * 3.8);
    osc.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + stepDur * 3.9);
  }
}

/**
 * Schedules a single 16th-note step of the 4/4 Chant Drum Machine.
 * Step 12 = Beat 4 (Rest + Prominent Clap SFX "짝!").
 */
export function scheduleChantStepAudio(params: {
  preset: BeatPresetId;
  melody: MelodyOverlayId;
  stepInBar: number; // 0..15
  globalStep: number;
  time: number;
  stepDur: number;
  volume: number;
  muted: boolean;
}): void {
  const ctx = getChantAudioContext();
  if (!ctx) return;
  const dest = ensureMasterGain(ctx, params.muted ? 0 : params.volume);
  const s = params.stepInBar % 16;

  if (params.preset === 'boombap') {
    // Classic 4/4 Boom-Bap: Kick 1, (2-and), Snare 2, Kick 3, Clap on 4!
    if (s === 0 || s === 6 || s === 8) trigKick(ctx, dest, params.time, s === 0 ? 1.05 : 0.85);
    if (s === 4) trigSnare(ctx, dest, params.time, 0.92);
    if (s === 12) {
      trigSnare(ctx, dest, params.time, 0.65);
      trigClap(ctx, dest, params.time, true);
    }
    if (s % 2 === 0) trigHiHat(ctx, dest, params.time, s === 10, s % 4 === 0 ? 1.0 : 0.7);
    if (s % 4 === 0) trigWoodblock(ctx, dest, params.time, s === 12, s === 12 ? 1.15 : 0.6);
  } else if (params.preset === 'clap') {
    // Energetic 4-on-the-floor + Hand Claps + Bouncy Woodblocks!
    if (s % 4 === 0) trigKick(ctx, dest, params.time, s === 0 ? 1.1 : 0.9);
    if (s === 4) trigClap(ctx, dest, params.time, false);
    if (s === 12) trigClap(ctx, dest, params.time, true);
    if (s === 14) trigClap(ctx, dest, params.time, false); // fun double-clap fill into next bar!
    if (s % 2 === 1) trigHiHat(ctx, dest, params.time, s === 7, 0.95);
    if (s === 0 || s === 4 || s === 8 || s === 12) {
      trigWoodblock(ctx, dest, params.time, s === 12, s === 12 ? 1.2 : 0.75);
    }
  } else {
    // Cheerful March cadence: Strong 1 & 3 kick, crisp marching snare on 2 & 4 + Beat 4 Clap!
    if (s === 0 || s === 8) trigKick(ctx, dest, params.time, 1.05);
    if (s === 4 || s === 10) trigSnare(ctx, dest, params.time, s === 4 ? 0.95 : 0.55);
    if (s === 12) {
      trigSnare(ctx, dest, params.time, 0.85);
      trigClap(ctx, dest, params.time, true);
    }
    if (s % 2 === 0) trigWoodblock(ctx, dest, params.time, s === 12 || s === 0, s === 12 ? 1.2 : 0.7);
    if (s % 4 === 2) trigHiHat(ctx, dest, params.time, false, 0.75);
  }

  scheduleMelodyOverlayStep(ctx, dest, params.melody, params.globalStep, params.time, params.stepDur);
}

/**
 * Cancels any pending staccato Chant TTS cleanly (especially before Beat 4 Rest!)
 */
export function cancelChantTts(): void {
  try {
    activeChantUtterance = null;
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
  } catch {
    // ignore
  }
}

/**
 * Speaks a crisp staccato token on Beats 1, 2, or 3 so it wraps cleanly inside beatDurationSec.
 */
export function speakChantBeatToken(
  token: string,
  beatDurationSec: number,
  beatIndex0to2: number
): void {
  if (!isKoreanSpeechEnabled() || typeof window === 'undefined' || !('speechSynthesis' in window)) {
    return;
  }
  // Strip bracket/arrow notation (e.g. "[한구거]", "👏", "→") so Korean TTS reads pure syllables cleanly
  const clean = token
    .replace(/[[\]()→<>]/g, ' ')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
  if (!clean) return;

  try {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    window.speechSynthesis.cancel();

    const utt = new SpeechSynthesisUtterance(clean);
    utt.lang = 'ko-KR';

    // Fit cleanly inside 1 beat slot (short fast punchy delivery)
    const lengthFactor =
      clean.length >= 4 ? 1.42 : clean.length === 3 ? 1.28 : clean.length === 2 ? 1.15 : 1.05;
    const tempoFactor = Math.max(0.9, Math.min(1.65, 0.58 / Math.max(0.32, beatDurationSec)));
    utt.rate = Math.max(0.95, Math.min(2.15, lengthFactor * tempoFactor));
    // Subtle musical pitch rise on beats 1 -> 2 -> 3
    utt.pitch = beatIndex0to2 === 0 ? 1.02 : beatIndex0to2 === 1 ? 1.08 : 1.0;

    const voice = findBestKoreanVoice();
    if (voice) utt.voice = voice;

    activeChantUtterance = utt;
    utt.onend = () => {
      if (activeChantUtterance === utt) activeChantUtterance = null;
    };
    utt.onerror = () => {
      if (activeChantUtterance === utt) activeChantUtterance = null;
    };
    window.speechSynthesis.speak(utt);
  } catch {
    // ignore TTS errors
  }
}

/**
 * Plays a pre-recorded custom user Call bar AudioBuffer locked to Beats 1..3 (cuts off cleanly before Beat 4 rest!)
 */
export function playCustomVoiceCallBuffer(
  buffer: AudioBuffer,
  startAtTime: number,
  beats1to3DurationSec: number,
  volume = 1.0
): void {
  const ctx = getChantAudioContext();
  if (!ctx) return;

  try {
    if (activeVoiceSource) {
      try {
        activeVoiceSource.stop();
      } catch {
        // already stopped
      }
      activeVoiceSource = null;
    }

    const src = ctx.createBufferSource();
    src.buffer = buffer;

    // Fit user recording smoothly into Beats 1..3 without bleeding into Beat 4 clap rest!
    const naturalDur = Math.max(0.15, buffer.duration);
    const rate =
      naturalDur > beats1to3DurationSec
        ? Math.min(1.45, naturalDur / Math.max(0.4, beats1to3DurationSec))
        : 1.0;
    src.playbackRate.setValueAtTime(rate, startAtTime);

    const g = ctx.createGain();
    const playLen = Math.min(beats1to3DurationSec * 0.96, naturalDur / rate);
    g.gain.setValueAtTime(volume, startAtTime);
    g.gain.setValueAtTime(volume, Math.max(startAtTime, startAtTime + playLen - 0.04));
    g.gain.linearRampToValueAtTime(0.001, startAtTime + playLen);

    src.connect(g);
    g.connect(ctx.destination);
    src.start(startAtTime);
    src.stop(startAtTime + playLen + 0.02);
    activeVoiceSource = src;
  } catch {
    // ignore playback issues
  }
}

export function stopCustomVoicePlayback(): void {
  if (activeVoiceSource) {
    try {
      activeVoiceSource.stop();
    } catch {
      // ignore
    }
    activeVoiceSource = null;
  }
}

/**
 * Trims leading & trailing silence from a recorded AudioBuffer so Beat 1 hits tight on-grid!
 */
export function trimRecordedAudioBuffer(ctx: AudioContext, raw: AudioBuffer): AudioBuffer {
  const data = raw.getChannelData(0);
  const threshold = 0.025;
  let startSample = 0;
  let endSample = data.length - 1;

  while (startSample < data.length - 1 && Math.abs(data[startSample]) < threshold) {
    startSample++;
  }
  while (endSample > startSample && Math.abs(data[endSample]) < threshold * 0.6) {
    endSample--;
  }

  // Keep a tiny 10ms attack cushion
  startSample = Math.max(0, startSample - Math.floor(raw.sampleRate * 0.01));
  endSample = Math.min(data.length - 1, endSample + Math.floor(raw.sampleRate * 0.05));

  const trimmedLen = Math.max(Math.floor(raw.sampleRate * 0.2), endSample - startSample + 1);
  const out = ctx.createBuffer(1, trimmedLen, raw.sampleRate);
  const outData = out.getChannelData(0);
  for (let i = 0; i < trimmedLen; i++) {
    outData[i] = startSample + i < data.length ? data[startSample + i] : 0;
  }
  return out;
}

/**
 * Plays a quiet metronome click specifically for guiding Beat 1-2-3-4 mic recording
 */
export function playGuideMetronomeClick(beatIdx: number): void {
  const ctx = getChantAudioContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  trigWoodblock(ctx, ctx.destination, now, beatIdx === 3, beatIdx === 3 ? 0.95 : 0.65);
}
