import React from 'react';

export type BatchimKey = 'ㄱ' | 'ㄴ' | 'ㄷ' | 'ㄹ' | 'ㅁ' | 'ㅂ' | 'ㅇ';

/**
 * Scenic Backdrop for Jollaman 5 (Upgraded Representative Batchim Slapstick Edition)
 * Features a sunny coastal boardwalk during walking mode, plus 7 bespoke movie sets (ㄱ ~ ㅇ).
 */
export const BatchimBackdrop: React.FC<{
  activeChar: BatchimKey;
  isWalkingMode: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeChar, isWalkingMode, walkTime, scrollOffset = 0 }) => {
  const wrap = (x: number, span = 1100) => (((x - scrollOffset * 0.28) % span) + span) % span - 50;

  if (isWalkingMode) {
    return (
      <g>
        <defs>
          <linearGradient id="b5WalkSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
          <linearGradient id="b5WalkSea" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#2DD4BF" />
          </linearGradient>
        </defs>

        <rect x="0" y="-80" width="1000" height="352" fill="url(#b5WalkSky)" />
        <circle cx="885" cy="145" r="36" fill="#FEF08A" opacity="0.45" />
        <circle cx="885" cy="145" r="26" fill="#FDE047" />
        <rect x="0" y="268" width="1000" height="84" fill="url(#b5WalkSea)" />

        {[120, 310, 520, 740, 900].map((wx, idx) => (
          <path
            key={wx}
            d={`M${wx + Math.sin(walkTime * 1.8 + idx) * 14} ${288 + (idx % 2) * 16} q22 -6 44 0`}
            fill="none"
            stroke="#E0F2FE"
            strokeWidth="3.5"
            strokeLinecap="round"
            opacity="0.75"
          />
        ))}

        <g transform={`translate(${660 + Math.sin(walkTime * 0.35) * 35}, 266)`}>
          <path d="M-24 0 L24 0 L16 11 L-16 11 Z" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
          <line x1="0" y1="0" x2="0" y2="-36" stroke="#FFFFFF" strokeWidth="3" />
          <polygon points="2,-34 2,-5 24,-5" fill="#FFFFFF" />
          <polygon points="-2,-28 -2,-5 -18,-5" fill="#FEF3C7" />
        </g>

        {[72, 932].map((px, idx) => (
          <g key={px} transform={`translate(${px}, 352) scale(${idx === 0 ? 1 : -1}, 1)`}>
            <path d="M0 0 Q10 -78 -4 -148" fill="none" stroke="#92400E" strokeWidth="11" strokeLinecap="round" />
            <path d="M-4 -148 Q-44 -165 -58 -134 Q-28 -140 -4 -148 Z" fill="#16A34A" />
            <path d="M-4 -148 Q38 -166 52 -132 Q22 -142 -4 -148 Z" fill="#22C55E" />
            <path d="M-4 -148 Q-22 -190 12 -184 Q8 -165 -4 -148 Z" fill="#15803D" />
          </g>
        ))}

        <path d="M0 340 Q280 330 560 342 T1000 336 L1000 545 L0 545 Z" fill="#FDE68A" />
        <rect x="0" y="366" width="1000" height="46" fill="#D97706" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#78350F" strokeWidth="3" />
        <line x1="0" y1="412" x2="1000" y2="412" stroke="#78350F" strokeWidth="2.5" />
        {Array.from({ length: 20 }).map((_, idx) => (
          <line key={idx} x1={idx * 52} y1="366" x2={idx * 52} y2="412" stroke="#92400E" strokeWidth="2" opacity="0.55" />
        ))}
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㄱ (박 · 수박): Sunny Summer Watermelon Farm & Picnic Patch
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄱ') {
    return (
      <g>
        <defs>
          <linearGradient id="b5WatermelonSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#0284C7" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b5WatermelonSky)" />
        <circle cx="885" cy="115" r="42" fill="#FEF08A" opacity="0.5" />
        <circle cx="885" cy="115" r="28" fill="#FDE047" />
        {[170, 520, 770].map((cx, idx) => (
          <g key={cx} transform={`translate(${wrap(cx) + Math.sin(walkTime * 0.4 + idx) * 10}, ${74 + (idx % 2) * 18})`} opacity="0.9">
            <circle cx="-18" cy="6" r="16" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="22" fill="#FFFFFF" />
            <circle cx="20" cy="6" r="16" fill="#FFFFFF" />
          </g>
        ))}

        {/* Distant Barn & Green Rolling Hills */}
        <path d="M0 320 Q260 258 550 308 T1000 296 L1000 356 L0 356 Z" fill="#86EFAC" />
        <g transform={`translate(${wrap(780)}, 244)`}>
          <polygon points="-40,18 0,-18 40,18" fill="#991B1B" stroke="#7F1D1D" strokeWidth="2.5" />
          <rect x="-34" y="18" width="68" height="44" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2.5" />
          <rect x="-12" y="34" width="24" height="28" fill="#FEF3C7" stroke="#78350F" strokeWidth="2" />
          <line x1="-12" y1="34" x2="12" y2="62" stroke="#78350F" strokeWidth="2" />
          <line x1="12" y1="34" x2="-12" y2="62" stroke="#78350F" strokeWidth="2" />
        </g>

        {/* Wooden Farm Fence */}
        <rect x="0" y="316" width="1000" height="7" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
        <rect x="0" y="334" width="1000" height="7" fill="#D97706" stroke="#78350F" strokeWidth="1.5" />
        {Array.from({ length: 13 }).map((_, idx) => (
          <rect key={idx} x={idx * 82 + 12} y="302" width="12" height="50" rx="3" fill="#B45309" stroke="#78350F" strokeWidth="1.5" />
        ))}

        {/* Lush Watermelon Farm Ground + Little Farm Melons */}
        <rect x="0" y="352" width="1000" height="195" fill="#22C55E" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDE68A" opacity="0.88" />
        {[120, 620, 880].map((mx) => (
          <g key={mx} transform={`translate(${mx}, 354)`}>
            <ellipse cx="0" cy="0" rx="22" ry="15" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
            <path d="M-8 -13 Q-12 0 -8 13 M0 -15 Q-2 0 0 15 M8 -13 Q12 0 8 13" stroke="#14532D" strokeWidth="3" fill="none" />
          </g>
        ))}
        {/* Red Checkered Picnic Mat around action spot */}
        <g transform="translate(360, 384)">
          <polygon points="-135,-18 135,-18 165,24 -165,24" fill="#FCA5A5" stroke="#DC2626" strokeWidth="2.5" />
          {[-100, -50, 0, 50, 100].map((gx) => (
            <line key={gx} x1={gx} y1="-18" x2={gx * 1.18} y2="24" stroke="#EF4444" strokeWidth="10" opacity="0.35" />
          ))}
        </g>
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㄴ (눈): Snowy Alpine Hilltop & Ski Slope (Avalanche Ready!)
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄴ') {
    return (
      <g>
        <defs>
          <linearGradient id="b5SnowSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#64748B" />
            <stop offset="65%" stopColor="#CBD5E1" />
            <stop offset="100%" stopColor="#F1F5F9" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="440" fill="url(#b5SnowSky)" />

        {/* Towering Snowy Mountain Peaks & Steep Right Avalanche Slope */}
        <polygon points="40,352 210,165 390,352" fill="#94A3B8" stroke="#64748B" strokeWidth="2" />
        <polygon points="210,165 152,228 210,215 268,228" fill="#FFFFFF" />
        <polygon points="340,352 540,140 760,352" fill="#CBD5E1" stroke="#94A3B8" strokeWidth="2" />
        <polygon points="540,140 472,214 540,200 608,214" fill="#FFFFFF" />
        {/* Steep Snowy Slope sweeping down from right! */}
        <path d="M560 352 Q760 295 1000 135 L1000 366 L560 366 Z" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="3" />

        {/* Frosted Pine Trees */}
        {[95, 290, 480, 680].map((tx, idx) => (
          <g key={tx} transform={`translate(${tx}, ${348 - (idx === 3 ? 22 : 0)}) scale(${0.85 + (idx % 2) * 0.2})`}>
            <rect x="-6" y="-10" width="12" height="22" fill="#78350F" />
            <polygon points="0,-78 -28,-32 28,-32" fill="#15803D" />
            <polygon points="0,-78 -18,-50 0,-56 18,-50" fill="#FFFFFF" />
            <polygon points="0,-46 -36,-6 36,-6" fill="#166534" />
            <polygon points="0,-46 -22,-22 0,-28 22,-22" fill="#FFFFFF" />
          </g>
        ))}

        {/* Ground & Left Snowbank */}
        <rect x="0" y="352" width="1000" height="195" fill="#F8FAFC" />
        <rect x="0" y="366" width="1000" height="46" fill="#E2E8F0" />
        <ellipse cx="145" cy="364" rx="85" ry="28" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="3" />

        {/* Swirling Winter Blizzard Snowflakes */}
        {[70, 155, 240, 325, 410, 495, 580, 665, 750, 835, 920].map((sx, idx) => (
          <circle
            key={sx}
            cx={(sx - walkTime * (55 + (idx % 3) * 18) + 2000) % 1000}
            cy={(walkTime * (95 + (idx % 4) * 15) + idx * 45) % 368}
            r={3 + (idx % 3) * 1.4}
            fill="#FFFFFF"
            opacity="0.9"
          />
        ))}
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㄷ (숟 · 숟가락): Cozy Warm Giant Kitchen Dining Table
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄷ') {
    return (
      <g>
        <defs>
          <linearGradient id="b5KitchenWall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#FEF3C7" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
          <linearGradient id="b5KitchenTable" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#D97706" />
            <stop offset="100%" stopColor="#92400E" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b5KitchenWall)" />
        {/* Warm Kitchen Tile Backsplash */}
        <rect x="0" y="220" width="1000" height="132" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="2" />
        {Array.from({ length: 16 }).map((_, idx) => (
          <line key={idx} x1={idx * 64} y1="220" x2={idx * 64} y2="352" stroke="#FDE68A" strokeWidth="2" />
        ))}
        <line x1="0" y1="264" x2="1000" y2="264" stroke="#FDE68A" strokeWidth="2" />
        <line x1="0" y1="308" x2="1000" y2="308" stroke="#FDE68A" strokeWidth="2" />

        {/* Kitchen Window & Hanging Utensils */}
        <g transform="translate(740, 128)">
          <rect x="0" y="0" width="145" height="92" rx="10" fill="#BAE6FD" stroke="#92400E" strokeWidth="5" />
          <line x1="72.5" y1="0" x2="72.5" y2="92" stroke="#FFFFFF" strokeWidth="4" />
          <line x1="0" y1="46" x2="145" y2="46" stroke="#FFFFFF" strokeWidth="4" />
        </g>
        {/* Wall Shelf with Spice Jars */}
        <rect x="115" y="182" width="190" height="10" rx="4" fill="#B45309" />
        <rect x="140" y="150" width="22" height="32" rx="5" fill="#EF4444" stroke="#7F1D1D" strokeWidth="2" />
        <rect x="180" y="154" width="20" height="28" rx="4" fill="#22C55E" stroke="#14532D" strokeWidth="2" />
        <rect x="222" y="148" width="24" height="34" rx="5" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />

        {/* Giant Warm Wood Dining Table Surface */}
        <rect x="0" y="352" width="1000" height="195" fill="url(#b5KitchenTable)" />
        <line x1="0" y1="352" x2="1000" y2="352" stroke="#78350F" strokeWidth="4" />
        {/* Checkered Table Runner */}
        <rect x="0" y="366" width="1000" height="48" fill="#FEF9C3" opacity="0.92" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#EA580C" strokeWidth="3" />
        <line x1="0" y1="414" x2="1000" y2="414" stroke="#EA580C" strokeWidth="3" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㄹ (칼): Sunset Bamboo Duel Grounds (Sword Slash Training Arena!)
  // -------------------------------------------------------------------------
  if (activeChar === 'ㄹ') {
    return (
      <g>
        <defs>
          <linearGradient id="b5SwordSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="55%" stopColor="#9A3412" />
            <stop offset="100%" stopColor="#FDBA74" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b5SwordSky)" />

        {/* Dramatic Crimson-Gold Setting Sun */}
        <circle cx="500" cy="215" r="78" fill="#FEF08A" opacity="0.22" />
        <circle cx="500" cy="215" r="54" fill="#F97316" opacity="0.58" />

        {/* Distant Misty Mountain Silhouette */}
        <path d="M0 330 L180 230 L340 310 L560 218 L760 302 L1000 235 L1000 356 L0 356 Z" fill="#334155" opacity="0.72" />

        {/* Swaying Bamboo Grove Silhouettes */}
        {[85, 138, 690, 748, 865, 928].map((bx, idx) => {
          const sway = Math.sin(walkTime * 1.4 + idx) * 3;
          return (
            <g key={bx} transform={`translate(${bx}, 352)`}>
              <path d={`M0 0 Q${sway} -140 ${sway * 1.6} -290`} fill="none" stroke="#14532D" strokeWidth="10" />
              {[-60, -120, -180, -240].map((ny) => (
                <line key={ny} x1={sway * 0.6 - 7} y1={ny} x2={sway * 0.6 + 7} y2={ny} stroke="#86EFAC" strokeWidth="2.5" opacity="0.65" />
              ))}
              <ellipse cx={sway + 18} cy="-155" rx="20" ry="6" transform={`rotate(-18, ${sway + 18}, -155)`} fill="#16A34A" opacity="0.85" />
              <ellipse cx={sway - 16} cy="-205" rx="18" ry="5.5" transform={`rotate(20, ${sway - 16}, -205)`} fill="#22C55E" opacity="0.82" />
            </g>
          );
        })}

        {/* Dojo Wooden Railing */}
        <rect x="0" y="324" width="1000" height="7" fill="#78350F" />
        {Array.from({ length: 11 }).map((_, idx) => (
          <rect key={idx} x={idx * 95 + 18} y="314" width="10" height="40" rx="2" fill="#451A03" />
        ))}

        {/* Warm Earthen Training Arena Floor */}
        <rect x="0" y="352" width="1000" height="195" fill="#B45309" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDE68A" opacity="0.88" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#78350F" strokeWidth="3" />
        <line x1="0" y1="412" x2="1000" y2="412" stroke="#78350F" strokeWidth="2.5" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㅁ (곰): Deep Bear Pine Forest with Hanging Beehive!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㅁ') {
    return (
      <g>
        <defs>
          <linearGradient id="b5ForestSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#14532D" />
            <stop offset="55%" stopColor="#166534" />
            <stop offset="100%" stopColor="#86EFAC" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="436" fill="url(#b5ForestSky)" />

        {/* Golden Sunbeams filtering through trees */}
        <polygon points="180,-80 300,-80 440,352 290,352" fill="#FEF08A" opacity="0.14" />
        <polygon points="530,-80 640,-80 820,352 670,352" fill="#FEF08A" opacity="0.12" />

        {/* Tall Pine & Oak Tree Trunks */}
        {[90, 245, 590, 765, 920].map((tx, idx) => (
          <g key={tx} transform={`translate(${tx}, 0)`}>
            <rect x="-18" y="80" width="36" height="276" fill={idx % 2 === 0 ? '#78350F' : '#92400E'} />
            <circle cx="0" cy="70" r="64" fill={idx % 2 === 0 ? '#15803D' : '#16A34A'} />
            <circle cx="-36" cy="95" r="46" fill="#166534" />
            <circle cx="38" cy="92" r="46" fill="#22C55E" />
          </g>
        ))}

        {/* Hanging Golden Beehive with Buzzing Bees on Tree Branch! */}
        <g transform="translate(590, 148)">
          <rect x="-5" y="-28" width="10" height="28" fill="#78350F" />
          <ellipse cx="0" cy="14" rx="22" ry="26" fill="#FACC15" stroke="#B45309" strokeWidth="3" />
          <path d="M-19 6 H19 M-21 16 H21 M-16 26 H16" stroke="#B45309" strokeWidth="2.5" />
          <circle cx="6" cy="16" r="5" fill="#451A03" />
          <g transform={`translate(${28 + Math.sin(walkTime * 14) * 8}, ${Math.cos(walkTime * 16) * 8})`}>
            <ellipse cx="-2" cy="-5" rx="4" ry="5.5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" opacity="0.88" />
            <ellipse cx="3" cy="-4.5" rx="3.5" ry="5" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1" opacity="0.88" />
            <ellipse cx="0" cy="1" rx="7" ry="4.5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.4" />
            <line x1="-2" y1="-3" x2="-2" y2="5" stroke="#0F172A" strokeWidth="1.8" />
            <line x1="2.5" y1="-3" x2="2.5" y2="5" stroke="#0F172A" strokeWidth="1.8" />
          </g>
        </g>

        {/* Mossy Bushes & Dirt Trail */}
        <rect x="0" y="352" width="1000" height="195" fill="#16A34A" />
        <rect x="0" y="366" width="1000" height="46" fill="#D97706" opacity="0.82" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#78350F" strokeWidth="2.5" opacity="0.6" />
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㅂ (삽): Sunny Construction & Excavation Dig Site!
  // -------------------------------------------------------------------------
  if (activeChar === 'ㅂ') {
    return (
      <g>
        <defs>
          <linearGradient id="b5DigSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#E0F2FE" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="432" fill="url(#b5DigSky)" />

        {/* Fluff clouds */}
        {[200, 620, 860].map((cx, idx) => (
          <g key={cx} transform={`translate(${wrap(cx) + Math.sin(walkTime * 0.35 + idx) * 8}, ${82 + (idx % 2) * 18})`} opacity="0.9">
            <circle cx="-16" cy="5" r="14" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="20" fill="#FFFFFF" />
            <circle cx="18" cy="5" r="14" fill="#FFFFFF" />
          </g>
        ))}

        {/* Distant Yellow Construction Crane Silhouette */}
        <g transform="translate(810, 290)" opacity="0.82">
          <rect x="-8" y="-120" width="16" height="182" fill="#EAB308" stroke="#A16207" strokeWidth="2" />
          <rect x="-95" y="-124" width="145" height="12" rx="3" fill="#FACC15" stroke="#A16207" strokeWidth="2" />
          <line x1="-65" y1="-112" x2="-65" y2="-75" stroke="#475569" strokeWidth="2.5" />
          <path d="M-71 -75 Q-65 -65 -59 -75" fill="none" stroke="#1E293B" strokeWidth="3" strokeLinecap="round" />
        </g>

        {/* Green Park Bushes Behind Construction Barricade */}
        <path d="M0 326 Q140 278 290 322 Q450 282 610 324 Q780 286 1000 320 L1000 356 L0 356 Z" fill="#4ADE80" />

        {/* Yellow-Black Striped Safety Barricades */}
        {[125, 675].map((bx) => (
          <g key={bx} transform={`translate(${bx}, 322)`}>
            <rect x="-56" y="0" width="112" height="16" rx="4" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
            {[-40, -14, 12, 38].map((sx) => (
              <polygon key={sx} points={`${sx},0 ${sx + 12},0 ${sx + 4},16 ${sx - 8},16`} fill="#0F172A" />
            ))}
            <rect x="-44" y="16" width="8" height="22" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
            <rect x="36" y="16" width="8" height="22" fill="#64748B" stroke="#0F172A" strokeWidth="2" />
          </g>
        ))}

        {/* Sandy Earth Excavation Ground */}
        <rect x="0" y="352" width="1000" height="195" fill="#A16207" />
        <rect x="0" y="366" width="1000" height="46" fill="#D97706" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#78350F" strokeWidth="3" />
        <line x1="0" y1="412" x2="1000" y2="412" stroke="#78350F" strokeWidth="2.5" />
        {[110, 260, 480, 740, 890].map((px, idx) => (
          <circle key={px} cx={px} cy={384 + (idx % 2) * 14} r="4.5" fill="#78350F" opacity="0.45" />
        ))}
      </g>
    );
  }

  // -------------------------------------------------------------------------
  // ㅇ (공): Neon Arcade Bowling Alley Lane
  // -------------------------------------------------------------------------
  return (
    <g>
      <defs>
        <linearGradient id="b5BowlingSky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
        <linearGradient id="b5LaneFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      <rect x="0" y="-80" width="1000" height="432" fill="url(#b5BowlingSky)" />

      {/* Neon Overhead Bowling Alley Lights */}
      {[180, 500, 820].map((nx, idx) => (
        <g key={nx} transform={`translate(${nx}, 122)`}>
          <rect x="-80" y="-12" width="160" height="24" rx="12" fill={idx === 1 ? '#EC4899' : '#38BDF8'} opacity="0.22" />
          <rect x="-65" y="-5" width="130" height="10" rx="5" fill={idx === 1 ? '#F472B6' : '#7DD3FC'} />
        </g>
      ))}

      {/* Back Pin Setter Wall */}
      <rect x="0" y="255" width="1000" height="98" fill="#0F172A" />
      <rect x="45" y="275" width="240" height="78" rx="8" fill="#1E293B" stroke="#38BDF8" strokeWidth="3" />
      <text x="165" y="318" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FDE047">
        LANE 05
      </text>

      {/* Polished Wooden Bowling Alley Lane */}
      <rect x="0" y="352" width="1000" height="195" fill="url(#b5LaneFloor)" />
      {/* Gutter edges */}
      <rect x="0" y="352" width="1000" height="10" fill="#334155" />
      <rect x="0" y="410" width="1000" height="8" fill="#334155" />
      {/* Perspective Wooden Plank Lines + Red Foul Line */}
      {[372, 384, 396].map((ly) => (
        <line key={ly} x1="0" y1={ly} x2="1000" y2={ly} stroke="#D97706" strokeWidth="1.5" opacity="0.55" />
      ))}
      <line x1="720" y1="362" x2="720" y2="410" stroke="#EF4444" strokeWidth="5" />
      {/* Classic Lane Guide Chevrons */}
      {[560, 620, 680].map((ax, idx) => (
        <polygon key={ax} points={`${ax},${378 + idx * 4} ${ax + 14},${374 + idx * 4} ${ax + 14},${382 + idx * 4}`} fill="#B45309" opacity="0.65" />
      ))}
    </g>
  );
};

// ===========================================================================
// ㄱ (박 · 수박) — Whole Watermelon -> Cracking -> Watermelon Helmet + Seeds
// ===========================================================================
export const GiantWatermelonWholeSvg: React.FC<{
  cracking?: boolean;
  walkTime: number;
  hideShadow?: boolean;
  squashX?: number;
  squashY?: number;
}> = ({ cracking = false, walkTime, hideShadow = false, squashX = 1, squashY = 1 }) => {
  const wobble = cracking ? Math.sin(walkTime * 48) * 4 : 0;
  return (
    <g transform={`translate(${wobble}, 0) scale(${squashX}, ${squashY})`}>
      {!hideShadow && <ellipse cx="0" cy="39" rx="38" ry="7" fill="#0F172A" opacity="0.22" />}
      <circle cx="0" cy="0" r="40" fill="#16A34A" stroke="#14532D" strokeWidth="4" />
      <path d="M-20 -34 Q-30 0 -20 34" fill="none" stroke="#14532D" strokeWidth="5.8" strokeLinecap="round" />
      <path d="M0 -39 Q-5 0 0 39" fill="none" stroke="#14532D" strokeWidth="5.8" strokeLinecap="round" />
      <path d="M20 -34 Q30 0 20 34" fill="none" stroke="#14532D" strokeWidth="5.8" strokeLinecap="round" />
      <path d="M0 -40 Q10 -55 22 -47" fill="none" stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" />
      {cracking && (
        <g>
          <path d="M-14 -24 L-4 -6 L-12 8 L4 22" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
          <path d="M12 -18 L4 0 L18 14" fill="none" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

export const WatermelonHelmetSvg: React.FC<{ cracked?: boolean }> = ({ cracked = false }) => (
  <g>
    {/* Hollow half-watermelon helmet dome */}
    <path
      d="M-34 8 A34 32 0 1 1 34 8 Q0 16 -34 8 Z"
      fill="#16A34A"
      stroke="#14532D"
      strokeWidth="3.5"
    />
    <path d="M-16 -22 Q-20 -4 -18 10" fill="none" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M0 -24 Q-2 -4 0 12" fill="none" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M16 -22 Q20 -4 18 10" fill="none" stroke="#14532D" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M0 -24 Q8 -38 18 -32" fill="none" stroke="#15803D" strokeWidth="4" strokeLinecap="round" />
    {/* Dripping juicy red edge */}
    <path d="M-28 9 Q-14 17 0 12 Q14 17 28 9" fill="none" stroke="#EF4444" strokeWidth="4" strokeLinecap="round" />
    {cracked && (
      <path d="M-10 -12 L0 -2 L10 -10" fill="none" stroke="#FEF08A" strokeWidth="2.5" strokeLinecap="round" />
    )}
  </g>
);

// ===========================================================================
// ㄴ (눈) — Rolling Giant Snowball Monster -> Blinking Snowman Mound!
// ===========================================================================
export const RollingSnowballMonsterSvg: React.FC<{
  rotationDeg: number;
  swallowedJolla?: boolean;
}> = ({ rotationDeg, swallowedJolla = false }) => (
  <g transform={`rotate(${rotationDeg})`}>
    <circle cx="0" cy="0" r="54" fill="#FFFFFF" stroke="#64748B" strokeWidth="4" />
    <path d="M-30 -24 Q0 -38 30 -18" fill="none" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
    <path d="M-24 20 Q8 34 34 12" fill="none" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
    <circle cx="-18" cy="4" r="5" fill="#E2E8F0" />
    <circle cx="16" cy="-14" r="4" fill="#E2E8F0" />
    {/* Flailing stickman legs & gloved hands poking out when Jollaman is swallowed inside! */}
    {swallowedJolla && (
      <g>
        <line x1="-42" y1="-26" x2="-66" y2="-40" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="-68" cy="-42" rx="8" ry="4.5" transform="rotate(-35, -68, -42)" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        <line x1="-48" y1="-10" x2="-74" y2="-16" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx="-76" cy="-17" rx="8" ry="4.5" transform="rotate(-15, -76, -17)" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        <line x1="44" y1="18" x2="68" y2="30" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="70" cy="31" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      </g>
    )}
  </g>
);

export const SnowCoveredWatermelonBallSvg: React.FC<{
  rotationDeg: number;
  snowCover: number; // 0 = pure round watermelon, 1 = full giant snowball
  swallowedJolla?: boolean;
}> = ({ rotationDeg, snowCover, swallowedJolla = false }) => {
  const c = Math.max(0, Math.min(1, snowCover));
  if (c >= 0.96) {
    return <RollingSnowballMonsterSvg rotationDeg={rotationDeg} swallowedJolla={swallowedJolla} />;
  }
  const outerR = 40 + c * 14;
  return (
    <g transform={`rotate(${rotationDeg})`}>
      {/* Base round watermelon */}
      {c < 0.88 && (
        <g opacity={Math.max(0, 1 - Math.max(0, c - 0.55) / 0.35)}>
          <circle cx="0" cy="0" r="40" fill="#16A34A" stroke="#14532D" strokeWidth="4" />
          <path d="M-20 -34 Q-30 0 -20 34" fill="none" stroke="#14532D" strokeWidth="5.8" strokeLinecap="round" />
          <path d="M0 -39 Q-5 0 0 39" fill="none" stroke="#14532D" strokeWidth="5.8" strokeLinecap="round" />
          <path d="M20 -34 Q30 0 20 34" fill="none" stroke="#14532D" strokeWidth="5.8" strokeLinecap="round" />
          <path d="M0 -40 Q10 -55 22 -47" fill="none" stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" />
        </g>
      )}
      {/* Expanding snowy shell & clumps sticking onto the rolling watermelon */}
      {c > 0.06 && (
        <g>
          <circle
            cx="0"
            cy="0"
            r={outerR}
            fill="#FFFFFF"
            fillOpacity={Math.min(1, c * 1.15)}
            stroke="#64748B"
            strokeWidth={c > 0.35 ? 3.8 : 2.2}
            strokeOpacity={Math.min(1, c * 1.3)}
          />
          {c < 0.72 && (
            <g opacity={Math.max(0, 1 - c / 0.72) * 0.9}>
              <ellipse cx="-14" cy="-12" rx="12" ry="8" fill="#16A34A" stroke="#14532D" strokeWidth="2.2" />
              <ellipse cx="16" cy="14" rx="11" ry="7" fill="#15803D" stroke="#14532D" strokeWidth="2" />
              <path d="M-19 -14 Q-12 -10 -8 -15" fill="none" stroke="#14532D" strokeWidth="3" />
            </g>
          )}
          <path d="M-28 -22 Q0 -34 28 -16" fill="none" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" opacity={c} />
          <path d="M-22 18 Q8 30 30 10" fill="none" stroke="#CBD5E1" strokeWidth="3.5" strokeLinecap="round" opacity={c} />
        </g>
      )}
    </g>
  );
};

export const SnowAvalancheMoundSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const blink = Math.sin(walkTime * 3.8) > 0.9;
  return (
    <g>
      {/* Chubby Snowman Bottom Mound */}
      <path
        d="M-74 12 Q-70 -62 -26 -72 Q0 -98 28 -72 Q72 -60 74 12 Z"
        fill="#FFFFFF"
        stroke="#94A3B8"
        strokeWidth="3.5"
      />
      {/* Cozy Red Winter Scarf */}
      <path d="M-38 -52 Q0 -40 38 -52 L34 -38 Q0 -26 -34 -38 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.5" />
      <polygon points="18,-44 34,-42 42,-12 24,-12" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
      {/* Crooked Snowman Bucket Hat */}
      <g transform="translate(0, -84) rotate(-8)">
        <rect x="-26" y="-4" width="52" height="8" rx="4" fill="#1E293B" />
        <rect x="-18" y="-28" width="36" height="25" rx="3" fill="#334155" stroke="#0F172A" strokeWidth="2.5" />
        <rect x="-18" y="-12" width="36" height="6" fill="#EF4444" />
      </g>
      {/* Peeking Stickman Eyes inside dark peephole */}
      <ellipse cx="0" cy="-64" rx="22" ry="11.5" fill="#0F172A" />
      {blink ? (
        <>
          <line x1="-12" y1="-64" x2="-4" y2="-64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
          <line x1="4" y1="-64" x2="12" y2="-64" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="-8" cy="-64" r="4" fill="#FFFFFF" />
          <circle cx="8" cy="-64" r="4" fill="#FFFFFF" />
          <circle cx="-8" cy="-64" r="1.8" fill="#0F172A" />
          <circle cx="8" cy="-64" r="1.8" fill="#0F172A" />
        </>
      )}
      {/* Orange Carrot Nose sticking out */}
      <polygon points="0,-58 0,-50 22,-54" fill="#F97316" stroke="#9A3412" strokeWidth="1.8" />
    </g>
  );
};

// ===========================================================================
// ㄷ (숟 · 숟가락) — Giant Spoon Catapult + Steaming Giant Soup Bowl!
// ===========================================================================
export const GiantSteelSpoonSvg: React.FC = () => (
  <g>
    {/* Handle */}
    <rect x="24" y="-8" width="142" height="16" rx="8" fill="#CBD5E1" stroke="#475569" strokeWidth="3.5" />
    <line x1="36" y1="-2" x2="152" y2="-2" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    {/* Deep Spoon Bowl */}
    <ellipse cx="0" cy="0" rx="46" ry="26" fill="#E2E8F0" stroke="#475569" strokeWidth="3.5" />
    <ellipse cx="-2" cy="2" rx="32" ry="16" fill="#94A3B8" opacity="0.45" />
  </g>
);

export const SteamingSoupBowlSvg: React.FC<{ walkTime: number; splashing?: boolean }> = ({
  walkTime,
  splashing = false,
}) => (
  <g>
    {/* Rising savory steam wisps */}
    {[-28, 0, 28].map((sx, idx) => (
      <path
        key={sx}
        d={`M${sx} -34 Q${sx + Math.sin(walkTime * 5 + idx) * 8} -52 ${sx} -70`}
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="3.5"
        strokeLinecap="round"
        opacity="0.82"
      />
    ))}
    {/* Splash droplets when Jollaman plunges in */}
    {splashing && (
      <g>
        <path d="M-44 -28 Q-60 -68 -74 -42" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
        <path d="M44 -28 Q60 -68 74 -42" fill="none" stroke="#FDE047" strokeWidth="4" strokeLinecap="round" />
        <circle cx="-58" cy="-58" r="5" fill="#FACC15" />
        <circle cx="58" cy="-58" r="5" fill="#FACC15" />
      </g>
    )}
    {/* Ceramic Bowl Base (deep belly C-78 46..78 46 reaches +30.5 so submerged legs never poke out!) */}
    <path d="M-78 -16 C-78 46, 78 46, 78 -16 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="4" />
    <path d="M-66 8 Q0 24 66 8" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    <rect x="-30" y="28" width="60" height="10" rx="3" fill="#E2E8F0" stroke="#334155" strokeWidth="3" />
    {/* Golden Broth & Green Scallions */}
    <ellipse cx="0" cy="-16" rx="76" ry="18" fill="#F59E0B" stroke="#B45309" strokeWidth="3" />
    <ellipse cx="-24" cy="-16" rx="12" ry="4" fill="#FEF08A" opacity="0.7" />
    <circle cx="-32" cy="-14" r="4" fill="#22C55E" />
    <circle cx="28" cy="-12" r="4.5" fill="#22C55E" />
    <circle cx="8" cy="-20" r="3.5" fill="#EF4444" />
  </g>
);

export const SteamingSoupBowlFrontSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g>
    {/* Broth ripple ring around Jollaman */}
    <ellipse
      cx="0"
      cy="-12"
      rx={36 + Math.sin(walkTime * 6) * 5}
      ry="6"
      fill="none"
      stroke="#FEF08A"
      strokeWidth="2.5"
      opacity="0.88"
    />
    {/* Front Ceramic Rim masking lower legs cleanly inside the bowl */}
    <path d="M-78 -16 C-78 46, 78 46, 78 -16 Q0 -2 -78 -16 Z" fill="#F8FAFC" stroke="#334155" strokeWidth="4" />
    <path d="M-66 8 Q0 24 66 8" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
    <rect x="-30" y="28" width="60" height="10" rx="3" fill="#E2E8F0" stroke="#334155" strokeWidth="3" />
  </g>
);

// ===========================================================================
// ㄹ (칼) — Gleaming Giant Sword + Comic Slash Arc + Cut Bamboo Stalk!
// ===========================================================================
export const GiantSlashBladeSvg: React.FC<{ glintPhase?: number }> = ({ glintPhase = 0 }) => (
  <g>
    {/* Wooden wrapped handle (hilt) */}
    <rect x="-7" y="18" width="14" height="38" rx="4" fill="#B91C1C" stroke="#0F172A" strokeWidth="3" />
    <path d="M-7 26 L7 32 M-7 34 L7 40 M-7 42 L7 48" stroke="#0F172A" strokeWidth="2.2" />
    <circle cx="0" cy="57" r="7.5" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
    {/* Golden Sword Guard (Tsuba) */}
    <rect x="-20" y="10" width="40" height="10" rx="5" fill="#FACC15" stroke="#78350F" strokeWidth="3" />
    {/* Gleaming Curved Razor Steel Blade */}
    <path
      d="M-11 10 L-12 -106 Q-10 -126 10 -138 Q16 -110 13 10 Z"
      fill="#E2E8F0"
      stroke="#1E293B"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    {/* Razor Edge Highlight */}
    <path d="M6 6 L7 -124" fill="none" stroke="#FFFFFF" strokeWidth="3.2" strokeLinecap="round" />
    <path d="M-5 6 L-6 -96" fill="none" stroke="#94A3B8" strokeWidth="2.4" strokeLinecap="round" />
    {/* Animated Glint Sparkle on Blade */}
    <g transform={`translate(2, ${-42 - ((glintPhase * 65) % 68)})`}>
      <polygon points="0,-10 2.5,-2.5 10,0 2.5,2.5 0,10 -2.5,2.5 -10,0 -2.5,-2.5" fill="#FEF08A" stroke="#F59E0B" strokeWidth="1" />
    </g>
  </g>
);

export const SwordSlashArcSvg: React.FC<{ progress: number }> = ({ progress }) => {
  const opacity = Math.max(0, 1 - progress * 0.85);
  return (
    <g opacity={opacity}>
      <path
        d="M-86 -72 Q12 -18 96 68 Q18 -34 -72 -88 Z"
        fill="#FFFFFF"
        stroke="#38BDF8"
        strokeWidth="3.5"
      />
      <path
        d="M-66 -54 Q18 -6 82 52"
        fill="none"
        stroke="#FEF08A"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    </g>
  );
};

// ===========================================================================
// ㅁ (곰) — Grizzly Bear + Golden Honey Pot!
// ===========================================================================
export const GoldenHoneyPotSvg: React.FC = () => (
  <g>
    <ellipse cx="0" cy="0" rx="22" ry="18" fill="#D97706" stroke="#78350F" strokeWidth="3" />
    <rect x="-15" y="-22" width="30" height="8" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
    <path d="M-13 -14 Q-6 -4 -2 -14 Q6 -2 12 -14" fill="#FACC15" stroke="#CA8A04" strokeWidth="1.5" />
    <text x="0" y="6" textAnchor="middle" fontSize="13" fontWeight="900" fill="#FEF3C7">꿀</text>
  </g>
);

export const BigShakingBearSvg: React.FC<{
  walkTime: number;
  shaking: boolean;
  pose?: 'stomp' | 'shake' | 'eating' | 'roll';
}> = ({ walkTime, shaking, pose = 'shake' }) => {
  const armWave = shaking ? Math.sin(walkTime * 28) * 12 : Math.sin(walkTime * 8) * 4;
  const footBob = pose === 'stomp' || pose === 'roll' ? Math.sin(walkTime * 14) * 6 : 0;
  return (
    <g>
      <circle cx="-28" cy="-78" r="14" fill="#78350F" stroke="#451A03" strokeWidth="3.5" />
      <circle cx="28" cy="-78" r="14" fill="#78350F" stroke="#451A03" strokeWidth="3.5" />
      <circle cx="-28" cy="-78" r="7" fill="#D97706" />
      <circle cx="28" cy="-78" r="7" fill="#D97706" />

      <ellipse cx="0" cy="0" rx="44" ry="54" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
      <ellipse cx="0" cy="6" rx="28" ry="34" fill="#D97706" opacity="0.55" />

      <ellipse cx="-22" cy={52 + footBob} rx="16" ry="10" fill="#78350F" stroke="#451A03" strokeWidth="3" />
      <ellipse cx="22" cy={52 - footBob} rx="16" ry="10" fill="#78350F" stroke="#451A03" strokeWidth="3" />

      <circle cx="0" cy="-54" r="34" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
      <ellipse cx="0" cy="-45" rx="16" ry="12" fill="#FDE68A" />
      <ellipse cx="0" cy="-49" rx="7" ry="5" fill="#1E293B" />
      {pose === 'eating' ? (
        <>
          <path d="M-16 -60 Q-12 -65 -8 -60" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
          <path d="M8 -60 Q12 -65 16 -60" fill="none" stroke="#1E293B" strokeWidth="2.8" strokeLinecap="round" />
          <ellipse cx="0" cy="-35" rx="6" ry="5" fill="#FB7185" />
        </>
      ) : (
        <>
          <circle cx="-12" cy="-60" r="4" fill="#1E293B" />
          <circle cx="12" cy="-60" r="4" fill="#1E293B" />
          <path d="M-6 -39 Q0 -34 6 -39" fill="none" stroke="#451A03" strokeWidth="2.8" strokeLinecap="round" />
        </>
      )}

      {pose === 'roll' ? (
        <>
          <ellipse cx="-44" cy={-8 + Math.sin(walkTime * 14) * 5} rx="16" ry="11" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <ellipse cx="-38" cy={14 - Math.sin(walkTime * 14) * 5} rx="15" ry="10.5" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        </>
      ) : (
        <>
          <ellipse cx="-44" cy={-18 + armWave} rx="15" ry="11" fill="#78350F" stroke="#451A03" strokeWidth="3" />
          <ellipse cx="44" cy={-18 - armWave} rx="15" ry="11" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        </>
      )}

      {pose === 'eating' && (
        <g transform="translate(-26, -12)">
          <GoldenHoneyPotSvg />
        </g>
      )}
    </g>
  );
};

// ===========================================================================
// ㅂ (삽) — Giant Digging Shovel + Flying Dirt Clods + Burial Dirt Mound!
// ===========================================================================
export const GiantDiggingShovelSvg: React.FC<{ dirtLoad?: boolean }> = ({ dirtLoad = false }) => (
  <g>
    {/* Top D-Grip Handle */}
    <path d="M-16 -126 H16 V-108 H-16 Z" fill="none" stroke="#DC2626" strokeWidth="5.5" strokeLinejoin="round" />
    <rect x="-12" y="-128" width="24" height="7" rx="3.5" fill="#1E293B" />
    {/* Wooden / Red Shaft */}
    <rect x="-5" y="-108" width="10" height="84" rx="4" fill="#D97706" stroke="#78350F" strokeWidth="3" />
    {/* Metal Collar */}
    <rect x="-8" y="-30" width="16" height="16" rx="3" fill="#94A3B8" stroke="#334155" strokeWidth="2.5" />
    {/* Wide Curved Steel Shovel Blade */}
    <path
      d="M-28 -16 H28 L24 26 Q0 48 -24 26 Z"
      fill="#CBD5E1"
      stroke="#334155"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path d="M-18 -8 V16" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
    <rect x="-26" y="-16" width="52" height="6" rx="2" fill="#64748B" />
    {/* Mound of Freshly Scooped Dirt sitting in Shovel Blade */}
    {dirtLoad && (
      <g>
        <path d="M-24 -8 Q-12 -32 0 -24 Q14 -34 24 -8 Q8 6 -24 -8 Z" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
        <circle cx="-8" cy="-16" r="3" fill="#78350F" />
        <circle cx="8" cy="-14" r="3.5" fill="#B45309" />
      </g>
    )}
  </g>
);

export const DirtMoundSourceSvg: React.FC = () => (
  <g>
    <path
      d="M-56 0 Q-38 -36 -8 -42 Q26 -46 56 0 Z"
      fill="#92400E"
      stroke="#451A03"
      strokeWidth="3.5"
    />
    <path d="M-34 -12 Q-8 -28 24 -10" fill="none" stroke="#B45309" strokeWidth="4" strokeLinecap="round" />
    <circle cx="-18" cy="-18" r="4" fill="#78350F" />
    <circle cx="16" cy="-16" r="4.5" fill="#451A03" opacity="0.55" />
    <circle cx="2" cy="-6" r="3.5" fill="#78350F" />
  </g>
);

export const FlyingDirtClodsSvg: React.FC<{ progress: number }> = ({ progress }) => {
  const clods = [
    { x0: 120, y0: -68, x1: -12, y1: -26, r: 9 },
    { x0: 112, y0: -78, x1: 14, y1: -32, r: 7 },
    { x0: 130, y0: -62, x1: 4, y1: -18, r: 8 },
    { x0: 105, y0: -70, x1: -22, y1: -20, r: 6 },
  ];
  return (
    <g>
      {clods.map((c, idx) => {
        const cx = c.x0 + (c.x1 - c.x0) * progress;
        const cy = c.y0 + (c.y1 - c.y0) * progress - Math.sin(progress * Math.PI) * 58;
        return (
          <circle
            key={idx}
            cx={cx}
            cy={cy}
            r={c.r}
            fill={idx % 2 === 0 ? '#92400E' : '#B45309'}
            stroke="#451A03"
            strokeWidth="2"
          />
        );
      })}
    </g>
  );
};

export const DirtPitHoleSvg: React.FC<{ depth: number }> = ({ depth }) => {
  const d = Math.max(0.05, Math.min(1, depth));
  const pitW = 34 + d * 24;
  const dipDepth = 4 + d * 15;
  const outerSlope = pitW + 62 + d * 78;
  const rimY = dipDepth * 0.58;

  return (
    <g>
      {/* Mask flat horizon line (y=-2) so both sides visually cave diagonally down toward the center */}
      <path
        d={`M${-outerSlope} -5 H${outerSlope} V-1 L${pitW} ${rimY} Q0 ${dipDepth + 8} ${-pitW} ${rimY} L${-outerSlope} -1 Z`}
        fill="#A16207"
      />
      {/* Left & Right diagonally sunken earth shoulders sloping downward into pit */}
      <path
        d={`M${-outerSlope} -1 L${-pitW} ${rimY} L${-pitW} ${dipDepth + 14} L${-outerSlope + 14} 26 Z`}
        fill="#B45309"
        opacity="0.72"
      />
      <path
        d={`M${outerSlope} -1 L${pitW} ${rimY} L${pitW} ${dipDepth + 14} L${outerSlope - 14} 26 Z`}
        fill="#B45309"
        opacity="0.72"
      />
      {/* Crisp sunken terrain slope lines */}
      <path
        d={`M${-outerSlope} -1 Q${-pitW - 22} ${rimY * 0.45} ${-pitW} ${rimY}`}
        fill="none"
        stroke="#78350F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d={`M${outerSlope} -1 Q${pitW + 22} ${rimY * 0.45} ${pitW} ${rimY}`}
        fill="none"
        stroke="#78350F"
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* Shallow concave earth crater in center (no deep flowerpot wall!) */}
      <path
        d={`M${-pitW} ${rimY} Q0 ${dipDepth + 14} ${pitW} ${rimY} Q0 ${rimY - 5} ${-pitW} ${rimY} Z`}
        fill="#451A03"
        stroke="#78350F"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <ellipse cx="0" cy={rimY + dipDepth * 0.25} rx={pitW * 0.72} ry={3 + d * 3.5} fill="#291204" />
      {/* Subtle soil clods along crater rim */}
      <circle cx={-pitW - 8} cy={rimY - 1} r="3.2" fill="#92400E" stroke="#451A03" strokeWidth="1.5" />
      <circle cx={pitW + 8} cy={rimY - 1} r="3.5" fill="#92400E" stroke="#451A03" strokeWidth="1.5" />
    </g>
  );
};

export const ShovelDiggingJollamanSvg: React.FC<{
  walkTime: number;
  t: number;
  mode: 'approach' | 'dig' | 'wipe';
}> = ({ walkTime, t, mode }) => {
  // Digging cycle: plunge < 0.5 = lifting/tossing dirt, plunge > 0.5 = thrusting shovel into earth
  const digPhase = mode === 'dig' ? Math.sin(t * 54) : mode === 'approach' ? -0.3 : 0;
  const plunge = mode === 'dig' ? (digPhase + 1) * 0.5 : mode === 'approach' ? 0.25 : 0.75;

  // Body leans forward over the shovel while digging
  const hipX = -9;
  const hipY = 16 + plunge * 3;
  const shX = mode === 'wipe' ? 4 : 9 + plunge * 6;
  const shY = mode === 'wipe' ? -15 : -9 + plunge * 5;
  const headX = shX + (mode === 'wipe' ? 4 : 7);
  const headY = shY - 19;

  // Shovel geometry in local coords so both hands stay locked onto D-handle & shaft
  const gripTopX = mode === 'wipe' ? 24 : 18 + plunge * 10;
  const gripTopY = mode === 'wipe' ? -18 : -10 + plunge * 14;
  const bladeTipX = mode === 'wipe' ? 28 : 44 + plunge * 12;
  const bladeTipY = mode === 'wipe' ? 42 : 34 + plunge * 15;

  const dx = bladeTipX - gripTopX;
  const dy = bladeTipY - gripTopY;
  const shovelLen = Math.hypot(dx, dy) || 1;
  const shovelDeg = (Math.atan2(dy, dx) * 180) / Math.PI - 90;
  const shovelScale = Math.min(0.52, Math.max(0.36, shovelLen / 162));

  // Front hand grips shaft ~42% down from top handle
  const gripMidX = gripTopX + dx * 0.42;
  const gripMidY = gripTopY + dy * 0.42;
  const hasLoad = mode === 'dig' && plunge < 0.42;

  return (
    <g>
      {/* Back leg (braced behind) */}
      <path d={`M${hipX} ${hipY} L-16 32 L-19 47`} fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="-14" cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />

      {/* Back arm reaching to TOP D-handle of shovel (or wiping brow in wipe mode) */}
      {mode === 'wipe' ? (
        <path d={`M${shX} ${shY} Q${shX - 12} ${shY - 12} ${headX - 8} ${headY - 10}`} fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      ) : (
        <path d={`M${shX} ${shY} Q${shX + 4} ${shY - 10} ${gripTopX} ${gripTopY}`} fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      )}

      {/* Shovel held cleanly between both hands! */}
      <g transform={`translate(${gripTopX}, ${gripTopY}) rotate(${shovelDeg}) scale(${shovelScale}) translate(0, 124)`}>
        <GiantDiggingShovelSvg dirtLoad={hasLoad} />
      </g>

      {/* Front leg (bent knee stepping forward) */}
      <path d={`M${hipX} ${hipY} L9 30 L11 47`} fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
      <ellipse cx="16" cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />

      {/* Leaning Torso */}
      <path
        d={`M${hipX} ${hipY} Q${(hipX + shX) * 0.5 - 2} ${(hipY + shY) * 0.5} ${shX} ${shY - 4}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* Front arm reaching down to MID shaft of shovel */}
      <path
        d={
          mode === 'wipe'
            ? `M${shX} ${shY} Q${shX + 12} ${shY - 2} ${gripTopX} ${gripTopY}`
            : `M${shX} ${shY} Q${shX + 8} ${shY + 10} ${gripMidX} ${gripMidY}`
        }
        fill="none"
        stroke="#0F172A"
        strokeWidth="4.6"
        strokeLinecap="round"
      />

      {/* Both white cartoon gloves grasping the shovel */}
      {mode === 'wipe' ? (
        <>
          <circle cx={headX - 8} cy={headY - 10} r="4.3" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <circle cx={gripTopX} cy={gripTopY} r="4.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </>
      ) : (
        <>
          <circle cx={gripTopX} cy={gripTopY} r="4.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <circle cx={gripMidX} cy={gripMidY} r="4.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </>
      )}

      {/* Head (leaning forward looking down at pit) */}
      <circle cx={headX} cy={headY} r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.2" />
      <path d={`M${headX - 3} ${headY - 16} Q${headX + 2} ${headY - 25} ${headX + 8} ${headY - 18}`} fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

      {/* Determined / straining face while digging */}
      {mode === 'dig' ? (
        <>
          <line x1={headX - 2} y1={headY - 7} x2={headX + 5} y2={headY - 4} stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
          <line x1={headX + 11} y1={headY - 7} x2={headX + 6} y2={headY - 4} stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
          <circle cx={headX + 2} cy={headY - 1} r="2.1" fill="#0F172A" />
          <circle cx={headX + 9.5} cy={headY - 1} r="2.1" fill="#0F172A" />
          <ellipse cx={headX + 6} cy={headY + 7} rx="4" ry={2.6 + Math.abs(Math.sin(walkTime * 22)) * 1.4} fill="#EF4444" stroke="#0F172A" strokeWidth="1.6" />
        </>
      ) : (
        <>
          <circle cx={headX + 2} cy={headY - 3} r="2.2" fill="#0F172A" />
          <circle cx={headX + 9.5} cy={headY - 3} r="2.2" fill="#0F172A" />
          <path d={`M${headX + 1} ${headY + 5} Q${headX + 6} ${headY + 10} ${headX + 11} ${headY + 5}`} fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}
    </g>
  );
};

export const SmallWatermelonFlowerSvg: React.FC<{ bloom: number; walkTime: number }> = ({
  bloom,
  walkTime,
}) => {
  const s = Math.max(0, Math.min(1, bloom));
  const sway = Math.sin(walkTime * 4) * 5;
  return (
    <g transform={`scale(${s}) rotate(${sway})`}>
      {/* Tiny curly tendril + green stem */}
      <path d="M0 0 Q-3 -14 1 -22" fill="none" stroke="#15803D" strokeWidth="3.2" strokeLinecap="round" />
      <path d="M1 -10 Q12 -14 10 -20 Q6 -23 8 -16" fill="none" stroke="#22C55E" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="-8" cy="-12" rx="7" ry="4" transform="rotate(-24, -8, -12)" fill="#22C55E" stroke="#14532D" strokeWidth="1.6" />
      {/* Cute 5-petal yellow watermelon blossom */}
      <g transform="translate(1, -24)">
        {[0, 72, 144, 216, 288].map((deg) => (
          <ellipse
            key={deg}
            cx="0"
            cy="-8"
            rx="4.8"
            ry="7.5"
            transform={`rotate(${deg})`}
            fill="#FEF08A"
            stroke="#D97706"
            strokeWidth="1.6"
          />
        ))}
        <circle cx="0" cy="0" r="4.8" fill="#F59E0B" stroke="#B45309" strokeWidth="1.5" />
      </g>
    </g>
  );
};

// ===========================================================================
// ㅇ (공) — Bowling Pins + Giant Curving Bowling Ball!
// ===========================================================================
export const BowlingPinSvg: React.FC = () => (
  <g>
    <ellipse cx="0" cy="24" rx="11" ry="4" fill="#0F172A" opacity="0.2" />
    <path
      d="M-11 22 C-14 4, -5 -6, -6 -16 C-8 -28, 8 -28, 6 -16 C5 -6, 14 4, 11 22 Z"
      fill="#FFFFFF"
      stroke="#1E293B"
      strokeWidth="2.5"
    />
    <rect x="-6.5" y="-12" width="13" height="3.5" fill="#EF4444" />
    <rect x="-5.5" y="-6" width="11" height="3.5" fill="#EF4444" />
  </g>
);

export const GiantBowlingBallSvg: React.FC<{ rotationDeg: number }> = ({ rotationDeg }) => (
  <g transform={`rotate(${rotationDeg})`}>
    <circle cx="0" cy="0" r="48" fill="#1E293B" stroke="#0F172A" strokeWidth="4" />
    {/* Clearer dark-green watermelon-like wavy stripes — "Wait... is that a watermelon?!" */}
    <path d="M-24 -39 Q-34 -18 -26 0 Q-18 18 -24 39" fill="none" stroke="#22C55E" strokeWidth="5.2" strokeLinecap="round" opacity="0.58" />
    <path d="M0 -45 Q-8 -20 2 0 Q10 20 0 45" fill="none" stroke="#16A34A" strokeWidth="5.2" strokeLinecap="round" opacity="0.54" />
    <path d="M24 -39 Q16 -18 26 0 Q34 18 24 39" fill="none" stroke="#22C55E" strokeWidth="5.2" strokeLinecap="round" opacity="0.58" />
    <ellipse cx="-16" cy="-18" rx="14" ry="8" transform="rotate(-35, -16, -18)" fill="#64748B" opacity="0.58" />
    <circle cx="14" cy="-14" r="6" fill="#020617" stroke="#475569" strokeWidth="1.5" />
    <circle cx="26" cy="-4" r="6" fill="#020617" stroke="#475569" strokeWidth="1.5" />
    <circle cx="10" cy="2" r="6.5" fill="#020617" stroke="#475569" strokeWidth="1.5" />
    <path d="M-42 18 Q0 32 42 18" fill="none" stroke="#EF4444" strokeWidth="5.5" strokeLinecap="round" />
  </g>
);
