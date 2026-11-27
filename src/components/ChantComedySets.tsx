import React from 'react';
import { SparkleBurstSvg } from './JollamanSprites';

export type ChantComedySetId = 0 | 1 | 2 | 3;

export const CHANT_COMEDY_SET_NAMES: Record<ChantComedySetId, string> = {
  0: '🎧 디스코 그루브',
  1: '🍌 쿵푸 바나나·방귀점프',
  2: '🛸 우주 무중력·UFO 납치',
  3: '🌶️ 불타는 라면 셰프',
};

// Shared comic exclamation bursts
const ComicWordPop: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  rotate?: number;
}> = ({ x, y, text, color = '#DC2626', rotate = -8 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
    <rect
      x={-(text.length * 9 + 14)}
      y="-16"
      width={text.length * 18 + 28}
      height="30"
      rx="10"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="2.8"
    />
    <text
      x="0"
      y="0"
      textAnchor="middle"
      dominantBaseline="central"
      fontSize="16"
      fontWeight="900"
      fill={color}
    >
      {text}
    </text>
  </g>
);

// =========================================================================
// CUSTOM COMEDY BACKDROPS (Sets 1, 2, 3 — distinct from Set 0 Disco/Stage)
// =========================================================================

export const KungfuDojoBackdrop: React.FC<{ animClock: number; beatInBar: number }> = ({
  animClock,
  beatInBar,
}) => {
  const lanternSwing = Math.sin(animClock * 4.5) * 6;
  const flashBeat4 = beatInBar === 3;
  return (
    <g>
      <defs>
        <linearGradient id="dojoWallGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FEF3C7" />
          <stop offset="65%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
      </defs>
      {/* Dojo Golden-Amber Wall */}
      <rect x="0" y="-80" width="1000" height="430" fill="url(#dojoWallGrad)" />
      {/* Wooden Pillars */}
      <rect x="0" y="-80" width="38" height="430" fill="#78350F" />
      <rect x="962" y="-80" width="38" height="430" fill="#78350F" />
      <rect x="210" y="-80" width="22" height="430" fill="#92400E" opacity="0.45" />
      <rect x="768" y="-80" width="22" height="430" fill="#92400E" opacity="0.45" />

      {/* Traditional Shoji Lattice Window Back */}
      <rect x="330" y="34" width="340" height="210" rx="8" fill="#FFFBEB" stroke="#92400E" strokeWidth="6" />
      <line x1="443" y1="34" x2="443" y2="244" stroke="#B45309" strokeWidth="3" />
      <line x1="557" y1="34" x2="557" y2="244" stroke="#B45309" strokeWidth="3" />
      <line x1="330" y1="104" x2="670" y2="104" stroke="#B45309" strokeWidth="3" />
      <line x1="330" y1="174" x2="670" y2="174" stroke="#B45309" strokeWidth="3" />

      {/* Swinging Red Dojo Lanterns */}
      {[120, 880].map((lx, idx) => (
        <g key={lx} transform={`translate(${lx}, 0) rotate(${lanternSwing * (idx === 0 ? 1 : -1)})`}>
          <line x1="0" y1="-80" x2="0" y2="34" stroke="#451A03" strokeWidth="3" />
          <ellipse cx="0" cy="64" rx="28" ry="34" fill="#DC2626" stroke="#7F1D1D" strokeWidth="3" />
          <ellipse cx="0" cy="64" rx="18" ry="34" fill="none" stroke="#FCA5A5" strokeWidth="1.5" opacity="0.55" />
          <rect x="-14" y="28" width="28" height="8" rx="3" fill="#0F172A" />
          <rect x="-14" y="96" width="28" height="8" rx="3" fill="#0F172A" />
          <line x1="0" y1="104" x2="0" y2="124" stroke="#F59E0B" strokeWidth="4" />
        </g>
      ))}

      {/* Dojo Tatami Mat Floor */}
      <rect x="0" y="345" width="1000" height="205" fill={flashBeat4 ? '#FDE047' : '#D97706'} />
      <line x1="0" y1="345" x2="1000" y2="345" stroke="#78350F" strokeWidth="5" />
      {[100, 260, 420, 580, 740, 900].map((x) => (
        <line key={x} x1={x} y1="345" x2={x - 85} y2="550" stroke="#92400E" strokeWidth="2.2" opacity="0.45" />
      ))}
    </g>
  );
};

export const CosmicUfoBackdrop: React.FC<{ animClock: number; beatInBar: number }> = ({
  animClock,
  beatInBar,
}) => {
  const ufoX = 500 + Math.sin(animClock * 2.2) * 32;
  const ufoY = 44 + Math.cos(animClock * 3.4) * 5;
  const beamOn = beatInBar >= 2;
  return (
    <g>
      <defs>
        <linearGradient id="spaceBgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#090D24" />
          <stop offset="65%" stopColor="#1E1B4B" />
          <stop offset="100%" stopColor="#312E81" />
        </linearGradient>
      </defs>
      <rect x="0" y="-80" width="1000" height="625" fill="url(#spaceBgGrad)" />

      {/* Glowing Nebula Clouds */}
      <ellipse cx="210" cy="140" rx="180" ry="70" fill="#7C3AED" opacity="0.18" />
      <ellipse cx="790" cy="180" rx="190" ry="80" fill="#06B6D4" opacity="0.16" />

      {/* Ringed Planet Left */}
      <g transform="translate(155, 130) rotate(-16)">
        <circle cx="0" cy="0" r="38" fill="#F43F5E" />
        <ellipse cx="0" cy="0" rx="68" ry="15" fill="none" stroke="#FDE047" strokeWidth="6" />
      </g>
      {/* Moon Crater Planet Right */}
      <g transform="translate(835, 118)">
        <circle cx="0" cy="0" r="34" fill="#38BDF8" />
        <circle cx="-10" cy="-8" r="8" fill="#0284C7" opacity="0.55" />
        <circle cx="12" cy="10" r="6" fill="#0284C7" opacity="0.55" />
      </g>

      {/* Twinkling Stars */}
      {[80, 260, 340, 440, 580, 690, 760, 920].map((sx, i) => (
        <circle
          key={sx}
          cx={sx}
          cy={35 + ((i * 53) % 180)}
          r={beatInBar === i % 4 ? 4.2 : 2.2}
          fill="#FEF08A"
          opacity={0.7 + Math.sin(animClock * 5 + i) * 0.3}
        />
      ))}

      {/* Hovering Neon UFO & Tractor Beam */}
      <g transform={`translate(${ufoX}, ${ufoY})`}>
        {beamOn && (
          <polygon
            points="-36,18 36,18 145,320 -145,320"
            fill="#4ADE80"
            opacity={beatInBar === 3 ? 0.32 : 0.18}
          />
        )}
        <path d="M-26 2 C-26 -24, 26 -24, 26 2 Z" fill="#67E8F9" stroke="#0F172A" strokeWidth="2.5" />
        <ellipse cx="0" cy="6" rx="52" ry="14" fill="#94A3B8" stroke="#0F172A" strokeWidth="3" />
        {[-32, -16, 0, 16, 32].map((lx, idx) => (
          <circle
            key={lx}
            cx={lx}
            cy="8"
            r="4.2"
            fill={(beatInBar + idx) % 2 === 0 ? '#4ADE80' : '#FACC15'}
          />
        ))}
      </g>

      {/* Metallic Space Station Deck Floor */}
      <rect x="0" y="348" width="1000" height="205" fill="#1E293B" />
      <line x1="0" y1="348" x2="1000" y2="348" stroke="#38BDF8" strokeWidth="4" />
      {[120, 300, 500, 700, 880].map((x) => (
        <rect key={x} x={x - 14} y="356" width="28" height="8" rx="4" fill="#4ADE80" opacity="0.65" />
      ))}
    </g>
  );
};

export const KitchenSpicyBackdrop: React.FC<{ animClock: number; beatInBar: number }> = ({
  animClock,
  beatInBar,
}) => {
  const boilOffset = Math.sin(animClock * 9) * 5;
  return (
    <g>
      <defs>
        <linearGradient id="kitchenBgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FFF1F2" />
          <stop offset="70%" stopColor="#FFE4E6" />
          <stop offset="100%" stopColor="#FECDD3" />
        </linearGradient>
      </defs>
      <rect x="0" y="-80" width="1000" height="430" fill="url(#kitchenBgGrad)" />

      {/* Kitchen Tile Grid */}
      {[125, 250, 375, 500, 625, 750, 875].map((x) => (
        <line key={x} x1={x} y1="-80" x2={x} y2="350" stroke="#FDA4AF" strokeWidth="1.5" opacity="0.45" />
      ))}
      {[0, 85, 170, 255].map((y) => (
        <line key={y} x1="0" y1={y} x2="1000" y2={y} stroke="#FDA4AF" strokeWidth="1.5" opacity="0.45" />
      ))}

      {/* Bubbling Steaming Pots & Floating Chili Emoji Props */}
      <g transform={`translate(175, ${275 + boilOffset * 0.4})`}>
        <ellipse cx="0" cy="-26" rx="52" ry="12" fill="#DC2626" opacity="0.7" />
        <rect x="-56" y="-26" width="112" height="58" rx="12" fill="#FACC15" stroke="#0F172A" strokeWidth="3.5" />
        <text x="0" y="6" textAnchor="middle" fontSize="28">🍜</text>
      </g>
      <g transform={`translate(825, ${275 - boilOffset * 0.4})`}>
        <rect x="-52" y="-22" width="104" height="54" rx="12" fill="#FB7185" stroke="#0F172A" strokeWidth="3.5" />
        <text x="0" y="6" textAnchor="middle" fontSize="28">{beatInBar >= 2 ? '🌶️' : '🍳'}</text>
      </g>

      {/* Checkered Kitchen Counter Floor */}
      <rect x="0" y="346" width="1000" height="205" fill="#F8FAFC" />
      {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((i) => (
        <rect
          key={i}
          x={i * 100}
          y="346"
          width="50"
          height="205"
          fill={beatInBar === 3 ? '#F43F5E' : '#E11D48'}
          opacity="0.16"
        />
      ))}
      <line x1="0" y1="346" x2="1000" y2="346" stroke="#0F172A" strokeWidth="4.5" />
    </g>
  );
};

// =========================================================================
// HILARIOUS SLAPSTICK CHOREOGRAPHY ACTORS (Sets 0, 1, 2, 3)
// =========================================================================

interface ComedyActorProps {
  beatInBar: number;
  beatProgress: number;
  animClock: number;
  scale?: number;
  color: string;
  showClapBurst?: boolean;
}

/**
 * SET 0 (Upgraded Classic): Headphones Groove + Funky Moonwalk + Beat 4 High Clap Leap!
 */
export const GrooveDiscoActor: React.FC<ComedyActorProps> = ({
  beatInBar,
  beatProgress,
  scale = 1,
  color,
  showClapBurst = true,
}) => {
  const isBeat4Clap = beatInBar === 3;
  const jumpY = isBeat4Clap ? -Math.sin(Math.min(1, beatProgress) * Math.PI) * 34 : -Math.exp(-beatProgress * 6) * 8;
  const sideStepX = beatInBar === 0 ? -14 : beatInBar === 1 ? 12 : beatInBar === 2 ? -10 : 0;
  const bodyTilt = isBeat4Clap ? 0 : beatInBar % 2 === 0 ? -8 : 8;
  const headNod = Math.exp(-beatProgress * 7) * 5;
  const armPose = isBeat4Clap ? 1 : beatInBar % 2 === 0 ? -1 : 0.8;

  return (
    <g transform={`translate(${sideStepX}, ${jumpY}) scale(${scale}) rotate(${bodyTilt})`}>
      <ellipse
        cx="0"
        cy={52 - jumpY / scale}
        rx={Math.max(12, 26 + jumpY * 0.25)}
        ry="6.5"
        fill="#0F172A"
        opacity="0.22"
      />
      {isBeat4Clap && showClapBurst && (
        <g transform="translate(0, -64)">
          <SparkleBurstSvg color="#FACC15" progress={beatProgress} />
        </g>
      )}
      {/* Grooving Legs & Red Sneakers */}
      <path
        d={`M-3 14 Q${-12 + (beatInBar % 2 === 0 ? -6 : 6)} 32 ${isBeat4Clap ? -18 : beatInBar % 2 === 0 ? -18 : -8} ${isBeat4Clap ? 40 : 46}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx={isBeat4Clap ? -18 : beatInBar % 2 === 0 ? -18 : -8} cy={isBeat4Clap ? 42 : 48} rx="8.5" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
      <path
        d={`M3 14 Q${12 + (beatInBar % 2 === 0 ? -6 : 6)} 32 ${isBeat4Clap ? 18 : beatInBar % 2 === 0 ? 10 : 20} ${isBeat4Clap ? 40 : 46}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <ellipse cx={isBeat4Clap ? 21 : beatInBar % 2 === 0 ? 13 : 23} cy={isBeat4Clap ? 42 : 48} rx="8.5" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
      <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.2" strokeLinecap="round" />

      {isBeat4Clap ? (
        <>
          <path d="M-1 -12 Q-26 -28 -8 -56" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
          <path d="M1 -12 Q26 -28 8 -56" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
          <circle cx="-6" cy="-56" r="5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.2" />
          <circle cx="6" cy="-56" r="5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.2" />
        </>
      ) : (
        <>
          <path d={`M-1 -12 Q-18 ${-4 + armPose * 12} -26 ${-18 - armPose * 14}`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
          <circle cx="-26" cy={-18 - armPose * 14} r="4.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d={`M1 -12 Q18 ${-4 - armPose * 12} 26 ${-18 + armPose * 14}`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
          <circle cx="26" cy={-18 + armPose * 14} r="4.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </>
      )}

      <g transform={`translate(0, ${-35 + headNod})`}>
        <path d="M-17 0 C-17 -22, 17 -22, 17 0" fill="none" stroke={color} strokeWidth="4" strokeLinecap="round" />
        <rect x="-21" y="-6" width="6" height="12" rx="3" fill={color} stroke="#0F172A" strokeWidth="1.8" />
        <rect x="15" y="-6" width="6" height="12" rx="3" fill={color} stroke="#0F172A" strokeWidth="1.8" />
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
        <path d="M-9 -3 Q-6 -7 -3 -3" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M3 -3 Q6 -7 9 -3" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        <ellipse cx="0" cy="6" rx={isBeat4Clap ? 6 : 4.5} ry={isBeat4Clap ? 5 : 3.2} fill="#F43F5E" stroke="#0F172A" strokeWidth="1.8" />
      </g>
    </g>
  );
};

/**
 * SET 1: Kungfu Martial Arts Stance -> Flying Side-Kick -> SLIPS ON BANANA PEEL -> FART ROCKET BOOST!
 */
export const KungfuBananaActor: React.FC<ComedyActorProps> = ({
  beatInBar,
  beatProgress,
  scale = 1,
}) => {
  const isSlip = beatInBar === 2;
  const isFartRocket = beatInBar === 3;
  const rotDeg = isSlip
    ? 140 + beatProgress * 190
    : isFartRocket
    ? Math.sin(beatProgress * Math.PI * 2) * 14
    : beatInBar === 1
    ? -14
    : 4;
  const jumpY = isSlip
    ? -Math.sin(beatProgress * Math.PI) * 42
    : isFartRocket
    ? -Math.sin(beatProgress * Math.PI) * 52
    : -Math.exp(-beatProgress * 6) * 8;
  const stepX = beatInBar === 1 ? 18 : isSlip ? -16 : 0;

  return (
    <g>
      {/* Banana Peel on Floor during Beats 1-3 */}
      <g transform="translate(-26, 46) scale(0.9)">
        <path d="M-18 6 Q-6 -8 10 4 Q20 10 24 4 Q12 -14 -14 -4 Z" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
      </g>

      {/* Fart Rocket Cloud on Beat 4! */}
      {isFartRocket && (
        <g transform={`translate(-8, ${34 + jumpY * 0.4})`}>
          <circle cx="-14" cy="10" r="13" fill="#BBF7D0" stroke="#16A34A" strokeWidth="2.2" />
          <circle cx="8" cy="14" r="15" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.2" />
          <circle cx="-2" cy="24" r="10" fill="#86EFAC" stroke="#16A34A" strokeWidth="2" />
          <ComicWordPop x={-64} y={8} text="뿡!!" color="#15803D" rotate={-14} />
        </g>
      )}
      {isSlip && <ComicWordPop x={62} y={-44} text="미끌!" color="#EA580C" rotate={10} />}

      <g transform={`translate(${stepX}, ${jumpY}) scale(${scale}) rotate(${rotDeg})`}>
        {/* Black Belt + Kungfu Gi Sash */}
        <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.2" strokeLinecap="round" />
        <rect x="-12" y="2" width="24" height="6" rx="2" fill="#0F172A" />

        {/* Dynamic Kungfu Legs (Beat 1 = high flying kick!) */}
        {beatInBar === 1 ? (
          <>
            <path d="M-2 14 L-12 45" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="-14" cy="47" rx="8" ry="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            <path d="M2 12 Q24 2 44 -14" fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <ellipse cx="46" cy="-16" rx="9" ry="5" fill="#FACC15" stroke="#0F172A" strokeWidth="2.2" />
          </>
        ) : (
          <>
            <path d={`M-3 14 Q-16 28 ${isSlip ? -24 : -14} ${isSlip ? 26 : 45}`} fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx={isSlip ? -24 : -14} cy={isSlip ? 28 : 47} rx="8" ry="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            <path d={`M3 14 Q16 28 ${isSlip ? 24 : 14} ${isSlip ? 22 : 45}`} fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx={isSlip ? 24 : 14} cy={isSlip ? 24 : 47} rx="8" ry="4.5" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
          </>
        )}

        {/* Arms */}
        <path d={`M-1 -12 Q-24 ${isFartRocket ? -36 : -16} -30 ${isFartRocket ? -48 : -22}`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
        <path d={`M1 -12 Q24 ${isFartRocket ? -36 : -4} 30 ${isFartRocket ? -48 : -16}`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />

        {/* Expressive Kungfu Head + Red Martial Arts Headband! */}
        <g transform="translate(0, -34)">
          <circle cx="0" cy="0" r="16.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
          {/* Red Karate Headband + Flying Tails */}
          <rect x="-17" y="-12" width="34" height="6" rx="2" fill="#DC2626" stroke="#0F172A" strokeWidth="1.6" />
          <path d="M-16 -10 Q-28 -16 -32 -6" fill="none" stroke="#DC2626" strokeWidth="4.5" strokeLinecap="round" />

          {isSlip ? (
            // Dizzy X_X spiral eyes & wavy screaming mouth!
            <>
              <path d="M-9 -4 L-4 1 M-4 -4 L-9 1" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M4 -4 L9 1 M9 -4 L4 1" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="0" cy="8" rx="6" ry="4.5" fill="#F43F5E" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : isFartRocket ? (
            // Shocked O_O face!
            <>
              <circle cx="-6" cy="-2" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="-6" cy="-2" r="1.6" fill="#0F172A" />
              <circle cx="6" cy="-2" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="6" cy="-2" r="1.6" fill="#0F172A" />
              <circle cx="0" cy="8" r="4.8" fill="#F43F5E" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : (
            // Fierce Bruce-Lee Furrowed Brows + Confident Smirk + Sweat Drop!
            <>
              <line x1="-10" y1="-6" x2="-3" y2="-3" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
              <line x1="10" y1="-6" x2="3" y2="-3" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
              <circle cx="-6" cy="-1" r="2.2" fill="#0F172A" />
              <circle cx="6" cy="-1" r="2.2" fill="#0F172A" />
              <path d="M-6 7 Q0 12 7 5" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M13 -6 Q16 -2 13 1 Q10 -2 13 -6 Z" fill="#38BDF8" />
            </>
          )}
        </g>
      </g>
    </g>
  );
};

/**
 * SET 2: Cosmic Astronaut Helmet -> Zero-G Moonwalk -> UFO ABDUCTION UPSIDE-DOWN SPIN!
 */
export const CosmicUfoActor: React.FC<ComedyActorProps> = ({
  beatInBar,
  beatProgress,
  animClock,
  scale = 1,
}) => {
  const isBeam = beatInBar >= 2;
  const isUpsideDown = beatInBar === 3;
  const floatY = isBeam
    ? -26 - Math.sin(beatProgress * Math.PI) * 32
    : -12 + Math.sin(animClock * 4) * 9;
  const rotDeg = isUpsideDown
    ? 180 + Math.sin(beatProgress * Math.PI * 2) * 18
    : beatInBar === 2
    ? -28
    : Math.sin(animClock * 3) * 12;

  return (
    <g>
      {beatInBar === 2 && <ComicWordPop x={64} y={-56} text="살려줘!!" color="#059669" rotate={8} />}
      {isUpsideDown && <ComicWordPop x={-68} y={-54} text="어지러워@" color="#7C3AED" rotate={-10} />}

      <g transform={`translate(0, ${floatY}) scale(${scale}) rotate(${rotDeg})`}>
        {/* Jet Backpack */}
        <rect x="-12" y="-16" width="24" height="28" rx="6" fill="#E2E8F0" stroke="#0F172A" strokeWidth="2.6" />
        <line x1="0" y1="-19" x2="0" y2="15" stroke="#FFFFFF" strokeWidth="6.5" strokeLinecap="round" />
        <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="3.5" strokeLinecap="round" />

        {/* Flailing Zero-G Arms & Legs */}
        <path d={`M-2 -10 Q-20 ${Math.sin(animClock * 12) * 12} -28 -26`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
        <path d={`M2 -10 Q20 ${-Math.sin(animClock * 12) * 12} 28 -26`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
        <path d={`M-3 14 Q-16 28 ${-16 + Math.sin(animClock * 14) * 8} 44`} fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={-16 + Math.sin(animClock * 14) * 8} cy="46" rx="8.5" ry="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />
        <path d={`M3 14 Q16 28 ${16 - Math.sin(animClock * 14) * 8} 44`} fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={16 - Math.sin(animClock * 14) * 8} cy="46" rx="8.5" ry="5" fill="#38BDF8" stroke="#0F172A" strokeWidth="2" />

        {/* Glass Space Helmet + Goofy Face */}
        <g transform="translate(0, -35)">
          <circle cx="0" cy="0" r="22" fill="#BAE6FD" fillOpacity="0.45" stroke="#0284C7" strokeWidth="3" />
          <circle cx="0" cy="0" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
          {isBeam ? (
            <>
              {/* Giant Bug-Eyes + Wavy Tongue! */}
              <circle cx="-6" cy="-3" r="4.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="-5" cy="-3" r="2" fill="#0F172A" />
              <circle cx="6" cy="-3" r="4.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
              <circle cx="7" cy="-3" r="2" fill="#0F172A" />
              <ellipse cx="0" cy="7" rx="5.5" ry="4" fill="#F43F5E" stroke="#0F172A" strokeWidth="1.8" />
              <ellipse cx="2" cy="10" rx="3" ry="4" fill="#FB7185" stroke="#0F172A" strokeWidth="1.4" />
            </>
          ) : (
            <>
              {/* Goofy Happy Moonwalker Grin */}
              <circle cx="-6" cy="-2" r="2.8" fill="#0F172A" />
              <circle cx="6" cy="-2" r="2.8" fill="#0F172A" />
              <path d="M-7 5 Q0 12 7 5" fill="none" stroke="#0F172A" strokeWidth="2.5" strokeLinecap="round" />
            </>
          )}
          {/* Helmet Shine */}
          <path d="M-12 -13 Q-6 -18 2 -16" fill="none" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        </g>
      </g>
    </g>
  );
};

/**
 * SET 3: Tall Puffy Chef Hat -> Chili Bite -> TOMATO RED FACE + FIRE BREATHING + NOODLE JUMP!
 */
export const KitchenSpicyActor: React.FC<ComedyActorProps> = ({
  beatInBar,
  beatProgress,
  scale = 1,
}) => {
  const isSpicyFire = beatInBar === 2;
  const isNoodleJump = beatInBar === 3;
  const jumpY = isNoodleJump
    ? -Math.sin(beatProgress * Math.PI) * 44
    : isSpicyFire
    ? -Math.abs(Math.sin(beatProgress * Math.PI * 3)) * 12
    : -Math.exp(-beatProgress * 6) * 8;
  const headTint = isSpicyFire ? '#FCA5A5' : isNoodleJump ? '#FECDD3' : '#FFFFFF';

  return (
    <g>
      {isSpicyFire && <ComicWordPop x={-68} y={-52} text="매워!!🔥" color="#DC2626" rotate={-10} />}
      {isNoodleJump && <ComicWordPop x={64} y={-50} text="호로록!!" color="#D97706" rotate={10} />}

      <g transform={`translate(0, ${jumpY}) scale(${scale})`}>
        <ellipse cx="0" cy={52 - jumpY / scale} rx="26" ry="6.5" fill="#0F172A" opacity="0.2" />

        {/* Chef Apron + Spatula */}
        <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
        <path d="M-8 -8 H8 L11 16 H-11 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />

        {/* Bouncy Legs */}
        <path d={`M-3 14 Q-14 30 ${isNoodleJump ? -18 : -10} ${isNoodleJump ? 38 : 46}`} fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={isNoodleJump ? -18 : -10} cy={isNoodleJump ? 40 : 48} rx="8.5" ry="4.5" fill="#F97316" stroke="#0F172A" strokeWidth="2" />
        <path d={`M3 14 Q14 30 ${isNoodleJump ? 18 : 10} ${isNoodleJump ? 38 : 46}`} fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <ellipse cx={isNoodleJump ? 18 : 10} cy={isNoodleJump ? 40 : 48} rx="8.5" ry="4.5" fill="#F97316" stroke="#0F172A" strokeWidth="2" />

        {/* Arms (Right hand holds Giant Chili or Spatula!) */}
        <path d={`M-1 -10 Q-20 ${isNoodleJump ? -32 : 0} -28 ${isNoodleJump ? -44 : -12}`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
        <path d={`M1 -10 Q20 ${isNoodleJump ? -32 : 0} 28 ${isNoodleJump ? -44 : -14}`} fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
        <text x="32" y={isNoodleJump ? -48 : -18} fontSize="20" textAnchor="middle">
          {beatInBar < 2 ? '🍳' : '🌶️'}
        </text>

        {/* Steam Ears + Fire Jet on Spicy Beat 3 */}
        {isSpicyFire && (
          <>
            <circle cx="-26" cy="-35" r="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.8" />
            <circle cx="26" cy="-35" r="7" fill="#FFFFFF" stroke="#94A3B8" strokeWidth="1.8" />
            <polygon points="8,-26 42,-36 32,-24 46,-18 8,-22" fill="#F97316" stroke="#DC2626" strokeWidth="2" />
          </>
        )}

        {/* Chef Head + Puffy Chef Toque Hat */}
        <g transform="translate(0, -35)">
          <circle cx="0" cy="0" r="16" fill={headTint} stroke="#0F172A" strokeWidth="3.8" />
          {/* Tall Puffy White Chef Hat */}
          <path d="M-13 -14 C-20 -24, -12 -34, -4 -30 C0 -36, 10 -34, 14 -26 C20 -22, 16 -14, 13 -14 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />

          {isSpicyFire ? (
            <>
              {/* Crying Spicy >_< Eyes + Giant Screaming Fire Mouth! */}
              <path d="M-10 -5 L-4 -2 L-10 1" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
              <path d="M10 -5 L4 -2 L10 1" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
              <ellipse cx="0" cy="7" rx="7" ry="5.2" fill="#DC2626" stroke="#0F172A" strokeWidth="1.8" />
            </>
          ) : (
            <>
              {/* Cheesy Winking Chef Face + Mustache! */}
              <path d="M-9 -3 Q-6 -7 -3 -3" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
              <circle cx="6" cy="-3" r="2.6" fill="#0F172A" />
              <path d="M-8 3 Q-4 0 0 3 Q4 0 8 3" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
              <path d="M-5 7 Q0 11 5 7" fill="none" stroke="#E11D48" strokeWidth="2.2" strokeLinecap="round" />
            </>
          )}
        </g>
      </g>
    </g>
  );
};

export const ChantComedyActorSwitch: React.FC<ComedyActorProps & { setId: ChantComedySetId }> = ({
  setId,
  ...props
}) => {
  switch (setId) {
    case 1:
      return <KungfuBananaActor {...props} />;
    case 2:
      return <CosmicUfoActor {...props} />;
    case 3:
      return <KitchenSpicyActor {...props} />;
    default:
      return <GrooveDiscoActor {...props} />;
  }
};
