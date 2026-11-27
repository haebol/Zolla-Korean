import React, { useRef } from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playIrregularStepSfx,
  playPhonologySfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES8_MEANINGS: Record<PhonologyKey, string> = {
  먹어: 'Eat (Liaison)',
  앉아: 'Sit down (Liaison)',
  축하: 'Congratulations (Aspiration)',
  좋다: 'Good (Aspiration)',
  '쓰+어': 'Write (ㅡ Vowel Drop)',
  '가+아': 'Go (ㅏ Vowel Drop)',
  '오+아': 'Come (Contraction)',
  '주+어': 'Give (Contraction)',
  학교: 'School (Tensification)',
  국밥: 'Soup & Rice (Tensification)',
};
import { JollamanCharacterSvg, JollamanFaceMode, DizzyStarOrbitSvg } from './JollamanSprites';
import {
  PhonologyKey,
  PhonologyBackdrop,
  GiantHollowIeungSvg,
  GiantHangulSvg,
  ElectricZapSvg,
  PhonologyBlinkRingSvg,
  PhonologySparkleBurstSvg,
  PhonologyStepHudSvg,
  getPhonologyGroup,
} from './JollamanSprites8';

export interface PhonologyItem {
  key: PhonologyKey;
  skyLabel: string;
  ruleBadge: string;
  resultDisplay: string;
  pronunciation: string;
  ttsReveal: string;
  setupVoice: string;
  beat1Voice: string;
  beat2Voice: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const PHONOLOGY_ITEMS: PhonologyItem[] = [
  {
    key: '먹어',
    skyLabel: '먹어',
    ruleBadge: '연음',
    resultDisplay: '먹어 → [머거]',
    pronunciation: '머거',
    ttsReveal: '먹. 어, 머거!',
    setupVoice: '힘없는 이응 속이 제일 편해~',
    beat1Voice: '어?! 기역이 굴러온다!',
    beat2Voice: '으악! 내 쉼터!',
    color: '#0284C7',
    skyX: 68,
    skyY: 58,
  },
  {
    key: '앉아',
    skyLabel: '앉아',
    ruleBadge: '연음',
    resultDisplay: '앉아 → [안자]',
    pronunciation: '안자',
    ttsReveal: '앉. 아, 안자!',
    setupVoice: '이번엔 이응 안에서 안전하겠지?',
    beat1Voice: '으악! 지읒이 쫓아와!',
    beat2Voice: '사람 살려!',
    color: '#0EA5E9',
    skyX: 164,
    skyY: 86,
  },
  {
    key: '축하',
    skyLabel: '축하',
    ruleBadge: '축약',
    resultDisplay: '축하 → [추카]',
    pronunciation: '추카',
    ttsReveal: '축. 하, 추카!',
    setupVoice: '어? 기역이랑 히읗만 따로 다가오는데?!',
    beat1Voice: '찌부! 종이처럼 납작해졌어!',
    beat2Voice: '키읔으로 합체했네!',
    color: '#EA580C',
    skyX: 260,
    skyY: 58,
  },
  {
    key: '좋다',
    skyLabel: '좋다',
    ruleBadge: '축약',
    resultDisplay: '좋다 → [조타]',
    pronunciation: '조타',
    ttsReveal: '좋. 다, 조타!',
    setupVoice: '히읗이랑 디귿 사이에 끼었어!',
    beat1Voice: '으악! 종이장 됐어!',
    beat2Voice: '티읕 탄생!',
    color: '#D97706',
    skyX: 356,
    skyY: 86,
  },
  {
    key: '쓰+어',
    skyLabel: '쓰+어',
    ruleBadge: 'ㅡ탈락',
    resultDisplay: '쓰+어 → 써',
    pronunciation: '써',
    ttsReveal: '쓰. 어, 써!',
    setupVoice: '으 막대기 위에서 쉬어야지~',
    beat1Voice: '으악! 으랑 같이 땅으로 꺼진다!',
    beat2Voice: '이것만 남았네, 써!',
    color: '#059669',
    skyX: 452,
    skyY: 58,
  },
  {
    key: '가+아',
    skyLabel: '가+아',
    ruleBadge: 'ㅏ탈락',
    resultDisplay: '가+아 → 가',
    pronunciation: '가',
    ttsReveal: '가. 아, 가!',
    setupVoice: '아! 아! 글자가 똑같네?',
    beat1Voice: '으아악! 아랑 같이 하늘로 날아간다!',
    beat2Voice: '하나만 남았네, 가!',
    color: '#10B981',
    skyX: 548,
    skyY: 86,
  },
  {
    key: '오+아',
    skyLabel: '오+아',
    ruleBadge: '모음축약',
    resultDisplay: '오+아 → 와',
    pronunciation: '와',
    ttsReveal: '오. 아, 와!',
    setupVoice: '오랑 아가 마주 보고 달려온다?!',
    beat1Voice: '콰광! 둘이 하나로 합체했어!!',
    beat2Voice: '으아악, 와!',
    color: '#DB2777',
    skyX: 644,
    skyY: 58,
  },
  {
    key: '주+어',
    skyLabel: '주+어',
    ruleBadge: '모음축약',
    resultDisplay: '주+어 → 줘',
    pronunciation: '줘',
    ttsReveal: '주. 어, 줘!',
    setupVoice: '주랑 어도 엄청 빠르게 다가오는데?!',
    beat1Voice: '쾅!! 한 글자로 뭉쳐졌어!',
    beat2Voice: '빙글빙글 줘!',
    color: '#9333EA',
    skyX: 740,
    skyY: 86,
  },
  {
    key: '학교',
    skyLabel: '학교',
    ruleBadge: '된소리',
    resultDisplay: '학교 → [학꾜]',
    pronunciation: '학꾜',
    ttsReveal: '학. 교, 학꾜!',
    setupVoice: '기역 하나만 있는 평범한 학교!',
    beat1Voice: '어? 기역이 기역을 복사해버렸어?!',
    beat2Voice: '으악! 나도 두 명으로 복사됐어!!',
    color: '#6366F1',
    skyX: 836,
    skyY: 58,
  },
  {
    key: '국밥',
    skyLabel: '국밥',
    ruleBadge: '된소리',
    resultDisplay: '국밥 → [국빱]',
    pronunciation: '국빱',
    ttsReveal: '국. 밥, 국빱!',
    setupVoice: '따끈한 국밥 먹으러 가자!',
    beat1Voice: '찌릿! 기역이 비읍을 두 개로 복사했어!',
    beat2Voice: '으악! 우리도 쌍둥이 됐어!!',
    color: '#7C3AED',
    skyX: 932,
    skyY: 86,
  },
];

interface JollamanPhonologySimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 320;
const GROUND_Y = 368;

const getActionDuration = (key: PhonologyKey): number => {
  if (key === '먹어' || key === '앉아') return 3.6;
  if (key === '축하' || key === '좋다') return 3.65;
  return 3.5;
};

export const JollamanPhonologySimulation: React.FC<JollamanPhonologySimulationProps> = ({
  audioEnabled = true,
}) => {
  const stepSfxRef = useRef<{ key: PhonologyKey | null; maxStep: number }>({
    key: null,
    maxStep: 0,
  });

  const {
    phase,
    selectedItem,
    learnedKeys,
    bgmEnabled,
    setBgmEnabled,
    anim,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick,
  } = useJollamanStageEngine<PhonologyItem, PhonologyKey>({
    seriesNum: 8,
    seriesTitle: '8. 졸라음운변동맨 1 (10종)',
    items: PHONOLOGY_ITEMS,
    audioEnabled,
    bgmTrack: 'latin',
    initialWalkX: 180,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 1.05,
    scrollSpeedOnApproach: 320,
    aftermathAnimMaxDur: 1.45,
    alwaysResetWalkX: true,
    playPopOnSelect: true,
    getKey: (item) => item.key,
    getLabel: (item) => item.resultDisplay,
    getBadge: (item) => item.ruleBadge,
    getAccentColor: (item) => item.color,
    getCaption: (item) => `${item.ruleBadge} · ${item.resultDisplay}`,
    getSpeakText: (item) => item.ttsReveal,
    getActionDuration: (item) => getActionDuration(item.key),
    getTargetStartX: (item) => {
      const group = getPhonologyGroup(item.key);
      if (group === 'liaison') return 505;
      if (group === 'aspiration' || group === 'vowelContract') return 415;
      if (item.key === '쓰+어') return 382;
      if (item.key === '가+아') return 585;
      return 710;
    },
    onSelectPreHook: (item) => {
      stepSfxRef.current = { key: item.key, maxStep: 0 };
    },
    onStartAction: (item) => {
      stepSfxRef.current = { key: item.key, maxStep: 1 };
    },
    onActionProgress: (item, t, { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }) => {
      const tracker = stepSfxRef.current;
      if (tracker.key === item.key && t >= 0.12 && tracker.maxStep < 2) {
        tracker.maxStep = 2;
        if (audioOn) playIrregularStepSfx('blink');
      }
      if (t >= 0.34 && !impactTriggered) {
        markImpact();
        if (audioOn) {
          const group = getPhonologyGroup(item.key);
          const sfxType =
            item.key === '쓰+어'
              ? 'sinkDown'
              : item.key === '가+아'
              ? 'flyUp'
              : group === 'elision'
              ? 'sinkDown'
              : group === 'vowelContract'
              ? 'aspiration'
              : group;
          playPhonologySfx(sfxType);
        }
      }
      if (t >= 0.58 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) {
          const g = getPhonologyGroup(item.key);
          if (g === 'liaison' || g === 'vowelContract') {
            playCartoonImpact();
          } else if (g === 'aspiration') {
            playCartoonSplat();
          }
        }
      }
      const completeAt =
        item.key === '먹어' ? 0.66
        : item.key === '앉아' || item.key === '축하' || item.key === '좋다' ? 0.78
        : item.key === '쓰+어' ? 0.68
        : item.key === '가+아' ? 0.72
        : item.key === '오+아' || item.key === '주+어' ? 0.48
        : 0.64;
      if (tracker.key === item.key && t >= completeAt && tracker.maxStep < 4) {
        tracker.maxStep = 4;
        if (audioOn) playIrregularStepSfx('complete');
      }
    },
  });

  const activeKey = selectedItem.key;
  const activeGroup = getPhonologyGroup(activeKey);

  // Walking cycle parameters
  const isFleeWalking =
    phase === 'action' &&
    activeKey === '앉아' &&
    anim.actionT >= 0.34 &&
    anim.actionT < 0.78;
  const isWalkingMotion = phase === 'walking' || phase === 'approaching' || isFleeWalking;
  const walkCycle = anim.walkTime * (isFleeWalking ? 18 : 9.5);
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaFacing =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? 1
      : 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let jollaVisible = true;
  let showCloneTwin = false;
  let cloneJollaX = 815;
  let cloneJollaY = GROUND_Y - 52;

  if (phase === 'approaching') {
    const t = anim.objectAppear;
    if (activeGroup === 'liaison') {
      // Hops neatly into the cozy hollow ㅇ cushion!
      jollaY = GROUND_Y - 52 - Math.sin(t * Math.PI) * 65 - t * 64;
      jollaScaleX = 0.86;
      jollaScaleY = 0.86;
    } else if (activeKey === '쓰+어') {
      jollaY = GROUND_Y - 52 - t * 34;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeKey) {
      case '먹어': {
        if (t < 0.34) {
          // Resting cozily inside the giant hollow ㅇ ring
          jollaX = 505;
          jollaY = 252 + Math.sin(anim.walkTime * 3) * 2;
          jollaScaleX = 0.82;
          jollaScaleY = 0.82;
          jollaRot = -12;
          jollaFaceMode = 'happy';
        } else if (t < 0.66) {
          // Sees rolling ㄱ -> knocked flying right out of ㅇ!!
          const knock = (t - 0.34) / 0.32;
          jollaX = 505 + knock * 270;
          jollaY = 252 - Math.sin(knock * Math.PI) * 95 + knock * 86;
          jollaRot = knock * 540;
          jollaFaceMode = 'panic';
        } else {
          // Bounces bruised & dizzy on the right side
          jollaX = 775;
          jollaY = GROUND_Y - 38;
          jollaRot = 24;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '앉아': {
        if (t < 0.34) {
          jollaX = 505;
          jollaY = 252 + Math.sin(anim.walkTime * 3) * 2;
          jollaScaleX = 0.82;
          jollaScaleY = 0.82;
          jollaRot = -10;
          jollaFaceMode = 'happy';
        } else if (t < 0.78) {
          // Chased frantically left-to-right across stage by giant spinning ㅈ!
          const flee = (t - 0.34) / 0.44;
          jollaX = 525 + flee * 285;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(flee * Math.PI * 5)) * 18;
          jollaFaceMode = 'panic';
        } else {
          const tumble = Math.min((t - 0.78) / 0.16, 1);
          jollaX = 810 + tumble * 28;
          jollaY = GROUND_Y - 52 + tumble * 18;
          jollaRot = 72 * tumble;
          jollaFaceMode = 'crying';
        }
        break;
      }
      case '축하':
      case '좋다': {
        if (t < 0.34) {
          jollaX = 415;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'panic';
        } else if (t < 0.56) {
          // Squashed PAPER-THIN right between ONLY the two clamping consonants!
          const press = Math.min((t - 0.34) / 0.14, 1);
          jollaX = 415;
          jollaY = GROUND_Y - 58;
          jollaScaleX = 1 - press * 0.82; // 0.18 paper-thin!
          jollaScaleY = 1 + press * 0.42;
          jollaFaceMode = 'squashed';
        } else {
          // Blown off fluttering gently like a sheet of paper as ㅋ/ㅌ pops out!
          const flutter = (t - 0.56) / 0.44;
          jollaX = 415 + Math.sin(flutter * Math.PI * 4) * 34 + flutter * 285;
          jollaY = 250 + flutter * (GROUND_Y - 286);
          jollaScaleX = 0.24;
          jollaScaleY = 1.25;
          jollaRot = Math.sin(flutter * Math.PI * 4) * 32;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '쓰+어': {
        if (t < 0.34) {
          // Clinging onto the giant horizontal 'ㅡ' beam above ground
          jollaX = 382;
          jollaY = 290 + Math.sin(anim.walkTime * 6) * 4;
          jollaRot = -6;
          jollaFaceMode = 'happy';
        } else if (t < 0.84) {
          // Sinks straight DOWN into the ground trapdoor clinging onto 'ㅡ'!
          const sink = (t - 0.34) / 0.5;
          jollaX = 382 + Math.sin(sink * 32) * 3;
          jollaY = 290 + sink * 180;
          jollaRot = -6 + sink * 14;
          jollaFaceMode = 'panic';
        } else {
          // Pops back up onto the sinkhole rim dizzy & bruised so Jollaman stays visible!
          const popUp = Math.min((t - 0.84) / 0.16, 1);
          jollaX = 382 - popUp * 92;
          jollaY = GROUND_Y - 46 - Math.sin(popUp * Math.PI) * 35;
          jollaRot = -18 * popUp;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '가+아': {
        if (t < 0.34) {
          // Hugging the duplicate '아' on the right
          jollaX = 585;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else if (t < 0.82) {
          // Rockets UP clinging onto the runaway duplicate '아'
          const fly = (t - 0.34) / 0.48;
          jollaX = 585 + fly * 175;
          jollaY = GROUND_Y - 52 - fly * 220;
          jollaRot = -24 + Math.sin(fly * 22) * 12;
          jollaFaceMode = 'panic';
        } else {
          // Tumbles back onto ground dizzy beside '가'!
          const drop = Math.min((t - 0.82) / 0.18, 1);
          jollaX = 760;
          jollaY = 96 + drop * (GROUND_Y - 134);
          jollaRot = drop * 28;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '오+아':
      case '주+어': {
        if (t < 0.48) {
          jollaX = 415;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = t < 0.25 ? 'happy' : 'panic';
        } else {
          // Launched flying out by colliding syllables fusing into 와 / 줘!
          const launch = Math.min((t - 0.48) / 0.38, 1);
          jollaX = 415 + launch * 295;
          jollaY = GROUND_Y - 52 - Math.sin(launch * Math.PI) * 160 + launch * 14;
          jollaRot = launch * 420;
          jollaFaceMode = launch < 0.85 ? 'panic' : 'dizzy';
        }
        break;
      }
      case '학교':
      case '국밥': {
        if (t < 0.64) {
          jollaX = 710;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = t < 0.34 ? 'happy' : 'panic';
          if (t >= 0.34) {
            jollaX = 710 + Math.sin(t * 58) * 4;
          }
        } else {
          // CLONED INTO TWO IDENTICAL SHOCKED JOLLAMANS!!
          const pop = Math.min((t - 0.64) / 0.16, 1);
          const hop = Math.abs(Math.sin(pop * Math.PI)) * 26;
          jollaX = 685;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'panic';
          jollaFacing = 1;

          showCloneTwin = true;
          cloneJollaX = 685 + pop * 125;
          cloneJollaY = GROUND_Y - 52 - hop;
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeKey) {
      case '먹어':
        jollaX = 775;
        jollaY = GROUND_Y - 38;
        jollaRot = 24;
        jollaFaceMode = 'dizzy';
        break;
      case '앉아':
        jollaX = 838;
        jollaY = GROUND_Y - 34;
        jollaRot = 72;
        jollaFaceMode = 'crying';
        break;
      case '축하':
      case '좋다':
        jollaX = 700;
        jollaY = GROUND_Y - 34;
        jollaScaleX = 0.24;
        jollaScaleY = 1.25;
        jollaRot = 78;
        jollaFaceMode = 'dizzy';
        break;
      case '쓰+어':
        jollaX = 290;
        jollaY = GROUND_Y - 46;
        jollaRot = -18;
        jollaFaceMode = 'dizzy';
        break;
      case '가+아':
        jollaX = 760;
        jollaY = GROUND_Y - 38;
        jollaRot = 28;
        jollaFaceMode = 'dizzy';
        break;
      case '오+아':
      case '주+어':
        jollaX = 710;
        jollaY = GROUND_Y - 38;
        jollaRot = 60;
        jollaFaceMode = 'dizzy';
        break;
      case '학교':
      case '국밥':
        jollaX = 685;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'panic';
        showCloneTwin = true;
        cloneJollaX = 810;
        cloneJollaY = GROUND_Y - 52;
        break;
    }
  }

  const revealSubtitle = tRevealSubtitle(8, selectedItem.key, selectedItem.beat2Voice);
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  const actionT = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
  const mergedThreshold: Record<PhonologyKey, number> = {
    먹어: 0.66,
    앉아: 0.78,
    축하: 0.78,
    좋다: 0.78,
    '쓰+어': 0.68,
    '가+아': 0.72,
    '오+아': 0.48,
    '주+어': 0.48,
    학교: 0.64,
    국밥: 0.64,
  };
  const mergedT = mergedThreshold[activeKey];
  const currentStep: 1 | 2 | 3 | 4 =
    phase === 'approaching' || actionT < 0.12
      ? 1
      : actionT < 0.34
      ? 2
      : phase === 'action' && actionT < mergedT
      ? 3
      : 4;

  const isBlinkWindow = phase === 'action' && actionT >= 0.12 && actionT < 0.36;
  const blinkOn = isBlinkWindow ? Math.floor((actionT - 0.12) * 28) % 2 === 0 : false;

  const blinkHintMap: Record<PhonologyKey, string> = {
    먹어: "받침 'ㄱ' + 빈 'ㅇ' 깜빡!",
    앉아: "받침 'ㅈ' + 빈 'ㅇ' 깜빡!",
    축하: "자음 'ㄱ' + 'ㅎ' 깜빡!",
    좋다: "자음 'ㅎ' + 'ㄷ' 깜빡!",
    '쓰+어': "모음 'ㅡ' + '어' 깜빡!",
    '가+아': "같은 모음 '가·아' 깜빡!",
    '오+아': "두 모음 '오·아' 깜빡!",
    '주+어': "두 모음 '주·어' 깜빡!",
    학교: "받침 'ㄱ' + 뒷 'ㄱ' 깜빡!",
    국밥: "받침 'ㄱ' + 뒷 'ㅂ' 깜빡!",
  };

  const stepHudTextMap: Record<1 | 2 | 3 | 4, string> = {
    1: `1단계: 원래 글자 '${selectedItem.skyLabel}' 등장!`,
    2: `2단계: ${blinkHintMap[activeKey]}`,
    3: `3단계: ${selectedItem.ruleBadge} 변신 중!!`,
    4: `4단계: [${selectedItem.pronunciation}] 발음 완성!!`,
  };

  const renderPhonologyBlink = (
    text: string,
    x: number,
    y: number,
    size: number,
    baseColor: string,
    rx = 40,
    ry = 40
  ) => {
    const active = isBlinkWindow;
    const scale = active ? (blinkOn ? 1.13 : 0.96) : 1;
    const fill = active && blinkOn ? '#EA580C' : baseColor;
    const stroke = active && blinkOn ? '#FEF08A' : '#FFFFFF';
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        {active && <PhonologyBlinkRingSvg blinkOn={blinkOn} color={baseColor} rx={rx} ry={ry} />}
        <g opacity={active ? (blinkOn ? 1 : 0.4) : 1}>
          <GiantHangulSvg text={text} size={size} fill={fill} stroke={stroke} strokeWidth={10} />
        </g>
      </g>
    );
  };

  return (
    <JollamanStageShell
      icon="🪄"
      title="8. 졸라음운변동맨 1 (10종)"
      accentButtonClass="bg-fuchsia-600 hover:bg-fuchsia-700"
      stageBgClass="bg-sky-50"
      ariaLabel="졸라맨 8 음운 변동 마법 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'latin',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-fuchsia-50 text-fuchsia-700 border-fuchsia-200 hover:bg-fuchsia-100',
        activeLabel: '🎵 레트로 BGM 켜짐',
        title: '배경음악 켜기/끄기',
      }}
      items={PHONOLOGY_ITEMS}
      selectedItem={selectedItem}
      learnedKeys={learnedKeys}
      getKey={(item) => item.key}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      skyTokenStyle="pill"
      pillWidth={84}
      pillHeight={44}
      getTokenText={(item) => item.skyLabel}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={620}
      walkingHint="하늘의 음운 변동 (먹어 ~ 국밥)을 눌러보세요!"
      activeCaption={
        phase === 'action' || phase === 'approaching'
          ? `${selectedItem.ruleBadge} · ${stepHudTextMap[currentStep]}`
          : `${selectedItem.resultDisplay} · [${selectedItem.pronunciation}] (${selectedItem.ruleBadge})`
      }
      revealAriaLabel={`${selectedItem.resultDisplay} 학습 화면`}
      revealGlyph={`[${selectedItem.pronunciation}]`}
      revealGlyphSize="medium"
      revealHeadline={<span>{selectedItem.resultDisplay}</span>}
      revealSubtitle={revealSubtitle}
      flashcard={(() => {
        const [leftPart, rightPart] = selectedItem.resultDisplay.split('→').map((s) => s.trim());
        return {
          glyph: `[${selectedItem.pronunciation}]`,
          subLabel: selectedItem.ruleBadge,
          accentColor: selectedItem.color,
          headlineNode: rightPart ? (
            <>
              <span>{leftPart}</span>
              <span className="mx-1.5 text-slate-400">→</span>
              <span style={{ color: selectedItem.color }}>{rightPart}</span>
            </>
          ) : (
            <span style={{ color: selectedItem.color }}>{selectedItem.resultDisplay}</span>
          ),
          headlineCharLen: selectedItem.resultDisplay.length,
          meaning: tWordMeaning(8, selectedItem.key, SERIES8_MEANINGS[selectedItem.key]),
          romanization: romanizeKorean(selectedItem.pronunciation),
          cornerIcon: getSeriesCornerIcon(8, selectedItem.key, anim.walkTime),
        };
      })()}
      defsSlot={
        <defs>
          {/* Clip region above GROUND_Y for sinkhole trapdoor disappearance ('쓰+어') */}
          <clipPath id="aboveGroundClip8">
            <rect x="0" y="-80" width="1000" height={GROUND_Y + 84} />
          </clipPath>
        </defs>
      }
      backdropSlot={
        <PhonologyBackdrop
          activeKey={phase === 'walking' ? PHONOLOGY_ITEMS[0].key : activeKey}
          isWalkingMode={false}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >

          {/* 3. GIANT INTERACTIVE PHONOLOGY LETTERS & SLAPSTICK MECHANICS */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              <PhonologyStepHudSvg
                step={currentStep}
                stepText={stepHudTextMap[currentStep]}
                accentColor={selectedItem.color}
                centerX={460}
                y={128}
              />

              {/* MECHANIC A1: 먹어 -> [머거] (Giant 'ㄱ' blinks then rolls into powerless hollow 'ㅇ' knocking Jollaman flying!) */}
              {activeKey === '먹어' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const rolling = t >= 0.14 && t < 0.66;
                const merged = t >= 0.66;

                let kX = 285;
                let kY = 332;
                let kRot = 0;
                if (rolling && phase === 'action') {
                  const p = (t - 0.14) / 0.52;
                  kX = 285 + p * 208;
                  kY = 332 - Math.abs(Math.sin(p * Math.PI * 2.5)) * 28 - p * 98;
                  kRot = p * 720;
                }

                const ieungFly =
                  t >= 0.34 ? Math.min((t - 0.34) / 0.32, 1) : 0;

                return (
                  <g>
                    {/* First syllable: 머 (+ ㄱ batchim blinking before rolling away) */}
                    <g transform="translate(275, 224)">
                      <GiantHangulSvg text="머" size={162} fill="#1E293B" />
                    </g>
                    {!merged && renderPhonologyBlink('ㄱ', kX, kY, 118, '#EA580C', 38, 36)}

                    {/* Second syllable: Powerless giant hollow ㅇ + ㅓ (or merged 거!) */}
                    {!merged ? (
                      <g>
                        {ieungFly < 0.95 && (
                          <g
                            transform={`translate(${505 - ieungFly * 90}, ${246 - ieungFly * 180}) rotate(${-ieungFly * 210}) scale(${1 - ieungFly * 0.4})`}
                            opacity={1 - ieungFly}
                          >
                            {isBlinkWindow && <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#0284C7" rx={64} ry={64} />}
                            <GiantHollowIeungSvg radius={54} cracked={ieungFly > 0} />
                          </g>
                        )}
                        <g transform="translate(595, 248)">
                          <GiantHangulSvg text="ㅓ" size={172} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(540, 244)">
                          <PhonologySparkleBurstSvg color="#38BDF8" progress={anim.aftermathT} />
                          <GiantHangulSvg text="거" size={184} fill="#0284C7" />
                        </g>
                      </g>
                    )}

                    {t < 0.34 && phase === 'action' && (
                      <text x="505" y="176" textAnchor="middle" fontSize="18" fontWeight="900" fill="#475569">
                        Zzz
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* MECHANIC A2: 앉아 -> [안자] (Giant 'ㅈ' detaches from ㄵ spinning like a saw chasing Jollaman out of ㅇ!) */}
              {activeKey === '앉아' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const spinning = t >= 0.16 && t < 0.78;
                const merged = t >= 0.78;

                let jX = 315;
                let jY = 330;
                let jRot = 0;
                if (spinning && phase === 'action') {
                  const p = (t - 0.16) / 0.62;
                  if (p < 0.55) {
                    const q = p / 0.55;
                    jX = 315 + q * 380;
                    jY = 328 - Math.abs(Math.sin(q * Math.PI * 3)) * 22;
                  } else {
                    const q = (p - 0.55) / 0.45;
                    jX = 695 - q * 210;
                    jY = 328 - Math.sin(q * Math.PI) * 95 - q * 84;
                  }
                  jRot = p * 1080;
                }

                const ieungFly = t >= 0.36 ? Math.min((t - 0.36) / 0.3, 1) : 0;

                return (
                  <g>
                    {/* First syllable: 안 (after ㅈ splits off & blinks!) */}
                    <g transform="translate(275, 240)">
                      <GiantHangulSvg text={t >= 0.12 ? '안' : '앉'} size={172} fill="#1E293B" />
                    </g>
                    {t >= 0.12 && !merged && (
                      <g transform={`translate(${jX}, ${jY}) rotate(${jRot})`}>
                        {isBlinkWindow && <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#DB2777" rx={38} ry={36} />}
                        <g opacity={isBlinkWindow && !blinkOn ? 0.4 : 1}>
                          <GiantHangulSvg
                            text="ㅈ"
                            size={116}
                            fill={isBlinkWindow && blinkOn ? '#EA580C' : '#DB2777'}
                            stroke={isBlinkWindow && blinkOn ? '#FEF08A' : '#FFFFFF'}
                            strokeWidth={10}
                          />
                        </g>
                      </g>
                    )}

                    {/* Second syllable: Giant hollow ㅇ + ㅏ -> 자! */}
                    {!merged ? (
                      <g>
                        {ieungFly < 0.95 && (
                          <g
                            transform={`translate(${505 - ieungFly * 80}, ${246 - ieungFly * 190}) rotate(${ieungFly * 240})`}
                            opacity={1 - ieungFly}
                          >
                            {isBlinkWindow && <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#0EA5E9" rx={64} ry={64} />}
                            <GiantHollowIeungSvg radius={54} cracked={ieungFly > 0} />
                          </g>
                        )}
                        <g transform="translate(595, 248)">
                          <GiantHangulSvg text="ㅏ" size={172} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g transform="translate(540, 242)">
                        <PhonologySparkleBurstSvg color="#38BDF8" progress={anim.aftermathT} />
                        <GiantHangulSvg text="자" size={184} fill="#0EA5E9" />
                      </g>
                    )}

                    {t < 0.34 && phase === 'action' && (
                      <text x="505" y="176" textAnchor="middle" fontSize="18" fontWeight="900" fill="#475569">
                        Zzz
                      </text>
                    )}
                  </g>
                );
              })()}

              {/* MECHANIC B: 축하 -> [추카] & 좋다 -> [조타] (ONLY ㄱ+ㅎ or ㅎ+ㄷ clamp, then ㅋ/ㅌ pops out '뿅!' before joining ㅏ!) */}
              {(activeKey === '축하' || activeKey === '좋다') && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const isChuka = activeKey === '축하';
                const moving = t >= 0.16 && t < 0.56;
                const clamping = t >= 0.34 && t < 0.56;
                const poppedAspirated = t >= 0.56 && t < 0.78;
                const fused = t >= 0.78;

                const slideP = moving ? Math.min((t - 0.16) / 0.2, 1) : 0;
                const leftConsX = 228 + slideP * 144;
                const leftConsY = 326 - slideP * 54;
                const rightConsX = 562 - slideP * 102;
                const rightConsY = 252 + slideP * 18;

                const popP = poppedAspirated ? (t - 0.56) / 0.22 : 0;
                const popScale = poppedAspirated ? 1 + Math.sin(popP * Math.PI) * 0.38 : 1;
                const popX = 415 + Math.max(0, (popP - 0.55) / 0.45) * 140;

                return (
                  <g>
                    {!fused ? (
                      <g>
                        {/* Static left CV block ('추' or '조') */}
                        <g transform="translate(225, 224)">
                          <GiantHangulSvg
                            text={isChuka ? '추' : '조'}
                            size={162}
                            fill="#1E293B"
                          />
                        </g>
                        {/* Static right vowel ('ㅏ') */}
                        <g transform="translate(658, 250)">
                          <GiantHangulSvg text="ㅏ" size={172} fill="#1E293B" />
                        </g>

                        {!poppedAspirated ? (
                          <g>
                            {/* ONLY the participating batchim consonant (ㄱ or ㅎ) blinks & slides inward from left */}
                            {renderPhonologyBlink(isChuka ? 'ㄱ' : 'ㅎ', leftConsX, leftConsY, 122, '#EA580C', 40, 38)}
                            {/* ONLY the participating onset consonant (ㅎ or ㄷ) blinks & slides inward from right */}
                            {renderPhonologyBlink(
                              isChuka ? 'ㅎ' : 'ㄷ',
                              rightConsX,
                              rightConsY,
                              128,
                              isChuka ? '#DC2626' : '#7C3AED',
                              42,
                              40
                            )}
                          </g>
                        ) : (
                          /* Newly born aspirated consonant ㅋ / ㅌ POPS OUT visibly ('뿅!!') before joining ㅏ! */
                          <g transform={`translate(${popX}, 238) scale(${popScale})`}>
                            <PhonologyBlinkRingSvg blinkOn={Math.floor(t * 26) % 2 === 0} color="#EA580C" rx={54} ry={54} />
                            <GiantHangulSvg
                              text={isChuka ? 'ㅋ' : 'ㅌ'}
                              size={168}
                              fill={isChuka ? '#EA580C' : '#D97706'}
                            />
                          </g>
                        )}
                      </g>
                    ) : (
                      <g>
                        {/* Combined 추 + 카 / 조 + 타 */}
                        <g transform="translate(310, 244)">
                          <GiantHangulSvg text={isChuka ? '추' : '조'} size={178} fill="#1E293B" />
                        </g>
                        <g transform="translate(525, 244)">
                          <PhonologySparkleBurstSvg color="#FACC15" progress={anim.aftermathT} />
                          <GiantHangulSvg
                            text={isChuka ? '카' : '타'}
                            size={194}
                            fill={isChuka ? '#EA580C' : '#D97706'}
                          />
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC C1: 쓰+어 -> 써 (Sinkhole swallows giant 'ㅡ' bar + clinging Jollaman STRAIGHT DOWN underground!) */}
              {activeKey === '쓰+어' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const sinking = t >= 0.34;
                const sinkP = sinking ? Math.min((t - 0.34) / 0.56, 1) : 0;
                const holeOpen = sinking && sinkP < 0.96;

                const eoX = sinking ? 540 - Math.min((t - 0.34) / 0.34, 1) * 115 : 540;
                const merged = t >= 0.68;

                return (
                  <g>
                    {!merged ? (
                      <g>
                        {/* Top ㅆ stays intact */}
                        <g transform="translate(335, 198)">
                          <GiantHangulSvg text="ㅆ" size={148} fill="#1E293B" />
                        </g>
                        {/* Sliding '어' blinks before combining */}
                        {renderPhonologyBlink('어', eoX, 244, 168, '#059669', 50, 50)}
                      </g>
                    ) : (
                      <g transform="translate(435, 240)">
                        <PhonologySparkleBurstSvg color="#34D399" progress={anim.aftermathT} />
                        <GiantHangulSvg text="써" size={202} fill="#059669" />
                      </g>
                    )}

                    {/* Dark sinkhole ellipse at GROUND_Y right below 'ㅡ' */}
                    {holeOpen && (
                      <ellipse
                        cx="350"
                        cy={GROUND_Y}
                        rx={96 * Math.sin(Math.min(sinkP * 1.4, 1) * Math.PI * 0.5)}
                        ry="15"
                        fill="#0F172A"
                        stroke="#475569"
                        strokeWidth="3"
                      />
                    )}

                    {/* Giant horizontal 'ㅡ' bar blinks sharply then sinks STRAIGHT DOWN underground! */}
                    {sinkP < 0.96 && (
                      <g clipPath="url(#aboveGroundClip8)">
                        <g transform={`translate(335, ${290 + sinkP * 215}) rotate(${sinkP * 10})`}>
                          {isBlinkWindow && <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#0284C7" rx={104} ry={28} />}
                          <rect
                            x="-92"
                            y="-14"
                            width="184"
                            height="24"
                            rx="8"
                            fill={isBlinkWindow && blinkOn ? '#F59E0B' : '#0284C7'}
                            stroke={isBlinkWindow && blinkOn ? '#FEF08A' : '#FFFFFF'}
                            strokeWidth="4.5"
                            opacity={isBlinkWindow && !blinkOn ? 0.45 : 1}
                          />
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC C2: 가+아 -> 가 (Duplicate '아' blinks then rockets UP into the sky carrying clinging Jollaman!) */}
              {activeKey === '가+아' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const flying = t >= 0.34;
                const flyP = flying ? (t - 0.34) / 0.66 : 0;

                const ahX = flying ? 550 + flyP * 390 : 550;
                const ahY = flying ? 244 - flyP * 430 : 244;
                const ahRot = flying ? -22 : 0;

                return (
                  <g>
                    {/* Remaining giant '가' blinks before sliding cleanly toward center */}
                    {flyP >= 0.72 && (
                      <g transform={`translate(${320 + Math.min(flyP * 1.4, 1) * 115}, 244)`}>
                        <PhonologySparkleBurstSvg color="#34D399" progress={anim.aftermathT} />
                      </g>
                    )}
                    {renderPhonologyBlink(
                      '가',
                      320 + Math.min(flyP * 1.4, 1) * 115,
                      244,
                      196,
                      '#10B981',
                      56,
                      56
                    )}

                    {/* Duplicate '아' blinks then rockets UP into the sky with clinging Jollaman! */}
                    {(!flying || flyP < 0.96) && (
                      <g transform={`translate(${ahX}, ${ahY}) rotate(${ahRot})`}>
                        {isBlinkWindow && <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#F59E0B" rx={54} ry={54} />}
                        <g opacity={isBlinkWindow && !blinkOn ? 0.4 : 1}>
                          <GiantHangulSvg
                            text="아"
                            size={178}
                            fill={isBlinkWindow && blinkOn ? '#EA580C' : '#F59E0B'}
                            stroke={isBlinkWindow && blinkOn ? '#FEF08A' : '#FFFFFF'}
                            strokeWidth={10}
                          />
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC C3: 오+아 -> 와 & 주+어 -> 줘 (Fast collision fusion: 모음 축약!) */}
              {(activeKey === '오+아' || activeKey === '주+어') && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const isOa = activeKey === '오+아';
                const charging = t >= 0.18 && t < 0.48;
                const collided = t >= 0.48;

                const chargeP = charging ? (t - 0.18) / 0.3 : collided ? 1 : 0;
                const easedP = chargeP * chargeP;
                const leftX = 255 + easedP * 145;
                const rightX = 575 - easedP * 145;
                const boomScale = collided ? 1 + Math.max(0, 1 - (t - 0.48) * 3.5) * 0.24 : 1;

                return (
                  <g>
                    {!collided ? (
                      <g>
                        {renderPhonologyBlink(
                          isOa ? '오' : '주',
                          leftX,
                          244,
                          172,
                          isOa ? '#DB2777' : '#9333EA',
                          52,
                          52
                        )}
                        {renderPhonologyBlink(isOa ? '아' : '어', rightX, 244, 172, '#1E293B', 52, 52)}
                      </g>
                    ) : (
                      <g transform={`translate(415, 240) scale(${boomScale})`}>
                        <PhonologySparkleBurstSvg color="#FACC15" progress={anim.aftermathT} />
                        <GiantHangulSvg
                          text={isOa ? '와' : '줘'}
                          size={212}
                          fill={isOa ? '#DB2777' : '#9333EA'}
                        />
                      </g>
                    )}

                    {collided && t < 0.76 && phase === 'action' && (
                      <g transform={`translate(415, 196) scale(${1 + Math.sin(t * 48) * 0.18})`}>
                        <ElectricZapSvg color="#FACC15" />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* MECHANIC D: 학교 -> [학꾜] & 국밥 -> [국빱] (ONLY batchim ㄱ charges over to copy rear ㄱ/ㅂ into ㄱㄱ/ㅂㅂ, cloning Jollaman!) */}
              {(activeKey === '학교' || activeKey === '국밥') && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const isSchool = activeKey === '학교';
                const firing = t >= 0.22 && t < 0.64;
                const doubled = t >= 0.64;

                const sparkP = firing ? (t - 0.22) / 0.42 : 0;
                const sparkX = 272 + sparkP * (isSchool ? 225 : 210);
                const sparkY = isSchool ? 320 - sparkP * 112 : 320 - sparkP * 88;

                return (
                  <g>
                    {!doubled ? (
                      <g>
                        {/* Left CV stays still ('하' or '구') + glowing blinking bottom ㄱ! */}
                        <g transform="translate(265, 214)">
                          <GiantHangulSvg text={isSchool ? '하' : '구'} size={156} fill="#1E293B" />
                        </g>
                        {renderPhonologyBlink('ㄱ', 272, 320, 114, firing ? '#4F46E5' : '#1E293B', 38, 36)}

                        {/* Flying electric clone of ㄱ charging across to rear consonant! */}
                        {firing && phase === 'action' && (
                          <g transform={`translate(${sparkX}, ${sparkY}) scale(${1.05 + Math.sin(t * 48) * 0.14})`}>
                            <GiantHangulSvg text="ㄱ" size={96} fill="#FACC15" stroke="#4338CA" strokeWidth={8} />
                          </g>
                        )}

                        {/* Right syllable decomposed so ONLY target consonant (ㄱ or ㅂ) blinks and duplicates into ㄱㄱ / ㅂㅂ! */}
                        {isSchool ? (
                          <g>
                            {t >= 0.44 ? (
                              <g>
                                <g transform="translate(508, 198)">
                                  <GiantHangulSvg text="ㄱ" size={116} fill="#4F46E5" />
                                </g>
                                <g transform="translate(558, 198)">
                                  <GiantHangulSvg text="ㄱ" size={116} fill="#6366F1" />
                                </g>
                              </g>
                            ) : (
                              renderPhonologyBlink('ㄱ', 532, 198, 126, firing ? '#4F46E5' : '#1E293B', 40, 38)
                            )}
                            <g transform="translate(532, 294)">
                              <GiantHangulSvg text="ㅛ" size={146} fill="#1E293B" />
                            </g>
                          </g>
                        ) : (
                          <g>
                            {t >= 0.44 ? (
                              <g>
                                <g transform="translate(466, 224)">
                                  <GiantHangulSvg text="ㅂ" size={112} fill="#7C3AED" />
                                </g>
                                <g transform="translate(514, 224)">
                                  <GiantHangulSvg text="ㅂ" size={112} fill="#6366F1" />
                                </g>
                              </g>
                            ) : (
                              renderPhonologyBlink('ㅂ', 495, 224, 126, firing ? '#7C3AED' : '#1E293B', 40, 38)
                            )}
                            <g transform="translate(580, 224)">
                              <GiantHangulSvg text="ㅏ" size={138} fill="#1E293B" />
                            </g>
                            <g transform="translate(532, 320)">
                              <GiantHangulSvg text="ㅂ" size={108} fill="#1E293B" />
                            </g>
                          </g>
                        )}
                      </g>
                    ) : (
                      <g>
                        {/* Final combined word: 학꾜 / 국빱 (with duplicated rear consonant!) */}
                        <g transform="translate(285, 244)">
                          <GiantHangulSvg text={isSchool ? '학' : '국'} size={178} fill="#1E293B" />
                        </g>
                        <g transform="translate(510, 244)">
                          <PhonologySparkleBurstSvg color="#818CF8" progress={anim.aftermathT} />
                          <GiantHangulSvg
                            text={isSchool ? '꾜' : '빱'}
                            size={194}
                            fill="#4F46E5"
                          />
                        </g>
                      </g>
                    )}

                    {/* Electric spark zap between ㄱ -> rear consonant & toward Jollaman */}
                    {firing && phase === 'action' && (
                      <g>
                        <g transform={`translate(455, 225) scale(${1 + Math.sin(t * 50) * 0.2})`}>
                          <ElectricZapSvg />
                        </g>
                        <g transform={`translate(625, 270) scale(${1 + Math.cos(t * 50) * 0.2})`}>
                          <ElectricZapSvg />
                        </g>
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* 4. MAIN JOLLAMAN STICK FIGURE (Clipped cleanly above ground during '쓰+어' sinkhole drop!) */}
          <g
            clipPath={
              activeKey === '쓰+어' && phase === 'action' && anim.actionT >= 0.34 && anim.actionT < 0.84
                ? 'url(#aboveGroundClip8)'
                : undefined
            }
          >
            {jollaVisible && (
              <g
                transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing * jollaScaleX}, ${jollaScaleY})`}
                onClick={toggleJollaPause}
                className="cursor-pointer"
              >
                <rect x="-48" y="-76" width="96" height="132" fill="transparent" />
                {jollaRot === 0 && jollaScaleY > 0.5 && jollaY < GROUND_Y && (
                  <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.22" />
                )}
                <JollamanCharacterSvg
                  faceMode={jollaFaceMode}
                  isWalking={isWalkingMotion}
                  legSwing={legSwing}
                  armSwing={armSwing}
                  walkTime={anim.walkTime}
                  activeChar={activeKey}
                />
                {(phase === 'aftermath' || phase === 'reveal') &&
                  (activeKey === '먹어' ||
                    activeKey === '축하' ||
                    activeKey === '좋다' ||
                    activeKey === '쓰+어' ||
                    activeKey === '가+아' ||
                    activeKey === '오+아' ||
                    activeKey === '주+어') && (
                    <DizzyStarOrbitSvg walkTime={anim.walkTime} />
                  )}
              </g>
            )}

            {/* TWIN CLONE JOLLAMAN for Tensification (학교 / 국밥)! */}
            {showCloneTwin && (
              <g
                transform={`translate(${cloneJollaX}, ${cloneJollaY}) scale(-1, 1)`}
                onClick={toggleJollaPause}
                className="cursor-pointer"
              >
                <ellipse cx="0" cy="52" rx="18" ry="5" fill="#1E293B" opacity="0.22" />
                <JollamanCharacterSvg
                  faceMode="panic"
                  isWalking={false}
                  legSwing={0}
                  armSwing={0}
                  walkTime={anim.walkTime}
                  activeChar={activeKey}
                />
              </g>
            )}
          </g>

    </JollamanStageShell>
  );
};
