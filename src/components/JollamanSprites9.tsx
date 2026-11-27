import React from 'react';

export type Phonology2Key =
  | '국물'
  | '입니다'
  | '연락'
  | '설날'
  | '같이'
  | '굳이'
  | '좋아'
  | '많아';

export type Phonology2RuleGroup = 'nasal' | 'liquid' | 'palatal' | 'drop';

export function getPhonology2Group(key: Phonology2Key): Phonology2RuleGroup {
  switch (key) {
    case '국물':
    case '입니다':
      return 'nasal';
    case '연락':
    case '설날':
      return 'liquid';
    case '같이':
    case '굳이':
      return 'palatal';
    case '좋아':
    case '많아':
      return 'drop';
  }
}

/**
 * Clean high-contrast cartoon backdrop tailored per Phonology Part 2 rule group
 */
export const Phonology2Backdrop: React.FC<{
  activeKey: Phonology2Key;
  isWalkingMode?: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeKey, isWalkingMode = false, walkTime, scrollOffset = 0 }) => {
  if (isWalkingMode) {
    return (
      <g>
        <defs>
          <linearGradient id="p9LabSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="70%" stopColor="#115E59" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>

        <rect x="0" y="-80" width="1000" height="625" fill="url(#p9LabSky)" />

        {/* Subtle Sci-Fi Lab Blueprint Wall Grid */}
        {[125, 250, 375, 500, 625, 750, 875].map((gx) => (
          <line key={gx} x1={gx} y1="-80" x2={gx} y2="352" stroke="#5EEAD4" strokeWidth="1" opacity="0.18" />
        ))}
        {[175, 235, 295].map((gy) => (
          <line key={gy} x1="0" y1={gy} x2="1000" y2={gy} stroke="#5EEAD4" strokeWidth="1" opacity="0.18" />
        ))}

        {/* Glowing Lab Specimen Cylinders / Flasks */}
        {[
          { x: 160, h: 120, color: '#2DD4BF' },
          { x: 500, h: 145, color: '#38BDF8' },
          { x: 840, h: 120, color: '#A78BFA' },
        ].map((tube, idx) => (
          <g key={tube.x} transform={`translate(${tube.x}, 352)`}>
            <rect x="-32" y={-tube.h} width="64" height={tube.h} rx="12" fill="#0F172A" fillOpacity="0.6" stroke={tube.color} strokeWidth="2.5" />
            <rect x="-26" y={-tube.h + 18} width="52" height={tube.h - 24} rx="8" fill={tube.color} opacity="0.22" />
            <circle
              cx={Math.sin(walkTime * 2 + idx) * 8}
              cy={-30 - ((walkTime * 28 + idx * 30) % (tube.h - 45))}
              r="5"
              fill={tube.color}
              opacity="0.7"
            />
            <circle
              cx={-Math.cos(walkTime * 2.4 + idx) * 9}
              cy={-20 - ((walkTime * 36 + idx * 50) % (tube.h - 45))}
              r="3.5"
              fill="#FFFFFF"
              opacity="0.75"
            />
          </g>
        ))}

        {/* Brushed Lab Floor & Glowing Mint Neon Track */}
        <rect x="0" y="352" width="1000" height="195" fill="#0F172A" />
        <rect x="0" y="366" width="1000" height="52" fill="#1E293B" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#2DD4BF" strokeWidth="3" opacity="0.85" />
        <line x1="0" y1="418" x2="1000" y2="418" stroke="#5EEAD4" strokeWidth="2" opacity="0.45" />
      </g>
    );
  }

  const group = getPhonology2Group(activeKey);

  const skyTop =
    group === 'nasal'
      ? '#2DD4BF'
      : group === 'liquid'
      ? '#38BDF8'
      : group === 'palatal'
      ? '#FB7185'
      : '#A78BFA';
  const skyBot =
    group === 'nasal'
      ? '#F0FDFA'
      : group === 'liquid'
      ? '#ECFEFF'
      : group === 'palatal'
      ? '#FFF1F2'
      : '#F5F3FF';
  const hillFill =
    group === 'nasal'
      ? '#99F6E4'
      : group === 'liquid'
      ? '#A5F3FC'
      : group === 'palatal'
      ? '#FECDD3'
      : '#DDD6FE';
  const groundFill =
    group === 'nasal'
      ? '#14B8A6'
      : group === 'liquid'
      ? '#06B6D4'
      : group === 'palatal'
      ? '#F43F5E'
      : '#8B5CF6';
  const pathFill =
    group === 'palatal' ? '#FFE4E6' : group === 'drop' ? '#EDE9FE' : '#F0FDFA';

  return (
    <g>
      <defs>
        <linearGradient id={`p9Sky-${group}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>

      <rect x="0" y="-80" width="1000" height="625" fill={`url(#p9Sky-${group})`} />

      {/* Drifting soft clouds */}
      <g opacity="0.82">
        {[170, 520, 840].map((cx, idx) => (
          <g
            key={cx}
            transform={`translate(${((cx - scrollOffset * 0.14) % 1060 + 1060) % 1060 - 30 + Math.sin(walkTime * 0.45 + idx) * 9}, ${118 + (idx % 2) * 18})`}
          >
            <circle cx="-22" cy="8" r="18" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" />
            <circle cx="24" cy="8" r="18" fill="#FFFFFF" />
          </g>
        ))}
      </g>

      {/* Rolling hills */}
      <g transform={`translate(${-(scrollOffset * 0.2) % 1000}, 0)`}>
        {[0, 1000].map((off) => (
          <path
            key={off}
            transform={`translate(${off}, 0)`}
            d="M0 348 Q260 282 560 338 T1000 326 L1000 368 L0 368 Z"
            fill={hillFill}
          />
        ))}
      </g>

      {/* Ground & stage floor */}
      <rect x="0" y="352" width="1000" height="195" fill={groundFill} />
      <rect x="0" y="366" width="1000" height="52" fill={pathFill} />
      <line x1="0" y1="366" x2="1000" y2="366" stroke="#334155" strokeWidth="2.5" opacity="0.45" />
      <line x1="0" y1="418" x2="1000" y2="418" stroke="#334155" strokeWidth="2" opacity="0.28" />
    </g>
  );
};

/**
 * Tiny comical poop sitting atop ㅁ with rising green stink fumes!
 */
export const TinyPoopWithFumesSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const wave1 = Math.sin(walkTime * 5) * 3;
  const wave2 = Math.cos(walkTime * 4.5) * 3;
  return (
    <g>
      {/* Rising smelly stink lines from the very start */}
      <path
        d={`M-10 -22 Q${-16 + wave1} -38 ${-8 - wave1} -52 Q${-14 + wave2} -66 -6 -78`}
        fill="none"
        stroke="#65A30D"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.88"
      />
      <path
        d={`M0 -24 Q${6 + wave2} -42 ${-2 - wave2} -58 Q${6 + wave1} -72 0 -86`}
        fill="none"
        stroke="#84CC16"
        strokeWidth="3.8"
        strokeLinecap="round"
        opacity="0.92"
      />
      <path
        d={`M10 -22 Q${15 - wave1} -38 ${8 + wave1} -52 Q${14 - wave2} -65 8 -76`}
        fill="none"
        stroke="#65A30D"
        strokeWidth="3.2"
        strokeLinecap="round"
        opacity="0.82"
      />
      {/* Tiny swirling cartoon poop */}
      <ellipse cx="0" cy="-4" rx="14" ry="5.5" fill="#78350F" stroke="#451A03" strokeWidth="2" />
      <ellipse cx="0" cy="-10" rx="10" ry="4.5" fill="#92400E" stroke="#451A03" strokeWidth="2" />
      <path
        d="M-5 -14 Q0 -23 5 -14 Z"
        fill="#B45309"
        stroke="#451A03"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      {/* Tiny flies */}
      <circle cx={-18 + Math.sin(walkTime * 11) * 5} cy={-30 + Math.cos(walkTime * 9) * 4} r="2.2" fill="#1E293B" />
      <circle cx={19 + Math.cos(walkTime * 10) * 5} cy={-26 + Math.sin(walkTime * 12) * 4} r="2.2" fill="#1E293B" />
    </g>
  );
};

/**
 * Giant comical red honking nose overlay when ㄱ sneezes from stink fumes!
 */
export const GiantNoseOverlaySvg: React.FC<{ pulse?: number }> = ({ pulse = 1 }) => (
  <g transform={`translate(14, -34) scale(${pulse})`}>
    <ellipse cx="0" cy="0" rx="14" ry="12" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.8" />
    <ellipse cx="-4" cy="-4" rx="4.5" ry="3.2" fill="#FCA5A5" opacity="0.9" />
  </g>
);

/**
 * Shiny camera flash starburst for palatalization ("이~ 치~!! 📸✨")
 */
export const CameraFlashBurstSvg: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <polygon
      points="0,-58 14,-18 54,-30 24,2 56,30 14,20 0,58 -14,20 -56,30 -24,2 -54,-30 -14,-18"
      fill="#FEF08A"
      stroke="#F59E0B"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <circle cx="0" cy="0" r="18" fill="#FFFFFF" opacity="0.9" />
  </g>
);

/**
 * Popping soap-bubble droplets for ㅎ 탈락
 */
export const SoapBubblePopSvg: React.FC<{ progress: number }> = ({ progress }) => {
  const r = 24 + progress * 48;
  return (
    <g opacity={Math.max(0, 1 - progress)}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
        const rad = (deg * Math.PI) / 180;
        const px = Math.cos(rad) * r;
        const py = Math.sin(rad) * r;
        return (
          <circle
            key={deg}
            cx={px}
            cy={py}
            r={Math.max(2, 7 * (1 - progress))}
            fill="#E0E7FF"
            stroke="#7C3AED"
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
};
