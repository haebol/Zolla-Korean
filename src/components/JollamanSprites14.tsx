import React from 'react';

export type Series13BackdropTheme =
  | 'suburb'
  | 'park'
  | 'city_bus'
  | 'ktx_station'
  | 'spotlight';

export type Series14BackdropTheme =
  | 'street_race'
  | 'bunsik_shop'
  | 'bedroom_night'
  | 'living_tv'
  | 'plaza_bow'
  | 'gallery_vase'
  | 'market_stall'
  | 'sunset_love';

const FloatingComicWord: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  rotate?: number;
}> = ({ x, y, text, color = '#DC2626', rotate = -7 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
    <rect
      x={-(text.length * 8.5 + 14)}
      y="-16"
      width={text.length * 17 + 28}
      height="32"
      rx="10"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="2.8"
    />
    <text
      x="0"
      y="1"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="15"
      fontWeight="900"
      fill={color}
    >
      {text}
    </text>
  </g>
);

export const Series13Backdrop: React.FC<{
  theme: Series13BackdropTheme;
  walkTime: number;
}> = ({ theme, walkTime }) => {
  if (theme === 'spotlight') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="625" fill="#1E1B4B" />
        {[80, 210, 350, 500, 640, 790, 920].map((sx, i) => (
          <circle
            key={sx}
            cx={sx}
            cy={135 + (i % 3) * 28}
            r="2.5"
            fill="#FDE047"
            opacity={0.4 + Math.abs(Math.sin(walkTime * 3 + i)) * 0.55}
          />
        ))}
        {/* Stage Curtains */}
        <path d="M0 -80 H110 Q75 180 0 365 Z" fill="#9F1239" />
        <path d="M1000 -80 H890 Q925 180 1000 365 Z" fill="#9F1239" />
        <rect x="0" y="362" width="1000" height="195" fill="#312E81" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#FACC15" strokeWidth="4" />
      </g>
    );
  }

  if (theme === 'ktx_station') {
    return (
      <g>
        <defs>
          <linearGradient id="s13KtxSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="445" fill="url(#s13KtxSky)" />
        {/* Namsan Seoul Tower Silhouette */}
        <g transform="translate(865, 250)" opacity="0.55">
          <path d="M-24 115 L-8 20 L8 20 L24 115 Z" fill="#64748B" />
          <rect x="-4" y="-65" width="8" height="86" fill="#475569" />
          <rect x="-18" y="-36" width="36" height="16" rx="4" fill="#334155" />
          <line x1="0" y1="-65" x2="0" y2="-102" stroke="#334155" strokeWidth="3" />
        </g>
        {/* Station Platform Canopy */}
        <polygon points="90,155 470,155 445,178 65,178" fill="#1E293B" />
        <rect x="250" y="178" width="14" height="184" fill="#475569" />
        <rect x="175" y="210" width="165" height="34" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
        <text x="257" y="227" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="900" fill="#1E40AF">
          서울역 SEOUL
        </text>
        {/* Railway Track & Safety Line */}
        <rect x="0" y="362" width="1000" height="195" fill="#CBD5E1" />
        <rect x="0" y="364" width="1000" height="10" fill="#FACC15" />
        <line x1="0" y1="395" x2="1000" y2="395" stroke="#475569" strokeWidth="5" />
      </g>
    );
  }

  if (theme === 'park') {
    return (
      <g>
        <defs>
          <linearGradient id="s13ParkSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#60A5FA" />
            <stop offset="100%" stopColor="#DCFCE7" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="445" fill="url(#s13ParkSky)" />
        <circle cx="885" cy="68" r="32" fill="#FDE047" />
        <path d="M0 340 Q260 270 520 332 T1000 322 L1000 368 L0 368 Z" fill="#4ADE80" />
        {/* Park Trees */}
        {[125, 360, 880].map((tx) => (
          <g key={tx} transform={`translate(${tx}, 288)`}>
            <rect x="-8" y="15" width="16" height="58" fill="#78350F" />
            <circle cx="0" cy="-12" r="36" fill="#16A34A" />
            <circle cx="-22" cy="8" r="24" fill="#22C55E" />
            <circle cx="22" cy="8" r="24" fill="#22C55E" />
          </g>
        ))}
        {/* Spouting Park Fountain */}
        <g transform="translate(515, 326)">
          <ellipse cx="0" cy="24" rx="46" ry="12" fill="#BAE6FD" stroke="#0284C7" strokeWidth="2.5" />
          <rect x="-10" y="-14" width="20" height="36" fill="#E2E8F0" stroke="#475569" strokeWidth="2" />
          <path
            d={`M-2 -14 Q-22 ${-44 - Math.sin(walkTime * 6) * 4} -30 22`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
          />
          <path
            d={`M2 -14 Q22 ${-44 - Math.cos(walkTime * 6) * 4} 30 22`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
          />
        </g>
        <rect x="0" y="362" width="1000" height="195" fill="#FDE68A" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#15803D" strokeWidth="4" />
      </g>
    );
  }

  return (
    <g>
      <defs>
        <linearGradient id="s13SubSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="70%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#FEF9C3" />
        </linearGradient>
      </defs>
      <rect x="0" y="-80" width="1000" height="445" fill="url(#s13SubSky)" />
      <circle cx="890" cy="64" r="30" fill="#FDE047" />
      {[155, 480, 770].map((cx, i) => (
        <g key={cx} transform={`translate(${cx + Math.sin(walkTime + i) * 8}, ${122 + (i % 2) * 18})`} opacity="0.85">
          <circle cx="-20" cy="6" r="16" fill="#FFFFFF" />
          <circle cx="0" cy="0" r="22" fill="#FFFFFF" />
          <circle cx="22" cy="6" r="16" fill="#FFFFFF" />
        </g>
      ))}
      {theme === 'city_bus' ? (
        <g opacity="0.5">
          <rect x="85" y="190" width="76" height="172" fill="#94A3B8" />
          <rect x="180" y="155" width="90" height="207" fill="#64748B" />
          <rect x="780" y="175" width="95" height="187" fill="#94A3B8" />
        </g>
      ) : (
        <path d="M0 342 Q260 282 540 335 T1000 326 L1000 368 L0 368 Z" fill="#86EFAC" />
      )}
      <rect x="0" y="362" width="1000" height="195" fill={theme === 'city_bus' ? '#94A3B8' : '#E2E8F0'} />
      {theme === 'city_bus' && (
        <line x1="0" y1="408" x2="1000" y2="408" stroke="#FFFFFF" strokeWidth="4" strokeDasharray="28 20" />
      )}
      <line x1="0" y1="362" x2="1000" y2="362" stroke="#0F172A" strokeWidth="3.5" />
    </g>
  );
};

export const Series14Backdrop: React.FC<{
  theme: Series14BackdropTheme;
  walkTime: number;
}> = ({ theme, walkTime }) => {
  if (theme === 'bedroom_night') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="445" fill="#1E1B4B" />
        {/* Moonlit Window */}
        <g transform="translate(215, 195)">
          <rect x="-58" y="-58" width="116" height="116" rx="8" fill="#0F172A" stroke="#C4B5FD" strokeWidth="6" />
          <circle cx="18" cy="-18" r="20" fill="#FEF08A" />
          <circle cx="10" cy="-22" r="18" fill="#0F172A" />
          <circle cx="-26" cy="-24" r="2.8" fill="#FFFFFF" />
          <circle cx="-18" cy="24" r="2.2" fill="#FFFFFF" />
          <line x1="0" y1="-58" x2="0" y2="58" stroke="#C4B5FD" strokeWidth="4" />
          <line x1="-58" y1="0" x2="58" y2="0" stroke="#C4B5FD" strokeWidth="4" />
        </g>
        <rect x="0" y="362" width="1000" height="195" fill="#312E81" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#A78BFA" strokeWidth="4" />
      </g>
    );
  }

  if (theme === 'bunsik_shop' || theme === 'market_stall') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="445" fill="#FFF7ED" />
        {/* Striped Market Awning */}
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <path
            key={i}
            d={`M${i * 100} 120 H${i * 100 + 100} V162 Q${i * 100 + 50} 182 ${i * 100} 162 Z`}
            fill={i % 2 === 0 ? '#EF4444' : '#FEF3C7'}
            stroke="#991B1B"
            strokeWidth="2"
          />
        ))}
        {/* Hanging Paper Lanterns */}
        {[175, 825].map((lx) => (
          <g key={lx} transform={`translate(${lx}, 205)`}>
            <ellipse cx="0" cy="0" rx="22" ry="28" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
            <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7C2D12">
              {theme === 'market_stall' ? '시장' : '맛집'}
            </text>
          </g>
        ))}
        <rect x="0" y="362" width="1000" height="195" fill="#FED7AA" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#9A3412" strokeWidth="4" />
      </g>
    );
  }

  if (theme === 'sunset_love') {
    return (
      <g>
        <defs>
          <linearGradient id="s14LoveSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FB7185" />
            <stop offset="60%" stopColor="#FBCFE8" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="445" fill="url(#s14LoveSky)" />
        <circle cx="820" cy="240" r="68" fill="#FDE047" opacity="0.65" />
        {/* Floating Cherry Blossom Petals */}
        {[120, 270, 440, 610, 790, 910].map((px, i) => (
          <ellipse
            key={px}
            cx={px + Math.sin(walkTime * 3 + i) * 18}
            cy={130 + ((walkTime * 36 + i * 50) % 210)}
            rx="6"
            ry="3.5"
            transform={`rotate(${i * 40})`}
            fill="#F472B6"
          />
        ))}
        <rect x="0" y="362" width="1000" height="195" fill="#FDA4AF" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#BE123C" strokeWidth="3.5" />
      </g>
    );
  }

  return (
    <g>
      <defs>
        <linearGradient id="s14DaySky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#BAE6FD" />
          <stop offset="100%" stopColor="#FEF9C3" />
        </linearGradient>
      </defs>
      <rect x="0" y="-80" width="1000" height="445" fill="url(#s14DaySky)" />
      <circle cx="880" cy="70" r="30" fill="#FDE047" />
      <path d="M0 342 Q260 280 540 334 T1000 326 L1000 368 L0 368 Z" fill="#A7F3D0" />
      <rect x="0" y="362" width="1000" height="195" fill="#E2E8F0" />
      <line x1="0" y1="362" x2="1000" y2="362" stroke="#0F172A" strokeWidth="3.5" />
    </g>
  );
};

// =========================================================================
// CUSTOM HAND-CRAFTED COMIC SVG PROPS (NO LAZY EMOJIS!)
// =========================================================================

export const ParkGooseChaserSvg: React.FC<{ walkTime: number; biting?: boolean }> = ({
  walkTime,
  biting = false,
}) => {
  const flap = Math.sin(walkTime * 22) * 14;
  return (
    <g>
      {/* Animated Flapping Wings */}
      <path
        d={`M-8 -10 Q14 ${-38 + flap} 34 ${-18 + flap} Q16 -2 -8 -10 Z`}
        fill="#F8FAFC"
        stroke="#0F172A"
        strokeWidth="3"
      />
      {/* Plump White Body */}
      <ellipse cx="4" cy="4" rx="28" ry="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
      {/* Long Neck & Angry Head facing LEFT */}
      <path d="M-14 -4 Q-26 -24 -24 -38" fill="none" stroke="#FFFFFF" strokeWidth="14" strokeLinecap="round" />
      <path d="M-14 -4 Q-26 -24 -24 -38" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      <circle cx="-24" cy="-40" r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
      {/* Angry Brow + Snapping Orange Beak */}
      <line x1="-30" y1="-46" x2="-21" y2="-43" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
      <circle cx="-26" cy="-41" r="2.2" fill="#0F172A" />
      <polygon points="-35,-42 -50,-45 -35,-36" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
      {biting && <polygon points="-35,-36 -48,-31 -35,-32" fill="#EA580C" stroke="#0F172A" strokeWidth="1.8" />}
      {/* Waddling Orange Feet */}
      <path d={`M-6 20 L${-12 + Math.sin(walkTime * 20) * 6} 34`} stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
      <path d={`M10 20 L${16 - Math.sin(walkTime * 20) * 6} 34`} stroke="#F97316" strokeWidth="4" strokeLinecap="round" />
    </g>
  );
};

export const SpringGiftBoxSvg: React.FC<{ sprung: boolean; progress: number }> = ({
  sprung,
  progress,
}) => {
  const gloveHeight = sprung ? 48 + Math.sin(Math.min(1, progress) * Math.PI) * 32 : 0;
  return (
    <g>
      {/* Box Base */}
      <rect x="-28" y="-22" width="56" height="44" rx="5" fill="#EC4899" stroke="#0F172A" strokeWidth="3.2" />
      <rect x="-7" y="-22" width="14" height="44" fill="#FACC15" />
      {/* Zigzag Spring & Giant Red Boxing Glove */}
      {sprung && (
        <g>
          <path
            d={`M0 -22 L-12 ${-22 - gloveHeight * 0.25} L12 ${-22 - gloveHeight * 0.5} L-12 ${-22 - gloveHeight * 0.75} L0 ${-22 - gloveHeight}`}
            fill="none"
            stroke="#475569"
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <g transform={`translate(-8, ${-28 - gloveHeight}) rotate(-16)`}>
            <ellipse cx="0" cy="0" rx="22" ry="16" fill="#EF4444" stroke="#0F172A" strokeWidth="3.2" />
            <ellipse cx="-10" cy="10" rx="9" ry="7" fill="#DC2626" stroke="#0F172A" strokeWidth="2.4" />
            <rect x="14" y="-8" width="10" height="16" rx="3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </g>
        </g>
      )}
      {/* Lid (flips off when sprung!) */}
      <g transform={sprung ? 'translate(34, -56) rotate(42)' : 'translate(0, -26)'}>
        <rect x="-32" y="-8" width="64" height="14" rx="4" fill="#DB2777" stroke="#0F172A" strokeWidth="3" />
        <ellipse cx="-8" cy="-12" rx="10" ry="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
        <ellipse cx="8" cy="-12" rx="10" ry="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
      </g>
    </g>
  );
};

export const GreenCityBusSvg: React.FC<{ walkTime: number; label?: string }> = ({
  walkTime,
  label = '버스로!',
}) => {
  const wheelRot = walkTime * 420;
  return (
    <g>
      {/* Bus Body */}
      <rect x="-125" y="-70" width="250" height="114" rx="20" fill="#16A34A" stroke="#0F172A" strokeWidth="4" />
      <rect x="-125" y="-2" width="250" height="16" fill="#FACC15" />
      {/* Front Windshield + Passenger Windows */}
      <rect x="64" y="-54" width="52" height="46" rx="8" fill="#BAE6FD" stroke="#0F172A" strokeWidth="3" />
      <rect x="-106" y="-54" width="52" height="40" rx="6" fill="#E0F2FE" stroke="#0F172A" strokeWidth="2.5" />
      <rect x="-42" y="-54" width="92" height="40" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <text x="4" y="-33" textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="900" fill="#15803D">
        {label}
      </text>
      {/* Headlight Beam */}
      <ellipse cx="123" cy="24" rx="6" ry="8" fill="#FEF08A" stroke="#0F172A" strokeWidth="2" />
      {/* Spinning Wheels */}
      {[-74, 72].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 46) rotate(${wheelRot})`}>
          <circle cx="0" cy="0" r="20" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="0" cy="0" r="8" fill="#CBD5E1" />
          <line x1="-12" y1="0" x2="12" y2="0" stroke="#64748B" strokeWidth="2.5" />
        </g>
      ))}
    </g>
  );
};

export const GiantRamenBowlSvg: React.FC<{ walkTime: number; full?: boolean }> = ({
  walkTime,
  full = true,
}) => (
  <g>
    {/* Rising Aroma Steam */}
    {full && (
      <g opacity="0.72" stroke="#FFFFFF" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d={`M-30 -44 Q${-42 + Math.sin(walkTime * 6) * 8} -66 -26 -88`} />
        <path d={`M0 -50 Q${12 - Math.sin(walkTime * 5) * 8} -74 -2 -96`} />
        <path d={`M32 -44 Q${20 + Math.cos(walkTime * 6) * 8} -66 36 -86`} />
      </g>
    )}
    {/* Wavy Golden Noodle Mountain */}
    {full && (
      <g>
        <ellipse cx="0" cy="-18" rx="64" ry="22" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.8" />
        <path d="M-46 -18 Q-30 -32 -14 -18 Q2 -6 18 -20 Q34 -32 48 -16" fill="none" stroke="#EAB308" strokeWidth="3.5" />
        {/* Boiled Half Egg & Red Narutomaki */}
        <ellipse cx="-26" cy="-24" rx="15" ry="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        <circle cx="-25" cy="-24" r="6" fill="#F97316" />
        <circle cx="28" cy="-22" r="10" fill="#FECDD3" stroke="#E11D48" strokeWidth="2" />
        <circle cx="28" cy="-22" r="4" fill="#E11D48" />
      </g>
    )}
    {/* Ceramic Korean Ramen Bowl */}
    <path d="M-74 -16 Q-70 46 0 48 Q70 46 74 -16 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="3.8" />
    <ellipse cx="0" cy="-16" rx="74" ry="12" fill="none" stroke="#0F172A" strokeWidth="3.5" />
    <rect x="-28" y="42" width="56" height="10" rx="3" fill="#991B1B" stroke="#0F172A" strokeWidth="2.5" />
    <path d="M-40 12 Q0 28 40 12" fill="none" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" />
  </g>
);

export const GiantBobaCupSvg: React.FC<{ drainLevel: number }> = ({ drainLevel }) => {
  const liquidTop = -35 + Math.min(1, Math.max(0, drainLevel)) * 75;
  return (
    <g>
      {/* Long Zigzag Straw */}
      <path d="M-4 -48 L-4 -102 L-72 -102" fill="none" stroke="#EC4899" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" />
      {/* Cup Body */}
      <polygon points="-38,-48 38,-48 28,54 -28,54" fill="#FFFFFF" fillOpacity="0.65" stroke="#0F172A" strokeWidth="3.5" />
      {/* Milk Tea Liquid Level */}
      <polygon
        points={`${-35 + drainLevel * 6},${liquidTop} ${35 - drainLevel * 6},${liquidTop} 26,52 -26,52`}
        fill="#FDBA74"
      />
      {/* Tapioca Pearls */}
      {[-14, -4, 7, 16, -9, 3].map((px, i) => (
        <circle key={i} cx={px} cy={43 - (i % 2) * 8} r="4.8" fill="#1E293B" />
      ))}
      <ellipse cx="0" cy="-48" rx="40" ry="9" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3" />
    </g>
  );
};

export const FluffyBedAndZzzSvg: React.FC<{ walkTime: number; snoring: boolean }> = ({
  walkTime,
  snoring,
}) => (
  <g>
    {/* Wooden Headboard & Frame */}
    <rect x="-85" y="-28" width="14" height="72" rx="4" fill="#78350F" stroke="#0F172A" strokeWidth="3" />
    <rect x="70" y="-8" width="12" height="52" rx="3" fill="#78350F" stroke="#0F172A" strokeWidth="3" />
    <rect x="-72" y="14" width="144" height="22" fill="#92400E" stroke="#0F172A" strokeWidth="3" />
    {/* Plush Mattress & Polka-dot Blanket */}
    <rect x="-70" y="-4" width="140" height="22" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.8" />
    <ellipse cx="-48" cy="-10" rx="18" ry="8" fill="#E0F2FE" stroke="#0F172A" strokeWidth="2.2" />
    <path d="M-24 -6 H68 Q74 8 68 20 H-24 Z" fill="#818CF8" stroke="#0F172A" strokeWidth="2.8" />
    {/* Rising Zzz Bubbles */}
    {snoring &&
      [0, 1, 2].map((i) => (
        <text
          key={i}
          x={-28 + i * 24 + Math.sin(walkTime * 4 + i) * 6}
          y={-38 - i * 24 - ((walkTime * 20) % 14)}
          fontSize={16 + i * 5}
          fontWeight="900"
          fill="#FDE047"
          stroke="#0F172A"
          strokeWidth="1.2"
        >
          Z
        </text>
      ))}
  </g>
);

export const ShatteredVasePedestalSvg: React.FC<{ broken: boolean; progress: number }> = ({
  broken,
  progress,
}) => (
  <g>
    {/* Pedestal Column */}
    <rect x="-32" y="-12" width="64" height="66" rx="4" fill="#E2E8F0" stroke="#0F172A" strokeWidth="3.2" />
    <rect x="-38" y="-20" width="76" height="12" rx="3" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
    {!broken ? (
      <g transform={`translate(0, -48) rotate(${progress * 32})`}>
        <path d="M-14 -24 L14 -24 L22 10 Q18 28 0 28 Q-18 28 -22 10 Z" fill="#38BDF8" stroke="#0F172A" strokeWidth="3" />
        <ellipse cx="0" cy="-24" rx="14" ry="5" fill="#0284C7" stroke="#0F172A" strokeWidth="2.2" />
      </g>
    ) : (
      <g transform="translate(0, 44)">
        <polygon points="-38,6 -20,-8 -10,10" fill="#38BDF8" stroke="#0F172A" strokeWidth="2.5" />
        <polygon points="8,8 28,-10 42,6" fill="#0284C7" stroke="#0F172A" strokeWidth="2.5" />
        <polygon points="-12,12 10,-4 18,12" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2.2" />
        <FloatingComicWord x={0} y={-88} text="와장창!!" color="#DC2626" rotate={6} />
      </g>
    )}
  </g>
);

export const FallingAnvil100tSvg: React.FC = () => (
  <g>
    <path d="M-42 -20 H44 L36 6 H-28 L-42 -20 Z" fill="#334155" stroke="#0F172A" strokeWidth="3.5" />
    <rect x="-24" y="6" width="52" height="16" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
    <polygon points="-38,22 42,22 50,36 -46,36" fill="#0F172A" />
    <text x="6" y="-2" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FACC15">
      100t
    </text>
  </g>
);

export const PriceTagStallSvg: React.FC<{ shocked: boolean; walkTime: number }> = ({
  shocked,
  walkTime,
}) => (
  <g>
    {/*Wooden Market Crate + Bright Price Tag*/}
    <rect x="-56" y="-4" width="112" height="58" rx="6" fill="#D97706" stroke="#0F172A" strokeWidth="3.2" />
    <line x1="-56" y1="24" x2="56" y2="24" stroke="#78350F" strokeWidth="3" />
    {/* Red Apple Pile on Crate */}
    {[-30, 0, 30].map((ax) => (
      <circle key={ax} cx={ax} cy="-12" r="14" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.2" />
    ))}
    {/* Swinging Giant Price Sign */}
    <g transform={`translate(0, -68) rotate(${shocked ? Math.sin(walkTime * 28) * 14 : -4})`}>
      <polygon points="-64,-24 52,-24 72,0 52,24 -64,24" fill="#FEF08A" stroke="#0F172A" strokeWidth="3.5" />
      <circle cx="54" cy="0" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      <text x="-6" y="1" textAnchor="middle" dominantBaseline="central" fontSize="18" fontWeight="900" fill="#DC2626">
        {shocked ? '₩999,999?!' : '얼마예요?'}
      </text>
    </g>
  </g>
);


