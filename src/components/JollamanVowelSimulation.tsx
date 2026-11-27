import React from 'react';
import {
  playCartoonImpact,
  playSuccessChime,
  playVowelScenarioSfx,
} from '../utils/audio';
import {
  JollamanCharacterSvg,
  JollamanFaceMode,
  VowelCharKey,
  PastelHouseBackdrop,
  NightCityBackdrop,
  HauntedHouseBackdrop,
  CuteCryingBabyJollamanSvg,
  FieryBaseballSvg,
  GiantFloorFishbowlSvg,
  NineTailFoxSvg,
  PictureBookSvg,
  ComicSquidSvg,
  GiantYoyoSvg,
  ComicUfoSvg,
  SheetGhostSvg,
  TeethMonsterSvg,
  DizzyStarOrbitSvg,
  CartoonHeartSvg,
  ComicImpactBurstSvg
} from './JollamanSprites';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

export interface VowelWord {
  word: string;
  emoji: string;
  meaning: string;
}

export interface VowelItem {
  char: VowelCharKey;
  sound: string;
  triggerWord: string;
  gagSummary: string;
  color: string;
  skyX: number;
  skyY: number;
  words: VowelWord[];
}

export const KOREAN_VOWELS: VowelItem[] = [
  {
    char: 'ㅏ',
    sound: '아',
    triggerWord: '아기',
    gagSummary: '얼굴은 크고 팔다리·몸은 짧은 귀여운 아기가 "으앙~ 으앙~" 계속 울자 육아 중인 졸라맨도 눈물을 찔끔 흘린다!!',
    color: '#EC4899',
    skyX: 86,
    skyY: 66,
    words: [
      { word: '아기', emoji: '👶', meaning: 'baby' },
      { word: '아이', emoji: '🧒', meaning: 'child' },
      { word: '아버지', emoji: '👨', meaning: 'father' },
    ],
  },
  {
    char: 'ㅑ',
    sound: '야',
    triggerWord: '야구공',
    gagSummary: '아기가 졸라맨을 향해 던진 불꽃 야구공이 배를 정통으로 뚫고 지나간다!! 깡!!',
    color: '#F97316',
    skyX: 178,
    skyY: 84,
    words: [
      { word: '야구공', emoji: '⚾', meaning: 'baseball' },
      { word: '야채', emoji: '🥬', meaning: 'vegetables' },
      { word: '야자수', emoji: '🌴', meaning: 'palm tree' },
    ],
  },
  {
    char: 'ㅓ',
    sound: '어',
    triggerWord: '어항',
    gagSummary: '아기가 어항에서 놀다가 풍덩 빠져 거실이 물바다가 되자 졸라맨이 머리를 감싸쥐며 좌절한다!! "안돼~!!"',
    color: '#0EA5E9',
    skyX: 270,
    skyY: 62,
    words: [
      { word: '어항', emoji: '🐠', meaning: 'fishbowl' },
      { word: '어머니', emoji: '👩', meaning: 'mother' },
      { word: '어부', emoji: '🎣', meaning: 'fisherman' },
    ],
  },
  {
    char: 'ㅕ',
    sound: '여',
    triggerWord: '여우',
    gagSummary: '아기가 화면 밖에서 목줄을 한 여우를 끌고 오더니 여우가 몸을 돌려 방귀를 뿡 뀌어 졸라맨이 기절한다!!',
    color: '#EA580C',
    skyX: 362,
    skyY: 84,
    words: [
      { word: '여우', emoji: '🦊', meaning: 'fox' },
      { word: '여자', emoji: '👧', meaning: 'woman' },
      { word: '여기', emoji: '📍', meaning: 'here' },
    ],
  },
  {
    char: 'ㅗ',
    sound: '오',
    triggerWord: '오징어',
    gagSummary: '아기가 보던 그림책에서 오징어가 튀어나와 먹물을 정통으로 쏴 온 화면이 깜깜해진다!!',
    color: '#9333EA',
    skyX: 454,
    skyY: 64,
    words: [
      { word: '오징어', emoji: '🦑', meaning: 'squid' },
      { word: '오리', emoji: '🦆', meaning: 'duck' },
      { word: '오이', emoji: '🥒', meaning: 'cucumber' },
    ],
  },
  {
    char: 'ㅛ',
    sound: '요',
    triggerWord: '요요',
    gagSummary: '아기가 소파 위에 서서 가지고 놀던 요요 줄이 쭉 늘어나더니 졸라맨을 정통으로 맞춰 날려버린다!!',
    color: '#E11D48',
    skyX: 546,
    skyY: 84,
    words: [
      { word: '요요', emoji: '🪀', meaning: 'yo-yo' },
      { word: '요리사', emoji: '👨‍🍳', meaning: 'chef' },
      { word: '요가', emoji: '🧘', meaning: 'yoga' },
    ],
  },
  {
    char: 'ㅜ',
    sound: '우',
    triggerWord: '우주선',
    gagSummary: '깜깜한 밤의 도시를 산책하던 중 우주선이 나타나 아기 졸라맨만 광선으로 데려가버린다!! 아기야~~!!',
    color: '#10B981',
    skyX: 638,
    skyY: 62,
    words: [
      { word: '우주선', emoji: '🛸', meaning: 'spaceship' },
      { word: '우유', emoji: '🥛', meaning: 'milk' },
      { word: '우리', emoji: '🤝', meaning: 'we / us' },
    ],
  },
  {
    char: 'ㅠ',
    sound: '유',
    triggerWord: '유령',
    gagSummary: '깜깜한 밤의 도시에서 "아기야ㅠㅠ" 슬프게 찾던 졸라맨 등 뒤에 유령이 나타나 깜짝 놀란 후 기절한다!!',
    color: '#0284C7',
    skyX: 730,
    skyY: 84,
    words: [
      { word: '유령', emoji: '👻', meaning: 'ghost' },
      { word: '유리', emoji: '🪟', meaning: 'glass' },
      { word: '유자', emoji: '🍋', meaning: 'yuzu' },
    ],
  },
  {
    char: 'ㅡ',
    sound: '으',
    triggerWord: '으스스',
    gagSummary: '깜깜한 밤의 도시, 폐가 문을 열자 너무 무서워 사자를 만났을 때처럼 덜덜 떤다!!',
    color: '#475569',
    skyX: 822,
    skyY: 64,
    words: [
      { word: '으스스', emoji: '🏚️', meaning: 'spooky / creepy' },
      { word: '으슬으슬', emoji: '🥶', meaning: 'chilly' },
      { word: '으뜸', emoji: '🥇', meaning: 'the best' },
    ],
  },
  {
    char: 'ㅣ',
    sound: '이',
    triggerWord: '이빨괴물',
    gagSummary: '폐가 문을 열자 이빨괴물이 두 번 딱딱거리다가 졸라맨의 이단 날라차기에 산산조각 나 날아가고, 아기 졸라맨이 품에 안기는 해피엔딩!!',
    color: '#16A34A',
    skyX: 914,
    skyY: 82,
    words: [
      { word: '이빨괴물', emoji: '🦷', meaning: 'teeth monster' },
      { word: '이모', emoji: '👩', meaning: 'aunt' },
      { word: '이구아나', emoji: '🦎', meaning: 'iguana' },
    ],
  },
];

interface JollamanVowelSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 310;
const GROUND_Y = 368;

const VOWEL_FLASHCARD_MEANINGS: Record<VowelCharKey, string> = {
  'ㅏ': 'Baby',
  'ㅑ': 'Baseball',
  'ㅓ': 'Fishbowl',
  'ㅕ': 'Fox',
  'ㅗ': 'Squid',
  'ㅛ': 'Yo-yo',
  'ㅜ': 'Spaceship',
  'ㅠ': 'Ghost',
  'ㅡ': 'Spooky',
  'ㅣ': 'Teeth Monster',
};

const getActionDuration = (char: VowelCharKey): number => {
  if (char === 'ㅣ') return 3.1; // Door open -> 2 chomps -> flying double kick -> shatter -> hug!
  if (char === 'ㅡ') return 2.55; // Spooky walk to house -> opens door -> shivers in terror
  if (char === 'ㅠ') return 2.2; // Sad baby search ("아기야ㅠㅠ") -> ghost appears -> shock -> faint
  if (char === 'ㅕ') return 2.1; // Baby pulls fox -> fox turns around -> farts
  if (char === 'ㅏ') return 1.18; // Halved baby crying duration
  if (char === 'ㅓ') return 2.35;
  if (char === 'ㅜ') return 2.2;
  if (char === 'ㅗ' || char === 'ㅛ') return 1.95;
  return 1.75;
};

export const JollamanVowelSimulation: React.FC<JollamanVowelSimulationProps> = ({
  audioEnabled = true,
}) => {
  const {
    phase,
    selectedItem: selectedVowel,
    learnedKeys: learnedChars,
    bgmEnabled,
    setBgmEnabled,
    anim,
    walkCycle,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick: handleVowelClick,
  } = useJollamanStageEngine<VowelItem, VowelCharKey>({
    seriesNum: 2,
    seriesTitle: '2. 졸라모음맨 (ㅏ ~ ㅣ)',
    items: KOREAN_VOWELS,
    audioEnabled,
    bgmTrack: 'retro2d',
    initialWalkX: 140,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.9,
    scrollSpeedOnApproach: 360,
    aftermathAnimMaxDur: 1.15,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.char} · ${item.triggerWord}`,
    getBadge: (item) => item.sound,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) => `${item.sound}, ${item.triggerWord}!`,
    getActionDuration: (item) => getActionDuration(item.char),
    onStartAction: (item, audioOn) => {
      if (item.char === 'ㅏ' && audioOn) {
        playVowelScenarioSfx('ㅏ');
      }
    },
    onActionProgress: (item, t, { audioEnabled: audioOn, speed, registerTimer, impactTriggered, markImpact }) => {
      const impactAt: Record<VowelCharKey, number> = {
        'ㅏ': 0.50,
        'ㅑ': 0.36,
        'ㅓ': 0.28,
        'ㅕ': 0.46,
        'ㅗ': 0.38,
        'ㅛ': 0.36,
        'ㅜ': 0.28,
        'ㅠ': 0.45,
        'ㅡ': 0.54,
        'ㅣ': 0.16,
      };
      if (t >= impactAt[item.char] && !impactTriggered) {
        markImpact();
        if (audioOn) {
          if (item.char === 'ㅏ') {
            // Already played once in onStartAction so crying SFX is not doubled
          } else if (item.char === 'ㅓ' || item.char === 'ㅜ' || item.char === 'ㅡ') {
            playVowelScenarioSfx(item.char);
          } else if (item.char === 'ㅣ') {
            playVowelScenarioSfx('ㅣ');
            const kickTimer = window.setTimeout(() => {
              playCartoonImpact();
            }, Math.round((0.40 * 3100) / speed));
            const happyTimer = window.setTimeout(() => {
              playSuccessChime();
            }, Math.round((0.58 * 3100) / speed));
            registerTimer(kickTimer);
            registerTimer(happyTimer);
          } else {
            playCartoonImpact();
            playVowelScenarioSfx(item.char);
          }
        }
      }
    },
  });

  const activeChar = selectedVowel.char;
  const isWalkingMotion =
    phase === 'walking' ||
    phase === 'approaching' ||
    (phase === 'action' && activeChar === 'ㅠ' && anim.actionT < 0.45) ||
    (phase === 'action' && activeChar === 'ㅡ' && anim.actionT < 0.54) ||
    (phase === 'action' && activeChar === 'ㅣ' && anim.actionT < 0.14);

  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;
  const jollaFacing =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? ACTION_SPOT_X >= anim.approachStartX
        ? 1
        : -1
      : 1;

  // Compute Jollaman transform & slapstick pose per vowel scenario
  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScale = 1;
  let jollaVisible = true;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let stomachHole = false;
  let waterFloodLevel = 0; // 0..1 for ㅓ fishbowl overflow flooding entire screen
  let inkBlackoutLevel = 0; // 0..1 for ㅗ squid ink darkening entire screen

  if (phase === 'walking' || phase === 'approaching') {
    jollaFaceMode =
      phase === 'approaching' && (activeChar === 'ㅠ' || activeChar === 'ㅡ')
        ? 'parentTeary'
        : 'happy';
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㅏ': {
        // Exhausted parenting: Jollaman tries to soothe nonstop crying baby, then sheds small tears ("눈물을 찔끔")!
        if (t < 0.42) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 28) * 6;
        } else {
          jollaFaceMode = 'parentTeary';
          jollaX = ACTION_SPOT_X + 10;
          jollaY = GROUND_Y - 49 + Math.sin(anim.walkTime * 5) * 1.5;
        }
        break;
      }
      case 'ㅑ': {
        // Baby throws fiery baseball -> punches a clean hole straight through Jollaman's stomach!
        if (t < 0.36) {
          jollaFaceMode = 'panic';
        } else {
          jollaFaceMode = 'dizzy';
          stomachHole = true;
          jollaX = ACTION_SPOT_X + Math.sin(t * 40) * 3;
        }
        break;
      }
      case 'ㅓ': {
        // Baby plays near fishbowl & falls IN -> floods entire room -> Jollaman clutches head in despair shouting "안돼~!!"
        if (t < 0.25) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - 20;
        } else {
          const floodT = Math.min((t - 0.42) / 0.55, 1);
          waterFloodLevel = t >= 0.42 ? Math.max(0, floodT) : 0;
          jollaX = ACTION_SPOT_X - 25 + Math.sin(t * 36) * 3;
          jollaY = GROUND_Y - 52 - waterFloodLevel * 18;
          jollaFaceMode = 'headClutch';
        }
        break;
      }
      case 'ㅕ': {
        // Baby pulls leashed fox in -> fox turns around & farts -> green stink gas makes Jollaman faint!
        if (t < 0.46) {
          jollaFaceMode = 'panic';
        } else {
          const faintT = Math.min((t - 0.46) / 0.28, 1);
          jollaFaceMode = 'greenPoison';
          jollaRot = -90 * faintT;
          jollaY = GROUND_Y - 52 + faintT * 36;
        }
        break;
      }
      case 'ㅗ': {
        // Squid pops out of baby's picture book -> blasts black ink jet -> pitch-black screen!
        if (t < 0.38) {
          jollaFaceMode = 'panic';
        } else {
          jollaFaceMode = 'inked';
          jollaX = ACTION_SPOT_X + Math.sin(t * 36) * 4;
          if (t >= 0.60) {
            inkBlackoutLevel = Math.min(1, (t - 0.60) / 0.36);
          }
        }
        break;
      }
      case 'ㅛ': {
        // Baby stands on centered sofa -> yo-yo stretches across room & knocks Jollaman tumbling to left floor!
        if (t < 0.36) {
          jollaFaceMode = 'panic';
        } else {
          const flyT = Math.min((t - 0.36) / 0.64, 1);
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X - flyT * 165;
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 125 + flyT * 24;
          jollaRot = -792 * flyT;
        }
        break;
      }
      case 'ㅜ': {
        // Night city walk together -> Alien UFO beams ONLY the baby up! Jollaman panics on ground!
        if (t < 0.28) {
          jollaFaceMode = 'happy';
        } else {
          jollaFaceMode = 'headClutch';
          jollaX = ACTION_SPOT_X + Math.sin(t * 42) * 4;
        }
        break;
      }
      case 'ㅠ': {
        // Night city: Jollaman sadly searches ("아기야ㅠㅠ") -> Ghost appears -> startled shock -> faints!
        if (t < 0.45) {
          jollaFaceMode = 'parentTeary';
          jollaX = ACTION_SPOT_X + Math.sin(t * 9) * 38;
        } else if (t < 0.72) {
          const shockT = (t - 0.45) / 0.27;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 50) * 4;
          jollaY = GROUND_Y - 52 - Math.sin(shockT * Math.PI) * 34;
        } else {
          const faintT = Math.min((t - 0.72) / 0.24, 1);
          jollaFaceMode = 'fainted';
          jollaRot = 90 * faintT;
          jollaY = GROUND_Y - 52 + faintT * 38;
        }
        break;
      }
      case 'ㅡ': {
        // Night city -> enters spooky house -> opens door -> terrified shivering like 'ㅅ' lion!
        if (t < 0.48) {
          jollaFaceMode = 'parentTeary';
          jollaX = ACTION_SPOT_X + (t / 0.48) * 465;
        } else if (t < 0.54) {
          jollaFaceMode = 'parentTeary';
          jollaX = 395;
        } else {
          jollaFaceMode = 'jellyMelt';
          jollaX = 395;
          jollaY = GROUND_Y - 52;
        }
        break;
      }
      case 'ㅣ': {
        // Opens door -> Teeth monster clacks twice -> Rabbit-style double-jump flying kick -> Baby hug!
        if (t < 0.14) {
          jollaX = ACTION_SPOT_X + (t / 0.14) * 90;
          jollaFaceMode = 'parentTeary';
        } else if (t < 0.40) {
          jollaX = ACTION_SPOT_X + 90 - Math.min(1, (t - 0.14) / 0.2) * 35;
          jollaFaceMode = 'panic';
        } else if (t < 0.49) {
          // 1st hop of double-jump kick ("이단 날라차기" 1단 도약)
          const h1 = (t - 0.40) / 0.09;
          jollaX = ACTION_SPOT_X + 55 + h1 * 28;
          jollaY = GROUND_Y - 52 - Math.sin(h1 * Math.PI) * 34;
          jollaFaceMode = 'panic';
        } else if (t < 0.65) {
          // 2nd soaring flying side-kick smashing the teeth monster!
          const kT = (t - 0.49) / 0.16;
          jollaX = ACTION_SPOT_X + 83 + Math.sin(kT * Math.PI * 0.5) * 78;
          jollaY = GROUND_Y - 52 - Math.sin(kT * Math.PI) * 76;
          jollaFaceMode = 'panic';
        } else if (t < 0.72) {
          const landT = (t - 0.65) / 0.07;
          jollaX = ACTION_SPOT_X + 161 - landT * 106;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          jollaX = ACTION_SPOT_X + 55;
          jollaFaceMode = 'happy';
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㅏ':
        jollaX = ACTION_SPOT_X + 10;
        jollaY = GROUND_Y - 49;
        jollaFaceMode = 'parentTeary';
        break;
      case 'ㅛ':
        jollaX = ACTION_SPOT_X - 165;
        jollaY = GROUND_Y - 28;
        jollaRot = -72;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㅑ':
        jollaFaceMode = 'dizzy';
        stomachHole = true;
        break;
      case 'ㅓ':
        waterFloodLevel = 1;
        jollaX = ACTION_SPOT_X - 25;
        jollaY = GROUND_Y - 70;
        jollaFaceMode = 'headClutch';
        break;
      case 'ㅕ':
        jollaFaceMode = 'greenPoison';
        jollaRot = -90;
        jollaY = GROUND_Y - 16;
        break;
      case 'ㅗ':
        jollaFaceMode = 'inked';
        inkBlackoutLevel = 1;
        break;
      case 'ㅜ':
        jollaFaceMode = 'headClutch';
        jollaX = ACTION_SPOT_X;
        break;
      case 'ㅠ':
        jollaFaceMode = 'fainted';
        jollaRot = 90;
        jollaY = GROUND_Y - 14;
        break;
      case 'ㅡ':
        jollaX = 395;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'jellyMelt';
        break;
      case 'ㅣ':
        jollaX = ACTION_SPOT_X + 55;
        jollaFaceMode = 'happy';
        break;
    }
  }

  const vowelMeaning = tWordMeaning(
    2,
    selectedVowel.char,
    selectedVowel.words[0]?.meaning ?? ''
  );

  const isSpookyInside =
    (activeChar === 'ㅡ' && ((phase === 'action' && anim.actionT >= 0.48) || phase === 'aftermath' || phase === 'reveal')) ||
    (activeChar === 'ㅣ' && phase !== 'walking');
  const isNightCity =
    phase !== 'walking' &&
    (activeChar === 'ㅜ' || activeChar === 'ㅠ' || (activeChar === 'ㅡ' && !isSpookyInside));
  const doorOpenInHaunted =
    (activeChar === 'ㅡ' && ((phase === 'action' && anim.actionT >= 0.54) || phase === 'aftermath' || phase === 'reveal')) ||
    (activeChar === 'ㅣ' && ((phase === 'action' && anim.actionT >= 0.14) || phase === 'aftermath' || phase === 'reveal'));
  const happyReunionInHaunted =
    activeChar === 'ㅣ' && ((phase === 'action' && anim.actionT >= 0.72) || phase === 'aftermath' || phase === 'reveal');

  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  return (
    <JollamanStageShell
      icon="🌟"
      title="2. 졸라모음맨 (ㅏ ~ ㅣ)"
      accentButtonClass="bg-indigo-600 hover:bg-indigo-700"
      stageBgClass="bg-pink-50"
      ariaLabel="졸라맨 2 힘든 육아의 하루 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'retro2d',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((prev) => !prev),
        activeClass: 'bg-pink-50 text-pink-700 border-pink-200 hover:bg-pink-100',
        activeLabel: '🎵 레트로 BGM',
        title: '아날로그 2D 레트로 게임 배경음악 켜기/끄기',
      }}
      items={KOREAN_VOWELS}
      selectedItem={selectedVowel}
      learnedKeys={learnedChars}
      getKey={(item) => item.char}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      getTokenText={(item) => item.char}
      onSelectItem={handleVowelClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={540}
      walkingHint="하늘의 모음 (ㅏ ~ ㅣ)을 눌러보세요!"
      activeCaption={`${selectedVowel.char} · ${selectedVowel.sound} · ${selectedVowel.triggerWord} (${vowelMeaning})`}
      revealAriaLabel={`${selectedVowel.char} ${selectedVowel.sound}, ${selectedVowel.triggerWord} 학습 화면`}
      revealGlyph={selectedVowel.char}
      revealHeadline={
        <span className="inline-flex flex-wrap items-baseline justify-center text-center">
          <span style={{ color: selectedVowel.color }} className="mr-3.5 sm:mr-4">
            {selectedVowel.char}
          </span>
          <span>
            {selectedVowel.sound}, {selectedVowel.triggerWord}
          </span>
        </span>
      }
      revealSubtitle={tRevealSubtitle(2, selectedVowel.char, selectedVowel.gagSummary)}
      flashcard={(() => {
        const word = selectedVowel.triggerWord;
        const wordFirst = word.slice(0, 1);
        const wordRest = word.slice(1);
        return {
          glyph: selectedVowel.char,
          subLabel: `[${romanizeKorean(selectedVowel.char)}]`,
          accentColor: selectedVowel.color,
          headlineNode: (
            <>
              <span style={{ color: selectedVowel.color }}>{wordFirst}</span>
              <span>{wordRest}</span>
            </>
          ),
          headlineCharLen: word.length,
          meaning: tWordMeaning(
            2,
            selectedVowel.char,
            VOWEL_FLASHCARD_MEANINGS[selectedVowel.char]
          ),
          romanization: romanizeKorean(word),
          cornerIcon: getSeriesCornerIcon(2, selectedVowel.char, anim.walkTime),
        };
      })()}
      backdropSlot={
        isSpookyInside ? (
          <HauntedHouseBackdrop
            doorOpen={doorOpenInHaunted}
            happyEnding={happyReunionInHaunted}
            walkTime={anim.walkTime}
          />
        ) : isNightCity ? (
          <NightCityBackdrop
            walkTime={anim.walkTime}
            showHauntedExterior={activeChar === 'ㅡ'}
          />
        ) : (
          <PastelHouseBackdrop walkTime={anim.walkTime} />
        )
      }
    >

          {/* ================================================================= */}
          {/* 4. 100% JOLLAMAN-STYLE 2D COMIC VECTOR VOWEL SCENARIOS            */}
          {/* ================================================================= */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* ㅏ: Cute Bigger-Headed Stubby Baby crying nonstop while parent Jollaman tears up! */}
              {activeChar === 'ㅏ' && (() => {
                const bx =
                  phase === 'approaching'
                    ? ACTION_SPOT_X + 240 - anim.objectAppear * 115
                    : ACTION_SPOT_X + 125;
                const parentTeary =
                  (phase === 'action' && anim.actionT >= 0.42) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                return (
                  <g>
                    <g transform={`translate(${bx}, ${GROUND_Y - 27})`}>
                      <CuteCryingBabyJollamanSvg
                        walkTime={anim.walkTime}
                        crying={phase === 'approaching' || phase === 'action'}
                      />
                    </g>
                    {parentTeary && (
                      <path
                        d={`M${ACTION_SPOT_X - 10} ${GROUND_Y - 126} Q${ACTION_SPOT_X - 3} ${GROUND_Y - 115} ${ACTION_SPOT_X - 10} ${GROUND_Y - 110} Q${ACTION_SPOT_X - 17} ${GROUND_Y - 115} ${ACTION_SPOT_X - 10} ${GROUND_Y - 126} Z`}
                        fill="#38BDF8"
                        stroke="#0284C7"
                        strokeWidth="1.5"
                      />
                    )}
                  </g>
                );
              })()}

              {/* ㅑ: Baby centered-right throws Fiery Comic Baseball straight THROUGH Jollaman's stomach! */}
              {activeChar === 'ㅑ' && (() => {
                let bx = ACTION_SPOT_X + 255;
                if (phase === 'approaching') {
                  bx = ACTION_SPOT_X + 255;
                } else if (phase === 'action') {
                  bx = ACTION_SPOT_X + 240 - anim.actionT * 820;
                } else {
                  bx = -200;
                }
                return (
                  <g>
                    <g transform={`translate(${ACTION_SPOT_X + 255}, ${GROUND_Y - 27})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={false} />
                    </g>
                    {bx > -120 && (
                      <g transform={`translate(${bx}, ${GROUND_Y - 53})`}>
                        <FieryBaseballSvg walkTime={anim.walkTime} />
                        {phase === 'action' && anim.actionT >= 0.35 && anim.actionT < 0.6 && (
                          <g transform="translate(22, -38)">
                            <ComicImpactBurstSvg scale={0.9} />
                          </g>
                        )}
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅓ: Baby plays in floor fishbowl & falls IN -> overflows screen! */}
              {activeChar === 'ㅓ' && (() => {
                const bowlX = ACTION_SPOT_X + 185;
                const isSplashing =
                  (phase === 'action' && anim.actionT >= 0.32) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const babyInBowl =
                  (phase === 'action' && anim.actionT >= 0.25) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const babyX =
                  phase === 'approaching'
                    ? bowlX + 95 - anim.objectAppear * 45
                    : babyInBowl
                    ? bowlX - 6
                    : bowlX + 45 - (phase === 'action' ? (anim.actionT / 0.25) * 51 : 0);
                const babyY =
                  phase === 'action' && anim.actionT < 0.25
                    ? GROUND_Y - 27 - Math.sin((anim.actionT / 0.25) * Math.PI) * 80
                    : babyInBowl
                    ? GROUND_Y - 56 - waterFloodLevel * 100 + Math.sin(anim.walkTime * 8) * 6
                    : GROUND_Y - 27;

                return (
                  <g>
                    <g transform={`translate(${bowlX}, ${GROUND_Y - 48})`}>
                      <GiantFloorFishbowlSvg
                        walkTime={anim.walkTime}
                        splashing={isSplashing}
                        hideGoldfish={waterFloodLevel > 0.25}
                      />
                    </g>
                    <g transform={`translate(${babyX}, ${babyY})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={!babyInBowl} />
                    </g>
                  </g>
                );
              })()}

              {/* ㅕ: Baby pulls leashed fox in -> fox turns body around & farts green gas! */}
              {activeChar === 'ㅕ' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'aftermath' || phase === 'reveal' ? 1 : 0;
                let babyX = ACTION_SPOT_X + 115;
                let babyHopY = 0;
                let fx = ACTION_SPOT_X + 230;
                let foxScaleX = -1; // -1 = facing left behind baby; +1 = turned around with butt facing Jollaman!
                let foxHopY = 0;

                if (phase === 'approaching') {
                  babyX = 940 - anim.objectAppear * (940 - (ACTION_SPOT_X + 115));
                  fx = babyX + 115;
                  foxScaleX = -1;
                } else if (phase === 'action') {
                  if (t < 0.24) {
                    babyX = ACTION_SPOT_X + 115;
                    fx = ACTION_SPOT_X + 230;
                    foxScaleX = -1;
                  } else if (t < 0.44) {
                    const turnT = (t - 0.24) / 0.20;
                    const rawScale = -1 + turnT * 2;
                    foxScaleX = Math.abs(rawScale) < 0.12 ? (rawScale < 0 ? -0.12 : 0.12) : rawScale;
                    foxHopY = Math.sin(turnT * Math.PI) * 16;
                    fx = ACTION_SPOT_X + 230 - turnT * 45;
                    babyX = ACTION_SPOT_X + 115 + turnT * 175;
                    babyHopY = Math.sin(turnT * Math.PI) * 28;
                  } else {
                    fx = ACTION_SPOT_X + 185;
                    babyX = ACTION_SPOT_X + 290;
                    foxScaleX = 1;
                  }
                } else {
                  fx = ACTION_SPOT_X + 185;
                  babyX = ACTION_SPOT_X + 290;
                  foxScaleX = 1;
                }

                const farting =
                  (phase === 'action' && t >= 0.46) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const collarX = fx + foxScaleX * 28;
                const babyHandX = babyX < fx ? babyX + 16 : babyX - 16;
                const sagX = (collarX + babyHandX) / 2;

                return (
                  <g>
                    <path
                      d={`M${collarX} ${GROUND_Y - 49 - foxHopY} Q${sagX} ${GROUND_Y - 24} ${babyHandX} ${GROUND_Y - 36 - babyHopY}`}
                      fill="none"
                      stroke="#E11D48"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <g transform={`translate(${fx}, ${GROUND_Y - 46 - foxHopY}) scale(${foxScaleX}, 1)`}>
                      <NineTailFoxSvg farting={farting} walkTime={anim.walkTime} showCollar={true} />
                    </g>
                    <g transform={`translate(${babyX}, ${GROUND_Y - 27 - babyHopY})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={false} />
                    </g>
                  </g>
                );
              })()}

              {/* ㅗ: Squid POPS OUT of Baby's open picture book & blasts ink across! */}
              {activeChar === 'ㅗ' && (() => {
                const bookX = ACTION_SPOT_X + 195;
                const babyX = ACTION_SPOT_X + 275;
                const popScale =
                  phase === 'approaching'
                    ? 0.05
                    : phase === 'action' && anim.actionT < 0.34
                    ? 0.25 + (anim.actionT / 0.34) * 0.75
                    : 1;
                const squidY =
                  phase === 'approaching'
                    ? GROUND_Y - 10
                    : phase === 'action' && anim.actionT < 0.34
                    ? GROUND_Y - 12 - (anim.actionT / 0.34) * 70
                    : GROUND_Y - 82;
                const spraying = phase === 'action' && anim.actionT >= 0.36;
                return (
                  <g>
                    <g transform={`translate(${bookX}, ${GROUND_Y - 10})`}>
                      <PictureBookSvg />
                    </g>
                    <g transform={`translate(${babyX}, ${GROUND_Y - 27})`}>
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={false} />
                    </g>
                    {phase !== 'approaching' && (
                      <g transform={`translate(${bookX - 15}, ${squidY}) scale(${popScale})`}>
                        <ComicSquidSvg walkTime={anim.walkTime} spraying={spraying} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅛ: Baby stands on top of centered Sofa & stretches yo-yo across room hitting Jollaman! */}
              {activeChar === 'ㅛ' && (() => {
                const handX = 597;
                const handY = 235;
                let yx = handX;
                let yy = handY + 26;
                let rot = 0;
                if (phase === 'approaching') {
                  yy = handY + 28 + Math.sin(anim.walkTime * 14) * 14;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.36) {
                    const st = anim.actionT / 0.36;
                    yx = handX - st * (handX - ACTION_SPOT_X);
                    yy = handY + 26 + st * (GROUND_Y - 58 - (handY + 26));
                    rot = st * 900;
                  } else {
                    const rt = (anim.actionT - 0.36) / 0.64;
                    yx = ACTION_SPOT_X + rt * (handX - ACTION_SPOT_X);
                    yy = GROUND_Y - 58 + rt * (handY + 26 - (GROUND_Y - 58));
                    rot = 900 + rt * 900;
                  }
                } else {
                  yx = handX;
                  yy = handY + 26;
                }
                return (
                  <g>
                    <g transform="translate(615, 246)">
                      <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={false} />
                    </g>
                    <line x1={handX} y1={handY} x2={yx} y2={yy} stroke="#F8FAFC" strokeWidth="4" />
                    <g transform={`translate(${yx}, ${yy}) scale(0.85) rotate(${rot})`}>
                      <GiantYoyoSvg />
                    </g>
                    {phase === 'action' && anim.actionT >= 0.35 && anim.actionT < 0.65 && (
                      <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 108})`}>
                        <ComicImpactBurstSvg scale={0.95} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅜ: Night City walk — Alien UFO abducts ONLY Baby Jollaman! */}
              {activeChar === 'ㅜ' && (() => {
                const babyStartX = ACTION_SPOT_X + 100;
                let ux = babyStartX;
                let uy = 85;
                const babyX = babyStartX;
                let babyY = GROUND_Y - 27;
                let beamOn = false;
                let showBaby = true;

                if (phase === 'approaching') {
                  ux = 780 - anim.objectAppear * (780 - babyStartX);
                  uy = 50 + anim.objectAppear * 35;
                } else if (phase === 'action') {
                  const t = anim.actionT;
                  if (t < 0.28) {
                    beamOn = true;
                  } else if (t < 0.78) {
                    const bt = (t - 0.28) / 0.50;
                    beamOn = true;
                    babyY = GROUND_Y - 27 - bt * 215;
                  } else {
                    const flyOut = (t - 0.78) / 0.22;
                    showBaby = false;
                    ux = babyStartX + flyOut * 580;
                    uy = 85 - flyOut * 140;
                  }
                } else {
                  showBaby = false;
                  ux = 1200;
                }

                return (
                  <g>
                    {showBaby && (
                      <g transform={`translate(${babyX}, ${babyY})`}>
                        <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={phase === 'action' && anim.actionT >= 0.28} />
                      </g>
                    )}
                    {ux < 1100 && (
                      <g transform={`translate(${ux}, ${uy})`}>
                        <ComicUfoSvg beamOn={beamOn} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅠ: Night City — Sad search ("아기야ㅠㅠ") -> Ghost appears -> startled shock -> faint! */}
              {activeChar === 'ㅠ' && (() => {
                const showGhost =
                  (phase === 'action' && anim.actionT >= 0.45) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const popScale =
                  phase === 'action' && anim.actionT >= 0.45 && anim.actionT < 0.54
                    ? 0.25 + ((anim.actionT - 0.45) / 0.09) * 0.75
                    : 1;
                const showCallout =
                  phase === 'approaching' || (phase === 'action' && anim.actionT < 0.45);
                const showShockExclaim =
                  phase === 'action' && anim.actionT >= 0.45 && anim.actionT < 0.72;
                return (
                  <g>
                    {showGhost && (
                      <g transform={`translate(${ACTION_SPOT_X - 68}, ${GROUND_Y - 72}) scale(${popScale})`}>
                        <SheetGhostSvg walkTime={anim.walkTime} />
                      </g>
                    )}
                    {showCallout && (
                      <g transform={`translate(${jollaX}, ${jollaY - 78})`}>
                        <rect
                          x="-58"
                          y="-42"
                          width="116"
                          height="40"
                          rx="12"
                          fill="#FFFFFF"
                          stroke="#0F172A"
                          strokeWidth="2.8"
                        />
                        <polygon
                          points="-8,-2 0,8 8,-2"
                          fill="#FFFFFF"
                          stroke="#0F172A"
                          strokeWidth="2.5"
                          strokeLinejoin="round"
                        />
                        <rect x="-10" y="-6" width="20" height="6" fill="#FFFFFF" />
                        <text
                          x="0"
                          y="-23"
                          textAnchor="middle"
                          fontSize="16"
                          fontWeight="900"
                          fill="#0284C7"
                        >
                          아기야ㅠㅠ
                        </text>
                        <text
                          x="0"
                          y="-9"
                          textAnchor="middle"
                          fontSize="10.5"
                          fontWeight="800"
                          fill="#0369A1"
                        >
                          Baby!!
                        </text>
                      </g>
                    )}
                    {showShockExclaim && (
                      <g transform={`translate(${jollaX + 12}, ${jollaY - 78})`}>
                        <text
                          x="0"
                          y="0"
                          textAnchor="middle"
                          fontSize="24"
                          fontWeight="900"
                          fill="#FACC15"
                          stroke="#0F172A"
                          strokeWidth="3.5"
                          paintOrder="stroke fill"
                        >
                          으악!!
                        </text>
                        <text
                          x="0"
                          y="14"
                          textAnchor="middle"
                          fontSize="12"
                          fontWeight="800"
                          fill="#FEF08A"
                          stroke="#0F172A"
                          strokeWidth="2.5"
                          paintOrder="stroke fill"
                        >
                          Aaah!!
                        </text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅡ: Night City -> Enters Spooky Abandoned House -> Opens door & shivers in terror */}

              {/* ㅣ: Opens Haunted Door -> Teeth Monster chomps twice -> Jollaman flying double-kick -> Monster shatters -> Baby hug! */}
              {activeChar === 'ㅣ' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'aftermath' || phase === 'reveal' ? 1 : 0;
                let tx = 515;
                let jawOpenDeg = 8;
                let shatterProgress = 0;
                let showMonster = false;

                if (phase === 'action' && t >= 0.14 && t < 0.80) {
                  showMonster = true;
                  if (t < 0.40) {
                    // Clacks/chomps cleanly TWICE ("두번 딱딱")
                    const clackPhase = (t - 0.14) / 0.26;
                    const snap1 = clackPhase < 0.5 ? Math.sin((clackPhase / 0.5) * Math.PI) : 0;
                    const snap2 = clackPhase >= 0.5 ? Math.sin(((clackPhase - 0.5) / 0.5) * Math.PI) : 0;
                    tx = 515 - Math.sin(clackPhase * Math.PI * 2) * 8;
                    jawOpenDeg = 4 + (snap1 + snap2) * 34;
                  } else if (t < 0.56) {
                    tx = 515;
                    jawOpenDeg = 10;
                  } else {
                    const kickFlyT = Math.min((t - 0.56) / 0.22, 1);
                    tx = 515 + kickFlyT * 340;
                    jawOpenDeg = 28;
                    shatterProgress = kickFlyT;
                  }
                }

                const showBabyReunion =
                  (phase === 'action' && t >= 0.18) || phase === 'aftermath' || phase === 'reveal';
                let bx = 545;
                let babyCrying = true;
                if (t >= 0.72) {
                  const hugT = Math.min((t - 0.72) / 0.22, 1);
                  bx = 545 - hugT * (545 - (ACTION_SPOT_X + 76));
                  babyCrying = hugT < 0.85;
                }

                return (
                  <g>
                    {showBabyReunion && (
                      <g transform={`translate(${bx}, ${GROUND_Y - 27})`}>
                        <CuteCryingBabyJollamanSvg walkTime={anim.walkTime} crying={babyCrying} />
                      </g>
                    )}

                    {showMonster && (
                      <g transform={`translate(${tx}, ${GROUND_Y - 58}) scale(1.22)`}>
                        <TeethMonsterSvg
                          jawOpenDeg={jawOpenDeg}
                          walkTime={anim.walkTime}
                          shatterProgress={shatterProgress}
                        />
                      </g>
                    )}

                    {phase === 'action' && t >= 0.55 && t < 0.70 && (
                      <g transform={`translate(490, ${GROUND_Y - 78})`}>
                        <ComicImpactBurstSvg scale={1.15} />
                      </g>
                    )}

                    {happyReunionInHaunted && (
                      <g transform={`translate(${ACTION_SPOT_X + 70}, ${GROUND_Y - 128 + Math.sin(anim.walkTime * 6) * 5})`}>
                        <CartoonHeartSvg size={1.15} color="#EF4444" />
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* ================================================================= */}
          {/* 5. VECTOR JOLLAMAN STICK FIGURE                                   */}
          {/* ================================================================= */}
          {jollaVisible && (
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing * jollaScale}, ${jollaScale})`}
              onClick={toggleJollaPause}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 &&
                !(activeChar === 'ㅣ' && phase === 'action' && anim.actionT >= 0.40 && anim.actionT < 0.68) && (
                  <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
                )}

              {activeChar === 'ㅣ' && phase === 'action' && anim.actionT >= 0.49 && anim.actionT < 0.66 ? (
                /* Rabbit-style Flying Side-Kick Pose ("이단 날라차기!") */
                <g transform="rotate(-18)">
                  {/* Motion Speed Lines */}
                  <line x1="-68" y1="-16" x2="-30" y2="-16" stroke="#FACC15" strokeWidth="3.5" strokeLinecap="round" />
                  <line x1="-76" y1="6" x2="-34" y2="6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.85" />
                  {/* Tucked Back Leg */}
                  <path d="M-2 12 L-22 24 L-12 38" fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
                  <ellipse cx="-10" cy="40" rx="8.5" ry="4.8" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
                  {/* Extended Flying Side-Kick Leg forward-right! */}
                  <path d="M2 10 L46 2" fill="none" stroke="#0F172A" strokeWidth="5.8" strokeLinecap="round" />
                  <ellipse cx="52" cy="1" rx="11" ry="6" transform="rotate(-12, 52, 1)" fill="#EF4444" stroke="#0F172A" strokeWidth="2.4" />
                  {/* Torso */}
                  <line x1="0" y1="-16" x2="0" y2="12" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
                  {/* Guarding Martial Arts Arms */}
                  <path d="M-2 -10 L-18 -2 L-10 8" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
                  <circle cx="-10" cy="9" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  <path d="M2 -10 L20 -18" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
                  <circle cx="22" cy="-19" r="4.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
                  {/* Determined Fierce Stickman Head */}
                  <circle cx="0" cy="-34" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.2" />
                  <path d="M-2 -50 Q3 -59 8 -52" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
                  <path d="M-7 -41 L0 -37 M11 -41 L4 -37" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
                  <circle cx="-3" cy="-34" r="2.2" fill="#0F172A" />
                  <circle cx="7" cy="-34" r="2.2" fill="#0F172A" />
                  <path d="M-3 -25 Q3 -28 9 -24" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
                </g>
              ) : (
                <JollamanCharacterSvg
                  faceMode={jollaFaceMode}
                  isWalking={isWalkingMotion}
                  legSwing={legSwing}
                  armSwing={armSwing}
                  stomachHole={stomachHole}
                  walkTime={anim.walkTime}
                  activeChar={activeChar}
                />
              )}

              {(phase === 'aftermath' || phase === 'reveal') &&
                (activeChar === 'ㅑ' || activeChar === 'ㅛ') && (
                  <DizzyStarOrbitSvg walkTime={anim.walkTime} />
                )}

              {jollaFaceMode === 'greenPoison' && (
                <g opacity="0.72">
                  <circle cx="-26" cy="-42" r="10" fill="#84CC16" />
                  <circle cx="24" cy="-50" r="8" fill="#65A30D" />
                </g>
              )}
            </g>
          )}

          {/* ================================================================= */}
          {/* 6. SCREEN-WIDE FLOOD / INK BLACKOUT OVERLAYS (ㅓ & ㅗ)            */}
          {/* ================================================================= */}
          {waterFloodLevel > 0 && (() => {
            const topY = 460 - waterFloodLevel * 435;
            const waveShift = (anim.walkTime * 110) % 200;
            return (
              <g>
                <path
                  d={`M${-200 + waveShift} ${topY} Q${-100 + waveShift} ${topY - 22} ${waveShift} ${topY} T${200 + waveShift} ${topY} T${400 + waveShift} ${topY} T${600 + waveShift} ${topY} T${800 + waveShift} ${topY} T${1000 + waveShift} ${topY} T${1200 + waveShift} ${topY} L1200 480 L-200 480 Z`}
                  fill="#0EA5E9"
                  fillOpacity="0.62"
                />
                <g transform={`translate(${ACTION_SPOT_X + 150 + Math.sin(anim.walkTime * 3) * 24}, ${Math.max(topY + 48, GROUND_Y - 170) + Math.cos(anim.walkTime * 4) * 12})`}>
                  <path d="M14 0 Q28 -14 26 0 Q28 14 14 0 Z" fill="#FB923C" stroke="#9A3412" strokeWidth="2" />
                  <ellipse cx="0" cy="0" rx="16" ry="11" fill="#F97316" stroke="#9A3412" strokeWidth="2.4" />
                  <circle cx="-7" cy="-2" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6" />
                  <circle cx="-8" cy="-2" r="2.2" fill="#0F172A" />
                </g>
                {[120, 260, 420, 580, 740, 890].map((bx, i) => (
                  <circle
                    key={bx}
                    cx={bx + Math.sin(anim.walkTime * 4 + i) * 10}
                    cy={450 - ((anim.walkTime * 90 + i * 75) % Math.max(80, 460 - topY))}
                    r={6 + (i % 3) * 3}
                    fill="#E0F2FE"
                    fillOpacity="0.78"
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />
                ))}
              </g>
            );
          })()}

          {inkBlackoutLevel > 0 && (
            <g>
              <rect
                x="0"
                y="-80"
                width="1000"
                height="625"
                fill="#09090B"
                fillOpacity={inkBlackoutLevel * 0.94}
              />
              {inkBlackoutLevel > 0.7 && (
                <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 87})`}>
                  <circle cx="-8" cy="0" r="6" fill="#FFFFFF" />
                  <circle cx="8" cy="0" r="6" fill="#FFFFFF" />
                  <circle cx="-8" cy="0" r="2.5" fill="#09090B" />
                  <circle cx="8" cy="0" r="2.5" fill="#09090B" />
                </g>
              )}
            </g>
          )}

    </JollamanStageShell>
  );
};
