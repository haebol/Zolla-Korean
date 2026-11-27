import React from 'react';
import { playCutePop, BgmTrackId, startBgm } from '../utils/audio';
import { SimPhaseLike } from '../hooks/useShortsController';
import { JollamanStageFrame } from './JollamanStageFrame';
import { JollamanFlashcardCard, JollamanFlashcardConfig } from './JollamanFlashcardCard';
import { BgmCompactButton } from './BgmCompactButton';
import { useShortsStudio } from '../context/ShortsStudioContext';
import { useAdminCatalog } from '../context/AdminCatalogContext';

export interface BgmButtonConfig {
  track: BgmTrackId;
  enabled: boolean;
  audioEnabled: boolean;
  onToggle: () => void;
  activeClass: string;
  activeLabel: string;
  mutedLabel?: string;
  title: string;
}

export interface StageTabGroup<K extends string> {
  prefixLabel?: string;
  anchorChar?: string;
  anchorTitle?: string;
  keys: K[];
}

interface JollamanStageShellProps<T, K extends string> {
  icon: string;
  title: string;
  accentButtonClass: string;
  stageBgClass: string;
  ariaLabel: string;
  cameraViewBox: string;
  phase: SimPhaseLike;
  walkTime: number;
  shorts: {
    shortsAspect: boolean;
    autoplayActive: boolean;
    hideSkyTokens: boolean;
    cleanRecordMode?: boolean;
    celebrationActive?: boolean;
    triggerCelebration?: () => void;
    dismissCelebration?: () => void;
    viralHookEnabled?: boolean;
    comicBubbleEnabled?: boolean;
    globalRomanization?: boolean;
    globalAudienceMode?: boolean;
    simpleWhiteShorts?: boolean;
    isHookWindow?: boolean;
    revealReady?: boolean;
    viralHookTag?: string;
    viralHookQuestion?: string;
    viralHookEn?: string;
    comicBubbleText?: string;
    romanized?: string;
    englishBadge?: string;
    getFocusPos?: () => { x: number; y: number };
    startFullAutoplay: () => void;
    stopFullAutoplay: () => void;
    isPaused?: boolean;
    togglePause?: () => void;
    studioOpen?: boolean;
  };
  bgmConfig?: BgmButtonConfig;
  items: T[];
  selectedItem: T;
  learnedKeys: K[];
  getKey: (item: T) => K;
  getSkyX: (item: T) => number;
  getSkyY: (item: T) => number;
  getColor: (item: T) => string;
  onSelectItem: (item: T) => void;
  onResetToWalking: () => void;
  skyTokenStyle?: 'orb' | 'pill' | 'balloon';
  orbRadius?: number;
  orbFontSize?: number;
  pillWidth?: number;
  pillHeight?: number;
  getTokenText: (item: T) => string;
  getTabLabel?: (item: T) => string;
  tabGroups?: StageTabGroup<K>[];
  getSkyTokenBadge?: (item: T) => string | undefined;
  captionBarWidth?: number;
  walkingHint: string;
  activeCaption: string;
  revealAriaLabel: string;
  revealGlyph: string;
  revealGlyphSize?: 'large' | 'medium';
  revealHeadline: React.ReactNode;
  revealSubtitle?: string;
  revealCardSlot?: React.ReactNode;
  flashcard?: JollamanFlashcardConfig;
  defsSlot?: React.ReactNode;
  backdropSlot: React.ReactNode;
  children: React.ReactNode;
}

function splitBubbleLines(text: string): string[] {
  const trimmed = text.trim();
  if (trimmed.length <= 15) return [trimmed];
  const words = trimmed.split(' ');
  let line1 = '';
  let line2 = '';
  for (const w of words) {
    if (!line1 || (line1 + ' ' + w).length <= 15) {
      line1 = line1 ? `${line1} ${w}` : w;
    } else {
      line2 = line2 ? `${line2} ${w}` : w;
    }
  }
  if (!line2) {
    const mid = Math.ceil(trimmed.length / 2);
    return [trimmed.slice(0, mid), trimmed.slice(mid)];
  }
  return [line1, line2.length > 18 ? `${line2.slice(0, 17)}…` : line2];
}

export function JollamanStageShell<T, K extends string = string>({
  icon,
  title,
  accentButtonClass,
  stageBgClass,
  ariaLabel,
  cameraViewBox,
  phase,
  walkTime,
  shorts,
  bgmConfig,
  items,
  selectedItem,
  learnedKeys,
  getKey,
  getSkyX,
  getSkyY,
  getColor,
  onSelectItem,
  onResetToWalking,
  skyTokenStyle = 'orb',
  orbRadius = 30,
  orbFontSize = 36,
  pillWidth = 84,
  pillHeight = 44,
  getTokenText,
  getTabLabel,
  tabGroups,
  getSkyTokenBadge,
  captionBarWidth = 560,
  walkingHint,
  activeCaption,
  revealAriaLabel,
  revealGlyph,
  revealGlyphSize = 'large',
  revealHeadline,
  revealCardSlot,
  flashcard,
  defsSlot,
  backdropSlot,
  children,
}: JollamanStageShellProps<T, K>) {
  const { bgmVolumeLevel, setBgmVolumeLevel } = useShortsStudio();
  const { currentViewSeriesId, getOrderedItems } = useAdminCatalog();
  const orderedTabItems = React.useMemo(
    () => getOrderedItems(currentViewSeriesId, items, (it) => String(getKey(it))),
    [getOrderedItems, currentViewSeriesId, items, getKey]
  );
  const activeKey = getKey(selectedItem);
  const celebrationActive = Boolean(shorts.celebrationActive);
  const focusPos = shorts.getFocusPos?.() ?? { x: 320, y: 316 };
  const bubbleText = shorts.comicBubbleText ?? '';
  const showComicBubble = Boolean(
    !celebrationActive &&
      shorts.shortsAspect &&
      shorts.comicBubbleEnabled &&
      phase !== 'walking' &&
      phase !== 'reveal' &&
      bubbleText
  );

  // Position comic speech bubble smoothly near Jollaman without leaving SVG stage bounds
  const bubbleLines = showComicBubble ? splitBubbleLines(bubbleText) : [];
  const maxChars = bubbleLines.reduce((acc, s) => Math.max(acc, s.length), 5);
  const bubbleW = Math.max(108, Math.min(208, maxChars * 13.2 + 28));
  const bubbleH = bubbleLines.length > 1 ? 48 : 36;
  const bubbleSideOffset = focusPos.x < 460 ? -38 : 38;
  const bubbleX = Math.max(
    bubbleW / 2 + 18,
    Math.min(1000 - bubbleW / 2 - 18, focusPos.x + bubbleSideOffset)
  );
  const minBubbleY = shorts.hideSkyTokens ? 56 : 148;
  const bubbleY = Math.max(minBubbleY, Math.min(238, focusPos.y - 102));
  const tailTipX = Math.max(-bubbleW / 2 + 18, Math.min(bubbleW / 2 - 18, focusPos.x - bubbleX));
  const isSeriesCompleted = learnedKeys.length >= items.length && items.length > 0;

  const renderTabButton = (item: T) => {
    const k = getKey(item);
    const isCurrent = k === activeKey && phase !== 'walking';
    const isLearned = learnedKeys.includes(k);
    const color = getColor(item);
    const labelText = getTabLabel ? getTabLabel(item) : getTokenText(item);
    return (
      <button
        key={k}
        onClick={() => {
          playCutePop();
          onSelectItem(item);
        }}
        style={{
          color: isCurrent ? color : undefined,
          borderBottomColor: isCurrent ? color : 'transparent',
        }}
        className={`relative pb-0.5 px-0 border-b-2 bg-transparent text-[13px] sm:text-sm font-bold whitespace-nowrap shrink-0 cursor-pointer transition-colors leading-snug ${
          isCurrent
            ? 'font-extrabold'
            : isLearned
            ? 'text-[#0F172A] hover:text-[#DC2626]'
            : 'text-[#475569] hover:text-[#0F172A]'
        }`}
      >
        {labelText}
      </button>
    );
  };

  const showHeader = !shorts.simpleWhiteShorts || !shorts.studioOpen;

  return (
    <div className="w-full max-w-[1200px] mx-auto flex flex-col select-none font-body">
      {/* Row 4 Unified Stage Header: Twin-app compact title + single count + compact controls, underline item tabs below */}
      {showHeader && (
      <div className="pt-4 pb-3 border-b-2 border-slate-900 flex flex-wrap md:flex-nowrap items-center justify-between gap-2.5 md:gap-3 lg:gap-4">
        <div className="w-full flex items-center justify-between gap-2.5 sm:gap-3 md:contents">
          {!shorts.simpleWhiteShorts ? (
            <div className="flex items-baseline gap-1.5 min-w-0 md:order-1 md:shrink-0">
              <h1 className="font-game text-xl sm:text-2xl tracking-tight text-slate-900 leading-none whitespace-nowrap font-normal truncate">
                {title.replace(/\s*\([^)]*\)\s*$/, '')}
              </h1>
              <span className="font-game text-base sm:text-lg tabular-nums text-[#DC2626] leading-none whitespace-nowrap shrink-0 font-normal">
                ({items.length})
              </span>
            </div>
          ) : (
            <div className="flex items-baseline gap-1.5 min-w-0 md:order-1 md:shrink-0">
              <span className="font-game text-base sm:text-lg tabular-nums text-[#DC2626] whitespace-nowrap shrink-0">
                ({items.length})
              </span>
            </div>
          )}

          <div className="flex items-center justify-end gap-1 shrink-0 md:order-3">
            {bgmConfig && (
              <BgmCompactButton
                enabled={bgmConfig.audioEnabled && bgmConfig.enabled}
                volumeLevel={bgmVolumeLevel}
                onToggleEnabled={bgmConfig.onToggle}
                onSelectVolume={setBgmVolumeLevel}
                onStartBgm={() => {
                  if (bgmConfig.audioEnabled) {
                    startBgm(bgmConfig.track);
                  }
                }}
              />
            )}

            <div className="inline-flex items-stretch border border-[#0F172A] divide-x divide-[#0F172A] shrink-0">
              <button
                onClick={() => {
                  playCutePop();
                  if (bgmConfig && bgmConfig.audioEnabled && bgmConfig.enabled) {
                    startBgm(bgmConfig.track);
                  }
                  if (shorts.autoplayActive) shorts.stopFullAutoplay();
                  else shorts.startFullAutoplay();
                }}
                title={shorts.autoplayActive ? '전체감상 정지' : '전체감상'}
                aria-label={shorts.autoplayActive ? '전체감상 정지' : '전체감상'}
                className={`h-6 w-6 sm:h-7 sm:w-auto px-0 sm:px-2.5 flex items-center justify-center rounded-none text-white text-xs font-bold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  shorts.autoplayActive
                    ? 'bg-[#DC2626] hover:bg-[#B91C1C]'
                    : 'bg-[#0F172A] hover:bg-[#1E293B]'
                }`}
              >
                <span className="sm:hidden flex items-center justify-center" aria-hidden="true">
                  {shorts.autoplayActive ? (
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
                  {shorts.autoplayActive ? '⏹ 정지' : '▶ 전체감상'}
                </span>
              </button>

              <button
                onClick={() => {
                  playCutePop();
                  shorts.togglePause?.();
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

        {!shorts.simpleWhiteShorts && (
          <div
            className="w-full md:w-auto md:flex-1 md:min-w-0 md:order-2 md:pl-4 lg:pl-6 md:pr-2 flex flex-wrap items-center justify-start gap-x-[11px] sm:gap-x-4 md:gap-x-3.5 lg:gap-x-5 xl:gap-x-6 gap-y-1 text-[13px] sm:text-sm font-bold"
            role="list"
            aria-label="항목 빠른 선택"
          >
            {tabGroups && tabGroups.length > 0
              ? tabGroups.map((grp, gIdx) => (
                  <React.Fragment key={`${grp.prefixLabel ?? grp.anchorChar ?? gIdx}-${gIdx}`}>
                    {gIdx > 0 && (
                      <span
                        className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug"
                        aria-hidden="true"
                      >
                        /
                      </span>
                    )}
                    {grp.prefixLabel && (
                      <>
                        <span className="pb-0.5 text-[13px] sm:text-sm font-bold text-[#0F172A] whitespace-nowrap shrink-0 select-none leading-snug">
                          {grp.prefixLabel}
                        </span>
                        <span
                          className="pb-0.5 text-[#CBD5E1] font-bold select-none shrink-0 text-[13px] sm:text-sm leading-snug"
                          aria-hidden="true"
                        >
                          /
                        </span>
                      </>
                    )}
                    {grp.anchorChar && (
                      <button
                        type="button"
                        disabled
                        aria-disabled="true"
                        title={grp.anchorTitle ?? `대표음 [${grp.anchorChar}] (받침1에서 학습)`}
                        className="mb-0.5 px-1.5 py-0.5 bg-[#F1F5F9] text-[#0F172A] text-[13px] sm:text-sm font-black rounded-none whitespace-nowrap shrink-0 cursor-default select-none leading-none"
                      >
                        {grp.anchorChar}
                      </button>
                    )}
                    {grp.keys
                      .map((k) => items.find((it) => getKey(it) === k))
                      .filter((it): it is T => Boolean(it))
                      .map(renderTabButton)}
                  </React.Fragment>
                ))
              : orderedTabItems.map(renderTabButton)}
          </div>
        )}
      </div>
      )}

      {/* Main 2D Stage */}
      <div className={showHeader ? 'mt-6' : 'mt-2'}>
      <JollamanStageFrame stageBgClass={stageBgClass}>
        <svg
          viewBox={cameraViewBox}
          preserveAspectRatio="xMidYMid slice"
          className="w-full h-full block"
          role="img"
          aria-label={ariaLabel}
        >
          {defsSlot}

          {/* 1. Dynamic Backdrop */}
          {backdropSlot}

          {/* 1.5. During reveal phase, clicking empty sky around floating tokens also cancels the card */}
          {phase === 'reveal' && !shorts.cleanRecordMode && (
            <rect
              x="0"
              y="-60"
              width="1000"
              height="185"
              fill="transparent"
              className="cursor-pointer"
              onClick={() => {
                playCutePop();
                onResetToWalking();
              }}
            />
          )}

          {/* 2. Floating Sky Tokens */}
          {!shorts.hideSkyTokens && (
            <g>
              {items.map((item, idx) => {
                const k = getKey(item);
                const floatY = getSkyY(item) + Math.sin(walkTime * 2.2 + idx * 0.78) * 5.8;
                const isCurrent = k === activeKey && phase !== 'walking';
                const isLearned = learnedKeys.includes(k);
                const color = getColor(item);
                const tokenText = getTokenText(item);

                if (skyTokenStyle === 'pill') {
                  const rx = pillHeight / 2;
                  const badgeText = getSkyTokenBadge?.(item);
                  return (
                    <g
                      key={k}
                      transform={`translate(${getSkyX(item)}, ${floatY}) scale(${isCurrent ? 1.18 : 1})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="cursor-pointer"
                    >
                      <rect
                        x={-pillWidth / 2}
                        y={-pillHeight / 2}
                        width={pillWidth}
                        height={pillHeight}
                        rx={rx}
                        fill="#FFFFFF"
                        fillOpacity={isCurrent ? 0.98 : 0.78}
                        stroke={isCurrent ? color : '#E2E8F0'}
                        strokeWidth={isCurrent ? 3.5 : 2}
                      />
                      <text
                        x="0"
                        y="6"
                        textAnchor="middle"
                        fontSize={tokenText.length >= 4 ? '15.5' : tokenText.length >= 3 ? '18.5' : '23'}
                        fontWeight="900"
                        fill={color}
                      >
                        {tokenText}
                      </text>
                      {badgeText && (
                        <g transform={`translate(${-pillWidth / 2 + 22}, ${-pillHeight / 2 - 4})`}>
                          <rect
                            x="-22"
                            y="-8"
                            width="44"
                            height="16"
                            rx="8"
                            fill="#FEF08A"
                            stroke="#DC2626"
                            strokeWidth="1.6"
                          />
                          <text
                            x="0"
                            y="3.2"
                            textAnchor="middle"
                            fontSize="9.5"
                            fontWeight="900"
                            fill="#B91C1C"
                          >
                            {badgeText}
                          </text>
                        </g>
                      )}
                      {isLearned && (
                        <circle cx={pillWidth / 2 - 8} cy={-pillHeight / 2 + 6} r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                      )}
                    </g>
                  );
                }

                if (skyTokenStyle === 'balloon') {
                  const rx = orbRadius * 0.88;
                  const ry = orbRadius * 1.06;
                  const sway = Math.sin(walkTime * 2.1 + idx * 0.9) * 3.5;
                  return (
                    <g
                      key={k}
                      transform={`translate(${getSkyX(item)}, ${floatY}) scale(${isCurrent ? 1.2 : 1})`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectItem(item);
                      }}
                      className="cursor-pointer"
                    >
                      {/* Wavy party balloon string */}
                      <path
                        d={`M0 ${ry + 5} Q${sway} ${ry + 19} ${-sway * 0.7} ${ry + 34}`}
                        fill="none"
                        stroke="#64748B"
                        strokeWidth="2"
                        strokeLinecap="round"
                        opacity="0.82"
                      />
                      {/* Balloon knot */}
                      <polygon
                        points={`-4,${ry + 6} 4,${ry + 6} 0,${ry - 1}`}
                        fill={color}
                        stroke="#0F172A"
                        strokeWidth="1.4"
                      />
                      {/* Glossy party balloon body */}
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={rx}
                        ry={ry}
                        fill="#FFFFFF"
                        fillOpacity={isCurrent ? 0.98 : 0.92}
                        stroke={color}
                        strokeWidth={isCurrent ? 4 : 3}
                      />
                      <ellipse
                        cx="0"
                        cy="0"
                        rx={rx - 3}
                        ry={ry - 3}
                        fill={color}
                        fillOpacity={isCurrent ? 0.22 : 0.13}
                      />
                      {/* Balloon specular shine */}
                      <ellipse
                        cx={-rx * 0.42}
                        cy={-ry * 0.38}
                        rx={rx * 0.18}
                        ry={ry * 0.28}
                        transform={`rotate(-22, ${-rx * 0.42}, ${-ry * 0.38})`}
                        fill="#FFFFFF"
                        opacity="0.88"
                      />
                      <text
                        x="0"
                        y="11"
                        textAnchor="middle"
                        fontSize={orbFontSize * 0.92}
                        fontWeight="900"
                        fill={color}
                        stroke="#FFFFFF"
                        strokeWidth="3.5"
                        style={{ paintOrder: 'stroke fill' }}
                      >
                        {tokenText}
                      </text>
                      {isLearned && (
                        <circle cx={rx * 0.72} cy={-ry * 0.65} r="5.5" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.6" />
                      )}
                    </g>
                  );
                }

                return (
                  <g
                    key={k}
                    transform={`translate(${getSkyX(item)}, ${floatY}) scale(${isCurrent ? 1.24 : 1})`}
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectItem(item);
                    }}
                    className="cursor-pointer"
                  >
                    <circle cx="0" cy="0" r={orbRadius} fill="#FFFFFF" fillOpacity={isCurrent ? 0.96 : 0.73} />
                    <text
                      x="0"
                      y="12"
                      textAnchor="middle"
                      fontSize={orbFontSize}
                      fontWeight="900"
                      fill={color}
                      stroke="#FFFFFF"
                      strokeWidth="4"
                      style={{ paintOrder: 'stroke fill' }}
                    >
                      {tokenText}
                    </text>
                    {isLearned && (
                      <circle cx={orbRadius * 0.67} cy={-orbRadius * 0.6} r="5.2" fill="#10B981" stroke="#FFFFFF" strokeWidth="1.5" />
                    )}
                  </g>
                );
              })}
            </g>
          )}

          {/* 3. Series-specific Scenario Props + Jollaman + Foreground Overlays */}
          {children}

          {/* 3.4. Full lower-stage click layer: cancels reveal card during reveal, toggles pause/play otherwise */}
          {!shorts.cleanRecordMode && (
            <rect
              x="0"
              y={shorts.hideSkyTokens ? -60 : 124}
              width="1000"
              height={shorts.hideSkyTokens ? 640 : 456}
              fill="transparent"
              className="cursor-pointer"
              onClick={() => {
                if (phase === 'reveal') {
                  playCutePop();
                  onResetToWalking();
                } else if (shorts.togglePause) {
                  shorts.togglePause();
                } else {
                  playCutePop();
                }
              }}
            />
          )}

          {/* 3.5. Mute-Friendly Cartoon Comic Speech Bubble (follows Jollaman!) */}
          {showComicBubble && (
            <g
              transform={`translate(${bubbleX}, ${bubbleY})`}
              className="pointer-events-none"
            >
              {/* Comic drop shadow */}
              <rect
                x={-bubbleW / 2 + 3}
                y={-bubbleH / 2 + 3}
                width={bubbleW}
                height={bubbleH}
                rx="14"
                fill="#0F172A"
                fillOpacity="0.22"
              />
              {/* Bubble body */}
              <rect
                x={-bubbleW / 2}
                y={-bubbleH / 2}
                width={bubbleW}
                height={bubbleH}
                rx="14"
                fill="#FFFFFF"
                stroke="#0F172A"
                strokeWidth="3"
              />
              {/* Speech tail pointing toward Jollaman */}
              <polygon
                points={`${Math.max(-bubbleW / 2 + 16, tailTipX - 9)},${bubbleH / 2 - 2} ${Math.min(bubbleW / 2 - 16, tailTipX + 9)},${bubbleH / 2 - 2} ${tailTipX},${bubbleH / 2 + 13}`}
                fill="#FFFFFF"
                stroke="#0F172A"
                strokeWidth="3"
                strokeLinejoin="round"
              />
              {/* Mask tail top border seamlessly */}
              <rect
                x={Math.max(-bubbleW / 2 + 12, tailTipX - 11)}
                y={bubbleH / 2 - 5}
                width="22"
                height="6"
                fill="#FFFFFF"
              />
              {bubbleLines.map((line, i) => (
                <text
                  key={i}
                  x="0"
                  y={
                    bubbleLines.length === 1
                      ? 5
                      : i === 0
                      ? -4
                      : 14
                  }
                  textAnchor="middle"
                  fontSize="14.5"
                  fontWeight="900"
                  fill="#0F172A"
                >
                  {line}
                </text>
              ))}
            </g>
          )}

          {/* 4. SVG 무대 하단 고정 통합 자막 바 (16:9 가로 무대 전용 — 9:16 쇼츠에서는 하단 자막 덱을 사용하므로 잘림 방지 위해 숨김) */}
          {!shorts.shortsAspect && (() => {
            const rawBarText = celebrationActive
              ? shorts.globalRomanization
                ? '참 잘했어요! · Great Job!'
                : '학습 완료! 참 잘했어요!'
              : phase === 'walking'
              ? walkingHint
              : shorts.globalRomanization && shorts.romanized
              ? `${activeCaption} · [${shorts.romanized}]`
              : activeCaption;
            const barText = rawBarText.length > 56 ? `${rawBarText.slice(0, 55)}…` : rawBarText;
            const dynamicBarWidth = Math.max(captionBarWidth, Math.min(880, barText.length * 13.5 + 48));
            const barFontSize = barText.length > 42 ? 12.5 : barText.length > 32 ? 13.5 : 15;
            return (
              <g transform="translate(500, 434)" className="pointer-events-none">
                <rect
                  x={-dynamicBarWidth / 2}
                  y="-18"
                  width={dynamicBarWidth}
                  height="32"
                  rx="16"
                  fill="#0F172A"
                  fillOpacity="0.82"
                  stroke="#FFFFFF"
                  strokeOpacity="0.25"
                  strokeWidth="1.5"
                />
                <text x="0" y="3" textAnchor="middle" fontSize={barFontSize} fontWeight="800" fill="#FFFFFF">
                  {barText}
                </text>
              </g>
            );
          })()}
        </svg>

        {/* TRANSPARENT REVEAL OVERLAY */}
        {phase === 'reveal' && (flashcard ? (
          <div
            style={{ containerType: 'size' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent pointer-events-none"
            role="dialog"
            aria-label={revealAriaLabel}
          >
            <JollamanFlashcardCard
              {...flashcard}
              shortsAspect={shorts.shortsAspect}
              isPaused={shorts.isPaused}
              onClose={() => {
                if (!shorts.isPaused && shorts.togglePause) {
                  shorts.togglePause();
                } else {
                  playCutePop();
                  onResetToWalking();
                }
              }}
            />
          </div>
        ) : revealCardSlot ? (
          <div
            style={{ containerType: 'size' }}
            className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent pointer-events-none"
            role="dialog"
            aria-label={revealAriaLabel}
          >
            {revealCardSlot}
          </div>
        ) : (() => {
          const glyphCharLen = revealGlyph.replace(/\s+/g, '').length;
          const glyphFontSize =
            revealGlyphSize === 'large' && glyphCharLen <= 2
              ? shorts.shortsAspect
                ? 'clamp(1.95rem, 24cqh, 4.8rem)'
                : 'clamp(2rem, 25cqh, 7.5rem)'
              : glyphCharLen <= 2
              ? shorts.shortsAspect
                ? 'clamp(1.7rem, 21cqh, 4.2rem)'
                : 'clamp(1.8rem, 22cqh, 6.2rem)'
              : glyphCharLen <= 4
              ? shorts.shortsAspect
                ? 'clamp(1.3rem, 16.5cqh, 2.9rem)'
                : 'clamp(1.4rem, 17cqh, 4.4rem)'
              : shorts.shortsAspect
              ? 'clamp(1.05rem, 13cqh, 2.2rem)'
              : 'clamp(1.1rem, 13.5cqh, 3.2rem)';

          return (
            <div
              style={{ containerType: 'size' }}
              className={`absolute inset-0 z-20 flex flex-col items-center justify-center bg-transparent pointer-events-none ${
                shorts.shortsAspect
                  ? 'p-2 sm:p-3.5'
                  : 'px-3 sm:px-6 pt-3 sm:pt-5 pb-10 sm:pb-12'
              }`}
              role="dialog"
              aria-label={revealAriaLabel}
            >
              <button
                onClick={() => {
                  if (!shorts.isPaused && shorts.togglePause) {
                    shorts.togglePause();
                  } else {
                    playCutePop();
                    onResetToWalking();
                  }
                }}
                className={`pointer-events-auto group focus:outline-none cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] backdrop-blur-[2px] border-2 border-white/95 bg-white/88 shadow-lg flex flex-col items-center justify-center text-center ${
                  shorts.shortsAspect
                    ? 'w-[88%] max-h-[90%] rounded-2xl sm:rounded-3xl px-4 sm:px-7 py-[4.2cqh] sm:py-[5.2cqh]'
                    : 'w-[86%] max-w-[780px] max-h-[86%] rounded-2xl sm:rounded-3xl px-5 sm:px-10 py-[4.2cqh] sm:py-[5.4cqh]'
                }`}
                title={shorts.isPaused ? '클릭하면 카드를 닫고 걷기로 돌아가요!' : '클릭하면 일시정지돼요!'}
              >
                <div
                  className={`shrink-0 font-black leading-[1.1] select-none whitespace-nowrap max-w-full w-full text-center flex items-center justify-center ${
                    shorts.shortsAspect
                      ? '-mt-[0.5cqh] mb-[3.4cqh]'
                      : '-mt-[0.5cqh] mb-[3.6cqh]'
                  }`}
                  style={{
                    fontSize: glyphFontSize,
                    color: getColor(selectedItem),
                    fontFamily: "'Hakgyoansim Badasseugi', 'NanumBarunGothic', sans-serif",
                    WebkitTextStroke: glyphCharLen > 3 ? '3px #FFFFFF' : '5px #FFFFFF',
                    paintOrder: 'stroke fill',
                    textShadow: '0 6px 18px rgba(15, 23, 42, 0.3)',
                  }}
                >
                  {revealGlyph}
                </div>
                <div
                  className={`font-black tracking-tight leading-tight text-center max-w-full w-full flex items-center justify-center ${
                    shorts.shortsAspect ? 'mt-0 mb-[3cqh]' : 'mt-0 mb-[3.2cqh]'
                  }`}
                  style={{
                    fontSize: shorts.shortsAspect
                      ? 'clamp(0.95rem, 11.5cqh, 1.55rem)'
                      : 'clamp(1rem, 11cqh, 2.35rem)',
                    color: '#0F172A',
                    WebkitTextStroke: '5px #FFFFFF',
                    paintOrder: 'stroke fill',
                    textShadow: '0 4px 14px rgba(15, 23, 42, 0.22)',
                  }}
                >
                  {revealHeadline}
                </div>
                {(shorts.globalRomanization || shorts.simpleWhiteShorts || !shorts.shortsAspect) &&
                  shorts.romanized && (
                    <div
                      style={{
                        fontSize: shorts.shortsAspect
                          ? 'clamp(0.68rem, 7cqh, 0.9rem)'
                          : 'clamp(0.75rem, 5.4cqh, 1.05rem)',
                      }}
                      className="w-full flex flex-wrap items-center justify-center text-center font-black text-emerald-700 tracking-wider leading-tight max-w-full"
                    >
                      <span>[{shorts.romanized}]</span>
                      {shorts.englishBadge && shorts.englishBadge !== shorts.romanized && (
                        <>
                          <span aria-hidden="true" className="mx-2.5 sm:mx-3.5 text-emerald-500">
                            ·
                          </span>
                          <span>{shorts.englishBadge}</span>
                        </>
                      )}
                    </div>
                  )}
              </button>
            </div>
          );
        })())}
      </JollamanStageFrame>
      </div>
    </div>
  );
}
