import React from 'react';
import { useShortsStudio } from '../context/ShortsStudioContext';

export type PhonologyKey =
  | '먹어'
  | '앉아'
  | '축하'
  | '좋다'
  | '쓰+어'
  | '가+아'
  | '오+아'
  | '주+어'
  | '학교'
  | '국밥';

export type PhonologyRuleGroup = 'liaison' | 'aspiration' | 'elision' | 'vowelContract' | 'tensify';

export function getPhonologyGroup(key: PhonologyKey): PhonologyRuleGroup {
  switch (key) {
    case '먹어':
    case '앉아':
      return 'liaison';
    case '축하':
    case '좋다':
      return 'aspiration';
    case '쓰+어':
    case '가+아':
      return 'elision';
    case '오+아':
    case '주+어':
      return 'vowelContract';
    case '학교':
    case '국밥':
      return 'tensify';
  }
}

/**
 * Clean high-contrast cartoon backdrop tailored per Phonology rule group
 * so giant 170px+ Hangul blocks stand out crisply while walking seamlessly continues.
 */
export const PhonologyBackdrop: React.FC<{
  activeKey: PhonologyKey;
  isWalkingMode?: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeKey, isWalkingMode = false, walkTime, scrollOffset = 0 }) => {
  if (isWalkingMode) {
    return (
      <g>
        <defs>
          <linearGradient id="p8CarnivalSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#EC4899" />
            <stop offset="55%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#FEF9C3" />
          </linearGradient>
        </defs>

        <rect x="0" y="-80" width="1000" height="625" fill="url(#p8CarnivalSky)" />

        {/* Distant Rotating Ferris Wheel on Right */}
        <g transform="translate(805, 255)">
          <line x1="0" y1="0" x2="-38" y2="102" stroke="#BE185D" strokeWidth="5" />
          <line x1="0" y1="0" x2="38" y2="102" stroke="#BE185D" strokeWidth="5" />
          <g transform={`rotate(${walkTime * 14})`}>
            <circle cx="0" cy="0" r="76" fill="none" stroke="#F43F5E" strokeWidth="4" />
            <circle cx="0" cy="0" r="52" fill="none" stroke="#FB7185" strokeWidth="2.5" />
            {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
              const rad = (deg * Math.PI) / 180;
              const gx = Math.cos(rad) * 76;
              const gy = Math.sin(rad) * 76;
              return (
                <g key={deg}>
                  <line x1="0" y1="0" x2={gx} y2={gy} stroke="#FDA4AF" strokeWidth="2" />
                  <circle cx={gx} cy={gy} r="7" fill="#FDE047" stroke="#E11D48" strokeWidth="2" />
                </g>
              );
            })}
          </g>
          <circle cx="0" cy="0" r="9" fill="#FDE047" stroke="#BE185D" strokeWidth="2.5" />
        </g>

        {/* Striped Magic Circus Tent on Left */}
        <g transform="translate(175, 352)">
          <polygon points="-78,0 78,0 64,-78 -64,-78" fill="#FFF1F2" stroke="#BE123C" strokeWidth="3" />
          <polygon points="-42,0 -18,0 -18,-78 -42,-78" fill="#F43F5E" opacity="0.85" />
          <polygon points="18,0 42,0 42,-78 18,-78" fill="#F43F5E" opacity="0.85" />
          <polygon points="-86,-78 0,-138 86,-78" fill="#E11D48" stroke="#9F1239" strokeWidth="3" />
          <polygon points="-42,-78 0,-138 42,-78" fill="#FDE047" />
          <polygon points="-14,0 14,0 12,-46 -12,-46" fill="#4C0519" />
          <line x1="0" y1="-138" x2="0" y2="-160" stroke="#9F1239" strokeWidth="3" />
          <polygon points="0,-160 22,-153 0,-146" fill="#FACC15" />
        </g>

        {/* Festive Carnival Pennant Banner String */}
        <path d="M0 165 Q250 198 500 172 T1000 168" fill="none" stroke="#9F1239" strokeWidth="2.5" opacity="0.65" />
        {[80, 175, 270, 365, 460, 555, 650, 745, 840, 935].map((bx, idx) => {
          const colors = ['#EF4444', '#FACC15', '#3B82F6', '#10B981', '#A855F7'];
          const by = 175 + Math.sin(idx * 0.8) * 10;
          return (
            <polygon
              key={bx}
              points={`${bx - 11},${by} ${bx + 11},${by} ${bx},${by + 20}`}
              fill={colors[idx % colors.length]}
            />
          );
        })}

        {/* Carnival Plaza Ground & Checkered Walkway */}
        <rect x="0" y="352" width="1000" height="195" fill="#EC4899" />
        <rect x="0" y="366" width="1000" height="52" fill="#FFF1F2" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#9D174D" strokeWidth="2.5" opacity="0.55" />
        <line x1="0" y1="418" x2="1000" y2="418" stroke="#9D174D" strokeWidth="2" opacity="0.35" />
      </g>
    );
  }

  const group = getPhonologyGroup(activeKey);

  const skyTop =
    group === 'liaison'
      ? '#38BDF8'
      : group === 'aspiration'
      ? '#FB923C'
      : group === 'elision'
      ? '#60A5FA'
      : group === 'vowelContract'
      ? '#F472B6'
      : '#818CF8';
  const skyBot =
    group === 'liaison'
      ? '#F0F9FF'
      : group === 'aspiration'
      ? '#FEF3C7'
      : group === 'elision'
      ? '#EFF6FF'
      : group === 'vowelContract'
      ? '#FDF2F8'
      : '#EEF2FF';
  const hillFill =
    group === 'liaison'
      ? '#86EFAC'
      : group === 'aspiration'
      ? '#FDBA74'
      : group === 'elision'
      ? '#93C5FD'
      : group === 'vowelContract'
      ? '#FBCFE8'
      : '#C7D2FE';
  const groundFill =
    group === 'liaison'
      ? '#4ADE80'
      : group === 'aspiration'
      ? '#F59E0B'
      : group === 'elision'
      ? '#34D399'
      : group === 'vowelContract'
      ? '#EC4899'
      : '#6366F1';
  const pathFill =
    group === 'aspiration'
      ? '#FEF3C7'
      : group === 'vowelContract'
      ? '#FCE7F3'
      : group === 'tensify'
      ? '#E0E7FF'
      : '#F1F5F9';

  return (
    <g>
      <defs>
        <linearGradient id={`p8Sky-${group}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>

      <rect x="0" y="-80" width="1000" height="625" fill={`url(#p8Sky-${group})`} />

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
 * Giant hollow circular 'ㅇ' ring where powerless Jollaman naps & leans inside!
 */
export const GiantHollowIeungSvg: React.FC<{
  radius?: number;
  strokeColor?: string;
  cracked?: boolean;
}> = ({ radius = 52, strokeColor = '#0F172A', cracked = false }) => (
  <g>
    {/* Cozy white ring fill */}
    <circle
      cx="0"
      cy="0"
      r={radius}
      fill="#FFFFFF"
      fillOpacity="0.25"
      stroke="#FFFFFF"
      strokeWidth="26"
    />
    <circle
      cx="0"
      cy="0"
      r={radius}
      fill="none"
      stroke={strokeColor}
      strokeWidth="17"
    />
    {cracked && (
      <path
        d="M-24 -42 L-8 -22 L-18 -6 L0 12"
        fill="none"
        stroke="#EF4444"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    )}
  </g>
);

export {
  GiantHangulSvg,
  BlinkHighlightRingSvg as PhonologyBlinkRingSvg,
  SparkleBurstSvg as PhonologySparkleBurstSvg,
} from './JollamanSprites';

/**
 * Jagged Cartoon Lightning Zap for Tensification (학교 / 국밥)
 */
export const ElectricZapSvg: React.FC<{ color?: string }> = ({ color = '#FACC15' }) => (
  <polygon
    points="0,-28 18,-6 6,-4 22,22 -6,4 4,2 -14,-18"
    fill={color}
    stroke="#B45309"
    strokeWidth="2.5"
    strokeLinejoin="round"
  />
);

export const PhonologyStepHudSvg: React.FC<{
  step: 1 | 2 | 3 | 4;
  stepText: string;
  accentColor: string;
  centerX?: number;
  y?: number;
}> = ({ step, stepText, accentColor, centerX = 480, y = 128 }) => {
  const { showStepHud } = useShortsStudio();
  if (!showStepHud) return null;

  const steps: { num: 1 | 2 | 3 | 4; short: string }[] = [
    { num: 1, short: '원래 글자' },
    { num: 2, short: '변동 깜빡!' },
    { num: 3, short: '변신!' },
    { num: 4, short: '발음 완성' },
  ];

  return (
    <g transform={`translate(${centerX}, ${y})`}>
      <rect
        x="-178"
        y="-22"
        width="356"
        height="44"
        rx="13"
        fill="#FFFFFF"
        fillOpacity="0.94"
        stroke={accentColor}
        strokeWidth="2.5"
      />
      <g transform="translate(0, -8)">
        {steps.map((s, idx) => {
          const sx = (idx - 1.5) * 82;
          const active = s.num === step;
          const done = s.num < step;
          return (
            <g key={s.num} transform={`translate(${sx}, 0)`}>
              <rect
                x="-36"
                y="-9.5"
                width="72"
                height="19"
                rx="9.5"
                fill={active ? accentColor : done ? '#DCFCE7' : '#F1F5F9'}
                stroke={active ? accentColor : done ? '#16A34A' : '#CBD5E1'}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="3.5"
                textAnchor="middle"
                fontSize="10.5"
                fontWeight="900"
                fill={active ? '#FFFFFF' : done ? '#15803D' : '#64748B'}
              >
                {s.num}.{s.short}
              </text>
            </g>
          );
        })}
      </g>
      <text x="0" y="15" textAnchor="middle" fontSize="13" fontWeight="900" fill="#0F172A">
        {stepText}
      </text>
    </g>
  );
};

