import React from 'react';

export type Episode3CharKey = 'ㄲ' | 'ㄸ' | 'ㅃ' | 'ㅆ' | 'ㅉ';

export type Episode3ThemeKey =
  | 'default'
  | 'sunset'
  | 'farm'
  | 'nightmarket'
  | 'city'
  | 'kitchen'
  | 'jungle'
  | 'beach'
  | 'bakery'
  | 'space'
  | 'waterpark'
  | 'hospital'
  | 'railway'
  | 'thunderstorm'
  | 'savannah'
  | 'stadium'
  | 'disco';

/**
 * Dynamic 2D Cartoon World Backdrop that transforms sky, ground, props & atmosphere per episode!
 */
export const DynamicEpisode3Backdrop: React.FC<{
  theme: Episode3ThemeKey;
  scrollOffset: number;
  walkTime: number;
  terrainMode?: 'road' | 'river';
}> = ({ theme, scrollOffset, walkTime, terrainMode = 'road' }) => {
  const skyColors: Record<Episode3ThemeKey, [string, string]> = {
    default: ['#7DD3FC', '#E0F2FE'],
    sunset: ['#F97316', '#FDE047'],
    farm: ['#38BDF8', '#FEF9C3'],
    nightmarket: ['#1E1B4B', '#312E81'],
    city: ['#475569', '#94A3B8'],
    kitchen: ['#991B1B', '#FCA5A5'],
    jungle: ['#065F46', '#6EE7B7'],
    beach: ['#0EA5E9', '#BAE6FD'],
    bakery: ['#FBCFE8', '#FEF3C7'],
    space: ['#09090B', '#3B0764'],
    waterpark: ['#0284C7', '#7DD3FC'],
    hospital: ['#CCFBF1', '#F8FAFC'],
    railway: ['#60A5FA', '#FEF3C7'],
    thunderstorm: ['#0F172A', '#475569'],
    savannah: ['#EA580C', '#FDE68A'],
    stadium: ['#0369A1', '#BAE6FD'],
    disco: ['#090517', '#1E1B4B'],
  };

  const [skyTop, skyBot] = skyColors[theme];

  return (
    <g>
      <defs>
        <linearGradient id={`ep3Sky-${theme}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>

      {/* Sky Canvas */}
      <rect x="0" y="-80" width="1000" height="452" fill={`url(#ep3Sky-${theme})`} />

      {/* Theme-specific Distant Background Layer */}
      {theme === 'sunset' && (
        <g>
          <circle cx="880" cy="240" r="64" fill="#FDE047" opacity="0.88" />
          <g transform={`translate(${-(scrollOffset * 0.18) % 1000}, 0)`}>
            {[0, 1000].map((off) => (
              <g key={off} transform={`translate(${off}, 0)`}>
                {[90, 210, 350, 520, 680, 840].map((tx, idx) => (
                  <g key={idx} transform={`translate(${tx}, 330)`}>
                    <rect x="-8" y="-85" width="16" height="85" fill="#451A03" />
                    <circle cx="0" cy="-95" r="34" fill="#7C2D12" />
                  </g>
                ))}
              </g>
            ))}
          </g>
        </g>
      )}

      {theme === 'farm' && (
        <g>
          <circle cx="910" cy="52" r="28" fill="#FDE047" />
          <path d="M0 335 Q250 265 520 330 T1000 325 L1000 350 L0 350 Z" fill="#86EFAC" />
          {/* Red Barn Silhouette */}
          <g transform="translate(760, 250)">
            <polygon points="0,30 50,0 100,30 100,90 0,90" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
            <rect x="34" y="48" width="32" height="42" fill="#FEF3C7" stroke="#7F1D1D" strokeWidth="2.5" />
            <line x1="34" y1="48" x2="66" y2="90" stroke="#7F1D1D" strokeWidth="2" />
            <line x1="66" y1="48" x2="34" y2="90" stroke="#7F1D1D" strokeWidth="2" />
          </g>
          {/* Wooden Ranch Fence */}
          {Array.from({ length: 12 }).map((_, i) => (
            <g key={i} transform={`translate(${i * 90 - (scrollOffset * 0.45) % 90}, 306)`}>
              <rect x="0" y="0" width="10" height="32" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
              <rect x="-45" y="10" width="90" height="6" fill="#D97706" />
            </g>
          ))}
        </g>
      )}

      {theme === 'nightmarket' && (
        <g>
          {/* Twinkling Night Stars */}
          {[70, 190, 310, 460, 620, 770, 910].map((sx, idx) => (
            <circle key={idx} cx={sx} cy={35 + (idx % 3) * 28} r="2.5" fill="#FEF08A" opacity={0.6 + Math.sin(walkTime * 5 + idx) * 0.35} />
          ))}
          {/* Festooned Glowing Bulb String */}
          <path d="M0 165 Q250 205 500 165 T1000 165" fill="none" stroke="#F8FAFC" strokeWidth="2.5" />
          {[60, 160, 260, 360, 460, 560, 660, 760, 860, 960].map((lx, idx) => (
            <circle
              key={lx}
              cx={lx}
              cy={175 + Math.sin(lx * 0.012) * 18}
              r="7.5"
              fill={idx % 2 === 0 ? '#FDE047' : '#FB7185'}
            />
          ))}
          {/* Market Stall Canopies */}
          {[140, 520, 840].map((mx, i) => (
            <g key={i} transform={`translate(${mx}, 240)`}>
              <rect x="-65" y="0" width="130" height="96" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
              <polygon points="-75,0 75,0 65,-28 -65,-28" fill={i % 2 === 0 ? '#EF4444' : '#F59E0B'} stroke="#0F172A" strokeWidth="2.5" />
            </g>
          ))}
        </g>
      )}

      {theme === 'city' && (
        <g>
          {[60, 190, 320, 480, 630, 790, 900].map((cx, i) => (
            <g key={i} transform={`translate(${cx}, ${170 + (i % 3) * 35})`}>
              <rect x="0" y="0" width="95" height="190" fill="#334155" stroke="#1E293B" strokeWidth="2.5" />
              {[0, 1, 2].map((r) =>
                [0, 1].map((c) => (
                  <rect key={`${r}-${c}`} x={16 + c * 38} y={18 + r * 32} width="22" height="18" fill="#FEF08A" opacity="0.7" />
                ))
              )}
            </g>
          ))}
        </g>
      )}

      {theme === 'kitchen' && (
        <g>
          {/* Red & Gold Chinese Restaurant Hanging Lanterns */}
          {[140, 380, 620, 860].map((lx) => (
            <g key={lx} transform={`translate(${lx}, 168)`}>
              <line x1="0" y1="-250" x2="0" y2="-18" stroke="#FACC15" strokeWidth="2.5" />
              <ellipse cx="0" cy="0" rx="22" ry="28" fill="#EF4444" stroke="#991B1B" strokeWidth="2.8" />
              <rect x="-10" y="-31" width="20" height="7" fill="#FACC15" />
              <rect x="-10" y="25" width="20" height="7" fill="#FACC15" />
              <text x="0" y="6" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FEF08A">福</text>
            </g>
          ))}
          <rect x="0" y="250" width="1000" height="100" fill="#7F1D1D" opacity="0.35" />
        </g>
      )}

      {theme === 'jungle' && (
        <g>
          {/* Lush Tropical Leaves & Falling Cartoon Raindrops */}
          <path d="M0 330 Q200 260 400 325 T800 320 T1000 330 L1000 355 L0 355 Z" fill="#047857" />
          {[120, 280, 440, 600, 760, 910].map((rx, idx) => (
            <line
              key={rx}
              x1={rx}
              y1={(walkTime * 220 + idx * 50) % 300}
              x2={rx - 8}
              y2={((walkTime * 220 + idx * 50) % 300) + 18}
              stroke="#A7F3D0"
              strokeWidth="2.2"
              opacity="0.75"
            />
          ))}
          {/* Lily Pads in Pond */}
          <ellipse cx="760" cy="340" rx="45" ry="10" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
        </g>
      )}

      {theme === 'beach' && (
        <g>
          <circle cx="900" cy="54" r="30" fill="#FDE047" />
          {/* Sparkling Ocean Horizon */}
          <rect x="0" y="255" width="1000" height="90" fill="#0284C7" />
          <path d="M0 285 Q120 272 240 285 T480 285 T720 285 T1000 285" fill="none" stroke="#BAE6FD" strokeWidth="4" />
          {/* Palm Tree Silhouette on Right */}
          <g transform="translate(880, 330)">
            <path d="M0 0 Q18 -70 8 -140" fill="none" stroke="#78350F" strokeWidth="14" strokeLinecap="round" />
            <path d="M8 -140 Q-40 -165 -65 -130 Q-25 -140 8 -140 Z" fill="#16A34A" />
            <path d="M8 -140 Q55 -168 78 -132 Q38 -142 8 -140 Z" fill="#22C55E" />
          </g>
        </g>
      )}

      {theme === 'bakery' && (
        <g>
          {/* Pastel Checkered Bakery Kitchen Wall */}
          {Array.from({ length: 12 }).map((_, i) => (
            <rect key={i} x={i * 90} y="160" width="45" height="180" fill="#FDE68A" opacity="0.32" />
          ))}
          {/* Giant Bakery Display Shelf */}
          <rect x="70" y="230" width="160" height="14" rx="4" fill="#D97706" />
          <circle cx="115" cy="212" r="18" fill="#F472B6" stroke="#9D174D" strokeWidth="2.5" />
          <circle cx="175" cy="212" r="18" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
        </g>
      )}

      {theme === 'space' && (
        <g>
          {/* Twinkling Starfield & Ringed Planet */}
          {[40, 110, 185, 250, 330, 410, 495, 575, 665, 745, 835, 920].map((sx, i) => (
            <circle
              key={sx}
              cx={sx}
              cy={25 + ((i * 53) % 270)}
              r={i % 3 === 0 ? 3 : 1.8}
              fill="#FFFFFF"
              opacity={0.45 + Math.abs(Math.sin(walkTime * 3 + i)) * 0.55}
            />
          ))}
          <g transform="translate(860, 210)">
            <circle cx="0" cy="0" r="36" fill="#A855F7" stroke="#581C87" strokeWidth="2.5" />
            <ellipse cx="0" cy="2" rx="64" ry="13" fill="none" stroke="#FDE047" strokeWidth="5" transform="rotate(-18)" />
          </g>
        </g>
      )}

      {theme === 'waterpark' && (
        <g>
          <circle cx="920" cy="52" r="28" fill="#FDE047" />
          <path d="M0 320 Q180 270 360 320 T720 320 T1000 320 L1000 355 L0 355 Z" fill="#38BDF8" />
          <rect x="0" y="310" width="1000" height="35" fill="#06B6D4" opacity="0.6" />
        </g>
      )}

      {theme === 'hospital' && (
        <g>
          {/* Clean Hospital Corridor Tiles & Red Cross Sign */}
          <line x1="0" y1="245" x2="1000" y2="245" stroke="#99F6E4" strokeWidth="5" />
          <g transform="translate(860, 195)">
            <circle cx="0" cy="0" r="32" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="3" />
            <rect x="-7" y="-20" width="14" height="40" rx="3" fill="#EF4444" />
            <rect x="-20" y="-7" width="40" height="14" rx="3" fill="#EF4444" />
          </g>
        </g>
      )}

      {theme === 'railway' && (
        <g>
          {/* Distant Train Crossing Warning Signal & Hills */}
          <path d="M0 330 Q220 260 440 325 T900 320 L1000 330 L1000 355 L0 355 Z" fill="#86EFAC" />
          <g transform="translate(815, 225)">
            <rect x="-5" y="0" width="10" height="115" fill="#475569" />
            <rect x="-26" y="4" width="52" height="16" rx="4" fill="#1E293B" />
            <circle cx="-12" cy="12" r="5.5" fill={Math.floor(walkTime * 6) % 2 === 0 ? '#EF4444' : '#7F1D1D'} />
            <circle cx="12" cy="12" r="5.5" fill={Math.floor(walkTime * 6) % 2 === 1 ? '#EF4444' : '#7F1D1D'} />
            <line x1="-22" y1="-16" x2="22" y2="2" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
            <line x1="22" y1="-16" x2="-22" y2="2" stroke="#FACC15" strokeWidth="6" strokeLinecap="round" />
          </g>
        </g>
      )}

      {theme === 'thunderstorm' && (
        <g>
          {/* Flashing Thunder Clouds */}
          {[140, 420, 740].map((cx, idx) => (
            <g key={cx} transform={`translate(${cx}, ${140 + (idx % 2) * 20})`}>
              <ellipse cx="0" cy="0" rx="74" ry="26" fill="#334155" />
              <ellipse cx="-34" cy="12" rx="44" ry="20" fill="#1E293B" />
              <ellipse cx="38" cy="10" rx="48" ry="20" fill="#1E293B" />
            </g>
          ))}
        </g>
      )}

      {theme === 'savannah' && (
        <g>
          <circle cx="890" cy="220" r="68" fill="#FEF08A" opacity="0.88" />
          {/* Iconic Acacia Tree Silhouettes */}
          {[140, 740].map((ax, i) => (
            <g key={i} transform={`translate(${ax}, 332)`}>
              <path d="M0 0 Q8 -45 2 -95" stroke="#78350F" strokeWidth="10" fill="none" strokeLinecap="round" />
              <ellipse cx="2" cy="-98" rx="68" ry="15" fill="#15803D" />
            </g>
          ))}
        </g>
      )}

      {theme === 'stadium' && (
        <g>
          {/* Stadium Outfield Wall + Glowing Light Towers */}
          <rect x="0" y="270" width="1000" height="70" fill="#15803D" />
          <rect x="0" y="264" width="1000" height="8" fill="#FACC15" />
          {[130, 870].map((lx) => (
            <g key={lx} transform={`translate(${lx}, 160)`}>
              <rect x="-5" y="0" width="10" height="110" fill="#475569" />
              <rect x="-28" y="-22" width="56" height="24" rx="4" fill="#1E293B" />
              {[-18, -6, 6, 18].map((bx) => (
                <circle key={bx} cx={bx} cy="-10" r="4" fill="#FEF08A" />
              ))}
            </g>
          ))}
        </g>
      )}

      {theme === 'disco' && (
        <g>
          {/* Dimmed stars / club atmosphere */}
          {[75, 220, 380, 560, 740, 895].map((sx, idx) => (
            <circle
              key={sx}
              cx={sx}
              cy={36 + (idx % 3) * 32}
              r="2.4"
              fill="#FDE047"
              opacity={0.35 + Math.abs(Math.sin(walkTime * 6 + idx)) * 0.55}
            />
          ))}
          {/* Sweeping colorful disco spotlight beams */}
          <polygon
            points={`500,90 ${180 + Math.sin(walkTime * 5) * 90},372 ${310 + Math.sin(walkTime * 5) * 90},372`}
            fill="#EC4899"
            opacity="0.22"
          />
          <polygon
            points={`500,90 ${440 + Math.cos(walkTime * 4.5) * 90},372 ${580 + Math.cos(walkTime * 4.5) * 90},372`}
            fill="#38BDF8"
            opacity="0.22"
          />
          <polygon
            points={`500,90 ${700 - Math.sin(walkTime * 5.2) * 90},372 ${830 - Math.sin(walkTime * 5.2) * 90},372`}
            fill="#FACC15"
            opacity="0.20"
          />
        </g>
      )}

      {theme === 'default' && (
        <g>
          <circle cx="945" cy="44" r="24" fill="#FDE047" opacity="0.9" />
          <g transform={`translate(${-(scrollOffset * 0.2) % 1000}, 0)`}>
            {[0, 1000].map((offset) => (
              <g key={offset} transform={`translate(${offset}, 0)`}>
                <path d="M0 330 Q180 245 360 320 T720 315 T1000 325 L1000 350 L0 350 Z" fill="#86EFAC" />
                <path d="M0 335 Q250 275 500 332 T1000 328 L1000 355 L0 355 Z" fill="#4ADE80" />
              </g>
            ))}
          </g>
        </g>
      )}

      {/* Ground Strip & Scrolling Track (or Scenic River for ㄷ) */}
      {terrainMode === 'river' ? (
        <g>
          {/* Left & Right Lush Green Riverbanks */}
          <rect x="0" y="332" width="255" height="36" fill="#4ADE80" />
          <rect x="645" y="332" width="355" height="36" fill="#4ADE80" />
          <rect x="0" y="368" width="255" height="175" fill="#92400E" />
          <rect x="645" y="368" width="355" height="175" fill="#92400E" />
          <rect x="0" y="364" width="255" height="8" fill="#16A34A" />
          <rect x="645" y="364" width="355" height="8" fill="#16A34A" />
          {/* Stone Embankments */}
          <rect x="242" y="348" width="18" height="195" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          <rect x="640" y="348" width="18" height="195" fill="#64748B" stroke="#334155" strokeWidth="2.5" />
          {/* Sparkling Flowing Blue River Gorge */}
          <rect x="260" y="356" width="380" height="188" fill="#0284C7" />
          <path
            d={`M260 384 Q${315 + Math.sin(walkTime * 5) * 14} 374 370 384 T490 384 T640 384`}
            fill="none"
            stroke="#BAE6FD"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={`M260 416 Q${330 - Math.sin(walkTime * 4.5) * 14} 406 400 416 T530 416 T640 416`}
            fill="none"
            stroke="#7DD3FC"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path
            d={`M260 442 Q${320 + Math.cos(walkTime * 4) * 12} 434 385 442 T510 442 T640 442`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        </g>
      ) : (
        <g>
          <rect
            x="0"
            y="332"
            width="1000"
            height="36"
            fill={
              theme === 'beach'
                ? '#FDE68A'
                : theme === 'space'
                ? '#334155'
                : theme === 'hospital'
                ? '#E2E8F0'
                : theme === 'kitchen'
                ? '#FDBA74'
                : theme === 'waterpark'
                ? '#22D3EE'
                : theme === 'savannah'
                ? '#FACC15'
                : theme === 'thunderstorm' || theme === 'disco'
                ? '#334155'
                : '#4ADE80'
            }
          />
          <rect x="0" y="362" width="1000" height="10" fill={theme === 'disco' ? '#6366F1' : '#CBD5E1'} />
          <rect
            x="0"
            y="372"
            width="1000"
            height="172"
            fill={
              theme === 'beach'
                ? '#FCD34D'
                : theme === 'space' || theme === 'disco'
                ? '#1E293B'
                : theme === 'hospital'
                ? '#CBD5E1'
                : theme === 'kitchen'
                ? '#9A3412'
                : '#475569'
            }
          />
          {Array.from({ length: 20 }).map((_, i) => {
            const rawX = i * 58 - (scrollOffset % 58);
            return (
              <rect
                key={i}
                x={rawX}
                y="404"
                width="32"
                height="7"
                rx="3"
                fill={
                  theme === 'space'
                    ? '#A855F7'
                    : theme === 'disco'
                    ? ['#EC4899', '#38BDF8', '#FACC15', '#A855F7'][i % 4]
                    : theme === 'hospital'
                    ? '#FFFFFF'
                    : '#FDE047'
                }
                opacity="0.85"
              />
            );
          })}
          <line x1="0" y1="376" x2="1000" y2="376" stroke="#94A3B8" strokeWidth="3" />
        </g>
      )}
    </g>
  );
};

/** ㄲ: Giant Angry Boss Crow + Mini Crow Swarm */
export const CrowFlockSvg: React.FC<{ walkTime: number; attacking?: boolean }> = ({
  walkTime,
  attacking = false,
}) => {
  const wing = Math.sin(walkTime * 34) * 26;
  return (
    <g>
      {/* Mini Crows circling */}
      {[-65, 55].map((cx, idx) => (
        <g key={idx} transform={`translate(${cx}, ${-45 + Math.sin(walkTime * 14 + idx * 2) * 16}) scale(0.55)`}>
          <path d={`M-28 ${-wing} Q-10 -20 0 0 Q10 -20 28 ${-wing}`} fill="none" stroke="#0F172A" strokeWidth="7" strokeLinecap="round" />
          <ellipse cx="0" cy="4" rx="16" ry="12" fill="#1E293B" />
          <polygon points="-14,0 -32,4 -14,8" fill="#F59E0B" />
        </g>
      ))}
      {/* Giant Boss Crow */}
      <g transform={`translate(0, ${attacking ? Math.sin(walkTime * 30) * 8 : 0})`}>
        <path
          d={`M10 -8 Q45 ${-48 + wing} 76 ${-18 + wing} Q38 8 10 8 Z`}
          fill="#0F172A"
          stroke="#334155"
          strokeWidth="2.5"
        />
        <ellipse cx="0" cy="4" rx="34" ry="26" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
        <circle cx="-20" cy="-16" r="19" fill="#1E293B" stroke="#0F172A" strokeWidth="3.5" />
        {/* Sharp Yellow Beak */}
        <polygon points="-36,-20 -66,-12 -36,-4" fill="#F59E0B" stroke="#92400E" strokeWidth="2.5" />
        {/* Fierce Red/White Crow Eye */}
        <circle cx="-25" cy="-20" r="6" fill="#FFFFFF" />
        <circle cx="-27" cy="-20" r="2.8" fill="#DC2626" />
        <path d="M-34 -28 L-16 -24" stroke="#F8FAFC" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  );
};

/** ㄸ: Cute Comic Puppy walking out of alley + Steaming Cartoon Poop Pile */
export const CuteWalkingDogSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const step = Math.sin(walkTime * 22) * 10;
  const tailWag = Math.sin(walkTime * 26) * 14;
  return (
    <g>
      {/* Tail wagging cheerfully */}
      <path d={`M-24 2 Q-38 ${-14 + tailWag * 0.5} -34 -24`} fill="none" stroke="#92400E" strokeWidth="6" strokeLinecap="round" />
      {/* Walking Legs */}
      <line x1="-14" y1="12" x2={-16 + step} y2="32" stroke="#D97706" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="-4" y1="12" x2={-4 - step} y2="32" stroke="#B45309" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="12" y1="12" x2={12 - step} y2="32" stroke="#D97706" strokeWidth="6.5" strokeLinecap="round" />
      <line x1="20" y1="12" x2={20 + step} y2="32" stroke="#B45309" strokeWidth="6.5" strokeLinecap="round" />
      {/* Plump Golden Puppy Body */}
      <ellipse cx="2" cy="4" rx="26" ry="15" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
      <ellipse cx="-6" cy="2" rx="8" ry="6" fill="#92400E" opacity="0.65" />
      {/* Red Collar */}
      <line x1="16" y1="-8" x2="22" y2="8" stroke="#EF4444" strokeWidth="4.5" strokeLinecap="round" />
      {/* Cute Puppy Head facing Right */}
      <circle cx="28" cy="-12" r="15" fill="#FBBF24" stroke="#78350F" strokeWidth="2.8" />
      {/* Floppy Brown Ear */}
      <ellipse cx="21" cy="-12" rx="5.5" ry="11" transform="rotate(14, 21, -12)" fill="#92400E" stroke="#451A03" strokeWidth="2" />
      {/* Eye, Nose & Happy Smile */}
      <circle cx="34" cy="-15" r="2.6" fill="#0F172A" />
      <circle cx="42" cy="-11" r="3" fill="#0F172A" />
      <path d="M34 -6 Q38 -3 41 -7" fill="none" stroke="#451A03" strokeWidth="2" strokeLinecap="round" />
    </g>
  );
};

export const SteamingPoopPileSvg: React.FC<{ walkTime: number; squished?: boolean }> = ({
  walkTime,
  squished = false,
}) => (
  <g transform={squished ? 'scale(1.35, 0.55)' : undefined}>
    {/* Stink steam lines */}
    <path
      d={`M-8 -28 Q${-12 + Math.sin(walkTime * 10) * 4} -38 -8 -48`}
      fill="none"
      stroke="#84CC16"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d={`M8 -26 Q${12 - Math.sin(walkTime * 9) * 4} -36 8 -46`}
      fill="none"
      stroke="#84CC16"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Swirly Cartoon Poop */}
    <path
      d="M-20 4 Q-22 -7 -12 -7 Q-15 -16 -6 -16 Q-6 -24 0 -29 Q6 -24 6 -16 Q15 -16 12 -7 Q22 -7 20 4 Z"
      fill="#92400E"
      stroke="#451A03"
      strokeWidth="2.8"
      strokeLinejoin="round"
    />
    <path d="M-7 -9 Q0 -13 6 -9" fill="none" stroke="#FDE68A" strokeWidth="1.8" strokeLinecap="round" />
  </g>
);

/** ㅃ: Ribbon-and-Skirt Lady Jollaman (with animated walk, slap swing & kissing lean) */
export const RibbonGirlJollamanSvg: React.FC<{
  facing?: 1 | -1;
  isWalking?: boolean;
  slapDeg?: number;
  kissing?: boolean;
  walkTime: number;
}> = ({ facing = -1, isWalking = false, slapDeg = 0, kissing = false, walkTime }) => {
  const step = isWalking ? Math.sin(walkTime * 12) * 14 : 0;
  return (
    <g transform={`scale(${facing}, 1)`}>
      {/* Legs */}
      <line x1="-5" y1="16" x2={-8 + step} y2="48" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
      <ellipse cx={-6 + step} cy="49" rx="7" ry="4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
      <line x1="5" y1="16" x2={8 - step} y2="48" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
      <ellipse cx={10 - step} cy="49" rx="7" ry="4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />

      {/* Cute Flared Pink Skirt */}
      <polygon points="-8,-6 8,-6 22,22 -22,22" fill="#F472B6" stroke="#9D174D" strokeWidth="3" strokeLinejoin="round" />
      {/* Torso */}
      <line x1="0" y1="-19" x2="0" y2="-6" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />

      {/* Back Arm */}
      <line x1="0" y1="-14" x2={-18 - step * 0.4} y2="6" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
      <circle cx={-18 - step * 0.4} cy="6" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

      {/* Front Slapping Arm */}
      <g transform={`rotate(${slapDeg}, 0, -14)`}>
        <line x1="0" y1="-14" x2="22" y2="-8" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
        <circle cx="24" cy="-8" r="4.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      </g>

      {/* Head + Big Cute Bow Ribbon */}
      <circle cx="0" cy="-35" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
      {/* Pink Hair Bow Ribbon */}
      <g transform="translate(-4, -52) rotate(-14)">
        <polygon points="0,0 -13,-8 -13,8" fill="#EC4899" stroke="#831843" strokeWidth="2.2" strokeLinejoin="round" />
        <polygon points="0,0 13,-8 13,8" fill="#EC4899" stroke="#831843" strokeWidth="2.2" strokeLinejoin="round" />
        <circle cx="0" cy="0" r="4" fill="#F472B6" stroke="#831843" strokeWidth="2" />
      </g>
      {/* Eyelashes & Expression */}
      <circle cx="6" cy="-37" r="2.3" fill="#0F172A" />
      <path d="M5 -41 L9 -44 M7 -40 L12 -42" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
      {kissing ? (
        <path d="M12 -31 Q16 -33 14 -29 Q16 -26 12 -28" fill="none" stroke="#EC4899" strokeWidth="2.6" strokeLinecap="round" />
      ) : (
        <path d="M3 -29 Q8 -26 12 -30" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
      )}
    </g>
  );
};

/** ㅃ: Cool Cap-Wearing Other Jollaman */
export const CapBoyJollamanSvg: React.FC<{ blushing?: boolean }> = ({ blushing = false }) => (
  <g>
    {/* Legs & Sneakers */}
    <line x1="-2" y1="14" x2="-12" y2="48" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
    <ellipse cx="-14" cy="49" rx="8" ry="4.5" fill="#2563EB" stroke="#0F172A" strokeWidth="2.2" />
    <line x1="2" y1="14" x2="12" y2="48" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
    <ellipse cx="10" cy="49" rx="8" ry="4.5" fill="#2563EB" stroke="#0F172A" strokeWidth="2.2" />
    {/* Torso & Arms */}
    <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
    <line x1="0" y1="-12" x2="-18" y2="10" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
    <circle cx="-18" cy="10" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
    <line x1="0" y1="-12" x2="18" y2="10" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
    <circle cx="18" cy="10" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
    {/* Head */}
    <circle cx="0" cy="-35" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
    {/* Cool Baseball Cap facing Left */}
    <path d="M-17 -39 Q0 -58 17 -39 Z" fill="#2563EB" stroke="#1E3A8A" strokeWidth="2.5" />
    <path d="M-28 -38 L-4 -39 L-12 -34 Z" fill="#1D4ED8" stroke="#1E3A8A" strokeWidth="2" strokeLinejoin="round" />
    {/* Eyes & Rosy Blush when kissed */}
    <circle cx="-6" cy="-34" r="2.3" fill="#0F172A" />
    <path d="M-10 -27 Q-5 -23 0 -27" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
    {blushing && <circle cx="-10" cy="-30" r="4.5" fill="#F472B6" opacity="0.65" />}
  </g>
);

/** ㅃ & ㅆ: Heartbroken Jollaman fallen onto his knees in utter despair! */
export const KneelingDespairJollamanSvg: React.FC = () => (
  <g>
    {/* Dramatic Anime Gloom Stripes over head */}
    <line x1="-18" y1="-44" x2="-18" y2="-22" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <line x1="-11" y1="-48" x2="-11" y2="-20" stroke="#2563EB" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />
    <line x1="-4" y1="-44" x2="-4" y2="-22" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" opacity="0.7" />

    {/* Kneeling Legs bent back on ground (y=48 level) */}
    <path d="M-18 28 L-4 46 L-28 46" fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="-30" cy="46" rx="7" ry="4" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
    {/* Slumped Forward Torso */}
    <path d="M-14 28 Q-2 8 10 4" fill="none" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
    {/* Arms planted weakly on floor in defeat */}
    <path d="M8 6 L20 28 L24 46" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="46" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
    {/* Drooping Head staring down at floor */}
    <circle cx="20" cy="-6" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
    <path d="M16 -22 Q20 -30 25 -23" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M22 -8 L28 -5" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
    <path d="M19 1 Q24 -3 27 1" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
  </g>
);

/** ㅆ: Garbage Truck (optionally carrying Jollaman inside the back!) */
export const GarbageTruckSvg: React.FC<{ walkTime: number; carryingJollaman?: boolean }> = ({
  walkTime,
  carryingJollaman = false,
}) => {
  const wheelSpin = walkTime * 360;
  return (
    <g>
      {/* Jollaman peeking safely from open top of truck bed when scooped! */}
      {carryingJollaman && (
        <g transform="translate(26, -64)">
          <line x1="0" y1="0" x2="0" y2="14" stroke="#0F172A" strokeWidth="5" />
          <line x1="0" y1="4" x2="-14" y2="-10" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <line x1="0" y1="4" x2="14" y2="-10" stroke="#0F172A" strokeWidth="4" strokeLinecap="round" />
          <circle cx="0" cy="-14" r="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="-4" cy="-16" r="2" fill="#0F172A" />
          <circle cx="4" cy="-16" r="2" fill="#0F172A" />
          <ellipse cx="0" cy="-8" rx="3.5" ry="4" fill="#EF4444" stroke="#0F172A" strokeWidth="1.4" />
        </g>
      )}
      {/* Back Trash Hopper */}
      <rect x="-25" y="-58" width="115" height="66" rx="8" fill="#16A34A" stroke="#14532D" strokeWidth="3.5" />
      <text x="32" y="-22" textAnchor="middle" fontSize="18" fontWeight="900" fill="#FFFFFF">청소차</text>
      <text x="32" y="-8" textAnchor="middle" fontSize="10" fontWeight="800" fill="#DCFCE7">TRUCK</text>
      {/* Truck Cab Facing Left */}
      <path d="M-85 -38 L-25 -38 L-25 8 L-92 8 L-92 -12 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="3.5" strokeLinejoin="round" />
      <polygon points="-78,-30 -35,-30 -35,-10 -84,-10" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2" />
      {/* Truck Wheels */}
      {[-62, 52].map((wx) => (
        <g key={wx} transform={`translate(${wx}, 14) rotate(${wheelSpin})`}>
          <circle cx="0" cy="0" r="15" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
          <circle cx="0" cy="0" r="6" fill="#CBD5E1" />
          <line x1="-10" y1="0" x2="10" y2="0" stroke="#94A3B8" strokeWidth="2" />
        </g>
      ))}
    </g>
  );
};

/** ㅉ: Kind Friend Jollaman ("짝꿍") walking over & putting warm arm around shoulder */
export const BuddyJollamanSvg: React.FC<{
  isWalking?: boolean;
  hugging?: boolean;
  walkTime: number;
}> = ({ isWalking = false, hugging = false, walkTime }) => {
  const step = isWalking ? Math.sin(walkTime * 10) * 14 : 0;
  return (
    <g>
      {/* Legs */}
      <line x1="-2" y1="14" x2={-12 + step} y2="48" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
      <ellipse cx={-15 + step} cy="49" rx="8" ry="4.5" fill="#10B981" stroke="#0F172A" strokeWidth="2.2" />
      <line x1="2" y1="14" x2={12 - step} y2="48" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
      <ellipse cx={9 - step} cy="49" rx="8" ry="4.5" fill="#10B981" stroke="#0F172A" strokeWidth="2.2" />
      {/* Torso + Friendly Teal Scarf */}
      <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M-12 -18 Q0 -12 12 -18 L10 -11 Q0 -5 -10 -11 Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="2" />
      <path d="M4 -12 L10 4 L4 6 L0 -10 Z" fill="#14B8A6" stroke="#0F766E" strokeWidth="1.8" />
      {/* Right Arm */}
      <line x1="0" y1="-12" x2={18 - step * 0.4} y2="10" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      <circle cx={18 - step * 0.4} cy="10" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      {/* Left Arm: stretches leftward around Jollaman's shoulder ("어깨동무") when hugging! */}
      {hugging ? (
        <g>
          <path d="M0 -12 Q-22 -24 -44 -14" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <circle cx="-46" cy="-14" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : (
        <g>
          <line x1="0" y1="-12" x2={-18 + step * 0.4} y2="10" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
          <circle cx={-18 + step * 0.4} cy="10" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      )}
      {/* Head with Warm Cheerful Smile */}
      <circle cx="0" cy="-35" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
      <path d="M-4 -51 Q0 -59 5 -52" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
      <path d="M-9 -37 Q-6 -41 -3 -37 M3 -37 Q6 -41 9 -37" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M-7 -28 Q-1 -23 5 -28" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
    </g>
  );
};

