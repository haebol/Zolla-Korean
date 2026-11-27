import { useEffect, useRef, useState, useCallback } from 'react';
import {
  BgmTrackId,
  cancelKoreanSpeech,
  isKoreanSpeechActive,
  onKoreanSpeechComplete,
  playCutePop,
  playSuccessChime,
  prefetchSingleAiSpeech,
  setBgmDucking,
  speakKorean,
  startBgm,
  stopBgm,
} from '../utils/audio';
import { SimPhaseLike, useShortsController } from './useShortsController';
import { useShortsStudio } from '../context/ShortsStudioContext';

export interface JollamanAnimState {
  walkX: number;
  walkDir: 1 | -1;
  walkTime: number;
  worldScrollX: number;
  phaseStartTime: number;
  phaseElapsed: number;
  approachStartX: number;
  objectAppear: number;
  actionT: number;
  aftermathT: number;
  impactTriggered: boolean;
  secondaryTriggered: boolean;
  lastTime: number;
}

export interface ActionStepHelpers {
  audioEnabled: boolean;
  speed: number;
  registerTimer: (timerId: number) => void;
  impactTriggered: boolean;
  secondaryTriggered: boolean;
  markImpact: () => void;
  markSecondary: () => void;
}

export interface UseJollamanStageEngineOptions<T, K extends string> {
  seriesNum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
  seriesTitle: string;
  items: T[];
  audioEnabled?: boolean;
  bgmTrack?: BgmTrackId;
  initialWalkX?: number;
  leftEdgeX?: number;
  rightEdgeX?: number;
  actionSpotX?: number;
  approachDuration?: number;
  scrollSpeedOnApproach?: number;
  aftermathAnimMaxDur?: number;
  alwaysResetWalkX?: boolean;
  playPopOnSelect?: boolean;
  getKey: (item: T) => K;
  getLabel: (item: T) => string;
  getBadge: (item: T) => string;
  getAccentColor: (item: T) => string;
  getCaption: (item: T) => string;
  getSpeakText: (item: T) => string;
  getActionDuration: (item: T) => number;
  getTargetStartX?: (item: T) => number;
  onSelectPreHook?: (item: T, anim: JollamanAnimState, audioEnabled: boolean) => void;
  onStartAction?: (item: T, audioEnabled: boolean, speed: number) => void;
  onActionProgress?: (item: T, t: number, helpers: ActionStepHelpers) => void;
  onAftermathStart?: (item: T, audioEnabled: boolean) => void;
}

export function useJollamanStageEngine<T, K extends string = string>({
  seriesNum,
  seriesTitle,
  items,
  audioEnabled = true,
  bgmTrack,
  initialWalkX = 160,
  leftEdgeX = 95,
  rightEdgeX = 875,
  actionSpotX = 320,
  approachDuration = 0.85,
  scrollSpeedOnApproach = 0,
  aftermathAnimMaxDur = 1.25,
  alwaysResetWalkX = false,
  playPopOnSelect = false,
  getKey,
  getLabel,
  getBadge,
  getAccentColor,
  getCaption,
  getSpeakText,
  getActionDuration,
  getTargetStartX,
  onSelectPreHook,
  onStartAction,
  onActionProgress,
  onAftermathStart,
}: UseJollamanStageEngineOptions<T, K>) {
  const studio = useShortsStudio();
  const [phase, setPhase] = useState<SimPhaseLike>('walking');
  const [selectedItem, setSelectedItem] = useState<T>(items[0]);
  const [learnedKeys, setLearnedKeys] = useState<K[]>([]);
  const [celebrationActive, setCelebrationActive] = useState(false);
  const isPaused = studio.isPaused;
  const bgmEnabled = studio.bgmEnabled;
  const setBgmEnabled = studio.setBgmEnabled;
  const [, setFrameTick] = useState(0);

  const learnedKeysRef = useRef<K[]>(learnedKeys);
  learnedKeysRef.current = learnedKeys;
  const celebratedFullRef = useRef(false);

  const animRef = useRef<JollamanAnimState>({
    walkX: initialWalkX,
    walkDir: 1,
    walkTime: 0,
    worldScrollX: 0,
    phaseStartTime: 0,
    phaseElapsed: 0,
    approachStartX: initialWalkX,
    objectAppear: 0,
    actionT: 0,
    aftermathT: 0,
    impactTriggered: false,
    secondaryTriggered: false,
    lastTime: performance.now(),
  });

  const phaseRef = useRef<SimPhaseLike>(phase);
  phaseRef.current = phase;
  const selectedRef = useRef<T>(selectedItem);
  selectedRef.current = selectedItem;
  const audioRef = useRef<boolean>(audioEnabled);
  audioRef.current = audioEnabled;
  const pausedRef = useRef<boolean>(isPaused);
  pausedRef.current = isPaused;
  const bgmEnabledRef = useRef<boolean>(bgmEnabled);
  bgmEnabledRef.current = bgmEnabled;

  // Always hold latest callbacks cleanly without re-creating RAF loop
  const cbRef = useRef({
    getKey,
    getSpeakText,
    getActionDuration,
    getTargetStartX,
    onSelectPreHook,
    onStartAction,
    onActionProgress,
    onAftermathStart,
  });
  cbRef.current = {
    getKey,
    getSpeakText,
    getActionDuration,
    getTargetStartX,
    onSelectPreHook,
    onStartAction,
    onActionProgress,
    onAftermathStart,
  };

  const timersRef = useRef<number[]>([]);
  const clearAllTimers = useCallback(() => {
    timersRef.current.forEach((id) => window.clearTimeout(id));
    timersRef.current = [];
  }, []);

  const toggleJollaPause = useCallback(() => {
    playCutePop();
    studio.togglePause();
  }, [studio]);

  const triggerCelebration = useCallback(() => {
    // Celebration finale removed in favor of clean continuous looping
  }, []);

  const dismissCelebration = useCallback(() => {
    cancelKoreanSpeech();
    setCelebrationActive(false);
    phaseRef.current = 'walking';
    setPhase('walking');
  }, []);

  const resetToWalking = useCallback(() => {
    clearAllTimers();
    cancelKoreanSpeech();
    pausedRef.current = false;
    studio.setIsPaused(false);
    const anim = animRef.current;
    if (alwaysResetWalkX || anim.walkX < leftEdgeX || anim.walkX > rightEdgeX) {
      anim.walkX = actionSpotX;
      anim.walkDir = 1;
    }
    anim.objectAppear = 0;
    anim.actionT = 0;
    anim.aftermathT = 0;
    anim.phaseElapsed = 0;
    anim.impactTriggered = false;
    anim.secondaryTriggered = false;
    phaseRef.current = 'walking';
    setPhase('walking');
    setCelebrationActive(false);
  }, [clearAllTimers, alwaysResetWalkX, leftEdgeX, rightEdgeX, actionSpotX, studio]);

  const handleItemClick = useCallback(
    (item: T) => {
      clearAllTimers();
      cancelKoreanSpeech();
      setCelebrationActive(false);
      pausedRef.current = false;
      studio.setIsPaused(false);
      setSelectedItem(item);
      selectedRef.current = item;

      const anim = animRef.current;
      if (phaseRef.current === 'reveal' || phaseRef.current === 'aftermath') {
        anim.walkX = Math.min(rightEdgeX, Math.max(leftEdgeX, anim.walkX));
      }
      cbRef.current.onSelectPreHook?.(item, anim, audioRef.current);

      anim.approachStartX = anim.walkX;
      anim.objectAppear = 0;
      anim.actionT = 0;
      anim.aftermathT = 0;
      anim.impactTriggered = false;
      anim.secondaryTriggered = false;
      anim.phaseStartTime = performance.now();
      anim.phaseElapsed = 0;

      phaseRef.current = 'approaching';
      setPhase('approaching');

      if (playPopOnSelect && audioRef.current) {
        playCutePop();
      }
      if (seriesNum === 1 && audioRef.current) {
        prefetchSingleAiSpeech(cbRef.current.getSpeakText(item));
      }
      if (bgmTrack && audioRef.current && bgmEnabledRef.current) {
        startBgm(bgmTrack);
      }
    },
    [clearAllTimers, leftEdgeX, rightEdgeX, playPopOnSelect, bgmTrack, studio, seriesNum]
  );

  // Optional BGM lifecycle + ducking
  useEffect(() => {
    if (!bgmTrack) return;
    if (audioEnabled && bgmEnabled) {
      startBgm(bgmTrack);
    } else {
      stopBgm();
    }
  }, [bgmTrack, audioEnabled, bgmEnabled]);

  useEffect(() => {
    if (!bgmTrack) return;
    setBgmDucking(phase === 'action' || phase === 'reveal');
  }, [bgmTrack, phase]);

  useEffect(() => {
    if (!bgmTrack) return;
    return () => {
      stopBgm();
      setBgmDucking(false);
    };
  }, [bgmTrack]);

  const shorts = useShortsController({
    seriesNum,
    seriesTitle,
    items,
    selectedItem,
    phase,
    celebrationActive,
    actionT: animRef.current.actionT,
    aftermathT: animRef.current.aftermathT,
    getKey,
    getLabel,
    getBadge,
    getAccentColor,
    getCaption,
    getActionDuration,
    onSelectItem: handleItemClick,
    onResetToWalking: resetToWalking,
  });

  const { playbackSpeedRef, aftermathHoldRef } = shorts;
  const effectiveApproachDurRef = useRef(approachDuration);
  effectiveApproachDurRef.current = shorts.quickCutMode
    ? Math.min(approachDuration, 0.42)
    : approachDuration;

  // In single-item playback, automatically close the reveal flashcard 1s after voice finishes and resume walking
  useEffect(() => {
    if (phase !== 'reveal' || shorts.autoplayActive || isPaused) return;

    let cancelled = false;
    let dismissTimer: number | null = null;
    let safetyTimer: number | null = null;

    const scheduleDismiss = () => {
      if (cancelled || dismissTimer !== null) return;
      dismissTimer = window.setTimeout(() => {
        if (cancelled) return;
        resetToWalking();
      }, 1000);
    };

    const unsubSpeech = isKoreanSpeechActive()
      ? onKoreanSpeechComplete(scheduleDismiss)
      : (() => {
          scheduleDismiss();
          return () => {};
        })();

    safetyTimer = window.setTimeout(() => {
      if (!cancelled) {
        resetToWalking();
      }
    }, 9000);

    return () => {
      cancelled = true;
      unsubSpeech();
      if (dismissTimer !== null) window.clearTimeout(dismissTimer);
      if (safetyTimer !== null) window.clearTimeout(safetyTimer);
    };
  }, [phase, shorts.autoplayActive, isPaused, resetToWalking]);

  useEffect(() => {
    let rafId: number;

    const tick = (now: number) => {
      const anim = animRef.current;
      const rawDt = Math.min((now - anim.lastTime) / 1000, 0.05);
      anim.lastTime = now;

      if (pausedRef.current) {
        anim.phaseStartTime += rawDt * 1000;
        rafId = requestAnimationFrame(tick);
        return;
      }

      const speed = playbackSpeedRef.current;
      const dt = rawDt * speed;
      anim.walkTime += dt;

      const currentPhase = phaseRef.current;
      const item = selectedRef.current;

      if (currentPhase === 'walking') {
        anim.walkX += dt * 95 * anim.walkDir;
        if (anim.walkX >= rightEdgeX) {
          anim.walkX = rightEdgeX;
          anim.walkDir = -1;
        } else if (anim.walkX <= leftEdgeX) {
          anim.walkX = leftEdgeX;
          anim.walkDir = 1;
        }
      } else if (currentPhase === 'approaching') {
        anim.phaseElapsed += dt;
        const dur = effectiveApproachDurRef.current;
        const t = Math.min(anim.phaseElapsed / Math.max(0.15, dur), 1);
        const eased = 1 - Math.pow(1 - t, 2.2);

        const targetX = cbRef.current.getTargetStartX
          ? cbRef.current.getTargetStartX(item)
          : actionSpotX;

        if (scrollSpeedOnApproach > 0) {
          anim.worldScrollX += dt * scrollSpeedOnApproach;
        }
        anim.walkX = anim.approachStartX + (targetX - anim.approachStartX) * eased;
        anim.objectAppear = eased;

        if (t >= 1) {
          anim.walkX = targetX;
          anim.objectAppear = 1;
          anim.actionT = 0;
          anim.impactTriggered = false;
          anim.secondaryTriggered = false;
          anim.phaseStartTime = now;
          anim.phaseElapsed = 0;
          phaseRef.current = 'action';
          setPhase('action');
          cbRef.current.onStartAction?.(item, audioRef.current, speed);
        }
      } else if (currentPhase === 'action') {
        anim.phaseElapsed += dt;
        const duration = cbRef.current.getActionDuration(item);
        const t = Math.min(anim.phaseElapsed / duration, 1);
        anim.actionT = t;

        cbRef.current.onActionProgress?.(item, t, {
          audioEnabled: audioRef.current,
          speed,
          registerTimer: (timerId: number) => timersRef.current.push(timerId),
          impactTriggered: anim.impactTriggered,
          secondaryTriggered: anim.secondaryTriggered,
          markImpact: () => {
            anim.impactTriggered = true;
          },
          markSecondary: () => {
            anim.secondaryTriggered = true;
          },
        });

        if (t >= 1) {
          anim.actionT = 1;
          anim.aftermathT = 0;
          anim.phaseStartTime = now;
          anim.phaseElapsed = 0;
          phaseRef.current = 'aftermath';
          setPhase('aftermath');
          cbRef.current.onAftermathStart?.(item, audioRef.current);
        }
      } else if (currentPhase === 'aftermath') {
        anim.phaseElapsed += rawDt;
        const holdSec = aftermathHoldRef.current;
        const animDur = Math.min(aftermathAnimMaxDur, holdSec);
        anim.aftermathT = Math.min(anim.phaseElapsed / Math.max(0.1, animDur), 1);

        if (anim.phaseElapsed >= holdSec) {
          phaseRef.current = 'reveal';
          setPhase('reveal');
          const cur = selectedRef.current;
          const k = cbRef.current.getKey(cur);
          setLearnedKeys((prev) => (prev.includes(k) ? prev : [...prev, k]));

          if (audioRef.current) {
            playSuccessChime();
            speakKorean(cbRef.current.getSpeakText(cur), 0.92, 1.0, undefined, true, {
              allowAiVoice: seriesNum === 1,
            });
          }
        }
      }

      setFrameTick((v) => (v + 1) % 100000);
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafId);
      clearAllTimers();
    };
  }, [
    clearAllTimers,
    playbackSpeedRef,
    aftermathHoldRef,
    leftEdgeX,
    rightEdgeX,
    actionSpotX,
    approachDuration,
    scrollSpeedOnApproach,
    aftermathAnimMaxDur,
  ]);

  const anim = animRef.current;
  const walkCycle = anim.walkTime * 9.5;

  return {
    phase,
    selectedItem,
    learnedKeys,
    celebrationActive,
    isPaused,
    bgmEnabled,
    setBgmEnabled,
    anim,
    walkCycle,
    shorts: {
      ...shorts,
      celebrationActive,
      triggerCelebration,
      dismissCelebration,
      isPaused,
      togglePause: toggleJollaPause,
    },
    toggleJollaPause,
    resetToWalking,
    handleItemClick,
    triggerCelebration,
    dismissCelebration,
  };
}
