import React from 'react';

export interface JollamanCornerIcon {
  viewBox: string;
  svg: React.ReactNode;
}

export interface JollamanFlashcardConfig {
  glyph: string;
  glyphNode?: React.ReactNode;
  subLabel?: string;
  accentColor: string;
  headlineNode: React.ReactNode;
  headlineCharLen: number;
  meaning: string;
  romanization: string;
  cornerIcon?: JollamanCornerIcon | null;
}

interface JollamanFlashcardCardProps extends JollamanFlashcardConfig {
  shortsAspect: boolean;
  isPaused?: boolean;
  onClose: () => void;
}

export const JollamanFlashcardCard: React.FC<JollamanFlashcardCardProps> = ({
  glyph,
  glyphNode,
  subLabel,
  accentColor,
  headlineNode,
  headlineCharLen,
  meaning,
  romanization,
  cornerIcon,
  shortsAspect,
  isPaused = false,
  onClose,
}) => {
  const glyphLen = glyph.replace(/\s+/g, '').length;
  const glyphFontSize =
    glyphLen <= 2
      ? 'clamp(1.1rem, 19.5cqh, 5.2rem)'
      : glyphLen <= 4
      ? 'clamp(0.95rem, 14.5cqh, 3.6rem)'
      : glyphLen <= 6
      ? 'clamp(0.82rem, 11.5cqh, 2.65rem)'
      : 'clamp(0.72rem, 9.4cqh, 2.15rem)';

  const headlineFontSize =
    headlineCharLen <= 3
      ? 'clamp(0.88rem, 13.5cqh, 3.35rem)'
      : headlineCharLen <= 6
      ? 'clamp(0.78rem, 11cqh, 2.65rem)'
      : headlineCharLen <= 10
      ? 'clamp(0.68rem, 8.8cqh, 2.05rem)'
      : headlineCharLen <= 14
      ? 'clamp(0.62rem, 7.4cqh, 1.65rem)'
      : 'clamp(0.56rem, 6.2cqh, 1.38rem)';

  const meaningFontSize =
    meaning.length > 26
      ? 'clamp(0.48rem, 5cqh, 1.1rem)'
      : meaning.length > 18
      ? 'clamp(0.5rem, 5.6cqh, 1.26rem)'
      : 'clamp(0.54rem, 6.2cqh, 1.42rem)';

  const romFontSize =
    romanization.length > 20
      ? 'clamp(0.46rem, 4.7cqh, 1.06rem)'
      : 'clamp(0.5rem, 5.4cqh, 1.26rem)';

  const subLabelFontSize =
    subLabel && subLabel.length > 14
      ? 'clamp(0.46rem, 5.1cqh, 1.22rem)'
      : subLabel && subLabel.length > 10
      ? 'clamp(0.48rem, 5.8cqh, 1.4rem)'
      : 'clamp(0.52rem, 6.4cqh, 1.55rem)';

  return (
    <div
      className={`w-full h-full flex items-center justify-center px-3 sm:px-4 pointer-events-none ${
        shortsAspect ? 'pt-[3.5cqh] pb-[5cqh]' : 'pt-[1.6cqh] pb-[8.2cqh]'
      }`}
    >
      <button
        onClick={onClose}
        title={isPaused ? '클릭하면 카드를 닫고 걷기로 돌아가요!' : '클릭하면 일시정지돼요!'}
        style={{
          height: 'auto',
          minHeight: shortsAspect ? '76cqh' : '74cqh',
          maxHeight: shortsAspect ? '88cqh' : '86cqh',
          minWidth: shortsAspect ? 'min(74cqw, 76cqh)' : '76cqh',
          maxWidth: shortsAspect ? 'min(88cqw, 88cqh)' : 'min(92cqw, 94cqh)',
          padding: '2.6cqh 4.2cqh 2.8cqh',
        }}
        className="relative pointer-events-auto group focus:outline-none cursor-pointer transition-transform hover:scale-[1.02] active:scale-[0.98] bg-white/95 backdrop-blur-[3px] border-[3px] border-white rounded-[clamp(14px,5.2cqh,28px)] shadow-[0_14px_34px_rgba(15,23,42,0.28)] flex flex-col items-center justify-center text-center"
      >
        {/* Top-Left 3 Comic Emphasis Rays */}
        <svg
          viewBox="-4 -4 64 64"
          aria-hidden="true"
          className={`pointer-events-none absolute drop-shadow-[0_2px_4px_rgba(15,23,42,0.22)] ${
            shortsAspect
              ? '-top-[4.4cqh] -left-[4.4cqh] w-[10.5cqh] h-[10.5cqh]'
              : '-top-[5.2cqh] -left-[5.2cqh] w-[12cqh] h-[12cqh]'
          }`}
        >
          <polygon
            points="12,34 2,21 13,15 21,29"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <polygon
            points="25,24 19,5 32,4 33,22"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
          <polygon
            points="38,26 45,10 56,18 44,31"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="2.8"
            strokeLinejoin="round"
          />
        </svg>

        {/* Top Large Glyph (Existing Card Font Preserved) */}
        <div
          className="shrink-0 font-black leading-[1.08] select-none whitespace-nowrap flex items-center justify-center max-w-full"
          style={{
            fontSize: glyphFontSize,
            color: accentColor,
            fontFamily: "'Hakgyoansim Badasseugi', 'NanumBarunGothic', sans-serif",
            WebkitTextStroke: glyphLen > 3 ? '2px #FFFFFF' : '3px #FFFFFF',
            paintOrder: 'stroke fill',
            textShadow: '0 5px 14px rgba(15, 23, 42, 0.16)',
          }}
        >
          {glyphNode ?? glyph}
        </div>

        {/* Sub-label / Sound Cue / Grammar Tag */}
        {subLabel && (
          <div
            className="shrink-0 font-black text-slate-800 leading-[1.25] tracking-tight whitespace-nowrap mt-[0.8cqh] max-w-full text-center"
            style={{ fontSize: subLabelFontSize }}
          >
            {subLabel}
          </div>
        )}

        {/* Crisp Colored Horizontal Divider */}
        <div
          className="w-[82%] h-[2px] rounded-full my-[1.4cqh] shrink-0"
          style={{ backgroundColor: accentColor, opacity: 0.55 }}
        />

        {/* Highlighted Main Word / Transformation Line */}
        <div
          className={`shrink-0 font-black leading-tight tracking-tight flex items-baseline justify-center max-w-full ${
            headlineCharLen > 10 ? 'flex-wrap gap-x-1' : 'whitespace-nowrap'
          }`}
          style={{
            fontSize: headlineFontSize,
            color: '#0F172A',
          }}
        >
          {headlineNode}
        </div>

        {/* English Meaning */}
        <div
          className="shrink-0 font-extrabold text-slate-800 leading-tight mt-[0.9cqh] max-w-full text-center"
          style={{ fontSize: meaningFontSize }}
        >
          {meaning}
        </div>

        {/* Romanization */}
        {romanization && (
          <div
            className="shrink-0 font-black text-emerald-700 leading-tight tracking-wide mt-[0.4cqh] max-w-full text-center"
            style={{ fontSize: romFontSize }}
          >
            {romanization}
          </div>
        )}

        {/* Bottom-Right Comic Character/Object Icon (only when concrete physical object exists) */}
        {cornerIcon && (
          <div
            aria-hidden="true"
            className={`pointer-events-none absolute flex items-center justify-center drop-shadow-[0_6px_12px_rgba(15,23,42,0.28)] ${
              shortsAspect
                ? '-right-[7.5cqh] -bottom-[4.2cqh] w-[20cqh] h-[20cqh]'
                : '-right-[14.5cqh] -bottom-[5.5cqh] w-[25cqh] h-[25cqh]'
            }`}
          >
            <svg
              viewBox="0 0 32 32"
              className="absolute -top-[1cqh] -right-[2.5cqh] w-[6cqh] h-[6cqh]"
            >
              <polygon
                points="4,15 17,4 22,12 7,20"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
              <polygon
                points="9,24 25,20 27,28 11,29"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="2.2"
                strokeLinejoin="round"
              />
            </svg>
            <svg viewBox={cornerIcon.viewBox} className="w-full h-full overflow-visible">
              {cornerIcon.svg}
            </svg>
          </div>
        )}
      </button>
    </div>
  );
};
