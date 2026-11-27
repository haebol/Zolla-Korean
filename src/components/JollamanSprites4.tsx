import React from 'react';
import { CartoonHeartSvg, PastelHouseBackdrop } from './JollamanSprites';

export type CompoundVowelKey =
  | 'ㅐ'
  | 'ㅒ'
  | 'ㅔ'
  | 'ㅖ'
  | 'ㅘ'
  | 'ㅙ'
  | 'ㅚ'
  | 'ㅝ'
  | 'ㅞ'
  | 'ㅟ'
  | 'ㅢ';

export type CompoundBackdropTheme =
  | 'pond'
  | 'beach'
  | 'town'
  | 'meadow'
  | 'home';

export function getCompoundBackdropTheme(char: CompoundVowelKey): CompoundBackdropTheme {
  switch (char) {
    case 'ㅐ':
      return 'pond';
    case 'ㅔ':
      return 'beach';
    case 'ㅒ':
    case 'ㅙ':
    case 'ㅚ':
      return 'town';
    case 'ㅢ':
      return 'home';
    case 'ㅖ':
    case 'ㅘ':
    case 'ㅝ':
    case 'ㅞ':
    case 'ㅟ':
      return 'meadow';
  }
}

/**
 * Cohesive Backdrops for Jollaman 4
 */
export const CompoundSceneBackdrop: React.FC<{
  theme: CompoundBackdropTheme;
  walkTime: number;
  activeChar: CompoundVowelKey;
}> = ({ theme, walkTime, activeChar }) => {
  if (theme === 'home') {
    return <PastelHouseBackdrop walkTime={walkTime} />;
  }

  if (theme === 'beach') {
    const waveShift = Math.sin(walkTime * 3) * 14;
    return (
      <g>
        <defs>
          <linearGradient id="c4BeachSky" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#BAE6FD" />
          </linearGradient>
        </defs>
        <rect x="0" y="-80" width="1000" height="625" fill="url(#c4BeachSky)" />
        <circle cx="880" cy="84" r="34" fill="#FDE047" opacity="0.95" />
        <rect x="0" y="268" width="1000" height="82" fill="#0284C7" />
        <path
          d={`M0 288 Q125 ${276 + waveShift * 0.4} 250 288 T500 288 T750 288 T1000 288`}
          fill="none"
          stroke="#7DD3FC"
          strokeWidth="4"
          opacity="0.7"
        />
        <path
          d={`M0 322 Q125 ${312 - waveShift * 0.4} 250 322 T500 322 T750 322 T1000 322`}
          fill="none"
          stroke="#E0F2FE"
          strokeWidth="5"
          opacity="0.85"
        />
        <rect x="0" y="346" width="1000" height="200" fill="#FDE68A" />
        <line x1="0" y1="346" x2="1000" y2="346" stroke="#F59E0B" strokeWidth="3" opacity="0.5" />
        <circle cx="140" cy="396" r="4" fill="#D97706" opacity="0.35" />
        <circle cx="520" cy="410" r="3.5" fill="#D97706" opacity="0.35" />
        <circle cx="810" cy="388" r="4.5" fill="#D97706" opacity="0.35" />
      </g>
    );
  }

  const isMeadow = theme === 'meadow';
  const skyTop = activeChar === 'ㅟ' ? '#0284C7' : isMeadow ? '#38BDF8' : '#60A5FA';
  const skyMid = isMeadow ? '#7DD3FC' : '#93C5FD';
  const skyBot = isMeadow ? '#FEF3C7' : '#E0F2FE';
  const hillBack = isMeadow ? '#86EFAC' : '#4ADE80';

  return (
    <g>
      <defs>
        <linearGradient id={`c4Sky-${theme}-${activeChar ?? 'base'}`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor={skyTop} />
          <stop offset="55%" stopColor={skyMid} />
          <stop offset="100%" stopColor={skyBot} />
        </linearGradient>
      </defs>
      <rect x="0" y="-460" width="1000" height="1005" fill={`url(#c4Sky-${theme}-${activeChar ?? 'base'})`} />

      {activeChar === 'ㅟ' && (
        <g>
          {[
            [160, -245],
            [490, -295],
            [820, -220],
            [310, -155],
            [680, -135],
          ].map(([sx, sy], idx) => (
            <g key={idx} transform={`translate(${sx}, ${sy})`} opacity={0.75 + Math.sin(walkTime * 3 + idx) * 0.2}>
              <path d="M0 -10 L2.5 -2.5 L10 0 L2.5 2.5 L0 10 L-2.5 2.5 L-10 0 L-2.5 -2.5 Z" fill="#FEF08A" />
            </g>
          ))}
          {[
            [140, -110, 0.95],
            [740, -165, 1.05],
            [270, -265, 0.85],
            [640, -285, 0.9],
          ].map(([cx, cy, sc], idx) => (
            <g
              key={idx}
              transform={`translate(${((cx + walkTime * (6 + idx * 1.5)) % 1080) - 40}, ${cy}) scale(${sc})`}
              opacity="0.88"
            >
              <circle cx="0" cy="0" r="22" fill="#FFFFFF" />
              <circle cx="24" cy="-6" r="26" fill="#FFFFFF" />
              <circle cx="50" cy="0" r="20" fill="#FFFFFF" />
              <rect x="-18" y="0" width="84" height="20" rx="10" fill="#FFFFFF" />
            </g>
          ))}
        </g>
      )}

      <g>
        <circle cx="890" cy="84" r="34" fill="#FDE047" opacity="0.92" />
        <circle cx="890" cy="84" r="48" fill="#FEF08A" opacity="0.3" />
        {[
          [180, 96, 1],
          [540, 74, 0.85],
          [770, 118, 0.9],
        ].map(([cx, cy, sc], idx) => (
          <g
            key={idx}
            transform={`translate(${((cx + walkTime * 8) % 1080) - 40}, ${cy}) scale(${sc})`}
            opacity="0.82"
          >
            <circle cx="0" cy="0" r="22" fill="#FFFFFF" />
            <circle cx="24" cy="-6" r="26" fill="#FFFFFF" />
            <circle cx="50" cy="0" r="20" fill="#FFFFFF" />
            <rect x="-18" y="0" width="84" height="20" rx="10" fill="#FFFFFF" />
          </g>
        ))}
      </g>

      <path d="M0 328 Q240 264 520 322 T1000 304 L1000 370 L0 370 Z" fill={hillBack} />

      {theme === 'pond' && (
        <g>
          {/* Light-green meadow field with sparse tiny lavender wildflowers (distinct from consonant grey road) */}
          <rect x="0" y="346" width="1000" height="22" fill="#84CC16" />
          <rect x="0" y="368" width="1000" height="176" fill="#BEF264" />
          <path d="M0 398 Q260 384 520 400 T1000 394 L1000 544 L0 544 Z" fill="#A3E635" opacity="0.55" />
          <line x1="0" y1="368" x2="1000" y2="368" stroke="#65A30D" strokeWidth="2.5" opacity="0.55" />

          {/* Tiny grass blades */}
          {[75, 165, 290, 415, 510, 625, 865, 955].map((gx, idx) => (
            <path
              key={gx}
              d={`M${gx} ${382 + (idx % 3) * 14} l-4 -9 M${gx} ${382 + (idx % 3) * 14} l3 -10`}
              fill="none"
              stroke="#65A30D"
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.7"
            />
          ))}

          {/* Sparse tiny soft-lavender wildflowers */}
          {[
            { x: 64, y: 392, s: 0.9 },
            { x: 152, y: 416, s: 0.8 },
            { x: 248, y: 386, s: 0.95 },
            { x: 356, y: 422, s: 0.85 },
            { x: 468, y: 394, s: 0.9 },
            { x: 584, y: 418, s: 0.82 },
            { x: 715, y: 404, s: 0.88 },
            { x: 842, y: 424, s: 0.86 },
            { x: 938, y: 396, s: 0.92 },
          ].map((fl, idx) => (
            <g key={idx} transform={`translate(${fl.x}, ${fl.y}) scale(${fl.s})`}>
              <line x1="0" y1="0" x2="0" y2="8" stroke="#65A30D" strokeWidth="1.8" strokeLinecap="round" />
              <circle cx="-3.5" cy="-1.5" r="2.6" fill="#DDD6FE" />
              <circle cx="3.5" cy="-1.5" r="2.6" fill="#C4B5FD" />
              <circle cx="-2.2" cy="2.6" r="2.6" fill="#C4B5FD" />
              <circle cx="2.2" cy="2.6" r="2.6" fill="#DDD6FE" />
              <circle cx="0" cy="-3.8" r="2.6" fill="#E9D5FF" />
              <circle cx="0" cy="0" r="1.7" fill="#FDE047" />
            </g>
          ))}

          {/* Pond resting neatly on the green meadow */}
          <ellipse cx="730" cy="350" rx="185" ry="26" fill="#38BDF8" stroke="#0284C7" strokeWidth="3" />
          <ellipse cx="730" cy="348" rx="150" ry="15" fill="#7DD3FC" opacity="0.65" />
          <ellipse cx="620" cy="346" rx="24" ry="8" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
          <ellipse cx="835" cy="352" rx="22" ry="7" fill="#16A34A" stroke="#14532D" strokeWidth="2" />
          <path d="M825 346 Q835 328 845 346 Z" fill="#F472B6" stroke="#BE185D" strokeWidth="1.8" />
          {[555, 572, 895].map((rx, idx) => (
            <g key={rx} transform={`translate(${rx}, 324)`}>
              <line x1="0" y1="22" x2={idx % 2 === 0 ? -4 : 4} y2="-28" stroke="#15803D" strokeWidth="3" />
              <ellipse cx={idx % 2 === 0 ? -4 : 4} cy="-26" rx="4.5" ry="11" fill="#78350F" />
            </g>
          ))}
        </g>
      )}

      <g>
        {theme === 'town' ? (
          <>
            <g transform="translate(88, 250)">
              <rect x="0" y="25" width="76" height="58" fill="#FED7AA" stroke="#1E293B" strokeWidth="2.5" />
              <polygon points="-8,26 38,-6 84,26" fill="#F43F5E" stroke="#1E293B" strokeWidth="2.5" />
              <rect x="16" y="42" width="18" height="18" rx="2" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
              <rect x="44" y="45" width="18" height="38" fill="#92400E" stroke="#1E293B" strokeWidth="2" />
            </g>
            {activeChar === 'ㅒ' ? (
              <g transform="translate(535, 236)">
                <rect x="0" y="28" width="96" height="82" fill="#FCE7F3" stroke="#1E293B" strokeWidth="2.8" />
                <polygon points="-10,30 48,-10 106,30" fill="#EC4899" stroke="#1E293B" strokeWidth="2.8" />
                <rect x="14" y="56" width="26" height="54" fill="#1E293B" stroke="#1E293B" strokeWidth="2" />
                <polygon points="40,56 58,48 58,104 40,110" fill="#F472B6" stroke="#1E293B" strokeWidth="2" />
                <circle cx="53" cy="80" r="2.2" fill="#FDE047" />
                <rect x="56" y="52" width="24" height="24" rx="3" fill="#E0F2FE" stroke="#1E293B" strokeWidth="2" />
              </g>
            ) : (
              <g transform="translate(805, 258)">
                <rect x="0" y="22" width="68" height="54" fill="#E0E7FF" stroke="#1E293B" strokeWidth="2.5" />
                <polygon points="-7,23 34,-6 75,23" fill="#3B82F6" stroke="#1E293B" strokeWidth="2.5" />
                <rect x="14" y="36" width="18" height="18" rx="2" fill="#FFFFFF" stroke="#1E293B" strokeWidth="2" />
              </g>
            )}
          </>
        ) : (
          <>
            {[115, 425, isMeadow ? 865 : 940].map((tx, idx) => (
              <g key={tx} transform={`translate(${tx}, 288) scale(${idx === 1 ? 0.86 : 1})`}>
                <rect x="-8" y="18" width="16" height="44" fill="#78350F" />
                <circle cx="0" cy="-6" r="34" fill={isMeadow ? '#16A34A' : '#15803D'} />
                <circle cx="-22" cy="8" r="24" fill={isMeadow ? '#22C55E' : '#16A34A'} />
                <circle cx="22" cy="8" r="24" fill={isMeadow ? '#22C55E' : '#16A34A'} />
              </g>
            ))}
          </>
        )}
      </g>

      {theme !== 'pond' && (
        <>
          <rect x="0" y="346" width="1000" height="22" fill="#22C55E" />
          <rect x="0" y="368" width="1000" height="176" fill="#CBD5E1" />
          <line x1="0" y1="368" x2="1000" y2="368" stroke="#1E293B" strokeWidth="3" opacity="0.35" />
          <line x1="0" y1="414" x2="1000" y2="414" stroke="#FFFFFF" strokeWidth="3" strokeDasharray="24 22" opacity="0.6" />
        </>
      )}
    </g>
  );
};

export type GirlfriendPose =
  | 'dating'
  | 'chatter'
  | 'tubeSwing'
  | 'jump'
  | 'shakeTree'
  | 'crying'
  | 'slap'
  | 'shock'
  | 'angry'
  | 'angryChase'
  | 'walking'
  | 'happy'
  | 'wipeTears'
  | 'carryScared'
  | 'stomp'
  | 'footStop'
  | 'sitHappy'
  | 'sitCoffee'
  | 'hug';

/** Co-Star Girlfriend Jollaman ("여친 졸라걸") appearing across Series 4! */
export const GirlfriendJollamanSvg: React.FC<{
  walkTime: number;
  pose?: GirlfriendPose;
  facing?: 1 | -1;
  showBubble?: string;
  showBubbleSub?: string;
  bridalVeil?: boolean;
}> = ({ walkTime, pose = 'dating', facing = -1, showBubble, showBubbleSub, bridalVeil = false }) => {
  const isWalking = pose === 'walking' || pose === 'angryChase';
  const step = pose === 'angryChase' ? Math.sin(walkTime * 22) * 16 : isWalking ? Math.sin(walkTime * 11) * 14 : 0;
  const chatterPulse = pose === 'chatter' ? Math.abs(Math.sin(walkTime * 40)) : 0;
  const bounce =
    pose === 'chatter'
      ? Math.abs(Math.sin(walkTime * 26)) * 3
      : pose === 'crying'
      ? Math.sin(walkTime * 32) * 1.5
      : 0;

  return (
    <g transform={`translate(0, ${-bounce})`}>
      <g transform={`scale(${facing === 1 ? 1 : -1}, 1)`}>
        {/* Cute Legs & Pink Sneakers */}
        {pose === 'sitHappy' || pose === 'sitCoffee' ? (
          <>
            <path d="M-4 14 L16 20 L18 42" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="22" cy="44" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
            <path d="M2 14 L22 20 L24 42" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" strokeLinejoin="round" />
            <ellipse cx="28" cy="44" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'footStop' ? (
          <>
            <line x1="-3" y1="14" x2="-12" y2="46" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <ellipse cx="-10" cy="48" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
            {/* Extended foot stopping wheeled chair! */}
            <line x1="3" y1="14" x2="28" y2="42" stroke="#0F172A" strokeWidth="5.2" strokeLinecap="round" />
            <ellipse cx="32" cy="42" rx="8.5" ry="4.6" transform="rotate(-15, 32, 42)" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'stomp' ? (
          <>
            <line x1="-3" y1="14" x2="-10" y2="46" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <ellipse cx="-8" cy="48" rx="7.5" ry="4.2" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
            <line x1="4" y1="14" x2="18" y2={36 + Math.abs(Math.sin(walkTime * 24)) * 12} stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <ellipse cx="20" cy={38 + Math.abs(Math.sin(walkTime * 24)) * 12} rx="8" ry="4.4" fill="#EC4899" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : (
          <>
            <line
              x1="-3"
              y1="14"
              x2={pose === 'jump' ? -18 : -10 + step}
              y2={pose === 'jump' ? 32 : 46}
              stroke="#0F172A"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            <ellipse
              cx={pose === 'jump' ? -16 : -8 + step}
              cy={pose === 'jump' ? 34 : 48}
              rx="7.5"
              ry="4.2"
              fill="#EC4899"
              stroke="#0F172A"
              strokeWidth="2"
            />
            <line
              x1="3"
              y1="14"
              x2={pose === 'jump' ? 18 : 10 - step}
              y2={pose === 'jump' ? 32 : 46}
              stroke="#0F172A"
              strokeWidth="4.8"
              strokeLinecap="round"
            />
            <ellipse
              cx={pose === 'jump' ? 20 : 12 - step}
              cy={pose === 'jump' ? 34 : 48}
              rx="7.5"
              ry="4.2"
              fill="#EC4899"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </>
        )}

        {/* Cute Pink Dress/Skirt over Stick Torso */}
        <line x1="0" y1="-19" x2="0" y2="6" stroke="#0F172A" strokeWidth="6" strokeLinecap="round" />
        <polygon points="-8,-11 8,-11 16,17 -16,17" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" strokeLinejoin="round" />
        <circle cx="0" cy="-2" r="2.5" fill="#FFF1F2" />

        {/* Expressive Arms */}
        {pose === 'slap' ? (
          <>
            <line x1="0" y1="-11" x2="-16" y2="4" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <line x1="0" y1="-11" x2="36" y2="-22" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
            <circle cx="38" cy="-22" r="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'wipeTears' ? (
          <>
            <line x1="0" y1="-11" x2="-15" y2="6" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <line x1="0" y1="-11" x2="28" y2={-28 + Math.sin(walkTime * 10) * 4} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            {/* Soft white handkerchief wiping tears */}
            <polygon
              points={`26,${-32 + Math.sin(walkTime * 10) * 4} 38,${-36 + Math.sin(walkTime * 10) * 4} 36,${-22 + Math.sin(walkTime * 10) * 4} 24,${-22 + Math.sin(walkTime * 10) * 4}`}
              fill="#FFFFFF"
              stroke="#94A3B8"
              strokeWidth="1.8"
            />
          </>
        ) : pose === 'carryScared' ? (
          <>
            <line x1="0" y1="-10" x2="22" y2="-20" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
            <circle cx="22" cy="-20" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="0" y1="-10" x2="22" y2="-4" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
            <circle cx="22" cy="-4" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'stomp' ? (
          <>
            <line x1="0" y1="-11" x2="-18" y2="-4" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <line x1="0" y1="-11" x2="20" y2="-16" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
          </>
        ) : pose === 'shakeTree' ? (
          <>
            <line x1="0" y1="-11" x2="22" y2={-30 + Math.sin(walkTime * 34) * 5} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="22" cy={-30 + Math.sin(walkTime * 34) * 5} r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="0" y1="-11" x2="24" y2={-18 - Math.sin(walkTime * 34) * 5} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="24" cy={-18 - Math.sin(walkTime * 34) * 5} r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'tubeSwing' ? (
          <>
            <line x1="0" y1="-11" x2="24" y2="-16" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <line x1="0" y1="-11" x2="20" y2="-2" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <g transform="translate(32, -10) rotate(-18)">
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="none" stroke="#F43F5E" strokeWidth="8" />
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="none" stroke="#FDE047" strokeWidth="8" strokeDasharray="12 16" />
              <ellipse cx="0" cy="0" rx="16" ry="22" fill="none" stroke="#0F172A" strokeWidth="2" />
            </g>
          </>
        ) : pose === 'chatter' ? (
          <>
            <line x1="0" y1="-11" x2="26" y2={-18 + chatterPulse * 10} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="26" cy={-18 + chatterPulse * 10} r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="0" y1="-11" x2="-18" y2={-20 - chatterPulse * 8} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="-18" cy={-20 - chatterPulse * 8} r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'crying' ? (
          <>
            <path d="M0 -11 Q16 -18 11 -32" fill="none" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
            <circle cx="11" cy="-32" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="0" y1="-11" x2="-15" y2="4" stroke="#0F172A" strokeWidth="4.2" strokeLinecap="round" />
          </>
        ) : pose === 'sitCoffee' ? (
          <>
            <line x1="0" y1="-11" x2="-13" y2="6" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx="-13" cy="6" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            {/* Raising steaming coffee cup toward mouth! */}
            <path d="M0 -11 L16 -8 L24 -22" fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
            <g transform="translate(26, -24)">
              <rect x="-5" y="-5" width="11" height="11" rx="2.5" fill="#FDF2F8" stroke="#BE185D" strokeWidth="2" />
              <path d="M6 -3 Q10 -3 10 1 Q10 4 6 4" fill="none" stroke="#BE185D" strokeWidth="1.8" />
              <rect x="-4" y="-4" width="9" height="3" fill="#78350F" />
              <path d={`M-2 -8 Q0 ${-14 - Math.sin(walkTime * 6) * 2} -1 -17`} fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
              <path d={`M2 -9 Q4 ${-15 + Math.cos(walkTime * 5) * 2} 3 -18`} fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
            </g>
            <circle cx="23" cy="-21" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'hug' ? (
          <>
            <path d="M0 -11 Q18 -18 28 -10" fill="none" stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <circle cx="28" cy="-10" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <path d="M0 -8 Q18 -2 26 2" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
            <circle cx="26" cy="2" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'angry' ? (
          <>
            <path d="M0 -11 L-15 -2 L-8 8" fill="none" stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="0" y1="-11" x2="31" y2={-18 + Math.sin(walkTime * 28) * 5} stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <circle cx="33" cy={-18 + Math.sin(walkTime * 28) * 5} r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : pose === 'angryChase' ? (
          <>
            <line x1="0" y1="-11" x2={-16 - step * 0.4} y2={6} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx={-16 - step * 0.4} cy={6} r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="0" y1="-11" x2="27" y2={-22 + Math.sin(walkTime * 26) * 6} stroke="#0F172A" strokeWidth="4.8" strokeLinecap="round" />
            <circle cx="29" cy={-22 + Math.sin(walkTime * 26) * 6} r="4.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        ) : (
          <>
            <line x1="0" y1="-11" x2={isWalking ? -14 - step * 0.6 : -17} y2={isWalking ? 8 : -20} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx={isWalking ? -14 - step * 0.6 : -17} cy={isWalking ? 8 : -20} r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
            <line x1="0" y1="-11" x2={isWalking ? 16 + step * 0.6 : 19} y2={isWalking ? 8 : -16} stroke="#0F172A" strokeWidth="4.4" strokeLinecap="round" />
            <circle cx={isWalking ? 16 + step * 0.6 : 19} cy={isWalking ? 8 : -16} r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          </>
        )}

        {/* Flowing Cute Ponytail */}
        <path d="M-14 -40 Q-28 -44 -26 -24 Q-20 -26 -14 -32 Z" fill="#0F172A" />

        {/* Soft Translucent Bridal Veil (when bridalVeil === true) */}
        {bridalVeil && (
          <g>
            <path
              d="M-6 -50 Q-34 -42 -36 10 Q-22 14 -12 4 Q-16 -24 -4 -48 Z"
              fill="#FFFFFF"
              fillOpacity="0.82"
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            <path d="M-8 -51 Q0 -57 8 -50" fill="none" stroke="#FACC15" strokeWidth="3" strokeLinecap="round" />
            <circle cx="0" cy="-54" r="3" fill="#F43F5E" />
          </g>
        )}

        {/* Round White Head */}
        <circle cx="0" cy="-35" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />

        {/* Signature Pink Hair Bow Ribbon */}
        <g transform="translate(-10, -49) rotate(-18)">
          <polygon points="0,0 -11,-7 -11,7" fill="#EC4899" stroke="#831843" strokeWidth="2" />
          <polygon points="0,0 11,-7 11,7" fill="#EC4899" stroke="#831843" strokeWidth="2" />
          <circle cx="0" cy="0" r="3.2" fill="#FBCFE8" stroke="#831843" strokeWidth="1.8" />
        </g>

        {/* Expressive Eyes & Mouth */}
        {pose === 'crying' ? (
          <>
            <path d="M2 -39 L8 -36 L2 -33" fill="none" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            <path d="M8 -34 Q14 -24 14 -15" fill="none" stroke="#38BDF8" strokeWidth="3.2" strokeLinecap="round" />
            <circle cx={14} cy={-11 + ((walkTime * 24) % 8)} r="2.4" fill="#38BDF8" />
            <path d="M0 -25 Q6 -30 10 -25" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          </>
        ) : pose === 'chatter' ? (
          <>
            <circle cx="5.5" cy="-38" r="2.3" fill="#0F172A" />
            <line x1="7" y1="-40" x2="11" y2="-43" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            <ellipse
              cx="6"
              cy="-27"
              rx="5.5"
              ry={3 + chatterPulse * 4.5}
              fill="#EF4444"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </>
        ) : pose === 'shock' || pose === 'slap' ? (
          <>
            <circle cx="5.5" cy="-38" r="2.6" fill="#0F172A" />
            <path d="M2 -44 L9 -42" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
            <ellipse cx="6" cy="-27" rx="4" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.8" />
          </>
        ) : pose === 'angry' || pose === 'angryChase' ? (
          <>
            <path d="M1 -44 L10 -39" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />
            <circle cx="6" cy="-36.5" r="2.5" fill="#0F172A" />
            {/* Anime anger vein mark on forehead */}
            <path d="M-4 -45 Q-2 -42 -5 -40 M-8 -44 Q-5 -42 -8 -39" fill="none" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" />
            <ellipse
              cx="6.5"
              cy="-26"
              rx="5.2"
              ry={4 + Math.abs(Math.sin(walkTime * 26)) * 2.2}
              fill="#EF4444"
              stroke="#0F172A"
              strokeWidth="2"
            />
          </>
        ) : (
          <>
            <circle cx="5.5" cy="-37" r="2.3" fill="#0F172A" />
            <line x1="7" y1="-39" x2="10.5" y2="-42" stroke="#0F172A" strokeWidth="1.8" strokeLinecap="round" />
            <circle cx="8" cy="-32" r="3" fill="#FDA4AF" opacity="0.85" />
            <path d="M1 -29 Q6 -24 11 -29" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          </>
        )}
      </g>

      {showBubble && (
        <g transform="translate(8, -74)">
          <rect
            x="-34"
            y={showBubbleSub ? -28 : -20}
            width="68"
            height={showBubbleSub ? 40 : 32}
            rx="14"
            fill="#FFFFFF"
            stroke="#EC4899"
            strokeWidth="3"
          />
          <polygon points="-10,12 -16,22 0,12" fill="#FFFFFF" stroke="#EC4899" strokeWidth="2.5" />
          <text x="0" y={showBubbleSub ? -6 : 2} textAnchor="middle" fontSize="15" fontWeight="900" fill="#EC4899">
            {showBubble}
          </text>
          {showBubbleSub && (
            <text x="0" y="7" textAnchor="middle" fontSize="10.5" fontWeight="800" fill="#BE185D">
              {showBubbleSub}
            </text>
          )}
        </g>
      )}
    </g>
  );
};

/** Romantic floating hearts for Jollaman & Girlfriend scenes! */
export const FloatingHeartsSvg: React.FC<{ walkTime: number; big?: boolean }> = ({
  walkTime,
  big = false,
}) => (
  <g>
    {big && (
      <path
        d="M0 -8 C-14 -26 -38 -14 -26 8 C-18 22 0 32 0 32 C0 32 18 22 26 8 C38 -14 14 -26 0 -8 Z"
        fill="#F43F5E"
        stroke="#BE123C"
        strokeWidth="3"
        transform={`scale(${0.92 + Math.sin(walkTime * 6) * 0.08})`}
      />
    )}
    {[
      [-18, -14, 0],
      [6, -34, 1.4],
      [24, -18, 2.7],
    ].map(([hx, hy, phaseOff], i) => {
      const floatY = hy - ((walkTime * 22 + phaseOff * 12) % 26);
      const op = 0.9 - ((walkTime * 0.8 + phaseOff * 0.3) % 0.7);
      return (
        <g
          key={i}
          transform={`translate(${hx + Math.sin(walkTime * 4 + i) * 4}, ${floatY})`}
          opacity={Math.max(0.2, op)}
        >
          <CartoonHeartSvg
            size={i === 1 ? 0.75 : 0.56}
            color={i === 1 ? '#EC4899' : '#FB7185'}
            stroke="#BE123C"
          />
        </g>
      );
    })}
  </g>
);

/** ㅐ: Mischievous Frog ("개구리") */
export const FrogSvg: React.FC<{ jumping?: boolean; mouthOpen?: boolean; facing?: 1 | -1 }> = ({
  jumping = false,
  mouthOpen = false,
  facing = -1,
}) => (
  <g transform={`scale(${facing === -1 ? 1 : -1}, 1)`}>
    <path
      d={jumping ? 'M-16 14 Q-30 34 -24 44' : 'M-16 12 Q-30 4 -24 22'}
      fill="none"
      stroke="#15803D"
      strokeWidth="6.5"
      strokeLinecap="round"
    />
    <path
      d={jumping ? 'M16 14 Q30 34 24 44' : 'M16 12 Q30 4 24 22'}
      fill="none"
      stroke="#15803D"
      strokeWidth="6.5"
      strokeLinecap="round"
    />
    <ellipse cx="0" cy="6" rx="25" ry="18" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
    <ellipse cx="0" cy="11" rx="16" ry="11" fill="#DCFCE7" />
    <line x1="-12" y1="12" x2="-15" y2="23" stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" />
    <line x1="12" y1="12" x2="15" y2="23" stroke="#15803D" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="-11" cy="-12" r="8" fill="#FFFFFF" stroke="#14532D" strokeWidth="2.8" />
    <circle cx="11" cy="-12" r="8" fill="#FFFFFF" stroke="#14532D" strokeWidth="2.8" />
    <circle cx="-12" cy="-12" r="3.4" fill="#0F172A" />
    <circle cx="10" cy="-12" r="3.4" fill="#0F172A" />
    {mouthOpen ? (
      <ellipse cx="-12" cy="3" rx="11" ry="8.5" fill="#991B1B" stroke="#14532D" strokeWidth="2.5" />
    ) : (
      <>
        <circle cx="-15" cy="1" r="4" fill="#FDA4AF" opacity="0.8" />
        <circle cx="15" cy="1" r="4" fill="#FDA4AF" opacity="0.8" />
        <path d="M-13 1 Q0 10 13 1" fill="none" stroke="#14532D" strokeWidth="2.5" strokeLinecap="round" />
      </>
    )}
  </g>
);

/** ㅐ: Pond Splash Ring + Upside-down kicking legs */
export const PondSplashLegsSvg: React.FC<{ walkTime: number; activeSplash: boolean }> = ({
  walkTime,
  activeSplash,
}) => {
  const kick = Math.sin(walkTime * 18) * 14;
  return (
    <g transform="translate(730, 352)">
      <ellipse cx="0" cy="4" rx="46" ry="11" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
      {activeSplash && (
        <g fill="#7DD3FC" stroke="#0284C7" strokeWidth="2">
          <ellipse cx="-38" cy="-18" rx="7" ry="12" transform="rotate(-28, -38, -18)" />
          <ellipse cx="40" cy="-22" rx="7" ry="12" transform="rotate(28, 40, -22)" />
          <circle cx="-18" cy="-34" r="6" />
          <circle cx="22" cy="-38" r="6" />
        </g>
      )}
      <line x1="-6" y1="0" x2={-16 + kick} y2="-36" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
      <ellipse cx={-16 + kick} cy="-38" rx="9" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
      <line x1="6" y1="0" x2={16 - kick} y2="-38" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
      <ellipse cx={16 - kick} cy="-40" rx="9" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
    </g>
  );
};

/** ㅒ: Machine-Gun Word Bullet Stream ("얘", "기", "얘기!") */
export const WordBulletStreamSvg: React.FC<{ walkTime: number; active: boolean }> = ({
  walkTime,
  active,
}) => {
  if (!active) return null;
  const words = ['얘', '기', '얘', '기', '얘기!', '얘', '기'];
  return (
    <g>
      {words.map((w, i) => {
        const p = (walkTime * 3.4 + i * 0.145) % 1;
        const bx = -16 - p * 175;
        const by = -28 + Math.sin(i * 2.7) * 14;
        return (
          <g key={i} transform={`translate(${bx}, ${by}) scale(${0.85 + (1 - p) * 0.25})`}>
            <rect x="-15" y="-12" width="30" height="22" rx="8" fill="#FDF2F8" stroke="#EC4899" strokeWidth="2.2" />
            <text x="0" y="4" textAnchor="middle" fontSize={w.length > 1 ? '11' : '14'} fontWeight="900" fill="#DB2777">
              {w}
            </text>
          </g>
        );
      })}
    </g>
  );
};

/** ㅔ: Sandy Beach Lounge Bench for Dating */
export const BeachLoungeBenchSvg: React.FC = () => (
  <g>
    <rect x="-62" y="2" width="10" height="18" rx="2" fill="#92400E" stroke="#451A03" strokeWidth="2" />
    <rect x="52" y="2" width="10" height="18" rx="2" fill="#92400E" stroke="#451A03" strokeWidth="2" />
    <rect x="-74" y="-8" width="148" height="14" rx="6" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.8" />
    <rect x="-56" y="-8" width="22" height="14" fill="#38BDF8" />
    <rect x="-12" y="-8" width="22" height="14" fill="#F472B6" />
    <rect x="32" y="-8" width="22" height="14" fill="#FACC15" />
  </g>
);

/** ㅔ: Snappy Red Crab ("게") */
export const RedCrabSvg: React.FC<{ walkTime: number; grabbing?: boolean }> = ({
  walkTime,
  grabbing = false,
}) => {
  const scuttle = Math.sin(walkTime * 32) * 7;
  const clawSnap = grabbing ? 0 : Math.abs(Math.sin(walkTime * 20)) * 18;
  return (
    <g>
      {[-18, -10, -2].map((lx, i) => (
        <path
          key={`l-${i}`}
          d={`M${lx} 8 L${lx - 14} ${18 + (i % 2 === 0 ? scuttle : -scuttle) * 0.5} L${lx - 10} 28`}
          fill="none"
          stroke="#B91C1C"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      {[2, 10, 18].map((rx, i) => (
        <path
          key={`r-${i}`}
          d={`M${rx} 8 L${rx + 14} ${18 + (i % 2 === 0 ? -scuttle : scuttle) * 0.5} L${rx + 10} 28`}
          fill="none"
          stroke="#B91C1C"
          strokeWidth="4"
          strokeLinecap="round"
        />
      ))}
      <ellipse cx="0" cy="2" rx="28" ry="18" fill="#EF4444" stroke="#7F1D1D" strokeWidth="3.2" />
      <ellipse cx="-5" cy="-4" rx="14" ry="7" fill="#FCA5A5" opacity="0.45" />
      <line x1="-10" y1="-12" x2="-13" y2="-24" stroke="#7F1D1D" strokeWidth="3.2" />
      <circle cx="-13" cy="-26" r="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="-14" cy="-26" r="2.6" fill="#0F172A" />
      <line x1="10" y1="-12" x2="13" y2="-24" stroke="#7F1D1D" strokeWidth="3.2" />
      <circle cx="13" cy="-26" r="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      <circle cx="12" cy="-26" r="2.6" fill="#0F172A" />
      <path d="M-8 4 Q0 10 8 4" fill="none" stroke="#7F1D1D" strokeWidth="2.4" strokeLinecap="round" />

      <g transform={`translate(${grabbing ? -34 : -26}, -12)`}>
        <line x1="10" y1="10" x2="0" y2="0" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
        <path d={`M0 0 Q-14 ${-14 - clawSnap * 0.4} -22 -2 Q-12 2 0 0 Z`} fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
        <path d={`M0 0 Q-14 ${14 + clawSnap * 0.4} -22 4 Q-10 1 0 0 Z`} fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
      </g>
      <g transform="translate(26, -12)">
        <line x1="-10" y1="10" x2="0" y2="0" stroke="#B91C1C" strokeWidth="5" strokeLinecap="round" />
        <path d={`M0 0 Q14 ${-14 - clawSnap * 0.4} 22 -2 Q12 2 0 0 Z`} fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
        <path d={`M0 0 Q14 ${14 + clawSnap * 0.4} 22 4 Q10 1 0 0 Z`} fill="#EF4444" stroke="#7F1D1D" strokeWidth="2.5" />
      </g>
    </g>
  );
};

/** ㅖ: Grassy Hill + Plump Hen laying 10 Rolling Eggs! ("계란") */
export const HillChickenSvg: React.FC<{
  laying?: boolean;
  walkTime: number;
  chickenOffsetX?: number;
  chickenOffsetY?: number;
  chickenFacingRight?: boolean;
  hideChicken?: boolean;
}> = ({
  laying = false,
  walkTime,
  chickenOffsetX = 0,
  chickenOffsetY = 0,
  chickenFacingRight = false,
  hideChicken = false,
}) => {
  const bob = laying ? Math.abs(Math.sin(walkTime * 22)) * 5 : 0;
  return (
    <g>
      <path d="M-210 124 Q-105 118 -65 24 Q10 -12 186 8 L202 124 Z" fill="#22C55E" stroke="#15803D" strokeWidth="3.5" />
      {!hideChicken && (
        <g transform={`translate(${16 + chickenOffsetX}, ${-bob + chickenOffsetY}) scale(${chickenFacingRight ? -1 : 1}, 1)`}>
          <path d="M18 -6 Q36 -24 38 -8 Q44 -14 34 2 Z" fill="#F97316" stroke="#9A3412" strokeWidth="2" />
          <ellipse cx="0" cy="4" rx="26" ry="20" fill="#FFFBEB" stroke="#B45309" strokeWidth="3" />
          <ellipse cx="4" cy="6" rx="13" ry="8" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" />
          <path d="M-22 -22 Q-18 -34 -12 -24 Q-8 -34 -4 -22 Z" fill="#EF4444" stroke="#991B1B" strokeWidth="2" />
          <circle cx="-14" cy="-12" r="13" fill="#FFFBEB" stroke="#B45309" strokeWidth="2.8" />
          <polygon points="-26,-14 -36,-10 -26,-6" fill="#F59E0B" stroke="#9A3412" strokeWidth="2" />
          <circle cx="-18" cy="-15" r="2.4" fill="#0F172A" />
          <ellipse cx="-22" cy="-4" rx="3" ry="4" fill="#EF4444" />
        </g>
      )}
    </g>
  );
};

export const RollingEggSvg: React.FC<{ rotDeg: number; scale?: number }> = ({
  rotDeg,
  scale = 1,
}) => (
  <g transform={`scale(${scale}) rotate(${rotDeg})`}>
    <ellipse cx="0" cy="0" rx="15" ry="20" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.8" />
    <ellipse cx="-5" cy="-6" rx="3.8" ry="6.5" transform="rotate(-18, -5, -6)" fill="#FFFFFF" opacity="0.85" />
  </g>
);

export const CrackedEggYolkSvg: React.FC = () => (
  <g>
    <path
      d="M-26 3 Q-32 -10 -12 -11 Q0 -17 15 -9 Q30 -6 24 7 Q11 15 -7 11 Q-21 15 -26 3 Z"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="2"
    />
    <circle cx="0" cy="0" r="9.5" fill="#FACC15" stroke="#EA580C" strokeWidth="2" />
    <circle cx="-3" cy="-3" r="2.6" fill="#FEF08A" />
    {/* Cracked Eggshell Halves */}
    <polygon points="-22,-6 -13,-18 -8,-8 -16,-2" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />
    <polygon points="16,-10 26,-16 24,-4 15,-2" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.8" />
  </g>
);

/** Shattering mid-impact egg burst with flying shells & splashed yolk */
export const EggImpactSplatSvg: React.FC<{ age: number; seed?: number }> = ({ age, seed = 0 }) => {
  const burstP = Math.min(Math.max(age / 0.24, 0), 1);
  const fadeSplash = Math.max(0, 1 - Math.max(0, age - 0.16) / 0.25);
  const puddleScale = Math.min(1, 0.55 + burstP * 0.55);
  const spreadDir = seed % 2 === 0 ? 1 : -1;

  return (
    <g>
      {/* Expanding Ground Yolk + Egg White Puddle + Broken Shells */}
      <g transform={`translate(0, 12) scale(${puddleScale})`}>
        <CrackedEggYolkSvg />
      </g>

      {/* Mid-Air Shatter Splash & Flying Shell Shards */}
      {fadeSplash > 0.02 && (
        <g opacity={fadeSplash}>
          {/* Splashing White & Yolk Droplets */}
          <path
            d="M0 0 Q-18 -16 -30 -8 Q-14 -2 -18 8 Q-4 -2 6 8 Q14 -6 28 -10 Q14 -16 0 0 Z"
            fill="#FEF9C3"
            stroke="#F59E0B"
            strokeWidth="1.8"
            transform={`scale(${0.75 + burstP * 0.65})`}
          />
          <circle cx={-26 * burstP} cy={-24 * burstP} r="4.5" fill="#FACC15" />
          <circle cx={22 * burstP} cy={-30 * burstP} r="4" fill="#FACC15" />
          <circle cx={-10 * burstP * spreadDir} cy={-38 * burstP} r="3.5" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.4" />

          {/* Left Flying Jagged Eggshell Half */}
          <g transform={`translate(${-8 - burstP * 26}, ${-4 - burstP * 28 + burstP * burstP * 20}) rotate(${-45 - burstP * 110})`}>
            <path d="M-10 4 A11 11 0 0 1 10 4 L5 0 L0 5 L-5 -1 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.2" />
          </g>
          {/* Right Flying Jagged Eggshell Half */}
          <g transform={`translate(${10 + burstP * 28}, ${-6 - burstP * 32 + burstP * burstP * 22}) rotate(${40 + burstP * 125})`}>
            <path d="M-10 4 A11 11 0 0 1 10 4 L4 -1 L-1 4 L-6 0 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.2" />
          </g>
        </g>
      )}
    </g>
  );
};

/** Broken egg yolk & cracked shell cap splattered on knocked-down Jollaman */
export const EggOnHeadMessSvg: React.FC = () => (
  <g>
    {/* Splat of egg white + yolk on head/shoulder */}
    <path
      d="M-16 2 Q-20 -10 -6 -10 Q4 -16 14 -8 Q22 -2 14 8 Q4 12 -8 8 Z"
      fill="#FFFFFF"
      stroke="#CBD5E1"
      strokeWidth="1.8"
    />
    <circle cx="-1" cy="-1" r="7.5" fill="#FACC15" stroke="#EA580C" strokeWidth="1.8" />
    <path d="M-3 5 Q-1 14 1 16 Q3 13 3 5 Z" fill="#FACC15" />
    {/* Cracked eggshell cap perched on top */}
    <g transform="translate(8, -11) rotate(22)">
      <path d="M-10 4 A10 10 0 0 1 10 4 L5 0 L0 5 L-5 0 Z" fill="#FFFBEB" stroke="#D97706" strokeWidth="2" />
    </g>
  </g>
);

/** ㅘ: Apple Tree + Pickable Red Apple ("사과") — compact crown strictly below sky vowel orbs! */
export const AppleTreeSvg: React.FC<{ shakeAngle?: number; dropProgress?: number }> = ({
  shakeAngle = 0,
  dropProgress = 0,
}) => {
  const hangingApples = [
    [-40, -68],
    [28, -82],
    [42, -52],
    [-10, -94],
  ] as const;

  return (
    <g>
      {/* Trunk + sturdy branches extending well into canopy so nothing floats! */}
      <path
        d="M-18 112 Q-13 42 -15 -34 L15 -34 Q13 42 20 112 Z"
        fill="#92400E"
        stroke="#451A03"
        strokeWidth="3.5"
        strokeLinejoin="round"
      />
      <path
        d="M-8 -22 L-34 -54 L-22 -60 L0 -32 L24 -60 L36 -52 L8 -22 Z"
        fill="#92400E"
        stroke="#451A03"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g transform={`rotate(${shakeAngle}, 0, -28)`}>
        <circle cx="-40" cy="-58" r="38" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
        <circle cx="40" cy="-58" r="38" fill="#16A34A" stroke="#14532D" strokeWidth="3" />
        <circle cx="0" cy="-82" r="42" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
        <circle cx="0" cy="-56" r="36" fill="#22C55E" />
        <circle cx="-20" cy="-60" r="32" fill="#22C55E" />
        <circle cx="22" cy="-58" r="30" fill="#22C55E" />
        {hangingApples.map(([ax, ay], idx) => (
          <g key={idx} transform={`translate(${ax}, ${ay})`}>
            <RedAppleSvg scale={0.76} />
          </g>
        ))}
        {dropProgress === 0 && (
          <g transform="translate(-14, -44)">
            <RedAppleSvg scale={0.96} />
          </g>
        )}
      </g>
    </g>
  );
};

export const RedAppleSvg: React.FC<{ scale?: number }> = ({ scale = 1 }) => (
  <g transform={`scale(${scale})`}>
    <path d="M0 -13 Q3 -20 6 -20" fill="none" stroke="#78350F" strokeWidth="2.8" strokeLinecap="round" />
    <ellipse cx="6" cy="-17" rx="5.5" ry="3" transform="rotate(-24, 6, -17)" fill="#4ADE80" stroke="#15803D" strokeWidth="1.5" />
    <path
      d="M0 -11 C-12 -15 -18 -2 -14 9 C-10 17 -2 15 0 13 C2 15 10 17 14 9 C18 -2 12 -15 0 -11 Z"
      fill="#EF4444"
      stroke="#991B1B"
      strokeWidth="2.4"
    />
    <ellipse cx="-6" cy="-4" rx="2.8" ry="5" transform="rotate(-18, -6, -4)" fill="#FCA5A5" opacity="0.85" />
  </g>
);

/** ㅙ: Giant "왜?!" Comic Speech Bubble */
export const WhySpeechBubbleSvg: React.FC = () => (
  <g>
    <rect x="-66" y="-44" width="132" height="72" rx="24" fill="#FFFFFF" stroke="#DB2777" strokeWidth="4.5" />
    <polygon points="-14,28 -26,46 4,28" fill="#FFFFFF" stroke="#DB2777" strokeWidth="4" />
    <text x="0" y="-2" textAnchor="middle" fontSize="32" fontWeight="900" fill="#DB2777">
      왜?!
    </text>
    <text x="0" y="19" textAnchor="middle" fontSize="14.5" fontWeight="800" fill="#BE185D">
      Why?!
    </text>
  </g>
);

/** ㅚ: Giant Swirling Line-Art Tornado ("회오리") + Upside-down Stuck Kicking Legs */
export const SwirlingTornadoSvg: React.FC<{ walkTime: number; scale?: number }> = ({
  walkTime,
  scale = 1,
}) => {
  const rings = [
    { y: -155, rx: 86, ry: 20 },
    { y: -125, rx: 72, ry: 17 },
    { y: -95, rx: 56, ry: 14 },
    { y: -66, rx: 42, ry: 11 },
    { y: -38, rx: 28, ry: 8 },
    { y: -14, rx: 16, ry: 5 },
  ];
  return (
    <g transform={`scale(${scale})`}>
      {/* Dynamic swirling funnel shadow */}
      <polygon points="-86,-155 86,-155 12,0 -12,0" fill="#94A3B8" opacity="0.22" />
      {rings.map((ring, idx) => {
        const sway = Math.sin(walkTime * 18 + idx * 0.9) * (6 + idx * 1.4);
        return (
          <ellipse
            key={idx}
            cx={sway}
            cy={ring.y}
            rx={ring.rx}
            ry={ring.ry}
            fill="none"
            stroke={idx % 2 === 0 ? '#475569' : '#0EA5E9'}
            strokeWidth={idx < 2 ? 5.5 : 4.5}
            strokeDasharray={`${Math.round(ring.rx * 2.2)} ${Math.round(ring.rx * 0.7)}`}
          />
        );
      })}
      {/* Spiral wind lines */}
      <path
        d={`M${-70 + Math.sin(walkTime * 15) * 10} -140 Q0 -90 ${18 - Math.sin(walkTime * 15) * 8} -20`}
        fill="none"
        stroke="#0284C7"
        strokeWidth="4"
        strokeLinecap="round"
        opacity="0.7"
      />
    </g>
  );
};

export const UpsideDownGroundLegsSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const kick = Math.sin(walkTime * 22) * 16;
  return (
    <g>
      {/* Impact crater dirt mound */}
      <ellipse cx="0" cy="4" rx="34" ry="9" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
      <ellipse cx="-24" cy="-2" rx="8" ry="5" fill="#78350F" />
      <ellipse cx="24" cy="-2" rx="8" ry="5" fill="#78350F" />
      {/* Kicking Jollaman legs upside-down stuck in the ground! */}
      <line x1="-6" y1="0" x2={-16 + kick} y2="-40" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
      <ellipse cx={-16 + kick} cy="-42" rx="9" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
      <line x1="6" y1="0" x2={16 - kick} y2="-42" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
      <ellipse cx={16 - kick} cy="-44" rx="9" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
    </g>
  );
};

/** ㅞ: Golden Wedding Bell + Confetti + Sparkle Ring ("웨딩") */
export const GoldenWeddingBellSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const swing = Math.sin(walkTime * 10) * 14;
  return (
    <g transform={`rotate(${swing}, 0, -24)`}>
      {/* Ribbon Bow on Top */}
      <polygon points="0,-24 -16,-34 -14,-16" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
      <polygon points="0,-24 16,-34 14,-16" fill="#F43F5E" stroke="#9F1239" strokeWidth="2" />
      {/* Classic Golden Bell */}
      <path
        d="M-24 14 Q-20 -18 0 -22 Q20 -18 24 14 L30 22 L-30 22 Z"
        fill="#FACC15"
        stroke="#B45309"
        strokeWidth="3.2"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="24" r="6" fill="#F59E0B" stroke="#92400E" strokeWidth="2.2" />
      {/* Ringing sound waves */}
      <path d="M-38 -2 Q-46 6 -38 14" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
      <path d="M38 -2 Q46 6 38 14" fill="none" stroke="#F59E0B" strokeWidth="3" strokeLinecap="round" />
    </g>
  );
};

export const WeddingConfettiSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => {
  const pieces = [
    [-160, 0, '#F43F5E'],
    [-110, 0.25, '#FACC15'],
    [-55, 0.5, '#38BDF8'],
    [0, 0.15, '#EC4899'],
    [55, 0.4, '#4ADE80'],
    [115, 0.65, '#FACC15'],
    [165, 0.3, '#A855F7'],
    [-80, 0.8, '#FB7185'],
    [85, 0.9, '#38BDF8'],
  ] as const;

  return (
    <g>
      {pieces.map(([px, phase, color], idx) => {
        const y = -160 + ((walkTime * 95 + phase * 220) % 240);
        const x = px + Math.sin(walkTime * 4 + idx) * 14;
        const rot = walkTime * 160 + idx * 40;
        return (
          <rect
            key={idx}
            x={x}
            y={y}
            width="10"
            height="6"
            rx="2"
            fill={color}
            transform={`rotate(${rot}, ${x + 5}, ${y + 3})`}
          />
        );
      })}
    </g>
  );
};

export const RingBoxSparkleSvg: React.FC = () => (
  <g>
    <circle cx="0" cy="0" r="8" fill="none" stroke="#FACC15" strokeWidth="3.5" />
    <polygon points="0,-13 -5,-8 0,-4 5,-8" fill="#38BDF8" stroke="#0284C7" strokeWidth="1.5" />
  </g>
);

/** ㅝ: Monkey Tree positioned safely below sky vowel circles ("원숭이") */
export const TallMonkeyTreeSvg: React.FC = () => (
  <g>
    <path
      d="M-18 118 Q-10 46 -14 -32 L14 -32 Q10 46 20 118 Z"
      fill="#92400E"
      stroke="#451A03"
      strokeWidth="3.5"
      strokeLinejoin="round"
    />
    <path
      d="M-8 -18 L-40 -52 L-28 -58 L0 -30 L32 -54 L42 -46 L10 -18 Z"
      fill="#92400E"
      stroke="#451A03"
      strokeWidth="3"
      strokeLinejoin="round"
    />
    <circle cx="-44" cy="-64" r="38" fill="#15803D" stroke="#14532D" strokeWidth="3" />
    <circle cx="42" cy="-62" r="36" fill="#15803D" stroke="#14532D" strokeWidth="3" />
    <circle cx="0" cy="-80" r="38" fill="#22C55E" stroke="#14532D" strokeWidth="3" />
    <circle cx="0" cy="-58" r="34" fill="#22C55E" />
  </g>
);

export const MischievousMonkeySvg: React.FC<{
  walkTime: number;
  throwing?: boolean;
  panicking?: boolean;
}> = ({ walkTime, throwing = false, panicking = false }) => {
  const tailCurl = Math.sin(walkTime * 10) * 8;
  const armWave = throwing ? Math.sin(walkTime * 28) * 12 : 0;
  return (
    <g>
      {/* Curly Brown Tail */}
      <path
        d={`M16 14 Q38 ${4 + tailCurl} 34 ${-18 + tailCurl * 0.6} Q28 -26 22 -18`}
        fill="none"
        stroke="#78350F"
        strokeWidth="5"
        strokeLinecap="round"
      />
      {/* Round Ears */}
      <circle cx="-18" cy="-22" r="8" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
      <circle cx="-18" cy="-22" r="4" fill="#FDE68A" />
      <circle cx="18" cy="-22" r="8" fill="#92400E" stroke="#451A03" strokeWidth="2.5" />
      <circle cx="18" cy="-22" r="4" fill="#FDE68A" />
      {/* Legs */}
      <line x1="-8" y1="16" x2="-14" y2="30" stroke="#78350F" strokeWidth="5.5" strokeLinecap="round" />
      <line x1="8" y1="16" x2="14" y2="30" stroke="#78350F" strokeWidth="5.5" strokeLinecap="round" />
      {/* Body & Tan Belly */}
      <ellipse cx="0" cy="4" rx="16" ry="18" fill="#92400E" stroke="#451A03" strokeWidth="2.8" />
      <ellipse cx="0" cy="6" rx="10" ry="12" fill="#FDE68A" />
      {/* Arms */}
      <line x1="-10" y1="-4" x2={-24} y2={throwing ? -18 + armWave : 8} stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
      <line x1="10" y1="-4" x2={22} y2={8} stroke="#78350F" strokeWidth="5" strokeLinecap="round" />
      {/* Head & Tan Face Mask */}
      <circle cx="0" cy="-20" r="16" fill="#92400E" stroke="#451A03" strokeWidth="2.8" />
      <ellipse cx="0" cy="-17" rx="12" ry="10" fill="#FDE68A" />
      <circle cx="-5" cy="-23" r="4.5" fill="#FDE68A" />
      <circle cx="5" cy="-23" r="4.5" fill="#FDE68A" />
      {panicking ? (
        <>
          <path d="M-8 -25 L-2 -19 M-2 -25 L-8 -19" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <path d="M2 -25 L8 -19 M8 -25 L2 -19" stroke="#0F172A" strokeWidth="2" strokeLinecap="round" />
          <ellipse cx="0" cy="-12" rx="4.5" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="1.6" />
        </>
      ) : (
        <>
          <circle cx="-5" cy="-22" r="2.2" fill="#0F172A" />
          <circle cx="5" cy="-22" r="2.2" fill="#0F172A" />
          <path d="M-6 -14 Q0 -9 6 -14" fill="none" stroke="#451A03" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </g>
  );
};

export const YellowBananaSvg: React.FC<{ rotDeg?: number; scale?: number }> = ({
  rotDeg = 0,
  scale = 1,
}) => (
  <g transform={`scale(${scale}) rotate(${rotDeg})`}>
    <path
      d="M-12 6 Q-2 -14 14 -10 Q4 -2 -4 10 Z"
      fill="#FACC15"
      stroke="#A16207"
      strokeWidth="2.4"
      strokeLinejoin="round"
    />
    <rect x="12" y="-12" width="4" height="4" rx="1" fill="#713F12" />
  </g>
);

export const SupermanCapeSvg: React.FC<{ walkTime: number; flying?: boolean }> = ({
  walkTime,
  flying = false,
}) => {
  const flutter = Math.sin(walkTime * (flying ? 26 : 9)) * (flying ? 10 : 4);
  return (
    <g>
      <path
        d={
          flying
            ? `M-2 -16 L-56 ${-28 + flutter} L-48 ${8 - flutter * 0.6} L-2 -6 Z`
            : `M-3 -16 L-28 ${24 + flutter} L6 ${26 - flutter * 0.5} L3 -16 Z`
        }
        fill="#EF4444"
        stroke="#991B1B"
        strokeWidth="2.6"
        strokeLinejoin="round"
      />
      <circle cx="0" cy="-15" r="4" fill="#FACC15" stroke="#B45309" strokeWidth="1.6" />
    </g>
  );
};

/** ㅞ: Wedding Hall Floral Arch, Lace Swags & Flower Pedestals + Side-Profile Kneeling Proposal */
export const WeddingHallDecorSvg: React.FC = () => (
  <g>
    {/* Pink/White Wedding Aisle Carpet */}
    <polygon points="-165,42 165,42 190,66 -190,66" fill="#FDF2F8" stroke="#F472B6" strokeWidth="2.5" />
    <polygon points="-145,46 145,46 164,62 -164,62" fill="#FBCFE8" opacity="0.6" />

    {/* Compact Wedding Arch Pillars (kept well below sky vowel orbs) */}
    <rect x="-126" y="-108" width="14" height="152" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
    <rect x="112" y="-108" width="14" height="152" rx="4" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2.5" />
    {/* Graceful Compact Top Floral Arch */}
    <path
      d="M-120 -106 Q0 -164 120 -106"
      fill="none"
      stroke="#FFFFFF"
      strokeWidth="16"
      strokeLinecap="round"
    />
    <path
      d="M-120 -106 Q0 -164 120 -106"
      fill="none"
      stroke="#F9A8D4"
      strokeWidth="9"
      strokeLinecap="round"
    />

    {/* Scalloped White Lace Curtain Swags Hanging from Arch */}
    {[-96, -64, -32, 0, 32, 64, 96].map((lx, idx) => (
      <g key={idx}>
        <path
          d={`M${lx - 16} -112 Q${lx} -94 ${lx + 16} -112`}
          fill="#FFFFFF"
          fillOpacity="0.92"
          stroke="#FBCFE8"
          strokeWidth="2.2"
        />
        <circle cx={lx} cy="-103" r="2.2" fill="#F472B6" />
      </g>
    ))}
    {/* Side Lace Drapes */}
    <path d="M-118 -100 Q-104 -36 -118 22 L-126 22 L-126 -100 Z" fill="#FFFFFF" fillOpacity="0.86" stroke="#FBCFE8" strokeWidth="2" />
    <path d="M118 -100 Q104 -36 118 22 L126 22 L126 -100 Z" fill="#FFFFFF" fillOpacity="0.86" stroke="#FBCFE8" strokeWidth="2" />

    {/* Lush Rose Flower Clusters Along Compact Arch & Side Stands */}
    {[
      [-114, -104, '#F43F5E'],
      [-84, -120, '#FBCFE8'],
      [-46, -131, '#EC4899'],
      [0, -135, '#F43F5E'],
      [46, -131, '#FBCFE8'],
      [84, -120, '#EC4899'],
      [114, -104, '#F43F5E'],
      [-136, 12, '#F472B6'],
      [-122, 6, '#FB7185'],
      [136, 12, '#F472B6'],
      [122, 6, '#FB7185'],
    ].map(([fx, fy, color], idx) => (
      <g key={idx} transform={`translate(${fx}, ${fy})`}>
        <circle cx="-5" cy="3" r="6" fill="#22C55E" />
        <circle cx="5" cy="3" r="6" fill="#16A34A" />
        <circle cx="0" cy="0" r="10" fill={color as string} stroke="#BE185D" strokeWidth="1.6" />
        <circle cx="-2" cy="-2" r="4" fill="#FFF1F2" opacity="0.7" />
      </g>
    ))}
  </g>
);

export const KneelingProposeJollamanSvg: React.FC = () => (
  <g>
    {/* Back knee resting on ground (side-profile facing right!) */}
    <path d="M-12 22 L-18 46 L-34 46" fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="-35" cy="46" rx="7" ry="4" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
    {/* Front leg bent 90 degrees with red sneaker planted */}
    <path d="M-10 22 L14 22 L14 46" fill="none" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="18" cy="47" rx="8.5" ry="4.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />

    {/* Upright Torso */}
    <line x1="-10" y1="-10" x2="-10" y2="23" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />
    {/* Cute Wedding Bowtie */}
    <polygon points="-10,-6 -17,-10 -17,-2" fill="#EC4899" stroke="#831843" strokeWidth="1.5" />
    <polygon points="-10,-6 -3,-10 -3,-2" fill="#EC4899" stroke="#831843" strokeWidth="1.5" />

    {/* Extended Arms holding Open Ring Box forward to Girlfriend */}
    <line x1="-10" y1="-2" x2="22" y2="-10" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
    <circle cx="22" cy="-10" r="4.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

    {/* Open Red Velvet Ring Box & Sparkling Ring */}
    <g transform="translate(30, -14)">
      <rect x="-8" y="-2" width="16" height="10" rx="2" fill="#BE123C" stroke="#881337" strokeWidth="1.8" />
      <polygon points="-8,-2 8,-2 5,-10 -5,-10" fill="#FB7185" stroke="#881337" strokeWidth="1.6" />
      <g transform="translate(0, -10) scale(0.95)">
        <RingBoxSparkleSvg />
      </g>
    </g>

    {/* Side-Profile Happy Blushing Head */}
    <circle cx="-8" cy="-26" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
    <path d="M-11 -42 Q-6 -50 -1 -43" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
    <circle cx="-1" cy="-28" r="2.3" fill="#0F172A" />
    <circle cx="1" cy="-23" r="3.4" fill="#FDA4AF" opacity="0.85" />
    <path d="M-5 -20 Q1 -15 6 -21" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
  </g>
);

/** ㅟ: Fluffy Movable Cloud with bold upward arrows carrying the Couple High Into the Sky ("위") */
export const MagicRideCloudSvg: React.FC<{ walkTime: number; rising?: boolean }> = ({
  walkTime,
  rising = false,
}) => {
  const bob = Math.sin(walkTime * 5) * 3;
  const arrowDrift = (walkTime * 52) % 24;
  return (
    <g transform={`translate(0, ${bob})`}>
      {rising && (
        <g>
          {/* Animated upward lift arrows beneath & flanking the cloud */}
          {[-44, 0, 44].map((ax, idx) => {
            const yOff = (arrowDrift + idx * 8) % 24;
            return (
              <g key={ax} transform={`translate(${ax}, ${36 - yOff})`} opacity={0.92}>
                <line x1="0" y1="20" x2="0" y2="-4" stroke="#0284C7" strokeWidth="4.5" strokeLinecap="round" />
                <polyline
                  points="-8,5 0,-6 8,5"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="4.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            );
          })}
        </g>
      )}
      <ellipse cx="0" cy="12" rx="68" ry="18" fill="#E0F2FE" />
      <circle cx="-42" cy="2" r="24" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="3" />
      <circle cx="42" cy="2" r="24" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="3" />
      <circle cx="-14" cy="-6" r="28" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="3" />
      <circle cx="16" cy="-6" r="28" fill="#FFFFFF" stroke="#7DD3FC" strokeWidth="3" />
      <ellipse cx="0" cy="6" rx="62" ry="18" fill="#FFFFFF" />
      <path d="M-58 14 Q0 24 58 14" fill="none" stroke="#7DD3FC" strokeWidth="3" strokeLinecap="round" />
      {rising && (
        <g transform="translate(0, -14)">
          {/* Bright Center Up-Arrow Emblem */}
          <line x1="0" y1="16" x2="0" y2="-8" stroke="#F59E0B" strokeWidth="5" strokeLinecap="round" />
          <polyline
            points="-9,2 0,-10 9,2"
            fill="none"
            stroke="#F59E0B"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
      )}
    </g>
  );
};

/** ㅢ Flashcard Icon: Cute Pink Tea Chair matching the indoor tea table scene */
export const PinkTeaChairSvg: React.FC = () => (
  <g>
    <rect x="-22" y="-36" width="12" height="44" rx="4" fill="#F472B6" stroke="#BE185D" strokeWidth="2.8" />
    <rect x="-20" y="0" width="44" height="12" rx="4" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2.8" />
    <line x1="-15" y1="12" x2="-15" y2="38" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
    <line x1="17" y1="12" x2="17" y2="38" stroke="#92400E" strokeWidth="5" strokeLinecap="round" />
    <path d="M-16 -24 L-16 -14" stroke="#FDF2F8" strokeWidth="2.2" strokeLinecap="round" opacity="0.8" />
  </g>
);

/** ㅢ: Cozy Indoor Tea Table + Side-by-Side Chairs + Seated Coffee Jollaman */
export const TeaTableAndChairsSvg: React.FC<{ showTableCups?: boolean }> = ({
  showTableCups = true,
}) => (
  <g>
    {/* Left Chair (for Jollaman) */}
    <g transform="translate(-60, 0)">
      <rect x="-24" y="-36" width="10" height="44" rx="4" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
      <rect x="-22" y="0" width="38" height="10" rx="4" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2.5" />
      <line x1="-18" y1="10" x2="-18" y2="34" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="12" y1="10" x2="12" y2="34" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
    </g>

    {/* Right Chair (for Girlfriend) */}
    <g transform="translate(60, 0)">
      <rect x="14" y="-36" width="10" height="44" rx="4" fill="#F472B6" stroke="#BE185D" strokeWidth="2.5" />
      <rect x="-16" y="0" width="38" height="10" rx="4" fill="#FBCFE8" stroke="#BE185D" strokeWidth="2.5" />
      <line x1="-12" y1="10" x2="-12" y2="34" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
      <line x1="18" y1="10" x2="18" y2="34" stroke="#92400E" strokeWidth="4.5" strokeLinecap="round" />
    </g>

    {/* Center Round Pastel Tea Table */}
    <line x1="0" y1="-8" x2="0" y2="34" stroke="#78350F" strokeWidth="6" />
    <ellipse cx="0" cy="34" rx="22" ry="6" fill="#92400E" stroke="#451A03" strokeWidth="2.2" />
    <ellipse cx="0" cy="-10" rx="34" ry="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="2.8" />
    {/* Cute Small Vase with Flower */}
    <polygon points="-5,-10 5,-10 4,-22 -4,-22" fill="#BAE6FD" stroke="#0284C7" strokeWidth="1.6" />
    <circle cx="0" cy="-26" r="5" fill="#F43F5E" />
    <circle cx="0" cy="-26" r="2" fill="#FDE047" />

    {showTableCups && (
      <>
        <rect x="-22" y="-20" width="10" height="9" rx="2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        <rect x="12" y="-20" width="10" height="9" rx="2" fill="#FDF2F8" stroke="#BE185D" strokeWidth="1.8" />
      </>
    )}
  </g>
);

export const SeatedCoffeeJollamanSvg: React.FC<{ walkTime: number }> = ({ walkTime }) => (
  <g>
    {/* Seated Legs bent forward on chair */}
    <path d="M-4 10 L16 14 L18 38" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="22" cy="40" rx="8" ry="4.4" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />
    <path d="M2 10 L22 14 L24 38" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
    <ellipse cx="28" cy="40" rx="8" ry="4.4" fill="#EF4444" stroke="#0F172A" strokeWidth="2" />

    {/* Upright Torso */}
    <line x1="0" y1="-22" x2="0" y2="11" stroke="#0F172A" strokeWidth="6.2" strokeLinecap="round" />

    {/* Relaxed left arm & right arm lifting steaming coffee mug */}
    <line x1="0" y1="-13" x2="-14" y2="4" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
    <circle cx="-14" cy="4" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
    <path d="M0 -13 L16 -10 L24 -24" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    <g transform="translate(26, -26)">
      <rect x="-5" y="-5" width="11" height="11" rx="2.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
      <path d="M6 -3 Q10 -3 10 1 Q10 4 6 4" fill="none" stroke="#0F172A" strokeWidth="1.8" />
      <rect x="-4" y="-4" width="9" height="3" fill="#78350F" />
      <path d={`M-2 -8 Q0 ${-14 - Math.sin(walkTime * 6) * 2} -1 -17`} fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d={`M2 -9 Q4 ${-15 + Math.cos(walkTime * 5) * 2} 3 -18`} fill="none" stroke="#94A3B8" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
    </g>
    <circle cx="23" cy="-23" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

    {/* Happy Smiling Head */}
    <circle cx="0" cy="-38" r="15.5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.8" />
    <path d="M-2 -54 Q3 -62 8 -55" fill="none" stroke="#0F172A" strokeWidth="2.8" strokeLinecap="round" />
    <path d="M-7 -40 Q-4 -44 -1 -40 M3 -40 Q6 -44 9 -40" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
    <circle cx="-7" cy="-34" r="2.8" fill="#FDA4AF" opacity="0.8" />
    <circle cx="9" cy="-34" r="2.8" fill="#FDA4AF" opacity="0.8" />
    <path d="M-3 -31 Q2 -26 7 -31" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
  </g>
);

