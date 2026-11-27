import { useEffect, useRef, useCallback, useMemo } from 'react';
import { tStageSummary } from '../utils/i18nSlot';
import {
  getShortsBaseRatio,
  getShortsStageAspectRatio,
  resolveSelectedKeys,
  StudioCatalogItem,
  useShortsStudio,
} from '../context/ShortsStudioContext';
import {
  buildComicBubbleLine,
  buildViralHookCopy,
  extractPronunciationTarget,
  romanizeKorean,
  translateBadgeToEnglish,
} from '../utils/koreanRomanizer';
import { isKoreanSpeechActive, onKoreanSpeechComplete } from '../utils/audio';

export type SimPhaseLike = 'walking' | 'approaching' | 'action' | 'aftermath' | 'reveal';

export interface UseShortsControllerOptions<T> {
  seriesNum: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
  seriesTitle: string;
  items: T[];
  selectedItem: T;
  phase: SimPhaseLike;
  celebrationActive?: boolean;
  actionT?: number;
  aftermathT?: number;
  getKey: (item: T) => string;
  getLabel: (item: T) => string;
  getBadge: (item: T) => string;
  getAccentColor: (item: T) => string;
  getCaption: (item: T) => string;
  getActionDuration?: (item: T) => number;
  onSelectItem: (item: T) => void;
  onResetToWalking: () => void;
  onAutoplayComplete?: () => void;
}

export function useShortsController<T>({
  seriesNum,
  seriesTitle,
  items,
  selectedItem,
  phase,
  celebrationActive = false,
  actionT = 0,
  aftermathT = 0,
  getKey,
  getLabel,
  getBadge,
  getAccentColor,
  getCaption,
  getActionDuration,
  onSelectItem,
  onResetToWalking,
  onAutoplayComplete,
}: UseShortsControllerOptions<T>) {
  const studio = useShortsStudio();
  const {
    shortsAspect,
    stageAspectPreset,
    autoplayActive,
    setAutoplayActive,
    startAutoplay,
    stopAutoplay,
    autoplayTriggerTick,
    isPaused,
    togglePause,
    introHookActive,
    rangeMode,
    customSelectedKeys,
    setCustomSelectedKeys,
    setActiveCatalog,
    replayHandlerRef,
    cameraMode,
    cameraZoom,
    cameraPanOffset,
    hideSkyTokens,
    cleanRecordMode,
    playbackSpeed,
    aftermathHoldSec,
    revealHoldSec,
    viralHookEnabled,
    comicBubbleEnabled,
    quickCutMode,
    infiniteLoop,
    setActiveMeta,
  } = studio;

  const infiniteLoopRef = useRef(infiniteLoop);
  infiniteLoopRef.current = infiniteLoop;

  const playbackSpeedRef = useRef(playbackSpeed);
  playbackSpeedRef.current = playbackSpeed;
  const aftermathHoldRef = useRef(aftermathHoldSec);
  aftermathHoldRef.current = aftermathHoldSec;

  const getKeyRef = useRef(getKey);
  getKeyRef.current = getKey;
  const getLabelRef = useRef(getLabel);
  getLabelRef.current = getLabel;
  const getBadgeRef = useRef(getBadge);
  getBadgeRef.current = getBadge;
  const getAccentRef = useRef(getAccentColor);
  getAccentRef.current = getAccentColor;
  const getCaptionRef = useRef(getCaption);
  getCaptionRef.current = getCaption;
  const getActionDurationRef = useRef(getActionDuration);
  getActionDurationRef.current = getActionDuration;

  const allKeys = useMemo(() => items.map((it) => getKeyRef.current(it)), [items]);
  const allKeysSig = allKeys.join('|');
  const currentKey = getKey(selectedItem);
  const currentKeyRef = useRef(currentKey);
  currentKeyRef.current = currentKey;

  // Push full series catalog to Studio Context whenever seriesNum or item list changes
  useEffect(() => {
    const catalog: StudioCatalogItem[] = items.map((it) => {
      const k = getKeyRef.current(it);
      const lbl = getLabelRef.current(it);
      const badge = getBadgeRef.current(it);
      const caption = tStageSummary(seriesNum, k, getCaptionRef.current(it));
      const target = extractPronunciationTarget(k, lbl, it);
      return {
        key: k,
        label: lbl,
        badge,
        caption,
        romanized: romanizeKorean(target),
        actionSec: getActionDurationRef.current ? getActionDurationRef.current(it) : 2.1,
      };
    });
    setActiveCatalog(catalog);

    // Ensure customSelectedKeys always holds valid keys when switching series tabs
    setCustomSelectedKeys((prev) => {
      const valid = prev.filter((k) => allKeys.includes(k));
      if (valid.length > 0) return valid;
      return allKeys.slice(0, Math.min(3, allKeys.length));
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [seriesNum, allKeysSig]);

  const effectiveKeys = useMemo(
    () => resolveSelectedKeys(allKeys, rangeMode, customSelectedKeys, currentKey),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [allKeysSig, rangeMode, customSelectedKeys, currentKey]
  );

  const effectiveIndices = useMemo(() => {
    const indices: number[] = [];
    effectiveKeys.forEach((k) => {
      const idx = allKeys.indexOf(k);
      if (idx >= 0) indices.push(idx);
    });
    return indices.length > 0 ? indices : items.length > 0 ? [0] : [];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [effectiveKeys, allKeysSig, items.length]);

  const effectiveIndicesRef = useRef(effectiveIndices);
  effectiveIndicesRef.current = effectiveIndices;

  const onSelectRef = useRef(onSelectItem);
  onSelectRef.current = onSelectItem;
  const onResetRef = useRef(onResetToWalking);
  onResetRef.current = onResetToWalking;
  const onAutoplayCompleteRef = useRef(onAutoplayComplete);
  onAutoplayCompleteRef.current = onAutoplayComplete;
  const itemsRef = useRef(items);
  itemsRef.current = items;

  const autoPosRef = useRef<number>(0);
  const prevAutoplayRef = useRef<boolean>(false);
  const revealAdvanceTimerRef = useRef<number | null>(null);

  const clearAdvanceTimer = useCallback(() => {
    if (revealAdvanceTimerRef.current !== null) {
      window.clearTimeout(revealAdvanceTimerRef.current);
      revealAdvanceTimerRef.current = null;
    }
  }, []);

  // Register deterministic range replay handler for Clean Recording 3-2-1 countdown & Tap Replay
  useEffect(() => {
    replayHandlerRef.current = () => {
      clearAdvanceTimer();
      const firstIdx = effectiveIndicesRef.current[0] ?? 0;
      autoPosRef.current = 0;
      setAutoplayActive(true);
      if (itemsRef.current[firstIdx]) {
        onSelectRef.current(itemsRef.current[firstIdx]);
      }
    };
    return () => {
      replayHandlerRef.current = null;
    };
  }, [clearAdvanceTimer, replayHandlerRef, setAutoplayActive]);

  // Quantized discrete stages so context updates only ~4-6 times per item (never 60fps!)
  const revealReady =
    phase === 'aftermath' ||
    phase === 'reveal' ||
    (phase === 'action' && actionT >= 0.65);

  const bubbleStageBucket =
    phase !== 'action'
      ? phase
      : actionT < 0.34
      ? 'action_0'
      : actionT < 0.72
      ? 'action_1'
      : 'action_2';

  const currentLabel = getLabel(selectedItem);
  const currentBadge = getBadge(selectedItem);
  const hookCopy = buildViralHookCopy(seriesNum, currentKey, currentBadge);
  const pronTarget = extractPronunciationTarget(currentKey, currentLabel, selectedItem);
  const romanized = romanizeKorean(pronTarget);
  const englishBadge = translateBadgeToEnglish(currentBadge);
  const isSimpleWhiteSeries2 = shortsAspect && studio.simpleWhiteShorts;
  const comicBubbleText =
    shortsAspect && comicBubbleEnabled && !(isSimpleWhiteSeries2 && phase === 'aftermath')
      ? buildComicBubbleLine(selectedItem, phase, actionT)
      : '';
  const isHookWindow =
    shortsAspect &&
    viralHookEnabled &&
    (phase === 'approaching' || (phase === 'action' && actionT < 0.2));

  // Sync metadata to Shorts Studio header & bottom caption bar (via Korean fallback + i18n slot)
  useEffect(() => {
    const caption = tStageSummary(seriesNum, currentKey, getCaptionRef.current(selectedItem));
    const sliceLen = Math.max(1, effectiveKeys.length);
    const relIdx = effectiveKeys.indexOf(currentKey);
    const relPos = relIdx >= 0 ? relIdx + 1 : 1;

    setActiveMeta({
      seriesNum,
      seriesTitle,
      itemKey: currentKey,
      itemLabel: getLabelRef.current(selectedItem),
      itemBadge: currentBadge,
      caption,
      accentColor: getAccentRef.current(selectedItem),
      partIndex: relPos,
      partTotal: sliceLen,
      itemKeys: effectiveKeys,
      romanized,
      englishBadge,
      viralHookTag: hookCopy.tag,
      viralHookQuestion: hookCopy.question,
      viralHookEn: hookCopy.enQuestion,
      revealReady,
      isRevealing: phase === 'reveal',
      celebrationActive,
    });
  }, [
    seriesNum,
    seriesTitle,
    currentKey,
    currentBadge,
    effectiveKeys,
    selectedItem,
    romanized,
    englishBadge,
    hookCopy.tag,
    hookCopy.question,
    hookCopy.enQuestion,
    revealReady,
    phase,
    celebrationActive,
    bubbleStageBucket,
    setActiveMeta,
  ]);

  const prevSingleKeyRef = useRef<string | undefined>(customSelectedKeys[0]);
  useEffect(() => {
    const picked = customSelectedKeys[0];
    const changed = picked !== prevSingleKeyRef.current;
    prevSingleKeyRef.current = picked;
    if (rangeMode === 'single' && changed && picked && !autoplayActive) {
      const idx = allKeys.indexOf(picked);
      if (idx >= 0 && itemsRef.current[idx] && picked !== currentKey) {
        onSelectRef.current(itemsRef.current[idx]);
      }
    }
  }, [rangeMode, customSelectedKeys, autoplayActive, allKeys, currentKey]);

  const rangeSig = `${rangeMode}:${effectiveKeys.join(',')}`;
  const prevRangeSigRef = useRef(rangeSig);
  const prevTriggerTickRef = useRef(autoplayTriggerTick);
  useEffect(() => {
    const wasActive = prevAutoplayRef.current;
    const rangeChanged = prevRangeSigRef.current !== rangeSig;
    const triggerChanged = prevTriggerTickRef.current !== autoplayTriggerTick;
    prevAutoplayRef.current = autoplayActive;
    prevRangeSigRef.current = rangeSig;
    prevTriggerTickRef.current = autoplayTriggerTick;

    if (autoplayActive && (!wasActive || rangeChanged || triggerChanged)) {
      clearAdvanceTimer();
      autoPosRef.current = 0;
      const targetIdx = effectiveIndicesRef.current[0] ?? 0;
      if (itemsRef.current[targetIdx]) {
        onSelectRef.current(itemsRef.current[targetIdx]);
      }
    } else if (!autoplayActive && wasActive) {
      clearAdvanceTimer();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [autoplayActive, rangeSig, autoplayTriggerTick, clearAdvanceTimer]);

  useEffect(() => {
    if (!autoplayActive || phase !== 'reveal' || isPaused) return;
    clearAdvanceTimer();

    let cancelled = false;
    let minHoldDone = false;
    let speechDone = !isKoreanSpeechActive();
    let postSpeechTimer: number | null = null;
    let safetyMaxTimer: number | null = null;
    let unsubSpeech = () => {};

    const advanceNow = () => {
      if (cancelled) return;
      cancelled = true;
      unsubSpeech();
      if (postSpeechTimer !== null) window.clearTimeout(postSpeechTimer);
      if (safetyMaxTimer !== null) window.clearTimeout(safetyMaxTimer);
      clearAdvanceTimer();

      const nextPos = autoPosRef.current + 1;
      const idxList = effectiveIndicesRef.current;
      if (nextPos < idxList.length && itemsRef.current[idxList[nextPos]]) {
        autoPosRef.current = nextPos;
        onSelectRef.current(itemsRef.current[idxList[nextPos]]);
      } else if (infiniteLoopRef.current) {
        // Seamless infinite loop back to first selected item
        const loopIdx = idxList[0] ?? 0;
        autoPosRef.current = 0;
        if (itemsRef.current[loopIdx]) {
          onSelectRef.current(itemsRef.current[loopIdx]);
        } else {
          setAutoplayActive(false);
          onResetRef.current();
        }
      } else {
        setAutoplayActive(false);
        onResetRef.current();
      }
    };

    const tryScheduleAdvance = () => {
      if (cancelled || !minHoldDone || !speechDone) return;
      advanceNow();
    };

    if (!speechDone) {
      unsubSpeech = onKoreanSpeechComplete(() => {
        if (cancelled) return;
        postSpeechTimer = window.setTimeout(() => {
          speechDone = true;
          tryScheduleAdvance();
        }, 280);
      });
    }

    const minHoldMs = Math.round(revealHoldSec * 1000);
    revealAdvanceTimerRef.current = window.setTimeout(() => {
      minHoldDone = true;
      tryScheduleAdvance();
    }, minHoldMs);

    safetyMaxTimer = window.setTimeout(advanceNow, minHoldMs + 4200);

    return () => {
      cancelled = true;
      unsubSpeech();
      if (postSpeechTimer !== null) window.clearTimeout(postSpeechTimer);
      if (safetyMaxTimer !== null) window.clearTimeout(safetyMaxTimer);
      clearAdvanceTimer();
    };
  }, [autoplayActive, phase, isPaused, revealHoldSec, setAutoplayActive, clearAdvanceTimer]);

  useEffect(() => {
    return () => {
      clearAdvanceTimer();
      setAutoplayActive(false);
    };
  }, [clearAdvanceTimer, setAutoplayActive]);

  const camRef = useRef({
    x: 0,
    y: shortsAspect ? 0 : -51.25,
    w: 1000,
    h: shortsAspect ? 460 : 562.5,
    lastTs: performance.now(),
  });
  const prevShortsAspectRef = useRef(shortsAspect);
  const focusPosRef = useRef<{ x: number; y: number }>({ x: 320, y: 316 });

  const computeViewBox = (focusX: number, focusY: number): string => {
    focusPosRef.current = { x: focusX, y: focusY };

    const now = performance.now();
    const dt = Math.min((now - camRef.current.lastTs) / 1000, 0.05);
    camRef.current.lastTs = now;

    const isActiveAction = phase === 'action' || phase === 'aftermath';
    const isApproaching = phase === 'approaching';

    const clampedStudioZoom = Math.max(0.7, Math.min(1.8, cameraZoom));
    const effectiveZoom = shortsAspect
      ? clampedStudioZoom < 1.0
        ? clampedStudioZoom
        : phase === 'reveal' || celebrationActive
        ? 1.0
        : isActiveAction
        ? clampedStudioZoom
        : isApproaching
        ? Math.max(1.0, (clampedStudioZoom + 1.0) * 0.5)
        : 1.02
      : phase === 'reveal' || celebrationActive
      ? 1.0
      : studio.studioOpen
      ? isActiveAction
        ? Math.max(1.0, clampedStudioZoom)
        : isApproaching
        ? Math.max(1.0, (Math.max(1.0, clampedStudioZoom) + 1.0) * 0.5)
        : 1.0
      : 1.0;

    // Main stage is ALWAYS true 16:9 (1000 x 562.5 at 1.0x -> zero horizontal cropping); Shorts uses selected aspect + zoom
    const shortsBaseRatio = getShortsBaseRatio(stageAspectPreset);
    const shortsFrameAspect = getShortsStageAspectRatio(clampedStudioZoom, stageAspectPreset);
    const targetH = shortsAspect
      ? effectiveZoom < 1.0
        ? 460
        : Math.max(240, Math.min(460, 460 / effectiveZoom))
      : Math.max(240, Math.min(562.5, 562.5 / effectiveZoom));
    const targetW = shortsAspect
      ? effectiveZoom < 1.0
        ? Math.min(1000, (460 / effectiveZoom) * shortsBaseRatio)
        : Math.min(1000, targetH * shortsFrameAspect)
      : targetH * (16 / 9);

    let anchorX = 500;
    if (phase === 'reveal' || celebrationActive) {
      anchorX = 500;
    } else if (cameraMode === 'left') {
      anchorX = 285;
    } else if (cameraMode === 'center') {
      anchorX = 500;
    } else if (cameraMode === 'right') {
      anchorX = 715;
    } else {
      const clampedJollaX = Math.max(160, Math.min(840, focusX));
      anchorX = isActiveAction ? clampedJollaX * 0.68 + 500 * 0.32 : clampedJollaX * 0.55 + 500 * 0.45;
    }

    anchorX += cameraPanOffset;

    const anchorY =
      phase === 'reveal' || celebrationActive
        ? 230
        : Math.max(170, Math.min(310, focusY * 0.45 + 240 * 0.55));

    const targetX = Math.max(0, Math.min(1000 - targetW, anchorX - targetW / 2));
    const minY = shortsAspect ? 0 : -51.25;
    const maxBottomY = shortsAspect ? 460 : 511.25;
    const targetY = Math.max(minY, Math.min(maxBottomY - targetH, anchorY - targetH / 2));

    const aspectFlipped = prevShortsAspectRef.current !== shortsAspect;
    prevShortsAspectRef.current = shortsAspect;
    const c = camRef.current;
    if (aspectFlipped) {
      c.x = targetX;
      c.y = targetY;
      c.w = targetW;
      c.h = targetH;
    } else {
      const smooth = 1 - Math.exp(-dt * 5.8);
      c.x += (targetX - c.x) * smooth;
      c.y += (targetY - c.y) * smooth;
      c.w += (targetW - c.w) * smooth;
      c.h += (targetH - c.h) * smooth;
    }

    return `${c.x.toFixed(1)} ${c.y.toFixed(1)} ${c.w.toFixed(1)} ${c.h.toFixed(1)}`;
  };

  const { setPartFilter } = studio;

  const startFullAutoplay = useCallback(() => {
    setPartFilter('all');
    startAutoplay();
  }, [setPartFilter, startAutoplay]);

  const stopFullAutoplay = useCallback(() => {
    clearAdvanceTimer();
    stopAutoplay();
    onResetRef.current();
  }, [clearAdvanceTimer, stopAutoplay]);

  return {
    shortsAspect,
    autoplayActive: autoplayActive || introHookActive,
    introHookActive,
    hideSkyTokens,
    cleanRecordMode,
    playbackSpeedRef,
    aftermathHoldRef,
    quickCutMode,
    infiniteLoop,
    viralHookEnabled,
    comicBubbleEnabled,
    globalRomanization: studio.globalRomanization,
    globalAudienceMode: studio.globalAudienceMode,
    simpleWhiteShorts: isSimpleWhiteSeries2,
    isHookWindow,
    revealReady,
    viralHookTag: hookCopy.tag,
    viralHookQuestion: hookCopy.question,
    viralHookEn: hookCopy.enQuestion,
    comicBubbleText,
    romanized,
    englishBadge,
    getFocusPos: () => focusPosRef.current,
    computeViewBox,
    phase,
    studioOpen: studio.studioOpen,
    startFullAutoplay,
    stopFullAutoplay,
    isPaused,
    togglePause,
  };
}

