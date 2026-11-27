import React from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playEpisode3Sfx,
} from '../utils/audio';
import {
  JollamanCharacterSvg,
  JollamanFaceMode,
  DizzyStarOrbitSvg,
  CartoonHeartSvg,
  ComicImpactBurstSvg,
} from './JollamanSprites';
import {
  Episode3CharKey,
  Episode3ThemeKey,
  DynamicEpisode3Backdrop,
  CrowFlockSvg,
  CuteWalkingDogSvg,
  SteamingPoopPileSvg,
  RibbonGirlJollamanSvg,
  CapBoyJollamanSvg,
  KneelingDespairJollamanSvg,
  GarbageTruckSvg,
  BuddyJollamanSvg,
} from './JollamanSprites3';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES3_MEANINGS: Record<Episode3CharKey, string> = {
  'ㄲ': 'Crow',
  'ㄸ': 'Poop',
  'ㅃ': 'Kiss',
  'ㅆ': 'Garbage Truck',
  'ㅉ': 'Best Buddy',
};

export interface Episode3Item {
  char: Episode3CharKey;
  sound: string;
  triggerWord: string;
  gagSummary: string;
  sceneTheme: Episode3ThemeKey;
  sceneLabel: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const JOLLAMAN3_ITEMS: Episode3Item[] = [
  {
    char: 'ㄲ',
    sound: '쌍기역',
    triggerWord: '까마귀',
    gagSummary: '해질녘 숲길에서 대왕 까마귀 떼가 날아와 졸라맨의 머리를 콕콕 쪼아 뿔혹이 솟아오른다!! 까악!!',
    sceneTheme: 'sunset',
    sceneLabel: '해질녘 숲길',
    color: '#DC2626',
    skyX: 130,
    skyY: 56,
  },
  {
    char: 'ㄸ',
    sound: '쌍디귿',
    triggerWord: '똥',
    gagSummary: '해질녘 숲길에 강아지가 똥을 남기고 총총 걸어 나가고, 모르고 걷던 졸라맨이 그대로 밟아버린다!! 똥!!',
    sceneTheme: 'sunset',
    sceneLabel: '해질녘 숲길',
    color: '#92400E',
    skyX: 315,
    skyY: 56,
  },
  {
    char: 'ㅃ',
    sound: '쌍비읍',
    triggerWord: '뽀뽀',
    gagSummary: '리본과 치마를 입은 여성 졸라맨이 나와 뺨을 짝 때리더니 모자 쓴 다른 졸라맨에게 뽀뽀해 무릎 꿇고 쓰러진다!!',
    sceneTheme: 'sunset',
    sceneLabel: '노을 공원길',
    color: '#EC4899',
    skyX: 500,
    skyY: 56,
  },
  {
    char: 'ㅆ',
    sound: '쌍시옷',
    triggerWord: '쓰레기차',
    gagSummary: '무릎 꿇고 쓰러진 졸라맨 앞에 쓰레기차가 오더니 졸라맨을 싣고 그대로 달려간다!! 부릉~',
    sceneTheme: 'sunset',
    sceneLabel: '노을 공원길',
    color: '#16A34A',
    skyX: 685,
    skyY: 56,
  },
  {
    char: 'ㅉ',
    sound: '쌍지읒',
    triggerWord: '짝꿍',
    gagSummary: '사라진 방향에서 다시 나타난 쓰레기차가 졸라맨을 내려주고, 울고 있는 졸라맨에게 짝꿍이 다가와 어깨동무를 해준다!!',
    sceneTheme: 'sunset',
    sceneLabel: '따뜻한 노을길',
    color: '#0D9488',
    skyX: 870,
    skyY: 56,
  },
];

interface JollamanAdvancedSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 300;
const GROUND_Y = 368;

const getActionDuration = (char: Episode3CharKey): number => {
  switch (char) {
    case 'ㄲ':
      return 1.9;
    case 'ㄸ':
      return 2.4;
    case 'ㅃ':
      return 2.75;
    case 'ㅆ':
      return 2.45;
    case 'ㅉ':
      return 3.2;
  }
};

export const JollamanAdvancedSimulation: React.FC<JollamanAdvancedSimulationProps> = ({
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
  } = useJollamanStageEngine<Episode3Item, Episode3CharKey>({
    seriesNum: 3,
    seriesTitle: '3. 졸라쌍자음맨 (ㄲ ~ ㅉ)',
    items: JOLLAMAN3_ITEMS,
    audioEnabled,
    bgmTrack: 'memeShorts',
    initialWalkX: 160,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.85,
    scrollSpeedOnApproach: 360,
    aftermathAnimMaxDur: 1.25,
    getKey: (item) => item.char,
    getLabel: (item) => `${item.char} · ${item.triggerWord}`,
    getBadge: (item) => item.sound,
    getAccentColor: (item) => item.color,
    getCaption: (item) => item.gagSummary,
    getSpeakText: (item) => `${item.sound}, ${item.triggerWord}!`,
    getActionDuration: (item) => getActionDuration(item.char),
    onActionProgress: (item, t, { audioEnabled: audioOn, impactTriggered, secondaryTriggered, markImpact, markSecondary }) => {
      const impactAt: Record<Episode3CharKey, number> = {
        'ㄲ': 0.34,
        'ㄸ': 0.48,
        'ㅃ': 0.32,
        'ㅆ': 0.36,
        'ㅉ': 0.72,
      };
      if (t >= impactAt[item.char] && !impactTriggered) {
        markImpact();
        if (audioOn) {
          if (item.char === 'ㄲ') {
            playCartoonImpact();
            playEpisode3Sfx('ㄲ');
          } else {
            playEpisode3Sfx(item.char);
          }
        }
      }
      if (item.char === 'ㄸ' && t >= 0.68 && !secondaryTriggered) {
        markSecondary();
        if (audioOn) {
          playCartoonSplat();
        }
      }
    },
  });
  const activeChar = selectedItem.char;
  const activeTheme: Episode3ThemeKey = phase === 'walking' ? 'sunset' : selectedItem.sceneTheme;

  const isTtWalkingToPoop =
    activeChar === 'ㄸ' && phase === 'action' && anim.actionT >= 0.2 && anim.actionT < 0.68;
  const isWalkingMotion = phase === 'walking' || phase === 'approaching' || isTtWalkingToPoop;

  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;
  const scrollOffset = anim.worldScrollX;
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
  let jollaVisible = true;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let showHeadBump = false;
  let showKneelingDespair = false;

  const poopX = ACTION_SPOT_X + 125;

  if (phase === 'approaching') {
    if (activeChar === 'ㅆ') {
      // Jollaman is already slumped on his knees before the garbage truck arrives!
      showKneelingDespair = true;
      jollaVisible = false;
    } else if (activeChar === 'ㅉ') {
      // Jollaman is still riding inside the returning garbage truck!
      jollaVisible = false;
    }
  } else if (phase === 'action') {
    const t = anim.actionT;
    switch (activeChar) {
      case 'ㄲ': {
        if (t < 0.34) {
          jollaFaceMode = 'panic';
        } else {
          jollaFaceMode = 'dizzy';
          showHeadBump = true;
          jollaX = ACTION_SPOT_X + Math.sin(t * 48) * 6;
        }
        break;
      }
      case 'ㄸ': {
        if (t < 0.2) {
          jollaFaceMode = 'happy';
        } else if (t < 0.68) {
          const walkT = (t - 0.2) / 0.48;
          jollaX = ACTION_SPOT_X + walkT * (poopX - 8 - ACTION_SPOT_X);
          jollaFaceMode = 'happy';
        } else {
          // Stepped right in the poop!
          const hop = t < 0.8 ? Math.sin(((t - 0.68) / 0.12) * Math.PI) * 26 : 0;
          jollaX = poopX - 8;
          jollaY = GROUND_Y - 52 - hop;
          jollaFaceMode = 'muddy';
        }
        break;
      }
      case 'ㅃ': {
        if (t < 0.32) {
          jollaFaceMode = 'happy';
        } else if (t < 0.54) {
          // Slapped in the cheek!
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X - 10;
          jollaRot = -18;
        } else {
          // Dropped onto knees in heartbreak watching the kiss!
          showKneelingDespair = true;
          jollaVisible = false;
        }
        break;
      }
      case 'ㅆ': {
        if (t < 0.44) {
          showKneelingDespair = true;
          jollaVisible = false;
        } else if (t < 0.58) {
          // Scooped up into the garbage truck!
          const scoopT = (t - 0.44) / 0.14;
          jollaFaceMode = 'panic';
          jollaX = ACTION_SPOT_X + scoopT * 88;
          jollaY = GROUND_Y - 52 - Math.sin(scoopT * Math.PI) * 95;
          jollaRot = scoopT * 360;
        } else {
          // Carried away inside the truck bed!
          jollaVisible = false;
        }
        break;
      }
      case 'ㅉ': {
        if (t < 0.22) {
          // Dropped off from the garbage truck onto ACTION_SPOT_X!
          const dropP = t / 0.22;
          jollaVisible = true;
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 88 + (GROUND_Y - 52 - (GROUND_Y - 88)) * dropP - Math.sin(dropP * Math.PI) * 30;
          jollaRot = (1 - dropP) * -180;
          jollaFaceMode = dropP < 0.75 ? 'panic' : 'crying';
        } else if (t < 0.72) {
          jollaVisible = true;
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 52;
          jollaRot = 0;
          jollaFaceMode = 'crying';
        } else {
          jollaVisible = true;
          jollaX = ACTION_SPOT_X;
          jollaY = GROUND_Y - 52;
          jollaRot = 0;
          jollaFaceMode = 'happy';
        }
        break;
      }
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    switch (activeChar) {
      case 'ㄲ':
        jollaFaceMode = 'dizzy';
        showHeadBump = true;
        break;
      case 'ㄸ':
        jollaX = poopX - 8;
        jollaFaceMode = 'muddy';
        break;
      case 'ㅃ':
        showKneelingDespair = true;
        jollaVisible = false;
        break;
      case 'ㅆ':
        // Stay carried away inside the garbage truck — do not reappear!
        jollaVisible = false;
        break;
      case 'ㅉ':
        jollaFaceMode = 'happy';
        break;
    }
  }

  const revealSubtitle = tRevealSubtitle(3, selectedItem.char, selectedItem.gagSummary);
  const cameraViewBox = shorts.computeViewBox(jollaX, jollaY);

  return (
    <JollamanStageShell
      icon="🔥"
      title="3. 졸라쌍자음맨 (ㄲ ~ ㅉ)"
      accentButtonClass="bg-amber-600 hover:bg-amber-700"
      stageBgClass="bg-sky-100"
      ariaLabel="졸라맨 3 쌍자음 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'memeShorts',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((prev) => !prev),
        activeClass: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100',
        activeLabel: '🎵 밈 BGM',
        title: '유튜브 밈 하이퍼 코믹 배경음악 켜기/끄기',
      }}
      items={JOLLAMAN3_ITEMS}
      selectedItem={selectedItem}
      learnedKeys={learnedChars}
      getKey={(item) => item.char}
      getSkyX={(item) => item.skyX}
      getSkyY={(item) => item.skyY}
      getColor={(item) => item.color}
      getTokenText={(item) => item.char}
      onSelectItem={handleItemClick}
      onResetToWalking={resetToWalking}
      captionBarWidth={540}
      walkingHint="하늘의 쌍자음 (ㄲ ~ ㅉ)을 눌러보세요!"
      activeCaption={`${selectedItem.char} · ${selectedItem.sound} · ${selectedItem.triggerWord}`}
      revealAriaLabel={`${selectedItem.char} ${selectedItem.sound}, ${selectedItem.triggerWord} 학습 화면`}
      revealGlyph={selectedItem.char}
      revealHeadline={
        <span className="inline-flex flex-wrap items-baseline justify-center text-center">
          <span style={{ color: selectedItem.color }} className="mr-3.5 sm:mr-4">
            {selectedItem.char}
          </span>
          <span>
            {selectedItem.sound}, {selectedItem.triggerWord}
          </span>
        </span>
      }
      revealSubtitle={revealSubtitle}
      flashcard={(() => {
        const word = selectedItem.triggerWord;
        const wordFirst = word.slice(0, 1);
        const wordRest = word.slice(1);
        return {
          glyph: selectedItem.char,
          subLabel: `${selectedItem.sound} [${romanizeKorean(selectedItem.char)}]`,
          accentColor: selectedItem.color,
          headlineNode: (
            <>
              <span style={{ color: selectedItem.color }}>{wordFirst}</span>
              <span>{wordRest}</span>
            </>
          ),
          headlineCharLen: word.length,
          meaning: tWordMeaning(3, selectedItem.char, SERIES3_MEANINGS[selectedItem.char]),
          romanization: romanizeKorean(word),
          cornerIcon: getSeriesCornerIcon(3, selectedItem.char, anim.walkTime),
        };
      })()}
      backdropSlot={
        <DynamicEpisode3Backdrop
          theme={activeTheme}
          scrollOffset={scrollOffset}
          walkTime={anim.walkTime}
        />
      }
    >

          {/* ================================================================= */
          /* 3. EPISODE CO-STARS & PROPS (CLEAN COMIC STAGING)                 */
          /* ================================================================= */}
          {phase !== 'walking' && (
            <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
              {/* ㄲ: Angry Crow Flock pecking Jollaman's head */}
              {activeChar === 'ㄲ' && (() => {
                const cx =
                  phase === 'approaching'
                    ? ACTION_SPOT_X + 360 - anim.objectAppear * 280
                    : ACTION_SPOT_X + 52 - Math.sin(anim.walkTime * 8) * 26;
                const cy =
                  phase === 'action' && anim.actionT >= 0.34
                    ? GROUND_Y - 102 + Math.sin(anim.walkTime * 28) * 10
                    : GROUND_Y - 122;
                return (
                  <g transform={`translate(${cx}, ${cy})`}>
                    <CrowFlockSvg walkTime={anim.walkTime} attacking={phase === 'action'} />
                  </g>
                );
              })()}

              {/* ㄸ: Dog walks out of alley leaving poop -> oblivious Jollaman steps on it! */}
              {activeChar === 'ㄸ' && (() => {
                const dogX =
                  phase === 'approaching'
                    ? ACTION_SPOT_X + 40 + anim.objectAppear * 85
                    : phase === 'action' && anim.actionT < 0.45
                    ? ACTION_SPOT_X + 125 + (anim.actionT / 0.45) * 620
                    : 1080;
                const showPoop =
                  phase !== 'approaching' || anim.objectAppear > 0.85;
                const squished =
                  (phase === 'action' && anim.actionT >= 0.68) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';

                return (
                  <g>
                    {showPoop && (
                      <g transform={`translate(${poopX}, ${GROUND_Y - 2})`}>
                        <SteamingPoopPileSvg walkTime={anim.walkTime} squished={squished} />
                      </g>
                    )}
                    {dogX < 1040 && (
                      <g transform={`translate(${dogX}, ${GROUND_Y - 32})`}>
                        <CuteWalkingDogSvg walkTime={anim.walkTime} />
                      </g>
                    )}
                    {isTtWalkingToPoop && (
                      <text x={jollaX} y={GROUND_Y - 115} textAnchor="middle" fontSize="20" fontWeight="900" fill="#0F172A">
                        ♪
                      </text>
                    )}
                    {squished && (
                      <g transform={`translate(${poopX}, ${GROUND_Y - 108})`}>
                        <ComicImpactBurstSvg scale={0.95} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅃ: Ribbon-skirt girl slaps Jollaman -> walks over to cap boy & kisses him! */}
              {activeChar === 'ㅃ' && (() => {
                const capBoyX = ACTION_SPOT_X + 280;
                let girlX = ACTION_SPOT_X + 140;
                let girlFacing: 1 | -1 = -1;
                let girlWalking = false;
                let slapDeg = 0;
                let kissing = false;

                if (phase === 'approaching') {
                  girlX = ACTION_SPOT_X + 240 - anim.objectAppear * 130;
                  girlFacing = -1;
                  girlWalking = true;
                } else if (phase === 'action') {
                  const t = anim.actionT;
                  if (t < 0.3) {
                    girlX = ACTION_SPOT_X + 110 - (t / 0.3) * 68;
                    girlFacing = -1;
                    girlWalking = true;
                  } else if (t < 0.46) {
                    girlX = ACTION_SPOT_X + 42;
                    girlFacing = -1;
                    const swing = Math.sin(((t - 0.3) / 0.16) * Math.PI);
                    slapDeg = -85 * swing;
                  } else if (t < 0.72) {
                    const walkToBoy = (t - 0.46) / 0.26;
                    girlX = ACTION_SPOT_X + 42 + walkToBoy * 195;
                    girlFacing = 1;
                    girlWalking = true;
                  } else {
                    girlX = ACTION_SPOT_X + 237;
                    girlFacing = 1;
                    kissing = true;
                  }
                } else {
                  girlX = ACTION_SPOT_X + 237;
                  girlFacing = 1;
                  kissing = true;
                }

                const slappedBeat = phase === 'action' && anim.actionT >= 0.32 && anim.actionT < 0.54;
                const kissBeat =
                  (phase === 'action' && anim.actionT >= 0.72) ||
                  phase === 'aftermath' ||
                  phase === 'reveal';

                return (
                  <g>
                    <g transform={`translate(${capBoyX}, ${GROUND_Y - 50})`}>
                      <CapBoyJollamanSvg blushing={kissBeat} />
                    </g>

                    <g transform={`translate(${girlX}, ${GROUND_Y - 50})`}>
                      <RibbonGirlJollamanSvg
                        facing={girlFacing}
                        isWalking={girlWalking}
                        slapDeg={slapDeg}
                        kissing={kissing}
                        walkTime={anim.walkTime}
                      />
                    </g>

                    {slappedBeat && (
                      <g transform={`translate(${ACTION_SPOT_X + 14}, ${GROUND_Y - 116})`}>
                        <ComicImpactBurstSvg scale={0.9} />
                      </g>
                    )}

                    {kissBeat && (
                      <g transform={`translate(${capBoyX - 20}, ${GROUND_Y - 122 + Math.sin(anim.walkTime * 6) * 4})`}>
                        <CartoonHeartSvg size={1.15} color="#EC4899" />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅆ: Garbage truck drives up, scoops Jollaman & drives off-screen left permanently */}
              {activeChar === 'ㅆ' && (() => {
                let tx = ACTION_SPOT_X + 240;
                let carrying = false;
                if (phase === 'approaching') {
                  tx = ACTION_SPOT_X + 460 - anim.objectAppear * 220;
                } else if (phase === 'action') {
                  const t = anim.actionT;
                  if (t < 0.44) {
                    tx = ACTION_SPOT_X + 240 - (t / 0.44) * 145;
                  } else if (t < 0.6) {
                    tx = ACTION_SPOT_X + 95;
                    carrying = t >= 0.56;
                  } else {
                    const leaveT = (t - 0.6) / 0.4;
                    tx = ACTION_SPOT_X + 95 - leaveT * 560;
                    carrying = true;
                  }
                } else {
                  tx = -300;
                  carrying = true;
                }

                return (
                  <g>
                    {tx > -220 && (
                      <g transform={`translate(${tx}, ${GROUND_Y - 24})`}>
                        <GarbageTruckSvg walkTime={anim.walkTime} carryingJollaman={carrying} />
                      </g>
                    )}
                  </g>
                );
              })()}

              {/* ㅉ: Garbage truck returns from disappeared left direction, drops Jollaman off -> Buddy hugs crying Jollaman! */}
              {activeChar === 'ㅉ' && (() => {
                const stopTx = ACTION_SPOT_X - 26;
                let tx = -300;
                let truckCarrying = false;
                if (phase === 'approaching') {
                  tx = -160 + anim.objectAppear * (stopTx + 160);
                  truckCarrying = true;
                } else if (phase === 'action') {
                  const t = anim.actionT;
                  if (t < 0.22) {
                    tx = stopTx;
                    truckCarrying = false;
                  } else if (t < 0.45) {
                    const leaveP = (t - 0.22) / 0.23;
                    tx = stopTx - leaveP * 520;
                    truckCarrying = false;
                  } else {
                    tx = -300;
                  }
                }

                let bx = ACTION_SPOT_X + 340;
                let buddyWalking = true;
                let hugging = false;
                if (phase === 'approaching') {
                  bx = ACTION_SPOT_X + 340;
                } else if (phase === 'action') {
                  const t = anim.actionT;
                  if (t < 0.25) {
                    bx = ACTION_SPOT_X + 340;
                    buddyWalking = false;
                  } else if (t < 0.72) {
                    const walkP = (t - 0.25) / 0.47;
                    bx = ACTION_SPOT_X + 340 - walkP * 292;
                    buddyWalking = true;
                    hugging = false;
                  } else {
                    bx = ACTION_SPOT_X + 48;
                    buddyWalking = false;
                    hugging = true;
                  }
                } else {
                  bx = ACTION_SPOT_X + 48;
                  buddyWalking = false;
                  hugging = true;
                }

                return (
                  <g>
                    {tx > -220 && (
                      <g transform={`translate(${tx}, ${GROUND_Y - 24})`}>
                        <GarbageTruckSvg walkTime={anim.walkTime} carryingJollaman={truckCarrying} />
                      </g>
                    )}
                    <g transform={`translate(${bx}, ${GROUND_Y - 50})`}>
                      <BuddyJollamanSvg
                        isWalking={buddyWalking}
                        hugging={hugging}
                        walkTime={anim.walkTime}
                      />
                    </g>
                    {hugging && (
                      <g transform={`translate(${ACTION_SPOT_X + 24}, ${GROUND_Y - 122 + Math.sin(anim.walkTime * 4) * 3})`}>
                        <CartoonHeartSvg size={1.2} color="#EF4444" />
                      </g>
                    )}
                  </g>
                );
              })()}
            </g>
          )}

          {/* ================================================================= */}
          {/* 4. JOLLAMAN CHARACTER                                             */}
          {/* ================================================================= */}
          {showKneelingDespair && (
            <g transform={`translate(${ACTION_SPOT_X}, ${GROUND_Y - 50})`}>
              <KneelingDespairJollamanSvg />
            </g>
          )}

          {jollaVisible && (
            <g
              transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing}, 1)`}
              onClick={toggleJollaPause}
              className="cursor-pointer"
            >
              <rect x="-28" y="-76" width="56" height="132" fill="transparent" />
              {jollaRot === 0 && (
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

              {(phase === 'aftermath' || phase === 'reveal') &&
                (activeChar === 'ㄲ' || activeChar === 'ㅆ') && (
                  <DizzyStarOrbitSvg walkTime={anim.walkTime} />
                )}
            </g>
          )}

    </JollamanStageShell>
  );
};
