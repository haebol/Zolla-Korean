import React from 'react';
import { BgmTrackId, playCutePop, startBgm } from '../utils/audio';
import { JollamanStageFrame } from './JollamanStageFrame';
import { JollamanFlashcardCard, JollamanFlashcardConfig } from './JollamanFlashcardCard';
import { BgmCompactButton } from './BgmCompactButton';
import {
  ParticleTheaterBeat,
  ParticleTheaterEpisodeBase,
} from '../hooks/useParticleTheaterEngine';
import { useShortsStudio } from '../context/ShortsStudioContext';
import { useAdminCatalog } from '../context/AdminCatalogContext';

interface ParticleTheaterShellProps<T extends ParticleTheaterEpisodeBase> {
  title: string;
  ariaLabel: string;
  stageBgClass: string;
  cameraViewBox: string;
  episodes: T[];
  episode: T;
  episodeIdx: number;
  clearedEpisodes: string[];
  beat: ParticleTheaterBeat;
  audioEnabled: boolean;
  bgmEnabled: boolean;
  bgmTrack?: BgmTrackId;
  onToggleBgm: () => void;
  onSelectEpisode: (idx: number) => void;
  onSelectSide: (side: 'left' | 'right') => void;
  onStartAutoplay: () => void;
  onStopAutoplay: () => void;
  onCloseReveal: () => void;
  flashcard: JollamanFlashcardConfig;
  footerText: string;
  footerSubText?: string;
  cutStep?: {
    current: number;
    total: number;
    onPrev: () => void;
    onNext: () => void;
  };
  defsSlot?: React.ReactNode;
  children: React.ReactNode;
}

export function ParticleTheaterShell<T extends ParticleTheaterEpisodeBase>({
  title,
  ariaLabel,
  stageBgClass,
  cameraViewBox,
  episodes,
  episode,
  episodeIdx,
  clearedEpisodes,
  beat,
  audioEnabled,
  bgmEnabled,
  bgmTrack = 'memeShorts',
  onToggleBgm,
  onSelectEpisode,
  onSelectSide,
  onStartAutoplay,
  onStopAutoplay,
  onCloseReveal,
  flashcard,
  footerText,
  footerSubText,
  cutStep,
  defsSlot,
  children,
}: ParticleTheaterShellProps<T>) {
  const shorts = useShortsStudio();
  const { currentViewSeriesId, getOrderedItems } = useAdminCatalog();
  const orderedEpisodeEntries = React.useMemo(
    () =>
      getOrderedItems(
        currentViewSeriesId,
        episodes.map((ep, idx) => ({ ep, idx })),
        (entry) => entry.ep.id
      ),
    [getOrderedItems, currentViewSeriesId, episodes]
  );
  const isSimpleWhite = shorts.shortsAspect && shorts.simpleWhiteShorts;
  const showHeader = !isSimpleWhite || !shorts.studioOpen;

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col select-none font-body">
      {/* Row 4 Unified Stage Header: Twin-app compact title + single count + compact controls, underline tabs below */}
      {showHeader && (
        <div className="pt-4 pb-3 border-b-2 border-slate-900 flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 md:gap-3 lg:gap-4">
          <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3 md:contents">
            <div className="flex items-baseline gap-1.5 min-w-0 md:order-1 md:shrink-0">
              <h1 className="font-game text-xl sm:text-2xl tracking-tight text-slate-900 leading-none whitespace-nowrap font-normal truncate">
                {title}
              </h1>
              <span className="font-game text-base sm:text-lg tabular-nums text-[#DC2626] leading-none whitespace-nowrap shrink-0 font-normal">
                ({episodes.length})
              </span>
            </div>

            <div className="flex items-center justify-end gap-1 shrink-0 md:order-3">
              <BgmCompactButton
                enabled={audioEnabled && bgmEnabled}
                volumeLevel={shorts.bgmVolumeLevel}
                onToggleEnabled={onToggleBgm}
                onSelectVolume={shorts.setBgmVolumeLevel}
                onStartBgm={() => {
                  if (audioEnabled) {
                    startBgm(bgmTrack);
                  }
                }}
              />

              <div className="inline-flex items-stretch border border-[#0F172A] divide-x divide-[#0F172A] shrink-0">
                <button
                  onClick={
                    shorts.autoplayActive || shorts.introHookActive
                      ? onStopAutoplay
                      : onStartAutoplay
                  }
                  title={shorts.autoplayActive || shorts.introHookActive ? '전체감상 정지' : '전체감상'}
                  aria-label={
                    shorts.autoplayActive || shorts.introHookActive ? '전체감상 정지' : '전체감상'
                  }
                  className={`h-6 w-6 sm:h-7 sm:w-auto px-0 sm:px-2.5 flex items-center justify-center rounded-none text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    shorts.autoplayActive || shorts.introHookActive
                      ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                      : 'bg-[#0F172A] hover:bg-[#1E293B]'
                  }`}
                >
                  <span className="sm:hidden flex items-center justify-center" aria-hidden="true">
                    {shorts.autoplayActive || shorts.introHookActive ? (
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
                    {shorts.autoplayActive || shorts.introHookActive ? '⏹ 정지' : '▶ 전체감상'}
                  </span>
                </button>

                <button
                  onClick={() => {
                    playCutePop();
                    shorts.togglePause();
                  }}
                  title={shorts.isPaused ? '계속 감상' : '일시정지'}
                  aria-label={shorts.isPaused ? '계속 감상' : '일시정지'}
                  className={`h-6 w-6 sm:h-7 sm:w-7 px-0 flex items-center justify-center rounded-none text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    shorts.isPaused
                      ? 'bg-[#DC2626] text-white hover:bg-[#B91C1C]'
                      : 'bg-[#FFFFFF] text-[#0F172A] hover:bg-[#F8FAFC]'
                  }`}
                >
                  <span className="flex items-center justify-center" aria-hidden="true">
                    {shorts.isPaused ? (
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
            role="tablist"
            aria-label="조사 에피소드 선택"
          >
            {orderedEpisodeEntries.map(({ ep, idx }) => {
              const active = idx === episodeIdx;
              const cleared = clearedEpisodes.includes(ep.id);
              return (
                <button
                  key={ep.id}
                  role="tab"
                  aria-selected={active}
                  onClick={() => onSelectEpisode(idx)}
                  className={`relative pb-0.5 px-0 border-b-2 bg-transparent text-[13px] sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors leading-snug ${
                    active
                      ? 'text-[#DC2626] border-[#DC2626] font-extrabold'
                      : cleared
                      ? 'text-[#0F172A] border-transparent hover:text-[#DC2626]'
                      : 'text-[#475569] border-transparent hover:text-[#0F172A]'
                  }`}
                >
                  {ep.tabLabel}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Main 2D Stage */}
      <div className={showHeader ? 'mt-6' : 'mt-2'}>
        <JollamanStageFrame stageBgClass={stageBgClass}>
          <svg
            viewBox={cameraViewBox}
            preserveAspectRatio="xMidYMid slice"
            className="w-full h-full block cursor-pointer"
            role="img"
            aria-label={ariaLabel}
            onClick={() => {
              if (shorts.cleanRecordMode) return;
              if (beat === 'reveal') {
                onCloseReveal();
                return;
              }
              playCutePop();
              shorts.togglePause();
            }}
          >
            {defsSlot}
            {children}
          </svg>

          {/* Unified Reveal Flashcard Overlay (Matches Series 1~15!) */}
          {beat === 'reveal' && (
            <div
              style={{ containerType: 'size' }}
              className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent pointer-events-none"
              role="dialog"
              aria-label={`${episode.completedSentence} 학습 카드`}
            >
              <JollamanFlashcardCard
                {...flashcard}
                shortsAspect={shorts.shortsAspect}
                isPaused={shorts.isPaused}
                onClose={() => {
                  if (!shorts.isPaused) {
                    playCutePop();
                    shorts.togglePause();
                  } else {
                    onCloseReveal();
                  }
                }}
              />
            </div>
          )}
        </JollamanStageFrame>
      </div>

      {/* High-Readability Bottom Subtitle & Control Deck */}
      <div className="mt-3 bg-[#FFFFFF] border-2 border-[#141B29] rounded-none px-3 py-2.5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-0.5 min-w-0 flex-1">
          <div className="text-sm sm:text-base text-[#0F172A] font-black leading-snug break-words">
            {footerText}
          </div>
          {footerSubText && (
            <div className="text-xs sm:text-sm text-[#475569] font-bold leading-snug break-words">
              {footerSubText}
            </div>
          )}
        </div>

        <div className="flex flex-wrap items-center justify-between sm:justify-end gap-2 shrink-0">
          {cutStep && (
            <div className="inline-flex items-stretch border-2 border-[#0F172A] bg-[#F8FAFC]">
              <button
                type="button"
                onClick={cutStep.onPrev}
                aria-label="이전 컷"
                className="px-2.5 py-1.5 text-xs sm:text-sm font-black text-[#0F172A] hover:bg-[#E2E8F0] cursor-pointer whitespace-nowrap shrink-0"
              >
                ◀ 이전
              </button>
              <span className="font-mono-num px-2 py-1.5 text-xs sm:text-sm font-black text-[#DC2626] border-x border-[#0F172A] bg-[#FFFFFF] flex items-center whitespace-nowrap">
                {cutStep.current}/{cutStep.total}컷
              </span>
              <button
                type="button"
                onClick={cutStep.onNext}
                aria-label="다음 컷"
                className="px-2.5 py-1.5 text-xs sm:text-sm font-black text-[#0F172A] hover:bg-[#E2E8F0] cursor-pointer whitespace-nowrap shrink-0"
              >
                다음 ▶
              </button>
            </div>
          )}

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => onSelectSide('left')}
              className="px-3 py-1.5 text-sm font-black rounded-none border-2 border-[#2563EB] bg-[#EFF6FF] text-[#1D4ED8] hover:bg-[#DBEAFE] cursor-pointer whitespace-nowrap shrink-0"
            >
              {episode.leftOption}
            </button>
            <button
              type="button"
              onClick={() => onSelectSide('right')}
              className="px-3 py-1.5 text-sm font-black rounded-none border-2 border-[#E11D48] bg-[#FFF1F2] text-[#BE123C] hover:bg-[#FFE4E6] cursor-pointer whitespace-nowrap shrink-0"
            >
              {episode.rightOption}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
