import React from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playBatchimSfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES5_MEANINGS: Record<BatchimKey, string> = {
  'ㄱ': 'Watermelon',
  'ㄴ': 'Snow',
  'ㄷ': 'Spoon',
  'ㄹ': 'Sword',
  'ㅁ': 'Bear',
  'ㅂ': 'Shovel',
  'ㅇ': 'Ball',
};
import {
  JollamanCharacterSvg,
  JollamanFaceMode,
  ComicImpactBurstSvg,
  DizzyStarOrbitSvg,
} from './JollamanSprites';
import {
  BatchimKey,
  BatchimBackdrop,
  GiantWatermelonWholeSvg,
  WatermelonHelmetSvg,
  SnowCoveredWatermelonBallSvg,
  SnowAvalancheMoundSvg,
  GiantSteelSpoonSvg,
  SteamingSoupBowlSvg,
  SteamingSoupBowlFrontSvg,
  GiantSlashBladeSvg,
  SwordSlashArcSvg,
  BigShakingBearSvg,
  GiantDiggingShovelSvg,
  DirtMoundSourceSvg,
  FlyingDirtClodsSvg,
  DirtPitHoleSvg,
  ShovelDiggingJollamanSvg,
  SmallWatermelonFlowerSvg,
  BowlingPinSvg,
  GiantBowlingBallSvg,
} from './JollamanSprites5';

const BATCHIM_FINAL_ROMAN: Record<BatchimKey, string> = {
  'ㄱ': 'k',
  'ㄴ': 'n',
  'ㄷ': 't',
  'ㄹ': 'l',
  'ㅁ': 'm',
  'ㅂ': 'p',
  'ㅇ': 'ng',
};

const BATCHIM_SPEAK_TEXT: Record<BatchimKey, string> = {
  'ㄱ': '받침 기역, 윽, 수박!',
  'ㄴ': '받침 니은, 은, 눈!',
  'ㄷ': '받침 디귿, 읃, 숟가락!',
  'ㄹ': '받침 리을, 을, 칼!',
  'ㅁ': '받침 미음, 음, 곰!',
  'ㅂ': '받침 비읍, 읍, 삽!',
  'ㅇ': '받침 이응, 응, 공!',
};

export interface BatchimItem {
  char: BatchimKey;
  soundLabel: string;
  triggerWord: string;
  sampleSyllable: string;
  gagSummary: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const BATCHIM_ITEMS: BatchimItem[] = [
  {
    char: 'ㄱ',
    soundLabel: '받침 ㄱ',
    triggerWord: '수박',
    sampleSyllable: '박',
    gagSummary: '수박밭에서 통통 두드리던 대왕 수박이 펑 터져 졸라맨 머리에 헬멧처럼 푹 씌워진다!!',
    color: '#16A34A',
    skyX: 110,
    skyY: 64,
  },
  {
    char: 'ㄴ',
    soundLabel: '받침 ㄴ',
    triggerWord: '눈',
    sampleSyllable: '눈',
    gagSummary: '작은 수박이 눈밭을 구르며 거대 눈덩이로 변신하더니 졸라맨을 삼켜 눈사람으로 만들어버린다!!',
    color: '#0284C7',
    skyX: 240,
    skyY: 82,
  },
  {
    char: 'ㄷ',
    soundLabel: '받침 ㄷ',
    triggerWord: '숟가락',
    sampleSyllable: '숟',
    gagSummary: '거대 쇠 숟가락 투석기에 튕겨 공중 3회전 뒤 대왕 국그릇에 첨벙 빠져버린다!!',
    color: '#6366F1',
    skyX: 370,
    skyY: 60,
  },
  {
    char: 'ㄹ',
    soundLabel: '받침 ㄹ',
    triggerWord: '칼',
    sampleSyllable: '칼',
    gagSummary: '칼로 수박을 자르려다 오히려 칼에게 공격당해 쓰러지고, 수박만 멀쩡히 남는다!!',
    color: '#EAB308',
    skyX: 500,
    skyY: 84,
  },
  {
    char: 'ㅁ',
    soundLabel: '받침 ㅁ',
    triggerWord: '곰',
    sampleSyllable: '곰',
    gagSummary: '곰이 두 손으로 수박을 굴리며 돌진해 사라지자 졸라맨이 쿵 부딪혀 하늘로 날아올랐다 떨어지고 만다!!',
    color: '#B45309',
    skyX: 630,
    skyY: 62,
  },
  {
    char: 'ㅂ',
    soundLabel: '받침 ㅂ',
    triggerWord: '삽',
    sampleSyllable: '삽',
    gagSummary: '수박을 파묻으려고 땅을 파다 오히려 졸라맨이 자기 구덩이에 파묻히고 수박만 멀쩡하다!!',
    color: '#EC4899',
    skyX: 760,
    skyY: 82,
  },
  {
    char: 'ㅇ',
    soundLabel: '받침 ㅇ',
    triggerWord: '공',
    sampleSyllable: '공',
    gagSummary: '스트라이크를 날린 볼링공에 은은한 초록 줄무늬가... 혹시 수박인가?!',
    color: '#EF4444',
    skyX: 890,
    skyY: 64,
  },
];

interface JollamanBatchimSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 320;
const GROUND_Y = 368;

const getActionDuration = (char: BatchimKey): number => {
  switch (char) {
    case 'ㄱ':
      return 2.35;
    case 'ㄴ':
      return 2.65;
    case 'ㄷ':
      return 2.5;
    case 'ㄹ':
      return 2.65;
    case 'ㅁ':
      return 2.55;
    case 'ㅂ':
      return 2.95;
    case 'ㅇ':
      return 2.45;
  }
};

export const JollamanBatchimSimulation: React.FC<JollamanBatchimSimulationProps> = ({
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
  } = useJollamanStageEngine<BatchimItem, BatchimKey>({
    seriesNum: 5,
    seriesTitle: '5. 졸라받침맨 1 (7대 대표음)',
    items: BATCHIM_ITEMS,
    audioEnabled,
    bgmTrack: 'carol',
    initialWalkX: 150,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    scrollSpeedOnApproach: 360,
    aftermathAnimMaxDur: 1.25,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.sampleSyllable} · ${item.triggerWord}`,
    getBadge: (item) => item.soundLabel,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) => BATCHIM_SPEAK_TEXT[item.char],
    getActionDuration: (item) => getActionDuration(item.char),
    onStartAction: (item, audioOn) => {
      if (audioOn) {
        playBatchimSfx(item.char, 'setup');
      }
    },
    onActionProgress: (
      item,
      t,
      { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }
    ) => {
      const impactAt: Record<BatchimKey, number> = {
        'ㄱ': 0.28,
        'ㄴ': 0.72,
        'ㄷ': 0.34,
        'ㄹ': 0.36,
        'ㅁ': 0.36,
        'ㅂ': 0.56,
        'ㅇ': 0.48,
      };
      if (t >= impactAt[item.char] && !impactTriggered) {
        markImpact();
        if (audioOn) {
          playBatchimSfx(item.char, 'impact');
          if (item.char === 'ㄱ' || item.char === 'ㄷ' || item.char === 'ㅁ' || item.char === 'ㅇ' || item.char === 'ㄴ' || item.char === 'ㄹ' || item.char === 'ㅂ') {
            playCartoonImpact();
          }
        }
      }

      // Secondary comic beats (snowball swallow / soup splash / sword rebound onto Jollaman / bear crash / melon thud onto pit)
      if (item.char === 'ㄴ' && t >= 0.42 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      } else if (item.char === 'ㄷ' && t >= 0.86 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      } else if (item.char === 'ㄹ' && t >= 0.54 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      } else if (item.char === 'ㅁ' && t >= 0.78 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonImpact();
      } else if (item.char === 'ㅂ' && t >= 0.72 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) playCartoonSplat();
      }
    },
    onAftermathStart: () => {
      // Impacts already aligned inside action beats
    },
  });

  const activeChar = selectedItem.char;

  // Determine when stickman legs/arms are actively running/stumbling
  const isWatermelonStumble =
    activeChar === 'ㄱ' &&
    ((phase === 'action' && anim.actionT >= 0.56) || phase === 'aftermath' || phase === 'reveal');
  const isSnowSprint = activeChar === 'ㄴ' && phase === 'action' && anim.actionT < 0.42;
  const isBearFlee = activeChar === 'ㅁ' && phase === 'action' && anim.actionT >= 0.16 && anim.actionT < 0.36;
  const isWalkingMotion =
    phase === 'walking' ||
    phase === 'approaching' ||
    isWatermelonStumble ||
    isSnowSprint ||
    isBearFlee;

  const cycleRate =
    isSnowSprint || isBearFlee
      ? walkCycle * 1.85
      : isWatermelonStumble
      ? walkCycle * 0.85
      : walkCycle;
  const legSwing = isWalkingMotion ? Math.sin(cycleRate) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(cycleRate + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(cycleRate)) * 4 : 0;

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
  let wearingWatermelonHelmet = false;

  if (phase === 'walking' || phase === 'approaching') {
    jollaFaceMode = 'happy';
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㄱ': {
        if (t < 0.28) {
          // Tapping watermelon happily, then panics as cracks appear!
          jollaFaceMode = t >= 0.16 ? 'panic' : 'happy';
          jollaX = ACTION_SPOT_X + Math.sin(t * 28) * 3;
        } else if (t < 0.56) {
          // Explodes upward into a surprised hop while helmet drops over head!
          const flyT = (t - 0.28) / 0.28;
          jollaFaceMode = 'panic';
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 84;
          jollaRot = -180 * Math.sin(flyT * Math.PI);
          wearingWatermelonHelmet = flyT > 0.58;
        } else {
          // Blind stumbling on the picnic mat!
          jollaFaceMode = 'dizzy';
          wearingWatermelonHelmet = true;
          jollaX = ACTION_SPOT_X + Math.sin(anim.walkTime * 5.2) * 26;
          jollaRot = Math.sin(anim.walkTime * 6) * 8;
        }
        break;
      }
      case 'ㄴ': {
        if (t < 0.42) {
          // Spots rolling watermelon turning into avalanche snowball & sprints left!
          jollaFacing = -1;
          jollaFaceMode = t > 0.08 ? 'panic' : 'happy';
          jollaX = ACTION_SPOT_X - Math.max(0, t - 0.08) * 415;
        } else if (t < 0.72) {
          // Swallowed inside the rolling snowball!
          jollaVisible = false;
          jollaX = 240 - ((t - 0.42) / 0.30) * 85;
        } else {
          // Buried inside snowman mound (eyes blink inside SnowAvalancheMoundSvg)
          jollaVisible = false;
          jollaX = 155;
        }
        break;
      }
      case 'ㄷ': {
        if (t < 0.34) {
          // Standing on spoon bowl!
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 68;
          jollaFaceMode = t >= 0.16 ? 'panic' : 'happy';
        } else if (t < 0.86) {
          // Catapulted high doing 3 somersaults into giant soup bowl!
          const flyT = (t - 0.34) / 0.52;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - flyT * (ACTION_SPOT_X - 145);
          jollaY = GROUND_Y - 68 - Math.sin(flyT * Math.PI) * 185 + flyT * 12;
          jollaRot = -1080 * flyT;
        } else {
          // Splashed inside soup bowl (clipped & raised so feet never pierce pot bottom!)
          jollaFaceMode = 'dizzy';
          jollaX = 145;
          jollaY = GROUND_Y - 56 + Math.sin(anim.walkTime * 6) * 2.5;
          jollaRot = Math.sin(anim.walkTime * 5) * 5;
        }
        break;
      }
      case 'ㄹ': {
        if (t < 0.24) {
          // Winds up sword high to chop watermelon!
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 4;
        } else if (t < 0.38) {
          // Lunges forward & strikes the tough watermelon!
          const strikeT = (t - 0.24) / 0.14;
          jollaFaceMode = 'happy';
          jollaX = ACTION_SPOT_X - 4 + strikeT * 14;
          jollaRot = strikeT * 12;
        } else if (t < 0.58) {
          // Sword BOINGS off the watermelon & whips backward right at Jollaman!
          const recoilT = (t - 0.38) / 0.20;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 10 - recoilT * 28;
          jollaY = GROUND_Y - 52 - Math.sin(recoilT * Math.PI) * 18;
          jollaRot = 12 - recoilT * 28;
        } else if (t < 0.72) {
          // Topples flat onto the ground while watermelon stays unscathed!
          const fallT = (t - 0.58) / 0.14;
          jollaFaceMode = 'dizzy';
          jollaX = ACTION_SPOT_X - 18 - fallT * 10;
          jollaY = GROUND_Y - 52 + fallT * 34;
          jollaRot = -16 - fallT * 70;
        } else {
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X - 28;
          jollaY = GROUND_Y - 18;
          jollaRot = -86;
        }
        break;
      }
      case 'ㅁ': {
        if (t < 0.36) {
          // Spots bear rolling giant watermelon from right!
          jollaFaceMode = t >= 0.16 ? 'panic' : 'happy';
          jollaX = ACTION_SPOT_X;
        } else if (t < 0.78) {
          // BAM! Launched spinning high into the sky & falls back down!
          const flyT = (t - 0.36) / 0.42;
          jollaFaceMode = flyT > 0.65 ? 'dizzy' : 'panic';
          jollaX = ACTION_SPOT_X - flyT * 26;
          jollaY = GROUND_Y - 52 - Math.sin(flyT * Math.PI) * 188 + flyT * 26;
          jollaRot = -720 * flyT;
        } else {
          // Landed dizzy with bump while bear & watermelon rolled away left!
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X - 26;
          jollaY = GROUND_Y - 22;
          jollaRot = -82;
        }
        break;
      }
      case 'ㅂ': {
        const pitX = ACTION_SPOT_X + 46;
        if (t < 0.46) {
          // Two-handed leaning ShovelDiggingJollamanSvg handles pose & shovel cleanly!
          jollaVisible = false;
          jollaFacing = 1;
          jollaX = ACTION_SPOT_X + 6;
          jollaY = GROUND_Y - 52;
        } else if (t < 0.54) {
          // Brief breath wipe while watermelon behind starts wobbling down the sunken slope
          jollaVisible = false;
          jollaFacing = 1;
          jollaX = ACTION_SPOT_X + 6;
          jollaY = GROUND_Y - 52;
        } else if (t < 0.68) {
          // Bumped from behind by rolling watermelon & tumbles into the shallow sunken pit!
          const fallT = (t - 0.54) / 0.14;
          jollaFacing = 1;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + 8 + fallT * (pitX - (ACTION_SPOT_X + 8));
          jollaY = GROUND_Y - 48 - Math.sin(fallT * Math.PI) * 24 + fallT * 62;
          jollaRot = fallT * 130;
        } else {
          // Trapped beneath the fallen watermelon!
          jollaVisible = false;
          jollaX = pitX;
          jollaY = GROUND_Y + 12;
        }
        break;
      }
      case 'ㅇ': {
        if (t < 0.48) {
          // Confident bowler pose -> panics & jumps as S-curving ball rushes in!
          jollaFaceMode = t >= 0.18 ? 'panic' : 'happy';
          const hop = t >= 0.24 ? Math.abs(Math.sin((t - 0.24) * 18)) * 22 : 0;
          jollaY = GROUND_Y - 52 - hop;
        } else {
          // Blasted high doing somersaults to left gutter!
          const flyT = Math.min((t - 0.48) / 0.52, 1);
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X - flyT * 185;
          jollaY = GROUND_Y - 58 - Math.sin(flyT * Math.PI) * 145 + flyT * 28;
          jollaRot = -900 * flyT;
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㄱ':
        jollaFaceMode = 'dizzy';
        wearingWatermelonHelmet = true;
        jollaX = ACTION_SPOT_X + Math.sin(anim.walkTime * 5.2) * 22;
        jollaRot = Math.sin(anim.walkTime * 6) * 7;
        break;
      case 'ㄴ':
        jollaVisible = false;
        jollaX = 155;
        break;
      case 'ㄷ':
        jollaFaceMode = 'dizzy';
        jollaX = 145;
        jollaY = GROUND_Y - 56 + Math.sin(anim.walkTime * 6) * 2.5;
        jollaRot = Math.sin(anim.walkTime * 5) * 5;
        break;
      case 'ㄹ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X - 28;
        jollaY = GROUND_Y - 18;
        jollaRot = -86;
        break;
      case 'ㅁ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X - 26;
        jollaY = GROUND_Y - 22;
        jollaRot = -82;
        break;
      case 'ㅂ':
        jollaVisible = false;
        jollaX = ACTION_SPOT_X + 46;
        jollaY = GROUND_Y + 34;
        break;
      case 'ㅇ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        jollaX = ACTION_SPOT_X - 185;
        jollaY = GROUND_Y - 30;
        jollaRot = -78;
        break;
    }
  }

  const revealSubtitle = tRevealSubtitle(5, selectedItem.char, selectedItem.gagSummary);
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  return (
    <JollamanStageShell
      icon="🎯"
      title="5. 졸라받침맨 1 (7대 대표음)"
      accentButtonClass="bg-sky-600 hover:bg-sky-700"
      stageBgClass="bg-sky-100"
      ariaLabel="졸라맨 5 받침 7대 대표음 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'carol',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((prev) => !prev),
        activeClass: 'bg-sky-50 text-sky-800 border-sky-200 hover:bg-sky-100',
        activeLabel: '🎵 레트로 BGM',
        title: '레트로 코믹 배경음악 켜기/끄기',
      }}
      items={BATCHIM_ITEMS}
      selectedItem={selectedItem}
      learnedKeys={learnedChars}
      getKey={(item) => item.char}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      getTokenText={(item) => item.char}
      getTabLabel={(item) => `받침${item.char}`}
      tabGroups={[
        {
          prefixLabel: '대표받침',
          keys: ['ㄱ', 'ㄴ', 'ㄷ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅇ'],
        },
      ]}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={540}
      walkingHint="하늘의 받침 (ㄱ ~ ㅇ)을 눌러보세요!"
      activeCaption={`${selectedItem.sampleSyllable} (${selectedItem.soundLabel}) · ${selectedItem.triggerWord}`}
      revealAriaLabel={`${selectedItem.soundLabel}, ${selectedItem.triggerWord} 학습 화면`}
      revealGlyph={selectedItem.char}
      revealHeadline={
        <span className="inline-flex flex-wrap items-baseline justify-center text-center">
          <span className="mr-2.5">받침</span>
          <span style={{ color: selectedItem.color }} className="mr-3.5 sm:mr-4">
            {selectedItem.char},
          </span>
          <span>{selectedItem.triggerWord}</span>
        </span>
      }
      revealSubtitle={revealSubtitle}
      flashcard={(() => {
        const word = selectedItem.triggerWord;
        const targetChar = selectedItem.sampleSyllable;
        return {
          glyph: selectedItem.char,
          subLabel: `${selectedItem.soundLabel} [${BATCHIM_FINAL_ROMAN[selectedItem.char]}]`,
          accentColor: selectedItem.color,
          headlineNode: (
            <>
              {word.split('').map((ch, idx) => (
                <span key={idx} style={ch === targetChar ? { color: selectedItem.color } : undefined}>
                  {ch}
                </span>
              ))}
            </>
          ),
          headlineCharLen: word.length,
          meaning: tWordMeaning(5, selectedItem.char, SERIES5_MEANINGS[selectedItem.char]),
          romanization: romanizeKorean(word),
          cornerIcon: getSeriesCornerIcon(5, selectedItem.char, anim.walkTime),
        };
      })()}
      backdropSlot={
        <BatchimBackdrop
          activeChar={phase === 'walking' ? BATCHIM_ITEMS[0].char : activeChar}
          isWalkingMode={false}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >
      {/* 3. BACKGROUND / MIDGROUND SCENARIO PROPS */}
      {phase !== 'walking' && (
        <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.2) : 1}>
          {/* ㄱ (수박): Whole giant watermelon on picnic mat -> explodes sending flying slices & black seeds! */}
          {activeChar === 'ㄱ' && (() => {
            const exploded =
              phase === 'aftermath' ||
              phase === 'reveal' ||
              (phase === 'action' && anim.actionT >= 0.28);
            const cracking = phase === 'action' && anim.actionT >= 0.14 && anim.actionT < 0.28;
            const burstT =
              phase === 'action' && anim.actionT >= 0.28
                ? Math.min((anim.actionT - 0.28) / 0.35, 1)
                : 1;

            return (
              <g>
                {!exploded && (
                  <g transform={`translate(${ACTION_SPOT_X + 68}, ${GROUND_Y - 30})`}>
                    <GiantWatermelonWholeSvg cracking={cracking} walkTime={anim.walkTime} />
                    {phase === 'action' && !cracking && (
                      <g transform="translate(-38, -38)">
                        <text x="0" y="0" textAnchor="middle" fontSize="18" fontWeight="900" fill="#15803D" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                          통통!
                        </text>
                        <text x="0" y="15" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#166534" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                          Tap! Tap!
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {exploded && phase === 'action' && burstT < 1 && (
                  <g>
                    {[
                      { dx: -110, dy: -120, rot: -45 },
                      { dx: 120, dy: -135, rot: 40 },
                      { dx: 75, dy: -75, rot: 110 },
                    ].map((s, idx) => (
                      <g
                        key={idx}
                        transform={`translate(${ACTION_SPOT_X + 45 + s.dx * burstT}, ${
                          GROUND_Y - 40 + s.dy * Math.sin(burstT * Math.PI)
                        }) rotate(${s.rot * burstT})`}
                      >
                        <path d="M-18 0 A18 18 0 0 0 18 0 Z" fill="#EF4444" stroke="#16A34A" strokeWidth="4" />
                        <circle cx="-5" cy="6" r="1.8" fill="#0F172A" />
                        <circle cx="5" cy="7" r="1.8" fill="#0F172A" />
                      </g>
                    ))}
                  </g>
                )}

                {wearingWatermelonHelmet && (
                  <g transform={`translate(${jollaX + 26 + ((anim.walkTime * 55) % 24)}, ${jollaY - 24})`}>
                    <path d="M0 -8 Q5 0 0 6 Q-5 0 0 -8 Z" fill="#EF4444" stroke="#B91C1C" strokeWidth="1.5" />
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㄴ (눈): Small round Watermelon rolls ON THE SLOPE, gets covered in white snow, grows into Giant Snowball -> Snowman! */}
          {activeChar === 'ㄴ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const swallowed = t >= 0.42 && t < 0.72;
            const buried = phase === 'aftermath' || phase === 'reveal' || t >= 0.72;

            if (buried) {
              return (
                <g>
                  <g transform={`translate(155, ${GROUND_Y - 4})`}>
                    <SnowAvalancheMoundSvg walkTime={anim.walkTime} />
                  </g>
                </g>
              );
            }

            // Exact Quadratic Bezier points matching BatchimBackdrop slope: M560 352 Q760 295 1000 135
            const getSlopePoint = (u: number) => {
              const inv = 1 - u;
              return {
                x: inv * inv * 560 + 2 * inv * u * 760 + u * u * 1000,
                y: inv * inv * 352 + 2 * inv * u * 295 + u * u * 135,
              };
            };

            let sx = 952;
            let sy = 152;
            let scale = 0.34;
            let rotDeg = 0;
            let snowCover = 0;

            if (phase === 'approaching') {
              const pt = getSlopePoint(0.92 - anim.objectAppear * 0.04);
              scale = 0.34;
              sx = pt.x;
              sy = pt.y - 40 * scale;
              rotDeg = -anim.objectAppear * 120;
              snowCover = 0;
            } else if (phase === 'action') {
              if (t < 0.28) {
                // Rolling straight DOWN the snowy slope! Accumulating white snow as it grows!
                const slopeP = t / 0.28;
                const u = 0.88 * (1 - slopeP);
                const pt = getSlopePoint(u);
                scale = 0.34 + slopeP * 0.48; // 0.34 -> 0.82
                snowCover = Math.min(1, slopeP * 1.12);
                const radius = (40 + snowCover * 14) * scale;
                sx = pt.x;
                sy = pt.y - radius;
                rotDeg = -slopeP * 680;
              } else if (t < 0.42) {
                // Rolling along flat snowy ground (560 -> 240) as giant snowball!
                const flatP = (t - 0.28) / 0.14;
                scale = 0.82 + flatP * 0.30; // 0.82 -> 1.12
                snowCover = 1;
                const radius = 54 * scale;
                const floorY = 352 + flatP * (GROUND_Y - 352);
                sx = 560 - flatP * (560 - 240);
                sy = floorY - radius;
                rotDeg = -680 - flatP * 380;
              } else {
                // Swallows Jollaman & rolls to resting snowbank spot (240 -> 155)
                const st = (t - 0.42) / 0.30;
                scale = 1.12 + st * 0.12;
                snowCover = 1;
                sx = 240 - st * 85;
                sy = GROUND_Y - 54 * scale;
                rotDeg = -1060 - st * 480;
              }
            }

            return (
              <g>
                {/* Ground contact shadow directly beneath rolling ball */}
                <ellipse
                  cx={sx}
                  cy={sy + (40 + snowCover * 14) * scale + 2}
                  rx={(36 + snowCover * 12) * scale}
                  ry={6 * scale}
                  fill="#0F172A"
                  opacity="0.18"
                />
                <g transform={`translate(${sx}, ${sy}) scale(${scale})`}>
                  <SnowCoveredWatermelonBallSvg
                    rotationDeg={rotDeg}
                    snowCover={snowCover}
                    swallowedJolla={swallowed}
                  />
                </g>
                {phase === 'action' && t < 0.40 && (
                  <g transform={`translate(${sx}, ${sy - 54 * scale - 16})`}>
                    <text x="0" y="0" textAnchor="middle" fontSize="18" fontWeight="900" fill="#0284C7" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      데구르르!
                    </text>
                    <text x="0" y="14" textAnchor="middle" fontSize="11" fontWeight="900" fill="#0369A1" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Roll! Roll!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㄷ (숟가락): Giant Steel Spoon Catapult + Giant Steaming Soup Bowl! */}
          {activeChar === 'ㄷ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const catapulted = phase === 'aftermath' || phase === 'reveal' || t >= 0.34;
            const splashing =
              phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && t >= 0.86);

            let spoonTilt = -8;
            if (phase === 'action') {
              if (t < 0.34) {
                spoonTilt = -8;
              } else if (t < 0.56) {
                const st = (t - 0.34) / 0.22;
                spoonTilt = -8 + 46 * Math.sin(st * Math.PI * 0.5);
              } else {
                spoonTilt = 32;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              spoonTilt = 32;
            }

            // Counterweight mini-watermelon drops onto spoon handle!
            let weightY = -60;
            if (phase === 'action') {
              if (t < 0.18) {
                weightY = -60;
              } else if (t < 0.34) {
                const dt = (t - 0.18) / 0.16;
                weightY = 60 + dt * dt * (GROUND_Y - 46 - 60);
              } else {
                weightY = GROUND_Y - 44;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              weightY = GROUND_Y - 44;
            }

            return (
              <g>
                {/* Fulcrum triangle under spoon */}
                <polygon
                  points={`${ACTION_SPOT_X + 46},${GROUND_Y} ${ACTION_SPOT_X + 66},${GROUND_Y - 22} ${
                    ACTION_SPOT_X + 86
                  },${GROUND_Y}`}
                  fill="#B45309"
                  stroke="#78350F"
                  strokeWidth="3"
                />
                {/* Spoon pivoting around fulcrum (local x=66) */}
                <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 24}) rotate(${spoonTilt}, 66, 0)`}>
                  <GiantSteelSpoonSvg />
                </g>
                {/* Mini Watermelon Counterweight */}
                {weightY > -40 && (
                  <g transform={`translate(${ACTION_SPOT_X + 148}, ${weightY}) scale(0.45)`}>
                    <GiantWatermelonWholeSvg walkTime={anim.walkTime} />
                  </g>
                )}
                {/* Giant Soup Bowl on Left (back wall & broth) */}
                <g transform={`translate(145, ${GROUND_Y - 30})`}>
                  <SteamingSoupBowlSvg walkTime={anim.walkTime} splashing={splashing} />
                </g>
                {catapulted && !splashing && (
                  <g transform={`translate(${ACTION_SPOT_X + 10}, ${GROUND_Y - 126})`}>
                    <text x="0" y="0" textAnchor="middle" fontSize="22" fontWeight="900" fill="#4F46E5" stroke="#FFFFFF" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      슝~!!
                    </text>
                    <text x="0" y="16" textAnchor="middle" fontSize="12" fontWeight="900" fill="#312E81" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Whoosh!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㄹ (칼): Jollaman chops Watermelon -> Sword BOINGS off tough rind & attacks Jollaman! */}
          {activeChar === 'ㄹ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const winding = phase === 'action' && t < 0.24;
            const melonBoing = phase === 'action' && t >= 0.34 && t < 0.48;
            const reboundAttack = phase === 'action' && t >= 0.42 && t < 0.62;
            const fellDown = phase === 'aftermath' || phase === 'reveal' || t >= 0.72;

            let sx = ACTION_SPOT_X + 24;
            let sy = GROUND_Y - 96;
            let srot = 22;

            if (phase === 'approaching') {
              sx = ACTION_SPOT_X + 16;
              sy = GROUND_Y - 94;
              srot = 28;
            } else if (phase === 'action') {
              if (t < 0.24) {
                // High wind-up!
                const windT = t / 0.24;
                sx = ACTION_SPOT_X + 14 - windT * 8;
                sy = GROUND_Y - 94 - windT * 42;
                srot = 22 - windT * 42;
              } else if (t < 0.37) {
                // Swings blade RIGHT onto top of watermelon!
                const chopT = (t - 0.24) / 0.13;
                sx = ACTION_SPOT_X + 6 + chopT * 74;
                sy = GROUND_Y - 136 + chopT * 62;
                srot = -20 + chopT * 145;
              } else if (t < 0.58) {
                // BOING! Ricochets backward off watermelon straight into Jollaman!
                const recT = (t - 0.37) / 0.21;
                sx = ACTION_SPOT_X + 80 - recT * 112;
                sy = GROUND_Y - 74 - Math.sin(recT * Math.PI) * 58 + recT * 16;
                srot = 125 - recT * 290;
              } else if (t < 0.72) {
                const plantT = (t - 0.58) / 0.14;
                sx = ACTION_SPOT_X - 32 + plantT * 68;
                sy = GROUND_Y - 58 - Math.sin(plantT * Math.PI) * 48 + plantT * 39;
                srot = -165 + plantT * 361;
              } else {
                sx = ACTION_SPOT_X + 36;
                sy = GROUND_Y - 19;
                srot = 196;
              }
            } else {
              sx = ACTION_SPOT_X + 36;
              sy = GROUND_Y - 19;
              srot = 196;
            }

            const melonSquash =
              melonBoing ? Math.sin(((t - 0.34) / 0.14) * Math.PI) : 0;

            return (
              <g>
                {/* Intact Watermelon sitting right beside Jollaman (squashes slightly on BOING, completely unharmed!) */}
                <g transform={`translate(${ACTION_SPOT_X + 108}, ${GROUND_Y - 40})`}>
                  <GiantWatermelonWholeSvg
                    walkTime={anim.walkTime}
                    squashX={1 + melonSquash * 0.14}
                    squashY={1 - melonSquash * 0.12}
                  />
                </g>

                {/* Animated Sword */}
                <g transform={`translate(${sx}, ${sy}) rotate(${srot})`}>
                  <GiantSlashBladeSvg glintPhase={anim.walkTime} />
                </g>

                {winding && (
                  <g transform={`translate(${ACTION_SPOT_X + 18}, ${GROUND_Y - 165})`}>
                    <text x="0" y="0" textAnchor="middle" fontSize="20" fontWeight="900" fill="#FDE047" stroke="#0F172A" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      이얏!!
                    </text>
                    <text x="0" y="15" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#FEF9C3" stroke="#0F172A" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Slice Melon!
                    </text>
                  </g>
                )}

                {/* Watermelon Boing Impact Spark! */}
                {melonBoing && (
                  <g transform={`translate(${ACTION_SPOT_X + 106}, ${GROUND_Y - 82})`}>
                    <ComicImpactBurstSvg scale={0.78} />
                    <text x="0" y="-32" textAnchor="middle" fontSize="20" fontWeight="900" fill="#4ADE80" stroke="#0F172A" strokeWidth="3.2" style={{ paintOrder: 'stroke fill' }}>
                      팅!! 반동!!
                    </text>
                    <text x="0" y="-16" textAnchor="middle" fontSize="11" fontWeight="900" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.4" style={{ paintOrder: 'stroke fill' }}>
                      BOING!!
                    </text>
                  </g>
                )}

                {/* Sword Rebounds & Attacks Jollaman! */}
                {reboundAttack && (
                  <g transform={`translate(${ACTION_SPOT_X - 18}, ${GROUND_Y - 56})`}>
                    <SwordSlashArcSvg progress={(t - 0.42) / 0.20} />
                    <ComicImpactBurstSvg scale={1.08} />
                    <text x="0" y="-48" textAnchor="middle" fontSize="23" fontWeight="900" fill="#FEF08A" stroke="#0F172A" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      앗! 내 칼이!!
                    </text>
                    <text x="0" y="-30" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Betrayal!!
                    </text>
                  </g>
                )}

                {fellDown && (
                  <g transform={`translate(${ACTION_SPOT_X + 108}, ${GROUND_Y - 96})`}>
                    <text x="0" y="0" textAnchor="middle" fontSize="17" fontWeight="900" fill="#4ADE80" stroke="#0F172A" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                      수박 멀쩡!
                    </text>
                    <text x="0" y="14" textAnchor="middle" fontSize="11" fontWeight="900" fill="#DCFCE7" stroke="#0F172A" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Melon Safe!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅁ (곰): Bear rolls Round Giant Watermelon with both hands from Right to Left -> Rams Jollaman sky-high -> Disappears left! */}
          {activeChar === 'ㅁ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const collided = phase === 'action' && t >= 0.36;
            const crashBurst = phase === 'action' && t >= 0.36 && t < 0.58;

            let bx = 860;
            if (phase === 'approaching') {
              bx = 930 - anim.objectAppear * 110;
            } else if (phase === 'action') {
              if (t < 0.36) {
                bx = 820 - (t / 0.36) * (820 - (ACTION_SPOT_X + 94));
              } else if (t < 0.78) {
                const exitT = (t - 0.36) / 0.42;
                bx = ACTION_SPOT_X + 94 - exitT * (ACTION_SPOT_X + 290);
              } else {
                bx = -220;
              }
            } else {
              bx = -220;
            }

            const wx = bx - 84;
            const melonRot = phase === 'approaching' ? -anim.objectAppear * 140 : -t * 1800;

            return (
              <g>
                {bx > -190 && (
                  <g>
                    {/* Static unrotated ground shadow directly beneath the rolling round watermelon */}
                    <ellipse cx={wx} cy={GROUND_Y} rx="36" ry="7" fill="#0F172A" opacity="0.22" />
                    {/* Rolling Round Watermelon pushed ahead by Bear's paws */}
                    <g transform={`translate(${wx}, ${GROUND_Y - 40}) rotate(${melonRot})`}>
                      <GiantWatermelonWholeSvg walkTime={anim.walkTime} hideShadow />
                    </g>
                    {/* Bear pushing/rolling with both hands from right to left */}
                    <g transform={`translate(${bx}, ${GROUND_Y - 52})`}>
                      <BigShakingBearSvg walkTime={anim.walkTime} shaking={false} pose="roll" />
                    </g>
                    {phase === 'action' && !collided && (
                      <g transform={`translate(${wx}, ${GROUND_Y - 104})`}>
                        <text x="0" y="0" textAnchor="middle" fontSize="19" fontWeight="900" fill="#FDE047" stroke="#0F172A" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
                          데구르르!
                        </text>
                        <text x="0" y="14" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                          Rolling!
                        </text>
                      </g>
                    )}
                  </g>
                )}

                {crashBurst && (
                  <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 62})`}>
                    <ComicImpactBurstSvg scale={1.15} />
                    <text x="0" y="-44" textAnchor="middle" fontSize="24" fontWeight="900" fill="#FACC15" stroke="#0F172A" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      쿵!!
                    </text>
                    <text x="0" y="-26" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      BAM!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅂ (삽): Jollaman leans forward with BOTH hands on shovel digging sunken depression -> Watermelon rolls down slope from behind, knocks him in, drops THUD, & tiny flower blooms! */}
          {activeChar === 'ㅂ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const pitX = ACTION_SPOT_X + 46; // 366
            const melonRestX = ACTION_SPOT_X - 132; // 188 (clearly behind Jollaman!)
            const digging = phase === 'action' && t < 0.46;
            const clods = phase === 'action' && t >= 0.08 && t < 0.46;
            const flowerBloom =
              phase === 'aftermath' || phase === 'reveal'
                ? 1
                : t >= 0.78
                ? Math.min(1, (t - 0.78) / 0.16)
                : 0;

            const pitDepth = phase === 'approaching' ? 0.12 : digging ? Math.min(1, 0.15 + (t / 0.46) * 0.85) : 1;

            // Watermelon sits behind Jollaman -> rolls forward & DOWN the caving diagonal slope -> drops THUD into sunken crater!
            let wx = melonRestX;
            let wy = GROUND_Y - 40;
            let wrot = 0;
            let wSquashX = 1;
            let wSquashY = 1;
            let shadowY = GROUND_Y + 1;

            if (phase === 'action') {
              if (t < 0.48) {
                wx = melonRestX;
                wy = GROUND_Y - 40;
              } else if (t < 0.54) {
                // Slight wobble as ground slope tilts downward toward pit!
                wx = melonRestX + Math.sin((t - 0.48) * 90) * 4;
                wy = GROUND_Y - 39;
                wrot = Math.sin((t - 0.48) * 90) * 6;
              } else if (t < 0.65) {
                // Rolls down the diagonal sunken slope behind Jollaman!
                const rT = (t - 0.54) / 0.11;
                wx = melonRestX + rT * (ACTION_SPOT_X + 12 - melonRestX);
                const slopeDip = rT * 11;
                wy = GROUND_Y - 40 + slopeDip;
                shadowY = GROUND_Y + 1 + slopeDip;
                wrot = rT * 260;
              } else if (t < 0.74) {
                // Tumbles over pit edge and drops THUD right into the sunken crater!
                const dropT = (t - 0.65) / 0.09;
                wx = ACTION_SPOT_X + 12 + dropT * (pitX - (ACTION_SPOT_X + 12));
                wy = GROUND_Y - 29 - Math.sin(dropT * Math.PI) * 26 + dropT * 9;
                shadowY = GROUND_Y + 12 + dropT * 6;
                wrot = 260 + dropT * 100;
              } else {
                const settleT = Math.min(1, (t - 0.74) / 0.12);
                const bounce = Math.sin(settleT * Math.PI);
                wx = pitX;
                wy = GROUND_Y - 20 + bounce * 4;
                shadowY = GROUND_Y + 18;
                wrot = 0;
                wSquashX = 1 + bounce * 0.14;
                wSquashY = 1 - bounce * 0.12;
              }
            } else if (phase === 'aftermath' || phase === 'reveal') {
              wx = pitX;
              wy = GROUND_Y - 20;
              shadowY = GROUND_Y + 18;
              wrot = 0;
            }

            // Show standalone shovel only before digging starts or after tossed aside (during digging it's held by ShovelDiggingJollamanSvg)
            const showDetachedShovel = phase !== 'action' || t >= 0.54;
            let shX = ACTION_SPOT_X + 42;
            let shY = GROUND_Y - 22;
            let shRot = 18;

            if (phase === 'approaching') {
              shX = ACTION_SPOT_X + 42;
              shY = GROUND_Y - 22;
              shRot = 16;
            } else {
              shX = pitX + 76;
              shY = GROUND_Y - 14;
              shRot = 62;
            }

            return (
              <g>
                {/* Shallow sunken earth depression with diagonal downward slopes on both sides */}
                <g transform={`translate(${pitX}, ${GROUND_Y})`}>
                  <DirtPitHoleSvg depth={pitDepth} />
                </g>

                {/* Dug-up dirt mound accumulating on the right of pit */}
                <g transform={`translate(${pitX + 94}, ${GROUND_Y + 4}) scale(${0.45 + pitDepth * 0.42})`}>
                  <DirtMoundSourceSvg />
                </g>

                {/* Flying dirt clods arching out of pit while digging */}
                {clods && (
                  <g transform={`translate(${pitX - 24}, ${GROUND_Y})`}>
                    <FlyingDirtClodsSvg progress={((t - 0.08) * 6.2) % 1} />
                  </g>
                )}

                {/* Flying sweat drops while furiously digging! */}
                {digging && (
                  <g transform={`translate(${ACTION_SPOT_X + 18}, ${GROUND_Y - 94})`}>
                    {[0, 1, 2].map((idx) => {
                      const sp = ((t * 5.2 + idx * 0.33) % 1);
                      const dx = -16 - sp * 34 - idx * 6;
                      const dy = -8 - Math.sin(sp * Math.PI) * 26 + sp * 14;
                      return (
                        <path
                          key={idx}
                          d={`M${dx} ${dy} Q${dx - 4} ${dy + 6} ${dx} ${dy + 9} Q${dx + 4} ${dy + 6} ${dx} ${dy} Z`}
                          fill="#38BDF8"
                          stroke="#0284C7"
                          strokeWidth="1.2"
                        />
                      );
                    })}
                  </g>
                )}

                {/* Standalone Shovel (resting / tossed aside) */}
                {showDetachedShovel && (
                  <g transform={`translate(${shX}, ${shY}) rotate(${shRot}) scale(0.55)`}>
                    <GiantDiggingShovelSvg />
                  </g>
                )}

                {/* Watermelon sitting BEHIND Jollaman -> rolls down slope -> drops THUD into crater! */}
                <ellipse cx={wx} cy={shadowY} rx="34" ry="6.5" fill="#0F172A" opacity="0.22" />
                <g transform={`translate(${wx}, ${wy}) rotate(${wrot})`}>
                  <GiantWatermelonWholeSvg
                    walkTime={anim.walkTime}
                    hideShadow
                    squashX={wSquashX}
                    squashY={wSquashY}
                  />
                </g>

                {/* Cute tiny yellow watermelon flower blooming right on top of the watermelon! */}
                {flowerBloom > 0 && (
                  <g transform={`translate(${pitX + 10}, ${GROUND_Y - 64})`}>
                    <SmallWatermelonFlowerSvg bloom={flowerBloom} walkTime={anim.walkTime} />
                  </g>
                )}

                {digging && (
                  <g transform={`translate(${pitX - 10}, ${GROUND_Y - 144})`}>
                    <text x="0" y="0" textAnchor="middle" fontSize="21" fontWeight="900" fill="#B45309" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      영차영차!!
                    </text>
                    <text x="0" y="15" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#78350F" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      Dig! Dig!
                    </text>
                  </g>
                )}

                {phase === 'action' && t >= 0.72 && t < 0.84 && (
                  <g transform={`translate(${pitX}, ${GROUND_Y - 60})`}>
                    <ComicImpactBurstSvg scale={0.95} />
                    <text x="0" y="-36" textAnchor="middle" fontSize="22" fontWeight="900" fill="#DC2626" stroke="#FFFFFF" strokeWidth="3.5" style={{ paintOrder: 'stroke fill' }}>
                      푹!!
                    </text>
                    <text x="0" y="-20" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#991B1B" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
                      THUD!!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}

          {/* ㅇ (공): Bowling Pins + Subtly Green-Striped Bowling Ball STRIKE! -> "Wait... is that a watermelon?!" */}
          {activeChar === 'ㅇ' && (() => {
            const t = phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
            const struck = phase === 'aftermath' || phase === 'reveal' || t >= 0.48;
            const showMelonDoubt = phase === 'aftermath' || phase === 'reveal' || t >= 0.78;

            const pinOffsets = [
              { dx: -48, flyX: -120, flyY: -130, rot: -265 },
              { dx: -24, flyX: -60, flyY: -165, rot: 255 },
              { dx: 24, flyX: 65, flyY: -155, rot: -275 },
              { dx: 48, flyX: 135, flyY: -115, rot: 278 },
            ];

            let gx = 980;
            let gy = GROUND_Y - 46;
            let rotDeg = 0;

            if (phase === 'approaching') {
              gx = 980 - anim.objectAppear * 80;
            } else if (phase === 'action') {
              if (t < 0.48) {
                const approachT = t / 0.48;
                gx = 900 - approachT * (900 - ACTION_SPOT_X);
                gy = GROUND_Y - 46 + Math.sin(t * Math.PI * 5) * 14;
                rotDeg = -t * 1440;
              } else if (t < 0.82) {
                const slowT = (t - 0.48) / 0.34;
                const easeOut = 1 - Math.pow(1 - slowT, 2);
                gx = ACTION_SPOT_X - easeOut * 48;
                gy = GROUND_Y - 46 + Math.sin((1 - slowT) * Math.PI * 2) * 4;
                rotDeg = -0.48 * 1440 - easeOut * 160;
              } else {
                gx = ACTION_SPOT_X - 48;
                gy = GROUND_Y - 46;
                rotDeg = -0.48 * 1440 - 160;
              }
            } else {
              gx = ACTION_SPOT_X - 48;
              gy = GROUND_Y - 46;
              rotDeg = -0.48 * 1440 - 160;
            }

            const pinFlyT =
              phase === 'action' && t >= 0.48 ? Math.min((t - 0.48) / 0.52, 1) : 1;

            return (
              <g>
                {pinOffsets.map((pin, idx) => {
                  const px = ACTION_SPOT_X + pin.dx + (struck ? pin.flyX * pinFlyT : 0);
                  const py = GROUND_Y - 22 + (struck ? pin.flyY * Math.sin(pinFlyT * Math.PI) : 0);
                  const prot = struck ? pin.rot * pinFlyT : 0;
                  return (
                    <g key={idx} transform={`translate(${px}, ${py}) rotate(${prot})`}>
                      <BowlingPinSvg />
                    </g>
                  );
                })}
                <g transform={`translate(${gx}, ${gy})`}>
                  <GiantBowlingBallSvg rotationDeg={rotDeg} />
                </g>
                {struck && (
                  <g transform={`translate(${ACTION_SPOT_X + 18}, ${GROUND_Y - 154})`}>
                    <rect x="-76" y="-22" width="152" height="40" rx="12" fill="#0F172A" stroke="#FDE047" strokeWidth="3" />
                    <text x="0" y="6" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FDE047">
                      STRIKE!!
                    </text>
                  </g>
                )}
                {showMelonDoubt && (
                  <g transform={`translate(${gx + 115}, ${GROUND_Y - 102})`}>
                    <rect x="-86" y="-22" width="172" height="42" rx="12" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2.5" />
                    <text x="0" y="-2" textAnchor="middle" fontSize="14.5" fontWeight="900" fill="#15803D">
                      혹시.. 수박인가? 🤨
                    </text>
                    <text x="0" y="14" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#475569">
                      Wait.. Watermelon?!
                    </text>
                  </g>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* ClipPaths so ㄷ soup bowl and ㅂ burial mound NEVER let legs poke out underneath! */}
      <defs>
        <clipPath id="b5SoupInnerClip" clipPathUnits="userSpaceOnUse">
          <rect x="40" y="-80" width="210" height={GROUND_Y - 20 + 80} />
        </clipPath>
        <clipPath id="b5EarthFloorClip" clipPathUnits="userSpaceOnUse">
          <rect x="0" y="-80" width="1000" height={GROUND_Y + 18 + 80} />
        </clipPath>
      </defs>

      {/* 4. JOLLAMAN STICK FIGURE */}
      {activeChar === 'ㅂ' && phase === 'action' && anim.actionT < 0.54 && (
        <g
          transform={`translate(${ACTION_SPOT_X + 6}, ${GROUND_Y - 52})`}
          onClick={toggleJollaPause}
          className="cursor-pointer"
        >
          <rect x="-32" y="-76" width="84" height="132" fill="transparent" />
          <ellipse cx="0" cy="50" rx="20" ry="5" fill="#1E293B" opacity="0.22" />
          <ShovelDiggingJollamanSvg
            walkTime={anim.walkTime}
            t={anim.actionT}
            mode={anim.actionT < 0.46 ? 'dig' : 'wipe'}
          />
        </g>
      )}
      {jollaVisible && (() => {
        const isInSoupBowl =
          activeChar === 'ㄷ' &&
          (phase === 'aftermath' || phase === 'reveal' || (phase === 'action' && anim.actionT >= 0.86));
        const isInDirtPit =
          activeChar === 'ㅂ' &&
          phase === 'action' &&
          anim.actionT >= 0.54;

        return (
          <g clipPath={isInSoupBowl ? 'url(#b5SoupInnerClip)' : isInDirtPit ? 'url(#b5EarthFloorClip)' : undefined}>
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${
                jollaFacing * jollaScaleX
              }, ${jollaScaleY})`}
              onClick={toggleJollaPause}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 && jollaScaleY > 0.5 && activeChar !== 'ㄷ' && !isInDirtPit && (
                <ellipse cx="0" cy={52 + bounceY} rx="18" ry="5" fill="#1E293B" opacity="0.24" />
              )}

              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                walkTime={anim.walkTime}
                activeChar={activeChar}
              />

              {/* ㄱ: Watermelon Helmet clamped directly over Jollaman's head! */}
              {wearingWatermelonHelmet && (
                <g transform="translate(0, -40)">
                  <WatermelonHelmetSvg cracked />
                </g>
              )}

              {/* Spinning dizzy star in aftermath/reveal */}
              {(phase === 'aftermath' || phase === 'reveal') &&
                (activeChar === 'ㄱ' ||
                  activeChar === 'ㄷ' ||
                  activeChar === 'ㄹ' ||
                  activeChar === 'ㅁ' ||
                  activeChar === 'ㅇ') && (
                  <DizzyStarOrbitSvg
                    walkTime={anim.walkTime}
                    cy={wearingWatermelonHelmet ? -80 : -66}
                  />
                )}
            </g>
          </g>
        );
      })()}

      {/* 5. FOREGROUND OVERLAY: ㄷ soup bowl rim (masks body cleanly inside!) */}
      {phase !== 'walking' && activeChar === 'ㄷ' && (
        <g transform={`translate(145, ${GROUND_Y - 30})`} opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.2) : 1}>
          <SteamingSoupBowlFrontSvg walkTime={anim.walkTime} />
        </g>
      )}
    </JollamanStageShell>
  );
};
