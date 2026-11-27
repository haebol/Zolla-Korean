import React from 'react';

export type AdditionKey =
  | '콧물'
  | '촛불'
  | '깻잎'
  | '한여름'
  | '가다'
  | '푸르다'
  | '푸다'
  | '녀자';

export type AdditionRuleGroup = 'sait' | 'nAdd' | 'oldIrreg' | 'initial';

export function getAdditionGroup(key: AdditionKey): AdditionRuleGroup {
  switch (key) {
    case '콧물':
    case '촛불':
      return 'sait';
    case '깻잎':
    case '한여름':
      return 'nAdd';
    case '가다':
    case '푸르다':
    case '푸다':
      return 'oldIrreg';
    case '녀자':
      return 'initial';
  }
}

export const AdditionBackdrop: React.FC<{
  activeKey: AdditionKey;
  isWalkingMode?: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeKey, isWalkingMode = false, walkTime, scrollOffset = 0 }) => {
  if (isWalkingMode) {
    return (
      <g>
        <defs>
          <linearGradient id="p11HanokSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="55%" stopColor="#FDBA74" />
            <stop offset="100%" stopColor="#FFF7ED" />
          </linearGradient>
        </defs>

        <rect x="0" y="-80" width="1000" height="625" fill="url(#p11HanokSky)" />

        {/* Traditional Hanok Giwa Roof Pavilions on Left & Right */}
        {[175, 825].map((hx) => (
          <g key={hx} transform={`translate(${hx}, 290)`}>
            {/* Wooden pillars & warm paper lattice walls */}
            <rect x="-85" y="-58" width="170" height="72" fill="#FEF3C7" stroke="#78350F" strokeWidth="3" />
            <rect x="-85" y="-58" width="12" height="72" fill="#92400E" />
            <rect x="-12" y="-58" width="12" height="72" fill="#92400E" />
            <rect x="73" y="-58" width="12" height="72" fill="#92400E" />
            {/* Lattice doors */}
            <rect x="-64" y="-44" width="42" height="50" fill="#FFFBEB" stroke="#92400E" strokeWidth="2" />
            <line x1="-43" y1="-44" x2="-43" y2="6" stroke="#B45309" strokeWidth="1.5" />
            <line x1="-64" y1="-19" x2="-22" y2="-19" stroke="#B45309" strokeWidth="1.5" />
            <rect x="14" y="-44" width="48" height="50" fill="#FFFBEB" stroke="#92400E" strokeWidth="2" />
            <line x1="38" y1="-44" x2="38" y2="6" stroke="#B45309" strokeWidth="1.5" />
            <line x1="14" y1="-19" x2="62" y2="-19" stroke="#B45309" strokeWidth="1.5" />
            {/* Curved Hanok Giwa Roof */}
            <path d="M-112 -52 Q0 -116 112 -52 L96 -42 Q0 -75 -96 -42 Z" fill="#334155" stroke="#1E293B" strokeWidth="3" />
            <path d="M-116 -52 Q-98 -68 -86 -56" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
            <path d="M116 -52 Q98 -68 86 -56" fill="none" stroke="#1E293B" strokeWidth="4" strokeLinecap="round" />
          </g>
        ))}

        {/* Traditional Korean Stone Wall (Damjang) along the alley */}
        <rect x="0" y="295" width="1000" height="58" fill="#E2E8F0" stroke="#64748B" strokeWidth="2.5" />
        <path d="M0 295 L1000 295 L1000 307 L0 307 Z" fill="#475569" />
        {[40, 120, 200, 280, 360, 440, 520, 600, 680, 760, 840, 920].map((sx, idx) => (
          <g key={sx}>
            <rect
              x={sx}
              y={313 + (idx % 2) * 14}
              width="34"
              height="13"
              rx="4"
              fill="#94A3B8"
              opacity="0.65"
            />
          </g>
        ))}

        {/* Hanging Cheongsachorong Traditional Red-Blue Lanterns */}
        {[340, 660].map((lx, idx) => (
          <g key={lx} transform={`translate(${lx}, ${225 + Math.sin(walkTime * 2 + idx) * 2})`}>
            <line x1="0" y1="-22" x2="0" y2="0" stroke="#451A03" strokeWidth="2.5" />
            <rect x="-11" y="0" width="22" height="16" rx="4" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
            <rect x="-11" y="16" width="22" height="16" rx="4" fill="#3B82F6" stroke="#1E3A8A" strokeWidth="2" />
          </g>
        ))}

        {/* Warm Earthen Courtyard Alley Floor */}
        <rect x="0" y="352" width="1000" height="195" fill="#D97706" />
        <rect x="0" y="366" width="1000" height="52" fill="#FDE68A" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#92400E" strokeWidth="2.5" opacity="0.6" />
        <line x1="0" y1="418" x2="1000" y2="418" stroke="#92400E" strokeWidth="2" opacity="0.4" />
      </g>
    );
  }

  const group = getAdditionGroup(activeKey);

  const skyTop =
    group === 'sait'
      ? '#FB7185'
      : group === 'nAdd'
      ? '#F59E0B'
      : group === 'oldIrreg'
      ? '#38BDF8'
      : '#A78BFA';
  const skyBot =
    group === 'sait'
      ? '#FFF1F2'
      : group === 'nAdd'
      ? '#FFFBEB'
      : group === 'oldIrreg'
      ? '#F0F9FF'
      : '#F5F3FF';
  const hillFill =
    group === 'sait'
      ? '#FECDD3'
      : group === 'nAdd'
      ? '#FDE68A'
      : group === 'oldIrreg'
      ? '#BAE6FD'
      : '#DDD6FE';
  const groundFill =
    group === 'sait'
      ? '#E11D48'
      : group === 'nAdd'
      ? '#D97706'
      : group === 'oldIrreg'
      ? '#0284C7'
      : '#7C3AED';
  const pathFill =
    group === 'sait'
      ? '#FFE4E6'
      : group === 'nAdd'
      ? '#FEF3C7'
      : group === 'oldIrreg'
      ? '#E0F2FE'
      : '#EDE9FE';

  return (
    <g>
      <defs>
        <linearGradient id={`p11Sky-${group}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>

      <rect x="0" y="-80" width="1000" height="625" fill={`url(#p11Sky-${group})`} />

      {/* Drifting soft clouds */}
      <g opacity="0.84">
        {[175, 520, 860].map((cx, idx) => (
          <g
            key={cx}
            transform={`translate(${((cx - scrollOffset * 0.14) % 1060 + 1060) % 1060 - 30 + Math.sin(walkTime * 0.45 + idx) * 9}, ${114 + (idx % 2) * 18})`}
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

export const TissueBoxSvg: React.FC<{ pop?: number }> = ({ pop = 0 }) => (
  <g>
    <rect x="-28" y="-12" width="56" height="30" rx="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2.5" />
    <ellipse cx="0" cy="-12" rx="14" ry="4" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
    <path
      d={`M-10 -12 Q-4 ${-34 - pop * 16} 2 ${-26 - pop * 14} Q10 ${-36 - pop * 16} 12 -12 Z`}
      fill="#FFFFFF"
      stroke="#94A3B8"
      strokeWidth="2"
    />
  </g>
);

export const DoubleCandleSvg: React.FC<{ flared?: boolean; flicker?: number }> = ({
  flared = false,
  flicker = 1,
}) => (
  <g>
    {/* Wax body */}
    <rect x="-14" y="-14" width="28" height="44" rx="5" fill="#FEF3C7" stroke="#D97706" strokeWidth="2.5" />
    <path d="M-14 -8 Q-7 2 0 -4 Q7 3 14 -6" fill="none" stroke="#F59E0B" strokeWidth="2.5" />
    <line x1="0" y1="-14" x2="0" y2="-22" stroke="#1E293B" strokeWidth="2.5" />
    {/* Flame (doubles in size when ㅅ intensifies!) */}
    <g transform={`translate(0, -24) scale(${(flared ? 2.05 : 1) * flicker})`}>
      <path
        d="M0 -28 C12 -14 14 -2 9 6 C4 10 -4 10 -9 6 C-14 -2 -12 -14 0 -28 Z"
        fill="#F97316"
        stroke="#EA580C"
        strokeWidth="2"
      />
      <path d="M0 -16 C6 -8 7 0 4 5 C2 7 -2 7 -4 5 C-7 0 -6 -8 0 -16 Z" fill="#FDE047" />
    </g>
  </g>
);

export const SesameLeafSvg: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <path
      d="M0 -34 C24 -24 32 4 16 24 C6 34 -6 34 -16 24 C-32 4 -24 -24 0 -34 Z"
      fill="#16A34A"
      stroke="#14532D"
      strokeWidth="2.5"
    />
    <line x1="0" y1="-28" x2="0" y2="38" stroke="#86EFAC" strokeWidth="2.5" strokeLinecap="round" />
    <line x1="0" y1="-8" x2="-14" y2="-16" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
    <line x1="0" y1="-8" x2="14" y2="-16" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
    <line x1="0" y1="8" x2="-15" y2="0" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
    <line x1="0" y1="8" x2="15" y2="0" stroke="#86EFAC" strokeWidth="2" strokeLinecap="round" />
  </g>
);

export const BlazingSunSvg: React.FC<{ pulse?: number }> = ({ pulse = 1 }) => (
  <g transform={`scale(${pulse})`}>
    <circle cx="0" cy="0" r="24" fill="#FACC15" stroke="#EA580C" strokeWidth="3" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line
        key={deg}
        x1="0"
        y1="-30"
        x2="0"
        y2="-40"
        stroke="#F59E0B"
        strokeWidth="4"
        strokeLinecap="round"
        transform={`rotate(${deg})`}
      />
    ))}
    {/* Cool shades on the sun */}
    <rect x="-15" y="-6" width="12" height="8" rx="2" fill="#0F172A" />
    <rect x="3" y="-6" width="12" height="8" rx="2" fill="#0F172A" />
    <line x1="-3" y1="-3" x2="3" y2="-3" stroke="#0F172A" strokeWidth="2" />
  </g>
);

export const RoyalScrollSvg: React.FC<{ open?: number }> = ({ open = 1 }) => (
  <g transform={`scale(${open}, 1)`}>
    <rect x="-34" y="-20" width="68" height="40" rx="4" fill="#FEF3C7" stroke="#B45309" strokeWidth="2.5" />
    <rect x="-40" y="-24" width="10" height="48" rx="5" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    <rect x="30" y="-24" width="10" height="48" rx="5" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    <circle cx="0" cy="0" r="11" fill="#DC2626" opacity="0.85" />
    <circle cx="0" cy="0" r="7" fill="none" stroke="#FEF3C7" strokeWidth="1.5" />
  </g>
);

export const WaterLadleSvg: React.FC<{ tilt?: number }> = ({ tilt = 0 }) => (
  <g transform={`rotate(${tilt})`}>
    {/* Handle */}
    <rect x="14" y="-6" width="48" height="10" rx="5" fill="#D97706" stroke="#78350F" strokeWidth="2" />
    {/* Scoop bowl */}
    <path d="M-26 -4 C-26 22 18 22 18 -4 Z" fill="#FDE047" stroke="#A16207" strokeWidth="2.5" />
    <ellipse cx="-4" cy="-4" rx="22" ry="6" fill="#38BDF8" stroke="#0284C7" strokeWidth="2" />
  </g>
);

export const StageBarrierGateSvg: React.FC = () => (
  <g>
    <rect x="-26" y="-24" width="52" height="14" rx="3" fill="#FACC15" stroke="#1E293B" strokeWidth="2.5" />
    <line x1="-16" y1="-24" x2="-8" y2="-10" stroke="#1E293B" strokeWidth="4" />
    <line x1="0" y1="-24" x2="8" y2="-10" stroke="#1E293B" strokeWidth="4" />
    <line x1="16" y1="-24" x2="24" y2="-10" stroke="#1E293B" strokeWidth="4" />
    <rect x="-20" y="-10" width="6" height="32" fill="#475569" />
    <rect x="14" y="-10" width="6" height="32" fill="#475569" />
  </g>
);
