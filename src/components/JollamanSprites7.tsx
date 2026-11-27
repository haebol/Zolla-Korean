import React from 'react';

export type DoubleBatchimKey =
  | 'ㄳ'
  | 'ㄵ'
  | 'ㄶ'
  | 'ㄺ'
  | 'ㄻ'
  | 'ㄼ'
  | 'ㄽ'
  | 'ㄾ'
  | 'ㄿ'
  | 'ㅀ'
  | 'ㅄ'
  | '짧다'
  | '읽고'
  | '많아'
  | '많고';

/**
 * Dynamic Scenic Backdrop for Jollaman 7 (11 Double Batchim Slapstick Edition)
 * Features a golden autumn boardwalk during walking mode, plus 11 bespoke movie sets (ㄳ ~ ㅄ).
 */
// ===========================================================================
// Shared Clean Amusement Park Backdrop for 겹앞 Outdoor Scenes (Ferris Wheel + Props)
// ===========================================================================
type ParkTimeOfDay =
  | 'morning'    // walking
  | 'sunset'     // 짧다
  | 'dusk'       // ㄽ, ㄾ
  | 'nightfall'  // ㅀ
  | 'midnight';  // ㅄ

const PARK_SKY_PALETTES: Record<
  ParkTimeOfDay,
  {
    top: string;
    mid: string;
    bot: string;
    isDark: boolean;
    starOpacity: number;
    lightsOn: boolean;
    groundBase: string;
    promenade: string;
    promenadeStroke: string;
  }
> = {
  morning: {
    top: '#38BDF8',
    mid: '#BAE6FD',
    bot: '#FEF9C3',
    isDark: false,
    starOpacity: 0,
    lightsOn: false,
    groundBase: '#FDBA74',
    promenade: '#FEF3C7',
    promenadeStroke: '#EA580C',
  },
  sunset: {
    top: '#6D28D9',
    mid: '#F97316',
    bot: '#FDE047',
    isDark: false,
    starOpacity: 0.25,
    lightsOn: true,
    groundBase: '#FDBA74',
    promenade: '#FEF3C7',
    promenadeStroke: '#EC4899',
  },
  dusk: {
    top: '#312E81',
    mid: '#9333EA',
    bot: '#FB7185',
    isDark: true,
    starOpacity: 0.55,
    lightsOn: true,
    groundBase: '#475569',
    promenade: '#CBD5E1',
    promenadeStroke: '#A855F7',
  },
  nightfall: {
    top: '#1E1B4B',
    mid: '#4C1D95',
    bot: '#7E22CE',
    isDark: true,
    starOpacity: 0.85,
    lightsOn: true,
    groundBase: '#1E293B',
    promenade: '#334155',
    promenadeStroke: '#22C55E',
  },
  midnight: {
    top: '#020617',
    mid: '#0F172A',
    bot: '#1E1B4B',
    isDark: true,
    starOpacity: 1,
    lightsOn: true,
    groundBase: '#0F172A',
    promenade: '#1E293B',
    promenadeStroke: '#6366F1',
  },
};

const AmusementParkBackdrop: React.FC<{
  timeOfDay: ParkTimeOfDay;
  walkTime: number;
  wrap: (x: number, span?: number) => number;
}> = ({ timeOfDay, walkTime, wrap }) => {
  const pal = PARK_SKY_PALETTES[timeOfDay];
  const ferrisRot = (walkTime * 14) % 360;
  const gradId = `b7ParkSky_${timeOfDay}`;

  return (
    <g>
      <defs>
        <linearGradient id={gradId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={pal.top} />
          <stop offset="60%" stopColor={pal.mid} />
          <stop offset="100%" stopColor={pal.bot} />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="-80" width="1000" height="436" fill={`url(#${gradId})`} />

      {/* Stars & Crescent Moon at Dusk/Night */}
      {pal.starOpacity > 0 && (
        <g opacity={pal.starOpacity}>
          {[75, 160, 265, 370, 460, 580, 685, 790, 910].map((sx, idx) => (
            <circle
              key={sx}
              cx={sx}
              cy={26 + (idx % 4) * 28}
              r={idx % 2 === 0 ? 2.6 : 1.8}
              fill="#FEF08A"
              opacity={0.55 + Math.sin(walkTime * 3 + idx) * 0.4}
            />
          ))}
          {(timeOfDay === 'nightfall' || timeOfDay === 'midnight') && (
            <g transform="translate(895, 118)">
              <circle cx="0" cy="0" r="22" fill="#FEF08A" />
              <circle cx="9" cy="-5" r="19" fill={pal.mid} />
            </g>
          )}
        </g>
      )}

      {/* Daytime Sun / Clouds */}
      {!pal.isDark && (
        <g>
          <circle
            cx="890"
            cy={timeOfDay === 'sunset' ? 205 : 122}
            r="34"
            fill={timeOfDay === 'sunset' ? '#FB923C' : '#FEF08A'}
            opacity="0.45"
          />
          <circle
            cx="890"
            cy={timeOfDay === 'sunset' ? 205 : 122}
            r="23"
            fill={timeOfDay === 'sunset' ? '#FDBA74' : '#FDE047'}
          />
          {[165, 495, 740].map((cx, idx) => (
            <g
              key={cx}
              transform={`translate(${wrap(cx)}, ${94 + (idx % 2) * 18})`}
              opacity={timeOfDay === 'sunset' ? 0.55 : 0.85}
            >
              <circle cx="-18" cy="6" r="14" fill="#FFFFFF" />
              <circle cx="0" cy="0" r="20" fill="#FFFFFF" />
              <circle cx="18" cy="6" r="14" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}

      {/* Distant Rolling Park Hills */}
      <path
        d="M0 326 Q240 278 500 318 T1000 306 V356 H0 Z"
        fill={pal.isDark ? '#1E293B' : '#86EFAC'}
        opacity={pal.isDark ? 0.72 : 0.65}
      />

      {/* Subtle Distant Carousel Canopy Silhouette on Left (Pure Amusement Park Vibe, No Signs) */}
      <g transform="translate(170, 352)" opacity={pal.isDark ? 0.78 : 0.85}>
        <rect x="-54" y="-58" width="108" height="58" fill={pal.isDark ? '#334155' : '#FFF1F2'} stroke="#94A3B8" strokeWidth="2" />
        {[-36, -12, 12, 36].map((px) => (
          <line key={px} x1={px} y1="-58" x2={px} y2="0" stroke="#FACC15" strokeWidth="3.5" opacity="0.7" />
        ))}
        <polygon points="-64,-58 0,-104 64,-58" fill="#F43F5E" stroke="#9F1239" strokeWidth="2.5" />
        <polygon points="-24,-58 0,-104 24,-58" fill="#FACC15" opacity="0.85" />
        <line x1="0" y1="-104" x2="0" y2="-122" stroke="#FACC15" strokeWidth="2.8" />
        <polygon points="0,-122 14,-116 0,-110" fill="#FACC15" />
      </g>

      {/* Festive Park Pennant Bunting Flags in Mid-Distance */}
      <g opacity={pal.isDark ? 0.75 : 0.85}>
        <path d="M235 280 Q385 304 540 282" fill="none" stroke="#CBD5E1" strokeWidth="2" />
        {[260, 295, 330, 365, 400, 435, 470, 505].map((fx, idx) => {
          const fy = 283 + Math.sin(((fx - 235) / 305) * Math.PI) * 14;
          const colors = ['#EF4444', '#FACC15', '#38BDF8', '#EC4899', '#22C55E'];
          return (
            <polygon
              key={fx}
              points={`${fx - 8},${fy} ${fx + 8},${fy} ${fx},${fy + 16}`}
              fill={colors[idx % colors.length]}
            />
          );
        })}
      </g>

      {/* Park Trees & Topiary Shrubs */}
      {[70, 315, 625, 955].map((tx, idx) => (
        <g key={tx} transform={`translate(${tx}, 352)`} opacity={pal.isDark ? 0.78 : 0.88}>
          <rect x="-5" y="-36" width="10" height="36" fill="#78350F" />
          <circle cx="0" cy="-48" r={idx % 2 === 0 ? 22 : 26} fill={pal.isDark ? '#14532D' : '#22C55E'} />
          <circle cx="-12" cy="-36" r="14" fill={pal.isDark ? '#166534' : '#4ADE80'} />
          <circle cx="12" cy="-36" r="14" fill={pal.isDark ? '#166534' : '#16A34A'} />
        </g>
      ))}

      {/* Classic Park Wooden Bench Prop */}
      <g transform="translate(555, 352)" opacity={pal.isDark ? 0.82 : 0.9}>
        <rect x="-28" y="-22" width="56" height="8" rx="2" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        <rect x="-30" y="-12" width="60" height="6" rx="2" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
        <line x1="-22" y1="-6" x2="-22" y2="0" stroke="#334155" strokeWidth="4" />
        <line x1="22" y1="-6" x2="22" y2="0" stroke="#334155" strokeWidth="4" />
      </g>

      {/* RIGHT: Original Rotating Giant Ferris Wheel (관람차) — Clean, No Sign Clutter */}
      <g transform="translate(835, 220)" opacity={pal.isDark ? 0.94 : 0.9}>
        <line x1="-42" y1="132" x2="0" y2="0" stroke="#94A3B8" strokeWidth="5.5" />
        <line x1="42" y1="132" x2="0" y2="0" stroke="#94A3B8" strokeWidth="5.5" />
        <g transform={`rotate(${ferrisRot})`}>
          <circle cx="0" cy="0" r="82" fill="none" stroke={pal.lightsOn ? '#FACC15' : '#F43F5E'} strokeWidth="5" />
          <circle cx="0" cy="0" r="56" fill="none" stroke="#38BDF8" strokeWidth="2.8" />
          {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => {
            const rad = (deg * Math.PI) / 180;
            const gx = Math.cos(rad) * 82;
            const gy = Math.sin(rad) * 82;
            return (
              <g key={deg}>
                <line x1="0" y1="0" x2={gx} y2={gy} stroke="#CBD5E1" strokeWidth="2" />
                <rect
                  x={gx - 9}
                  y={gy - 7}
                  width="18"
                  height="14"
                  rx="4"
                  transform={`rotate(${-ferrisRot}, ${gx}, ${gy})`}
                  fill={['#EF4444', '#3B82F6', '#FACC15', '#10B981'][(deg / 45) % 4]}
                  stroke="#0F172A"
                  strokeWidth="1.5"
                />
              </g>
            );
          })}
        </g>
        <circle cx="0" cy="0" r="9" fill="#FACC15" stroke="#0F172A" strokeWidth="2.2" />
      </g>

      {/* Park Lamp Posts */}
      {[248, 695].map((lx) => (
        <g key={lx} transform={`translate(${lx}, 352)`}>
          <rect x="-3.5" y="-96" width="7" height="96" fill="#475569" />
          {pal.lightsOn && <circle cx="0" cy="-102" r="16" fill="#FEF08A" opacity="0.34" />}
          <circle
            cx="0"
            cy="-102"
            r="7.5"
            fill={pal.lightsOn ? '#FDE047' : '#F8FAFC'}
            stroke="#334155"
            strokeWidth="2"
          />
        </g>
      ))}

      {/* Theme Park Promenade Ground */}
      <rect x="0" y="352" width="1000" height="195" fill={pal.groundBase} />
      <rect x="0" y="366" width="1000" height="48" fill={pal.promenade} />
      <line x1="0" y1="366" x2="1000" y2="366" stroke={pal.promenadeStroke} strokeWidth="2.5" opacity="0.75" />
    </g>
  );
};

// ===========================================================================
// 1. ㄳ (몫) — Cozy Indoor Pizzeria Backdrop (피자집 실내 배경)
// ===========================================================================
const PizzeriaInteriorBackdrop: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const ferrisRot = (walkTime * 10) % 360;
  const emberGlow = 0.72 + Math.sin(walkTime * 8) * 0.22;

  return (
    <g>
      <defs>
        <linearGradient id="b7PizzaWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="100%" stopColor="#FFFBEB" />
        </linearGradient>
      </defs>

      {/* Warm Pizzeria Plaster Wall & Wood Wainscoting */}
      <rect x="0" y="-80" width="1000" height="325" fill="url(#b7PizzaWall)" />
      <rect x="0" y="245" width="1000" height="107" fill="#B45309" />
      <rect x="0" y="240" width="1000" height="10" fill="#78350F" />
      {Array.from({ length: 14 }).map((_, idx) => (
        <line key={idx} x1={idx * 75 + 20} y1="250" x2={idx * 75 + 20} y2="352" stroke="#92400E" strokeWidth="2.5" />
      ))}

      {/* Arched Pizzeria Window Looking Out at Sunny Park Ferris Wheel */}
      <g transform="translate(175, 118)">
        <path d="M-78 96 V-24 A78 68 0 0 1 78 -24 V96 Z" fill="#7DD3FC" stroke="#78350F" strokeWidth="6" />
        {/* Tiny distant Ferris wheel visible outside */}
        <g transform={`translate(28, 32) rotate(${ferrisRot})`} opacity="0.55">
          <circle cx="0" cy="0" r="30" fill="none" stroke="#F43F5E" strokeWidth="2.5" />
          {[0, 60, 120, 180, 240, 300].map((d) => (
            <line
              key={d}
              x1="0"
              y1="0"
              x2={Math.cos((d * Math.PI) / 180) * 30}
              y2={Math.sin((d * Math.PI) / 180) * 30}
              stroke="#FFFFFF"
              strokeWidth="1.5"
            />
          ))}
        </g>
        {/* Window Mullions */}
        <line x1="0" y1="-90" x2="0" y2="96" stroke="#78350F" strokeWidth="4" />
        <line x1="-78" y1="22" x2="78" y2="22" stroke="#78350F" strokeWidth="4" />
        {/* Red & White Striped Interior Awning Valance */}
        <rect x="-86" y="-96" width="172" height="22" rx="4" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
        {[-60, -20, 20, 60].map((sx) => (
          <rect key={sx} x={sx - 8} y="-94" width="16" height="18" fill="#FFFFFF" opacity="0.9" />
        ))}
      </g>

      {/* Warm Hanging Pendant Lamps */}
      {[365, 585].map((lx) => (
        <g key={lx} transform={`translate(${lx}, 98)`}>
          <line x1="0" y1="-178" x2="0" y2="0" stroke="#475569" strokeWidth="3" />
          <polygon points="-24,18 24,18 14,0 -14,0" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
          <circle cx="0" cy="20" r="7" fill="#FEF08A" />
          <polygon points="-18,22 18,22 52,155 -52,155" fill="#FEF08A" opacity="0.12" />
        </g>
      ))}

      {/* Classic Brick Pizza Oven on Right */}
      <g transform="translate(815, 224)">
        <rect x="-12" y="-195" width="24" height="80" fill="#9A3412" stroke="#431407" strokeWidth="2.5" />
        <path d="M-86 128 V16 A86 84 0 0 1 86 16 V128 Z" fill="#C2410C" stroke="#7C2D12" strokeWidth="4" />
        <path d="M-64 128 V32 A64 62 0 0 1 64 32 V128 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.5" />
        {/* Glowing Fire Hearth */}
        <path d="M-38 82 V52 A38 34 0 0 1 38 52 V82 Z" fill="#1E293B" stroke="#78350F" strokeWidth="3" />
        <path
          d="M-24 80 Q-14 48 0 64 Q14 44 24 80 Z"
          fill="#F97316"
          opacity={emberGlow}
        />
        <path
          d="M-14 80 Q-6 58 0 70 Q8 54 14 80 Z"
          fill="#FACC15"
          opacity={emberGlow}
        />
        {/* Wooden Counter Shelf */}
        <rect x="-92" y="80" width="184" height="12" rx="4" fill="#78350F" />
      </g>

      {/* Warm Terracotta Floor + Checkered Red/White Tile Band */}
      <rect x="0" y="352" width="1000" height="195" fill="#FED7AA" />
      <rect x="0" y="362" width="1000" height="44" fill="#FFFBEB" />
      {Array.from({ length: 26 }).map((_, idx) => (
        <g key={idx}>
          <rect x={idx * 40} y="362" width="20" height="22" fill="#EF4444" opacity="0.82" />
          <rect x={idx * 40 + 20} y="384" width="20" height="22" fill="#EF4444" opacity="0.82" />
        </g>
      ))}
      <line x1="0" y1="352" x2="1000" y2="352" stroke="#9A3412" strokeWidth="3" />
    </g>
  );
};

// ===========================================================================
// 2. ㄵ (앉다) — Indoor Waterpark Swimming Pool Backdrop + Water Overlay
// ===========================================================================
const SwimmingPoolBackdrop: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g>
    <defs>
      <linearGradient id="b7PoolWallSky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#BAE6FD" />
        <stop offset="100%" stopColor="#E0F2FE" />
      </linearGradient>
      <linearGradient id="b7PoolDeepWater" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#0EA5E9" />
        <stop offset="100%" stopColor="#0369A1" />
      </linearGradient>
    </defs>

    {/* Upper Pool Hall Wall */}
    <rect x="0" y="-80" width="1000" height="295" fill="url(#b7PoolWallSky)" />

    {/* Tall Arched Pool Hall Skylight Windows + Sunbeams */}
    {[140, 470, 800].map((wx) => (
      <g key={wx} transform={`translate(${wx}, 115)`}>
        <path d="M-64 96 V-18 A64 56 0 0 1 64 -18 V96 Z" fill="#F0F9FF" stroke="#38BDF8" strokeWidth="4" />
        <line x1="0" y1="-74" x2="0" y2="96" stroke="#BAE6FD" strokeWidth="3" />
        <line x1="-64" y1="22" x2="64" y2="22" stroke="#BAE6FD" strokeWidth="3" />
        <polygon points="-50,96 64,96 130,235 -10,235" fill="#FFFFFF" opacity="0.18" />
      </g>
    ))}

    {/* Festive Waterpark Triangle Pennants Overhead */}
    <path d="M30 84 Q500 116 970 84" fill="none" stroke="#0284C7" strokeWidth="2.2" opacity="0.6" />
    {[90, 165, 240, 315, 390, 465, 540, 615, 690, 765, 840, 910].map((px, idx) => {
      const py = 86 + Math.sin(((px - 30) / 940) * Math.PI) * 18;
      const cols = ['#0EA5E9', '#FACC15', '#F43F5E', '#22C55E'];
      return <polygon key={px} points={`${px - 10},${py} ${px + 10},${py} ${px},${py + 18}`} fill={cols[idx % 4]} />;
    })}

    {/* Aqua Ceramic Tiled Lower Pool Wall */}
    <rect x="0" y="212" width="1000" height="140" fill="#E0F2FE" />
    <rect x="0" y="212" width="1000" height="10" fill="#0284C7" />
    {[248, 284, 320].map((ty) => (
      <line key={ty} x1="0" y1={ty} x2="1000" y2={ty} stroke="#BAE6FD" strokeWidth="2" />
    ))}
    {Array.from({ length: 20 }).map((_, idx) => (
      <line key={idx} x1={idx * 52} y1="222" x2={idx * 52} y2="352" stroke="#BAE6FD" strokeWidth="1.8" />
    ))}

    {/* Lifebuoy Ring Mounted on Pool Wall */}
    <g transform="translate(655, 272)">
      <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
      <circle cx="0" cy="0" r="24" fill="none" stroke="#EF4444" strokeWidth="10" strokeDasharray="18 19.7" />
      <circle cx="0" cy="0" r="13" fill="#E0F2FE" stroke="#0F172A" strokeWidth="2" />
    </g>

    {/* Curved Aqua Water Slide Leading Into Pool on Far Left */}
    <g transform="translate(18, 224)">
      <rect x="12" y="22" width="8" height="106" fill="#64748B" />
      <rect x="52" y="54" width="8" height="74" fill="#64748B" />
      <path
        d="M6 22 Q54 22 86 78 Q112 122 146 128"
        fill="none"
        stroke="#0284C7"
        strokeWidth="22"
        strokeLinecap="round"
      />
      <path
        d="M6 22 Q54 22 86 78 Q112 122 146 128"
        fill="none"
        stroke="#38BDF8"
        strokeWidth="14"
        strokeLinecap="round"
      />
      <path
        d="M12 20 Q56 20 86 74 Q112 116 146 122"
        fill="none"
        stroke="#E0F2FE"
        strokeWidth="3.5"
        strokeLinecap="round"
      />
    </g>

    {/* Clean Tiled Pool Deck Floor */}
    <rect x="0" y="352" width="1000" height="195" fill="#CBD5E1" />
    <rect x="320" y="352" width="680" height="62" fill="#F1F5F9" />
    {Array.from({ length: 12 }).map((_, idx) => (
      <line key={idx} x1={340 + idx * 58} y1="352" x2={325 + idx * 58} y2="414" stroke="#CBD5E1" strokeWidth="2" />
    ))}
    <line x1="0" y1="352" x2="1000" y2="352" stroke="#94A3B8" strokeWidth="2.5" />

    {/* Recessed Swimming Pool Basin (Left: x=24..324, y=352..456) */}
    <g>
      {/* White/Blue Coping Tile Rim */}
      <rect x="18" y="348" width="312" height="114" rx="14" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3.5" />
      <rect x="26" y="356" width="296" height="98" rx="10" fill="url(#b7PoolDeepWater)" />

      {/* Inner Pool Wall & Lane Divider Rope */}
      <rect x="26" y="356" width="296" height="12" fill="#7DD3FC" opacity="0.45" />
      <line x1="32" y1="368" x2="316" y2="368" stroke="#E0F2FE" strokeWidth="2" opacity="0.65" />

      {/* Gleaming Chrome Pool Ladder on Right Edge of Pool */}
      <g transform="translate(298, 336)">
        <path d="M0 44 V10 A8 8 0 0 1 16 10 V44" fill="none" stroke="#94A3B8" strokeWidth="4.5" strokeLinecap="round" />
        <path d="M10 44 V10 A8 8 0 0 1 26 10 V44" fill="none" stroke="#CBD5E1" strokeWidth="4.5" strokeLinecap="round" />
        <line x1="0" y1="26" x2="18" y2="26" stroke="#64748B" strokeWidth="3.5" />
        <line x1="0" y1="38" x2="18" y2="38" stroke="#64748B" strokeWidth="3.5" />
      </g>

      {/* Subtle Underwater Caustics */}
      {[75, 165, 245].map((cx, idx) => (
        <path
          key={cx}
          d={`M${cx} ${414 + Math.sin(walkTime * 4 + idx) * 2} q18 -5 36 0`}
          fill="none"
          stroke="#BAE6FD"
          strokeWidth="2.5"
          opacity="0.45"
          strokeLinecap="round"
        />
      ))}
    </g>
  </g>
);

export const SwimmingPoolWaterForegroundSvg: React.FC<{
  walkTime: number;
  splashed: boolean;
}> = ({ walkTime, splashed }) => (
  <g>
    {/* Translucent Water Surface Layer Covering Jollaman's Submerged Lower Body */}
    <path
      d={`M26 374 Q95 ${368 + Math.sin(walkTime * 5) * 3} 175 374 T322 374 V446 A10 10 0 0 1 312 454 H36 A10 10 0 0 1 26 446 Z`}
      fill="#38BDF8"
      fillOpacity="0.68"
    />
    {/* Crisp Sparkling Surface Ripples */}
    <path
      d={`M28 374 Q95 ${368 + Math.sin(walkTime * 5) * 3} 175 374 T320 374`}
      fill="none"
      stroke="#E0F2FE"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    {[65, 145, 230].map((rx, idx) => (
      <path
        key={rx}
        d={`M${rx} ${396 + Math.cos(walkTime * 5.5 + idx) * 2.5} q20 -4 40 0`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="2.5"
        opacity="0.65"
        strokeLinecap="round"
      />
    ))}

    {/* Dynamic Water Splash Crown & Droplets around Jollaman (x=180) */}
    {splashed && (
      <g transform="translate(180, 372)">
        <ellipse
          cx="0"
          cy="4"
          rx={30 + Math.sin(walkTime * 7) * 5}
          ry="8"
          fill="none"
          stroke="#FFFFFF"
          strokeWidth="3"
          opacity="0.9"
        />
        <path
          d="M-36 0 Q-22 -28 -8 -6 Q0 -34 10 -6 Q24 -28 38 0"
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="4.2"
          strokeLinecap="round"
        />
        {[-28, -12, 14, 28].map((dx, idx) => (
          <circle
            key={dx}
            cx={dx}
            cy={-22 - Math.abs(Math.sin(walkTime * 8 + idx)) * 12}
            r="3.8"
            fill="#FFFFFF"
            stroke="#0284C7"
            strokeWidth="1.2"
          />
        ))}
      </g>
    )}
  </g>
);

// ===========================================================================
// 3. ㄶ (많네) — Cozy Indoor Kids' Ballpit Playroom Backdrop (볼풀장 실내)
// ===========================================================================
const BallpitPlayroomBackdrop: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g>
    <defs>
      <linearGradient id="b7PlayroomWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#EFF6FF" />
        <stop offset="100%" stopColor="#ECFEFF" />
      </linearGradient>
    </defs>

    {/* Soft Pastel Playroom Wall */}
    <rect x="0" y="-80" width="1000" height="432" fill="url(#b7PlayroomWall)" />

    {/* Colorful Padded Safety Wall Cushions */}
    <rect x="0" y="232" width="1000" height="120" fill="#DBEAFE" />
    {Array.from({ length: 10 }).map((_, idx) => {
      const cushionColors = ['#FDE68A', '#FBCFE8', '#A7F3D0', '#BFDBFE', '#DDD6FE'];
      return (
        <rect
          key={idx}
          x={idx * 100 + 6}
          y="238"
          width="88"
          height="110"
          rx="14"
          fill={cushionColors[idx % cushionColors.length]}
          stroke="#FFFFFF"
          strokeWidth="3"
        />
      );
    })}

    {/* Festive Rainbow Playroom Bunting */}
    <path d="M40 94 Q500 132 960 94" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
    {[100, 175, 250, 325, 400, 475, 550, 625, 700, 775, 850, 915].map((bx, idx) => {
      const by = 96 + Math.sin(((bx - 40) / 920) * Math.PI) * 20;
      const cols = ['#EF4444', '#FACC15', '#3B82F6', '#EC4899', '#22C55E', '#A855F7'];
      return <polygon key={bx} points={`${bx - 11},${by} ${bx + 11},${by} ${bx},${by + 20}`} fill={cols[idx % cols.length]} />;
    })}

    {/* Indoor Curved Play Slide Feeding Into Ballpit on Left */}
    <g transform="translate(55, 212)">
      <rect x="0" y="20" width="16" height="120" rx="4" fill="#F59E0B" stroke="#B45309" strokeWidth="2.5" />
      <path
        d="M14 26 Q72 26 112 96 Q138 136 176 138"
        fill="none"
        stroke="#F97316"
        strokeWidth="26"
        strokeLinecap="round"
      />
      <path
        d="M14 26 Q72 26 112 96 Q138 136 176 138"
        fill="none"
        stroke="#FACC15"
        strokeWidth="16"
        strokeLinecap="round"
      />
    </g>

    {/* Floating Indoor Party Balloons */}
    {[
      { x: 96, y: 158, c: '#EC4899' },
      { x: 895, y: 150, c: '#3B82F6' },
      { x: 932, y: 174, c: '#FACC15' },
    ].map((bl, idx) => (
      <g key={bl.x} transform={`translate(${bl.x}, ${bl.y + Math.sin(walkTime * 3 + idx) * 6})`}>
        <line x1="0" y1="22" x2="0" y2="64" stroke="#94A3B8" strokeWidth="1.8" />
        <ellipse cx="0" cy="0" rx="18" ry="22" fill={bl.c} stroke="#0F172A" strokeWidth="2" />
        <ellipse cx="-6" cy="-7" rx="4" ry="7" fill="#FFFFFF" opacity="0.5" />
      </g>
    ))}

    {/* Soft Cushioned Playmat Floor */}
    <rect x="0" y="352" width="1000" height="195" fill="#93C5FD" />
    <rect x="0" y="362" width="1000" height="48" fill="#EFF6FF" />
    <line x1="0" y1="352" x2="1000" y2="352" stroke="#3B82F6" strokeWidth="3" />
  </g>
);

export const DoubleBatchimBackdrop: React.FC<{
  activeChar: DoubleBatchimKey;
  isWalkingMode: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeChar, isWalkingMode, walkTime, scrollOffset = 0 }) => {
  const wrap = (x: number, span = 1100) => (((x - scrollOffset * 0.28) % span) + span) % span - 50;

  if (isWalkingMode) {
    return <AmusementParkBackdrop timeOfDay="morning" walkTime={walkTime} wrap={wrap} />;
  }

  // -------------------------------------------------------------------------
  // 1. ㄳ (몫): Warm Indoor Pizzeria Backdrop
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄳ') {
    return <PizzeriaInteriorBackdrop walkTime={walkTime} />;
  }

  // -------------------------------------------------------------------------
  // 2. ㄵ (앉다): Indoor Waterpark Swimming Pool Backdrop
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄵ') {
    return <SwimmingPoolBackdrop walkTime={walkTime} />;
  }

  // -------------------------------------------------------------------------
  // 3. ㄶ (많네): Indoor Kids' Ballpit Playroom Backdrop
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄶ') {
    return <BallpitPlayroomBackdrop walkTime={walkTime} />;
  }

  // -------------------------------------------------------------------------
  // 4. ㄺ (닭): Sunny Country Barn & Rooster Coop Yard!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄺ') {
    return (
      <g>
        <defs>
          <linearGradient id="b7FarmSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b7FarmSky)" />
        <circle cx="885" cy="118" r="36" fill="#FEF08A" opacity="0.45" />
        <circle cx="885" cy="118" r="25" fill="#FDE047" />
        <path d="M0 326 Q250 264 540 318 T1000 302 L1000 356 L0 356 Z" fill="#86EFAC" />
        {/* Red Country Chicken Barn on Right */}
        <g transform="translate(770, 260)">
          <polygon points="-85,12 0,-56 85,12" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="3.5" />
          <rect x="-72" y="12" width="144" height="82" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3" />
          <rect x="-24" y="38" width="48" height="56" fill="#FEF3C7" stroke="#78350F" strokeWidth="2.5" />
          <line x1="-24" y1="38" x2="24" y2="94" stroke="#78350F" strokeWidth="2.5" />
          <line x1="24" y1="38" x2="-24" y2="94" stroke="#78350F" strokeWidth="2.5" />
        </g>
        {/* Wooden Coop Fence */}
        <rect x="0" y="316" width="1000" height="7" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
        <rect x="0" y="334" width="1000" height="7" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
        {Array.from({ length: 13 }).map((_, idx) => (
          <rect key={idx} x={idx * 82 + 12} y="302" width="12" height="50" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        ))}
        {/* Golden Hay & Farm Ground */}
        <rect x="0" y="352" width="1000" height="195" fill="#4ADE80" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDE68A" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 5. ㄻ (굶다): Midnight Moonlit Empty Kitchen!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄻ') {
    return (
      <g>
        <defs>
          <linearGradient id="b7MidnightKitchen" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="100%" stopColor="#1E293B" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="436" fill="url(#b7MidnightKitchen)" />
        {/* Moonlit Kitchen Window */}
        <g transform="translate(115, 118)">
          <rect x="0" y="0" width="132" height="110" rx="8" fill="#1E1B4B" stroke="#475569" strokeWidth="5" />
          <circle cx="92" cy="36" r="18" fill="#FEF08A" />
          <circle cx="99" cy="31" r="15" fill="#1E1B4B" />
          <line x1="66" y1="0" x2="66" y2="110" stroke="#475569" strokeWidth="4" />
          <line x1="0" y1="55" x2="132" y2="55" stroke="#475569" strokeWidth="4" />
        </g>
        {/* Night Clock */}
        <g transform="translate(765, 148)">
          <circle cx="0" cy="0" r="28" fill="#E2E8F0" stroke="#64748B" strokeWidth="4" />
          <line x1="0" y1="0" x2="0" y2="-18" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
          <line x1="0" y1="0" x2="12" y2="6" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        </g>
        <rect x="0" y="352" width="1000" height="195" fill="#334155" />
        <rect x="0" y="366" width="1000" height="46" fill="#475569" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#64748B" strokeWidth="2.5" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 6. ㄼ (밟다): Sunny Candy-Shop Sidewalk & Crosswalk!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄼ') {
    return (
      <g>
        <defs>
          <linearGradient id="b7CandySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#FDF2F8" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b7CandySky)" />
        {[160, 520, 840].map((cx, idx) => (
          <g key={cx} transform={`translate(${wrap(cx)}, ${86 + (idx % 2) * 18})`} opacity="0.9">
            <circle cx="-18" cy="6" r="16" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="22" fill="#FFFFFF" />
            <circle cx="20" cy="6" r="16" fill="#FFFFFF" />
          </g>
        ))}
        {/* Cute Candy Shopfront on Right */}
        <g transform="translate(745, 224)">
          <rect x="-78" y="0" width="156" height="128" rx="6" fill="#FCE7F3" stroke="#EC4899" strokeWidth="3" />
          <path d="M-86 0 L86 0 L78 24 L-78 24 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="2.5" />
          <rect x="-46" y="44" width="92" height="50" rx="6" fill="#E0F2FE" stroke="#EC4899" strokeWidth="2.5" />
          <text x="0" y="75" textAnchor="middle" fontSize="18" fontWeight="900" fill="#DB2777">GUM</text>
        </g>
        <rect x="0" y="352" width="1000" height="195" fill="#F9A8D4" opacity="0.35" />
        <rect x="0" y="366" width="1000" height="46" fill="#E2E8F0" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#94A3B8" strokeWidth="2.5" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 5. ㄽ (외곬): Dusk Amusement Park (2D Side-View One-Way Rail Track!)
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄽ') {
    return <AmusementParkBackdrop timeOfDay="dusk" walkTime={walkTime} wrap={wrap} />;
  }

  // -------------------------------------------------------------------------
  // 6. ㄾ (핥다): Rosy Dusk Amusement Park Backdrop!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄾ') {
    return <AmusementParkBackdrop timeOfDay="dusk" walkTime={walkTime} wrap={wrap} />;
  }

  // -------------------------------------------------------------------------
  // 9. ㄿ (읊다): Golden Autumn Maple Poetry Recital Stage!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄿ') {
    return (
      <g>
        <defs>
          <linearGradient id="b7PoetrySky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#7C2D12" />
            <stop offset="55%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="436" fill="url(#b7PoetrySky)" />
        <polygon points="255,-80 405,-80 475,368 185,368" fill="#FEF08A" opacity="0.2" />
        <path d="M0 340 Q260 278 560 334 T1000 318 L1000 368 L0 368 Z" fill="#FDBA74" />
        {[110, 845].map((tx, idx) => (
          <g key={tx} transform={`translate(${tx}, 352)`}>
            <rect x="-8" y="-120" width="16" height="120" fill="#78350F" />
            <circle cx="0" cy="-134" r="42" fill={idx === 0 ? '#DC2626' : '#F59E0B'} />
            <circle cx="-26" cy="-114" r="28" fill="#EA580C" />
            <circle cx="26" cy="-114" r="28" fill="#D97706" />
          </g>
        ))}
        {[180, 360, 580, 740].map((lx, idx) => (
          <ellipse
            key={lx}
            cx={lx + Math.sin(walkTime * 2.5 + idx) * 20}
            cy={((walkTime * 54 + idx * 75) % 290) + 50}
            rx="10"
            ry="5"
            transform={`rotate(${walkTime * 90 + idx * 45}, ${lx + Math.sin(walkTime * 2.5 + idx) * 20}, ${((walkTime * 54 + idx * 75) % 290) + 50})`}
            fill={idx % 2 === 0 ? '#DC2626' : '#F59E0B'}
          />
        ))}
        <rect x="0" y="352" width="1000" height="195" fill="#B45309" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDE68A" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 7. ㅀ (싫어): Spooky Nightfall Amusement Park (Ghost & Zombie Parade!)
  // -------------------------------------------------------------------------
  if (activeChar === 'ㅀ') {
    return (
      <g>
        <AmusementParkBackdrop timeOfDay="nightfall" walkTime={walkTime} wrap={wrap} />
        {/* Spooky Purple Parade Mist */}
        <ellipse cx="500" cy="356" rx="460" ry="26" fill="#A855F7" opacity="0.22" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 4. 짧다 (ㄼ→ㄹ 원칙): Golden Sunset Amusement Park (Mini Roller Coaster!)
  // -------------------------------------------------------------------------
  if (activeChar === '짧다') {
    return <AmusementParkBackdrop timeOfDay="sunset" walkTime={walkTime} wrap={wrap} />;
  }

  // -------------------------------------------------------------------------
  // 13. 읽고 (ㄺ+ㄱ→ㄹ 예외): Enchanted Neon Library with Giant Spellbook!
  // -------------------------------------------------------------------------
  if (activeChar === '읽고') {
    return (
      <g>
        <defs>
          <linearGradient id="b7LibraryBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b7LibraryBg)" />
        {/* Bookshelf columns */}
        {[95, 815].map((sx) => (
          <g key={sx} transform={`translate(${sx}, 115)`}>
            <rect x="0" y="0" width="90" height="236" rx="6" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            {[45, 105, 165].map((sy) => (
              <g key={sy}>
                <line x1="6" y1={sy} x2="84" y2={sy} stroke="#451A03" strokeWidth="4" />
                <rect x="12" y={sy - 32} width="14" height="32" fill="#EF4444" />
                <rect x="28" y={sy - 36} width="14" height="36" fill="#3B82F6" />
                <rect x="44" y={sy - 28} width="14" height="28" fill="#FACC15" />
                <rect x="60" y={sy - 34} width="14" height="34" fill="#10B981" />
              </g>
            ))}
          </g>
        ))}
        <rect x="0" y="352" width="1000" height="195" fill="#92400E" />
        <rect x="0" y="366" width="1000" height="46" fill="#B45309" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 14. 많아 (ㅎ+모음 → ㅎ탈락 연음): Sunny Coin Trampoline Park!
  // -------------------------------------------------------------------------
  if (activeChar === '많아') {
    return (
      <g>
        <defs>
          <linearGradient id="b7ManaSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b7ManaSky)" />
        <path d="M0 330 Q260 260 540 318 T1000 300 L1000 356 L0 356 Z" fill="#6EE7B7" />
        <rect x="0" y="352" width="1000" height="195" fill="#10B981" />
        <rect x="0" y="366" width="1000" height="46" fill="#D1FAE5" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 15. 많고 (ㅎ+파열음 → 거센소리 축약): Dragon-Ball Thunder Dojo!
  // -------------------------------------------------------------------------
  if (activeChar === '많고') {
    return (
      <g>
        <defs>
          <linearGradient id="b7ThunderBg" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#450A0A" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b7ThunderBg)" />
        {/* Anime Lightning Speed Lines */}
        <g opacity="0.28">
          <polygon points="500,190 0,-20 0,70" fill="#FACC15" />
          <polygon points="500,190 1000,-30 1000,65" fill="#FACC15" />
          <polygon points="500,190 150,-80 245,-80" fill="#FB923C" />
          <polygon points="500,190 755,-80 850,-80" fill="#FB923C" />
        </g>
        <rect x="0" y="352" width="1000" height="195" fill="#78350F" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDE047" opacity="0.72" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // 8. ㅄ (없다): Pitch-Dark Starry Midnight Amusement Park Exit!
  // -------------------------------------------------------------------------
  return <AmusementParkBackdrop timeOfDay="midnight" walkTime={walkTime} wrap={wrap} />;
};

// ===========================================================================
// 1. ㄳ (몫) — Pizzeria Checkered Table + Munching Whirlwind -> 1 Remaining Slice!
// ===========================================================================
export const PizzaSliceWithFlagSvg: React.FC = () => (
  <g>
    <polygon points="-28,16 30,-5 -16,-26" fill="#FACC15" stroke="#B45309" strokeWidth="3" strokeLinejoin="round" />
    <path d="M-28 16 Q-25 -7 -16 -26" fill="none" stroke="#D97706" strokeWidth="8" strokeLinecap="round" />
    <circle cx="-11" cy="-4" r="4.5" fill="#EF4444" />
    <circle cx="5" cy="-3" r="4" fill="#EF4444" />
    <circle cx="-3" cy="5" r="3" fill="#22C55E" />
    <line x1="-2" y1="-9" x2="-2" y2="-36" stroke="#78350F" strokeWidth="2.5" />
    <polygon points="-2,-36 22,-28 -2,-20" fill="#EF4444" stroke="#7F1D1D" strokeWidth="1.5" />
    <text x="8" y="-25" textAnchor="middle" fontSize="9" fontWeight="900" fill="#FFFFFF">몫</text>
  </g>
);

export const PizzeriaPizzaPanSvg: React.FC<{
  remainingSlices: number; // 6 down to 1 (0 if Jollaman already picked up the last 1!)
  munching?: boolean;
  walkTime?: number;
}> = ({ remainingSlices, munching = false, walkTime = 0 }) => {
  const sliceAngles = [0, 60, 120, 180, 240, 300];
  return (
    <g>
      {/* Checkered Pizzeria Tablecloth + Wooden Table Legs */}
      <rect x="-48" y="16" width="12" height="34" fill="#78350F" />
      <rect x="36" y="16" width="12" height="34" fill="#78350F" />
      <rect x="-84" y="-2" width="168" height="22" rx="6" fill="#FFFFFF" stroke="#DC2626" strokeWidth="3" />
      {[-72, -44, -16, 12, 40, 68].map((cx) => (
        <rect key={cx} x={cx} y="0" width="14" height="18" fill="#EF4444" opacity="0.78" />
      ))}

      {/* Round Wooden Pizza Peel Tray */}
      <rect x="46" y="-12" width="38" height="10" rx="5" fill="#B45309" stroke="#78350F" strokeWidth="2" />
      <ellipse cx="0" cy="-8" rx="58" ry="22" fill="#D97706" stroke="#78350F" strokeWidth="3" />
      <ellipse cx="0" cy="-10" rx="49" ry="16" fill="#FEF3C7" />

      {/* Remaining Pizza Slices on Tray */}
      <g transform="translate(0, -10) scale(1, 0.42)">
        {sliceAngles.slice(0, Math.max(0, remainingSlices)).map((deg) => (
          <g key={deg} transform={`rotate(${deg})`}>
            <path
              d="M0 0 L42 -17 A44 44 0 0 1 42 17 Z"
              fill="#FACC15"
              stroke="#B45309"
              strokeWidth="4.5"
              strokeLinejoin="round"
            />
            <path d="M40 -15 A42 42 0 0 1 40 15" fill="none" stroke="#D97706" strokeWidth="6" />
            <circle cx="25" cy="-4" r="5" fill="#EF4444" />
            <circle cx="16" cy="5" r="4" fill="#EF4444" />
          </g>
        ))}
      </g>

      {/* Comical Cartoon Munching Cloud & Crumbs Devouring 5 Slices! */}
      {munching && (
        <g transform={`translate(${Math.sin(walkTime * 28) * 14}, -34)`}>
          <ellipse cx="0" cy="0" rx="42" ry="22" fill="#FFFBEB" stroke="#EA580C" strokeWidth="2.8" strokeDasharray="6 4" />
          <text x="0" y="6" textAnchor="middle" fontSize="15" fontWeight="900" fill="#DC2626">
            냠냠냠!!
          </text>
          <circle cx="-36" cy="-14" r="4" fill="#FACC15" />
          <circle cx="38" cy="-12" r="3.5" fill="#EF4444" />
        </g>
      )}
    </g>
  );
};

// ===========================================================================
// 2. ㄵ (앉다) — High-Craft Hydraulic Poolside Flying Chair!
// ===========================================================================
export const PoolsideFlyingChairsSvg: React.FC<{
  springStretch: number; // 0 = intact, >0 = sprung upward
  compress?: number; // 0..1 pre-launch coil compression
}> = ({ springStretch, compress = 0 }) => {
  const sprung = springStretch > 0.05;
  const seatDrop = sprung ? 0 : compress * 9;

  return (
    <g>
      {/* Heavy Steel Poolside Launch Base with Caution Stripes */}
      <rect x="-40" y="20" width="80" height="14" rx="4" fill="#334155" stroke="#0F172A" strokeWidth="2.8" />
      {[-28, -8, 12].map((sx) => (
        <polygon key={sx} points={`${sx},21 ${sx + 10},21 ${sx + 4},33 ${sx - 6},33`} fill="#FACC15" />
      ))}

      {/* Hydraulic Piston & Coiled Spring Housing */}
      <rect x="-14" y="6" width="28" height="14" rx="3" fill="#64748B" stroke="#0F172A" strokeWidth="2.2" />

      {sprung ? (
        <g>
          {/* Giant Boing Spring Shooting Upward! */}
          <path
            d={`M-12 6 L14 ${-18 * springStretch} L-14 ${-44 * springStretch} L14 ${-70 * springStretch} L-10 ${-94 * springStretch} L0 ${-110 * springStretch}`}
            fill="none"
            stroke="#94A3B8"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={`M-12 6 L14 ${-18 * springStretch} L-14 ${-44 * springStretch} L14 ${-70 * springStretch} L-10 ${-94 * springStretch} L0 ${-110 * springStretch}`}
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Ejected Cushion Pad Tipped at Top of Spring */}
          <rect
            x="-26"
            y={-122 * springStretch}
            width="52"
            height="14"
            rx="5"
            transform={`rotate(-18, 0, ${-115 * springStretch})`}
            fill="#FBBF24"
            stroke="#0F172A"
            strokeWidth="2.8"
          />
        </g>
      ) : (
        <g transform={`translate(0, ${seatDrop})`}>
          {/* Compressed Coil Preview */}
          <path d="M-10 8 L10 3 L-10 -2 L10 -6" fill="none" stroke="#CBD5E1" strokeWidth="4.5" strokeLinecap="round" />
          {/* Cushioned Backrest + Headrest */}
          <rect x="-26" y="-44" width="52" height="44" rx="10" fill="#F97316" stroke="#0F172A" strokeWidth="3" />
          <rect x="-16" y="-50" width="32" height="12" rx="6" fill="#FACC15" stroke="#0F172A" strokeWidth="2.4" />
          {/* Seat Cushion */}
          <rect x="-28" y="-4" width="56" height="14" rx="5" fill="#FBBF24" stroke="#0F172A" strokeWidth="2.8" />
          {/* Armrests */}
          <rect x="-32" y="-14" width="8" height="22" rx="4" fill="#EA580C" stroke="#0F172A" strokeWidth="2.2" />
          <rect x="24" y="-14" width="8" height="22" rx="4" fill="#EA580C" stroke="#0F172A" strokeWidth="2.2" />
        </g>
      )}
    </g>
  );
};

// ===========================================================================
// 3. ㄶ (많네) — Colossal Indoor Ballpit + Glossy Ball Avalanche + Peeking ㄴ!
// ===========================================================================
export const AmusementBallpitSvg: React.FC<{
  ballWave: number; // 0..1 overflow
  buried: boolean;
  walkTime: number;
}> = ({ ballWave, buried, walkTime }) => {
  const blink = Math.sin(walkTime * 3.8) > 0.9;
  const ballColors = ['#EF4444', '#FACC15', '#3B82F6', '#EC4899', '#22C55E', '#A855F7', '#F97316', '#06B6D4'];

  const baseBalls: { x: number; y: number; r: number }[] = [];
  for (let row = 0; row < 4; row++) {
    const cols = 14;
    for (let c = 0; c < cols; c++) {
      baseBalls.push({
        x: -312 + c * 48 + (row % 2) * 20,
        y: -18 - row * 28,
        r: 22 + ((row + c) % 3) * 2,
      });
    }
  }

  const extraBalls: { x: number; y: number; r: number }[] = [];
  for (let row = 0; row < 4; row++) {
    const span = 12 - row * 2;
    for (let c = 0; c < span; c++) {
      const startX = -((span - 1) * 46) / 2;
      extraBalls.push({
        x: startX + c * 46,
        y: -128 - row * 32,
        r: 24 + ((row + c) % 3) * 2,
      });
    }
  }

  return (
    <g>
      {/* Colossal Padded Ballpit Rim Back */}
      <rect x="-356" y="-128" width="712" height="144" rx="28" fill="#60A5FA" stroke="#1D4ED8" strokeWidth="4.5" />
      <rect x="-344" y="-114" width="688" height="118" rx="20" fill="#1E40AF" opacity="0.24" />

      {/* Back rows of balls */}
      {baseBalls.slice(0, 28).map((b, idx) => (
        <g key={`bb-${idx}`}>
          <circle
            cx={b.x}
            cy={b.y + Math.sin(walkTime * 3.5 + idx) * 2}
            r={b.r}
            fill={ballColors[idx % ballColors.length]}
            stroke="#0F172A"
            strokeWidth="2.4"
          />
          <circle cx={b.x - 6} cy={b.y - 6} r={b.r * 0.25} fill="#FFFFFF" opacity="0.55" />
        </g>
      ))}

      {/* Front rows of balls */}
      {baseBalls.slice(28).map((b, idx) => (
        <g key={`bf-${idx}`}>
          <circle
            cx={b.x}
            cy={b.y + Math.sin(walkTime * 4 + idx) * 2}
            r={b.r}
            fill={ballColors[(idx + 3) % ballColors.length]}
            stroke="#0F172A"
            strokeWidth="2.4"
          />
          <circle cx={b.x - 6} cy={b.y - 6} r={b.r * 0.25} fill="#FFFFFF" opacity="0.55" />
        </g>
      ))}

      {/* Colossal Overflowing Avalanche burying center Jollaman */}
      {ballWave > 0.05 && (
        <g opacity={Math.min(1, ballWave * 1.35)}>
          {extraBalls.map((b, idx) => {
            const cy = b.y * Math.min(1, ballWave) - (1 - Math.min(1, ballWave)) * 120;
            return (
              <g key={`eb-${idx}`}>
                <circle
                  cx={b.x}
                  cy={cy}
                  r={b.r}
                  fill={ballColors[(idx + 2) % ballColors.length]}
                  stroke="#0F172A"
                  strokeWidth="2.5"
                />
                <circle cx={b.x - 7} cy={cy - 7} r={b.r * 0.26} fill="#FFFFFF" opacity="0.55" />
              </g>
            );
          })}
        </g>
      )}

      {/* Front Padded Ballpit Wall */}
      <rect x="-362" y="-22" width="724" height="44" rx="16" fill="#2563EB" stroke="#1E3A8A" strokeWidth="4" />
      <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">
        공이 엄청 많네!!
      </text>

      {/* Between the overflowing balls: Jollaman peeking eyes + waving hand + glowing ㄴ! */}
      {buried && (
        <g transform="translate(0, -148)">
          {/* Little white hand sticking out waving from the balls */}
          <g transform={`translate(-76, 12) rotate(${Math.sin(walkTime * 9) * 16})`}>
            <line x1="0" y1="12" x2="-6" y2="-12" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <circle cx="-6" cy="-14" r="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.4" />
          </g>

          <ellipse cx="-20" cy="4" rx="22" ry="12" fill="#0F172A" />
          {blink ? (
            <>
              <line x1="-30" y1="4" x2="-24" y2="4" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
              <line x1="-16" y1="4" x2="-10" y2="4" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
            </>
          ) : (
            <>
              <circle cx="-27" cy="4" r="4" fill="#FFFFFF" />
              <circle cx="-13" cy="4" r="4" fill="#FFFFFF" />
              <circle cx="-27" cy="4" r="1.8" fill="#0F172A" />
              <circle cx="-13" cy="4" r="1.8" fill="#0F172A" />
            </>
          )}
          {/* Only ㄴ peeks out cleanly between balls! */}
          <g transform={`translate(38, ${-18 + Math.sin(walkTime * 5) * 4})`}>
            <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3.8" />
            <text x="0" y="10" textAnchor="middle" fontSize="28" fontWeight="900" fill="#2563EB">
              ㄴ
            </text>
          </g>
        </g>
      )}
    </g>
  );
};

// ===========================================================================
// 4. 짧다 (ㄼ→ㄹ 원칙) — Comically Tiny Ultra-Short Roller Coaster!
// ===========================================================================
export const TooShortCoasterSvg: React.FC<{
  carProgress: number; // 0 = start gate, 1 = end bumper (30cm away!)
  showCar?: boolean;
}> = ({ carProgress, showCar = true }) => {
  const carX = -46 + carProgress * 92;
  const carY = -20 - Math.sin(carProgress * Math.PI) * 14;
  return (
    <g>
      {/* Tiny Start Arch & End Bumper ("출발" -> "도착?!") */}
      <rect x="-58" y="-54" width="6" height="54" fill="#DB2777" />
      <rect x="-74" y="-66" width="38" height="18" rx="6" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
      <text x="-55" y="-53" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#FFFFFF">출발</text>

      <rect x="52" y="-54" width="6" height="54" fill="#DB2777" />
      <rect x="36" y="-66" width="42" height="18" rx="6" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
      <text x="57" y="-53" textAnchor="middle" fontSize="10.5" fontWeight="900" fill="#FFFFFF">도착?!</text>

      {/* Tiny Steel Pillars */}
      {[-34, 0, 34].map((px) => (
        <line key={px} x1={px} y1="0" x2={px} y2="-22" stroke="#94A3B8" strokeWidth="4" />
      ))}

      {/* Ultra-Short Roller Coaster Track Rail (barely 110px long!) */}
      <path
        d="M-55 -16 Q0 -38 55 -16"
        fill="none"
        stroke="#0F172A"
        strokeWidth="9"
        strokeLinecap="round"
      />
      <path
        d="M-55 -16 Q0 -38 55 -16"
        fill="none"
        stroke="#EC4899"
        strokeWidth="4.5"
        strokeLinecap="round"
      />

      {/* Tiny 1-seat Coaster Car */}
      {showCar && (
        <g transform={`translate(${carX}, ${carY})`}>
          <rect x="-18" y="-12" width="36" height="15" rx="5" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="-10" cy="4" r="4" fill="#1E293B" />
          <circle cx="10" cy="4" r="4" fill="#1E293B" />
        </g>
      )}

      {/* Funny Measure Label */}
      <text x="0" y="-80" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#BE185D" stroke="#FFFFFF" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
        초단축 롤러코스터 (30cm!!)
      </text>
    </g>
  );
};

// ===========================================================================
// 5. ㄽ (외곬) — 2D Side-View One-Way Amusement Park Rail Track + Turnstile!
// ===========================================================================
export const OneWayRailTrackSvg: React.FC<{
  gateLocked: boolean;
  showGuideRieul: boolean;
  cartX: number; // relative offset along track
  siotDropped: boolean;
  walkTime: number;
}> = ({ gateLocked, showGuideRieul, cartX, siotDropped, walkTime }) => (
  <g>
    {/* Elevated One-Way Steel/Wood Rail Track Base */}
    {[-220, -110, 0, 110, 220].map((px) => (
      <rect key={px} x={px - 5} y="-22" width="10" height="22" fill="#475569" stroke="#1E293B" strokeWidth="2" />
    ))}
    <rect x="-255" y="-26" width="510" height="10" rx="3" fill="#94A3B8" stroke="#0F172A" strokeWidth="2.5" />
    {Array.from({ length: 18 }).map((_, idx) => (
      <rect key={idx} x={-245 + idx * 28} y="-28" width="12" height="6" rx="1.5" fill="#B45309" />
    ))}

    {/* Glowing Straight-Only Arrow Chevrons on Track */}
    {[-145, -45, 55, 145].map((ax, idx) => (
      <g key={ax} transform={`translate(${ax + Math.sin(walkTime * 6 + idx) * 3}, -42)`} opacity={showGuideRieul ? 1 : 0.65}>
        <polygon points="-10,-6 6,-6 6,-11 18,0 6,11 6,6 -10,6" fill="#FACC15" stroke="#B45309" strokeWidth="1.8" />
      </g>
    ))}

    {/* Left One-Way Turnstile Gate ("외곬 · 일방통행 →" & "후진 금지 ✕") */}
    <g transform="translate(-210, 0)">
      <rect x="-8" y="-118" width="16" height="118" rx="3" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
      <rect x="-56" y="-142" width="112" height="32" rx="8" fill="#1E293B" stroke="#FACC15" strokeWidth="2.5" />
      <text x="0" y="-121" textAnchor="middle" fontSize="13.5" fontWeight="900" fill="#FEF08A">
        외곬 · 일방통행 →
      </text>
      {/* Locking Turnstile Arm */}
      <line
        x1="0"
        y1="-58"
        x2={gateLocked ? 22 : -18}
        y2={gateLocked ? -58 : -78}
        stroke="#EF4444"
        strokeWidth="6"
        strokeLinecap="round"
      />
      {gateLocked && (
        <g transform="translate(0, -84)">
          <rect x="-40" y="-13" width="80" height="24" rx="6" fill="#DC2626" stroke="#FFFFFF" strokeWidth="2" />
          <text x="0" y="3" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#FFFFFF">
            후진 금지 ✕
          </text>
        </g>
      )}
    </g>

    {/* Center Blocked Fork Sign ("← 뒤로 ✕ / ↑ 옆길 ✕") */}
    <g transform="translate(0, -26)">
      <rect x="-4" y="-114" width="8" height="114" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
      <rect x="-52" y="-138" width="104" height="24" rx="6" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
      <text x="0" y="-121" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#FFFFFF">
        옆길 · 유턴 막힘 ✕
      </text>
      <rect x="-46" y="-108" width="92" height="24" rx="6" fill="#16A34A" stroke="#FEF08A" strokeWidth="2" />
      <text x="0" y="-91" textAnchor="middle" fontSize="12" fontWeight="900" fill="#FFFFFF">
        오직 직진 → ㄹ
      </text>
    </g>

    {/* Dropped ㅅ falling behind at the locked gate */}
    {siotDropped && (
      <g transform="translate(-164, -48) rotate(-24)" opacity="0.72">
        <circle cx="0" cy="0" r="16" fill="#E2E8F0" stroke="#64748B" strokeWidth="2" />
        <text x="0" y="6" textAnchor="middle" fontSize="17" fontWeight="900" fill="#64748B">
          ㅅ
        </text>
      </g>
    )}

    {/* Cute Red One-Way Rail Cart Riding Along Track */}
    <g transform={`translate(${cartX}, -28)`}>
      <rect x="-26" y="-20" width="52" height="18" rx="6" fill="#DC2626" stroke="#0F172A" strokeWidth="2.8" />
      <rect x="-18" y="-16" width="36" height="6" rx="2" fill="#FCA5A5" opacity="0.6" />
      <circle cx="-15" cy="2" r="6" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
      <circle cx="15" cy="2" r="6" fill="#1E293B" stroke="#CBD5E1" strokeWidth="2" />
    </g>

    {/* Right Finish Arch with Glowing ㄹ */}
    <g transform="translate(228, 0)">
      <rect x="-6" y="-128" width="12" height="128" fill="#B91C1C" stroke="#0F172A" strokeWidth="2" />
      <g transform={`translate(0, ${-134 + (showGuideRieul ? Math.sin(walkTime * 6) * 4 : 0)})`}>
        <circle cx="0" cy="0" r="28" fill={showGuideRieul ? '#B91C1C' : '#FFFFFF'} stroke="#FEF08A" strokeWidth="4" />
        <text x="0" y="10" textAnchor="middle" fontSize="29" fontWeight="900" fill={showGuideRieul ? '#FFFFFF' : '#B91C1C'}>
          ㄹ
        </text>
      </g>
    </g>
  </g>
);

// ===========================================================================
// 7. ㅀ (싫어) — Spooky Night Ghost & Zombie Parade Grabbing Jollaman!
// ===========================================================================
export const GhostZombieParadeSvg: React.FC<{
  grabbing: boolean;
  walkTime: number;
}> = ({ grabbing, walkTime }) => {
  const sway = Math.sin(walkTime * 7) * 5;
  const ghostBob = Math.sin(walkTime * 5.5) * 7;
  const grabOffset = grabbing ? 22 : 0;

  const ZombieSprite = ({ x, flip = 1 }: { x: number; flip?: number }) => (
    <g transform={`translate(${x}, ${sway * 0.4}) scale(${flip}, 1)`}>
      {/* Legs shuffling */}
      <line x1="-6" y1="14" x2="-10" y2="44" stroke="#365314" strokeWidth="6" strokeLinecap="round" />
      <line x1="6" y1="14" x2="10" y2="44" stroke="#365314" strokeWidth="6" strokeLinecap="round" />
      {/* Tattered Shirt Torso */}
      <rect x="-12" y="-16" width="24" height="32" rx="6" fill="#4D7C0F" stroke="#1A2E05" strokeWidth="2.5" />
      {/* Outstretched Zombie Arms */}
      <line x1="8" y1="-10" x2="30" y2="-14" stroke="#84CC16" strokeWidth="6" strokeLinecap="round" />
      <line x1="8" y1="-2" x2="28" y2="-4" stroke="#65A30D" strokeWidth="5.5" strokeLinecap="round" />
      {/* Goofy Green Zombie Head */}
      <circle cx="0" cy="-32" r="16" fill="#84CC16" stroke="#1A2E05" strokeWidth="3" />
      <circle cx="6" cy="-34" r="4.5" fill="#FEF08A" stroke="#1A2E05" strokeWidth="1.5" />
      <circle cx="7" cy="-34" r="1.8" fill="#DC2626" />
      <path d="M-2 -24 Q6 -21 10 -25" fill="none" stroke="#1A2E05" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );

  const SheetGhostSprite = ({ x, y, flip = 1 }: { x: number; y: number; flip?: number }) => (
    <g transform={`translate(${x}, ${y}) scale(${flip}, 1)`}>
      <path
        d="M-24 22 Q-24 -28 0 -28 Q24 -28 24 22 Q16 12 8 22 Q0 12 -8 22 Q-16 12 -24 22 Z"
        fill="#FFFFFF"
        fillOpacity="0.92"
        stroke="#6366F1"
        strokeWidth="3"
      />
      <circle cx="-7" cy="-10" r="3.5" fill="#1E1B4B" />
      <circle cx="7" cy="-10" r="3.5" fill="#1E1B4B" />
      <ellipse cx="0" cy="0" rx="5" ry="6" fill="#1E1B4B" />
      {/* Ghost Reaching Arm */}
      <path d="M18 0 Q30 -4 34 4" fill="none" stroke="#6366F1" strokeWidth="4" strokeLinecap="round" />
    </g>
  );

  return (
    <g>
      {/* Parade Banner */}
      <g transform="translate(0, -148)">
        <rect x="-112" y="-18" width="224" height="34" rx="10" fill="#581C87" stroke="#E9D5FF" strokeWidth="2.5" />
        <text x="0" y="5" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FEF08A">
          👻 귀신 · 좀비 퍼레이드!
        </text>
      </g>

      {/* Marching Zombies on Outer Flanks */}
      <ZombieSprite x={-115 + grabOffset * 0.6} flip={1} />
      <ZombieSprite x={120 - grabOffset * 0.6} flip={-1} />

      {/* Two Sheet Ghosts Swooping in & Grabbing Jollaman's Arms! */}
      <SheetGhostSprite x={-62 + grabOffset} y={-28 + ghostBob} flip={1} />
      <SheetGhostSprite x={64 - grabOffset} y={-28 - ghostBob} flip={-1} />
    </g>
  );
};

// ===========================================================================
// 8. ㅄ (없다) — Dead-End Park Wall + "출구 없음" Signpost!
// ===========================================================================
export const NoExitSignPlazaSvg: React.FC<{
  revealed: boolean;
}> = ({ revealed }) => (
  <g>
    {/* Solid Dead-End Brick Wall blocking the path */}
    <rect x="-10" y="-128" width="94" height="130" rx="4" fill="#475569" stroke="#1E293B" strokeWidth="3.5" />
    {[-100, -72, -44, -16].map((by) => (
      <line key={by} x1="-10" y1={by} x2="84" y2={by} stroke="#64748B" strokeWidth="2.5" opacity="0.65" />
    ))}
    {/* Signpost */}
    <rect x="-54" y="-88" width="8" height="90" fill="#94A3B8" stroke="#1E293B" strokeWidth="2" />
    <rect
      x="-98"
      y="-132"
      width="96"
      height="48"
      rx="10"
      fill={revealed ? '#EF4444' : '#FACC15'}
      stroke="#0F172A"
      strokeWidth="3"
    />
    <text x="-50" y="-102" textAnchor="middle" fontSize="16" fontWeight="900" fill={revealed ? '#FFFFFF' : '#0F172A'}>
      {revealed ? '출구 없음!' : '출구 → ?'}
    </text>
  </g>
);

// ===========================================================================
// 4. ㄺ (닭) — Swagger Rooster + Golden Egg Nest!
// ===========================================================================
export const CrazyRoosterSvg: React.FC<{
  walkTime: number;
  flying: boolean;
  angry?: boolean;
}> = ({ walkTime, flying, angry = false }) => {
  const wing = flying ? Math.sin(walkTime * 42) * 18 : 0;
  return (
    <g>
      <line x1="-6" y1="16" x2="-8" y2="30" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
      <line x1="6" y1="16" x2="8" y2="30" stroke="#EA580C" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="0" cy="0" rx="24" ry="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
      {/* Dramatic Tail Feathers */}
      <path d="M18 -4 L38 -22 L30 -4 L40 -6 L24 8 Z" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
      {/* Bright Red Comb */}
      <path d="M-22 -26 Q-18 -38 -11 -28 Q-5 -38 -2 -24" fill="#EF4444" stroke="#991B1B" strokeWidth="2.2" />
      <circle cx="-14" cy="-15" r="12.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.8" />
      {/* Wild Googly Eye + Angry Brow */}
      <circle cx="-17" cy="-17" r="5" fill="#FEF08A" stroke="#0F172A" strokeWidth="1.6" />
      <circle cx="-18" cy="-17" r="2.2" fill="#0F172A" />
      {angry && <path d="M-24 -24 L-12 -19" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />}
      <polygon points="-25,-15 -38,-11 -25,-6" fill="#F59E0B" stroke="#B45309" strokeWidth="2" />
      <ellipse cx="-21" cy="-4" rx="4" ry="5.5" fill="#EF4444" />
      <ellipse
        cx="2"
        cy={-2 + wing * 0.45}
        rx="14"
        ry="8"
        fill="#F1F5F9"
        stroke="#334155"
        strokeWidth="2.4"
      />
    </g>
  );
};

export const GoldenEggNestSvg: React.FC<{ hasEgg: boolean }> = ({ hasEgg }) => (
  <g>
    {/* Cozy Straw Nest */}
    <ellipse cx="0" cy="14" rx="44" ry="14" fill="#F59E0B" stroke="#92400E" strokeWidth="3" />
    <path d="M-36 12 Q0 24 36 12" fill="none" stroke="#B45309" strokeWidth="3" />
    {hasEgg && (
      <g transform="translate(0, -4)">
        <ellipse cx="0" cy="0" rx="16" ry="21" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
        <ellipse cx="-5" cy="-7" rx="4" ry="7" transform="rotate(-15, -5, -7)" fill="#FEF9C3" opacity="0.8" />
      </g>
    )}
  </g>
);

// ===========================================================================
// 5. ㄻ (굶다) — Empty Double-Door Fridge + Belly Vacuum Tornado!
// ===========================================================================
export const EmptyFridgeSvg: React.FC<{ isOpen: boolean; walkTime: number }> = ({ isOpen, walkTime }) => (
  <g>
    {/* Fridge Body */}
    <rect x="-42" y="-128" width="84" height="128" rx="8" fill="#E2E8F0" stroke="#475569" strokeWidth="3.5" />
    {isOpen ? (
      <g>
        {/* Pitch-Dark Empty Interior + Cobweb */}
        <rect x="-34" y="-118" width="68" height="110" rx="4" fill="#1E293B" />
        <line x1="-34" y1="-82" x2="34" y2="-82" stroke="#475569" strokeWidth="2.5" />
        <line x1="-34" y1="-44" x2="34" y2="-44" stroke="#475569" strokeWidth="2.5" />
        {/* Cobweb */}
        <path d="M-34 -118 Q-12 -100 -34 -84 M-34 -118 L-6 -90" stroke="#CBD5E1" strokeWidth="1.5" fill="none" />
        {/* Swung-open Fridge Door */}
        <rect x="34" y="-128" width="26" height="128" rx="4" fill="#CBD5E1" stroke="#475569" strokeWidth="3" />
        {/* Tiny Fluttering Moth (Pure SVG) */}
        <g transform={`translate(${-6 + Math.sin(walkTime * 14) * 14}, ${-68 + Math.cos(walkTime * 12) * 10})`}>
          <ellipse cx="-6" cy="-2" rx="6" ry="4" transform="rotate(-22, -6, -2)" fill="#CBD5E1" stroke="#475569" strokeWidth="1.2" />
          <ellipse cx="6" cy="-2" rx="6" ry="4" transform="rotate(22, 6, -2)" fill="#CBD5E1" stroke="#475569" strokeWidth="1.2" />
          <ellipse cx="0" cy="0" rx="2.5" ry="5.5" fill="#475569" />
        </g>
      </g>
    ) : (
      <g>
        <line x1="-42" y1="-78" x2="42" y2="-78" stroke="#64748B" strokeWidth="3" />
        <rect x="-32" y="-104" width="6" height="18" rx="3" fill="#64748B" />
        <rect x="-32" y="-66" width="6" height="26" rx="3" fill="#64748B" />
      </g>
    )}
  </g>
);

export const BellyTornadoSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g>
    {[0, 1, 2, 3, 4, 5].map((i) => {
      const y = 30 - i * 32;
      const w = 18 + i * 16 + Math.sin(walkTime * 20 + i) * 8;
      const xShift = Math.sin(walkTime * 18 + i * 0.9) * 14;
      return (
        <ellipse
          key={i}
          cx={xShift}
          cy={y}
          rx={w}
          ry="10"
          fill="none"
          stroke={i % 2 === 0 ? '#38BDF8' : '#E0F2FE'}
          strokeWidth="5"
          opacity="0.88"
        />
      );
    })}
  </g>
);

// ===========================================================================
// 6. ㄼ (밟다) — Sticky Pink Bubblegum Trap + Giant Bubblegum Splat!
// ===========================================================================
export const BubblegumTrapSvg: React.FC<{
  spread: number; // 0..1 while stretching
  bubbleSize: number; // 0..1 before POP
  popped: boolean;
}> = ({ spread, bubbleSize, popped }) => (
  <g>
    <ellipse cx="0" cy="4" rx={26 + spread * 46} ry="8" fill="#F472B6" stroke="#BE185D" strokeWidth="2.8" />
    {spread > 0.1 && !popped && (
      <path
        d={`M${-spread * 52} -2 Q0 ${10} ${spread * 52} -2`}
        fill="none"
        stroke="#EC4899"
        strokeWidth="10"
        strokeLinecap="round"
      />
    )}
    {bubbleSize > 0.05 && !popped && (
      <g transform={`translate(0, ${-32 - bubbleSize * 28}) scale(${bubbleSize})`}>
        <circle cx="0" cy="0" r="52" fill="#F9A8D4" fillOpacity="0.82" stroke="#DB2777" strokeWidth="3.5" />
        <ellipse cx="-18" cy="-18" rx="14" ry="8" transform="rotate(-30, -18, -18)" fill="#FFFFFF" opacity="0.7" />
      </g>
    )}
  </g>
);

export const BubblegumFaceSplatSvg: React.FC = () => (
  <g>
    {/* Gooey Pink Bubblegum Splat stuck over Jollaman's head & torso! */}
    <path
      d="M-22 -48 Q0 -60 22 -48 Q28 -30 18 -20 Q6 -12 0 -22 Q-10 -10 -20 -22 Q-28 -34 -22 -48 Z"
      fill="#F472B6"
      stroke="#BE185D"
      strokeWidth="2.8"
    />
    <ellipse cx="-8" cy="-42" rx="6" ry="3.5" transform="rotate(-20, -8, -42)" fill="#FBCFE8" opacity="0.85" />
    <path d="M-8 -18 Q-6 -4 -2 -16" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
    <path d="M10 -20 Q14 -6 16 -18" fill="#F472B6" stroke="#BE185D" strokeWidth="2" />
  </g>
);

// ===========================================================================
// 8. ㄾ (핥다) — Giant 3-Scoop Ice Cream + Giant Slobber Dog!
// ===========================================================================
export const GiantIceCreamConeSvg: React.FC<{ licked?: boolean }> = ({ licked = false }) => (
  <g>
    <polygon points="-12,0 12,0 0,28" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
    {!licked ? (
      <>
        <circle cx="0" cy="-6" r="13" fill="#FDA4AF" stroke="#BE123C" strokeWidth="2.2" />
        <circle cx="0" cy="-20" r="11" fill="#A7F3D0" stroke="#059669" strokeWidth="2.2" />
        <circle cx="0" cy="-32" r="9" fill="#FEF9C3" stroke="#CA8A04" strokeWidth="2.2" />
        <circle cx="0" cy="-42" r="4" fill="#EF4444" />
      </>
    ) : (
      <path d="M-9 0 Q0 -6 9 0" fill="#FDA4AF" stroke="#BE123C" strokeWidth="1.8" />
    )}
  </g>
);

export const CutePassingPuppySvg: React.FC<{ licking: boolean; walkTime: number }> = ({
  licking,
  walkTime,
}) => {
  const tailWag = Math.sin(walkTime * 20) * 14;
  const pawStep = Math.sin(walkTime * 16) * 4;
  return (
    <g>
      {/* Fluffy Wagging Corgi Tail */}
      <ellipse
        cx="38"
        cy={-16 + tailWag * 0.25}
        rx="11"
        ry="7"
        transform={`rotate(${-25 + tailWag}, 38, -16)`}
        fill="#FDE68A"
        stroke="#B45309"
        strokeWidth="2.5"
      />
      {/* Cute Short Legs */}
      <rect x="16" y="4" width="11" height="22" rx="5.5" fill="#F59E0B" stroke="#92400E" strokeWidth="2.4" />
      <rect x="-14" y={4 + pawStep * 0.5} width="11" height="22" rx="5.5" fill="#F59E0B" stroke="#92400E" strokeWidth="2.4" />
      {/* Plump Cute Cream/Caramel Body */}
      <ellipse cx="6" cy="-6" rx="34" ry="20" fill="#FBBF24" stroke="#92400E" strokeWidth="2.8" />
      <ellipse cx="-2" cy="1" rx="22" ry="12" fill="#FEF3C7" />
      {/* Little Red Collar + Bell */}
      <path d="M-18 -18 Q-12 -6 -4 -2" fill="none" stroke="#EF4444" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="-12" cy="-7" r="4" fill="#FACC15" stroke="#B45309" strokeWidth="1.5" />

      {/* Cute Puppy Head (facing left toward ice cream!) */}
      <g transform="translate(-26, -24)">
        {/* Perky Cute Corgi Ears */}
        <polygon points="-10,-16 -18,-36 -2,-22" fill="#F59E0B" stroke="#92400E" strokeWidth="2.4" strokeLinejoin="round" />
        <polygon points="8,-16 14,-36 0,-22" fill="#F59E0B" stroke="#92400E" strokeWidth="2.4" strokeLinejoin="round" />
        {/* Round Fluffy Face */}
        <circle cx="0" cy="0" r="21" fill="#FDE68A" stroke="#92400E" strokeWidth="2.8" />
        {/* Rosy Cheeks */}
        <circle cx="-6" cy="5" r="4" fill="#FDA4AF" opacity="0.7" />
        <circle cx="10" cy="5" r="4" fill="#FDA4AF" opacity="0.7" />
        {/* Big Sparkly Puppy Eyes */}
        <circle cx="-9" cy="-4" r="3.6" fill="#0F172A" />
        <circle cx="-10" cy="-5.5" r="1.4" fill="#FFFFFF" />
        <circle cx="5" cy="-4" r="3.6" fill="#0F172A" />
        <circle cx="4" cy="-5.5" r="1.4" fill="#FFFFFF" />
        {/* Tiny Button Nose & Smile */}
        <ellipse cx="-3" cy="2" rx="3.5" ry="2.5" fill="#1E293B" />
        <path d="M-9 7 Q-3 12 3 7" fill="none" stroke="#78350F" strokeWidth="2" strokeLinecap="round" />

        {/* Cute Pink Tongue (stretches playfully to slurp ice cream!) */}
        {licking ? (
          <path
            d="M-6 8 Q-36 10 -46 -12 Q-38 -18 -30 -8 Q-20 4 -2 11 Z"
            fill="#FB7185"
            stroke="#BE123C"
            strokeWidth="2.4"
          />
        ) : (
          <path d="M-5 8 Q-7 16 -1 16 Q3 16 2 8 Z" fill="#FB7185" stroke="#BE123C" strokeWidth="1.8" />
        )}
      </g>
    </g>
  );
};

// ===========================================================================
// 9. ㄿ (읊다) — Poetry Stand Mic + Swallowed Megaphone Belly Waves!
// ===========================================================================
export const PoetryMicStandSvg: React.FC<{ hasMicHead: boolean }> = ({ hasMicHead }) => (
  <g>
    <ellipse cx="0" cy="0" rx="18" ry="5" fill="#334155" />
    <line x1="0" y1="0" x2="0" y2="-82" stroke="#64748B" strokeWidth="4.5" strokeLinecap="round" />
    {hasMicHead && (
      <g transform="translate(-4, -84) rotate(-25)">
        <rect x="-4" y="0" width="8" height="16" rx="2" fill="#1E293B" />
        <circle cx="0" cy="-4" r="9" fill="#CBD5E1" stroke="#334155" strokeWidth="2.5" />
      </g>
    )}
  </g>
);

// ===========================================================================
// 13. 읽고 (ㄺ+ㄱ→ㄹ 예외) — Giant Spellbook + Superhero ㄹ Bonking Twin ㄱ!
// ===========================================================================
export const MagicSpellbookIlkkoSvg: React.FC<{
  phaseT: number;
  heroActive: boolean;
  resolved: boolean;
  walkTime: number;
}> = ({ phaseT, heroActive, resolved, walkTime }) => {
  const kickJump = heroActive && !resolved ? Math.sin(phaseT * Math.PI * 3) * 14 : 0;
  return (
    <g>
      {/* Floating Glowing Rule Tiles: 읽 + 고 -> [일꼬] */}
      <g transform="translate(0, -112)">
        {/* Left Syllable Block: 읽 / 일 */}
        <rect x="-92" y="-44" width="84" height="88" rx="14" fill="#FEF3C7" stroke="#D97706" strokeWidth="3.8" />
        <text x="-50" y="6" textAnchor="middle" fontSize="34" fontWeight="900" fill="#0F172A">
          {resolved ? '일' : '익?'}
        </text>
        {!resolved && (
          <text x="-50" y="34" textAnchor="middle" fontSize="16" fontWeight="900" fill="#DC2626">
            ㄺ + ㄱ!
          </text>
        )}

        {/* Right Syllable Block: 고 -> 꼬 */}
        <rect x="8" y="-44" width="84" height="88" rx="14" fill={resolved ? '#DCFCE7' : '#DBEAFE'} stroke={resolved ? '#16A34A' : '#2563EB'} strokeWidth="3.8" />
        <text x="50" y="14" textAnchor="middle" fontSize="40" fontWeight="900" fill={resolved ? '#15803D' : '#1D4ED8'}>
          {resolved ? '꼬' : '고'}
        </text>
      </g>

      {/* Superhero ㄹ flexing + Red Cape! */}
      {heroActive && (
        <g transform={`translate(-10, ${-34 - kickJump})`}>
          <polygon points="-24,-10 -56,-28 -48,14" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
          <rect x="-22" y="-22" width="44" height="44" rx="10" fill="#22C55E" stroke="#0F172A" strokeWidth="3" />
          <text x="0" y="10" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FFFFFF">
            ㄹ
          </text>
        </g>
      )}

      {/* Booted Small ㄱ flying away knocked out! */}
      {resolved && (
        <g transform={`translate(${95 + Math.sin(walkTime * 6) * 6}, -176) rotate(32)`}>
          <rect x="-15" y="-15" width="30" height="30" rx="6" fill="#FEE2E2" stroke="#DC2626" strokeWidth="2.5" />
          <text x="0" y="7" textAnchor="middle" fontSize="18" fontWeight="900" fill="#DC2626">
            ㄱ
          </text>
        </g>
      )}
    </g>
  );
};

// ===========================================================================
// 14. 많아 (ㅎ+모음 → ㅎ탈락 연음) — ㅎ Ghost Poofs + ㄴ Vaults to Empty ㅇ!
// ===========================================================================
export const HieutGhostManaSvg: React.FC<{
  dropped: boolean;
  linked: boolean;
  walkTime: number;
}> = ({ dropped, linked, walkTime }) => {
  const ghostY = dropped ? -180 - Math.sin(walkTime * 8) * 12 : -76;
  return (
    <g>
      {/* Left Syllable Card [만] / [마] */}
      <g transform="translate(-44, -104)">
        <rect x="-38" y="-42" width="76" height="84" rx="14" fill="#FFFFFF" stroke="#2563EB" strokeWidth="3.5" />
        <text x="0" y="10" textAnchor="middle" fontSize="42" fontWeight="900" fill="#0F172A">
          {linked ? '마' : '많'}
        </text>
      </g>

      {/* Right Syllable Card [아] -> [나] */}
      <g transform="translate(64, -104)">
        <rect x="-38" y="-42" width="76" height="84" rx="14" fill={linked ? '#DBEAFE' : '#FEF9C3'} stroke={linked ? '#1D4ED8' : '#D97706'} strokeWidth="3.5" />
        <text x="0" y="10" textAnchor="middle" fontSize="42" fontWeight="900" fill={linked ? '#1D4ED8' : '#0F172A'}>
          {linked ? '나' : '아'}
        </text>
      </g>

      {/* Timid Ghostly ㅎ floating up and vanishing! */}
      <g transform={`translate(-36, ${ghostY})`} opacity={dropped ? 0.55 : 0.95}>
        <path d="M-18 14 Q-18 -20 0 -20 Q18 -20 18 14 Q9 6 0 14 Q-9 6 -18 14 Z" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.8" />
        <text x="0" y="4" textAnchor="middle" fontSize="20" fontWeight="900" fill="#0369A1">
          ㅎ
        </text>
        {dropped && (
          <text x="26" y="-12" fontSize="14" fontWeight="900" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" style={{ paintOrder: 'stroke fill' }}>
            탈락 뿅!
          </text>
        )}
      </g>
    </g>
  );
};

// ===========================================================================
// 15. 많고 (ㅎ+파열음 → 거센소리 축약) — Cannonball ㅎ + ㄱ Fusion Explosion → [만코]!
// ===========================================================================
export const HieutCannonballMankoSvg: React.FC<{
  charging: boolean;
  fused: boolean;
  walkTime: number;
}> = ({ charging, fused, walkTime }) => {
  const pulse = Math.sin(walkTime * 22) * 4;
  return (
    <g>
      {/* Left Syllable [만] */}
      <g transform="translate(-44, -104)">
        <rect x="-38" y="-42" width="76" height="84" rx="14" fill="#FFFFFF" stroke="#DC2626" strokeWidth="3.5" />
        <text x="0" y="10" textAnchor="middle" fontSize="42" fontWeight="900" fill="#0F172A">
          {fused ? '만' : '많'}
        </text>
      </g>

      {/* Right Syllable [고] -> [코] */}
      <g transform={`translate(${64 + (fused ? 6 : 0)}, ${-104 + (charging && !fused ? pulse * 0.4 : 0)})`}>
        <rect x="-38" y="-42" width="76" height="84" rx="14" fill={fused ? '#FEF08A' : '#FEE2E2'} stroke="#DC2626" strokeWidth="4" />
        <text x="0" y="10" textAnchor="middle" fontSize="44" fontWeight="900" fill="#B91C1C">
          {fused ? '코' : '고'}
        </text>
      </g>

      {/* Fiery Cannonball ㅎ launching right to fuse with ㄱ! */}
      {!fused && (
        <g transform={`translate(${charging ? 20 : -36}, -82)`}>
          <circle cx="0" cy="0" r="19" fill="#EF4444" stroke="#FACC15" strokeWidth="3.5" />
          <text x="0" y="7" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">
            ㅎ
          </text>
        </g>
      )}

      {/* Lightning Fusion Badge ㅎ+ㄱ=ㅋ!! */}
      {fused && (
        <g transform="translate(12, -162)">
          <rect x="-64" y="-18" width="128" height="36" rx="12" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
          <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="900" fill="#B91C1C">
            ㅎ+ㄱ = ㅋ!!
          </text>
        </g>
      )}
    </g>
  );
};
