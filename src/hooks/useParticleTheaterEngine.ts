import { useCallback, useEffect, useRef, useState } from 'react';
import {
  BgmTrackId,
  cancelKoreanSpeech,
  isKoreanSpeechActive,
  onKoreanSpeechComplete,
  playCutePop,
  playParticleV2Sfx,
  speakKorean,
  startBgm,
  stopBgm,
} from '../utils/audio';
import {
  getShortsStageAspectRatio,
  resolveSelectedKeys,
  useShortsStudio,
} from '../context/ShortsStudioContext';
import { romanizeKorean } from '../utils/koreanRomanizer';

export type ParticleTheaterBeat =
  | 'decision'
  | 'resolve'
  | 'wrongAction'
  | 'lesson'
  | 'rightPrimary'
  | 'rightSecondary'
  | 'ruleSummary'
  | 'reveal';

export interface ParticleTheaterEpisodeBase {
  id: string;
  epNum: number;
  title: string;
  tabLabel: string;
  badgeLabel: string;
  promptBefore: string;
  promptAfter: string;
  leftOption: string;
  rightOption: string;
  correctSide: 'left' | 'right';
  completedSentence: string;
  wrongSentenceTag: string;
  wrongHookTag?: string;
  wrongHeadline: string;
  wrongCaption: string;
  rightHookTag: string;
  englishMeaning?: string;
  holdingBouquet?: boolean;
  tapFoot?: boolean;
}

export interface UseParticleTheaterEngineOptions<T extends ParticleTheaterEpisodeBase> {
  seriesNum: 12 | 13 | 14 | 15 | 16;
  seriesTitle: string;
  episodes: T[];
  audioEnabled?: boolean;
  bgmTrack?: BgmTrackId;
  cutSequence?: ParticleTheaterBeat[];
  skipResolveBeat?: boolean;
  suppressDefaultAudio?: boolean;
  decisionAutoplayDuration?: number;
  resolveDuration?: number;
  getWrongDuration: (ep: T) => number;
  lessonDuration?: number;
  getRightPrimaryDuration: (ep: T) => number;
  getRightSecondaryDuration?: (ep: T) => number;
  ruleSummaryDuration?: number;
  revealAutoplayDuration?: number;
  getTotalCatalogSec?: (ep: T) => number;
  onBeatEnter?: (
    beat: ParticleTheaterBeat,
    ep: T,
    chosenSide: 'left' | 'right',
    userInitiated: boolean
  ) => void;
  onBeatTick?: (
    beat: ParticleTheaterBeat,
    prog: number,
    ep: T,
    sfxFlags: Record<string, boolean>,
    audioEnabled: boolean
  ) => void;
}

const DEFAULT_CUT_SEQUENCE: ParticleTheaterBeat[] = [
  'decision',
  'resolve',
  'wrongAction',
  'lesson',
  'rightPrimary',
  'reveal',
];

export function useParticleTheaterEngine<T extends ParticleTheaterEpisodeBase>({
  seriesNum,
  seriesTitle,
  episodes,
  audioEnabled = true,
  bgmTrack = 'memeShorts',
  cutSequence = DEFAULT_CUT_SEQUENCE,
  skipResolveBeat = false,
  suppressDefaultAudio = false,
  decisionAutoplayDuration = 999999,
  resolveDuration = 1.1,
  getWrongDuration,
  lessonDuration = 2.55,
  getRightPrimaryDuration,
  getRightSecondaryDuration,
  ruleSummaryDuration = 3.0,
  revealAutoplayDuration = 2.3,
  getTotalCatalogSec,
  onBeatEnter,
  onBeatTick,
}: UseParticleTheaterEngineOptions<T>) {
  const shorts = useShortsStudio();
  const [episodeIdx, setEpisodeIdx] = useState(0);
  const [beat, setBeat] = useState<ParticleTheaterBeat>('decision');
  const [beatProgress, setBeatProgress] = useState(0);
  const [walkTime, setWalkTime] = useState(0);
  const [hoverSide, setHoverSide] = useState<'left' | 'right' | null>(null);
  const [selectedSide, setSelectedSide] = useState<'left' | 'right' | null>(null);
  const [clearedEpisodes, setClearedEpisodes] = useState<string[]>([]);

  const bgmEnabled = shorts.bgmEnabled;
  const setBgmEnabled = shorts.setBgmEnabled;

  const episode = episodes[episodeIdx] ?? episodes[0];
  const episodeRef = useRef(episode);
  const episodeIdxRef = useRef(episodeIdx);
  const beatRef = useRef<ParticleTheaterBeat>('decision');
  const chosenSideRef = useRef<'left' | 'right'>('left');
  const beatElapsedRef = useRef(0);
  const lastRafRef = useRef<number | null>(null);
  const autoplayRef = useRef(false);
  const audioRef = useRef(audioEnabled);
  const speedRef = useRef(shorts.playbackSpeed);
  const pausedRef = useRef(shorts.isPaused);
  pausedRef.current = shorts.isPaused;
  const infiniteLoopRef = useRef(shorts.infiniteLoop);
  infiniteLoopRef.current = shorts.infiniteLoop;
  const sfxFlagsRef = useRef<Record<string, boolean>>({});
  const cutSeqRef = useRef(cutSequence);
  cutSeqRef.current = cutSequence;

  const callbacksRef = useRef({
    getWrongDuration,
    getRightPrimaryDuration,
    getRightSecondaryDuration,
    onBeatEnter,
    onBeatTick,
  });
  callbacksRef.current = {
    getWrongDuration,
    getRightPrimaryDuration,
    getRightSecondaryDuration,
    onBeatEnter,
    onBeatTick,
  };

  const allEpKeys: string[] = episodes.map((ep) => ep.id);
  const selectedEpKeys = resolveSelectedKeys(
    allEpKeys,
    shorts.rangeMode,
    shorts.customSelectedKeys,
    episode.id
  );
  const effectiveEpIndices = selectedEpKeys
    .map((k) => allEpKeys.indexOf(k))
    .filter((i) => i >= 0);
  const effectiveEpIndicesRef = useRef(effectiveEpIndices);
  effectiveEpIndicesRef.current = effectiveEpIndices.length > 0 ? effectiveEpIndices : [0];
  const autoPosRef = useRef(0);

  // Sync episodes into ShortsStudio catalog on mount
  useEffect(() => {
    shorts.setActiveCatalog(
      episodes.map((ep) => ({
        key: ep.id,
        label: `EP.${ep.epNum} ${ep.title}`,
        badge: ep.badgeLabel,
        caption: ep.completedSentence,
        romanized: ep.correctSide === 'left' ? ep.leftOption : ep.rightOption,
        actionSec: getTotalCatalogSec ? getTotalCatalogSec(ep) : 9.8,
      }))
    );
    shorts.setCustomSelectedKeys((prev) => {
      const valid = prev.filter((k) => allEpKeys.includes(k));
      return valid.length > 0 ? valid : allEpKeys;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    episodeRef.current = episode;
    episodeIdxRef.current = episodeIdx;
  }, [episode, episodeIdx]);

  useEffect(() => {
    audioRef.current = audioEnabled;
  }, [audioEnabled]);

  useEffect(() => {
    speedRef.current = shorts.playbackSpeed;
  }, [shorts.playbackSpeed]);

  useEffect(() => {
    if (audioEnabled && bgmEnabled && beat !== 'decision') {
      startBgm(bgmTrack);
    } else if (!audioEnabled || !bgmEnabled) {
      stopBgm();
    }
    return () => {
      stopBgm();
    };
  }, [audioEnabled, bgmEnabled, beat, bgmTrack]);

  useEffect(() => {
    return () => {
      cancelKoreanSpeech();
      shorts.replayHandlerRef.current = null;
      shorts.stopAutoplay();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const enterBeat = useCallback(
    (nextBeat: ParticleTheaterBeat, epOverride?: T, userInitiated = true) => {
      const ep = epOverride ?? episodeRef.current;
      const wrongSide: 'left' | 'right' = ep.correctSide === 'left' ? 'right' : 'left';

      beatRef.current = nextBeat;
      beatElapsedRef.current = 0;
      sfxFlagsRef.current = {};
      setBeat(nextBeat);
      setBeatProgress(0);

      if (nextBeat === 'decision') {
        setSelectedSide(null);
      } else if (nextBeat === 'resolve') {
        setSelectedSide(chosenSideRef.current);
      } else if (nextBeat === 'wrongAction' || nextBeat === 'lesson') {
        chosenSideRef.current = wrongSide;
        setSelectedSide(wrongSide);
      } else if (
        nextBeat === 'rightPrimary' ||
        nextBeat === 'rightSecondary' ||
        nextBeat === 'ruleSummary' ||
        nextBeat === 'reveal'
      ) {
        chosenSideRef.current = ep.correctSide;
        setSelectedSide(ep.correctSide);
      }

      if (nextBeat === 'reveal' || nextBeat === 'ruleSummary') {
        setClearedEpisodes((prev) => (prev.includes(ep.id) ? prev : [...prev, ep.id]));
      }

      if (!audioRef.current) return;

      if (!suppressDefaultAudio) {
        if (nextBeat === 'decision') {
          playParticleV2Sfx('decisionSuspense');
        } else if (nextBeat === 'resolve') {
          playParticleV2Sfx('decisionResolve');
          speakKorean('그래, 결심했어!', 1.08);
        } else if (nextBeat === 'wrongAction') {
          playParticleV2Sfx('decisionSuspense');
        } else if (nextBeat === 'lesson') {
          playParticleV2Sfx('wrongBuzzer');
        }
      }

      callbacksRef.current.onBeatEnter?.(nextBeat, ep, chosenSideRef.current, userInitiated);
    },
    [suppressDefaultAudio]
  );

  // Sync single-item selection from ShortsStudioToolbar
  const prevSingleEpKeyRef = useRef<string | undefined>(shorts.customSelectedKeys[0]);
  useEffect(() => {
    const picked = shorts.customSelectedKeys[0];
    const changed = picked !== prevSingleEpKeyRef.current;
    prevSingleEpKeyRef.current = picked;
    if (shorts.rangeMode === 'single' && changed && picked && !shorts.autoplayActive) {
      const idx = allEpKeys.indexOf(picked);
      if (idx >= 0 && idx !== episodeIdxRef.current) {
        setEpisodeIdx(idx);
        episodeIdxRef.current = idx;
        episodeRef.current = episodes[idx];
        enterBeat('decision', episodes[idx], true);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shorts.rangeMode, shorts.customSelectedKeys, shorts.autoplayActive]);

  const handleSelectEpisode = useCallback(
    (idx: number) => {
      playCutePop();
      cancelKoreanSpeech();
      autoplayRef.current = false;
      shorts.stopAutoplay();
      setEpisodeIdx(idx);
      episodeIdxRef.current = idx;
      episodeRef.current = episodes[idx];
      enterBeat('decision', episodes[idx], true);
    },
    [enterBeat, episodes, shorts]
  );

  const handleSelectSide = useCallback(
    (side: 'left' | 'right') => {
      playCutePop();
      cancelKoreanSpeech();
      autoplayRef.current = false;
      shorts.stopAutoplay();
      chosenSideRef.current = side;
      if (bgmEnabled && audioRef.current) {
        startBgm(bgmTrack);
      }
      if (skipResolveBeat) {
        const ep = episodeRef.current;
        enterBeat(side === ep.correctSide ? 'rightPrimary' : 'wrongAction', ep, true);
      } else {
        enterBeat('resolve', undefined, true);
      }
    },
    [bgmEnabled, bgmTrack, enterBeat, shorts, skipResolveBeat]
  );

  const handleCloseReveal = useCallback(() => {
    playCutePop();
    cancelKoreanSpeech();
    pausedRef.current = false;
    shorts.setIsPaused(false);
    autoplayRef.current = false;
    shorts.stopAutoplay();
    enterBeat('decision', undefined, false);
  }, [enterBeat, shorts]);

  const handlePrevCut = useCallback(() => {
    playCutePop();
    cancelKoreanSpeech();
    autoplayRef.current = false;
    shorts.stopAutoplay();

    const seq = cutSeqRef.current;
    const curPos = seq.indexOf(beatRef.current);
    if (curPos > 0) {
      enterBeat(seq[curPos - 1], episodeRef.current, true);
    } else {
      const prevIdx = (episodeIdxRef.current - 1 + episodes.length) % episodes.length;
      setEpisodeIdx(prevIdx);
      episodeIdxRef.current = prevIdx;
      const prevEp = episodes[prevIdx];
      episodeRef.current = prevEp;
      enterBeat(seq[seq.length - 1] ?? 'decision', prevEp, true);
    }
  }, [enterBeat, episodes, shorts]);

  const handleNextCut = useCallback(() => {
    playCutePop();
    cancelKoreanSpeech();
    autoplayRef.current = false;
    shorts.stopAutoplay();

    const seq = cutSeqRef.current;
    const curPos = seq.indexOf(beatRef.current);
    if (curPos >= 0 && curPos + 1 < seq.length) {
      enterBeat(seq[curPos + 1], episodeRef.current, true);
    } else {
      const nextIdx = (episodeIdxRef.current + 1) % episodes.length;
      setEpisodeIdx(nextIdx);
      episodeIdxRef.current = nextIdx;
      const nextEp = episodes[nextIdx];
      episodeRef.current = nextEp;
      enterBeat(seq[0] ?? 'decision', nextEp, true);
    }
  }, [enterBeat, episodes, shorts]);

  const startRangePlayback = useCallback(() => {
    autoPosRef.current = 0;
    const firstIdx = effectiveEpIndicesRef.current[0] ?? 0;
    autoplayRef.current = true;
    shorts.setAutoplayActive(true);
    setEpisodeIdx(firstIdx);
    episodeIdxRef.current = firstIdx;
    const firstEp = episodes[firstIdx];
    episodeRef.current = firstEp;
    // Start with wrong-choice trap so learners see 1 -> 2 -> 3 -> 4 -> 5 smoothly
    chosenSideRef.current = firstEp.correctSide === 'left' ? 'right' : 'left';
    if (bgmEnabled && audioRef.current) {
      startBgm(bgmTrack);
    }
    if (skipResolveBeat && decisionAutoplayDuration < 99999) {
      enterBeat('decision', firstEp, true);
    } else {
      enterBeat('resolve', firstEp, true);
    }
  }, [
    bgmEnabled,
    bgmTrack,
    decisionAutoplayDuration,
    enterBeat,
    episodes,
    shorts,
    skipResolveBeat,
  ]);

  useEffect(() => {
    shorts.replayHandlerRef.current = () => {
      cancelKoreanSpeech();
      startRangePlayback();
    };
    return () => {
      shorts.replayHandlerRef.current = null;
    };
  }, [shorts.replayHandlerRef, startRangePlayback]);

  const handleStartAutoplay = useCallback(() => {
    playCutePop();
    shorts.startAutoplay();
  }, [shorts]);

  const handleStopAutoplay = useCallback(() => {
    playCutePop();
    autoplayRef.current = false;
    shorts.stopAutoplay();
    cancelKoreanSpeech();
    enterBeat('decision', undefined, false);
  }, [enterBeat, shorts]);

  const prevTriggerTickRef = useRef(shorts.autoplayTriggerTick);
  useEffect(() => {
    const tickChanged = prevTriggerTickRef.current !== shorts.autoplayTriggerTick;
    prevTriggerTickRef.current = shorts.autoplayTriggerTick;
    if (shorts.autoplayActive && (!autoplayRef.current || tickChanged)) {
      startRangePlayback();
    } else if (!shorts.autoplayActive && autoplayRef.current) {
      autoplayRef.current = false;
    }
  }, [shorts.autoplayActive, shorts.autoplayTriggerTick, startRangePlayback]);

  // Sync ShortsStudio metadata cleanly across all beats
  useEffect(() => {
    const theatreTitle = `${episode.leftOption} vs ${episode.rightOption}`;
    const chosenParticle =
      chosenSideRef.current === 'left' ? episode.leftOption : episode.rightOption;

    let hookTag = theatreTitle;
    let label = `${episode.leftOption} vs ${episode.rightOption}`;
    let caption = `${episode.promptBefore} [ ? ] ${episode.promptAfter}`;
    let accent = '#2563EB';
    let revealReady = false;

    if (beat === 'resolve') {
      hookTag = theatreTitle;
      label = `[${chosenParticle}] Go!`;
      caption = `그래, 결심했어! [${chosenParticle}]`;
      accent = '#EA580C';
    } else if (beat === 'wrongAction') {
      hookTag = episode.wrongHookTag ?? 'Oops!';
      label = episode.wrongHeadline;
      caption = episode.wrongCaption;
      accent = '#E11D48';
      revealReady = true;
    } else if (beat === 'lesson') {
      hookTag = `🔍 ${episode.wrongHeadline}`;
      label = episode.wrongHeadline;
      caption = episode.wrongCaption;
      accent = '#DC2626';
      revealReady = true;
    } else if (
      beat === 'rightPrimary' ||
      beat === 'rightSecondary' ||
      beat === 'ruleSummary' ||
      beat === 'reveal'
    ) {
      hookTag = episode.rightHookTag;
      label = episode.completedSentence;
      caption = episode.englishMeaning ?? episode.completedSentence;
      accent = '#059669';
      revealReady = true;
    }

    const relIdx = effectiveEpIndices.indexOf(episodeIdx);
    shorts.setActiveMeta({
      seriesNum,
      seriesTitle,
      itemKey: `${episode.promptBefore} □ ${episode.promptAfter}`,
      itemLabel: label,
      itemBadge: '',
      caption,
      accentColor: accent,
      partIndex: relIdx >= 0 ? relIdx + 1 : episode.epNum,
      partTotal: effectiveEpIndices.length || episodes.length,
      itemKeys: selectedEpKeys,
      romanized: romanizeKorean(episode.completedSentence),
      englishBadge: episode.englishMeaning ?? episode.badgeLabel,
      viralHookTag: hookTag,
      viralHookQuestion: caption,
      viralHookEn: episode.englishMeaning ?? '',
      revealReady,
      isRevealing: beat === 'reveal' || beat === 'ruleSummary',
      celebrationActive: false,
      minimalShortsMode: true,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [beat, episode, selectedEpKeys.join(',')]);

  // Unified RAF loop
  useEffect(() => {
    let rafId: number;
    lastRafRef.current = null;

    const getDurationForBeat = (b: ParticleTheaterBeat, ep: T): number => {
      switch (b) {
        case 'decision':
          return autoplayRef.current ? decisionAutoplayDuration : 999999;
        case 'resolve':
          return resolveDuration;
        case 'wrongAction':
          return callbacksRef.current.getWrongDuration(ep);
        case 'lesson':
          return lessonDuration;
        case 'rightPrimary':
          return callbacksRef.current.getRightPrimaryDuration(ep);
        case 'rightSecondary':
          return callbacksRef.current.getRightSecondaryDuration?.(ep) ?? 0;
        case 'ruleSummary':
          return autoplayRef.current ? ruleSummaryDuration : 999999;
        case 'reveal':
          return autoplayRef.current ? revealAutoplayDuration : 999999;
      }
    };

    const advanceEpisodeInAutoplay = () => {
      if (autoplayRef.current) {
        const idxList = effectiveEpIndicesRef.current;
        const nextPos = autoPosRef.current + 1;
        if (nextPos < idxList.length || infiniteLoopRef.current) {
          const targetPos = nextPos < idxList.length ? nextPos : 0;
          const nextIdx = idxList[targetPos] ?? 0;
          const nextEp = episodes[nextIdx];
          autoPosRef.current = targetPos;
          setEpisodeIdx(nextIdx);
          episodeIdxRef.current = nextIdx;
          episodeRef.current = nextEp;
          chosenSideRef.current = nextEp.correctSide === 'left' ? 'right' : 'left';
          if (skipResolveBeat && decisionAutoplayDuration < 99999) {
            enterBeat('decision', nextEp, true);
          } else {
            enterBeat('resolve', nextEp, true);
          }
        } else {
          autoplayRef.current = false;
          shorts.stopAutoplay();
          enterBeat('decision', undefined, false);
        }
      } else {
        enterBeat('decision', undefined, false);
      }
    };

    const advanceAfterBeat = (current: ParticleTheaterBeat) => {
      const ep = episodeRef.current;
      const seq = cutSeqRef.current;
      switch (current) {
        case 'decision':
          if (autoplayRef.current) {
            chosenSideRef.current = ep.correctSide === 'left' ? 'right' : 'left';
            enterBeat('wrongAction', ep, true);
          }
          break;
        case 'resolve':
          if (chosenSideRef.current === ep.correctSide) {
            enterBeat('rightPrimary', ep, true);
          } else {
            enterBeat('wrongAction', ep, true);
          }
          break;
        case 'wrongAction':
          enterBeat('lesson', ep, true);
          break;
        case 'lesson':
          if (autoplayRef.current) {
            chosenSideRef.current = ep.correctSide;
            enterBeat('rightPrimary', ep, true);
          } else {
            enterBeat('decision', ep, false);
          }
          break;
        case 'rightPrimary': {
          const secDur = callbacksRef.current.getRightSecondaryDuration?.(ep) ?? 0;
          if (secDur > 0 && seq.includes('rightSecondary')) {
            enterBeat('rightSecondary', ep, true);
          } else if (seq.includes('ruleSummary')) {
            enterBeat('ruleSummary', ep, true);
          } else {
            enterBeat('reveal', ep, true);
          }
          break;
        }
        case 'rightSecondary':
          if (seq.includes('ruleSummary')) {
            enterBeat('ruleSummary', ep, true);
          } else {
            enterBeat('reveal', ep, true);
          }
          break;
        case 'ruleSummary':
        case 'reveal':
          advanceEpisodeInAutoplay();
          break;
      }
    };

    const tick = (now: number) => {
      if (lastRafRef.current === null) {
        lastRafRef.current = now;
      }
      const rawDt = Math.min(0.05, (now - lastRafRef.current) / 1000);
      lastRafRef.current = now;
      if (pausedRef.current) {
        rafId = requestAnimationFrame(tick);
        return;
      }
      const dt = rawDt * speedRef.current;

      setWalkTime((prev) => prev + dt);

      const curBeat = beatRef.current;
      const ep = episodeRef.current;
      const dur = getDurationForBeat(curBeat, ep);
      const isTimed =
        ((curBeat !== 'decision' && curBeat !== 'reveal' && curBeat !== 'ruleSummary') ||
          autoplayRef.current) &&
        dur < 99999;

      if (isTimed) {
        beatElapsedRef.current += dt;
        const prog = Math.min(1, beatElapsedRef.current / dur);
        setBeatProgress(prog);

        callbacksRef.current.onBeatTick?.(curBeat, prog, ep, sfxFlagsRef.current, audioRef.current);

        if (prog >= 1) {
          if (isKoreanSpeechActive() && !sfxFlagsRef.current.waitingSpeech) {
            sfxFlagsRef.current.waitingSpeech = true;
            let done = false;
            const finishWait = () => {
              if (done) return;
              done = true;
              window.clearTimeout(fallbackTimer);
              unsub();
              if (beatRef.current === curBeat) {
                advanceAfterBeat(curBeat);
              }
            };
            const unsub = onKoreanSpeechComplete(finishWait);
            const fallbackTimer = window.setTimeout(finishWait, 4200);
          } else if (!isKoreanSpeechActive()) {
            advanceAfterBeat(curBeat);
          }
        }
      }

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [
    decisionAutoplayDuration,
    enterBeat,
    episodes,
    lessonDuration,
    resolveDuration,
    revealAutoplayDuration,
    ruleSummaryDuration,
    shorts,
    skipResolveBeat,
  ]);

  // In single-episode playback, auto-dismiss reveal flashcard 1s after voice completes
  useEffect(() => {
    if (beat !== 'reveal' || shorts.autoplayActive || shorts.isPaused) return;

    let cancelled = false;
    let dismissTimer: number | null = null;
    let safetyTimer: number | null = null;

    const scheduleDismiss = () => {
      if (cancelled || dismissTimer !== null) return;
      dismissTimer = window.setTimeout(() => {
        if (cancelled) return;
        enterBeat('decision', undefined, false);
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
        enterBeat('decision', undefined, false);
      }
    }, 9000);

    return () => {
      cancelled = true;
      unsubSpeech();
      if (dismissTimer !== null) window.clearTimeout(dismissTimer);
      if (safetyTimer !== null) window.clearTimeout(safetyTimer);
    };
  }, [beat, shorts.autoplayActive, shorts.isPaused, enterBeat]);

  const getCameraViewBox = useCallback(
    (anchorX = 500): string => {
      if (!shorts.shortsAspect) return '0 -51 1000 562.5';

      const z = Math.max(0.7, Math.min(1.8, shorts.cameraZoom));
      const frameAspect = getShortsStageAspectRatio(z, shorts.stageAspectPreset);
      const targetH = z < 1.0 ? 460 : Math.max(280, 460 / z);
      const targetW = Math.min(1000, targetH * frameAspect);
      const clampedAnchorX = anchorX + shorts.cameraPanOffset;

      const x = Math.max(0, Math.min(1000 - targetW, clampedAnchorX - targetW / 2));
      const y = 230 - targetH / 2;
      return `${x.toFixed(1)} ${y.toFixed(1)} ${targetW.toFixed(1)} ${targetH.toFixed(1)}`;
    },
    [shorts.cameraPanOffset, shorts.cameraZoom, shorts.shortsAspect, shorts.stageAspectPreset]
  );

  const cutIdx = Math.max(0, cutSequence.indexOf(beat));

  return {
    shorts,
    episode,
    episodeIdx,
    beat,
    beatProgress,
    walkTime,
    hoverSide,
    setHoverSide,
    selectedSide,
    chosenSideRef,
    clearedEpisodes,
    bgmEnabled,
    setBgmEnabled,
    cutNumber: cutIdx + 1,
    totalCuts: cutSequence.length,
    handleSelectEpisode,
    handleSelectSide,
    handleCloseReveal,
    handlePrevCut,
    handleNextCut,
    handleStartAutoplay,
    handleStopAutoplay,
    getCameraViewBox,
  };
}
