import React, { useState } from 'react';
import {
  playCarWhoosh,
  playCartoonImpact,
  playCartoonSplat,
  playCutePop,
  playScenarioSfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES14_MEANINGS: Record<DailyLifeKey, string> = {
  가다: 'To go',
  오다: 'To come',
  먹다: 'To eat',
  마시다: 'To drink',
  자다: 'To sleep',
  보다: 'To watch',
  주다: 'To give',
  좋아하다: 'To like',
  안녕: 'Hello!',
  감사: 'Thank you!',
  죄송: "I'm sorry!",
  괜찮아: "It's okay!",
  얼마: 'How much is it?',
  맛있어: "It's delicious!",
  배고파: "I'm hungry!",
  사랑해: 'I love you!',
};
import {
  CartoonHeartSvg,
  ComicImpactBurstSvg,
  DizzyStarOrbitSvg,
  JollamanCharacterSvg,
  JollamanFaceMode,
  SparkleBurstSvg,
} from './JollamanSprites';
import { BuddyJollamanSvg } from './JollamanSprites3';
import { GirlfriendJollamanSvg } from './JollamanSprites4';
import {
  FallingAnvil100tSvg,
  FluffyBedAndZzzSvg,
  GiantBobaCupSvg,
  GiantRamenBowlSvg,
  PriceTagStallSvg,
  Series14Backdrop,
  Series14BackdropTheme,
  ShatteredVasePedestalSvg,
} from './JollamanSprites14';

export type DailyLifeKey =
  | '가다'
  | '오다'
  | '먹다'
  | '마시다'
  | '자다'
  | '보다'
  | '주다'
  | '좋아하다'
  | '안녕'
  | '감사'
  | '죄송'
  | '괜찮아'
  | '얼마'
  | '맛있어'
  | '배고파'
  | '사랑해';

export interface DailyLifeItem {
  key: DailyLifeKey;
  group: 'verb' | 'phrase';
  skyLabel: string;
  revealGlyph: string;
  ruleBadge: string;
  resultDisplay: string;
  pronunciation: string;
  ttsReveal: string;
  gagLine: string;
  color: string;
  backdrop: Series14BackdropTheme;
}

// Exact 1:1 Match with DAILY_VERB_PHRASE_SEEDS (16 items: 8 verbs + 8 survival phrases)
export const DAILY_LIFE_ITEMS: DailyLifeItem[] = [
  // Essential Verbs (8)
  { key: '가다', group: 'verb', skyLabel: '가다', revealGlyph: '가다', ruleBadge: '필수 동사 (go)', resultDisplay: '가다 → 가요!', pronunciation: '가요', ttsReveal: '가다, 가요!', gagLine: '제트 로켓 스케이트 슝~!', color: '#EF4444', backdrop: 'street_race' },
  { key: '오다', group: 'verb', skyLabel: '오다', revealGlyph: '오다', ruleBadge: '필수 동사 (come)', resultDisplay: '오다 → 와요!', pronunciation: '와요', ttsReveal: '오다, 와요!', gagLine: '이리 와요! 자석 철컥!', color: '#F97316', backdrop: 'street_race' },
  { key: '먹다', group: 'verb', skyLabel: '먹다', revealGlyph: '먹다', ruleBadge: '필수 동사 (eat)', resultDisplay: '먹다 → 먹어요!', pronunciation: '먹어요', ttsReveal: '먹다, 먹어요!', gagLine: '대왕 라면 진공흡입!', color: '#EAB308', backdrop: 'bunsik_shop' },
  { key: '마시다', group: 'verb', skyLabel: '마시다', revealGlyph: '마시다', ruleBadge: '필수 동사 (drink)', resultDisplay: '마시다 → 마셔요!', pronunciation: '마셔요', ttsReveal: '마시다, 마셔요!', gagLine: '2미터 버블티 빨대 쪽~!', color: '#06B6D4', backdrop: 'bunsik_shop' },
  { key: '자다', group: 'verb', skyLabel: '자다', revealGlyph: '자다', ruleBadge: '필수 동사 (sleep)', resultDisplay: '자다 → 자요!', pronunciation: '자요', ttsReveal: '자다, 자요!', gagLine: '드르렁 코골다 깜짝 뻥!', color: '#6366F1', backdrop: 'bedroom_night' },
  { key: '보다', group: 'verb', skyLabel: '보다', revealGlyph: '보다', ruleBadge: '필수 동사 (watch)', resultDisplay: '보다 → 봐요!', pronunciation: '봐요', ttsReveal: '보다, 봐요!', gagLine: 'TV 보고 눈알 띠용!!', color: '#8B5CF6', backdrop: 'living_tv' },
  { key: '주다', group: 'verb', skyLabel: '주다', revealGlyph: '주다', ruleBadge: '필수 동사 (give)', resultDisplay: '주다 → 주세요!', pronunciation: '주세요', ttsReveal: '주다, 주세요!', gagLine: '낙하산 선물 쏙~!', color: '#10B981', backdrop: 'plaza_bow' },
  { key: '좋아하다', group: 'verb', skyLabel: '좋아해', revealGlyph: '좋아해', ruleBadge: '필수 동사 (like)', resultDisplay: '좋아하다 → 좋아해요!', pronunciation: '좋아해요', ttsReveal: '좋아하다, 좋아해요!', gagLine: '하트 풍선 타고 둥실~', color: '#EC4899', backdrop: 'sunset_love' },

  // Survival Phrases (8)
  { key: '안녕', group: 'phrase', skyLabel: '안녕', revealGlyph: '안녕!', ruleBadge: '생존 회화 (hello)', resultDisplay: '안녕하세요!', pronunciation: '안녕하세요', ttsReveal: '안녕하세요!', gagLine: '90도 초고속 폴더인사!', color: '#0EA5E9', backdrop: 'plaza_bow' },
  { key: '감사', group: 'phrase', skyLabel: '감사', revealGlyph: '감사!', ruleBadge: '생존 회화 (thanks)', resultDisplay: '감사합니다!', pronunciation: '감사합니다', ttsReveal: '감사합니다!', gagLine: '감사 폭죽 별빛 팡팡!', color: '#22C55E', backdrop: 'plaza_bow' },
  { key: '죄송', group: 'phrase', skyLabel: '죄송', revealGlyph: '죄송!', ruleBadge: '생존 회화 (sorry)', resultDisplay: '죄송해요!', pronunciation: '죄송해요', ttsReveal: '죄송해요!', gagLine: '명품 도자기 와장창 싹싹!', color: '#64748B', backdrop: 'gallery_vase' },
  { key: '괜찮아', group: 'phrase', skyLabel: '괜찮아', revealGlyph: '괜찮아', ruleBadge: '생존 회화 (okay)', resultDisplay: '괜찮아요!', pronunciation: '괜찮아요', ttsReveal: '괜찮아요!', gagLine: '100톤 맞아도 왕혹 엄지척!', color: '#059669', backdrop: 'street_race' },
  { key: '얼마', group: 'phrase', skyLabel: '얼마', revealGlyph: '얼마?', ruleBadge: '생존 회화 (how much)', resultDisplay: '얼마예요?', pronunciation: '얼마예요', ttsReveal: '얼마예요?', gagLine: '999,999원?! 띠용 기절!', color: '#D97706', backdrop: 'market_stall' },
  { key: '맛있어', group: 'phrase', skyLabel: '맛있어', revealGlyph: '맛있어!', ruleBadge: '생존 회화 (delicious)', resultDisplay: '맛있어요!', pronunciation: '맛있어요', ttsReveal: '맛있어요!', gagLine: '무지개 맛 빔 발사!!', color: '#E11D48', backdrop: 'bunsik_shop' },
  { key: '배고파', group: 'phrase', skyLabel: '배고파', revealGlyph: '배고파!', ruleBadge: '생존 회화 (hungry)', resultDisplay: '배고파요!', pronunciation: '배고파요', ttsReveal: '배고파요!', gagLine: '배꼽시계 꼬르륵~ 스테이크 신기루!', color: '#EA580C', backdrop: 'bunsik_shop' },
  { key: '사랑해', group: 'phrase', skyLabel: '사랑해', revealGlyph: '사랑해!', ruleBadge: '생존 회화 (love)', resultDisplay: '사랑해요!', pronunciation: '사랑해요', ttsReveal: '사랑해요!', gagLine: '큐피드 하트 화살 명중!!', color: '#F43F5E', backdrop: 'sunset_love' },
];

type DailyPart = 'all' | 'verb' | 'phrase';

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 310;
const GROUND_Y = 368;

const ComicBubble: React.FC<{
  x: number;
  y: number;
  text: string;
  color: string;
}> = ({ x, y, text, color }) => (
  <g transform={`translate(${x}, ${y})`}>
    <rect
      x={-(text.length * 7.8 + 18)}
      y="-17"
      width={text.length * 15.6 + 36}
      height="34"
      rx="12"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="2.8"
    />
    <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="14.5" fontWeight="900" fill={color}>
      {text}
    </text>
  </g>
);

const DailyLifeStageInner: React.FC<{
  part: DailyPart;
  items: DailyLifeItem[];
  audioEnabled: boolean;
}> = ({ part, items, audioEnabled }) => {
  const getSkyX = (item: DailyLifeItem): number => {
    const idx = items.indexOf(item);
    const n = items.length;
    if (n <= 1) return 500;
    const minX = n > 10 ? 58 : 78;
    const maxX = n > 10 ? 942 : 922;
    return minX + (idx / (n - 1)) * (maxX - minX);
  };
  const getSkyY = (item: DailyLifeItem): number => {
    const idx = items.indexOf(item);
    return idx % 2 === 0 ? 50 : 90;
  };

  const {
    phase,
    selectedItem,
    learnedKeys,
    bgmEnabled,
    setBgmEnabled,
    anim,
    walkCycle,
    shorts,
    resetToWalking,
    handleItemClick,
  } = useJollamanStageEngine<DailyLifeItem, DailyLifeKey>({
    seriesNum: 14,
    seriesTitle:
      part === 'verb'
        ? '14-1. 졸라필수동사맨 (8종)'
        : part === 'phrase'
        ? '14-2. 졸라생존회화맨 (8종)'
        : '14. 졸라필수동사·회화맨 (16종)',
    items,
    audioEnabled,
    bgmTrack: 'retro2d',
    initialWalkX: 180,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    scrollSpeedOnApproach: 240,
    aftermathAnimMaxDur: 1.35,
    alwaysResetWalkX: true,
    playPopOnSelect: true,
    getKey: (item) => item.key,
    getLabel: (item) => item.resultDisplay,
    getBadge: (item) => item.ruleBadge,
    getAccentColor: (item) => item.color,
    getCaption: (item) => `${item.resultDisplay} · ${item.gagLine}`,
    getSpeakText: (item) => item.ttsReveal,
    getActionDuration: () => 3.25,
    getTargetStartX: () => ACTION_SPOT_X,
    onActionProgress: (item, t, { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }) => {
      if (t >= 0.34 && !impactTriggered) {
        markImpact();
        if (!audioOn) return;
        if (item.key === '가다' || item.key === '오다') playCarWhoosh();
        else if (item.key === '좋아하다' || item.key === '사랑해' || item.key === '감사') playScenarioSfx('ㅊ');
        else playCartoonImpact();
      }
      if (t >= 0.72 && !secondaryTriggered) {
        markSecondary();
        if (!audioOn) return;
        if (item.key === '죄송' || item.key === '괜찮아' || item.key === '자다' || item.key === '얼마') playCartoonSplat();
        else playCutePop();
      }
    },
  });

  const activeKey = selectedItem.key;
  const activeBackdrop: Series14BackdropTheme =
    phase === 'walking' ? items[0].backdrop : selectedItem.backdrop;

  const isWalkingMotion = phase === 'walking' || phase === 'approaching';
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  let jollaScaleX: number = phase === 'walking' ? anim.walkDir : 1;
  let jollaScaleY = 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showHeadBump = false;
  let showDizzyStars = false;

  if (phase === 'action') {
    const t = anim.actionT;
    switch (activeKey) {
      case '가다': {
        // Ignites jet rocket skates and blasts right leaving flame trails!
        const zoom = Math.max(0, (t - 0.18) / 0.82);
        jollaX = ACTION_SPOT_X + zoom * 490;
        jollaY = GROUND_Y - 58 - Math.sin(zoom * Math.PI) * 28;
        jollaRot = 18;
        jollaFaceMode = zoom > 0.4 ? 'panic' : 'happy';
        break;
      }
      case '오다': {
        // Magnet yanks Jollaman zooming back toward Buddy!
        jollaX = 760 - t * 320;
        jollaY = GROUND_Y - 72 + Math.sin(t * 20) * 6;
        jollaRot = -18;
        jollaFaceMode = t > 0.68 ? 'dizzy' : 'panic';
        if (t > 0.72) showDizzyStars = true;
        break;
      }
      case '먹다': {
        // Slurps up noodles from giant ramen bowl, cheeks swell!
        jollaX = 430;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 18)) * 10;
        jollaFaceMode = t > 0.55 ? 'swollenRed' : 'happy';
        break;
      }
      case '마시다': {
        // Sucks 2-meter boba straw hard! Cheeks puff bright red!
        jollaX = 415;
        jollaY = GROUND_Y - 52;
        jollaScaleX = t > 0.35 ? 1.12 : 1;
        jollaScaleY = t > 0.35 ? 0.94 : 1;
        jollaFaceMode = t > 0.38 ? 'swollenRed' : 'happy';
        break;
      }
      case '자다': {
        // Lies snoring peacefully with head right on the blue pillow -> alarm blasts him sky high!
        if (t < 0.7) {
          jollaX = 568;
          jollaY = GROUND_Y - 56;
          jollaRot = -86;
          jollaFaceMode = 'fainted';
        } else {
          const pop = (t - 0.7) / 0.3;
          jollaX = 568 - pop * 80;
          jollaY = GROUND_Y - 56 - Math.sin(pop * Math.PI) * 115;
          jollaRot = -(1 - pop) * 45;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case '보다': {
        // Watches dramatic TV & eyes bounce out wide in shock!
        jollaX = 410;
        jollaY = GROUND_Y - 52 - (t > 0.4 ? Math.abs(Math.sin((t - 0.4) * 14)) * 22 : 0);
        jollaFaceMode = t > 0.38 ? 'panic' : 'happy';
        break;
      }
      case '주다': {
        // Parachute gift descends, Jollaman hops cheering passing ribbon!
        jollaX = 410 + t * 50;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 12)) * 24;
        jollaRot = t > 0.45 ? 14 : 0;
        break;
      }
      case '좋아하다': {
        // Lifted floating off the ground holding a giant cartoon heart balloon!
        jollaX = 470 + Math.sin(t * 6) * 28;
        jollaY = GROUND_Y - 56 - Math.sin(t * Math.PI) * 95;
        jollaRot = Math.sin(t * 6) * 10;
        break;
      }
      case '안녕': {
        // Super-fast 90-degree oscillating folder bow!
        jollaX = 445;
        jollaRot = t > 0.2 && t < 0.85 ? 42 + Math.sin(t * 36) * 34 : 0;
        jollaY = GROUND_Y - 48;
        break;
      }
      case '감사': {
        // Deep respectful bow while confetti cannons burst!
        jollaX = 420;
        jollaRot = t > 0.25 && t < 0.78 ? 58 : 0;
        jollaY = GROUND_Y - 48;
        break;
      }
      case '죄송': {
        // Accidentally kicks vase pedestal, then drops kneeling crying buckets!
        if (t < 0.35) {
          jollaX = ACTION_SPOT_X + (t / 0.35) * 185;
          jollaRot = 14;
        } else {
          jollaX = 465 + Math.sin(t * 50) * 5;
          jollaRot = 52;
          jollaY = GROUND_Y - 40;
          jollaFaceMode = 'crying';
        }
        break;
      }
      case '괜찮아': {
        // 100t anvil squashes him flat -> pops back up with red bump & thumbs up!
        if (t < 0.36) {
          jollaX = 480;
        } else if (t < 0.64) {
          jollaX = 480;
          jollaY = GROUND_Y - 22;
          jollaScaleX = 1.62;
          jollaScaleY = 0.34;
          jollaFaceMode = 'squashed';
          showHeadBump = true;
          showDizzyStars = true;
        } else {
          jollaX = 480;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin((t - 0.64) * 18)) * 18;
          showHeadBump = true;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case '얼마': {
        // Walks to apple stall, sees ₩999,999?! sign, flips backward in shock!
        if (t < 0.42) {
          jollaX = ACTION_SPOT_X + (t / 0.42) * 155;
        } else {
          const shock = Math.min((t - 0.42) / 0.58, 1);
          jollaX = 465 - shock * 125;
          jollaY = GROUND_Y - 52 - Math.sin(shock * Math.PI) * 86;
          jollaRot = -shock * 360;
          jollaFaceMode = 'panic';
          showDizzyStars = true;
        }
        break;
      }
      case '맛있어': {
        // Bites royal ramen feast -> blasts giant rainbow bliss beam!
        jollaX = 415;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 16)) * 18;
        jollaFaceMode = t > 0.42 ? 'happy' : 'panic';
        break;
      }
      case '배고파': {
        // Clutches growling tummy shivering at floating burger/steak mirage!
        jollaX = 450 + Math.sin(t * 38) * 9;
        jollaFaceMode = t > 0.45 ? 'crying' : 'headClutch';
        break;
      }
      case '사랑해': {
        // Draws golden Cupid bow & shoots glowing heart arrow toward Girlfriend!
        jollaX = 365;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 10)) * 16;
        jollaFaceMode = 'happy';
        break;
      }
    }
  } else if (phase === 'aftermath') {
    jollaX = 475;
    jollaY = GROUND_Y - 52 - Math.abs(Math.sin(anim.aftermathT * Math.PI * 2)) * 12;
    if (activeKey === '괜찮아') showHeadBump = true;
    if (activeKey === '오다' || activeKey === '얼마') showDizzyStars = true;
    jollaFaceMode = activeKey === '죄송' ? 'crying' : 'happy';
  }

  return (
    <JollamanStageShell
      icon="🗣️"
      title={
        part === 'verb'
          ? '14-1. 졸라필수동사맨 (8종)'
          : part === 'phrase'
          ? '14-2. 졸라생존회화맨 (8종)'
          : '14. 졸라필수동사·회화맨 (6탄 16종)'
      }
      accentButtonClass="bg-rose-600 hover:bg-rose-700"
      stageBgClass="bg-amber-50"
      ariaLabel="졸라필수동사·생존회화 시뮬레이션 무대"
      cameraViewBox={shorts.computeViewBox(jollaX, jollaY)}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'retro2d',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-rose-100 text-rose-800 border-rose-300',
        activeLabel: '🎵 회화 BGM',
        title: '배경음악 켜기/끄기',
      }}
      items={items}
      selectedItem={selectedItem}
      learnedKeys={learnedKeys}
      getKey={(i) => i.key}
      getSkyX={getSkyX}
      getSkyY={getSkyY}
      getColor={(i) => i.color}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      skyTokenStyle="pill"
      pillWidth={items.length > 10 ? 78 : 92}
      pillHeight={items.length > 10 ? 34 : 42}
      getTokenText={(i) => i.skyLabel}
      walkingHint="위에서 필수 동사나 생존 회화를 누르면 졸라맨이 몸으로 표현해요!"
      activeCaption={`${selectedItem.resultDisplay} · ${selectedItem.gagLine}`}
      revealAriaLabel={`${selectedItem.resultDisplay} 정답`}
      revealGlyph={selectedItem.revealGlyph}
      revealGlyphSize="medium"
      revealHeadline={<span>{selectedItem.resultDisplay}</span>}
      revealSubtitle={tRevealSubtitle(14, selectedItem.key, selectedItem.ruleBadge)}
      flashcard={(() => {
        const [leftPart, rightPart] = selectedItem.resultDisplay.split('→').map((s) => s.trim());
        return {
          glyph: selectedItem.revealGlyph,
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
          meaning: tWordMeaning(14, selectedItem.key, SERIES14_MEANINGS[selectedItem.key]),
          romanization: romanizeKorean(selectedItem.pronunciation),
          cornerIcon: getSeriesCornerIcon(14, selectedItem.key, anim.walkTime),
        };
      })()}
      backdropSlot={<Series14Backdrop theme={activeBackdrop} walkTime={anim.walkTime} />}
    >
      {/* Bespoke Multi-Stage Comic Props & Co-Stars */}
      {phase !== 'walking' && (
        <g>
          {/* 가다: Fiery Jet Rocket Skates & Speed Banner */}
          {activeKey === '가다' && (
            <g>
              <g transform="translate(690, 314)">
                <rect x="-6" y="-44" width="12" height="98" fill="#334155" />
                <rect x="-72" y="-58" width="144" height="38" rx="10" fill="#EF4444" stroke="#0F172A" strokeWidth="3" />
                <text x="0" y="-39" textAnchor="middle" dominantBaseline="central" fontSize="17" fontWeight="900" fill="#FFFFFF">
                  가요! GO!
                </text>
              </g>
              {/* Flame Booster & Skates attached to Jollaman */}
              <g transform={`translate(${jollaX}, ${jollaY + 46})`}>
                <path d="M-28 -2 L-72 -12 L-56 0 L-78 8 L-28 10 Z" fill="#F97316" stroke="#DC2626" strokeWidth="2" />
                <circle cx="-12" cy="8" r="7" fill="#1E293B" stroke="#FACC15" strokeWidth="2.5" />
                <circle cx="14" cy="8" r="7" fill="#1E293B" stroke="#FACC15" strokeWidth="2.5" />
              </g>
            </g>
          )}

          {/* 오다: Buddy Holding Horseshoe Magnet */}
          {activeKey === '오다' && (
            <g transform="translate(365, 316)">
              <BuddyJollamanSvg walkTime={anim.walkTime} hugging={anim.actionT > 0.72 || phase === 'aftermath'} />
              <g transform="translate(52, -16)">
                <path d="M26 -24 H-6 A28 28 0 0 0 -6 24 H26 V10 H-4 A14 14 0 0 1 -4 -10 H26 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="3" />
                <rect x="14" y="-24" width="14" height="14" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
                <rect x="14" y="10" width="14" height="14" fill="#CBD5E1" stroke="#0F172A" strokeWidth="2" />
              </g>
            </g>
          )}

          {/* 먹다: Giant Steaming Ramen Bowl + Noodle Vacuum Strand + Chopsticks */}
          {activeKey === '먹다' && (
            <g>
              <g transform="translate(615, 318)">
                <GiantRamenBowlSvg walkTime={anim.walkTime} full={anim.actionT < 0.85} />
              </g>
              {/* Hand-held Korean chopsticks */}
              <line x1={jollaX + 22} y1={jollaY - 12} x2={jollaX + 74} y2={jollaY - 26} stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
              <line x1={jollaX + 22} y1={jollaY - 8} x2={jollaX + 76} y2={jollaY - 14} stroke="#92400E" strokeWidth="3.5" strokeLinecap="round" />
              {phase === 'action' && anim.actionT < 0.78 && (
                <path
                  d={`M${jollaX + 12} ${jollaY - 26} Q515 ${255 + Math.sin(anim.walkTime * 28) * 14} 615 294`}
                  fill="none"
                  stroke="#FDE047"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              )}
            </g>
          )}

          {/* 마시다: Giant Boba Milk Tea Cup with Straw Connecting Directly to Mouth */}
          {activeKey === '마시다' && (
            <g>
              <g transform="translate(605, 312)">
                <GiantBobaCupSvg
                  drainLevel={phase === 'aftermath' ? 0.92 : Math.min(0.92, anim.actionT * 1.15)}
                />
              </g>
              <path
                d={`M533 210 L${jollaX + 10} ${jollaY - 26}`}
                fill="none"
                stroke="#EC4899"
                strokeWidth="7.5"
                strokeLinecap="round"
              />
            </g>
          )}

          {/* 자다: Plush Nighttime Bed with Rising Zzz + Loud Alarm Bell */}
          {activeKey === '자다' && (
            <g transform="translate(580, 326)">
              <FluffyBedAndZzzSvg walkTime={anim.walkTime} snoring={anim.actionT < 0.7 && phase === 'action'} />
              {anim.actionT >= 0.68 && (
                <g transform={`translate(-120, -110) rotate(${Math.sin(anim.walkTime * 50) * 16})`}>
                  <circle cx="0" cy="0" r="24" fill="#EF4444" stroke="#0F172A" strokeWidth="3.2" />
                  <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="900" fill="#FEF08A">
                    따르릉!
                  </text>
                </g>
              )}
            </g>
          )}

          {/* 보다: Retro Cartoon TV & Spring-Popping Eyeballs */}
          {activeKey === '보다' && (
            <g>
              <g transform="translate(675, 298)">
                <line x1="-18" y1="-56" x2="-36" y2="-84" stroke="#0F172A" strokeWidth="3.5" />
                <line x1="18" y1="-56" x2="36" y2="-84" stroke="#0F172A" strokeWidth="3.5" />
                <rect x="-74" y="-56" width="148" height="104" rx="14" fill="#475569" stroke="#0F172A" strokeWidth="3.8" />
                <rect x="-60" y="-42" width="102" height="76" rx="8" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.8" />
                <text x="-9" y="-4" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="900" fill="#FEF08A">
                  K-DRAMA!
                </text>
                <circle cx="56" cy="-22" r="7" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
                <circle cx="56" cy="4" r="7" fill="#F43F5E" stroke="#0F172A" strokeWidth="2" />
              </g>
              {anim.actionT > 0.38 && phase === 'action' && (
                <g transform={`translate(${jollaX + 18}, ${jollaY - 38})`}>
                  <line x1="0" y1="0" x2="62" y2="-6" stroke="#94A3B8" strokeWidth="3" strokeDasharray="4 3" />
                  <circle cx="68" cy="-8" r="11" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.8" />
                  <circle cx="71" cy="-8" r="4.5" fill="#0F172A" />
                </g>
              )}
            </g>
          )}

          {/* 주다: Polka-Dot Parachute Carrying Golden Gift Box to Buddy */}
          {activeKey === '주다' && (
            <g>
              <g transform="translate(670, 316)">
                <BuddyJollamanSvg walkTime={anim.walkTime} hugging={false} />
              </g>
              <g transform={`translate(565, ${phase === 'action' ? 125 + anim.actionT * 175 : 300})`}>
                {phase === 'action' && anim.actionT < 0.85 && (
                  <g>
                    <path d="M-42 -58 A42 36 0 0 1 42 -58 Z" fill="#10B981" stroke="#0F172A" strokeWidth="3" />
                    <line x1="-38" y1="-58" x2="-12" y2="-16" stroke="#475569" strokeWidth="2" />
                    <line x1="38" y1="-58" x2="12" y2="-16" stroke="#475569" strokeWidth="2" />
                  </g>
                )}
                <rect x="-24" y="-18" width="48" height="40" rx="5" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
                <rect x="-6" y="-18" width="12" height="40" fill="#EF4444" />
                <rect x="-24" y="-3" width="48" height="10" fill="#EF4444" />
              </g>
            </g>
          )}

          {/* 좋아하다: Giant Floating Cartoon Heart Balloon Lifting Jollaman */}
          {activeKey === '좋아하다' && (
            <g>
              <line
                x1={jollaX + 18}
                y1={jollaY - 22}
                x2={jollaX + 36}
                y2={jollaY - 96}
                stroke="#0F172A"
                strokeWidth="2.6"
              />
              <g transform={`translate(${jollaX + 36}, ${jollaY - 108})`}>
                <CartoonHeartSvg size={2.8} color="#EC4899" stroke="#831843" />
              </g>
            </g>
          )}

          {/* 안녕 / 감사: Buddy Co-Star Greeting + Flying Hat & Multi-Color Celebration Confetti! */}
          {(activeKey === '안녕' || activeKey === '감사') && (
            <g>
              <g transform="translate(630, 316)">
                <BuddyJollamanSvg walkTime={anim.walkTime} hugging={false} />
              </g>
              {activeKey === '안녕' && (
                <g transform={`translate(${jollaX + 26}, ${jollaY - 56 - Math.sin(anim.actionT * Math.PI) * 85}) rotate(${anim.actionT * 360})`}>
                  <ellipse cx="0" cy="6" rx="20" ry="5" fill="#0EA5E9" stroke="#0F172A" strokeWidth="2.5" />
                  <path d="M-12 6 L-9 -12 H9 L12 6 Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />
                </g>
              )}
              {[0, 1, 2, 3, 4, 5].map((c) => (
                <rect
                  key={c}
                  x={320 + c * 74 + Math.sin(anim.walkTime * 6 + c) * 14}
                  y={165 + ((anim.walkTime * 55 + c * 32) % 145)}
                  width="11"
                  height="11"
                  rx="2"
                  transform={`rotate(${(anim.walkTime * 180 + c * 45) % 360}, ${320 + c * 74}, 220)`}
                  fill={['#EF4444', '#FACC15', '#22C55E', '#3B82F6', '#EC4899', '#A855F7'][c]}
                />
              ))}
            </g>
          )}

          {/* 죄송: Museum Porcelain Vase Shattering on Pedestal */}
          {activeKey === '죄송' && (
            <g transform="translate(650, 314)">
              <ShatteredVasePedestalSvg
                broken={anim.actionT >= 0.34 || phase === 'aftermath'}
                progress={anim.actionT}
              />
            </g>
          )}

          {/* 괜찮아: Falling 100t Iron Anvil + Thumbs-up Badge */}
          {activeKey === '괜찮아' && (
            <g>
              {anim.actionT < 0.64 && phase === 'action' && (
                <g transform={`translate(480, ${anim.actionT < 0.36 ? 90 + (anim.actionT / 0.36) * 218 : 308})`}>
                  <FallingAnvil100tSvg />
                </g>
              )}
              {(anim.actionT >= 0.64 || phase === 'aftermath') && (
                <g transform="translate(615, 290)">
                  <rect x="-64" y="-26" width="128" height="52" rx="14" fill="#10B981" stroke="#0F172A" strokeWidth="3.5" />
                  <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="900" fill="#FFFFFF">
                    👍 괜찮아요!
                  </text>
                </g>
              )}
            </g>
          )}

          {/* 얼마: Swinging Market Stall Price Tag ₩999,999?! */}
          {activeKey === '얼마' && (
            <g transform="translate(680, 314)">
              <PriceTagStallSvg shocked={anim.actionT >= 0.42 || phase === 'aftermath'} walkTime={anim.walkTime} />
            </g>
          )}

          {/* 맛있어: Golden Ramen Feast + Giant Rainbow Bliss Beam! */}
          {activeKey === '맛있어' && (
            <g>
              <g transform="translate(610, 318)">
                <GiantRamenBowlSvg walkTime={anim.walkTime} full={true} />
              </g>
              {(anim.actionT > 0.42 || phase === 'aftermath') && (
                <g opacity="0.72">
                  <polygon points={`${jollaX + 12},282 960,165 960,210`} fill="#EF4444" />
                  <polygon points={`${jollaX + 12},282 960,210 960,255`} fill="#FACC15" />
                  <polygon points={`${jollaX + 12},282 960,255 960,300`} fill="#22C55E" />
                  <polygon points={`${jollaX + 12},282 960,300 960,345`} fill="#38BDF8" />
                </g>
              )}
            </g>
          )}

          {/* 배고파: Swirling Growling Tummy + Hand-Drawn Cartoon Burger Mirage Cloud */}
          {activeKey === '배고파' && (
            <g>
              <g transform={`translate(${jollaX + 145}, 212)`}>
                <ellipse cx="0" cy="0" rx="74" ry="44" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" strokeDasharray="6 4" />
                {/* Hand-Drawn Tasty Cartoon Burger inside thought cloud */}
                <path d="M-34 -4 A34 22 0 0 1 34 -4 Z" fill="#F59E0B" stroke="#0F172A" strokeWidth="2.5" />
                <path d="M-36 0 Q-18 8 0 0 Q18 8 36 0" fill="none" stroke="#22C55E" strokeWidth="5" strokeLinecap="round" />
                <rect x="-34" y="4" width="68" height="10" rx="4" fill="#78350F" stroke="#0F172A" strokeWidth="2" />
                <rect x="-32" y="14" width="64" height="10" rx="5" fill="#F59E0B" stroke="#0F172A" strokeWidth="2.5" />
              </g>
              <ComicBubble x={jollaX - 24} y={325} text="꼬르륵!!" color="#EA580C" />
            </g>
          )}

          {/* 사랑해: Girlfriend Jollaman + Cupid Bow Shooting Heart Arrow Fireworks! */}
          {activeKey === '사랑해' && (
            <g>
              <g transform="translate(650, 316)">
                <GirlfriendJollamanSvg
                  walkTime={anim.walkTime}
                  pose={phase === 'aftermath' ? 'sitHappy' : 'dating'}
                  facing={-1}
                />
              </g>
              {/* Golden Cupid Bow */}
              <g transform={`translate(${jollaX + 26}, ${jollaY - 8})`}>
                <path d="M0 -28 Q24 0 0 28" fill="none" stroke="#F59E0B" strokeWidth="4.5" strokeLinecap="round" />
                <line x1="0" y1="-28" x2="0" y2="28" stroke="#CBD5E1" strokeWidth="2" />
              </g>
              {/* Flying Heart Arrow */}
              {phase === 'action' && anim.actionT > 0.25 && (
                <g transform={`translate(${395 + ((anim.actionT - 0.25) / 0.75) * 230}, 288)`}>
                  <line x1="-26" y1="0" x2="14" y2="0" stroke="#E11D48" strokeWidth="4" strokeLinecap="round" />
                  <g transform="translate(18, 0) scale(1.1)">
                    <CartoonHeartSvg size={1} color="#F43F5E" stroke="#881337" />
                  </g>
                </g>
              )}
              {(anim.actionT > 0.72 || phase === 'aftermath') && (
                <g transform="translate(515, 224)">
                  <CartoonHeartSvg size={2.2} color="#F43F5E" stroke="#881337" />
                </g>
              )}
            </g>
          )}

          {/* Comic Speech Reaction Tag (16:9 only — 9:16 uses Shell's comic bubble to prevent double overlap) */}
          {!(shorts.shortsAspect && shorts.comicBubbleEnabled) && phase === 'action' && anim.actionT > 0.28 && (
            <ComicBubble x={Math.max(160, Math.min(820, jollaX))} y={jollaY - 82} text={selectedItem.gagLine} color={selectedItem.color} />
          )}
        </g>
      )}

      {/* Main Jollaman */}
      <g transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}) scale(${jollaScaleX}, ${jollaScaleY})`}>
        <JollamanCharacterSvg
          faceMode={jollaFaceMode}
          isWalking={isWalkingMotion}
          legSwing={legSwing}
          armSwing={armSwing}
          showHeadBump={showHeadBump}
          walkTime={anim.walkTime}
          activeChar={selectedItem.skyLabel.slice(0, 2)}
        />
        {showDizzyStars && <DizzyStarOrbitSvg walkTime={anim.walkTime} cy={-64} radius={22} />}
        {phase === 'action' && anim.actionT > 0.35 && anim.actionT < 0.7 && (
          <g transform="translate(24, -42)">
            <ComicImpactBurstSvg scale={0.92} fill="#FDE047" stroke="#E11D48" />
          </g>
        )}
        {phase === 'aftermath' && (
          <g transform="translate(0, -70)">
            <SparkleBurstSvg color={selectedItem.color} progress={anim.aftermathT} />
          </g>
        )}
      </g>
    </JollamanStageShell>
  );
};

interface JollamanDailyLifeSimulationProps {
  audioEnabled?: boolean;
}

export const JollamanDailyLifeSimulation: React.FC<JollamanDailyLifeSimulationProps> = ({
  audioEnabled = true,
}) => {
  const [part, setPart] = useState<DailyPart>('all');
  const filteredItems =
    part === 'all' ? DAILY_LIFE_ITEMS : DAILY_LIFE_ITEMS.filter((it) => it.group === part);

  return (
    <div className="flex flex-col gap-2 font-body">
      <div className="bg-[#FFFFFF] border-b border-slate-200 pb-1.5 flex items-center gap-1.5 overflow-x-auto max-w-[1160px] w-full mx-auto">
        <span className="pr-1 text-xs text-slate-500 whitespace-nowrap">구간</span>
        {(
          [
            { id: 'all', label: '전체 16종' },
            { id: 'verb', label: '필수 동사 8종' },
            { id: 'phrase', label: '생존 회화 8종' },
          ] as const
        ).map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              playCutePop();
              setPart(tab.id);
            }}
            className={`px-2.5 py-1 rounded-none border-2 text-xs cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              part === tab.id
                ? 'bg-[#DC2626] border-[#DC2626] text-white'
                : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-red-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <DailyLifeStageInner
        key={part}
        part={part}
        items={filteredItems}
        audioEnabled={audioEnabled}
      />
    </div>
  );
};
