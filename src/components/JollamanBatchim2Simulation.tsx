import React from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playBatchim2Sfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';
import {
  JollamanCharacterSvg,
  JollamanFaceMode,
  DizzyStarOrbitSvg,
  ComicImpactBurstSvg,
  SparkleBurstSvg,
} from './JollamanSprites';
import {
  Batchim2Key,
  Batchim2Backdrop,
  BatchimTransformOverlaySvg,
  ComicExclaimSvg,
  SlammedPorchDoorSvg,
  FreezingWindAndMorphSvg,
  FrozenJollamanIceCubeSvg,
  StiffStarchedShirtSvg,
  BlazingDaySunSvg,
  MeltingJieutCanopySvg,
  GiantBloomingFlowerPotSvg,
  CheekyFlowerBeeSvg,
  ScatteredPetalsMoundSvg,
  KitchenFlipPanSvg,
  GiantCastIronSkilletSvg,
  KieukDoughAndSnapSvg,
  ChefHatSvg,
  GiantFarmRadishSvg,
  FarmDirtPitMoundSvg,
  PieupForestTentSvg,
  GiantPineconeSvg,
  TreasureChestGiantDigutSvg,
  TreasureCrashPileSvg,
  MagicHangulMirrorSvg,
  ShyHieutGhostSvg,
  DigutKnightHelmSvg,
} from './JollamanSprites6';

const SERIES6_MEANINGS: Record<Batchim2Key, string> = {
  'ㄲ': 'Outside',
  'ㅅ': 'Clothes',
  'ㅈ': 'Daytime',
  'ㅊ': 'Flower',
  'ㅋ': 'Kitchen',
  'ㅌ': 'Farm Field',
  'ㅍ': 'Forest',
  'ㅆ': 'To Exist / Have',
  'ㅎ': "Hieut (Letter 'ㅎ')",
};

const Batchim2TransformGlyph: React.FC<{
  origChar: string;
  repSound: string;
  accentColor: string;
  active: boolean;
}> = ({ origChar, repSound, accentColor, active }) => {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    if (!active) {
      setProgress(0);
      return;
    }
    setProgress(0);
    let rafId = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = (now - start) / 1000;
      const p = Math.max(0, Math.min(1, (elapsed - 0.25) / 0.65));
      setProgress(p);
      if (elapsed < 1.0) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, origChar, repSound]);

  const ease = 1 - Math.pow(1 - progress, 3);

  return (
    <span className="relative inline-flex items-center justify-center gap-2 leading-none select-none">
      <span
        className="inline-block font-black"
        style={{
          color: '#64748B',
          opacity: 1 - ease * 0.48,
          transform: `scale(${1 - ease * 0.18})`,
        }}
      >
        {origChar}
      </span>
      <span
        aria-hidden="true"
        className="inline-block font-black text-slate-400"
        style={{
          fontSize: '0.58em',
          transform: `translateX(${ease * 2}px)`,
        }}
      >
        ➔
      </span>
      <span
        className="inline-block font-black"
        style={{
          color: accentColor,
          transform: `scale(${0.92 + ease * 0.26})`,
          filter: ease > 0.35 ? `drop-shadow(0 0 8px ${accentColor}55)` : undefined,
        }}
      >
        {repSound}
      </span>
    </span>
  );
};

export interface Batchim2Item {
  char: Batchim2Key;
  repSound: string;
  soundLabel: string;
  triggerWord: string;
  pronunciation: string;
  sampleSyllable: string;
  gagSummary: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const BATCHIM2_ITEMS: Batchim2Item[] = [
  {
    char: 'ㅋ',
    soundLabel: '받침 ㅋ → [ㄱ]',
    repSound: 'ㄱ',
    triggerWord: '부엌',
    pronunciation: '부억',
    sampleSyllable: '엌',
    gagSummary: '부엌에서 화려하게 팬케이크를 뒤집다 ㅋ의 가운데 막대가 뚝! 부러지며 [ㄱ]만 남아 머리 위로 철푸덕!!',
    color: '#0284C7',
    skyX: 90,
    skyY: 62,
  },
  {
    char: 'ㄲ',
    soundLabel: '받침 ㄲ → [ㄱ]',
    repSound: 'ㄱ',
    triggerWord: '밖',
    pronunciation: '박',
    sampleSyllable: '밖',
    gagSummary: '현관문 밖 눈보라에 문까지 찰칵 잠기자 쌍기역(ㄲ)이 오들오들 얼어붙어 [ㄱ] 하나로 합체한다!!',
    color: '#2563EB',
    skyX: 192,
    skyY: 84,
  },
  {
    char: 'ㅌ',
    soundLabel: '받침 ㅌ → [ㄷ]',
    repSound: 'ㄷ',
    triggerWord: '밭',
    pronunciation: '받',
    sampleSyllable: '밭',
    gagSummary: '밭에서 대왕 무를 뽑다 ㅌ 가운데 줄이 뻥! 떨어져 나가 [ㄷ]으로 변신하고 반동으로 밭고랑에 거꾸로 푹!!',
    color: '#D97706',
    skyX: 295,
    skyY: 60,
  },
  {
    char: 'ㅅ',
    soundLabel: '받침 ㅅ → [ㄷ]',
    repSound: 'ㄷ',
    triggerWord: '옷',
    pronunciation: '옫',
    sampleSyllable: '옷',
    gagSummary: '풀 먹여 빳빳한 새 옷을 입자마자 ㅅ 목깃이 네모 ㄷ 철갑처럼 굳어버려 통나무처럼 앞으로 쿵 쓰러진다!!',
    color: '#E11D48',
    skyX: 397,
    skyY: 84,
  },
  {
    char: 'ㅆ',
    soundLabel: '받침 ㅆ → [ㄷ]',
    repSound: 'ㄷ',
    triggerWord: '있다',
    pronunciation: '읻따',
    sampleSyllable: '있',
    gagSummary: '보물상자가 "여기 뭐가 있다~!" 약올리더니 대왕 [ㄷ] 스탬프가 쾅!! 튀어나와 ㅆ을 [ㄷ]으로 바꿔버린다!!',
    color: '#DC2626',
    skyX: 500,
    skyY: 60,
  },
  {
    char: 'ㅈ',
    soundLabel: '받침 ㅈ → [ㄷ]',
    repSound: 'ㄷ',
    triggerWord: '낮',
    pronunciation: '낟',
    sampleSyllable: '낮',
    gagSummary: '12시 대낮의 이글거리는 태양열에 뾰족한 ㅈ 지붕이 녹아내려 납작한 [ㄷ] 그늘막으로 변신한다!!',
    color: '#EA580C',
    skyX: 602,
    skyY: 84,
  },
  {
    char: 'ㅊ',
    soundLabel: '받침 ㅊ → [ㄷ]',
    repSound: 'ㄷ',
    triggerWord: '꽃',
    pronunciation: '꼳',
    sampleSyllable: '꽃',
    gagSummary: '꽃향기를 맡으려다 꼭대기 꿀벌이 윙~ 날아가 ㅊ 윗점이 빠지더니 코를 쏘여 ㄷ 화분 속에 거꾸로 빠진다!!',
    color: '#DB2777',
    skyX: 705,
    skyY: 62,
  },
  {
    char: 'ㅎ',
    soundLabel: '받침 ㅎ → [ㄷ]',
    repSound: 'ㄷ',
    triggerWord: '히읗',
    pronunciation: '히읃',
    sampleSyllable: '읗',
    gagSummary: '끝소리가 약해 떨던 유령 ㅎ이 마법 거울 앞에서 황금 [ㄷ] 기사 투구를 장착해 [히읃]으로 당당히 변신!!',
    color: '#B91C1C',
    skyX: 807,
    skyY: 84,
  },
  {
    char: 'ㅍ',
    soundLabel: '받침 ㅍ → [ㅂ]',
    repSound: 'ㅂ',
    triggerWord: '숲',
    pronunciation: '숩',
    sampleSyllable: '숲',
    gagSummary: '숲속 ㅍ 텐트 위로 거대 솔방울이 쿵!! 떨어지자 삐죽 나온 처마가 안으로 접혀 네모 [ㅂ] 텐트가 된다!!',
    color: '#059669',
    skyX: 910,
    skyY: 62,
  },
];

interface JollamanBatchim2SimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 320;
const GROUND_Y = 368;

const IMPACT_AT: Record<Batchim2Key, number> = {
  'ㄲ': 0.36,
  'ㅅ': 0.34,
  'ㅈ': 0.34,
  'ㅊ': 0.42,
  'ㅋ': 0.46,
  'ㅌ': 0.40,
  'ㅍ': 0.40,
  'ㅆ': 0.44,
  'ㅎ': 0.44,
};

const getActionDuration = (char: Batchim2Key): number => {
  switch (char) {
    case 'ㄲ':
      return 2.4;
    case 'ㅅ':
      return 2.4;
    case 'ㅈ':
      return 2.35;
    case 'ㅊ':
      return 2.35;
    case 'ㅋ':
      return 2.55;
    case 'ㅌ':
      return 2.5;
    case 'ㅍ':
      return 2.45;
    case 'ㅆ':
      return 2.45;
    case 'ㅎ':
      return 2.4;
  }
};

export const JollamanBatchim2Simulation: React.FC<JollamanBatchim2SimulationProps> = ({
  audioEnabled = true,
}) => {
  const {
    phase,
    selectedItem,
    learnedKeys: learnedChars,
    bgmEnabled,
    setBgmEnabled,
    anim,
    walkCycle,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick,
  } = useJollamanStageEngine<Batchim2Item, Batchim2Key>({
    seriesNum: 6,
    seriesTitle: '6. 졸라받침맨 2 (끝소리 변신)',
    items: BATCHIM2_ITEMS,
    audioEnabled,
    bgmTrack: 'retro2d',
    initialWalkX: 160,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    scrollSpeedOnApproach: 360,
    aftermathAnimMaxDur: 1.2,
    playPopOnSelect: true,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.triggerWord} [${item.pronunciation}]`,
    getBadge: (item) => item.soundLabel,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) =>
      item.char === 'ㅎ'
        ? '받침 히으슨 ㄷ 소리, 히읗!'
        : `받침 ${item.char}은 ${item.repSound} 소리, ${item.triggerWord}!`,
    getActionDuration: (item) => getActionDuration(item.char),
    onStartAction: (item, audioOn) => {
      if (audioOn) {
        playBatchim2Sfx(item.char, 'setup');
      }
    },
    onActionProgress: (
      item,
      t,
      { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }
    ) => {
      if (t >= IMPACT_AT[item.char] && !impactTriggered) {
        markImpact();
        if (audioOn) {
          playBatchim2Sfx(item.char, 'impact');
          if (item.char === 'ㅅ' || item.char === 'ㅋ' || item.char === 'ㅍ' || item.char === 'ㅆ' || item.char === 'ㅎ') {
            playCartoonImpact();
          } else {
            playCartoonSplat();
          }
        }
      }

      if (item.char === 'ㅅ' && t >= 0.64 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonImpact();
      } else if (item.char === 'ㅈ' && t >= 0.68 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      } else if (item.char === 'ㅊ' && t >= 0.68 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      } else if (item.char === 'ㅌ' && t >= 0.72 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      }
    },
    onAftermathStart: (item, audioOn) => {
      if (audioOn && (item.char === 'ㅆ' || item.char === 'ㅋ')) {
        playCartoonSplat();
      }
    },
  });

  const activeChar = selectedItem.char;
  const isUpsideDownKick =
    activeChar === 'ㅌ' &&
    ((phase === 'action' && anim.actionT >= 0.72) || phase === 'aftermath' || phase === 'reveal');
  const isWalkingMotion =
    phase === 'walking' ||
    phase === 'approaching' ||
    (activeChar === 'ㄲ' && phase === 'action' && anim.actionT < 0.18) ||
    (activeChar === 'ㅅ' && phase === 'action' && anim.actionT >= 0.34 && anim.actionT < 0.64) ||
    isUpsideDownKick;

  const legSwing = isUpsideDownKick
    ? Math.sin(anim.walkTime * 22) * 14
    : activeChar === 'ㅅ' && phase === 'action' && anim.actionT >= 0.34 && anim.actionT < 0.64
    ? Math.sin(anim.actionT * 24) * 5 // Stiff awkward robot waddle
    : isWalkingMotion
    ? Math.sin(walkCycle) * 18
    : 0;
  const armSwing =
    activeChar === 'ㅅ' && phase === 'action' && anim.actionT >= 0.34 && anim.actionT < 0.64
      ? 0
      : isWalkingMotion
      ? Math.sin(walkCycle + Math.PI) * 16
      : 0;
  const bounceY =
    phase === 'walking' || phase === 'approaching' || (activeChar === 'ㄲ' && phase === 'action' && anim.actionT < 0.18)
      ? Math.abs(Math.sin(walkCycle)) * 4
      : 0;
  const jollaFacing =
    phase === 'walking'
      ? anim.walkDir
      : phase === 'approaching'
      ? ACTION_SPOT_X >= anim.approachStartX
        ? 1
        : -1
      : 1;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showHeadBump = false;
  let headOnFire = false;
  let showXraySkeleton = false;

  if (phase === 'walking' || phase === 'approaching') {
    jollaFaceMode = 'happy';
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㄲ': {
        if (t < 0.18) {
          jollaX = ACTION_SPOT_X - 65 + (t / 0.18) * 65;
          jollaFaceMode = 'happy';
        } else if (t < 0.36) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 72) * 4;
        } else {
          // Shivering inside solid ice cube, bent slightly in 'ㄱ' chill!
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X - 18 + Math.sin(t * 50) * 1.8;
          jollaRot = -14;
        }
        break;
      }
      case 'ㅅ': {
        if (t < 0.34) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X;
        } else if (t < 0.64) {
          // Stiff boxy 'ㄷ' shirt locks arms & torso -> waddles stiffly!
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 28) * 4;
          jollaRot = Math.sin(t * 16) * 5;
        } else if (t < 0.78) {
          const fallT = (t - 0.64) / 0.14;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 52 + fallT * 34;
          jollaRot = fallT * 88;
        } else {
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 18;
          jollaRot = 88;
        }
        break;
      }
      case 'ㅈ': {
        if (t < 0.34) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X;
        } else if (t < 0.68) {
          // Intense noon heat melts 'ㅈ' roof downward; Jollaman sweats & chars slightly!
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 48) * 3;
          jollaY = GROUND_Y - 52 + ((t - 0.34) / 0.34) * 12;
        } else {
          // Flopped exhausted underneath the new flat [ㄷ] shade shelter!
          jollaFaceMode = 'burnt';
          jollaX = ACTION_SPOT_X - 4;
          jollaY = GROUND_Y - 18;
          jollaRot = -86;
        }
        break;
      }
      case 'ㅊ': {
        if (t < 0.24) {
          // Leans in happily to sniff the flower
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X + 20;
          jollaRot = 12;
        } else if (t < 0.42) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 10;
          jollaRot = -6;
        } else if (t < 0.68) {
          // Booped by bee -> vaults backward and lands in pot!
          const flyT = (t - 0.42) / 0.26;
          jollaFaceMode = 'panic';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X + 10 - flyT * 44;
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 76 + flyT * 34;
          jollaRot = -260 * flyT;
        } else {
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X - 34;
          jollaY = GROUND_Y - 18;
          jollaRot = -86;
        }
        break;
      }
      case 'ㅋ': {
        if (t < 0.30) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X;
        } else if (t < 0.46) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 45) * 3;
        } else {
          // Squashed pancake-flat with steaming butter pancake hat!
          const sq = Math.min((t - 0.46) / 0.14, 1);
          jollaFaceMode = 'squashed';
          jollaY = GROUND_Y - 52 + sq * 37;
          jollaScaleX = 1 + sq * 0.68;
          jollaScaleY = 1 - sq * 0.72;
        }
        break;
      }
      case 'ㅌ': {
        if (t < 0.40) {
          jollaFaceMode = 'headClutch';
          jollaX = ACTION_SPOT_X + Math.sin(t * 50) * 5;
          jollaRot = -22;
        } else if (t < 0.72) {
          const ft = (t - 0.40) / 0.32;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - ft * 110;
          jollaY = GROUND_Y - 52 - Math.sin(ft * Math.PI) * 145 + ft * 30;
          jollaRot = -540 * ft;
        } else {
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X - 110;
          jollaY = GROUND_Y - 22;
          jollaRot = 180;
        }
        break;
      }
      case 'ㅍ': {
        if (t < 0.24) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X;
        } else if (t < 0.40) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 52) * 3;
        } else {
          // Squashed neatly inside folded [ㅂ] tent peeking out!
          const sq = Math.min((t - 0.40) / 0.16, 1);
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 52 + sq * 22;
        }
        break;
      }
      case 'ㅆ': {
        if (t < 0.28) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X + 12;
        } else if (t < 0.44) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 4;
          jollaRot = -10;
        } else if (t < 0.78) {
          const flyT = (t - 0.44) / 0.34;
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X + 4 - flyT * 165;
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 116 + flyT * 36;
          jollaRot = -760 * flyT;
        } else {
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X - 161;
          jollaY = GROUND_Y - 16;
          jollaRot = -42;
        }
        break;
      }
      case 'ㅎ': {
        if (t < 0.30) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 14;
        } else if (t < 0.44) {
          // Cheers on the shy ㅎ ghost before mirror flash!
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 8;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 24)) * 14;
        } else {
          // [ㄷ] Knight Helmet drops *CLANG* onto Jollaman too!
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X - 8;
          jollaY = GROUND_Y - 52;
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㄲ':
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X - 18;
        jollaY = GROUND_Y - 52;
        jollaRot = -14;
        break;
      case 'ㅅ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X;
        jollaY = GROUND_Y - 18;
        jollaRot = 88;
        break;
      case 'ㅈ':
        jollaFaceMode = 'burnt';
        jollaX = ACTION_SPOT_X - 4;
        jollaY = GROUND_Y - 18;
        jollaRot = -86;
        break;
      case 'ㅊ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X - 34;
        jollaY = GROUND_Y - 18;
        jollaRot = -86;
        break;
      case 'ㅋ':
        jollaFaceMode = 'squashed';
        jollaY = GROUND_Y - 15;
        jollaScaleX = 1.68;
        jollaScaleY = 0.28;
        break;
      case 'ㅌ':
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X - 110;
        jollaY = GROUND_Y - 22;
        jollaRot = 180;
        break;
      case 'ㅍ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X;
        jollaY = GROUND_Y - 30;
        break;
      case 'ㅆ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X - 161;
        jollaY = GROUND_Y - 16;
        jollaRot = -42;
        break;
      case 'ㅎ':
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X - 8;
        jollaY = GROUND_Y - 52;
        break;
    }
  }

  const isTransformed =
    phase === 'aftermath' ||
    phase === 'reveal' ||
    (phase === 'action' && anim.actionT >= IMPACT_AT[activeChar]);

  const revealSubtitle = tRevealSubtitle(6, selectedItem.char, selectedItem.gagSummary);
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  return (
    <JollamanStageShell
      icon="⚡"
      title="6. 졸라받침맨 2 (끝소리 3대장 변신)"
      accentButtonClass="bg-violet-600 hover:bg-violet-700"
      stageBgClass="bg-sky-100"
      ariaLabel="졸라맨 6 받침 2탄 끝소리 3대장 변신 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'retro2d',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((prev) => !prev),
        activeClass: 'bg-violet-50 text-violet-800 border-violet-200 hover:bg-violet-100',
        activeLabel: '🎵 코믹 BGM',
        title: '하이퍼 코믹 배경음악 켜기/끄기',
      }}
      items={BATCHIM2_ITEMS}
      selectedItem={selectedItem}
      learnedKeys={learnedChars}
      getKey={(item) => item.char}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      skyTokenStyle="pill"
      pillWidth={66}
      pillHeight={42}
      getTokenText={(item) => item.char}
      getSkyTokenBadge={(item) => `[${item.repSound}]`}
      tabGroups={[
        {
          anchorChar: 'ㄱ',
          anchorTitle: '대표음 [ㄱ] (클릭 불가 · 받침1에서 학습)',
          keys: ['ㅋ', 'ㄲ'],
        },
        {
          anchorChar: 'ㄷ',
          anchorTitle: '대표음 [ㄷ] (클릭 불가 · 받침1에서 학습)',
          keys: ['ㅌ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅊ', 'ㅎ'],
        },
        {
          anchorChar: 'ㅂ',
          anchorTitle: '대표음 [ㅂ] (클릭 불가 · 받침1에서 학습)',
          keys: ['ㅍ'],
        },
      ]}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={610}
      walkingHint="하늘의 받침 9종 → [ㄱ · ㄷ · ㅂ] 3대장 변신쇼!"
      activeCaption={`${selectedItem.triggerWord} [${selectedItem.pronunciation}] · ${selectedItem.soundLabel}`}
      revealAriaLabel={`${selectedItem.soundLabel}, ${selectedItem.triggerWord} [${selectedItem.pronunciation}] 학습 화면`}
      revealGlyph={`${selectedItem.char}→${selectedItem.repSound}`}
      revealHeadline={
        <span className="inline-flex flex-wrap items-baseline justify-center text-center">
          <span className="mr-2.5">받침</span>
          <span style={{ color: selectedItem.color }}>{selectedItem.char}</span>
          <span aria-hidden="true" className="mx-2 sm:mx-2.5 text-slate-400">➔</span>
          <span className="mr-3.5 sm:mr-4 font-black" style={{ color: selectedItem.color }}>
            [{selectedItem.repSound}]
          </span>
          <span>
            {selectedItem.triggerWord} [{selectedItem.pronunciation}]
          </span>
        </span>
      }
      revealSubtitle={revealSubtitle}
      flashcard={(() => {
        const word = selectedItem.triggerWord;
        const pron = selectedItem.pronunciation;
        const targetChar = selectedItem.sampleSyllable;
        return {
          glyph: `${selectedItem.char}→${selectedItem.repSound}`,
          glyphNode: (
            <Batchim2TransformGlyph
              origChar={selectedItem.char}
              repSound={selectedItem.repSound}
              accentColor={selectedItem.color}
              active={phase === 'reveal'}
            />
          ),
          subLabel: selectedItem.soundLabel,
          accentColor: selectedItem.color,
          headlineNode: (
            <>
              {word.split('').map((ch, idx) => (
                <span key={idx} style={ch === targetChar ? { color: selectedItem.color } : undefined}>
                  {ch}
                </span>
              ))}{' '}
              <span className="text-slate-500 font-bold">[{pron}]</span>
            </>
          ),
          headlineCharLen: word.length + pron.length + 3,
          meaning: tWordMeaning(6, selectedItem.char, SERIES6_MEANINGS[selectedItem.char]),
          romanization: romanizeKorean(pron),
          cornerIcon: getSeriesCornerIcon(6, selectedItem.char, anim.walkTime),
        };
      })()}
      backdropSlot={
        <Batchim2Backdrop
          activeChar={phase === 'walking' ? BATCHIM2_ITEMS[0].char : activeChar}
          isWalkingMode={phase === 'walking'}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >
      {/* 2.5. IN-STAGE TRANSFORMATION PLAQUE (Always cleanly visible in 16:9 & 9:16!) */}
      {(phase === 'action' || phase === 'aftermath') && (
        <g
          transform={`translate(${Math.max(ACTION_SPOT_X - 45, Math.min(ACTION_SPOT_X + 55, jollaX + 18))}, ${GROUND_Y - 198})`}
        >
          <BatchimTransformOverlaySvg
            triggerWord={selectedItem.triggerWord}
            pronunciation={selectedItem.pronunciation}
            origBatchim={selectedItem.char}
            repSound={selectedItem.repSound}
            color={selectedItem.color}
            transformed={isTransformed}
            walkTime={anim.walkTime}
          />
        </g>
      )}

      {/* 3. SCENARIO PROPS & TRANSFORM GAGS */}
      {phase !== 'walking' && (
        <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.2) : 1}>
          {/* ㄲ (밖): Slammed house door + freezing snowstorm fuses ㄲ -> ㄱ! */}
          {activeChar === 'ㄲ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const slammed = phase === 'aftermath' || phase === 'reveal' || t >= 0.18;
            const freezing = phase === 'action' && t >= 0.18 && t < 0.36;
            const frozen = phase === 'aftermath' || phase === 'reveal' || t >= 0.36;
            return (
              <g>
                <g transform={`translate(105, ${GROUND_Y - 65})`}>
                  <SlammedPorchDoorSvg slammed={slammed} />
                </g>
                <g transform={`translate(${ACTION_SPOT_X + 95}, ${GROUND_Y - 46})`}>
                  <FreezingWindAndMorphSvg freezing={freezing} frozen={frozen} walkTime={anim.walkTime} />
                </g>
                {phase === 'action' && t >= 0.18 && t < 0.36 && (
                  <g transform={`translate(${jollaX + 26}, ${jollaY - 76})`}>
                    <ComicExclaimSvg color="#38BDF8" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅅ (옷): Super-stiff starched 'ㅅ' shirt locks into rigid 'ㄷ' frame! */}
          {activeChar === 'ㅅ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const stiffLocked = phase === 'aftermath' || phase === 'reveal' || t >= 0.34;
            return (
              <g>
                {phase === 'action' && t >= 0.34 && t < 0.56 && (
                  <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 96})`}>
                    <ComicImpactBurstSvg scale={0.95} fill="#FDE047" stroke="#E11D48" />
                    <text x="0" y="-36" textAnchor="middle" fontSize="19" fontWeight="900" fill="#E11D48" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      빳빳 ㄷ!!
                    </text>
                  </g>
                )}
                {!stiffLocked && phase !== 'approaching' && (
                  <g transform={`translate(${ACTION_SPOT_X + 68}, ${GROUND_Y - 58})`}>
                    <text x="0" y="-38" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9F1239">
                      풀 먹인 새 옷!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅈ (낮): 12:00 Blazing Sun melts sharp 'ㅈ' awning flat into wide 'ㄷ' sun-shade! */}
          {activeChar === 'ㅈ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const heating = phase === 'action' && t >= 0.18 && t < 0.72;
            const meltProgress =
              phase === 'aftermath' || phase === 'reveal'
                ? 1
                : phase === 'action' && t >= 0.34
                ? Math.min(1, (t - 0.34) / 0.34)
                : 0;
            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 18}, 115)`}>
                  <BlazingDaySunSvg heating={heating} walkTime={anim.walkTime} />
                </g>
                <g transform={`translate(${ACTION_SPOT_X + 8}, ${GROUND_Y})`}>
                  <MeltingJieutCanopySvg meltProgress={meltProgress} walkTime={anim.walkTime} />
                </g>
              </g>
            );
          })()}

          {/* ㅊ (꽃): Sniffing giant flower -> cheeky bee steals top dot of ㅊ, leaving ㄷ pot! */}
          {activeChar === 'ㅊ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const stung = phase === 'aftermath' || phase === 'reveal' || t >= 0.42;
            let beeX = ACTION_SPOT_X + 92;
            let beeY = GROUND_Y - 122;
            if (phase === 'action') {
              if (t < 0.24) {
                beeY = GROUND_Y - 122 + Math.sin(t * 25) * 4;
              } else if (t < 0.42) {
                const zt = (t - 0.24) / 0.18;
                beeX = ACTION_SPOT_X + 92 - zt * 58;
                beeY = GROUND_Y - 122 + zt * 54;
              } else if (t < 0.7) {
                const ft = (t - 0.42) / 0.28;
                beeX = ACTION_SPOT_X + 34 - ft * 90;
                beeY = GROUND_Y - 68 - ft * 50;
              } else {
                beeX = ACTION_SPOT_X + 140;
                beeY = GROUND_Y - 140 + Math.sin(anim.walkTime * 8) * 8;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              beeX = ACTION_SPOT_X + 138;
              beeY = GROUND_Y - 135 + Math.sin(anim.walkTime * 6) * 8;
            }
            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 92}, ${GROUND_Y - 42})`}>
                  <GiantBloomingFlowerPotSvg stung={stung} />
                </g>
                <g transform={`translate(${beeX}, ${beeY})`}>
                  <CheekyFlowerBeeSvg walkTime={anim.walkTime} />
                </g>
                {phase === 'action' && t >= 0.42 && t < 0.65 && (
                  <g transform={`translate(${ACTION_SPOT_X + 10}, ${GROUND_Y - 76})`}>
                    <ComicImpactBurstSvg scale={1} fill="#FDE047" stroke="#DB2777" />
                    <text x="0" y="-38" textAnchor="middle" fontSize="20" fontWeight="900" fill="#DB2777" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      아야! 톡!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅋ (부엌): Pan flip snaps middle stroke off ㅋ -> ㄱ + skillet pancake splat! */}
          {activeChar === 'ㅋ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const snapped = phase === 'aftermath' || phase === 'reveal' || t >= 0.46;
            let doughX = ACTION_SPOT_X + 54;
            let doughY = GROUND_Y - 58;
            let strokeFlyX = ACTION_SPOT_X + 54;
            let strokeFlyY = GROUND_Y - 165;
            let panX = ACTION_SPOT_X + 74;
            let panY = GROUND_Y - 155;
            let panRot = -18;

            if (phase === 'action') {
              if (t < 0.30) {
                doughY = GROUND_Y - 58 - (t / 0.30) * 125;
                panRot = -18 - (t / 0.30) * 24;
              } else if (t < 0.46) {
                const st = (t - 0.30) / 0.16;
                doughX = ACTION_SPOT_X + 54 - st * 54;
                doughY = GROUND_Y - 183 + st * 125;
                panX = ACTION_SPOT_X + 74 - st * 74;
                panY = GROUND_Y - 155 + st * 124;
                panRot = -42 + st * 42;
              } else {
                doughX = ACTION_SPOT_X;
                doughY = GROUND_Y - 56;
                panX = ACTION_SPOT_X;
                panY = GROUND_Y - 31;
                panRot = 0;
                const ft = Math.min(1, (t - 0.46) / 0.4);
                strokeFlyX = ACTION_SPOT_X + 20 + ft * 160;
                strokeFlyY = GROUND_Y - 110 - Math.sin(ft * Math.PI) * 75 + ft * 45;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              panX = ACTION_SPOT_X;
              panY = GROUND_Y - 31;
              panRot = 0;
              strokeFlyX = ACTION_SPOT_X + 180;
              strokeFlyY = GROUND_Y - 10;
            }

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 54}, ${GROUND_Y - 46})`}>
                  <KitchenFlipPanSvg />
                </g>
                {!snapped && (
                  <g transform={`translate(${doughX}, ${doughY})`}>
                    <KieukDoughAndSnapSvg snapped={false} />
                  </g>
                )}
                {/* Snapped off middle bar flying out! */}
                {snapped && (
                  <g transform={`translate(${strokeFlyX}, ${strokeFlyY}) rotate(${phase === 'action' ? anim.actionT * 720 : 28})`}>
                    <rect x="-14" y="-4" width="28" height="8" rx="3" fill="#0284C7" stroke="#0F172A" strokeWidth="2" />
                  </g>
                )}
                <g transform={`translate(${panX}, ${panY}) rotate(${panRot})`}>
                  <GiantCastIronSkilletSvg />
                </g>
                {phase === 'action' && t >= 0.46 && t < 0.70 && (
                  <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 68})`}>
                    <ComicImpactBurstSvg scale={1.1} />
                    <text x="0" y="-44" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      뚝!! 깡!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅌ (밭): Yanks Giant Radish -> snaps ㅌ middle bar off -> ㄷ + upside-down pit! */}
          {activeChar === 'ㅌ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const straining = phase === 'action' && t < 0.40;
            const pulledOut = t >= 0.40 || phase === 'aftermath' || phase === 'reveal';
            let rx = ACTION_SPOT_X + 76;
            let ry = GROUND_Y - 22;
            let rrot = 0;

            if (phase === 'action' && t >= 0.40) {
              const pt = (t - 0.40) / 0.60;
              rx = ACTION_SPOT_X + 76 + pt * 52;
              ry = GROUND_Y - 22 - Math.sin(pt * Math.PI) * 145 - (1 - Math.cos(pt * Math.PI * 0.5)) * 18;
              rrot = pt * 360;
            } else if (phase === 'aftermath' || phase === 'reveal') {
              rx = ACTION_SPOT_X + 128;
              ry = GROUND_Y - 44;
              rrot = 20;
            }

            return (
              <g>
                {straining && (
                  <line x1={jollaX + 12} y1={jollaY + 6} x2={rx} y2={ry - 14} stroke="#D97706" strokeWidth="4.5" strokeLinecap="round" />
                )}
                <g transform={`translate(${rx}, ${ry}) rotate(${rrot})`}>
                  <GiantFarmRadishSvg pulledOut={pulledOut} straining={straining} walkTime={anim.walkTime} />
                </g>
                {phase === 'action' && t >= 0.40 && t < 0.64 && (
                  <g transform={`translate(${ACTION_SPOT_X + 55}, ${GROUND_Y - 76})`}>
                    <ComicImpactBurstSvg scale={1.1} />
                    <text x="0" y="-42" textAnchor="middle" fontSize="22" fontWeight="900" fill="#D97706" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      뻥!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅍ (숲): Giant Pinecone BONKS overhanging ㅍ tent -> folds inward into neat ㅂ tent! */}
          {activeChar === 'ㅍ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const folded = phase === 'aftermath' || phase === 'reveal' || t >= 0.40;
            let coneY = GROUND_Y - 235;
            if (phase === 'action') {
              if (t < 0.24) {
                coneY = GROUND_Y - 235 + Math.sin(t * 40) * 3;
              } else if (t < 0.40) {
                const dt = (t - 0.24) / 0.16;
                coneY = GROUND_Y - 235 + dt * dt * 135;
              } else {
                coneY = GROUND_Y - 102;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              coneY = GROUND_Y - 102;
            }

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y})`}>
                  <PieupForestTentSvg folded={folded} />
                </g>
                <g transform={`translate(${ACTION_SPOT_X}, ${coneY})`}>
                  <GiantPineconeSvg />
                </g>
                {phase === 'action' && t >= 0.40 && t < 0.66 && (
                  <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 110})`}>
                    <ComicImpactBurstSvg scale={1.1} fill="#FDE047" stroke="#059669" />
                    <text x="0" y="-42" textAnchor="middle" fontSize="22" fontWeight="900" fill="#059669" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      쿵!! ㅂ 변신!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅆ (있다): Treasure Chest pops giant [ㄷ] mascot stamp shouting "나 여기 있[ㄷ]다!!" */}
          {activeChar === 'ㅆ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const teasing = phase === 'action' && t >= 0.18 && t < 0.44;
            const popped = t >= 0.44 || phase === 'aftermath' || phase === 'reveal';
            const popScale =
              phase === 'action' && t >= 0.44 ? Math.min((t - 0.44) / 0.14, 1) : 1;
            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 125}, ${GROUND_Y - 32})`}>
                  <TreasureChestGiantDigutSvg
                    popped={popped}
                    teasing={teasing}
                    popScale={popScale}
                    walkTime={anim.walkTime}
                  />
                </g>
                {teasing && (
                  <g transform={`translate(${jollaX + 18}, ${jollaY - 76})`}>
                    <ComicExclaimSvg color="#FACC15" />
                  </g>
                )}
                {phase === 'action' && t >= 0.44 && t < 0.70 && (
                  <g transform={`translate(${ACTION_SPOT_X + 18}, ${GROUND_Y - 82})`}>
                    <ComicImpactBurstSvg scale={1.15} fill="#FACC15" stroke="#DC2626" />
                    <text x="0" y="-44" textAnchor="middle" fontSize="22" fontWeight="900" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      쾅!! 있[ㄷ]다!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅎ (히읗): Magic Mirror beams golden [ㄷ] knight helmet onto shy ㅎ ghost -> [히읃]! */}
          {activeChar === 'ㅎ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const armored = phase === 'aftermath' || phase === 'reveal' || t >= 0.44;
            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 115}, ${GROUND_Y})`}>
                  <MagicHangulMirrorSvg glowing={armored} walkTime={anim.walkTime} />
                </g>
                <g transform={`translate(${ACTION_SPOT_X + 46}, ${GROUND_Y - 68})`}>
                  <ShyHieutGhostSvg armored={armored} walkTime={anim.walkTime} />
                </g>
                {armored && (
                  <g transform={`translate(${ACTION_SPOT_X + 46}, ${GROUND_Y - 68})`}>
                    <SparkleBurstSvg progress={(anim.walkTime * 1.4) % 1} color="#FDE047" />
                  </g>
                )}
                {phase === 'action' && t >= 0.44 && t < 0.68 && (
                  <g transform={`translate(${ACTION_SPOT_X + 20}, ${GROUND_Y - 82})`}>
                    <ComicImpactBurstSvg scale={1.1} fill="#FDE047" stroke="#B91C1C" />
                    <text x="0" y="-44" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FDE047" stroke="#7F1D1D" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      번쩍!! [히읃]!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ClipPaths so buried upside-down/coin bodies stay cleanly behind foreground ground/piles */}
      <defs>
        <clipPath id="b6FloorBurialClip" clipPathUnits="userSpaceOnUse">
          <rect x="0" y="-80" width="1000" height={GROUND_Y + 82} />
        </clipPath>
      </defs>

      {/* 4. JOLLAMAN STICK FIGURE */}
      {(() => {
        const isBuried =
          (activeChar === 'ㅌ' && isUpsideDownKick) ||
          (activeChar === 'ㅆ' && (phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && anim.actionT >= 0.78)));

        const isFrozenCube =
          activeChar === 'ㄲ' && (phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && anim.actionT >= 0.36));

        const wearingStiffShirt =
          activeChar === 'ㅅ' && phase !== 'walking';
        const stiffLocked =
          activeChar === 'ㅅ' && (phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && anim.actionT >= 0.34));

        const wearingKnightHelm =
          activeChar === 'ㅎ' && (phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && anim.actionT >= 0.44));

        return (
          <g clipPath={isBuried ? 'url(#b6FloorBurialClip)' : undefined}>
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${
                jollaFacing * jollaScaleX
              }, ${jollaScaleY})`}
              onClick={toggleJollaPause}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 && jollaScaleY > 0.5 && !isBuried && (
                <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
              )}
              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                showXraySkeleton={showXraySkeleton}
                headOnFire={headOnFire}
                walkTime={anim.walkTime}
                activeChar={activeChar}
              />

              {/* ㄲ (밖): Translucent ice block freezing Jollaman stiff! */}
              {isFrozenCube && <FrozenJollamanIceCubeSvg />}

              {/* ㅅ (옷): Crisp 'ㅅ' shirt -> snaps into rigid boxy 'ㄷ' frame! */}
              {wearingStiffShirt && (
                <g transform="translate(0, 6)">
                  <StiffStarchedShirtSvg stiffLocked={stiffLocked} />
                </g>
              )}

              {/* ㅋ (부엌): Chef Hat before flip -> Steaming Butter Pancake Hat after snap! */}
              {activeChar === 'ㅋ' && phase !== 'walking' && (() => {
                const snapped =
                  (phase === 'action' && anim.actionT >= 0.46) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';
                if (snapped) {
                  return (
                    <g transform="translate(0, -48)">
                      <ellipse cx="0" cy="0" rx="34" ry="11" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
                      <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#0284C7">ㄱ</text>
                    </g>
                  );
                }
                return (
                  <g transform="translate(0, -54)">
                    <ChefHatSvg />
                  </g>
                );
              })()}

              {/* ㅎ (히읗): Golden [ㄷ] knight helmet bonks onto Jollaman! */}
              {wearingKnightHelm && (
                <g transform="translate(0, -48)">
                  <DigutKnightHelmSvg />
                </g>
              )}

              {/* Spinning Vector Dizzy Star in aftermath/reveal */}
              {(phase === 'aftermath' || phase === 'reveal') && (
                <DizzyStarOrbitSvg
                  walkTime={anim.walkTime}
                  cy={wearingKnightHelm || isFrozenCube ? -78 : -66}
                />
              )}
            </g>
          </g>
        );
      })()}

      {/* 5. FOREGROUND BURIAL & TENT OVERLAYS */}
      {phase !== 'walking' && activeChar === 'ㅊ' && (phase === 'aftermath' || phase === 'reveal' || anim.actionT >= 0.42) && (
        <g transform={`translate(${ACTION_SPOT_X - 30}, ${GROUND_Y})`}>
          <ScatteredPetalsMoundSvg />
        </g>
      )}
      {phase !== 'walking' && activeChar === 'ㅌ' && isUpsideDownKick && (
        <g transform={`translate(${ACTION_SPOT_X - 110}, ${GROUND_Y})`}>
          <FarmDirtPitMoundSvg />
        </g>
      )}
      {phase !== 'walking' && activeChar === 'ㅆ' && (phase === 'aftermath' || phase === 'reveal' || anim.actionT >= 0.78) && (
        <g transform={`translate(${ACTION_SPOT_X - 161}, ${GROUND_Y})`}>
          <TreasureCrashPileSvg />
        </g>
      )}
    </JollamanStageShell>
  );
};
