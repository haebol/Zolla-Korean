import React from 'react';

/**
 * Comical inline SVG Muscular Bodybuilder Rabbit carrying a giant carrot & wearing shades (ㅌ & ㅍ cameo).
 * Faces right by default so scale(-1, 1) aims flying side-kicks left at Jollaman!
 */
export const MuscularRabbitSvg: React.FC = () => (
  <g>
    {/* Fluffy White Rabbit Tail */}
    <circle cx="-48" cy="24" r="14" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3.5" />

    {/* Tall Muscular Rabbit Ears */}
    <ellipse cx="-14" cy="-64" rx="11" ry="28" transform="rotate(-12, -14, -64)" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="-14" cy="-62" rx="5.5" ry="18" transform="rotate(-12, -14, -62)" fill="#FDA4AF" />
    <ellipse cx="14" cy="-64" rx="11" ry="28" transform="rotate(14, 14, -64)" fill="#F8FAFC" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="14" cy="-62" rx="5.5" ry="18" transform="rotate(14, 14, -62)" fill="#FDA4AF" />

    {/* Back Leg (planted / coiled) */}
    <path d="M-24 38 Q-44 58 -36 80 L-12 80 Q-8 56 -6 38 Z" fill="#F1F5F9" stroke="#0F172A" strokeWidth="3.5" />
    {/* Flying Taekwondo Side-Kick Leg kicking forward-right! */}
    <path d="M16 32 Q54 22 86 8 Q94 18 82 28 Q50 42 18 48 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
    <ellipse cx="86" cy="14" rx="13" ry="8" transform="rotate(-18, 86, 14)" fill="#FDE047" stroke="#0F172A" strokeWidth="3" />

    {/* Buff Bodybuilder Chest + 6-Pack Abs */}
    <path d="M-40 -14 Q0 -26 40 -14 Q48 16 32 42 Q0 48 -32 42 Q-48 16 -40 -14 Z" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
    {/* Black Martial Arts Belt */}
    <rect x="-33" y="28" width="66" height="10" rx="3" fill="#0F172A" />
    <rect x="-6" y="26" width="12" height="14" rx="2" fill="#FACC15" stroke="#0F172A" strokeWidth="2" />
    {/* Pecs & Six-pack Comic Lines */}
    <path d="M-26 -2 Q-12 8 0 0 Q12 8 26 -2" fill="none" stroke="#334155" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M-12 10 H12 M-11 19 H11 M0 6 V24" stroke="#64748B" strokeWidth="2.2" strokeLinecap="round" />

    {/* Giant Flexed Left Bicep Holding Oversized Carrot */}
    <path d="M-36 -8 Q-68 -18 -64 12 Q-52 24 -32 10" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
    <circle cx="-54" cy="-6" r="14" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />
    {/* Giant Crunchy Orange Carrot */}
    <g transform="translate(-62, -6) rotate(-25)">
      <polygon points="-8,-44 10,-44 1,18" fill="#F97316" stroke="#9A3412" strokeWidth="2.8" />
      <path d="M-5 -30 H5 M-4 -18 H4" stroke="#9A3412" strokeWidth="2" strokeLinecap="round" />
      <path d="M-2 -44 Q-12 -62 -2 -60 Q2 -66 6 -58 Q14 -62 4 -44 Z" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
    </g>

    {/* Flexed Right Punching Arm */}
    <path d="M36 -8 Q66 -22 68 2 Q56 16 36 8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
    <circle cx="58" cy="-4" r="13" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.2" />

    {/* Tough Head + Cool Sunglasses + Fierce Smirk */}
    <circle cx="0" cy="-32" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
    {/* Cool Dark Sunglasses */}
    <rect x="-20" y="-42" width="18" height="11" rx="3" fill="#0F172A" />
    <rect x="2" y="-42" width="18" height="11" rx="3" fill="#0F172A" />
    <line x1="-2" y1="-38" x2="2" y2="-38" stroke="#0F172A" strokeWidth="3" />
    <line x1="-16" y1="-39" x2="-9" y2="-34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    <line x1="6" y1="-39" x2="13" y2="-34" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.8" />
    {/* Pink Nose + Confident Grin */}
    <polygon points="-4,-28 4,-28 0,-23" fill="#FB7185" />
    <path d="M-9 -18 Q0 -12 10 -19" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
  </g>
);

export type VowelCharKey = 'ㅏ' | 'ㅑ' | 'ㅓ' | 'ㅕ' | 'ㅗ' | 'ㅛ' | 'ㅜ' | 'ㅠ' | 'ㅡ' | 'ㅣ';

export type JollamanFaceMode =
  | 'happy'
  | 'panic'
  | 'dizzy'
  | 'burnt'
  | 'muddy'
  | 'squashed'
  | 'swollenRed'
  | 'jellyMelt'
  | 'iceCreamSplat'
  | 'frozenCube'
  | 'inked'
  | 'glassSquish'
  | 'greenPoison'
  | 'fainted'
  | 'crying'
  | 'parentTeary'
  | 'headClutch';

export interface JollamanCharacterProps {
  faceMode: JollamanFaceMode;
  isWalking: boolean;
  legSwing: number;
  armSwing: number;
  showHeadBump?: boolean;
  showXraySkeleton?: boolean;
  headOnFire?: boolean;
  stomachHole?: boolean;
  fishbowlHead?: boolean;
  walkTime: number;
  activeChar: string;
}

/**
 * Refined, articulated comic Jollaman character with sneakers, expressive eyes/brows,
 * dynamic shading, and expressive gag states.
 */
export const JollamanCharacterSvg: React.FC<JollamanCharacterProps> = ({
  faceMode,
  isWalking,
  legSwing,
  armSwing,
  showHeadBump = false,
  showXraySkeleton = false,
  headOnFire = false,
  stomachHole = false,
  fishbowlHead = false,
  walkTime,
  activeChar,
}) => {
  // Shivering terrified Jollaman keeping full stickman silhouette for ㅅ lion roar!
  if (faceMode === 'jellyMelt') {
    const shakeX = Math.sin(walkTime * 62) * 2.5;
    const shakeY = Math.cos(walkTime * 48) * 0.9;
    const sweatY = -44 + ((walkTime * 24) % 14);
    return (
      <g transform={`translate(${shakeX}, ${shakeY})`}>
        {/* Shivering legs & knocking knees with red sneakers */}
        <path d="M-2 14 L-9 30 L-13 46" fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="-10" cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
        <path d="M2 14 L9 30 L13 46" fill="none" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="16" cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />

        {/* Slightly hunched shivering stick torso */}
        <path d="M-1 -18 Q-4 -2 0 15" fill="none" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />

        {/* Arms drawn tight in fear, hands trembling near chin/chest */}
        <path d="M-1 -12 L-16 -2 L-10 -15" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="-10" cy="-16" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        <path d="M1 -12 L15 -2 L9 -15" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="9" cy="-16" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

        {/* Full stickman head + hair tuft */}
        <circle cx="0" cy="-35" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.2" />
        <path d="M-2 -51 Q3 -60 8 -53" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />

        {/* Raised scared brows & wide terrified eyes looking at lion */}
        <path d="M-9 -44 Q-5 -47 -1 -44 M1 -44 Q5 -47 9 -44" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
        <circle cx="-4.5" cy="-37" r="3.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
        <circle cx="5.5" cy="-37" r="3.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.5" />
        <circle cx={-3.5 + Math.cos(walkTime * 45) * 0.9} cy="-37" r="1.4" fill="#0F172A" />
        <circle cx={6.5 + Math.cos(walkTime * 45) * 0.9} cy="-37" r="1.4" fill="#0F172A" />

        {/* Chattering trembling wavy mouth */}
        <path
          d="M-6 -26 L-3 -28 L0 -25 L3 -28 L6 -26"
          fill="none"
          stroke="#0F172A"
          strokeWidth="2.3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Cold sweat drop */}
        <path d={`M-13 ${sweatY} Q-16 ${sweatY + 5} -13 ${sweatY + 8} Q-10 ${sweatY + 5} -13 ${sweatY} Z`} fill="#38BDF8" stroke="#0284C7" strokeWidth="1.2" />

        {/* Comic trembling lines ((( ))) */}
        <path d="M-22 -42 Q-26 -35 -22 -28 M-27 -40 Q-30 -35 -27 -30" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <path d="M22 -42 Q26 -35 22 -28 M27 -40 Q30 -35 27 -30" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
        <path d="M-21 4 Q-24 12 -21 20 M21 4 Q24 12 21 20" fill="none" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }

  const limbColor =
    faceMode === 'burnt'
      ? showXraySkeleton
        ? '#FFFFFF'
        : '#0F172A'
      : faceMode === 'muddy'
      ? '#78350F'
      : faceMode === 'inked'
      ? '#09090B'
      : faceMode === 'frozenCube'
      ? '#0284C7'
      : faceMode === 'greenPoison'
      ? '#15803D'
      : '#0F172A';

  const headRadius = 16;
  const headFill =
    faceMode === 'burnt'
      ? showXraySkeleton
        ? '#FFFFFF'
        : '#1E293B'
      : faceMode === 'muddy'
      ? '#92400E'
      : faceMode === 'inked'
      ? '#09090B'
      : faceMode === 'frozenCube'
      ? '#BAE6FD'
      : faceMode === 'greenPoison'
      ? '#86EFAC'
      : faceMode === 'swollenRed'
      ? '#F87171'
      : '#FFFFFF';

  const legL = isWalking ? legSwing : -14;
  const legR = isWalking ? -legSwing : 14;
  const armL = isWalking ? armSwing : -23;
  const armR = isWalking ? -armSwing : 23;

  return (
    <g>
      {/* Rising smoke wisps when electrocuted */}
      {faceMode === 'burnt' && (
        <g opacity="0.78">
          <circle cx={-9 + Math.sin(walkTime * 6) * 4} cy={-60 - ((walkTime * 18) % 16)} r="5.5" fill="#94A3B8" />
          <circle cx={9 - Math.sin(walkTime * 5) * 4} cy={-66 - ((walkTime * 15 + 6) % 18)} r="4.5" fill="#CBD5E1" />
        </g>
      )}

      {/* Dripping black squid ink blobs head-to-toe when inked! */}
      {faceMode === 'inked' && (
        <g fill="#09090B">
          <circle cx="-13" cy={-24 + ((walkTime * 28) % 16)} r="3.2" />
          <circle cx="14" cy={-18 + ((walkTime * 24 + 6) % 18)} r="2.8" />
          <circle cx="-6" cy={18 + ((walkTime * 30) % 20)} r="3" />
          <ellipse cx="0" cy="52" rx="34" ry="8" opacity="0.92" />
        </g>
      )}

      {/* Left & Right Legs with Sneakers */}
      <line x1="-2" y1="14" x2={legL} y2="46" stroke={limbColor} strokeWidth="5.2" strokeLinecap="round" />
      <ellipse
        cx={legL + 4}
        cy="48"
        rx="8"
        ry="4.5"
        fill={faceMode === 'muddy' ? '#78350F' : faceMode === 'inked' ? '#09090B' : '#EF4444'}
        stroke="#0F172A"
        strokeWidth="2.2"
      />

      <line x1="2" y1="14" x2={legR} y2="46" stroke={limbColor} strokeWidth="5.2" strokeLinecap="round" />
      <ellipse
        cx={legR + 4}
        cy="48"
        rx="8"
        ry="4.5"
        fill={faceMode === 'muddy' ? '#78350F' : faceMode === 'inked' ? '#09090B' : '#EF4444'}
        stroke="#0F172A"
        strokeWidth="2.2"
      />

      {/* Torso (Split with a giant punched-out hole if stomachHole === true!) */}
      {stomachHole ? (
        <g>
          <line x1="0" y1="-19" x2="0" y2="-11" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
          <line x1="0" y1="9" x2="0" y2="15" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
          <circle cx="0" cy="-1" r="10" fill="#BAE6FD" stroke="#0F172A" strokeWidth="3.5" strokeDasharray="4 3" />
        </g>
      ) : (
        <line x1="0" y1="-19" x2="0" y2="15" stroke={limbColor} strokeWidth="6.5" strokeLinecap="round" />
      )}
      {showXraySkeleton && (
        <g stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round">
          <line x1="-8" y1="-12" x2="8" y2="-12" />
          <line x1="-9" y1="-5" x2="9" y2="-5" />
          <line x1="-7" y1="2" x2="7" y2="2" />
        </g>
      )}

      {/* Left & Right Arms with White Cartoon Gloves (clutching head or normal swing) */}
      {faceMode === 'headClutch' ? (
        <>
          <path d="M0 -12 Q-26 -20 -18 -36" fill="none" stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="-18" cy="-36" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <path d="M0 -12 Q26 -20 18 -36" fill="none" stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle cx="18" cy="-36" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </>
      ) : (
        <>
          <line x1="0" y1="-12" x2={armL} y2={isWalking ? 11 : -24} stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle
            cx={armL}
            cy={isWalking ? 11 : -24}
            r="4.2"
            fill={faceMode === 'muddy' ? '#92400E' : faceMode === 'inked' ? '#09090B' : '#FFFFFF'}
            stroke="#0F172A"
            strokeWidth="2"
          />

          <line x1="0" y1="-12" x2={armR} y2={isWalking ? 11 : -24} stroke={limbColor} strokeWidth="4.6" strokeLinecap="round" />
          <circle
            cx={armR}
            cy={isWalking ? 11 : -24}
            r="4.2"
            fill={faceMode === 'muddy' ? '#92400E' : faceMode === 'inked' ? '#09090B' : '#FFFFFF'}
            stroke="#0F172A"
            strokeWidth="2"
          />
        </>
      )}

      {/* Head (square ㅁ-shape when bitten red in Consonant ㅁ) */}
      {faceMode === 'swollenRed' && activeChar === 'ㅁ' ? (
        <rect
          x={-headRadius}
          y={-35 - headRadius}
          width={headRadius * 2}
          height={headRadius * 2}
          rx="2.5"
          fill={headFill}
          stroke="#DC2626"
          strokeWidth="4.2"
        />
      ) : (
        <circle
          cx="0"
          cy="-35"
          r={headRadius}
          fill={headFill}
          stroke={faceMode === 'swollenRed' ? '#DC2626' : faceMode === 'frozenCube' ? '#0369A1' : '#0F172A'}
          strokeWidth="4.2"
        />
      )}
      {/* Cute Jollaman hair tuft (spiky when burnt!) */}
      {faceMode === 'burnt' ? (
        <path d="M-8 -50 L-12 -60 L-3 -53 L2 -62 L7 -52 L14 -58 L9 -49" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
      ) : (
        <path d="M-2 -51 Q3 -60 8 -53" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      )}

      {/* Red Cartoon Head Bump ("혹") */}
      {showHeadBump && (
        <ellipse
          cx={activeChar === 'ㅇ' ? -6 : 0}
          cy="-54"
          rx="8"
          ry={9.5 + Math.sin(walkTime * 18) * 1.5}
          fill="#EF4444"
          stroke="#991B1B"
          strokeWidth="2.5"
        />
      )}

      {/* Animated Flames on Head when ignited by SpaceX Rocket landing (ㄹ)! */}
      {headOnFire && (
        <g transform={`translate(0, -52) scale(${1 + Math.sin(walkTime * 26) * 0.12}, ${1 + Math.cos(walkTime * 28) * 0.16})`}>
          <path
            d="M-16 4 Q-22 -18 -8 -24 Q-4 -42 4 -22 Q18 -34 14 -10 Q24 -4 14 6 Z"
            fill="#F97316"
            stroke="#DC2626"
            strokeWidth="2.2"
          />
          <path
            d="M-8 4 Q-10 -12 -2 -16 Q2 -28 6 -12 Q12 -18 8 4 Z"
            fill="#FACC15"
          />
          <circle cx={-6 + Math.sin(walkTime * 10) * 4} cy={-34 - ((walkTime * 22) % 16)} r="4.5" fill="#94A3B8" opacity="0.7" />
          <circle cx={7 - Math.sin(walkTime * 9) * 4} cy={-40 - ((walkTime * 18 + 6) % 16)} r="3.5" fill="#CBD5E1" opacity="0.65" />
        </g>
      )}

      {/* Colorful Ice Cream Splat topping on head (ㅏ)! */}
      {faceMode === 'iceCreamSplat' && (
        <g>
          <path d="M-15 -42 Q-8 -58 2 -52 Q12 -58 16 -41 Q8 -34 2 -40 Q-7 -32 -15 -42 Z" fill="#F472B6" stroke="#DB2777" strokeWidth="2" />
          <path d="M-12 -32 Q-6 -20 -4 -30" fill="#34D399" stroke="#059669" strokeWidth="1.5" />
          <path d="M6 -31 Q11 -16 14 -29" fill="#FBBF24" stroke="#D97706" strokeWidth="1.5" />
          <circle cx="0" cy="-58" r="5" fill="#EF4444" stroke="#991B1B" strokeWidth="1.8" />
        </g>
      )}

      {/* Expressive Faces */}
      {faceMode === 'happy' && (
        <>
          <circle cx="5.5" cy="-37" r="2.3" fill="#0F172A" />
          <path d="M2 -43 L9 -42" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M1 -29 Q7 -25 12 -30" fill="none" stroke="#0F172A" strokeWidth="2.3" strokeLinecap="round" />
        </>
      )}
      {(faceMode === 'panic' || faceMode === 'swollenRed' || faceMode === 'iceCreamSplat' || faceMode === 'headClutch') && (
        <>
          <circle cx="-4.5" cy="-38" r="2.4" fill="#0F172A" />
          <circle cx="5.5" cy="-38" r="2.4" fill="#0F172A" />
          <path d="M-8 -44 L-2 -42 M8 -44 L2 -42" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <ellipse cx="0.5" cy="-27" rx="4.5" ry="5.5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.6" />
        </>
      )}
      {faceMode === 'frozenCube' && (
        <>
          <circle cx="-5" cy="-38" r="2.5" fill="#0369A1" />
          <circle cx="5" cy="-38" r="2.5" fill="#0369A1" />
          <path d="M-8 -28 L-4 -26 L0 -29 L4 -26 L8 -28" fill="none" stroke="#0369A1" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {faceMode === 'glassSquish' && (
        <>
          <ellipse cx="-5" cy="-37" rx="4" ry="2.2" fill="#0F172A" />
          <ellipse cx="5" cy="-37" rx="4" ry="2.2" fill="#0F172A" />
          <ellipse cx="0" cy="-31" rx="6" ry="3.2" fill="#FECACA" stroke="#0F172A" strokeWidth="1.6" />
          <path d="M-5 -25 Q0 -23 5 -25" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
      {(faceMode === 'dizzy' || faceMode === 'squashed' || faceMode === 'greenPoison' || faceMode === 'fainted') && (
        <>
          <path d="M-7 -40 L-2 -34 M-2 -40 L-7 -34" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M2 -40 L7 -34 M7 -40 L2 -34" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M-3 -26 Q1 -29 5 -26" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </>
      )}
      {(faceMode === 'burnt' || faceMode === 'muddy' || faceMode === 'inked') && (
        <>
          <circle cx="-5" cy="-37" r="3.4" fill="#FFFFFF" />
          <circle cx="5" cy="-37" r="3.4" fill="#FFFFFF" />
          <circle cx="-5" cy="-37" r="1.5" fill="#0F172A" />
          <circle cx="5" cy="-37" r="1.5" fill="#0F172A" />
          <path d="M-3 -27 Q1 -30 5 -27" fill="none" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" />
        </>
      )}
      {faceMode === 'crying' && (
        <>
          {/* Streaming comic blue tears */}
          <path
            d={`M-6 -35 Q-13 ${-24 + Math.sin(walkTime * 20) * 2} -14 -16`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path
            d={`M6 -35 Q13 ${-24 + Math.cos(walkTime * 20) * 2} 14 -16`}
            fill="none"
            stroke="#38BDF8"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <circle cx={-15} cy={-12 + ((walkTime * 28) % 10)} r="2.5" fill="#38BDF8" />
          <circle cx={15} cy={-12 + ((walkTime * 24 + 5) % 10)} r="2.5" fill="#38BDF8" />
          {/* Squinted sad T_T eyes & trembling mouth */}
          <path d="M-8 -39 L-2 -36 L-8 -33" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 -39 L2 -36 L8 -33" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M-5 -25 Q0 -30 5 -25" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        </>
      )}
      {faceMode === 'parentTeary' && (
        <>
          {/* Tired droopy parent brows */}
          <path d="M-9 -44 Q-5 -42 -2 -44" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          <path d="M9 -44 Q5 -42 2 -44" fill="none" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
          {/* Weary eyes */}
          <circle cx="-5" cy="-37" r="2.2" fill="#0F172A" />
          <circle cx="5" cy="-37" r="2.2" fill="#0F172A" />
          {/* Small welling teardrops ("눈물을 찔끔") */}
          <path
            d={`M-7 -33 Q-9 ${-29 + Math.sin(walkTime * 8) * 1.2} -7 ${-26 + Math.sin(walkTime * 8) * 1.2} Q-5 ${-29 + Math.sin(walkTime * 8) * 1.2} -7 -33 Z`}
            fill="#38BDF8"
            stroke="#0284C7"
            strokeWidth="0.9"
          />
          <circle cx="7" cy={-31 + ((walkTime * 14) % 7)} r="2" fill="#38BDF8" />
          {/* Tiny exhaustion sweat drop */}
          <path d="M12 -47 Q15 -42 12 -39 Q9 -42 12 -47 Z" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1" />
          {/* Helpless wobbly sigh mouth */}
          <path d="M-4 -27 Q0 -29 4 -27" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
        </>
      )}

      {/* Fishbowl stuck over head with sloshing water + goldfish staring eye-to-eye (ㅓ)! */}
      {fishbowlHead && (
        <g transform="translate(0, -35)">
          <circle cx="0" cy="0" r="29" fill="#7DD3FC" fillOpacity="0.45" stroke="#0284C7" strokeWidth="3.2" />
          <path d="M-27 4 Q0 12 27 4 A28 28 0 0 1 -27 4 Z" fill="#38BDF8" fillOpacity="0.48" />
          {/* Tiny orange goldfish swimming right at nose level! */}
          <g transform={`translate(${12 + Math.sin(walkTime * 8) * 3}, ${Math.cos(walkTime * 7) * 3})`}>
            <ellipse cx="0" cy="0" rx="7" ry="4.5" fill="#F97316" stroke="#9A3412" strokeWidth="1.5" />
            <polygon points="6,0 12,-4 12,4" fill="#FB923C" stroke="#9A3412" strokeWidth="1.2" />
            <circle cx="-3" cy="-1" r="1.2" fill="#0F172A" />
          </g>
          {/* Rising air bubbles */}
          <circle cx="-12" cy={-10 - ((walkTime * 20) % 12)} r="2.8" fill="#FFFFFF" opacity="0.85" />
          <circle cx="4" cy={-14 - ((walkTime * 16 + 4) % 12)} r="2.2" fill="#FFFFFF" opacity="0.85" />
          {/* Glass shine */}
          <path d="M-18 -16 Q-10 -22 -2 -18" fill="none" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
        </g>
      )}
    </g>
  );
};

/**
 * High-detail Skinny Sleek Mosquito (ㅁ) aiming at Jollaman's face
 */
export const SkinnyMosquitoSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const wingFlap = Math.sin(walkTime * 54) * 26;
  return (
    <g>
      {/* Rapidly buzzing translucent wings */}
      <ellipse
        cx="14"
        cy="-18"
        rx="28"
        ry="7"
        transform={`rotate(${wingFlap - 22}, 8, -10)`}
        fill="#E0F2FE"
        fillOpacity="0.82"
        stroke="#64748B"
        strokeWidth="1.6"
      />
      <ellipse
        cx="18"
        cy="-14"
        rx="24"
        ry="5.5"
        transform={`rotate(${-wingFlap - 12}, 10, -10)`}
        fill="#BAE6FD"
        fillOpacity="0.72"
        stroke="#64748B"
        strokeWidth="1.5"
      />

      {/* 6 long needle-thin jointed insect legs */}
      <path d="M-4 2 L-16 20 L-24 34" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M6 3 L2 24 L-4 38" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M18 3 L24 24 L32 36" fill="none" stroke="#1E293B" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M26 2 L38 18 L48 30" fill="none" stroke="#1E293B" strokeWidth="2" strokeLinecap="round" />

      {/* Sleek slender striped abdomen (NOT fat!) */}
      <path
        d="M-6 -2 Q16 -9 44 2 Q48 6 42 10 Q14 7 -6 4 Z"
        fill="#334155"
        stroke="#0F172A"
        strokeWidth="2.2"
      />
      <line x1="12" y1="-4" x2="12" y2="7" stroke="#CBD5E1" strokeWidth="2.4" />
      <line x1="22" y1="-3" x2="22" y2="8" stroke="#CBD5E1" strokeWidth="2.4" />
      <line x1="32" y1="-1" x2="32" y2="8" stroke="#CBD5E1" strokeWidth="2.2" />

      {/* Thorax */}
      <ellipse cx="-10" cy="0" rx="8" ry="6" fill="#475569" stroke="#0F172A" strokeWidth="2.2" />
      {/* Tiny Head + Big Angry Red Eye + Razor-thin Proboscis Needle */}
      <circle cx="-21" cy="-2" r="6" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
      <circle cx="-23" cy="-4" r="2.6" fill="#EF4444" />
      <polygon points="-26,-2 -64,2 -26,1" fill="#64748B" stroke="#0F172A" strokeWidth="1.2" />
    </g>
  );
};

/**
 * Detailed Fierce-Cute Striped Tiger (ㅎ)
 */
export const TigerSpriteSvg: React.FC<{
  walkTime: number;
  isSpinning?: boolean;
  badgeChar?: string;
}> = ({
  walkTime,
  isSpinning = false,
  badgeChar,
}) => {
  const tailWag = Math.sin(walkTime * 12) * 14;
  return (
    <g>
      {/* Swishing striped tail */}
      <path
        d={`M48 4 Q80 ${-16 + tailWag} 84 -36`}
        fill="none"
        stroke="#F97316"
        strokeWidth="10"
        strokeLinecap="round"
      />
      <path
        d={`M48 4 Q80 ${-16 + tailWag} 84 -36`}
        fill="none"
        stroke="#1E293B"
        strokeWidth="10"
        strokeDasharray="6 10"
        strokeLinecap="round"
      />

      {/* Hind & Front Paws */}
      <rect x="-32" y="22" width="18" height="34" rx="7" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
      <rect x="26" y="22" width="18" height="34" rx="7" fill="#FB923C" stroke="#9A3412" strokeWidth="2.5" />
      <ellipse cx="-26" cy="54" rx="11" ry="6" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <ellipse cx="32" cy="54" rx="11" ry="6" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

      {/* Muscular Orange Striped Body */}
      <ellipse cx="6" cy="6" rx="52" ry="28" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
      <ellipse cx="6" cy="22" rx="38" ry="12" fill="#FFEDD5" />
      {/* Bold black tiger stripes on back */}
      <path d="M-16 -20 L-10 -2 L-22 -18" fill="#0F172A" />
      <path d="M2 -22 L8 -2 L-4 -20" fill="#0F172A" />
      <path d="M20 -20 L24 -2 L14 -18" fill="#0F172A" />
      {badgeChar && (
        <g transform="translate(18, 5)">
          <circle cx="0" cy="0" r="15.5" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.6" />
          <text x="0" y="7" textAnchor="middle" fontSize="21" fontWeight="900" fill="#E11D48">
            {badgeChar}
          </text>
        </g>
      )}

      {/* Tiger Head */}
      <g transform="translate(-46, -16)">
        {/* Rounded Ears */}
        <circle cx="-16" cy="-22" r="10" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" />
        <circle cx="16" cy="-22" r="10" fill="#F97316" stroke="#9A3412" strokeWidth="2.5" />
        <circle cx="-16" cy="-22" r="5" fill="#1E293B" />
        <circle cx="16" cy="-22" r="5" fill="#1E293B" />
        {/* Face */}
        <circle cx="0" cy="0" r="27" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
        {/* White cheeks & chin */}
        <ellipse cx="-10" cy="8" rx="12" ry="10" fill="#FFF7ED" />
        <ellipse cx="10" cy="8" rx="12" ry="10" fill="#FFF7ED" />
        {/* Forehead 王 stripe mark */}
        <path d="M-8 -16 L8 -16 M-6 -10 L6 -10 M0 -18 L0 -8" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
        {/* Cheek stripes */}
        <path d="M-24 -2 L-16 0 M-25 5 L-17 6 M24 -2 L16 0 M25 5 L17 6" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        {/* Eyes (dizzy swirls if spinning fast!) */}
        {isSpinning ? (
          <>
            <circle cx="-10" cy="-4" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <circle cx="10" cy="-4" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <circle cx="-10" cy="-4" r="2" fill="#0F172A" />
            <circle cx="10" cy="-4" r="2" fill="#0F172A" />
          </>
        ) : (
          <>
            <circle cx="-10" cy="-4" r="3.8" fill="#0F172A" />
            <circle cx="10" cy="-4" r="3.8" fill="#0F172A" />
            <circle cx="-9" cy="-5" r="1.3" fill="#FFFFFF" />
            <circle cx="11" cy="-5" r="1.3" fill="#FFFFFF" />
          </>
        )}
        {/* Pink nose & happy fierce grin */}
        <polygon points="-4,3 4,3 0,8" fill="#F43F5E" />
        <path d="M-7 13 Q0 19 7 13" fill="#DC2626" stroke="#0F172A" strokeWidth="2" />
      </g>
    </g>
  );
};

/**
 * Full-body Detailed Fierce Cartoon Lion (ㅅ) with sculpted muzzle, fangs, layered mane, torso, paws & tail
 */
export const DetailedLionSvg: React.FC<{ roaring?: boolean; badgeChar?: string }> = ({
  roaring = false,
  badgeChar,
}) => {
  return (
    <g>
      {/* Curved Tail with dark chestnut tuft */}
      <path d="M44 6 Q78 -22 72 -46" fill="none" stroke="#D97706" strokeWidth="6.5" strokeLinecap="round" />
      <path d="M72 -46 Q82 -58 68 -62 Q58 -52 72 -46 Z" fill="#78350F" stroke="#451A03" strokeWidth="2" />

      {/* Back & Front Sturdy Legs + Paws */}
      <rect x="24" y="20" width="16" height="34" rx="6" fill="#D97706" stroke="#78350F" strokeWidth="2.5" />
      <rect x="-12" y="20" width="16" height="34" rx="6" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
      <ellipse cx="29" cy="54" rx="11" ry="6" fill="#FCD34D" stroke="#78350F" strokeWidth="2" />
      <ellipse cx="-7" cy="54" rx="11" ry="6" fill="#FCD34D" stroke="#78350F" strokeWidth="2" />

      {/* Muscular Golden Lion Torso + Lighter Belly */}
      <path
        d="M-24 -12 Q14 -24 52 -6 Q62 18 46 32 Q12 36 -20 26 Z"
        fill="#F59E0B"
        stroke="#92400E"
        strokeWidth="3"
      />
      <ellipse cx="18" cy="24" rx="28" ry="10" fill="#FEF3C7" />
      {badgeChar && (
        <g transform="translate(26, 6)">
          <circle cx="0" cy="0" r="15.5" fill="#FFFFFF" stroke="#92400E" strokeWidth="2.6" />
          <text x="0" y="7" textAnchor="middle" fontSize="21" fontWeight="900" fill="#0EA5E9">
            {badgeChar}
          </text>
        </g>
      )}

      {/* Layered Jagged Fierce Lion Mane */}
      <g transform="translate(-32, -16)">
        <polygon
          points="0,-52 14,-38 34,-44 32,-24 50,-16 38,2 48,22 28,24 24,44 6,34 -10,48 -20,30 -40,34 -34,14 -52,2 -36,-14 -44,-34 -24,-32 -14,-50"
          fill="#92400E"
          stroke="#451A03"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <circle cx="0" cy="0" r="32" fill="#B45309" />

        {/* Rounded Lion Ears peeking from mane */}
        <circle cx="-22" cy="-24" r="9" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
        <circle cx="18" cy="-24" r="9" fill="#F59E0B" stroke="#78350F" strokeWidth="2.5" />
        <circle cx="-22" cy="-24" r="4" fill="#78350F" />
        <circle cx="18" cy="-24" r="4" fill="#78350F" />

        {/* Sculpted Lion Face */}
        <circle cx="-2" cy="0" r="24" fill="#FBBF24" stroke="#92400E" strokeWidth="2.5" />
        {/* Lighter Forehead/Cheek Highlights */}
        <ellipse cx="-2" cy="8" rx="17" ry="13" fill="#FDE68A" />

        {/* Fierce Angled Eyebrows & Glowing Eyes */}
        <path d="M-17 -13 L-6 -7 M13 -13 L2 -7" stroke="#451A03" strokeWidth="3.2" strokeLinecap="round" />
        <ellipse cx="-11" cy="-6" rx="3.8" ry="4.2" fill="#0F172A" />
        <ellipse cx="7" cy="-6" rx="3.8" ry="4.2" fill="#0F172A" />
        <circle cx="-10" cy="-7.5" r="1.4" fill="#FFFFFF" />
        <circle cx="8" cy="-7.5" r="1.4" fill="#FFFFFF" />

        {/* Sculpted Snout & Whiskers */}
        <polygon points="-7,1 3,1 -2,6" fill="#78350F" />
        <path d="M-20 5 L-32 3 M-20 10 L-32 12 M16 5 L28 3 M16 10 L28 12" stroke="#78350F" strokeWidth="1.8" strokeLinecap="round" />

        {/* Roaring Jaw + Sharp White Fangs */}
        {roaring ? (
          <g>
            <ellipse cx="-2" cy="15" rx="12" ry="11" fill="#7F1D1D" stroke="#451A03" strokeWidth="2" />
            <ellipse cx="-2" cy="21" rx="7" ry="4.5" fill="#F43F5E" />
            <polygon points="-10,7 -6,7 -8,14" fill="#FFFFFF" />
            <polygon points="2,7 6,7 4,14" fill="#FFFFFF" />
            <polygon points="-9,24 -6,18 -4,24" fill="#FFFFFF" />
            <polygon points="1,24 4,18 6,24" fill="#FFFFFF" />
          </g>
        ) : (
          <path d="M-9 12 Q-2 17 5 12" fill="none" stroke="#78350F" strokeWidth="2.5" strokeLinecap="round" />
        )}
      </g>
    </g>
  );
};

/**
 * SpaceX-style Reusable Landing Rocket (ㄹ 로켓) with grid fins, fold-out landing legs & roaring flames
 */
export const SpaceXRocketSvg: React.FC<{ firing?: boolean; legsDeployed?: boolean; walkTime: number }> = ({
  firing = true,
  legsDeployed = true,
  walkTime,
}) => {
  const flameFlicker = 1 + Math.sin(walkTime * 48) * 0.18;
  return (
    <g>
      {/* Roaring Thruster Exhaust Flame */}
      {firing && (
        <g transform={`translate(0, 48) scale(1, ${flameFlicker})`}>
          <path
            d="M-16 0 Q-22 36 0 72 Q22 36 16 0 Z"
            fill="#F97316"
            opacity="0.92"
          />
          <path
            d="M-9 0 Q-12 24 0 50 Q12 24 9 0 Z"
            fill="#FDE047"
          />
          <path
            d="M-4 0 L0 26 L4 0 Z"
            fill="#FFFFFF"
          />
        </g>
      )}

      {/* Fold-out Carbon Landing Legs (SpaceX Falcon style) */}
      <path
        d={legsDeployed ? 'M-14 26 L-34 52 L-24 52 L-10 38 Z' : 'M-14 14 L-18 38 L-12 38 Z'}
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="2"
      />
      <path
        d={legsDeployed ? 'M14 26 L34 52 L24 52 L10 38 Z' : 'M14 14 L18 38 L12 38 Z'}
        fill="#1E293B"
        stroke="#0F172A"
        strokeWidth="2"
      />

      {/* Engine Nozzle Bell */}
      <polygon points="-9,38 9,38 13,49 -13,49" fill="#334155" stroke="#0F172A" strokeWidth="2" />

      {/* Tall Reusable Booster Body */}
      <rect x="-15" y="-58" width="30" height="96" rx="4" fill="#F8FAFC" stroke="#1E293B" strokeWidth="3" />
      {/* Black Interstage Stripe & Grid Fins */}
      <rect x="-15" y="-44" width="30" height="16" fill="#1E293B" />
      <rect x="-24" y="-42" width="9" height="8" rx="1.5" fill="#475569" stroke="#0F172A" strokeWidth="1.5" />
      <rect x="15" y="-42" width="9" height="8" rx="1.5" fill="#475569" stroke="#0F172A" strokeWidth="1.5" />

      {/* Nose Cone */}
      <path d="M-15 -58 Q0 -96 15 -58 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2.8" />
      {/* Porthole & ㄹ Emblem */}
      <circle cx="0" cy="-10" r="10" fill="#22C55E" stroke="#15803D" strokeWidth="2" />
      <text x="0" y="-4" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF">
        ㄹ
      </text>
    </g>
  );
};

// ============================================================================
// JOLLAMAN 2: 100% COMIC VECTOR STICKMAN-MODE VOWEL SPRITES (ㅏ ~ ㅣ)
// ============================================================================

/**
 * Jollaman 2: Cozy Pastel House Interior Backdrop (NO ROAD!) for Parenting Day theme
 */
export const PastelHouseBackdrop: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const cloudDrift = Math.sin(walkTime * 0.45) * 10;
  return (
    <g>
      <defs>
        <linearGradient id="pastelHouseWall" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FCE7F3" />
          <stop offset="55%" stopColor="#FDF2F8" />
          <stop offset="100%" stopColor="#FEF3C7" />
        </linearGradient>
        <linearGradient id="pastelWoodFloor" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#FCD34D" />
        </linearGradient>
      </defs>

      {/* Soft Pastel Wallpaper */}
      <rect x="0" y="-80" width="1000" height="420" fill="url(#pastelHouseWall)" />
      {Array.from({ length: 14 }).map((_, i) => (
        <rect
          key={i}
          x={i * 76}
          y="-80"
          width="38"
          height="420"
          fill="#FBCFE8"
          opacity="0.24"
        />
      ))}

      {/* Soft Cream Wainscoting & Crown Molding */}
      <rect x="0" y="274" width="1000" height="66" fill="#FFFBEB" opacity="0.72" />
      <rect x="0" y="270" width="1000" height="7" fill="#FDE68A" />
      <rect x="0" y="334" width="1000" height="8" fill="#F59E0B" opacity="0.28" />

      {/* Sunny Pastel Living Room Window (Left) */}
      <g transform="translate(88, 92)">
        <rect x="0" y="0" width="132" height="114" rx="10" fill="#BAE6FD" stroke="#F9A8D4" strokeWidth="6" />
        <g transform={`translate(${cloudDrift}, 0)`}>
          <ellipse cx="48" cy="40" rx="22" ry="12" fill="#FFFFFF" opacity="0.9" />
          <ellipse cx="64" cy="36" rx="16" ry="11" fill="#FFFFFF" opacity="0.9" />
        </g>
        <circle cx="96" cy="30" r="13" fill="#FEF08A" />
        {/* Window Crossbars */}
        <line x1="66" y1="0" x2="66" y2="114" stroke="#FFFFFF" strokeWidth="4.5" />
        <line x1="0" y1="57" x2="132" y2="57" stroke="#FFFFFF" strokeWidth="4.5" />
        {/* Pastel Pink Curtains */}
        <path d="M-10 -6 Q18 30 6 118 L-14 118 Z" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" opacity="0.9" />
        <path d="M142 -6 Q114 30 126 118 L146 118 Z" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2" opacity="0.9" />
      </g>

      {/* Framed Cute Wall Art (Center) */}
      <g transform="translate(455, 114)">
        <rect x="0" y="0" width="90" height="68" rx="8" fill="#FFFFFF" stroke="#F472B6" strokeWidth="4" />
        <path d="M45 48 C30 37 25 25 34 20 C40 16 45 23 45 25 C45 23 50 16 56 20 C65 25 60 37 45 48 Z" fill="#FB7185" />
      </g>

      {/* Nursery Wall Shelf with Toys & Baby Bottle (Right) */}
      <g transform="translate(736, 178)">
        <rect x="0" y="28" width="154" height="11" rx="5" fill="#FDBA74" stroke="#EA580C" strokeWidth="2" opacity="0.85" />
        {/* Cute Teddy Silhouette */}
        <circle cx="34" cy="14" r="12" fill="#FDE68A" stroke="#D97706" strokeWidth="2" />
        <circle cx="24" cy="5" r="5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
        <circle cx="44" cy="5" r="5" fill="#FDE68A" stroke="#D97706" strokeWidth="1.8" />
        <circle cx="30" cy="13" r="1.6" fill="#0F172A" />
        <circle cx="38" cy="13" r="1.6" fill="#0F172A" />
        {/* Baby Milk Bottle */}
        <rect x="74" y="4" width="16" height="24" rx="4" fill="#FFFFFF" stroke="#38BDF8" strokeWidth="2" />
        <rect x="76" y="-2" width="12" height="6" rx="2" fill="#F9A8D4" />
        {/* Pastel Potted Plant */}
        <polygon points="116,28 138,28 134,12 120,12" fill="#A7F3D0" stroke="#10B981" strokeWidth="2" />
        <ellipse cx="122" cy="7" rx="6" ry="9" fill="#34D399" transform="rotate(-18, 122, 7)" />
        <ellipse cx="132" cy="6" rx="6" ry="9" fill="#10B981" transform="rotate(18, 132, 6)" />
      </g>

      {/* Cozy Pastel Living Room Sofa Centered Right-of-Middle */}
      <g transform="translate(530, 266)">
        <rect x="10" y="0" width="150" height="58" rx="18" fill="#FBCFE8" stroke="#F472B6" strokeWidth="3" />
        <rect x="0" y="24" width="24" height="46" rx="10" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2.5" />
        <rect x="146" y="24" width="24" height="46" rx="10" fill="#F9A8D4" stroke="#EC4899" strokeWidth="2.5" />
        <rect x="18" y="42" width="134" height="28" rx="8" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2.5" />
      </g>

      {/* Warm Pastel Wood Floor (ZERO ROAD!) */}
      <rect x="0" y="340" width="1000" height="200" fill="url(#pastelWoodFloor)" />
      {[364, 392, 422, 448, 476, 504].map((py) => (
        <line key={py} x1="0" y1={py} x2="1000" y2={py} stroke="#F59E0B" strokeWidth="1.5" opacity="0.28" />
      ))}

      {/* Soft Pastel Play Mat / Rug in Center of Living Room */}
      <ellipse
        cx="490"
        cy="392"
        rx="395"
        ry="38"
        fill="#FDF4FF"
        stroke="#F9A8D4"
        strokeWidth="3.5"
        opacity="0.94"
      />
      <ellipse
        cx="490"
        cy="392"
        rx="374"
        ry="29"
        fill="none"
        stroke="#BAE6FD"
        strokeWidth="2.5"
        strokeDasharray="10 8"
      />
    </g>
  );
};

/**
 * ㅏ: Cute Stickman Baby — Bigger round cute head than Jollaman, short stubby body & limbs, crying "으앙~ 으앙~" nonstop!
 */
export const CuteCryingBabyJollamanSvg: React.FC<{ walkTime: number; crying?: boolean }> = ({
  walkTime,
  crying = true,
}) => {
  const wiggle = crying ? Math.sin(walkTime * 18) * 3.5 : Math.sin(walkTime * 6) * 1.5;
  const armWave = crying ? Math.sin(walkTime * 22) * 8 : 0;
  const legKick = crying ? Math.cos(walkTime * 18) * 3.5 : 0;
  const mouthScale = crying ? 1 + Math.sin(walkTime * 16) * 0.14 : 0.7;

  return (
    <g transform={`translate(0, ${Math.abs(Math.sin(walkTime * 10)) * (crying ? -2.5 : -1)})`}>
      {/* Soft floor shadow */}
      <ellipse cx="0" cy="28" rx="16" ry="4" fill="#1E293B" opacity="0.18" />

      {/* Very short stubby baby legs & cute socks (feet sit around y=26) */}
      <line x1="-5" y1="12" x2={-9 - legKick} y2="25" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      <ellipse cx={-10 - legKick} cy="26" rx="5.5" ry="3.5" fill="#F9A8D4" stroke="#0F172A" strokeWidth="1.8" />
      <line x1="5" y1="12" x2={9 + legKick} y2="25" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
      <ellipse cx={10 + legKick} cy="26" rx="5.5" ry="3.5" fill="#F9A8D4" stroke="#0F172A" strokeWidth="1.8" />

      {/* Short stubby torso + cute pastel yellow romper/bib */}
      <line x1="0" y1="-8" x2="0" y2="12" stroke="#0F172A" strokeWidth="5.8" strokeLinecap="round" />
      <ellipse cx="0" cy="4" rx="10.5" ry="11" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.4" />
      <path d="M-7 -4 Q0 4 7 -4 L5 4 Q0 8 -5 4 Z" fill="#FBCFE8" stroke="#EC4899" strokeWidth="1.4" />

      {/* Short stubby waving arms */}
      <line x1="-7" y1="-3" x2="-17" y2={-11 + armWave} stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="-17" cy={-11 + armWave} r="3.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
      <line x1="7" y1="-3" x2="17" y2={-11 - armWave} stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
      <circle cx="17" cy={-11 - armWave} r="3.4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />

      {/* Bigger Cute Round Baby Head (r = 22, bigger than Jollaman's r = 16!) */}
      <g transform={`translate(${wiggle * 0.35}, -30) rotate(${wiggle * 1.4})`}>
        <circle cx="0" cy="0" r="22" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        {/* Cute tiny single curl of baby hair */}
        <path d="M-1 -22 Q-6 -32 4 -29 Q9 -26 3 -22" fill="none" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />

        {/* Rosy cheeks */}
        <circle cx="-13" cy="4" r="4" fill="#FDA4AF" opacity="0.82" />
        <circle cx="13" cy="4" r="4" fill="#FDA4AF" opacity="0.82" />

        {crying ? (
          <>
            {/* Cute squeezed crying > < eyes */}
            <path d="M-11 -6 L-5 -2 L-11 2" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M11 -6 L5 -2 L11 2" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />

            {/* Streaming adorable blue cartoon tears */}
            <path
              d={`M-10 0 Q-17 ${8 + Math.sin(walkTime * 20) * 2} -21 17`}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <path
              d={`M10 0 Q17 ${8 + Math.cos(walkTime * 20) * 2} 21 17`}
              fill="none"
              stroke="#38BDF8"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            <circle cx={-22} cy={19 + ((walkTime * 24) % 8)} r="2.6" fill="#38BDF8" />
            <circle cx={22} cy={19 + ((walkTime * 20 + 4) % 8)} r="2.6" fill="#38BDF8" />

            {/* Wide open cute crying mouth */}
            <ellipse
              cx="0"
              cy="9"
              rx={5.8 * mouthScale}
              ry={5.2 * mouthScale}
              fill="#FB7185"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </>
        ) : (
          <>
            <circle cx="-7" cy="-3" r="2.5" fill="#0F172A" />
            <circle cx="7" cy="-3" r="2.5" fill="#0F172A" />
            <path d="M-4 6 Q0 10 4 6" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          </>
        )}
      </g>

      {/* Nonstop "으앙~ 으앙~" speech visual */}
      {crying && (
        <g>
          <text
            x={wiggle * 0.5}
            y={-68 + Math.sin(walkTime * 10) * 3}
            textAnchor="middle"
            fontSize="18"
            fontWeight="900"
            fill="#EC4899"
            stroke="#FFFFFF"
            strokeWidth="3.5"
            style={{ paintOrder: 'stroke fill' }}
          >
            {Math.sin(walkTime * 7) > 0 ? '으앙~ 으앙!!' : '으앙~~!!'}
          </text>
          <text
            x={wiggle * 0.5}
            y={-53 + Math.sin(walkTime * 10) * 3}
            textAnchor="middle"
            fontSize="11.5"
            fontWeight="800"
            fill="#BE185D"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            style={{ paintOrder: 'stroke fill' }}
          >
            Waaah~!!
          </text>
        </g>
      )}
    </g>
  );
};

/** ㅑ: Blazing Comic Vector Baseball */
export const FieryBaseballSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const flicker = 1 + Math.sin(walkTime * 42) * 0.14;
  return (
    <g>
      <g transform={`scale(${flicker}, 1)`}>
        <path d="M0 -28 Q56 -38 96 -14 Q62 -4 108 6 Q60 18 90 32 Q36 32 0 26 Z" fill="#F97316" opacity="0.9" />
        <path d="M0 -18 Q44 -22 72 -4 Q48 6 66 18 Q32 22 0 18 Z" fill="#FDE047" />
      </g>
      <circle cx="0" cy="0" r="24" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
      <path d="M-14 -16 Q-4 0 -14 16 M14 -16 Q4 0 14 16" fill="none" stroke="#EF4444" strokeWidth="3" strokeLinecap="round" />
      <line x1="-12" y1="-8" x2="-6" y2="-6" stroke="#EF4444" strokeWidth="2" />
      <line x1="-10" y1="0" x2="-4" y2="0" stroke="#EF4444" strokeWidth="2" />
      <line x1="-12" y1="8" x2="-6" y2="6" stroke="#EF4444" strokeWidth="2" />
    </g>
  );
};

/** ㅓ: Giant Round Glass Fishbowl sitting on the road with water, aquatic plants & wide-eyed goldfish */
export const GiantFloorFishbowlSvg: React.FC<{
  walkTime: number;
  splashing?: boolean;
  hideGoldfish?: boolean;
}> = ({ walkTime, splashing = false, hideGoldfish = false }) => {
  const fishBob = Math.sin(walkTime * 6) * 5;
  const fishSwimX = Math.sin(walkTime * 2.5) * 10;
  return (
    <g>
      {/* Flat Glass Pedestal Base resting firmly on road */}
      <ellipse cx="0" cy="48" rx="46" ry="9" fill="#0EA5E9" fillOpacity="0.35" stroke="#0369A1" strokeWidth="3" />
      {/* Outer Glass Bowl Sphere */}
      <circle cx="0" cy="-8" r="64" fill="#E0F2FE" fillOpacity="0.46" stroke="#0284C7" strokeWidth="4" />
      {/* Filled Crystal Blue Water (bottom ~72% of bowl) */}
      <path
        d="M-60 -22 Q-28 -14 0 -22 T60 -22 A62 62 0 1 1 -60 -22 Z"
        fill="#38BDF8"
        fillOpacity="0.58"
      />
      {/* Water surface ellipse */}
      <ellipse cx="0" cy="-22" rx="60" ry="9" fill="#7DD3FC" fillOpacity="0.7" stroke="#0284C7" strokeWidth="2" />
      {/* Colorful Pebbles + Green Seaweed */}
      <ellipse cx="-24" cy="44" rx="10" ry="5" fill="#94A3B8" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="-6" cy="46" rx="12" ry="5" fill="#CBD5E1" stroke="#475569" strokeWidth="1.5" />
      <ellipse cx="18" cy="45" rx="11" ry="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
      <path d="M-36 44 Q-44 20 -32 2 Q-24 22 -30 44 Z" fill="#16A34A" stroke="#14532D" strokeWidth="1.8" />
      <path d="M32 44 Q42 18 30 -2 Q22 20 26 44 Z" fill="#22C55E" stroke="#14532D" strokeWidth="1.8" />
      {/* Top Open Glass Rim */}
      <ellipse cx="0" cy="-64" rx="34" ry="8" fill="#E0F2FE" fillOpacity="0.7" stroke="#0284C7" strokeWidth="3.5" />

      {/* Cute Big-Eyed Goldfish staring nose-to-nose! */}
      {!hideGoldfish && (
        <g transform={`translate(${18 + fishSwimX}, ${4 + fishBob})`}>
          {/* Tail Fin */}
          <path d="M12 0 Q24 -12 22 0 Q24 12 12 0 Z" fill="#FB923C" stroke="#9A3412" strokeWidth="2" />
          {/* Dorsal Fin */}
          <path d="M-4 -9 Q4 -18 10 -8 Z" fill="#FDBA74" stroke="#9A3412" strokeWidth="1.6" />
          {/* Plump Orange Body */}
          <ellipse cx="0" cy="0" rx="14" ry="10" fill="#F97316" stroke="#9A3412" strokeWidth="2.2" />
          {/* Big Startled Cartoon Eye facing Left toward Jollaman */}
          <circle cx="-6" cy="-2" r="4.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.6" />
          <circle cx="-7" cy="-2" r="2.1" fill="#0F172A" />
          <circle cx="-11" cy="3" r="1.6" fill="#7C2D12" />
        </g>
      )}

      {/* Overflowing Water Plumes bursting out of the bowl rim! */}
      {splashing && (
        <g fill="#38BDF8" stroke="#0284C7" strokeWidth="2.2">
          <path d="M-32 -64 Q-72 -88 -88 -26 Q-64 -52 -42 -48 Z" opacity="0.88" />
          <path d="M32 -64 Q72 -88 88 -26 Q64 -52 42 -48 Z" opacity="0.88" />
          <circle cx="-72" cy="-76" r="7" fill="#BAE6FD" />
          <circle cx="72" cy="-74" r="8" fill="#BAE6FD" />
        </g>
      )}

      {/* Glossy Glass Highlights */}
      <path d="M-44 -42 Q-52 -18 -46 10" fill="none" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" opacity="0.82" />
      <path d="M-36 -50 Q-30 -54 -24 -52" fill="none" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
    </g>
  );
};

/** ㅕ: Polished 2D Cartoon Normal 1-Tail Fox on a collar/leash turning slyly & farting comic green gas! */
export const NineTailFoxSvg: React.FC<{ farting?: boolean; walkTime: number; showCollar?: boolean }> = ({
  farting = false,
  walkTime,
  showCollar = true,
}) => {
  const sway = Math.sin(walkTime * 9) * 5;

  return (
    <g>
      {/* Single Normal Fluffy White-Tipped Fox Tail */}
      <g transform={`translate(-18, 4) rotate(${-28 + sway}, 0, 0)`}>
        <path
          d="M0 0 C-20 -18 -30 -52 -12 -74 C4 -60 16 -28 4 0 Z"
          fill="#F97316"
          stroke="#7C2D12"
          strokeWidth="2.8"
          strokeLinejoin="round"
        />
        <path
          d="M-16 -52 C-19 -62 -16 -69 -12 -74 C-5 -67 -2 -59 -4 -50 Q-10 -55 -16 -52 Z"
          fill="#FFF7ED"
          stroke="#7C2D12"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </g>

      {/* Comic Green Stink Cloud erupting leftward toward Jollaman */}
      {farting && (
        <g transform="translate(-44, 10)">
          <circle cx="-22" cy="-2" r={16 + Math.sin(walkTime * 24) * 3} fill="#A3E635" opacity="0.88" stroke="#4D7C0F" strokeWidth="2.5" />
          <circle cx="-48" cy="-12" r={22 + Math.cos(walkTime * 20) * 3.5} fill="#84CC16" opacity="0.82" stroke="#4D7C0F" strokeWidth="2.5" />
          <circle cx="-78" cy="-4" r={18 + Math.sin(walkTime * 18) * 3} fill="#65A30D" opacity="0.75" />
          <path d="M-36 -38 Q-44 -48 -36 -56 M-54 -40 Q-62 -50 -54 -58" fill="none" stroke="#4D7C0F" strokeWidth="2.8" strokeLinecap="round" />
          <text
            x="-52"
            y="-66"
            textAnchor="middle"
            fontSize="22"
            fontWeight="900"
            fill="#3F6212"
            stroke="#FFFFFF"
            strokeWidth="3"
            style={{ paintOrder: 'stroke fill' }}
          >
            뿡!!
          </text>
          <text
            x="-52"
            y="-51"
            textAnchor="middle"
            fontSize="12"
            fontWeight="800"
            fill="#365314"
            stroke="#FFFFFF"
            strokeWidth="2.5"
            style={{ paintOrder: 'stroke fill' }}
          >
            Poot!!
          </text>
        </g>
      )}

      {/* Sleek Fox Hind Leg & Front Paws (Facing right with sly backward glance) */}
      <path d="M-18 14 Q-26 32 -16 46 L-6 46 Q-8 32 -4 16 Z" fill="#EA580C" stroke="#7C2D12" strokeWidth="2.6" strokeLinejoin="round" />
      <ellipse cx="-11" cy="46" rx="7" ry="4" fill="#431407" />

      <path d="M18 14 L22 46 L31 46 L28 12 Z" fill="#F97316" stroke="#7C2D12" strokeWidth="2.6" strokeLinejoin="round" />
      <ellipse cx="27" cy="46" rx="7" ry="4" fill="#431407" />

      {/* Curved Fox Torso + Fluffy Cream Chest Ruff */}
      <path
        d="M-24 10 C-26 -14 2 -18 28 -12 C38 -8 38 14 22 20 C4 24 -18 22 -24 10 Z"
        fill="#F97316"
        stroke="#7C2D12"
        strokeWidth="3"
      />
      <path d="M16 -8 Q34 -2 30 16 Q18 20 14 6 Z" fill="#FFF7ED" stroke="#FED7AA" strokeWidth="1.5" />

      {/* Red Pet Collar around Fox Neck */}
      {showCollar && (
        <g>
          <path d="M12 -14 Q24 -6 32 -2" fill="none" stroke="#E11D48" strokeWidth="5.5" strokeLinecap="round" />
          <circle cx="28" cy="-3" r="4" fill="#FACC15" stroke="#854D0E" strokeWidth="1.5" />
        </g>
      )}

      {/* Expressive Sculpted Fox Head looking back slyly over shoulder! */}
      <g transform="translate(22, -22)">
        {/* Pointed Ears with dark tips & warm cream inner ears */}
        <path d="M-16 -12 L-24 -38 L-4 -20 Z" fill="#F97316" stroke="#7C2D12" strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M-15 -16 L-20 -31 L-8 -20 Z" fill="#FED7AA" />
        <path d="M6 -14 L18 -39 L20 -12 Z" fill="#F97316" stroke="#7C2D12" strokeWidth="2.8" strokeLinejoin="round" />
        <path d="M9 -16 L16 -32 L17 -14 Z" fill="#FED7AA" />

        {/* Rounded Fox Cranium + Cheek Fur Tufts */}
        <path
          d="M-22 -2 C-22 -20 20 -20 22 -2 C24 8 16 18 0 18 C-16 18 -24 8 -22 -2 Z"
          fill="#FB923C"
          stroke="#7C2D12"
          strokeWidth="3"
        />
        {/* Tapered Fox Snout pointing slightly left-downward in cheeky side-eye */}
        <path
          d="M-28 4 C-18 -2 -6 2 -2 12 C-12 18 -22 15 -28 4 Z"
          fill="#FFF7ED"
          stroke="#7C2D12"
          strokeWidth="2.4"
          strokeLinejoin="round"
        />
        <circle cx="-27" cy="4" r="3.8" fill="#0F172A" />

        {/* Cheeky Winking / Sly Eyes */}
        <path d="M-12 -5 Q-6 -10 -1 -4" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
        <ellipse cx="8" cy="-4" rx="3.4" ry="4" fill="#0F172A" />
        <circle cx="7" cy="-5.2" r="1.2" fill="#FFFFFF" />
        {/* Mischievous Smirk */}
        <path d="M-16 9 Q-10 13 -5 9" fill="none" stroke="#7C2D12" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    </g>
  );
};

/** ㅗ: Open Story Picture Book on floor with Squid illustration */
export const PictureBookSvg: React.FC = () => (
  <g>
    <polygon points="-44,12 0,4 44,12 38,24 0,16 -38,24" fill="#F43F5E" stroke="#881337" strokeWidth="2.5" strokeLinejoin="round" />
    <path d="M-40 10 Q-20 -4 0 6 Q20 -4 40 10 L36 20 Q18 10 0 16 Q-18 10 -36 20 Z" fill="#FFFBEB" stroke="#475569" strokeWidth="2" />
    <line x1="0" y1="6" x2="0" y2="16" stroke="#CBD5E1" strokeWidth="2" />
    <circle cx="-18" cy="8" r="5" fill="#F472B6" opacity="0.8" />
    <line x1="10" y1="6" x2="28" y2="9" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
    <line x1="10" y1="11" x2="26" y2="13" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
  </g>
);

/** ㅜ, ㅠ, ㅡ exterior: Dark Night City Backdrop (깜깜한 밤의 도시) */
export const NightCityBackdrop: React.FC<{ walkTime: number; showHauntedExterior?: boolean }> = ({
  walkTime,
  showHauntedExterior = false,
}) => (
  <g>
    <defs>
      <linearGradient id="nightCitySky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="#090D16" />
        <stop offset="65%" stopColor="#1E1B4B" />
        <stop offset="100%" stopColor="#312E81" />
      </linearGradient>
    </defs>

    {/* Midnight Sky */}
    <rect x="0" y="-80" width="1000" height="420" fill="url(#nightCitySky)" />

    {/* Crescent Moon & Twinkling Stars */}
    <circle cx="885" cy="56" r="24" fill="#FEF08A" />
    <circle cx="895" cy="50" r="21" fill="#0F172A" />
    {[55, 145, 235, 340, 460, 580, 710, 795, 950].map((sx, idx) => (
      <circle
        key={sx}
        cx={sx}
        cy={26 + (idx % 3) * 28}
        r={idx % 2 === 0 ? 2.2 : 1.5}
        fill="#FEF9C3"
        opacity={0.45 + Math.sin(walkTime * 3 + idx) * 0.4}
      />
    ))}

    {/* City Skyline Buildings */}
    {[
      { x: 20, w: 92, h: 175, c: '#1E293B' },
      { x: 118, w: 78, h: 145, c: '#0F172A' },
      { x: 208, w: 105, h: 205, c: '#1E293B' },
      { x: 325, w: 82, h: 155, c: '#0F172A' },
      { x: 420, w: 110, h: 190, c: '#1E293B' },
      { x: 545, w: 86, h: 165, c: '#0F172A' },
      { x: 645, w: 98, h: 195, c: '#1E293B' },
      { x: 760, w: 92, h: 155, c: '#0F172A' },
      { x: 868, w: 112, h: 185, c: '#1E293B' },
    ].map((b, i) => (
      <g key={i} transform={`translate(${b.x}, ${340 - b.h})`}>
        <rect x="0" y="0" width={b.w} height={b.h} fill={b.c} stroke="#334155" strokeWidth="1.5" />
        {[0, 1, 2, 3].map((r) =>
          [0, 1].map((c) => (
            <rect
              key={`${r}-${c}`}
              x={16 + c * (b.w * 0.42)}
              y={18 + r * 30}
              width="18"
              height="14"
              fill={(i + r + c) % 3 === 0 ? '#FDE047' : '#38BDF8'}
              opacity={(i + r + c) % 4 === 0 ? 0.12 : 0.68}
            />
          ))
        )}
      </g>
    ))}

    {/* Glowing Streetlamps */}
    {[195, 515, 815].map((lx) => (
      <g key={lx} transform={`translate(${lx}, 205)`}>
        <rect x="-3" y="0" width="6" height="135" fill="#475569" />
        <ellipse cx="0" cy="-2" rx="14" ry="7" fill="#FEF08A" />
        <polygon points="-10,4 10,4 38,135 -38,135" fill="#FEF08A" opacity="0.11" />
      </g>
    ))}

    {/* Dark Night City Sidewalk (No cartoon road lanes — night city promenade) */}
    <rect x="0" y="340" width="1000" height="200" fill="#1E293B" />
    <rect x="0" y="340" width="1000" height="8" fill="#475569" />
    {[375, 415, 455, 495].map((sy) => (
      <line key={sy} x1="0" y1={sy} x2="1000" y2={sy} stroke="#334155" strokeWidth="2" />
    ))}

    {/* Optional Abandoned Haunted House Exterior Silhouette on Right for ㅡ (으스스!!) */}
    {showHauntedExterior && (
      <g transform="translate(650, 128)">
        <polygon points="-24,62 125,-12 274,62" fill="#0F172A" stroke="#475569" strokeWidth="3.5" />
        <rect x="0" y="62" width="250" height="150" fill="#1E293B" stroke="#475569" strokeWidth="3.5" />
        {/* Crooked Boarded Windows */}
        <rect x="26" y="92" width="46" height="44" fill="#09090B" stroke="#64748B" strokeWidth="2.5" />
        <line x1="24" y1="106" x2="74" y2="118" stroke="#78350F" strokeWidth="6" />
        <rect x="178" y="92" width="46" height="44" fill="#09090B" stroke="#64748B" strokeWidth="2.5" />
        <line x1="176" y1="118" x2="226" y2="104" stroke="#78350F" strokeWidth="6" />
        {/* Creepy Dark Open Doorway */}
        <path d="M94 212 L94 114 Q125 96 156 114 L156 212 Z" fill="#09090B" stroke="#64748B" strokeWidth="3" />
        {/* Cobweb */}
        <path d="M94 114 L118 126 M94 128 L112 134 M104 110 Q108 124 94 134" fill="none" stroke="#CBD5E1" strokeWidth="1.5" opacity="0.6" />
      </g>
    )}
  </g>
);

/** ㅡ (inside) & ㅣ: Spooky Abandoned Haunted House Interior (폐가 내부) with Openable Door & Happy Glow */
export const HauntedHouseBackdrop: React.FC<{
  doorOpen?: boolean;
  happyEnding?: boolean;
  walkTime: number;
}> = ({ doorOpen = false, happyEnding = false, walkTime }) => (
  <g>
    <defs>
      <linearGradient id="hauntedWall" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor={happyEnding ? '#312E81' : '#0F172A'} />
        <stop offset="100%" stopColor={happyEnding ? '#4C1D95' : '#1E293B'} />
      </linearGradient>
    </defs>

    {/* Peeling Dark Wall */}
    <rect x="0" y="-80" width="1000" height="420" fill="url(#hauntedWall)" />
    {/* Wall Cracks */}
    <path d="M160 40 L185 88 L170 120 L195 160" fill="none" stroke="#334155" strokeWidth="2.5" />
    <path d="M840 60 L820 110 L835 145" fill="none" stroke="#334155" strokeWidth="2.5" />

    {/* Corner Spiderwebs */}
    <path d="M0 -60 L120 -60 M0 -60 L95 45 M0 -60 L50 85 M0 -70 L0 125" stroke="#94A3B8" strokeWidth="1.6" opacity="0.45" />
    <path d="M40 -60 Q38 -25 0 -10 M80 -60 Q70 5 0 42" fill="none" stroke="#94A3B8" strokeWidth="1.4" opacity="0.4" />
    <path d="M1000 -60 L880 -60 M1000 -60 L905 45 M1000 -60 L950 85" stroke="#94A3B8" strokeWidth="1.6" opacity="0.45" />

    {/* Crooked Haunted Portrait */}
    <g transform="translate(215, 130) rotate(-8)">
      <rect x="0" y="0" width="76" height="92" rx="4" fill="#1E293B" stroke="#475569" strokeWidth="4" />
      <circle cx="38" cy="36" r="14" fill="#475569" />
      <path d="M18 76 Q38 54 58 76 Z" fill="#334155" />
    </g>

    {/* Creepy Abandoned Wooden Door ("폐가 문") on Center-Right */}
    <g transform="translate(465, 142)">
      {/* Door Frame & Dark Interior Behind Door */}
      <rect x="-8" y="-8" width="136" height="206" fill="#09090B" stroke="#475569" strokeWidth="4" />
      {doorOpen ? (
        <>
          <rect x="0" y="0" width="120" height="198" fill={happyEnding ? '#FEF3C7' : '#020617'} opacity={happyEnding ? 0.28 : 0.95} />
          {/* Swung-open wooden door panel on right hinge */}
          <polygon points="120,0 162,-12 162,186 120,198" fill="#78350F" stroke="#451A03" strokeWidth="3" />
        </>
      ) : (
        <g>
          <rect x="0" y="0" width="120" height="198" fill="#78350F" stroke="#451A03" strokeWidth="3.5" />
          <line x1="35" y1="0" x2="35" y2="198" stroke="#451A03" strokeWidth="2.2" />
          <line x1="80" y1="0" x2="80" y2="198" stroke="#451A03" strokeWidth="2.2" />
          {/* Crooked wood plank nailed across door */}
          <polygon points="-6,45 126,65 124,81 -8,61" fill="#92400E" stroke="#451A03" strokeWidth="2" />
          <circle cx="18" cy="108" r="6" fill="#FACC15" stroke="#854D0E" strokeWidth="2" />
        </g>
      )}
    </g>

    {/* Dusty Creaky Wooden Floor */}
    <rect x="0" y="340" width="1000" height="200" fill="#334155" />
    {[366, 396, 428, 460, 492].map((py) => (
      <line key={py} x1="0" y1={py} x2="1000" y2={py} stroke="#1E293B" strokeWidth="2" />
    ))}

    {/* Warm Golden Glow & Floating Vector Hearts on Happy Ending Reunion! */}
    {happyEnding && (
      <g>
        <circle cx="385" cy="300" r="185" fill="#FDE047" opacity={0.22 + Math.sin(walkTime * 5) * 0.05} />
        <g transform={`translate(332, ${210 + Math.sin(walkTime * 6) * 8})`}>
          <CartoonHeartSvg size={1.15} color="#EF4444" />
        </g>
        <g transform={`translate(445, ${200 + Math.cos(walkTime * 6) * 8})`}>
          <CartoonHeartSvg size={1.25} color="#EC4899" />
        </g>
        <polygon
          points="0,-12 3,-3 12,0 3,3 0,12 -3,3 -12,0 -3,-3"
          transform={`translate(388, ${178 + Math.sin(walkTime * 5) * 6})`}
          fill="#FDE047"
          stroke="#CA8A04"
          strokeWidth="1.5"
        />
      </g>
    )}
  </g>
);

/** ㅗ: Expressive Comic Vector Squid hovering nearby and blasting ink! */
export const ComicSquidSvg: React.FC<{ walkTime: number; spraying?: boolean }> = ({
  walkTime,
  spraying = false,
}) => {
  const wiggle = Math.sin(walkTime * 18) * 6;
  return (
    <g>
      {/* Pressurized Ink Siphon Aimed Left at Jollaman */}
      <path d="M-22 6 L-38 10 L-36 20 L-20 16 Z" fill="#DB2777" stroke="#831843" strokeWidth="2.5" strokeLinejoin="round" />

      {/* Thick Horizontal Jet of Black Ink Shooting Left */}
      {spraying && (
        <g>
          <path
            d={`M-38 14 Q-95 ${6 + wiggle * 0.4} -175 14 Q-95 ${24 - wiggle * 0.4} -38 18 Z`}
            fill="#09090B"
            opacity="0.95"
          />
          <circle cx="-110" cy={4 + wiggle * 0.5} r="8" fill="#09090B" />
          <circle cx="-150" cy={24 - wiggle * 0.5} r="10" fill="#18181B" />
          <circle cx="-185" cy="12" r="16" fill="#09090B" />
        </g>
      )}

      {/* Wiggly Curled Tentacles */}
      {[-16, -4, 8, 20].map((tx, i) => (
        <path
          key={i}
          d={`M${tx} 14 Q${tx - 10 + (i % 2 === 0 ? wiggle : -wiggle)} 38 ${tx - 16} 54`}
          fill="none"
          stroke="#EC4899"
          strokeWidth="8.5"
          strokeLinecap="round"
        />
      ))}
      {/* Pointed Squid Hood & Lateral Fins */}
      <polygon points="-28,-16 4,-62 32,-16" fill="#F472B6" stroke="#831843" strokeWidth="3" strokeLinejoin="round" />
      <ellipse cx="2" cy="-6" rx="28" ry="24" fill="#F472B6" stroke="#831843" strokeWidth="3" />
      {/* Angry / Cheeky Squid Eyes looking Left */}
      <circle cx="-10" cy="-6" r="6.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="10" cy="-6" r="6.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="-12" cy="-6" r="2.8" fill="#0F172A" />
      <circle cx="8" cy="-6" r="2.8" fill="#0F172A" />
      <path d="M-18 -14 L-4 -10 M18 -14 L4 -10" stroke="#831843" strokeWidth="2.6" strokeLinecap="round" />
    </g>
  );
};

/** ㅛ: Giant Comic Vector Yo-Yo */
export const GiantYoyoSvg: React.FC = () => (
  <g>
    <circle cx="0" cy="0" r="36" fill="#E11D48" stroke="#881337" strokeWidth="4" />
    <circle cx="0" cy="0" r="26" fill="#FDE047" stroke="#CA8A04" strokeWidth="2.5" />
    <polygon points="0,-24 7,-6 24,0 7,6 0,24 -7,6 -24,0 -7,-6" fill="#EF4444" />
    <circle cx="0" cy="0" r="7" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
  </g>
);

/** ㅜ: Comic Stickman Alien UFO with Green Tractor Beam */
export const ComicUfoSvg: React.FC<{ beamOn?: boolean }> = ({ beamOn = true }) => (
  <g>
    {beamOn && (
      <polygon points="-36,16 36,16 95,280 -95,280" fill="#4ADE80" fillOpacity="0.34" />
    )}
    {/* Glass Dome + Stickman Alien */}
    <path d="M-28 -4 Q0 -52 28 -4 Z" fill="#BAE6FD" fillOpacity="0.75" stroke="#0284C7" strokeWidth="3" />
    <circle cx="0" cy="-18" r="11" fill="#22C55E" stroke="#14532D" strokeWidth="2.2" />
    <circle cx="-4" cy="-19" r="2" fill="#0F172A" />
    <circle cx="4" cy="-19" r="2" fill="#0F172A" />
    <line x1="0" y1="-29" x2="0" y2="-38" stroke="#14532D" strokeWidth="2.2" />
    <circle cx="0" cy="-40" r="3" fill="#FDE047" />
    {/* Metallic Flying Saucer */}
    <ellipse cx="0" cy="6" rx="64" ry="18" fill="#94A3B8" stroke="#1E293B" strokeWidth="3.5" />
    <ellipse cx="0" cy="2" rx="48" ry="10" fill="#CBD5E1" />
    {[-38, -18, 0, 18, 38].map((lx) => (
      <circle key={lx} cx={lx} cy="8" r="5" fill="#FDE047" stroke="#CA8A04" strokeWidth="1.5" />
    ))}
  </g>
);

/** ㅠ: Classic White Sheet Ghost sticking out tongue ("유~ 메롱!!") */
export const SheetGhostSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const floatY = Math.sin(walkTime * 8) * 6;
  return (
    <g transform={`translate(0, ${floatY})`}>
      <path
        d="M-32 42 Q-34 -42 0 -46 Q34 -42 32 42 L20 32 L10 44 L0 32 L-10 44 L-20 32 Z"
        fill="#FFFFFF"
        stroke="#1E293B"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      {/* Spooky eyes */}
      <ellipse cx="-10" cy="-12" rx="5.5" ry="7.5" fill="#0F172A" />
      <ellipse cx="10" cy="-12" rx="5.5" ry="7.5" fill="#0F172A" />
      {/* Cheeky Red Sticking-out Tongue ("메롱!") */}
      <path d="M-8 4 L8 4" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      <path d="M-5 4 L-5 16 Q0 24 5 16 L5 4 Z" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
      <line x1="0" y1="6" x2="0" y2="15" stroke="#9F1239" strokeWidth="1.5" />
    </g>
  );
};

/** ㅡ: Comic Yellow Banana Peel sitting on the road */
export const BananaPeelSvg: React.FC = () => (
  <g>
    <path d="M-24 6 Q-12 -14 0 -10 Q-10 2 -24 6 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
    <path d="M24 6 Q12 -14 0 -10 Q10 2 24 6 Z" fill="#FACC15" stroke="#854D0E" strokeWidth="2.5" />
    <path d="M-8 10 Q0 -12 8 10 Z" fill="#FDE047" stroke="#854D0E" strokeWidth="2.5" />
    <rect x="-3" y="-16" width="6" height="7" rx="1.5" fill="#78350F" />
  </g>
);

/** ㅣ: Chattering Giant Dentures Teeth Monster ("이빨괴물 · 딱딱딱 -> 앙!!") */
export const TeethMonsterSvg: React.FC<{
  jawOpenDeg: number;
  walkTime: number;
  shatterProgress?: number;
}> = ({ jawOpenDeg, walkTime, shatterProgress = 0 }) => {
  const keySpin = Math.sin(walkTime * 28) * 10;
  const s = Math.max(0, Math.min(shatterProgress, 1));
  const wholeOpacity = s > 0 ? Math.max(0, 1 - s * 1.05) : 1;

  return (
    <g opacity={wholeOpacity}>
      {/* Brass Wind-Up Key ("가위같은 부분") spinning on back of the dentures */}
      <g
        transform={`translate(${46 + s * 95}, ${-6 - s * 145}) rotate(${keySpin + s * 460})`}
      >
        <line x1="-10" y1="0" x2="10" y2="0" stroke="#CA8A04" strokeWidth="4.5" strokeLinecap="round" />
        <circle cx="15" cy="-8" r="8" fill="none" stroke="#FACC15" strokeWidth="4" />
        <circle cx="15" cy="8" r="8" fill="none" stroke="#FACC15" strokeWidth="4" />
      </g>

      {/* Dark Inner Mouth Cavity behind the Teeth (fades quickly as jaws split) */}
      {s < 0.35 && (
        <ellipse
          cx="-6"
          cy="0"
          rx="34"
          ry={10 + jawOpenDeg * 0.65}
          fill="#4C0519"
          opacity={Math.max(0, 1 - s * 3)}
        />
      )}

      {/* Lower Gum Jaw + Glossy White Teeth */}
      <g
        transform={`translate(${s * 145}, ${s * 85}) rotate(${-jawOpenDeg * 0.55 - s * 240}, 34, 4)`}
      >
        {/* Lower White Teeth Row */}
        {[-32, -20, -8, 4, 16, 28].map((tx, i) => (
          <rect
            key={i}
            x={tx - 5}
            y="-4"
            width="10"
            height="14"
            rx="2.5"
            fill="#FFFFFF"
            stroke="#334155"
            strokeWidth="2"
          />
        ))}
        {/* Sharp Bottom Fang */}
        <polygon points="-38,6 -30,-10 -24,6" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
        {/* Coral-Pink Lower Gum */}
        <path
          d="M-40 6 Q0 34 40 6 L34 20 Q0 42 -34 20 Z"
          fill="#FB7185"
          stroke="#9F1239"
          strokeWidth="3"
          strokeLinejoin="round"
        />
      </g>

      {/* Upper Gum Jaw + Glossy White Teeth + Angry Monster Eyes on Gum */}
      <g
        transform={`translate(${s * 115}, ${-s * 125}) rotate(${jawOpenDeg * 0.55 + s * 280}, 34, -4)`}
      >
        {/* Upper White Teeth Row */}
        {[-32, -20, -8, 4, 16, 28].map((tx, i) => (
          <rect
            key={i}
            x={tx - 5}
            y="-10"
            width="10"
            height="15"
            rx="2.5"
            fill="#FFFFFF"
            stroke="#334155"
            strokeWidth="2"
          />
        ))}
        {/* Sharp Upper Fang */}
        <polygon points="-38,-6 -30,11 -24,-6" fill="#FFFFFF" stroke="#334155" strokeWidth="2" />
        {/* Coral-Pink Upper Gum */}
        <path
          d="M-40 -6 Q0 -40 40 -6 L34 -22 Q0 -46 -34 -22 Z"
          fill="#F43F5E"
          stroke="#9F1239"
          strokeWidth="3"
          strokeLinejoin="round"
        />
        {/* Fierce Comic Monster Eyes Perched on Upper Gum */}
        <circle cx="-14" cy="-24" r="6.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
        <circle cx="4" cy="-24" r="6.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
        <circle cx="-16" cy="-24" r="2.6" fill="#0F172A" />
        <circle cx="2" cy="-24" r="2.6" fill="#0F172A" />
        <path d="M-21 -32 L-8 -28 M11 -32 L-2 -28" stroke="#881337" strokeWidth="2.5" strokeLinecap="round" />
      </g>
    </g>
  );
};

/**
 * ㅊ & ㅎ: Sparkling Mirror Ball descending from ceiling with rotating prism glints
 */
export const MirrorBallSvg: React.FC<{
  dropY: number;
  walkTime: number;
  badgeChar?: string;
}> = ({
  dropY,
  walkTime,
  badgeChar,
}) => {
  const glintShift = (walkTime * 22) % 16;
  const beamRot = Math.sin(walkTime * 4) * 12;
  return (
    <g>
      {/* Hanging cable from ceiling */}
      <line x1="0" y1="-80" x2="0" y2={dropY - 34} stroke="#94A3B8" strokeWidth="3.5" />
      <g transform={`translate(0, ${dropY})`}>
        {/* Soft glowing disco halo */}
        <circle cx="0" cy="0" r="56" fill="#FDE047" opacity="0.16" />
        {/* Rotating light flare rays */}
        <g transform={`rotate(${beamRot})`} opacity="0.72">
          <polygon points="-4,0 -68,-14 -68,14" fill="#F472B6" opacity="0.55" />
          <polygon points="4,0 68,-14 68,14" fill="#38BDF8" opacity="0.55" />
          <polygon points="0,4 -16,74 16,74" fill="#FACC15" opacity="0.45" />
        </g>
        {/* Chrome Mirror Ball Sphere */}
        <circle cx="0" cy="0" r="34" fill="#E2E8F0" stroke="#FFFFFF" strokeWidth="2.5" />
        {/* Checker Mirror Tiles */}
        {[-22, -11, 0, 11, 22].map((ty, rIdx) => (
          <line key={`h-${rIdx}`} x1="-31" y1={ty} x2="31" y2={ty} stroke="#64748B" strokeWidth="1.5" opacity="0.65" />
        ))}
        {[-24, -12, 0, 12, 24].map((tx, cIdx) => {
          const xPos = ((tx + glintShift + 30) % 60) - 30;
          return (
            <line key={`v-${cIdx}`} x1={xPos} y1="-31" x2={xPos} y2="31" stroke="#475569" strokeWidth="1.5" opacity="0.65" />
          );
        })}
        {/* Bright sparkling specular facets */}
        <rect x={-16 + glintShift * 0.4} y="-14" width="9" height="9" fill="#FFFFFF" />
        <rect x={6 - glintShift * 0.3} y="4" width="9" height="9" fill="#FEF08A" />
        <rect x="-6" y="14" width="8" height="8" fill="#BAE6FD" />
        <circle cx="0" cy="0" r="34" fill="none" stroke="#94A3B8" strokeWidth="2.5" />
        {badgeChar && (
          <g>
            <circle cx="0" cy="0" r="18" fill="#FFFFFF" fillOpacity="0.96" stroke="#8B5CF6" strokeWidth="2.8" />
            <text x="0" y="8" textAnchor="middle" fontSize="24" fontWeight="900" fill="#8B5CF6">
              {badgeChar}
            </text>
          </g>
        )}
      </g>
    </g>
  );
};

/**
 * ㅊ & ㅎ: Jollaman doing intense floppy Wave + Breakdance Freeze!
 */
export const DiscoDancingJollamanSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const modeCycle = (walkTime * 1.15) % 2;
  const isBreakdance = modeCycle >= 1.05;
  const w1 = Math.sin(walkTime * 15);
  const w2 = Math.cos(walkTime * 15);
  const bounce = Math.abs(Math.sin(walkTime * 12)) * 8;

  if (isBreakdance) {
    // Inverted One-Hand Breakdance Spin / Windmill Flare!
    const kick = Math.sin(walkTime * 22) * 26;
    const tilt = Math.sin(walkTime * 11) * 14;
    return (
      <g transform={`translate(0, ${6 - bounce * 0.6}) rotate(${tilt})`}>
        {/* Floor spotlight reflection under hand */}
        <ellipse cx="0" cy="46" rx="28" ry="6" fill="#38BDF8" opacity="0.45" />
        {/* Upside-down kicking legs */}
        <path
          d={`M0 -6 Q${-18 + kick * 0.4} -28 ${-26 + kick} -46`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="5.4"
          strokeLinecap="round"
        />
        <ellipse cx={-26 + kick} cy="-47" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
        <path
          d={`M0 -6 Q${18 - kick * 0.4} -26 ${28 - kick} -42`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="5.4"
          strokeLinecap="round"
        />
        <ellipse cx={28 - kick} cy="-43" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />

        {/* Torso tilted upside-down */}
        <line x1="0" y1="-8" x2="0" y2="20" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />

        {/* Support hand planted on dance floor + styling air hand */}
        <line x1="0" y1="16" x2="-12" y2="45" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        <circle cx="-12" cy="45" r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        <path
          d={`M0 14 Q22 ${12 + w1 * 10} 28 ${-4 + w2 * 10}`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="4.6"
          strokeLinecap="round"
        />
        <circle cx="28" cy={-4 + w2 * 10} r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

        {/* Inverted grinning head */}
        <circle cx="14" cy="24" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <path d="M9 21 Q12 18 15 21 M17 21 Q20 18 23 21" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M10 29 Q15 33 21 29" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
      </g>
    );
  }

  // Wild Floppy Wave Dance ("팔다리 흐느적 웨이브!")
  return (
    <g transform={`translate(${w1 * 7}, ${-bounce})`}>
      <ellipse cx="0" cy={52 + bounce} rx="24" ry="6" fill="#EC4899" opacity="0.38" />
      {/* Groovy bending wavy legs */}
      <path
        d={`M-2 14 Q${-16 + w1 * 12} 30 ${-14 - w2 * 10} 47`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <ellipse cx={-12 - w2 * 10} cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
      <path
        d={`M2 14 Q${18 + w2 * 12} 30 ${14 + w1 * 10} 47`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="5.2"
        strokeLinecap="round"
      />
      <ellipse cx={16 + w1 * 10} cy="48" rx="8" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />

      {/* Wavy curving torso */}
      <path
        d={`M${w1 * 5} -19 Q${-w1 * 9} -2 0 15`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="6.5"
        strokeLinecap="round"
      />

      {/* Noodle-floppy waving arms */}
      <path
        d={`M${w1 * 4} -12 Q${-22} ${-24 + w1 * 16} -36 ${-8 - w1 * 18}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <circle cx="-36" cy={-8 - w1 * 18} r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

      <path
        d={`M${w1 * 4} -12 Q22 ${-24 - w1 * 16} 36 ${-8 + w1 * 18}`}
        fill="none"
        stroke="#0F172A"
        strokeWidth="4.6"
        strokeLinecap="round"
      />
      <circle cx="36" cy={-8 + w1 * 18} r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

      {/* Grooving Head */}
      <g transform={`translate(${w1 * 6}, -35) rotate(${w1 * 14})`}>
        <circle cx="0" cy="0" r="16" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
        <path d="M-2 -16 Q3 -25 8 -18" fill="none" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        {/* Cool disco shades */}
        <rect x="-12" y="-6" width="10" height="7" rx="2" fill="#0F172A" />
        <rect x="2" y="-6" width="10" height="7" rx="2" fill="#0F172A" />
        <line x1="-2" y1="-3" x2="2" y2="-3" stroke="#0F172A" strokeWidth="2.2" />
        <path d="M-5 6 Q0 11 6 6" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
};

/**
 * ㅎ: Striped Tiger standing on TWO hind legs doing the EXACT SAME synchronized Wave & Breakdance!
 */
export const DancingTigerSvg: React.FC<{ walkTime: number; badgeChar?: string }> = ({
  walkTime,
  badgeChar,
}) => {
  const modeCycle = (walkTime * 1.15) % 2;
  const isBreakdance = modeCycle >= 1.05;
  const w1 = Math.sin(walkTime * 15);
  const w2 = Math.cos(walkTime * 15);
  const bounce = Math.abs(Math.sin(walkTime * 12)) * 8;

  if (isBreakdance) {
    const kick = Math.sin(walkTime * 22) * 26;
    const tilt = Math.sin(walkTime * 11) * 14;
    return (
      <g transform={`translate(0, ${2 - bounce * 0.6}) rotate(${-tilt})`}>
        <ellipse cx="0" cy="50" rx="34" ry="7" fill="#FACC15" opacity="0.4" />
        {/* Hind legs kicking high in breakdance V! */}
        <path d={`M-6 -6 Q${-22 + kick * 0.3} -30 ${-30 + kick} -48`} fill="none" stroke="#F97316" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx={-30 + kick} cy="-49" rx="9" ry="5.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
        <path d={`M6 -6 Q${22 - kick * 0.3} -28 ${32 - kick} -44`} fill="none" stroke="#F97316" strokeWidth="13" strokeLinecap="round" />
        <ellipse cx={32 - kick} cy="-45" rx="9" ry="5.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

        {/* Striped Body upright-inverted */}
        <ellipse cx="0" cy="4" rx="22" ry="26" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
        <ellipse cx="0" cy="4" rx="12" ry="18" fill="#FFEDD5" />
        <path d="M-20 -4 L-8 -2 L-19 3 M20 -4 L8 -2 L19 3" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
        {badgeChar && (
          <g transform="translate(0, 4)">
            <circle cx="0" cy="0" r="13" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.4" />
            <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="900" fill="#E11D48">
              {badgeChar}
            </text>
          </g>
        )}

        {/* Front Paw planted on floor + air wave paw */}
        <line x1="-8" y1="22" x2="-12" y2="48" stroke="#F97316" strokeWidth="10" strokeLinecap="round" />
        <ellipse cx="-12" cy="49" rx="8" ry="5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
        <path d={`M10 20 Q28 ${16 + w1 * 10} 34 ${-2 + w2 * 10}`} fill="none" stroke="#F97316" strokeWidth="9" strokeLinecap="round" />

        {/* Inverted grinning Tiger Head */}
        <g transform="translate(18, 28) scale(0.85)">
          <circle cx="-14" cy="18" r="8" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <circle cx="14" cy="18" r="8" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <circle cx="0" cy="0" r="24" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
          <ellipse cx="0" cy="-6" rx="14" ry="9" fill="#FFF7ED" />
          <path d="M-11 2 Q-8 5 -5 2 M5 2 Q8 5 11 2" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M-6 -8 Q0 -13 6 -8" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        </g>
      </g>
    );
  }

  // Standing on TWO hind legs doing the exact same floppy Wave Dance!
  return (
    <g transform={`translate(${-w1 * 7}, ${-bounce})`}>
      <ellipse cx="0" cy={52 + bounce} rx="30" ry="6.5" fill="#FACC15" opacity="0.38" />
      {/* Swishing striped tail */}
      <path d={`M14 14 Q38 ${8 + w1 * 14} 46 ${-10 - w2 * 12}`} fill="none" stroke="#F97316" strokeWidth="8.5" strokeLinecap="round" />
      <path d={`M14 14 Q38 ${8 + w1 * 14} 46 ${-10 - w2 * 12}`} fill="none" stroke="#1E293B" strokeWidth="8.5" strokeDasharray="5 8" strokeLinecap="round" />

      {/* Two Hind Legs grooving on dance floor */}
      <path d={`M-7 16 Q${-18 + w1 * 10} 32 ${-14 - w2 * 9} 48`} fill="none" stroke="#F97316" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx={-14 - w2 * 9} cy="49" rx="9" ry="5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />
      <path d={`M7 16 Q${18 + w2 * 10} 32 ${14 + w1 * 9} 48`} fill="none" stroke="#F97316" strokeWidth="11" strokeLinecap="round" />
      <ellipse cx={14 + w1 * 9} cy="49" rx="9" ry="5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

      {/* Bipedal Striped Torso swaying */}
      <ellipse cx={w1 * 3} cy="-1" rx="22" ry="26" fill="#F97316" stroke="#9A3412" strokeWidth="3" />
      <ellipse cx={w1 * 3} cy="0" rx="13" ry="18" fill="#FFEDD5" />
      <path d="M-19 -8 L-8 -6 L-18 -1 M19 -8 L8 -6 L18 -1" stroke="#0F172A" strokeWidth="3" strokeLinecap="round" />
      {badgeChar && (
        <g transform={`translate(${w1 * 3}, 0)`}>
          <circle cx="0" cy="0" r="13" fill="#FFFFFF" stroke="#9A3412" strokeWidth="2.4" />
          <text x="0" y="6" textAnchor="middle" fontSize="18" fontWeight="900" fill="#E11D48">
            {badgeChar}
          </text>
        </g>
      )}

      {/* Wavy Front Paws matching Jollaman's wave! */}
      <path d={`M-14 -12 Q-28 ${-24 + w1 * 16} -42 ${-8 - w1 * 18}`} fill="none" stroke="#F97316" strokeWidth="9.5" strokeLinecap="round" />
      <circle cx="-42" cy={-8 - w1 * 18} r="6.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

      <path d={`M14 -12 Q28 ${-24 - w1 * 16} 42 ${-8 + w1 * 18}`} fill="none" stroke="#F97316" strokeWidth="9.5" strokeLinecap="round" />
      <circle cx="42" cy={-8 + w1 * 18} r="6.5" fill="#FED7AA" stroke="#9A3412" strokeWidth="2" />

      {/* Grooving Tiger Head with Cool Disco Shades! */}
      <g transform={`translate(${w1 * 5}, -39) rotate(${-w1 * 14})`}>
        <circle cx="-15" cy="-19" r="8.5" fill="#F97316" stroke="#9A3412" strokeWidth="2.2" />
        <circle cx="15" cy="-19" r="8.5" fill="#F97316" stroke="#9A3412" strokeWidth="2.2" />
        <circle cx="-15" cy="-19" r="4" fill="#1E293B" />
        <circle cx="15" cy="-19" r="4" fill="#1E293B" />
        <circle cx="0" cy="0" r="24" fill="#FB923C" stroke="#9A3412" strokeWidth="3" />
        <ellipse cx="0" cy="7" rx="14" ry="10" fill="#FFF7ED" />
        {/* Forehead 王 mark */}
        <path d="M-7 -14 L7 -14 M-5 -9 L5 -9 M0 -16 L0 -7" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
        {/* Cool disco shades */}
        <rect x="-15" y="-6" width="12" height="8" rx="2" fill="#0F172A" />
        <rect x="3" y="-6" width="12" height="8" rx="2" fill="#0F172A" />
        <line x1="-3" y1="-2" x2="3" y2="-2" stroke="#0F172A" strokeWidth="2.5" />
        <polygon points="-4,3 4,3 0,7" fill="#F43F5E" />
        <path d="M-7 11 Q0 16 7 11" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />
      </g>
    </g>
  );
};

// ===========================================================================
// SHARED VECTOR SVG MICRO-EFFECTS & STAGE PRIMITIVES (Deduplicated)
// ===========================================================================

export const DizzyStarOrbitSvg: React.FC<{
  walkTime: number;
  cx?: number;
  cy?: number;
  radius?: number;
}> = ({ walkTime, cx = 0, cy = -66, radius = 16 }) => {
  const x = cx + Math.cos(walkTime * 6) * radius;
  const y = cy + Math.sin(walkTime * 6) * 4;
  return (
    <g transform={`translate(${x}, ${y}) rotate(${(walkTime * 160) % 360})`}>
      <polygon
        points="0,-8 2.4,-2.6 8,-2.4 3.6,1.4 5,7 0,3.8 -5,7 -3.6,1.4 -8,-2.4 -2.4,-2.6"
        fill="#FACC15"
        stroke="#B45309"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </g>
  );
};

export const CartoonHeartSvg: React.FC<{
  size?: number;
  color?: string;
  stroke?: string;
}> = ({ size = 1, color = '#EC4899', stroke = '#831843' }) => (
  <path
    d="M0 10 C-14 0 -16 -12 -7 -14 C-2 -15 0 -10 0 -7 C0 -10 2 -15 7 -14 C16 -12 14 0 0 10 Z"
    transform={`scale(${size})`}
    fill={color}
    stroke={stroke}
    strokeWidth="1.8"
    strokeLinejoin="round"
  />
);

export const ComicImpactBurstSvg: React.FC<{
  scale?: number;
  fill?: string;
  stroke?: string;
}> = ({ scale = 1, fill = '#FACC15', stroke = '#DC2626' }) => (
  <polygon
    points="0,-24 6,-9 22,-15 11,-2 24,8 8,9 12,24 0,12 -12,24 -8,9 -24,8 -11,-2 -22,-15 -6,-9"
    transform={`scale(${scale})`}
    fill={fill}
    stroke={stroke}
    strokeWidth="2.5"
    strokeLinejoin="round"
  />
);

export const GiantHangulSvg: React.FC<{
  text: string;
  size?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
}> = ({ text, size = 168, fill = '#0F172A', stroke = '#FFFFFF', strokeWidth = 10 }) => (
  <text
    x="0"
    y="0"
    textAnchor="middle"
    dominantBaseline="central"
    fontSize={size}
    fontWeight="900"
    fill={fill}
    stroke={stroke}
    strokeWidth={strokeWidth}
    style={{
      fontFamily: "'Hakgyoansim Badasseugi', 'NanumBarunGothic', sans-serif",
      paintOrder: 'stroke fill',
    }}
  >
    {text}
  </text>
);

export const BlinkHighlightRingSvg: React.FC<{
  blinkOn: boolean;
  color: string;
  rx?: number;
  ry?: number;
}> = ({ blinkOn, color, rx = 44, ry = 44 }) => (
  <ellipse
    cx="0"
    cy="0"
    rx={rx + (blinkOn ? 6 : 0)}
    ry={ry + (blinkOn ? 6 : 0)}
    fill={blinkOn ? '#FEF08A' : '#FFFFFF'}
    fillOpacity={blinkOn ? 0.85 : 0.25}
    stroke={blinkOn ? '#F59E0B' : color}
    strokeWidth={blinkOn ? 5 : 2.5}
    strokeDasharray="8 5"
  />
);

export const SparkleBurstSvg: React.FC<{ color?: string; progress?: number }> = ({
  color = '#FACC15',
  progress = 1,
}) => {
  const s = 0.75 + Math.sin(progress * Math.PI) * 0.35;
  return (
    <g transform={`scale(${s})`}>
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <line
          key={deg}
          x1="0"
          y1="-58"
          x2="0"
          y2="-82"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          transform={`rotate(${deg})`}
        />
      ))}
    </g>
  );
};

