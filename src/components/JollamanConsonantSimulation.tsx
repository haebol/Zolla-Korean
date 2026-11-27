import React from 'react';
import {
  playTrainHorn,
  playCarWhoosh,
  playCarHorn,
  playMosquitoBuzz,
  playDiscoDanceBeat,
  playCartoonImpact,
  playDuckQuack,
  playCartoonSplat,
  playScenarioSfx,
} from '../utils/audio';
import {
  MuscularRabbitSvg,
  JollamanCharacterSvg,
  SkinnyMosquitoSvg,
  TigerSpriteSvg,
  DetailedLionSvg,
  SpaceXRocketSvg,
  MirrorBallSvg,
  DiscoDancingJollamanSvg,
  DancingTigerSvg,
  ComicImpactBurstSvg,
  DizzyStarOrbitSvg,
} from './JollamanSprites';
import { Episode3ThemeKey, DynamicEpisode3Backdrop } from './JollamanSprites3';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

export interface ConsonantWord {
  word: string;
  emoji: string;
  meaning: string;
}

export interface ConsonantItem {
  char: string;
  name: string;
  soundCue: string;
  ttsSoundCue: string;
  triggerWord: string;
  gagSummary: string;
  sceneTheme: Episode3ThemeKey;
  color: string;
  skyX: number;
  skyY: number;
  words: ConsonantWord[];
}

export const KOREAN_CONSONANTS: ConsonantItem[] = [
  {
    char: 'ㄱ',
    name: '기역',
    soundCue: 'g / k',
    ttsSoundCue: '그',
    triggerWord: '기차',
    gagSummary: '기차에 치여 세 바퀴 공중제비 후 철푸덕!',
    sceneTheme: 'railway',
    color: '#EF4444',
    skyX: 70,
    skyY: 64,
    words: [
      { word: '기차', emoji: '🚂', meaning: 'train' },
      { word: '가방', emoji: '🎒', meaning: 'bag' },
      { word: '고양이', emoji: '🐱', meaning: 'cat' },
    ],
  },
  {
    char: 'ㄴ',
    name: '니은',
    soundCue: 'n',
    ttsSoundCue: '느',
    triggerWord: '나무',
    gagSummary: '가로수 나무가 쓰러져 졸라맨이 납작!',
    sceneTheme: 'sunset',
    color: '#F97316',
    skyX: 136,
    skyY: 82,
    words: [
      { word: '나무', emoji: '🌳', meaning: 'tree' },
      { word: '나비', emoji: '🦋', meaning: 'butterfly' },
      { word: '눈사람', emoji: '☃️', meaning: 'snowman' },
    ],
  },
  {
    char: 'ㄷ',
    name: '디귿',
    soundCue: 'd / t',
    ttsSoundCue: '드',
    triggerWord: '다리',
    gagSummary: '걷다가 나타난 다리 밑으로 풍덩 추락!',
    sceneTheme: 'jungle',
    color: '#EAB308',
    skyX: 202,
    skyY: 60,
    words: [
      { word: '다리', emoji: '🌉', meaning: 'bridge' },
      { word: '다람쥐', emoji: '🐿️', meaning: 'squirrel' },
      { word: '달', emoji: '🌙', meaning: 'moon' },
    ],
  },
  {
    char: 'ㄹ',
    name: '리을',
    soundCue: 'r / l',
    ttsSoundCue: '르',
    triggerWord: '로켓',
    gagSummary: '로켓이 미사일처럼 날아와 졸라맨을 하늘로 날려버린다!!',
    sceneTheme: 'space',
    color: '#22C55E',
    skyX: 268,
    skyY: 84,
    words: [
      { word: '로켓', emoji: '🚀', meaning: 'rocket' },
      { word: '라디오', emoji: '📻', meaning: 'radio' },
      { word: '리본', emoji: '🎀', meaning: 'ribbon' },
    ],
  },
  {
    char: 'ㅁ',
    name: '미음',
    soundCue: 'm',
    ttsSoundCue: '므',
    triggerWord: '모기',
    gagSummary: '윙~~~ 모기가 나타나 얼굴을 물자 얼굴이 새빨개진다!',
    sceneTheme: 'jungle',
    color: '#10B981',
    skyX: 334,
    skyY: 64,
    words: [
      { word: '모기', emoji: '🦟', meaning: 'mosquito' },
      { word: '모자', emoji: '🧢', meaning: 'hat' },
      { word: '무지개', emoji: '🌈', meaning: 'rainbow' },
    ],
  },
  {
    char: 'ㅂ',
    name: '비읍',
    soundCue: 'b / p',
    ttsSoundCue: '브',
    triggerWord: '번개',
    gagSummary: '찌릿한 번개가 떨어져 새까맣게 타며 해골 찌릿!',
    sceneTheme: 'thunderstorm',
    color: '#06B6D4',
    skyX: 400,
    skyY: 82,
    words: [
      { word: '번개', emoji: '⚡', meaning: 'lightning' },
      { word: '바나나', emoji: '🍌', meaning: 'banana' },
      { word: '버스', emoji: '🚌', meaning: 'bus' },
    ],
  },
  {
    char: 'ㅅ',
    name: '시옷',
    soundCue: 's / t',
    ttsSoundCue: '스',
    triggerWord: '사자',
    gagSummary: '사자가 입을 크게 벌려 어흥! 포효하자 졸라맨이 오들오들!',
    sceneTheme: 'savannah',
    color: '#0EA5E9',
    skyX: 466,
    skyY: 60,
    words: [
      { word: '사자', emoji: '🦁', meaning: 'lion' },
      { word: '사과', emoji: '🍎', meaning: 'apple' },
      { word: '수박', emoji: '🍉', meaning: 'watermelon' },
    ],
  },
  {
    char: 'ㅇ',
    name: '이응',
    soundCue: 'silent / -ng',
    ttsSoundCue: '첫소리는 무음',
    triggerWord: '오리',
    gagSummary: '화난 대왕 오리가 "꽥꽥꽥" 하며 뒤통수를 콕콕!',
    sceneTheme: 'farm',
    color: '#3B82F6',
    skyX: 534,
    skyY: 84,
    words: [
      { word: '오리', emoji: '🦆', meaning: 'duck' },
      { word: '아기', emoji: '👶', meaning: 'baby' },
      { word: '우산', emoji: '☂️', meaning: 'umbrella' },
    ],
  },
  {
    char: 'ㅈ',
    name: '지읒',
    soundCue: 'j / t',
    ttsSoundCue: '즈',
    triggerWord: '자동차',
    gagSummary: '자동차가 쌩! 지나가며 강한 돌풍에 휘말려 360도 빙글!',
    sceneTheme: 'city',
    color: '#6366F1',
    skyX: 600,
    skyY: 62,
    words: [
      { word: '자동차', emoji: '🚗', meaning: 'car' },
      { word: '자전거', emoji: '🚲', meaning: 'bicycle' },
      { word: '주스', emoji: '🧃', meaning: 'juice' },
    ],
  },
  {
    char: 'ㅊ',
    name: '치읓',
    soundCue: 'ch / t',
    ttsSoundCue: '츠',
    triggerWord: '춤',
    gagSummary: '사방이 어두워지고 미러볼이 내려오며 비트가 터져 졸라맨이 격렬하게 브레이크 댄스를 춘다!!',
    sceneTheme: 'disco',
    color: '#8B5CF6',
    skyX: 666,
    skyY: 84,
    words: [
      { word: '춤', emoji: '🕺', meaning: 'dance' },
      { word: '책상', emoji: '🪑', meaning: 'desk' },
      { word: '치즈', emoji: '🧀', meaning: 'cheese' },
    ],
  },
  {
    char: 'ㅋ',
    name: '키읔',
    soundCue: 'k',
    ttsSoundCue: '크',
    triggerWord: '코끼리',
    gagSummary: '코로 살랑살랑 악수하고 잘 놀다가 갑자기 날려버림!',
    sceneTheme: 'savannah',
    color: '#A855F7',
    skyX: 732,
    skyY: 60,
    words: [
      { word: '코끼리', emoji: '🐘', meaning: 'elephant' },
      { word: '카메라', emoji: '📷', meaning: 'camera' },
      { word: '케이크', emoji: '🍰', meaning: 'cake' },
    ],
  },
  {
    char: 'ㅌ',
    name: '티읕',
    soundCue: 't',
    ttsSoundCue: '트',
    triggerWord: '토끼',
    gagSummary: '당근 든 찐 근육 토끼의 이단 옆차기 얍!',
    sceneTheme: 'nightmarket',
    color: '#EC4899',
    skyX: 798,
    skyY: 84,
    words: [
      { word: '토끼', emoji: '🐰', meaning: 'rabbit' },
      { word: '태권도', emoji: '🥋', meaning: 'taekwondo' },
      { word: '토마토', emoji: '🍅', meaning: 'tomato' },
    ],
  },
  {
    char: 'ㅍ',
    name: '피읖',
    soundCue: 'p',
    ttsSoundCue: '프',
    triggerWord: '풍선',
    gagSummary: '풍선을 타고 하늘 높이 올라간 순간, ㅌ의 근육토끼가 하늘까지 날아와 뻥 차서 풍선이 터진다!!',
    sceneTheme: 'beach',
    color: '#F43F5E',
    skyX: 864,
    skyY: 62,
    words: [
      { word: '풍선', emoji: '🎈', meaning: 'balloon' },
      { word: '포도', emoji: '🍇', meaning: 'grape' },
      { word: '피아노', emoji: '🎹', meaning: 'piano' },
    ],
  },
  {
    char: 'ㅎ',
    name: '히읗',
    soundCue: 'h / t',
    ttsSoundCue: '흐',
    triggerWord: '호랑이',
    gagSummary: '호랑이가 어흥! 나타나 얼어붙은 순간, 미러볼이 내려오며 둘이 함께 브레이크 댄스를 추는 해피엔딩!!',
    sceneTheme: 'sunset',
    color: '#E11D48',
    skyX: 930,
    skyY: 82,
    words: [
      { word: '호랑이', emoji: '🐯', meaning: 'tiger' },
      { word: '하늘', emoji: '🌤️', meaning: 'sky' },
      { word: '하트', emoji: '❤️', meaning: 'heart' },
    ],
  },
];

interface JollamanConsonantSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 290;
const GROUND_Y = 368;

const getActionDuration = (char: string): number => {
  if (char === 'ㄱ') return 2.05; // Train charge + 3 somersaults
  if (char === 'ㅈ') return 2.2; // Speeding indigo car zooms past & spins Jollaman 360°
  if (char === 'ㅊ') return 2.4; // Mirrorball drop + wild wave & breakdance
  if (char === 'ㅋ') return 2.35; // Elephant trunk handshake + fling
  if (char === 'ㅍ') return 2.6; // Float up to sky -> ㅌ muscular rabbit leaps & kicks balloon!
  if (char === 'ㅎ') return 3.25; // Scary tiger "어흥!" -> sudden mirrorball twist & duo breakdance
  if (char === 'ㅁ' || char === 'ㅇ') return 1.65;
  return 1.5;
};

export const JollamanConsonantSimulation: React.FC<JollamanConsonantSimulationProps> = ({
  audioEnabled = true,
}) => {
  const {
    phase,
    selectedItem: selectedConsonant,
    learnedKeys: learnedChars,
    bgmEnabled,
    setBgmEnabled,
    anim,
    walkCycle,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick: handleConsonantClick,
  } = useJollamanStageEngine<ConsonantItem, string>({
    seriesNum: 1,
    seriesTitle: '1. 졸라자음맨 (ㄱ ~ ㅎ)',
    items: KOREAN_CONSONANTS,
    audioEnabled,
    bgmTrack: 'chillLounge',
    initialWalkX: 130,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 1.0,
    scrollSpeedOnApproach: 360,
    aftermathAnimMaxDur: 1.15,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.char} · ${item.triggerWord}`,
    getBadge: (item) => item.name,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) =>
      item.char === 'ㅇ'
        ? 'Silent ㅇ'
        : `${item.name}, ${item.ttsSoundCue}, ${item.triggerWord}!`,
    getActionDuration: (item) => getActionDuration(item.char),
    onSelectPreHook: (item, animState, audioOn) => {
      if (item.char === 'ㄷ') {
        animState.walkX = 245;
      }
      if (item.char === 'ㅁ' && audioOn) {
        playMosquitoBuzz(1.75);
      }
    },
    onStartAction: (item, audioOn) => {
      if (!audioOn) return;
      if (item.char === 'ㄱ') {
        playTrainHorn();
      } else if (item.char === 'ㅇ') {
        playDuckQuack();
      } else if (item.char === 'ㅈ') {
        playCarHorn();
        playCarWhoosh();
      } else if (item.char === 'ㄹ') {
        playScenarioSfx('ㄹ');
      } else if (item.char === 'ㅊ') {
        playDiscoDanceBeat(2.35);
      } else if (item.char === 'ㅎ') {
        playScenarioSfx('ㅎ');
      }
    },
    onActionProgress: (item, t, helpers) => {
      const impactThreshold: Record<string, number> = {
        'ㄱ': 0.28,
        'ㄴ': 0.62,
        'ㄷ': 0.35,
        'ㄹ': 0.36,
        'ㅁ': 0.55,
        'ㅂ': 0.22,
        'ㅅ': 0.25,
        'ㅇ': 0.58,
        'ㅈ': 0.5,
        'ㅊ': 0.25,
        'ㅋ': 0.56,
        'ㅌ': 0.36,
        'ㅍ': 0.58,
        'ㅎ': 0.34,
      };
      const hitAt = impactThreshold[item.char] ?? 0.4;
      if (t >= hitAt && !helpers.impactTriggered) {
        helpers.markImpact();
        if (helpers.audioEnabled) {
          if (item.char === 'ㅊ') {
            // Happy dance episode - no scream!
          } else if (item.char === 'ㅎ') {
            playDiscoDanceBeat(2.3);
          } else if (item.char === 'ㅍ') {
            playScenarioSfx('ㅌ');
            playScenarioSfx('ㅍ');
            playCartoonImpact();
          } else {
            playCartoonImpact();
            if (item.char !== 'ㄱ' && item.char !== 'ㄹ') {
              playScenarioSfx(item.char);
            }
          }
        }
      }
    },
    onAftermathStart: (item, audioOn) => {
      if (audioOn && (item.char === 'ㄱ' || item.char === 'ㅍ')) {
        playCartoonSplat();
      }
    },
  });

  const activeChar = selectedConsonant.char;
  const isTigerDiscoTwist =
    activeChar === 'ㅎ' &&
    ((phase === 'action' && anim.actionT >= 0.34) ||
      phase === 'aftermath' ||
      phase === 'reveal');
  const activeTheme: Episode3ThemeKey =
    phase === 'walking'
      ? 'default'
      : isTigerDiscoTwist
      ? 'disco'
      : selectedConsonant.sceneTheme;
  const isWalkingMotion =
    phase === 'walking' ||
    phase === 'approaching' ||
    (phase === 'action' && activeChar === 'ㅈ' && anim.actionT < 0.5) ||
    (phase === 'action' && activeChar === 'ㄷ' && anim.actionT < 0.35);

  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  const scrollOffset = anim.worldScrollX;
  const jollaFacing =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? ACTION_SPOT_X >= anim.approachStartX
        ? 1
        : -1
      : 1;

  // =========================================================================
  // COMPUTE JOLLAMAN TRANSFORM & POSE PER SCENARIO
  // =========================================================================
  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaVisible = true;
  let jollaFaceMode:
    | 'happy'
    | 'panic'
    | 'dizzy'
    | 'burnt'
    | 'muddy'
    | 'squashed'
    | 'swollenRed'
    | 'jellyMelt' = 'happy';
  let showHeadBump = false;
  let showXraySkeleton = false;
  let isDiscoDancing = false;

  const getBridgeArchLift = (worldX: number): number => {
    const t = Math.max(0, Math.min(1, (worldX - 245) / 410));
    return 4 * 30 * t * (1 - t);
  };

  if (phase === 'walking') {
    jollaFaceMode = 'happy';
  } else if (phase === 'approaching') {
    jollaFaceMode = 'happy';
    if (activeChar === 'ㄷ') {
      jollaY = GROUND_Y - 66 - getBridgeArchLift(jollaX) - bounceY;
    }
    if (activeChar === 'ㅍ' && anim.objectAppear > 0.72) {
      jollaY -= (anim.objectAppear - 0.72) * 35;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㄱ': {
        if (t < 0.28) {
          jollaFaceMode = 'panic';
        } else {
          const ft = (t - 0.28) / 0.72;
          jollaFaceMode = 'panic';
          jollaY = GROUND_Y - 52 - 4 * 190 * ft * (1 - ft);
          jollaX = ACTION_SPOT_X - Math.sin(ft * Math.PI) * 55;
          jollaRot = -1080 * ft; // Exact 3 somersaults!
        }
        break;
      }
      case 'ㄴ': {
        if (t < 0.62) {
          jollaFaceMode = 'panic';
        } else {
          const squashT = Math.min((t - 0.62) / 0.25, 1);
          jollaFaceMode = 'squashed';
          jollaY = GROUND_Y - 52 + squashT * 42;
          jollaScaleX = 1 + squashT * 0.75;
          jollaScaleY = 1 - squashT * 0.78;
        }
        break;
      }
      case 'ㄷ': {
        if (t < 0.35) {
          jollaX = ACTION_SPOT_X + (t / 0.35) * 145;
          jollaY = GROUND_Y - 66 - getBridgeArchLift(jollaX) - Math.abs(Math.sin(t * 25)) * 4;
          jollaFaceMode = 'happy';
        } else {
          const fallT = (t - 0.35) / 0.65;
          const fallTargetX = ACTION_SPOT_X + 145;
          const fallStartY = GROUND_Y - 66 - getBridgeArchLift(fallTargetX);
          jollaX = fallTargetX;
          jollaY = Math.min(380, fallStartY + fallT * fallT * (380 - fallStartY + 12));
          jollaRot = -68 * Math.min(fallT * 1.35, 1);
          jollaFaceMode = fallT > 0.72 ? 'dizzy' : 'panic';
        }
        break;
      }
      case 'ㄹ': {
        // Horizontal missile blasts Jollaman flying across the sky!
        if (t < 0.36) {
          jollaFaceMode = 'panic';
        } else {
          const flyT = (t - 0.36) / 0.64;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - flyT * 480;
          jollaY = GROUND_Y - 52 - flyT * 240;
          jollaRot = -1080 * flyT;
        }
        break;
      }
      case 'ㅁ': {
        if (t < 0.55) {
          jollaFaceMode = 'panic';
        } else {
          // Bitten right on the face -> face turns red!
          jollaFaceMode = 'swollenRed';
        }
        break;
      }
      case 'ㅂ': {
        if (t < 0.2) {
          jollaFaceMode = 'panic';
        } else {
          jollaFaceMode = 'burnt';
          showXraySkeleton = Math.floor(t * 24) % 2 === 0;
          jollaX = ACTION_SPOT_X + (Math.random() - 0.5) * 8;
        }
        break;
      }
      case 'ㅅ': {
        if (t < 0.25) {
          jollaFaceMode = 'panic';
        } else {
          jollaFaceMode = 'jellyMelt';
        }
        break;
      }
      case 'ㅇ': {
        const peckBounce = Math.abs(Math.sin(t * Math.PI * 6)) * 10;
        jollaY = GROUND_Y - 46 + peckBounce;
        jollaFaceMode = 'dizzy';
        showHeadBump = t > 0.3;
        break;
      }
      case 'ㅈ': {
        if (t < 0.5) {
          // Walks forward as the indigo car approaches at high speed!
          const wt = Math.min(t / 0.42, 1);
          jollaX = ACTION_SPOT_X + wt * 80;
          jollaFaceMode = 'happy';
        } else {
          // Strong whirlwind gust from the car spins Jollaman 360 degrees!
          const spinT = (t - 0.5) / 0.5;
          jollaX = ACTION_SPOT_X + 80;
          jollaY = GROUND_Y - 52 - Math.sin(spinT * Math.PI) * 58;
          jollaRot = spinT * 360;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case 'ㅊ': {
        if (t < 0.2) {
          jollaFaceMode = 'panic';
        } else {
          isDiscoDancing = true;
          jollaVisible = false;
        }
        break;
      }
      case 'ㅋ': {
        if (t < 0.56) {
          jollaX = ACTION_SPOT_X + 20;
          jollaFaceMode = 'happy';
        } else {
          const flyT = (t - 0.56) / 0.44;
          jollaX = ACTION_SPOT_X + 100 - flyT * 460;
          jollaY = GROUND_Y - 80 - flyT * 240;
          jollaRot = flyT * 900;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅌ': {
        if (t < 0.36) {
          jollaFaceMode = 'panic';
        } else {
          const flyT = (t - 0.36) / 0.64;
          jollaX = ACTION_SPOT_X - flyT * 460;
          jollaY = GROUND_Y - 60 - Math.sin(flyT * Math.PI) * 95;
          jollaRot = -flyT * 720;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅍ': {
        if (t < 0.58) {
          const riseT = t / 0.58;
          const sway = Math.sin(riseT * Math.PI * 3.5) * 28;
          jollaX = ACTION_SPOT_X + 40 + riseT * 290 + sway;
          jollaY = GROUND_Y - 90 - riseT * 145;
          jollaRot = Math.cos(riseT * Math.PI * 3.5) * 14;
          jollaFaceMode = t >= 0.4 ? 'panic' : 'happy';
        } else {
          const dropT = (t - 0.58) / 0.42;
          jollaX = ACTION_SPOT_X + 330;
          jollaY = GROUND_Y - 235 + dropT * dropT * 190;
          jollaRot = dropT * 420;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅎ': {
        if (t < 0.34) {
          // Frozen in fear shaking slightly at roaring tiger!
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 75) * 3;
        } else {
          // Surprise twist -> dances breakdance alongside Tiger!
          isDiscoDancing = true;
          jollaVisible = false;
        }
        break;
      }
      default:
        break;
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㄱ':
        jollaX = ACTION_SPOT_X;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㅍ':
        jollaX = ACTION_SPOT_X + 330;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㄴ':
        jollaFaceMode = 'squashed';
        jollaY = GROUND_Y - 10;
        jollaScaleX = 1.75;
        jollaScaleY = 0.22;
        break;
      case 'ㄷ': {
        // Bobbing/drifting dizzy on top of the river water
        const drift = phase === 'aftermath' ? anim.aftermathT : 1;
        jollaVisible = true;
        jollaFaceMode = 'dizzy';
        jollaX = 435 + drift * 95;
        jollaY = 380 + Math.sin(anim.walkTime * 6) * 4;
        jollaRot = -68 + Math.sin(anim.walkTime * 3.5) * 10;
        break;
      }
      case 'ㄹ': {
        // Floating dizzy back down from space under a mini parachute!
        const descT = phase === 'aftermath' ? anim.aftermathT : 1;
        jollaVisible = true;
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X - 40 * (1 - descT) + Math.sin(anim.walkTime * 4.2) * (1 - descT * 0.7) * 24;
        jollaY = 92 + (GROUND_Y - 52 - 92) * descT;
        jollaRot = Math.sin(anim.walkTime * 4.2) * 12 * (1 - descT * 0.7);
        break;
      }
      case 'ㅋ': {
        // Landed dizzy on left ground after elephant fling
        const landT = phase === 'aftermath' ? Math.min(anim.aftermathT / 0.35, 1) : 1;
        jollaVisible = true;
        jollaFaceMode = 'dizzy';
        jollaX = 150;
        jollaY = 72 + (GROUND_Y - 52 - 72) * (landT * landT);
        jollaRot = (1 - landT) * 360;
        break;
      }
      case 'ㅌ': {
        // Landed dizzy on left ground with cartoon head bump ("혹") after rabbit kick
        const landT = phase === 'aftermath' ? Math.min(anim.aftermathT / 0.35, 1) : 1;
        jollaVisible = true;
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = 150;
        jollaY = 120 + (GROUND_Y - 52 - 120) * (landT * landT);
        jollaRot = (1 - landT) * -360;
        break;
      }
      case 'ㅁ':
        jollaFaceMode = 'swollenRed';
        break;
      case 'ㅂ':
        jollaFaceMode = 'burnt';
        showXraySkeleton = Math.floor(anim.walkTime * 14) % 2 === 0;
        break;
      case 'ㅅ':
        jollaFaceMode = 'jellyMelt';
        break;
      case 'ㅇ':
        jollaFaceMode = 'dizzy';
        jollaY = GROUND_Y - 46;
        showHeadBump = true;
        break;
      case 'ㅈ':
        jollaX = ACTION_SPOT_X + 80;
        jollaY = GROUND_Y - 52;
        jollaRot = 0;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㅊ':
      case 'ㅎ':
        isDiscoDancing = true;
        jollaVisible = false;
        break;
      default:
        break;
    }
  }

  const isSplatPose =
    (phase === 'aftermath' || phase === 'reveal') &&
    (activeChar === 'ㄱ' || activeChar === 'ㅍ');

  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);
  const localizedMeaning = tWordMeaning(
    1,
    selectedConsonant.char,
    selectedConsonant.words[0]?.meaning ?? ''
  );

  return (
    <JollamanStageShell
      icon="🏃"
      title="1. 졸라자음맨 (ㄱ ~ ㅎ)"
      accentButtonClass="bg-rose-600 hover:bg-rose-700"
      stageBgClass="bg-sky-100"
      ariaLabel="졸라맨 한글 자음 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'chillLounge',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-rose-50 text-rose-700 border-rose-200 hover:bg-rose-100',
        activeLabel: '🎵 힐링 BGM 켜짐',
        title: '따뜻한 로파이 힐링 배경음악 켜기/끄기',
      }}
      items={KOREAN_CONSONANTS}
      selectedItem={selectedConsonant}
      learnedKeys={learnedChars}
      getKey={(item) => item.char}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      getTokenText={(item) => item.char}
      onSelectItem={handleConsonantClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={540}
      walkingHint="하늘의 자음 (ㄱ ~ ㅎ)을 눌러보세요!"
      activeCaption={`${selectedConsonant.char} · ${selectedConsonant.name} [${selectedConsonant.soundCue}] · ${selectedConsonant.triggerWord} (${localizedMeaning})`}
      revealAriaLabel={`${selectedConsonant.char} ${selectedConsonant.name}, ${selectedConsonant.triggerWord} 학습 화면`}
      revealGlyph={selectedConsonant.char}
      revealHeadline={
        <span className="inline-flex flex-wrap items-baseline justify-center text-center">
          <span className="mr-3 sm:mr-3.5">{selectedConsonant.name}</span>
          <span style={{ color: selectedConsonant.color }} className="mr-3 sm:mr-3.5">
            [{selectedConsonant.soundCue}],
          </span>
          <span>{selectedConsonant.triggerWord}</span>
        </span>
      }
      revealSubtitle={tRevealSubtitle(1, selectedConsonant.char, selectedConsonant.gagSummary)}
      flashcard={(() => {
        const word = selectedConsonant.triggerWord;
        const wordFirst = word.slice(0, 1);
        const wordRest = word.slice(1);
        const rawMeaning = localizedMeaning || selectedConsonant.words[0]?.meaning || '';
        const prettyMeaning = rawMeaning
          ? rawMeaning.charAt(0).toUpperCase() + rawMeaning.slice(1)
          : '';
        return {
          glyph: selectedConsonant.char,
          subLabel: `${selectedConsonant.name} [${selectedConsonant.soundCue}]`,
          accentColor: selectedConsonant.color,
          headlineNode: (
            <>
              <span style={{ color: selectedConsonant.color }}>{wordFirst}</span>
              <span>{wordRest}</span>
            </>
          ),
          headlineCharLen: word.length,
          meaning: prettyMeaning,
          romanization: romanizeKorean(word),
          cornerIcon: getSeriesCornerIcon(1, selectedConsonant.char, anim.walkTime),
        };
      })()}
      defsSlot={
        <defs>
          <linearGradient id="cheeseGoldGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>
      }
      backdropSlot={
        <DynamicEpisode3Backdrop
          theme={activeTheme}
          scrollOffset={scrollOffset}
          walkTime={anim.walkTime}
          terrainMode={activeChar === 'ㄷ' && phase !== 'walking' ? 'river' : 'road'}
        />
      }
    >
          {/* ================================================================= */
          /* 4. SCENARIO BACKDROP & NON-OVERLAY OBJECTS                        */
          /* ================================================================= */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* ㄱ: Detailed Express Train */}
              {/* ㄱ: Detailed 3-Car Express Train (기관차 + 객차 1 + 객차 2) */}
              {activeChar === 'ㄱ' && (() => {
                let tx = 1080;
                if (phase === 'approaching') {
                  tx = 1080 - anim.objectAppear * 80;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.28) {
                    const rt = anim.actionT / 0.28;
                    tx = 1000 + (ACTION_SPOT_X + 25 - 1000) * rt;
                  } else {
                    const lt = (anim.actionT - 0.28) / 0.72;
                    tx = ACTION_SPOT_X + 25 - lt * 1050;
                  }
                } else {
                  tx = -520;
                }
                return tx > -480 ? (
                  <g transform={`translate(${tx}, ${GROUND_Y - 78})`}>
                    {/* Steam smoke puffs */}
                    <circle cx="38" cy="-16" r="10" fill="#FFFFFF" opacity="0.85" />
                    <circle cx="58" cy="-28" r="13" fill="#F1F5F9" opacity="0.7" />
                    <circle cx="82" cy="-36" r="15" fill="#E2E8F0" opacity="0.55" />

                    {/* Car 1: Locomotive */}
                    <rect x="8" y="16" width="132" height="52" rx="8" fill="#EF4444" stroke="#991B1B" strokeWidth="3" />
                    <rect x="82" y="-6" width="58" height="34" rx="5" fill="#DC2626" stroke="#991B1B" strokeWidth="3" />
                    <rect x="92" y="2" width="32" height="18" rx="3" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2" />
                    <rect x="26" y="-4" width="18" height="22" rx="2" fill="#1E293B" />
                    <polygon points="8,44 -8,68 12,68" fill="#FACC15" stroke="#CA8A04" strokeWidth="2" />
                    <circle cx="8" cy="30" r="6" fill="#FEF08A" stroke="#CA8A04" strokeWidth="2" />
                    <circle cx="52" cy="42" r="17" fill="#FFFFFF" stroke="#991B1B" strokeWidth="2.5" />
                    <text x="52" y="49" textAnchor="middle" fontSize="22" fontWeight="900" fill="#EF4444">ㄱ</text>

                    {/* Coupler 1 -> 2 */}
                    <line x1="140" y1="52" x2="148" y2="52" stroke="#1E293B" strokeWidth="5" />

                    {/* Car 2: Blue Passenger Car */}
                    <rect x="148" y="12" width="124" height="56" rx="8" fill="#3B82F6" stroke="#1D4ED8" strokeWidth="3" />
                    <rect x="160" y="22" width="26" height="20" rx="3" fill="#DBEAFE" />
                    <rect x="196" y="22" width="26" height="20" rx="3" fill="#DBEAFE" />
                    <rect x="232" y="22" width="26" height="20" rx="3" fill="#DBEAFE" />

                    {/* Coupler 2 -> 3 */}
                    <line x1="272" y1="52" x2="280" y2="52" stroke="#1E293B" strokeWidth="5" />

                    {/* Car 3: Emerald Passenger Car */}
                    <rect x="280" y="12" width="124" height="56" rx="8" fill="#10B981" stroke="#047857" strokeWidth="3" />
                    <rect x="292" y="22" width="26" height="20" rx="3" fill="#D1FAE5" />
                    <rect x="328" y="22" width="26" height="20" rx="3" fill="#D1FAE5" />
                    <rect x="364" y="22" width="26" height="20" rx="3" fill="#D1FAE5" />

                    {/* Wheels across all 3 cars */}
                    {[28, 66, 114, 174, 244, 306, 376].map((wx, wi) => (
                      <g key={wi} transform={`translate(${wx}, 70)`}>
                        <circle cx="0" cy="0" r="11" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
                        <circle cx="0" cy="0" r="4" fill="#FACC15" />
                      </g>
                    ))}
                  </g>
                ) : null;
              })()}

              {/* ㄴ: Detailed Shaded Oak Street Tree (가로수 나무) */}
              {activeChar === 'ㄴ' && (() => {
                const slideIn = phase === 'approaching' ? (1 - anim.objectAppear) * 140 : 0;
                let treeAngle = 0;
                if (phase === 'action') {
                  const fallP = Math.min(Math.max((anim.actionT - 0.15) / 0.55, 0), 1);
                  treeAngle = -90 * (fallP * fallP);
                } else if (phase === 'aftermath' || phase === 'reveal') {
                  treeAngle = -90;
                }
                return (
                  <g transform={`translate(${ACTION_SPOT_X + 165 + slideIn}, ${GROUND_Y})`}>
                    {/* Detailed Roots & Stump */}
                    <path d="M-20 4 Q-12 -14 0 -14 Q12 -14 20 4 Z" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
                    <g transform={`rotate(${treeAngle}, 0, -10)`}>
                      {/* Bark Trunk with Grain */}
                      <path d="M-13 -8 L-9 -155 L9 -155 L13 -8 Z" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
                      <path d="M-4 -25 L-3 -115 M4 -45 L3 -135" stroke="#451A03" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
                      <path d="M-6 -125 L-28 -155 M6 -130 L26 -156" stroke="#78350F" strokeWidth="7" strokeLinecap="round" />
                      {/* Layered Leafy Canopy */}
                      <circle cx="-36" cy="-162" r="34" fill="#15803D" stroke="#14532D" strokeWidth="2.5" />
                      <circle cx="36" cy="-160" r="34" fill="#15803D" stroke="#14532D" strokeWidth="2.5" />
                      <circle cx="0" cy="-196" r="42" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
                      <circle cx="-18" cy="-176" r="32" fill="#4ADE80" />
                      <circle cx="20" cy="-176" r="30" fill="#22C55E" />
                      {/* 5 ㄴ Fruit Emblems hanging on Tree Canopy (no white background, no stem, 2 tilted!) */}
                      {[
                        { x: -34, y: -156, rot: -20 },
                        { x: -16, y: -194, rot: 0 },
                        { x: 16, y: -198, rot: 18 },
                        { x: 34, y: -158, rot: 0 },
                        { x: 2, y: -164, rot: 0 },
                      ].map((fruit, idx) => (
                        <g key={idx} transform={`translate(${fruit.x}, ${fruit.y}) rotate(${fruit.rot})`}>
                          <text
                            x="0"
                            y="7"
                            textAnchor="middle"
                            fontSize="21"
                            fontWeight="900"
                            fill="#FB923C"
                            stroke="#431407"
                            strokeWidth="2.2"
                            style={{ paintOrder: 'stroke fill' }}
                          >
                            ㄴ
                          </text>
                        </g>
                      ))}
                    </g>
                    {phase === 'action' && anim.actionT > 0.56 && anim.actionT < 0.88 && (
                      <g transform="translate(-155, -48)">
                        <ComicImpactBurstSvg scale={0.95} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㄷ: Gently Arched Scenic Wooden Bridge spanning across the River! */}
              {activeChar === 'ㄷ' && (() => {
                const broken = (phase === 'action' && anim.actionT >= 0.35) || phase === 'aftermath' || phase === 'reveal';
                const deckTop = (lx: number) => {
                  const u = lx / 410;
                  return -14 - 120 * u * (1 - u);
                };
                const buildDeckPath = (xStart: number, xEnd: number, thickness = 17) => {
                  const steps = 8;
                  const topPts: string[] = [];
                  const botPts: string[] = [];
                  for (let i = 0; i <= steps; i++) {
                    const lx = xStart + ((xEnd - xStart) * i) / steps;
                    const yt = deckTop(lx);
                    topPts.push(`${i === 0 ? 'M' : 'L'}${lx.toFixed(1)} ${yt.toFixed(1)}`);
                    botPts.unshift(`L${lx.toFixed(1)} ${(yt + thickness).toFixed(1)}`);
                  }
                  return `${topPts.join(' ')} ${botPts.join(' ')} Z`;
                };
                const leftPosts = [8, 86, 162];
                const rightPosts = [232, 316, 396];
                return (
                  <g transform={`translate(245, ${GROUND_Y})`}>
                    {/* Support Pillars in River */}
                    <rect x="148" y={deckTop(155) + 15} width="14" height={Math.abs(deckTop(155) + 15) + 90} fill="#78350F" stroke="#451A03" strokeWidth="2" />
                    <rect x="234" y={deckTop(241) + 15} width="14" height={Math.abs(deckTop(241) + 15) + 90} fill="#78350F" stroke="#451A03" strokeWidth="2" />

                    {/* Left & Right Gently Arched Wooden Bridge Deck Planks */}
                    <path d={buildDeckPath(0, 170)} fill="#B45309" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
                    <path d={buildDeckPath(225, 410)} fill="#B45309" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />

                    {!broken ? (
                      <g>
                        <path d={buildDeckPath(168, 227)} fill="#D97706" stroke="#78350F" strokeWidth="2.5" strokeLinejoin="round" />
                        <line x1="186" y1={deckTop(186)} x2="186" y2={deckTop(186) + 17} stroke="#78350F" strokeWidth="2" />
                        <line x1="208" y1={deckTop(208)} x2="208" y2={deckTop(208) + 17} stroke="#78350F" strokeWidth="2" />
                      </g>
                    ) : (
                      <>
                        <rect x="166" y="10" width="26" height="12" transform="rotate(42, 172, 12)" fill="#92400E" />
                        <rect x="206" y="12" width="26" height="12" transform="rotate(-38, 214, 12)" fill="#92400E" />
                        <ellipse cx="196" cy="22" rx="44" ry="14" fill="#E0F2FE" opacity="0.92" />
                        <circle cx="168" cy="-4" r="8" fill="#BAE6FD" />
                        <circle cx="222" cy="-6" r="9" fill="#BAE6FD" />
                        {phase === 'action' && (
                          <g>
                            <path d="M184 -10 Q176 -34 166 -28" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                            <path d="M208 -10 Q216 -34 226 -28" fill="none" stroke="#38BDF8" strokeWidth="4" strokeLinecap="round" />
                          </g>
                        )}
                      </>
                    )}

                    {/* Handrail Posts & Arched Rope */}
                    {[...leftPosts, ...rightPosts].map((px) => (
                      <rect key={px} x={px} y={deckTop(px + 3) - 30} width="7" height="31" rx="2" fill="#78350F" />
                    ))}
                    <path
                      d={`M11 ${deckTop(11) - 24} Q86 ${deckTop(86) - 20} 165 ${deckTop(165) - 24}`}
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="4"
                    />
                    <path
                      d={`M235 ${deckTop(235) - 24} Q316 ${deckTop(316) - 20} 399 ${deckTop(399) - 24}`}
                      fill="none"
                      stroke="#D97706"
                      strokeWidth="4"
                    />
                  </g>
                );
              })()}

              {/* ㄹ: Horizontal Missile Rocket zooming from right & blasting Jollaman into orbit! */}
              {activeChar === 'ㄹ' && (() => {
                let rx = 1090;
                const ry = GROUND_Y - 58;
                if (phase === 'approaching') {
                  rx = 1090 - anim.objectAppear * 130;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.36) {
                    const zoomT = anim.actionT / 0.36;
                    rx = 960 + (ACTION_SPOT_X + 20 - 960) * zoomT;
                  } else {
                    const pastT = (anim.actionT - 0.36) / 0.64;
                    rx = ACTION_SPOT_X + 20 - pastT * 960;
                  }
                } else {
                  rx = -320;
                }
                return rx > -180 ? (
                  <g>
                    <g transform={`translate(${rx}, ${ry}) rotate(-90)`}>
                      <SpaceXRocketSvg firing={true} legsDeployed={false} walkTime={anim.walkTime} />
                    </g>
                    {phase === 'action' && anim.actionT >= 0.36 && anim.actionT < 0.65 && (
                      <g transform={`translate(${ACTION_SPOT_X + 10}, ${GROUND_Y - 110})`}>
                        <ComicImpactBurstSvg scale={1.1} />
                      </g>
                    )}
                  </g>
                ) : null;
              })()}

              {/* ㅁ: Sleek Skinny Mosquito biting Jollaman's FACE */}
              {activeChar === 'ㅁ' && (() => {
                let mx = ACTION_SPOT_X + 240;
                let my = GROUND_Y - 95;
                if (phase === 'approaching') {
                  mx = ACTION_SPOT_X + 380 - anim.objectAppear * 160;
                  my = GROUND_Y - 120 + Math.sin(anim.walkTime * 10) * 10;
                } else if (phase === 'action') {
                  if (anim.actionT < 0.55) {
                    const ct = anim.actionT / 0.55;
                    mx = ACTION_SPOT_X + 220 - ct * 155;
                    my = GROUND_Y - 92 + Math.sin(ct * 18) * 10;
                  } else {
                    mx = ACTION_SPOT_X + 64;
                    my = GROUND_Y - 84;
                  }
                } else {
                  mx = ACTION_SPOT_X + 235;
                  my = GROUND_Y - 165 + Math.sin(anim.walkTime * 12) * 10;
                }
                return (
                  <g transform={`translate(${mx}, ${my})`}>
                    <SkinnyMosquitoSvg walkTime={anim.walkTime} />
                  </g>
                );
              })()}

              {/* ㅂ: Pure Crackling Electric Lightning Bolt */}
              {activeChar === 'ㅂ' && (() => {
                const boltActive =
                  phase === 'approaching'
                    ? anim.objectAppear > 0.65
                    : phase === 'action';
                const pulse = Math.sin(anim.walkTime * 35) * 0.15 + 1;
                return boltActive ? (
                  <g>
                    {/* Electric Sky Aura Flash */}
                    <circle cx={ACTION_SPOT_X} cy="95" r="70" fill="#FACC15" opacity="0.22" />
                    {/* Giant Crackling Jagged Lightning Bolt */}
                    <polygon
                      points={`${ACTION_SPOT_X - 18},0 ${ACTION_SPOT_X + 28},0 ${ACTION_SPOT_X - 2},118 ${ACTION_SPOT_X + 34},118 ${ACTION_SPOT_X - 10},225 ${ACTION_SPOT_X + 26},225 ${ACTION_SPOT_X - 16},325 ${ACTION_SPOT_X - 4},235 ${ACTION_SPOT_X - 36},235 ${ACTION_SPOT_X - 12},132 ${ACTION_SPOT_X - 42},132`}
                      fill="#FACC15"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      transform={`scale(1, ${pulse})`}
                    />
                  </g>
                ) : null;
              })()}

              {/* ㅇ: Detailed Angry Duck + Silent Initial Consonant (🔇) Hint Badge */}
              {activeChar === 'ㅇ' && (() => {
                const dx = phase === 'approaching'
                  ? ACTION_SPOT_X + 280 - anim.objectAppear * 165
                  : ACTION_SPOT_X + 115;
                const peckTilt =
                  phase === 'action'
                    ? -Math.abs(Math.sin(anim.actionT * Math.PI * 6)) * 28
                    : 0;
                return (
                  <g transform={`translate(${dx}, ${GROUND_Y - 58})`}>
                    <line x1="0" y1="36" x2="0" y2="56" stroke="#EA580C" strokeWidth="6" />
                    <polygon points="-16,58 10,58 4,52" fill="#EA580C" />
                    {/* Feathered Duck Body + Wing */}
                    <ellipse cx="18" cy="14" rx="50" ry="32" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
                    <path d="M58 -2 Q78 -18 68 8 Q82 -2 62 18" fill="#FFFFFF" stroke="#475569" strokeWidth="2.5" />
                    <path d="M-2 10 Q25 -6 46 14 Q24 28 -2 10 Z" fill="#F1F5F9" stroke="#64748B" strokeWidth="2.5" />
                    <g transform={`rotate(${peckTilt}, -15, 0)`}>
                      <rect x="-26" y="-54" width="22" height="58" rx="10" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
                      <circle cx="-18" cy="-58" r="22" fill="#FFFFFF" stroke="#475569" strokeWidth="3" />
                      <circle cx="-25" cy="-60" r="3.8" fill="#0F172A" />
                      <line x1="-32" y1="-71" x2="-15" y2="-63" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
                      <polygon points="-38,-60 -78,-52 -38,-44" fill="#F97316" stroke="#C2410C" strokeWidth="2.5" />
                    </g>
                    {phase === 'action' && (
                      <>
                        <ellipse cx="-55" cy="-25" rx="9" ry="3.5" transform="rotate(-30, -55, -25)" fill="#FFFFFF" stroke="#94A3B8" />
                        <ellipse cx="-35" cy="-86" rx="9" ry="3.5" transform="rotate(25, -35, -86)" fill="#FFFFFF" stroke="#94A3B8" />
                      </>
                    )}
                  </g>
                );
              })()}

              {/* ㅈ: Strong Whirlwind Gust Swirls behind speeding Car! */}
              {activeChar === 'ㅈ' && (() => {
                const gustActive =
                  (phase === 'action' && anim.actionT >= 0.48) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const gx = ACTION_SPOT_X + 80;
                return gustActive ? (
                  <g transform={`translate(${gx}, ${GROUND_Y - 52})`}>
                    <g opacity={phase === 'action' ? 0.88 : 0.45}>
                      <path
                        d={`M-65 -20 Q-20 ${-45 + Math.sin(anim.walkTime * 18) * 8} 40 -18`}
                        fill="none"
                        stroke="#E0F2FE"
                        strokeWidth="4"
                        strokeLinecap="round"
                      />
                      <path
                        d={`M-75 10 Q-10 ${30 - Math.cos(anim.walkTime * 18) * 8} 55 8`}
                        fill="none"
                        stroke="#BAE6FD"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                      />
                    </g>
                  </g>
                ) : null;
              })()}

              {/* ㅊ: Dark Club + Descending Mirror Ball + Intense Wave & Breakdance! */}
              {activeChar === 'ㅊ' && (() => {
                const dropY =
                  phase === 'approaching'
                    ? -40
                    : phase === 'action' && anim.actionT < 0.22
                    ? -40 + (anim.actionT / 0.22) * 165
                    : 125;
                const dancingNow =
                  (phase === 'action' && anim.actionT >= 0.2) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                return (
                  <g>
                    <g transform="translate(500, 0)">
                      <MirrorBallSvg dropY={dropY} walkTime={anim.walkTime} badgeChar="ㅊ" />
                    </g>
                    {dancingNow && (
                      <g>
                        <g transform={`translate(${ACTION_SPOT_X + 60}, ${GROUND_Y - 52})`}>
                          <DiscoDancingJollamanSvg walkTime={anim.walkTime} />
                        </g>
                        <text x={ACTION_SPOT_X - 45} y={GROUND_Y - 125 + Math.sin(anim.walkTime * 8) * 6} fontSize="26" fontWeight="900" fill="#F43F5E">♪</text>
                        <text x={ACTION_SPOT_X + 165} y={GROUND_Y - 135 + Math.cos(anim.walkTime * 8) * 6} fontSize="26" fontWeight="900" fill="#38BDF8">♫</text>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅋ: Shaded Elephant — Trunk Handshake first, then Sudden Fling! */}
              {activeChar === 'ㅋ' && (() => {
                const ex = phase === 'approaching'
                  ? ACTION_SPOT_X + 340 - anim.objectAppear * 135
                  : ACTION_SPOT_X + 205;
                const isHandshake = phase === 'action' && anim.actionT < 0.56;
                const wave = isHandshake ? Math.sin(anim.actionT * Math.PI * 8) * 14 : 0;
                const flingSwing =
                  phase === 'action' && anim.actionT >= 0.56
                    ? Math.sin(Math.min((anim.actionT - 0.56) / 0.4, 1) * Math.PI) * 65
                    : 0;
                return (
                  <g transform={`translate(${ex}, ${GROUND_Y - 70})`}>
                    <rect x="-25" y="25" width="22" height="46" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                    <rect x="28" y="25" width="22" height="46" rx="6" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                    <ellipse cx="14" cy="4" rx="64" ry="45" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
                    <ellipse cx="-16" cy="-14" rx="28" ry="34" fill="#94A3B8" stroke="#475569" strokeWidth="2.5" />
                    <circle cx="-44" cy="-22" r="30" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
                    <circle cx="-54" cy="-28" r="4" fill="#0F172A" />
                    {/* Ivory tusk */}
                    <path d="M-64 -6 Q-84 4 -88 -8" fill="none" stroke="#FEF9C3" strokeWidth="7" strokeLinecap="round" />
                    {/* Articulated Trunk */}
                    <path
                      d={
                        isHandshake
                          ? `M-70 -14 Q-118 ${6 + wave * 0.5} -156 ${8 + wave}`
                          : `M-70 -16 Q${-115 - flingSwing * 0.4} ${10 - flingSwing} ${-135 + flingSwing * 0.3} ${-30 - flingSwing}`
                      }
                      fill="none"
                      stroke="#94A3B8"
                      strokeWidth="15"
                      strokeLinecap="round"
                    />
                    {/* ㅋ Consonant Emblem on Elephant Side */}
                    <circle cx="24" cy="2" r="18" fill="#FFFFFF" stroke="#475569" strokeWidth="2.8" />
                    <text x="24" y="10" textAnchor="middle" fontSize="24" fontWeight="900" fill="#A855F7">ㅋ</text>
                  </g>
                );
              })()}

              {/* ㅌ: REAL Generated Muscular Bodybuilder Rabbit Sprite! */}
              {activeChar === 'ㅌ' && (() => {
                const tx = phase === 'approaching'
                  ? ACTION_SPOT_X + 350 - anim.objectAppear * 165
                  : phase === 'action' && anim.actionT < 0.42
                  ? ACTION_SPOT_X + 185 - (anim.actionT / 0.42) * 105
                  : ACTION_SPOT_X + 90;
                const kickJump =
                  phase === 'action' && anim.actionT >= 0.2 && anim.actionT <= 0.65
                    ? Math.sin(((anim.actionT - 0.2) / 0.45) * Math.PI) * 58
                    : 0;
                return (
                  <g transform={`translate(${tx}, ${GROUND_Y - 90 - kickJump})`}>
                    {/* Flip horizontally so generated rabbit side-kicks LEFT at Jollaman! */}
                    <g transform="scale(-1, 1)">
                      <MuscularRabbitSvg />
                    </g>
                    {kickJump > 15 && (
                      <g transform="translate(-85, -16)">
                        <ComicImpactBurstSvg scale={1} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅍ: Glossy Balloon rises to sky -> ㅌ Muscular Rabbit leaps high & kicks it "뻥!!" */}
              {activeChar === 'ㅍ' && (() => {
                const popped =
                  (phase === 'action' && anim.actionT >= 0.58) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                let bx = ACTION_SPOT_X + 40;
                let by = GROUND_Y - 125;
                let rot = 0;
                if (phase === 'approaching') {
                  by = GROUND_Y - 195 + anim.objectAppear * 70;
                } else if (phase === 'action' && !popped) {
                  const riseT = anim.actionT / 0.58;
                  const sway = Math.sin(riseT * Math.PI * 3.5) * 28;
                  bx = ACTION_SPOT_X + 40 + riseT * 290 + sway;
                  by = GROUND_Y - 125 - riseT * 145;
                  rot = Math.cos(riseT * Math.PI * 3.5) * 14;
                }

                // Muscular Rabbit cameo flight path to sky balloon kick!
                const showRabbitCameo =
                  (phase === 'action' && anim.actionT >= 0.32) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                let rx = 890;
                let ry = GROUND_Y - 82;
                let rabbitRot = 0;
                if (phase === 'action') {
                  if (anim.actionT >= 0.32 && anim.actionT < 0.58) {
                    const leapT = (anim.actionT - 0.32) / 0.26;
                    rx = 910 - leapT * 205;
                    ry = GROUND_Y - 76 - Math.sin(leapT * Math.PI * 0.5) * 185;
                    rabbitRot = -leapT * 18;
                  } else if (anim.actionT >= 0.58) {
                    const landT = Math.min((anim.actionT - 0.58) / 0.32, 1);
                    rx = 705 + landT * 175;
                    ry = 110 + landT * landT * (GROUND_Y - 82 - 110);
                    rabbitRot = -18 + landT * 18;
                  }
                }

                return (
                  <g>
                    {!popped ? (
                      <g transform={`translate(${bx}, ${by}) rotate(${rot}, 0, 50)`}>
                        <line x1="0" y1="40" x2="0" y2="75" stroke="#475569" strokeWidth="3" />
                        <ellipse
                          cx="0"
                          cy="0"
                          rx={38 + (phase === 'action' ? anim.actionT * 20 : 0)}
                          ry={46 + (phase === 'action' ? anim.actionT * 20 : 0)}
                          fill="#F43F5E"
                          stroke="#9F1239"
                          strokeWidth="3"
                        />
                        <ellipse cx="-14" cy="-18" rx="9" ry="15" transform="rotate(-25, -14, -18)" fill="#FDA4AF" opacity="0.7" />
                        <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FFFFFF">ㅍ</text>
                      </g>
                    ) : (
                      phase === 'action' && anim.actionT < 0.88 && (
                        <g transform={`translate(${ACTION_SPOT_X + 330}, ${GROUND_Y - 270})`}>
                          <polygon
                            points="0,-48 14,-16 48,-20 20,4 44,36 10,18 -4,50 -16,18 -50,26 -20,0 -44,-30 -12,-16"
                            fill="#FDE047"
                            stroke="#EF4444"
                            strokeWidth="3"
                          />
                        </g>
                      )
                    )}

                    {/* ㅌ Muscular Bodybuilder Rabbit flying up to kick the balloon! */}
                    {showRabbitCameo && (
                      <g transform={`translate(${rx}, ${ry}) rotate(${rabbitRot})`}>
                        <g transform="scale(-1, 1)">
                          <MuscularRabbitSvg />
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅎ: Striped Tiger -> sudden Mirrorball Twist Duo Breakdance Happy Ending! */}
              {activeChar === 'ㅎ' && (() => {
                const hx =
                  phase === 'approaching'
                    ? ACTION_SPOT_X + 360 - anim.objectAppear * 165
                    : ACTION_SPOT_X + 195;
                const discoTwist =
                  (phase === 'action' && anim.actionT >= 0.34) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                const dropY =
                  phase === 'action' && anim.actionT >= 0.34 && anim.actionT < 0.52
                    ? -40 + ((anim.actionT - 0.34) / 0.18) * 165
                    : 125;

                if (discoTwist) {
                  return (
                    <g>
                      <g transform="translate(500, 0)">
                        <MirrorBallSvg dropY={dropY} walkTime={anim.walkTime} />
                      </g>
                      {/* Jollaman and Tiger dancing side-by-side in EXACT sync! */}
                      <g transform={`translate(${ACTION_SPOT_X + 10}, ${GROUND_Y - 52})`}>
                        <DiscoDancingJollamanSvg walkTime={anim.walkTime} />
                      </g>
                      <g transform={`translate(${ACTION_SPOT_X + 165}, ${GROUND_Y - 52})`}>
                        <DancingTigerSvg walkTime={anim.walkTime} badgeChar="ㅎ" />
                      </g>
                      <text x={ACTION_SPOT_X - 45} y={GROUND_Y - 125 + Math.sin(anim.walkTime * 8) * 6} fontSize="26" fontWeight="900" fill="#F43F5E">♪</text>
                      <text x={ACTION_SPOT_X + 235} y={GROUND_Y - 135 + Math.cos(anim.walkTime * 8) * 6} fontSize="26" fontWeight="900" fill="#38BDF8">♫</text>
                    </g>
                  );
                }

                return (
                  <g transform={`translate(${hx}, ${GROUND_Y - 58})`}>
                    <TigerSpriteSvg walkTime={anim.walkTime} isSpinning={false} badgeChar="ㅎ" />
                  </g>
                );
              })()}
            </g>
          )}

          {/* ================================================================= */}
          {/* 5. JOLLAMAN STICK FIGURE                                          */}
          {/* ================================================================= */}
          {jollaVisible && !isSplatPose && !isDiscoDancing && (
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaScaleX * jollaFacing}, ${jollaScaleY})`}
              onClick={toggleJollaPause}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 && activeChar !== 'ㄷ' && jollaY >= GROUND_Y - 66 && (
                <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
              )}

              {/* ㄹ Aftermath / Reveal: Mini Parachute attached above Jollaman! */}
              {activeChar === 'ㄹ' && (phase === 'aftermath' || phase === 'reveal') && (
                <g transform="translate(0, -42)">
                  <line x1="-22" y1="-28" x2="-8" y2="6" stroke="#475569" strokeWidth="1.8" />
                  <line x1="22" y1="-28" x2="8" y2="6" stroke="#475569" strokeWidth="1.8" />
                  <line x1="0" y1="-30" x2="0" y2="4" stroke="#475569" strokeWidth="1.6" />
                  <path d="M-32 -28 Q0 -64 32 -28 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2.5" />
                  <path d="M-12 -28 Q0 -58 12 -28 Z" fill="#FEF08A" stroke="#15803D" strokeWidth="1.8" />
                </g>
              )}

              {phase === 'action' && activeChar === 'ㄱ' && anim.actionT >= 0.28 && (
                <circle
                  cx="0"
                  cy="0"
                  r="42"
                  fill="none"
                  stroke="#FACC15"
                  strokeWidth="3"
                  strokeDasharray="16 14"
                  opacity="0.85"
                />
              )}

              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                showXraySkeleton={showXraySkeleton}
                walkTime={anim.walkTime}
                activeChar={activeChar}
              />

              {/* Spinning dizzy star above head in aftermath/reveal for ㄷ, ㄹ, ㅈ, ㅋ, ㅌ */}
              {(phase === 'aftermath' || phase === 'reveal') &&
                (activeChar === 'ㄷ' ||
                  activeChar === 'ㄹ' ||
                  activeChar === 'ㅈ' ||
                  activeChar === 'ㅋ' ||
                  activeChar === 'ㅌ') && (
                  <DizzyStarOrbitSvg walkTime={anim.walkTime} />
                )}
            </g>
          )}

          {/* ㄷ River Ripples around floating Jollaman */}
          {activeChar === 'ㄷ' && (phase === 'aftermath' || phase === 'reveal') && (
            <ellipse
              cx={jollaX}
              cy={398}
              rx={38 + Math.sin(anim.walkTime * 5) * 6}
              ry="7"
              fill="none"
              stroke="#E0F2FE"
              strokeWidth="2.5"
              opacity="0.85"
            />
          )}

          {/* Splat Pose for ㄱ & ㅍ */}
          {isSplatPose && (
            <g transform={`translate(${jollaX}, ${GROUND_Y - 4})`}>
              <ellipse cx="-44" cy="-4" rx="16" ry="8" fill="#E2E8F0" opacity="0.9" />
              <ellipse cx="44" cy="-4" rx="16" ry="8" fill="#E2E8F0" opacity="0.9" />
              <line x1="-26" y1="0" x2="22" y2="0" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              <line x1="-26" y1="0" x2="-46" y2="-9" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="-26" y1="0" x2="-44" y2="7" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="8" y1="0" x2="18" y2="-16" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <line x1="6" y1="0" x2="-8" y2="10" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
              <ellipse cx="34" cy="-2" rx="14" ry="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
              <path d="M28 -6 L32 -2 M32 -6 L28 -2" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <path d="M36 -6 L40 -2 M40 -6 L36 -2" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
              <DizzyStarOrbitSvg walkTime={anim.walkTime} cx={32} cy={-26} />
            </g>
          )}

          {/* ㅅ: Normal-size Lion opening wide & roaring ("어흥!!!") without growing giant! */}
          {activeChar === 'ㅅ' && (phase === 'approaching' || phase === 'action' || phase === 'aftermath' || phase === 'reveal') && (() => {
            const lx =
              phase === 'approaching'
                ? ACTION_SPOT_X + 350 - anim.objectAppear * 145
                : ACTION_SPOT_X + 205;
            const ly = GROUND_Y - 58;
            const roaring =
              (phase === 'action' && anim.actionT >= 0.25) ||
              phase === 'aftermath' ||
              phase === 'reveal';
            return (
              <g transform={`translate(${lx}, ${ly})`}>
                <DetailedLionSvg roaring={roaring} badgeChar="ㅅ" />
                {roaring && (
                  <g opacity={0.65 + Math.sin(anim.walkTime * 22) * 0.25}>
                    <path d="M-86 -20 Q-108 -6 -86 10" fill="none" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
                    <path d="M-104 -30 Q-130 -6 -104 20" fill="none" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ================================================================= */}
          {/* 5B. FOREGROUND CAR LAYER (ㅈ Car passes IN FRONT OF Jollaman!)    */}
          {/* ================================================================= */}
          {phase === 'action' && activeChar === 'ㅈ' && (() => {
            const carX = 1080 - anim.actionT * 1420;
            return carX > -360 ? (
              <g transform={`translate(${carX}, ${GROUND_Y - 94}) scale(2)`}>
                <path d="M10 30 L32 8 L104 8 L130 30 L148 34 L148 58 L0 58 L0 34 Z" fill="#6366F1" stroke="#312E81" strokeWidth="3" />
                <polygon points="38,12 98,12 116,30 24,30" fill="#BAE6FD" />
                <circle cx="72" cy="43" r="10.5" fill="#FFFFFF" stroke="#312E81" strokeWidth="2" />
                <text x="72" y="48.5" textAnchor="middle" fontSize="14.5" fontWeight="900" fill="#6366F1">ㅈ</text>
                <circle cx="32" cy="60" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
                <circle cx="114" cy="60" r="14" fill="#0F172A" stroke="#CBD5E1" strokeWidth="3" />
              </g>
            ) : null;
          })()}

    </JollamanStageShell>
  );
};
