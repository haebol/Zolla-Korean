import React, { useRef } from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playIrregularStepSfx,
  playPhonologySfx,
  playPhonology2Sfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES9_MEANINGS: Record<Phonology2Key, string> = {
  국물: 'Soup Broth (Nasalization)',
  입니다: 'Is / Am Polite (Nasalization)',
  연락: 'Contact (Liquidization)',
  설날: 'Lunar New Year (Liquidization)',
  같이: 'Together (Palatalization)',
  굳이: 'Deliberately (Palatalization)',
  좋아: 'Good / Like (ㅎ Drop)',
  많아: 'Is A Lot (ㅎ Drop + Liaison)',
};
import { JollamanCharacterSvg, JollamanFaceMode, DizzyStarOrbitSvg } from './JollamanSprites';
import {
  GiantHangulSvg,
  GiantHollowIeungSvg,
  ElectricZapSvg,
  PhonologyBlinkRingSvg,
  PhonologySparkleBurstSvg,
  PhonologyStepHudSvg,
} from './JollamanSprites8';
import {
  Phonology2Key,
  Phonology2Backdrop,
  TinyPoopWithFumesSvg,
  GiantNoseOverlaySvg,
  CameraFlashBurstSvg,
  SoapBubblePopSvg,
  getPhonology2Group,
} from './JollamanSprites9';

export interface Phonology2Item {
  key: Phonology2Key;
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

export const PHONOLOGY2_ITEMS: Phonology2Item[] = [
  {
    key: '국물',
    skyLabel: '국물',
    ruleBadge: '비음화',
    resultDisplay: '국물 → [궁물]',
    pronunciation: '궁물',
    ttsReveal: '국. 물, 궁물!',
    setupVoice: '어? 미음 위에 뭐가 있어서 냄새가 나는데?',
    beat1Voice: '으악 냄새! 기역이 이응 코가 됐어!',
    beat2Voice: '내 코도 왕코 됐네, 궁물!',
    color: '#0D9488',
    skyX: 78,
    skyY: 60,
  },
  {
    key: '입니다',
    skyLabel: '입니다',
    ruleBadge: '비음화',
    resultDisplay: '입니다 → [임니다]',
    pronunciation: '임니다',
    ttsReveal: '입. 니다, 임니다!',
    setupVoice: '비읍이 니은을 만나러 가네!',
    beat1Voice: '뾰로롱! 비읍이 네모 미음 됐어!',
    beat2Voice: '나도 네모 상자에 갇혔네, 임니다!',
    color: '#0F766E',
    skyX: 198,
    skyY: 84,
  },
  {
    key: '연락',
    skyLabel: '연락',
    ruleBadge: '유음화',
    resultDisplay: '연락 → [열락]',
    pronunciation: '열락',
    ttsReveal: '연. 락, 열락!',
    setupVoice: '반듯한 니은 위에 서 있으니까 편하다~',
    beat1Voice: '어?! 니은이 리을처럼 흐물흐물해졌어!',
    beat2Voice: '으아악 어지러워!!',
    color: '#0284C7',
    skyX: 319,
    skyY: 60,
  },
  {
    key: '설날',
    skyLabel: '설날',
    ruleBadge: '유음화',
    resultDisplay: '설날 → [설랄]',
    pronunciation: '설랄',
    ttsReveal: '설. 날, 설랄!',
    setupVoice: '리을 옆에 니은이 서 있네!',
    beat1Voice: '출렁! 니은이 리을 스프링 됐어!',
    beat2Voice: '으악! 튕겨 나간다!!',
    color: '#0EA5E9',
    skyX: 439,
    skyY: 84,
  },
  {
    key: '같이',
    skyLabel: '같이',
    ruleBadge: '구개음화',
    resultDisplay: '같이 → [가치]',
    pronunciation: '가치',
    ttsReveal: '같. 이, 가치!',
    setupVoice: '티읕이 이 모음 앞에 섰어!',
    beat1Voice: '찰칵! 치읓으로 변신!!',
    beat2Voice: '눈부셔! 카메라 플래시 맞았어!',
    color: '#E11D48',
    skyX: 560,
    skyY: 60,
  },
  {
    key: '굳이',
    skyLabel: '굳이',
    ruleBadge: '구개음화',
    resultDisplay: '굳이 → [구지]',
    pronunciation: '구지',
    ttsReveal: '굳. 이, 구지!',
    setupVoice: '이응 안에서 쉬는데 디귿이 오네?',
    beat1Voice: '디귿이 이랑 만나 뾰족 지읒 됐어!',
    beat2Voice: '아야! 뿔에 찔렸어!!',
    color: '#F43F5E',
    skyX: 681,
    skyY: 84,
  },
  {
    key: '좋아',
    skyLabel: '좋아',
    ruleBadge: 'ㅎ탈락',
    resultDisplay: '좋아 → [조아]',
    pronunciation: '조아',
    ttsReveal: '좋. 아, 조아!',
    setupVoice: '히읗 비눗방울에 매달려 볼까~',
    beat1Voice: '뽕! 히읗이 사라져버렸어!!',
    beat2Voice: '으악! 바닥에 쿵!',
    color: '#7C3AED',
    skyX: 801,
    skyY: 60,
  },
  {
    key: '많아',
    skyLabel: '많아',
    ruleBadge: 'ㅎ탈락+연음',
    resultDisplay: '많아 → [마나]',
    pronunciation: '마나',
    ttsReveal: '많. 아, 마나!',
    setupVoice: '또 힘없는 이응 안에서 꿀잠 자야지~',
    beat1Voice: '뽕! 히읗이 사라졌네?!',
    beat2Voice: '으악! 남은 니은이 굴러온다!!',
    color: '#9333EA',
    skyX: 922,
    skyY: 84,
  },
];

interface JollamanPhonology2SimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 320;
const GROUND_Y = 368;

const getActionDuration = (key: Phonology2Key): number => {
  if (key === '연락' || key === '설날') return 3.65;
  if (key === '많아') return 3.85;
  if (key === '좋아') return 3.55;
  return 3.55;
};

export const JollamanPhonology2Simulation: React.FC<JollamanPhonology2SimulationProps> = ({
  audioEnabled = true,
}) => {
  const stepSfxRef = useRef<{ key: Phonology2Key | null; maxStep: number }>({
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
    walkCycle,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick,
  } = useJollamanStageEngine<Phonology2Item, Phonology2Key>({
    seriesNum: 9,
    seriesTitle: '9. 졸라음운변동맨 2 (8종)',
    items: PHONOLOGY2_ITEMS,
    audioEnabled,
    bgmTrack: 'carol',
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
      if (item.key === '굳이' || item.key === '많아') return 505;
      if (item.key === '좋아') return 275;
      if (item.key === '연락') return 325;
      if (item.key === '입니다') return 735;
      return 695;
    },
    onSelectPreHook: (item) => {
      stepSfxRef.current = { key: item.key, maxStep: 0 };
    },
    onStartAction: (item) => {
      stepSfxRef.current = { key: item.key, maxStep: 1 };
    },
    onActionProgress: (item, t, { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }) => {
      const tracker = stepSfxRef.current;
      if (tracker.key === item.key && t >= 0.1 && tracker.maxStep < 2) {
        tracker.maxStep = 2;
        if (audioOn) playIrregularStepSfx('blink');
      }
      if (t >= 0.34 && !impactTriggered) {
        markImpact();
        if (audioOn) {
          const group = getPhonology2Group(item.key);
          if (item.key === '많아') {
            playPhonology2Sfx('hDrop');
          } else {
            const sfxType =
              group === 'nasal'
                ? 'nasal'
                : group === 'liquid'
                ? 'liquid'
                : group === 'palatal'
                ? 'palatal'
                : 'hDrop';
            playPhonology2Sfx(sfxType);
          }
        }
      }
      if (tracker.key === item.key && item.key === '많아' && t >= 0.38 && tracker.maxStep < 3) {
        tracker.maxStep = 3;
        if (audioOn) playIrregularStepSfx('blink');
      }
      if (t >= 0.62 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) {
          if (item.key === '많아') {
            playPhonologySfx('liaison');
            playCartoonImpact();
          } else if (item.key === '좋아' || item.key === '설날' || item.key === '연락') {
            playCartoonSplat();
          } else if (item.key === '굳이') {
            playCartoonImpact();
          }
        }
      }
      const completeAt =
        item.key === '설날'
          ? 0.68
          : item.key === '연락'
          ? 0.7
          : item.key === '좋아'
          ? 0.78
          : item.key === '많아'
          ? 0.84
          : 0.72;
      if (tracker.key === item.key && t >= completeAt && tracker.maxStep < 4) {
        tracker.maxStep = 4;
        if (audioOn) playIrregularStepSfx('complete');
      }
    },
  });

  const activeKey = selectedItem.key;

  const isWalkingMotion = phase === 'walking' || phase === 'approaching';
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  const jollaFacing = phase === 'walking' ? anim.walkDir : 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showRedHonkNose = false;
  let showBentoBox = false;

  if (phase === 'approaching') {
    const t = anim.objectAppear;
    if (activeKey === '굳이' || activeKey === '많아') {
      jollaY = GROUND_Y - 52 - Math.sin(t * Math.PI) * 65 - t * 64;
      jollaScaleX = 0.84;
      jollaScaleY = 0.84;
    } else if (activeKey === '좋아') {
      jollaY = GROUND_Y - 52 - t * 50;
    } else if (activeKey === '연락') {
      jollaY = GROUND_Y - 52 - t * 38;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeKey) {
      case '국물': {
        jollaX = 695;
        if (t < 0.44) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = t < 0.3 ? 'happy' : 'panic';
        } else {
          const hop = Math.abs(Math.sin(Math.min((t - 0.44) / 0.25, 1) * Math.PI)) * 34;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'dizzy';
          showRedHonkNose = true;
        }
        break;
      }
      case '입니다': {
        jollaX = 735;
        if (t < 0.48) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          jollaY = GROUND_Y - 52 + Math.sin(t * 36) * 3;
          jollaFaceMode = 'panic';
          showBentoBox = true;
        }
        break;
      }
      case '연락': {
        if (t < 0.34) {
          // Standing calmly beside/on rigid ㄴ
          jollaX = 325;
          jollaY = GROUND_Y - 52 - 38;
          jollaFaceMode = 'happy';
        } else if (t < 0.66) {
          // Wobbles wildly like jelly as ㄴ melts into wiggly ㄹ!
          const w = (t - 0.34) / 0.32;
          jollaX = 325 + w * 290 + Math.sin(w * 28) * 18;
          jollaY = GROUND_Y - 90 + w * 38;
          jollaRot = Math.sin(w * 28) * 28;
          jollaFaceMode = 'panic';
        } else {
          const tumble = Math.min((t - 0.66) / 0.2, 1);
          jollaX = 615 + tumble * 115;
          jollaY = GROUND_Y - 52 + tumble * 16;
          jollaRot = 78 * tumble;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '설날': {
        jollaX = 695;
        if (t < 0.48) {
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          // Bounced high like a trampoline by twin spring ㄹs!
          const bounce = Math.min((t - 0.48) / 0.48, 1);
          jollaX = 695 + bounce * 95;
          jollaY = GROUND_Y - 52 - Math.sin(bounce * Math.PI) * 185;
          jollaRot = bounce * 420;
          jollaFaceMode = bounce < 0.88 ? 'panic' : 'dizzy';
        }
        break;
      }
      case '같이': {
        if (t < 0.45) {
          jollaX = 695;
          jollaY = GROUND_Y - 52;
          jollaFaceMode = 'happy';
        } else {
          const blast = Math.min((t - 0.45) / 0.35, 1);
          jollaX = 695 + blast * 135;
          jollaY = GROUND_Y - 52 - Math.sin(blast * Math.PI) * 75 + blast * 16;
          jollaRot = blast * 84;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
      case '굳이': {
        if (t < 0.48) {
          jollaX = 505;
          jollaY = 252 + Math.sin(anim.walkTime * 3) * 2;
          jollaScaleX = 0.82;
          jollaScaleY = 0.82;
          jollaRot = -10;
          jollaFaceMode = 'happy';
        } else {
          const poke = Math.min((t - 0.48) / 0.42, 1);
          jollaX = 505 + poke * 265;
          jollaY = 252 - Math.sin(poke * Math.PI) * 135 + poke * 76;
          jollaRot = poke * 460;
          jollaFaceMode = poke < 0.85 ? 'panic' : 'crying';
        }
        break;
      }
      case '좋아': {
        if (t < 0.56) {
          const floatUp = Math.min(t / 0.56, 1);
          jollaX = 275 + Math.sin(t * 9) * 10;
          jollaY = 266 - floatUp * 72;
          jollaRot = Math.sin(t * 9) * 8;
          jollaFaceMode = 'happy';
        } else {
          const fall = Math.min((t - 0.56) / 0.24, 1);
          jollaX = 275;
          jollaY = 194 + fall * (GROUND_Y - 228);
          jollaRot = fall * 90;
          jollaScaleX = fall > 0.9 ? 1.25 : 1;
          jollaScaleY = fall > 0.9 ? 0.72 : 1;
          jollaFaceMode = fall > 0.85 ? 'crying' : 'panic';
        }
        break;
      }
      case '많아': {
        if (t < 0.56) {
          // Napping inside hollow ㅇ while ㅎ bubble pops on the left!
          jollaX = 505;
          jollaY = 252 + Math.sin(anim.walkTime * 3) * 2;
          jollaScaleX = 0.82;
          jollaScaleY = 0.82;
          jollaRot = -12;
          jollaFaceMode = t < 0.36 ? 'happy' : 'panic';
        } else if (t < 0.84) {
          // Knocked flying out of ㅇ when remaining ㄴ charges in (Series 8 liaison gag)!
          const knock = (t - 0.56) / 0.28;
          jollaX = 505 + knock * 270;
          jollaY = 252 - Math.sin(knock * Math.PI) * 95 + knock * 86;
          jollaRot = knock * 540;
          jollaFaceMode = 'panic';
        } else {
          jollaX = 775;
          jollaY = GROUND_Y - 38;
          jollaRot = 24;
          jollaFaceMode = 'dizzy';
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeKey) {
      case '국물':
        jollaX = 695;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'dizzy';
        showRedHonkNose = true;
        break;
      case '입니다':
        jollaX = 735;
        jollaY = GROUND_Y - 52;
        jollaFaceMode = 'panic';
        showBentoBox = true;
        break;
      case '연락':
        jollaX = 730;
        jollaY = GROUND_Y - 36;
        jollaRot = 78;
        jollaFaceMode = 'dizzy';
        break;
      case '설날':
        jollaX = 790;
        jollaY = GROUND_Y - 36;
        jollaRot = 60;
        jollaFaceMode = 'dizzy';
        break;
      case '같이':
        jollaX = 830;
        jollaY = GROUND_Y - 36;
        jollaRot = 84;
        jollaFaceMode = 'dizzy';
        break;
      case '굳이':
        jollaX = 770;
        jollaY = GROUND_Y - 38;
        jollaRot = 42;
        jollaFaceMode = 'crying';
        break;
      case '좋아':
        jollaX = 275;
        jollaY = GROUND_Y - 26;
        jollaRot = 90;
        jollaScaleX = 1.25;
        jollaScaleY = 0.72;
        jollaFaceMode = 'crying';
        break;
      case '많아':
        jollaX = 775;
        jollaY = GROUND_Y - 38;
        jollaRot = 24;
        jollaFaceMode = 'dizzy';
        break;
    }
  }

  const revealSubtitle = tRevealSubtitle(9, selectedItem.key, selectedItem.beat2Voice);
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  const actionT = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
  const mergedThreshold: Record<Phonology2Key, number> = {
    국물: 0.72,
    입니다: 0.72,
    연락: 0.7,
    설날: 0.68,
    같이: 0.72,
    굳이: 0.72,
    좋아: 0.78,
    많아: 0.84,
  };
  const mergedT = mergedThreshold[activeKey];
  const currentStep: 1 | 2 | 3 | 4 =
    phase === 'approaching' || actionT < 0.1
      ? 1
      : actionT < 0.34
      ? 2
      : phase === 'action' && actionT < mergedT
      ? 3
      : 4;

  const isBlinkWindow = phase === 'action' && actionT >= 0.1 && actionT < 0.34;
  const blinkOn = isBlinkWindow ? Math.floor((actionT - 0.1) * 28) % 2 === 0 : false;
  const isManhaNBlink = phase === 'action' && activeKey === '많아' && actionT >= 0.38 && actionT < 0.5;
  const manhaNBlinkOn = isManhaNBlink ? Math.floor((actionT - 0.38) * 32) % 2 === 0 : false;

  const blinkHintMap: Record<Phonology2Key, string> = {
    국물: "받침 'ㄱ' + 뒷 'ㅁ' 깜빡!",
    입니다: "받침 'ㅂ' + 뒷 'ㄴ' 깜빡!",
    연락: "받침 'ㄴ' + 뒷 'ㄹ' 깜빡!",
    설날: "받침 'ㄹ' + 뒷 'ㄴ' 깜빡!",
    같이: "받침 'ㅌ' + 모음 '이' 깜빡!",
    굳이: "받침 'ㄷ' + 모음 '이' 깜빡!",
    좋아: "사라질 받침 'ㅎ' 깜빡!",
    많아: "사라질 받침 'ㅎ' 먼저 깜빡!",
  };

  const stepHudTextMap: Record<1 | 2 | 3 | 4, string> = {
    1: `1단계: 원래 글자 '${selectedItem.skyLabel}' 등장!`,
    2: `2단계: ${blinkHintMap[activeKey]}`,
    3:
      activeKey === '많아' && actionT >= 0.38 && actionT < 0.5
        ? "3단계: 남은 'ㄴ' + 빈 'ㅇ' 깜빡!!"
        : `3단계: ${selectedItem.ruleBadge} 변신 중!!`,
    4: `4단계: [${selectedItem.pronunciation}] 발음 완성!!`,
  };

  const renderPhonologyBlink = (
    text: string,
    x: number,
    y: number,
    size: number,
    baseColor: string,
    rx = 40,
    ry = 40,
    active = isBlinkWindow,
    pulseOn = blinkOn
  ) => {
    const scale = active ? (pulseOn ? 1.13 : 0.96) : 1;
    const fill = active && pulseOn ? '#EA580C' : baseColor;
    const stroke = active && pulseOn ? '#FEF08A' : '#FFFFFF';
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`}>
        {active && <PhonologyBlinkRingSvg blinkOn={pulseOn} color={baseColor} rx={rx} ry={ry} />}
        <g opacity={active ? (pulseOn ? 1 : 0.42) : 1}>
          <GiantHangulSvg text={text} size={size} fill={fill} stroke={stroke} strokeWidth={10} />
        </g>
      </g>
    );
  };

  return (
    <JollamanStageShell
      icon="🧪"
      title="9. 졸라음운변동맨 2 (8종)"
      accentButtonClass="bg-teal-600 hover:bg-teal-700"
      stageBgClass="bg-teal-50"
      ariaLabel="졸라맨 9 음운 변동 2탄 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'carol',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-teal-50 text-teal-700 border-teal-200 hover:bg-teal-100',
        activeLabel: '🎵 쇼츠밈 BGM 켜짐',
        title: '하이퍼 코믹 쇼츠 밈 배경음악 켜기/끄기',
      }}
      items={PHONOLOGY2_ITEMS}
      selectedItem={selectedItem}
      learnedKeys={learnedKeys}
      getKey={(item) => item.key}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      skyTokenStyle="pill"
      pillWidth={92}
      pillHeight={48}
      getTokenText={(item) => item.skyLabel}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={620}
      walkingHint="하늘의 음운 변동 (국물 ~ 많아)을 눌러보세요!"
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
          meaning: tWordMeaning(9, selectedItem.key, SERIES9_MEANINGS[selectedItem.key]),
          romanization: romanizeKorean(selectedItem.pronunciation),
          cornerIcon: getSeriesCornerIcon(9, selectedItem.key, anim.walkTime),
        };
      })()}
      backdropSlot={
        <Phonology2Backdrop
          activeKey={phase === 'walking' ? PHONOLOGY2_ITEMS[0].key : activeKey}
          isWalkingMode={false}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >
          {phase !== 'walking' && (
            <PhonologyStepHudSvg
              step={currentStep}
              stepText={stepHudTextMap[currentStep]}
              accentColor={selectedItem.color}
              centerX={activeKey === '국물' ? 286 : 460}
              y={activeKey === '국물' ? 122 : 126}
            />
          )}

          {/* 3. GIANT INTERACTIVE PHONOLOGY LETTERS & SLAPSTICK MECHANICS */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* MECHANIC 1A: 국물 -> [궁물] (Properly vertical 물 with tiny poop + stink fumes atop ㅁ! ㄱ touches ㅁ and turns into ㅇ!) */}
              {activeKey === '국물' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const movingToM = t >= 0.14 && t < 0.44;
                const touchedM = t >= 0.44 && t < 0.72;
                const merged = t >= 0.72;

                let consX = 278;
                let consY = 318;
                if (movingToM) {
                  const p = (t - 0.14) / 0.3;
                  consX = 278 + p * 164;
                  consY = 318 - p * 124;
                } else if (touchedM) {
                  const back = Math.min((t - 0.44) / 0.24, 1);
                  consX = 442 - back * 164;
                  consY = 194 + back * 124;
                }

                return (
                  <g>
                    {!merged ? (
                      <g>
                        {/* Left static CV: 구 */}
                        <g transform="translate(272, 214)">
                          <GiantHangulSvg text="구" size={156} fill="#1E293B" />
                        </g>

                        {/* Properly stacked vertical '물': ㅁ on top, ㅜ below ㅁ, ㄹ below ㅜ */}
                        {renderPhonologyBlink('ㅁ', 520, 184, 114, '#0F766E', 42, 38)}
                        <g transform="translate(520, 132)">
                          <TinyPoopWithFumesSvg walkTime={anim.walkTime} />
                        </g>
                        <g transform="translate(520, 248)">
                          <GiantHangulSvg text="ㅜ" size={122} fill="#1E293B" />
                        </g>
                        <g transform="translate(520, 316)">
                          <GiantHangulSvg text="ㄹ" size={108} fill="#1E293B" />
                        </g>

                        {/* Participating batchim ㄱ walks to touch ㅁ, INSTANTLY turns into ㅇ on contact! */}
                        {renderPhonologyBlink(
                          touchedM ? 'ㅇ' : 'ㄱ',
                          consX,
                          consY,
                          116,
                          touchedM ? '#0D9488' : '#EA580C',
                          40,
                          38
                        )}
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(310, 244)">
                          <PhonologySparkleBurstSvg color="#0D9488" progress={1} />
                          <GiantHangulSvg text="궁" size={186} fill="#0D9488" />
                        </g>
                        <g transform="translate(505, 244)">
                          <GiantHangulSvg text="물" size={186} fill="#1E293B" />
                          <g transform="translate(0, -104)">
                            <TinyPoopWithFumesSvg walkTime={anim.walkTime} />
                          </g>
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC 1B: 입니다 -> [임니다] (Everyday #1 Korean word: ㅂ touches ㄴ and morphs into square ㅁ!) */}
              {activeKey === '입니다' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const moving = t >= 0.16 && t < 0.44;
                const morphed = t >= 0.44 && t < 0.72;
                const merged = t >= 0.72;

                let consX = 232;
                let consY = 322;
                if (moving) {
                  const p = (t - 0.16) / 0.28;
                  consX = 232 + p * 145;
                  consY = 322 - p * 82;
                } else if (morphed) {
                  const back = Math.min((t - 0.44) / 0.24, 1);
                  consX = 377 - back * 145;
                  consY = 240 + back * 82;
                }

                return (
                  <g>
                    {!merged ? (
                      <g>
                        <g transform="translate(226, 214)">
                          <GiantHangulSvg text="이" size={156} fill="#1E293B" />
                        </g>
                        {renderPhonologyBlink(
                          morphed ? 'ㅁ' : 'ㅂ',
                          consX,
                          consY,
                          118,
                          morphed ? '#0D9488' : '#EA580C',
                          40,
                          38
                        )}
                        {renderPhonologyBlink('니', 445, 244, 172, '#0F766E', 54, 54)}
                        <g transform="translate(595, 244)">
                          <GiantHangulSvg text="다" size={172} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(245, 244)">
                          <PhonologySparkleBurstSvg color="#0D9488" progress={1} />
                          <GiantHangulSvg text="임" size={184} fill="#0D9488" />
                        </g>
                        <g transform="translate(425, 244)">
                          <GiantHangulSvg text="니" size={180} fill="#1E293B" />
                        </g>
                        <g transform="translate(595, 244)">
                          <GiantHangulSvg text="다" size={180} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC 2A: 연락 -> [열락] (Rigid ㄴ touches curvy ㄹ, melts & wobbles like a noodle into ㄹ!) */}
              {activeKey === '연락' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const melted = t >= 0.34;
                const merged = t >= 0.7;
                const wobbleRot = melted && !merged && phase === 'action' ? Math.sin(t * 42) * 18 : 0;

                return (
                  <g>
                    {!merged ? (
                      <g>
                        <g transform="translate(265, 214)">
                          <GiantHangulSvg text="여" size={156} fill="#1E293B" />
                        </g>
                        {/* Only batchim ㄴ melts & wobbles into wavy ㄹ */}
                        <g transform={`rotate(${wobbleRot}, 275, 318)`}>
                          {renderPhonologyBlink(
                            melted ? 'ㄹ' : 'ㄴ',
                            275,
                            318,
                            122,
                            melted ? '#0284C7' : '#EA580C',
                            42,
                            38
                          )}
                        </g>
                        {/* Second syllable decomposed so ㄹ stands out clearly */}
                        <g transform={`rotate(${-wobbleRot * 0.6}, 495, 216)`}>
                          {renderPhonologyBlink('ㄹ', 495, 216, 126, '#0284C7', 42, 42)}
                        </g>
                        <g transform="translate(576, 224)">
                          <GiantHangulSvg text="ㅏ" size={142} fill="#1E293B" />
                        </g>
                        <g transform="translate(532, 320)">
                          <GiantHangulSvg text="ㄱ" size={110} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(320, 244)">
                          <PhonologySparkleBurstSvg color="#0284C7" progress={1} />
                          <GiantHangulSvg text="열" size={186} fill="#0284C7" />
                        </g>
                        <g transform="translate(515, 244)">
                          <GiantHangulSvg text="락" size={186} fill="#0EA5E9" />
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC 2B: 설날 -> [설랄] (Wavy ㄹ turns rigid ㄴ into bouncing twin ㄹ spring!) */}
              {activeKey === '설날' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const bounced = t >= 0.34;
                const merged = t >= 0.68;
                const springScaleY = bounced && phase === 'action' ? 1 + Math.sin(t * 42) * 0.16 : 1;

                return (
                  <g>
                    {!merged ? (
                      <g>
                        <g transform="translate(265, 214)">
                          <GiantHangulSvg text="서" size={156} fill="#1E293B" />
                        </g>
                        <g transform={`translate(275, 318) scale(1, ${springScaleY})`}>
                          {renderPhonologyBlink('ㄹ', 0, 0, 120, '#0284C7', 42, 38)}
                        </g>
                        {/* Only onset ㄴ transforms into wavy spring ㄹ */}
                        <g transform={`translate(485, 224) scale(1, ${springScaleY})`}>
                          {renderPhonologyBlink(
                            bounced ? 'ㄹ' : 'ㄴ',
                            0,
                            0,
                            128,
                            bounced ? '#0EA5E9' : '#EA580C',
                            44,
                            42
                          )}
                        </g>
                        <g transform="translate(572, 224)">
                          <GiantHangulSvg text="ㅏ" size={142} fill="#1E293B" />
                        </g>
                        <g transform="translate(530, 320)">
                          <GiantHangulSvg text="ㄹ" size={110} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(315, 244)">
                          <GiantHangulSvg text="설" size={186} fill="#0284C7" />
                        </g>
                        <g transform="translate(510, 244)">
                          <PhonologySparkleBurstSvg color="#0EA5E9" progress={1} />
                          <GiantHangulSvg text="랄" size={186} fill="#0EA5E9" />
                        </g>
                      </g>
                    )}

                  </g>
                );
              })()}

              {/* MECHANIC 3A & 3B: 구개음화 (같이 -> [가치], 굳이 -> [구지]) */}
              {(activeKey === '같이' || activeKey === '굳이') && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const isGachi = activeKey === '같이';
                const sliding = t >= 0.16 && t < 0.45;
                const flashed = t >= 0.45 && t < 0.72;
                const merged = t >= 0.72;

                const slideP = sliding ? (t - 0.16) / 0.29 : t >= 0.45 ? 1 : 0;
                const consX = 275 + slideP * 225;
                const consY = 320 - slideP * 76;

                return (
                  <g>
                    {!merged ? (
                      <g>
                        <g transform="translate(265, 214)">
                          <GiantHangulSvg text={isGachi ? '가' : '구'} size={156} fill="#1E293B" />
                        </g>

                        {!flashed && (
                          <g transform="translate(505, 246)">
                            {isBlinkWindow && (
                              <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#E11D48" rx={58} ry={58} />
                            )}
                            <GiantHollowIeungSvg radius={52} />
                          </g>
                        )}
                        {renderPhonologyBlink('ㅣ', 592, 244, 172, '#1E293B', 32, 62)}

                        {renderPhonologyBlink(
                          flashed
                            ? isGachi
                              ? 'ㅊ'
                              : 'ㅈ'
                            : isGachi
                            ? 'ㅌ'
                            : 'ㄷ',
                          consX,
                          consY,
                          134,
                          flashed ? '#E11D48' : '#EA580C',
                          44,
                          44
                        )}
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(320, 244)">
                          <GiantHangulSvg text={isGachi ? '가' : '구'} size={184} fill="#1E293B" />
                        </g>
                        <g transform="translate(515, 244)">
                          <PhonologySparkleBurstSvg color="#E11D48" progress={1} />
                          <GiantHangulSvg
                            text={isGachi ? '치' : '지'}
                            size={194}
                            fill="#E11D48"
                          />
                        </g>
                      </g>
                    )}

                    {flashed && phase === 'action' && (
                      <g transform="translate(548, 238)">
                        {isGachi ? (
                          <CameraFlashBurstSvg scale={1.1 + Math.sin(t * 36) * 0.2} />
                        ) : (
                          <ElectricZapSvg color="#FACC15" />
                        )}
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* MECHANIC 4A: 좋아 -> [조아] (ㅎ inflates into a soap bubble while Jollaman hangs on, then POPS!) */}
              {activeKey === '좋아' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const inflating = t < 0.56;
                const popped = t >= 0.56;
                const bubbleProgress = inflating ? t / 0.56 : 1;
                const popAnim = popped ? Math.min((t - 0.56) / 0.28, 1) : 0;

                const ahX = popped ? 550 - Math.min((t - 0.56) / 0.34, 1) * 55 : 550;

                return (
                  <g>
                    <g transform={`translate(${275 + (popped ? 45 : 0)}, 222)`}>
                      {t >= 0.78 && <PhonologySparkleBurstSvg color="#7C3AED" progress={1} />}
                      <GiantHangulSvg text="조" size={182} fill="#1E293B" />
                    </g>
                    <g transform={`translate(${ahX}, 238)`}>
                      {t >= 0.78 && <PhonologySparkleBurstSvg color="#A855F7" progress={1} />}
                      <GiantHangulSvg text="아" size={182} fill="#7C3AED" />
                    </g>

                    {inflating && (
                      <g
                        transform={`translate(275, ${318 - bubbleProgress * 78}) scale(${
                          (1 + bubbleProgress * 0.42) * (isBlinkWindow ? (blinkOn ? 1.09 : 0.96) : 1)
                        })`}
                      >
                        {isBlinkWindow && (
                          <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#7C3AED" rx={68} ry={68} />
                        )}
                        <circle
                          cx="0"
                          cy="0"
                          r="64"
                          fill={isBlinkWindow && blinkOn ? '#FEF08A' : '#E0E7FF'}
                          fillOpacity={isBlinkWindow ? (blinkOn ? 0.65 : 0.3) : 0.45}
                          stroke={isBlinkWindow && blinkOn ? '#F59E0B' : '#8B5CF6'}
                          strokeWidth={isBlinkWindow && blinkOn ? 5.5 : 4}
                        />
                        <GiantHangulSvg
                          text="ㅎ"
                          size={108}
                          fill={isBlinkWindow && blinkOn ? '#EA580C' : '#7C3AED'}
                        />
                      </g>
                    )}

                    {popped && popAnim < 0.98 && phase === 'action' && (
                      <g transform="translate(275, 240)">
                        <SoapBubblePopSvg progress={popAnim} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* MECHANIC 4B: 많아 -> [마나] (Combo! First ㅎ soap bubble POPS & vanishes, then remaining ㄴ liaison charges into hollow ㅇ!) */}
              {activeKey === '많아' && (() => {
                const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
                const hInflating = t < 0.36;
                const hPopped = t >= 0.36;
                const hPopAnim = hPopped ? Math.min((t - 0.36) / 0.2, 1) : 0;

                const nCharging = t >= 0.48 && t < 0.84;
                const merged = t >= 0.84;

                let nX = 250;
                let nY = 320;
                let nRot = 0;
                if (nCharging && phase === 'action') {
                  const p = (t - 0.48) / 0.36;
                  nX = 250 + p * 245;
                  nY = 320 - Math.abs(Math.sin(p * Math.PI * 2.5)) * 28 - p * 84;
                  nRot = p * 540;
                }

                const ieungFly = t >= 0.56 ? Math.min((t - 0.56) / 0.28, 1) : 0;

                return (
                  <g>
                    {/* Left static CV '마' */}
                    <g transform="translate(268, 222)">
                      <GiantHangulSvg text="마" size={168} fill="#1E293B" />
                    </g>

                    {/* Inflating & popping ㅎ bubble */}
                    {hInflating && (
                      <g
                        transform={`translate(322, ${318 - (t / 0.36) * 44}) scale(${
                          (1 + (t / 0.36) * 0.35) * (isBlinkWindow ? (blinkOn ? 1.1 : 0.96) : 1)
                        })`}
                      >
                        {isBlinkWindow && (
                          <PhonologyBlinkRingSvg blinkOn={blinkOn} color="#7C3AED" rx={56} ry={56} />
                        )}
                        <circle
                          cx="0"
                          cy="0"
                          r="52"
                          fill={isBlinkWindow && blinkOn ? '#FEF08A' : '#E0E7FF'}
                          fillOpacity={isBlinkWindow ? (blinkOn ? 0.65 : 0.3) : 0.45}
                          stroke={isBlinkWindow && blinkOn ? '#F59E0B' : '#8B5CF6'}
                          strokeWidth={isBlinkWindow && blinkOn ? 5 : 3.5}
                        />
                        <GiantHangulSvg
                          text="ㅎ"
                          size={92}
                          fill={isBlinkWindow && blinkOn ? '#EA580C' : '#7C3AED'}
                        />
                      </g>
                    )}
                    {hPopped && hPopAnim < 0.98 && phase === 'action' && (
                      <g transform="translate(322, 274)">
                        <SoapBubblePopSvg progress={hPopAnim} />
                      </g>
                    )}

                    {/* Remaining ㄴ charges across into hollow ㅇ (Series 8 liaison gag!) */}
                    {!merged && (
                      <g transform={`rotate(${nRot}, ${nX}, ${nY})`}>
                        {renderPhonologyBlink(
                          'ㄴ',
                          nX,
                          nY,
                          114,
                          '#EA580C',
                          40,
                          38,
                          isManhaNBlink,
                          manhaNBlinkOn
                        )}
                      </g>
                    )}

                    {/* Right syllable: Hollow ㅇ + ㅏ -> 나! */}
                    {!merged ? (
                      <g>
                        {ieungFly < 0.95 && (
                          <g
                            transform={`translate(${505 - ieungFly * 90}, ${246 - ieungFly * 180}) rotate(${-ieungFly * 210}) scale(${1 - ieungFly * 0.4})`}
                            opacity={1 - ieungFly}
                          >
                            {isManhaNBlink && (
                              <PhonologyBlinkRingSvg blinkOn={manhaNBlinkOn} color="#9333EA" rx={58} ry={58} />
                            )}
                            <GiantHollowIeungSvg radius={54} cracked={ieungFly > 0} />
                          </g>
                        )}
                        <g transform="translate(595, 248)">
                          <GiantHangulSvg text="ㅏ" size={172} fill="#1E293B" />
                        </g>
                      </g>
                    ) : (
                      <g transform="translate(525, 242)">
                        <PhonologySparkleBurstSvg color="#9333EA" progress={1} />
                        <GiantHangulSvg text="나" size={188} fill="#7C3AED" />
                      </g>
                    )}

                    {t < 0.36 && phase === 'action' && (
                      <text x="505" y="168" textAnchor="middle" fontSize="18" fontWeight="900" fill="#475569">
                        Zzz
                      </text>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* 4. MAIN JOLLAMAN STICK FIGURE */}
          <g
            transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing * jollaScaleX}, ${jollaScaleY})`}
            onClick={toggleJollaPause}
            className="cursor-pointer"
          >
            <rect x="-48" y="-76" width="96" height="132" fill="transparent" />
            {jollaRot === 0 && jollaY < GROUND_Y && (
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
            {showRedHonkNose && <GiantNoseOverlaySvg pulse={1 + Math.sin(anim.walkTime * 16) * 0.14} />}
            {showBentoBox && (
              <g>
                <rect
                  x="-42"
                  y="-64"
                  width="84"
                  height="118"
                  rx="4"
                  fill="none"
                  stroke="#0F766E"
                  strokeWidth="12"
                />
                <rect
                  x="-42"
                  y="-64"
                  width="84"
                  height="118"
                  rx="4"
                  fill="#99F6E4"
                  fillOpacity="0.18"
                />
              </g>
            )}
            {(phase === 'aftermath' || phase === 'reveal') &&
              (activeKey === '국물' ||
                activeKey === '연락' ||
                activeKey === '설날' ||
                activeKey === '같이' ||
                activeKey === '많아') && (
                <DizzyStarOrbitSvg walkTime={anim.walkTime} />
              )}
          </g>

    </JollamanStageShell>
  );
};
