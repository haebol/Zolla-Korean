import React from 'react';

export type Series15BackdropTheme =
  | 'timelab'
  | 'dreamcloud'
  | 'diner'
  | 'vip_red'
  | 'circus'
  | 'office_disco';

export const Series15Backdrop: React.FC<{
  theme: Series15BackdropTheme;
  walkTime: number;
  fridayParty?: boolean;
}> = ({ theme, walkTime, fridayParty = false }) => {
  if (theme === 'office_disco') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="445" fill={fridayParty ? '#1E1B4B' : '#E2E8F0'} />
        {fridayParty ? (
          <>
            <polygon points="500,-80 180,365 340,365" fill="#EC4899" opacity="0.28" />
            <polygon points="500,-80 640,365 820,365" fill="#38BDF8" opacity="0.28" />
            <rect x="370" y="75" width="260" height="54" rx="12" fill="#0F172A" stroke="#F472B6" strokeWidth="4" />
            <text x="500" y="102" textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="900" fill="#FDE047">
              🔥 불금 주말!!
            </text>
          </>
        ) : (
          <>
            {/* Office Cubicle & Clock */}
            <rect x="115" y="185" width="210" height="177" fill="#CBD5E1" stroke="#64748B" strokeWidth="3" />
            <circle cx="845" cy="145" r="34" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
            <line x1="845" y1="145" x2="845" y2="122" stroke="#0F172A" strokeWidth="3" />
            <line x1="845" y1="145" x2="862" y2="145" stroke="#DC2626" strokeWidth="3" />
          </>
        )}
        <rect x="0" y="362" width="1000" height="195" fill={fridayParty ? '#312E81' : '#94A3B8'} />
        <line x1="0" y1="362" x2="1000" y2="362" stroke={fridayParty ? '#FACC15' : '#334155'} strokeWidth="4" />
      </g>
    );
  }

  if (theme === 'vip_red') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="445" fill="#4C0519" />
        {/* Golden Chandelier & Royal Curtains */}
        <path d="M0 -80 H140 Q95 190 0 365 Z" fill="#9F1239" />
        <path d="M1000 -80 H860 Q905 190 1000 365 Z" fill="#9F1239" />
        {[220, 780].map((px) => (
          <rect key={px} x={px - 18} y="-80" width="36" height="442" fill="#FDE68A" opacity="0.22" />
        ))}
        <rect x="0" y="362" width="1000" height="195" fill="#881337" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#FACC15" strokeWidth="4" />
      </g>
    );
  }

  if (theme === 'circus') {
    return (
      <g>
        <rect x="0" y="-80" width="1000" height="445" fill="#FEF3C7" />
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
          <rect key={i} x={i * 100} y="-80" width="50" height="445" fill="#FDA4AF" opacity="0.28" />
        ))}
        <rect x="0" y="362" width="1000" height="195" fill="#FDBA74" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#EA580C" strokeWidth="4" />
      </g>
    );
  }

  if (theme === 'dreamcloud') {
    return (
      <g>
        <defs>
          <linearGradient id="s15DreamSky" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F472B6" />
            <stop offset="100%" stopColor="#E0E7FF" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="445" fill="url(#s15DreamSky)" />
        {[170, 520, 840].map((cx, i) => (
          <g key={cx} transform={`translate(${cx + Math.sin(walkTime + i) * 10}, ${145 + (i % 2) * 24})`} opacity="0.78">
            <circle cx="-22" cy="8" r="18" fill="#FFFFFF" />
            <circle cx="0" cy="0" r="26" fill="#FFFFFF" />
            <circle cx="24" cy="8" r="18" fill="#FFFFFF" />
          </g>
        ))}
        <rect x="0" y="362" width="1000" height="195" fill="#C7D2FE" />
        <line x1="0" y1="362" x2="1000" y2="362" stroke="#4F46E5" strokeWidth="3.5" />
      </g>
    );
  }

  // timelab / diner default
  return (
    <g>
      <rect x="0" y="-80" width="1000" height="445" fill="#1E1B4B" />
      {[120, 260, 400, 540, 680, 820].map((gx) => (
        <line key={gx} x1={gx} y1="-80" x2={gx} y2="362" stroke="#312E81" strokeWidth="2" />
      ))}
      {[180, 260].map((gy) => (
        <line key={gy} x1="0" y1={gy} x2="1000" y2={gy} stroke="#312E81" strokeWidth="2" />
      ))}
      <rect x="0" y="362" width="1000" height="195" fill="#0F172A" />
      <line x1="0" y1="362" x2="1000" y2="362" stroke="#38BDF8" strokeWidth="4" />
    </g>
  );
};

// =========================================================================
// SERIES 15 CUSTOM VECTOR COMIC PROPS
// =========================================================================

export const TimeMachineCapsuleSvg: React.FC<{ walkTime: number; active: boolean }> = ({
  walkTime,
  active,
}) => (
  <g>
    {/* Neon Time Portal Ring */}
    <ellipse
      cx="0"
      cy="-20"
      rx={68 + (active ? Math.sin(walkTime * 22) * 6 : 0)}
      ry="86"
      fill="#312E81"
      stroke="#38BDF8"
      strokeWidth="6"
    />
    <ellipse cx="0" cy="-20" rx="50" ry="68" fill="#1E1B4B" stroke="#FACC15" strokeWidth="3" strokeDasharray="10 8" />
    {/* Clock Hands Reversing Fast */}
    <circle cx="0" cy="-34" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
    <line
      x1="0"
      y1="-34"
      x2={Math.sin(-walkTime * (active ? 18 : 2)) * 16}
      y2={-34 + Math.cos(-walkTime * (active ? 18 : 2)) * 16}
      stroke="#DC2626"
      strokeWidth="3.5"
      strokeLinecap="round"
    />
    <rect x="-46" y="16" width="92" height="28" rx="8" fill="#2563EB" stroke="#FFFFFF" strokeWidth="2.5" />
    <text x="0" y="30" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="900" fill="#FFFFFF">
      과거 았/었!
    </text>
  </g>
);

export const CrystalFortuneOrbSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g>
    {/* Golden Pedestal */}
    <polygon points="-36,42 36,42 22,12 -22,12" fill="#F59E0B" stroke="#0F172A" strokeWidth="3.2" />
    {/* Swirling Crystal Sphere */}
    <circle cx="0" cy="-28" r="46" fill="#7C3AED" stroke="#0F172A" strokeWidth="3.8" />
    <ellipse
      cx={Math.sin(walkTime * 6) * 8}
      cy="-28"
      rx="32"
      ry="16"
      fill="#A78BFA"
      opacity="0.55"
    />
    <path d="M-24 -52 Q-12 -64 4 -58" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" />
    <text x="0" y="-24" textAnchor="middle" dominantBaseline="central" fontSize="20" fontWeight="900" fill="#FEF08A">
      미래 ㄹ래요!
    </text>
  </g>
);

export const GiantStopHandStampSvg: React.FC<{ slammed: boolean }> = ({ slammed }) => (
  <g transform={`translate(0, ${slammed ? 12 : -115})`}>
    {/* Hydraulic Piston Arm */}
    <rect x="-14" y="-170" width="28" height="145" fill="#94A3B8" stroke="#0F172A" strokeWidth="3" />
    {/* Giant Red Stop Sign Glove */}
    <polygon points="-44,-36 44,-36 58,0 44,36 -44,36 -58,0" fill="#DC2626" stroke="#FFFFFF" strokeWidth="4" />
    <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="900" fill="#FFFFFF">
      -지 마!!
    </text>
  </g>
);

export const EvilBroccoliPlateSvg: React.FC<{ kickedProgress: number }> = ({ kickedProgress }) => (
  <g
    transform={`translate(${kickedProgress * 420}, ${-Math.sin(kickedProgress * Math.PI) * 180}) rotate(${kickedProgress * 720})`}
  >
    {/* White Dinner Plate */}
    <ellipse cx="0" cy="24" rx="44" ry="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3" />
    {/* Cheeky Broccoli Stalk & Crown */}
    <rect x="-10" y="-4" width="20" height="28" rx="4" fill="#86EFAC" stroke="#15803D" strokeWidth="2.5" />
    <circle cx="-18" cy="-16" r="16" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
    <circle cx="18" cy="-16" r="16" fill="#16A34A" stroke="#14532D" strokeWidth="2.5" />
    <circle cx="0" cy="-28" r="19" fill="#22C55E" stroke="#14532D" strokeWidth="2.5" />
    {/* Smug Face on Broccoli */}
    <circle cx="-6" cy="-24" r="2.2" fill="#0F172A" />
    <circle cx="6" cy="-24" r="2.2" fill="#0F172A" />
    <path d="M-5 -16 Q0 -12 5 -16" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
  </g>
);

export const RoyalCrownAndCarpetSvg: React.FC = () => (
  <g>
    <polygon points="-240,46 180,46 215,82 -275,82" fill="#DC2626" stroke="#FACC15" strokeWidth="3" />
    <g transform="translate(0, -18)">
      <polygon points="-28,16 28,16 34,-16 14,-2 0,-22 -14,-2 -34,-16" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
      <circle cx="0" cy="2" r="5" fill="#E11D48" />
      <circle cx="-18" cy="4" r="4" fill="#2563EB" />
      <circle cx="18" cy="4" r="4" fill="#10B981" />
    </g>
  </g>
);

export const JugglingPins123Svg: React.FC<{ t: number }> = ({ t }) => {
  const labels = ['1 하나', '2 둘', '3 셋'];
  const colors = ['#EF4444', '#F97316', '#3B82F6'];
  return (
    <g>
      {[0, 1, 2].map((i) => {
        const arcPhase = (t * 2.4 + i * 0.33) % 1;
        const px = Math.cos(arcPhase * Math.PI * 2) * 58;
        const py = -58 - Math.abs(Math.sin(arcPhase * Math.PI)) * 68;
        return (
          <g key={i} transform={`translate(${px}, ${py}) rotate(${arcPhase * 360})`}>
            <ellipse cx="0" cy="6" rx="12" ry="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.8" />
            <rect x="-6" y="-8" width="12" height="6" fill={colors[i]} />
            <text x="0" y="9" textAnchor="middle" fontSize="10" fontWeight="900" fill={colors[i]}>
              {labels[i]}
            </text>
          </g>
        );
      })}
    </g>
  );
};

export const HeavyBarbell456Svg: React.FC<{ liftY: number }> = ({ liftY }) => (
  <g transform={`translate(0, ${liftY})`}>
    <line x1="-88" y1="0" x2="88" y2="0" stroke="#334155" strokeWidth="7" strokeLinecap="round" />
    {/* Heavy Numbered Weight Plates */}
    {[-68, -52, 52, 68].map((px, i) => (
      <rect
        key={px}
        x={px - 7}
        y={i === 0 || i === 3 ? -26 : -34}
        width="14"
        height={i === 0 || i === 3 ? 52 : 68}
        rx="4"
        fill={i % 2 === 0 ? '#1E293B' : '#EAB308'}
        stroke="#0F172A"
        strokeWidth="2.5"
      />
    ))}
    <rect x="-38" y="-14" width="76" height="28" rx="6" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.5" />
    <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="900" fill="#B45309">
      넷·다섯·여섯
    </text>
  </g>
);

export const CashRegister123Svg: React.FC<{ walkTime: number; active: boolean }> = ({
  walkTime,
  active,
}) => (
  <g>
    {/* Retro Gold Cash Register */}
    <rect x="-48" y="-16" width="96" height="58" rx="8" fill="#16A34A" stroke="#0F172A" strokeWidth="3.4" />
    <rect x="-32" y="-44" width="64" height="24" rx="5" fill="#0F172A" stroke="#FACC15" strokeWidth="2.5" />
    <text x="0" y="-31" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="900" fill="#4ADE80">
      일·이·삼!
    </text>
    <rect x="-36" y="22" width="72" height="14" rx="3" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
    {/* Popping Golden Coins */}
    {active &&
      [-32, 0, 32].map((cx, i) => (
        <g
          key={cx}
          transform={`translate(${cx + Math.sin(walkTime * 8 + i) * 14}, ${-58 - ((walkTime * 75 + i * 24) % 52)})`}
        >
          <circle cx="0" cy="0" r="11" fill="#FACC15" stroke="#B45309" strokeWidth="2.4" />
          <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="11" fontWeight="900" fill="#78350F">
            {i + 1}
          </text>
        </g>
      ))}
  </g>
);

export const MonTueWedGauntletSvg: React.FC<{ stage: number }> = ({ stage }) => (
  <g>
    {stage < 0.38 ? (
      // Giant Heavy Monday Boulder ("월")
      <g transform="translate(45, 16)">
        <circle cx="0" cy="0" r="38" fill="#64748B" stroke="#0F172A" strokeWidth="3.5" />
        <text x="0" y="2" textAnchor="middle" dominantBaseline="central" fontSize="24" fontWeight="900" fill="#FFFFFF">
          월 🪨
        </text>
      </g>
    ) : stage < 0.7 ? (
      // Tuesday Fireball ("화")
      <g transform="translate(20, 4)">
        <path d="M-28 24 Q-34 -22 0 -46 Q34 -22 28 24 Z" fill="#F97316" stroke="#DC2626" strokeWidth="3" />
        <text x="0" y="4" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="900" fill="#FEF08A">
          화 🔥
        </text>
      </g>
    ) : (
      // Wednesday Splash Wave ("수")
      <g transform="translate(10, 12)">
        <path d="M-54 24 Q-20 -36 16 -24 Q42 -12 52 24 Z" fill="#0EA5E9" stroke="#0369A1" strokeWidth="3" />
        <text x="0" y="6" textAnchor="middle" dominantBaseline="central" fontSize="22" fontWeight="900" fill="#FFFFFF">
          수 💧
        </text>
      </g>
    )}
  </g>
);

export const FlippingCalendarPagesSvg: React.FC<{ t: number }> = ({ t }) => {
  const stepText = t < 0.34 ? '어제' : t < 0.68 ? '오늘' : '내일';
  const stepColor = t < 0.34 ? '#64748B' : t < 0.68 ? '#9333EA' : '#0EA5E9';
  return (
    <g>
      {/* Wall Calendar Block */}
      <rect x="-46" y="-44" width="92" height="92" rx="10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
      <rect x="-46" y="-44" width="92" height="24" rx="10" fill={stepColor} stroke="#0F172A" strokeWidth="3" />
      <text x="0" y="-32" textAnchor="middle" dominantBaseline="central" fontSize="12" fontWeight="900" fill="#FFFFFF">
        시간 여행
      </text>
      <text x="0" y="14" textAnchor="middle" dominantBaseline="central" fontSize="28" fontWeight="900" fill={stepColor}>
        {stepText}
      </text>
      {/* Flying Torn Paper Page slapping forward */}
      {t > 0.3 && (
        <g transform={`translate(${-52 - (t - 0.3) * 190}, ${-24 + Math.sin(t * 24) * 18}) rotate(${-t * 420})`}>
          <rect x="-24" y="-18" width="48" height="36" rx="4" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.2" />
          <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="13" fontWeight="900" fill="#7C3AED">
            펄럭!
          </text>
        </g>
      )}
    </g>
  );
};
