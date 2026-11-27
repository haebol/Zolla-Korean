import React from 'react';
import { useShortsStudio } from '../context/ShortsStudioContext';

export type IrregularKey =
  | '춥다'
  | '듣다'
  | '짓다'
  | '부르다'
  | '아프다'
  | '파랗다'
  | '만들다'
  | '하다';

export type IrregularRuleGroup = 'winter' | 'sound' | 'craft' | 'magic';

export function getIrregularGroup(key: IrregularKey): IrregularRuleGroup {
  switch (key) {
    case '춥다':
      return 'winter';
    case '듣다':
    case '부르다':
      return 'sound';
    case '짓다':
    case '아프다':
    case '만들다':
      return 'craft';
    case '파랗다':
    case '하다':
      return 'magic';
  }
}

export const IrregularBackdrop: React.FC<{
  activeKey: IrregularKey;
  isWalkingMode?: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeKey, isWalkingMode = false, walkTime, scrollOffset = 0 }) => {
  if (isWalkingMode) {
    return (
      <g>
        <defs>
          <linearGradient id="p10AlpineSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="65%" stopColor="#BAE6FD" />
            <stop offset="100%" stopColor="#F0F9FF" />
          </linearGradient>
        </defs>

        <rect x="0" y="-80" width="1000" height="625" fill="url(#p10AlpineSky)" />

        {/* Towering Jagged Alpine Peaks with Bright Snowcaps */}
        <polygon points="0,352 170,165 340,352" fill="#475569" />
        <polygon points="170,165 118,223 148,214 170,235 196,214 222,223" fill="#FFFFFF" />

        <polygon points="240,352 465,138 690,352" fill="#334155" />
        <polygon points="465,138 400,204 438,194 465,220 498,192 530,204" fill="#FFFFFF" />

        <polygon points="580,352 795,155 1000,352" fill="#475569" />
        <polygon points="795,155 735,215 768,206 795,228 824,205 855,215" fill="#FFFFFF" />

        {/* Frosted Evergreen Pine Trees */}
        {[95, 315, 650, 910].map((px) => (
          <g key={px} transform={`translate(${px}, 352)`}>
            <rect x="-5" y="-24" width="10" height="24" fill="#451A03" />
            <polygon points="-28,-22 0,-75 28,-22" fill="#0F766E" />
            <polygon points="-22,-52 0,-98 22,-52" fill="#14B8A6" />
            <polygon points="-12,-76 0,-98 12,-76" fill="#FFFFFF" />
          </g>
        ))}

        {/* Falling Alpine Snowflakes */}
        {[110, 230, 360, 490, 620, 750, 880].map((sx, idx) => (
          <circle
            key={sx}
            cx={sx + Math.sin(walkTime * 2 + idx) * 14}
            cy={((walkTime * 48 + idx * 65) % 340) + 15}
            r={3 + (idx % 2) * 1.4}
            fill="#FFFFFF"
            opacity="0.9"
          />
        ))}

        {/* Snowy Ground & Glacier Trail */}
        <rect x="0" y="352" width="1000" height="195" fill="#BAE6FD" />
        <rect x="0" y="366" width="1000" height="52" fill="#FFFFFF" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#7DD3FC" strokeWidth="2.5" />
        <line x1="0" y1="418" x2="1000" y2="418" stroke="#7DD3FC" strokeWidth="2" opacity="0.6" />
      </g>
    );
  }

  const group = getIrregularGroup(activeKey);

  const skyTop =
    group === 'winter'
      ? '#60A5FA'
      : group === 'sound'
      ? '#FB923C'
      : group === 'craft'
      ? '#34D399'
      : '#818CF8';
  const skyBot =
    group === 'winter'
      ? '#EFF6FF'
      : group === 'sound'
      ? '#FFFBEB'
      : group === 'craft'
      ? '#ECFDF5'
      : '#EEF2FF';
  const hillFill =
    group === 'winter'
      ? '#DBEAFE'
      : group === 'sound'
      ? '#FDE68A'
      : group === 'craft'
      ? '#A7F3D0'
      : '#C7D2FE';
  const groundFill =
    group === 'winter'
      ? '#93C5FD'
      : group === 'sound'
      ? '#F59E0B'
      : group === 'craft'
      ? '#10B981'
      : '#6366F1';
  const pathFill =
    group === 'winter'
      ? '#F8FAFC'
      : group === 'sound'
      ? '#FEF3C7'
      : group === 'craft'
      ? '#ECFDF5'
      : '#EEF2FF';

  return (
    <g>
      <defs>
        <linearGradient id={`p10Sky-${group}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>

      <rect x="0" y="-80" width="1000" height="625" fill={`url(#p10Sky-${group})`} />

      {/* Drifting soft clouds */}
      <g opacity="0.84">
        {[165, 515, 845].map((cx, idx) => (
          <g
            key={cx}
            transform={`translate(${((cx - scrollOffset * 0.14) % 1060 + 1060) % 1060 - 30 + Math.sin(walkTime * 0.45 + idx) * 9}, ${116 + (idx % 2) * 18})`}
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

      {/* Snowflakes for winter cold scene */}
      {group === 'winter' && (
        <g opacity="0.85">
          {[140, 260, 390, 540, 680, 820].map((sx, i) => {
            const sy = ((walkTime * 48 + i * 75) % 340) + 15;
            return (
              <circle
                key={sx}
                cx={sx + Math.sin(walkTime * 2 + i) * 14}
                cy={sy}
                r={3 + (i % 2)}
                fill="#FFFFFF"
              />
            );
          })}
        </g>
      )}

      {/* Ground & stage floor */}
      <rect x="0" y="352" width="1000" height="195" fill={groundFill} />
      <rect x="0" y="366" width="1000" height="52" fill={pathFill} />
      <line x1="0" y1="366" x2="1000" y2="366" stroke="#334155" strokeWidth="2.5" opacity="0.45" />
      <line x1="0" y1="418" x2="1000" y2="418" stroke="#334155" strokeWidth="2" opacity="0.28" />
    </g>
  );
};

export const WarmCampfireSvg: React.FC<{ pulse?: number }> = ({ pulse = 1 }) => (
  <g transform={`scale(${pulse})`}>
    {/* Crossed logs */}
    <rect x="-26" y="4" width="52" height="11" rx="5" fill="#78350F" transform="rotate(-14)" />
    <rect x="-26" y="4" width="52" height="11" rx="5" fill="#92400E" transform="rotate(14)" />
    {/* Outer orange flame */}
    <path
      d="M0 -48 C18 -28 24 -8 18 6 C12 14 -12 14 -18 6 C-24 -8 -18 -28 0 -48 Z"
      fill="#F97316"
      stroke="#EA580C"
      strokeWidth="2.5"
    />
    {/* Inner bright yellow flame */}
    <path
      d="M0 -28 C10 -14 12 -2 8 6 C4 10 -4 10 -8 6 C-12 -2 -10 -14 0 -28 Z"
      fill="#FDE047"
    />
  </g>
);

export const IceCrackShardsSvg: React.FC<{ progress: number }> = ({ progress }) => {
  const spread = progress * 68;
  return (
    <g opacity={Math.max(0, 1 - progress)}>
      {[
        { dx: -1, dy: -0.8, rot: -35 },
        { dx: 1, dy: -0.9, rot: 40 },
        { dx: -0.8, dy: 0.7, rot: -70 },
        { dx: 0.9, dy: 0.6, rot: 65 },
      ].map((s, idx) => (
        <polygon
          key={idx}
          points="-8,-8 10,-2 2,10"
          fill="#BAE6FD"
          stroke="#0284C7"
          strokeWidth="2"
          transform={`translate(${s.dx * spread}, ${s.dy * spread}) rotate(${s.rot + progress * 120})`}
        />
      ))}
    </g>
  );
};

export const BoomingSpeakerSvg: React.FC<{ pulse?: number; blasting?: boolean }> = ({
  pulse = 1,
  blasting = false,
}) => (
  <g transform={`scale(${pulse})`}>
    <rect x="-28" y="-34" width="56" height="68" rx="10" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
    <circle cx="0" cy="-14" r="9" fill="#475569" stroke="#94A3B8" strokeWidth="2" />
    <circle cx="0" cy="12" r="18" fill="#334155" stroke="#F59E0B" strokeWidth="3.5" />
    <circle cx="0" cy="12" r="7" fill="#FBBF24" />
    {blasting && (
      <g stroke="#F59E0B" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M36 -14 Q48 0 36 14" />
        <path d="M48 -24 Q64 0 48 24" />
      </g>
    )}
  </g>
);

export const ToyHammerSvg: React.FC<{ angle?: number }> = ({ angle = 0 }) => (
  <g transform={`rotate(${angle})`}>
    {/* Handle */}
    <rect x="-5" y="-6" width="10" height="58" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    {/* Mallet Head */}
    <rect x="-28" y="-26" width="56" height="26" rx="7" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
    <rect x="-31" y="-24" width="8" height="22" rx="3" fill="#FDE047" stroke="#991B1B" strokeWidth="1.5" />
    <rect x="23" y="-24" width="8" height="22" rx="3" fill="#FDE047" stroke="#991B1B" strokeWidth="1.5" />
  </g>
);

export const MegaphoneSvg: React.FC = () => (
  <g>
    <polygon points="-24,-10 18,-26 18,22 -24,6" fill="#E11D48" stroke="#881337" strokeWidth="2.5" strokeLinejoin="round" />
    <rect x="-32" y="-8" width="12" height="16" rx="4" fill="#F43F5E" stroke="#881337" strokeWidth="2" />
    <rect x="-18" y="6" width="8" height="18" rx="3" fill="#1E293B" />
    <ellipse cx="18" cy="-2" rx="5" ry="24" fill="#FDA4AF" stroke="#881337" strokeWidth="2" />
  </g>
);

export const BluePaintSplashSvg: React.FC<{ progress: number }> = ({ progress }) => {
  const s = 0.6 + progress * 0.7;
  return (
    <g transform={`scale(${s})`} opacity={Math.max(0.25, 1 - progress * 0.4)}>
      <circle cx="0" cy="0" r="34" fill="#3B82F6" opacity="0.82" />
      <circle cx="-32" cy="-18" r="14" fill="#2563EB" opacity="0.88" />
      <circle cx="34" cy="-14" r="16" fill="#60A5FA" opacity="0.85" />
      <circle cx="-24" cy="28" r="12" fill="#2563EB" opacity="0.85" />
      <circle cx="28" cy="26" r="13" fill="#3B82F6" opacity="0.85" />
    </g>
  );
};

export {
  BananaPeelSvg,
  BlinkHighlightRingSvg,
  SparkleBurstSvg,
} from './JollamanSprites';

export const StepProgressHudSvg: React.FC<{
  step: 1 | 2 | 3 | 4 | 5;
  stepText: string;
  accentColor: string;
  centerX?: number;
  y?: number;
}> = ({ step, stepText, accentColor, centerX = 465, y = 128 }) => {
  const { showStepHud } = useShortsStudio();
  if (!showStepHud) return null;

  const steps: { num: 1 | 2 | 3 | 4 | 5; short: string }[] = [
    { num: 1, short: '기본형' },
    { num: 2, short: '어미' },
    { num: 3, short: '다 추방' },
    { num: 4, short: '깜빡!' },
    { num: 5, short: '완성' },
  ];

  return (
    <g transform={`translate(${centerX}, ${y})`}>
      <rect
        x="-188"
        y="-24"
        width="376"
        height="48"
        rx="14"
        fill="#FFFFFF"
        fillOpacity="0.94"
        stroke={accentColor}
        strokeWidth="2.5"
      />
      {/* 5 step mini pills */}
      <g transform="translate(0, -9)">
        {steps.map((s, idx) => {
          const sx = (idx - 2) * 70;
          const active = s.num === step;
          const done = s.num < step;
          return (
            <g key={s.num} transform={`translate(${sx}, 0)`}>
              <rect
                x="-30"
                y="-10"
                width="60"
                height="20"
                rx="10"
                fill={active ? accentColor : done ? '#DCFCE7' : '#F1F5F9'}
                stroke={active ? accentColor : done ? '#16A34A' : '#CBD5E1'}
                strokeWidth="1.5"
              />
              <text
                x="0"
                y="4"
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
      {/* Descriptive step subtitle */}
      <text x="0" y="16" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#0F172A">
        {stepText}
      </text>
    </g>
  );
};

