import React from 'react';
import { BatchimPromptBannerSvg } from './ParticleTheaterCuts';

export type CombineStyle = 'magnet' | 'hammer' | 'gear' | 'standard';

export interface ParticleBreakdownConfig {
  prefixChars: string[];
  targetWord: string;
  topPart: string;
  batchimChar: string;
  badgeLabel: string;
  correctParticle: string;
  wrongParticle: string;
  wordAfter: string;
  mergedWord: string;
  combineStyle: CombineStyle;
}

export interface DecisionTheatrePrompt {
  promptBefore: string;
  promptAfter: string;
  leftOption: string;
  rightOption: string;
  correctSide: 'left' | 'right';
  completedSentence: string;
  englishCue?: string;
  holdingBouquet?: boolean;
  tapFoot?: boolean;
}

export interface ParticleEpisode extends DecisionTheatrePrompt {
  id: 'eun-neun' | 'i-ga' | 'eul-reul' | 'wa-gwa';
  epNum: number;
  title: string;
  wrongSentenceTag: string;
  monsterLine1: string;
  monsterLine2: string;
  wrongKoreanCue?: string;
  wrongEnglishCue?: string;
  wrongReasonTts?: string;
  happyTag: string;
  monsterIdleHabit?: 'sleep' | 'nosePick' | 'doze';
  kickStyle?: 'flying' | 'double' | 'tornado' | 'fire';
  breakdown: ParticleBreakdownConfig;
}

/**
 * Full-Shot (head-to-red-sneakers) Thinking Jollaman with 🤔 cheeky meme expression!
 * Supports sweat drop, tapping foot, and holding a flower bouquet for EP.4!
 */
export const JollamanThinkingFullShotSvg: React.FC<{
  time: number;
  hoverSide?: 'left' | 'right' | null;
  holdingBouquet?: boolean;
  tapFoot?: boolean;
}> = ({ time, hoverSide = null, holdingBouquet = false, tapFoot = false }) => {
  const glance =
    hoverSide === 'left'
      ? -4.5
      : hoverSide === 'right'
      ? 4.5
      : Math.sin(time * 2.5) * 4;
  const tilt =
    hoverSide === 'left'
      ? -5
      : hoverSide === 'right'
      ? 5
      : Math.sin(time * 2.2) * 3.5;
  const bob = Math.sin(time * 3.8) * 2.5;
  const toeTap = Math.max(0, Math.sin(time * (tapFoot ? 13 : 7))) * (tapFoot ? 6 : 3.5);
  const sweatY = (time * 18) % 16;

  return (
    <g transform={`translate(500, 326) scale(1.48) translate(0, ${-bob})`}>
      <ellipse cx="0" cy="50" rx="28" ry="6.5" fill="#0F172A" fillOpacity="0.18" />

      {/* Full-Shot Legs & Red Sneakers */}
      <line x1="-4" y1="14" x2="-13" y2="46" stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
      <ellipse cx="-16" cy="48" rx="8.5" ry="4.8" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />

      <line x1="4" y1="14" x2="14" y2={46 - toeTap * 0.5} stroke="#0F172A" strokeWidth="5.4" strokeLinecap="round" />
      <ellipse
        cx="17"
        cy={48 - toeTap}
        rx="8.5"
        ry="4.8"
        transform={`rotate(${-toeTap * 2.5}, 17, ${48 - toeTap})`}
        fill="#EF4444"
        stroke="#0F172A"
        strokeWidth="2.2"
      />

      {/* Stick Torso */}
      <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />

      {/* Left Arm (either supporting waist OR holding colorful flower bouquet!) */}
      {holdingBouquet ? (
        <g>
          <path d="M0 -10 Q-18 -6 -22 -14" fill="none" stroke="#0F172A" strokeWidth="4.6" strokeLinecap="round" />
          {/* Flower Bouquet */}
          <g transform="translate(-24, -18) rotate(-18)">
            <polygon points="-5,14 5,14 0,0" fill="#FDE047" stroke="#0F172A" strokeWidth="1.8" />
            <circle cx="-5" cy="-4" r="5" fill="#F43F5E" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="5" cy="-5" r="5" fill="#EC4899" stroke="#0F172A" strokeWidth="1.5" />
            <circle cx="0" cy="-9" r="5" fill="#FACC15" stroke="#0F172A" strokeWidth="1.5" />
          </g>
          <circle cx="-22" cy="-12" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </g>
      ) : (
        <>
          <path
            d="M0 -10 Q-16 -2 -14 5 L8 3"
            fill="none"
            stroke="#0F172A"
            strokeWidth="4.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="9" cy="3" r="4" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
        </>
      )}

      {/* Right Arm bent up holding chin in classic 🤔 pose */}
      <path
        d="M0 -10 L13 1 L7 -17"
        fill="none"
        stroke="#0F172A"
        strokeWidth="4.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Tilted Head + Cheeky 🤔 Facial Expression */}
      <g transform={`rotate(${tilt}, 0, -28)`}>
        <circle cx="0" cy="-36" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />

        {/* Twitching 🤔 Asymmetric Eyebrows */}
        <path
          d={`M-12 ${-47 - Math.abs(Math.sin(time * 5)) * 2} Q-7 -53 -2 -46`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="2.4"
          strokeLinecap="round"
        />
        <path d="M3 -42 L13 -45" fill="none" stroke="#0F172A" strokeWidth="2.6" strokeLinecap="round" />

        {/* Shifty Eyes */}
        <ellipse cx="-6.5" cy="-38" rx="4.2" ry="4.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        <ellipse cx="7.5" cy="-37" rx="4.2" ry="3.8" fill="#FFFFFF" stroke="#0F172A" strokeWidth="1.8" />
        <circle cx={-6.5 + glance * 0.45} cy="-38.5" r="2.2" fill="#0F172A" />
        <circle cx={7.5 + glance * 0.45} cy="-37.5" r="2.2" fill="#0F172A" />

        <circle cx="-11" cy="-31" r="2.2" fill="#FDA4AF" opacity="0.8" />
        <circle cx="11" cy="-31" r="2.2" fill="#FDA4AF" opacity="0.8" />

        <path d="M-5 -27 Q1 -29 6 -25" fill="none" stroke="#0F172A" strokeWidth="2.4" strokeLinecap="round" />

        {/* Thinking Hand on Chin */}
        <g transform="translate(5, -18)">
          <circle cx="0" cy="0" r="4.6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />
          <line x1="-2" y1="-2" x2="-6" y2="-5" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
        </g>

        {/* Cold Sweat Drop */}
        <path
          d={`M18 ${-48 + sweatY * 0.5} Q22 ${-41 + sweatY * 0.5} 18 ${-38 + sweatY * 0.5} Q14 ${-41 + sweatY * 0.5} 18 ${-48 + sweatY * 0.5} Z`}
          fill="#38BDF8"
          stroke="#0284C7"
          strokeWidth="1.2"
        />
      </g>

      {/* "?" Spark */}
      <g transform={`translate(-26, ${-60 + Math.sin(time * 5) * 3}) rotate(-12)`}>
        <circle cx="0" cy="0" r="10" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.2" />
        <text x="0" y="4.5" textAnchor="middle" fontSize="13" fontWeight="900" fill="#D97706">
          ?
        </text>
      </g>
    </g>
  );
};

/**
 * Persistent Top Quiz Prompt Box ("졸라맨 [?] 남자예요.", "공원 [?] 뛰어요." etc.)
 */
export const ParticleQuizPromptSvg: React.FC<{
  episode: DecisionTheatrePrompt;
  time: number;
  compact?: boolean;
}> = ({ episode, time }) => (
  <BatchimPromptBannerSvg episode={episode} time={time} sparkleBatchim />
);

/**
 * Clean Split Decision Screen for ANY ParticleEpisode (Full-Shot 🤔 Jollaman + Left/Right cards)
 */
export const SplitDecisionSceneSvg: React.FC<{
  episode: DecisionTheatrePrompt;
  time: number;
  hoverSide: 'left' | 'right' | null;
  selectedSide: 'left' | 'right' | null;
  compactShorts?: boolean;
  onSelectSide: (side: 'left' | 'right') => void;
  onHoverSide: (side: 'left' | 'right' | null) => void;
}> = ({
  episode,
  time,
  hoverSide,
  selectedSide,
  onSelectSide,
  onHoverSide,
}) => {
  const leftScale = hoverSide === 'left' || selectedSide === 'left' ? 1.08 : 1;
  const rightScale = hoverSide === 'right' || selectedSide === 'right' ? 1.08 : 1;
  const leftLen = episode.leftOption.length;
  const rightLen = episode.rightOption.length;
  const cardW = Math.max(176, Math.max(leftLen, rightLen) * 56 + 64);
  const leftFont = leftLen >= 3 ? 46 : leftLen === 2 ? 64 : 96;
  const rightFont = rightLen >= 3 ? 46 : rightLen === 2 ? 64 : 96;
  const leftY = leftLen >= 2 ? 22 : 32;
  const rightY = rightLen >= 2 ? 22 : 32;

  return (
    <g>
      {/* LEFT HALF */}
      <g
        onClick={() => onSelectSide('left')}
        onMouseEnter={() => onHoverSide('left')}
        onMouseLeave={() => onHoverSide(null)}
        className="cursor-pointer"
      >
        <rect
          x="0"
          y="-65"
          width="500"
          height="645"
          fill={hoverSide === 'left' || selectedSide === 'left' ? '#DBEAFE' : '#EFF6FF'}
        />
        <rect x="0" y="-65" width="500" height="645" fill="url(#leftBlueGlow)" opacity="0.65" />

        <g transform={`translate(215, 290) scale(${leftScale})`}>
          <rect
            x={-cardW / 2}
            y="-84"
            width={cardW}
            height="168"
            rx="28"
            fill="#0F172A"
            fillOpacity="0.16"
            transform="translate(5, 7)"
          />
          <rect
            x={-cardW / 2}
            y="-84"
            width={cardW}
            height="168"
            rx="28"
            fill={selectedSide === 'left' ? '#2563EB' : '#FFFFFF'}
            stroke="#2563EB"
            strokeWidth="7"
          />
          <text
            x="0"
            y={leftY}
            textAnchor="middle"
            fontSize={leftFont}
            fontWeight="900"
            fill={selectedSide === 'left' ? '#FFFFFF' : '#1D4ED8'}
          >
            {episode.leftOption}
          </text>
        </g>
      </g>

      {/* RIGHT HALF */}
      <g
        onClick={() => onSelectSide('right')}
        onMouseEnter={() => onHoverSide('right')}
        onMouseLeave={() => onHoverSide(null)}
        className="cursor-pointer"
      >
        <rect
          x="500"
          y="-65"
          width="500"
          height="645"
          fill={hoverSide === 'right' || selectedSide === 'right' ? '#FFE4E6' : '#FFF1F2'}
        />
        <rect x="500" y="-65" width="500" height="645" fill="url(#rightRoseGlow)" opacity="0.65" />

        <g transform={`translate(785, 290) scale(${rightScale})`}>
          <rect
            x={-cardW / 2}
            y="-84"
            width={cardW}
            height="168"
            rx="28"
            fill="#0F172A"
            fillOpacity="0.16"
            transform="translate(5, 7)"
          />
          <rect
            x={-cardW / 2}
            y="-84"
            width={cardW}
            height="168"
            rx="28"
            fill={selectedSide === 'right' ? '#E11D48' : '#FFFFFF'}
            stroke="#E11D48"
            strokeWidth="7"
          />
          <text
            x="0"
            y={rightY}
            textAnchor="middle"
            fontSize={rightFont}
            fontWeight="900"
            fill={selectedSide === 'right' ? '#FFFFFF' : '#BE123C'}
          >
            {episode.rightOption}
          </text>
        </g>
      </g>

      <rect x="0" y="446" width="1000" height="94" fill="#E2E8F0" fillOpacity="0.45" />
      <line x1="0" y1="446" x2="1000" y2="446" stroke="#0F172A" strokeWidth="3.5" strokeOpacity="0.25" />

      <line
        x1="500"
        y1="80"
        x2="500"
        y2="446"
        stroke="#0F172A"
        strokeWidth="5"
        strokeDasharray="14 10"
        strokeOpacity="0.35"
      />

      <g transform="translate(500, 382) scale(1.2) translate(-500, -326)" className="pointer-events-none">
        <JollamanThinkingFullShotSvg
          time={time}
          hoverSide={hoverSide}
          holdingBouquet={episode.holdingBouquet}
          tapFoot={episode.tapFoot}
        />
      </g>

      <g transform="translate(500, 146)" className="pointer-events-none">
        <rect x="-220" y="-36" width="440" height="72" rx="20" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
        <polygon points="-14,34 14,34 0,52" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="-12,31 12,31 0,39" fill="#FFFFFF" />
        <text x="0" y="-4" textAnchor="middle" fontSize="29" fontWeight="900" fill="#EA580C">
          그래, 결심했어!
        </text>
        <text x="0" y="24" textAnchor="middle" fontSize="20" fontWeight="800" fill="#334155">
          (Okay, I decided!)
        </text>
      </g>
    </g>
  );
};

/**
 * Determined Fighting Gesture Cut after clicking either choice:
 * 😲 Enlightened expression + white forehead headband + pumped clenched fists ("그래, 결심했어!! □를 선택하는거야")
 */
export const JollamanDecisionResolveSvg: React.FC<{
  episode: DecisionTheatrePrompt;
  chosenSide: 'left' | 'right';
  progress: number;
  time: number;
}> = ({ episode, chosenSide, progress, time }) => {
  const chosenParticle = chosenSide === 'left' ? episode.leftOption : episode.rightOption;
  const isLeft = chosenSide === 'left';
  const themeColor = isLeft ? '#2563EB' : '#E11D48';
  const themeLight = isLeft ? '#DBEAFE' : '#FFE4E6';
  const fistPump = Math.sin(time * 22) * 5;
  const ribbonWave = Math.sin(time * 18) * 6;
  const jumpPop = progress < 0.25 ? Math.sin((progress / 0.25) * Math.PI) * 14 : 0;
  const pLen = chosenParticle.length;
  const badgeW = Math.max(92, pLen * 32 + 34);
  const pillW = Math.max(34, pLen * 20 + 16);
  const bubbleW = Math.max(350, pillW + 240);

  return (
    <g>
      {/* Split Backdrop highlighting chosen side */}
      <rect x="0" y="-65" width="500" height="645" fill={isLeft ? '#DBEAFE' : '#F8FAFC'} />
      <rect x="500" y="-65" width="500" height="645" fill={!isLeft ? '#FFE4E6' : '#F8FAFC'} />
      <line x1="500" y1="-65" x2="500" y2="394" stroke="#0F172A" strokeWidth="4" strokeDasharray="12 10" opacity="0.3" />
      <rect x="0" y="394" width="1000" height="146" fill="#E2E8F0" fillOpacity="0.5" />
      <line x1="0" y1="394" x2="1000" y2="394" stroke="#0F172A" strokeWidth="3.5" strokeOpacity="0.25" />

      {/* Dramatic Anime Epiphany Speed Rays */}
      <g transform="translate(500, 300)" opacity="0.35">
        {Array.from({ length: 12 }).map((_, idx) => {
          const ang = idx * 30 + (time * 35) % 30;
          return (
            <polygon
              key={idx}
              points="0,0 -12,-240 12,-240"
              fill={idx % 2 === 0 ? '#FACC15' : themeColor}
              transform={`rotate(${ang})`}
              opacity="0.45"
            />
          );
        })}
      </g>

      {/* Chosen Card Badge hovering beside Jollaman */}
      <g transform={`translate(${isLeft ? 320 : 680}, 256) scale(0.95)`}>
        <rect x={-badgeW / 2} y="-48" width={badgeW} height="96" rx="22" fill={themeColor} stroke="#0F172A" strokeWidth="4.5" />
        <text x="0" y={pLen >= 2 ? 14 : 20} textAnchor="middle" fontSize={pLen >= 3 ? 30 : pLen === 2 ? 40 : 58} fontWeight="900" fill="#FFFFFF">
          {chosenParticle}
        </text>
      </g>

      {/* Speech Bubble: "그래, 결심했어!! [□] Go!" */}
      <g transform="translate(500, 128)">
        <rect x={-bubbleW / 2} y="-42" width={bubbleW} height="82" rx="20" fill="#0F172A" fillOpacity="0.18" transform="translate(4, 5)" />
        <rect x={-bubbleW / 2} y="-42" width={bubbleW} height="82" rx="20" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
        <polygon points="-14,38 14,38 0,56" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" strokeLinejoin="round" />
        <polygon points="-12,35 12,35 0,43" fill="#FFFFFF" />

        <text x="0" y="-9" textAnchor="middle" fontSize="21" fontWeight="900" fill="#EA580C">
          그래, 결심했어!
        </text>

        {/* Highlighted □ Box + Pick! */}
        <g transform={`translate(${-46 - (pillW - 34) * 0.4}, 18)`}>
          <rect x={-pillW / 2} y="-17" width={pillW} height="32" rx="8" fill={themeLight} stroke={themeColor} strokeWidth="3.2" />
          <text x="0" y="6" textAnchor="middle" fontSize={pLen >= 2 ? 19 : 22} fontWeight="900" fill={themeColor}>
            {chosenParticle}
          </text>
        </g>
        <text x={-20 + (pillW - 34) * 0.4} y="25" textAnchor="start" fontSize="20" fontWeight="900" fill="#0F172A">
          선택! (Go!)
        </text>
      </g>

      {/* Determined Jollaman: White Headband + 😲 Enlightened Face + Both Clenched Fists Fighting! */}
      <g transform={`translate(500, ${326 - jumpPop}) scale(1.52)`}>
        <ellipse cx="0" cy={50 + jumpPop * 0.4} rx="30" ry="7" fill="#0F172A" fillOpacity="0.2" />

        {/* Power Stance Legs & Red Sneakers */}
        <line x1="-5" y1="14" x2="-16" y2="46" stroke="#0F172A" strokeWidth="5.6" strokeLinecap="round" />
        <ellipse cx="-19" cy="48" rx="9" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
        <line x1="5" y1="14" x2="16" y2="46" stroke="#0F172A" strokeWidth="5.6" strokeLinecap="round" />
        <ellipse cx="19" cy="48" rx="9" ry="5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />

        {/* Upright Stick Torso */}
        <line x1="0" y1="-19" x2="0" y2="15" stroke="#0F172A" strokeWidth="6.8" strokeLinecap="round" />

        {/* Clenched Fighting Left Fist (pumping forward-left!) */}
        <path
          d={`M0 -10 L-16 ${-2 + fistPump * 0.4} L-24 ${-22 - fistPump}`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform={`translate(-24, ${-24 - fistPump})`}>
          <rect x="-7.5" y="-7.5" width="15" height="15" rx="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.6" />
          <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#0F172A" strokeWidth="2" />
          <line x1="-4" y1="3" x2="4" y2="3" stroke="#0F172A" strokeWidth="2" />
        </g>

        {/* Clenched Fighting Right Fist (pumping high right!) */}
        <path
          d={`M0 -10 L18 ${-4 - fistPump * 0.4} L25 ${-26 + fistPump * 0.6}`}
          fill="none"
          stroke="#0F172A"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <g transform={`translate(25, ${-28 + fistPump * 0.6})`}>
          <rect x="-7.5" y="-7.5" width="15" height="15" rx="5" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.6" />
          <line x1="-4" y1="-1" x2="4" y2="-1" stroke="#0F172A" strokeWidth="2" />
          <line x1="-4" y1="3" x2="4" y2="3" stroke="#0F172A" strokeWidth="2" />
        </g>

        {/* Comic Fist Power Sparks (Pure SVG) */}
        <polygon points="-37,-36 -35,-30 -29,-28 -35,-26 -37,-20 -39,-26 -45,-28 -39,-30" transform={`translate(0, ${-fistPump})`} fill="#EA580C" />
        <polygon points="33,-40 35,-34 41,-32 35,-30 33,-24 31,-30 25,-32 31,-34" transform={`translate(0, ${fistPump * 0.6})`} fill="#F59E0B" />

        {/* Head with 😲 Enlightened Expression + White Fighting Headband! */}
        <g transform="translate(0, -37)">
          {/* Fluttering White Headband Tails behind right side of head */}
          <path
            d={`M16 -8 Q30 ${-14 + ribbonWave} 36 ${-6 + ribbonWave * 0.8} Q28 -2 16 -5 Z`}
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />
          <path
            d={`M16 -5 Q28 ${2 + ribbonWave * 0.7} 34 ${10 + ribbonWave} Q24 9 15 -2 Z`}
            fill="#F1F5F9"
            stroke="#0F172A"
            strokeWidth="2.2"
            strokeLinejoin="round"
          />

          <circle cx="0" cy="0" r="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />

          {/* Crisp White Forehead Headband (이마 흰띠) + Knot */}
          <path
            d="M-16.5 -7 Q0 -11 16.5 -7 L17.5 -2 Q0 -5.5 -17.5 -2 Z"
            fill="#FFFFFF"
            stroke="#0F172A"
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
          <circle cx="17" cy="-5.5" r="3.2" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2" />

          {/* Raised Enlightened Eyebrows + Wide 😲 Sparkling Eyes */}
          <path d="M-11 -12 Q-6 -15 -2 -12" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />
          <path d="M2 -12 Q6 -15 11 -12" fill="none" stroke="#0F172A" strokeWidth="2.2" strokeLinecap="round" />

          <circle cx="-6" cy="-1.5" r="4" fill="#0F172A" />
          <circle cx="-4.8" cy="-3" r="1.4" fill="#FFFFFF" />
          <circle cx="6.5" cy="-1.5" r="4" fill="#0F172A" />
          <circle cx="7.7" cy="-3" r="1.4" fill="#FFFFFF" />

          {/* Rosy Determination Cheeks */}
          <circle cx="-11.5" cy="4.5" r="2.4" fill="#FDA4AF" opacity="0.85" />
          <circle cx="11.5" cy="4.5" r="2.4" fill="#FDA4AF" opacity="0.85" />

          {/* Classic 😲 Surprised/Enlightened Open Mouth */}
          <ellipse cx="0" cy="8.5" rx="4.6" ry="5.6" fill="#EF4444" stroke="#0F172A" strokeWidth="2.2" />
          <ellipse cx="0" cy="11" rx="2.5" ry="2" fill="#FDA4AF" />

          {/* Epiphany Lightbulb Spark above forehead */}
          <g transform={`translate(-22, ${-22 - Math.abs(Math.sin(time * 8)) * 2}) rotate(-14)`}>
            <circle cx="0" cy="0" r="8.5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2" />
            <text x="0" y="3.8" textAnchor="middle" fontSize="11" fontWeight="900" fill="#EA580C">!</text>
          </g>
        </g>
      </g>
    </g>
  );
};

export const ParticleMonsterSvg: React.FC<{
  mode: 'sleeping' | 'ko' | 'eat' | 'nosePick' | 'doze' | 'angry' | 'laugh' | 'smirk';
  time: number;
  eatProgress?: number;
}> = ({ mode, time, eatProgress = 0.85 }) => {
  const breathe = Math.sin(time * 3.5) * 4;
  const jawOpen =
    mode === 'eat'
      ? eatProgress < 0.2
        ? (eatProgress / 0.2) * 34
        : eatProgress < 0.52
        ? 34 + Math.sin(eatProgress * 20) * 6
        : eatProgress < 0.66
        ? Math.max(0, 34 * (1 - (eatProgress - 0.52) / 0.14))
        : 0
      : 0;

  const bellySwell =
    mode === 'eat' && eatProgress >= 0.72
      ? Math.sin(Math.min(1, (eatProgress - 0.72) / 0.2) * Math.PI) * 18 + (eatProgress > 0.82 ? 12 : 0)
      : mode === 'laugh'
      ? Math.sin(time * 24) * 5
      : 0;

  const shakeX =
    mode === 'eat' && eatProgress > 0.48 && eatProgress < 0.68
      ? Math.sin(time * 42) * 4
      : mode === 'ko'
      ? Math.sin(time * 24) * 2
      : 0;

  const dozeNod = mode === 'doze' ? Math.sin(time * 3) * 7 : 0;

  return (
    <g transform={`translate(${shakeX}, ${mode === 'sleeping' ? breathe * 0.5 : dozeNod})`}>
      <ellipse cx="0" cy="108" rx={95 + bellySwell * 0.5} ry="16" fill="#0F172A" fillOpacity="0.22" />

      <path
        d="M52 54 Q112 40 124 8 Q106 34 62 74 Z"
        fill="#7E22CE"
        stroke="#0F172A"
        strokeWidth="4.5"
        strokeLinejoin="round"
      />

      <ellipse
        cx="0"
        cy={18 + breathe * 0.4}
        rx={82 + bellySwell}
        ry={86 + bellySwell * 0.35}
        fill="#9333EA"
        stroke="#0F172A"
        strokeWidth="5.5"
      />
      <ellipse
        cx="-8"
        cy="44"
        rx={52 + bellySwell * 0.7}
        ry={44 + bellySwell * 0.35}
        fill="#C084FC"
        stroke="#581C87"
        strokeWidth="3"
      />

      {mode === 'eat' && eatProgress >= 0.65 && eatProgress <= 0.86 && (
        <ellipse
          cx="-8"
          cy={18 + ((eatProgress - 0.65) / 0.21) * 42}
          rx="22"
          ry="18"
          fill="#E9D5FF"
          stroke="#581C87"
          strokeWidth="3"
        />
      )}

      <polygon points="-44,-54 -68,-94 -18,-66" fill="#FACC15" stroke="#0F172A" strokeWidth="4.2" strokeLinejoin="round" />
      <polygon points="34,-54 62,-92 14,-66" fill="#FACC15" stroke="#0F172A" strokeWidth="4.2" strokeLinejoin="round" />

      {/* Left Claw */}
      {mode === 'nosePick' ? (
        /* Obliviously picking nose! */
        <g>
          <path d="M-76 16 Q-55 -28 -12 -14" fill="none" stroke="#9333EA" strokeWidth="14" strokeLinecap="round" />
          <path d="M-76 16 Q-55 -28 -12 -14" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
          <circle cx="-10" cy="-14" r="6" fill="#C084FC" stroke="#0F172A" strokeWidth="2.5" />
        </g>
      ) : (
        <g transform="translate(-76, 16)">
          <path d="M0 0 Q-28 8 -22 30 Q-6 36 8 22" fill="#9333EA" stroke="#0F172A" strokeWidth="4.5" />
          <polygon points="-24,22 -34,34 -16,32" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
        </g>
      )}
      <g transform="translate(74, 16)">
        <path d="M0 0 Q28 8 22 30 Q6 36 -8 22" fill="#9333EA" stroke="#0F172A" strokeWidth="4.5" />
        <polygon points="24,22 34,34 16,32" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
      </g>

      {mode === 'sleeping' || mode === 'doze' ? (
        <>
          <path d="M-42 -26 Q-26 -16 -12 -26" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M12 -26 Q26 -16 42 -26" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          {/* Big Snot Bubble */}
          <circle
            cx="-14"
            cy={-2}
            r={12 + Math.sin(time * 4) * 6}
            fill="#BAE6FD"
            fillOpacity="0.82"
            stroke="#0284C7"
            strokeWidth="2.5"
          />
          {[0, 1, 2].map((i) => {
            const zy = -72 - ((time * 26 + i * 24) % 60);
            const zx = 36 + i * 22 + Math.sin(time * 3 + i) * 6;
            return (
              <text
                key={i}
                x={zx}
                y={zy}
                fontSize={22 + i * 4}
                fontWeight="900"
                fill="#1E293B"
                opacity={0.95 - ((time * 0.45 + i * 0.3) % 0.7)}
              >
                Z
              </text>
            );
          })}
        </>
      ) : mode === 'ko' ? (
        <>
          <path d="M-40 -36 L-18 -18 M-18 -36 L-40 -18" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M18 -36 L40 -18 M40 -36 L18 -18" stroke="#FDE047" strokeWidth="5.5" strokeLinecap="round" />
          <ellipse cx="0" cy="-76" rx="18" ry="14" fill="#FB7185" stroke="#0F172A" strokeWidth="3.5" />
          {[0, 1, 2].map((i) => {
            const ang = time * 5 + (i * Math.PI * 2) / 3;
            return (
              <text
                key={i}
                x={Math.cos(ang) * 54}
                y={-94 + Math.sin(ang) * 14}
                fontSize="24"
                textAnchor="middle"
                fill="#FACC15"
                stroke="#0F172A"
                strokeWidth="1.5"
              >
                ★
              </text>
            );
          })}
          <path d="M-24 12 Q-12 2 0 12 Q12 22 24 12" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : mode === 'laugh' ? (
        <>
          <path d="M-40 -30 Q-28 -44 -16 -30" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M12 -30 Q24 -44 36 -30" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="-2" cy="14" rx="40" ry="26" fill="#881337" stroke="#0F172A" strokeWidth="4.5" />
          <ellipse cx="-2" cy="24" rx="22" ry="11" fill="#FB7185" />
        </>
      ) : mode === 'smirk' ? (
        <>
          <ellipse cx="-26" cy="-34" rx="13" ry="9" fill="#FEF08A" stroke="#0F172A" strokeWidth="3.5" />
          <ellipse cx="22" cy="-34" rx="13" ry="9" fill="#FEF08A" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="-30" cy="-34" r="5" fill="#0F172A" />
          <circle cx="18" cy="-34" r="5" fill="#0F172A" />
          <path d="M-44 -48 L-10 -42 M10 -44 L44 -42" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
          <path d="M-26 12 Q4 24 32 4" fill="none" stroke="#0F172A" strokeWidth="5" strokeLinecap="round" />
        </>
      ) : mode === 'nosePick' ? (
        <>
          <circle cx="-26" cy="-34" r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="22" cy="-34" r="12" fill="#FFFFFF" stroke="#0F172A" strokeWidth="3.5" />
          <circle cx="-24" cy="-36" r="5" fill="#0F172A" />
          <circle cx="24" cy="-36" r="5" fill="#0F172A" />
          <ellipse cx="-4" cy="-14" rx="12" ry="8" fill="#581C87" />
          <path d="M-18 14 Q0 18 18 14" fill="none" stroke="#0F172A" strokeWidth="4.5" strokeLinecap="round" />
        </>
      ) : (
        <>
          <circle cx="-30" cy="-36" r="14" fill="#FEF08A" stroke="#0F172A" strokeWidth="3.8" />
          <circle cx="24" cy="-36" r="14" fill="#FEF08A" stroke="#0F172A" strokeWidth="3.8" />
          <circle cx="-34" cy="-35" r="6" fill="#DC2626" />
          <circle cx="20" cy="-35" r="6" fill="#DC2626" />
          <path d="M-50 -54 L-6 -42 L44 -54" fill="none" stroke="#0F172A" strokeWidth="6.5" strokeLinecap="round" />

          {jawOpen > 4 ? (
            <>
              <ellipse cx="-6" cy="24" rx="58" ry={14 + jawOpen * 1.15} fill="#881337" stroke="#0F172A" strokeWidth="5" />
              <ellipse cx="-6" cy={26 + jawOpen * 0.75} rx="32" ry="14" fill="#FB7185" />
              {[-38, -18, 2, 22, 38].map((tx, idx) => (
                <polygon
                  key={`top-${idx}`}
                  points={`${tx - 7},${6 - jawOpen * 0.55} ${tx + 7},${6 - jawOpen * 0.55} ${tx},${20 - jawOpen * 0.45}`}
                  fill="#FFFFFF"
                  stroke="#0F172A"
                  strokeWidth="2.4"
                />
              ))}
              {[-32, -12, 8, 28].map((tx, idx) => (
                <polygon
                  key={`bot-${idx}`}
                  points={`${tx - 7},${38 + jawOpen * 0.8} ${tx + 7},${38 + jawOpen * 0.8} ${tx},${25 + jawOpen * 0.68}`}
                  fill="#FFFFFF"
                  stroke="#0F172A"
                  strokeWidth="2.4"
                />
              ))}
            </>
          ) : (
            <>
              <path d="M-44 18 Q-4 4 38 18" fill="none" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
              <polygon points="-28,16 -20,14 -24,28" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
              <polygon points="18,14 26,16 22,28" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.2" />
            </>
          )}
        </>
      )}
    </g>
  );
};

/**
 * Spinning Red Emergency Beacon + Flashing Alert Backdrop + Giant Slamming Red X!
 */
const EmergencyWarningShellSvg: React.FC<{
  subProgress: number;
  time: number;
  headerText: string;
}> = ({ subProgress, time, headerText }) => {
  const strobeOn = Math.sin(time * 24) > 0;
  const beamSweep = Math.sin(time * 16) * 44;
  const spinDeg = (time * 640) % 360;
  const slamShake = subProgress < 0.28 ? Math.sin(time * 54) * (1 - subProgress / 0.28) * 6 : 0;

  return (
    <g transform={`translate(${slamShake}, 0)`}>
      {/* Pulsing Emergency Background */}
      <rect x="0" y="-65" width="1000" height="630" fill={strobeOn ? '#FFE4E6' : '#FFF1F2'} />

      {/* Rotating Emergency Light Sweep Cones */}
      <g transform="translate(500, 44)" opacity={strobeOn ? 0.34 : 0.16}>
        <g transform={`rotate(${beamSweep})`}>
          <polygon points="0,0 -230,-110 -230,120" fill="#EF4444" />
          <polygon points="0,0 230,-110 230,120" fill="#F97316" />
        </g>
        <g transform={`rotate(${-beamSweep * 0.7})`} opacity="0.7">
          <polygon points="0,0 -180,-140 -90,-180" fill="#FACC15" />
          <polygon points="0,0 180,-140 90,-180" fill="#EF4444" />
        </g>
      </g>

      {/* Main White Alert Card with Crimson Hazard Border */}
      <rect
        x="195"
        y="46"
        width="610"
        height="392"
        rx="28"
        fill="#FFFFFF"
        stroke={strobeOn ? '#DC2626' : '#991B1B'}
        strokeWidth="5.5"
      />

      {/* Spinning Emergency Beacon Dome Centered at Top */}
      <g transform="translate(500, 46)">
        {/* Sound Beep Sparks ("삐-빕!!") */}
        {strobeOn && (
          <g stroke="#DC2626" strokeWidth="3.5" strokeLinecap="round">
            <line x1="-58" y1="-10" x2="-74" y2="-18" />
            <line x1="-60" y1="2" x2="-78" y2="2" />
            <line x1="58" y1="-10" x2="74" y2="-18" />
            <line x1="60" y1="2" x2="78" y2="2" />
          </g>
        )}
        <g transform="translate(-108, -4) rotate(-6)">
          <rect x="-36" y="-13" width="72" height="26" rx="9" fill="#FEF08A" stroke="#DC2626" strokeWidth="2.8" />
          <text x="0" y="5" textAnchor="middle" fontSize="14" fontWeight="900" fill="#DC2626">
            삐-빕!!
          </text>
        </g>

        {/* Metallic Siren Base */}
        <rect x="-32" y="2" width="64" height="14" rx="5" fill="#1E293B" stroke="#0F172A" strokeWidth="3" />
        {/* Glowing Red Dome */}
        <path
          d="M-24 2 V-16 A24 22 0 0 1 24 -16 V2 Z"
          fill={strobeOn ? '#EF4444' : '#DC2626'}
          stroke="#0F172A"
          strokeWidth="3.5"
        />
        {/* Rotating Inner Reflector Core (gives unmistakable spinning look!) */}
        <g transform={`translate(0, -14) rotate(${spinDeg})`}>
          <rect x="-13" y="-4" width="26" height="8" rx="4" fill="#FEF08A" opacity="0.95" />
          <circle cx="0" cy="0" r="5" fill="#FFFFFF" />
        </g>
      </g>

      {/* Dark Emergency Header Strip */}
      <g transform="translate(500, 92)">
        <rect x="-185" y="-18" width="370" height="36" rx="18" fill="#0F172A" stroke="#DC2626" strokeWidth="2.5" />
        <text x="0" y="5.5" textAnchor="middle" fontSize="15.5" fontWeight="900" fill="#FEF08A">
          {headerText}
        </text>
      </g>
    </g>
  );
};

/**
 * Giant Slamming Crimson X Stamp ("빨간 X")
 */
const SlamRedXMarkSvg: React.FC<{
  x: number;
  y: number;
  subProgress: number;
  time: number;
  size?: number;
}> = ({ x, y, subProgress, time, size = 44 }) => {
  const slamT = Math.min(1, subProgress / 0.16);
  const scale = slamT < 1 ? 2.1 - slamT * 1.1 : 1 + Math.abs(Math.sin(time * 12)) * 0.1;

  return (
    <g transform={`translate(${x}, ${y}) scale(${scale})`}>
      <circle cx="0" cy="0" r={size + 6} fill="#FFFFFF" fillOpacity="0.88" stroke="#DC2626" strokeWidth="4" />
      <path
        d={`M${-size * 0.56} ${-size * 0.56} L${size * 0.56} ${size * 0.56} M${size * 0.56} ${-size * 0.56} L${-size * 0.56} ${size * 0.56}`}
        stroke="#DC2626"
        strokeWidth="12"
        strokeLinecap="round"
      />
    </g>
  );
};

export interface ParticleRuleLessonConfig {
  ruleBadge: string;
  wrongSentence: string;
  wrongReason: string;
  wrongKoreanCue?: string;
  wrongReasonTts?: string;
  wrongParticle?: string;
  prefixWord: string;
  correctParticle: string;
  suffixWord: string;
  completedSentence: string;
  englishMeaning?: string;
  accentColor: string;
}

/**
 * Series 13 WRONG Emergency Screen:
 * Spinning emergency beacon + Giant Red X over the wrong particle + why-wrong cue (NO correct answer spoiler!).
 */
export const ParticleRuleXraySvg: React.FC<{
  lesson: ParticleRuleLessonConfig;
  subProgress: number;
  time: number;
}> = ({ lesson, subProgress, time }) => {
  const wrongP = lesson.wrongParticle ?? '?';
  const wpLen = wrongP.length;
  const particleW = Math.max(82, wpLen * 30 + 30);

  return (
    <g>
      <EmergencyWarningShellSvg
        subProgress={subProgress}
        time={time}
        headerText={`🚨 WRONG · ${lesson.wrongSentence}`}
      />

      {/* Prefix + Wrong Particle + Red X (NO correct answer shown!) */}
      <g transform="translate(500, 214)">
        <g transform="translate(-88, 0)">
          <rect x="-78" y="-38" width="156" height="76" rx="16" fill="#F1F5F9" stroke="#475569" strokeWidth="3.2" />
          <text x="0" y="10" textAnchor="middle" fontSize={lesson.prefixWord.length >= 4 ? 22 : 28} fontWeight="900" fill="#0F172A">
            {lesson.prefixWord}
          </text>
        </g>

        <text x="12" y="10" textAnchor="middle" fontSize="30" fontWeight="900" fill="#94A3B8">
          +
        </text>

        <g transform="translate(104, 0)">
          <rect
            x={-particleW / 2}
            y="-40"
            width={particleW}
            height="80"
            rx="16"
            fill="#FFE4E6"
            stroke="#DC2626"
            strokeWidth="4.5"
          />
          <text
            x="0"
            y="10"
            textAnchor="middle"
            fontSize={wpLen >= 3 ? 22 : wpLen === 2 ? 28 : 34}
            fontWeight="900"
            fill="#BE123C"
          >
            {wrongP}
          </text>
          <SlamRedXMarkSvg x={0} y={0} subProgress={subProgress} time={time} size={36} />
        </g>
      </g>

      {/* Bottom Why-Wrong Banner (NO right answer spoiler!) */}
      <g transform="translate(500, 366)">
        <rect x="-258" y="-38" width="516" height="76" rx="20" fill="#DC2626" stroke="#0F172A" strokeWidth="4.5" />
        <text x="0" y="-4" textAnchor="middle" fontSize="20" fontWeight="900" fill="#FFFFFF">
          ❌ {lesson.wrongReason}
        </text>
        {lesson.wrongKoreanCue && (
          <text x="0" y="23" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FEF08A">
            {lesson.wrongKoreanCue}
          </text>
        )}
      </g>
    </g>
  );
};


