import React, { useEffect, useMemo, useRef, useState, useCallback } from 'react';
import {
  resolveSelectedKeys,
  SHORTS_STAGE_ASPECT_OPTIONS,
  ShortsRangeMode,
  useShortsStudio,
} from '../context/ShortsStudioContext';
import {
  playCutePop,
} from '../utils/audio';
import { getStandaloneAppUrl } from '../utils/appUrl';
import {
  buildSpeedSyncedTimeline,
  buildYouTubeUploadPackage,
  EXPORT_LANGUAGES,
  ExportLangCode,
  formatFullUploadPackageTxt,
  generateSrtForLanguage,
  LocalizedUploadMeta,
  TITLE_PATTERN_LABELS,
} from '../utils/shortsExportPackage';
import { createZipBlob, triggerBlobDownload } from '../utils/zipBuilder';
import {
  captureLiveStageSnapshot,
  exportThumbnailPng,
  renderThumbnailCanvas,
  ThumbnailDimensions,
  ThumbnailDraft,
} from '../utils/thumbnailExporter';
import { BgmCompactButton } from './BgmCompactButton';

type StudioTabId = 'controls' | 'range' | 'thumbnail' | 'export' | null;

export const ShortsStudioToolbar: React.FC = () => {
  const {
    studioOpen,
    shortsAspect,
    setShortsAspect,
    stageAspectPreset,
    setStageAspectPreset,
    autoplayActive,
    startAutoplay,
    stopAutoplay,
    isPaused,
    togglePause,
    bgmEnabled,
    toggleBgm,
    bgmVolumeLevel,
    setBgmVolumeLevel,
    rangeMode,
    setRangeMode,
    customSelectedKeys,
    setCustomSelectedKeys,
    activeCatalog,
    stageBgClass,
    stageContainerRef,
    cameraZoom,
    setCameraZoom,
    hideSkyTokens,
    setHideSkyTokens,
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
    chantMeta,
  } = useShortsStudio();

  const [openTab, setOpenTab] = useState<StudioTabId>(null);
  const [showHookEditor, setShowHookEditor] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [previewSrtLang, setPreviewSrtLang] = useState<ExportLangCode>('ko');
  const [showSrtPreview, setShowSrtPreview] = useState(false);
  const [showLocalizedMeta, setShowLocalizedMeta] = useState(false);

  // Thumbnail Generator state
  const [thumbPreviewDim, setThumbPreviewDim] = useState<ThumbnailDimensions>('1080x1920');
  const [thumbDraft, setThumbDraft] = useState<ThumbnailDraft>({
    snapshotDataUrl: null,
    stageBgHex: '#F0F9FF',
    badgeText: '99% MISPRONOUNCE! · 3초 컷',
    headline1: '졸라맨 한국어',
    headline2: '진짜 정답은?!',
    footerSub: '졸라한글맨 · 1초 만에 이해하기!',
  });
  const [thumbBusy, setThumbBusy] = useState(false);
  const [thumbError, setThumbError] = useState<string | null>(null);
  const thumbCanvasRef = useRef<HTMLCanvasElement | null>(null);

  // Upload Package editable state (auto-refreshes when range/speed/series/pattern changes)
  const defaultAppLink = getStandaloneAppUrl();
  const [funnelLink, setFunnelLink] = useState(defaultAppLink);
  const [titles, setTitles] = useState<[string, string, string]>(['', '', '']);
  const [chaptersDesc, setChaptersDesc] = useState('');
  const [pinnedComment, setPinnedComment] = useState('');
  const [tagsText, setTagsText] = useState('');
  const [localizedMeta, setLocalizedMeta] = useState<LocalizedUploadMeta[]>([]);

  // Resolve current catalog & speed-synced timeline
  const allCatalogKeys = useMemo(() => activeCatalog.map((c) => c.key), [activeCatalog]);
  const selectedKeys = useMemo(
    () => resolveSelectedKeys(allCatalogKeys, rangeMode, customSelectedKeys, activeMeta.itemKey),
    [allCatalogKeys, rangeMode, customSelectedKeys, activeMeta.itemKey]
  );
  const selectedItems = useMemo(() => {
    const map = new Map(activeCatalog.map((item) => [item.key, item]));
    return selectedKeys.map((k) => map.get(k)).filter((v): v is NonNullable<typeof v> => Boolean(v));
  }, [activeCatalog, selectedKeys]);

  const timeline = useMemo(
    () =>
      buildSpeedSyncedTimeline(selectedItems, {
        seriesNum: activeMeta.seriesNum,
        playbackSpeed,
        quickCutMode,
        aftermathHoldSec,
        revealHoldSec,
        chantMeta,
      }),
    [
      selectedItems,
      activeMeta.seriesNum,
      playbackSpeed,
      quickCutMode,
      aftermathHoldSec,
      revealHoldSec,
      chantMeta,
    ]
  );

  // Auto-sync Upload Package whenever series / selection / speed / chantMeta / funnelLink / pattern updates
  const selectionSig = `${activeMeta.seriesNum}:${selectedKeys.join(',')}:${playbackSpeed.toFixed(2)}:${quickCutMode}:${aftermathHoldSec.toFixed(1)}:${revealHoldSec.toFixed(1)}:${chantMeta.bpm}:${chantMeta.repeats}:${funnelLink}:${titlePatternIndex}`;
  useEffect(() => {
    if (selectedItems.length === 0) return;
    const pkg = buildYouTubeUploadPackage(
      activeMeta.seriesNum,
      activeMeta.seriesTitle,
      timeline,
      funnelLink.trim() || defaultAppLink,
      titlePatternIndex
    );
    setTitles(pkg.titles);
    setChaptersDesc(pkg.chaptersDescription);
    setPinnedComment(pkg.pinnedComment);
    setTagsText(pkg.tags);
    setLocalizedMeta(pkg.localizedMeta);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectionSig]);

  // Pre-fill Thumbnail text smartly when switching episodes or capturing
  const syncThumbTextFromStage = useCallback(() => {
    setThumbDraft((prev) => ({
      ...prev,
      badgeText: activeMeta.viralHookTag || '외국인 99% 헷갈리는!',
      headline1: activeMeta.itemKey || activeMeta.seriesTitle,
      headline2: activeMeta.viralHookQuestion || activeMeta.itemLabel || '진짜 정답은?!',
      footerSub: `${activeMeta.seriesTitle} · 1초 만에 이해하기!`,
    }));
  }, [
    activeMeta.viralHookTag,
    activeMeta.itemKey,
    activeMeta.seriesTitle,
    activeMeta.viralHookQuestion,
    activeMeta.itemLabel,
  ]);

  const handleCaptureStageSnapshot = useCallback(
    async (alsoRefreshCopy = false) => {
      setThumbBusy(true);
      setThumbError(null);
      try {
        const { dataUrl, bgHex } = await captureLiveStageSnapshot(
          stageContainerRef.current,
          stageBgClass
        );
        setThumbDraft((prev) => ({
          ...prev,
          snapshotDataUrl: dataUrl,
          stageBgHex: bgHex,
          ...(alsoRefreshCopy
            ? {
                badgeText: activeMeta.viralHookTag || prev.badgeText,
                headline1: activeMeta.itemKey || prev.headline1,
                headline2: activeMeta.viralHookQuestion || activeMeta.itemLabel || prev.headline2,
                footerSub: `${activeMeta.seriesTitle} · 1초 만에 이해하기!`,
              }
            : {}),
        }));
      } catch (err) {
        setThumbError(err instanceof Error ? err.message : '스냅샷 캡처 중 오류가 발생했습니다.');
      } finally {
        setThumbBusy(false);
      }
    },
    [stageContainerRef, stageBgClass, activeMeta]
  );

  // Auto-capture initial frame when opening Thumbnail tab if empty
  useEffect(() => {
    if (openTab === 'thumbnail' && !thumbDraft.snapshotDataUrl) {
      syncThumbTextFromStage();
      void handleCaptureStageSnapshot(false);
    }
  }, [openTab, thumbDraft.snapshotDataUrl, syncThumbTextFromStage, handleCaptureStageSnapshot]);

  // Re-render live preview Canvas whenever draft or preview dimension changes
  useEffect(() => {
    if (openTab !== 'thumbnail' || !thumbCanvasRef.current) return;
    void renderThumbnailCanvas(thumbCanvasRef.current, thumbPreviewDim, thumbDraft);
  }, [openTab, thumbPreviewDim, thumbDraft]);

  const handleCopyText = useCallback((id: string, text: string) => {
    playCutePop();
    const markCopied = () => {
      setCopiedId(id);
      window.setTimeout(() => {
        setCopiedId((cur) => (cur === id ? null : cur));
      }, 1600);
    };

    if (navigator.clipboard?.writeText) {
      navigator.clipboard
        .writeText(text)
        .then(markCopied)
        .catch(() => {
          const ta = document.createElement('textarea');
          ta.value = text;
          ta.style.position = 'fixed';
          ta.style.opacity = '0';
          document.body.appendChild(ta);
          ta.select();
          try {
            document.execCommand('copy');
            markCopied();
          } finally {
            document.body.removeChild(ta);
          }
        });
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
        markCopied();
      } finally {
        document.body.removeChild(ta);
      }
    }
  }, []);

  const handleDownloadSingleSrt = (lang: ExportLangCode) => {
    playCutePop();
    const srt = generateSrtForLanguage(lang, activeMeta.seriesNum, timeline, chantMeta);
    const blob = new Blob([srt], { type: 'text/plain;charset=utf-8' });
    triggerBlobDownload(blob, `jollaman-s${activeMeta.seriesNum}-${lang}.srt`);
  };

  const handleDownloadAllSrtZip = () => {
    playCutePop();
    const entries = EXPORT_LANGUAGES.map((lang, i) => ({
      name: `${String(i + 1).padStart(2, '0')}_${lang.code}_${lang.label}.srt`,
      content: generateSrtForLanguage(lang.code, activeMeta.seriesNum, timeline, chantMeta),
    }));
    const zipBlob = createZipBlob(entries);
    triggerBlobDownload(zipBlob, `jollaman-s${activeMeta.seriesNum}-subtitles-8langs.zip`);
  };

  const handleDownloadFormatPackage = async (format: 'shorts' | 'main') => {
    playCutePop();
    const targetShorts = format === 'shorts';
    if (shortsAspect !== targetShorts) {
      setShortsAspect(targetShorts);
    }
    setCameraZoom(targetShorts ? 0.8 : 1.0);

    // Wait 2 animation frames so SVG viewBox updates cleanly before snapshot capture
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    );

    const entries = [
      ...EXPORT_LANGUAGES.map((lang, i) => ({
        name: `${String(i + 1).padStart(2, '0')}_${lang.code}_${lang.label}.srt`,
        content: generateSrtForLanguage(lang.code, activeMeta.seriesNum, timeline, chantMeta),
      })),
      {
        name: format === 'shorts' ? '00_쇼츠용_업로드패키지.txt' : '00_본편용_업로드패키지.txt',
        content: formatFullUploadPackageTxt({
          titles,
          chaptersDescription: chaptersDesc,
          pinnedComment,
          tags: tagsText,
          localizedMeta,
        }),
      },
    ];
    const zipBlob = createZipBlob(entries);
    triggerBlobDownload(
      zipBlob,
      `jollaman-s${activeMeta.seriesNum}-${format === 'shorts' ? 'shorts-9x16' : 'main-16x9'}.zip`
    );

    // Also capture & export exact matching resolution thumbnail PNG (1080x1920 or 1280x720)
    try {
      const { dataUrl, bgHex } = await captureLiveStageSnapshot(
        stageContainerRef.current,
        stageBgClass
      );
      await exportThumbnailPng(
        targetShorts ? '1080x1920' : '1280x720',
        {
          ...thumbDraft,
          snapshotDataUrl: dataUrl,
          stageBgHex: bgHex,
          badgeText: thumbDraft.badgeText || activeMeta.viralHookTag || '외국인 99% 헷갈리는!',
          headline1: thumbDraft.headline1 || activeMeta.itemKey || activeMeta.seriesTitle,
          headline2: thumbDraft.headline2 || activeMeta.viralHookQuestion || activeMeta.itemLabel,
          footerSub: thumbDraft.footerSub || `${activeMeta.seriesTitle}`,
        },
        `jollaman-s${activeMeta.seriesNum}-${format}`
      );
    } catch {
      // Zip already downloaded cleanly even if snapshot wasn't ready
    }
  };

  const handleDownloadTxtPackage = () => {
    playCutePop();
    const txt = formatFullUploadPackageTxt({
      titles,
      chaptersDescription: chaptersDesc,
      pinnedComment,
      tags: tagsText,
      localizedMeta,
    });
    const blob = new Blob([txt], { type: 'text/plain;charset=utf-8' });
    triggerBlobDownload(blob, `jollaman-s${activeMeta.seriesNum}-youtube-package.txt`);
  };

  const handleCopyAllPackage = () => {
    const txt = formatFullUploadPackageTxt({
      titles,
      chaptersDescription: chaptersDesc,
      pinnedComment,
      tags: tagsText,
      localizedMeta,
    });
    handleCopyText('all-pkg', txt);
  };

  const handleTrimTags500 = () => {
    playCutePop();
    const tokens = tagsText
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);
    let trimmed = '';
    for (const tk of tokens) {
      const candidate = trimmed ? `${trimmed}, ${tk}` : tk;
      if (candidate.length <= 500) trimmed = candidate;
      else break;
    }
    setTagsText(trimmed);
  };

  const handleExportThumbPng = async (dim: ThumbnailDimensions) => {
    playCutePop();
    setThumbBusy(true);
    try {
      await exportThumbnailPng(dim, thumbDraft, `jollaman-s${activeMeta.seriesNum}`);
    } finally {
      setThumbBusy(false);
    }
  };

  if (!studioOpen) return null;

  const tagsCharCount = tagsText.length;
  const tagsOverLimit = tagsCharCount > 500;

  return (
    <div className="bg-[#FFFFFF] border sm:border-2 border-[#141B29] rounded-none p-0.5 sm:p-1 flex flex-col gap-0.5 sm:gap-1 font-body text-[#141B29]">
      {/* Row 1: Ultra-compact Mode + Ratio(1:1, 4:3) + Simple + Safe + Hook + Preset (tightly packed, no gap) */}
      <div className="flex flex-wrap items-center gap-[2px] sm:gap-1 text-[10px] sm:text-[10.5px]">
        <button
          onClick={() => {
            playCutePop();
            const next = !shortsAspect;
            setShortsAspect(next);
            setCameraZoom(next ? 0.8 : 1.0);
          }}
          className={`font-mono-num px-1 sm:px-1.5 py-0.5 rounded-none border font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
            shortsAspect
              ? 'bg-[#DC2626] border-[#DC2626] text-white'
              : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-red-50'
          }`}
          title="9:16 쇼츠 / 16:9 본편 전환"
        >
          {shortsAspect ? '9:16' : '16:9'}
        </button>

        {SHORTS_STAGE_ASPECT_OPTIONS.map((opt) => (
          <button
            key={opt.id}
            onClick={() => {
              playCutePop();
              if (!shortsAspect) setShortsAspect(true);
              setStageAspectPreset(opt.id);
            }}
            className={`font-mono-num px-1 sm:px-1.5 py-0.5 rounded-none border whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
              stageAspectPreset === opt.id && shortsAspect
                ? 'bg-[#DC2626] border-[#DC2626] text-white'
                : stageAspectPreset === opt.id
                ? 'bg-[#141B29] border-[#141B29] text-white'
                : 'bg-[#FFFFFF] border-slate-300 text-slate-700 hover:border-[#141B29]'
            }`}
            title={`무대 비율 ${opt.label}`}
          >
            {opt.label}
          </button>
        ))}

        <button
          onClick={() => {
            playCutePop();
            if (!shortsAspect) {
              setShortsAspect(true);
              setCameraZoom(0.8);
              setSimpleWhiteShorts(true);
            } else {
              setSimpleWhiteShorts(!simpleWhiteShorts);
            }
          }}
          className={`px-1 py-0.5 rounded-none border whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center gap-0.5 ${
            shortsAspect && simpleWhiteShorts
              ? 'border-[#DC2626] bg-[#FFFFFF] text-[#141B29]'
              : 'border-slate-300 bg-[#FFFFFF] text-slate-600'
          }`}
          title="화이트심플 ON/OFF"
        >
          <span className={shortsAspect && simpleWhiteShorts ? 'text-[#DC2626]' : 'text-slate-400'}>
            {shortsAspect && simpleWhiteShorts ? '☑' : '☐'}
          </span>
          <span>심플</span>
        </button>

        <button
          onClick={() => {
            playCutePop();
            const next = !shortsSafeZoneGuide;
            if (next && !shortsAspect) {
              setShortsAspect(true);
              setCameraZoom(0.8);
            }
            setShortsSafeZoneGuide(next);
          }}
          className={`px-1 py-0.5 rounded-none border whitespace-nowrap shrink-0 cursor-pointer flex items-center gap-0.5 ${
            shortsSafeZoneGuide
              ? 'border-[#DC2626] bg-[#FFFFFF] text-[#141B29]'
              : 'border-slate-300 bg-[#FFFFFF] text-slate-600'
          }`}
          title="유튜브 쇼츠 가림 안전영역 미리보기"
        >
          <span className={shortsSafeZoneGuide ? 'text-[#DC2626]' : 'text-slate-400'}>
            {shortsSafeZoneGuide ? '☑' : '☐'}
          </span>
          <span>안전</span>
        </button>

        <button
          onClick={() => {
            playCutePop();
            setIntroHookEnabled(!introHookEnabled);
          }}
          className={`px-1 py-0.5 rounded-none border whitespace-nowrap shrink-0 cursor-pointer transition-colors flex items-center gap-0.5 ${
            introHookEnabled
              ? 'border-[#141B29] bg-[#FFFFFF] text-[#141B29]'
              : 'border-slate-300 bg-[#FFFFFF] text-slate-500'
          }`}
          title="1.5초 후킹 ON/OFF"
        >
          <span className={introHookEnabled ? 'text-[#DC2626]' : 'text-slate-400'}>
            {introHookEnabled ? '☑' : '☐'}
          </span>
          <span>후킹</span>
        </button>

        <button
          onClick={() => {
            playCutePop();
            setShowHookEditor((v) => !v);
          }}
          className={`w-[18px] h-[18px] sm:w-5 sm:h-5 flex items-center justify-center rounded-none border shrink-0 cursor-pointer transition-colors ${
            showHookEditor
              ? 'bg-[#141B29] border-[#141B29] text-white'
              : 'bg-[#FFFFFF] border-slate-300 text-slate-700 hover:border-[#141B29]'
          }`}
          title="1.5초 후킹 문구 편집"
          aria-label="후킹 편집 열기/닫기"
        >
          ✎
        </button>

        <button
          onClick={() => {
            playCutePop();
            applyViralPreset();
          }}
          className="px-1 sm:px-1.5 py-0.5 rounded-none border border-[#DC2626] bg-[#DC2626] hover:bg-[#B91C1C] text-white font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors"
          title="9:16 + 1:1 + 하늘버튼 + 훅 + 말풍선 추천세팅"
        >
          추천
        </button>
      </div>

      {/* Collapsible 1.5s Intro Hook Editor (saves ~85px height when closed) */}
      {showHookEditor && (
        <div className="border border-slate-300 bg-slate-50 p-1 sm:p-1.5 flex flex-col gap-1 sm:gap-1.5 text-[10px] sm:text-[11px]">
          <div className="flex flex-wrap items-center justify-between gap-0.5 sm:gap-1">
            <button
              onClick={() => {
                playCutePop();
                setIntroHookSubtitleEnabled(!introHookSubtitleEnabled);
              }}
              disabled={!introHookEnabled}
              className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white font-bold text-slate-900 whitespace-nowrap shrink-0 cursor-pointer disabled:opacity-40 flex items-center gap-0.5 sm:gap-1"
            >
              <span className={introHookEnabled && introHookSubtitleEnabled ? 'text-red-600' : 'text-slate-400'}>
                {introHookEnabled && introHookSubtitleEnabled ? '☑' : '☐'}
              </span>
              <span className="sm:hidden">자막</span>
              <span className="hidden sm:inline">후킹 자막</span>
            </button>

            <div className="flex items-center gap-0.5 sm:gap-1">
              <button
                onClick={() => {
                  playCutePop();
                  previewIntroHook();
                }}
                className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-100 text-slate-900 font-bold whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="sm:hidden">▶미리</span>
                <span className="hidden sm:inline">▶ 1.5초 미리보기</span>
              </button>
              <button
                onClick={() => {
                  playCutePop();
                  resetIntroHookDefaults();
                }}
                className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-300 bg-white hover:border-slate-900 text-slate-700 font-bold whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span className="sm:hidden">자동</span>
                <span className="hidden sm:inline">자동생성</span>
              </button>
            </div>
          </div>

          {introHookEnabled && (
            <div className="flex flex-col gap-1 sm:gap-1.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-1.5">
                <label className="flex items-start gap-1 sm:gap-1.5 bg-white border border-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-0">
                  <span className="font-bold text-slate-600 whitespace-nowrap shrink-0 pt-0.5">
                    <span className="sm:hidden">EN</span>
                    <span className="hidden sm:inline">장면(EN)</span>
                  </span>
                  <textarea
                    rows={2}
                    value={introHookTitle}
                    onChange={(e) => setIntroHookTitle(e.target.value)}
                    placeholder="English hook headline (Enter for line break)"
                    className="flex-1 min-w-0 bg-transparent font-bold text-slate-950 focus:outline-none resize-none leading-snug"
                  />
                </label>
                <div className="flex flex-col gap-1 sm:gap-1.5 min-w-0">
                  <label className="flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-0">
                    <span className="font-bold text-slate-600 whitespace-nowrap shrink-0">
                      <span className="sm:hidden">한글</span>
                      <span className="hidden sm:inline">한글병기</span>
                    </span>
                    <input
                      type="text"
                      value={introHookTitleKo}
                      onChange={(e) => setIntroHookTitleKo(e.target.value)}
                      placeholder="영문 아래 작게 표시할 한글 문구"
                      className="flex-1 min-w-0 bg-transparent font-bold text-slate-950 focus:outline-none"
                    />
                  </label>
                  <label
                    className={`flex items-center gap-1 sm:gap-1.5 bg-white border border-slate-300 px-1.5 sm:px-2 py-0.5 sm:py-1 min-w-0 ${
                      introHookSubtitleEnabled ? '' : 'opacity-50'
                    }`}
                  >
                    <span className="font-bold text-slate-600 whitespace-nowrap shrink-0">자막</span>
                    <input
                      type="text"
                      value={introHookSubtitle}
                      disabled={!introHookSubtitleEnabled}
                      onChange={(e) => setIntroHookSubtitle(e.target.value)}
                      placeholder="초반 1.5초 후킹 자막"
                      className="flex-1 min-w-0 bg-transparent font-bold text-slate-950 focus:outline-none"
                    />
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Row 2: Streamlined 4-Tab Bar (compact, never clipped) */}
      <div className="grid grid-cols-4 gap-0.5 sm:gap-1 pt-0.5 sm:pt-1 border-t border-slate-200">
        <button
          onClick={() => {
            playCutePop();
            setOpenTab((cur) => (cur === 'controls' ? null : 'controls'));
          }}
          className={`px-0.5 sm:px-1 py-0.5 rounded-none border text-[10.5px] sm:text-[11px] whitespace-nowrap shrink-0 cursor-pointer transition-colors text-center ${
            openTab === 'controls'
              ? 'bg-[#DC2626] border-[#DC2626] text-white font-bold'
              : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-red-50'
          }`}
        >
          카메라
        </button>

        <button
          onClick={() => {
            playCutePop();
            setOpenTab((cur) => (cur === 'range' ? null : 'range'));
          }}
          className={`font-mono-num px-0.5 sm:px-1 py-0.5 rounded-none border text-[10.5px] sm:text-[11px] whitespace-nowrap shrink-0 cursor-pointer transition-colors text-center ${
            openTab === 'range'
              ? 'bg-[#DC2626] border-[#DC2626] text-white font-bold'
              : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-red-50'
          }`}
        >
          범위({selectedItems.length})
        </button>

        <button
          onClick={() => {
            playCutePop();
            setOpenTab((cur) => (cur === 'thumbnail' ? null : 'thumbnail'));
          }}
          className={`px-0.5 sm:px-1 py-0.5 rounded-none border text-[10.5px] sm:text-[11px] whitespace-nowrap shrink-0 cursor-pointer transition-colors text-center ${
            openTab === 'thumbnail'
              ? 'bg-[#DC2626] border-[#DC2626] text-white font-bold'
              : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-red-50'
          }`}
        >
          <span className="sm:hidden">썸네</span>
          <span className="hidden sm:inline">썸네일</span>
        </button>

        <button
          onClick={() => {
            playCutePop();
            setOpenTab((cur) => (cur === 'export' ? null : 'export'));
          }}
          className={`px-0.5 sm:px-1 py-0.5 rounded-none border text-[10.5px] sm:text-[11px] whitespace-nowrap shrink-0 cursor-pointer transition-colors text-center ${
            openTab === 'export'
              ? 'bg-[#DC2626] border-[#DC2626] text-white font-bold'
              : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-red-50'
          }`}
        >
          업로드
        </button>
      </div>

      {/* TAB 0: Zoom, Speed, Holds & Toggles (No left/right pan, ultra-compact) */}
      {openTab === 'controls' && (
        <div className="bg-[#FFFFFF] border border-[#141B29] rounded-none p-0.5 sm:p-1 flex flex-col gap-0.5 sm:gap-1 text-[10px] sm:text-[11px]">
          <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
            {[0.75, 1.0, 1.25, 1.5].map((sp) => (
              <button
                key={sp}
                onClick={() => {
                  playCutePop();
                  setPlaybackSpeed(sp);
                }}
                className={`font-mono-num px-1.5 py-0.5 text-[10.5px] rounded-none border cursor-pointer whitespace-nowrap shrink-0 ${
                  Math.abs(playbackSpeed - sp) < 0.03
                    ? 'bg-[#141B29] border-[#141B29] text-white'
                    : 'bg-[#FFFFFF] border-slate-300 text-slate-700 hover:border-[#141B29]'
                }`}
              >
                {sp}x
              </button>
            ))}
            <button
              onClick={() => {
                playCutePop();
                setCameraZoom(shortsAspect ? 0.8 : 1.0);
                setPlaybackSpeed(1.0);
                setAftermathHoldSec(1.3);
                setRevealHoldSec(1.8);
              }}
              className="px-1.5 py-0.5 rounded-none border border-[#141B29] bg-[#FFFFFF] hover:bg-slate-50 text-[10px] sm:text-[10.5px] text-[#141B29] cursor-pointer whitespace-nowrap shrink-0"
            >
              <span className="sm:hidden">리셋</span>
              <span className="hidden sm:inline">초기화</span>
            </button>
          </div>

          {/* Ultra-Compact 2x2 Sliders Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-0.5 sm:gap-1 text-[#141B29]">
            <label className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5 min-w-0">
              <span className="whitespace-nowrap shrink-0 text-[10px] sm:text-[10.5px]">줌</span>
              <input
                type="range"
                min={0.7}
                max={1.8}
                step={0.05}
                value={cameraZoom}
                onChange={(e) => setCameraZoom(parseFloat(e.target.value))}
                className="flex-1 min-w-0 accent-[#DC2626] cursor-pointer"
              />
              <span className="font-mono-num text-[10px] sm:text-[10.5px] w-8 sm:w-9 text-right shrink-0">{cameraZoom.toFixed(2)}x</span>
            </label>

            <label className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5 min-w-0">
              <span className="whitespace-nowrap shrink-0 text-[10px] sm:text-[10.5px]">배속</span>
              <input
                type="range"
                min={0.5}
                max={2.0}
                step={0.05}
                value={playbackSpeed}
                onChange={(e) => setPlaybackSpeed(parseFloat(e.target.value))}
                className="flex-1 min-w-0 accent-[#DC2626] cursor-pointer"
              />
              <span className="font-mono-num text-[10px] sm:text-[10.5px] w-8 sm:w-9 text-right text-[#DC2626] font-bold shrink-0">
                {playbackSpeed.toFixed(2)}x
              </span>
            </label>

            <label className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5 min-w-0">
              <span className="whitespace-nowrap shrink-0 text-[10px] sm:text-[10.5px]">장면</span>
              <input
                type="range"
                min={0.4}
                max={5.0}
                step={0.1}
                value={aftermathHoldSec}
                onChange={(e) => setAftermathHoldSec(parseFloat(e.target.value))}
                className="flex-1 min-w-0 accent-[#DC2626] cursor-pointer"
              />
              <span className="font-mono-num text-[10px] sm:text-[10.5px] w-7 sm:w-8 text-right text-[#DC2626] font-bold shrink-0">
                {aftermathHoldSec.toFixed(1)}s
              </span>
            </label>

            <label className="flex items-center gap-1 bg-slate-50 border border-slate-300 rounded-none px-1 sm:px-1.5 py-0.5 min-w-0">
              <span className="whitespace-nowrap shrink-0 text-[10px] sm:text-[10.5px]">카드</span>
              <input
                type="range"
                min={0.6}
                max={5.0}
                step={0.1}
                value={revealHoldSec}
                onChange={(e) => setRevealHoldSec(parseFloat(e.target.value))}
                className="flex-1 min-w-0 accent-[#DC2626] cursor-pointer"
              />
              <span className="font-mono-num text-[10px] sm:text-[10.5px] w-7 sm:w-8 text-right font-bold shrink-0">
                {revealHoldSec.toFixed(1)}s
              </span>
            </label>
          </div>

          {/* Tight 5-col mobile / 9-col desktop Compact Toggles */}
          <div className="grid grid-cols-5 lg:grid-cols-9 gap-0.5 sm:gap-1">
            {[
              { label: '하늘숨김', mLabel: '하늘', active: hideSkyTokens, toggle: () => setHideSkyTokens(!hideSkyTokens) },
              { label: '훅자막', mLabel: '훅글', active: viralHookEnabled, toggle: () => setViralHookEnabled(!viralHookEnabled) },
              { label: '말풍선', mLabel: '말풍', active: comicBubbleEnabled, toggle: () => setComicBubbleEnabled(!comicBubbleEnabled) },
              { label: '숏컷', mLabel: '숏컷', active: quickCutMode, toggle: () => setQuickCutMode(!quickCutMode) },
              { label: '무한루프', mLabel: '루프', active: infiniteLoop, toggle: () => setInfiniteLoop(!infiniteLoop) },
              { label: '로마자', mLabel: '로마', active: globalRomanization, toggle: () => setGlobalRomanization(!globalRomanization) },
              { label: '글로벌', mLabel: '글로', active: globalAudienceMode, toggle: () => setGlobalAudienceMode(!globalAudienceMode) },
              { label: '하단설명', mLabel: '설명', active: showStepHud, toggle: () => setShowStepHud(!showStepHud) },
              { label: '@로고', mLabel: '로고', active: channelWatermarkEnabled, toggle: () => setChannelWatermarkEnabled(!channelWatermarkEnabled) },
            ].map((item) => (
              <button
                key={item.label}
                onClick={() => {
                  playCutePop();
                  item.toggle();
                }}
                className={`px-0.5 sm:px-1 py-0.5 rounded-none border text-[9.5px] sm:text-[10.5px] cursor-pointer whitespace-nowrap flex items-center justify-center gap-0.5 ${
                  item.active
                    ? 'border-[#141B29] bg-[#FFFFFF] text-[#141B29]'
                    : 'border-slate-300 bg-[#FFFFFF] text-slate-500'
                }`}
              >
                <span className={item.active ? 'text-[#DC2626]' : 'text-slate-400'}>
                  {item.active ? '☑' : '☐'}
                </span>
                <span className="sm:hidden">{item.mLabel}</span>
                <span className="hidden sm:inline">{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* TAB 1: Shooting Range Selector */}
      {openTab === 'range' && (
        <div className="bg-[#FFFFFF] border sm:border-2 border-[#141B29] rounded-none p-1 sm:p-2 flex flex-col gap-1 sm:gap-2">
          <div className="flex flex-wrap items-center justify-between gap-0.5 sm:gap-1.5">
            <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
              <span className="hidden sm:inline text-xs text-[#141B29] mr-1">범위:</span>
              {[
                { id: 'all' as ShortsRangeMode, label: '전체 연속', mLabel: '전체' },
                { id: 'part1' as ShortsRangeMode, label: '1부', mLabel: '1부' },
                { id: 'part2' as ShortsRangeMode, label: '2부', mLabel: '2부' },
                { id: 'part3' as ShortsRangeMode, label: '3부', mLabel: '3부' },
                { id: 'single' as ShortsRangeMode, label: '단일(1개)', mLabel: '1개' },
                { id: 'custom' as ShortsRangeMode, label: '선택 묶음', mLabel: '선택' },
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => {
                    playCutePop();
                    setRangeMode(m.id);
                  }}
                  className={`px-1.5 py-0.5 sm:px-2 sm:py-1 rounded-none border text-[10px] sm:text-xs whitespace-nowrap shrink-0 cursor-pointer transition-colors ${
                    rangeMode === m.id
                      ? 'bg-[#DC2626] border-[#DC2626] text-white'
                      : 'bg-[#FFFFFF] border-slate-300 text-[#141B29] hover:border-[#141B29]'
                  }`}
                >
                  <span className="sm:hidden">{m.mLabel}</span>
                  <span className="hidden sm:inline">{m.label}</span>
                </button>
              ))}
            </div>

            {rangeMode === 'custom' && (
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  onClick={() => {
                    playCutePop();
                    setCustomSelectedKeys(allCatalogKeys);
                  }}
                  className="px-1.5 sm:px-2 py-0.5 rounded-none border border-[#141B29] bg-[#FFFFFF] hover:bg-slate-50 text-[10px] sm:text-[11px] text-[#141B29] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="sm:hidden">전선택</span>
                  <span className="hidden sm:inline">전체 선택</span>
                </button>
                <button
                  onClick={() => {
                    playCutePop();
                    setCustomSelectedKeys(allCatalogKeys.slice(0, 1));
                  }}
                  className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-300 bg-[#FFFFFF] hover:border-[#141B29] text-[10px] sm:text-[11px] text-slate-700 cursor-pointer whitespace-nowrap shrink-0"
                >
                  1개만
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-7 gap-0.5 sm:gap-1">
            {activeCatalog.map((item) => {
              const checked = selectedKeys.includes(item.key);
              return (
                <label
                  key={item.key}
                  onClick={(e) => {
                    if (rangeMode !== 'single' && rangeMode !== 'custom') {
                      e.preventDefault();
                      playCutePop();
                      setRangeMode('custom');
                      setCustomSelectedKeys([item.key]);
                    }
                  }}
                  className={`flex items-center gap-1 sm:gap-1.5 px-1 sm:px-2 py-0.5 sm:py-1 rounded-none border text-[10px] sm:text-xs cursor-pointer transition-colors ${
                    checked
                      ? 'bg-[#FFFFFF] border-[#DC2626] text-[#141B29]'
                      : 'bg-[#FFFFFF] border-slate-300 text-slate-600 hover:border-[#141B29]'
                  }`}
                >
                  <input
                    type={rangeMode === 'single' ? 'radio' : 'checkbox'}
                    name="jollaman-range-pick"
                    checked={checked}
                    onChange={() => {
                      playCutePop();
                      if (rangeMode === 'single') {
                        setCustomSelectedKeys([item.key]);
                      } else {
                        if (rangeMode !== 'custom') setRangeMode('custom');
                        setCustomSelectedKeys((prev) => {
                          if (prev.includes(item.key)) {
                            const next = prev.filter((k) => k !== item.key);
                            return next.length > 0 ? next : [item.key];
                          }
                          return [...prev, item.key];
                        });
                      }
                    }}
                    className="accent-[#DC2626] cursor-pointer shrink-0"
                  />
                  <span className="truncate">{item.label}</span>
                </label>
              );
            })}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-2 pt-1 sm:pt-1.5 border-t border-slate-200 text-[10.5px] sm:text-xs">
            <span className="font-mono-num text-[#141B29]">
              <span className="hidden sm:inline">러닝타임 </span>
              <strong className="text-[#DC2626]">{timeline.totalDurationSec.toFixed(1)}초</strong>{' '}
              ({selectedItems.length}개 · {playbackSpeed.toFixed(2)}x{quickCutMode ? ' · 숏컷' : ''})
            </span>
            <button
              onClick={() => {
                playCutePop();
                if (autoplayActive) stopAutoplay();
                else startAutoplay();
              }}
              className="px-2 sm:px-3 py-0.5 sm:py-1 rounded-none bg-[#141B29] hover:bg-[#1E293B] text-white whitespace-nowrap shrink-0 cursor-pointer"
            >
              <span className="sm:hidden">▶선택재생</span>
              <span className="hidden sm:inline">▶ 선택 범위 재생</span>
            </button>
          </div>
        </div>
      )}

      {/* TAB 2: Live SVG Snapshot Thumbnail Generator */}
      {openTab === 'thumbnail' && (
        <div className="bg-[#FFFFFF] border sm:border-2 border-[#141B29] rounded-none p-1 sm:p-2.5 grid grid-cols-1 md:grid-cols-12 gap-1.5 sm:gap-3 items-start">
          {/* Left: Live Canvas Preview */}
          <div className="md:col-span-5 flex flex-col items-center gap-1 sm:gap-2 bg-slate-950 rounded-none p-1.5 sm:p-2.5">
            <div className="w-full flex items-center justify-between gap-1 sm:gap-2 text-[11px] sm:text-xs">
              <span className="font-bold text-white">
                <span className="sm:hidden">미리보기</span>
                <span className="hidden sm:inline">썸네일 미리보기</span>
              </span>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => {
                    playCutePop();
                    setThumbPreviewDim('1080x1920');
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-none text-[10.5px] sm:text-[11px] font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                    thumbPreviewDim === '1080x1920'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  9:16
                </button>
                <button
                  onClick={() => {
                    playCutePop();
                    setThumbPreviewDim('1280x720');
                  }}
                  className={`px-1.5 sm:px-2 py-0.5 rounded-none text-[10.5px] sm:text-[11px] font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                    thumbPreviewDim === '1280x720'
                      ? 'bg-red-600 text-white'
                      : 'bg-slate-800 text-slate-300 hover:text-white'
                  }`}
                >
                  16:9
                </button>
              </div>
            </div>

            <canvas
              ref={thumbCanvasRef}
              className={`rounded-none border border-slate-700 bg-slate-950 ${
                thumbPreviewDim === '1080x1920'
                  ? 'w-full max-w-[115px] sm:max-w-[180px] aspect-[9/16]'
                  : 'w-full max-w-[210px] sm:max-w-[320px] aspect-[16/9]'
              }`}
            />
          </div>

          {/* Right: Controls + Export Buttons */}
          <div className="md:col-span-7 flex flex-col gap-1 sm:gap-2 text-[11px] sm:text-xs">
            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5">
              <button
                onClick={() => {
                  playCutePop();
                  void handleCaptureStageSnapshot(false);
                }}
                disabled={thumbBusy}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                {thumbBusy ? '캡처...' : (
                  <>
                    <span className="sm:hidden">장면캡처</span>
                    <span className="hidden sm:inline">현재 장면 캡처</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  playCutePop();
                  void handleCaptureStageSnapshot(true);
                }}
                disabled={thumbBusy}
                className="px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-none border border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="sm:hidden">캡처+문구</span>
                <span className="hidden sm:inline">장면+문구 불러오기</span>
              </button>

              {thumbError && <span className="text-red-600 font-bold">{thumbError}</span>}
            </div>

            <div className="grid grid-cols-2 gap-1 sm:gap-1.5">
              <label className="flex flex-col gap-0.5 sm:gap-1">
                <span className="font-bold text-slate-700">
                  <span className="sm:hidden">배지</span>
                  <span className="hidden sm:inline">포인트 배지</span>
                </span>
                <input
                  type="text"
                  value={thumbDraft.badgeText}
                  onChange={(e) => setThumbDraft((p) => ({ ...p, badgeText: e.target.value }))}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-300 bg-white font-bold text-slate-950 focus:border-slate-900 focus:outline-none"
                  placeholder="예: 외국인 99% 헷갈리는!"
                />
              </label>

              <label className="flex flex-col gap-0.5 sm:gap-1">
                <span className="font-bold text-slate-700">
                  <span className="sm:hidden">하단</span>
                  <span className="hidden sm:inline">하단 리본 문구</span>
                </span>
                <input
                  type="text"
                  value={thumbDraft.footerSub}
                  onChange={(e) => setThumbDraft((p) => ({ ...p, footerSub: e.target.value }))}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-300 bg-white font-bold text-slate-950 focus:border-slate-900 focus:outline-none"
                  placeholder="예: 졸라한글맨 · 1초 만에 이해하기!"
                />
              </label>

              <label className="flex flex-col gap-0.5 sm:gap-1">
                <span className="font-bold text-slate-700">
                  <span className="sm:hidden">제목1</span>
                  <span className="hidden sm:inline">헤드라인 1줄</span>
                </span>
                <input
                  type="text"
                  value={thumbDraft.headline1}
                  onChange={(e) => setThumbDraft((p) => ({ ...p, headline1: e.target.value }))}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-300 bg-white font-bold text-slate-950 focus:border-slate-900 focus:outline-none"
                />
              </label>

              <label className="flex flex-col gap-0.5 sm:gap-1">
                <span className="font-bold text-slate-700">
                  <span className="sm:hidden">제목2</span>
                  <span className="hidden sm:inline">헤드라인 2줄 (강조)</span>
                </span>
                <input
                  type="text"
                  value={thumbDraft.headline2}
                  onChange={(e) => setThumbDraft((p) => ({ ...p, headline2: e.target.value }))}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-300 bg-white font-bold text-slate-950 focus:border-slate-900 focus:outline-none"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-1 sm:gap-1.5 pt-1 sm:pt-1.5 border-t border-slate-200">
              <button
                onClick={() => void handleExportThumbPng('1080x1920')}
                disabled={thumbBusy}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-none bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="sm:hidden">⬇쇼츠PNG</span>
                <span className="hidden sm:inline">⬇ 1080×1920 (쇼츠) PNG</span>
              </button>

              <button
                onClick={() => void handleExportThumbPng('1280x720')}
                disabled={thumbBusy}
                className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-none bg-slate-950 hover:bg-slate-800 disabled:opacity-50 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
              >
                <span className="sm:hidden">⬇가로PNG</span>
                <span className="hidden sm:inline">⬇ 1280×720 (가로) PNG</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: 8-Language .SRT Subtitles & YouTube Upload Package */}
      {openTab === 'export' && (
        <div className="bg-[#FFFFFF] border sm:border-2 border-[#141B29] rounded-none p-1 sm:p-2 flex flex-col gap-1 sm:gap-2 text-[10.5px] sm:text-xs">
          {/* Section A: 8-Language SRT Batch ZIP & Individual Downloads */}
          <div className="border border-slate-300 p-1 sm:p-2 flex flex-col gap-1 sm:gap-2">
            <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-1.5">
              <div>
                <h3 className="font-game text-xs sm:text-base text-[#141B29] font-normal">
                  <span className="sm:hidden">8국어(.srt)</span>
                  <span className="hidden sm:inline">8개국어 자막 (.srt)</span> · <span className="font-mono-num text-[10.5px] sm:text-xs text-[#DC2626]">{playbackSpeed.toFixed(2)}x · {timeline.totalDurationSec.toFixed(1)}초</span>
                </h3>
              </div>

              <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                <button
                  onClick={() => {
                    playCutePop();
                    setShowSrtPreview((v) => !v);
                  }}
                  className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-[#141B29] bg-[#FFFFFF] hover:bg-slate-50 text-[#141B29] cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="sm:hidden">{showSrtPreview ? '닫기' : '미리'}</span>
                  <span className="hidden sm:inline">{showSrtPreview ? '미리보기 닫기' : '자막 미리보기'}</span>
                </button>
                <button
                  onClick={handleDownloadAllSrtZip}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-[#141B29] hover:bg-[#1E293B] text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="sm:hidden">⬇ZIP</span>
                  <span className="hidden sm:inline">⬇ 8개국어 ZIP</span>
                </button>
                <button
                  onClick={() => void handleDownloadFormatPackage('shorts')}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-[#DC2626] hover:bg-[#B91C1C] text-white cursor-pointer whitespace-nowrap shrink-0"
                  title="9:16 세로 썸네일(1080×1920) + 8개국어 자막·쇼츠용 패키지 일괄 저장"
                >
                  <span className="sm:hidden">⬇쇼츠</span>
                  <span className="hidden sm:inline">⬇ 쇼츠용 저장</span>
                </button>
                <button
                  onClick={() => void handleDownloadFormatPackage('main')}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none border border-[#141B29] bg-[#FFFFFF] hover:bg-slate-50 text-[#141B29] cursor-pointer whitespace-nowrap shrink-0"
                  title="16:9 가로 썸네일(1280×720) + 8개국어 자막·본편용 챕터 패키지 일괄 저장"
                >
                  <span className="sm:hidden">⬇본편</span>
                  <span className="hidden sm:inline">⬇ 본편용 저장</span>
                </button>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
              {EXPORT_LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setPreviewSrtLang(lang.code);
                    handleDownloadSingleSrt(lang.code);
                  }}
                  className="px-1 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-300 bg-white hover:border-slate-900 text-slate-800 font-bold cursor-pointer whitespace-nowrap shrink-0 transition-colors text-[10px] sm:text-xs"
                  title={`${lang.label}(${lang.nativeName}) .srt 단독 다운로드`}
                >
                  <span className="sm:hidden">{lang.label}⬇</span>
                  <span className="hidden sm:inline">{lang.label} .srt ⬇</span>
                </button>
              ))}
            </div>

            {showSrtPreview && (
              <div className="pt-1 border-t border-slate-200 flex flex-col gap-1 sm:gap-1.5">
                <div className="flex flex-wrap items-center gap-0.5 sm:gap-1">
                  {EXPORT_LANGUAGES.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => setPreviewSrtLang(lang.code)}
                      className={`px-1.5 sm:px-2 py-0.5 rounded-none border text-[10px] sm:text-[11px] font-bold cursor-pointer whitespace-nowrap shrink-0 ${
                        previewSrtLang === lang.code
                          ? 'bg-red-600 border-red-600 text-white'
                          : 'bg-white border-slate-300 text-slate-700 hover:border-slate-900'
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
                <pre className="p-1.5 sm:p-2 rounded-none bg-slate-950 text-slate-100 font-mono text-[10px] sm:text-[11px] max-h-28 sm:max-h-36 overflow-y-auto whitespace-pre-wrap leading-relaxed tabular-nums">
                  {generateSrtForLanguage(previewSrtLang, activeMeta.seriesNum, timeline, chantMeta)}
                </pre>
              </div>
            )}
          </div>

          {/* Section B: YouTube Upload Metadata Package */}
          <div className="border border-slate-300 p-1 sm:p-2 flex flex-col gap-1 sm:gap-2">
            <div className="flex flex-wrap items-center justify-between gap-1 sm:gap-1.5">
              <h3 className="font-game text-xs sm:text-base text-[#141B29] font-normal">
                <span className="sm:hidden">유튜브 패키지</span>
                <span className="hidden sm:inline">유튜브 업로드 패키지 (제목 3종 · 챕터 · 고정댓글 · 태그)</span>
              </h3>
              <div className="flex items-center gap-0.5 sm:gap-1">
                <button
                  onClick={handleCopyAllPackage}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-[#DC2626] hover:bg-[#B91C1C] text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedId === 'all-pkg' ? '✓복사' : (
                    <>
                      <span className="sm:hidden">전복사</span>
                      <span className="hidden sm:inline">전체 복사</span>
                    </>
                  )}
                </button>
                <button
                  onClick={handleDownloadTxtPackage}
                  className="px-1.5 sm:px-2.5 py-0.5 sm:py-1 rounded-none bg-[#141B29] hover:bg-[#1E293B] text-white cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="sm:hidden">.txt</span>
                  <span className="hidden sm:inline">.txt 저장</span>
                </button>
              </div>
            </div>

            {/* 3 Title Variants + Pattern Switcher */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <div className="flex items-center gap-1 sm:gap-1.5">
                  <span className="font-bold text-slate-800">
                    <span className="sm:hidden">1.제목</span>
                    <span className="hidden sm:inline">1. 추천 제목</span>
                  </span>
                  <span className="px-1 sm:px-1.5 py-0.5 border border-slate-300 bg-slate-50 text-slate-800 font-bold text-[10px] sm:text-[11px]">
                    {TITLE_PATTERN_LABELS[titlePatternIndex % 5]}
                  </span>
                </div>
                <button
                  onClick={() => {
                    playCutePop();
                    cycleTitlePattern();
                  }}
                  className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 text-slate-900 font-bold cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="sm:hidden">패턴변경</span>
                  <span className="hidden sm:inline">제목 패턴 변경</span>
                </button>
              </div>
              {titles.map((t, idx) => (
                <div key={idx} className="flex items-center gap-0.5 sm:gap-1">
                  <span className="px-1 sm:px-1.5 py-0.5 sm:py-1 bg-slate-100 border border-slate-300 text-slate-700 font-bold tabular-nums shrink-0">
                    {idx + 1}
                  </span>
                  <input
                    type="text"
                    value={t}
                    onChange={(e) => {
                      const next: [string, string, string] = [...titles] as [string, string, string];
                      next[idx] = e.target.value;
                      setTitles(next);
                    }}
                    className="flex-1 min-w-0 px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-300 bg-white font-bold text-slate-950 focus:border-slate-900 focus:outline-none"
                  />
                  <button
                    onClick={() => handleCopyText(`title-${idx}`, t)}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-none border border-slate-900 bg-white hover:bg-slate-50 font-bold text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedId === `title-${idx}` ? '✓' : '복사'}
                  </button>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-1 sm:gap-2">
              <div className="flex flex-col gap-0.5 sm:gap-1">
                <div className="flex items-center justify-between gap-1 sm:gap-2">
                  <span className="font-bold text-slate-800">
                    <span className="sm:hidden">2.챕터</span>
                    <span className="hidden sm:inline">2. 챕터 설명란</span>
                  </span>
                  <button
                    onClick={() => handleCopyText('chapters', chaptersDesc)}
                    className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 font-bold text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedId === 'chapters' ? '✓' : '복사'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={chaptersDesc}
                  onChange={(e) => setChaptersDesc(e.target.value)}
                  className="w-full p-1 sm:p-2 rounded-none border border-slate-300 bg-white font-medium text-slate-950 leading-snug sm:leading-relaxed tabular-nums focus:border-slate-900 focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-0.5 sm:gap-1">
                <div className="flex items-center justify-between gap-1 sm:gap-2">
                  <span className="font-bold text-slate-800">
                    <span className="sm:hidden">3.고정댓</span>
                    <span className="hidden sm:inline">3. 고정댓글 (링크)</span>
                  </span>
                  <button
                    onClick={() => handleCopyText('pinned', pinnedComment)}
                    className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 font-bold text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedId === 'pinned' ? '✓' : '복사'}
                  </button>
                </div>
                <div className="flex items-center gap-1">
                  <span className="text-[10px] sm:text-[11px] font-bold text-slate-600 whitespace-nowrap">링크:</span>
                  <input
                    type="text"
                    value={funnelLink}
                    onChange={(e) => setFunnelLink(e.target.value)}
                    className="flex-1 min-w-0 px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-300 bg-white text-[10.5px] sm:text-[11px] font-bold text-slate-900 focus:border-slate-900 focus:outline-none"
                    placeholder="https://..."
                  />
                </div>
                <textarea
                  rows={2}
                  value={pinnedComment}
                  onChange={(e) => setPinnedComment(e.target.value)}
                  className="w-full p-1 sm:p-2 rounded-none border border-slate-300 bg-white font-medium text-slate-950 leading-snug sm:leading-relaxed focus:border-slate-900 focus:outline-none"
                />
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-col gap-0.5 sm:gap-1">
              <div className="flex flex-wrap items-center justify-between gap-1">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <span className="font-bold text-slate-800">4. 태그</span>
                  <span
                    className={`font-bold tabular-nums ${
                      tagsOverLimit ? 'text-red-600' : 'text-slate-700'
                    }`}
                  >
                    {tagsCharCount}/500 {tagsOverLimit ? '(초과)' : ''}
                  </span>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1">
                  {tagsOverLimit && (
                    <button
                      onClick={handleTrimTags500}
                      className="px-1.5 sm:px-2 py-0.5 rounded-none bg-red-600 text-white font-bold cursor-pointer whitespace-nowrap shrink-0"
                    >
                      500자 맞춤
                    </button>
                  )}
                  <button
                    onClick={() => handleCopyText('tags', tagsText)}
                    className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 font-bold text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {copiedId === 'tags' ? '✓' : '복사'}
                  </button>
                </div>
              </div>
              <textarea
                rows={2}
                value={tagsText}
                onChange={(e) => setTagsText(e.target.value)}
                className={`w-full p-1 sm:p-1.5 rounded-none border font-bold text-slate-950 focus:outline-none ${
                  tagsOverLimit ? 'border-red-600 bg-red-50' : 'border-slate-300 bg-white focus:border-slate-900'
                }`}
              />
            </div>

            {/* 5. 8-Language Localized Metadata */}
            <div className="pt-1 sm:pt-1.5 border-t border-slate-200 flex flex-col gap-1 sm:gap-1.5">
              <div className="flex items-center justify-between gap-1 sm:gap-2">
                <span className="font-bold text-slate-800">
                  <span className="sm:hidden">5. 다국어(8)</span>
                  <span className="hidden sm:inline">5. 다국어 제목·설명 복사용 (8개국어)</span>
                </span>
                <button
                  onClick={() => {
                    playCutePop();
                    setShowLocalizedMeta((v) => !v);
                  }}
                  className="px-1.5 sm:px-2 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 font-bold text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span className="sm:hidden">{showLocalizedMeta ? '닫기▲' : '보기▼'}</span>
                  <span className="hidden sm:inline">{showLocalizedMeta ? '닫기 ▲' : '8개국어 보기 ▼'}</span>
                </button>
              </div>

              {showLocalizedMeta && localizedMeta.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-2 gap-1 sm:gap-1.5">
                  {localizedMeta.map((loc) => (
                    <div
                      key={loc.lang.code}
                      className="p-1 sm:p-1.5 rounded-none border border-slate-300 bg-white flex flex-col gap-0.5 sm:gap-1 min-w-0"
                    >
                      <div className="flex items-center justify-between gap-0.5 sm:gap-1">
                        <span className="font-bold text-slate-950 truncate">{loc.lang.label}</span>
                        <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                          <button
                            onClick={() => handleCopyText(`loc-t-${loc.lang.code}`, loc.title)}
                            className="px-1 sm:px-1.5 py-0.5 rounded-none border border-slate-900 bg-white hover:bg-slate-50 text-[10px] sm:text-[11px] font-bold text-slate-900 cursor-pointer whitespace-nowrap"
                          >
                            {copiedId === `loc-t-${loc.lang.code}` ? '✓' : (
                              <>
                                <span className="sm:hidden">제목</span>
                                <span className="hidden sm:inline">제목복사</span>
                              </>
                            )}
                          </button>
                          <button
                            onClick={() => handleCopyText(`loc-d-${loc.lang.code}`, loc.description)}
                            className="px-1 sm:px-1.5 py-0.5 rounded-none border border-slate-300 bg-white hover:border-slate-900 text-[10px] sm:text-[11px] font-bold text-slate-800 cursor-pointer whitespace-nowrap"
                          >
                            {copiedId === `loc-d-${loc.lang.code}` ? '✓' : (
                              <>
                                <span className="sm:hidden">설명</span>
                                <span className="hidden sm:inline">설명복사</span>
                              </>
                            )}
                          </button>
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-[11px] font-bold text-slate-800 truncate">{loc.title}</p>
                      <p className="text-[10px] sm:text-[11px] text-slate-500 truncate">{loc.description}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      {/* Row 3: Compact 1-Line Audio + BGM 3-Step + Intuitive 1x1 Icon Playback & Record Controls */}
      <div className="pt-0.5 sm:pt-1 border-t border-slate-200 flex items-center justify-between gap-0.5 sm:gap-1">
        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              playCutePop();
              setKoreanSpeechEnabled(!koreanSpeechEnabled);
            }}
            className={`w-7 h-7 flex items-center justify-center rounded-none border text-xs shrink-0 cursor-pointer transition-colors ${
              koreanSpeechEnabled
                ? 'border-[#141B29] bg-[#FFFFFF] text-[#141B29]'
                : 'border-slate-300 bg-slate-100 text-slate-400'
            }`}
            title={koreanSpeechEnabled ? '음성 ON (클릭 시 끄기)' : '음성 OFF (클릭 시 켜기)'}
            aria-label="음성 ON/OFF"
          >
            {koreanSpeechEnabled ? '🔊' : '🔇'}
          </button>

          <BgmCompactButton
            enabled={bgmEnabled}
            volumeLevel={bgmVolumeLevel}
            onToggleEnabled={toggleBgm}
            onSelectVolume={setBgmVolumeLevel}
          />
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => {
              playCutePop();
              if (autoplayActive || introHookActive) stopAutoplay();
              else startAutoplay();
            }}
            className={`w-7 h-7 flex items-center justify-center rounded-none border text-xs shrink-0 cursor-pointer transition-colors ${
              autoplayActive || introHookActive
                ? 'bg-[#DC2626] border-[#DC2626] text-white hover:bg-[#B91C1C]'
                : 'bg-[#141B29] border-[#141B29] text-white hover:bg-[#1E293B]'
            }`}
            title={autoplayActive || introHookActive ? '전체감상 정지' : '전체감상 시작'}
            aria-label={autoplayActive || introHookActive ? '전체감상 정지' : '전체감상 시작'}
          >
            {autoplayActive || introHookActive ? '⏹' : '▶'}
          </button>

          <button
            onClick={() => {
              playCutePop();
              togglePause();
            }}
            className={`w-7 h-7 flex items-center justify-center rounded-none border text-xs shrink-0 cursor-pointer transition-colors ${
              isPaused
                ? 'bg-[#DC2626] border-[#DC2626] text-white hover:bg-[#B91C1C]'
                : 'bg-[#FFFFFF] border-[#141B29] text-[#141B29] hover:bg-slate-50'
            }`}
            title={isPaused ? '계속 감상' : '일시정지'}
            aria-label={isPaused ? '계속 감상' : '일시정지'}
          >
            {isPaused ? '▶' : '⏸'}
          </button>

          <button
            onClick={() => {
              playCutePop();
              setCleanRecordMode(true);
            }}
            className="w-7 h-7 flex items-center justify-center rounded-none border border-[#141B29] bg-[#141B29] hover:bg-[#DC2626] hover:border-[#DC2626] text-[#EF4444] hover:text-white shrink-0 cursor-pointer transition-colors"
            title="무버튼 녹화"
            aria-label="무버튼 녹화"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-current block" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
