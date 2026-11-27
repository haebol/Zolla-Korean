import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  buildPresetText,
  CHANT_PRESET_OPTIONS,
  ChantHangulGroup,
  ChantItem,
  ChantPresetId,
  parseChantLines,
} from '../utils/chantPresets';
import {
  BeatPresetId,
  cancelChantTts,
  getChantAudioContext,
  MelodyOverlayId,
  playCustomVoiceCallBuffer,
  playGuideMetronomeClick,
  scheduleChantStepAudio,
  setChantMasterVolume,
  speakChantBeatToken,
  stopCustomVoicePlayback,
  trimRecordedAudioBuffer,
} from '../utils/chantAudioEngine';
import { playCutePop, BgmVolumeLevel } from '../utils/audio';
import { getStandaloneAppUrl } from '../utils/appUrl';
import { ChantStageScene } from './ChantStageScene';
import { CHANT_COMEDY_SET_NAMES, ChantComedySetId } from './ChantComedySets';
import { JollamanStageFrame } from './JollamanStageFrame';
import { BgmCompactButton } from './BgmCompactButton';
import {
  ChantPhraseExportMeta,
  getShortsBaseRatio,
  getShortsStageAspectRatio,
  resolveSelectedKeys,
  useShortsStudio,
} from '../context/ShortsStudioContext';
import { useChantStudio } from '../context/ChantStudioContext';
import { useAdminCatalog } from '../context/AdminCatalogContext';
import { getSeriesById, SeriesId } from '../constants/seriesCatalog';
import { romanizeKorean } from '../utils/koreanRomanizer';
import {
  buildSpeedSyncedTimeline,
  buildYouTubeUploadPackage,
  EXPORT_LANGUAGES,
  formatFullUploadPackageTxt,
  generateSrtForLanguage,
} from '../utils/shortsExportPackage';
import { createZipBlob, triggerBlobDownload } from '../utils/zipBuilder';
import { captureLiveStageSnapshot, exportThumbnailPng } from '../utils/thumbnailExporter';

interface JollamanChantSimulationProps {
  audioEnabled: boolean;
  mode?: 'viewer' | 'studio';
  selectedSeriesId?: SeriesId;
}

interface PlaybackCursor {
  itemPos: number;
  repeatIdx: number;
  phraseIdx: number;
  role: 'call' | 'response';
  beatInBar: number; // 0..3
}

const BEAT_PRESETS: { id: BeatPresetId; label: string; mLabel: string }[] = [
  { id: 'boombap', label: '🥁 기본 붐뱁', mLabel: '🥁붐뱁' },
  { id: 'clap', label: '👏 신나는 박수', mLabel: '👏박수' },
  { id: 'march', label: '🎺 경쾌한 행진', mLabel: '🎺행진' },
];

const MELODY_PRESETS: { id: MelodyOverlayId; label: string; mLabel: string }[] = [
  { id: 'none', label: '순수 비트만', mLabel: '비트만' },
  { id: 'retro2d', label: '🎮 레트로 8비트', mLabel: '🎮8비트' },
  { id: 'memeShorts', label: '🔥 밈 쇼츠 비트', mLabel: '🔥밈비트' },
  { id: 'chillLounge', label: '🎹 로파이 피아노', mLabel: '🎹로파이' },
  { id: 'latin', label: '💃 라틴풍', mLabel: '💃라틴' },
  { id: 'carol', label: '🎄 캐롤풍', mLabel: '🎄캐롤' },
];

const CHANT_PRESET_MOBILE_LABELS: Partial<Record<ChantPresetId, string>> = {
  hangul40_combo: '1탄·2단',
  hangul40_names: '1탄·이름',
  hangul40_words: '1탄·단어',
  batchim_chant: '2탄·받침',
  phonology_chant: '3탄·변동',
  particles_chant: '4탄·조사',
  particles_next_chant: '5탄·확장',
  particles_tier3_chant: '조사3',
  daily_verbs_phrases: '6탄·회화',
  tense_honorific_chant: '7탄·패턴',
};

export const JollamanChantSimulation: React.FC<JollamanChantSimulationProps> = ({
  audioEnabled,
  mode = 'studio',
  selectedSeriesId = 'consonants',
}) => {
  const studio = useShortsStudio();
  const {
    studioOpen,
    shortsAspect,
    setShortsAspect,
    stageAspectPreset,
    autoplayActive,
    setAutoplayActive,
    startAutoplay,
    stopAutoplay,
    isPaused,
    infiniteLoop,
    introHookEnabled,
    introHookActive,
    rangeMode,
    setRangeMode,
    customSelectedKeys,
    setCustomSelectedKeys,
    activeCatalog,
    setActiveCatalog,
    stageBgClass,
    stageContainerRef,
    replayHandlerRef,
    cameraMode,
    cameraZoom,
    setCameraZoom,
    cameraPanOffset,
    setCameraPanOffset,
    setCleanRecordMode,
    playbackSpeed,
    aftermathHoldSec,
    revealHoldSec,
    globalRomanization,
    globalAudienceMode,
    setGlobalAudienceMode,
    titlePatternIndex,
    shortsSafeZoneGuide,
    setShortsSafeZoneGuide,
    setActiveMeta,
    activeMeta,
    chantMeta,
    setChantMeta,
  } = studio;

  const chantCtx = useChantStudio();
  const {
    presetId,
    setPresetId,
    rawText,
    setRawText,
    items,
    setItems,
    checkedIds,
    setCheckedIds,
    bpm,
    setBpm,
    beatPreset,
    setBeatPreset,
    melodyOverlay,
    setMelodyOverlay,
    rhythmVolume,
    setRhythmVolume,
    rhythmMuted,
    setRhythmMuted,
    repeats,
    setRepeats,
    activeEditKey,
    setActiveEditKey,
    customVoices,
    setCustomVoices,
    loadChantSeries,
  } = chantCtx;

  const { getOrderedItems } = useAdminCatalog();
  const seriesMeta = useMemo(() => getSeriesById(selectedSeriesId), [selectedSeriesId]);

  // Ensure Chant mode always starts unclipped (0.8x in Shorts, 1.0x in 16:9, centered)
  useEffect(() => {
    setCameraZoom(shortsAspect ? 0.8 : 1.0);
    setCameraPanOffset(0);
  }, [setCameraZoom, setCameraPanOffset, shortsAspect]);

  const [showEditor, setShowEditor] = useState(false);

  const activePresetOption = useMemo(
    () => CHANT_PRESET_OPTIONS.find((p) => p.id === presetId) ?? CHANT_PRESET_OPTIONS[0],
    [presetId]
  );

  // 3. Transport & UI Visual State
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [cursor, setCursor] = useState<PlaybackCursor>({
    itemPos: 0,
    repeatIdx: 0,
    phraseIdx: 0,
    role: 'call',
    beatInBar: 0,
  });
  const [beatProgress, setBeatProgress] = useState<number>(0);
  const [animClock, setAnimClock] = useState<number>(0);

  // 4. Custom Mic Overdub Recording State
  const [recordingStatus, setRecordingStatus] = useState<'idle' | 'counting' | 'recording'>('idle');
  const [recGuideBeat, setRecGuideBeat] = useState<number>(-1);
  const [micError, setMicError] = useState<string | null>(null);
  const [formatBusy, setFormatBusy] = useState<'shorts' | 'main' | null>(null);
  const [formatSavedHint, setFormatSavedHint] = useState<string | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recChunksRef = useRef<Blob[]>([]);
  const recTimersRef = useRef<number[]>([]);

  // Items filtered to the selected top-nav series when in minimal viewer mode
  const viewerItems = useMemo(() => {
    if (mode !== 'viewer') return items;
    const baseList =
      seriesMeta.chantGroup === 'all'
        ? items
        : (() => {
            const filtered = items.filter((it) => it.group === seriesMeta.chantGroup);
            return filtered.length > 0 ? filtered : items;
          })();
    return getOrderedItems(seriesMeta.id, baseList, (it) => it.id);
  }, [mode, items, seriesMeta.chantGroup, seriesMeta.id, getOrderedItems]);

  // Active item playlist filtered by checkedIds (or viewerItems in minimal viewer mode)
  const playlistItems = useMemo(() => {
    if (mode === 'viewer') return viewerItems;
    const picked = items.filter((it) => checkedIds.includes(it.id));
    return picked.length > 0 ? picked : items.slice(0, 1);
  }, [mode, viewerItems, items, checkedIds]);

  const currentItem = useMemo(() => {
    if (isPlaying) {
      return playlistItems[cursor.itemPos] ?? playlistItems[0] ?? items[0];
    }
    return (
      playlistItems.find((it) => it.id === activeEditKey) ??
      items.find((it) => it.id === activeEditKey) ??
      playlistItems[0] ??
      items[0]
    );
  }, [isPlaying, playlistItems, cursor.itemPos, items, activeEditKey]);

  const effectiveMuted = rhythmMuted || !audioEnabled;
  const effectiveBpm = Math.max(40, bpm * playbackSpeed);
  const barSec = (60 / effectiveBpm) * 4;

  // Keep master rhythm volume synced live
  useEffect(() => {
    setChantMasterVolume(rhythmVolume, effectiveMuted);
  }, [rhythmVolume, effectiveMuted]);

  // Live Refs for zero-drift Web Audio scheduler loop
  const bpmRef = useRef(bpm);
  bpmRef.current = bpm;
  const speedRef = useRef(playbackSpeed);
  speedRef.current = playbackSpeed;
  const presetRef = useRef(beatPreset);
  presetRef.current = beatPreset;
  const melodyRef = useRef(melodyOverlay);
  melodyRef.current = melodyOverlay;
  const volRef = useRef(rhythmVolume);
  volRef.current = rhythmVolume;
  const mutedRef = useRef(effectiveMuted);
  mutedRef.current = effectiveMuted;
  const repeatsRef = useRef(repeats);
  repeatsRef.current = repeats;
  const infiniteLoopRef = useRef(infiniteLoop);
  infiniteLoopRef.current = infiniteLoop;
  const isPausedRef = useRef(isPaused);
  isPausedRef.current = isPaused;
  const playlistRef = useRef(playlistItems);
  playlistRef.current = playlistItems;
  const customVoicesRef = useRef(customVoices);
  customVoicesRef.current = customVoices;

  const stopTransport = useCallback(() => {
    setIsPlaying(false);
    stopAutoplay();
    cancelChantTts();
    stopCustomVoicePlayback();
    setBeatProgress(0);
  }, [stopAutoplay]);

  const startTransport = useCallback(
    (startItemId?: string) => {
      const ctx = getChantAudioContext();
      if (ctx && ctx.state === 'suspended') {
        void ctx.resume();
      }
      const list = playlistRef.current;
      let startIdx = 0;
      if (startItemId) {
        const found = list.findIndex((it) => it.id === startItemId);
        if (found >= 0) startIdx = found;
      }
      setCursor({
        itemPos: startIdx,
        repeatIdx: 0,
        phraseIdx: 0,
        role: 'call',
        beatInBar: 0,
      });
      setBeatProgress(0);
      setIsPlaying(true);
      setAutoplayActive(true);
    },
    [setAutoplayActive]
  );

  // When in minimal viewer mode, keep Chant preset & subgroup synced to the selected top-nav series
  useEffect(() => {
    if (mode !== 'viewer') return;
    stopTransport();
    loadChantSeries(seriesMeta.chantPresetId, seriesMeta.chantGroup);
  }, [mode, seriesMeta.chantPresetId, seriesMeta.chantGroup, loadChantSeries, stopTransport]);

  // Connect Shorts Studio Replay Hook (used by '🎥 무버튼 녹화' 3-2-1 countdown & '↻ 다시 재생')
  useEffect(() => {
    replayHandlerRef.current = () => {
      stopTransport();
      window.setTimeout(() => {
        startTransport();
      }, 40);
    };
    return () => {
      if (replayHandlerRef.current) replayHandlerRef.current = null;
    };
  }, [replayHandlerRef, startTransport, stopTransport]);

  // Sync external ShortsToolbar Play/Stop button -> Chant Engine
  useEffect(() => {
    if (autoplayActive && !isPlaying) {
      startTransport();
    } else if (!autoplayActive && isPlaying) {
      stopTransport();
    }
  }, [autoplayActive, isPlaying, startTransport, stopTransport]);

  // Unmount cleanup
  useEffect(() => {
    return () => {
      cancelChantTts();
      stopCustomVoicePlayback();
      recTimersRef.current.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Push Chant items + BPM/Repeats metadata into ShortsStudioContext so Duration, Chapters & 8-Lang .SRT stay 100% synced!
  useEffect(() => {
    const phraseByKey: Record<string, ChantPhraseExportMeta> = {};
    const catalog = items.map((it) => {
      const pArr = it.phrases.map((p) => p.beats);
      phraseByKey[it.id] = {
        phrases: pArr,
        meaning: it.meaning,
      };
      const firstBeatStr = it.phrases.map((p) => p.beats.join(', ')).join(' / ');
      const rom = it.meaning || romanizeKorean(it.mainChar);
      return {
        key: it.id,
        label: `${it.mainChar} · ${it.phrases[0].beats[2]}`,
        badge: it.phrases[0].beats[2],
        caption: `${it.mainChar} | ${firstBeatStr}`,
        romanized: rom,
        actionSec: barSec * 2 * it.phrases.length * repeats,
      };
    });

    setActiveCatalog(catalog);
    setChantMeta({
      bpm,
      repeats,
      phraseByKey,
    });
  }, [items, barSec, repeats, bpm, setActiveCatalog, setChantMeta]);

  // Sync single-item selection in Admin live preview -> Chant viewer
  useEffect(() => {
    if (mode !== 'viewer') return;
    if (rangeMode === 'single' && customSelectedKeys[0]) {
      const target = viewerItems.find((it) => it.id === customSelectedKeys[0]);
      if (target) setActiveEditKey(target.id);
    }
  }, [mode, rangeMode, customSelectedKeys, viewerItems, setActiveEditKey]);

  // Sync local checkedIds <-> ShortsStudioContext rangeMode & customSelectedKeys (Studio mode only)
  useEffect(() => {
    if (mode !== 'studio') return;
    if (rangeMode === 'all') {
      setCheckedIds(items.map((it) => it.id));
    } else if (rangeMode === 'single') {
      const pick = customSelectedKeys.find((k) => items.some((it) => it.id === k)) ?? items[0]?.id;
      if (pick) setCheckedIds([pick]);
    } else if (rangeMode === 'custom') {
      const valid = items.filter((it) => customSelectedKeys.includes(it.id)).map((it) => it.id);
      if (valid.length > 0) setCheckedIds(valid);
    } else {
      const resolved = resolveSelectedKeys(
        items.map((i) => i.id),
        rangeMode,
        customSelectedKeys,
        items[0]?.id
      );
      setCheckedIds(resolved);
    }
  }, [mode, rangeMode, customSelectedKeys, items, setCheckedIds]);

  // Update activeMeta for JollamanStageFrame & Thumbnail Generator
  useEffect(() => {
    if (!currentItem) return;
    const phrase = currentItem.phrases[cursor.phraseIdx] ?? currentItem.phrases[0];
    const relIdx = Math.max(0, playlistItems.findIndex((it) => it.id === currentItem.id)) + 1;
    const beatLine = globalAudienceMode
      ? `[${phrase.beats.map((b) => romanizeKorean(b) || b).join(' · ')}] 👏${
          currentItem.meaning ? ` · ${currentItem.meaning}` : ''
        }`
      : `${phrase.beats[0]}! ${phrase.beats[1]}! ${phrase.beats[2]}! 👏`;
    setActiveMeta({
      seriesNum: 99,
      seriesTitle: activePresetOption.titleForExport,
      itemKey: currentItem.id,
      itemLabel: `${currentItem.mainChar} · ${phrase.beats[2]}`,
      itemBadge: cursor.role === 'call' ? '🔊 듣고 따라해요!' : '🎤 따라 해봐요!',
      caption: beatLine,
      accentColor: cursor.role === 'call' ? '#0284C7' : '#E11D48',
      partIndex: relIdx,
      partTotal: Math.max(1, playlistItems.length),
      itemKeys: playlistItems.map((it) => it.id),
      romanized: currentItem.meaning || romanizeKorean(phrase.beats[2]),
      englishBadge: currentItem.meaning || 'Chant Song',
      viralHookTag: globalAudienceMode
        ? cursor.role === 'call'
          ? '🔊 LISTEN · 듣고 따라해요!'
          : '🎤 YOUR TURN! · 따라 해봐요!'
        : cursor.role === 'call'
        ? '🔊 듣고 따라해요!'
        : '🎤 따라 해봐요!',
      viralHookQuestion: `${currentItem.mainChar} → ${phrase.beats.join(' · ')} 👏`,
      viralHookEn: `Repeat "${phrase.beats.join(' · ')}" 👏`,
      revealReady: true,
      celebrationActive: false,
      minimalShortsMode: true,
    });
  }, [
    currentItem,
    activePresetOption.titleForExport,
    cursor.phraseIdx,
    cursor.role,
    playlistItems,
    bpm,
    globalAudienceMode,
    setActiveMeta,
  ]);

  // Precision Web Audio Lookahead Scheduler + Visual Groove Clock
  useEffect(() => {
    let rafId = 0;
    let lastClock = performance.now();

    if (!isPlaying) {
      // Gentle idle groove preview clock
      const idleLoop = (now: number) => {
        const dt = (now - lastClock) / 1000;
        lastClock = now;
        setAnimClock((t) => t + dt);
        rafId = requestAnimationFrame(idleLoop);
      };
      rafId = requestAnimationFrame(idleLoop);
      return () => cancelAnimationFrame(rafId);
    }

    const ctx = getChantAudioContext();
    if (!ctx) return;

    let stepInBar = 0;
    let globalStep = 0;
    let nextStepTime = ctx.currentTime + 0.05;
    let itemPos = cursor.itemPos;
    let repeatIdx = 0;
    let phraseIdx = 0;
    let role: 'call' | 'response' = 'call';
    let lastBeatStartAudioTime = nextStepTime;

    interface ScheduledBeatEvent {
      audioTime: number;
      cursor: PlaybackCursor;
      item: ChantItem;
      beatDur: number;
    }
    const visualQueue: ScheduledBeatEvent[] = [];

    let stoppedAtEnd = false;
    const advanceOneBeatCursor = () => {
      const list = playlistRef.current;
      const item = list[itemPos] ?? list[0];
      if (!item) return;
      const nextBeat = (cursorBeat + 1) % 4;
      cursorBeat = nextBeat;
      if (nextBeat !== 0) return;

      if (role === 'call') {
        role = 'response';
      } else {
        role = 'call';
        if (phraseIdx + 1 < item.phrases.length) {
          phraseIdx += 1;
        } else {
          phraseIdx = 0;
          if (repeatIdx + 1 < repeatsRef.current) {
            repeatIdx += 1;
          } else {
            repeatIdx = 0;
            if (itemPos + 1 >= list.length) {
              if (infiniteLoopRef.current) {
                itemPos = 0;
              } else {
                stoppedAtEnd = true;
              }
            } else {
              itemPos += 1;
            }
          }
        }
      }
    };
    let cursorBeat = 0;

    const schedulerTick = () => {
      if (isPausedRef.current || stoppedAtEnd) return;
      const currentCtx = getChantAudioContext();
      if (!currentCtx) return;

      const list = playlistRef.current;
      if (list.length === 0) return;
      const effBpm = Math.max(40, bpmRef.current * speedRef.current);
      const beatDur = 60 / effBpm;
      const stepDur = beatDur / 4;

      if (nextStepTime < currentCtx.currentTime - 0.2) {
        nextStepTime = currentCtx.currentTime + 0.04;
      }

      while (nextStepTime < currentCtx.currentTime + 0.14 && !stoppedAtEnd) {
        if (itemPos >= list.length) {
          itemPos = 0;
          repeatIdx = 0;
          phraseIdx = 0;
          role = 'call';
          cursorBeat = 0;
        }

        scheduleChantStepAudio({
          preset: presetRef.current,
          melody: melodyRef.current,
          stepInBar,
          globalStep,
          time: nextStepTime,
          stepDur,
          volume: volRef.current,
          muted: mutedRef.current,
        });

        // Beat boundary (0, 4, 8, 12)
        if (stepInBar % 4 === 0) {
          const item = list[itemPos];
          if (item) {
            visualQueue.push({
              audioTime: nextStepTime,
              cursor: {
                itemPos,
                repeatIdx,
                phraseIdx,
                role,
                beatInBar: cursorBeat,
              },
              item,
              beatDur,
            });
          }
          advanceOneBeatCursor();
        }

        nextStepTime += stepDur;
        stepInBar = (stepInBar + 1) % 16;
        globalStep += 1;
      }
    };

    const schedInterval = window.setInterval(schedulerTick, 25);
    schedulerTick();

    const firedEvents = new Set<ScheduledBeatEvent>();

    const visualLoop = (nowMs: number) => {
      const dt = (nowMs - lastClock) / 1000;
      lastClock = nowMs;
      setAnimClock((t) => t + dt);

      const audioNow = ctx.currentTime;
      const list = playlistRef.current;

      // Consume visual/speech cues right as audioTime arrives
      while (visualQueue.length > 0 && visualQueue[0].audioTime <= audioNow + 0.015) {
        const ev = visualQueue.shift()!;
        if (firedEvents.has(ev)) continue;
        firedEvents.add(ev);

        lastBeatStartAudioTime = ev.audioTime;
        setCursor(ev.cursor);
        setActiveEditKey(ev.item.id);

        if (ev.cursor.role === 'call') {
          const customBuf = customVoicesRef.current[ev.item.id];
          if (customBuf) {
            if (ev.cursor.beatInBar === 0) {
              cancelChantTts();
              playCustomVoiceCallBuffer(customBuf, audioNow, ev.beatDur * 3);
            } else if (ev.cursor.beatInBar === 3) {
              stopCustomVoicePlayback();
            }
          } else {
            if (ev.cursor.beatInBar < 3) {
              const ph = ev.item.phrases[ev.cursor.phraseIdx] ?? ev.item.phrases[0];
              speakChantBeatToken(ph.beats[ev.cursor.beatInBar], ev.beatDur, ev.cursor.beatInBar);
            } else {
              // Beat 4: Silence TTS cleanly so Clap "짝!" pops!
              cancelChantTts();
            }
          }
        } else if (ev.cursor.beatInBar === 0) {
          cancelChantTts();
          stopCustomVoicePlayback();
        }
      }

      if (stoppedAtEnd && visualQueue.length === 0) {
        stopTransport();
        return;
      }

      const effBpm = Math.max(40, bpmRef.current * speedRef.current);
      const beatDur = 60 / effBpm;
      const prog = Math.max(0, Math.min(1, (audioNow - lastBeatStartAudioTime) / beatDur));
      setBeatProgress(prog);

      rafId = requestAnimationFrame(visualLoop);
    };

    rafId = requestAnimationFrame(visualLoop);

    return () => {
      window.clearInterval(schedInterval);
      cancelAnimationFrame(rafId);
      cancelChantTts();
      stopCustomVoicePlayback();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isPlaying]);

  // Preset Switcher
  const handleSelectPreset = (nextPreset: ChantPresetId) => {
    playCutePop();
    stopTransport();
    setPresetId(nextPreset);
    const text = buildPresetText(nextPreset);
    setRawText(text);
    const parsed = parseChantLines(text, nextPreset);
    setItems(parsed);
    setCheckedIds(parsed.map((i) => i.id));
    setCustomSelectedKeys(parsed.map((i) => i.id));
    setRangeMode('all');
    if (parsed[0]) setActiveEditKey(parsed[0].id);
  };

  // Apply custom textarea lines
  const handleApplyCustomText = () => {
    playCutePop();
    stopTransport();
    const parsed = parseChantLines(rawText);
    if (parsed.length === 0) return;
    setItems(parsed);
    setCheckedIds(parsed.map((i) => i.id));
    setCustomSelectedKeys(parsed.map((i) => i.id));
    setRangeMode('all');
    if (parsed[0]) setActiveEditKey(parsed[0].id);
  };

  // Quick Sub-Group Selector (adapts per Chant Series)
  const handleFilterHangulGroup = (group: ChantHangulGroup | 'all') => {
    playCutePop();
    stopTransport();
    const nextIds =
      group === 'all'
        ? items.map((i) => i.id)
        : items.filter((i) => i.group === group).map((i) => i.id);
    if (nextIds.length === 0) return;
    setCheckedIds(nextIds);
    setCustomSelectedKeys(nextIds);
    setRangeMode(group === 'all' ? 'all' : 'custom');
    setActiveEditKey(nextIds[0]);
  };

  const handleToggleItemCheck = (item: ChantItem) => {
    playCutePop();
    setActiveEditKey(item.id);
    setCheckedIds((prev) => {
      const next = prev.includes(item.id)
        ? prev.filter((k) => k !== item.id)
        : [...prev, item.id];
      const finalNext = next.length > 0 ? next : [item.id];
      setCustomSelectedKeys(finalNext);
      setRangeMode(finalNext.length === 1 ? 'single' : finalNext.length === items.length ? 'all' : 'custom');
      return finalNext;
    });
  };

  // Record 1-Line Custom Voice Overdub synced to BPM guide!
  const handleRecordCustomVoice = async () => {
    if (recordingStatus !== 'idle') return;
    setMicError(null);
    stopTransport();

    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === 'undefined') {
      setMicError('이 브라우저에서는 마이크 녹음을 지원하지 않습니다.');
      return;
    }

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = getChantAudioContext();
      if (!ctx) {
        stream.getTracks().forEach((t) => t.stop());
        return;
      }

      const chunks: Blob[] = [];
      recChunksRef.current = chunks;
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;

      recorder.ondataavailable = (ev) => {
        if (ev.data.size > 0) chunks.push(ev.data);
      };

      const targetKey = currentItem?.id ?? activeEditKey;
      const beatMs = (60 / effectiveBpm) * 1000;

      recorder.onstop = async () => {
        stream.getTracks().forEach((t) => t.stop());
        try {
          const blob = new Blob(recChunksRef.current, { type: recorder.mimeType || 'audio/webm' });
          const arr = await blob.arrayBuffer();
          const decoded = await ctx.decodeAudioData(arr);
          const trimmed = trimRecordedAudioBuffer(ctx, decoded);
          setCustomVoices((prev) => ({ ...prev, [targetKey]: trimmed }));
        } catch {
          setMicError('녹음 오디오 변환에 실패했습니다. 다시 시도해 주세요.');
        } finally {
          setRecordingStatus('idle');
          setRecGuideBeat(-1);
        }
      };

      // Quick 2-beat prep count -> 4-beat recording bar ("1박 - 2박 - 3박 - (4박 쉼)")
      setRecordingStatus('counting');
      setRecGuideBeat(-1);
      playGuideMetronomeClick(0);

      const tPrep = window.setTimeout(() => playGuideMetronomeClick(1), beatMs);
      const tStart = window.setTimeout(() => {
        setRecordingStatus('recording');
        setRecGuideBeat(0);
        playGuideMetronomeClick(0);
        recorder.start();
      }, beatMs * 2);

      const tB2 = window.setTimeout(() => {
        setRecGuideBeat(1);
        playGuideMetronomeClick(1);
      }, beatMs * 3);

      const tB3 = window.setTimeout(() => {
        setRecGuideBeat(2);
        playGuideMetronomeClick(2);
      }, beatMs * 4);

      const tB4 = window.setTimeout(() => {
        setRecGuideBeat(3);
        playGuideMetronomeClick(3);
      }, beatMs * 5);

      const tStop = window.setTimeout(() => {
        if (recorder.state === 'recording') recorder.stop();
      }, beatMs * 5.75);

      recTimersRef.current = [tPrep, tStart, tB2, tB3, tB4, tStop];
    } catch {
      setMicError('마이크 권한이 필요합니다. 브라우저 상단에서 마이크를 허용해 주세요.');
      setRecordingStatus('idle');
      setRecGuideBeat(-1);
    }
  };

  // Dynamic Camera ViewBox honoring Shorts Studio zoom / pan / aspect ratio
  const cameraViewBox = useMemo(() => {
    const z = Math.max(0.7, Math.min(1.8, cameraZoom));
    const shortsBaseRatio = getShortsBaseRatio(stageAspectPreset);
    const shortsFrameAspect = getShortsStageAspectRatio(z, stageAspectPreset);
    const targetH = shortsAspect ? (z < 1.0 ? 460 : 460 / z) : 562.5 / Math.max(1.0, z);
    const targetW = shortsAspect
      ? z < 1.0
        ? Math.min(1000, (460 / z) * shortsBaseRatio)
        : Math.min(1000, targetH * shortsFrameAspect)
      : targetH * (16 / 9);
    let anchorX = 500;
    if (cameraMode === 'left') anchorX = 390;
    else if (cameraMode === 'right') anchorX = 610;
    anchorX += cameraPanOffset;
    const x = Math.max(0, Math.min(1000 - targetW, anchorX - targetW / 2));
    const y = shortsAspect
      ? Math.max(0, Math.min(460 - targetH, 230 - targetH / 2))
      : Math.max(-51.25, Math.min(511.25 - targetH, 230 - targetH / 2));
    return `${x.toFixed(1)} ${y.toFixed(1)} ${targetW.toFixed(1)} ${targetH.toFixed(1)}`;
  }, [cameraZoom, shortsAspect, stageAspectPreset, cameraMode, cameraPanOffset]);

  // Estimate duration of current checked playlist
  const totalEstimatedSec = useMemo(() => {
    return playlistItems.reduce(
      (sum, it) => sum + barSec * 2 * it.phrases.length * repeats,
      0
    );
  }, [playlistItems, barSec, repeats]);

  const activePhrase = currentItem?.phrases[cursor.phraseIdx] ?? currentItem?.phrases[0];
  const hasCustomVoice = Boolean(currentItem && customVoices[currentItem.id]);
  const activeSongIndex = Math.max(
    0,
    items.findIndex((it) => it.id === currentItem?.id)
  );
  const activeComedySetId = ((activeSongIndex % 4) as ChantComedySetId);

  // Direct 2-Choice Handlers: Shorts (9:16) vs Main (16:9), never clipped!
  const handleSelectAspectFormat = (targetShorts: boolean) => {
    playCutePop();
    setShortsAspect(targetShorts);
    setCameraZoom(targetShorts ? 0.8 : 1.0);
    setCameraPanOffset(0);
  };

  const handleLaunchFormatRecord = (targetShorts: boolean) => {
    playCutePop();
    setShortsAspect(targetShorts);
    setCameraZoom(targetShorts ? 0.8 : 1.0);
    setCameraPanOffset(0);
    setCleanRecordMode(true);
  };

  const handleSeparateFormatSave = async (format: 'shorts' | 'main') => {
    if (formatBusy) return;
    playCutePop();
    const targetShorts = format === 'shorts';
    setFormatBusy(format);
    setFormatSavedHint(null);

    try {
      setShortsAspect(targetShorts);
      setCameraZoom(targetShorts ? 0.8 : 1.0);
      setCameraPanOffset(0);

      // Let SVG viewBox & frame settle at exact unclipped 1.0x geometry before snapshot capture
      await new Promise<void>((resolve) =>
        requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
      );

      const selectedSet = new Set(playlistItems.map((it) => it.id));
      const selectedCatalog = activeCatalog.filter((c) => selectedSet.has(c.key));
      const timeline = buildSpeedSyncedTimeline(selectedCatalog, {
        seriesNum: 99,
        playbackSpeed,
        quickCutMode: false,
        aftermathHoldSec,
        revealHoldSec,
        chantMeta,
      });

      const funnelLink = getStandaloneAppUrl();
      const pkg = buildYouTubeUploadPackage(
        99,
        activePresetOption.titleForExport,
        timeline,
        funnelLink,
        titlePatternIndex
      );

      const entries = [
        ...EXPORT_LANGUAGES.map((lang, i) => ({
          name: `${String(i + 1).padStart(2, '0')}_${lang.code}_${lang.label}.srt`,
          content: generateSrtForLanguage(lang.code, 99, timeline, chantMeta),
        })),
        {
          name: targetShorts ? '00_쇼츠용_9x16_업로드패키지.txt' : '00_본편용_16x9_업로드패키지.txt',
          content: formatFullUploadPackageTxt(pkg),
        },
      ];

      const zipBlob = createZipBlob(entries);
      triggerBlobDownload(
        zipBlob,
        `jollaman-chant-${targetShorts ? 'shorts-9x16' : 'main-16x9'}.zip`
      );

      // Capture live unclipped SVG snapshot & download matching PNG thumbnail (1080x1920 or 1280x720)
      try {
        const { dataUrl, bgHex } = await captureLiveStageSnapshot(
          stageContainerRef.current,
          stageBgClass
        );
        const curPhrase = currentItem?.phrases[cursor.phraseIdx] ?? currentItem?.phrases[0];
        await exportThumbnailPng(
          targetShorts ? '1080x1920' : '1280x720',
          {
            snapshotDataUrl: dataUrl,
            stageBgHex: bgHex,
            badgeText: activeMeta.viralHookTag || `🥁 ${bpm}BPM 리듬 챈트송`,
            headline1: currentItem?.mainChar || '졸라 챈트송',
            headline2: curPhrase
              ? `${curPhrase.beats[0]} · ${curPhrase.beats[1]} · ${curPhrase.beats[2]} 👏`
              : activeMeta.itemLabel,
            footerSub: `${bpm}BPM · 3음보+박수 따라하기!`,
          },
          `jollaman-chant-${format}`
        );
      } catch {
        // ZIP is already saved cleanly
      }

      setFormatSavedHint(
        targetShorts
          ? '✓ 쇼츠용 저장 완료 (1080×1920 PNG + 8개국어 .srt ZIP)'
          : '✓ 본편용 저장 완료 (1280×720 PNG + 8개국어 .srt ZIP)'
      );
      window.setTimeout(() => setFormatSavedHint(null), 4000);
    } finally {
      setFormatBusy(null);
    }
  };

  const viewerBgmLevel: BgmVolumeLevel =
    rhythmVolume <= 0.45 ? 1 : rhythmVolume <= 0.8 ? 2 : 3;

  if (mode === 'viewer') {
    const renderChantTab = (it: ChantItem) => {
      const isCurrent = currentItem?.id === it.id;
      return (
        <button
          key={it.id}
          onClick={() => {
            playCutePop();
            setActiveEditKey(it.id);
            if (isPlaying) {
              startTransport(it.id);
            } else {
              const ph = it.phrases[0];
              if (ph) {
                speakChantBeatToken(ph.beats[2] || it.mainChar, 0.45, 0);
              }
            }
          }}
          style={{
            color: isCurrent ? it.color : undefined,
            borderBottomColor: isCurrent ? it.color : 'transparent',
          }}
          className={`pb-0.5 px-0 border-b-2 bg-transparent text-[13px] sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors leading-snug ${
            isCurrent
              ? 'font-extrabold'
              : 'text-[#475569] hover:text-[#0F172A]'
          }`}
        >
          {it.mainChar}
        </button>
      );
    };

    return (
      <div className="w-full max-w-[1200px] mx-auto flex flex-col select-none font-body text-[#0F172A]">
        {/* Row 4 Minimal Chant Stage Header (Twin-app compact header + segmented controls + underline tabs) */}
        <div className="pt-4 pb-3 border-b-2 border-slate-900 flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 md:gap-3 lg:gap-4">
          <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3 md:contents">
            <div className="flex items-baseline gap-1.5 min-w-0 md:order-1 md:shrink-0">
              <h1 className="font-game text-xl sm:text-2xl tracking-tight text-slate-900 leading-none whitespace-nowrap font-normal truncate">
                {seriesMeta.chantTitle}
              </h1>
              <span className="font-game text-base sm:text-lg tabular-nums text-[#DC2626] leading-none whitespace-nowrap shrink-0 font-normal">
                ({viewerItems.length})
              </span>
            </div>

            <div className="flex items-center justify-end gap-1 shrink-0 md:order-3">
              <BgmCompactButton
                enabled={!effectiveMuted}
                volumeLevel={viewerBgmLevel}
                onToggleEnabled={() => setRhythmMuted((m) => !m)}
                onSelectVolume={(lvl) => {
                  if (rhythmMuted) setRhythmMuted(false);
                  setRhythmVolume(lvl === 1 ? 0.35 : lvl === 2 ? 0.7 : 1.0);
                }}
              />

              <div className="inline-flex items-stretch border border-[#0F172A] divide-x divide-[#0F172A] shrink-0">
                <button
                  onClick={() => {
                    playCutePop();
                    if (isPlaying || introHookActive) {
                      stopTransport();
                    } else {
                      const ctx = getChantAudioContext();
                      if (ctx && ctx.state === 'suspended') void ctx.resume();
                      studio.setIsPaused(false);
                      startTransport(viewerItems[0]?.id);
                    }
                  }}
                  title={isPlaying || introHookActive ? '전체감상 정지' : '전체감상'}
                  aria-label={isPlaying || introHookActive ? '전체감상 정지' : '전체감상'}
                  className={`h-6 w-6 sm:h-7 sm:w-auto px-0 sm:px-2.5 flex items-center justify-center rounded-none text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isPlaying || introHookActive
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                      : 'bg-[#0F172A] hover:bg-[#1E293B]'
                  }`}
                >
                  <span className="sm:hidden flex items-center justify-center" aria-hidden="true">
                    {isPlaying || introHookActive ? (
                      <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                        <rect x="3.5" y="3.5" width="9" height="9" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" className="w-3 h-3 fill-current">
                        <polygon points="4,2.5 13.5,8 4,13.5" />
                      </svg>
                    )}
                  </span>
                  <span className="hidden sm:inline">
                    {isPlaying || introHookActive ? '⏹ 정지' : '▶ 전체감상'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    playCutePop();
                    studio.togglePause();
                  }}
                  title={isPaused ? '계속 감상' : '일시정지'}
                  aria-label={isPaused ? '계속 감상' : '일시정지'}
                  className={`h-6 w-6 sm:h-7 sm:w-7 px-0 flex items-center justify-center rounded-none text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isPaused
                      ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]'
                      : 'bg-[#FFFFFF] text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="flex items-center justify-center" aria-hidden="true">
                    {isPaused ? (
                      <svg viewBox="0 0 16 16" className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current">
                        <polygon points="4,2.5 13.5,8 4,13.5" />
                      </svg>
                    ) : (
                      <svg viewBox="0 0 16 16" className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current">
                        <rect x="3.5" y="3" width="3" height="10" />
                        <rect x="9.5" y="3" width="3" height="10" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </div>
          </div>

          <div
            className="w-full md:w-auto md:flex-1 md:min-w-0 md:order-2 md:pl-4 lg:pl-6 md:pr-2 flex flex-wrap items-center justify-start gap-x-[11px] sm:gap-x-4 md:gap-x-3.5 lg:gap-x-5 xl:gap-x-6 gap-y-1 text-[13px] sm:text-sm font-bold"
            role="list"
            aria-label="챈트송 항목 선택"
          >
            {seriesMeta.id === 'batchim' && (
              <>
                <span className="pb-0.5 text-[13px] sm:text-sm font-bold text-[#0F172A] whitespace-nowrap shrink-0 select-none leading-snug">
                  대표받침
                </span>
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
              </>
            )}
            {seriesMeta.id === 'doubleBatchim1' && (
              <>
                <span className="pb-0.5 text-[13px] sm:text-sm font-bold text-[#0F172A] whitespace-nowrap shrink-0 select-none leading-snug">
                  앞자음으로 발음
                </span>
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
              </>
            )}
            {seriesMeta.id === 'batchim2' ? (
              <>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="대표음 [ㄱ] (클릭 불가)"
                  className="mb-0.5 px-1.5 py-0.5 bg-[#F1F5F9] text-[#0F172A] text-[13px] sm:text-sm font-black rounded-none whitespace-nowrap shrink-0 cursor-default select-none leading-none"
                >
                  ㄱ
                </button>
                {viewerItems.slice(0, 2).map(renderChantTab)}
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="대표음 [ㄷ] (클릭 불가)"
                  className="mb-0.5 px-1.5 py-0.5 bg-[#F1F5F9] text-[#0F172A] text-[13px] sm:text-sm font-black rounded-none whitespace-nowrap shrink-0 cursor-default select-none leading-none"
                >
                  ㄷ
                </button>
                {viewerItems.slice(2, 8).map(renderChantTab)}
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
                <button
                  type="button"
                  disabled
                  aria-disabled="true"
                  title="대표음 [ㅂ] (클릭 불가)"
                  className="mb-0.5 px-1.5 py-0.5 bg-[#F1F5F9] text-[#0F172A] text-[13px] sm:text-sm font-black rounded-none whitespace-nowrap shrink-0 cursor-default select-none leading-none"
                >
                  ㅂ
                </button>
                {viewerItems.slice(8).map(renderChantTab)}
              </>
            ) : seriesMeta.id === 'doubleBatchim2' ? (
              <>
                <span className="pb-0.5 text-[13px] sm:text-sm font-bold text-[#0F172A] whitespace-nowrap shrink-0 select-none leading-snug">
                  뒷자음으로 발음
                </span>
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
                {viewerItems.slice(0, 3).map(renderChantTab)}
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
                <span className="pb-0.5 text-[13px] sm:text-sm font-bold text-[#0F172A] whitespace-nowrap shrink-0 select-none leading-snug">
                  예외·ㅎ
                </span>
                <span className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug" aria-hidden="true">
                  /
                </span>
                {viewerItems.slice(3).map(renderChantTab)}
              </>
            ) : (
              viewerItems.map(renderChantTab)
            )}
          </div>
        </div>

        {/* Clean Minimal Chant Stage */}
        <div className="mt-6">
          <JollamanStageFrame stageBgClass="bg-slate-900">
            {currentItem && (
              <ChantStageScene
                item={currentItem}
                songIndex={activeSongIndex}
                phraseIdx={cursor.phraseIdx}
                role={cursor.role}
                beatInBar={cursor.beatInBar}
                beatProgress={beatProgress}
                animClock={animClock}
                repeatIdx={cursor.repeatIdx}
                totalRepeats={repeats}
                isPlaying={isPlaying}
                hasCustomVoice={hasCustomVoice}
                viewBox={cameraViewBox}
                globalRomanization={globalRomanization}
                globalAudienceMode={globalAudienceMode}
                shortsAspect={shortsAspect}
                shortsSafeZoneGuide={shortsSafeZoneGuide}
              />
            )}
          </JollamanStageFrame>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-[1160px] mx-auto flex flex-col gap-0.5 sm:gap-1 select-none font-body text-[#141B29]">
      {/* 1. Ultra-Compact Transport & Rhythm Control Deck */}
      <div className="bg-[#FFFFFF] border-b border-[#141B29] pb-0.5 sm:pb-1 flex flex-col gap-0.5 sm:gap-1">
        <div className="flex items-center justify-between gap-1">
          <div className="flex items-baseline gap-1 sm:gap-1.5 min-w-0">
            <h2 className="font-game text-[14px] sm:text-[17px] tracking-tight text-[#141B29] whitespace-nowrap font-normal">
              챈트송
            </h2>
            <div className="font-mono-num flex items-center gap-0.5 sm:gap-1 text-[10px] sm:text-[11px] font-bold text-slate-500 truncate">
              <span className="text-[#DC2626]">{bpm}BPM</span>
              {Math.abs(playbackSpeed - 1) > 0.02 && (
                <span className="text-[#DC2626]">({Math.round(effectiveBpm)})</span>
              )}
              <span>· {playlistItems.length}곡 · {totalEstimatedSec.toFixed(0)}s</span>
            </div>
          </div>

          <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
            <button
              onClick={() => {
                playCutePop();
                setRhythmMuted((m) => !m);
              }}
              className={`px-1 sm:px-1.5 h-6 rounded-none border text-[10px] sm:text-[11px] font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors flex items-center gap-0.5 ${
                !effectiveMuted
                  ? 'border-[#141B29] bg-[#FFFFFF] text-[#141B29]'
                  : 'border-slate-300 bg-[#FFFFFF] text-slate-400'
              }`}
              title="비트 음소거 토글"
            >
              <span className={!effectiveMuted ? 'text-[#DC2626]' : 'text-slate-400'}>
                {!effectiveMuted ? '☑' : '☐'}
              </span>
              <span>비트</span>
            </button>

            <button
              onClick={() => {
                playCutePop();
                if (isPlaying || introHookActive) {
                  stopTransport();
                } else {
                  const ctx = getChantAudioContext();
                  if (ctx && ctx.state === 'suspended') void ctx.resume();
                  if (introHookEnabled && (shortsAspect || studioOpen)) {
                    startAutoplay();
                  } else {
                    startTransport();
                  }
                }
              }}
              className={`w-7 h-6 flex items-center justify-center rounded-none border text-xs text-white cursor-pointer shrink-0 transition-colors ${
                isPlaying || introHookActive
                  ? 'bg-[#DC2626] border-[#DC2626] hover:bg-[#B91C1C]'
                  : 'bg-[#141B29] border-[#141B29] hover:bg-[#1E293B]'
              }`}
              title={isPlaying || introHookActive ? '챈트 정지' : '챈트송 시작'}
              aria-label={isPlaying || introHookActive ? '챈트 정지' : '챈트송 시작'}
            >
              {isPlaying || introHookActive ? '⏹' : '▶'}
            </button>
          </div>
        </div>

        {/* Sliders & Repeats in 1 compact row on both mobile and desktop */}
        <div className="grid grid-cols-12 gap-0.5 sm:gap-1 text-[10px] sm:text-[11px]">
          <label className="col-span-5 flex items-center gap-0.5 sm:gap-1 bg-white border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5 font-bold text-slate-800 min-w-0">
            <span className="whitespace-nowrap shrink-0">
              <span className="sm:hidden">속</span>
              <span className="hidden sm:inline">템포</span>
            </span>
            <input
              type="range"
              min={85}
              max={125}
              step={1}
              value={bpm}
              onChange={(e) => setBpm(parseInt(e.target.value, 10))}
              className="flex-1 min-w-0 accent-red-600 cursor-pointer"
            />
            <span className="tabular-nums font-bold text-red-600 w-7 sm:w-9 text-right shrink-0">
              {bpm}
            </span>
          </label>

          <label className="col-span-4 md:col-span-5 flex items-center gap-0.5 sm:gap-1 bg-white border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5 font-bold text-slate-800 min-w-0">
            <span className="whitespace-nowrap shrink-0">
              <span className="sm:hidden">음</span>
              <span className="hidden sm:inline">볼륨</span>
            </span>
            <input
              type="range"
              min={0}
              max={100}
              step={5}
              value={Math.round(rhythmVolume * 100)}
              onChange={(e) => setRhythmVolume(parseInt(e.target.value, 10) / 100)}
              className="flex-1 min-w-0 accent-red-600 cursor-pointer"
            />
            <span className="tabular-nums font-bold text-slate-900 w-7 sm:w-8 text-right shrink-0">
              {Math.round(rhythmVolume * 100)}<span className="hidden sm:inline">%</span>
            </span>
          </label>

          <div className="col-span-3 md:col-span-2 flex items-center justify-between gap-0.5 sm:gap-1 bg-white border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5">
            <span className="hidden sm:inline font-bold text-slate-800 whitespace-nowrap">반복</span>
            <div className="flex items-center gap-0.5 w-full sm:w-auto justify-center">
              {([1, 2] as const).map((cnt) => (
                <button
                  key={cnt}
                  onClick={() => {
                    playCutePop();
                    setRepeats(cnt);
                  }}
                  className={`px-1 sm:px-1.5 py-0 rounded-none border text-[10px] sm:text-[10.5px] font-bold cursor-pointer whitespace-nowrap shrink-0 tabular-nums flex-1 sm:flex-initial text-center ${
                    repeats === cnt
                      ? 'bg-red-600 border-red-600 text-white'
                      : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
                  }`}
                >
                  ×{cnt}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Beat + Melody Presets packed tightly */}
        <div className="flex flex-wrap items-center gap-[2px] sm:gap-1 text-[10px] sm:text-[10.5px]">
          {BEAT_PRESETS.map((bp) => (
            <button
              key={bp.id}
              onClick={() => {
                playCutePop();
                setBeatPreset(bp.id);
              }}
              className={`px-1 sm:px-1.5 py-0.5 rounded-none border font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                beatPreset === bp.id
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
              }`}
            >
              <span className="sm:hidden">{bp.mLabel}</span>
              <span className="hidden sm:inline">{bp.label}</span>
            </button>
          ))}
          {MELODY_PRESETS.map((mp) => (
            <button
              key={mp.id}
              onClick={() => {
                playCutePop();
                setMelodyOverlay(mp.id);
              }}
              className={`px-1 sm:px-1.5 py-0.5 rounded-none border font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                melodyOverlay === mp.id
                  ? 'bg-slate-950 border-slate-950 text-white'
                  : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
              }`}
            >
              <span className="sm:hidden">{mp.mLabel}</span>
              <span className="hidden sm:inline">{mp.label}</span>
            </button>
          ))}
        </div>

        {/* Compact Format & Recording Strip (packed left-to-right, no gaps) */}
        <div className="flex flex-wrap items-center gap-[2px] sm:gap-1 pt-0.5 border-t border-slate-200 text-[10px] sm:text-[10.5px]">
          <button
            onClick={() => handleSelectAspectFormat(false)}
            className={`px-1 sm:px-1.5 py-0.5 rounded-none border font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              !shortsAspect
                ? 'bg-slate-950 border-slate-950 text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
            }`}
          >
            16:9
          </button>
          <button
            onClick={() => handleSelectAspectFormat(true)}
            className={`px-1 sm:px-1.5 py-0.5 rounded-none border font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              shortsAspect
                ? 'bg-red-600 border-red-600 text-white'
                : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
            }`}
          >
            9:16
          </button>
          <button
            onClick={() => {
              playCutePop();
              const next = !shortsSafeZoneGuide;
              if (next && !shortsAspect) {
                setShortsAspect(true);
                setCameraZoom(0.8);
                setCameraPanOffset(0);
              }
              setShortsSafeZoneGuide(next);
            }}
            className={`px-1 py-0.5 rounded-none border font-bold cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-0.5 ${
              shortsSafeZoneGuide
                ? 'border-slate-900 bg-white text-slate-950'
                : 'border-slate-300 bg-white text-slate-600'
            }`}
          >
            <span className={shortsSafeZoneGuide ? 'text-red-600' : 'text-slate-400'}>
              {shortsSafeZoneGuide ? '☑' : '☐'}
            </span>
            <span>안전</span>
          </button>
          <button
            onClick={() => {
              playCutePop();
              setGlobalAudienceMode(!globalAudienceMode);
            }}
            className={`px-1 py-0.5 rounded-none border font-bold cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-0.5 ${
              globalAudienceMode
                ? 'border-slate-900 bg-white text-slate-950'
                : 'border-slate-300 bg-white text-slate-600'
            }`}
          >
            <span className={globalAudienceMode ? 'text-red-600' : 'text-slate-400'}>
              {globalAudienceMode ? '☑' : '☐'}
            </span>
            <span className="sm:hidden">글로</span>
            <span className="hidden sm:inline">글로벌</span>
          </button>
          <button
            onClick={() => handleLaunchFormatRecord(true)}
            className="px-1 sm:px-1.5 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-bold cursor-pointer whitespace-nowrap shrink-0"
            title="9:16 쇼츠 무버튼 촬영"
          >
            쇼츠●
          </button>
          <button
            onClick={() => handleLaunchFormatRecord(false)}
            className="px-1 sm:px-1.5 py-0.5 rounded-none border border-slate-300 bg-white hover:border-slate-900 text-slate-800 font-bold cursor-pointer whitespace-nowrap shrink-0"
            title="16:9 본편 무버튼 촬영"
          >
            본편●
          </button>
          <button
            onClick={() => void handleSeparateFormatSave('shorts')}
            disabled={formatBusy !== null}
            className="px-1 sm:px-1.5 py-0.5 rounded-none bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            {formatBusy === 'shorts' ? '...' : '⬇쇼츠'}
          </button>
          <button
            onClick={() => void handleSeparateFormatSave('main')}
            disabled={formatBusy !== null}
            className="px-1 sm:px-1.5 py-0.5 rounded-none bg-slate-950 hover:bg-slate-800 disabled:opacity-60 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
          >
            {formatBusy === 'main' ? '...' : '⬇본편'}
          </button>
        </div>

        {formatSavedHint && (
          <p className="text-[10px] sm:text-[10.5px] font-bold text-red-600">{formatSavedHint}</p>
        )}
      </div>

      {/* 2. Interactive Stage */}
      <JollamanStageFrame stageBgClass="bg-slate-900">
        {currentItem && (
          <ChantStageScene
            item={currentItem}
            songIndex={activeSongIndex}
            phraseIdx={cursor.phraseIdx}
            role={cursor.role}
            beatInBar={cursor.beatInBar}
            beatProgress={beatProgress}
            animClock={animClock}
            repeatIdx={cursor.repeatIdx}
            totalRepeats={repeats}
            isPlaying={isPlaying}
            hasCustomVoice={hasCustomVoice}
            viewBox={cameraViewBox}
            globalRomanization={globalRomanization}
            globalAudienceMode={globalAudienceMode}
            shortsAspect={shortsAspect}
            shortsSafeZoneGuide={shortsSafeZoneGuide}
          />
        )}
      </JollamanStageFrame>

      {/* 3. Selected Word Custom Voice Overdub Bar */}
      {currentItem && activePhrase && (
        <div className="bg-[#FFFFFF] border border-[#141B29] rounded-none p-0.5 sm:p-1 flex flex-wrap items-center justify-between gap-0.5 sm:gap-1 text-[10px] sm:text-[11px]">
          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 min-w-0">
            <span className="font-game text-xs sm:text-sm text-[#141B29]">{currentItem.mainChar}</span>
            <span className="text-slate-300" aria-hidden="true">|</span>
            <span className="text-[#141B29] truncate">
              {activePhrase.beats[0]} · {activePhrase.beats[1]} · {activePhrase.beats[2]} · 짝
            </span>
            <span className="hidden sm:inline text-slate-300" aria-hidden="true">|</span>
            <span className="hidden sm:inline text-[#DC2626]">{CHANT_COMEDY_SET_NAMES[activeComedySetId]}</span>
            {recordingStatus !== 'idle' && (
              <span className="font-mono-num font-bold text-[#DC2626]">
                {recordingStatus === 'counting'
                  ? '●준비'
                  : `●녹(${recGuideBeat < 3 ? `${recGuideBeat + 1}` : '쉼'})`}
              </span>
            )}
            {micError && <span className="text-[#DC2626]">{micError}</span>}
          </div>

          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1 shrink-0">
            <button
              onClick={() => void handleRecordCustomVoice()}
              disabled={recordingStatus !== 'idle'}
              className={`px-1 sm:px-1.5 py-0.5 rounded-none border text-[10px] sm:text-[11px] cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                recordingStatus !== 'idle'
                  ? 'bg-[#DC2626] border-[#DC2626] text-white'
                  : 'bg-[#FFFFFF] border-[#DC2626] text-[#DC2626] hover:bg-red-50'
              }`}
            >
              {recordingStatus !== 'idle' ? (
                <>
                  <span className="sm:hidden">녹음중</span>
                  <span className="hidden sm:inline">녹음 중...</span>
                </>
              ) : hasCustomVoice ? (
                <>
                  <span className="sm:hidden">재녹</span>
                  <span className="hidden sm:inline">재녹음</span>
                </>
              ) : '●녹음'}
            </button>

            {hasCustomVoice && (
              <>
                <button
                  onClick={() => {
                    playCutePop();
                    const buf = customVoices[currentItem.id];
                    if (buf) {
                      const ctx = getChantAudioContext();
                      if (ctx) playCustomVoiceCallBuffer(buf, ctx.currentTime + 0.03, (60 / effectiveBpm) * 3);
                    }
                  }}
                  className="px-1 sm:px-1.5 py-0.5 rounded-none border border-[#141B29] bg-[#FFFFFF] hover:bg-slate-50 text-[#141B29] cursor-pointer whitespace-nowrap shrink-0"
                >
                  ▶
                </button>
                <button
                  onClick={() => {
                    playCutePop();
                    setCustomVoices((prev) => {
                      const copy = { ...prev };
                      delete copy[currentItem.id];
                      return copy;
                    });
                  }}
                  className="px-1 sm:px-1.5 py-0.5 rounded-none border border-slate-300 bg-[#FFFFFF] hover:border-[#141B29] text-slate-600 cursor-pointer whitespace-nowrap shrink-0"
                >
                  TTS
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* 4. Universal Chant List Picker & Custom Text Line Editor */}
      <div className="bg-[#FFFFFF] border border-[#141B29] rounded-none p-0.5 sm:p-1 flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-[11px]">
        <div className="flex items-center justify-between gap-1">
          <span className="font-game text-[12px] sm:text-[13px] text-[#141B29] whitespace-nowrap font-normal">
            <span className="sm:hidden">시리즈</span>
            <span className="hidden sm:inline">챈트 시리즈</span>{' '}
            <span className="font-mono-num text-[10px] sm:text-[11px] font-bold text-[#DC2626]">({items.length})</span>
          </span>
          <button
            onClick={() => {
              playCutePop();
              setShowEditor((v) => !v);
            }}
            className="px-1 sm:px-1.5 py-0.5 rounded-none border border-[#141B29] bg-[#FFFFFF] hover:bg-slate-50 text-[#141B29] cursor-pointer whitespace-nowrap shrink-0"
          >
            <span className="sm:hidden">{showEditor ? '편집▲' : '편집▼'}</span>
            <span className="hidden sm:inline">{showEditor ? '편집 ▲' : '텍스트 편집 ▼'}</span>
          </button>
        </div>

        {/* Series Selector Buttons */}
        <div className="flex flex-wrap items-center gap-[2px] sm:gap-0.5">
          {CHANT_PRESET_OPTIONS.filter((p) => p.tier === 'sim_match').map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              className={`px-1 sm:px-1.5 py-0.5 rounded-none border text-[10px] sm:text-[10.5px] font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                presetId === p.id
                  ? 'bg-slate-950 border-slate-950 text-white'
                  : 'bg-white border-slate-300 text-slate-800 hover:border-slate-900'
              }`}
            >
              <span className="sm:hidden">{CHANT_PRESET_MOBILE_LABELS[p.id] ?? p.label}</span>
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
          {CHANT_PRESET_OPTIONS.filter((p) => p.tier === 'next_series').map((p) => (
            <button
              key={p.id}
              onClick={() => handleSelectPreset(p.id)}
              className={`px-1 sm:px-1.5 py-0.5 rounded-none border text-[10px] sm:text-[10.5px] font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                presetId === p.id
                  ? 'bg-red-600 border-red-600 text-white'
                  : 'bg-white border-slate-900 text-slate-900 hover:border-red-600 hover:text-red-600'
              }`}
            >
              <span className="sm:hidden">{CHANT_PRESET_MOBILE_LABELS[p.id] ?? p.label}</span>
              <span className="hidden sm:inline">{p.label}</span>
            </button>
          ))}
        </div>

        {/* Sub-Group Filter */}
        {activePresetOption.groups.length > 0 && items.some((i) => i.group !== 'custom') && (
          <div className="flex flex-wrap items-center gap-[2px] sm:gap-1">
            <span className="hidden sm:inline font-bold text-slate-500 mr-1">묶음:</span>
            {activePresetOption.groups.map((g) => (
              <button
                key={g.id}
                onClick={() => handleFilterHangulGroup(g.id)}
                className="px-1 sm:px-2 py-0.5 rounded-none border border-slate-300 bg-white hover:border-slate-900 font-bold text-slate-800 cursor-pointer whitespace-nowrap shrink-0 text-[10px] sm:text-[11px]"
              >
                {g.label}
              </button>
            ))}
          </div>
        )}

        {/* Collapsible Custom Chant Textarea */}
        {showEditor && (
          <div className="bg-slate-50 border border-slate-300 rounded-none p-1 sm:p-2 flex flex-col gap-1 sm:gap-1.5">
            <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2">
              <p className="font-bold text-slate-700 text-[10px] sm:text-[11px]">
                형식: <code className="bg-white px-1 border border-slate-300">글자 | 1,2,3박 | 뜻</code>
              </p>
              <button
                onClick={handleApplyCustomText}
                className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-none bg-red-600 hover:bg-red-700 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                ✓적용
              </button>
            </div>
            <textarea
              value={rawText}
              onChange={(e) => setRawText(e.target.value)}
              rows={4}
              spellCheck={false}
              className="w-full rounded-none border border-slate-300 bg-white p-1.5 sm:p-2 font-mono text-[11px] sm:text-xs text-slate-950 leading-relaxed focus:border-slate-900 focus:outline-none"
              placeholder={'가다 | 가다, 가다, 가요 | go\n먹다 | 먹다, 먹다, 먹어요 | eat'}
            />
          </div>
        )}

        {/* Checkbox Shooting Range Selector */}
        <div className="grid grid-cols-5 sm:grid-cols-5 md:grid-cols-8 lg:grid-cols-10 gap-0.5 sm:gap-1">
          {items.map((item) => {
            const checked = checkedIds.includes(item.id);
            const activeOnStage = currentItem?.id === item.id;
            const hasRec = Boolean(customVoices[item.id]);

            return (
              <div
                key={item.id}
                className={`flex items-center justify-between gap-0.5 sm:gap-1 px-1 sm:px-1.5 py-0.5 sm:py-1 rounded-none border transition-colors ${
                  activeOnStage
                    ? 'bg-red-50 border-red-600 text-slate-950'
                    : checked
                    ? 'bg-white border-slate-900 text-slate-950'
                    : 'bg-white border-slate-300 text-slate-500'
                }`}
              >
                <label className="flex items-center gap-0.5 sm:gap-1 cursor-pointer min-w-0 flex-1">
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => handleToggleItemCheck(item)}
                    className="accent-red-600 cursor-pointer shrink-0"
                  />
                  <span className="font-bold truncate">{item.mainChar}</span>
                  {hasRec && <span aria-label="녹음 있음">●</span>}
                </label>

                <button
                  onClick={() => {
                    playCutePop();
                    setActiveEditKey(item.id);
                    if (!checked) {
                      handleToggleItemCheck(item);
                    }
                    startTransport(item.id);
                  }}
                  className="text-[9.5px] sm:text-[10px] font-bold text-red-600 hover:text-red-800 cursor-pointer shrink-0 px-0.5"
                  title={`${item.mainChar}부터 바로 재생`}
                >
                  ▶
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
