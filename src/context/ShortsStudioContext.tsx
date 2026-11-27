import React, { createContext, useContext, useState, useCallback, useEffect, useRef } from 'react';
import {
  BgmVolumeLevel,
  clearTtsError,
  KoreanVoicePreset,
  pauseKoreanSpeech,
  resumeKoreanSpeech,
  setBgmPaused,
  setBgmVolumeLevel as syncAudioBgmVolumeLevel,
  setKoreanSpeechEnabled as syncAudioKoreanSpeech,
  setKoreanVoicePreset as syncAudioVoicePreset,
  subscribeTtsError,
} from '../utils/audio';
import { buildIntroHookDefaults } from '../utils/koreanRomanizer';

export type ShortsStageAspectId = '1:1' | '4:3';

export const SHORTS_STAGE_ASPECT_OPTIONS: {
  id: ShortsStageAspectId;
  label: string;
  ratio: number;
}[] = [
  { id: '1:1', label: '1:1', ratio: 1 },
  { id: '4:3', label: '4:3', ratio: 4 / 3 },
];

export function getShortsBaseRatio(aspectId: ShortsStageAspectId): number {
  return SHORTS_STAGE_ASPECT_OPTIONS.find((opt) => opt.id === aspectId)?.ratio ?? 1;
}

/**
 * Computes exact middle SVG stage container aspect ratio for Shorts mode.
 * - zoom >= 1.0: matches chosen preset ratio (1:1 or 4:3)
 * - zoom < 1.0 (e.g., 0.8x): widens horizontally up to 1000/460 while locking SVG height to 460
 *   so backgrounds never expose top/bottom empty strips.
 */
export function getShortsStageAspectRatio(
  cameraZoom: number,
  aspectId: ShortsStageAspectId = '1:1'
): number {
  const baseRatio = getShortsBaseRatio(aspectId);
  const z = Math.max(0.7, Math.min(1.8, cameraZoom));
  if (z >= 1.0) return baseRatio;
  return Math.min(1000, (460 / z) * baseRatio) / 460;
}

export type ShortsPartFilter = 'all' | 'part1' | 'part2' | 'part3';
export type ShortsRangeMode = ShortsPartFilter | 'single' | 'custom';
export type ShortsCameraMode = 'auto' | 'left' | 'center' | 'right';

export interface ChantPhraseExportMeta {
  phrases: [string, string, string][];
  meaning: string;
}

export interface ChantStudioMeta {
  bpm: number;
  repeats: 1 | 2;
  phraseByKey: Record<string, ChantPhraseExportMeta>;
}

export interface StudioCatalogItem {
  key: string;
  label: string;
  badge: string;
  caption: string;
  romanized: string;
  actionSec: number;
}

export interface ShortsActiveMeta {
  seriesNum: number;
  seriesTitle: string;
  itemKey: string;
  itemLabel: string;
  itemBadge: string;
  caption: string;
  accentColor: string;
  partIndex: number;
  partTotal: number;
  itemKeys: string[];
  romanized: string;
  englishBadge: string;
  viralHookTag: string;
  viralHookQuestion: string;
  viralHookEn: string;
  revealReady: boolean;
  isRevealing?: boolean;
  celebrationActive: boolean;
  minimalShortsMode?: boolean;
}

export interface ShortsStudioContextValue {
  studioOpen: boolean;
  setStudioOpen: (open: boolean) => void;
  shortsAspect: boolean;
  setShortsAspect: (v: boolean) => void;
  stageAspectPreset: ShortsStageAspectId;
  setStageAspectPreset: (p: ShortsStageAspectId) => void;
  autoplayActive: boolean;
  setAutoplayActive: (v: boolean) => void;
  partFilter: ShortsPartFilter;
  setPartFilter: (p: ShortsPartFilter) => void;
  rangeMode: ShortsRangeMode;
  setRangeMode: (m: ShortsRangeMode) => void;
  customSelectedKeys: string[];
  setCustomSelectedKeys: React.Dispatch<React.SetStateAction<string[]>>;
  activeCatalog: StudioCatalogItem[];
  setActiveCatalog: React.Dispatch<React.SetStateAction<StudioCatalogItem[]>>;
  stageBgClass: string;
  setStageBgClass: (bg: string) => void;
  stageContainerRef: React.RefObject<HTMLDivElement | null>;
  replayHandlerRef: React.MutableRefObject<(() => void) | null>;
  triggerRangeReplay: () => void;
  cameraMode: ShortsCameraMode;
  setCameraMode: (m: ShortsCameraMode) => void;
  cameraZoom: number;
  setCameraZoom: (z: number) => void;
  cameraPanOffset: number;
  setCameraPanOffset: (offset: number) => void;
  hideSkyTokens: boolean;
  setHideSkyTokens: (v: boolean) => void;
  cleanRecordMode: boolean;
  setCleanRecordMode: (v: boolean) => void;
  playbackSpeed: number;
  setPlaybackSpeed: (v: number) => void;
  aftermathHoldSec: number;
  setAftermathHoldSec: (v: number) => void;
  revealHoldSec: number;
  setRevealHoldSec: (v: number) => void;
  viralHookEnabled: boolean;
  setViralHookEnabled: (v: boolean) => void;
  comicBubbleEnabled: boolean;
  setComicBubbleEnabled: (v: boolean) => void;
  quickCutMode: boolean;
  setQuickCutMode: (v: boolean) => void;
  infiniteLoop: boolean;
  setInfiniteLoop: (v: boolean) => void;
  channelWatermarkEnabled: boolean;
  setChannelWatermarkEnabled: (v: boolean) => void;
  globalRomanization: boolean;
  setGlobalRomanization: (v: boolean) => void;
  globalAudienceMode: boolean;
  setGlobalAudienceMode: (v: boolean) => void;
  titlePatternIndex: number;
  cycleTitlePattern: () => void;
  shortsSafeZoneGuide: boolean;
  setShortsSafeZoneGuide: (v: boolean) => void;
  showStepHud: boolean;
  setShowStepHud: (v: boolean) => void;
  koreanSpeechEnabled: boolean;
  setKoreanSpeechEnabled: (v: boolean) => void;
  koreanVoicePreset: KoreanVoicePreset;
  setKoreanVoicePreset: (p: KoreanVoicePreset) => void;
  ttsError: string | null;
  clearTtsError: () => void;
  simpleWhiteShorts: boolean;
  setSimpleWhiteShorts: (v: boolean) => void;
  introHookEnabled: boolean;
  setIntroHookEnabled: (v: boolean) => void;
  introHookSubtitleEnabled: boolean;
  setIntroHookSubtitleEnabled: (v: boolean) => void;
  introHookTitle: string;
  setIntroHookTitle: (t: string) => void;
  introHookTitleKo: string;
  setIntroHookTitleKo: (t: string) => void;
  introHookSubtitle: string;
  setIntroHookSubtitle: (s: string) => void;
  introHookActive: boolean;
  previewIntroHook: () => void;
  resetIntroHookDefaults: () => void;
  applyViralPreset: () => void;
  activeMeta: ShortsActiveMeta;
  setActiveMeta: React.Dispatch<React.SetStateAction<ShortsActiveMeta>>;
  chantMeta: ChantStudioMeta;
  setChantMeta: React.Dispatch<React.SetStateAction<ChantStudioMeta>>;
  startAutoplay: () => void;
  stopAutoplay: () => void;
  autoplayTriggerTick: number;
  isPaused: boolean;
  setIsPaused: (v: boolean) => void;
  togglePause: () => void;
  bgmEnabled: boolean;
  setBgmEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  toggleBgm: () => void;
  bgmVolumeLevel: BgmVolumeLevel;
  setBgmVolumeLevel: (level: BgmVolumeLevel) => void;
}

const DEFAULT_META: ShortsActiveMeta = {
  seriesNum: 1,
  seriesTitle: '졸라맨 한국어',
  itemKey: 'ㄱ',
  itemLabel: 'ㄱ · 기차',
  itemBadge: '기역',
  caption: '',
  accentColor: '#E11D48',
  partIndex: 1,
  partTotal: 14,
  itemKeys: [],
  romanized: 'g/k',
  englishBadge: 'giyeok',
  viralHookTag: '한글 기초 3초 컷',
  viralHookQuestion: '‘ㄱ’ 소리, 어떻게 날까?',
  viralHookEn: 'How does "ㄱ" sound?',
  revealReady: false,
  celebrationActive: false,
};

const INTRO_HOOK_DURATION_MS = 1500;

const ShortsStudioContext = createContext<ShortsStudioContextValue | null>(null);

export const ShortsStudioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [studioOpen, setStudioOpen] = useState(false);
  const [shortsAspect, setShortsAspect] = useState(false);
  const [stageAspectPreset, setStageAspectPreset] = useState<ShortsStageAspectId>('1:1');
  const [autoplayActive, setAutoplayActive] = useState(false);
  const [partFilter, setPartFilterState] = useState<ShortsPartFilter>('all');
  const [rangeMode, setRangeModeState] = useState<ShortsRangeMode>('all');
  const [customSelectedKeys, setCustomSelectedKeys] = useState<string[]>([]);
  const [activeCatalog, setActiveCatalog] = useState<StudioCatalogItem[]>([]);
  const [stageBgClass, setStageBgClass] = useState<string>('bg-sky-50');
  const stageContainerRef = useRef<HTMLDivElement | null>(null);
  const replayHandlerRef = useRef<(() => void) | null>(null);

  const [cameraMode, setCameraMode] = useState<ShortsCameraMode>('auto');
  const [cameraZoom, setCameraZoom] = useState(1.0);
  const [cameraPanOffset, setCameraPanOffset] = useState(0);
  const [hideSkyTokens, setHideSkyTokens] = useState(false);
  const [cleanRecordMode, setCleanRecordMode] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [aftermathHoldSec, setAftermathHoldSec] = useState(1.3);
  const [revealHoldSec, setRevealHoldSec] = useState(1.8);

  // Viral Shorts & Video Patch controls
  const [viralHookEnabled, setViralHookEnabled] = useState(true);
  const [comicBubbleEnabled, setComicBubbleEnabled] = useState(true);
  const [quickCutMode, setQuickCutMode] = useState(false);
  const [infiniteLoop, setInfiniteLoop] = useState(true);
  const [channelWatermarkEnabled, setChannelWatermarkEnabled] = useState(true);
  const [globalRomanization, setGlobalRomanization] = useState(true);
  const [globalAudienceMode, setGlobalAudienceMode] = useState(true);
  const [titlePatternIndex, setTitlePatternIndex] = useState(0);
  const [shortsSafeZoneGuide, setShortsSafeZoneGuide] = useState(false);
  const [showStepHud, setShowStepHud] = useState(false);
  const [koreanSpeechEnabled, setKoreanSpeechEnabledState] = useState(true);
  const [koreanVoicePreset, setKoreanVoicePresetState] = useState<KoreanVoicePreset>('device');
  const [ttsError, setTtsError] = useState<string | null>(null);
  const [simpleWhiteShorts, setSimpleWhiteShorts] = useState(true);

  const [activeMeta, setActiveMeta] = useState<ShortsActiveMeta>(DEFAULT_META);
  const [chantMeta, setChantMeta] = useState<ChantStudioMeta>({
    bpm: 100,
    repeats: 2,
    phraseByKey: {},
  });

  // 1.5s Intro Hook Scene & Editable Subtitle State (auto-generated per series unless edited)
  const [introHookEnabled, setIntroHookEnabled] = useState(true);
  const [introHookSubtitleEnabled, setIntroHookSubtitleEnabled] = useState(true);
  const [introHookActive, setIntroHookActive] = useState(false);
  const [introHookOverrides, setIntroHookOverrides] = useState<
    Record<number, { title: string; titleKo: string; subtitle: string }>
  >({});
  const introHookTimerRef = useRef<number | null>(null);
  const [autoplayTriggerTick, setAutoplayTriggerTick] = useState(0);
  const [isPaused, setIsPausedState] = useState(false);
  const [bgmEnabled, setBgmEnabled] = useState(true);
  const [bgmVolumeLevel, setBgmVolumeLevelState] = useState<BgmVolumeLevel>(2);

  const toggleBgm = useCallback(() => {
    setBgmEnabled((prev) => !prev);
  }, []);

  const setBgmVolumeLevel = useCallback((level: BgmVolumeLevel) => {
    setBgmVolumeLevelState(level);
    syncAudioBgmVolumeLevel(level);
  }, []);

  const setIsPaused = useCallback((next: boolean) => {
    setIsPausedState(next);
    setBgmPaused(next);
    if (next) {
      pauseKoreanSpeech();
    } else {
      resumeKoreanSpeech();
    }
  }, []);

  const togglePause = useCallback(() => {
    setIsPausedState((prev) => {
      const next = !prev;
      setBgmPaused(next);
      if (next) {
        pauseKoreanSpeech();
      } else {
        resumeKoreanSpeech();
      }
      return next;
    });
  }, []);

  const clearIntroHookTimer = useCallback(() => {
    if (introHookTimerRef.current !== null) {
      window.clearTimeout(introHookTimerRef.current);
      introHookTimerRef.current = null;
    }
  }, []);

  const currentAutoHook = buildIntroHookDefaults(
    activeMeta.seriesNum,
    activeMeta.seriesTitle,
    activeMeta.itemKey
  );
  const seriesHookOverride = introHookOverrides[activeMeta.seriesNum];
  const introHookTitle = seriesHookOverride?.title ?? currentAutoHook.title;
  const introHookTitleKo = seriesHookOverride?.titleKo ?? currentAutoHook.titleKo;
  const introHookSubtitle = seriesHookOverride?.subtitle ?? currentAutoHook.subtitle;

  const setIntroHookTitle = useCallback(
    (title: string) => {
      setIntroHookOverrides((prev) => {
        const curAuto = buildIntroHookDefaults(
          activeMeta.seriesNum,
          activeMeta.seriesTitle,
          activeMeta.itemKey
        );
        const existing = prev[activeMeta.seriesNum];
        return {
          ...prev,
          [activeMeta.seriesNum]: {
            title,
            titleKo: existing?.titleKo ?? curAuto.titleKo,
            subtitle: existing?.subtitle ?? curAuto.subtitle,
          },
        };
      });
    },
    [activeMeta.seriesNum, activeMeta.seriesTitle, activeMeta.itemKey]
  );

  const setIntroHookTitleKo = useCallback(
    (titleKo: string) => {
      setIntroHookOverrides((prev) => {
        const curAuto = buildIntroHookDefaults(
          activeMeta.seriesNum,
          activeMeta.seriesTitle,
          activeMeta.itemKey
        );
        const existing = prev[activeMeta.seriesNum];
        return {
          ...prev,
          [activeMeta.seriesNum]: {
            title: existing?.title ?? curAuto.title,
            titleKo,
            subtitle: existing?.subtitle ?? curAuto.subtitle,
          },
        };
      });
    },
    [activeMeta.seriesNum, activeMeta.seriesTitle, activeMeta.itemKey]
  );

  const setIntroHookSubtitle = useCallback(
    (subtitle: string) => {
      setIntroHookOverrides((prev) => {
        const curAuto = buildIntroHookDefaults(
          activeMeta.seriesNum,
          activeMeta.seriesTitle,
          activeMeta.itemKey
        );
        const existing = prev[activeMeta.seriesNum];
        return {
          ...prev,
          [activeMeta.seriesNum]: {
            title: existing?.title ?? curAuto.title,
            titleKo: existing?.titleKo ?? curAuto.titleKo,
            subtitle,
          },
        };
      });
    },
    [activeMeta.seriesNum, activeMeta.seriesTitle, activeMeta.itemKey]
  );

  const resetIntroHookDefaults = useCallback(() => {
    setIntroHookOverrides((prev) => {
      const next = { ...prev };
      delete next[activeMeta.seriesNum];
      return next;
    });
  }, [activeMeta.seriesNum]);

  const previewIntroHook = useCallback(() => {
    clearIntroHookTimer();
    setIntroHookActive(true);
    introHookTimerRef.current = window.setTimeout(() => {
      setIntroHookActive(false);
      introHookTimerRef.current = null;
    }, INTRO_HOOK_DURATION_MS);
  }, [clearIntroHookTimer]);

  const cycleTitlePattern = useCallback(() => {
    setTitlePatternIndex((prev) => (prev + 1) % 5);
  }, []);

  const setKoreanSpeechEnabled = useCallback((v: boolean) => {
    setKoreanSpeechEnabledState(v);
    syncAudioKoreanSpeech(v);
  }, []);

  const setKoreanVoicePreset = useCallback((preset: KoreanVoicePreset) => {
    setKoreanVoicePresetState(preset);
    syncAudioVoicePreset(preset);
  }, []);

  useEffect(() => {
    return subscribeTtsError((err) => {
      setTtsError(err);
    });
  }, []);

  const setPartFilter = useCallback((p: ShortsPartFilter) => {
    setPartFilterState(p);
    setRangeModeState(p);
  }, []);

  const setRangeMode = useCallback((m: ShortsRangeMode) => {
    setRangeModeState(m);
    if (m === 'all' || m === 'part1' || m === 'part2' || m === 'part3') {
      setPartFilterState(m);
    }
  }, []);

  const launchPlaybackWithOptionalIntroHook = useCallback(
    (useReplayHandler: boolean) => {
      clearIntroHookTimer();
      setIsPaused(false);
      const launchTarget = () => {
        setIntroHookActive(false);
        if (useReplayHandler && replayHandlerRef.current) {
          replayHandlerRef.current();
        } else {
          setAutoplayActive(true);
          setAutoplayTriggerTick((t) => t + 1);
        }
      };

      const shouldRunIntroHook =
        introHookEnabled && (shortsAspect || studioOpen || cleanRecordMode);
      if (shouldRunIntroHook) {
        setAutoplayActive(false);
        setIntroHookActive(true);
        introHookTimerRef.current = window.setTimeout(() => {
          introHookTimerRef.current = null;
          launchTarget();
        }, INTRO_HOOK_DURATION_MS);
      } else {
        launchTarget();
      }
    },
    [clearIntroHookTimer, introHookEnabled, shortsAspect, studioOpen, cleanRecordMode, setIsPaused]
  );

  const startAutoplay = useCallback(() => {
    launchPlaybackWithOptionalIntroHook(false);
  }, [launchPlaybackWithOptionalIntroHook]);

  const stopAutoplay = useCallback(() => {
    clearIntroHookTimer();
    setIsPaused(false);
    setIntroHookActive(false);
    setAutoplayActive(false);
  }, [clearIntroHookTimer, setIsPaused]);

  const triggerRangeReplay = useCallback(() => {
    launchPlaybackWithOptionalIntroHook(true);
  }, [launchPlaybackWithOptionalIntroHook]);

  const applyViralPreset = useCallback(() => {
    setShortsAspect(true);
    setStageAspectPreset('1:1');
    setCameraZoom(0.8);
    setHideSkyTokens(false);
    setShowStepHud(false);
    setQuickCutMode(true);
    setInfiniteLoop(true);
    setViralHookEnabled(true);
    setComicBubbleEnabled(true);
    setGlobalRomanization(true);
    setGlobalAudienceMode(true);
    setIntroHookEnabled(true);
    setIntroHookSubtitleEnabled(true);
    setPlaybackSpeed(1.1);
    setAftermathHoldSec(1.3);
    setRevealHoldSec(1.8);
  }, []);

  // ESC exits clean recording fullscreen mode
  useEffect(() => {
    if (!cleanRecordMode) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        clearIntroHookTimer();
        setIntroHookActive(false);
        setAutoplayActive(false);
        setCleanRecordMode(false);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [cleanRecordMode, clearIntroHookTimer]);

  useEffect(() => {
    return () => clearIntroHookTimer();
  }, [clearIntroHookTimer]);

  return (
    <ShortsStudioContext.Provider
      value={{
        studioOpen,
        setStudioOpen,
        shortsAspect,
        setShortsAspect,
        stageAspectPreset,
        setStageAspectPreset,
        autoplayActive,
        setAutoplayActive,
        partFilter,
        setPartFilter,
        rangeMode,
        setRangeMode,
        customSelectedKeys,
        setCustomSelectedKeys,
        activeCatalog,
        setActiveCatalog,
        stageBgClass,
        setStageBgClass,
        stageContainerRef,
        replayHandlerRef,
        triggerRangeReplay,
        cameraMode,
        setCameraMode,
        cameraZoom,
        setCameraZoom,
        cameraPanOffset,
        setCameraPanOffset,
        hideSkyTokens,
        setHideSkyTokens,
        cleanRecordMode,
        setCleanRecordMode,
        playbackSpeed,
        setPlaybackSpeed,
        aftermathHoldSec,
        setAftermathHoldSec,
        revealHoldSec,
        setRevealHoldSec,
        viralHookEnabled,
        setViralHookEnabled,
        comicBubbleEnabled,
        setComicBubbleEnabled,
        quickCutMode,
        setQuickCutMode,
        infiniteLoop,
        setInfiniteLoop,
        channelWatermarkEnabled,
        setChannelWatermarkEnabled,
        globalRomanization,
        setGlobalRomanization,
        globalAudienceMode,
        setGlobalAudienceMode,
        titlePatternIndex,
        cycleTitlePattern,
        shortsSafeZoneGuide,
        setShortsSafeZoneGuide,
        showStepHud,
        setShowStepHud,
        koreanSpeechEnabled,
        setKoreanSpeechEnabled,
        koreanVoicePreset,
        setKoreanVoicePreset,
        ttsError,
        clearTtsError,
        simpleWhiteShorts,
        setSimpleWhiteShorts,
        introHookEnabled,
        setIntroHookEnabled,
        introHookSubtitleEnabled,
        setIntroHookSubtitleEnabled,
        introHookTitle,
        setIntroHookTitle,
        introHookTitleKo,
        setIntroHookTitleKo,
        introHookSubtitle,
        setIntroHookSubtitle,
        introHookActive,
        previewIntroHook,
        resetIntroHookDefaults,
        applyViralPreset,
        activeMeta,
        setActiveMeta,
        chantMeta,
        setChantMeta,
        startAutoplay,
        stopAutoplay,
        autoplayTriggerTick,
        isPaused,
        setIsPaused,
        togglePause,
        bgmEnabled,
        setBgmEnabled,
        toggleBgm,
        bgmVolumeLevel,
        setBgmVolumeLevel,
      }}
    >
      {children}
    </ShortsStudioContext.Provider>
  );
};

export function useShortsStudio(): ShortsStudioContextValue {
  const ctx = useContext(ShortsStudioContext);
  if (!ctx) {
    throw new Error('useShortsStudio must be used inside ShortsStudioProvider');
  }
  return ctx;
}

/**
 * Helper to split any item array into Part 1 / Part 2 / Part 3 ranges for Shorts episodes
 */
export function getPartSliceBounds(total: number, partFilter: ShortsPartFilter): [number, number] {
  if (partFilter === 'all' || total <= 4) return [0, total];
  if (total <= 8) {
    const mid = Math.ceil(total / 2);
    if (partFilter === 'part1') return [0, mid];
    if (partFilter === 'part2') return [mid, total];
    return [mid, total];
  }
  const c1 = Math.ceil(total / 3);
  const c2 = Math.ceil((total * 2) / 3);
  if (partFilter === 'part1') return [0, c1];
  if (partFilter === 'part2') return [c1, c2];
  return [c2, total];
}

/**
 * Resolves exact ordered item keys for any shooting range mode (all / part1..3 / single / custom).
 */
export function resolveSelectedKeys(
  allKeys: string[],
  rangeMode: ShortsRangeMode,
  customSelectedKeys: string[],
  fallbackKey?: string
): string[] {
  if (allKeys.length === 0) return [];
  if (rangeMode === 'single') {
    const pick = customSelectedKeys.find((k) => allKeys.includes(k));
    if (pick) return [pick];
    if (fallbackKey && allKeys.includes(fallbackKey)) return [fallbackKey];
    return [allKeys[0]];
  }
  if (rangeMode === 'custom') {
    const valid = allKeys.filter((k) => customSelectedKeys.includes(k));
    return valid.length > 0 ? valid : [allKeys[0]];
  }
  const [s, e] = getPartSliceBounds(allKeys.length, rangeMode);
  return allKeys.slice(s, e);
}

