import React from 'react';
import { ChantItem } from '../utils/chantPresets';
import { romanizeKorean } from '../utils/koreanRomanizer';
import {
  BuddyJollamanSvg,
  CrowFlockSvg,
  CuteWalkingDogSvg,
  DynamicEpisode3Backdrop,
  Episode3ThemeKey,
  GarbageTruckSvg,
  RibbonGirlJollamanSvg,
  SteamingPoopPileSvg,
} from './JollamanSprites3';
import {
  AppleTreeSvg,
  BeachLoungeBenchSvg,
  CompoundSceneBackdrop,
  CompoundVowelKey,
  FrogSvg,
  getCompoundBackdropTheme,
  GirlfriendJollamanSvg,
  GoldenWeddingBellSvg,
  HillChickenSvg,
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
  ComicImpactBurstSvg,
  ComicSquidSvg,
  ComicUfoSvg,
  CuteCryingBabyJollamanSvg,
  DetailedLionSvg,
  FieryBaseballSvg,
  GiantFloorFishbowlSvg,
  GiantYoyoSvg,
  HauntedHouseBackdrop,
  JollamanCharacterSvg,
  MirrorBallSvg,
  MuscularRabbitSvg,
  NightCityBackdrop,
  NineTailFoxSvg,
  PastelHouseBackdrop,
  PictureBookSvg,
  SheetGhostSvg,
  SkinnyMosquitoSvg,
  SpaceXRocketSvg,
  SparkleBurstSvg,
  TeethMonsterSvg,
  TigerSpriteSvg,
} from './JollamanSprites';
import {
  ChantComedyActorSwitch,
  ChantComedySetId,
  CosmicUfoBackdrop,
  KitchenSpicyBackdrop,
  KungfuDojoBackdrop,
} from './ChantComedySets';
import {
  GiantDiggingShovelSvg,
  GiantSlashBladeSvg,
} from './JollamanSprites5';
import {
  MiniBalloonSvg,
  MiniBridgeSvg,
  MiniCarSvg,
  MiniDuckSvg,
  MiniElephantSvg,
  MiniHauntedDoorSvg,
  MiniLightningSvg,
  MiniTreeSvg,
} from './JollamanFlashcardIcons';

export interface ChantStageSceneProps {
  item: ChantItem;
  songIndex?: number;
  phraseIdx: number;
  role: 'call' | 'response';
  beatInBar: number; // 0, 1, 2, 3
  beatProgress: number; // 0..1 within current beat
  animClock: number;
  repeatIdx: number; // 0 or 1
  totalRepeats: number;
  isPlaying: boolean;
  hasCustomVoice: boolean;
  viewBox: string;
  globalRomanization: boolean;
  globalAudienceMode: boolean;
  celebrationActive?: boolean;
  shortsAspect: boolean;
  shortsSafeZoneGuide: boolean;
}

const CONSONANT_THEME_MAP: Record<string, Episode3ThemeKey> = {
  ㄱ: 'railway',
  ㄴ: 'sunset',
  ㄷ: 'jungle',
  ㄹ: 'space',
  ㅁ: 'jungle',
  ㅂ: 'thunderstorm',
  ㅅ: 'savannah',
  ㅇ: 'farm',
  ㅈ: 'city',
  ㅊ: 'disco',
  ㅋ: 'savannah',
  ㅌ: 'nightmarket',
  ㅍ: 'beach',
  ㅎ: 'disco',
  ㄲ: 'sunset',
  ㄸ: 'sunset',
  ㅃ: 'sunset',
  ㅆ: 'sunset',
  ㅉ: 'sunset',
};

const COMPOUND_KEY_SET = new Set<string>([
  'ㅐ', 'ㅒ', 'ㅔ', 'ㅖ', 'ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ',
]);

/**
 * Renders reused Jollaman Episode Scene Props & Rotating Slapstick Actor for Call Phase
 */
const ChantCallEpisodeActor: React.FC<{
  sceneKey: string;
  comedySetId: ChantComedySetId;
  itemColor: string;
  beatInBar: number;
  beatProgress: number;
  animClock: number;
}> = ({ sceneKey, comedySetId, itemColor, beatInBar, beatProgress, animClock }) => {
  const isBeat4Clap = beatInBar === 3;

  const renderProp = () => {
    switch (sceneKey) {
      case 'ㄱ':
        return (
          <g transform={`translate(${120 - beatInBar * 18}, 22)`}>
            <rect x="-46" y="-26" width="92" height="44" rx="10" fill="#DC2626" stroke="#0F172A" strokeWidth="3" />
            <rect x="-32" y="-16" width="24" height="16" rx="3" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2" />
            <circle cx="-26" cy="22" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <circle cx="24" cy="22" r="10" fill="#1E293B" stroke="#0F172A" strokeWidth="2.5" />
            <text x="16" y="-2" fontSize="20" textAnchor="middle">🚂</text>
          </g>
        );
      case 'ㄴ':
      case 'ㄷ':
      case 'ㅂ':
      case 'ㅇ':
      case 'ㅈ':
      case 'ㅋ':
      case 'ㅍ': {
        const jamoCard: Record<string, [React.ReactNode, string, string]> = {
          ㄴ: [<MiniTreeSvg key="ㄴ" />, '나무', '#16A34A'],
          ㄷ: [<MiniBridgeSvg key="ㄷ" />, '다리', '#D97706'],
          ㅂ: [<MiniLightningSvg key="ㅂ" />, '번개', '#0284C7'],
          ㅇ: [<MiniDuckSvg key="ㅇ" />, '오리', '#2563EB'],
          ㅈ: [<MiniCarSvg key="ㅈ" />, '자동차', '#4F46E5'],
          ㅋ: [<MiniElephantSvg key="ㅋ" />, '코끼리', '#9333EA'],
          ㅍ: [<MiniBalloonSvg key="ㅍ" />, '풍선', '#E11D48'],
        };
        const [iconNode, label, accent] = jamoCard[sceneKey];
        return (
          <g transform={`translate(112, ${isBeat4Clap ? -16 : -Math.exp(-beatProgress * 6) * 8})`}>
            <rect x="-52" y="-46" width="104" height="88" rx="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
            <g transform="translate(0, -14) scale(0.48)">{iconNode}</g>
            <text x="0" y="26" textAnchor="middle" dominantBaseline="central" fontSize={label.length >= 3 ? 21 : 25} fontWeight="900" fill={accent}>
              {label}
            </text>
          </g>
        );
      }
      case 'ㅊ':
        return (
          <g transform="translate(115, -75)">
            <MirrorBallSvg dropY={56} walkTime={animClock} />
          </g>
        );
      case 'ㄹ':
        return (
          <g transform={`translate(125, ${10 - beatInBar * 8}) rotate(-18)`}>
            <SpaceXRocketSvg firing legsDeployed={false} walkTime={animClock} />
          </g>
        );
      case 'ㅁ':
        return (
          <g transform={`translate(115, ${-25 + Math.sin(animClock * 10) * 14}) scale(1.15)`}>
            <SkinnyMosquitoSvg walkTime={animClock} />
          </g>
        );
      case 'ㅅ':
        return (
          <g transform="translate(132, 16) scale(0.95)">
            <DetailedLionSvg roaring={beatInBar === 2} />
          </g>
        );
      case 'ㅌ':
        return (
          <g transform="translate(128, 12) scale(-0.92, 0.92)">
            <MuscularRabbitSvg />
          </g>
        );
      case 'ㅎ':
        return (
          <g transform="translate(128, 14) scale(-0.9, 0.9)">
            <TigerSpriteSvg walkTime={animClock} isSpinning={beatInBar === 3} />
          </g>
        );
      case 'ㄲ':
        return (
          <g transform="translate(110, -35)">
            <CrowFlockSvg walkTime={animClock} attacking={beatInBar === 2} />
          </g>
        );
      case 'ㄸ':
        return (
          <g transform="translate(115, 22)">
            <CuteWalkingDogSvg walkTime={animClock} />
            <g transform="translate(-45, 22)">
              <SteamingPoopPileSvg walkTime={animClock} squished={beatInBar === 3} />
            </g>
          </g>
        );
      case 'ㅃ':
        return (
          <g transform="translate(105, 8)">
            <RibbonGirlJollamanSvg
              kissing={beatInBar === 2}
              isWalking={beatInBar < 2}
              walkTime={animClock}
            />
          </g>
        );
      case 'ㅆ':
        return (
          <g transform="translate(135, 16) scale(0.85)">
            <GarbageTruckSvg walkTime={animClock} />
          </g>
        );
      case 'ㅉ':
        return (
          <g transform="translate(96, 8)">
            <BuddyJollamanSvg hugging walkTime={animClock} />
          </g>
        );
      case 'ㅏ':
        return (
          <g transform="translate(105, 16)">
            <CuteCryingBabyJollamanSvg walkTime={animClock} crying={beatInBar === 2} />
          </g>
        );
      case 'ㅑ':
        return (
          <g transform={`translate(${125 - beatInBar * 24}, -12)`}>
            <FieryBaseballSvg walkTime={animClock} />
          </g>
        );
      case 'ㅓ':
        return (
          <g transform="translate(122, 18) scale(0.75)">
            <GiantFloorFishbowlSvg walkTime={animClock} />
          </g>
        );
      case 'ㅕ':
        return (
          <g transform="translate(126, 20) scale(0.95)">
            <NineTailFoxSvg walkTime={animClock} farting={beatInBar === 2} />
          </g>
        );
      case 'ㅗ':
        return (
          <g transform="translate(118, 6)">
            <PictureBookSvg />
            <g transform="translate(0, -16)">
              <ComicSquidSvg walkTime={animClock} spraying={beatInBar === 2} />
            </g>
          </g>
        );
      case 'ㅛ':
        return (
          <g transform={`translate(112, ${-10 + beatInBar * 8})`}>
            <GiantYoyoSvg />
          </g>
        );
      case 'ㅜ':
        return (
          <g transform="translate(112, -55) scale(0.88)">
            <ComicUfoSvg beamOn={beatInBar >= 1} />
          </g>
        );
      case 'ㅠ':
        return (
          <g transform={`translate(115, ${-14 + Math.sin(animClock * 5) * 10})`}>
            <SheetGhostSvg walkTime={animClock} />
          </g>
        );
      case 'ㅡ':
        return (
          <g transform={`translate(${114 + Math.sin(animClock * 26) * 2}, ${isBeat4Clap ? -16 : 0})`}>
            <rect x="-52" y="-46" width="104" height="88" rx="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
            <g transform="translate(0, -14) scale(0.52)">
              <MiniHauntedDoorSvg />
            </g>
            <text x="0" y="26" textAnchor="middle" dominantBaseline="central" fontSize="21" fontWeight="900" fill="#475569">
              으스스
            </text>
          </g>
        );
      case 'ㅣ':
        return (
          <g transform="translate(126, 16) scale(0.75)">
            <TeethMonsterSvg jawOpenDeg={beatInBar === 2 ? 32 : 12} walkTime={animClock} />
          </g>
        );
      case 'ㅐ':
        return (
          <g transform="translate(116, 22)">
            <FrogSvg jumping={isBeat4Clap} mouthOpen={beatInBar === 2} facing={-1} />
          </g>
        );
      case 'ㅒ':
      case 'ㅞ':
        return (
          <g transform="translate(105, 8)">
            <GirlfriendJollamanSvg
              pose={beatInBar === 3 ? 'jump' : 'chatter'}
              walkTime={animClock}
              showBubble={sceneKey === 'ㅒ' ? '얘기!' : undefined}
              showBubbleSub={sceneKey === 'ㅒ' ? 'Talk!' : undefined}
            />
            {sceneKey === 'ㅞ' && (
              <g transform="translate(0, -82)">
                <GoldenWeddingBellSvg walkTime={animClock} />
              </g>
            )}
          </g>
        );
      case 'ㅔ':
        return (
          <g transform="translate(115, 22)">
            <BeachLoungeBenchSvg />
            <g transform="translate(-20, 12)">
              <RedCrabSvg walkTime={animClock} grabbing={beatInBar === 2} />
            </g>
          </g>
        );
      case 'ㅘ':
        return (
          <g transform="translate(120, 20) scale(0.78)">
            <AppleTreeSvg shakeAngle={beatInBar === 2 ? 6 : 0} />
            <g transform="translate(-45, 22)">
              <RedAppleSvg scale={1.1} />
            </g>
          </g>
        );
      case 'ㅙ':
        return (
          <g transform="translate(108, -28)">
            <WhySpeechBubbleSvg />
          </g>
        );
      case 'ㅚ':
        return (
          <g transform="translate(122, 6) scale(0.75)">
            <SwirlingTornadoSvg walkTime={animClock} />
          </g>
        );
      case 'ㅝ':
        return (
          <g transform="translate(118, 18) scale(0.95)">
            <MischievousMonkeySvg walkTime={animClock} />
          </g>
        );
      case 'ㅖ':
        return (
          <g transform="translate(116, 18) scale(0.88)">
            <HillChickenSvg laying={beatInBar === 2} walkTime={animClock} />
            <g transform={`translate(${-24 - beatInBar * 10}, 16)`}>
              <RollingEggSvg rotDeg={animClock * 160} />
            </g>
          </g>
        );
      case 'ㅟ':
        return (
          <g transform={`translate(114, ${16 - beatInBar * 10}) scale(0.85)`}>
            <MagicRideCloudSvg walkTime={animClock} rising={true} />
            <text x="0" y="-28" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0284C7">
              ⬆️
            </text>
          </g>
        );
      case 'ㅢ':
        return (
          <g transform={`translate(115, ${isBeat4Clap ? 10 : 20}) scale(0.95)`}>
            <PinkTeaChairSvg />
          </g>
        );
      case '칼':
        return (
          <g transform={`translate(112, ${isBeat4Clap ? -16 : -Math.exp(-beatProgress * 6) * 8})`}>
            <rect x="-52" y="-46" width="104" height="88" rx="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
            <g transform="translate(0, -10) rotate(35) scale(0.24)">
              <GiantSlashBladeSvg glintPhase={animClock} />
            </g>
            <text x="0" y="24" textAnchor="middle" dominantBaseline="central" fontSize="26" fontWeight="900" fill="#D97706">
              칼
            </text>
          </g>
        );
      case '삽':
        return (
          <g transform={`translate(112, ${isBeat4Clap ? -16 : -Math.exp(-beatProgress * 6) * 8})`}>
            <rect x="-52" y="-46" width="104" height="88" rx="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
            <g transform="translate(0, -8) rotate(26) scale(0.27)">
              <GiantDiggingShovelSvg dirtLoad />
            </g>
            <text x="0" y="24" textAnchor="middle" dominantBaseline="central" fontSize="26" fontWeight="900" fill="#EC4899">
              삽
            </text>
          </g>
        );
      default: {
        // Support rich emoji+label flashcards ('prop:🌸|[꼳]') or arbitrary custom line badges
        const isPropCard = sceneKey.startsWith('prop:');
        const [rawEmoji, rawLabel] = isPropCard
          ? sceneKey.slice(5).split('|')
          : ['', sceneKey];
        const cardLabel = (rawLabel || sceneKey).trim();
        const labelFontSize =
          cardLabel.length >= 6
            ? 12.5
            : cardLabel.length === 5
            ? 15
            : cardLabel.length === 4
            ? 18
            : cardLabel.length === 3
            ? 22
            : 28;

        return (
          <g transform={`translate(112, ${isBeat4Clap ? -16 : -Math.exp(-beatProgress * 6) * 8})`}>
            <rect
              x="-52"
              y="-46"
              width="104"
              height="88"
              rx="18"
              fill="#FFFFFF"
              stroke="#0F172A"
              strokeWidth="3.2"
            />
            {isPropCard && rawEmoji ? (
              <>
                <text x="0" y="-12" textAnchor="middle" dominantBaseline="central" fontSize="34">
                  {rawEmoji}
                </text>
                <text
                  x="0"
                  y="24"
                  textAnchor="middle"
                  dominantBaseline="central"
                  fontSize={labelFontSize}
                  fontWeight="900"
                  fill="#E11D48"
                >
                  {cardLabel}
                </text>
              </>
            ) : (
              <text
                x="0"
                y="2"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={labelFontSize}
                fontWeight="900"
                fill="#E11D48"
              >
                {cardLabel.slice(0, 4)}
              </text>
            )}
          </g>
        );
      }
    }
  };

  return (
    <g transform="translate(495, 316)">
      {/* Main Slapstick Character rotating per Song Comedy Set (Sets 0..3) */}
      <g transform="translate(-85, 0)">
        <ChantComedyActorSwitch
          setId={comedySetId}
          beatInBar={beatInBar}
          beatProgress={beatProgress}
          animClock={animClock}
          scale={1.08}
          color={itemColor}
          showClapBurst={isBeat4Clap}
        />
        {isBeat4Clap && (
          <g transform="translate(0, -68)">
            <SparkleBurstSvg color="#FACC15" progress={beatProgress} />
          </g>
        )}
      </g>

      {/* Episode Prop on Stage Right */}
      {renderProp()}
    </g>
  );
};

const ChantBackdropLayer: React.FC<{
  sceneKey: string;
  comedySetId: ChantComedySetId;
  role: 'call' | 'response';
  animClock: number;
  beatInBar: number;
}> = ({ sceneKey, comedySetId, role, animClock, beatInBar }) => {
  // Dedicated Slapstick Backdrops for Comedy Sets 1, 2, 3 (each song gets its own distinct comedy world!)
  if (comedySetId === 1) {
    return (
      <g>
        <KungfuDojoBackdrop animClock={animClock} beatInBar={beatInBar} />
        {role === 'response' && (
          <polygon
            points="500,-80 210,550 790,550"
            fill="#FEF08A"
            opacity={beatInBar === 3 ? 0.24 : 0.1}
          />
        )}
      </g>
    );
  }
  if (comedySetId === 2) {
    return (
      <g>
        <CosmicUfoBackdrop animClock={animClock} beatInBar={beatInBar} />
        {role === 'response' && (
          <polygon
            points="500,56 230,550 770,550"
            fill="#4ADE80"
            opacity={beatInBar === 3 ? 0.22 : 0.1}
          />
        )}
      </g>
    );
  }
  if (comedySetId === 3) {
    return (
      <g>
        <KitchenSpicyBackdrop animClock={animClock} beatInBar={beatInBar} />
        {role === 'response' && (
          <polygon
            points="500,-80 220,550 780,550"
            fill="#FDBA74"
            opacity={beatInBar === 3 ? 0.24 : 0.1}
          />
        )}
      </g>
    );
  }

  // Set 0: Classic Disco spotlight on Response + Episode Theme on Call
  if (role === 'response') {
    return (
      <g>
        <DynamicEpisode3Backdrop
          theme={beatInBar === 3 ? 'stadium' : 'disco'}
          scrollOffset={animClock * 40}
          walkTime={animClock}
        />
        <MirrorBallSvg dropY={58} walkTime={animClock} />
        <polygon
          points="500,68 200,550 800,550"
          fill="#FEF08A"
          opacity={beatInBar === 3 ? 0.22 : 0.12}
        />
      </g>
    );
  }

  // Call Phase: reuse real matching Jollaman Episode backdrop
  if (COMPOUND_KEY_SET.has(sceneKey)) {
    const ck = sceneKey as CompoundVowelKey;
    return (
      <CompoundSceneBackdrop
        theme={getCompoundBackdropTheme(ck)}
        walkTime={animClock}
        activeChar={ck}
      />
    );
  }

  if (sceneKey === 'ㅏ' || sceneKey === 'ㅑ' || sceneKey === 'ㅓ' || sceneKey === 'ㅕ' || sceneKey === 'ㅗ' || sceneKey === 'ㅛ') {
    return <PastelHouseBackdrop walkTime={animClock} />;
  }
  if (sceneKey === 'ㅜ' || sceneKey === 'ㅡ' || sceneKey === 'ㅣ') {
    return <NightCityBackdrop walkTime={animClock} />;
  }
  if (sceneKey === 'ㅠ') {
    return <HauntedHouseBackdrop walkTime={animClock} />;
  }

  const extraThemes: Episode3ThemeKey[] = ['stadium', 'sunset', 'city', 'jungle', 'beach', 'space', 'disco'];
  const fallbackTheme = sceneKey.startsWith('prop:')
    ? extraThemes[
        Array.from(sceneKey).reduce((acc, ch) => acc + ch.charCodeAt(0), 0) % extraThemes.length
      ]
    : 'stadium';
  const theme = CONSONANT_THEME_MAP[sceneKey] ?? fallbackTheme;
  return (
    <DynamicEpisode3Backdrop
      theme={theme}
      scrollOffset={animClock * 34}
      walkTime={animClock}
    />
  );
};

export const ChantStageScene: React.FC<ChantStageSceneProps> = ({
  item,
  songIndex = 0,
  phraseIdx,
  role,
  beatInBar,
  beatProgress,
  animClock,
  isPlaying,
  hasCustomVoice,
  viewBox,
  globalRomanization,
  globalAudienceMode,
  celebrationActive = false,
  shortsAspect,
  shortsSafeZoneGuide,
}) => {
  const comedySetId = ((((songIndex ?? 0) % 4) + 4) % 4) as ChantComedySetId;
  const phrase = item.phrases[phraseIdx] ?? item.phrases[0];
  const isBeat4 = beatInBar === 3;
  // Crisp musical pulse scale on Beats 1,2,3 and bigger pop on Beat 4 Clap (bounded so card stays unclipped)
  const impulse = isPlaying ? Math.exp(-beatProgress * 6.0) : 0;
  const wordScale = isBeat4 ? 1 + impulse * 0.14 : 1 + impulse * 0.1;
  const wordBounceY = isBeat4 ? -impulse * 9 : -impulse * 6;
  const activeWord = beatInBar < 3 ? phrase.beats[beatInBar] : '👏 짝!';

  // Position mini groove companion safely inside 16:9 (815) or 9:16 (654/676) without clipping edges or karaoke bar
  const miniDancerX = shortsAspect
    ? shortsSafeZoneGuide
      ? 654
      : 676
    : 818;
  const miniDancerScale = shortsAspect ? 0.84 : 0.96;

  // Beat-by-beat phonetic & English sub-line so non-Korean learners can read EVERY beat immediately!
  const beatPhoneticSub =
    beatInBar < 2
      ? `[${romanizeKorean(phrase.beats[beatInBar]) || phrase.beats[beatInBar]}]`
      : beatInBar === 2
      ? `[${romanizeKorean(phrase.beats[2])}]${item.meaning ? ` · ${item.meaning}` : ''}`
      : globalAudienceMode
      ? 'CLAP ON BEAT 4!'
      : '박수 짝!';

  const showPhoneticSub =
    globalAudienceMode || globalRomanization || (Boolean(item.meaning) && beatInBar === 2);
  const heroY = shortsAspect ? 78 : 108;
  const actorY = shortsAspect ? 268 : 286;
  const stripWidth = shortsAspect ? 404 : 432;
  const slotStep = shortsAspect ? 98 : 104;
  const slotWidth = shortsAspect ? 90 : 96;

  return (
    <svg
      viewBox={viewBox}
      preserveAspectRatio="xMidYMid slice"
      className="w-full h-full block"
      role="img"
      aria-label={`리듬 챈트 무대: ${item.mainChar}`}
    >
      {/* 1. Background (Per-Song Rotating Comedy Backdrop / Set 0 Classic Disco) */}
      <ChantBackdropLayer
        sceneKey={item.sceneKey}
        comedySetId={comedySetId}
        role={role}
        animClock={animClock}
        beatInBar={beatInBar}
      />

      {/* 2. Top Center Role Banner: 16:9 Widescreen only (9:16 Shorts uses outer top header to avoid double labels) */}
      {!shortsAspect && (
        <g transform="translate(500, 27)">
          <rect
            x="-170"
            y="-15"
            width="340"
            height="30"
            rx="15"
            fill={celebrationActive ? '#F59E0B' : role === 'call' ? '#0F172A' : '#E11D48'}
            fillOpacity="0.94"
            stroke={celebrationActive ? '#FFFFFF' : role === 'call' ? '#38BDF8' : '#FDE047'}
            strokeWidth="2.2"
          />
          <text
            x="0"
            y="0"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize="14"
            fontWeight="900"
            fill={celebrationActive ? '#0F172A' : '#FFFFFF'}
          >
            {celebrationActive
              ? globalAudienceMode
                ? '🏆 COMPLETE! Full App in Comment 👇'
                : '🏆 완주! 무료 앱 고정댓글 👇'
              : role === 'call'
              ? hasCustomVoice
                ? globalAudienceMode
                  ? '🎙️ LISTEN · 내 목소리'
                  : '🎙️ 내 목소리 따라해요'
                : globalAudienceMode
                ? '🔊 LISTEN · 듣고 따라해요'
                : '🔊 듣고 따라해요'
              : globalAudienceMode
              ? '🎤 YOUR TURN! · 따라 해봐요'
              : '🎤 따라 해봐요!'}
          </text>
        </g>
      )}

      {/* 3. Big Bouncing Center Hero Hangul & Active Beat Word */}
      <g transform={`translate(500, ${heroY + wordBounceY}) scale(${wordScale})`}>
        <rect
          x={shortsAspect ? -175 : -190}
          y="-50"
          width={shortsAspect ? 350 : 380}
          height="100"
          rx="22"
          fill="#FFFFFF"
          fillOpacity="0.96"
          stroke={celebrationActive ? '#FACC15' : isBeat4 ? '#F59E0B' : item.color}
          strokeWidth="4.5"
        />

        {/* Main Target Character (e.g. ㄱ / 받침 ㄱ / 한국어 / 은 / 는) */}
        <text
          x={shortsAspect ? -96 : -104}
          y="0"
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={
            item.mainChar.length >= 8
              ? 16
              : item.mainChar.length === 7
              ? 18
              : item.mainChar.length === 6
              ? 20
              : item.mainChar.length === 5
              ? 23
              : item.mainChar.length === 4
              ? 27
              : item.mainChar.length === 3
              ? 34
              : item.mainChar.length === 2
              ? 44
              : 66
          }
          fontWeight="900"
          fill={item.color}
        >
          {item.mainChar}
        </text>

        <line x1="-18" y1="-32" x2="-18" y2="32" stroke="#E2E8F0" strokeWidth="3" />

        {/* Current Beat Callout Word (e.g. 그 / 기차 / [한구거] / 👏 짝!) */}
        <text
          x={shortsAspect ? 78 : 82}
          y={showPhoneticSub || celebrationActive ? -10 : 0}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={
            celebrationActive
              ? 28
              : activeWord.length >= 7
              ? 20
              : activeWord.length === 6
              ? 23
              : activeWord.length === 5
              ? 25
              : activeWord.length === 4
              ? 28
              : activeWord.length === 3
              ? 34
              : 42
          }
          fontWeight="900"
          fill={celebrationActive ? '#059669' : isBeat4 ? '#DC2626' : '#0F172A'}
        >
          {celebrationActive ? '🎉 WELL DONE!' : activeWord}
        </text>

        {(showPhoneticSub || celebrationActive) && (
          <text
            x={shortsAspect ? 78 : 82}
            y="26"
            textAnchor="middle"
            dominantBaseline="central"
            fontSize={beatPhoneticSub.length > 28 ? 10.2 : beatPhoneticSub.length > 22 ? 11.5 : 13}
            fontWeight="800"
            fill={isBeat4 && !celebrationActive ? '#E11D48' : '#475569'}
          >
            {celebrationActive
              ? globalAudienceMode
                ? 'Free App Below 👇'
                : '고정댓글 앱 연습 👇'
              : beatPhoneticSub}
          </text>
        )}
      </g>

      {/* 4. Mid-Lower Main Stage Actor: Rotating Song Comedy Actor in both Call & Response */}
      {role === 'call' ? (
        <g transform={`translate(500, ${actorY}) scale(${shortsAspect ? 0.88 : 0.94}) translate(-500, -316)`}>
          <ChantCallEpisodeActor
            sceneKey={item.sceneKey}
            comedySetId={comedySetId}
            itemColor={item.color}
            beatInBar={beatInBar}
            beatProgress={beatProgress}
            animClock={animClock}
          />
        </g>
      ) : (
        <g transform={`translate(500, ${actorY})`}>
          <ChantComedyActorSwitch
            setId={comedySetId}
            beatInBar={beatInBar}
            beatProgress={beatProgress}
            animClock={animClock}
            scale={shortsAspect ? 1.24 : 1.28}
            color={item.color}
            showClapBurst
          />
          {beatInBar === 3 && (
            <g transform="translate(-128, -18)">
              <ComicImpactBurstSvg scale={0.95} fill="#FDE047" stroke="#E11D48" />
            </g>
          )}
        </g>
      )}

      {/* 5. Unboxed Groove Companion: 16:9 Call mode only (Zero corner clutter in 9:16 Shorts or Response) */}
      {!shortsAspect && role === 'call' && (
        <g transform={`translate(${miniDancerX}, 306) scale(${miniDancerScale})`}>
          <ChantComedyActorSwitch
            setId={comedySetId}
            beatInBar={beatInBar}
            beatProgress={beatProgress}
            animClock={animClock}
            scale={0.62}
            color={item.color}
            showClapBurst
          />
        </g>
      )}

      {/* 6. 4-Beat Karaoke Indicator Strip (y=388..436 — ample bottom clearance inside 0..460) */}
      <g transform="translate(500, 412)">
        <rect
          x={-stripWidth / 2}
          y="-24"
          width={stripWidth}
          height="48"
          rx="15"
          fill="#0F172A"
          fillOpacity="0.92"
          stroke="#334155"
          strokeWidth="2"
        />
        {[
          { idx: 0, label: `1 · ${phrase.beats[0]}` },
          { idx: 1, label: `2 · ${phrase.beats[1]}` },
          { idx: 2, label: `3 · ${phrase.beats[2]}` },
          { idx: 3, label: '4 · 👏 짝!' },
        ].map((slot) => {
          const xCenter = (slot.idx - 1.5) * slotStep;
          const active = beatInBar === slot.idx;
          const slotFill = active
            ? slot.idx === 3
              ? '#FACC15'
              : role === 'call'
              ? '#38BDF8'
              : '#FB7185'
            : '#1E293B';
          const textColor = active ? '#0F172A' : '#94A3B8';

          return (
            <g key={slot.idx} transform={`translate(${xCenter}, 0)`}>
              <rect
                x={-slotWidth / 2}
                y="-17"
                width={slotWidth}
                height="34"
                rx="10"
                fill={slotFill}
                stroke={active ? '#FFFFFF' : '#475569'}
                strokeWidth={active ? 2.5 : 1.2}
              />
              <text
                x="0"
                y="0"
                textAnchor="middle"
                dominantBaseline="central"
                fontSize={
                  slot.label.length >= 10
                    ? 9.2
                    : slot.label.length >= 8
                    ? 10.4
                    : slot.label.length > 7
                    ? 11.5
                    : 13.5
                }
                fontWeight="900"
                fill={textColor}
              >
                {slot.label}
              </text>
            </g>
          );
        })}
      </g>
    </svg>
  );
};
