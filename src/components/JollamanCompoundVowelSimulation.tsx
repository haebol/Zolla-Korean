import React from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playCompoundVowelSfx,
} from '../utils/audio';
import {
  JollamanCharacterSvg,
  JollamanFaceMode,
  ComicImpactBurstSvg,
  DizzyStarOrbitSvg,
  SparkleBurstSvg,
} from './JollamanSprites';
import {
  CompoundVowelKey,
  CompoundSceneBackdrop,
  getCompoundBackdropTheme,
  GirlfriendJollamanSvg,
  FloatingHeartsSvg,
  FrogSvg,
  PondSplashLegsSvg,
  WordBulletStreamSvg,
  BeachLoungeBenchSvg,
  RedCrabSvg,
  HillChickenSvg,
  RollingEggSvg,
  EggImpactSplatSvg,
  EggOnHeadMessSvg,
  AppleTreeSvg,
  RedAppleSvg,
  WhySpeechBubbleSvg,
  SwirlingTornadoSvg,
  UpsideDownGroundLegsSvg,
  TallMonkeyTreeSvg,
  MischievousMonkeySvg,
  YellowBananaSvg,
  SupermanCapeSvg,
  WeddingHallDecorSvg,
  KneelingProposeJollamanSvg,
  GoldenWeddingBellSvg,
  WeddingConfettiSvg,
  MagicRideCloudSvg,
  TeaTableAndChairsSvg,
  SeatedCoffeeJollamanSvg,
} from './JollamanSprites4';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES4_MEANINGS: Record<CompoundVowelKey, string> = {
  'ㅐ': 'Frog',
  'ㅒ': 'Story / Talk',
  'ㅔ': 'Crab',
  'ㅖ': 'Egg',
  'ㅘ': 'Apple',
  'ㅙ': 'Why?',
  'ㅚ': 'Tornado',
  'ㅝ': 'Monkey',
  'ㅞ': 'Wedding',
  'ㅟ': 'Up',
  'ㅢ': 'Chair',
};

export interface CompoundVowelItem {
  char: CompoundVowelKey;
  sound: string;
  triggerWord: string;
  calloutText: string;
  gagSummary: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const COMPOUND_VOWELS: CompoundVowelItem[] = [
  {
    char: 'ㅐ',
    sound: '애',
    triggerWord: '개구리',
    calloutText: '혼자 산책 중 → 연못 풍덩!!',
    gagSummary: '혼자 걷던 졸라맨이 나타난 개구리의 긴 혀에 감겨 연못 한가운데로 풍덩 내동댕이쳐진다!!',
    color: '#16A34A',
    skyX: 75,
    skyY: 64,
  },
  {
    char: 'ㅒ',
    sound: '얘',
    triggerWord: '얘기',
    calloutText: '집에서 여친 등장 → 얘기 기관총!!',
    gagSummary: '집에서 나온 여친이 "얘기" 글자를 기관총처럼 쏘아대자 졸라맨이 귀를 틀어막고 뒤로 밀려나 어지러워한다!!',
    color: '#EC4899',
    skyX: 160,
    skyY: 84,
  },
  {
    char: 'ㅔ',
    sound: '에',
    triggerWord: '게',
    calloutText: '혼자 쉬다 꽃게 습격! 여친 구출!!',
    gagSummary: '해변 벤치에 혼자 쉬던 졸라맨이 꽃게에게 물려가자 여친이 나타나 튜브 스윙 한 방으로 꽃게를 날려버리고 구해준다!!',
    color: '#EF4444',
    skyX: 245,
    skyY: 62,
  },
  {
    char: 'ㅖ',
    sound: '예',
    triggerWord: '계란',
    calloutText: '계란 폭격 쓰러짐 → 여친이 닭 퇴치!!',
    gagSummary: '언덕 아래 있던 졸라맨이 계란 10개 공격에 쓰러지자 언덕 위에 있던 여친이 놀란 표정을 짓더니 닭을 쫓아낸다!!',
    color: '#F59E0B',
    skyX: 330,
    skyY: 84,
  },
  {
    char: 'ㅘ',
    sound: '와',
    triggerWord: '사과',
    calloutText: '양끝 만남 → 빨간 사과 선물 💖',
    gagSummary: '왼쪽 끝에서 온 졸라맨이 사과나무에서 빨간 사과를 따서 오른쪽 끝에서 온 여친에게 선물하자 여친이 행복해한다!!',
    color: '#DC2626',
    skyX: 415,
    skyY: 64,
  },
  {
    char: 'ㅙ',
    sound: '왜',
    triggerWord: '왜',
    calloutText: '여친 눈물 따귀!! 왜?!',
    gagSummary: '여친이 나타나 서럽게 울더니 갑자기 졸라맨 따귀를 짝 때리고 가버려 머리 위에 물음표와 "왜?!"가 뜬다!!',
    color: '#DB2777',
    skyX: 500,
    skyY: 84,
  },
  {
    char: 'ㅚ',
    sound: '외',
    triggerWord: '회오리',
    calloutText: '따귀 직후 거대 회오리 → 머리 푹!!',
    gagSummary: '따귀 맞고 멍해 있던 졸라맨을 거대한 회오리가 빨아들여 빙글빙글 돌린 뒤 하늘에서 떨어뜨려 땅에 머리부터 꽂힌다!!',
    color: '#0EA5E9',
    skyX: 585,
    skyY: 62,
  },
  {
    char: 'ㅝ',
    sound: '워',
    triggerWord: '원숭이',
    calloutText: '바나나 3방 괴롭힘 → 슈퍼 졸라맨 구출!!',
    gagSummary: '나무 위 원숭이가 여친에게 바나나 3개를 던져 괴롭히자 슈퍼맨 망토를 맨 졸라맨이 하늘에서 날아와 원숭이를 날려버리고 여친과 포옹한다!!',
    color: '#0284C7',
    skyX: 670,
    skyY: 84,
  },
  {
    char: 'ㅞ',
    sound: '웨',
    triggerWord: '웨딩',
    calloutText: '꽃·레이스 웨딩식장 → 무릎 꿇고 반지 선물 💍',
    gagSummary: '꽃과 레이스로 꾸며진 웨딩 식장에서 행복한 둘, 졸라맨이 무릎 꿇은 옆모습으로 반짝이는 반지를 선물하며 결혼한다!!',
    color: '#E11D48',
    skyX: 755,
    skyY: 64,
  },
  {
    char: 'ㅟ',
    sound: '위',
    triggerWord: '위',
    calloutText: '결혼식 후 구름 탑승 → 하늘 위로 쭉쭉!!',
    gagSummary: '결혼식을 끝낸 둘 앞에 구름이 다가오자 함께 올라타고, 구름이 위를 향해 쭉쭉 올라가며 하늘을 여행한다!!',
    color: '#0EA5E9',
    skyX: 840,
    skyY: 84,
  },
  {
    char: 'ㅢ',
    sound: '의',
    triggerWord: '의자',
    calloutText: '집 안 티테이블 의자 착석 → 커피 타임 ☕',
    gagSummary: '포근한 집 안으로 들어온 둘이 티테이블 의자에 나란히 앉아 따뜻한 커피를 마시며 행복한 엔딩을 맞는다!!',
    color: '#059669',
    skyX: 925,
    skyY: 64,
  },
];

interface JollamanCompoundVowelSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 320;
const GROUND_Y = 368;

const getActionDuration = (char: CompoundVowelKey): number => {
  if (char === 'ㅖ' || char === 'ㅝ') return 3.0;
  if (char === 'ㅟ') return 2.8;
  if (char === 'ㅔ' || char === 'ㅚ' || char === 'ㅘ' || char === 'ㅞ' || char === 'ㅢ') return 2.6;
  if (char === 'ㅒ' || char === 'ㅙ') return 2.5;
  return 2.3;
};

export const JollamanCompoundVowelSimulation: React.FC<JollamanCompoundVowelSimulationProps> = ({
  audioEnabled = true,
}) => {
  const {
    phase,
    selectedItem: selectedVowel,
    learnedKeys: learnedChars,
    bgmEnabled,
    setBgmEnabled,
    anim,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick: handleVowelClick,
  } = useJollamanStageEngine<CompoundVowelItem, CompoundVowelKey>({
    seriesNum: 4,
    seriesTitle: '4. 졸라복합모음맨 (ㅐ ~ ㅢ)',
    items: COMPOUND_VOWELS,
    audioEnabled,
    bgmTrack: 'latin',
    initialWalkX: 150,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    aftermathAnimMaxDur: 1.15,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.char} · ${item.triggerWord}`,
    getBadge: (item) => item.sound,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) => `${item.sound}, ${item.triggerWord}!`,
    getActionDuration: (item) => getActionDuration(item.char),
    onStartAction: (item, audioOn) => {
      if (!audioOn) return;
      if (
        item.char === 'ㅐ' ||
        item.char === 'ㅔ' ||
        item.char === 'ㅖ' ||
        item.char === 'ㅙ' ||
        item.char === 'ㅚ' ||
        item.char === 'ㅝ' ||
        item.char === 'ㅞ' ||
        item.char === 'ㅟ' ||
        item.char === 'ㅢ'
      ) {
        playCompoundVowelSfx(item.char, 'setup');
      }
    },
    onActionProgress: (item, t, { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }) => {
      const setupTriggerAt: Partial<Record<CompoundVowelKey, number>> = {
        'ㅒ': 0.25,
      };
      const setupAt = setupTriggerAt[item.char];
      if (setupAt !== undefined && t >= setupAt && !secondaryTriggered) {
        markSecondary();
        if (audioOn) {
          playCompoundVowelSfx(item.char, 'setup');
        }
      }

      const impactAt: Record<CompoundVowelKey, number> = {
        'ㅐ': 0.82,
        'ㅒ': 0.85,
        'ㅔ': 0.64,
        'ㅖ': 0.54,
        'ㅘ': 0.76,
        'ㅙ': 0.45,
        'ㅚ': 0.62,
        'ㅝ': 0.70,
        'ㅞ': 0.28,
        'ㅟ': 0.45,
        'ㅢ': 0.58,
      };
      if (t >= impactAt[item.char] && !impactTriggered) {
        markImpact();
        if (audioOn) {
          playCompoundVowelSfx(item.char, 'impact');
          if (item.char === 'ㅒ' || item.char === 'ㅖ' || item.char === 'ㅙ' || item.char === 'ㅚ' || item.char === 'ㅝ') {
            playCartoonImpact();
          }
        }
      }
    },
    onAftermathStart: (item, audioOn) => {
      if (audioOn && (item.char === 'ㅐ' || item.char === 'ㅚ')) {
        playCartoonSplat();
      }
    },
  });

  const activeChar = selectedVowel.char;
  const backdropTheme = getCompoundBackdropTheme(activeChar);

  const isActionWalking =
    phase === 'action' &&
    ((activeChar === 'ㅘ' && (anim.actionT < 0.35 || (anim.actionT >= 0.52 && anim.actionT < 0.78))) ||
      (activeChar === 'ㅢ' && anim.actionT < 0.35));

  const isWalkingMotion = phase === 'walking' || phase === 'approaching' || isActionWalking;
  const walkCycle = anim.walkTime * 9.5;
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;
  let jollaFacing: 1 | -1 =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? activeChar === 'ㅘ'
        ? 1
        : ACTION_SPOT_X >= anim.approachStartX
        ? 1
        : -1
      : 1;

  // Compute Jollaman transform, visibility & face state per scenario
  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaVisible = true;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let customArmSwing = armSwing;
  let showHeadBump = false;

  if (phase === 'walking') {
    jollaFaceMode = 'happy';
  } else if (phase === 'approaching') {
    jollaFaceMode = 'happy';
    if (activeChar === 'ㅘ') {
      jollaX = LEFT_EDGE_X + anim.objectAppear * (ACTION_SPOT_X - LEFT_EDGE_X);
    } else if (activeChar === 'ㅝ') {
      jollaVisible = false; // Superman Jollaman flies in from the sky later!
    } else if (activeChar === 'ㅟ') {
      jollaX = ACTION_SPOT_X - 24;
    } else if (activeChar === 'ㅢ') {
      jollaX = 220 + anim.objectAppear * 75;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㅐ': {
        if (t < 0.45) {
          jollaX = ACTION_SPOT_X;
          jollaFaceMode = t >= 0.25 ? 'panic' : 'happy';
        } else if (t < 0.84) {
          const flyP = (t - 0.45) / 0.39;
          jollaX = ACTION_SPOT_X + flyP * (730 - ACTION_SPOT_X);
          jollaY = GROUND_Y - 52 - Math.sin(flyP * Math.PI) * 175 + flyP * 32;
          jollaRot = flyP * 180;
          jollaFaceMode = 'panic';
        } else {
          jollaVisible = false;
        }
        break;
      }
      case 'ㅒ': {
        if (t < 0.25) {
          jollaX = ACTION_SPOT_X;
          jollaFaceMode = 'happy';
        } else if (t < 0.85) {
          const pushP = (t - 0.25) / 0.6;
          jollaX = ACTION_SPOT_X - pushP * 185 + Math.sin(t * 72) * 3.5;
          jollaY = GROUND_Y - 52;
          jollaRot = -pushP * 16;
          jollaFaceMode = 'headClutch';
        } else {
          const fallP = Math.min((t - 0.85) / 0.12, 1);
          jollaX = ACTION_SPOT_X - 185;
          jollaY = GROUND_Y - 52 + fallP * 38;
          jollaRot = -16 - fallP * 74;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case 'ㅔ': {
        if (t < 0.26) {
          jollaX = 278;
          jollaY = GROUND_Y - 34;
          jollaRot = -86;
          jollaFaceMode = 'happy';
        } else if (t < 0.38) {
          jollaX = 278;
          jollaY = GROUND_Y - 34;
          jollaRot = -60;
          jollaFaceMode = 'panic';
        } else if (t < 0.66) {
          const dragP = (t - 0.38) / 0.28;
          const crabX = 365 + dragP * 155;
          jollaX = crabX - 42;
          jollaY = GROUND_Y - 20;
          jollaRot = -76;
          jollaFaceMode = 'panic';
        } else {
          jollaX = 478;
          jollaY = GROUND_Y - 18;
          jollaRot = -82;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case 'ㅖ': {
        if (t < 0.54) {
          jollaX = ACTION_SPOT_X;
          jollaFaceMode = t >= 0.24 ? 'panic' : 'happy';
        } else if (t < 0.82) {
          const bowlP = (t - 0.54) / 0.28;
          jollaX = ACTION_SPOT_X - bowlP * 145;
          jollaY = GROUND_Y - 52 - Math.sin(bowlP * Math.PI) * 78 + bowlP * 38;
          jollaRot = -bowlP * 270;
          jollaFaceMode = 'panic';
        } else {
          jollaX = ACTION_SPOT_X - 145;
          jollaY = GROUND_Y - 14;
          jollaRot = -90;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case 'ㅘ': {
        // Jollaman from left walks to apple tree -> picks apple -> gifts it to Girlfriend!
        if (t < 0.35) {
          const walkP = t / 0.35;
          jollaX = ACTION_SPOT_X + walkP * 98;
          jollaFaceMode = 'happy';
        } else if (t < 0.52) {
          const reachP = (t - 0.35) / 0.17;
          const hop = Math.sin(reachP * Math.PI) * 24;
          jollaX = ACTION_SPOT_X + 98;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'happy';
        } else if (t < 0.78) {
          const giftWalkP = (t - 0.52) / 0.26;
          jollaX = ACTION_SPOT_X + 98 + giftWalkP * 82;
          jollaFaceMode = 'happy';
        } else {
          jollaX = ACTION_SPOT_X + 180;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case 'ㅙ': {
        if (t < 0.45) {
          jollaX = ACTION_SPOT_X;
          jollaFaceMode = 'panic';
        } else if (t < 0.6) {
          const recoilP = Math.min((t - 0.45) / 0.1, 1);
          jollaX = ACTION_SPOT_X - recoilP * 26;
          jollaRot = -14;
          jollaFaceMode = 'panic';
        } else {
          jollaX = ACTION_SPOT_X - 26;
          jollaRot = 0;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case 'ㅚ': {
        // Right after slap, giant tornado sucks Jollaman spinning up sky-high -> head-first into ground!
        if (t < 0.16) {
          jollaX = ACTION_SPOT_X;
          jollaFaceMode = 'panic';
        } else if (t < 0.48) {
          const spinP = (t - 0.16) / 0.32;
          jollaX = ACTION_SPOT_X + spinP * 110 + Math.sin(t * 42) * 26;
          jollaY = GROUND_Y - 52 - spinP * 215;
          jollaRot = spinP * 1080;
          jollaFaceMode = 'panic';
        } else if (t < 0.62) {
          const arcP = (t - 0.48) / 0.14;
          jollaX = ACTION_SPOT_X + 110 + arcP * 75;
          jollaY = GROUND_Y - 267 - Math.sin(arcP * Math.PI) * 55;
          jollaRot = 1080 + arcP * 360;
          jollaFaceMode = 'panic';
        } else if (t < 0.84) {
          const dropP = (t - 0.62) / 0.22;
          jollaX = ACTION_SPOT_X + 185;
          jollaY = GROUND_Y - 267 + dropP * dropP * 255;
          jollaRot = 180;
          jollaFaceMode = 'panic';
        } else {
          jollaVisible = false; // Planted head-first inside UpsideDownGroundLegsSvg!
        }
        break;
      }
      case 'ㅝ': {
        // Monkey throws 3 bananas -> Superman Jollaman flies down from sky, blasts monkey away, swoops down & hugs Girlfriend!
        if (t < 0.48) {
          jollaVisible = false;
        } else if (t < 0.72) {
          const flyP = (t - 0.48) / 0.24;
          jollaVisible = true;
          jollaX = 90 + flyP * 500;
          jollaY = 48 + flyP * (GROUND_Y - 160 - 48);
          jollaRot = 68;
          customArmSwing = -28;
          jollaFaceMode = 'happy';
        } else if (t < 0.85) {
          const swoopP = (t - 0.72) / 0.13;
          jollaVisible = true;
          jollaX = 590 - swoopP * (590 - 356);
          jollaY = GROUND_Y - 160 + swoopP * (GROUND_Y - 52 - (GROUND_Y - 160));
          jollaRot = 68 * (1 - swoopP);
          jollaFacing = -1;
          jollaFaceMode = 'happy';
        } else {
          jollaVisible = true;
          jollaX = 356;
          jollaY = GROUND_Y - 52;
          jollaRot = 0;
          jollaFacing = -1;
          customArmSwing = 26;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case 'ㅞ': {
        // Happy couple from start -> Jollaman kneels in side-profile proposing with sparkling ring!
        if (t < 0.28) {
          jollaVisible = true;
          jollaX = ACTION_SPOT_X;
          jollaFaceMode = 'happy';
        } else {
          jollaVisible = false; // Crisp side-profile KneelingProposeJollamanSvg takes over!
        }
        break;
      }
      case 'ㅟ': {
        // Moving cloud arrives -> couple hops onto cloud -> cloud soars past vowel orbs high into the sky!
        if (t < 0.30) {
          jollaX = ACTION_SPOT_X - 24;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else if (t < 0.45) {
          const hopP = (t - 0.30) / 0.15;
          const hopArc = Math.sin(hopP * Math.PI) * 38;
          jollaX = ACTION_SPOT_X - 24 + hopP * (299 - (ACTION_SPOT_X - 24));
          jollaY = GROUND_Y - 52 - hopArc - hopP * 14;
          jollaFaceMode = 'happy';
        } else {
          const riseP = (t - 0.45) / 0.55;
          const cloudX = 323 + riseP * 97;
          const cloudY = GROUND_Y - 20 - riseP * (GROUND_Y - 20 - -125);
          jollaX = cloudX - 24;
          jollaY = cloudY - 46;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case 'ㅢ': {
        // Indoor tea table: walk to left chair -> sit down side-by-side -> sip steaming coffee!
        if (t < 0.35) {
          const walkP = t / 0.35;
          jollaX = 295 + walkP * 30;
          jollaY = GROUND_Y - 52 - bounceY;
          jollaFaceMode = 'happy';
        } else if (t < 0.58) {
          const sitP = (t - 0.35) / 0.23;
          jollaX = 325;
          jollaY = GROUND_Y - 52 + sitP * 16;
          jollaScaleY = 1 - sitP * 0.14;
          jollaFaceMode = 'happy';
        } else {
          jollaVisible = false; // SeatedCoffeeJollamanSvg sits on left chair sipping coffee!
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㅐ':
      case 'ㅚ':
      case 'ㅞ':
      case 'ㅢ':
        jollaVisible = false;
        break;
      case 'ㅒ':
        jollaX = ACTION_SPOT_X - 185;
        jollaY = GROUND_Y - 14;
        jollaRot = -90;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㅔ':
        jollaX = 478;
        jollaY = GROUND_Y - 18;
        jollaRot = -82;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㅖ':
        jollaX = ACTION_SPOT_X - 145;
        jollaY = GROUND_Y - 14;
        jollaRot = -90;
        jollaFaceMode = 'dizzy';
        break;
      case 'ㅘ':
        jollaX = ACTION_SPOT_X + 180;
        jollaY = GROUND_Y - 52;
        jollaRot = 0;
        jollaFaceMode = 'happy';
        break;
      case 'ㅙ':
        jollaX = ACTION_SPOT_X - 26;
        jollaY = GROUND_Y - 52;
        jollaRot = 0;
        jollaFaceMode = 'panic';
        break;
      case 'ㅝ':
        jollaX = 356;
        jollaY = GROUND_Y - 52;
        jollaRot = 0;
        jollaFacing = -1;
        customArmSwing = 26;
        jollaFaceMode = 'happy';
        break;
      case 'ㅟ': {
        const floatY = -125 + Math.sin(anim.walkTime * 2.5) * 8;
        jollaX = 420 - 24;
        jollaY = floatY - 46;
        jollaRot = 0;
        jollaFaceMode = 'happy';
        break;
      }
    }
  }

  let cameraViewBox = shorts.computeViewBox(jollaX, jollaY);
  if (activeChar === 'ㅟ' && phase !== 'walking' && jollaY < 170) {
    const parts = cameraViewBox.split(' ').map(Number);
    if (parts.length === 4 && parts.every((n) => !Number.isNaN(n))) {
      const [vx, vy, vw, vh] = parts;
      const climbVy = Math.min(vy, Math.max(-380, jollaY - vh * 0.34));
      cameraViewBox = `${vx} ${climbVy.toFixed(1)} ${vw} ${vh}`;
    }
  }

  return (
    <JollamanStageShell
      icon="✨"
      title="4. 졸라복합모음맨 (ㅐ ~ ㅢ)"
      accentButtonClass="bg-emerald-600 hover:bg-emerald-700"
      stageBgClass="bg-sky-100"
      ariaLabel="졸라맨 4 복합 모음 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'latin',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((prev) => !prev),
        activeClass: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-100',
        activeLabel: '🎵 힐링 BGM',
        title: '오래 듣기 편한 힐링 로파이 배경음악 켜기/끄기',
      }}
      items={COMPOUND_VOWELS}
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
      walkingHint="하늘의 복합 모음 (ㅐ ~ ㅢ)을 눌러보세요!"
      activeCaption={`${selectedVowel.char} · ${selectedVowel.sound} · ${selectedVowel.triggerWord} (${selectedVowel.calloutText})`}
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
      revealSubtitle={tRevealSubtitle(4, selectedVowel.char, selectedVowel.gagSummary)}
      flashcard={(() => {
        const word = selectedVowel.triggerWord;
        const highlightIdx = selectedVowel.char === 'ㅘ' ? 1 : 0;
        return {
          glyph: selectedVowel.char,
          subLabel: `[${romanizeKorean(selectedVowel.char)}]`,
          accentColor: selectedVowel.color,
          headlineNode: (
            <>
              {word.split('').map((ch, idx) => (
                <span key={idx} style={idx === highlightIdx ? { color: selectedVowel.color } : undefined}>
                  {ch}
                </span>
              ))}
            </>
          ),
          headlineCharLen: word.length,
          meaning: tWordMeaning(4, selectedVowel.char, SERIES4_MEANINGS[selectedVowel.char]),
          romanization: romanizeKorean(word),
          cornerIcon: getSeriesCornerIcon(4, selectedVowel.char, anim.walkTime),
        };
      })()}
      backdropSlot={
        <CompoundSceneBackdrop theme={backdropTheme} walkTime={anim.walkTime} activeChar={activeChar} />
      }
    >
      {/* 4. SCENARIO PROPS & GIRLFRIEND CO-STAR */}
      {phase !== 'walking' && (
        <g>
          {/* ㅐ: Jollaman walking alone -> Frog shoots sticky tongue -> slams Jollaman into pond! */}
          {activeChar === 'ㅐ' && (() => {
            const fx = phase === 'approaching' ? 680 - anim.objectAppear * 135 : 545;
            const fy = 338;
            const mouthOpen = phase === 'action' && anim.actionT >= 0.15 && anim.actionT < 0.84;
            const inPond =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && anim.actionT >= 0.84);

            let showTongue = false;
            let tongueEndX = jollaX;
            let tongueEndY = jollaY;
            if (phase === 'action') {
              const t = anim.actionT;
              if (t >= 0.25 && t < 0.45) {
                const shootP = (t - 0.25) / 0.2;
                showTongue = true;
                tongueEndX = fx - 12 + (ACTION_SPOT_X - (fx - 12)) * shootP;
                tongueEndY = fy + 2 + (GROUND_Y - 52 - (fy + 2)) * shootP;
              } else if (t >= 0.45 && t < 0.78) {
                showTongue = true;
                tongueEndX = jollaX;
                tongueEndY = jollaY;
              }
            }

            return (
              <g>
                {showTongue && (
                  <g>
                    <line
                      x1={fx - 14}
                      y1={fy + 2}
                      x2={tongueEndX}
                      y2={tongueEndY}
                      stroke="#F472B6"
                      strokeWidth="8"
                      strokeLinecap="round"
                    />
                    <circle cx={tongueEndX} cy={tongueEndY} r="9" fill="#EC4899" stroke="#BE185D" strokeWidth="2" />
                  </g>
                )}
                <g transform={`translate(${fx}, ${fy}) scale(0.95)`}>
                  <FrogSvg mouthOpen={mouthOpen} facing={-1} />
                </g>
                {inPond && (
                  <PondSplashLegsSvg
                    walkTime={anim.walkTime}
                    activeSplash={phase === 'action'}
                  />
                )}
                {inPond && (
                  <g>
                    <text x={730} y={258} textAnchor="middle" fontSize="22" fontWeight="900" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      풍덩!!
                    </text>
                    <text x={730} y={274} textAnchor="middle" fontSize="12" fontWeight="800" fill="#0369A1" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Splash!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅒ: Girlfriend exits the house doorway & machine-guns '얘기' word bullets! */}
          {activeChar === 'ㅒ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const girlX =
              phase === 'approaching'
                ? 564 - anim.objectAppear * 44
                : phase === 'action' && t < 0.25
                ? 520 - (t / 0.25) * 52
                : 468;
            const shooting = phase === 'action' && t >= 0.25 && t < 0.85;
            const walkingOut = phase === 'approaching' || (phase === 'action' && t < 0.25);
            const showBubble = phase !== 'aftermath' && phase !== 'reveal';

            return (
              <g>
                <g transform={`translate(${girlX}, ${GROUND_Y - 52})`}>
                  <GirlfriendJollamanSvg
                    walkTime={anim.walkTime}
                    pose={shooting ? 'chatter' : walkingOut ? 'walking' : 'dating'}
                    facing={-1}
                    showBubble={showBubble ? '얘기!' : undefined}
                    showBubbleSub={showBubble ? 'Talk!' : undefined}
                  />
                  <WordBulletStreamSvg walkTime={anim.walkTime} active={shooting} />
                </g>
                {shooting && (
                  <g>
                    <text x={girlX - 95} y={GROUND_Y - 122} textAnchor="middle" fontSize="20" fontWeight="900" fill="#EC4899" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      타타타타탁!!
                    </text>
                    <text x={girlX - 95} y={GROUND_Y - 107} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#BE185D" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Rat-a-tat-tat!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅔ: Jollaman resting alone on beach lounge bench -> Red Crab grabs him -> Girlfriend runs in & launches crab! */}
          {activeChar === 'ㅔ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const benchX = 310;

            let girlVisible = false;
            let girlX = 75;
            const girlY = GROUND_Y - 52;
            let girlPose: 'walking' | 'tubeSwing' = 'walking';

            if (phase === 'action') {
              if (t >= 0.42 && t < 0.54) {
                girlVisible = true;
                const runP = (t - 0.42) / 0.12;
                girlX = 75 + runP * 145;
                girlPose = 'tubeSwing';
              } else if (t >= 0.54 && t < 0.66) {
                girlVisible = true;
                const dashP = (t - 0.54) / 0.12;
                girlX = 220 + dashP * 200;
                girlPose = 'tubeSwing';
              } else if (t >= 0.66) {
                girlVisible = true;
                girlX = 395;
                girlPose = 'tubeSwing';
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              girlVisible = true;
              girlX = 395;
              girlPose = 'tubeSwing';
            }

            let crabX = 630;
            let crabY = GROUND_Y - 26;
            let crabRot = 0;
            let crabScale = 1;
            let grabbing = false;
            let crabVisible = true;

            if (phase === 'approaching') {
              crabX = 780 - anim.objectAppear * 180;
            } else if (phase === 'action') {
              if (t < 0.38) {
                crabX = 600 - (t / 0.38) * 235;
              } else if (t < 0.66) {
                const dragP = (t - 0.38) / 0.28;
                crabX = 365 + dragP * 155;
                grabbing = true;
              } else {
                const flyP = (t - 0.66) / 0.34;
                crabX = 520 + flyP * 440;
                crabY = GROUND_Y - 26 - flyP * 320;
                crabRot = flyP * 920;
                crabScale = Math.max(0.15, 1 - flyP * 0.85);
                if (flyP > 0.96) crabVisible = false;
              }
            } else {
              crabVisible = false;
            }

            return (
              <g>
                <g transform={`translate(${benchX}, ${GROUND_Y - 12})`}>
                  <BeachLoungeBenchSvg />
                </g>

                {girlVisible && (
                  <g transform={`translate(${girlX}, ${girlY})`}>
                    <GirlfriendJollamanSvg
                      walkTime={anim.walkTime}
                      pose={girlPose}
                      facing={1}
                    />
                  </g>
                )}

                {crabVisible && (
                  <g transform={`translate(${crabX}, ${crabY}) rotate(${crabRot}) scale(${crabScale})`}>
                    <RedCrabSvg walkTime={anim.walkTime} grabbing={grabbing} />
                  </g>
                )}

                {phase === 'action' && t >= 0.38 && t < 0.66 && (
                  <g>
                    <text x={crabX - 18} y={GROUND_Y - 84} textAnchor="middle" fontSize="22" fontWeight="900" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      찝!! 살려줘!
                    </text>
                    <text x={crabX - 18} y={GROUND_Y - 68} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#991B1B" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Pinch!! Help!
                    </text>
                  </g>
                )}
                {phase === 'action' && t >= 0.66 && t < 0.9 && (
                  <g transform="translate(520, 274)">
                    <ComicImpactBurstSvg scale={0.78} />
                  </g>
                )}
                {(phase === 'aftermath' || phase === 'reveal') && (
                  <g transform="translate(875, 76) scale(0.36)">
                    <SparkleBurstSvg color="#FACC15" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅖ: Jollaman below hill hit & splattered by 10 shattering eggs -> Girlfriend shocked, angry scolding chicken, then chases it off right! */}
          {activeChar === 'ㅖ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const hillX = 760;
            const hillY = GROUND_Y - 124; // 244
            const laying = phase === 'action' && t < 0.44;
            const knocked = phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && t >= 0.54);

            const shocked = phase === 'action' && t >= 0.44 && t < 0.59;
            const scolding = phase === 'action' && t >= 0.59 && t < 0.74;
            const chasing = phase === 'action' && t >= 0.74;

            const chaseP = chasing ? Math.min((t - 0.74) / 0.24, 1) : 0;
            const girlX = chasing ? 838 + chaseP * 270 : scolding ? 838 : 854;
            const girlPose = chasing ? 'angryChase' : scolding ? 'angry' : shocked ? 'shock' : 'happy';
            const girlFacing: 1 | -1 = chasing ? 1 : -1;
            const hideGirlfriend = phase === 'aftermath' || phase === 'reveal' || girlX >= 1045;

            const chickenFleeP = chaseP;
            const chickenOffsetX = chasing ? chickenFleeP * 320 : 0;
            const chickenOffsetY = chasing
              ? -chickenFleeP * 36 - Math.abs(Math.sin(anim.walkTime * 24)) * 18
              : 0;
            const hideChicken = phase === 'aftermath' || phase === 'reveal' || (chasing && chickenFleeP >= 0.96);

            const eggIndices = Array.from({ length: 10 }, (_, idx) => idx);

            return (
              <g>
                <g transform={`translate(${hillX}, ${hillY})`}>
                  <HillChickenSvg
                    laying={laying}
                    walkTime={anim.walkTime}
                    chickenOffsetX={chickenOffsetX}
                    chickenOffsetY={chickenOffsetY}
                    chickenFacingRight={chasing}
                    hideChicken={hideChicken}
                  />
                </g>

                {laying && (
                  <g>
                    <text x={hillX + 16} y={hillY - 40} textAnchor="middle" fontSize="20" fontWeight="900" fill="#B45309" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      꼬꼬댁!!
                    </text>
                    <text x={hillX + 16} y={hillY - 25} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#92400E" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Cluck!!
                    </text>
                  </g>
                )}

                {phase !== 'approaching' &&
                  eggIndices.map((idx) => {
                    const startT = idx * 0.04;
                    const localP =
                      phase === 'action'
                        ? Math.max(0, (t - startT) / 0.54)
                        : 1 + idx * 0.06;
                    if (localP <= 0) return null;
                    const targetX = ACTION_SPOT_X - idx * 14;
                    const impactP = (706 - targetX) / 540;

                    if (localP < impactP) {
                      const ex = 706 - localP * 540;
                      const hillDropP = Math.min(localP / 0.24, 1);
                      const ey = 266 + hillDropP * (GROUND_Y - 18 - 266);
                      return (
                        <g key={idx} transform={`translate(${ex}, ${ey})`}>
                          <RollingEggSvg rotDeg={-localP * 960 - idx * 30} scale={0.88} />
                        </g>
                      );
                    }

                    const hitAge = phase === 'action' ? localP - impactP : 0.6;
                    return (
                      <g key={idx} transform={`translate(${targetX}, ${GROUND_Y - 16}) scale(${0.86 + (idx % 2) * 0.1})`}>
                        <EggImpactSplatSvg age={hitAge} seed={idx} />
                      </g>
                    );
                  })}

                {/* Girlfriend on hilltop: shocked -> angry scolding chicken -> chasing chicken off right! */}
                {!hideGirlfriend && (
                  <g transform={`translate(${girlX}, ${hillY - 24})`}>
                    <GirlfriendJollamanSvg walkTime={anim.walkTime} pose={girlPose} facing={girlFacing} />
                  </g>
                )}
                {shocked && (
                  <g>
                    <text x={854} y={hillY - 96} textAnchor="middle" fontSize="22" fontWeight="900" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      헉!! 오빠!!
                    </text>
                    <text x={854} y={hillY - 81} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Gasp!! Honey!!
                    </text>
                  </g>
                )}
                {chasing && girlX < 1020 && (
                  <g>
                    <text x={girlX} y={hillY - 96} textAnchor="middle" fontSize="20" fontWeight="900" fill="#EC4899" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      저리 가!!
                    </text>
                    <text x={girlX} y={hillY - 81} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#BE185D" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Get away!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅘ: Girlfriend enters from right, Jollaman enters from left -> picks apple from tree & gifts it -> Girlfriend happy! */}
          {activeChar === 'ㅘ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const treeX = 465;
            const applePicked =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && t >= 0.44);

            let girlX = 670;
            let girlPose: 'walking' | 'dating' = 'walking';
            if (phase === 'approaching') {
              girlX = 895 - anim.objectAppear * 225;
              girlPose = 'walking';
            } else if (phase === 'action') {
              if (t < 0.35) {
                girlX = 670 - (t / 0.35) * 115;
                girlPose = 'walking';
              } else {
                girlX = 555;
                girlPose = 'dating';
              }
            } else {
              girlX = 555;
              girlPose = 'dating';
            }

            const gifted =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && t >= 0.78);

            return (
              <g>
                <g transform={`translate(${treeX}, ${GROUND_Y - 112})`}>
                  <AppleTreeSvg shakeAngle={0} dropProgress={applePicked ? 1 : 0} />
                </g>

                <g transform={`translate(${girlX}, ${GROUND_Y - 52})`}>
                  <GirlfriendJollamanSvg
                    walkTime={anim.walkTime}
                    pose={girlPose}
                    facing={-1}
                  />
                </g>

                {applePicked && !gifted && (
                  <g transform={`translate(${jollaX + 20}, ${jollaY - 14})`}>
                    <RedAppleSvg scale={0.95} />
                  </g>
                )}

                {gifted && (
                  <>
                    <g transform={`translate(${ACTION_SPOT_X + 208}, ${GROUND_Y - 64})`}>
                      <RedAppleSvg scale={1} />
                    </g>
                    <g transform={`translate(${ACTION_SPOT_X + 208}, ${GROUND_Y - 114})`}>
                      <FloatingHeartsSvg walkTime={anim.walkTime} big={false} />
                    </g>
                    <text x={540} y={GROUND_Y - 126} textAnchor="middle" fontSize="22" fontWeight="900" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      사과 선물 💖 고마워!
                    </text>
                    <text x={540} y={GROUND_Y - 110} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#991B1B" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Apple Gift 💖 Thank you!
                    </text>
                  </>
                )}
              </g>
            );
          })()}

          {/* ㅙ: Girlfriend cries -> SLAPS Jollaman -> leaves! Big "?" & "왜?!" comic speech bubble! */}
          {activeChar === 'ㅙ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            let girlX = ACTION_SPOT_X + 82;
            let girlPose: 'crying' | 'slap' | 'walking' = 'crying';
            let girlFacing: 1 | -1 = -1;

            if (phase === 'approaching') {
              girlX = ACTION_SPOT_X + 200 - anim.objectAppear * 118;
              girlPose = 'crying';
            } else if (phase === 'action') {
              if (t < 0.45) {
                girlX = ACTION_SPOT_X + 82;
                girlPose = 'crying';
              } else if (t < 0.62) {
                girlX = ACTION_SPOT_X + 54;
                girlPose = 'slap';
              } else {
                const walkAwayP = (t - 0.62) / 0.38;
                girlX = ACTION_SPOT_X + 54 + walkAwayP * 620;
                girlPose = 'walking';
                girlFacing = 1;
              }
            } else {
              girlX = 1100;
            }

            const slapped = phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && t >= 0.45);
            const showWhyBubble = phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && t >= 0.6);

            return (
              <g>
                {girlX < 1040 && (
                  <g transform={`translate(${girlX}, ${GROUND_Y - 52})`}>
                    <GirlfriendJollamanSvg
                      walkTime={anim.walkTime}
                      pose={girlPose}
                      facing={girlFacing}
                    />
                  </g>
                )}

                {phase === 'action' && t >= 0.45 && t < 0.64 && (
                  <g>
                    <g transform={`translate(${ACTION_SPOT_X + 12}, ${GROUND_Y - 68})`}>
                      <ComicImpactBurstSvg scale={0.72} />
                    </g>
                    <text x={ACTION_SPOT_X + 12} y={GROUND_Y - 106} textAnchor="middle" fontSize="26" fontWeight="900" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      짝!!
                    </text>
                    <text x={ACTION_SPOT_X + 12} y={GROUND_Y - 90} textAnchor="middle" fontSize="12" fontWeight="800" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Slap!!
                    </text>
                  </g>
                )}

                {slapped && (
                  <ellipse cx={jollaX + 8} cy={jollaY - 31} rx="6" ry="4" fill="#EF4444" opacity="0.75" />
                )}

                {showWhyBubble && (
                  <g>
                    <text
                      x={jollaX}
                      y={jollaY - 68 + Math.sin(anim.walkTime * 6) * 4}
                      textAnchor="middle"
                      fontSize="30"
                      fontWeight="900"
                      fill="#DB2777"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      style={{ paintOrder: 'stroke fill' }}
                    >
                      ?
                    </text>
                    <g transform={`translate(${jollaX + 110}, ${jollaY - 68})`}>
                      <WhySpeechBubbleSvg />
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅚ: Right after slap, giant line-art tornado sweeps dazed Jollaman sky-high -> planted head-first! */}
          {activeChar === 'ㅚ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            let tornadoX = 640;
            let tornadoVisible = true;
            if (phase === 'approaching') {
              tornadoX = 880 - anim.objectAppear * 240;
            } else if (phase === 'action') {
              if (t < 0.16) {
                tornadoX = 640 - (t / 0.16) * 320;
              } else if (t < 0.48) {
                const moveP = (t - 0.16) / 0.32;
                tornadoX = ACTION_SPOT_X + moveP * 110;
              } else if (t < 0.72) {
                const exitP = (t - 0.48) / 0.24;
                tornadoX = ACTION_SPOT_X + 110 + exitP * 560;
              } else {
                tornadoVisible = false;
              }
            } else {
              tornadoVisible = false;
            }

            const planted =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && t >= 0.84);

            return (
              <g>
                {phase === 'action' && t < 0.16 && (
                  <g>
                    <DizzyStarOrbitSvg walkTime={anim.walkTime} cx={ACTION_SPOT_X} cy={GROUND_Y - 106} />
                    <text x={ACTION_SPOT_X} y={GROUND_Y - 122} textAnchor="middle" fontSize="24" fontWeight="900" fill="#DB2777" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      ?!
                    </text>
                  </g>
                )}
                {tornadoVisible && (
                  <g transform={`translate(${tornadoX}, ${GROUND_Y - 4})`}>
                    <SwirlingTornadoSvg walkTime={anim.walkTime} scale={1.15} />
                  </g>
                )}
                {planted && (
                  <g transform={`translate(${ACTION_SPOT_X + 185}, ${GROUND_Y - 2})`}>
                    <UpsideDownGroundLegsSvg walkTime={anim.walkTime} />
                    <text x="0" y="-72" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      푹!!
                    </text>
                    <text x="0" y="-57" textAnchor="middle" fontSize="12" fontWeight="800" fill="#0369A1" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Thud!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅝ: Monkey throws 3 bananas at Girlfriend -> Superman Jollaman blasts monkey away & hugs happy Girlfriend! */}
          {activeChar === 'ㅝ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const treeX = 610;
            const monkeyBaseY = GROUND_Y - 160;
            const girlHit = phase === 'action' && ((t >= 0.16 && t < 0.22) || (t >= 0.30 && t < 0.36) || (t >= 0.44 && t < 0.52));
            const hugging = phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && t >= 0.85);
            const monkeyHit = phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && t >= 0.70);

            let monkeyX = treeX - 8;
            let monkeyY = monkeyBaseY;
            let monkeyRot = 0;
            let monkeyVisible = true;
            if (phase === 'action' && t >= 0.70) {
              const flyP = (t - 0.70) / 0.30;
              monkeyX = treeX - 8 + flyP * 460;
              monkeyY = monkeyBaseY - flyP * 260;
              monkeyRot = flyP * 900;
              if (flyP > 0.96) monkeyVisible = false;
            } else if (phase === 'aftermath' || phase === 'reveal') {
              monkeyVisible = false;
            }

            const bananas = [
              { start: 0.06, end: 0.18 },
              { start: 0.20, end: 0.32 },
              { start: 0.34, end: 0.46 },
            ];

            const girlPose = hugging ? 'hug' : girlHit || (phase === 'action' && t < 0.68) ? 'shock' : 'dating';

            return (
              <g>
                <g transform={`translate(${treeX}, ${GROUND_Y - 118})`}>
                  <TallMonkeyTreeSvg />
                </g>

                {monkeyVisible && (
                  <g transform={`translate(${monkeyX}, ${monkeyY}) rotate(${monkeyRot})`}>
                    <MischievousMonkeySvg
                      walkTime={anim.walkTime}
                      throwing={phase === 'action' && t < 0.50}
                      panicking={monkeyHit}
                    />
                  </g>
                )}

                {phase === 'action' &&
                  bananas.map((b, idx) => {
                    if (t < b.start || t > b.end + 0.06) return null;
                    const p = Math.min((t - b.start) / (b.end - b.start), 1);
                    const bx = (treeX - 24) + p * (330 - (treeX - 24));
                    const by = monkeyBaseY + p * (GROUND_Y - 82 - monkeyBaseY) - Math.sin(p * Math.PI) * 58;
                    return (
                      <g key={idx} transform={`translate(${bx}, ${by})`}>
                        <YellowBananaSvg rotDeg={p * 540} scale={1.05} />
                      </g>
                    );
                  })}

                <g transform={`translate(328, ${GROUND_Y - 52})`}>
                  <GirlfriendJollamanSvg walkTime={anim.walkTime} pose={girlPose} facing={1} />
                </g>

                {phase === 'action' && t >= 0.68 && t < 0.90 && (
                  <g>
                    <g transform={`translate(${treeX - 10}, ${monkeyBaseY})`}>
                      <ComicImpactBurstSvg scale={0.9} />
                    </g>
                    <text x={treeX - 10} y={monkeyBaseY - 48} textAnchor="middle" fontSize="24" fontWeight="900" fill="#EF4444" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      슈퍼 펀치!!
                    </text>
                    <text x={treeX - 10} y={monkeyBaseY - 32} textAnchor="middle" fontSize="12" fontWeight="800" fill="#B91C1C" stroke="#FFFFFF" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      Super Punch!!
                    </text>
                  </g>
                )}

                {hugging && (
                  <g transform={`translate(342, ${GROUND_Y - 124})`}>
                    <FloatingHeartsSvg walkTime={anim.walkTime} big={true} />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅞ: Floral & Lace Wedding Hall -> Happy couple from start -> Side-profile kneeling ring proposal! */}
          {activeChar === 'ㅞ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const girlX = 394;
            const kneeling =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && t >= 0.28);

            return (
              <g>
                {/* Wedding Hall Arch, Flowers & Lace Swags */}
                <g transform={`translate(${ACTION_SPOT_X + 40}, ${GROUND_Y - 46})`}>
                  <WeddingHallDecorSvg />
                </g>

                {/* Golden Wedding Bell tucked neatly below sky vowel orbs */}
                <g transform={`translate(${ACTION_SPOT_X + 40}, 204)`}>
                  <GoldenWeddingBellSvg walkTime={anim.walkTime} />
                </g>

                {/* Festive Wedding Confetti */}
                <g transform={`translate(${ACTION_SPOT_X + 40}, 265)`}>
                  <WeddingConfettiSvg walkTime={anim.walkTime} />
                </g>

                {/* Happy Bride with Soft Bridal Veil */}
                <g transform={`translate(${girlX}, ${GROUND_Y - 52})`}>
                  <GirlfriendJollamanSvg
                    walkTime={anim.walkTime}
                    pose="dating"
                    facing={-1}
                    bridalVeil={true}
                  />
                </g>

                {/* Side-Profile Kneeling Jollaman Offering Ring */}
                {kneeling && (
                  <g
                    transform={`translate(${ACTION_SPOT_X + 12}, ${GROUND_Y - 48})`}
                    onClick={toggleJollaPause}
                    className="cursor-pointer"
                  >
                    <KneelingProposeJollamanSvg />
                  </g>
                )}

                {/* Romantic Wedding Hearts */}
                <g transform={`translate(${ACTION_SPOT_X + 40}, ${GROUND_Y - 128})`}>
                  <FloatingHeartsSvg walkTime={anim.walkTime} big={kneeling} />
                </g>
              </g>
            );
          })()}

          {/* ㅟ: Post-wedding couple boards moving cloud -> rises straight up into the sky ("위") */}
          {activeChar === 'ㅟ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            let cloudX = 500;
            let cloudY = GROUND_Y - 20;
            let rising = false;

            if (phase === 'approaching') {
              cloudX = 740 - anim.objectAppear * 240;
              cloudY = 175 + anim.objectAppear * (GROUND_Y - 20 - 175);
            } else if (phase === 'action') {
              if (t < 0.30) {
                cloudX = 500 - (t / 0.30) * 177;
                cloudY = GROUND_Y - 20;
              } else if (t < 0.45) {
                cloudX = 323;
                cloudY = GROUND_Y - 20;
              } else {
                const riseP = (t - 0.45) / 0.55;
                cloudX = 323 + riseP * 97;
                cloudY = GROUND_Y - 20 - riseP * (GROUND_Y - 20 - -125);
                rising = true;
              }
            } else {
              cloudX = 420;
              cloudY = -125 + Math.sin(anim.walkTime * 2.5) * 8;
              rising = true;
            }

            let girlX = ACTION_SPOT_X + 30;
            let girlY = GROUND_Y - 52;
            let girlPose: 'dating' | 'jump' = 'dating';
            if (phase === 'action') {
              if (t >= 0.30 && t < 0.45) {
                const hopP = (t - 0.30) / 0.15;
                const hopArc = Math.sin(hopP * Math.PI) * 38;
                girlX = ACTION_SPOT_X + 30 + hopP * (347 - (ACTION_SPOT_X + 30));
                girlY = GROUND_Y - 52 - hopArc - hopP * 14;
                girlPose = 'jump';
              } else if (t >= 0.45) {
                girlX = cloudX + 24;
                girlY = cloudY - 46;
                girlPose = 'dating';
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              girlX = cloudX + 24;
              girlY = cloudY - 46;
              girlPose = 'dating';
            }

            const upArrowBob = Math.sin(anim.walkTime * 7) * 8;

            return (
              <g>
                <g transform={`translate(${cloudX}, ${cloudY})`}>
                  <MagicRideCloudSvg walkTime={anim.walkTime} rising={rising} />
                </g>

                {rising && (
                  <g>
                    {[-96, 96].map((dx) => (
                      <g key={dx} transform={`translate(${cloudX + dx}, ${cloudY - 24 + upArrowBob})`}>
                        <line x1="0" y1="26" x2="0" y2="-16" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
                        <polyline points="-14,0 0,-18 14,0" fill="none" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" />
                        <line x1="0" y1="26" x2="0" y2="-16" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" />
                        <polyline points="-14,0 0,-18 14,0" fill="none" stroke="#0284C7" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
                      </g>
                    ))}
                  </g>
                )}

                <g transform={`translate(${girlX}, ${girlY})`}>
                  <GirlfriendJollamanSvg
                    walkTime={anim.walkTime}
                    pose={girlPose}
                    facing={-1}
                    bridalVeil={true}
                  />
                </g>

                {rising && (
                  <g transform={`translate(${cloudX}, ${cloudY - 108})`}>
                    <FloatingHeartsSvg walkTime={anim.walkTime} big={false} />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅢ: Cozy indoor pink house -> both sit side-by-side at tea-table chairs drinking steaming coffee! */}
          {activeChar === 'ㅢ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const tableX = 385;
            const tableY = GROUND_Y - 26;
            const seatedCoffee =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && t >= 0.58);

            let girlX = 495;
            let girlY = GROUND_Y - 52;
            let girlPose: 'walking' | 'dating' | 'sitCoffee' = 'walking';
            if (phase === 'approaching') {
              girlX = 535 - anim.objectAppear * 40;
              girlPose = 'walking';
            } else if (phase === 'action') {
              if (t < 0.35) {
                girlX = 495 - (t / 0.35) * 50;
                girlPose = 'walking';
              } else if (t < 0.58) {
                const sitP = (t - 0.35) / 0.23;
                girlX = 445;
                girlY = GROUND_Y - 52 + sitP * 16;
                girlPose = 'dating';
              } else {
                girlX = 444;
                girlY = GROUND_Y - 36;
                girlPose = 'sitCoffee';
              }
            } else {
              girlX = 444;
              girlY = GROUND_Y - 36;
              girlPose = 'sitCoffee';
            }

            return (
              <g>
                <g transform={`translate(${tableX}, ${tableY})`}>
                  <TeaTableAndChairsSvg showTableCups={!seatedCoffee} />
                </g>

                {seatedCoffee && (
                  <g
                    transform={`translate(326, ${GROUND_Y - 36})`}
                    onClick={toggleJollaPause}
                    className="cursor-pointer"
                  >
                    <SeatedCoffeeJollamanSvg walkTime={anim.walkTime} />
                  </g>
                )}

                <g transform={`translate(${girlX}, ${girlY})`}>
                  <GirlfriendJollamanSvg
                    walkTime={anim.walkTime}
                    pose={girlPose}
                    facing={-1}
                  />
                </g>

                {seatedCoffee && (
                  <>
                    <g transform={`translate(${tableX}, ${GROUND_Y - 122})`}>
                      <FloatingHeartsSvg walkTime={anim.walkTime} big={true} />
                    </g>
                    <text x={tableX} y={GROUND_Y - 142} textAnchor="middle" fontSize="22" fontWeight="900" fill="#059669" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      달달한 커피 타임 ☕💖
                    </text>
                    <text x={tableX} y={GROUND_Y - 126} textAnchor="middle" fontSize="11.5" fontWeight="800" fill="#047857" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Sweet Coffee Time ☕💖
                    </text>
                  </>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* 5. VECTOR JOLLAMAN STICK FIGURE */}
      {jollaVisible && (
        <g
          transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing * jollaScaleX}, ${jollaScaleY})`}
          onClick={toggleJollaPause}
          className="cursor-pointer"
        >
          <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
          {jollaRot === 0 && (
            <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
          )}

          {activeChar === 'ㅝ' &&
            ((phase === 'action' && anim.actionT >= 0.48) ||
              phase === 'aftermath' ||
              phase === 'reveal') && (
              <SupermanCapeSvg
                walkTime={anim.walkTime}
                flying={phase === 'action' && anim.actionT < 0.85}
              />
            )}

          <JollamanCharacterSvg
            faceMode={jollaFaceMode}
            isWalking={isWalkingMotion}
            legSwing={legSwing}
            armSwing={customArmSwing}
            showHeadBump={showHeadBump}
            walkTime={anim.walkTime}
            activeChar={activeChar}
          />

          {activeChar === 'ㅖ' &&
            (phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && anim.actionT >= 0.54)) && (
              <g transform="translate(0, -48) scale(0.95)">
                <EggOnHeadMessSvg />
              </g>
            )}

          {/* Dizzy Stars after crashes */}
          {(phase === 'aftermath' || phase === 'reveal') &&
            (activeChar === 'ㅒ' || activeChar === 'ㅔ' || activeChar === 'ㅖ') && (
              <DizzyStarOrbitSvg walkTime={anim.walkTime} />
            )}
        </g>
      )}
    </JollamanStageShell>
  );
};
