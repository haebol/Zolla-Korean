import React, { useEffect, useRef, useState, useCallback } from 'react';
import { getShortsStageAspectRatio, useShortsStudio } from '../context/ShortsStudioContext';
import { RedShoesJollamanLogoSvg } from './RedShoesJollamanLogoSvg';

interface JollamanStageFrameProps {
  children: React.ReactNode;
  stageBgClass?: string;
}

/**
 * Wraps the live Jollaman SVG stage + Reveal + 1.5s Intro Hook overlay.
 * Automatically transforms between Widescreen Desktop (1000:460) and
 * 9:16 Vertical Shorts Studio Canvas (selectable 1:1 / 5:4 / 4:3 / 16:10 / 16:9 stage ratios + 0.7x-1.8x zoom),
 * plus supports Buttonless Recording Fullscreen Mode & YouTube Shorts UI Safe-Zone previews.
 */
export const JollamanStageFrame: React.FC<JollamanStageFrameProps> = ({
  children,
  stageBgClass = 'bg-sky-50',
}) => {
  const {
    shortsAspect,
    stageAspectPreset,
    cameraZoom,
    cleanRecordMode,
    setCleanRecordMode,
    activeMeta,
    stopAutoplay,
    viralHookEnabled,
    globalRomanization,
    globalAudienceMode,
    simpleWhiteShorts,
    shortsSafeZoneGuide,
    channelWatermarkEnabled,
    introHookActive,
    introHookTitle,
    introHookTitleKo,
    introHookSubtitleEnabled,
    introHookSubtitle,
    stageContainerRef,
    setStageBgClass,
    triggerRangeReplay,
  } = useShortsStudio();

  const [recordCountdown, setRecordCountdown] = useState<number>(0);
  const [tapOverlayVisible, setTapOverlayVisible] = useState<boolean>(false);
  const tapHideTimerRef = useRef<number | null>(null);

  // Sync stageBgClass to studio context for accurate live PNG thumbnail captures
  useEffect(() => {
    setStageBgClass(stageBgClass);
  }, [stageBgClass, setStageBgClass]);

  const clearTapHideTimer = useCallback(() => {
    if (tapHideTimerRef.current !== null) {
      window.clearTimeout(tapHideTimerRef.current);
      tapHideTimerRef.current = null;
    }
  }, []);

  // 3 -> 2 -> 1 countdown when entering buttonless fullscreen recording mode, then auto-start playback
  useEffect(() => {
    if (!cleanRecordMode) {
      setRecordCountdown(0);
      setTapOverlayVisible(false);
      clearTapHideTimer();
      return;
    }

    stopAutoplay();
    setTapOverlayVisible(false);
    clearTapHideTimer();
    setRecordCountdown(3);

    const t1 = window.setTimeout(() => setRecordCountdown(2), 900);
    const t2 = window.setTimeout(() => setRecordCountdown(1), 1800);
    const t3 = window.setTimeout(() => {
      setRecordCountdown(0);
      triggerRangeReplay();
    }, 2700);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [cleanRecordMode, clearTapHideTimer, stopAutoplay, triggerRangeReplay]);

  useEffect(() => {
    return () => clearTapHideTimer();
  }, [clearTapHideTimer]);

  const handleStageTapInRecordMode = () => {
    if (!cleanRecordMode || recordCountdown > 0) return;
    clearTapHideTimer();
    setTapOverlayVisible(true);
    tapHideTimerRef.current = window.setTimeout(() => {
      setTapOverlayVisible(false);
      tapHideTimerRef.current = null;
    }, 3500);
  };

  const hideAnswerForHook = viralHookEnabled && !activeMeta.revealReady;
  const showSafeZonePreview = shortsSafeZoneGuide && !cleanRecordMode && recordCountdown === 0;
  const isSimpleWhiteShorts = shortsAspect && simpleWhiteShorts;
  const hideTopBadge = isSimpleWhiteShorts && Boolean(activeMeta.isRevealing);
  const shortsStageAspect = getShortsStageAspectRatio(cameraZoom, stageAspectPreset);
  const hookSubPrompt =
    activeMeta.seriesNum <= 7
      ? 'What sound is this?'
      : activeMeta.seriesNum <= 11
      ? 'Real pronunciation?'
      : 'Guess!';

  const introHookOverlay = introHookActive ? (
    isSimpleWhiteShorts ? (
      <div
        style={{ containerType: 'size' }}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-end bg-slate-950/35 px-4 pb-[8cqh] text-center select-none"
        role="status"
        aria-live="polite"
        aria-label="초반 1.5초 후킹 장면"
      >
        {introHookSubtitleEnabled && introHookSubtitle.trim() && (
          <div
            className="max-w-[92%] bg-amber-400 text-slate-950 border-2 border-white rounded-lg px-3.5 py-1 font-black leading-tight whitespace-nowrap shadow-lg"
            style={{ fontSize: 'clamp(0.76rem, 7.6cqh, 1.02rem)' }}
          >
            {introHookSubtitle}
          </div>
        )}
      </div>
    ) : (
      <div
        style={{ containerType: 'size' }}
        className="pointer-events-none absolute inset-0 z-30 flex flex-col items-center justify-between bg-slate-950/65 backdrop-blur-[1.5px] px-4 py-[6cqh] text-center select-none"
        role="status"
        aria-live="polite"
        aria-label="초반 1.5초 후킹 장면"
      >
        <div className="w-full flex flex-col items-center justify-center flex-1 min-h-0">
          <span
            className="inline-block px-2.5 py-0.5 rounded-md bg-rose-600 text-amber-200 font-black tracking-wide uppercase shadow-md mb-[2cqh]"
            style={{ fontSize: 'clamp(0.6rem, 5.4cqh, 0.82rem)' }}
          >
            ⚡ 1.5s HOOK
          </span>

          {introHookTitle.trim() && (
            <p
              className="font-black text-white leading-[1.15] tracking-tight max-w-[92%] whitespace-pre-line drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]"
              style={{ fontSize: 'clamp(1.05rem, 13cqh, 2.15rem)' }}
            >
              {introHookTitle}
            </p>
          )}

          {introHookTitleKo.trim() && (
            <p
              className="mt-[1.5cqh] font-bold text-slate-200/95 leading-snug tracking-tight max-w-[90%] whitespace-nowrap truncate drop-shadow-[0_2px_6px_rgba(0,0,0,0.65)]"
              style={{ fontSize: 'clamp(0.66rem, 6cqh, 0.9rem)' }}
            >
              {introHookTitleKo}
            </p>
          )}
        </div>

        {introHookSubtitleEnabled && introHookSubtitle.trim() && (
          <div
            className="max-w-[92%] bg-amber-400 text-slate-950 border-2 border-white rounded-lg px-3.5 py-1 font-black leading-tight whitespace-nowrap shadow-lg"
            style={{ fontSize: 'clamp(0.74rem, 7.2cqh, 1rem)' }}
          >
            {introHookSubtitle}
          </div>
        )}
      </div>
    )
  ) : null;

  const frameContent = shortsAspect ? (
    /* 9:16 VERTICAL SHORTS FRAME */
    <div
      className={`relative mx-auto aspect-[9/16] overflow-hidden flex flex-col justify-between font-body select-none ${
        isSimpleWhiteShorts ? 'bg-[#FFFFFF]' : 'bg-slate-950'
      } ${
        cleanRecordMode
          ? 'w-[min(100vw,calc(100dvh*9/16))] rounded-none border-0'
          : isSimpleWhiteShorts
          ? 'w-[min(100%,calc(88dvh*9/16),430px)] rounded-none border-2 border-[#141B29]'
          : 'w-[min(100%,calc(88dvh*9/16),430px)] rounded-[28px] border-[4px] border-[#141B29] shadow-2xl'
      }`}
      role="region"
      aria-label="9:16 세로 쇼츠 무대"
    >
      {/* TOP SHORTS HOOK HEADER */}
      {isSimpleWhiteShorts ? (
        <div
          className="flex-1 min-h-0 px-4 py-2 flex flex-col items-center justify-center text-center bg-[#FFFFFF] text-[#141B29] rounded-none border-b-2 border-[#141B29]"
          aria-hidden={hideTopBadge ? 'true' : undefined}
        >
          <div
            className={`flex flex-col items-center justify-center w-full transition-opacity duration-200 ${
              hideTopBadge ? 'opacity-0 pointer-events-none select-none' : 'opacity-100'
            }`}
          >
            {introHookActive ? (
              <div className="flex flex-col items-center justify-center w-full px-2">
                <span className="inline-block px-2.5 py-0.5 rounded-none bg-[#DC2626] text-white text-[10px] sm:text-[11px] font-black tracking-wider uppercase mb-1.5">
                  ⚡ 1.5s HOOK
                </span>
                {introHookTitle.trim() && (
                  <p
                    className="font-black text-[#141B29] leading-[1.14] tracking-tight whitespace-pre-line max-w-[96%]"
                    style={{ fontSize: 'clamp(1.18rem, 5.2vw, 1.6rem)' }}
                  >
                    {introHookTitle}
                  </p>
                )}
                {introHookTitleKo.trim() && (
                  <p className="mt-1 text-[11px] sm:text-xs font-bold text-slate-500 max-w-[94%] truncate">
                    {introHookTitleKo}
                  </p>
                )}
              </div>
            ) : activeMeta.seriesNum === 99 ? (
              <>
                <span
                  className="font-game inline-block px-5 py-2 rounded-xl text-white font-normal tracking-tight leading-none shadow-xs whitespace-nowrap max-w-[94%] truncate"
                  style={{
                    backgroundColor: activeMeta.accentColor,
                    fontSize: 'clamp(1.1rem, 4.6vw, 1.45rem)',
                  }}
                >
                  {activeMeta.viralHookTag}
                </span>
                <div className="mt-2 flex flex-col items-center gap-0.5 max-w-[94%]">
                  <span className="text-sm sm:text-base font-black text-slate-900 truncate max-w-full">
                    {activeMeta.itemLabel}
                  </span>
                  {activeMeta.caption && (
                    <span className="text-xs sm:text-sm font-bold text-slate-500 truncate max-w-full">
                      {activeMeta.caption}
                    </span>
                  )}
                </div>
              </>
            ) : hideAnswerForHook ? (
              <>
                <span
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-white font-black tracking-tight shadow-xs whitespace-nowrap max-w-[94%] truncate"
                  style={{
                    backgroundColor: activeMeta.accentColor,
                    fontSize: activeMeta.itemKey.length > 6 ? 'clamp(1.05rem, 4.4vw, 1.4rem)' : 'clamp(1.25rem, 5.4vw, 1.65rem)',
                  }}
                >
                  {activeMeta.seriesNum === 12 ? (
                    <span className="truncate">{activeMeta.viralHookTag}</span>
                  ) : (
                    <>
                      <span>❓</span>
                      <span className="truncate">{activeMeta.itemKey}</span>
                      <span className="text-amber-200">→ ???</span>
                    </>
                  )}
                </span>
                <p className="mt-2 text-sm font-extrabold text-slate-400 tracking-wide">
                  {hookSubPrompt}
                </p>
              </>
            ) : (
              <>
                <span
                  className="font-game inline-block px-6 py-2 rounded-xl text-white font-normal tracking-tight leading-none shadow-xs whitespace-nowrap max-w-[92%] truncate"
                  style={{
                    backgroundColor: activeMeta.accentColor,
                    fontSize: activeMeta.itemLabel.length > 10 ? 'clamp(1.05rem, 4.5vw, 1.45rem)' : 'clamp(1.35rem, 5.8vw, 1.8rem)',
                  }}
                >
                  {activeMeta.itemLabel}
                </span>
                {(activeMeta.englishBadge || activeMeta.romanized) && (
                  <div className="mt-2.5 flex items-center justify-center gap-2 text-sm sm:text-base font-black tracking-wide whitespace-nowrap max-w-[92%] truncate">
                    {activeMeta.englishBadge && (
                      <span className="text-slate-900">[{activeMeta.englishBadge}]</span>
                    )}
                    {activeMeta.englishBadge && activeMeta.romanized && activeMeta.englishBadge !== activeMeta.romanized && (
                      <span aria-hidden="true" className="text-slate-300">·</span>
                    )}
                    {activeMeta.romanized && activeMeta.englishBadge !== activeMeta.romanized && (
                      <span className="text-slate-500 font-extrabold">{activeMeta.romanized}</span>
                    )}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      ) : activeMeta.minimalShortsMode ? (
        <div className="flex-1 min-h-0 px-3 py-1.5 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-950 text-white">
          <div className="text-base sm:text-[21px] font-black tracking-tight leading-tight whitespace-nowrap max-w-[96%] truncate">
            <span
              className="inline-block px-3.5 py-1 rounded-xl shadow-xs max-w-full truncate"
              style={{ backgroundColor: activeMeta.accentColor }}
            >
              {activeMeta.viralHookTag}
            </span>
          </div>
          {activeMeta.seriesNum !== 99 && (
            <p className="mt-1 text-xs sm:text-sm font-extrabold text-amber-300 tracking-tight truncate max-w-[92%]">
              {activeMeta.itemLabel}
            </p>
          )}
        </div>
      ) : (
        <div className="flex-1 min-h-0 px-3 py-1.5 flex flex-col items-center justify-center text-center bg-gradient-to-b from-slate-900 to-slate-950 text-white relative">
          <div className="flex items-center justify-center gap-1.5 w-full max-w-[94%] text-[11px] font-bold text-slate-300 tracking-wide whitespace-nowrap">
            <span className="truncate">
              {hideAnswerForHook ? activeMeta.viralHookTag : activeMeta.seriesTitle}
            </span>
            <span aria-hidden="true" className="shrink-0">·</span>
            <span className="font-mono-num shrink-0">
              {`${activeMeta.partIndex}/${activeMeta.partTotal}`}
            </span>
          </div>

          <div
            className="mt-1.5 font-black tracking-tight leading-none max-w-[94%] whitespace-nowrap"
            style={{
              color: '#FFFFFF',
              fontSize: activeMeta.itemKey.length >= 6 ? 'clamp(1rem, 4.2vw, 1.25rem)' : 'clamp(1.15rem, 5vw, 1.45rem)',
            }}
          >
            {hideAnswerForHook ? (
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-lg bg-rose-600 text-white shadow-xs">
                <span>❓</span>
                <span className="truncate max-w-[170px]">{activeMeta.itemKey}</span>
                <span className="text-amber-300">→ ???</span>
              </span>
            ) : (
              <span
                className="inline-block px-3 py-1 rounded-lg truncate max-w-full"
                style={{ backgroundColor: activeMeta.accentColor }}
              >
                {activeMeta.itemLabel}
              </span>
            )}
          </div>

          {!hideAnswerForHook && (
            <div className="w-full max-w-[240px] h-1 bg-slate-800 rounded-full overflow-hidden mt-2">
              <div
                className="h-full transition-all duration-300 rounded-full"
                style={{
                  width: `${(activeMeta.partIndex / Math.max(1, activeMeta.partTotal)) * 100}%`,
                  backgroundColor: activeMeta.accentColor,
                }}
              />
            </div>
          )}
        </div>
      )}

      {/* MIDDLE DYNAMIC RATIO (1:1 / 5:4 / 4:3 / 16:10 / 16:9 + zoomed-out 0.8x) CAMERA SVG STAGE */}
      <div
        ref={stageContainerRef}
        style={{ aspectRatio: `${shortsStageAspect}` }}
        className={`relative w-full shrink-0 overflow-hidden ${stageBgClass}`}
      >
        {children}
        {introHookOverlay}
      </div>

      {/* BOTTOM SHORTS SUBTITLE DECK */}
      {isSimpleWhiteShorts ? (
        <div
          className="flex-1 min-h-0 bg-[#FFFFFF] rounded-none border-t-2 border-[#141B29] flex flex-col items-center justify-start pt-2 sm:pt-2.5 px-3"
          aria-hidden={!channelWatermarkEnabled ? 'true' : undefined}
        >
          {channelWatermarkEnabled && (
            <div className="inline-flex items-center gap-1 opacity-55">
              <span className="font-mono-num text-[9px] sm:text-[10px] font-bold tracking-tight text-[#141B29]">
                haebolclass
              </span>
              <RedShoesJollamanLogoSvg className="w-3 h-3.5 sm:w-3.5 sm:h-4 shrink-0" />
            </div>
          )}
        </div>
      ) : activeMeta.minimalShortsMode ? (
        <div
          className={`flex-1 min-h-0 px-4 flex flex-col items-center justify-center text-center bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900 text-white ${
            activeMeta.seriesNum === 99 ? 'pt-1 pb-10' : 'pt-1.5 pb-6'
          }`}
        >
          {channelWatermarkEnabled && (
            <div className="mb-0.5 inline-flex items-center gap-1 opacity-60">
              <span className="font-mono-num text-[9px] font-bold tracking-tight text-slate-200">
                haebolclass
              </span>
              <RedShoesJollamanLogoSvg className="w-2.5 h-3.5 shrink-0" />
            </div>
          )}
          <p className="text-sm sm:text-base font-black leading-snug text-white max-w-[94%] line-clamp-2">
            {activeMeta.caption}
          </p>
        </div>
      ) : (
        <div className="flex-1 min-h-0 px-3.5 pt-1.5 pb-6 sm:pb-7 flex flex-col items-center justify-center text-center bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900 text-white">
          {channelWatermarkEnabled && (
            <div className="mb-0.5 inline-flex items-center gap-1 opacity-60">
              <span className="font-mono-num text-[9px] font-bold tracking-tight text-slate-200">
                haebolclass
              </span>
              <RedShoesJollamanLogoSvg className="w-2.5 h-3.5 shrink-0" />
            </div>
          )}
          <p className="text-sm sm:text-base font-extrabold leading-snug text-slate-100 line-clamp-2 max-w-[92%]">
            {hideAnswerForHook
              ? globalAudienceMode || globalRomanization
                ? activeMeta.viralHookEn
                : activeMeta.viralHookQuestion
              : activeMeta.caption || `${activeMeta.itemLabel} · ${activeMeta.itemBadge}`}
          </p>

          <div className="mt-1 flex items-center justify-center gap-1.5 text-[11px] font-black tracking-wide max-w-[94%] whitespace-nowrap truncate">
            {hideAnswerForHook ? (
              <span className="text-amber-300">
                {globalAudienceMode || globalRomanization
                  ? '🤫 Watch before the reveal!'
                  : '🤫 1초 뒤 정답 공개!'}
              </span>
            ) : (
              <>
                <span className="text-amber-300 shrink-0">{activeMeta.itemBadge}</span>
                {(globalRomanization || globalAudienceMode) && activeMeta.romanized && (
                  <>
                    <span aria-hidden="true" className="text-slate-500">·</span>
                    <span className="text-emerald-300 truncate">
                      [{activeMeta.romanized}] · {activeMeta.englishBadge}
                    </span>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* PREVIEW-ONLY YOUTUBE SHORTS UI SAFE-ZONE OVERLAY (Auto-hidden in Fullscreen / Recording) */}
      {showSafeZonePreview && (
        <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
          {/* Right ~15% Like/Comment/Share UI Zone */}
          <div className="absolute right-0 top-[36%] bottom-[20%] w-[15%] border-l-2 border-dashed border-rose-400/85 bg-rose-500/20 flex flex-col items-center justify-center gap-3 text-[10px] font-black text-rose-100">
            <span>👍</span>
            <span>💬</span>
            <span>↗</span>
            <span className="text-[9px] leading-tight text-center px-0.5">버튼 가림</span>
          </div>
          {/* Bottom ~19% Channel/Title UI Zone */}
          <div className="absolute left-0 right-0 bottom-0 h-[19%] border-t-2 border-dashed border-amber-400/85 bg-amber-500/20 flex items-end justify-center pb-2.5">
            <span className="text-[10px] font-black text-amber-100 tracking-wide px-2 py-0.5 rounded bg-slate-950/60">
              유튜브 하단 제목·채널 영역 (녹화 시 자동 숨김)
            </span>
          </div>
        </div>
      )}
    </div>
  ) : (
    /* STANDARD 16:9 WIDESCREEN STAGE (Matches 1000:562.5 SVG natively for seamless full-width 16:9!) */
    <div
      ref={stageContainerRef}
      className={`relative mx-auto aspect-video overflow-hidden ${stageBgClass} ${
        cleanRecordMode
          ? 'w-[min(100vw,calc(100dvh*16/9))] rounded-none border-0'
          : 'w-[min(100%,calc(76dvh*16/9))] rounded-none border-2 border-[#141B29]'
      }`}
    >
      {children}
      {channelWatermarkEnabled && (
        <div
          className="pointer-events-none absolute top-1 right-1.5 z-20 inline-flex items-center gap-0.5 opacity-55"
          aria-hidden="true"
        >
          <span className="font-mono-num text-[9px] sm:text-[10px] font-bold tracking-tight text-[#141B29] drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
            haebolclass
          </span>
          <RedShoesJollamanLogoSvg className="w-2.5 h-3.5 sm:w-3 sm:h-4 shrink-0" />
        </div>
      )}
      {introHookOverlay}
      {/* Optional Desktop Preview Safe-Zone hint if user toggled Safe Zone */}
      {showSafeZonePreview && (
        <div className="pointer-events-none absolute inset-0 z-30" aria-hidden="true">
          <div className="absolute left-0 right-0 bottom-0 h-[14%] border-t-2 border-dashed border-amber-500/80 bg-amber-500/15 flex items-center justify-center">
            <span className="text-[11px] font-black text-amber-900 bg-white/85 px-2.5 py-0.5 rounded-none">
              하단 자막 안전영역 가이드 (녹화 시 자동 숨김)
            </span>
          </div>
        </div>
      )}
    </div>
  );

  if (cleanRecordMode) {
    return (
      <div
        onClick={handleStageTapInRecordMode}
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center p-0 cursor-pointer select-none ${
          isSimpleWhiteShorts ? 'bg-white' : 'bg-slate-950'
        }`}
      >
        {frameContent}

        {/* 3 · 2 · 1 FULLSCREEN RECORDING COUNTDOWN OVERLAY */}
        {recordCountdown > 0 && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/80 flex flex-col items-center justify-center gap-3 pointer-events-none"
            aria-live="assertive"
          >
            <div className="w-28 h-28 rounded-full bg-[#DC2626] border-4 border-amber-300 flex items-center justify-center shadow-2xl">
              <span className="font-mono-num text-6xl font-bold text-white">
                {recordCountdown}
              </span>
            </div>
            <p className="text-sm sm:text-base font-bold text-amber-200 tracking-wide">
              무버튼 자동 촬영 시작 · 화면 탭 시 메뉴 표시
            </p>
          </div>
        )}

        {/* BUTTONLESS BY DEFAULT: Replay & Exit appear ONLY for 3.5s after screen tap */}
        {recordCountdown === 0 && tapOverlayVisible && (
          <div
            onClick={(e) => e.stopPropagation()}
            className="fixed top-4 right-4 z-50 flex items-center gap-1.5 bg-[#141B29]/95 border-2 border-[#141B29] p-1.5 rounded-none shadow-2xl"
          >
            <button
              onClick={() => {
                clearTapHideTimer();
                setTapOverlayVisible(false);
                triggerRangeReplay();
              }}
              className="px-3.5 py-1.5 rounded-none bg-slate-800 hover:bg-slate-700 text-white text-xs cursor-pointer whitespace-nowrap shrink-0 transition-colors"
            >
              ↻ 다시 재생
            </button>
            <button
              onClick={() => {
                clearTapHideTimer();
                setTapOverlayVisible(false);
                stopAutoplay();
                setCleanRecordMode(false);
              }}
              className="px-3.5 py-1.5 rounded-none bg-[#DC2626] hover:bg-[#B91C1C] text-white text-xs cursor-pointer whitespace-nowrap shrink-0 transition-colors"
            >
              ✕ 종료
            </button>
          </div>
        )}
      </div>
    );
  }

  return frameContent;
};

