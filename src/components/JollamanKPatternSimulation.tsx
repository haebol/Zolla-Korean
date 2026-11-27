import React, { useState } from 'react';
import {
  playCarWhoosh,
  playCartoonImpact,
  playCartoonSplat,
  playCutePop,
  playDiscoDanceBeat,
  playScenarioSfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES15_MEANINGS: Record<KPatternKey, string> = {
  '과거 았/었': 'Ate · Went (Past)',
  '미래 ㄹ래요': 'Will go · Will eat',
  '-고 싶다': 'Want to go · Want to see',
  '-지 마': "Don't cry · Don't go",
  '안 (부정)': "Don't go · Don't eat",
  '-(으)세요': 'Please come · Please sit',
  '하나·둘·셋': 'One! Two! Three!',
  '넷·다섯·여섯': 'Four! Five! Six!',
  '일·이·삼': '1 · 2 · 3 · 4 · 5 · 6 (Sino)',
  '월·화·수': 'Mon · Tue · Wed',
  '목·금·토·일': 'Thu · Fri · Sat · Sun',
  '어제·오늘·내일': 'Yesterday · Today · Tomorrow',
};
import {
  ComicImpactBurstSvg,
  DiscoDancingJollamanSvg,
  DizzyStarOrbitSvg,
  JollamanCharacterSvg,
  JollamanFaceMode,
  MirrorBallSvg,
  SpaceXRocketSvg,
  SparkleBurstSvg,
} from './JollamanSprites';
import { BuddyJollamanSvg } from './JollamanSprites3';
import {
  CashRegister123Svg,
  CrystalFortuneOrbSvg,
  EvilBroccoliPlateSvg,
  FlippingCalendarPagesSvg,
  GiantStopHandStampSvg,
  HeavyBarbell456Svg,
  JugglingPins123Svg,
  MonTueWedGauntletSvg,
  RoyalCrownAndCarpetSvg,
  Series15Backdrop,
  Series15BackdropTheme,
  TimeMachineCapsuleSvg,
} from './JollamanSprites15';

export type KPatternKey =
  | '과거 았/었'
  | '미래 ㄹ래요'
  | '-고 싶다'
  | '-지 마'
  | '안 (부정)'
  | '-(으)세요'
  | '하나·둘·셋'
  | '넷·다섯·여섯'
  | '일·이·삼'
  | '월·화·수'
  | '목·금·토·일'
  | '어제·오늘·내일';

export interface KPatternItem {
  key: KPatternKey;
  group: 'pattern' | 'countday';
  skyLabel: string;
  revealGlyph: string;
  ruleBadge: string;
  resultDisplay: string;
  pronunciation: string;
  ttsReveal: string;
  gagLine: string;
  color: string;
  backdrop: Series15BackdropTheme;
}

// Exact 1:1 Match with TENSE_HONORIFIC_SEEDS (12 items: 6 K-Patterns + 6 Numbers & Days)
export const KPATTERN_ITEMS: KPatternItem[] = [
  // Patterns (6)
  { key: '과거 았/었', group: 'pattern', skyLabel: '았/었', revealGlyph: '았 / 었', ruleBadge: '만능 K-패턴 (과거)', resultDisplay: '먹었어요 · 갔어요', pronunciation: '먹었어요', ttsReveal: '먹었어요! 갔어요!', gagLine: '타임머신 과거 역주행 슝!', color: '#2563EB', backdrop: 'timelab' },
  { key: '미래 ㄹ래요', group: 'pattern', skyLabel: 'ㄹ래요', revealGlyph: '-ㄹ래요', ruleBadge: '만능 K-패턴 (미래)', resultDisplay: '갈래요 · 먹을래요', pronunciation: '갈래요', ttsReveal: '갈래요! 먹을래요!', gagLine: '수정구 예언! 미래 로켓 발사!!', color: '#0EA5E9', backdrop: 'timelab' },
  { key: '-고 싶다', group: 'pattern', skyLabel: '고싶다', revealGlyph: '-고 싶다', ruleBadge: '만능 K-패턴 (희망)', resultDisplay: '가고 싶어요 · 보고 싶어요', pronunciation: '가고 싶어요', ttsReveal: '가고 싶어요! 보고 싶어요!', gagLine: '아이스크림 꿈구름 둥실둥실~', color: '#EC4899', backdrop: 'dreamcloud' },
  { key: '-지 마', group: 'pattern', skyLabel: '-지 마', revealGlyph: '-지 마!', ruleBadge: '만능 K-패턴 (금지)', resultDisplay: '울지 마요 · 가지 마요', pronunciation: '가지 마요', ttsReveal: '울지 마요! 가지 마요!', gagLine: '유압 스톱 손바닥 납작 쿵!!', color: '#DC2626', backdrop: 'diner' },
  { key: '안 (부정)', group: 'pattern', skyLabel: '안 ~', revealGlyph: '안 ~', ruleBadge: '만능 K-패턴 (부정)', resultDisplay: '안 가요 · 안 먹어요', pronunciation: '안 먹어요', ttsReveal: '안 가요! 안 먹어요!', gagLine: '브로콜리 쉭! 발차기! 안 먹어!', color: '#7C3AED', backdrop: 'diner' },
  { key: '-(으)세요', group: 'pattern', skyLabel: '으세요', revealGlyph: '-(으)세요', ruleBadge: '만능 K-패턴 (존댓말)', resultDisplay: '오세요 · 앉으세요', pronunciation: '앉으세요', ttsReveal: '오세요! 앉으세요!', gagLine: 'VIP 레드카펫 왕관 대접!', color: '#059669', backdrop: 'vip_red' },

  // Numbers & Days (6)
  { key: '하나·둘·셋', group: 'countday', skyLabel: '하나둘', revealGlyph: '하나·둘·셋', ruleBadge: '숫자·요일 (고유어)', resultDisplay: '하나! 둘! 셋!', pronunciation: '하나 둘 셋', ttsReveal: '하나, 둘, 셋!', gagLine: '1·2·3 볼링핀 저글링 머리 쿵!', color: '#F97316', backdrop: 'circus' },
  { key: '넷·다섯·여섯', group: 'countday', skyLabel: '넷다섯', revealGlyph: '넷·다섯·여섯', ruleBadge: '숫자·요일 (고유어)', resultDisplay: '넷! 다섯! 여섯!', pronunciation: '넷 다섯 여섯', ttsReveal: '넷, 다섯, 여섯!', gagLine: '600kg 바벨 번쩍?! 바닥 푹!', color: '#EAB308', backdrop: 'circus' },
  { key: '일·이·삼', group: 'countday', skyLabel: '일이삼', revealGlyph: '일·이·삼', ruleBadge: '숫자·요일 (한자어)', resultDisplay: '일·이·삼·사·오·육!', pronunciation: '일 이 삼 사 오 육', ttsReveal: '일, 이, 삼, 사, 오, 육!', gagLine: '금화 잭팟 계산기 딩동!!', color: '#16A34A', backdrop: 'circus' },
  { key: '월·화·수', group: 'countday', skyLabel: '월화수', revealGlyph: '월·화·수', ruleBadge: '숫자·요일 (주초)', resultDisplay: '월요일 · 화요일 · 수요일', pronunciation: '월화수요일', ttsReveal: '월요일, 화요일, 수요일!', gagLine: '월요병 바위·화요일 불·수요일 파도!', color: '#0284C7', backdrop: 'office_disco' },
  { key: '목·금·토·일', group: 'countday', skyLabel: '불금!', revealGlyph: '금·토·일!', ruleBadge: '숫자·요일 (주말)', resultDisplay: '목 · 금 · 토 · 일요일!', pronunciation: '목금토일', ttsReveal: '목요일, 금요일, 토요일, 일요일!', gagLine: '넥타이 홱! 불금 미러볼 디스코!', color: '#DB2777', backdrop: 'office_disco' },
  { key: '어제·오늘·내일', group: 'countday', skyLabel: '어제오늘', revealGlyph: '어제·오늘·내일', ruleBadge: '숫자·요일 (시간)', resultDisplay: '어제 · 오늘 · 내일', pronunciation: '어제 오늘 내일', ttsReveal: '어제, 오늘, 내일!', gagLine: '초고속 달력 종이 철썩 얼굴 강타!', color: '#9333EA', backdrop: 'timelab' },
];

type KPatternPart = 'all' | 'pattern' | 'countday';

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 310;
const GROUND_Y = 368;

const ComicBubble: React.FC<{ x: number; y: number; text: string; color: string }> = ({
  x,
  y,
  text,
  color,
}) => (
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

const KPatternStageInner: React.FC<{
  part: KPatternPart;
  items: KPatternItem[];
  audioEnabled: boolean;
}> = ({ part, items, audioEnabled }) => {
  const getSkyX = (item: KPatternItem): number => {
    const idx = items.indexOf(item);
    const n = items.length;
    if (n <= 1) return 500;
    const minX = n > 8 ? 64 : 84;
    const maxX = n > 8 ? 936 : 916;
    return minX + (idx / (n - 1)) * (maxX - minX);
  };
  const getSkyY = (item: KPatternItem): number => {
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
  } = useJollamanStageEngine<KPatternItem, KPatternKey>({
    seriesNum: 15,
    seriesTitle:
      part === 'pattern'
        ? '15-1. 졸라K패턴맨 (6종)'
        : part === 'countday'
        ? '15-2. 졸라숫자·요일맨 (6종)'
        : '15. 졸라K패턴·숫자·요일맨 (12종)',
    items,
    audioEnabled,
    bgmTrack: 'chillLounge',
    initialWalkX: 180,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    scrollSpeedOnApproach: 250,
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
        if (item.key === '과거 았/었' || item.key === '미래 ㄹ래요') playCarWhoosh();
        else if (item.key === '목·금·토·일') playDiscoDanceBeat(2.0);
        else if (item.key === '일·이·삼' || item.key === '-(으)세요') playScenarioSfx('ㅊ');
        else playCartoonImpact();
      }
      if (t >= 0.72 && !secondaryTriggered) {
        markSecondary();
        if (!audioOn) return;
        if (item.key === '-지 마' || item.key === '하나·둘·셋' || item.key === '어제·오늘·내일' || item.key === '넷·다섯·여섯') {
          playCartoonSplat();
        } else {
          playCutePop();
        }
      }
    },
  });

  const activeKey = selectedItem.key;
  const activeBackdrop: Series15BackdropTheme =
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
  let headOnFire = false;
  let useDiscoSprite = false;

  if (phase === 'action') {
    const t = anim.actionT;
    switch (activeKey) {
      case '과거 았/었': {
        // Sucked backward spinning through neon time portal!
        jollaX = t < 0.7 ? 420 + Math.sin(t * 14) * 35 : 460;
        jollaY = GROUND_Y - 72 - Math.sin(t * Math.PI) * 42;
        jollaRot = -t * 720;
        jollaFaceMode = 'dizzy';
        if (t > 0.65) showDizzyStars = true;
        break;
      }
      case '미래 ㄹ래요': {
        // Peeks into crystal ball, then launches aboard SpaceX rocket!
        if (t < 0.36) {
          jollaX = 390;
          jollaY = GROUND_Y - 52;
        } else {
          const fly = (t - 0.36) / 0.64;
          jollaX = 560 + fly * 195;
          jollaY = GROUND_Y - 82 - fly * 165;
          jollaRot = 24;
          jollaFaceMode = 'panic';
        }
        break;
      }
      case '-고 싶다': {
        // Floats dreamily upward reaching toward giant ice cream dream cloud!
        jollaX = 460 + Math.sin(t * 6) * 20;
        jollaY = GROUND_Y - 62 - Math.sin(t * Math.PI) * 76;
        jollaRot = Math.sin(t * 6) * 8;
        break;
      }
      case '-지 마': {
        // Hydraulic red STOP stamp slams down flattening Jollaman paper-flat!
        if (t < 0.38) {
          jollaX = ACTION_SPOT_X + (t / 0.38) * 190;
        } else {
          jollaX = 500;
          jollaY = GROUND_Y - 18;
          jollaScaleX = 1.72;
          jollaScaleY = 0.28;
          jollaFaceMode = 'squashed';
          showHeadBump = true;
          showDizzyStars = true;
        }
        break;
      }
      case '안 (부정)': {
        // Shivers at smug broccoli -> Taekwondo kicks it into orbit!
        jollaX = 420;
        if (t < 0.4) {
          jollaX = 420 + Math.sin(t * 44) * 10;
          jollaFaceMode = 'greenPoison';
        } else {
          const kick = Math.min((t - 0.4) / 0.3, 1);
          jollaY = GROUND_Y - 52 - Math.sin(kick * Math.PI) * 42;
          jollaRot = -18;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case '-(으)세요': {
        // Walks proudly down royal red carpet as golden crown lands on head!
        jollaX = 390 + t * 115;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 10)) * 8;
        jollaFaceMode = 'happy';
        break;
      }
      case '하나·둘·셋': {
        // Juggles 1·2·3 bowling pins -> #3 bonks Jollaman's head!
        jollaX = 470;
        if (t > 0.68) {
          jollaY = GROUND_Y - 46;
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          showDizzyStars = true;
        }
        break;
      }
      case '넷·다섯·여섯': {
        // Turns bright red hoisting 600kg barbell -> sinks squashed into floor!
        jollaX = 480;
        if (t < 0.62) {
          jollaX = 480 + Math.sin(t * 52) * 7;
          jollaFaceMode = 'swollenRed';
        } else {
          jollaY = GROUND_Y - 26;
          jollaScaleX = 1.38;
          jollaScaleY = 0.48;
          jollaFaceMode = 'squashed';
          showDizzyStars = true;
        }
        break;
      }
      case '일·이·삼': {
        // Dances under golden coin jackpot shower!
        jollaX = 435;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 16)) * 28;
        jollaFaceMode = 'happy';
        break;
      }
      case '월·화·수': {
        // Survives Monday boulder (fainted), Tuesday fireball (headOnFire!), Wednesday wave!
        jollaX = 430;
        if (t < 0.38) {
          jollaRot = -78;
          jollaY = GROUND_Y - 26;
          jollaFaceMode = 'fainted';
        } else if (t < 0.7) {
          headOnFire = true;
          jollaFaceMode = 'burnt';
        } else {
          jollaFaceMode = 'dizzy';
          showDizzyStars = true;
        }
        break;
      }
      case '목·금·토·일': {
        // Office zombie transforms at 0.42 into neon disco dancer!
        jollaX = 500;
        if (t >= 0.42) {
          useDiscoSprite = true;
        } else {
          jollaRot = 12;
          jollaFaceMode = 'fainted';
        }
        break;
      }
      case '어제·오늘·내일': {
        // Torn calendar page flies forward & SLAPS Jollaman's face!
        jollaX = 450;
        if (t > 0.64) {
          jollaX = 450 - (t - 0.64) * 90;
          jollaRot = -32;
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          showDizzyStars = true;
        }
        break;
      }
    }
  } else if (phase === 'aftermath') {
    jollaX = 480;
    if (activeKey === '-지 마') {
      jollaY = GROUND_Y - 24;
      jollaScaleX = 1.45;
      jollaScaleY = 0.42;
      jollaFaceMode = 'squashed';
      showHeadBump = true;
      showDizzyStars = true;
    } else if (activeKey === '하나·둘·셋' || activeKey === '어제·오늘·내일') {
      jollaFaceMode = 'dizzy';
      showHeadBump = true;
      showDizzyStars = true;
    } else if (activeKey === '목·금·토·일') {
      jollaX = 500;
      useDiscoSprite = true;
    } else {
      jollaY = GROUND_Y - 52 - Math.abs(Math.sin(anim.aftermathT * Math.PI * 2)) * 12;
    }
  }

  return (
    <JollamanStageShell
      icon="🚀"
      title={
        part === 'pattern'
          ? '15-1. 졸라K패턴맨 (6종)'
          : part === 'countday'
          ? '15-2. 졸라숫자·요일맨 (6종)'
          : '15. 졸라K패턴·숫자·요일맨 (7탄 12종)'
      }
      accentButtonClass="bg-indigo-600 hover:bg-indigo-700"
      stageBgClass="bg-indigo-950"
      ariaLabel="졸라K패턴 숫자 요일 시뮬레이션 무대"
      cameraViewBox={shorts.computeViewBox(jollaX, jollaY)}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'chillLounge',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-indigo-100 text-indigo-800 border-indigo-300',
        activeLabel: '🎵 K패턴 BGM',
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
      pillWidth={items.length > 8 ? 80 : 96}
      pillHeight={items.length > 8 ? 35 : 42}
      getTokenText={(i) => i.skyLabel}
      walkingHint="위에서 K-패턴이나 숫자·요일을 고르면 졸라맨의 개그가 시작돼요!"
      activeCaption={`${selectedItem.resultDisplay} · ${selectedItem.gagLine}`}
      revealAriaLabel={`${selectedItem.resultDisplay} 정답`}
      revealGlyph={selectedItem.revealGlyph}
      revealGlyphSize="medium"
      revealHeadline={<span>{selectedItem.resultDisplay}</span>}
      revealSubtitle={tRevealSubtitle(15, selectedItem.key, selectedItem.ruleBadge)}
      flashcard={{
        glyph: selectedItem.revealGlyph,
        subLabel: selectedItem.ruleBadge,
        accentColor: selectedItem.color,
        headlineNode: <span style={{ color: selectedItem.color }}>{selectedItem.resultDisplay}</span>,
        headlineCharLen: selectedItem.resultDisplay.length,
        meaning: tWordMeaning(15, selectedItem.key, SERIES15_MEANINGS[selectedItem.key]),
        romanization: romanizeKorean(selectedItem.pronunciation),
        cornerIcon: getSeriesCornerIcon(15, selectedItem.key, anim.walkTime),
      }}
      backdropSlot={
        <Series15Backdrop
          theme={activeBackdrop}
          walkTime={anim.walkTime}
          fridayParty={activeKey === '목·금·토·일' && useDiscoSprite}
        />
      }
    >
      {/* Bespoke Hand-Drawn Story Props & Co-Stars */}
      {phase !== 'walking' && (
        <g>
          {/* 과거 았/었: Swirling Neon Time Portal + Empty Eaten Bowl & Retro Footprints ("먹었어요·갔어요") */}
          {activeKey === '과거 았/었' && (
            <g>
              <g transform="translate(650, 290)">
                <TimeMachineCapsuleSvg walkTime={anim.walkTime} active={phase === 'action'} />
              </g>
              <g transform="translate(260, 345)">
                {/* Empty eaten noodle bowl left behind in past */}
                <path d="M-32 -8 Q-28 18 0 19 Q28 18 32 -8 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2.8" />
                <text x="0" y="-20" textAnchor="middle" fontSize="13" fontWeight="900" fill="#93C5FD">
                  빈 그릇 (다 먹었어요!)
                </text>
              </g>
            </g>
          )}

          {/* 미래 ㄹ래요: Crystal Fortune Orb + SpaceX Future Rocket */}
          {activeKey === '미래 ㄹ래요' && (
            <g>
              <g transform="translate(310, 326)">
                <CrystalFortuneOrbSvg walkTime={anim.walkTime} />
              </g>
              <g
                transform={`translate(${
                  anim.actionT < 0.36 ? 560 : 560 + ((anim.actionT - 0.36) / 0.64) * 195
                }, ${
                  anim.actionT < 0.36 ? 295 : 295 - ((anim.actionT - 0.36) / 0.64) * 165
                }) rotate(${anim.actionT >= 0.36 ? 24 : 0}) scale(0.82)`}
              >
                <SpaceXRocketSvg firing={anim.actionT >= 0.36} legsDeployed={anim.actionT < 0.36} walkTime={anim.walkTime} />
              </g>
            </g>
          )}

          {/* -고 싶다: Fluffy Dream Cloud with Giant Double-Scoop Ice Cream */}
          {activeKey === '-고 싶다' && (
            <g transform={`translate(665, ${210 + Math.sin(anim.walkTime * 4) * 8})`}>
              <ellipse cx="-32" cy="8" rx="34" ry="26" fill="#FFFFFF" stroke="#EC4899" strokeWidth="3" />
              <ellipse cx="32" cy="8" rx="34" ry="26" fill="#FFFFFF" stroke="#EC4899" strokeWidth="3" />
              <ellipse cx="0" cy="-6" rx="48" ry="34" fill="#FFFFFF" stroke="#EC4899" strokeWidth="3" />
              <rect x="-48" y="-12" width="96" height="34" fill="#FFFFFF" />
              {/* Double-Scoop Ice Cream Cone */}
              <polygon points="-14,4 14,4 0,34" fill="#F59E0B" stroke="#78350F" strokeWidth="2.2" />
              <circle cx="-8" cy="-4" r="13" fill="#F472B6" stroke="#831843" strokeWidth="2" />
              <circle cx="9" cy="-4" r="13" fill="#34D399" stroke="#065F46" strokeWidth="2" />
              <circle cx="0" cy="-18" r="13" fill="#FDE047" stroke="#854D0E" strokeWidth="2" />
            </g>
          )}

          {/* -지 마: Hydraulic Stop Hand Stamp Crashing Down! */}
          {activeKey === '-지 마' && (
            <g transform="translate(500, 290)">
              <GiantStopHandStampSvg slammed={anim.actionT >= 0.38 || phase === 'aftermath'} />
            </g>
          )}

          {/* 안 (부정): Evil Smug Broccoli Plate Punted Into Orbit! */}
          {activeKey === '안 (부정)' && (
            <g transform="translate(545, 318)">
              <EvilBroccoliPlateSvg
                kickedProgress={
                  phase === 'aftermath'
                    ? 1.2
                    : anim.actionT >= 0.4
                    ? (anim.actionT - 0.4) / 0.6
                    : 0
                }
              />
            </g>
          )}

          {/* -(으)세요: Red Carpet + Royal Crown + Plush Golden VIP Armchair ("앉으세요!") + Bowing Buddy */}
          {activeKey === '-(으)세요' && (
            <g>
              <g transform="translate(510, 316)">
                <RoyalCrownAndCarpetSvg />
              </g>
              {/* Plush Velvet VIP Throne Chair ("앉으세요!") */}
              <g transform="translate(585, 326)">
                <rect x="-24" y="-34" width="48" height="44" rx="10" fill="#B91C1C" stroke="#FACC15" strokeWidth="3" />
                <rect x="-28" y="-2" width="56" height="18" rx="5" fill="#DC2626" stroke="#FACC15" strokeWidth="2.8" />
                <rect x="-22" y="16" width="8" height="20" fill="#FACC15" />
                <rect x="14" y="16" width="8" height="20" fill="#FACC15" />
              </g>
              <g transform="translate(725, 316)">
                <BuddyJollamanSvg walkTime={anim.walkTime} hugging={false} />
              </g>
            </g>
          )}

          {/* 하나·둘·셋: Orbiting Juggling Pins */}
          {activeKey === '하나·둘·셋' && (
            <g transform="translate(470, 304)">
              <JugglingPins123Svg t={anim.walkTime * 0.45} />
            </g>
          )}

          {/* 넷·다섯·여섯: Massive Barbell Raised & Dropped */}
          {activeKey === '넷·다섯·여섯' && (
            <g transform="translate(480, 286)">
              <HeavyBarbell456Svg
                liftY={
                  anim.actionT < 0.62 && phase === 'action'
                    ? -Math.sin((anim.actionT / 0.62) * Math.PI) * 52
                    : 38
                }
              />
            </g>
          )}

          {/* 일·이·삼: Cash Register Coin Jackpot */}
          {activeKey === '일·이·삼' && (
            <g transform="translate(645, 318)">
              <CashRegister123Svg
                walkTime={anim.walkTime}
                active={anim.actionT >= 0.36 || phase === 'aftermath'}
              />
            </g>
          )}

          {/* 월·화·수: Boulder + Fireball + Wave Obstacle Gauntlet Directly Hitting Jollaman */}
          {activeKey === '월·화·수' && (
            <g transform="translate(465, 308)">
              <MonTueWedGauntletSvg stage={phase === 'aftermath' ? 0.85 : anim.actionT} />
            </g>
          )}

          {/* 목·금·토·일: Dropping Disco Mirror Ball + Flying Necktie */}
          {activeKey === '목·금·토·일' && (
            <g>
              {useDiscoSprite && (
                <MirrorBallSvg dropY={96} walkTime={anim.walkTime} />
              )}
              {anim.actionT > 0.35 && anim.actionT < 0.8 && phase === 'action' && (
                <g transform={`translate(${540 + (anim.actionT - 0.35) * 320}, ${280 - (anim.actionT - 0.35) * 240}) rotate(${anim.actionT * 720})`}>
                  <polygon points="-6,-18 6,-18 9,14 0,24 -9,14" fill="#DC2626" stroke="#0F172A" strokeWidth="2" />
                </g>
              )}
            </g>
          )}

          {/* 어제·오늘·내일: Flipping Calendar Slapping Page */}
          {activeKey === '어제·오늘·내일' && (
            <g transform="translate(650, 290)">
              <FlippingCalendarPagesSvg t={phase === 'aftermath' ? 0.92 : anim.actionT} />
            </g>
          )}

          {/* Comic Speech Reaction Tag (16:9 only — 9:16 uses Shell's comic bubble to prevent double overlap) */}
          {!(shorts.shortsAspect && shorts.comicBubbleEnabled) && phase === 'action' && anim.actionT > 0.25 && (
            <ComicBubble x={Math.max(175, Math.min(820, jollaX))} y={jollaY - 82} text={selectedItem.gagLine} color={selectedItem.color} />
          )}
        </g>
      )}

      {/* Main Jollaman or Disco Dancing Jollaman */}
      {useDiscoSprite ? (
        <g transform={`translate(${jollaX}, ${jollaY})`}>
          <DiscoDancingJollamanSvg walkTime={anim.walkTime} />
        </g>
      ) : (
        <g transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}) scale(${jollaScaleX}, ${jollaScaleY})`}>
          <JollamanCharacterSvg
            faceMode={jollaFaceMode}
            isWalking={isWalkingMotion}
            legSwing={legSwing}
            armSwing={armSwing}
            showHeadBump={showHeadBump}
            headOnFire={headOnFire}
            walkTime={anim.walkTime}
            activeChar={selectedItem.skyLabel.slice(0, 2)}
          />
          {showDizzyStars && <DizzyStarOrbitSvg walkTime={anim.walkTime} cy={-64} radius={22} />}
          {phase === 'action' && anim.actionT > 0.35 && anim.actionT < 0.7 && (
            <g transform="translate(24, -42)">
              <ComicImpactBurstSvg scale={0.92} fill="#FDE047" stroke="#0F172A" />
            </g>
          )}
          {phase === 'aftermath' && (
            <g transform="translate(0, -70)">
              <SparkleBurstSvg color={selectedItem.color} progress={anim.aftermathT} />
            </g>
          )}
        </g>
      )}
    </JollamanStageShell>
  );
};

interface JollamanKPatternSimulationProps {
  audioEnabled?: boolean;
}

export const JollamanKPatternSimulation: React.FC<JollamanKPatternSimulationProps> = ({
  audioEnabled = true,
}) => {
  const [part, setPart] = useState<KPatternPart>('all');
  const filteredItems =
    part === 'all' ? KPATTERN_ITEMS : KPATTERN_ITEMS.filter((it) => it.group === part);

  return (
    <div className="flex flex-col gap-2 font-body">
      <div className="bg-[#FFFFFF] border-b border-slate-200 pb-1.5 flex items-center gap-1.5 overflow-x-auto max-w-[1160px] w-full mx-auto">
        <span className="pr-1 text-xs text-slate-500 whitespace-nowrap">구간</span>
        {(
          [
            { id: 'all', label: '전체 12종' },
            { id: 'pattern', label: '만능 K-패턴 6종' },
            { id: 'countday', label: '숫자·요일 6종' },
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

      <KPatternStageInner
        key={part}
        part={part}
        items={filteredItems}
        audioEnabled={audioEnabled}
      />
    </div>
  );
};
