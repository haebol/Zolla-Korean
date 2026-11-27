import React from 'react';

export type Batchim2Key = 'ㄲ' | 'ㅅ' | 'ㅈ' | 'ㅊ' | 'ㅋ' | 'ㅌ' | 'ㅍ' | 'ㅆ' | 'ㅎ';

/**
 * Dynamic Scenic Backdrop for Jollaman 6 — "끝소리 3대장 변신쇼 ([ㄱ] · [ㄷ] · [ㅂ])"
 * Features twilight city walk mode + 9 word-matched comic movie sets for ㄲ ~ ㅎ.
 */
export const Batchim2Backdrop: React.FC<{
  activeChar: Batchim2Key;
  isWalkingMode: boolean;
  walkTime: number;
  scrollOffset?: number;
}> = ({ activeChar, isWalkingMode, walkTime, scrollOffset = 0 }) => {
  const wrap = (x: number, span = 1100) => (((x - scrollOffset * 0.28) % span) + span) % span - 50;

  if (isWalkingMode) {
    return (
      <g>
        <defs>
          <linearGradient id="b6CitySky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#312E81" />
            <stop offset="65%" stopColor="#7E22CE" />
            <stop offset="100%" stopColor="#FDE68A" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="625" fill="url(#b6CitySky)" />

        {[95, 235, 415, 585, 730, 910].map((sx, idx) => (
          <circle
            key={sx}
            cx={sx}
            cy={108 + (idx % 3) * 22}
            r="2.2"
            fill="#FEF08A"
            opacity={0.45 + Math.abs(Math.sin(walkTime * 3 + idx)) * 0.5}
          />
        ))}
        <circle cx="875" cy="148" r="24" fill="#FEF08A" />
        <circle cx="886" cy="142" r="21" fill="#581C87" />

        {[
          { x: 30, w: 85, h: 155, fill: '#3B0764' },
          { x: 130, w: 96, h: 195, fill: '#1E1B4B' },
          { x: 245, w: 78, h: 135, fill: '#312E81' },
          { x: 350, w: 110, h: 175, fill: '#1E1B4B' },
          { x: 500, w: 88, h: 150, fill: '#3B0764' },
          { x: 610, w: 105, h: 205, fill: '#1E1B4B' },
          { x: 740, w: 84, h: 140, fill: '#312E81' },
          { x: 855, w: 105, h: 170, fill: '#3B0764' },
        ].map((b, idx) => (
          <g key={b.x}>
            <rect x={b.x} y={352 - b.h} width={b.w} height={b.h} rx="3" fill={b.fill} />
            {[0, 1, 2].map((row) =>
              [0, 1].map((col) => (
                <rect
                  key={`${row}-${col}`}
                  x={b.x + 14 + col * 26}
                  y={352 - b.h + 18 + row * 28}
                  width="14"
                  height="16"
                  rx="2"
                  fill={(idx + row + col) % 3 === 0 ? '#94A3B8' : '#FDE047'}
                  opacity={(idx + row + col) % 3 === 0 ? 0.35 : 0.9}
                />
              ))
            )}
          </g>
        ))}

        {[215, 785].map((lx) => (
          <g key={lx} transform={`translate(${lx}, 352)`}>
            <rect x="-3.5" y="-125" width="7" height="125" fill="#475569" />
            <circle cx="0" cy="-128" r="10" fill="#FEF08A" />
            <circle cx="0" cy="-128" r="22" fill="#FDE047" opacity="0.22" />
          </g>
        ))}

        <rect x="0" y="346" width="1000" height="20" fill="#94A3B8" />
        <rect x="0" y="366" width="1000" height="182" fill="#334155" />
        <rect x="0" y="366" width="1000" height="46" fill="#475569" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#CBD5E1" strokeWidth="2.5" />
        {[120, 260, 400, 540, 680, 820].map((cx) => (
          <rect key={cx} x={cx} y="384" width="68" height="10" rx="4" fill="#F8FAFC" opacity="0.82" />
        ))}
      </g>
    );
  }

  // ㄲ (밖): Warm Indoor Porch vs Freezing Snowstorm Outside!
  if (activeChar === 'ㄲ') {
    return (
      <g>
        <defs>
          <linearGradient id="b6FreezeSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#0F172A" />
            <stop offset="55%" stopColor="#1E3A8A" />
            <stop offset="100%" stopColor="#93C5FD" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="445" fill="url(#b6FreezeSky)" />
        {/* Falling snowflakes outside */}
        {Array.from({ length: 18 }).map((_, idx) => {
          const sx = 240 + ((idx * 47 + walkTime * 85) % 740);
          const sy = ((idx * 53 + walkTime * 120) % 340);
          return (
            <circle
              key={idx}
              cx={sx}
              cy={sy}
              r={idx % 3 === 0 ? 4 : 2.6}
              fill="#FFFFFF"
              opacity={0.78}
            />
          );
        })}

        {/* Cozy House Porch Wall on Left */}
        <g transform="translate(36, 152)">
          <rect x="0" y="0" width="150" height="216" fill="#FEF3C7" stroke="#92400E" strokeWidth="4" />
          <polygon points="-22,0 75,-58 172,0" fill="#EF4444" stroke="#991B1B" strokeWidth="3.5" />
          <rect x="18" y="24" width="114" height="32" rx="6" fill="#FFFFFF" stroke="#2563EB" strokeWidth="2.5" />
          <text x="75" y="45" textAnchor="middle" fontSize="15" fontWeight="900" fill="#1D4ED8">집 밖 ▶</text>
          {/* Warm window glowing */}
          <rect x="14" y="84" width="32" height="38" rx="3" fill="#FDE047" stroke="#92400E" strokeWidth="2.5" />
          <line x1="30" y1="84" x2="30" y2="122" stroke="#92400E" strokeWidth="2" />
        </g>

        {/* Snowdrifts on Outside Ground */}
        <path d="M180 356 Q340 326 520 350 T1000 340 L1000 368 L180 368 Z" fill="#E0F2FE" />
        <rect x="0" y="358" width="1000" height="190" fill="#BAE6FD" />
        <rect x="0" y="366" width="1000" height="46" fill="#E0F2FE" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#7DD3FC" strokeWidth="3" />
      </g>
    );
  }

  // ㅅ (옷): Stylish Boutique Fitting Room with Full-Length Mirror & Runway!
  if (activeChar === 'ㅅ') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="448" fill="#FFF1F2" />
        {/* Soft Boutique Wallpaper Stripes */}
        {Array.from({ length: 11 }).map((_, idx) => (
          <rect key={idx} x={idx * 96} y="-80" width="48" height="448" fill="#FFE4E6" opacity="0.55" />
        ))}

        {/* Full-Length Boutique Fitting Mirror on Right */}
        <g transform="translate(520, 145)">
          <rect x="-46" y="0" width="92" height="205" rx="44" fill="#9F1239" stroke="#4C0519" strokeWidth="4" />
          <rect x="-36" y="10" width="72" height="185" rx="36" fill="#E0F2FE" stroke="#FFFFFF" strokeWidth="3" />
          <line x1="-22" y1="42" x2="12" y2="76" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" opacity="0.7" />
          <line x1="-22" y1="62" x2="-4" y2="80" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.7" />
          <text x="0" y="218" textAnchor="middle" fontSize="13" fontWeight="900" fill="#9F1239">옷가게 피팅룸</text>
        </g>

        {/* Background Clothes Rack */}
        <g transform="translate(135, 222)">
          <line x1="-55" y1="0" x2="55" y2="0" stroke="#475569" strokeWidth="5" strokeLinecap="round" />
          <line x1="-45" y1="0" x2="-45" y2="146" stroke="#475569" strokeWidth="5" />
          <line x1="45" y1="0" x2="45" y2="146" stroke="#475569" strokeWidth="5" />
          {[-26, 0, 26].map((hx, idx) => (
            <rect
              key={hx}
              x={hx - 10}
              y="10"
              width="20"
              height="48"
              rx="4"
              fill={['#38BDF8', '#FACC15', '#A78BFA'][idx]}
              stroke="#0F172A"
              strokeWidth="2"
            />
          ))}
        </g>

        <rect x="0" y="352" width="1000" height="195" fill="#FECDD3" />
        {/* Red Runway Fitting Carpet */}
        <rect x="0" y="366" width="1000" height="46" fill="#FB7185" />
        <line x1="0" y1="366" x2="1000" y2="366" stroke="#FDE047" strokeWidth="3.5" />
        <line x1="0" y1="412" x2="1000" y2="412" stroke="#FDE047" strokeWidth="3.5" />
      </g>
    );
  }

  // ㅈ (낮): Blazing 12:00 Noon Sunny Park!
  if (activeChar === 'ㅈ') {
    return (
      <g>
        <defs>
          <linearGradient id="b6NoonSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#F97316" />
            <stop offset="55%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#FEF3C7" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="440" fill="url(#b6NoonSky)" />
        <path d="M0 340 Q240 278 520 336 T1000 318 L1000 368 L0 368 Z" fill="#FDBA74" />
        {[120, 815].map((cx) => (
          <g key={cx} transform={`translate(${cx}, 346)`}>
            <rect x="-8" y="-68" width="16" height="68" rx="8" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
            <path d="M-8 -38 H-22 V-56" fill="none" stroke="#16A34A" strokeWidth="10" strokeLinecap="round" />
            <path d="M8 -30 H22 V-48" fill="none" stroke="#16A34A" strokeWidth="10" strokeLinecap="round" />
          </g>
        ))}
        {/* Midday 12:00 Clock Sign */}
        <g transform="translate(720, 152)">
          <circle cx="0" cy="0" r="28" fill="#FFFFFF" stroke="#EA580C" strokeWidth="4" />
          <line x1="0" y1="0" x2="0" y2="-18" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />
          <line x1="0" y1="0" x2="0" y2="-13" stroke="#EF4444" strokeWidth="2.8" strokeLinecap="round" />
          <text x="0" y="46" textAnchor="middle" fontSize="14" fontWeight="900" fill="#9A3412">12:00 낮</text>
        </g>
        <rect x="0" y="352" width="1000" height="195" fill="#FDE68A" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDBA74" />
      </g>
    );
  }

  // ㅊ (꽃): Pastel Spring Flower Meadow!
  if (activeChar === 'ㅊ') {
    return (
      <g>
        <defs>
          <linearGradient id="b6GardenSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#FCE7F3" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="440" fill="url(#b6GardenSky)" />
        {[165, 490, 815].map((cx, idx) => (
          <g key={cx} transform={`translate(${wrap(cx)}, ${76 + (idx % 2) * 16})`} opacity="0.88">
            <circle cx="-18" cy="6" r="15" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="21" fill="#FFFFFF" />
            <circle cx="20" cy="6" r="15" fill="#FFFFFF" />
          </g>
        ))}
        <path d="M0 342 Q260 278 540 338 T1000 322 L1000 368 L0 368 Z" fill="#86EFAC" />
        <rect x="0" y="324" width="1000" height="6" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        {Array.from({ length: 14 }).map((_, idx) => (
          <rect key={idx} x={idx * 76 + 14} y="308" width="10" height="44" rx="3" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
        ))}
        <rect x="0" y="352" width="1000" height="195" fill="#4ADE80" />
        <rect x="0" y="366" width="1000" height="46" fill="#FDE68A" opacity="0.9" />
      </g>
    );
  }

  // ㅋ (부엌): Cozy Checkered Tile Kitchen!
  if (activeChar === 'ㅋ') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="448" fill="#EFF6FF" />
        {Array.from({ length: 12 }).map((_, c) => (
          <line key={`kv-${c}`} x1={c * 90} y1="-80" x2={c * 90} y2="368" stroke="#DBEAFE" strokeWidth="2.5" />
        ))}
        {[80, 160, 240, 320].map((ry) => (
          <line key={`kh-${ry}`} x1="0" y1={ry} x2="1000" y2={ry} stroke="#DBEAFE" strokeWidth="2.5" />
        ))}
        {/* Hanging Kitchen Rack */}
        <line x1="140" y1="138" x2="350" y2="138" stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
        {[180, 245, 310].map((hx, idx) => (
          <g key={hx} transform={`translate(${hx}, 138)`}>
            <line x1="0" y1="0" x2="0" y2="28" stroke="#64748B" strokeWidth="3.5" />
            <circle cx="0" cy="34" r={idx === 1 ? 12 : 8} fill="#94A3B8" stroke="#475569" strokeWidth="2" />
          </g>
        ))}
        {/* Stove Counter */}
        <rect x="520" y="275" width="320" height="93" rx="6" fill="#E2E8F0" stroke="#64748B" strokeWidth="3" />
        <rect x="545" y="295" width="120" height="55" rx="4" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
        <rect x="695" y="295" width="120" height="55" rx="4" fill="#CBD5E1" stroke="#64748B" strokeWidth="2" />
        <rect x="0" y="368" width="1000" height="180" fill="#FEF3C7" />
        <line x1="0" y1="368" x2="1000" y2="368" stroke="#B45309" strokeWidth="3" />
      </g>
    );
  }

  // ㅌ (밭): Countryside Radish Farm Patch!
  if (activeChar === 'ㅌ') {
    return (
      <g>
        <defs>
          <linearGradient id="b6FarmSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#FEF9C3" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="440" fill="url(#b6FarmSky)" />
        <path d="M0 342 Q260 282 540 338 T1000 324 L1000 368 L0 368 Z" fill="#86EFAC" />
        <g transform="translate(825, 348)">
          <line x1="0" y1="0" x2="0" y2="-115" stroke="#78350F" strokeWidth="6" />
          <line x1="-38" y1="-82" x2="38" y2="-82" stroke="#78350F" strokeWidth="5" />
          <rect x="-18" y="-84" width="36" height="40" rx="4" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <circle cx="0" cy="-102" r="14" fill="#FDE68A" stroke="#92400E" strokeWidth="2.5" />
          <polygon points="-24,-110 24,-110 0,-130" fill="#F59E0B" stroke="#92400E" strokeWidth="2" />
        </g>
        <rect x="0" y="352" width="1000" height="195" fill="#92400E" />
        <rect x="0" y="366" width="1000" height="46" fill="#78350F" />
        {[120, 260, 560, 720, 880].map((fx) => (
          <ellipse key={fx} cx={fx} cy="390" rx="34" ry="8" fill="#451A03" opacity="0.45" />
        ))}
      </g>
    );
  }

  // ㅍ (숲): Deep Emerald Pine Forest Campsite!
  if (activeChar === 'ㅍ') {
    return (
      <g>
        <defs>
          <linearGradient id="b6ForestSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#022C22" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="625" fill="url(#b6ForestSky)" />
        {[110, 250, 440, 620, 790, 910].map((tx, idx) => (
          <g key={tx} transform={`translate(${tx}, 352)`}>
            <rect x="-10" y="-145" width="20" height="145" fill="#451A03" />
            <polygon points="-50,-105 0,-215 50,-105" fill={idx % 2 === 0 ? '#064E3B' : '#047857'} />
          </g>
        ))}
        {[175, 310, 515, 685, 845].map((fx, idx) => (
          <circle
            key={fx}
            cx={fx + Math.sin(walkTime * 2.2 + idx) * 18}
            cy={180 + Math.cos(walkTime * 2.8 + idx) * 22}
            r="3.5"
            fill="#FEF08A"
            opacity={0.45 + Math.abs(Math.sin(walkTime * 5 + idx)) * 0.55}
          />
        ))}
        <rect x="0" y="352" width="1000" height="195" fill="#064E3B" />
        <rect x="0" y="366" width="1000" height="46" fill="#1E293B" />
      </g>
    );
  }

  // ㅆ (있다): Dramatic Spotlight Treasure Cave!
  if (activeChar === 'ㅆ') {
    return (
      <g>
        <defs>
          <linearGradient id="b6CaveBg" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#1E1B4B" />
            <stop offset="100%" stopColor="#4C1D95" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="625" fill="url(#b6CaveBg)" />
        <polygon points="365,-80 515,-80 595,368 285,368" fill="#FEF08A" opacity="0.16" />
        {[[180, 195], [760, 175], [860, 245]].map(([gx, gy], idx) => (
          <polygon
            key={idx}
            points={`${gx},${gy - 14} ${gx + 10},${gy} ${gx},${gy + 14} ${gx - 10},${gy}`}
            fill="#38BDF8"
            opacity={0.45 + Math.abs(Math.sin(walkTime * 4 + idx)) * 0.5}
          />
        ))}
        <rect x="0" y="352" width="1000" height="195" fill="#312E81" />
        <rect x="0" y="366" width="1000" height="46" fill="#475569" />
      </g>
    );
  }

  // ㅎ (히읗): Starry Crimson-Indigo Magic Hangul Mirror Hall!
  return (
    <g>
      <defs>
        <linearGradient id="b6MirrorBg" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#1E1B4B" />
          <stop offset="65%" stopColor="#450A0A" />
          <stop offset="100%" stopColor="#7F1D1D" />
        </linearGradient>
      </defs>
      <rect x="0" y="-80" width="1000" height="625" fill="url(#b6MirrorBg)" />
      {/* Twinkling magic stars */}
      {[120, 245, 560, 740, 880].map((sx, idx) => (
        <circle
          key={sx}
          cx={sx}
          cy={128 + (idx % 3) * 34}
          r="2.6"
          fill="#FDE047"
          opacity={0.4 + Math.abs(Math.sin(walkTime * 4 + idx)) * 0.6}
        />
      ))}
      <rect x="0" y="352" width="1000" height="195" fill="#450A0A" />
      {/* Royal Carpet Runner */}
      <rect x="0" y="366" width="1000" height="46" fill="#991B1B" />
      <line x1="0" y1="366" x2="1000" y2="366" stroke="#FACC15" strokeWidth="3.5" />
      <line x1="0" y1="412" x2="1000" y2="412" stroke="#FACC15" strokeWidth="3.5" />
    </g>
  );
};

// ===========================================================================
// SHARED IN-STAGE TRANSFORMATION PLAQUE (Shows e.g. 밖 ➔ [박], 히읗 ➔ [히읃]!)
// ===========================================================================
export const BatchimTransformOverlaySvg: React.FC<{
  triggerWord: string;
  pronunciation: string;
  origBatchim: Batchim2Key;
  repSound: string;
  color: string;
  transformed: boolean;
  walkTime: number;
}> = ({ triggerWord, pronunciation, origBatchim, repSound, color, transformed, walkTime }) => {
  const pulse = transformed ? 1 + Math.sin(walkTime * 8) * 0.03 : 1;
  return (
    <g transform={`scale(${pulse})`}>
      {/* Soft Drop Shadow */}
      <rect x="-106" y="-26" width="212" height="58" rx="14" fill="#0F172A" opacity="0.24" />
      {/* Main Comic Plaque */}
      <rect
        x="-108"
        y="-30"
        width="216"
        height="58"
        rx="14"
        fill="#FFFFFF"
        stroke={transformed ? color : '#334155'}
        strokeWidth={transformed ? 3.5 : 2.8}
      />

      {!transformed ? (
        <g>
          <text x="-18" y="4" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0F172A">
            {triggerWord}
          </text>
          <g transform="translate(52, -1)">
            <rect x="-32" y="-13" width="64" height="26" rx="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
            <text x="0" y="5" textAnchor="middle" fontSize="13" fontWeight="900" fill="#B45309">
              {origBatchim} ➔ ?
            </text>
          </g>
        </g>
      ) : (
        <g>
          {/* Word -> [Pronunciation] */}
          <text x="-66" y="-2" textAnchor="middle" fontSize="17" fontWeight="900" fill="#64748B">
            {triggerWord}
          </text>
          <text x="-22" y="-2" textAnchor="middle" fontSize="16" fontWeight="900" fill="#94A3B8">
            ➔
          </text>
          <text x="48" y="0" textAnchor="middle" fontSize="22" fontWeight="900" fill={color}>
            [{pronunciation}]
          </text>
          {/* Team Pill below */}
          <g transform="translate(0, 21)">
            <rect x="-48" y="-10" width="96" height="20" rx="10" fill={color} stroke="#FFFFFF" strokeWidth="2" />
            <text x="0" y="3.8" textAnchor="middle" fontSize="11.5" fontWeight="900" fill="#FFFFFF">
              {origBatchim} ➔ [{repSound}] 변신!
            </text>
          </g>
        </g>
      )}
    </g>
  );
};

export const ComicExclaimSvg: React.FC<{ color?: string }> = ({ color = '#EF4444' }) => (
  <g>
    <path d="M-4 -22 L4 -22 L2 -6 L-2 -6 Z" fill={color} stroke="#0F172A" strokeWidth="1.8" strokeLinejoin="round" />
    <circle cx="0" cy="1" r="3.2" fill={color} stroke="#0F172A" strokeWidth="1.8" />
  </g>
);

// ===========================================================================
// ㄲ (밖) — Freezing Blizzard Outside Door -> ㄲ Shivers & Fuses into ㄱ!
// ===========================================================================
export const SlammedPorchDoorSvg: React.FC<{ slammed: boolean }> = ({ slammed }) => (
  <g>
    {slammed ? (
      <g>
        <rect x="-24" y="-74" width="48" height="139" fill="#78350F" stroke="#451A03" strokeWidth="3.5" />
        <rect x="-16" y="-60" width="32" height="44" rx="3" fill="#92400E" stroke="#451A03" strokeWidth="2" />
        <circle cx="14" cy="-6" r="4.5" fill="#FACC15" stroke="#451A03" strokeWidth="1.5" />
        <text x="2" y="-82" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FDE047" stroke="#0F172A" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
          찰칵!
        </text>
      </g>
    ) : (
      <g>
        <rect x="-24" y="-74" width="48" height="139" fill="#FEF3C7" stroke="#451A03" strokeWidth="3.5" />
        <polygon points="-24,-74 4,-66 4,62 -24,65" fill="#78350F" stroke="#451A03" strokeWidth="3" />
      </g>
    )}
  </g>
);

export const FreezingWindAndMorphSvg: React.FC<{
  freezing: boolean;
  frozen: boolean;
  walkTime: number;
}> = ({ freezing, frozen, walkTime }) => {
  const vib = freezing && !frozen ? Math.sin(walkTime * 60) * 4 : 0;
  return (
    <g>
      {/* Swirling icy gale streams blowing from right */}
      {(freezing || frozen) && (
        <g opacity={frozen ? 0.55 : 0.92}>
          {[-28, 0, 28].map((wy, idx) => (
            <path
              key={wy}
              d={`M135 ${wy} Q60 ${wy - 14} -10 ${wy + Math.sin(walkTime * 22 + idx) * 6} T-120 ${wy}`}
              fill="none"
              stroke={idx === 1 ? '#FFFFFF' : '#7DD3FC'}
              strokeWidth={idx === 1 ? 4.5 : 3.5}
              strokeLinecap="round"
            />
          ))}
        </g>
      )}
      {/* Giant Frozen Letter Block: ㄲ cracks & merges into ㄱ! */}
      <g transform={`translate(${vib}, -36)`}>
        <rect
          x="-32"
          y="-28"
          width="64"
          height="52"
          rx="10"
          fill="#E0F2FE"
          stroke="#0284C7"
          strokeWidth="3.5"
        />
        <text
          x="0"
          y="9"
          textAnchor="middle"
          fontSize="36"
          fontWeight="900"
          fill="#1D4ED8"
        >
          {frozen ? 'ㄱ' : 'ㄲ'}
        </text>
        {frozen && (
          <path d="M-24 -22 L-14 -8 L-26 8 M22 -20 L14 -4 L26 10" fill="none" stroke="#38BDF8" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

export const FrozenJollamanIceCubeSvg: React.FC = () => (
  <g>
    <rect
      x="-28"
      y="-60"
      width="56"
      height="112"
      rx="10"
      fill="#7DD3FC"
      fillOpacity="0.45"
      stroke="#E0F2FE"
      strokeWidth="3.5"
    />
    <line x1="-18" y1="-48" x2="12" y2="-18" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.7" />
    <line x1="-18" y1="-26" x2="2" y2="-6" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
    {/* Hanging icicles */}
    <polygon points="-22,-60 -16,-60 -19,-42" fill="#E0F2FE" />
    <polygon points="14,-60 22,-60 18,-38" fill="#E0F2FE" />
  </g>
);

// ===========================================================================
// ㅅ (옷) — Super-Stiff Starched Shirt -> Locks into Boxy ㄷ Frame!
// ===========================================================================
export const StiffStarchedShirtSvg: React.FC<{
  stiffLocked: boolean;
}> = ({ stiffLocked }) => (
  <g>
    {!stiffLocked ? (
      <g>
        {/* Crisp starched shirt with 'ㅅ' collar V-neck */}
        <path
          d="M-18 -20 L-36 -6 L-26 8 L-15 0 L-15 28 L15 28 L15 0 L26 8 L36 -6 L18 -20 L0 -8 Z"
          fill="#FB7185"
          stroke="#9F1239"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Highlighted ㅅ Collar */}
        <path d="M-12 -16 L0 -4 L12 -16" fill="none" stroke="#FEF08A" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <text x="0" y="18" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF">ㅅ</text>
      </g>
    ) : (
      /* Locked into ultra-stiff boxy 'ㄷ' shirt armor! */
      <g>
        <rect x="-24" y="-22" width="48" height="52" rx="5" fill="#F43F5E" stroke="#881337" strokeWidth="3.5" />
        <path d="M12 -12 H-10 V18 H12" fill="none" stroke="#FEF08A" strokeWidth="6" strokeLinecap="square" strokeLinejoin="miter" />
      </g>
    )}
  </g>
);

export const FlyingShirtSvg: React.FC<{ stretchY?: number }> = ({ stretchY = 1 }) => (
  <g transform={`scale(1, ${stretchY})`}>
    <path
      d="M-16 -22 L-34 -8 L-24 6 L-14 -2 L-14 26 L14 26 L14 -2 L24 6 L34 -8 L16 -22 Q0 -14 -16 -22 Z"
      fill="#F43F5E"
      stroke="#9F1239"
      strokeWidth="3"
    />
    <path d="M-10 -16 L0 -6 L10 -16" fill="none" stroke="#FEF08A" strokeWidth="3.5" strokeLinecap="round" />
    <circle cx="0" cy="6" r="3" fill="#FFFFFF" />
  </g>
);

// ===========================================================================
// ㅈ (낮) — Blazing Midday Sun Melts Sharp ㅈ Canopy Flat into Wide ㄷ!
// ===========================================================================
export const BlazingDaySunSvg: React.FC<{ heating: boolean; walkTime: number }> = ({
  heating,
  walkTime,
}) => (
  <g>
    <circle cx="0" cy="0" r={heating ? 56 : 44} fill="#FDE047" opacity="0.35" />
    <circle cx="0" cy="0" r="38" fill="#FACC15" stroke="#EA580C" strokeWidth="4" />
    {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
      <line
        key={deg}
        x1={Math.cos((deg * Math.PI) / 180) * 44}
        y1={Math.sin((deg * Math.PI) / 180) * 44}
        x2={Math.cos((deg * Math.PI) / 180) * 58}
        y2={Math.sin((deg * Math.PI) / 180) * 58}
        stroke="#EA580C"
        strokeWidth="4.5"
        strokeLinecap="round"
      />
    ))}
    <rect x="-20" y="-12" width="16" height="9" rx="2.5" fill="#0F172A" />
    <rect x="4" y="-12" width="16" height="9" rx="2.5" fill="#0F172A" />
    <line x1="-4" y1="-8" x2="4" y2="-8" stroke="#0F172A" strokeWidth="2.5" />
    <path d="M-8 10 Q0 18 10 8" fill="none" stroke="#9A3412" strokeWidth="3" strokeLinecap="round" />

    {heating && (
      <g>
        {[-22, 0, 22].map((hx, idx) => (
          <path
            key={hx}
            d={`M${hx} 48 Q${hx + Math.sin(walkTime * 18 + idx) * 8} 96 ${hx} 145`}
            fill="none"
            stroke="#F97316"
            strokeWidth="4"
            strokeDasharray="10 8"
            strokeLinecap="round"
            opacity="0.78"
          />
        ))}
      </g>
    )}
  </g>
);

export const MeltingJieutCanopySvg: React.FC<{
  meltProgress: number;
  walkTime: number;
}> = ({ meltProgress, walkTime }) => {
  const m = Math.max(0, Math.min(1, meltProgress));
  const peakY = -98 + m * 56; // Sharp ㅈ melts down into flat ㄷ roof!
  const drippy = m > 0.15 && m < 0.95 ? Math.sin(walkTime * 28) * 3 : 0;

  return (
    <g>
      {/* Sturdy Right Pole */}
      <rect x="48" y="-50" width="10" height="50" rx="4" fill="#78350F" stroke="#451A03" strokeWidth="2.5" />
      {m < 0.7 ? (
        /* Pointy ㅈ Canopy melting downward */
        <g transform={`translate(0, ${drippy})`}>
          <path
            d={`M-48 -36 L0 ${peakY} L48 -36 Z`}
            fill="#F97316"
            stroke="#9A3412"
            strokeWidth="3.5"
            strokeLinejoin="round"
          />
          <text x="0" y={-44 + m * 14} textAnchor="middle" fontSize="28" fontWeight="900" fill="#FFFFFF">
            ㅈ
          </text>
          {m > 0.2 && (
            <>
              <circle cx="-32" cy={-26 + m * 22} r="4.5" fill="#FDBA74" />
              <circle cx="28" cy={-24 + m * 26} r="4" fill="#FB923C" />
            </>
          )}
        </g>
      ) : (
        /* Melted flat wide ㄷ shade roof! */
        <g>
          <path
            d="M48 -54 H-48 V-26 H48"
            fill="none"
            stroke="#EA580C"
            strokeWidth="12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <rect x="-52" y="-60" width="106" height="14" rx="6" fill="#FDBA74" stroke="#9A3412" strokeWidth="2.5" />
          <text x="-4" y="-34" textAnchor="middle" fontSize="18" fontWeight="900" fill="#9A3412">
            ㄷ 그늘!
          </text>
        </g>
      )}
    </g>
  );
};

// ===========================================================================
// ㅊ (꽃) — Giant Flower + Cheeky Bee Pops Top of ㅊ Off -> ㄷ Flowerpot!
// ===========================================================================
export const GiantBloomingFlowerPotSvg: React.FC<{
  stung: boolean;
}> = ({ stung }) => (
  <g>
    {/* Sturdy ㄷ-shaped Terracotta Flowerpot */}
    <polygon points="-28,0 28,0 22,42 -22,42" fill="#EA580C" stroke="#7C2D12" strokeWidth="3" strokeLinejoin="round" />
    <rect x="-32" y="-8" width="64" height="12" rx="4" fill="#F97316" stroke="#7C2D12" strokeWidth="2.8" />
    <text x="0" y="28" textAnchor="middle" fontSize="20" fontWeight="900" fill="#FEF3C7">ㄷ</text>

    {/* Giant Pink Flower Stem & Blossom */}
    <path d="M0 -8 Q-6 -32 0 -58" fill="none" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
    {[0, 60, 120, 180, 240, 300].map((deg) => (
      <ellipse
        key={deg}
        cx={Math.cos((deg * Math.PI) / 180) * 18}
        cy={-66 + Math.sin((deg * Math.PI) / 180) * 18}
        rx="12"
        ry="9"
        transform={`rotate(${deg}, ${Math.cos((deg * Math.PI) / 180) * 18}, ${-66 + Math.sin((deg * Math.PI) / 180) * 18})`}
        fill="#F472B6"
        stroke="#9D174D"
        strokeWidth="2.4"
      />
    ))}
    <circle cx="0" cy="-66" r="12" fill="#FACC15" stroke="#B45309" strokeWidth="2.5" />
    {/* Letter marker on blossom: ㅊ top crown pops off when stung! */}
    {!stung && (
      <g transform="translate(0, -104)">
        <circle cx="0" cy="0" r="14" fill="#FFFFFF" stroke="#DB2777" strokeWidth="2.5" />
        <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="900" fill="#DB2777">ㅊ</text>
      </g>
    )}
  </g>
);

export const CheekyFlowerBeeSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const wingFlap = Math.sin(walkTime * 65) * 24;
  return (
    <g>
      <ellipse cx="4" cy="-12" rx="7" ry="12" transform={`rotate(${wingFlap}, 4, -8)`} fill="#E0F2FE" stroke="#38BDF8" strokeWidth="1.8" opacity="0.88" />
      <ellipse cx="10" cy="-10" rx="6" ry="10" transform={`rotate(${-wingFlap}, 10, -8)`} fill="#FFFFFF" stroke="#38BDF8" strokeWidth="1.5" opacity="0.88" />
      {/* Plump striped bee body */}
      <ellipse cx="0" cy="0" rx="15" ry="10" fill="#FACC15" stroke="#0F172A" strokeWidth="2.6" />
      <line x1="-4" y1="-9" x2="-4" y2="9" stroke="#0F172A" strokeWidth="3.5" />
      <line x1="4" y1="-9" x2="4" y2="9" stroke="#0F172A" strokeWidth="3.5" />
      {/* Sharp stinger */}
      <polygon points="-15,-3 -24,0 -15,3" fill="#0F172A" />
      {/* Angry comic brow */}
      <circle cx="8" cy="-2" r="2" fill="#0F172A" />
      <line x1="5" y1="-6" x2="11" y2="-4" stroke="#DC2626" strokeWidth="2" />
    </g>
  );
};

export const ScatteredPetalsMoundSvg: React.FC = () => (
  <g>
    {[
      { x: -38, y: -4, rot: -24, col: '#FB7185' },
      { x: -12, y: -8, rot: 14, col: '#F472B6' },
      { x: 16, y: -6, rot: -18, col: '#FB7185' },
      { x: 40, y: -3, rot: 28, col: '#FACC15' },
    ].map((p, idx) => (
      <ellipse
        key={idx}
        cx={p.x}
        cy={p.y}
        rx="14"
        ry="7"
        transform={`rotate(${p.rot}, ${p.x}, ${p.y})`}
        fill={p.col}
        stroke="#BE123C"
        strokeWidth="2"
      />
    ))}
  </g>
);

// ===========================================================================
// ㅋ (부엌) — Skillet Flip Snaps Middle Bar off ㅋ -> ㄱ + Pancake Hat!
// ===========================================================================
export const KitchenFlipPanSvg: React.FC = () => (
  <g>
    <ellipse cx="0" cy="0" rx="34" ry="9" fill="#334155" stroke="#0F172A" strokeWidth="3" />
    <rect x="30" y="-4" width="44" height="8" rx="4" fill="#1E293B" />
  </g>
);

export const GiantCastIronSkilletSvg: React.FC = () => (
  <g>
    <rect x="36" y="-6" width="66" height="14" rx="6" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
    <circle cx="94" cy="1" r="4" fill="#94A3B8" />
    <ellipse cx="0" cy="0" rx="48" ry="22" fill="#334155" stroke="#0F172A" strokeWidth="4" />
    <ellipse cx="0" cy="2" rx="36" ry="14" fill="#1E293B" />
    <path d="M-24 -6 Q0 -14 24 -6" fill="none" stroke="#94A3B8" strokeWidth="3" strokeLinecap="round" opacity="0.65" />
  </g>
);

export const KieukDoughAndSnapSvg: React.FC<{ snapped: boolean }> = ({ snapped }) => (
  <g>
    <ellipse cx="0" cy="0" rx="34" ry="15" fill="#FDE68A" stroke="#D97706" strokeWidth="3" />
    <text x="0" y="6" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0284C7">
      {snapped ? 'ㄱ' : 'ㅋ'}
    </text>
  </g>
);

export const ChefHatSvg: React.FC = () => (
  <g>
    <path
      d="M-14 4 L-16 -10 Q-24 -18 -14 -26 Q0 -36 14 -26 Q24 -18 16 -10 L14 4 Z"
      fill="#FFFFFF"
      stroke="#334155"
      strokeWidth="2.5"
    />
    <rect x="-14" y="0" width="28" height="7" rx="2" fill="#F1F5F9" stroke="#334155" strokeWidth="2" />
  </g>
);

// ===========================================================================
// ㅌ (밭) — Giant Radish Yank Snaps ㅌ Middle Bar -> ㄷ + Upside-Down Pit!
// ===========================================================================
export const GiantFarmRadishSvg: React.FC<{
  pulledOut: boolean;
  straining?: boolean;
  walkTime?: number;
}> = ({ pulledOut, straining = false, walkTime = 0 }) => {
  const vib = straining ? Math.sin(walkTime * 48) * 3.5 : 0;
  return (
    <g transform={`translate(${vib}, 0)`}>
      {/* Lush Green Radish Leaves */}
      <path d="M0 -8 Q-22 -42 -38 -28 M0 -8 Q22 -42 38 -28 M0 -8 L0 -46" fill="none" stroke="#16A34A" strokeWidth="5.5" strokeLinecap="round" />
      <circle cx="-34" cy="-30" r="11" fill="#22C55E" />
      <circle cx="34" cy="-30" r="11" fill="#22C55E" />
      <circle cx="0" cy="-48" r="12" fill="#4ADE80" />
      {straining && (
        <g>
          <circle cx={-34 - ((walkTime * 35) % 18)} cy={4 - ((walkTime * 25) % 14)} r="4" fill="#78350F" />
          <circle cx={34 + ((walkTime * 35) % 18)} cy={2 - ((walkTime * 28) % 14)} r="4.5" fill="#92400E" />
        </g>
      )}
      {pulledOut ? (
        <g>
          <path d="M-28 0 Q-34 36 0 64 Q34 36 28 0 Q0 -12 -28 0 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="3.8" />
          <path d="M-26 2 Q0 -10 26 2 Q22 18 -22 18 Z" fill="#4ADE80" opacity="0.45" />
          <text x="0" y="34" textAnchor="middle" fontSize="22" fontWeight="900" fill="#D97706">ㄷ</text>
        </g>
      ) : (
        <g>
          <path d="M-28 10 Q0 -12 28 10 L32 26 L-32 26 Z" fill="#F8FAFC" stroke="#475569" strokeWidth="3.5" />
          <text x="0" y="18" textAnchor="middle" fontSize="18" fontWeight="900" fill="#D97706">ㅌ</text>
        </g>
      )}
    </g>
  );
};

export const FarmDirtPitMoundSvg: React.FC = () => (
  <g>
    <ellipse cx="0" cy="2" rx="46" ry="11" fill="#451A03" />
    <path d="M-54 6 Q-34 -22 -14 -14 Q0 -26 16 -14 Q36 -22 54 6 Z" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
    <circle cx="-22" cy="-4" r="4" fill="#78350F" />
    <circle cx="24" cy="-5" r="4.5" fill="#B45309" />
  </g>
);

// ===========================================================================
// ㅍ (숲) — Giant Pine Cone Bonks ㅍ Tent Eaves -> Folds Tightly into ㅂ Tent!
// ===========================================================================
export const PieupForestTentSvg: React.FC<{ folded: boolean }> = ({ folded }) => (
  <g>
    {!folded ? (
      /* Overhanging wide ㅍ tent frame */
      <g>
        <path d="M-56 0 L-44 -92 H44 L56 0 Z" fill="#10B981" fillOpacity="0.28" stroke="#047857" strokeWidth="3" />
        {/* ㅍ overhang poles */}
        <line x1="-68" y1="-94" x2="68" y2="-94" stroke="#92400E" strokeWidth="10" strokeLinecap="round" />
        <line x1="-42" y1="-94" x2="-42" y2="0" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
        <line x1="42" y1="-94" x2="42" y2="0" stroke="#78350F" strokeWidth="8" strokeLinecap="round" />
        <line x1="-66" y1="-2" x2="66" y2="-2" stroke="#92400E" strokeWidth="9" strokeLinecap="round" />
        <text x="0" y="-108" textAnchor="middle" fontSize="22" fontWeight="900" fill="#A7F3D0">ㅍ 텐트</text>
      </g>
    ) : (
      /* Folded neatly inward into sturdy square ㅂ tent! */
      <g>
        <rect x="-44" y="-76" width="88" height="76" rx="8" fill="#059669" fillOpacity="0.88" stroke="#ECFDF5" strokeWidth="3.5" />
        {/* Zipper opening showing Jollaman peeking out */}
        <polygon points="-24,0 0,-42 24,0" fill="#022C22" stroke="#A7F3D0" strokeWidth="2.5" />
        {/* Giant ㅂ structural frame highlight */}
        <path d="M-36 -66 V-8 H36 V-66 M-36 -38 H36" fill="none" stroke="#FDE047" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    )}
  </g>
);

export const GiantPineconeSvg: React.FC = () => (
  <g>
    <ellipse cx="0" cy="0" rx="22" ry="30" fill="#92400E" stroke="#451A03" strokeWidth="3.5" />
    {[-16, -4, 8, 18].map((py, idx) => (
      <path
        key={py}
        d={`M${-16 + (idx % 2) * 4} ${py} Q0 ${py + 10} ${16 - (idx % 2) * 4} ${py}`}
        fill="none"
        stroke="#451A03"
        strokeWidth="3"
        strokeLinecap="round"
      />
    ))}
    <rect x="-4" y="-36" width="8" height="10" rx="2" fill="#78350F" />
  </g>
);

// ===========================================================================
// ㅆ (있다) — Treasure Chest Twins ㅆ -> Giant [ㄷ] Stamp Pops Out!
// ===========================================================================
export const TreasureChestGiantDigutSvg: React.FC<{
  popped: boolean;
  teasing: boolean;
  popScale: number;
  walkTime: number;
}> = ({ popped, teasing, popScale, walkTime }) => {
  const shake = teasing && !popped ? Math.sin(walkTime * 36) * 4 : 0;
  return (
    <g transform={`translate(${shake}, 0)`}>
      {/* Heavy Wooden Chest Base */}
      <rect x="-36" y="-14" width="72" height="46" rx="6" fill="#B45309" stroke="#78350F" strokeWidth="3.5" />
      <rect x="-36" y="0" width="72" height="9" fill="#FACC15" stroke="#854D0E" strokeWidth="1.5" />
      {/* Twin ㅆ Locks before explosion */}
      {!popped && (
        <text x="0" y="18" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FEF08A" stroke="#78350F" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
          ㅆ
        </text>
      )}
      {popped ? (
        <g transform="translate(32, -16) rotate(58)">
          <path d="M-68 0 Q-34 -26 0 0 Z" fill="#D97706" stroke="#78350F" strokeWidth="3.5" />
        </g>
      ) : (
        <path d="M-38 -14 Q0 -38 38 -14 Z" fill="#D97706" stroke="#78350F" strokeWidth="3.5" />
      )}

      {teasing && !popped && (
        <text x="0" y="-44" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FDE047">
          여기 뭐가 있다~?!
        </text>
      )}

      {/* Giant Golden [ㄷ] Stamp Mascot Launching Left! */}
      {popped && (
        <g transform={`translate(${-88 * popScale}, -42) scale(${0.6 + popScale * 0.55})`}>
          <circle cx="0" cy="0" r="36" fill="#DC2626" stroke="#FEF08A" strokeWidth="4" />
          <text x="0" y="13" textAnchor="middle" fontSize="42" fontWeight="900" fill="#FFFFFF">
            ㄷ
          </text>
          <text x="0" y="-44" textAnchor="middle" fontSize="16" fontWeight="900" fill="#FEF08A" stroke="#7F1D1D" strokeWidth="3" style={{ paintOrder: 'stroke fill' }}>
            나 여기 있[ㄷ]다!!
          </text>
        </g>
      )}
    </g>
  );
};

export const TreasureCrashPileSvg: React.FC = () => (
  <g>
    <path d="M-64 6 Q-42 -36 -10 -32 Q18 -40 58 6 Z" fill="#475569" stroke="#1E293B" strokeWidth="3.5" />
    {[
      [-32, -8], [-12, -18], [14, -14], [32, -4], [-2, -4],
    ].map(([cx, cy], idx) => (
      <circle key={idx} cx={cx} cy={cy} r="7.5" fill="#FACC15" stroke="#B45309" strokeWidth="2" />
    ))}
  </g>
);

// ===========================================================================
// ㅎ (히읗) — Magic Hangul Mirror + Shy ㅎ Ghost Gets Royal [ㄷ] Knight Helmet!
// ===========================================================================
export const MagicHangulMirrorSvg: React.FC<{ glowing: boolean; walkTime: number }> = ({
  glowing,
  walkTime,
}) => (
  <g>
    {/* Ornate Golden Mirror Frame */}
    <ellipse cx="0" cy="-64" rx="46" ry="68" fill="#FACC15" stroke="#78350F" strokeWidth="4" />
    <ellipse
      cx="0"
      cy="-64"
      rx="36"
      ry="56"
      fill={glowing ? '#FEF08A' : '#312E81'}
      stroke="#B45309"
      strokeWidth="2.5"
    />
    {/* Pedestal Stand */}
    <rect x="-24" y="0" width="48" height="10" rx="4" fill="#B45309" stroke="#78350F" strokeWidth="2.5" />
    <rect x="-8" y="-12" width="16" height="16" fill="#D97706" />
    {/* Reflection inside Mirror */}
    <text
      x="0"
      y="-50"
      textAnchor="middle"
      fontSize="40"
      fontWeight="900"
      fill={glowing ? '#B91C1C' : '#94A3B8'}
      opacity={glowing ? 1 : 0.65 + Math.sin(walkTime * 5) * 0.2}
    >
      {glowing ? '[ㄷ]' : 'ㅎ?'}
    </text>
  </g>
);

export const ShyHieutGhostSvg: React.FC<{
  armored: boolean;
  walkTime: number;
}> = ({ armored, walkTime }) => {
  const bob = Math.sin(walkTime * 6) * 5;
  const shiver = !armored ? Math.sin(walkTime * 36) * 2.5 : 0;
  return (
    <g transform={`translate(${shiver}, ${bob})`}>
      {/* Ghostly ㅎ body */}
      <path
        d="M-26 18 Q-30 -24 0 -28 Q30 -24 26 18 Q16 10 8 18 Q0 10 -8 18 Q-16 10 -26 18 Z"
        fill={armored ? '#FEE2E2' : '#E2E8F0'}
        fillOpacity={armored ? 0.96 : 0.72}
        stroke={armored ? '#B91C1C' : '#64748B'}
        strokeWidth="3"
      />
      <text
        x="0"
        y="4"
        textAnchor="middle"
        fontSize="26"
        fontWeight="900"
        fill={armored ? '#B91C1C' : '#475569'}
      >
        {armored ? 'ㄷ' : 'ㅎ'}
      </text>
      {armored && (
        /* Gleaming Royal [ㄷ] Knight Helmet perched on Ghost! */
        <g transform="translate(0, -34)">
          <path d="M-24 10 Q-24 -18 0 -20 Q24 -18 24 10 Z" fill="#FACC15" stroke="#78350F" strokeWidth="3" />
          <polygon points="0,-20 -6,-34 8,-28" fill="#DC2626" stroke="#7F1D1D" strokeWidth="2" />
          <text x="0" y="3" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7F1D1D">ㄷ</text>
        </g>
      )}
    </g>
  );
};

export const DigutKnightHelmSvg: React.FC = () => (
  <g>
    <path d="M-20 4 Q-20 -20 0 -22 Q20 -20 20 4 Z" fill="#FACC15" stroke="#78350F" strokeWidth="3" />
    <polygon points="0,-22 -6,-34 8,-28" fill="#B91C1C" stroke="#7F1D1D" strokeWidth="2" />
    <text x="0" y="-4" textAnchor="middle" fontSize="14" fontWeight="900" fill="#7F1D1D">[ㄷ]</text>
  </g>
);
