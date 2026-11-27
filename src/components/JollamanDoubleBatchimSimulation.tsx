import React from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playDoubleBatchimSfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES7_MEANINGS: Record<DoubleBatchimKey, string> = {
  'ㄳ': 'Share / Portion',
  'ㄵ': 'To Sit',
  'ㄶ': 'So Many!',
  '짧다': 'To Be Short',
  'ㄽ': 'One-Way Only',
  'ㄾ': 'To Lick',
  'ㅀ': 'No! / Hate It!',
  'ㅄ': 'No Exit / None',
  'ㄺ': 'Chicken',
  'ㄻ': 'To Starve',
  'ㄿ': 'To Recite',
  'ㄼ': 'To Step On',
  '읽고': 'Read and...',
  '많아': 'Is A Lot',
  '많고': 'Many and...',
};

const FRONT_DROPOUT_PAIR: Record<string, { kept: string; dropped: string }> = {
  'ㄳ': { kept: 'ㄱ', dropped: 'ㅅ' },
  'ㄵ': { kept: 'ㄴ', dropped: 'ㅈ' },
  'ㄶ': { kept: 'ㄴ', dropped: 'ㅎ' },
  '짧다': { kept: 'ㄹ', dropped: 'ㅂ' },
  'ㄽ': { kept: 'ㄹ', dropped: 'ㅅ' },
  'ㄾ': { kept: 'ㄹ', dropped: 'ㅌ' },
  'ㅀ': { kept: 'ㄹ', dropped: 'ㅎ' },
  'ㅄ': { kept: 'ㅂ', dropped: 'ㅅ' },
};

const DoubleBatchimDropoutGlyph: React.FC<{
  kept: string;
  dropped: string;
  accentColor: string;
  active: boolean;
}> = ({ kept, dropped, accentColor, active }) => {
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
      const p = Math.max(0, Math.min(1, (elapsed - 0.3) / 0.7));
      setProgress(p);
      if (elapsed < 1.1) {
        rafId = requestAnimationFrame(tick);
      }
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [active, kept, dropped]);

  // Smooth ease-out curve
  const ease = 1 - Math.pow(1 - progress, 3);

  return (
    <span className="relative inline-flex items-baseline justify-center gap-0.5 leading-none select-none">
      <span
        className="inline-block font-black"
        style={{
          color: accentColor,
          transform: `scale(${1 + ease * 0.2})`,
          filter: ease > 0.4 ? `drop-shadow(0 0 8px ${accentColor}55)` : undefined,
        }}
      >
        {kept}
      </span>
      <span
        className="inline-block font-black"
        style={{
          color: '#64748B',
          opacity: Math.max(0, 1 - ease * 1.1),
          transform: `translate(${ease * 34}px, ${-ease * 28}px) rotate(${ease * 42}deg) scale(${1 - ease * 0.55})`,
        }}
      >
        {dropped}
      </span>
    </span>
  );
};

import {
  JollamanCharacterSvg,
  JollamanFaceMode,
  ComicImpactBurstSvg,
  DizzyStarOrbitSvg,
  SparkleBurstSvg,
} from './JollamanSprites';
import {
  DoubleBatchimKey,
  DoubleBatchimBackdrop,
  PizzaSliceWithFlagSvg,
  PizzeriaPizzaPanSvg,
  PoolsideFlyingChairsSvg,
  SwimmingPoolWaterForegroundSvg,
  AmusementBallpitSvg,
  TooShortCoasterSvg,
  OneWayRailTrackSvg,
  GhostZombieParadeSvg,
  NoExitSignPlazaSvg,
  CrazyRoosterSvg,
  GoldenEggNestSvg,
  EmptyFridgeSvg,
  BellyTornadoSvg,
  BubblegumTrapSvg,
  BubblegumFaceSplatSvg,
  GiantIceCreamConeSvg,
  CutePassingPuppySvg,
  PoetryMicStandSvg,
  MagicSpellbookIlkkoSvg,
  HieutGhostManaSvg,
  HieutCannonballMankoSvg,
} from './JollamanSprites7';

export interface DoubleBatchimItem {
  char: DoubleBatchimKey;
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

/**
 * PART 1 (앞소리 8종 — 졸라맨 & 친구 둘의 겹받침 놀이공원 대모험!):
 * ㄳ→ㄱ, ㄵ→ㄴ, ㄶ→ㄴ, ㄼ→ㄹ(원칙 짧다!), ㄽ→ㄹ, ㄾ→ㄹ, ㅀ→ㄹ(연음), ㅄ→ㅂ
 */
export const DOUBLE_BATCHIM_FRONT_ITEMS: DoubleBatchimItem[] = [
  {
    char: 'ㄳ',
    repSound: 'ㄱ',
    soundLabel: '앞소리 · ㄳ → [ㄱ]',
    triggerWord: '몫 [목]',
    pronunciation: '목',
    sampleSyllable: '몫',
    gagSummary: '피자집 테이블에 차려진 6조각 피자! 눈 깜짝할 새 5조각이 순삭되고 졸라맨이 겨우 남은 마지막 한 조각을 사수한다. "내 몫!!"',
    color: '#EA580C',
    skyX: 88,
    skyY: 60,
  },
  {
    char: 'ㄵ',
    repSound: 'ㄴ',
    soundLabel: '앞소리 · ㄵ → [ㄴ]',
    triggerWord: '앉다 [안따]',
    pronunciation: '안따',
    sampleSyllable: '앉',
    gagSummary: '수영장 플라잉체어에 앉아 쉬던 졸라맨! 갑자기 의자 스프링이 띠용 발사되어 수영장에 풍덩 빠지고 ㄴ만 남는다!',
    color: '#0EA5E9',
    skyX: 206,
    skyY: 84,
  },
  {
    char: 'ㄶ',
    repSound: 'ㄴ',
    soundLabel: '앞소리 · ㄶ → [ㄴ]',
    triggerWord: '많네 [만네]',
    pronunciation: '만네',
    sampleSyllable: '많',
    gagSummary: '실내 볼풀장에 풍덩 뛰어든 졸라맨! 알록달록 공이 너무 많아 폭 파묻히고, 공 사이로 두 눈과 ㄴ만 빼꼼 나온다!',
    color: '#2563EB',
    skyX: 324,
    skyY: 60,
  },
  {
    char: '짧다',
    repSound: 'ㄹ(원칙)',
    soundLabel: '앞소리 · ㄼ → [ㄹ] (원칙)',
    triggerWord: '짧다 [짤따]',
    pronunciation: '짤따',
    sampleSyllable: '짧',
    gagSummary: '놀이공원 초단축 30cm 롤러코스터! 출발하자마자 0.1초 만에 도착해버린 졸라맨이 어리둥절한 표정으로 ㄹ을 가리킨다!',
    color: '#EC4899',
    skyX: 442,
    skyY: 84,
  },
  {
    char: 'ㄽ',
    repSound: 'ㄹ',
    soundLabel: '앞소리 · ㄽ → [ㄹ]',
    triggerWord: '외곬 [외골]',
    pronunciation: '외골',
    sampleSyllable: '곬',
    gagSummary: '일방통행 외곬 레일카! 뒤로도 옆으로도 갈 수 없는 외길에서 유턴 금지 문에 막힌 ㅅ은 떨어지고, 빛나는 ㄹ만 따라 직진한다!',
    color: '#B91C1C',
    skyX: 560,
    skyY: 60,
  },
  {
    char: 'ㄾ',
    repSound: 'ㄹ',
    soundLabel: '앞소리 · ㄾ → [ㄹ]',
    triggerWord: '핥다 [할따]',
    pronunciation: '할따',
    sampleSyllable: '핥',
    gagSummary: '커다란 3단 아이스크림을 먹으려던 졸라맨! 핥으려는 순간 지나가던 귀여운 강아지가 낼름 먼저 핥아먹어버리고 ㄹ만 남는다!',
    color: '#D97706',
    skyX: 678,
    skyY: 84,
  },
  {
    char: 'ㅀ',
    repSound: 'ㄹ',
    soundLabel: '앞소리 · ㅀ → [ㄹ] (연음)',
    triggerWord: '싫어 [시러]',
    pronunciation: '시러',
    sampleSyllable: '싫',
    gagSummary: '어두워진 놀이공원의 귀신·좀비 퍼레이드! 귀신에게 붙잡힌 졸라맨이 "싫어!!" 외치고 ㄹ만 남고 [시러]로 연음!',
    color: '#16A34A',
    skyX: 796,
    skyY: 60,
  },
  {
    char: 'ㅄ',
    repSound: 'ㅂ',
    soundLabel: '앞소리 · ㅄ → [ㅂ]',
    triggerWord: '없다 [업따]',
    pronunciation: '업따',
    sampleSyllable: '없',
    gagSummary: '밤늦은 놀이공원 출구에 도착했는데 출구가 없다! 표지판을 확인하니 "출구 없음"... ㅅ이 사라지고 ㅂ만 덩그러니 남는다!',
    color: '#4F46E5',
    skyX: 912,
    skyY: 84,
  },
];

/**
 * PART 2 (뒷소리 3종 + 핵심 예외 2종 + ㅎ 규칙 2종 = 7종 균형!):
 * ㄺ(닭), ㄻ(굶다), ㄿ(읊다), 밟다(ㄼ 예외→ㅂ), 읽고(ㄺ+ㄱ 예외→ㄹ), 많아(ㅎ+모음 탈락연음), 많고(ㅎ+파열음 축약)
 */
export const DOUBLE_BATCHIM_BACK_ITEMS: DoubleBatchimItem[] = [
  {
    char: 'ㄺ',
    repSound: 'ㄱ',
    soundLabel: '뒷소리 · ㄺ → [ㄱ]',
    triggerWord: '닭 [닥]',
    pronunciation: '닥',
    sampleSyllable: '닭',
    gagSummary: '닭장 앞에서 꼬꼬닭을 약올리다 화난 대왕 수탉에게 쪼여 둥지 위에 쿵 앉더니 황금알을 퐁 낳아버린다!!',
    color: '#DC2626',
    skyX: 102,
    skyY: 60,
  },
  {
    char: 'ㄻ',
    repSound: 'ㅁ',
    soundLabel: '뒷소리 · ㄻ → [ㅁ]',
    triggerWord: '굶다 [굼따]',
    pronunciation: '굼따',
    sampleSyllable: '굶',
    gagSummary: '며칠 굶어 텅 빈 냉장고 문을 열자 나방만 날아오르고 배꼽에서 꼬르륵 회오리 바람이 터져 빙글빙글 돈다!!',
    color: '#0284C7',
    skyX: 234,
    skyY: 84,
  },
  {
    char: 'ㄿ',
    repSound: 'ㅂ',
    soundLabel: '뒷소리 · ㄿ → [ㅂ]',
    triggerWord: '읊다 [읍따]',
    pronunciation: '읍따',
    sampleSyllable: '읊',
    gagSummary: '멋지게 가을 시를 읊다 크게 벌린 입속으로 낙엽과 왕파리가 쏙 들어가 놀라 마이크까지 통째로 삼켜버린다!!',
    color: '#EA580C',
    skyX: 366,
    skyY: 60,
  },
  {
    char: 'ㄼ',
    repSound: 'ㅂ(예외)',
    soundLabel: '예외 · 밟다 → [ㅂ]',
    triggerWord: '밟다 [밥따]',
    pronunciation: '밥따',
    sampleSyllable: '밟',
    gagSummary: '여덟은 [여덜]이지만 밟다만 예외 [밥따]! 대왕 핑크 풍선껌을 철퍽 밟아 180도 다리 찢기 후 얼굴에 풍선이 펑!!',
    color: '#DB2777',
    skyX: 500,
    skyY: 84,
  },
  {
    char: '읽고',
    repSound: 'ㄹ(예외)',
    soundLabel: '예외 · 읽고 → [ㄹ]',
    triggerWord: '읽고 [일꼬]',
    pronunciation: '일꼬',
    sampleSyllable: '읽',
    gagSummary: '닭은 [닥]이지만 뒤가 ㄱ이면 예외! ㄺ의 ㄱ이 튕겨나가고 슈퍼 ㄹ이 출동해 [일꼬]로 변신한다!!',
    color: '#059669',
    skyX: 634,
    skyY: 60,
  },
  {
    char: '많아',
    repSound: 'ㅎ탈락+연음',
    soundLabel: 'ㅎ 탈락·연음 → [마나]',
    triggerWord: '많아 [마나]',
    pronunciation: '마나',
    sampleSyllable: '마나',
    gagSummary: 'ㅎ이 모음을 만나면 뿅! 투명하게 사라지고, 남은 ㄴ(ㄹ)이 트램펄린 점프로 건너가 [마나/시러]로 연음된다!!',
    color: '#0284C7',
    skyX: 766,
    skyY: 84,
  },
  {
    char: '많고',
    repSound: 'ㅎ+ㄱ→ㅋ',
    soundLabel: 'ㅎ+ㄱ 축약 → [ㅋ]',
    triggerWord: '많고 [만코]',
    pronunciation: '만코',
    sampleSyllable: '코',
    gagSummary: 'ㅎ이 파열음(ㄱ·ㄷ·ㅈ)을 만나면 불꽃 대포처럼 부딪혀 ㅋ·ㅌ·ㅊ 거센소리로 합체 폭발한다!!',
    color: '#B91C1C',
    skyX: 898,
    skyY: 60,
  },
];

interface JollamanDoubleBatchimSimulationProps {
  part?: 'front' | 'back';
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 310;
const GROUND_Y = 368;

const getActionDuration = (char: DoubleBatchimKey): number => {
  switch (char) {
    case 'ㄳ':
      return 2.4;
    case 'ㄵ':
      return 2.45;
    case 'ㄶ':
      return 2.45;
    case '짧다':
      return 2.35;
    case 'ㄽ':
      return 2.45;
    case 'ㄾ':
      return 2.45;
    case 'ㅀ':
      return 2.5;
    case 'ㅄ':
      return 2.5;
    case 'ㄺ':
      return 2.45;
    case 'ㄻ':
      return 2.5;
    case 'ㄼ':
      return 2.55;
    case 'ㄿ':
      return 2.5;
    case '읽고':
      return 2.5;
    case '많아':
      return 2.45;
    case '많고':
      return 2.5;
  }
};

const REVEAL_VOICE_LINES: Record<DoubleBatchimKey, string> = {
  'ㄳ': '기역시옷 앞소리 윽, 몫!',
  'ㄵ': '니은지읒 앞소리 은, 안따!',
  'ㄶ': '니은히읗 앞소리 은, 만네!',
  '짧다': '리을비읍 원칙, 앞소리 을, 짤따!',
  'ㄽ': '리을시옷 앞소리 을, 외골!',
  'ㄾ': '리을티읕 앞소리 을, 할따!',
  'ㅀ': '리을히읗 앞소리, ㄹ 연음, 시러!',
  'ㅄ': '비읍시옷 앞소리 읍, 업따!',
  'ㄺ': '리을기역 뒷소리 윽, 닭!',
  'ㄻ': '리을미음 뒷소리 음, 굼따!',
  'ㄿ': '리을피읖 뒷소리 읍, 읍따!',
  'ㄼ': '밟다 예외, 뒷소리 읍, 밥따!',
  '읽고': '기역 앞 예외, 앞소리 을, 일꼬!',
  '많아': '히읗 탈락 연음, 마나!',
  '많고': '히읗 거센소리 축약, 만코!',
};

export const JollamanDoubleBatchimSimulation: React.FC<JollamanDoubleBatchimSimulationProps> = ({
  part = 'front',
  audioEnabled = true,
}) => {
  const activeItems = part === 'back' ? DOUBLE_BATCHIM_BACK_ITEMS : DOUBLE_BATCHIM_FRONT_ITEMS;
  const partTitle =
    part === 'back'
      ? '7-2. 졸라겹자음맨 2'
      : '7-1. 졸라겹자음맨 1';

  const {
    phase,
    selectedItem,
    learnedKeys: learnedChars,
    bgmEnabled,
    setBgmEnabled,
    anim,
    shorts,
    toggleJollaPause,
    resetToWalking,
    handleItemClick,
  } = useJollamanStageEngine<DoubleBatchimItem, DoubleBatchimKey>({
    seriesNum: 7,
    seriesTitle: partTitle,
    items: activeItems,
    audioEnabled,
    bgmTrack: part === 'back' ? 'chillLounge' : 'memeShorts',
    initialWalkX: 160,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    scrollSpeedOnApproach: 360,
    aftermathAnimMaxDur: 1.25,
    playPopOnSelect: true,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.sampleSyllable} · ${item.triggerWord}`,
    getBadge: (item) => item.soundLabel,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) => REVEAL_VOICE_LINES[item.char],
    getActionDuration: (item) => getActionDuration(item.char),
    onStartAction: (item, audioOn) => {
      if (audioOn) {
        playDoubleBatchimSfx(item.char, 'setup');
      }
    },
    onActionProgress: (
      item,
      t,
      { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }
    ) => {
      const impactAt: Record<DoubleBatchimKey, number> = {
        'ㄳ': 0.34,
        'ㄵ': 0.32,
        'ㄶ': 0.42,
        '짧다': 0.34,
        'ㄽ': 0.36,
        'ㄾ': 0.34,
        'ㅀ': 0.38,
        'ㅄ': 0.4,
        'ㄺ': 0.34,
        'ㄻ': 0.36,
        'ㄼ': 0.28,
        'ㄿ': 0.36,
        '읽고': 0.4,
        '많아': 0.38,
        '많고': 0.44,
      };
      const beat2At: Record<DoubleBatchimKey, number> = {
        'ㄳ': 0.68,
        'ㄵ': 0.72,
        'ㄶ': 0.72,
        '짧다': 0.52,
        'ㄽ': 0.68,
        'ㄾ': 0.68,
        'ㅀ': 0.68,
        'ㅄ': 0.72,
        'ㄺ': 0.68,
        'ㄻ': 0.68,
        'ㄼ': 0.68,
        'ㄿ': 0.66,
        '읽고': 0.7,
        '많아': 0.68,
        '많고': 0.72,
      };

      if (t >= impactAt[item.char] && !impactTriggered) {
        markImpact();
        if (audioOn) {
          playDoubleBatchimSfx(item.char, 'impact');
          if (item.char === 'ㄵ' || item.char === 'ㄺ' || item.char === 'ㄽ' || item.char === '읽고' || item.char === '많고') {
            playCartoonImpact();
          } else if (item.char === 'ㄶ' || item.char === 'ㄼ' || item.char === '짧다') {
            playCartoonSplat();
          }
        }
      }

      if (t >= beat2At[item.char] && !secondaryTriggered) {
        markSecondary();
        if (audioOn) {
          if (item.char === 'ㄺ' || item.char === '많고' || item.char === 'ㅀ') {
            playCartoonImpact();
          } else if (item.char === 'ㄵ' || item.char === 'ㄼ' || item.char === 'ㄿ') {
            playCartoonSplat();
          }
        }
      }
    },
    onAftermathStart: (item, audioOn) => {
      if (audioOn && (item.char === 'ㄵ' || item.char === 'ㄼ')) {
        playCartoonSplat();
      }
    },
  });

  const activeChar = selectedItem.char;

  const isActionWalking =
    phase === 'action' &&
    ((activeChar === 'ㄼ' && anim.actionT < 0.24) ||
      (activeChar === 'ㄽ' && anim.actionT < 0.18) ||
      (activeChar === 'ㅄ' && anim.actionT < 0.4));

  const isWalkingMotion = phase === 'walking' || phase === 'approaching' || isActionWalking;
  const activeWalkCycle = anim.walkTime * 9.5;
  const legSwing = isWalkingMotion ? Math.sin(activeWalkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(activeWalkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(activeWalkCycle)) * 4 : 0;

  let jollaFacing: 1 | -1 =
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
  let jollaVisible = true;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showHeadBump = false;

  // Scenario visual flags (겹앞 & 겹뒤)
  let splitSpread = 0;
  let gumSplatOnFace = false;
  let openMouthPoetry = false;
  let swallowedMicBelly = false;
  let shockPaleOutline = false;
  let holdingLastPizzaSlice = false;
  let poolBobbing = false;

  if (phase === 'walking' || phase === 'approaching') {
    jollaFaceMode = 'happy';
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㄳ': {
        if (t < 0.34) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 48;
        } else if (t < 0.68) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - 48;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin((t - 0.34) * 28)) * 16;
        } else {
          jollaFaceMode = 'happy';
          holdingLastPizzaSlice = true;
          jollaX = ACTION_SPOT_X - 24;
          jollaY = GROUND_Y - 54;
        }
        break;
      }
      case 'ㄵ': {
        if (t < 0.32) {
          // Jollaman sits on hydraulic poolside flying chair (x = ACTION_SPOT_X + 105 = 415)
          const compress = t >= 0.18 ? (t - 0.18) / 0.14 : 0;
          jollaFaceMode = t >= 0.2 ? 'panic' : 'happy';
          jollaX = ACTION_SPOT_X + 105;
          jollaY = GROUND_Y - 52 + compress * 9;
        } else if (t < 0.72) {
          // Spring BOINGS! Jollaman rockets high into the swimming pool on the left!
          const flyT = (t - 0.32) / 0.4;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 105 - flyT * 235;
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 195 + flyT * 58;
          jollaRot = -540 * flyT;
        } else {
          // Submerged in swimming pool behind translucent water surface!
          poolBobbing = true;
          jollaFaceMode = 'dizzy';
          jollaX = 180;
          jollaY = GROUND_Y + 6 + Math.sin(anim.walkTime * 6) * 3;
        }
        break;
      }
      case 'ㄶ': {
        if (t < 0.42) {
          jollaFaceMode = t >= 0.28 ? 'panic' : 'happy';
          jollaX = ACTION_SPOT_X + 75;
          jollaY = GROUND_Y - 56 - Math.abs(Math.sin(t * 16)) * 12;
        } else if (t < 0.72) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 75 + Math.sin(t * 42) * 5;
          jollaY = GROUND_Y - 46;
        } else {
          // Buried cleanly inside AmusementBallpitSvg peephole!
          jollaVisible = false;
          jollaX = ACTION_SPOT_X + 75;
        }
        break;
      }
      case '짧다': {
        if (t < 0.28) {
          // Standing eagerly at the tiny "출발" gate
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X + 35;
          jollaY = GROUND_Y - 52;
        } else if (t < 0.48) {
          // Rides tiny coaster car and finishes in 0.2s!
          const st = (t - 0.28) / 0.2;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 49 + st * 92;
          jollaY = GROUND_Y - 64 - Math.sin(st * Math.PI) * 14;
          jollaScaleX = 0.85;
          jollaScaleY = 0.85;
        } else {
          // Already popped out at "도착?!" looking puzzled pointing at ㄹ!
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X + 184;
          jollaY = GROUND_Y - 52;
        }
        break;
      }
      case 'ㄽ': {
        // 2D side-view One-Way Rail Cart (track centered at x = 500, y = GROUND_Y)
        if (t < 0.18) {
          const hop = t / 0.18;
          jollaFaceMode = 'happy';
          jollaX = 250 + hop * 95;
          jollaY = GROUND_Y - 52 - Math.sin(hop * Math.PI) * 32;
          jollaScaleX = 0.88;
          jollaScaleY = 0.88;
        } else if (t < 0.34) {
          const roll = (t - 0.18) / 0.16;
          jollaFaceMode = 'happy';
          jollaX = 345 + roll * 55;
          jollaY = GROUND_Y - 68;
          jollaScaleX = 0.88;
          jollaScaleY = 0.88;
        } else if (t < 0.62) {
          // Tries reversing back against locked one-way turnstile & bonks!
          const bonkT = (t - 0.34) / 0.28;
          jollaFaceMode = 'panic';
          jollaX = 400 - Math.sin(bonkT * Math.PI) * 72;
          jollaY = GROUND_Y - 68;
          jollaScaleX = 0.88;
          jollaScaleY = 0.88;
        } else {
          // Zooms straight forward along glowing ㄹ track!
          const zoomT = (t - 0.62) / 0.38;
          jollaFaceMode = 'happy';
          jollaX = 400 + zoomT * 285;
          jollaY = GROUND_Y - 68;
          jollaScaleX = 0.88;
          jollaScaleY = 0.88;
        }
        break;
      }
      case 'ㄾ': {
        if (t < 0.34) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X + 8;
        } else if (t < 0.68) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 40) * 5;
        } else {
          jollaFaceMode = 'crying';
          jollaX = ACTION_SPOT_X - 10;
        }
        break;
      }
      case 'ㅀ': {
        // Surrounded & grabbed by Ghost-Zombie Parade right in center!
        jollaFaceMode = 'panic';
        jollaX = ACTION_SPOT_X + 75 + (t >= 0.35 ? Math.sin(anim.walkTime * 34) * 5 : 0);
        jollaY = GROUND_Y - 52;
        break;
      }
      case 'ㅄ': {
        if (t < 0.4) {
          const walkP = t / 0.4;
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 55 + walkP * 90;
        } else if (t < 0.72) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 35;
        } else {
          shockPaleOutline = true;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 30;
        }
        break;
      }
      case 'ㄺ': {
        if (t < 0.34) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X + Math.sin(t * 24) * 8;
        } else if (t < 0.68) {
          jollaFaceMode = 'panic';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X + Math.sin(t * 50) * 6;
        } else {
          // Flops onto straw nest and lays a shiny golden egg!
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X - 18;
          jollaY = GROUND_Y - 46;
          jollaRot = -18;
        }
        break;
      }
      case 'ㄻ': {
        if (t < 0.36) {
          jollaFaceMode = 'crying';
          jollaX = ACTION_SPOT_X - 10;
        } else if (t < 0.68) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 42) * 5;
        } else {
          // Spun mid-air inside belly-button vacuum tornado!
          const spin = (t - 0.68) / 0.32;
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X + Math.sin(spin * Math.PI * 6) * 24;
          jollaY = GROUND_Y - 78 - Math.sin(spin * Math.PI) * 76;
          jollaRot = spin * 1080;
        }
        break;
      }
      case 'ㄼ': {
        if (t < 0.28) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 28 + (t / 0.28) * 48;
        } else if (t < 0.68) {
          // 180-degree split trapped on giant pink bubblegum!
          const sp = Math.min((t - 0.28) / 0.22, 1);
          splitSpread = sp;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 20;
          jollaY = GROUND_Y - 52 + sp * 30;
        } else {
          // Giant bubble POPPED onto face!
          splitSpread = 1;
          gumSplatOnFace = true;
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X + 20;
          jollaY = GROUND_Y - 22;
        }
        break;
      }
      case 'ㄿ': {
        if (t < 0.36) {
          openMouthPoetry = true;
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X;
        } else if (t < 0.66) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + Math.sin(t * 50) * 5;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 24)) * 20;
        } else {
          swallowedMicBelly = true;
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X;
        }
        break;
      }
      case '읽고': {
        if (t < 0.4) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 38;
        } else if (t < 0.7) {
          jollaFaceMode = 'panic';
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 28)) * 22;
        } else {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 42;
        }
        break;
      }
      case '많아': {
        if (t < 0.38) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 32;
        } else if (t < 0.68) {
          jollaFaceMode = 'happy';
          jollaY = GROUND_Y - 52 - Math.sin(((t - 0.38) / 0.3) * Math.PI) * 38;
        } else {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X + 26;
        }
        break;
      }
      case '많고': {
        if (t < 0.44) {
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 36;
        } else if (t < 0.72) {
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - 48 + Math.sin(t * 58) * 6;
        } else {
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X - 58;
          jollaY = GROUND_Y - 52;
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㄳ':
        holdingLastPizzaSlice = true;
        jollaFaceMode = 'happy';
        jollaX = ACTION_SPOT_X - 24;
        jollaY = GROUND_Y - 54;
        break;
      case 'ㄵ':
        poolBobbing = true;
        jollaFaceMode = 'dizzy';
        jollaX = 180;
        jollaY = GROUND_Y + 6 + Math.sin(anim.walkTime * 6) * 3;
        break;
      case 'ㄶ':
        jollaVisible = false;
        jollaX = ACTION_SPOT_X + 75;
        break;
      case '짧다':
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X + 184;
        jollaY = GROUND_Y - 52;
        break;
      case 'ㄽ':
        jollaFaceMode = 'happy';
        jollaX = 685;
        jollaY = GROUND_Y - 68;
        jollaScaleX = 0.88;
        jollaScaleY = 0.88;
        break;
      case 'ㄾ':
        jollaFaceMode = 'crying';
        jollaX = ACTION_SPOT_X - 10;
        break;
      case 'ㅀ':
        jollaFaceMode = 'panic';
        jollaX = ACTION_SPOT_X + 75;
        jollaY = GROUND_Y - 52;
        break;
      case 'ㅄ':
        shockPaleOutline = true;
        jollaFaceMode = 'panic';
        jollaX = ACTION_SPOT_X + 30;
        break;
      case 'ㄺ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X - 18;
        jollaY = GROUND_Y - 46;
        jollaRot = -18;
        break;
      case 'ㄻ':
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X + Math.sin(anim.walkTime * 6) * 16;
        jollaY = GROUND_Y - 96;
        jollaRot = anim.walkTime * 480;
        break;
      case 'ㄼ':
        splitSpread = 1;
        gumSplatOnFace = true;
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X + 20;
        jollaY = GROUND_Y - 22;
        break;
      case 'ㄿ':
        swallowedMicBelly = true;
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X;
        break;
      case '읽고':
        jollaFaceMode = 'happy';
        jollaX = ACTION_SPOT_X - 42;
        break;
      case '많아':
        jollaFaceMode = 'happy';
        jollaX = ACTION_SPOT_X + 26;
        break;
      case '많고':
        jollaFaceMode = 'dizzy';
        jollaX = ACTION_SPOT_X - 58;
        break;
    }
  }

  const revealSubtitle = tRevealSubtitle(7, selectedItem.char, selectedItem.gagSummary);
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  return (
    <JollamanStageShell
      icon={part === 'back' ? '🧩' : '🎡'}
      title={partTitle}
      accentButtonClass={part === 'back' ? 'bg-rose-600 hover:bg-rose-700' : 'bg-orange-600 hover:bg-orange-700'}
      stageBgClass="bg-amber-50"
      ariaLabel={`${partTitle} 2D 시뮬레이션 무대`}
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: part === 'back' ? 'chillLounge' : 'memeShorts',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((prev) => !prev),
        activeClass: 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-100',
        activeLabel: '🎵 힐링 BGM 켜짐',
        title: '따뜻한 로파이 힐링 배경음악 켜기/끄기',
      }}
      items={activeItems}
      selectedItem={selectedItem}
      learnedKeys={learnedChars}
      getKey={(item) => item.char}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      skyTokenStyle={part === 'back' ? 'pill' : 'balloon'}
      pillWidth={96}
      pillHeight={42}
      getTokenText={(item) => {
        if (item.char === '짧다') return 'ㄼ';
        if (part === 'back') {
          if (item.char === 'ㄺ') return '닭(ㄺ)';
          if (item.char === 'ㄻ') return '굶(ㄻ)';
          if (item.char === 'ㄿ') return '읊(ㄿ)';
          if (item.char === 'ㄼ') return '밟다';
        }
        return item.char;
      }}
      getTabLabel={(item) => {
        if (item.char === '짧다') return 'ㄼ';
        if (item.char === 'ㄼ' && part === 'back') return '밟다';
        return item.char;
      }}
      tabGroups={
        part === 'back'
          ? [
              { prefixLabel: '뒷자음으로 발음', keys: ['ㄺ', 'ㄻ', 'ㄿ'] },
              { prefixLabel: '예외·ㅎ', keys: ['ㄼ', '읽고', '많아', '많고'] },
            ]
          : [
              { prefixLabel: '앞자음으로 발음', keys: ['ㄳ', 'ㄵ', 'ㄶ', '짧다', 'ㄽ', 'ㄾ', 'ㅀ', 'ㅄ'] },
            ]
      }
      getSkyTokenBadge={(item) =>
        part === 'back' &&
        (item.char === 'ㄼ' || item.char === '읽고' || item.char === '많아' || item.char === '많고')
          ? '★ EX'
          : undefined
      }
      orbRadius={31}
      orbFontSize={32}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={580}
      walkingHint={
        part === 'back'
          ? '하늘의 뒷소리·예외·ㅎ 카드를 눌러보세요!'
          : '놀이공원 하늘의 겹받침 풍선 (ㄳ ~ ㅄ)을 눌러보세요!'
      }
      activeCaption={`${selectedItem.triggerWord} (${selectedItem.soundLabel})`}
      revealAriaLabel={`${selectedItem.soundLabel}, ${selectedItem.triggerWord} 학습 화면`}
      revealGlyph={selectedItem.sampleSyllable}
      revealHeadline={
        <span className="inline-flex flex-wrap items-baseline justify-center text-center">
          <span style={{ color: selectedItem.color }}>{selectedItem.soundLabel}</span>
          <span aria-hidden="true" className="mx-3 sm:mx-3.5 text-slate-400">·</span>
          <span>{selectedItem.triggerWord}</span>
        </span>
      }
      revealSubtitle={revealSubtitle}
      flashcard={(() => {
        const cleanWord = selectedItem.triggerWord.replace(/\s*\[[^\]]+\]/, '').trim();
        const dropoutPair = part === 'front' ? FRONT_DROPOUT_PAIR[selectedItem.char] : undefined;
        return {
          glyph: selectedItem.char === '짧다' ? 'ㄼ' : selectedItem.char,
          glyphNode: dropoutPair ? (
            <DoubleBatchimDropoutGlyph
              kept={dropoutPair.kept}
              dropped={dropoutPair.dropped}
              accentColor={selectedItem.color}
              active={phase === 'reveal'}
            />
          ) : undefined,
          subLabel: selectedItem.soundLabel,
          accentColor: selectedItem.color,
          headlineNode: (
            <>
              <span style={{ color: selectedItem.color }}>{cleanWord}</span>
              <span className="ml-1.5 text-slate-600">[{selectedItem.pronunciation}]</span>
            </>
          ),
          headlineCharLen: cleanWord.length + selectedItem.pronunciation.length + 3,
          meaning: tWordMeaning(7, selectedItem.char, SERIES7_MEANINGS[selectedItem.char]),
          romanization: romanizeKorean(selectedItem.pronunciation),
          cornerIcon: getSeriesCornerIcon(7, selectedItem.char, anim.walkTime),
        };
      })()}
      backdropSlot={
        <DoubleBatchimBackdrop
          activeChar={phase === 'walking' ? activeItems[0].char : activeChar}
          isWalkingMode={part === 'front' && phase === 'walking'}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >
      {/* 3. SCENARIO PROPS (Jollaman walks ALONE during walking/approaching!) */}
      {phase !== 'walking' && (
        <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
          {/* 1. ㄳ (몫): Indoor Pizzeria — 5 Slices Munched in a Flash, Jollaman Holds Last 1 ("내 몫!!") */}
          {activeChar === 'ㄳ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const eating = phase === 'action' && t >= 0.34 && t < 0.68;
            const claimed = t >= 0.68 || phase === 'aftermath' || phase === 'reveal';
            const remainingSlices = eating
              ? Math.max(1, 6 - Math.floor(((t - 0.34) / 0.34) * 5))
              : claimed
              ? 0
              : 6;

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 75}, ${GROUND_Y - 48})`}>
                  <PizzeriaPizzaPanSvg remainingSlices={remainingSlices} munching={eating} walkTime={anim.walkTime} />
                </g>
                {claimed && (
                  <text
                    x={ACTION_SPOT_X - 24}
                    y={GROUND_Y - 165}
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="900"
                    fill="#EA580C"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    style={{ paintOrder: 'stroke fill' }}
                  >
                    내 몫!! (ㄱ)
                  </text>
                )}
              </g>
            );
          })()}

          {/* 2. ㄵ (앉다): Hydraulic Poolside Flying Chair -> Springs Jollaman Into Swimming Pool! */}
          {activeChar === 'ㄵ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const compress = phase === 'action' && t >= 0.18 && t < 0.32 ? (t - 0.18) / 0.14 : 0;
            const sprung = t >= 0.32 || phase === 'aftermath' || phase === 'reveal';
            const stretch =
              phase === 'action' && t >= 0.32 ? Math.min((t - 0.32) / 0.16, 1) : sprung ? 0.92 : 0;
            const inPool = t >= 0.72 || phase === 'aftermath' || phase === 'reveal';

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 105}, ${GROUND_Y - 34})`}>
                  <PoolsideFlyingChairsSvg springStretch={stretch} compress={compress} />
                </g>
                {sprung && (
                  <g transform={`translate(${ACTION_SPOT_X + 105}, ${GROUND_Y - 125})`}>
                    <ComicImpactBurstSvg scale={0.78} fill="#BAE6FD" stroke="#0284C7" />
                    <text
                      x="0"
                      y="-38"
                      textAnchor="middle"
                      fontSize="19"
                      fontWeight="900"
                      fill="#0284C7"
                      stroke="#FFFFFF"
                      strokeWidth="3.5"
                      style={{ paintOrder: 'stroke fill' }}
                    >
                      띠요오옹!!
                    </text>
                  </g>
                )}
                {inPool && (
                  <text
                    x={180}
                    y={308}
                    textAnchor="middle"
                    fontSize="22"
                    fontWeight="900"
                    fill="#0284C7"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    style={{ paintOrder: 'stroke fill' }}
                  >
                    풍덩! ㄴ만 남음
                  </text>
                )}
              </g>
            );
          })()}

          {/* 3. ㄶ (많네): Indoor Ballpit Playroom — Jollaman Buried Under Balls, Only Eyes & ㄴ Peek Out! */}
          {activeChar === 'ㄶ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const ballWave =
              phase === 'approaching'
                ? 0
                : phase === 'action'
                ? Math.max(0, Math.min(1, (t - 0.34) / 0.38))
                : 1;
            const buried = t >= 0.72 || phase === 'aftermath' || phase === 'reveal';

            return (
              <g transform={`translate(500, ${GROUND_Y + 6})`}>
                <AmusementBallpitSvg ballWave={ballWave} buried={buried} walkTime={anim.walkTime} />
              </g>
            );
          })()}

          {/* 4. 짧다 (ㄼ→ㄹ 원칙): Ultra-Short 30cm Roller Coaster -> Instant Arrival -> Points at ㄹ! */}
          {activeChar === '짧다' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const riding = phase === 'action' && t >= 0.28 && t < 0.48;
            const arrived = t >= 0.48 || phase === 'aftermath' || phase === 'reveal';
            const carProgress = phase === 'approaching' ? 0 : t < 0.28 ? 0 : riding ? (t - 0.28) / 0.2 : 1;

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 95}, ${GROUND_Y})`}>
                  <TooShortCoasterSvg carProgress={carProgress} showCar={true} />
                </g>
                {arrived && (
                  <g transform={`translate(${ACTION_SPOT_X + 218}, ${GROUND_Y - 96})`}>
                    <circle cx="0" cy="0" r="24" fill="#FDF2F8" stroke="#EC4899" strokeWidth="3.5" />
                    <text x="0" y="9" textAnchor="middle" fontSize="26" fontWeight="900" fill="#DB2777">
                      ㄹ
                    </text>
                    <text x="-14" y="-32" textAnchor="middle" fontSize="16" fontWeight="900" fill="#BE185D" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      어? 벌써 도착?!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 4. ㄺ (닭): Angry Rooster pecks Jollaman onto nest -> Lays Golden Egg! */}
          {activeChar === 'ㄺ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const pecking = phase === 'action' && t >= 0.34 && t < 0.68;
            const laidEgg = t >= 0.68 || phase === 'aftermath' || phase === 'reveal';

            let rx = ACTION_SPOT_X + 125;
            let ry = GROUND_Y - 30;
            if (phase === 'action' && t >= 0.34 && t < 0.68) {
              rx = ACTION_SPOT_X + 32 + Math.sin(t * 48) * 14;
              ry = GROUND_Y - 102 + Math.cos(t * 44) * 10;
            } else if (laidEgg) {
              rx = ACTION_SPOT_X + 135;
              ry = GROUND_Y - 30;
            }

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X - 18}, ${GROUND_Y - 14})`}>
                  <GoldenEggNestSvg hasEgg={laidEgg} />
                </g>
                <g transform={`translate(${rx}, ${ry}) scale(${laidEgg ? -1 : 1}, 1)`}>
                  <CrazyRoosterSvg walkTime={anim.walkTime} flying={pecking} angry={pecking} />
                </g>
                {laidEgg && (
                  <g transform={`translate(${ACTION_SPOT_X - 18}, ${GROUND_Y - 128}) scale(0.45)`}>
                    <SparkleBurstSvg color="#FACC15" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* 5. ㄻ (굶다): Empty Fridge opens -> Starving Belly Vacuum Tornado! */}
          {activeChar === 'ㄻ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const fridgeOpen = t >= 0.2 || phase === 'aftermath' || phase === 'reveal';
            const tornado = t >= 0.68 || phase === 'aftermath' || phase === 'reveal';

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 118}, ${GROUND_Y})`}>
                  <EmptyFridgeSvg isOpen={fridgeOpen} walkTime={anim.walkTime} />
                </g>
                {phase === 'action' && t >= 0.36 && t < 0.68 && (
                  <text x={ACTION_SPOT_X} y={GROUND_Y - 124} textAnchor="middle" fontSize="20" fontWeight="900" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                    꼬르륵~
                  </text>
                )}
                {tornado && (
                  <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 40})`}>
                    <BellyTornadoSvg walkTime={anim.walkTime} />
                    <text x="0" y="-158" textAnchor="middle" fontSize="22" fontWeight="900" fill="#BAE6FD" stroke="#0F172A" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      배고파!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 6. ㄼ (밟다): Sticky Bubblegum Trap -> 180° Split -> Giant Bubble POP! */}
          {activeChar === 'ㄼ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const bubbleSize =
              phase === 'action' && t >= 0.44 && t < 0.68 ? (t - 0.44) / 0.24 : 0;
            const popped = t >= 0.68 || phase === 'aftermath' || phase === 'reveal';

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 20}, ${GROUND_Y})`}>
                  <BubblegumTrapSvg spread={splitSpread} bubbleSize={bubbleSize} popped={popped} />
                </g>
                {popped && (
                  <g transform={`translate(${ACTION_SPOT_X + 20}, ${GROUND_Y - 124})`}>
                    <ComicImpactBurstSvg scale={0.85} fill="#F9A8D4" stroke="#BE185D" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* 5. ㄽ (외곬): 2D Side-View One-Way Rail Cart -> Turnstile Locks, Straight ㄹ Path! */}
          {activeChar === 'ㄽ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const gateLocked = t >= 0.24 || phase === 'aftermath' || phase === 'reveal';
            const bonked = phase === 'action' && t >= 0.34 && t < 0.62;
            const siotDropped = t >= 0.42 || phase === 'aftermath' || phase === 'reveal';
            const showGuideRieul = t >= 0.62 || phase === 'aftermath' || phase === 'reveal';
            let cartX = -155;
            if (phase === 'action') {
              if (t < 0.18) {
                cartX = -155;
              } else if (t < 0.34) {
                cartX = -155 + ((t - 0.18) / 0.16) * 55;
              } else if (t < 0.62) {
                cartX = -100 - Math.sin(((t - 0.34) / 0.28) * Math.PI) * 72;
              } else {
                cartX = -100 + ((t - 0.62) / 0.38) * 285;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              cartX = 185;
            }

            return (
              <g>
                <g transform={`translate(500, ${GROUND_Y})`}>
                  <OneWayRailTrackSvg
                    gateLocked={gateLocked}
                    showGuideRieul={showGuideRieul}
                    cartX={cartX}
                    siotDropped={siotDropped}
                    walkTime={anim.walkTime}
                  />
                </g>
                {bonked && (
                  <text
                    x={315}
                    y={GROUND_Y - 126}
                    textAnchor="middle"
                    fontSize="20"
                    fontWeight="900"
                    fill="#EF4444"
                    stroke="#FFFFFF"
                    strokeWidth="3.5"
                    style={{ paintOrder: 'stroke fill' }}
                  >
                    콩! 후진 불가!
                  </text>
                )}
              </g>
            );
          })()}

          {/* 6. ㄾ (핥다): Giant 3-Scoop Ice Cream -> Cute Passing Puppy Licks It First! */}
          {activeChar === 'ㄾ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const dogSwoop = t >= 0.34;
            const licking = phase === 'action' && t >= 0.42 && t < 0.72;
            const licked = t >= 0.54 || phase === 'aftermath' || phase === 'reveal';
            const dogX =
              phase === 'action' && t < 0.34
                ? ACTION_SPOT_X + 350
                : phase === 'action' && t < 0.68
                ? ACTION_SPOT_X + 350 - ((t - 0.34) / 0.34) * 238
                : ACTION_SPOT_X + 128;

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 55}, ${GROUND_Y - 54})`}>
                  <GiantIceCreamConeSvg licked={licked} />
                </g>
                {(dogSwoop || phase === 'aftermath' || phase === 'reveal') && (
                  <g transform={`translate(${dogX}, ${GROUND_Y - 26})`}>
                    <CutePassingPuppySvg licking={licking} walkTime={anim.walkTime} />
                  </g>
                )}
                {licking && (
                  <text x={ACTION_SPOT_X + 55} y={GROUND_Y - 125} textAnchor="middle" fontSize="21" fontWeight="900" fill="#D97706" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                    낼름!!
                  </text>
                )}
                {licked && (
                  <g transform={`translate(${ACTION_SPOT_X + 55}, ${GROUND_Y - 128})`}>
                    <circle cx="0" cy="0" r="22" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.5" />
                    <text x="0" y="9" textAnchor="middle" fontSize="26" fontWeight="900" fill="#B45309">
                      ㄹ
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 9. ㄿ (읊다): Reciting Autumn Poetry -> Swallows Leaf & Mic Head! */}
          {activeChar === 'ㄿ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const micGone = t >= 0.66 || phase === 'aftermath' || phase === 'reveal';
            const leafZoom = phase === 'action' && t >= 0.25 && t < 0.45;
            const leafX = leafZoom ? ACTION_SPOT_X + 180 - ((t - 0.25) / 0.2) * 175 : -100;

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 34}, ${GROUND_Y})`}>
                  <PoetryMicStandSvg hasMicHead={!micGone} />
                </g>
                {leafZoom && (
                  <g transform={`translate(${leafX}, ${GROUND_Y - 96})`}>
                    <ellipse cx="0" cy="0" rx="10" ry="5" transform="rotate(-20)" fill="#EA580C" stroke="#7C2D12" strokeWidth="1.5" />
                    <circle cx="16" cy="-6" r="3.5" fill="#0F172A" />
                    <ellipse cx="15" cy="-10" rx="3" ry="2" fill="#E2E8F0" />
                  </g>
                )}
                {micGone && (
                  <text x={ACTION_SPOT_X} y={GROUND_Y - 134} textAnchor="middle" fontSize="22" fontWeight="900" fill="#EA580C" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                    아~ 아~!
                  </text>
                )}
              </g>
            );
          })()}

          {/* 7. ㅀ (싫어): Ghost & Zombie Parade Grabs Jollaman -> Yells "싫어!!" -> ㄹ Links [시러]! */}
          {activeChar === 'ㅀ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const grabbing = t >= 0.35 || phase === 'aftermath' || phase === 'reveal';

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 75}, ${GROUND_Y - 48})`}>
                  <GhostZombieParadeSvg grabbing={grabbing} walkTime={anim.walkTime} />
                </g>
                {grabbing && (
                  <text
                    x={ACTION_SPOT_X + 75}
                    y={GROUND_Y - 122}
                    textAnchor="middle"
                    fontSize="24"
                    fontWeight="900"
                    fill="#FEF08A"
                    stroke="#581C87"
                    strokeWidth="4"
                    style={{ paintOrder: 'stroke fill' }}
                  >
                    으악! 싫어!! (ㄹ→시러)
                  </text>
                )}
              </g>
            );
          })()}

          {/* 8. ㅄ (없다): Dead-End Park Exit ("출구 없음") -> ㅅ Vanishes, ㅂ Remains! */}
          {activeChar === 'ㅄ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const revealed = t >= 0.4 || phase === 'aftermath' || phase === 'reveal';
            const shocked = t >= 0.72 || phase === 'aftermath' || phase === 'reveal';

            return (
              <g>
                <g transform={`translate(${ACTION_SPOT_X + 145}, ${GROUND_Y})`}>
                  <NoExitSignPlazaSvg revealed={revealed} />
                </g>
                {shocked && (
                  <g transform={`translate(${ACTION_SPOT_X + 35}, ${GROUND_Y - 145})`}>
                    <circle cx="0" cy="0" r="24" fill="#EEF2FF" stroke="#4F46E5" strokeWidth="3.5" />
                    <text x="0" y="9" textAnchor="middle" fontSize="26" fontWeight="900" fill="#4338CA">
                      ㅂ
                    </text>
                    <text x="58" y="-12" fontSize="18" fontWeight="900" fill="#94A3B8" opacity="0.7">
                      ㅅ 뿅~
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 13. 읽고 (ㄺ+ㄱ→ㄹ 예외): Superhero ㄹ kicks twin ㄱ out -> [일꼬]! */}
          {activeChar === '읽고' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const heroActive = t >= 0.34 || phase === 'aftermath' || phase === 'reveal';
            const resolved = t >= 0.7 || phase === 'aftermath' || phase === 'reveal';
            return (
              <g transform={`translate(${ACTION_SPOT_X + 75}, ${GROUND_Y - 18})`}>
                <MagicSpellbookIlkkoSvg
                  phaseT={t}
                  heroActive={heroActive}
                  resolved={resolved}
                  walkTime={anim.walkTime}
                />
              </g>
            );
          })()}

          {/* 14. 많아 (ㅎ+모음 탈락연음): ㅎ Ghost Poofs + ㄴ Jumps into ㅇ -> [마나]! */}
          {activeChar === '많아' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const dropped = t >= 0.38 || phase === 'aftermath' || phase === 'reveal';
            const linked = t >= 0.68 || phase === 'aftermath' || phase === 'reveal';
            return (
              <g transform={`translate(${ACTION_SPOT_X + 68}, ${GROUND_Y - 18})`}>
                <HieutGhostManaSvg dropped={dropped} linked={linked} walkTime={anim.walkTime} />
              </g>
            );
          })()}

          {/* 15. 많고 (ㅎ+파열음 축약): Fiery Cannonball ㅎ + ㄱ -> ㅋ Fusion [만코]! */}
          {activeChar === '많고' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const charging = t >= 0.25 || phase === 'aftermath' || phase === 'reveal';
            const fused = t >= 0.72 || phase === 'aftermath' || phase === 'reveal';
            return (
              <g transform={`translate(${ACTION_SPOT_X + 68}, ${GROUND_Y - 18})`}>
                <HieutCannonballMankoSvg charging={charging} fused={fused} walkTime={anim.walkTime} />
                {fused && (
                  <g transform="translate(12, -104)">
                    <ComicImpactBurstSvg scale={0.95} fill="#FEF08A" stroke="#DC2626" />
                  </g>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* 4. MAIN JOLLAMAN STICK FIGURE */}
      {jollaVisible && (
        <g
          transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${
            jollaFacing * jollaScaleX
          }, ${jollaScaleY})`}
          onClick={toggleJollaPause}
          className="cursor-pointer"
          opacity={shockPaleOutline ? 0.85 : 1}
        >
          <rect x="-48" y="-76" width="96" height="132" fill="transparent" />
          {jollaRot === 0 && jollaScaleY > 0.5 && splitSpread === 0 && (
            <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
          )}

          {splitSpread > 0.05 ? (
            <g>
              <line
                x1="-2"
                y1="14"
                x2={-14 - splitSpread * 44}
                y2={46 - splitSpread * 24}
                stroke="#0F172A"
                strokeWidth="5.2"
                strokeLinecap="round"
              />
              <ellipse
                cx={-18 - splitSpread * 44}
                cy={48 - splitSpread * 24}
                rx="8"
                ry="4.5"
                fill="#EF4444"
                stroke="#0F172A"
                strokeWidth="2.2"
              />
              <line
                x1="2"
                y1="14"
                x2={14 + splitSpread * 44}
                y2={46 - splitSpread * 24}
                stroke="#0F172A"
                strokeWidth="5.2"
                strokeLinecap="round"
              />
              <ellipse
                cx={18 + splitSpread * 44}
                cy={48 - splitSpread * 24}
                rx="8"
                ry="4.5"
                fill="#EF4444"
                stroke="#0F172A"
                strokeWidth="2.2"
              />
              <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
              <path d="M0 -12 L-24 -26" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
              <circle cx="-24" cy="-26" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <path d="M0 -12 L24 -26" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
              <circle cx="24" cy="-26" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="0" cy="-36" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
              <circle cx="-5" cy="-38" r="2.4" fill="#0F172A" />
              <circle cx="5" cy="-38" r="2.4" fill="#0F172A" />
              <ellipse cx="0" cy="-28" rx="4.5" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
            </g>
          ) : (
            <JollamanCharacterSvg
              faceMode={jollaFaceMode}
              isWalking={isWalkingMotion}
              legSwing={legSwing}
              armSwing={armSwing}
              showHeadBump={showHeadBump}
              walkTime={anim.walkTime}
              activeChar={activeChar}
            />
          )}

          {/* ㄳ: Jollaman triumphantly holding up the last remaining pizza slice! */}
          {holdingLastPizzaSlice && (
            <g transform="translate(18, -32) rotate(-14)">
              <PizzaSliceWithFlagSvg />
            </g>
          )}

          {/* ㄼ: Sticky Pink Bubblegum Splat covering Jollaman's face! */}
          {gumSplatOnFace && <BubblegumFaceSplatSvg />}

          {/* ㄿ: Open Poetry Book + Singing Wide Mouth before swallowing mic! */}
          {openMouthPoetry && (
            <g>
              <ellipse cx="4" cy="-28" rx="6" ry="7" fill="#991B1B" stroke="#0F172A" strokeWidth="2" />
              <g transform="translate(22, -16) rotate(-14)">
                <path d="M-12,-8 L0,-5 L0,11 L-12,8 Z" fill="#FFFBEB" stroke="#78350F" strokeWidth="1.8" />
                <path d="M12,-8 L0,-5 L0,11 L12,8 Z" fill="#FEF3C7" stroke="#78350F" strokeWidth="1.8" />
              </g>
              <text x="24" y="-58" fontSize="18" fontWeight="900" fill="#EA580C">♪ ♫</text>
            </g>
          )}

          {/* ㄿ: Swallowed Mic Echoing Belly! */}
          {swallowedMicBelly && (
            <g>
              <circle cx="0" cy="-2" r="14" fill="#CBD5E1" stroke="#334155" strokeWidth="2.8" />
              <path
                d={`M18 -10 Q${26 + Math.sin(anim.walkTime * 18) * 4} -2 18 6`}
                fill="none"
                stroke="#FACC15"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <path
                d={`M25 -15 Q${36 + Math.sin(anim.walkTime * 18) * 5} -2 25 11`}
                fill="none"
                stroke="#F97316"
                strokeWidth="3"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* Spinning dizzy star in aftermath/reveal */}
          {(phase === 'aftermath' || phase === 'reveal') &&
            (activeChar === 'ㄵ' ||
              activeChar === '짧다' ||
              activeChar === 'ㄺ' ||
              activeChar === 'ㄻ' ||
              activeChar === 'ㄼ' ||
              activeChar === 'ㄿ') && (
              <DizzyStarOrbitSvg walkTime={anim.walkTime} />
            )}
        </g>
      )}

      {/* 5. POOL WATER FOREGROUND OVERLAY (Submerges Jollaman's lower body in ㄵ!) */}
      {phase !== 'walking' && activeChar === 'ㄵ' && (
        <SwimmingPoolWaterForegroundSvg walkTime={anim.walkTime} splashed={poolBobbing} />
      )}
    </JollamanStageShell>
  );
};
