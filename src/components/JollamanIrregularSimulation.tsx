import React, { useRef } from 'react';
import {
  playCartoonImpact,
  playCartoonSplat,
  playIrregularSfx,
  playIrregularStepSfx,
} from '../utils/audio';
import { useJollamanStageEngine } from '../hooks/useJollamanStageEngine';
import { JollamanStageShell } from './JollamanStageShell';
import { tRevealSubtitle, tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

const SERIES10_MEANINGS: Record<IrregularKey, string> = {
  춥다: 'It is cold',
  듣다: 'To listen',
  짓다: 'To build',
  부르다: 'To call / sing',
  아프다: 'To hurt / be sick',
  파랗다: 'It is blue',
  만들다: 'Please make',
  하다: 'To do',
};
import { JollamanCharacterSvg, JollamanFaceMode } from './JollamanSprites';
import { GiantHangulSvg, ElectricZapSvg } from './JollamanSprites8';
import {
  IrregularKey,
  IrregularBackdrop,
  WarmCampfireSvg,
  IceCrackShardsSvg,
  BoomingSpeakerSvg,
  ToyHammerSvg,
  MegaphoneSvg,
  BluePaintSplashSvg,
  BananaPeelSvg,
  BlinkHighlightRingSvg,
  SparkleBurstSvg,
  StepProgressHudSvg,
} from './JollamanSprites10';

export interface IrregularItem {
  key: IrregularKey;
  skyLabel: string;
  ruleBadge: string;
  endingText: string;
  completedWord: string;
  blinkDesc: string;
  resultDisplay: string;
  pronunciation: string;
  ttsReveal: string;
  color: string;
  skyX: number;
  skyY: number;
}

export const IRREGULAR_ITEMS: IrregularItem[] = [
  {
    key: '춥다',
    skyLabel: '춥다',
    ruleBadge: 'ㅂ불규칙',
    endingText: '어요',
    completedWord: '추워요',
    blinkDesc: "받침 'ㅂ' 따로 떼어 + '어' 깜빡!",
    resultDisplay: '춥다 → 추워요',
    pronunciation: '추워요',
    ttsReveal: '춥다, 추워요!',
    color: '#0284C7',
    skyX: 78,
    skyY: 60,
  },
  {
    key: '듣다',
    skyLabel: '듣다',
    ruleBadge: 'ㄷ불규칙',
    endingText: '어요',
    completedWord: '들어요',
    blinkDesc: "받침 'ㄷ'만 따로 떼어 깜빡!",
    resultDisplay: '듣다 → 들어요',
    pronunciation: '들어요',
    ttsReveal: '듣다, 들어요!',
    color: '#D97706',
    skyX: 198,
    skyY: 84,
  },
  {
    key: '짓다',
    skyLabel: '짓다',
    ruleBadge: 'ㅅ불규칙',
    endingText: '어요',
    completedWord: '지어요',
    blinkDesc: "받침 'ㅅ'만 따로 떼어 깜빡!",
    resultDisplay: '짓다 → 지어요',
    pronunciation: '지어요',
    ttsReveal: '짓다, 지어요!',
    color: '#059669',
    skyX: 319,
    skyY: 60,
  },
  {
    key: '부르다',
    skyLabel: '부르다',
    ruleBadge: '르불규칙',
    endingText: '어요',
    completedWord: '불러요',
    blinkDesc: "어간 '르' + 어미 '어' 함께 깜빡!",
    resultDisplay: '부르다 → 불러요',
    pronunciation: '불러요',
    ttsReveal: '부르다, 불러요!',
    color: '#E11D48',
    skyX: 439,
    skyY: 84,
  },
  {
    key: '아프다',
    skyLabel: '아프다',
    ruleBadge: 'ㅡ탈락',
    endingText: '아요',
    completedWord: '아파요',
    blinkDesc: "모음 'ㅡ' 따로 떼어 + '아' 깜빡!",
    resultDisplay: '아프다 → 아파요',
    pronunciation: '아파요',
    ttsReveal: '아프다, 아파요!',
    color: '#DC2626',
    skyX: 560,
    skyY: 60,
  },
  {
    key: '파랗다',
    skyLabel: '파랗다',
    ruleBadge: 'ㅎ불규칙',
    endingText: '아요',
    completedWord: '파래요',
    blinkDesc: "받침 'ㅎ' 따로 + '라·아' 깜빡!",
    resultDisplay: '파랗다 → 파래요',
    pronunciation: '파래요',
    ttsReveal: '파랗다, 파래요!',
    color: '#2563EB',
    skyX: 681,
    skyY: 84,
  },
  {
    key: '만들다',
    skyLabel: '만들다',
    ruleBadge: 'ㄹ탈락',
    endingText: '세요',
    completedWord: '만드세요',
    blinkDesc: "받침 'ㄹ'만 따로 떼어 깜빡!",
    resultDisplay: '만들다 → 만드세요',
    pronunciation: '만드세요',
    ttsReveal: '만들다, 만드세요!',
    color: '#7C3AED',
    skyX: 801,
    skyY: 60,
  },
  {
    key: '하다',
    skyLabel: '하다',
    ruleBadge: '여불규칙',
    endingText: '어요',
    completedWord: '해요',
    blinkDesc: "어간 '하' + 어미 '어→여' 깜빡!",
    resultDisplay: '하다 → 해요',
    pronunciation: '해요',
    ttsReveal: '하다, 해요!',
    color: '#EA580C',
    skyX: 922,
    skyY: 84,
  },
];

interface JollamanIrregularSimulationProps {
  audioEnabled?: boolean;
}

const LEFT_EDGE_X = 95;
const RIGHT_EDGE_X = 875;
const ACTION_SPOT_X = 240;
const GROUND_Y = 368;

const STEP_2_T = 0.16;
const STEP_3_T = 0.34;
const STEP_4_T = 0.54;
const STEP_5_T = 0.84;

const getActionDuration = (key: IrregularKey): number => {
  if (key === '만들다' || key === '부르다') return 4.8;
  return 4.6;
};

const getCurrentStep = (phase: string, t: number): 1 | 2 | 3 | 4 | 5 => {
  if (phase === 'approaching') return 1;
  if (phase === 'aftermath' || phase === 'reveal') return 5;
  if (t < STEP_2_T) return 1;
  if (t < STEP_3_T) return 2;
  if (t < STEP_4_T) return 3;
  if (t < STEP_5_T) return 4;
  return 5;
};

export const JollamanIrregularSimulation: React.FC<JollamanIrregularSimulationProps> = ({
  audioEnabled = true,
}) => {
  const stepSfxRef = useRef<{ key: IrregularKey | null; maxStep: number }>({
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
  } = useJollamanStageEngine<IrregularItem, IrregularKey>({
    seriesNum: 10,
    seriesTitle: '10. 졸라불규칙맨 (8종)',
    items: IRREGULAR_ITEMS,
    audioEnabled,
    bgmTrack: 'chillLounge',
    initialWalkX: 180,
    leftEdgeX: LEFT_EDGE_X,
    rightEdgeX: RIGHT_EDGE_X,
    actionSpotX: ACTION_SPOT_X,
    approachDuration: 0.8,
    scrollSpeedOnApproach: 320,
    aftermathAnimMaxDur: 1.35,
    alwaysResetWalkX: true,
    playPopOnSelect: true,
    getKey: (item) => item.key,
    getLabel: (item) => item.resultDisplay,
    getBadge: (item) => item.ruleBadge,
    getAccentColor: (item) => item.color,
    getCaption: (item) => `${item.ruleBadge} · ${item.resultDisplay} (${item.blinkDesc})`,
    getSpeakText: (item) => item.ttsReveal,
    getActionDuration: (item) => getActionDuration(item.key),
    getTargetStartX: () => ACTION_SPOT_X,
    onSelectPreHook: (item) => {
      stepSfxRef.current = { key: item.key, maxStep: 0 };
    },
    onStartAction: (item, audioOn) => {
      stepSfxRef.current = { key: item.key, maxStep: 1 };
      if (audioOn) {
        playIrregularStepSfx('verbEnter');
      }
    },
    onActionProgress: (item, t, { audioEnabled: audioOn }) => {
      const tracker = stepSfxRef.current;
      if (tracker.key !== item.key) return;

      if (t >= STEP_2_T && tracker.maxStep < 2) {
        tracker.maxStep = 2;
        if (audioOn) playIrregularStepSfx('endingEnter');
      }
      if (t >= STEP_3_T && tracker.maxStep < 3) {
        tracker.maxStep = 3;
        if (audioOn) {
          playIrregularStepSfx('kickDa');
          playCartoonImpact();
        }
      }
      if (t >= STEP_4_T && tracker.maxStep < 4) {
        tracker.maxStep = 4;
        if (audioOn) playIrregularStepSfx('blink');
      }
      if (t >= STEP_5_T && tracker.maxStep < 5) {
        tracker.maxStep = 5;
        if (audioOn) {
          const sfxMap: Record<
            IrregularKey,
            'bIrreg' | 'dIrreg' | 'sIrreg' | 'reuIrreg' | 'euDrop' | 'hIrreg' | 'lDrop' | 'yeoIrreg'
          > = {
            춥다: 'bIrreg',
            듣다: 'dIrreg',
            짓다: 'sIrreg',
            부르다: 'reuIrreg',
            아프다: 'euDrop',
            파랗다: 'hIrreg',
            만들다: 'lDrop',
            하다: 'yeoIrreg',
          };
          playIrregularSfx(sfxMap[item.key]);
          playIrregularStepSfx('complete');
        }
      }
    },
    onAftermathStart: (item, audioOn) => {
      if (audioOn && (item.key === '만들다' || item.key === '아프다' || item.key === '파랗다')) {
        playCartoonSplat();
      }
    },
  });

  const activeKey = selectedItem.key;
  const actionT =
    phase === 'action' ? anim.actionT : phase === 'approaching' ? 0 : 1;
  const currentStep = getCurrentStep(phase, actionT);

  const isKickingDash = phase === 'action' && actionT >= STEP_3_T && actionT < 0.52;
  const isWalkingMotion = phase === 'walking' || phase === 'approaching';
  const legSwing = isWalkingMotion ? Math.sin(walkCycle) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkCycle + Math.PI) * 16 : 0;
  const bounceY = isWalkingMotion ? Math.abs(Math.sin(walkCycle)) * 4 : 0;

  let jollaX = anim.walkX;
  let jollaY = GROUND_Y - 52 - bounceY;
  let jollaRot = 0;
  const jollaFacing = phase === 'walking' ? anim.walkDir : 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';

  if (phase === 'action') {
    const t = anim.actionT;
    if (t < STEP_2_T) {
      // Step 1: Dictionary verb appears, Jollaman points / cheers!
      jollaX = ACTION_SPOT_X;
      jollaY = GROUND_Y - 52;
      jollaFaceMode = 'happy';
    } else if (t < STEP_3_T) {
      // Step 2: Ending enters from right, Jollaman winds up!
      const windP = (t - STEP_2_T) / (STEP_3_T - STEP_2_T);
      jollaX = ACTION_SPOT_X - Math.sin(windP * Math.PI) * 26;
      jollaY = GROUND_Y - 52;
      jollaRot = -Math.sin(windP * Math.PI) * 10;
      jollaFaceMode = 'happy';
    } else if (isKickingDash) {
      // Step 3: Jollaman leaps & kicks '다' out, then hops back cleanly!
      const daKickX =
        activeKey === '부르다' || activeKey === '아프다' || activeKey === '파랗다' || activeKey === '만들다'
          ? 490
          : 460;
      if (t < 0.43) {
        const dash = (t - STEP_3_T) / (0.43 - STEP_3_T);
        jollaX = ACTION_SPOT_X + dash * (daKickX - ACTION_SPOT_X);
        jollaY = GROUND_Y - 52 - Math.sin(dash * Math.PI) * 62;
        jollaRot = dash * 18;
      } else {
        const back = (t - 0.43) / (0.52 - 0.43);
        jollaX = daKickX - back * (daKickX - ACTION_SPOT_X);
        jollaY = GROUND_Y - 52 - Math.sin(back * Math.PI) * 34;
        jollaRot = (1 - back) * 14;
      }
      jollaFaceMode = 'panic';
    } else if (t < STEP_5_T) {
      // Step 4: Watching irregular blink transformation!
      jollaX = ACTION_SPOT_X;
      if (activeKey === '춥다') {
        jollaX = ACTION_SPOT_X + Math.sin(t * 95) * 3.5;
        jollaFaceMode = t < 0.72 ? 'panic' : 'happy';
      } else if (activeKey === '아프다') {
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 20)) * 12;
        jollaFaceMode = 'crying';
      } else {
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 14)) * 8;
        jollaFaceMode = 'happy';
      }
    } else {
      // Step 5: Completed conjugation celebration jump!
      const celP = Math.min(1, (t - STEP_5_T) / (1 - STEP_5_T));
      const jump = Math.sin(celP * Math.PI) * 44;
      jollaX = ACTION_SPOT_X;
      jollaY = GROUND_Y - 52 - jump;
      jollaRot = Math.sin(celP * Math.PI * 2) * 8;
      jollaFaceMode = 'happy';
    }
  } else if (phase === 'aftermath' || phase === 'reveal') {
    jollaX = ACTION_SPOT_X;
    jollaY = GROUND_Y - 52 - Math.abs(Math.sin(anim.walkTime * 6)) * 10;
    jollaFaceMode = activeKey === '아프다' ? 'crying' : 'happy';
  }

  const cameraFocusX =
    phase === 'action' || phase === 'aftermath'
      ? Math.max(jollaX, 435)
      : jollaX;
  const cameraViewBox = shorts.computeViewBox(cameraFocusX, jollaY);

  const stepHudTextMap: Record<1 | 2 | 3 | 4 | 5, string> = {
    1: `1단계: 기본형 '${selectedItem.key}' 등장!`,
    2: `2단계: 어미 '${selectedItem.endingText}' 등장!`,
    3: `3단계: '다' 쫓아내고 '${selectedItem.endingText}' 결합!`,
    4: `4단계: ${selectedItem.blinkDesc}`,
    5: `5단계: '${selectedItem.completedWord}' 완전 완성!!`,
  };

  const revealSubtitle = tRevealSubtitle(
    10,
    selectedItem.key,
    `${selectedItem.ruleBadge} · ${selectedItem.resultDisplay}`
  );

  // Clean blink cadence during Step 4 (t = 0.54 .. 0.84)
  const isBlinkStep = phase === 'action' && actionT >= STEP_4_T && actionT < STEP_5_T;
  const blinkPhase = isBlinkStep ? (actionT - STEP_4_T) / (STEP_5_T - STEP_4_T) : actionT >= STEP_5_T ? 1 : 0;
  const blinkOn = isBlinkStep ? Math.floor((actionT - STEP_4_T) * 28) % 2 === 0 : false;

  // Step 1 appearance scale
  const verbPopScale =
    phase === 'approaching'
      ? 0.55 + anim.objectAppear * 0.45
      : phase === 'action' && actionT < 0.08
      ? 1 + Math.sin((actionT / 0.08) * Math.PI) * 0.14
      : 1;

  // Step 2 incoming ending position progress
  const endingEnterP =
    actionT < STEP_2_T
      ? 0
      : actionT < STEP_3_T
      ? 1 - Math.pow(1 - Math.min(1, (actionT - STEP_2_T) / 0.13), 3)
      : 1;

  // Step 3 kick & attach progress
  const kickP =
    actionT < STEP_3_T ? 0 : Math.min(1, (actionT - STEP_3_T) / 0.17);
  const attachP =
    actionT < STEP_3_T + 0.03
      ? 0
      : Math.min(1, (actionT - (STEP_3_T + 0.03)) / 0.14);

  // Step 5 completion bounce
  const completePop =
    actionT >= STEP_5_T
      ? 1 + Math.sin(Math.min(1, (actionT - STEP_5_T) / 0.14) * Math.PI) * 0.18
      : 1;

  // Reusable blinking wrapper for changing stem/ending/batchim parts
  const renderBlinkingGlyph = (
    text: string,
    x: number,
    y: number,
    size: number,
    baseColor: string,
    ringRx = 42,
    ringRy = 42,
    extraOpacity = 1
  ) => {
    const scale = blinkOn ? 1.13 : 0.96;
    const fill = blinkOn ? '#EA580C' : baseColor;
    const stroke = blinkOn ? '#FEF08A' : '#FFFFFF';
    return (
      <g transform={`translate(${x}, ${y}) scale(${scale})`} opacity={extraOpacity}>
        <BlinkHighlightRingSvg blinkOn={blinkOn} color={baseColor} rx={ringRx} ry={ringRy} />
        <g opacity={blinkOn ? 1 : 0.36}>
          <GiantHangulSvg text={text} size={size} fill={fill} stroke={stroke} strokeWidth={10} />
        </g>
      </g>
    );
  };

  return (
    <JollamanStageShell
      icon="🧩"
      title="10. 졸라불규칙맨 (8종)"
      accentButtonClass="bg-indigo-600 hover:bg-indigo-700"
      stageBgClass="bg-indigo-50"
      ariaLabel="졸라맨 10 불규칙 활용 2D 시뮬레이션 무대"
      cameraViewBox={cameraViewBox}
      phase={phase}
      walkTime={anim.walkTime}
      shorts={shorts}
      bgmConfig={{
        track: 'chillLounge',
        enabled: bgmEnabled,
        audioEnabled,
        onToggle: () => setBgmEnabled((v) => !v),
        activeClass: 'bg-indigo-50 text-indigo-700 border-indigo-200 hover:bg-indigo-100',
        activeLabel: '🎵 힐링 BGM 켜짐',
        title: '따뜻한 로파이 힐링 배경음악 켜기/끄기',
      }}
      items={IRREGULAR_ITEMS}
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
      captionBarWidth={640}
      walkingHint="하늘의 불규칙 용언 (춥다 ~ 하다)을 눌러 5단계 변신을 보세요!"
      activeCaption={
        phase === 'action' || phase === 'approaching'
          ? `${selectedItem.ruleBadge} · ${stepHudTextMap[currentStep]}`
          : `${selectedItem.resultDisplay} · [${selectedItem.pronunciation}] (${selectedItem.ruleBadge})`
      }
      revealAriaLabel={`${selectedItem.resultDisplay} 학습 화면`}
      revealGlyph={selectedItem.pronunciation}
      revealGlyphSize="medium"
      revealHeadline={<span>{selectedItem.resultDisplay}</span>}
      revealSubtitle={revealSubtitle}
      flashcard={{
        glyph: selectedItem.completedWord,
        subLabel: selectedItem.ruleBadge,
        accentColor: selectedItem.color,
        headlineNode: (
          <>
            <span>{selectedItem.key}</span>
            <span className="mx-1.5 text-slate-400">→</span>
            <span style={{ color: selectedItem.color }}>{selectedItem.completedWord}</span>
          </>
        ),
        headlineCharLen: selectedItem.key.length + selectedItem.completedWord.length + 2,
        meaning: tWordMeaning(10, selectedItem.key, SERIES10_MEANINGS[selectedItem.key]),
        romanization: romanizeKorean(selectedItem.pronunciation),
        cornerIcon: getSeriesCornerIcon(10, selectedItem.key, anim.walkTime),
      }}
      backdropSlot={
        <IrregularBackdrop
          activeKey={phase === 'walking' ? IRREGULAR_ITEMS[0].key : activeKey}
          isWalkingMode={false}
          walkTime={anim.walkTime}
          scrollOffset={anim.worldScrollX}
        />
      }
    >
      {/* 3. GIANT 5-STEP IRREGULAR CONJUGATION STAGE */}
      {phase !== 'walking' && (
        <g opacity={phase === 'approaching' ? Math.min(1, anim.objectAppear * 1.25) : 1}>
          {/* 5-Step Progress Indicator HUD */}
          <StepProgressHudSvg
            step={currentStep}
            stepText={stepHudTextMap[currentStep]}
            accentColor={selectedItem.color}
            centerX={475}
            y={132}
          />

          {/* 1. 춥다 -> 추워요 (ㅂ불규칙: 종성 ㅂ 따로 떼어 + 어 깜빡 -> 추워요) */}
          {activeKey === '춥다' && (() => {
            const splitP = isBlinkStep ? Math.min(1, blinkPhase / 0.2) : 0;
            const morphP = isBlinkStep && blinkPhase >= 0.52 ? (blinkPhase - 0.52) / 0.48 : 0;
            const shardP = isBlinkStep && blinkPhase >= 0.46 ? Math.min(1, (blinkPhase - 0.46) / 0.35) : 0;
            const eoX = 920 - endingEnterP * 250 - attachP * 145;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    {/* Stem: '춥' unified in steps 1-3, then splits into '추' + separated blinking 'ㅂ' in step 4 */}
                    {!isBlinkStep ? (
                      <g transform="translate(395, 248)">
                        <GiantHangulSvg text="춥" size={166} fill="#1E293B" />
                      </g>
                    ) : (
                      <g>
                        <g transform={`translate(395, ${248 - splitP * 32})`}>
                          <GiantHangulSvg text="추" size={156} fill="#1E293B" />
                        </g>
                        {morphP < 0.25 ? (
                          renderBlinkingGlyph('ㅂ', 395, 248 + splitP * 76, 108, '#0284C7', 42, 38)
                        ) : (
                          renderBlinkingGlyph(
                            '우',
                            395 + morphP * 85,
                            324 - morphP * 76,
                            132,
                            '#EA580C',
                            48,
                            46
                          )
                        )}
                        {shardP > 0 && shardP < 0.96 && (
                          <g transform="translate(395, 322)">
                            <IceCrackShardsSvg progress={shardP} />
                          </g>
                        )}
                      </g>
                    )}

                    {/* Original ending '다' gets kicked away in Step 3 */}
                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${525 + kickP * 440}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={166} fill="#64748B" />
                      </g>
                    )}

                    {/* Incoming ending '어요' enters in Step 2, settles into '다' spot in Step 3, '어' blinks in Step 4 */}
                    {actionT >= STEP_2_T && (
                      <g>
                        {!isBlinkStep ? (
                          <g transform={`translate(${eoX}, ${eoWaitY})`}>
                            <GiantHangulSvg text="어" size={166} fill="#0284C7" />
                          </g>
                        ) : (
                          renderBlinkingGlyph(
                            '어',
                            525 - morphP * 20,
                            248,
                            162,
                            '#0284C7',
                            52,
                            52
                          )
                        )}
                        <g transform={`translate(${eoX + 120}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={166} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                    {isBlinkStep && blinkPhase >= 0.45 && (
                      <g transform="translate(650, 355)">
                        <WarmCampfireSvg pulse={0.95 + Math.sin(anim.walkTime * 14) * 0.08} />
                      </g>
                    )}
                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#FACC15" progress={anim.aftermathT} />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(365, 248)">
                        <GiantHangulSvg text="추" size={172} fill="#1E293B" />
                      </g>
                      <g transform="translate(485, 248)">
                        <GiantHangulSvg text="워" size={184} fill="#EA580C" />
                      </g>
                      <g transform="translate(605, 248)">
                        <GiantHangulSvg text="요" size={172} fill="#1E293B" />
                      </g>
                    </g>
                    <g transform="translate(690, 352)">
                      <WarmCampfireSvg pulse={0.95 + Math.sin(anim.walkTime * 14) * 0.08} />
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 2. 듣다 -> 들어요 (ㄷ불규칙: 종성 ㄷ만 따로 떼어 깜빡 -> 들어요) */}
          {activeKey === '듣다' && (() => {
            const splitP = isBlinkStep ? Math.min(1, blinkPhase / 0.2) : 0;
            const morphed = isBlinkStep && blinkPhase >= 0.54;
            const spinRot = morphed ? Math.max(0, 1 - (blinkPhase - 0.54) / 0.25) * 360 : 0;
            const eoX = 920 - endingEnterP * 250 - attachP * 145;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    {!isBlinkStep ? (
                      <g transform="translate(395, 248)">
                        <GiantHangulSvg text="듣" size={166} fill="#1E293B" />
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(215, 315)">
                          <BoomingSpeakerSvg
                            pulse={blinkPhase >= 0.45 ? 1 + Math.sin(actionT * 48) * 0.1 : 1}
                            blasting={blinkPhase >= 0.45}
                          />
                        </g>
                        <g transform={`translate(395, ${248 - splitP * 32})`}>
                          <GiantHangulSvg text="드" size={156} fill="#1E293B" />
                        </g>
                        <g transform={`rotate(${spinRot}, 395, ${248 + splitP * 76})`}>
                          {renderBlinkingGlyph(
                            morphed ? 'ㄹ' : 'ㄷ',
                            395,
                            248 + splitP * 76,
                            110,
                            '#D97706',
                            42,
                            38
                          )}
                        </g>
                      </g>
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${525 + kickP * 440}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={166} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        <g transform={`translate(${eoX}, ${eoWaitY})`}>
                          <GiantHangulSvg text="어" size={166} fill="#1E293B" />
                        </g>
                        <g transform={`translate(${eoX + 120}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={166} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#FBBF24" progress={anim.aftermathT} />
                    </g>
                    <g transform="translate(205, 315)">
                      <BoomingSpeakerSvg pulse={1 + Math.sin(anim.walkTime * 12) * 0.06} blasting />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(365, 248)">
                        <GiantHangulSvg text="들" size={184} fill="#D97706" />
                      </g>
                      <g transform="translate(485, 248)">
                        <GiantHangulSvg text="어" size={172} fill="#1E293B" />
                      </g>
                      <g transform="translate(605, 248)">
                        <GiantHangulSvg text="요" size={172} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 3. 짓다 -> 지어요 (ㅅ불규칙: 종성 ㅅ만 따로 떼어 깜빡 -> ㅅ 탈락 -> 지어요) */}
          {activeKey === '짓다' && (() => {
            const splitP = isBlinkStep ? Math.min(1, blinkPhase / 0.2) : 0;
            const bonked = isBlinkStep && blinkPhase >= 0.56;
            const hammerAngle =
              isBlinkStep && blinkPhase >= 0.36 && blinkPhase < 0.56
                ? -35 + ((blinkPhase - 0.36) / 0.2) * 85
                : bonked
                ? 45
                : -35;
            const vanishP = bonked ? Math.min(1, (blinkPhase - 0.56) / 0.35) : 0;
            const eoX = 920 - endingEnterP * 250 - attachP * 145;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    {!isBlinkStep ? (
                      <g transform="translate(395, 248)">
                        <GiantHangulSvg text="짓" size={166} fill="#1E293B" />
                      </g>
                    ) : (
                      <g>
                        <g transform={`translate(395, ${248 - splitP * 32 + vanishP * 26})`}>
                          <GiantHangulSvg text="지" size={160} fill="#059669" />
                        </g>
                        {vanishP < 0.95 &&
                          renderBlinkingGlyph(
                            'ㅅ',
                            395,
                            248 + splitP * 76 + vanishP * 30,
                            108,
                            '#EA580C',
                            40,
                            36,
                            1 - vanishP
                          )}
                        {blinkPhase >= 0.3 && blinkPhase < 0.9 && (
                          <g transform="translate(305, 310)">
                            <ToyHammerSvg angle={hammerAngle} />
                          </g>
                        )}
                      </g>
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${525 + kickP * 440}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={166} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        <g transform={`translate(${eoX}, ${eoWaitY})`}>
                          <GiantHangulSvg text="어" size={166} fill="#1E293B" />
                        </g>
                        <g transform={`translate(${eoX + 120}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={166} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#34D399" progress={anim.aftermathT} />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(365, 248)">
                        <GiantHangulSvg text="지" size={184} fill="#059669" />
                      </g>
                      <g transform="translate(485, 248)">
                        <GiantHangulSvg text="어" size={172} fill="#1E293B" />
                      </g>
                      <g transform="translate(605, 248)">
                        <GiantHangulSvg text="요" size={172} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 4. 부르다 -> 불러요 (르불규칙: 어간 '르' + 어미 '어' 함께 깜빡 -> 불러요) */}
          {activeKey === '부르다' && (() => {
            const splitP2 = isBlinkStep && blinkPhase >= 0.5 ? Math.min(1, (blinkPhase - 0.5) / 0.45) : 0;
            const eoX = 935 - endingEnterP * 250 - attachP * 130;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    <g transform="translate(345, 248)">
                      <GiantHangulSvg text="부" size={154} fill="#1E293B" />
                    </g>

                    {!isBlinkStep ? (
                      <g transform="translate(450, 248)">
                        <GiantHangulSvg text="르" size={154} fill="#E11D48" />
                      </g>
                    ) : (
                      <g>
                        <g transform="translate(262, 292)">
                          <MegaphoneSvg />
                        </g>
                        {splitP2 === 0 ? (
                          renderBlinkingGlyph('르', 450, 248, 154, '#E11D48', 48, 48)
                        ) : (
                          <g>
                            {/* Separated ㄹ glides beneath '부' */}
                            {renderBlinkingGlyph(
                              'ㄹ',
                              450 - splitP2 * 105,
                              248 + splitP2 * 64,
                              102,
                              '#E11D48',
                              36,
                              34
                            )}
                            {/* Remaining '러' slides right into '어' */}
                            {renderBlinkingGlyph(
                              '러',
                              450 + splitP2 * 55,
                              248,
                              158,
                              '#E11D48',
                              48,
                              48
                            )}
                          </g>
                        )}
                      </g>
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${555 + kickP * 420}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={154} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        {!isBlinkStep ? (
                          <g transform={`translate(${eoX}, ${eoWaitY})`}>
                            <GiantHangulSvg text="어" size={154} fill="#E11D48" />
                          </g>
                        ) : (
                          splitP2 < 0.7 &&
                          renderBlinkingGlyph(
                            '어',
                            555 - splitP2 * 40,
                            248,
                            154,
                            '#E11D48',
                            48,
                            48,
                            1 - splitP2
                          )
                        )}
                        <g transform={`translate(${eoX + 105}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={154} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#FB7185" progress={anim.aftermathT} />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(365, 248)">
                        <GiantHangulSvg text="불" size={182} fill="#E11D48" />
                      </g>
                      <g transform="translate(485, 248)">
                        <GiantHangulSvg text="러" size={182} fill="#E11D48" />
                      </g>
                      <g transform="translate(605, 248)">
                        <GiantHangulSvg text="요" size={172} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 5. 아프다 -> 아파요 (ㅡ탈락: 모음 ㅡ만 따로 떼어 + 아 깜빡 -> ㅡ 탈락 -> 아파요) */}
          {activeKey === '아프다' && (() => {
            const splitP = isBlinkStep ? Math.min(1, blinkPhase / 0.2) : 0;
            const dropP = isBlinkStep && blinkPhase >= 0.54 ? Math.min(1, (blinkPhase - 0.54) / 0.44) : 0;
            const eoX = 935 - endingEnterP * 250 - attachP * 130;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    <g transform="translate(345, 248)">
                      <GiantHangulSvg text="아" size={154} fill="#1E293B" />
                    </g>

                    {!isBlinkStep ? (
                      <g transform="translate(450, 248)">
                        <GiantHangulSvg text="프" size={154} fill="#DC2626" />
                      </g>
                    ) : (
                      <g>
                        {/* Consonant ㅍ steady, shifts toward ㅏ as ㅡ drops */}
                        <g transform={`translate(${450 + dropP * 26}, ${248 - splitP * 34 + dropP * 30})`}>
                          <GiantHangulSvg text="ㅍ" size={130} fill="#DC2626" />
                        </g>
                        {/* Separated vowel ㅡ blinks and drops! */}
                        {dropP < 0.95 &&
                          renderBlinkingGlyph(
                            'ㅡ',
                            450,
                            248 + splitP * 54 + dropP * 105,
                            132,
                            '#0284C7',
                            50,
                            26,
                            1 - dropP
                          )}
                      </g>
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${555 + kickP * 420}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={154} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        {!isBlinkStep ? (
                          <g transform={`translate(${eoX}, ${eoWaitY})`}>
                            <GiantHangulSvg text="아" size={154} fill="#DC2626" />
                          </g>
                        ) : (
                          renderBlinkingGlyph(
                            '아',
                            555 - dropP * 50,
                            248,
                            154,
                            '#DC2626',
                            48,
                            48
                          )
                        )}
                        <g transform={`translate(${eoX + 105}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={154} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#F87171" progress={anim.aftermathT} />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(365, 248)">
                        <GiantHangulSvg text="아" size={172} fill="#1E293B" />
                      </g>
                      <g transform="translate(485, 248)">
                        <GiantHangulSvg text="파" size={184} fill="#DC2626" />
                      </g>
                      <g transform="translate(605, 248)">
                        <GiantHangulSvg text="요" size={172} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 6. 파랗다 -> 파래요 (ㅎ불규칙: 종성 ㅎ 따로 떼어 + 라·아 깜빡 -> 파래요) */}
          {activeKey === '파랗다' && (() => {
            const splitP = isBlinkStep ? Math.min(1, blinkPhase / 0.2) : 0;
            const flyP = isBlinkStep && blinkPhase >= 0.54 ? Math.min(1, (blinkPhase - 0.54) / 0.44) : 0;
            const eoX = 935 - endingEnterP * 250 - attachP * 130;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    <g transform="translate(345, 248)">
                      <GiantHangulSvg text="파" size={154} fill="#1E293B" />
                    </g>

                    {!isBlinkStep ? (
                      <g transform="translate(450, 248)">
                        <GiantHangulSvg text="랗" size={154} fill="#2563EB" />
                      </g>
                    ) : (
                      <g>
                        {/* Top '라' blinks & draws closer to '아' */}
                        {renderBlinkingGlyph(
                          '라',
                          450 + flyP * 38,
                          248 - splitP * 30 + flyP * 28,
                          148,
                          '#2563EB',
                          46,
                          46
                        )}
                        {/* Separated 종성 'ㅎ' blinks and rockets skyward */}
                        {flyP < 0.95 && (
                          <g transform={`rotate(${flyP * 480}, ${450 + flyP * 28}, ${248 + splitP * 76 - flyP * 230})`}>
                            {renderBlinkingGlyph(
                              'ㅎ',
                              450 + flyP * 28,
                              248 + splitP * 76 - flyP * 230,
                              102,
                              '#EA580C',
                              38,
                              36,
                              1 - flyP
                            )}
                          </g>
                        )}
                        {flyP > 0 && flyP < 0.8 && (
                          <g transform="translate(465, 290)">
                            <BluePaintSplashSvg progress={flyP} />
                          </g>
                        )}
                      </g>
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${555 + kickP * 420}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={154} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        {!isBlinkStep ? (
                          <g transform={`translate(${eoX}, ${eoWaitY})`}>
                            <GiantHangulSvg text="아" size={154} fill="#2563EB" />
                          </g>
                        ) : (
                          renderBlinkingGlyph(
                            '아',
                            555 - flyP * 55,
                            248,
                            154,
                            '#2563EB',
                            48,
                            48
                          )
                        )}
                        <g transform={`translate(${eoX + 105}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={154} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#60A5FA" progress={anim.aftermathT} />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(365, 248)">
                        <GiantHangulSvg text="파" size={172} fill="#1E293B" />
                      </g>
                      <g transform="translate(485, 248)">
                        <GiantHangulSvg text="래" size={184} fill="#2563EB" />
                      </g>
                      <g transform="translate(605, 248)">
                        <GiantHangulSvg text="요" size={172} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 7. 만들다 -> 만드세요 (ㄹ탈락: 종성 ㄹ만 따로 떼어 깜빡 -> ㄹ 미끄러져 탈락 -> 만드세요) */}
          {activeKey === '만들다' && (() => {
            const splitP = isBlinkStep ? Math.min(1, blinkPhase / 0.2) : 0;
            const slipP = isBlinkStep && blinkPhase >= 0.54 ? Math.min(1, (blinkPhase - 0.54) / 0.44) : 0;
            const seX = 930 - endingEnterP * 250 - attachP * 130;
            const seWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    <g transform="translate(345, 248)">
                      <GiantHangulSvg text="만" size={146} fill="#1E293B" />
                    </g>

                    {!isBlinkStep ? (
                      <g transform="translate(448, 248)">
                        <GiantHangulSvg text="들" size={146} fill="#1E293B" />
                      </g>
                    ) : (
                      <g>
                        <g transform={`translate(448, ${248 - splitP * 30 + slipP * 28})`}>
                          <GiantHangulSvg text="드" size={144} fill="#7C3AED" />
                        </g>
                        <g transform="translate(432, 355)">
                          <BananaPeelSvg />
                        </g>
                        {slipP < 0.95 && (
                          <g transform={`rotate(${-slipP * 240}, ${448 - slipP * 150}, ${248 + splitP * 74 + Math.sin(slipP * Math.PI) * 18})`}>
                            {renderBlinkingGlyph(
                              'ㄹ',
                              448 - slipP * 150,
                              248 + splitP * 74 + Math.sin(slipP * Math.PI) * 18,
                              102,
                              '#EA580C',
                              36,
                              34,
                              1 - slipP
                            )}
                          </g>
                        )}
                      </g>
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${550 + kickP * 420}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={146} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        <g transform={`translate(${seX}, ${seWaitY})`}>
                          <GiantHangulSvg text="세" size={146} fill="#0F766E" />
                        </g>
                        <g transform={`translate(${seX + 98}, ${seWaitY})`}>
                          <GiantHangulSvg text="요" size={146} fill="#1E293B" />
                        </g>
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(485, 248)">
                      <SparkleBurstSvg color="#A78BFA" progress={anim.aftermathT} />
                    </g>
                    <g transform="translate(425, 355)">
                      <BananaPeelSvg />
                    </g>
                    <g transform={`translate(485, 248) scale(${completePop}) translate(-485, -248)`}>
                      <g transform="translate(335, 248)">
                        <GiantHangulSvg text="만" size={156} fill="#1E293B" />
                      </g>
                      <g transform="translate(435, 248)">
                        <GiantHangulSvg text="드" size={166} fill="#7C3AED" />
                      </g>
                      <g transform="translate(535, 248)">
                        <GiantHangulSvg text="세" size={156} fill="#0F766E" />
                      </g>
                      <g transform="translate(635, 248)">
                        <GiantHangulSvg text="요" size={156} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}

          {/* 8. 하다 -> 해요 (여불규칙: 어간 '하' + 어미 '어→여' 함께 깜빡 -> 해요) */}
          {activeKey === '하다' && (() => {
            const zapped = isBlinkStep && blinkPhase >= 0.42;
            const mergePull = isBlinkStep && blinkPhase >= 0.68 ? (blinkPhase - 0.68) / 0.32 : 0;
            const eoX = 920 - endingEnterP * 250 - attachP * 145;
            const eoWaitY = 248 - Math.sin(endingEnterP * Math.PI) * 28 * (actionT < STEP_3_T ? 1 : 0);

            return (
              <g>
                {currentStep < 5 ? (
                  <g transform={`translate(475, 248) scale(${verbPopScale}) translate(-475, -248)`}>
                    {!isBlinkStep ? (
                      <g transform="translate(395, 248)">
                        <GiantHangulSvg text="하" size={166} fill="#1E293B" />
                      </g>
                    ) : (
                      renderBlinkingGlyph(
                        '하',
                        395 + mergePull * 45,
                        248,
                        166,
                        '#EA580C',
                        50,
                        50
                      )
                    )}

                    {kickP < 0.96 && (
                      <g
                        transform={`translate(${525 + kickP * 440}, ${248 - kickP * 230 + kickP * kickP * 90}) rotate(${kickP * 680})`}
                        opacity={1 - kickP}
                      >
                        <GiantHangulSvg text="다" size={166} fill="#64748B" />
                      </g>
                    )}

                    {actionT >= STEP_2_T && (
                      <g>
                        {!isBlinkStep ? (
                          <g transform={`translate(${eoX}, ${eoWaitY})`}>
                            <GiantHangulSvg text="어" size={166} fill="#EA580C" />
                          </g>
                        ) : (
                          renderBlinkingGlyph(
                            zapped ? '여' : '어',
                            525 - mergePull * 45,
                            248,
                            166,
                            '#EA580C',
                            50,
                            50
                          )
                        )}
                        <g transform={`translate(${eoX + 120 - mergePull * 60}, ${eoWaitY})`}>
                          <GiantHangulSvg text="요" size={166} fill="#1E293B" />
                        </g>
                        {zapped && (
                          <g transform={`translate(460, 224) scale(${1 + Math.sin(actionT * 48) * 0.2})`}>
                            <ElectricZapSvg color="#FACC15" />
                          </g>
                        )}
                      </g>
                    )}

                  </g>
                ) : (
                  <g>
                    <g transform="translate(480, 248)">
                      <SparkleBurstSvg color="#FACC15" progress={anim.aftermathT} />
                    </g>
                    <g transform={`translate(480, 248) scale(${completePop}) translate(-480, -248)`}>
                      <g transform="translate(415, 248)">
                        <GiantHangulSvg text="해" size={188} fill="#EA580C" />
                      </g>
                      <g transform="translate(545, 248)">
                        <GiantHangulSvg text="요" size={178} fill="#1E293B" />
                      </g>
                    </g>
                  </g>
                )}
              </g>
            );
          })()}
        </g>
      )}

      {/* 4. MAIN JOLLAMAN STICK FIGURE */}
      <g
        transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}, 0, 0) scale(${jollaFacing}, 1)`}
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
        {/* Blue paint splash cap on Jollaman for 파랗다 completion! */}
        {activeKey === '파랗다' &&
          ((phase === 'action' && actionT >= STEP_4_T + 0.16) ||
            phase === 'aftermath' ||
            phase === 'reveal') && (
            <g transform="translate(0, -44)">
              <ellipse cx="0" cy="-6" rx="18" ry="8" fill="#2563EB" />
              <circle cx="-12" cy="4" r="5" fill="#3B82F6" />
              <circle cx="14" cy="6" r="4" fill="#60A5FA" />
            </g>
          )}
      </g>
    </JollamanStageShell>
  );
};
