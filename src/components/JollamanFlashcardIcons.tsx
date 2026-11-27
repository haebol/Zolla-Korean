import React from 'react';
import { JollamanCornerIcon } from './JollamanFlashcardCard';
import {
  CartoonHeartSvg,
  ComicSquidSvg,
  ComicUfoSvg,
  CuteCryingBabyJollamanSvg,
  DetailedLionSvg,
  DiscoDancingJollamanSvg,
  FieryBaseballSvg,
  GiantFloorFishbowlSvg,
  GiantYoyoSvg,
  MuscularRabbitSvg,
  NineTailFoxSvg,
  SheetGhostSvg,
  SkinnyMosquitoSvg,
  SpaceXRocketSvg,
  TeethMonsterSvg,
  TigerSpriteSvg,
} from './JollamanSprites';
import {
  BuddyJollamanSvg,
  CrowFlockSvg,
  GarbageTruckSvg,
  RibbonGirlJollamanSvg,
  SteamingPoopPileSvg,
} from './JollamanSprites3';
import {
  FrogSvg,
  GirlfriendJollamanSvg,
  GoldenWeddingBellSvg,
  MagicRideCloudSvg,
  MischievousMonkeySvg,
  PinkTeaChairSvg,
  RedAppleSvg,
  RedCrabSvg,
  RollingEggSvg,
  SwirlingTornadoSvg,
  WhySpeechBubbleSvg,
} from './JollamanSprites4';
import {
  BigShakingBearSvg,
  GiantBowlingBallSvg,
  GiantDiggingShovelSvg,
  GiantSlashBladeSvg,
  GiantSteelSpoonSvg,
  GiantWatermelonWholeSvg,
  SnowAvalancheMoundSvg,
} from './JollamanSprites5';
import {
  BlazingDaySunSvg,
  FlyingShirtSvg,
  GiantCastIronSkilletSvg,
  GiantFarmRadishSvg,
  ShyHieutGhostSvg,
} from './JollamanSprites6';
import {
  CrazyRoosterSvg,
  EmptyFridgeSvg,
  GiantIceCreamConeSvg,
  PizzaSliceWithFlagSvg,
  PoetryMicStandSvg,
  PoolsideFlyingChairsSvg,
  TooShortCoasterSvg,
} from './JollamanSprites7';
import {
  BoomingSpeakerSvg,
  MegaphoneSvg,
  WarmCampfireSvg,
} from './JollamanSprites10';
import {
  BlazingSunSvg,
  DoubleCandleSvg,
  RoyalScrollSvg,
  SesameLeafSvg,
  TissueBoxSvg,
  WaterLadleSvg,
} from './JollamanSprites11';
import { ParticleMonsterSvg } from './JollamanSprites13';
import {
  FluffyBedAndZzzSvg,
  GiantBobaCupSvg,
  GiantRamenBowlSvg,
  GreenCityBusSvg,
  PriceTagStallSvg,
  ShatteredVasePedestalSvg,
  SpringGiftBoxSvg,
} from './JollamanSprites14';
import {
  CashRegister123Svg,
  CrystalFortuneOrbSvg,
  EvilBroccoliPlateSvg,
  FlippingCalendarPagesSvg,
  GiantStopHandStampSvg,
  HeavyBarbell456Svg,
  JugglingPins123Svg,
  RoyalCrownAndCarpetSvg,
  TimeMachineCapsuleSvg,
} from './JollamanSprites15';

// Compact inline comic icons for items without standalone sprite exports
const MiniTrainSvg: React.FC = () => (
  <g>
    <rect x="-56" y="-22" width="112" height="44" rx="8" fill="#EF4444" stroke="#0F172A" strokeWidth="3.2" />
    <rect x="6" y="-42" width="48" height="28" rx="5" fill="#DC2626" stroke="#0F172A" strokeWidth="3" />
    <rect x="14" y="-35" width="28" height="15" rx="3" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2" />
    <rect x="-40" y="-40" width="16" height="20" rx="2" fill="#1E293B" />
    <circle cx="-32" cy="-48" r="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="2" />
    <circle cx="-18" cy="-58" r="9" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
    <polygon points="-56,2 -70,22 -52,22" fill="#FACC15" stroke="#0F172A" strokeWidth="2.4" />
    <circle cx="-36" cy="24" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="2" cy="24" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="38" cy="24" r="10" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
  </g>
);

export const MiniTreeSvg: React.FC = () => (
  <g>
    <path d="M-12 36 L-8 -16 L8 -16 L12 36 Z" fill="#92400E" stroke="#451A03" strokeWidth="2.8" />
    <circle cx="-24" cy="-22" r="24" fill="#15803D" stroke="#14532D" strokeWidth="2.8" />
    <circle cx="24" cy="-20" r="24" fill="#15803D" stroke="#14532D" strokeWidth="2.8" />
    <circle cx="0" cy="-44" r="28" fill="#22C55E" stroke="#15803D" strokeWidth="2.8" />
    <circle cx="-10" cy="-30" r="18" fill="#4ADE80" />
  </g>
);

export const MiniBridgeSvg: React.FC = () => (
  <g>
    <ellipse cx="0" cy="26" rx="54" ry="12" fill="#38BDF8" opacity="0.65" />
    <path d="M-50 18 Q0 -18 50 18 L50 28 Q0 -4 -50 28 Z" fill="#D97706" stroke="#451A03" strokeWidth="3" />
    <rect x="-40" y="-4" width="6" height="20" rx="2" fill="#78350F" />
    <rect x="0" y="-12" width="6" height="20" rx="2" fill="#78350F" />
    <rect x="34" y="-4" width="6" height="20" rx="2" fill="#78350F" />
    <path d="M-40 -2 Q0 -14 40 -2" fill="none" stroke="#B45309" strokeWidth="3.5" strokeLinecap="round" />
  </g>
);

export const MiniLightningSvg: React.FC = () => (
  <g>
    <polygon
      points="-4,-54 24,-54 4,-10 30,-10 -14,52 -2,6 -26,6"
      fill="#FACC15"
      stroke="#0F172A"
      strokeWidth="3.4"
      strokeLinejoin="round"
    />
  </g>
);

export const MiniDuckSvg: React.FC = () => (
  <g>
    <line x1="0" y1="22" x2="0" y2="38" stroke="#EA580C" strokeWidth="5" strokeLinecap="round" />
    <polygon points="-12,40 12,40 4,34" fill="#EA580C" />
    <ellipse cx="8" cy="8" rx="30" ry="20" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
    <path d="M-4 6 Q12 -4 26 8 Q12 18 -4 6 Z" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
    <circle cx="-18" cy="-20" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
    <circle cx="-23" cy="-22" r="3" fill="#0F172A" />
    <line x1="-29" y1="-30" x2="-15" y2="-24" stroke="#DC2626" strokeWidth="3.2" strokeLinecap="round" />
    <polygon points="-34,-21 -58,-15 -34,-9" fill="#F97316" stroke="#C2410C" strokeWidth="2.4" />
  </g>
);

export const MiniCarSvg: React.FC = () => (
  <g>
    <path d="M-48 10 L-42 -8 L-24 -26 L20 -26 L36 -6 L48 -2 L48 16 L-48 16 Z" fill="#3B82F6" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
    <polygon points="-20,-20 16,-20 28,-6 -32,-6" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2.2" />
    <circle cx="-26" cy="18" r="11" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
    <circle cx="26" cy="18" r="11" fill="#1E293B" stroke="#94A3B8" strokeWidth="2.5" />
  </g>
);

export const MiniElephantSvg: React.FC = () => (
  <g>
    <rect x="-20" y="18" width="14" height="24" rx="4" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" />
    <rect x="14" y="18" width="14" height="24" rx="4" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" />
    <ellipse cx="10" cy="4" rx="34" ry="26" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
    <ellipse cx="-8" cy="-8" rx="18" ry="22" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" />
    <circle cx="-24" cy="-14" r="20" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
    <circle cx="-30" cy="-18" r="3" fill="#0F172A" />
    <path d="M-42 -10 Q-58 2 -48 22 Q-42 26 -38 18" fill="none" stroke="#94A3B8" strokeWidth="10" strokeLinecap="round" />
    <path d="M-36 -4 Q-48 4 -52 -6" fill="none" stroke="#FEF9C3" strokeWidth="4.5" strokeLinecap="round" />
  </g>
);

export const MiniBalloonSvg: React.FC = () => (
  <g>
    <path d="M0 30 Q-6 44 4 56" fill="none" stroke="#475569" strokeWidth="2.8" strokeLinecap="round" />
    <ellipse cx="0" cy="-8" rx="28" ry="34" fill="#F43F5E" stroke="#881337" strokeWidth="3" />
    <polygon points="-5,26 5,26 0,32" fill="#E11D48" stroke="#881337" strokeWidth="2" />
    <ellipse cx="-10" cy="-20" rx="6" ry="12" transform="rotate(-24, -10, -20)" fill="#FDA4AF" opacity="0.8" />
  </g>
);

const MiniFlowerSvg: React.FC = () => (
  <g>
    <line x1="0" y1="6" x2="0" y2="44" stroke="#16A34A" strokeWidth="5" strokeLinecap="round" />
    <ellipse cx="-12" cy="28" rx="10" ry="5" transform="rotate(-25, -12, 28)" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <circle
        key={deg}
        cx={Math.cos((deg * Math.PI) / 180) * 18}
        cy={-12 + Math.sin((deg * Math.PI) / 180) * 18}
        r="12"
        fill="#F472B6"
        stroke="#9D174D"
        strokeWidth="2.4"
      />
    ))}
    <circle cx="0" cy="-12" r="11" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
  </g>
);

const MiniForestSvg: React.FC = () => (
  <g>
    <rect x="-7" y="18" width="14" height="26" fill="#78350F" stroke="#451A03" strokeWidth="2.4" />
    <polygon points="0,-46 -32,-2 32,-2" fill="#16A34A" stroke="#14532D" strokeWidth="2.8" strokeLinejoin="round" />
    <polygon points="0,-24 -38,20 38,20" fill="#15803D" stroke="#14532D" strokeWidth="2.8" strokeLinejoin="round" />
  </g>
);

const MiniHouseSvg: React.FC = () => (
  <g>
    <rect x="-32" y="-12" width="64" height="48" rx="4" fill="#FED7AA" stroke="#0F172A" strokeWidth="3" />
    <polygon points="-40,-10 0,-42 40,-10" fill="#EF4444" stroke="#0F172A" strokeWidth="3" strokeLinejoin="round" />
    <rect x="-10" y="8" width="20" height="28" rx="2" fill="#92400E" stroke="#0F172A" strokeWidth="2.4" />
    <rect x="14" y="0" width="12" height="12" rx="2" fill="#FEF08A" stroke="#0F172A" strokeWidth="2" />
  </g>
);

export const MiniHauntedDoorSvg: React.FC = () => (
  <g>
    <rect x="-28" y="-36" width="56" height="72" rx="4" fill="#475569" stroke="#0F172A" strokeWidth="3" />
    <rect x="-20" y="-28" width="40" height="62" fill="#0F172A" />
    <polygon points="-20,-28 7,-22 7,38 -20,34" fill="#64748B" stroke="#1E293B" strokeWidth="2.4" strokeLinejoin="round" />
    <rect x="-14" y="-20" width="14" height="18" rx="1.5" fill="#475569" stroke="#334155" strokeWidth="1.5" />
    <circle cx="2" cy="7" r="2.8" fill="#FACC15" stroke="#0F172A" strokeWidth="1.2" />
    {/* Eerie glowing eyes peeking out of the dark crack */}
    <circle cx="11" cy="-8" r="2.3" fill="#FDE047" />
    <circle cx="17" cy="-8" r="2.3" fill="#FDE047" />
    {/* Spooky cobweb & shiver zigzags */}
    <path d="M-20 -28 L-8 -28 M-20 -28 L-20 -16 M-20 -28 L-11 -19" stroke="#CBD5E1" strokeWidth="1.5" opacity="0.7" />
    <path d="M-36 -16 Q-40 -10 -36 -4 Q-40 2 -36 8" fill="none" stroke="#818CF8" strokeWidth="2.6" strokeLinecap="round" />
    <path d="M36 -16 Q40 -10 36 -4 Q40 2 36 8" fill="none" stroke="#818CF8" strokeWidth="2.6" strokeLinecap="round" />
  </g>
);

const MiniTalkBulletsSvg: React.FC = () => (
  <g>
    <line x1="22" y1="-22" x2="44" y2="-22" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
    <line x1="26" y1="2" x2="48" y2="2" stroke="#EC4899" strokeWidth="3" strokeLinecap="round" />
    <line x1="20" y1="24" x2="42" y2="24" stroke="#F472B6" strokeWidth="3" strokeLinecap="round" />
    <g transform="translate(-14, -20) rotate(-6)">
      <rect x="-24" y="-15" width="48" height="28" rx="11" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2.8" />
      <text x="0" y="5" textAnchor="middle" fontSize="15" fontWeight="900" fill="#DB2777">얘</text>
    </g>
    <g transform="translate(14, 2) rotate(5)">
      <rect x="-24" y="-15" width="48" height="28" rx="11" fill="#FCE7F3" stroke="#DB2777" strokeWidth="2.8" />
      <text x="0" y="5" textAnchor="middle" fontSize="15" fontWeight="900" fill="#BE185D">기</text>
    </g>
    <g transform="translate(-8, 22)">
      <rect x="-32" y="-15" width="64" height="30" rx="12" fill="#FFFFFF" stroke="#EC4899" strokeWidth="3" />
      <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="900" fill="#EC4899">얘기!</text>
    </g>
  </g>
);

export function getSeriesCornerIcon(
  seriesNum: number,
  itemKey: string,
  walkTime: number
): JollamanCornerIcon | null {
  switch (seriesNum) {
    // Series 1: Consonants (14) — all 14 have concrete illustrated comic nouns!
    case 1:
      switch (itemKey) {
        case 'ㄱ':
          return { viewBox: '-76 -68 138 112', svg: <MiniTrainSvg /> };
        case 'ㄴ':
          return { viewBox: '-56 -78 112 120', svg: <MiniTreeSvg /> };
        case 'ㄷ':
          return { viewBox: '-60 -32 120 78', svg: <MiniBridgeSvg /> };
        case 'ㄹ':
          return { viewBox: '-44 -96 88 220', svg: <SpaceXRocketSvg firing={true} legsDeployed={false} walkTime={walkTime} /> };
        case 'ㅁ':
          return { viewBox: '-68 -36 122 80', svg: <SkinnyMosquitoSvg walkTime={walkTime} /> };
        case 'ㅂ':
          return { viewBox: '-36 -60 76 118', svg: <MiniLightningSvg /> };
        case 'ㅅ':
          return { viewBox: '-90 -72 174 136', svg: <DetailedLionSvg roaring={true} /> };
        case 'ㅇ':
          return { viewBox: '-64 -44 108 92', svg: <MiniDuckSvg /> };
        case 'ㅈ':
          return { viewBox: '-56 -34 112 68', svg: <MiniCarSvg /> };
        case 'ㅊ':
          return { viewBox: '-46 -64 92 124', svg: <DiscoDancingJollamanSvg walkTime={walkTime} /> };
        case 'ㅋ':
          return { viewBox: '-60 -40 112 90', svg: <MiniElephantSvg /> };
        case 'ㅌ':
          return { viewBox: '-72 -98 172 184', svg: <MuscularRabbitSvg /> };
        case 'ㅍ':
          return { viewBox: '-36 -50 72 114', svg: <MiniBalloonSvg /> };
        case 'ㅎ':
          return { viewBox: '-82 -52 174 116', svg: <TigerSpriteSvg walkTime={walkTime} isSpinning={false} /> };
        default:
          return null;
      }

    // Series 2: Basic Vowels (10)
    case 2:
      switch (itemKey) {
        case 'ㅏ':
          return { viewBox: '-34 -64 68 98', svg: <CuteCryingBabyJollamanSvg walkTime={walkTime} crying={false} /> };
        case 'ㅑ':
          return { viewBox: '-30 -40 142 80', svg: <FieryBaseballSvg walkTime={walkTime} /> };
        case 'ㅓ':
          return { viewBox: '-72 -78 144 142', svg: <GiantFloorFishbowlSvg walkTime={walkTime} splashing={false} hideGoldfish={false} /> };
        case 'ㅕ':
          return { viewBox: '-42 -80 96 136', svg: <NineTailFoxSvg walkTime={walkTime} farting={false} showCollar={true} /> };
        case 'ㅗ':
          return { viewBox: '-44 -68 84 130', svg: <ComicSquidSvg walkTime={walkTime} spraying={false} /> };
        case 'ㅛ':
          return { viewBox: '-44 -44 88 88', svg: <GiantYoyoSvg /> };
        case 'ㅜ':
          return { viewBox: '-70 -48 140 80', svg: <ComicUfoSvg beamOn={false} /> };
        case 'ㅠ':
          return { viewBox: '-42 -56 84 114', svg: <SheetGhostSvg walkTime={walkTime} /> };
        case 'ㅡ':
          return { viewBox: '-46 -44 92 88', svg: <MiniHauntedDoorSvg /> };
        case 'ㅣ':
          return { viewBox: '-46 -52 122 100', svg: <TeethMonsterSvg jawOpenDeg={18} walkTime={walkTime} /> };
        default:
          return null;
      }

    // Series 3: Double Consonants (5)
    case 3:
      switch (itemKey) {
        case 'ㄲ':
          return { viewBox: '-74 -58 156 96', svg: <CrowFlockSvg walkTime={walkTime} attacking={false} /> };
        case 'ㄸ':
          return { viewBox: '-28 -54 56 64', svg: <SteamingPoopPileSvg walkTime={walkTime} squished={false} /> };
        case 'ㅃ':
          return { viewBox: '-36 -64 72 126', svg: <RibbonGirlJollamanSvg facing={1} isWalking={false} slapDeg={0} kissing={true} walkTime={walkTime} /> };
        case 'ㅆ':
          return { viewBox: '-98 -72 194 106', svg: <GarbageTruckSvg walkTime={walkTime} carryingJollaman={false} /> };
        case 'ㅉ':
          return { viewBox: '-32 -64 64 122', svg: <BuddyJollamanSvg walkTime={walkTime} isWalking={false} hugging={false} /> };
        default:
          return null;
      }

    // Series 4: Compound Vowels (11)
    case 4:
      switch (itemKey) {
        case 'ㅐ':
          return { viewBox: '-34 -28 68 62', svg: <FrogSvg jumping={false} mouthOpen={false} facing={1} /> };
        case 'ㅒ':
          return { viewBox: '-48 -42 102 84', svg: <MiniTalkBulletsSvg /> };
        case 'ㅔ':
          return { viewBox: '-56 -38 112 72', svg: <RedCrabSvg walkTime={walkTime} grabbing={false} /> };
        case 'ㅖ':
          return { viewBox: '-22 -26 44 52', svg: <RollingEggSvg rotDeg={0} scale={1} /> };
        case 'ㅘ':
          return { viewBox: '-22 -24 44 46', svg: <RedAppleSvg scale={1} /> };
        case 'ㅙ':
          return { viewBox: '-72 -50 144 102', svg: <WhySpeechBubbleSvg /> };
        case 'ㅚ':
          return { viewBox: '-94 -182 188 192', svg: <SwirlingTornadoSvg walkTime={walkTime} scale={1} /> };
        case 'ㅝ':
          return { viewBox: '-40 -42 84 82', svg: <MischievousMonkeySvg walkTime={walkTime} /> };
        case 'ㅞ':
          return { viewBox: '-48 -42 96 76', svg: <GoldenWeddingBellSvg walkTime={walkTime} /> };
        case 'ㅟ':
          return { viewBox: '-72 -44 144 108', svg: <MagicRideCloudSvg walkTime={walkTime} rising={true} /> };
        case 'ㅢ':
          return { viewBox: '-34 -44 68 90', svg: <PinkTeaChairSvg /> };
        default:
          return null;
      }

    // Series 5: Basic Batchim (7)
    case 5:
      switch (itemKey) {
        case 'ㄱ':
          return { viewBox: '-52 -56 104 102', svg: <GiantWatermelonWholeSvg cracking={false} walkTime={walkTime} /> };
        case 'ㄴ':
          return { viewBox: '-80 -116 160 134', svg: <SnowAvalancheMoundSvg walkTime={walkTime} /> };
        case 'ㄷ':
          return { viewBox: '-52 -42 224 84', svg: <GiantSteelSpoonSvg /> };
        case 'ㄹ':
          return { viewBox: '-44 -146 88 214', svg: <GiantSlashBladeSvg glintPhase={0} /> };
        case 'ㅁ':
          return { viewBox: '-64 -98 128 166', svg: <BigShakingBearSvg walkTime={walkTime} shaking={false} /> };
        case 'ㅂ':
          return { viewBox: '-42 -136 84 186', svg: <GiantDiggingShovelSvg dirtLoad={false} /> };
        case 'ㅇ':
          return { viewBox: '-56 -56 112 112', svg: <GiantBowlingBallSvg rotationDeg={0} /> };
        default:
          return null;
      }

    // Series 6: Batchim 2 (9) — '밖', '있다' have no standalone object icon -> null
    case 6:
      switch (itemKey) {
        case 'ㄲ':
          return null;
        case 'ㅅ':
          return { viewBox: '-40 -30 80 64', svg: <FlyingShirtSvg stretchY={1} /> };
        case 'ㅈ':
          return { viewBox: '-64 -64 128 128', svg: <BlazingDaySunSvg heating={false} walkTime={walkTime} /> };
        case 'ㅊ':
          return { viewBox: '-36 -38 72 90', svg: <MiniFlowerSvg /> };
        case 'ㅋ':
          return { viewBox: '-56 -36 166 72', svg: <GiantCastIronSkilletSvg /> };
        case 'ㅌ':
          return { viewBox: '-48 -58 96 130', svg: <GiantFarmRadishSvg pulledOut={true} straining={false} walkTime={walkTime} /> };
        case 'ㅍ':
          return { viewBox: '-44 -52 88 102', svg: <MiniForestSvg /> };
        case 'ㅆ':
          return null;
        case 'ㅎ':
          return { viewBox: '-38 -74 76 102', svg: <ShyHieutGhostSvg armored={true} walkTime={walkTime} /> };
        default:
          return null;
      }

    // Series 7: Double Batchim (15) — abstract words/rules return null
    case 7:
      switch (itemKey) {
        case 'ㄳ':
          return { viewBox: '-36 -42 74 66', svg: <PizzaSliceWithFlagSvg /> };
        case 'ㄵ':
          return { viewBox: '-48 -58 96 100', svg: <PoolsideFlyingChairsSvg springStretch={0} /> };
        case 'ㄶ':
          return null;
        case '짧다':
          return { viewBox: '-76 -92 156 104', svg: <TooShortCoasterSvg carProgress={0.5} /> };
        case 'ㄽ':
          return null;
        case 'ㄾ':
          return { viewBox: '-24 -50 48 84', svg: <GiantIceCreamConeSvg /> };
        case 'ㅀ':
        case 'ㅄ':
          return null;
        case 'ㄺ':
          return { viewBox: '-44 -44 90 80', svg: <CrazyRoosterSvg walkTime={walkTime} flying={false} angry={false} /> };
        case 'ㄻ':
          return { viewBox: '-50 -136 122 146', svg: <EmptyFridgeSvg isOpen={false} walkTime={walkTime} /> };
        case 'ㄿ':
          return { viewBox: '-26 -98 52 106', svg: <PoetryMicStandSvg hasMicHead={true} /> };
        case 'ㄼ':
        case '읽고':
        case '많아':
        case '많고':
        default:
          return null;
      }

    // Series 8 & 9: Phonology rules focus cleanly on typography transformation -> null
    case 8:
    case 9:
      return null;

    // Series 10: Irregular Conjugations (8)
    case 10:
      switch (itemKey) {
        case '춥다':
          return { viewBox: '-34 -54 68 74', svg: <WarmCampfireSvg pulse={1} /> };
        case '듣다':
          return { viewBox: '-36 -42 108 84', svg: <BoomingSpeakerSvg pulse={1} blasting={false} /> };
        case '짓다':
          return { viewBox: '-44 -48 88 92', svg: <MiniHouseSvg /> };
        case '부르다':
          return { viewBox: '-38 -32 76 66', svg: <MegaphoneSvg /> };
        default:
          return null;
      }

    // Series 11: Addition & Saitsori (8)
    case 11:
      switch (itemKey) {
        case '콧물':
          return { viewBox: '-36 -56 72 80', svg: <TissueBoxSvg pop={0.3} /> };
        case '촛불':
          return { viewBox: '-34 -88 68 124', svg: <DoubleCandleSvg flared={true} flicker={1} /> };
        case '깻잎':
          return { viewBox: '-36 -42 72 86', svg: <SesameLeafSvg scale={1} /> };
        case '한여름':
          return { viewBox: '-46 -46 92 92', svg: <BlazingSunSvg pulse={1} /> };
        case '가다':
          return { viewBox: '-48 -38 96 76', svg: <RoyalScrollSvg open={1} /> };
        case '푸다':
          return { viewBox: '-34 -26 102 52', svg: <WaterLadleSvg tilt={0} /> };
        default:
          return null;
      }

    // Series 12: Basic Particles (4)
    case 12:
      switch (itemKey) {
        case 'i-ga':
        case 'eul-reul':
          return { viewBox: '-110 -100 225 215', svg: <ParticleMonsterSvg mode="sleeping" time={walkTime} /> };
        case 'wa-gwa':
          return { viewBox: '-36 -64 72 126', svg: <GirlfriendJollamanSvg walkTime={walkTime} pose="happy" facing={1} /> };
        default:
          return null;
      }

    // Series 13: Extended Particles (8)
    case 13:
      switch (itemKey) {
        case '에 (도착)':
          return { viewBox: '-44 -48 88 92', svg: <MiniHouseSvg /> };
        case '에게·한테':
          return { viewBox: '-42 -58 96 86', svg: <SpringGiftBoxSvg sprung={false} progress={0} /> };
        case '로 (모음)':
          return { viewBox: '-134 -78 268 152', svg: <GreenCityBusSvg walkTime={walkTime} label="BUS" /> };
        case 'ㄹ + 로':
          return { viewBox: '-76 -68 138 112', svg: <MiniTrainSvg /> };
        default:
          return null;
      }

    // Series 14: Daily Life Verbs & Survival Phrases (16)
    case 14:
      switch (itemKey) {
        case '먹다':
          return { viewBox: '-82 -102 164 162', svg: <GiantRamenBowlSvg walkTime={walkTime} full={true} /> };
        case '마시다':
          return { viewBox: '-80 -112 128 174', svg: <GiantBobaCupSvg drainLevel={0.15} /> };
        case '자다':
          return { viewBox: '-92 -98 184 150', svg: <FluffyBedAndZzzSvg walkTime={walkTime} snoring={true} /> };
        case '주다':
          return { viewBox: '-42 -58 96 86', svg: <SpringGiftBoxSvg sprung={false} progress={0} /> };
        case '좋아하다':
        case '사랑해':
          return { viewBox: '-28 -28 56 54', svg: <CartoonHeartSvg size={1.6} color="#EC4899" stroke="#831843" /> };
        case '죄송':
          return { viewBox: '-46 -80 92 140', svg: <ShatteredVasePedestalSvg broken={true} progress={1} /> };
        case '얼마':
          return { viewBox: '-72 -100 154 160', svg: <PriceTagStallSvg shocked={false} walkTime={walkTime} /> };
        default:
          return null;
      }

    // Series 15: K-Patterns & Numbers/Days (12)
    case 15:
      switch (itemKey) {
        case '과거 았/었':
          return { viewBox: '-78 -114 156 170', svg: <TimeMachineCapsuleSvg walkTime={walkTime} active={true} /> };
        case '미래 ㄹ래요':
          return { viewBox: '-54 -82 108 132', svg: <CrystalFortuneOrbSvg walkTime={walkTime} /> };
        case '-지 마':
          return { viewBox: '-64 -44 128 96', svg: <GiantStopHandStampSvg slammed={true} /> };
        case '안 (부정)':
          return { viewBox: '-52 -54 104 96', svg: <EvilBroccoliPlateSvg kickedProgress={0} /> };
        case '-(으)세요':
          return { viewBox: '-42 -48 84 62', svg: <RoyalCrownAndCarpetSvg /> };
        case '하나·둘·셋':
          return { viewBox: '-82 -152 164 140', svg: <JugglingPins123Svg t={walkTime * 0.45} /> };
        case '넷·다섯·여섯':
          return { viewBox: '-96 -42 192 84', svg: <HeavyBarbell456Svg liftY={0} /> };
        case '일·이·삼':
          return { viewBox: '-56 -52 112 102', svg: <CashRegister123Svg walkTime={walkTime} active={true} /> };
        case '어제·오늘·내일':
          return { viewBox: '-54 -52 108 108', svg: <FlippingCalendarPagesSvg t={0.25} /> };
        default:
          return null;
      }

    // Series 16: Tier-3 Particles (8)
    case 16:
      switch (itemKey) {
        case 'irang-batchim':
          return { viewBox: '-52 -56 104 102', svg: <GiantWatermelonWholeSvg cracking={false} walkTime={walkTime} /> };
        case 'a-ya-vocative':
          return { viewBox: '-110 -100 225 215', svg: <ParticleMonsterSvg mode="smirk" time={walkTime} /> };
        case 'hanteseo-from':
          return { viewBox: '-42 -58 96 86', svg: <SpringGiftBoxSvg sprung={false} progress={0} /> };
        case 'mada-every':
          return { viewBox: '-64 -64 128 128', svg: <BlazingDaySunSvg heating={false} walkTime={walkTime} /> };
        default:
          return null;
      }

    default:
      return null;
  }
}
