// Audio synthesis utilities for speech and interactive sound effects

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

function playOscTone(
  ctx: AudioContext,
  now: number,
  type: OscillatorType,
  f1: number,
  f2: number,
  dur: number,
  vol = 0.18,
  delay = 0
): void {
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.setValueAtTime(f1, now + delay);
  osc.frequency.exponentialRampToValueAtTime(Math.max(20, f2), now + delay + dur);
  gain.gain.setValueAtTime(vol, now + delay);
  gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now + delay);
  osc.stop(now + delay + dur + 0.02);
}

/**
 * Plays a cute pop / bubble sound when clicking words or buttons
 */
export function playCutePop(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    const now = ctx.currentTime;

    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);

    gain.gain.setValueAtTime(0.18, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.1);
  } catch {
    // AudioContext blocked or unsupported; silent fallback
  }
}

/**
 * Plays a train whistle ("뿌우~") + chug rhythm for the Jollaman simulation
 */
export function playTrainHorn(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Two-tone train horn chord
    [349.23, 440.0].forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.09, now + 0.05);
      gain.gain.setValueAtTime(0.09, now + 0.28);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.48);
    });
  } catch {
    // Silent fallback
  }
}

/**
 * Plays a clean comical high-impact thump + cartoon spring boing ("쿵! 띠용~") without high-pitched scream
 */
export function playCartoonImpact(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Heavy comic BAM impact thump
    const kick = ctx.createOscillator();
    const kickGain = ctx.createGain();
    kick.type = 'triangle';
    kick.frequency.setValueAtTime(240, now);
    kick.frequency.exponentialRampToValueAtTime(38, now + 0.22);
    kickGain.gain.setValueAtTime(0.42, now);
    kickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.24);
    kick.connect(kickGain);
    kickGain.connect(ctx.destination);
    kick.start(now);
    kick.stop(now + 0.26);

    // 2. Funny cartoon spring "띠용~" wobble
    const boing = ctx.createOscillator();
    const boingLfo = ctx.createOscillator();
    const boingLfoGain = ctx.createGain();
    const boingGain = ctx.createGain();
    boing.type = 'sine';
    boing.frequency.setValueAtTime(320, now + 0.04);
    boing.frequency.exponentialRampToValueAtTime(760, now + 0.32);
    boingLfo.frequency.setValueAtTime(26, now + 0.04);
    boingLfoGain.gain.setValueAtTime(65, now + 0.04);
    boingLfo.connect(boingLfoGain);
    boingLfoGain.connect(boing.frequency);
    boingGain.gain.setValueAtTime(0.001, now + 0.04);
    boingGain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    boingGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
    boing.connect(boingGain);
    boingGain.connect(ctx.destination);
    boingLfo.start(now + 0.04);
    boing.start(now + 0.04);
    boingLfo.stop(now + 0.46);
    boing.stop(now + 0.46);
  } catch {
    // Silent fallback
  }
}

/**
 * Pure Web Audio API comical duck quack triple-burst ("꽥-꽥-꽥!")
 */
export function playDuckQuack(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [0, 0.23, 0.46].forEach((offset) => {
      const start = now + offset;
      const dur = 0.16;

      const osc = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(365, start);
      osc.frequency.exponentialRampToValueAtTime(225, start + dur);

      filter.type = 'bandpass';
      filter.Q.setValueAtTime(4.2, start);
      filter.frequency.setValueAtTime(1120, start);
      filter.frequency.exponentialRampToValueAtTime(720, start + dur);

      gain.gain.setValueAtTime(0.001, start);
      gain.gain.linearRampToValueAtTime(0.26, start + 0.018);
      gain.gain.setValueAtTime(0.24, start + 0.075);
      gain.gain.exponentialRampToValueAtTime(0.001, start + dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      osc.start(start);
      osc.stop(start + dur + 0.02);
    });
  } catch {
    // Silent fallback
  }
}

/**
 * Plays a comical ground splat ("철푸덕") sound effect
 */
export function playCartoonSplat(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 0.22);

    gain.gain.setValueAtTime(0.22, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);

    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.26);
  } catch {
    // Silent fallback
  }
}

/**
 * Plays a pleasant success celebration chime (for quizzes and correct answers)
 */
export function playSuccessChime(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const startTime = ctx.currentTime + index * 0.08;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, startTime);

      gain.gain.setValueAtTime(0.12, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.3);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(startTime);
      osc.stop(startTime + 0.35);
    });
  } catch {
    // Silent fallback
  }
}

/**
 * Plays a quick cartoon car pass-by whoosh ("부웅~")
 */
export function playCarWhoosh(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(340, now + 0.14);
    osc.frequency.exponentialRampToValueAtTime(95, now + 0.36);
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.11, now + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.4);
  } catch {
    // Silent fallback
  }
}

/**
 * Plays a realistic continuous mosquito buzz ("윙~~~") when the mosquito appears
 */
export function playMosquitoBuzz(duration: number = 1.4): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const osc = ctx.createOscillator();
    const lfo = ctx.createOscillator();
    const lfoGain = ctx.createGain();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(540, now);
    osc.frequency.linearRampToValueAtTime(640, now + duration * 0.6);
    osc.frequency.linearRampToValueAtTime(580, now + duration);

    lfo.type = 'sine';
    lfo.frequency.setValueAtTime(24, now);
    lfoGain.gain.setValueAtTime(28, now);
    lfo.connect(lfoGain);
    lfoGain.connect(osc.frequency);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.085, now + 0.18);
    gain.gain.setValueAtTime(0.095, now + duration * 0.78);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    osc.connect(gain);
    gain.connect(ctx.destination);

    lfo.start(now);
    osc.start(now);
    lfo.stop(now + duration + 0.03);
    osc.stop(now + duration + 0.03);
  } catch {
    // Silent fallback
  }
}

/**
 * Plays a cheerful dual-tone car horn double-honk ("빵! 빵!")
 */
export function playCarHorn(): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    [0, 0.22].forEach((offset) => {
      [415, 523].forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + offset);
        gain.gain.setValueAtTime(0.001, now + offset);
        gain.gain.linearRampToValueAtTime(0.09, now + offset + 0.015);
        gain.gain.setValueAtTime(0.09, now + offset + 0.11);
        gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.14);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.15);
      });
    });
  } catch {
    // Silent fallback
  }
}

/**
 * Plays an energetic 4-on-the-floor disco / breakdance beat for ㅊ (춤) and ㅎ (호랑이 댄스)
 */
export function playDiscoDanceBeat(durationSec: number = 2.0): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const beatStep = 0.24; // ~125 BPM punchy quarter-note beat
    const totalBeats = Math.floor(durationSec / beatStep);
    const bassNotes = [130.81, 164.81, 196.0, 220.0]; // C3, E3, G3, A3
    const leadNotes = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25];

    for (let i = 0; i < totalBeats; i++) {
      const t = now + i * beatStep;

      // 1. Punchy Kick Drum ("둠!")
      const kick = ctx.createOscillator();
      const kickGain = ctx.createGain();
      kick.type = 'sine';
      kick.frequency.setValueAtTime(145, t);
      kick.frequency.exponentialRampToValueAtTime(42, t + 0.12);
      kickGain.gain.setValueAtTime(0.28, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      kick.connect(kickGain);
      kickGain.connect(ctx.destination);
      kick.start(t);
      kick.stop(t + 0.15);

      // 2. Funky Offbeat Disco Bass ("칫!")
      const bass = ctx.createOscillator();
      const bassGain = ctx.createGain();
      bass.type = 'triangle';
      const bf = bassNotes[i % bassNotes.length];
      bass.frequency.setValueAtTime(bf, t + beatStep * 0.5);
      bassGain.gain.setValueAtTime(0.14, t + beatStep * 0.5);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + beatStep * 0.95);
      bass.connect(bassGain);
      bassGain.connect(ctx.destination);
      bass.start(t + beatStep * 0.5);
      bass.stop(t + beatStep);

      // 3. Sparkling Disco Synth Stab
      const lead = ctx.createOscillator();
      const leadGain = ctx.createGain();
      lead.type = 'square';
      lead.frequency.setValueAtTime(leadNotes[i % leadNotes.length], t);
      leadGain.gain.setValueAtTime(0.075, t);
      leadGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);
      lead.connect(leadGain);
      leadGain.connect(ctx.destination);
      lead.start(t);
      lead.stop(t + 0.16);
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play scenario-specific comic Web Audio SFX for ㄴ~ㅎ Jollaman gags
 */
export function playScenarioSfx(char: string): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    switch (char) {
      case 'ㄴ': // Tree crack & crash
        playTone('sawtooth', 180, 55, 0.25, 0.2, 0);
        playTone('triangle', 120, 40, 0.35, 0.25, 0.25);
        break;
      case 'ㄷ': // Bridge fall & splash
        playTone('sine', 700, 180, 0.32, 0.16, 0);
        playTone('triangle', 320, 90, 0.22, 0.2, 0.25);
        break;
      case 'ㅈ': // Car #2 whirlwind gust ("휘이이잉~!")
        playTone('sine', 240, 760, 0.22, 0.14, 0);
        playTone('triangle', 760, 310, 0.32, 0.15, 0.2);
        break;
      case 'ㄹ': // Horizontal missile zoom whoosh ("슈우웅~!") + boom
        playTone('sawtooth', 580, 150, 0.42, 0.14, 0);
        playTone('triangle', 220, 65, 0.36, 0.2, 0.06);
        break;
      case 'ㅁ': // Mosquito sting pop ("따끔!")
        playTone('sine', 1050, 340, 0.16, 0.18, 0);
        break;
      case 'ㅂ': // Thunder lightning zap!
        playTone('sawtooth', 920, 120, 0.18, 0.22, 0);
        playTone('square', 680, 95, 0.24, 0.16, 0.08);
        playTone('triangle', 110, 42, 0.4, 0.22, 0.16);
        break;
      case 'ㅅ': // Fierce lion roar ("어흥!!")
        playTone('sawtooth', 170, 70, 0.55, 0.22, 0);
        playTone('sine', 420, 160, 0.5, 0.14, 0.42);
        break;
      case 'ㅊ': // Upbeat disco beat drop
        playDiscoDanceBeat(2.0);
        break;
      case 'ㅋ': // Elephant trumpet & fling!
        playTone('sawtooth', 360, 680, 0.22, 0.15, 0);
        playTone('sine', 450, 1200, 0.45, 0.16, 0.24);
        break;
      case 'ㅌ': // Muscular rabbit karate kick!
        playTone('triangle', 680, 120, 0.14, 0.25, 0);
        playTone('sine', 520, 980, 0.35, 0.14, 0.12);
        break;
      case 'ㅍ': // Balloon rise & POP!
        playTone('sine', 300, 620, 0.32, 0.12, 0);
        playTone('square', 920, 80, 0.12, 0.28, 0.38);
        break;
      case 'ㅎ': // Scary tiger low growl ("어흥!") before disco twist
        playTone('sawtooth', 145, 58, 0.48, 0.24, 0);
        playTone('triangle', 95, 48, 0.45, 0.2, 0.04);
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play vowel-specific comic Web Audio SFX for ㅏ~ㅣ Jollaman 2 slapstick gags
 */
export function playVowelScenarioSfx(char: string): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    switch (char) {
      case 'ㅏ': // Cute crying baby ("으앙~ 으앙~") + exhausted parent sigh
        playTone('triangle', 680, 520, 0.22, 0.16, 0);
        playTone('triangle', 740, 490, 0.26, 0.16, 0.26);
        playTone('triangle', 700, 460, 0.28, 0.15, 0.56);
        playTone('sine', 340, 220, 0.3, 0.1, 0.9);
        break;
      case 'ㅑ': // Blazing pitch + hollow KKANG! punch-through
        playTone('square', 820, 220, 0.12, 0.24, 0);
        playTone('sine', 1200, 480, 0.22, 0.18, 0.05);
        break;
      case 'ㅓ': // Big floor fishbowl plunge "풍덩!" + bubbles + overflowing flood rush
        playTone('triangle', 460, 140, 0.18, 0.24, 0);
        for (let i = 0; i < 5; i++) {
          playTone('sine', 260 + i * 75, 590 + i * 90, 0.08, 0.16, 0.12 + i * 0.08);
        }
        playTone('sawtooth', 180, 420, 0.45, 0.12, 0.55);
        break;
      case 'ㅕ': // Hilarious comical brassy FART "뿌우우웅~!"
        playTone('sawtooth', 128, 62, 0.48, 0.28, 0);
        playTone('square', 94, 48, 0.45, 0.16, 0.03);
        break;
      case 'ㅗ': // Pressurized ink cannon "푸슈우욱!" + deep blackout splat
        playTone('sawtooth', 540, 85, 0.36, 0.24, 0);
        playTone('square', 220, 55, 0.34, 0.2, 0.12);
        break;
      case 'ㅛ': // High-speed yo-yo zoom + heavy bonk!
        for (let i = 0; i < 4; i++) {
          playTone('triangle', 340 + i * 90, 560 + i * 90, 0.08, 0.14, i * 0.07);
        }
        playTone('square', 280, 70, 0.18, 0.24, 0.28);
        break;
      case 'ㅜ': // Alien UFO tractor beam "삐비빅~"
        playTone('sine', 780, 1240, 0.12, 0.16, 0);
        playTone('sine', 1100, 540, 0.16, 0.16, 0.13);
        playTone('sine', 620, 1320, 0.24, 0.16, 0.3);
        break;
      case 'ㅠ': // Spooky wobbling ghost "유~!" + shock!
        playTone('sine', 420, 660, 0.25, 0.18, 0);
        playTone('sine', 660, 340, 0.3, 0.18, 0.25);
        break;
      case 'ㅡ': // Eerie spooky wind & creaking abandoned house ("으스스~")
        playTone('sine', 260, 145, 0.55, 0.14, 0);
        playTone('triangle', 195, 130, 0.5, 0.1, 0.2);
        break;
      case 'ㅣ': // Chattering teeth "딱! 딱! 딱!" + giant CHOMP "앙!"
        for (let i = 0; i < 4; i++) {
          playTone('square', 980, 260, 0.045, 0.18, i * 0.11);
        }
        playTone('sawtooth', 320, 68, 0.24, 0.28, 0.46);
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 3 (Double Consonants ㄱㄲ..ㅈㅉ) slapstick Web Audio SFX
 */
export function playEpisode3Sfx(char: string): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    switch (char) {
      case 'ㄲ': // Crow caws ("까악! 까악! 까악!")
        for (let i = 0; i < 3; i++) {
          playTone('sawtooth', 780 - i * 30, 420, 0.14, 0.2, i * 0.16);
        }
        break;
      case 'ㄸ': // Puppy barks ("멍! 멍!") + wet poop step squish ("찌직!")
        playTone('triangle', 420, 620, 0.08, 0.16, 0);
        playTone('triangle', 450, 650, 0.08, 0.16, 0.12);
        playTone('sawtooth', 260, 68, 0.28, 0.28, 0.34);
        break;
      case 'ㅃ': // Crisp comic slap ("짝!") + cute kiss pop ("쪽!") + sad trombone
        playTone('square', 1100, 140, 0.09, 0.28, 0);
        playTone('sine', 420, 960, 0.08, 0.18, 0.45);
        playTone('triangle', 260, 145, 0.42, 0.18, 0.65);
        break;
      case 'ㅆ': // Truck beep ("삐- 삐-") + scoop + engine zoom away
        playTone('square', 1180, 1180, 0.1, 0.14, 0);
        playTone('square', 1180, 1180, 0.1, 0.14, 0.18);
        playTone('sawtooth', 120, 290, 0.48, 0.2, 0.34);
        break;
      case 'ㅉ': // Heartwarming buddy chime ("딩동댕~")
        [523.25, 659.25, 783.99, 1046.5].forEach((f, idx) => {
          playTone('sine', f, f, 0.26, 0.16, idx * 0.11);
        });
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 4 (11 Compound Vowels ㅐ~ㅢ) comic Web Audio SFX
 */
export function playCompoundVowelSfx(char: string, stage: 'setup' | 'impact' = 'impact'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    if (stage === 'setup') {
      switch (char) {
        case 'ㅐ': // Romantic harp chime + Frog croak + sticky tongue whip!
          playTone('sine', 523, 659, 0.14, 0.12, 0);
          playTone('sawtooth', 165, 340, 0.11, 0.18, 0.14);
          playTone('sawtooth', 175, 390, 0.12, 0.18, 0.3);
          playTone('sine', 320, 980, 0.14, 0.18, 0.5);
          break;
        case 'ㅒ': // Girlfriend machine-gun chatterbox word bullets ("타타타타타탁!!")
          for (let i = 0; i < 8; i++) {
            playTone('square', 720 + (i % 3) * 180, 360 + (i % 2) * 140, 0.045, 0.14, i * 0.065);
          }
          break;
        case 'ㅔ': // Fast crab scuttle clicks ("사사사삭!") -> pincer SNAP ("찝!")
          for (let i = 0; i < 5; i++) {
            playTone('triangle', 920 + (i % 2) * 260, 480, 0.04, 0.14, i * 0.06);
          }
          playTone('square', 1240, 320, 0.07, 0.22, 0.34);
          break;
        case 'ㅖ': // Farm hen cluck ("꼬꼬댁!") + 10 eggs rolling rumble ("데구르르르~")
          playTone('sawtooth', 540, 820, 0.08, 0.16, 0);
          playTone('sawtooth', 620, 940, 0.1, 0.16, 0.1);
          for (let i = 0; i < 8; i++) {
            playTone('sine', 240 + i * 32, 320 + i * 40, 0.065, 0.14, 0.22 + i * 0.07);
          }
          break;
        case 'ㅘ': // Girlfriend shakes apple tree rustle ("와르르~")
          for (let i = 0; i < 5; i++) {
            playTone('triangle', 380 + (i % 2) * 120, 220, 0.08, 0.14, i * 0.09);
          }
          break;
        case 'ㅙ': // Girlfriend sobbing ("훌쩍 훌쩍 😭")
          for (let i = 0; i < 4; i++) {
            playTone('sine', 640 - i * 35, 420 - i * 25, 0.12, 0.15, i * 0.16);
          }
          break;
        case 'ㅚ': // Tornado vortex wind swirl ("휘오오오옹~")
          playTone('sawtooth', 190, 560, 0.35, 0.14, 0);
          playTone('sine', 560, 290, 0.35, 0.14, 0.25);
          break;
        case 'ㅝ': // Cheeky monkey chatter + banana boings!
          for (let i = 0; i < 3; i++) {
            playTone('triangle', 520 + i * 80, 760 + i * 60, 0.08, 0.16, i * 0.18);
          }
          playTone('sine', 320, 880, 0.25, 0.15, 0.56);
          break;
        case 'ㅞ': // Bright wedding bells ("딩동댕~🔔")
          playTone('sine', 523, 659, 0.18, 0.14, 0);
          playTone('sine', 784, 784, 0.22, 0.16, 0.22);
          break;
        case 'ㅟ': // Soft cloud whoosh + happy hop!
          playTone('sine', 320, 620, 0.24, 0.14, 0);
          playTone('sine', 520, 780, 0.16, 0.14, 0.26);
          break;
        case 'ㅢ': // Cozy footsteps + teacup clink
          for (let i = 0; i < 3; i++) {
            playTone('triangle', 260 + i * 30, 180, 0.06, 0.12, i * 0.12);
          }
          break;
        default:
          break;
      }
      return;
    }

    // impact / punchline SFX
    switch (char) {
      case 'ㅐ': // Giant pond SPLASH ("풍덩!!") + bubbles!
        playTone('triangle', 340, 70, 0.26, 0.28, 0);
        for (let i = 0; i < 4; i++) {
          playTone('sine', 380 + i * 110, 860 + i * 90, 0.08, 0.14, 0.08 + i * 0.07);
        }
        break;
      case 'ㅒ': // Knockdown from girlfriend's chatter + dizzy ear-ring whistle
        playTone('triangle', 220, 50, 0.24, 0.26, 0);
        playTone('sine', 1650, 1450, 0.4, 0.09, 0.08);
        break;
      case 'ㅔ': // Girlfriend beach tube WHACK ("펑!!") + crab zooming off into the sky ("휘이이잉~")
        playTone('square', 480, 90, 0.16, 0.28, 0);
        playTone('sine', 420, 1680, 0.48, 0.18, 0.1);
        break;
      case 'ㅖ': // Girlfriend cute jump BOING ("뿅!") + bowling strike crash + egg splat!
        playTone('sine', 440, 1180, 0.12, 0.18, 0);
        playTone('square', 640, 120, 0.14, 0.26, 0.08);
        playTone('triangle', 260, 55, 0.26, 0.28, 0.12);
        break;
      case 'ㅘ': // Sweet apple gift pop + romantic sparkle chime!
        playTone('sine', 587, 880, 0.14, 0.16, 0);
        playTone('sine', 880, 1174, 0.22, 0.16, 0.12);
        playTone('sine', 1174, 1568, 0.28, 0.14, 0.24);
        break;
      case 'ㅙ': // Crisp SLAP ("짝!!") + confused cartoon "왜?!" slide ("띠용?!")
        playTone('square', 1550, 180, 0.09, 0.3, 0);
        playTone('triangle', 260, 80, 0.14, 0.24, 0.02);
        playTone('sine', 380, 1240, 0.24, 0.18, 0.22);
        break;
      case 'ㅚ': // Tornado sky drop whistle ("휘이잉~") + head-first ground plant ("푹!!")
        playTone('sine', 1240, 240, 0.34, 0.2, 0);
        playTone('triangle', 200, 48, 0.28, 0.3, 0.34);
        break;
      case 'ㅝ': // Superman punch blasts monkey away + warm hug chime!
        playTone('square', 520, 110, 0.14, 0.26, 0);
        playTone('sine', 440, 1560, 0.34, 0.16, 0.08);
        playTone('sine', 659, 987, 0.28, 0.16, 0.36);
        break;
      case 'ㅞ': // Golden wedding bell chime fanfare ("딩~동~댕~🔔💖")
        playTone('sine', 1046, 1046, 0.22, 0.18, 0);
        playTone('sine', 1318, 1318, 0.24, 0.18, 0.18);
        playTone('sine', 1568, 1568, 0.36, 0.2, 0.36);
        break;
      case 'ㅟ': // Dreamy cloud ascending straight up into the sky ("위~☁️↑")
        playTone('sine', 523, 784, 0.22, 0.16, 0);
        playTone('sine', 659, 988, 0.24, 0.16, 0.16);
        playTone('sine', 784, 1318, 0.38, 0.16, 0.32);
        break;
      case 'ㅢ': // Cozy teacup clink + warm relaxing ending fanfare ("짠~☕💖")
        playTone('sine', 1396, 1396, 0.08, 0.14, 0);
        playTone('sine', 659, 659, 0.16, 0.15, 0.16);
        playTone('sine', 880, 880, 0.18, 0.15, 0.3);
        playTone('sine', 1046, 1046, 0.3, 0.16, 0.44);
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 5 (7 Representative Batchim ㄱ, ㄴ, ㄷ, ㄹ, ㅁ, ㅂ, ㅇ) comic Web Audio SFX
 * Supports 'setup' anticipation cues and 'impact' climax cues (default 'impact').
 */
export function playBatchimSfx(char: string, stage: 'setup' | 'impact' = 'impact'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    if (stage === 'setup') {
      switch (char) {
        case 'ㄱ': // Hollow melon tap ("통! 통!") + rising rumble
          playTone('triangle', 290, 210, 0.08, 0.22, 0);
          playTone('triangle', 320, 230, 0.08, 0.22, 0.16);
          playTone('sawtooth', 120, 280, 0.28, 0.12, 0.3);
          break;
        case 'ㄴ': // Winter blizzard wind gust + rolling snowball rumble ("휘이잉~")
          playTone('sine', 260, 740, 0.42, 0.13, 0);
          playTone('triangle', 140, 95, 0.36, 0.16, 0.12);
          break;
        case 'ㄷ': // Metal spoon creak + tension wind-up ("끼이익~")
          playTone('sawtooth', 420, 680, 0.16, 0.13, 0);
          playTone('triangle', 280, 520, 0.2, 0.14, 0.18);
          break;
        case 'ㄹ': // Sharp katana unsheathe metallic shimmer ("스르르릉~")
          playTone('sine', 740, 1480, 0.34, 0.14, 0);
          playTone('triangle', 1120, 1680, 0.24, 0.1, 0.12);
          break;
        case 'ㅁ': // Heavy grizzly stomp + hungry sniff growl ("쿵! 킁킁~")
          playTone('triangle', 140, 48, 0.16, 0.24, 0);
          playTone('sawtooth', 165, 92, 0.32, 0.2, 0.18);
          break;
        case 'ㅂ': // Metal shovel scraping gravel/earth ("사각! 쓱~")
          playTone('sawtooth', 320, 620, 0.16, 0.12, 0);
          playTone('triangle', 180, 110, 0.2, 0.16, 0.16);
          break;
        case 'ㅇ': // Heavy bowling ball wooden lane rumble ("데구르르르~")
          playTone('triangle', 110, 82, 0.45, 0.2, 0);
          playTone('sawtooth', 145, 115, 0.4, 0.1, 0.05);
          break;
        default:
          break;
      }
      return;
    }

    switch (char) {
      case 'ㄱ': // Giant watermelon POP explosion ("펑!!") + seed spit ("퉤퉤!")
        playTone('triangle', 260, 46, 0.26, 0.34, 0);
        playTone('square', 820, 160, 0.12, 0.22, 0.02);
        playTone('sine', 640, 320, 0.08, 0.16, 0.28);
        playTone('sine', 700, 350, 0.08, 0.16, 0.42);
        break;
      case 'ㄴ': // Giant snowball CRASH ("우르르 퍽!!") + icy sparkle
        playTone('sawtooth', 290, 75, 0.32, 0.18, 0);
        playTone('triangle', 150, 38, 0.28, 0.3, 0.14);
        playTone('sine', 1046, 1568, 0.16, 0.12, 0.28);
        break;
      case 'ㄷ': // Metallic spoon catapult SNAP + sky slide-whistle + broth splash ("철컥! 휘이잉~ 첨벙!")
        playTone('square', 980, 420, 0.09, 0.22, 0);
        playTone('sine', 380, 1480, 0.48, 0.18, 0.08);
        playTone('triangle', 320, 72, 0.22, 0.26, 0.56);
        break;
      case 'ㄹ': // Blazing sword whoosh + crisp metallic SLASH ("휙— 싹둑!!")
        playTone('sine', 1280, 260, 0.16, 0.24, 0);
        playTone('square', 980, 320, 0.09, 0.2, 0.05);
        playTone('sine', 1640, 1120, 0.22, 0.12, 0.14);
        break;
      case 'ㅁ': // Bear fierce growl + dizzy pocket rattle ("크르렁~ 탈탈탈!")
        playTone('sawtooth', 145, 68, 0.38, 0.26, 0);
        [0.14, 0.28, 0.42].forEach((delay, idx) => {
          playTone('sine', 880 + idx * 180, 1320 + idx * 140, 0.09, 0.14, delay);
        });
        break;
      case 'ㅂ': // Heavy dirt scoop dump thuds ("푸석! 푸석!")
        playTone('triangle', 200, 56, 0.22, 0.28, 0);
        playTone('sawtooth', 260, 95, 0.14, 0.14, 0.04);
        playTone('triangle', 180, 48, 0.24, 0.3, 0.22);
        break;
      case 'ㅇ': // Heavy bowling STRIKE CRASH + clattering pins ("STRIKE!! 와르르~")
        playTone('triangle', 240, 42, 0.3, 0.34, 0);
        playTone('square', 880, 180, 0.14, 0.24, 0.02);
        [0.1, 0.18, 0.26, 0.34].forEach((delay, idx) => {
          playTone('sine', 1120 - idx * 90, 740, 0.11, 0.15, delay);
        });
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}

export type KoreanVoicePreset = 'device' | 'Kore' | 'Zephyr' | 'Puck';

let cachedKoreanVoice: SpeechSynthesisVoice | null = null;
let activeUtterance: SpeechSynthesisUtterance | null = null;
let speechInFlight = false;
let speechSafetyTimer: number | null = null;
let koreanSpeechEnabled = true;
let activeVoicePreset: KoreanVoicePreset = 'device';
let lastTtsError: string | null = null;
const speechCompleteListeners = new Set<() => void>();
const ttsErrorListeners = new Set<(err: string | null) => void>();

// AI TTS audio playback & multi-layer caching (memory AudioBuffer + persistent Cache API)
const AI_TTS_CACHE_NAME = 'haebol-ai-tts-v1';
const aiBufferCache = new Map<string, AudioBuffer>();
const aiInflightFetch = new Map<string, Promise<AudioBuffer>>();
let speechGenId = 0;
let activeAiSource: AudioBufferSourceNode | null = null;
let activeAiBuffer: AudioBuffer | null = null;
let activeAiRate = 1.0;
let activeAiStartedAt = 0;
let activeAiOffset = 0;
let activeAiPaused = false;
let activeAiOnEnd: (() => void) | undefined;

function emitTtsError(err: string | null): void {
  lastTtsError = err;
  ttsErrorListeners.forEach((cb) => {
    try {
      cb(err);
    } catch {
      // ignore listener error
    }
  });
}

export function subscribeTtsError(cb: (err: string | null) => void): () => void {
  ttsErrorListeners.add(cb);
  cb(lastTtsError);
  return () => {
    ttsErrorListeners.delete(cb);
  };
}

export function clearTtsError(): void {
  emitTtsError(null);
}

export function setKoreanVoicePreset(preset: KoreanVoicePreset): void {
  activeVoicePreset = preset;
  if (preset === 'device') {
    emitTtsError(null);
  }
}

export function setKoreanSpeechEnabled(enabled: boolean): void {
  koreanSpeechEnabled = enabled;
  if (!enabled) {
    cancelKoreanSpeech();
  }
}

export function isKoreanSpeechEnabled(): boolean {
  return koreanSpeechEnabled;
}

function notifySpeechComplete(): void {
  if (speechSafetyTimer !== null) {
    window.clearTimeout(speechSafetyTimer);
    speechSafetyTimer = null;
  }
  speechInFlight = false;
  const listeners = Array.from(speechCompleteListeners);
  speechCompleteListeners.clear();
  listeners.forEach((cb) => {
    try {
      cb();
    } catch {
      // ignore listener errors
    }
  });
}

function stopActiveAiSourceOnly(): void {
  if (activeAiSource) {
    try {
      activeAiSource.onended = null;
      activeAiSource.stop();
      activeAiSource.disconnect();
    } catch {
      // ignore
    }
    activeAiSource = null;
  }
}

function resetAiPlaybackState(): void {
  stopActiveAiSourceOnly();
  activeAiBuffer = null;
  activeAiOffset = 0;
  activeAiStartedAt = 0;
  activeAiPaused = false;
  activeAiOnEnd = undefined;
}

export function isKoreanSpeechActive(): boolean {
  if (speechInFlight || activeAiSource !== null || activeAiPaused) return true;
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return window.speechSynthesis.speaking || window.speechSynthesis.pending;
  }
  return false;
}

export function onKoreanSpeechComplete(cb: () => void): () => void {
  if (!isKoreanSpeechActive()) {
    cb();
    return () => {};
  }
  speechCompleteListeners.add(cb);
  return () => {
    speechCompleteListeners.delete(cb);
  };
}

export function cancelKoreanSpeech(): void {
  speechGenId += 1;
  resetAiPlaybackState();
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }
  activeUtterance = null;
  notifySpeechComplete();
}

export function pauseKoreanSpeech(): void {
  if (activeAiSource && activeAiBuffer && !activeAiPaused) {
    const ctx = getAudioContext();
    if (ctx) {
      activeAiOffset += Math.max(0, ctx.currentTime - activeAiStartedAt) * activeAiRate;
    }
    activeAiPaused = true;
    stopActiveAiSourceOnly();
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
      window.speechSynthesis.pause();
    }
  }
}

export function resumeKoreanSpeech(): void {
  if (activeAiPaused && activeAiBuffer) {
    activeAiPaused = false;
    const ctx = getAudioContext();
    if (ctx && activeAiOffset < activeAiBuffer.duration - 0.02) {
      startAiBufferPlayback(activeAiBuffer, activeAiRate, activeAiOffset, activeAiOnEnd, speechGenId);
    } else {
      const doneCb = activeAiOnEnd;
      resetAiPlaybackState();
      notifySpeechComplete();
      doneCb?.();
    }
  }
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    if (window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  }
}

function base64ToArrayBuffer(b64: string): ArrayBuffer {
  const binaryStr = window.atob(b64);
  const len = binaryStr.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryStr.charCodeAt(i);
  }
  return bytes.buffer;
}

function makeTtsCacheUrl(voice: string, text: string): string {
  return `/__tts_cache__/${encodeURIComponent(voice)}/${encodeURIComponent(text)}`;
}

async function decodeWavBuffer(arrayBuf: ArrayBuffer): Promise<AudioBuffer> {
  const ctx = getAudioContext();
  if (!ctx) throw new Error('AudioContext not available');
  // slice(0) because decodeAudioData detaches the passed ArrayBuffer
  return await ctx.decodeAudioData(arrayBuf.slice(0));
}

async function fetchOrLoadAiSpeechBuffer(text: string, voice: 'Kore' | 'Zephyr' | 'Puck'): Promise<AudioBuffer> {
  const cleanText = text.trim();
  const memKey = `${voice}::${cleanText}`;

  const memHit = aiBufferCache.get(memKey);
  if (memHit) return memHit;

  const existingPromise = aiInflightFetch.get(memKey);
  if (existingPromise) return existingPromise;

  const task = (async (): Promise<AudioBuffer> => {
    // 1. Check persistent browser Cache API first (0 API requests across reloads & loops!)
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await window.caches.open(AI_TTS_CACHE_NAME);
        const cacheHit = await cache.match(makeTtsCacheUrl(voice, cleanText));
        if (cacheHit) {
          const arr = await cacheHit.arrayBuffer();
          const decoded = await decodeWavBuffer(arr);
          aiBufferCache.set(memKey, decoded);
          return decoded;
        }
      } catch {
        // Ignore Cache API read errors (e.g. private browsing)
      }
    }

    // 2. Request server /api/tts (which also has a server-side memory cache)
    const resp = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: cleanText, voiceName: voice }),
    });

    const data = (await resp.json().catch(() => ({}))) as {
      audioBase64?: string;
      error?: string;
    };

    if (!resp.ok || !data.audioBase64) {
      throw new Error(data.error || `AI 음성 호출 실패 (HTTP ${resp.status})`);
    }

    const wavBuffer = base64ToArrayBuffer(data.audioBase64);
    const decoded = await decodeWavBuffer(wavBuffer);
    aiBufferCache.set(memKey, decoded);

    // 3. Save persistently in Cache API for future loops & sessions
    if (typeof window !== 'undefined' && 'caches' in window) {
      try {
        const cache = await window.caches.open(AI_TTS_CACHE_NAME);
        await cache.put(
          makeTtsCacheUrl(voice, cleanText),
          new Response(wavBuffer, {
            headers: { 'Content-Type': 'audio/wav' },
          })
        );
      } catch {
        // Ignore Cache API write errors
      }
    }

    emitTtsError(null);
    return decoded;
  })().finally(() => {
    aiInflightFetch.delete(memKey);
  });

  aiInflightFetch.set(memKey, task);
  return task;
}

/**
 * Prefetches a single AI speech clip right as an active consonant starts approaching,
 * avoiding any speculative batch quota burn for unplayed items.
 */
export function prefetchSingleAiSpeech(text: string): void {
  if (!koreanSpeechEnabled || activeVoicePreset === 'device' || !text.trim()) return;
  const voice = activeVoicePreset;
  void fetchOrLoadAiSpeechBuffer(text, voice).catch(() => {
    // Error is handled cleanly on actual playback if needed
  });
}

function startAiBufferPlayback(
  buffer: AudioBuffer,
  rate: number,
  offsetSec: number,
  onEnd: (() => void) | undefined,
  genId: number
): void {
  const ctx = getAudioContext();
  if (!ctx || genId !== speechGenId) {
    notifySpeechComplete();
    onEnd?.();
    return;
  }

  stopActiveAiSourceOnly();
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  src.playbackRate.value = Math.max(0.7, Math.min(1.5, rate));
  src.connect(ctx.destination);

  activeAiSource = src;
  activeAiBuffer = buffer;
  activeAiRate = src.playbackRate.value;
  activeAiStartedAt = ctx.currentTime;
  activeAiOffset = offsetSec;
  activeAiPaused = false;
  activeAiOnEnd = onEnd;
  speechInFlight = true;

  const remainingMs = Math.max(
    1800,
    Math.round(((buffer.duration - offsetSec) / activeAiRate) * 1000) + 1200
  );
  if (speechSafetyTimer !== null) {
    window.clearTimeout(speechSafetyTimer);
  }
  speechSafetyTimer = window.setTimeout(() => {
    if (genId === speechGenId && !activeAiPaused) {
      resetAiPlaybackState();
      notifySpeechComplete();
      onEnd?.();
    }
  }, remainingMs);

  src.onended = () => {
    if (activeAiSource !== src) return;
    if (activeAiPaused) return;
    if (genId !== speechGenId) return;
    resetAiPlaybackState();
    notifySpeechComplete();
    onEnd?.();
  };

  src.start(0, Math.max(0, offsetSec));
}

/**
 * Selects the most natural Korean female teacher voice (SunHi / Google / Yuna),
 * excluding robotic/male/SAPI Desktop voices.
 */
export function findBestKoreanVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const koreanVoices = voices.filter(
    (v) =>
      v.lang.toLowerCase().startsWith('ko') ||
      v.lang.toLowerCase().includes('kr') ||
      v.name.toLowerCase().includes('korean') ||
      v.name.includes('한국어')
  );
  if (koreanVoices.length === 0) return null;

  const scoreVoice = (v: SpeechSynthesisVoice): number => {
    let score = 0;
    const name = v.name.toLowerCase();
    if (name.includes('injoon') || name.includes('minho') || name.includes('male') || name.includes('남성')) return -500;
    if (name.includes('desktop') || name.includes('sapi')) score -= 200;
    if (name.includes('sunhi')) score += 260;
    if (name.includes('google') || name.includes('ko-kr-x-ism') || name.includes('한국어')) score += 240;
    if (name.includes('yuna')) score += 230;
    if (name.includes('sora') || name.includes('seoyeon')) score += 210;
    if (name.includes('female') || name.includes('여성')) score += 100;
    if (name.includes('natural') || name.includes('online')) score += 80;
    if (name.includes('neural') || name.includes('enhanced') || name.includes('premium')) score += 50;
    if (v.default) score += 20;
    return score;
  };

  koreanVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return koreanVoices[0];
}

function speakWithDeviceTts(
  text: string,
  rate: number,
  pitch: number,
  onEnd?: () => void,
  interrupt: boolean = true
): void {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) {
    notifySpeechComplete();
    onEnd?.();
    return;
  }

  try {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    if (interrupt) {
      window.speechSynthesis.cancel();
    }
    if (speechSafetyTimer !== null) {
      window.clearTimeout(speechSafetyTimer);
      speechSafetyTimer = null;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = pitch;

    const bestVoice = findBestKoreanVoice();
    if (bestVoice) {
      cachedKoreanVoice = bestVoice;
      utterance.voice = bestVoice;
    } else if (cachedKoreanVoice) {
      utterance.voice = cachedKoreanVoice;
    }

    activeUtterance = utterance;
    speechInFlight = true;

    const cleanup = () => {
      if (activeUtterance === utterance) {
        activeUtterance = null;
        notifySpeechComplete();
      }
      onEnd?.();
    };
    utterance.onend = cleanup;
    utterance.onerror = cleanup;

    // Watchdog so autoplay never hangs if browser TTS silently drops an utterance
    const maxWaitMs = Math.max(2600, Math.round((text.length * 260) / Math.max(0.5, rate)) + 1200);
    speechSafetyTimer = window.setTimeout(() => {
      if (activeUtterance === utterance) {
        cleanup();
      }
    }, maxWaitMs);

    window.speechSynthesis.speak(utterance);
  } catch {
    notifySpeechComplete();
    onEnd?.();
  }
}

let cachedEnglishVoice: SpeechSynthesisVoice | null = null;

export function findBestEnglishVoice(): SpeechSynthesisVoice | null {
  if (typeof window === 'undefined' || !('speechSynthesis' in window)) return null;
  const voices = window.speechSynthesis.getVoices();
  if (!voices || voices.length === 0) return null;

  const enVoices = voices.filter((v) => v.lang.toLowerCase().startsWith('en'));
  if (enVoices.length === 0) return null;

  const scoreVoice = (v: SpeechSynthesisVoice): number => {
    let score = 0;
    const name = v.name.toLowerCase();
    const lang = v.lang.toLowerCase();
    if (lang === 'en-us') score += 60;
    if (name.includes('google us english') || name.includes('aria') || name.includes('jenny') || name.includes('samantha')) score += 200;
    if (name.includes('natural') || name.includes('online')) score += 80;
    if (name.includes('neural') || name.includes('enhanced')) score += 40;
    if (v.default) score += 15;
    return score;
  };

  enVoices.sort((a, b) => scoreVoice(b) - scoreVoice(a));
  return enVoices[0];
}

/**
 * Speaks an English sentence with optional inline Korean syllable/particle tokens
 * chained in sequence so neither language gets skipped by single-locale TTS engines.
 */
export function speakMixedSegments(
  segments: Array<{ text: string; lang: 'en-US' | 'ko-KR'; rate?: number; pitch?: number }>,
  onEnd?: () => void,
  interrupt: boolean = true
): void {
  const validSegments = segments.filter((s) => s.text.trim().length > 0);
  if (!koreanSpeechEnabled || typeof window === 'undefined' || !('speechSynthesis' in window) || validSegments.length === 0) {
    onEnd?.();
    return;
  }

  try {
    if (window.speechSynthesis.paused) window.speechSynthesis.resume();
    if (interrupt) {
      speechGenId += 1;
      resetAiPlaybackState();
      window.speechSynthesis.cancel();
    }
    if (speechSafetyTimer !== null) {
      window.clearTimeout(speechSafetyTimer);
      speechSafetyTimer = null;
    }

    const myGenId = speechGenId;
    speechInFlight = true;

    const runIndex = (idx: number) => {
      if (myGenId !== speechGenId || !koreanSpeechEnabled) {
        return;
      }
      if (idx >= validSegments.length) {
        activeUtterance = null;
        notifySpeechComplete();
        onEnd?.();
        return;
      }

      const seg = validSegments[idx];
      const utterance = new SpeechSynthesisUtterance(seg.text);
      utterance.lang = seg.lang;
      utterance.rate = seg.rate ?? (seg.lang === 'en-US' ? 0.96 : 0.92);
      utterance.pitch = seg.pitch ?? 1.04;

      if (seg.lang === 'ko-KR') {
        const koVoice = findBestKoreanVoice();
        if (koVoice) {
          cachedKoreanVoice = koVoice;
          utterance.voice = koVoice;
        } else if (cachedKoreanVoice) {
          utterance.voice = cachedKoreanVoice;
        }
      } else {
        const enVoice = findBestEnglishVoice();
        if (enVoice) {
          cachedEnglishVoice = enVoice;
          utterance.voice = enVoice;
        } else if (cachedEnglishVoice) {
          utterance.voice = cachedEnglishVoice;
        }
      }

      activeUtterance = utterance;
      let advanced = false;
      const advance = () => {
        if (advanced) return;
        advanced = true;
        if (speechSafetyTimer !== null) {
          window.clearTimeout(speechSafetyTimer);
          speechSafetyTimer = null;
        }
        runIndex(idx + 1);
      };

      utterance.onend = advance;
      utterance.onerror = advance;

      const maxWaitMs = Math.max(1400, Math.round((seg.text.length * 140) / Math.max(0.5, utterance.rate)) + 900);
      speechSafetyTimer = window.setTimeout(() => {
        if (activeUtterance === utterance) {
          advance();
        }
      }, maxWaitMs);

      window.speechSynthesis.speak(utterance);
    };

    runIndex(0);
  } catch {
    notifySpeechComplete();
    onEnd?.();
  }
}

/**
 * Speaks Korean text. Uses Gemini AI TTS (Kore/Zephyr/Puck) ONLY when
 * options.allowAiVoice is true and an AI voice preset is active;
 * otherwise uses quota-free device Web Speech Synthesis API.
 */
export function speakKorean(
  text: string,
  rate: number = 0.92,
  pitch: number = 1.0,
  onEnd?: () => void,
  interrupt: boolean = true,
  options?: { allowAiVoice?: boolean }
): void {
  if (!koreanSpeechEnabled || typeof window === 'undefined') {
    onEnd?.();
    return;
  }

  if (interrupt) {
    speechGenId += 1;
    resetAiPlaybackState();
  }
  const myGenId = speechGenId;

  const useAiVoice = Boolean(options?.allowAiVoice) && activeVoicePreset !== 'device';
  if (!useAiVoice) {
    speakWithDeviceTts(text, rate, pitch, onEnd, interrupt);
    return;
  }

  const chosenVoice = activeVoicePreset as 'Kore' | 'Zephyr' | 'Puck';
  speechInFlight = true;

  if (speechSafetyTimer !== null) {
    window.clearTimeout(speechSafetyTimer);
    speechSafetyTimer = null;
  }
  speechSafetyTimer = window.setTimeout(() => {
    if (myGenId === speechGenId && speechInFlight && !activeAiPaused && !activeAiSource) {
      notifySpeechComplete();
      onEnd?.();
    }
  }, 8500);

  void fetchOrLoadAiSpeechBuffer(text, chosenVoice)
    .then((buffer) => {
      if (myGenId !== speechGenId || !koreanSpeechEnabled) {
        return;
      }
      startAiBufferPlayback(buffer, Math.max(0.85, Math.min(1.2, rate / 0.92)), 0, onEnd, myGenId);
    })
    .catch((err: unknown) => {
      if (myGenId !== speechGenId || !koreanSpeechEnabled) {
        return;
      }
      const message = err instanceof Error ? err.message : 'AI 음성 생성 중 오류가 발생했습니다.';
      emitTtsError(message);
      speakWithDeviceTts(text, rate, pitch, onEnd, interrupt);
    });
}

/**
 * Play Jollaman 6 (End-Sound Transformation Batchim ㄲ, ㅅ, ㅈ, ㅊ, ㅋ, ㅌ, ㅍ, ㅆ, ㅎ) comic Web Audio SFX
 * Supports 'setup' anticipation cues and 'impact' climax cues (default 'impact').
 */
export function playBatchim2Sfx(char: string, stage: 'setup' | 'impact' = 'impact'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    if (stage === 'setup') {
      switch (char) {
        case 'ㄲ': // Porch door click + howling blizzard wind ("찰칵~ 휘이잉!")
          playTone('square', 680, 320, 0.08, 0.14, 0);
          playTone('sine', 340, 620, 0.44, 0.12, 0.12);
          break;
        case 'ㅅ': // Zipping up super-stiff starched shirt ("지이익~")
          playTone('sawtooth', 420, 1280, 0.34, 0.12, 0);
          playTone('triangle', 680, 1040, 0.18, 0.1, 0.22);
          break;
        case 'ㅈ': // 12:00 blazing solar heat shimmer hum ("지글지글~")
          playTone('sine', 420, 740, 0.42, 0.12, 0);
          playTone('triangle', 260, 480, 0.28, 0.09, 0.14);
          break;
        case 'ㅊ': // Sniffing flower + cheeky bee buzz ("킁~ 윙~~")
          playTone('sine', 380, 520, 0.14, 0.11, 0);
          playTone('sawtooth', 260, 310, 0.36, 0.12, 0.18);
          break;
        case 'ㅋ': // Skillet pancake flip whoosh ("휘이익~")
          playTone('sine', 340, 1080, 0.24, 0.15, 0);
          playTone('triangle', 220, 140, 0.2, 0.16, 0.22);
          break;
        case 'ㅌ': // Radish yanking grunt strain ("으라차~ 영차!")
          playTone('sawtooth', 165, 220, 0.16, 0.15, 0);
          playTone('sawtooth', 185, 260, 0.18, 0.17, 0.2);
          break;
        case 'ㅍ': // Forest branch creak before giant pinecone drops ("끼기긱~")
          playTone('sawtooth', 250, 175, 0.26, 0.13, 0);
          playTone('triangle', 460, 700, 0.14, 0.14, 0.22);
          break;
        case 'ㅆ': // Treasure chest rattle tease ("달그락~ 반짝!")
          playTone('sine', 780, 1180, 0.12, 0.14, 0);
          playTone('sawtooth', 200, 360, 0.22, 0.12, 0.14);
          break;
        case 'ㅎ': // Shy ㅎ ghost eerie tremble + mirror shimmer ("오들오들~ 띠링!")
          playTone('sine', 460, 380, 0.28, 0.12, 0);
          playTone('triangle', 740, 1180, 0.22, 0.12, 0.22);
          break;
        default:
          break;
      }
      return;
    }

    switch (char) {
      case 'ㄲ': // Instant blizzard freeze shatter + icy crystal chime ("쩌적! 꽁!")
        playTone('triangle', 1240, 520, 0.18, 0.2, 0);
        playTone('sine', 1680, 960, 0.22, 0.18, 0.08);
        playTone('sawtooth', 220, 62, 0.24, 0.26, 0.14);
        break;
      case 'ㅅ': // Stiff armor snap clank + plank fall thud ("딱! 쿵!")
        playTone('square', 760, 420, 0.12, 0.2, 0);
        playTone('triangle', 220, 58, 0.28, 0.3, 0.26);
        break;
      case 'ㅈ': // Heat melt squish plop + tired sizzle ("주르륵~ 푸욱!")
        playTone('sine', 740, 220, 0.34, 0.18, 0);
        playTone('sawtooth', 320, 140, 0.24, 0.14, 0.18);
        break;
      case 'ㅊ': // Bee sting BOOP + cartoon spring + pot crash ("아야! 띠용~ 쨍그랑!")
        playTone('sine', 520, 1280, 0.14, 0.22, 0);
        playTone('triangle', 360, 880, 0.2, 0.18, 0.14);
        playTone('sawtooth', 240, 68, 0.26, 0.28, 0.28);
        break;
      case 'ㅋ': // Crisp snap + cast-iron skillet GONG + pancake squash ("뚝! 깡!! 찌부!")
        playTone('square', 1120, 540, 0.09, 0.22, 0);
        playTone('square', 720, 290, 0.3, 0.24, 0.06);
        playTone('sawtooth', 220, 44, 0.28, 0.32, 0.14);
        break;
      case 'ㅌ': // Giant radish POP explosion + spin whistle + dirt thud ("뻥!! 휘잉~ 푹!")
        playTone('sine', 320, 1240, 0.16, 0.28, 0);
        playTone('triangle', 760, 180, 0.34, 0.18, 0.14);
        playTone('sawtooth', 180, 52, 0.26, 0.3, 0.38);
        break;
      case 'ㅍ': // Heavy pinecone BONK + tent snap-fold ("콩!! 착!")
        playTone('sawtooth', 240, 54, 0.24, 0.32, 0);
        playTone('square', 640, 320, 0.14, 0.22, 0.08);
        break;
      case 'ㅆ': // Giant [ㄷ] stamp POW + coin jingle ("쾅!! 짤랑!")
        playTone('sine', 280, 1120, 0.16, 0.24, 0);
        playTone('triangle', 240, 42, 0.28, 0.34, 0.12);
        [0.24, 0.31, 0.38].forEach((d, idx) => {
          playTone('sine', 1120 + idx * 180, 1680 + idx * 120, 0.08, 0.15, d);
        });
        break;
      case 'ㅎ': // Magic mirror sparkle fanfare + royal knight helmet CLANG! ("샤라랑~ 챙!!")
        [0, 0.07, 0.14].forEach((d, idx) => {
          playTone('sine', 660 + idx * 220, 990 + idx * 240, 0.16, 0.16, d);
        });
        playTone('square', 820, 480, 0.22, 0.24, 0.2);
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}


/**
 * Play Jollaman 7 (11 Double Batchim ㄳ ~ ㅄ) comic Web Audio SFX
 * Supports 'setup' anticipation cues and 'impact' climax cues (default 'impact').
 */
export function playDoubleBatchimSfx(char: string, stage: 'setup' | 'impact' = 'impact'): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.18, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    if (stage === 'setup') {
      switch (char) {
        case 'ㄳ': // Pizzeria arrival bell + friends excited chatter ("딩동~ 피자다!")
          playTone('sine', 523, 784, 0.12, 0.15, 0);
          playTone('triangle', 440, 620, 0.14, 0.14, 0.16);
          break;
        case 'ㄵ': // Sitting on poolside chair + spring creak ("끼이익~")
          playTone('triangle', 320, 480, 0.14, 0.14, 0);
          playTone('sawtooth', 180, 260, 0.2, 0.1, 0.18);
          break;
        case 'ㄶ': // Playful ballpit bounce pops ("통! 통! 통! 통!")
          [0, 0.11, 0.22, 0.33].forEach((d, idx) => {
            playTone('sine', 420 + idx * 95, 580 + idx * 105, 0.08, 0.14, d);
          });
          break;
        case 'ㄺ': // Taunting rooster cluck-cluck ("꼬꼬~ 꼬옥!")
          playTone('sawtooth', 480, 620, 0.1, 0.14, 0);
          playTone('sawtooth', 520, 740, 0.12, 0.15, 0.16);
          break;
        case 'ㄻ': // Deep starving stomach growl ("꼬르르륵~")
          playTone('sawtooth', 95, 62, 0.34, 0.18, 0);
          playTone('triangle', 125, 78, 0.28, 0.15, 0.16);
          break;
        case 'ㄼ': // Jaunty whistling stroll ("룰루~ 랄라!")
          playTone('sine', 523, 659, 0.12, 0.14, 0);
          playTone('sine', 659, 784, 0.14, 0.14, 0.15);
          break;
        case 'ㄽ': // Maze entry footsteps ("뚜벅뚜벅~")
          playTone('triangle', 300, 440, 0.12, 0.14, 0);
          playTone('triangle', 360, 520, 0.12, 0.14, 0.15);
          break;
        case 'ㄾ': // Happy ice cream chime ("랄라~ 아이스크림!")
          playTone('sine', 520, 740, 0.12, 0.14, 0);
          playTone('triangle', 380, 640, 0.12, 0.15, 0.15);
          break;
        case 'ㄿ': // Dramatic throat clear + poetry hum ("으흠~ 아아~")
          playTone('sine', 280, 440, 0.22, 0.15, 0);
          playTone('triangle', 440, 520, 0.24, 0.13, 0.22);
          break;
        case 'ㅀ': // Spooky ghost wail ("우우우~ 싫어~!")
          playTone('sine', 420, 290, 0.22, 0.14, 0);
          playTone('sine', 360, 240, 0.24, 0.14, 0.2);
          break;
        case 'ㅄ': // Eager footsteps toward park exit ("야호! 출구다!")
          playTone('sine', 440, 587, 0.1, 0.14, 0);
          playTone('sine', 587, 740, 0.12, 0.14, 0.14);
          break;
        case '짧다': // Tiny coaster gate latch + excited whistle ("출발~!")
          playTone('sine', 520, 740, 0.08, 0.14, 0);
          playTone('sine', 660, 880, 0.1, 0.14, 0.12);
          break;
        case '읽고': // Magic spellbook page flutter + ㄱ+ㄱ clashing sparks ("팔락~ 찌릿!")
          playTone('triangle', 460, 620, 0.12, 0.14, 0);
          playTone('square', 780, 540, 0.08, 0.11, 0.18);
          break;
        case '많아': // Timid ㅎ ghost shivering before vanishing ("후들후들~")
          playTone('sine', 520, 440, 0.16, 0.13, 0);
          playTone('sine', 480, 640, 0.16, 0.13, 0.16);
          break;
        case '많고': // Fuse burning + cannonball wind-up ("쉬이이~ 장전!")
          playTone('sawtooth', 260, 680, 0.32, 0.14, 0);
          break;
        default:
          break;
      }
      return;
    }

    switch (char) {
      case 'ㄳ': // Rapid friend pizza munch + triumphant last-slice grab ("냠냠냠! 내 몫!!")
        [0, 0.09, 0.18].forEach((d) => {
          playTone('triangle', 420, 220, 0.08, 0.18, d);
        });
        playTone('sine', 520, 980, 0.18, 0.22, 0.3);
        break;
      case 'ㄵ': // Giant spring BOING + swimming pool SPLASH ("띠요오옹!! 풍덩!!")
        playTone('sine', 240, 1280, 0.32, 0.22, 0);
        playTone('triangle', 220, 56, 0.28, 0.28, 0.38);
        playTone('sine', 420, 140, 0.18, 0.2, 0.4);
        break;
      case 'ㄶ': // Overflowing ballpit avalanche + comical muffled pop ("우르르르~ 뿅!")
        [0, 0.07, 0.14, 0.21, 0.28].forEach((offset, idx) => {
          playTone('sine', 460 - idx * 45, 160, 0.09, 0.16, offset);
        });
        playTone('sine', 520, 880, 0.12, 0.22, 0.38);
        break;
      case 'ㄺ': // Rooster furious peck + golden egg POP ("콕콕! 꼬꼬댁! 퐁!!")
        [0, 0.1, 0.2].forEach((offset, i) => {
          playTone('sawtooth', i === 2 ? 840 : 540, i === 2 ? 1280 : 720, 0.08, 0.18, offset);
        });
        playTone('sine', 380, 1080, 0.14, 0.24, 0.36);
        break;
      case 'ㄻ': // Empty fridge squeak + colossal belly vacuum tornado ("끼익~ 꼬르륵 휘이이잉!!")
        playTone('sawtooth', 92, 165, 0.28, 0.24, 0);
        playTone('sine', 240, 960, 0.44, 0.18, 0.16);
        break;
      case 'ㄼ': // Sticky taffy bubble stretch + giant bubblegum POP ("쭈우욱~ 펑!!")
        playTone('triangle', 175, 540, 0.32, 0.22, 0);
        playTone('square', 780, 95, 0.14, 0.3, 0.34);
        break;
      case 'ㄽ': // Maze wall bonk + straight-ahead glowing guide chime ("콩! 직진~ 띠링!")
        playTone('triangle', 240, 72, 0.16, 0.26, 0);
        playTone('triangle', 240, 72, 0.16, 0.26, 0.2);
        playTone('sine', 520, 920, 0.22, 0.2, 0.42);
        break;
      case 'ㄾ': // Passing dog dash + giant ice cream slurp ("호다닥! 낼름!!")
        playTone('triangle', 480, 760, 0.1, 0.18, 0);
        [0.14, 0.28].forEach((d) => {
          playTone('sine', 240, 880, 0.13, 0.22, d);
        });
        break;
      case 'ㄿ': // Fly/leaf gulp cough + booming mic echo ("캑! 웅~~ 삐이!")
        playTone('sawtooth', 620, 240, 0.12, 0.2, 0);
        playTone('sine', 180, 420, 0.28, 0.22, 0.14);
        playTone('sine', 1120, 980, 0.22, 0.12, 0.36);
        break;
      case 'ㅀ': // Ghost & Zombie ambush boo + panicked scream ("우와악!! 싫어!!")
        playTone('sawtooth', 165, 92, 0.24, 0.2, 0);
        playTone('sine', 580, 960, 0.22, 0.18, 0.12);
        playTone('triangle', 220, 120, 0.22, 0.16, 0.28);
        break;
      case 'ㅄ': // Screeching halt + comical shocked gong ("끼이익! 텅~ 없음!!")
        playTone('sawtooth', 520, 220, 0.2, 0.16, 0);
        playTone('triangle', 210, 72, 0.34, 0.28, 0.18);
        break;
      case '짧다': // Instant 0.1s mini-coaster zip + immediate bumper bonk ("슈웅! 퍽?! 도착?!")
        playTone('sine', 880, 320, 0.12, 0.22, 0);
        playTone('triangle', 220, 95, 0.14, 0.24, 0.13);
        playTone('sine', 420, 640, 0.14, 0.16, 0.3);
        break;
      case '읽고': // Superhero ㄹ kick bonking ㄱ + spellbook SNAP ("퓽! 딱!! 일꼬!")
        playTone('sine', 340, 1080, 0.18, 0.22, 0);
        playTone('triangle', 240, 58, 0.24, 0.3, 0.18);
        break;
      case '많아': // Magic ㅎ poof vaporize + bouncy trampoline liaison BOING ("뽕~ 띠용~ 마나!")
        playTone('sine', 640, 1320, 0.18, 0.2, 0);
        playTone('triangle', 320, 880, 0.24, 0.2, 0.18);
        break;
      case '많고': // Super Saiyan ㅎ+ㄱ -> ㅋ lightning smash EXPLOSION ("퍼엉!! 콰앙! 만코!")
        playTone('sawtooth', 180, 48, 0.32, 0.3, 0);
        playTone('square', 520, 1280, 0.26, 0.18, 0.06);
        playTone('sine', 880, 1560, 0.24, 0.16, 0.26);
        break;
      default:
        break;
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 8 (Korean Phonology & Liaison Magic) Web Audio SFX
 */
export function playPhonologySfx(
  ruleType: 'liaison' | 'aspiration' | 'euDrop' | 'sameDrop' | 'flyUp' | 'sinkDown' | 'tensify'
): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (ruleType === 'liaison') {
      // Rolling boulder rumble + donut-ring bounce boing!
      const roll = ctx.createOscillator();
      const rg = ctx.createGain();
      roll.type = 'triangle';
      roll.frequency.setValueAtTime(120, now);
      roll.frequency.linearRampToValueAtTime(220, now + 0.25);
      roll.frequency.exponentialRampToValueAtTime(90, now + 0.42);
      rg.gain.setValueAtTime(0.24, now);
      rg.gain.exponentialRampToValueAtTime(0.001, now + 0.44);
      roll.connect(rg);
      rg.connect(ctx.destination);
      roll.start(now);
      roll.stop(now + 0.45);
    } else if (ruleType === 'aspiration') {
      // Hydraulic wall clamp squish + explosive transformation pop!
      const clamp = ctx.createOscillator();
      const cg = ctx.createGain();
      clamp.type = 'square';
      clamp.frequency.setValueAtTime(190, now);
      clamp.frequency.exponentialRampToValueAtTime(52, now + 0.22);
      cg.gain.setValueAtTime(0.26, now);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      clamp.connect(cg);
      cg.connect(ctx.destination);
      clamp.start(now);
      clamp.stop(now + 0.26);

      const pop = ctx.createOscillator();
      const pg = ctx.createGain();
      pop.type = 'sine';
      pop.frequency.setValueAtTime(340, now + 0.36);
      pop.frequency.exponentialRampToValueAtTime(980, now + 0.52);
      pg.gain.setValueAtTime(0.22, now + 0.36);
      pg.gain.exponentialRampToValueAtTime(0.001, now + 0.55);
      pop.connect(pg);
      pg.connect(ctx.destination);
      pop.start(now + 0.36);
      pop.stop(now + 0.56);
    } else if (ruleType === 'euDrop' || ruleType === 'flyUp') {
      // High-pitched rocket slide-whistle takeoff ("휘이이잉~!")
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1420, now + 0.55);
      g.gain.setValueAtTime(0.2, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.6);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.62);
    } else if (ruleType === 'sameDrop' || ruleType === 'sinkDown') {
      // Trapdoor sinkhole downward slide ("쑤욱~!")
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(640, now);
      osc.frequency.exponentialRampToValueAtTime(85, now + 0.52);
      g.gain.setValueAtTime(0.26, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.56);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.58);
    } else {
      // Electric zap + twin clone boing ("찌릿! 뿅뿅!")
      [0, 0.12].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'sawtooth' : 'sine';
        osc.frequency.setValueAtTime(i === 0 ? 780 : 520, now + offset);
        osc.frequency.exponentialRampToValueAtTime(i === 0 ? 320 : 1040, now + offset + 0.14);
        g.gain.setValueAtTime(0.2, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.2);
      });
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 9 (Phonology Part 2: Nasalization, Liquidization, Palatalization, Vanishing) Web Audio SFX
 */
export function playPhonology2Sfx(
  ruleType: 'nasal' | 'liquid' | 'palatal' | 'hDrop' | 'clusterDrop'
): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (ruleType === 'nasal') {
      // Comical nose honk ("빵빵~") + nasal resonance hum
      [0, 0.16].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(i === 0 ? 240 : 280, now + offset);
        osc.frequency.exponentialRampToValueAtTime(i === 0 ? 190 : 350, now + offset + 0.14);
        g.gain.setValueAtTime(0.18, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.16);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.18);
      });
    } else if (ruleType === 'liquid') {
      // Slippery water-slide glissando wave ("미끌~")
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(760, now);
      osc.frequency.exponentialRampToValueAtTime(340, now + 0.22);
      osc.frequency.exponentialRampToValueAtTime(880, now + 0.44);
      g.gain.setValueAtTime(0.22, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.48);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.5);
    } else if (ruleType === 'palatal') {
      // Camera flash sparkle chime ("찰칵! 치~!")
      [0, 0.09].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = i === 0 ? 'triangle' : 'sine';
        osc.frequency.setValueAtTime(i === 0 ? 960 : 1280, now + offset);
        osc.frequency.exponentialRampToValueAtTime(i === 0 ? 1420 : 1760, now + offset + 0.14);
        g.gain.setValueAtTime(0.2, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.18);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.2);
      });
    } else if (ruleType === 'hDrop') {
      // Soap bubble pop ("뽕~!")
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(260, now);
      osc.frequency.exponentialRampToValueAtTime(1180, now + 0.1);
      g.gain.setValueAtTime(0.26, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      osc.connect(g);
      g.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.15);
    } else {
      // Batchim kick-out thud + flying whistle ("뻥~!")
      const thud = ctx.createOscillator();
      const tg = ctx.createGain();
      thud.type = 'square';
      thud.frequency.setValueAtTime(180, now);
      thud.frequency.exponentialRampToValueAtTime(55, now + 0.18);
      tg.gain.setValueAtTime(0.24, now);
      tg.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
      thud.connect(tg);
      tg.connect(ctx.destination);
      thud.start(now);
      thud.stop(now + 0.22);

      const fly = ctx.createOscillator();
      const fg = ctx.createGain();
      fly.type = 'sine';
      fly.frequency.setValueAtTime(420, now + 0.1);
      fly.frequency.exponentialRampToValueAtTime(1320, now + 0.42);
      fg.gain.setValueAtTime(0.18, now + 0.1);
      fg.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      fly.connect(fg);
      fg.connect(ctx.destination);
      fly.start(now + 0.1);
      fly.stop(now + 0.46);
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 10 (Korean Irregular Conjugations: ㅂ, ㄷ, ㅅ, 르, ㅡ, ㅎ, ㄹ, 여) Web Audio SFX
 */
export function playIrregularSfx(
  ruleType: 'bIrreg' | 'dIrreg' | 'sIrreg' | 'reuIrreg' | 'euDrop' | 'hIrreg' | 'lDrop' | 'yeoIrreg'
): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (ruleType === 'bIrreg') {
      // Ice crack + warm campfire whoosh
      const crack = ctx.createOscillator();
      const cg = ctx.createGain();
      crack.type = 'sawtooth';
      crack.frequency.setValueAtTime(1100, now);
      crack.frequency.exponentialRampToValueAtTime(180, now + 0.14);
      cg.gain.setValueAtTime(0.24, now);
      cg.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      crack.connect(cg);
      cg.connect(ctx.destination);
      crack.start(now);
      crack.stop(now + 0.18);

      const warm = ctx.createOscillator();
      const wg = ctx.createGain();
      warm.type = 'sine';
      warm.frequency.setValueAtTime(220, now + 0.14);
      warm.frequency.exponentialRampToValueAtTime(580, now + 0.42);
      wg.gain.setValueAtTime(0.2, now + 0.14);
      wg.gain.exponentialRampToValueAtTime(0.001, now + 0.46);
      warm.connect(wg);
      wg.connect(ctx.destination);
      warm.start(now + 0.14);
      warm.stop(now + 0.48);
    } else if (ruleType === 'dIrreg') {
      // Speaker boom + helicopter propeller spin ("드르르~")
      [0, 0.09, 0.18, 0.27].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(240 + i * 110, now + offset);
        osc.frequency.exponentialRampToValueAtTime(420 + i * 120, now + offset + 0.08);
        g.gain.setValueAtTime(0.2, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.1);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.11);
      });
    } else if (ruleType === 'sIrreg') {
      // Toy hammer bonk + poof vanish
      const bonk = ctx.createOscillator();
      const bg = ctx.createGain();
      bonk.type = 'triangle';
      bonk.frequency.setValueAtTime(420, now);
      bonk.frequency.exponentialRampToValueAtTime(110, now + 0.14);
      bg.gain.setValueAtTime(0.28, now);
      bg.gain.exponentialRampToValueAtTime(0.001, now + 0.16);
      bonk.connect(bg);
      bg.connect(ctx.destination);
      bonk.start(now);
      bonk.stop(now + 0.18);

      const poof = ctx.createOscillator();
      const pg = ctx.createGain();
      poof.type = 'sine';
      poof.frequency.setValueAtTime(660, now + 0.16);
      poof.frequency.exponentialRampToValueAtTime(1320, now + 0.34);
      pg.gain.setValueAtTime(0.16, now + 0.16);
      pg.gain.exponentialRampToValueAtTime(0.001, now + 0.36);
      poof.connect(pg);
      pg.connect(ctx.destination);
      poof.start(now + 0.16);
      poof.stop(now + 0.38);
    } else if (ruleType === 'reuIrreg') {
      // Twin split pop-pop!
      [0, 0.14].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(i === 0 ? 380 : 520, now + offset);
        osc.frequency.exponentialRampToValueAtTime(i === 0 ? 760 : 1040, now + offset + 0.11);
        g.gain.setValueAtTime(0.24, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.13);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.15);
      });
    } else if (ruleType === 'euDrop') {
      // Snap in half + drop whistle
      const snap = ctx.createOscillator();
      const sg = ctx.createGain();
      snap.type = 'square';
      snap.frequency.setValueAtTime(760, now);
      snap.frequency.exponentialRampToValueAtTime(140, now + 0.11);
      sg.gain.setValueAtTime(0.22, now);
      sg.gain.exponentialRampToValueAtTime(0.001, now + 0.13);
      snap.connect(sg);
      sg.connect(ctx.destination);
      snap.start(now);
      snap.stop(now + 0.14);
    } else if (ruleType === 'hIrreg') {
      // Paint splash + hat flying upward whistle
      const splash = ctx.createOscillator();
      const spg = ctx.createGain();
      splash.type = 'sawtooth';
      splash.frequency.setValueAtTime(280, now);
      splash.frequency.exponentialRampToValueAtTime(920, now + 0.22);
      spg.gain.setValueAtTime(0.2, now);
      spg.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      splash.connect(spg);
      spg.connect(ctx.destination);
      splash.start(now);
      splash.stop(now + 0.28);
    } else if (ruleType === 'lDrop') {
      // Slippery banana slide whistle ("슈루룩~!")
      const slip = ctx.createOscillator();
      const slg = ctx.createGain();
      slip.type = 'sine';
      slip.frequency.setValueAtTime(880, now);
      slip.frequency.exponentialRampToValueAtTime(240, now + 0.2);
      slip.frequency.exponentialRampToValueAtTime(1120, now + 0.38);
      slg.gain.setValueAtTime(0.22, now);
      slg.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      slip.connect(slg);
      slg.connect(ctx.destination);
      slip.start(now);
      slip.stop(now + 0.44);
    } else {
      // Yeo irregular electric fusion chord ("찌릿! 짠!")
      [523.25, 659.25, 783.99].forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.05);
        g.gain.setValueAtTime(0.18, now + idx * 0.05);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.28);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + idx * 0.05);
        osc.stop(now + idx * 0.05 + 0.3);
      });
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play step-by-step UI/cartoon SFX for Jollaman 10's 5-stage irregular transformation
 */
export function playIrregularStepSfx(
  step: 'verbEnter' | 'endingEnter' | 'kickDa' | 'blink' | 'complete'
): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const playNote = (
      type: OscillatorType,
      freqStart: number,
      freqEnd: number,
      dur: number,
      vol: number,
      delay = 0
    ) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freqStart, now + delay);
      osc.frequency.exponentialRampToValueAtTime(Math.max(40, freqEnd), now + delay + dur);
      gain.gain.setValueAtTime(0.001, now + delay);
      gain.gain.linearRampToValueAtTime(vol, now + delay + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, now + delay + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + delay);
      osc.stop(now + delay + dur + 0.02);
    };

    switch (step) {
      case 'verbEnter':
        // Bouncy verb entrance pop
        playNote('sine', 330, 620, 0.12, 0.2, 0);
        break;
      case 'endingEnter':
        // Bright ending dash-in slide chime
        playNote('triangle', 440, 880, 0.14, 0.18, 0);
        playNote('sine', 660, 1120, 0.12, 0.16, 0.08);
        break;
      case 'kickDa':
        // Boot kick thump + spinning "다" whistle out
        playNote('square', 220, 65, 0.14, 0.22, 0);
        playNote('sine', 540, 1480, 0.28, 0.15, 0.06);
        break;
      case 'blink':
        // Crisp 3-pulse radar blink chirps highlighting the changing part
        [0, 0.22, 0.44].forEach((d, idx) => {
          playNote('sine', 780 + idx * 90, 980 + idx * 110, 0.09, 0.14, d);
        });
        break;
      case 'complete':
        // Sparkling completion triad
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
          playNote('triangle', freq, freq * 1.02, 0.18, 0.14, idx * 0.045);
        });
        break;
    }
  } catch {
    // Silent fallback
  }
}

/**
 * Play Jollaman 11 (Addition, Saitsori, Geora/Reo/U Irregulars & Dueum Law) Web Audio SFX
 */
export function playAdditionSfx(
  ruleType: 'noseSait' | 'candleSait' | 'leafAdd' | 'summerAdd' | 'georaIrreg' | 'reoIrreg' | 'uDrop' | 'dueumKick'
): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    if (ruleType === 'noseSait') {
      // Comic sneeze / nose blow ("에취~ 흥!")
      const sneeze = ctx.createOscillator();
      const sg = ctx.createGain();
      sneeze.type = 'sawtooth';
      sneeze.frequency.setValueAtTime(640, now);
      sneeze.frequency.exponentialRampToValueAtTime(140, now + 0.24);
      sg.gain.setValueAtTime(0.24, now);
      sg.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      sneeze.connect(sg);
      sg.connect(ctx.destination);
      sneeze.start(now);
      sneeze.stop(now + 0.3);
    } else if (ruleType === 'candleSait') {
      // Double fire flare WHOOSH ("화르륵!")
      [0, 0.1].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(i === 0 ? 180 : 280, now + offset);
        osc.frequency.exponentialRampToValueAtTime(i === 0 ? 520 : 880, now + offset + 0.22);
        g.gain.setValueAtTime(0.18, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.25);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.26);
      });
    } else if (ruleType === 'leafAdd') {
      // Twin ㄴ pop-pop ("뿅! 뿅!")
      [0, 0.14].forEach((offset, i) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(i === 0 ? 440 : 587, now + offset);
        osc.frequency.exponentialRampToValueAtTime(i === 0 ? 880 : 1174, now + offset + 0.11);
        g.gain.setValueAtTime(0.22, now + offset);
        g.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.13);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + offset);
        osc.stop(now + offset + 0.14);
      });
    } else if (ruleType === 'summerAdd') {
      // Bright summer sparkle ding + sudden ㄴ wedge pop
      const ding = ctx.createOscillator();
      const dg = ctx.createGain();
      ding.type = 'triangle';
      ding.frequency.setValueAtTime(523.25, now);
      ding.frequency.exponentialRampToValueAtTime(1046.5, now + 0.22);
      dg.gain.setValueAtTime(0.22, now);
      dg.gain.exponentialRampToValueAtTime(0.001, now + 0.26);
      ding.connect(dg);
      dg.connect(ctx.destination);
      ding.start(now);
      ding.stop(now + 0.28);
    } else if (ruleType === 'georaIrreg') {
      // Royal decree stamp THUMP + crisp gong ("땅! 짠~")
      const thump = ctx.createOscillator();
      const tg = ctx.createGain();
      thump.type = 'triangle';
      thump.frequency.setValueAtTime(220, now);
      thump.frequency.exponentialRampToValueAtTime(52, now + 0.18);
      tg.gain.setValueAtTime(0.3, now);
      tg.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
      thump.connect(tg);
      tg.connect(ctx.destination);
      thump.start(now);
      thump.stop(now + 0.24);

      const gong = ctx.createOscillator();
      const gg = ctx.createGain();
      gong.type = 'sine';
      gong.frequency.setValueAtTime(440, now + 0.12);
      gong.frequency.exponentialRampToValueAtTime(659.25, now + 0.36);
      gg.gain.setValueAtTime(0.18, now + 0.12);
      gg.gain.exponentialRampToValueAtTime(0.001, now + 0.42);
      gong.connect(gg);
      gg.connect(ctx.destination);
      gong.start(now + 0.12);
      gong.stop(now + 0.44);
    } else if (ruleType === 'reoIrreg') {
      // Breezy leaf swirl chime
      [523.25, 659.25, 783.99, 987.77].forEach((f, idx) => {
        const osc = ctx.createOscillator();
        const g = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, now + idx * 0.06);
        g.gain.setValueAtTime(0.16, now + idx * 0.06);
        g.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
        osc.connect(g);
        g.connect(ctx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.24);
      });
    } else if (ruleType === 'uDrop') {
      // Ladle water splash + pop ("첨벙! 퍼!")
      const splash = ctx.createOscillator();
      const spg = ctx.createGain();
      splash.type = 'sine';
      splash.frequency.setValueAtTime(420, now);
      splash.frequency.exponentialRampToValueAtTime(140, now + 0.14);
      splash.frequency.exponentialRampToValueAtTime(680, now + 0.28);
      spg.gain.setValueAtTime(0.24, now);
      spg.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
      splash.connect(spg);
      spg.connect(ctx.destination);
      splash.start(now);
      splash.stop(now + 0.34);
    } else {
      // Dueum gate kick-out spring BOING ("팅! 휘익~")
      const kick = ctx.createOscillator();
      const kg = ctx.createGain();
      kick.type = 'square';
      kick.frequency.setValueAtTime(340, now);
      kick.frequency.exponentialRampToValueAtTime(1240, now + 0.24);
      kg.gain.setValueAtTime(0.2, now);
      kg.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
      kick.connect(kg);
      kg.connect(ctx.destination);
      kick.start(now);
      kick.stop(now + 0.3);
    }
  } catch {
    // Silent fallback
  }
}

export type BgmTrackId = 'retro2d' | 'memeShorts' | 'chillLounge' | 'latin' | 'carol';

const NOTE_FREQ: Record<string, number> = {
  D2: 73.42, E2: 82.41, F2: 87.31, 'F#2': 92.5, G2: 98.0, 'G#2': 103.83, A2: 110.0, B2: 123.47,
  C3: 130.81, D3: 146.83, E3: 164.81, F3: 174.61, 'F#3': 185.0, G3: 196.0, A3: 220.0, B3: 246.94,
  C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, 'F#4': 369.99, G4: 392.0, 'G#4': 415.3, A4: 440.0, B4: 493.88,
  C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, 'F#5': 739.99, G5: 783.99, A5: 880.0, B5: 987.77,
  C6: 1046.5, E6: 1318.51,
};

// Track 1: Analog 2D Retro Platformer Chiptune (144 BPM, 64-step 4-bar loop)
const RETRO_LEAD: (string | null)[] = [
  'E5', null, 'G5', null, 'C6', null, 'G5', null, 'E5', null, 'C5', 'D5', 'E5', null, 'G5', null,
  'A5', null, 'F5', null, 'G5', null, 'E5', null, 'F5', null, 'D5', null, 'E5', null, 'C5', null,
  'D5', 'F5', 'A5', null, 'G5', null, 'B5', null, 'C6', null, 'A5', null, 'G5', null, 'E5', null,
  'F5', null, 'G5', null, 'E5', null, 'C5', null, 'D5', 'G5', 'B5', null, 'G5', null, null, null,
];
const RETRO_BASS: (string | null)[] = [
  'C3', null, 'G3', null, 'C4', null, 'G3', null, 'C3', null, 'G3', null, 'E3', null, 'G3', null,
  'F3', null, 'C4', null, 'E3', null, 'C4', null, 'D3', null, 'G3', null, 'C3', null, 'G3', null,
  'D3', null, 'A3', null, 'G3', null, 'D4', null, 'A3', null, 'F3', null, 'G3', null, 'E3', null,
  'F3', null, 'G3', null, 'C3', null, 'A3', null, 'G3', null, 'D3', null, 'G3', null, 'B3', null,
];

// Track 2: Hyper Comic YouTube Shorts Meme Beat (134 BPM, 64-step 4-bar loop)
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
  'B2', null, null, 'B2', 'C3', null, 'B2', null, 'E2', null, 'E2', null, null, null, 'B2', null,
];
const MEME_COWBELL: number[] = [
  1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0, 0, 0,
  1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 0, 1, 0,
  1, 0, 0, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0,
  1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0,
];

// Track 3: Warm Lo-Fi Electric Piano Healing Track for Series 4 (84 BPM, 64-step 4-bar loop)
// Lush Fmaj9 -> Em7 -> Dm9 -> Cmaj9 / G13sus4 progression with lyrical pentatonic melody
const CHILL_MELODY: (string | null)[] = [
  'A4', null, 'C5', null, 'E5', null, null, 'D5', 'C5', null, null, null, 'G4', null, 'A4', null,
  'B4', null, 'D5', null, 'G5', null, null, 'E5', 'D5', null, null, null, null, null, 'B4', null,
  'C5', null, 'E5', null, 'F5', null, null, 'E5', 'D5', null, 'C5', null, 'A4', null, null, null,
  'B4', null, 'D5', null, 'E5', null, null, 'D5', 'C5', null, null, null, null, null, 'G4', null,
];
const CHILL_BASS: (string | null)[] = [
  'F2', null, null, null, null, null, 'F2', null, null, null, 'C3', null, null, null, null, null,
  'E2', null, null, null, null, null, 'E2', null, null, null, 'B2', null, null, null, null, null,
  'D2', null, null, null, null, null, 'D2', null, null, null, 'A2', null, null, null, null, null,
  'C3', null, null, null, null, null, 'G2', null, null, null, 'G2', null, null, null, 'D3', null,
];
const CHILL_CHORDS: Record<number, string[]> = {
  0: ['F3', 'A3', 'C4', 'E4', 'G4'],     // Fmaj9
  10: ['A3', 'C4', 'E4', 'G4'],          // Fmaj9 warm echo
  16: ['E3', 'G3', 'B3', 'D4'],          // Em7
  26: ['G3', 'B3', 'D4', 'E4'],          // Em7 soft echo
  32: ['D3', 'F3', 'A3', 'C4', 'E4'],    // Dm9
  42: ['F3', 'A3', 'C4', 'E4'],          // Dm9 soft echo
  48: ['C3', 'E3', 'G3', 'B3', 'D4'],    // Cmaj9
  56: ['G3', 'C4', 'D4', 'F4'],          // G13sus4 gentle turnaround
};

// Track 4: Latin Rhythm Bounce / 쌍자음풍 라틴 (134 BPM, 64-step 4-bar loop, A minor)
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
const LATIN_COWBELL: number[] = [
  1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 1, 0, 0,
  1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0,
  1, 0, 0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0,
  1, 0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 0, 0,
];

// Track 5: Christmas Carol Atmosphere / 크리스마스 캐롤풍 (112 BPM, 64-step 4-bar loop, G major)
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
  0: ['G3', 'B3', 'D4', 'F#4'],   // Gmaj7
  8: ['F#3', 'B3', 'D4'],         // Bm/F#
  16: ['C3', 'E3', 'G3', 'B3'],   // Cmaj7
  24: ['D3', 'F#3', 'A3', 'C4'],  // D7
  32: ['G3', 'B3', 'D4', 'F#4'],  // Gmaj7
  40: ['E3', 'G3', 'B3', 'D4'],   // Em7
  48: ['A3', 'C4', 'E4', 'G4'],   // Am7
  56: ['D3', 'G3', 'A3', 'C4'],   // D9sus4
};

export type BgmVolumeLevel = 1 | 2 | 3;

const BGM_VOLUME_GAINS: Record<BgmVolumeLevel, { normal: number; ducked: number }> = {
  1: { normal: 0.22, ducked: 0.08 },
  2: { normal: 0.36, ducked: 0.13 },
  3: { normal: 0.54, ducked: 0.19 },
};

let bgmTimerId: number | null = null;
let bgmActiveTrack: BgmTrackId | null = null;
let bgmNextTime = 0;
let bgmStep = 0;
let bgmMasterGain: GainNode | null = null;
let bgmCtxRef: AudioContext | null = null;
let bgmDucked = false;
let bgmPaused = false;
let bgmVolumeLevel: BgmVolumeLevel = 2;
let bgmNoiseBuffer: AudioBuffer | null = null;

function getTargetBgmGain(): number {
  if (bgmPaused) return 0;
  const preset = BGM_VOLUME_GAINS[bgmVolumeLevel];
  return bgmDucked ? preset.ducked : preset.normal;
}

function ensureBgmGain(ctx: AudioContext): GainNode {
  if (!bgmMasterGain || bgmCtxRef !== ctx) {
    bgmMasterGain = ctx.createGain();
    bgmMasterGain.gain.setValueAtTime(getTargetBgmGain(), ctx.currentTime);
    bgmMasterGain.connect(ctx.destination);
    bgmCtxRef = ctx;
  }
  return bgmMasterGain;
}

function getBgmNoiseBuffer(ctx: AudioContext): AudioBuffer {
  if (bgmNoiseBuffer && bgmNoiseBuffer.sampleRate === ctx.sampleRate) {
    return bgmNoiseBuffer;
  }
  const len = Math.floor(ctx.sampleRate * 0.12);
  const buf = ctx.createBuffer(1, len, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < len; i++) {
    data[i] = Math.random() * 2 - 1;
  }
  bgmNoiseBuffer = buf;
  return buf;
}

function scheduleRetroStep(ctx: AudioContext, dest: GainNode, step: number, time: number, stepDur: number): void {
  const leadNote = RETRO_LEAD[step % RETRO_LEAD.length];
  const bassNote = RETRO_BASS[step % RETRO_BASS.length];

  // Warm CRT-filtered square lead
  if (leadNote && NOTE_FREQ[leadNote]) {
    const osc = ctx.createOscillator();
    const filter = ctx.createBiquadFilter();
    const g = ctx.createGain();
    osc.type = 'square';
    osc.frequency.setValueAtTime(NOTE_FREQ[leadNote], time);
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2800, time);
    const dur = stepDur * 1.45;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.16, time + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(filter);
    filter.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  // Classic NES triangle walking bass
  if (bassNote && NOTE_FREQ[bassNote]) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(NOTE_FREQ[bassNote], time);
    const dur = stepDur * 1.7;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.28, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  // Light 8-bit hi-hat / snare tick
  if (step % 4 === 2 || step % 8 === 4) {
    const noise = ctx.createBufferSource();
    noise.buffer = getBgmNoiseBuffer(ctx);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(step % 8 === 4 ? 2200 : 6200, time);
    const g = ctx.createGain();
    g.gain.setValueAtTime(step % 8 === 4 ? 0.11 : 0.055, time);
    g.gain.exponentialRampToValueAtTime(0.001, time + (step % 8 === 4 ? 0.08 : 0.035));
    noise.connect(hp);
    hp.connect(g);
    g.connect(dest);
    noise.start(time);
    noise.stop(time + 0.09);
  }
}

function scheduleMemeStep(ctx: AudioContext, dest: GainNode, step: number, time: number, stepDur: number): void {
  const s = step % 64;
  const leadNote = MEME_LEAD[s];
  const bassNote = MEME_BASS[s];

  // Quirky comic meme rubber-synth lead
  if (leadNote && NOTE_FREQ[leadNote]) {
    const osc = ctx.createOscillator();
    const bp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    const f = NOTE_FREQ[leadNote];
    if (s === 60) {
      // Comic upward slide on final meme accent note
      osc.frequency.setValueAtTime(f * 0.65, time);
      osc.frequency.exponentialRampToValueAtTime(f, time + stepDur * 0.7);
    } else {
      osc.frequency.setValueAtTime(f * 0.94, time);
      osc.frequency.exponentialRampToValueAtTime(f, time + 0.025);
    }
    bp.type = 'bandpass';
    bp.Q.setValueAtTime(1.8, time);
    bp.frequency.setValueAtTime(Math.min(3400, f * 2.1), time);
    const dur = stepDur * 1.25;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.22, time + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(bp);
    bp.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  // Punchy 808 sub-kick / bass bounce
  if (bassNote && NOTE_FREQ[bassNote]) {
    const kick = ctx.createOscillator();
    const g = ctx.createGain();
    kick.type = 'sine';
    kick.frequency.setValueAtTime(NOTE_FREQ[bassNote] * 1.8, time);
    kick.frequency.exponentialRampToValueAtTime(Math.max(42, NOTE_FREQ[bassNote] * 0.85), time + 0.09);
    const dur = stepDur * 1.85;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.36, time + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    kick.connect(g);
    g.connect(dest);
    kick.start(time);
    kick.stop(time + dur + 0.02);
  }

  // Iconic Shorts-style phonk meme cowbell
  if (MEME_COWBELL[s]) {
    [540, 810].forEach((freq) => {
      const cb = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      cb.type = 'square';
      cb.frequency.setValueAtTime(freq, time);
      bp.type = 'bandpass';
      bp.Q.setValueAtTime(3.2, time);
      bp.frequency.setValueAtTime(720, time);
      g.gain.setValueAtTime(0.09, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.085);
      cb.connect(bp);
      bp.connect(g);
      g.connect(dest);
      cb.start(time);
      cb.stop(time + 0.095);
    });
  }

  // Crisp trap hi-hat + stutter roll at end of 4th bar
  const isRoll = s >= 56 && s < 62;
  if (s % 2 === 0 || isRoll) {
    const subHits = isRoll ? 2 : 1;
    for (let k = 0; k < subHits; k++) {
      const ht = time + k * (stepDur * 0.5);
      const noise = ctx.createBufferSource();
      noise.buffer = getBgmNoiseBuffer(ctx);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(s % 8 === 4 ? 2600 : 7200, ht);
      const g = ctx.createGain();
      g.gain.setValueAtTime(s % 8 === 4 ? 0.14 : 0.06, ht);
      g.gain.exponentialRampToValueAtTime(0.001, ht + (s % 8 === 4 ? 0.08 : 0.032));
      noise.connect(hp);
      hp.connect(g);
      g.connect(dest);
      noise.start(ht);
      noise.stop(ht + 0.09);
    }
  }
}

function scheduleChillStep(ctx: AudioContext, dest: GainNode, step: number, time: number, stepDur: number): void {
  const s = step % 64;
  const chord = CHILL_CHORDS[s];
  const melNote = CHILL_MELODY[s];
  const bassNote = CHILL_BASS[s];

  // 1. Lush warm Rhodes electric piano chord strum (sine + lowpass triangle)
  if (chord) {
    const isMainChord = s % 16 === 0;
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(isMainChord ? 1250 : 980, time);
    lp.connect(dest);

    chord.forEach((n, idx) => {
      const f = NOTE_FREQ[n];
      if (!f) return;
      const strumTime = time + idx * 0.018;
      const dur = isMainChord ? stepDur * 8.5 : stepDur * 4.5;

      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, strumTime);

      const peak = isMainChord ? 0.068 : 0.042;
      g.gain.setValueAtTime(0.0005, strumTime);
      g.gain.linearRampToValueAtTime(peak, strumTime + 0.032);
      g.gain.exponentialRampToValueAtTime(0.0008, strumTime + dur);

      osc.connect(g);
      g.connect(lp);
      osc.start(strumTime);
      osc.stop(strumTime + dur + 0.03);
    });
  }

  // 2. Lyrical warm bell-sine melody with smooth glide envelope
  if (melNote && NOTE_FREQ[melNote]) {
    const f = NOTE_FREQ[melNote];
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1650, time);
    lp.connect(dest);

    const mainOsc = ctx.createOscillator();
    const overtone = ctx.createOscillator();
    const g = ctx.createGain();
    const overG = ctx.createGain();

    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(f, time);
    overtone.type = 'triangle';
    overtone.frequency.setValueAtTime(f * 2, time);

    const dur = stepDur * 4.2;
    g.gain.setValueAtTime(0.0008, time);
    g.gain.linearRampToValueAtTime(0.145, time + 0.025);
    g.gain.exponentialRampToValueAtTime(0.0008, time + dur);

    overG.gain.setValueAtTime(0.0005, time);
    overG.gain.linearRampToValueAtTime(0.028, time + 0.015);
    overG.gain.exponentialRampToValueAtTime(0.0005, time + stepDur * 1.6);

    mainOsc.connect(g);
    overtone.connect(overG);
    overG.connect(lp);
    g.connect(lp);

    mainOsc.start(time);
    overtone.start(time);
    mainOsc.stop(time + dur + 0.03);
    overtone.stop(time + stepDur * 1.7);
  }

  // 3. Round deep sine sub-bass
  if (bassNote && NOTE_FREQ[bassNote]) {
    const f = NOTE_FREQ[bassNote];
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(f, time);
    const dur = stepDur * 5.2;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.24, time + 0.028);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.03);
  }

  // 4. Pillowy lo-fi heartbeat kick & soft shaker brush
  if (s % 16 === 0 || s % 16 === 10) {
    const kick = ctx.createOscillator();
    const g = ctx.createGain();
    kick.type = 'sine';
    kick.frequency.setValueAtTime(98, time);
    kick.frequency.exponentialRampToValueAtTime(44, time + 0.11);
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.16, time + 0.012);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.16);
    kick.connect(g);
    g.connect(dest);
    kick.start(time);
    kick.stop(time + 0.18);
  }

  if (s % 4 === 2 || s % 8 === 4) {
    const noise = ctx.createBufferSource();
    noise.buffer = getBgmNoiseBuffer(ctx);
    const bp = ctx.createBiquadFilter();
    bp.type = 'bandpass';
    bp.Q.setValueAtTime(1.5, time);
    bp.frequency.setValueAtTime(s % 8 === 4 ? 2200 : 4800, time);
    const g = ctx.createGain();
    g.gain.setValueAtTime(s % 8 === 4 ? 0.042 : 0.018, time);
    g.gain.exponentialRampToValueAtTime(0.0008, time + (s % 8 === 4 ? 0.075 : 0.04));
    noise.connect(bp);
    bp.connect(g);
    g.connect(dest);
    noise.start(time);
    noise.stop(time + 0.085);
  }
}

function scheduleLatinStep(ctx: AudioContext, dest: GainNode, step: number, time: number, stepDur: number): void {
  const s = step % 64;
  const leadNote = LATIN_LEAD[s];
  const bassNote = LATIN_BASS[s];

  if (leadNote && NOTE_FREQ[leadNote]) {
    const lf = NOTE_FREQ[leadNote];
    const osc = ctx.createOscillator();
    const bp = ctx.createBiquadFilter();
    const g = ctx.createGain();
    osc.type = 'sawtooth';
    if (s === 58) {
      osc.frequency.setValueAtTime(lf * 0.65, time);
      osc.frequency.exponentialRampToValueAtTime(lf, time + stepDur * 0.7);
    } else {
      osc.frequency.setValueAtTime(lf * 0.94, time);
      osc.frequency.exponentialRampToValueAtTime(lf, time + 0.025);
    }
    bp.type = 'bandpass';
    bp.Q.setValueAtTime(1.8, time);
    bp.frequency.setValueAtTime(Math.min(3400, lf * 2.1), time);
    const dur = stepDur * 1.25;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.22, time + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(bp);
    bp.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.02);
  }

  if (bassNote && NOTE_FREQ[bassNote]) {
    const bf = NOTE_FREQ[bassNote];
    const kick = ctx.createOscillator();
    const g = ctx.createGain();
    kick.type = 'sine';
    kick.frequency.setValueAtTime(bf * 1.8, time);
    kick.frequency.exponentialRampToValueAtTime(Math.max(42, bf * 0.85), time + 0.09);
    const dur = stepDur * 1.85;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.36, time + 0.008);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    kick.connect(g);
    g.connect(dest);
    kick.start(time);
    kick.stop(time + dur + 0.02);
  }

  if (LATIN_COWBELL[s]) {
    [540, 810].forEach((freq) => {
      const cb = ctx.createOscillator();
      const bp = ctx.createBiquadFilter();
      const g = ctx.createGain();
      cb.type = 'square';
      cb.frequency.setValueAtTime(freq, time);
      bp.type = 'bandpass';
      bp.Q.setValueAtTime(3.2, time);
      bp.frequency.setValueAtTime(720, time);
      g.gain.setValueAtTime(0.09, time);
      g.gain.exponentialRampToValueAtTime(0.001, time + 0.085);
      cb.connect(bp);
      bp.connect(g);
      g.connect(dest);
      cb.start(time);
      cb.stop(time + 0.095);
    });
  }

  const isRoll = s >= 56 && s < 62;
  if (s % 2 === 0 || isRoll) {
    const subHits = isRoll ? 2 : 1;
    for (let k = 0; k < subHits; k++) {
      const ht = time + k * (stepDur * 0.5);
      const noise = ctx.createBufferSource();
      noise.buffer = getBgmNoiseBuffer(ctx);
      const hp = ctx.createBiquadFilter();
      hp.type = 'highpass';
      hp.frequency.setValueAtTime(s % 8 === 4 ? 2600 : 7200, ht);
      const g = ctx.createGain();
      g.gain.setValueAtTime(s % 8 === 4 ? 0.14 : 0.06, ht);
      g.gain.exponentialRampToValueAtTime(0.001, ht + (s % 8 === 4 ? 0.08 : 0.032));
      noise.connect(hp);
      hp.connect(g);
      g.connect(dest);
      noise.start(ht);
      noise.stop(ht + 0.09);
    }
  }
}

function scheduleCarolStep(ctx: AudioContext, dest: GainNode, step: number, time: number, stepDur: number): void {
  const s = step % 64;
  const leadNote = CAROL_LEAD[s];
  const bassNote = CAROL_BASS[s];
  const chord = CAROL_CHORDS[s];

  if (leadNote && NOTE_FREQ[leadNote]) {
    const lf = NOTE_FREQ[leadNote];
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(4200, time);
    lp.connect(dest);

    const mainOsc = ctx.createOscillator();
    const bellOvertone = ctx.createOscillator();
    const g = ctx.createGain();
    const og = ctx.createGain();

    mainOsc.type = 'sine';
    mainOsc.frequency.setValueAtTime(lf, time);

    bellOvertone.type = 'triangle';
    bellOvertone.frequency.setValueAtTime(lf * 2, time);

    const dur = stepDur * 2.8;
    g.gain.setValueAtTime(0.0008, time);
    g.gain.linearRampToValueAtTime(0.21, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0008, time + dur);

    og.gain.setValueAtTime(0.0005, time);
    og.gain.linearRampToValueAtTime(0.06, time + 0.006);
    og.gain.exponentialRampToValueAtTime(0.0005, time + stepDur * 1.15);

    mainOsc.connect(g);
    bellOvertone.connect(og);
    g.connect(lp);
    og.connect(lp);

    mainOsc.start(time);
    bellOvertone.start(time);
    mainOsc.stop(time + dur + 0.03);
    bellOvertone.stop(time + stepDur * 1.25);
  }

  if (chord) {
    const lp = ctx.createBiquadFilter();
    lp.type = 'lowpass';
    lp.frequency.setValueAtTime(1450, time);
    lp.connect(dest);

    chord.forEach((n, idx) => {
      const f = NOTE_FREQ[n];
      if (!f) return;
      const t0 = time + idx * 0.016;
      const dur = stepDur * 6.8;
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(f, t0);
      g.gain.setValueAtTime(0.0005, t0);
      g.gain.linearRampToValueAtTime(0.06, t0 + 0.025);
      g.gain.exponentialRampToValueAtTime(0.0008, t0 + dur);
      osc.connect(g);
      g.connect(lp);
      osc.start(t0);
      osc.stop(t0 + dur + 0.03);
    });
  }

  if (bassNote && NOTE_FREQ[bassNote]) {
    const osc = ctx.createOscillator();
    const g = ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(NOTE_FREQ[bassNote], time);
    const dur = stepDur * 3.4;
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.24, time + 0.018);
    g.gain.exponentialRampToValueAtTime(0.001, time + dur);
    osc.connect(g);
    g.connect(dest);
    osc.start(time);
    osc.stop(time + dur + 0.03);
  }

  if (s % 8 === 0 || s % 16 === 10) {
    const kick = ctx.createOscillator();
    const g = ctx.createGain();
    kick.type = 'sine';
    kick.frequency.setValueAtTime(108, time);
    kick.frequency.exponentialRampToValueAtTime(44, time + 0.1);
    g.gain.setValueAtTime(0.001, time);
    g.gain.linearRampToValueAtTime(0.18, time + 0.01);
    g.gain.exponentialRampToValueAtTime(0.001, time + 0.14);
    kick.connect(g);
    g.connect(dest);
    kick.start(time);
    kick.stop(time + 0.16);
  }

  if (s % 4 === 0 || s % 4 === 2) {
    const isMainBell = s % 4 === 0;
    const noise = ctx.createBufferSource();
    noise.buffer = getBgmNoiseBuffer(ctx);
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.setValueAtTime(isMainBell ? 7600 : 8800, time);

    const ng = ctx.createGain();
    ng.gain.setValueAtTime(isMainBell ? 0.068 : 0.032, time);
    ng.gain.exponentialRampToValueAtTime(0.0008, time + (isMainBell ? 0.075 : 0.04));

    noise.connect(hp);
    hp.connect(ng);
    ng.connect(dest);
    noise.start(time);
    noise.stop(time + 0.085);

    if (isMainBell) {
      [2637, 3136].forEach((freq) => {
        const jingle = ctx.createOscillator();
        const jg = ctx.createGain();
        jingle.type = 'sine';
        jingle.frequency.setValueAtTime(freq, time);
        jg.gain.setValueAtTime(0.0005, time);
        jg.gain.linearRampToValueAtTime(0.022, time + 0.004);
        jg.gain.exponentialRampToValueAtTime(0.0005, time + 0.07);
        jingle.connect(jg);
        jg.connect(dest);
        jingle.start(time);
        jingle.stop(time + 0.08);
      });
    }
  }
}

/**
 * Starts looping copyright-free Web Audio BGM for all 5 tracks ('retro2d', 'memeShorts', 'chillLounge', 'latin', 'carol')
 */
export function startBgm(track: BgmTrackId): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (bgmActiveTrack === track && bgmTimerId !== null) {
      return;
    }
    stopBgm();
    const dest = ensureBgmGain(ctx);
    bgmActiveTrack = track;
    bgmStep = 0;
    bgmNextTime = ctx.currentTime + 0.05;

    const bpm =
      track === 'retro2d'
        ? 144
        : track === 'memeShorts' || track === 'latin'
        ? 134
        : track === 'carol'
        ? 112
        : 84;
    const stepDur = 60 / bpm / 4; // 16th-note grid

    const scheduleAhead = () => {
      const currentCtx = getAudioContext();
      if (!currentCtx || bgmActiveTrack !== track) return;
      if (currentCtx.state === 'suspended') return;
      if (bgmNextTime < currentCtx.currentTime - 0.25) {
        bgmNextTime = currentCtx.currentTime + 0.04;
      }
      while (bgmNextTime < currentCtx.currentTime + 0.16) {
        if (track === 'retro2d') {
          scheduleRetroStep(currentCtx, dest, bgmStep, bgmNextTime, stepDur);
        } else if (track === 'memeShorts') {
          scheduleMemeStep(currentCtx, dest, bgmStep, bgmNextTime, stepDur);
        } else if (track === 'latin') {
          scheduleLatinStep(currentCtx, dest, bgmStep, bgmNextTime, stepDur);
        } else if (track === 'carol') {
          scheduleCarolStep(currentCtx, dest, bgmStep, bgmNextTime, stepDur);
        } else {
          scheduleChillStep(currentCtx, dest, bgmStep, bgmNextTime, stepDur);
        }
        bgmNextTime += stepDur;
        bgmStep = (bgmStep + 1) % 64;
      }
    };

    scheduleAhead();
    bgmTimerId = window.setInterval(scheduleAhead, 45);
  } catch {
    // Silent fallback
  }
}

/**
 * Stops active Web Audio BGM cleanly
 */
export function stopBgm(): void {
  if (bgmTimerId !== null) {
    window.clearInterval(bgmTimerId);
    bgmTimerId = null;
  }
  bgmActiveTrack = null;
}

/**
 * Smoothly lowers BGM volume during TTS / intense action SFX
 */
export function setBgmDucking(ducked: boolean): void {
  bgmDucked = ducked;
  try {
    if (!bgmMasterGain || !bgmCtxRef) return;
    const now = bgmCtxRef.currentTime;
    bgmMasterGain.gain.cancelScheduledValues(now);
    bgmMasterGain.gain.setTargetAtTime(getTargetBgmGain(), now, 0.08);
  } catch {
    // Silent fallback
  }
}

export function setBgmPaused(paused: boolean): void {
  bgmPaused = paused;
  try {
    if (!bgmMasterGain || !bgmCtxRef) return;
    const now = bgmCtxRef.currentTime;
    bgmMasterGain.gain.cancelScheduledValues(now);
    bgmMasterGain.gain.setTargetAtTime(getTargetBgmGain(), now, 0.04);
  } catch {
    // Silent fallback
  }
}

export function setBgmVolumeLevel(level: BgmVolumeLevel): void {
  bgmVolumeLevel = level;
  try {
    if (!bgmMasterGain || !bgmCtxRef) return;
    const now = bgmCtxRef.currentTime;
    bgmMasterGain.gain.cancelScheduledValues(now);
    bgmMasterGain.gain.setTargetAtTime(getTargetBgmGain(), now, 0.04);
  } catch {
    // Silent fallback
  }
}

/**
 * Series 13 (조사맨 ver2 은/는 결심!) dramatic comic SFX cues
 */
export function playParticleV2Sfx(
  kind:
    | 'decisionSuspense'
    | 'decisionResolve'
    | 'walkStep'
    | 'timeCard'
    | 'monsterRoar'
    | 'monsterGulp'
    | 'blinkTick'
    | 'eojeolMerge'
    | 'flyingKick'
    | 'cageRescue'
    | 'megaphoneBlast'
    | 'bellyBoing'
    | 'swatterSlam'
    | 'tiptoeShh'
    | 'doubleKickHighFive'
    | 'fireworksDance'
    | 'magnetSlam'
    | 'hammerSmash'
    | 'gearClick'
    | 'wrongBuzzer'
): void {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const playTone = (type: OscillatorType, f1: number, f2: number, dur: number, vol = 0.16, delay = 0) =>
      playOscTone(ctx, now, type, f1, f2, dur, vol, delay);

    switch (kind) {
      case 'decisionSuspense':
        playTone('triangle', 110, 98, 0.22, 0.2, 0);
        playTone('triangle', 110, 98, 0.22, 0.18, 0.26);
        playTone('sawtooth', 330, 440, 0.28, 0.08, 0.45);
        break;
      case 'decisionResolve':
        playTone('sine', 784, 1318.5, 0.14, 0.2, 0);
        playTone('triangle', 523.25, 659.25, 0.14, 0.18, 0.12);
        playTone('triangle', 659.25, 1046.5, 0.24, 0.2, 0.22);
        break;
      case 'walkStep':
        playTone('sine', 240, 140, 0.07, 0.12, 0);
        playTone('sine', 260, 150, 0.07, 0.12, 0.22);
        break;
      case 'timeCard':
        playTone('triangle', 523.25, 587.33, 0.18, 0.14, 0);
        playTone('triangle', 659.25, 783.99, 0.2, 0.15, 0.12);
        playTone('sine', 1046.5, 987.77, 0.32, 0.14, 0.24);
        break;
      case 'monsterRoar':
        playTone('sawtooth', 165, 62, 0.42, 0.26, 0);
        playTone('square', 220, 75, 0.34, 0.16, 0.04);
        playTone('triangle', 480, 95, 0.11, 0.28, 0.28);
        break;
      case 'monsterGulp':
        playTone('sine', 380, 110, 0.14, 0.22, 0);
        playTone('sine', 140, 420, 0.14, 0.18, 0.14);
        playTone('triangle', 180, 82, 0.22, 0.18, 0.28);
        break;
      case 'blinkTick':
        playTone('sine', 880, 1046.5, 0.09, 0.14, 0);
        playTone('sine', 1174.66, 1318.5, 0.1, 0.14, 0.22);
        break;
      case 'eojeolMerge':
        playTone('triangle', 440, 880, 0.16, 0.18, 0);
        playTone('sine', 659.25, 1318.5, 0.24, 0.2, 0.1);
        playTone('triangle', 1046.5, 1567.98, 0.32, 0.18, 0.2);
        break;
      case 'flyingKick':
        playTone('sine', 320, 1180, 0.18, 0.18, 0);
        playTone('sawtooth', 260, 58, 0.24, 0.28, 0.18);
        playTone('triangle', 580, 140, 0.22, 0.24, 0.2);
        break;
      case 'cageRescue':
        playTone('triangle', 740, 1108, 0.12, 0.18, 0);
        playTone('sine', 988, 1480, 0.16, 0.18, 0.1);
        playTone('triangle', 1318, 1760, 0.28, 0.2, 0.2);
        break;
      case 'megaphoneBlast':
        playTone('sawtooth', 190, 95, 0.55, 0.28, 0);
        playTone('square', 440, 620, 0.45, 0.18, 0.05);
        playTone('sawtooth', 1400, 620, 0.25, 0.14, 0.22);
        break;
      case 'bellyBoing':
        playTone('sine', 180, 520, 0.18, 0.24, 0);
        playTone('sine', 520, 210, 0.18, 0.22, 0.16);
        playTone('triangle', 240, 720, 0.24, 0.2, 0.32);
        playTone('triangle', 180, 55, 0.14, 0.26, 0.58);
        break;
      case 'swatterSlam':
        playTone('sawtooth', 480, 80, 0.14, 0.3, 0);
        playTone('triangle', 320, 60, 0.16, 0.28, 0.02);
        playTone('sine', 280, 140, 0.32, 0.14, 0.2);
        break;
      case 'tiptoeShh':
        [0, 0.18, 0.36, 0.54].forEach((d, idx) => {
          playTone('sine', 780 + (idx % 2) * 160, 740, 0.05, 0.11, d);
        });
        break;
      case 'doubleKickHighFive':
        playTone('triangle', 260, 65, 0.16, 0.28, 0);
        playTone('sine', 420, 1380, 0.22, 0.18, 0.12);
        playTone('triangle', 980, 1650, 0.12, 0.24, 0.42);
        break;
      case 'fireworksDance':
        [0, 0.14, 0.28, 0.42].forEach((d, idx) => {
          playTone('sine', 520 + idx * 140, 1320 + idx * 100, 0.14, 0.16, d);
        });
        playTone('triangle', 1046.5, 1568, 0.28, 0.18, 0.54);
        break;
      case 'magnetSlam':
        playTone('sine', 480, 1120, 0.16, 0.16, 0);
        playTone('triangle', 320, 72, 0.14, 0.28, 0.16);
        playTone('sine', 988, 1480, 0.22, 0.16, 0.22);
        break;
      case 'hammerSmash':
        playTone('sawtooth', 240, 52, 0.18, 0.3, 0);
        playTone('triangle', 480, 96, 0.16, 0.26, 0.02);
        playTone('sine', 880, 1320, 0.24, 0.16, 0.18);
        break;
      case 'gearClick':
        playTone('square', 920, 480, 0.06, 0.16, 0);
        playTone('square', 1120, 640, 0.06, 0.16, 0.1);
        playTone('triangle', 740, 1480, 0.22, 0.18, 0.2);
        break;
      case 'wrongBuzzer':
        // Crisp "삐-빕!!" cartoon emergency buzzer + subtle rotating siren tail
        playTone('square', 900, 860, 0.1, 0.2, 0);
        playTone('sawtooth', 450, 430, 0.1, 0.12, 0);
        playTone('square', 640, 520, 0.2, 0.22, 0.13);
        playTone('sawtooth', 320, 260, 0.2, 0.14, 0.13);
        playTone('triangle', 760, 1080, 0.18, 0.09, 0.35);
        playTone('triangle', 1080, 740, 0.2, 0.08, 0.53);
        break;
    }
  } catch {
    // Silent fallback
  }
}


