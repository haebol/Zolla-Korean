import React from 'react';
import { JollamanCharacterSvg } from './JollamanSprites';
import {
  DecisionTheatrePrompt,
  JollamanThinkingFullShotSvg,
  ParticleEpisode,
  ParticleMonsterSvg,
} from './JollamanSprites13';
import { decomposeLastHangul } from '../utils/hangulDecompose';

/**
 * High-contrast Top Prompt Banner with 1.5x enlarged pre-particle syllable,
 * yellow/red Batchim highlight box, optional Cut 1 sparkle, and natural English translation.
 */
export const BatchimPromptBannerSvg: React.FC<{
  episode: DecisionTheatrePrompt;
  time: number;
  completedMode?: boolean;
  sparkleBatchim?: boolean;
}> = ({ episode, time, completedMode = false, sparkleBatchim = false }) => {
  const { prefix, target, topPart, jong, hasBatchim } = decomposeLastHangul(episode.promptBefore);
  const correctParticle =
    episode.correctSide === 'left' ? episode.leftOption : episode.rightOption;

  const blankPulse = completedMode ? 1 : 1 + Math.sin(time * 6) * 0.05;
  const sparklePulse = sparkleBatchim ? 0.88 + Math.abs(Math.sin(time * 5.5)) * 0.25 : 1;

  const prefixW = prefix.length * 36;
  const afterW = episode.promptAfter.length * 34;
  const targetSlotW = 76;
  const particleSlotW = Math.max(62, correctParticle.length * 38 + 26);

  const sentenceTotalW = prefixW + targetSlotW + particleSlotW + afterW + 58;
  const enW = (episode.englishCue?.length ?? 0) * 14 + 60;
  const boxW = Math.min(930, Math.max(620, sentenceTotalW + 44, enW));

  const startX = -sentenceTotalW / 2 + 12;
  const prefixEndX = startX + prefixW;
  const targetCenterX = prefixEndX + targetSlotW / 2 + 6;
  const particleCenterX = targetCenterX + targetSlotW / 2 + particleSlotW / 2 + 12;
  const afterStartX = particleCenterX + particleSlotW / 2 + 14;

  return (
    <g transform="translate(500, 20)" className="pointer-events-none">
      {/* Drop shadow */}
      <rect
        x={-boxW / 2}
        y="-52"
        width={boxW}
        height="112"
        rx="22"
        fill="#0F172A"
        fillOpacity="0.18"
        transform="translate(4, 5)"
      />
      {/* Main white card */}
      <rect
        x={-boxW / 2}
        y="-52"
        width={boxW}
        height="112"
        rx="22"
        fill="#FFFFFF"
        stroke={completedMode ? '#059669' : '#0F172A'}
        strokeWidth="4.5"
      />

      {/* Row 1: Korean sentence with 1.5x target syllable + Batchim highlight */}
      <g transform="translate(0, -10)">
        {prefix && (
          <text
            x={prefixEndX}
            y="8"
            textAnchor="end"
            fontSize="36"
            fontWeight="900"
            fill="#0F172A"
          >
            {prefix}
          </text>
        )}

        {/* 1.5x Larger Target Syllable immediately before [?] */}
        <g transform={`translate(${targetCenterX}, -2)`}>
          <rect
            x="-36"
            y="-34"
            width="72"
            height="68"
            rx="14"
            fill={hasBatchim ? '#FFFBEB' : '#FFF1F2'}
            stroke={hasBatchim ? '#F59E0B' : '#E11D48'}
            strokeWidth={hasBatchim ? 3.5 : 3}
            strokeDasharray={hasBatchim ? undefined : '6 3'}
          />

          {hasBatchim ? (
            <>
              <text
                x="0"
                y="-5"
                textAnchor="middle"
                fontSize="38"
                fontWeight="900"
                fill="#0F172A"
              >
                {topPart}
              </text>
              {/* Highlighted Batchim Box */}
              <g transform={`translate(0, 19) scale(${sparkleBatchim ? 0.98 + Math.abs(Math.sin(time * 5)) * 0.12 : 1})`}>
                <rect
                  x="-26"
                  y="-14"
                  width="52"
                  height="27"
                  rx="7"
                  fill="#FACC15"
                  stroke="#DC2626"
                  strokeWidth="3"
                />
                <text
                  x="0"
                  y="7"
                  textAnchor="middle"
                  fontSize="24"
                  fontWeight="900"
                  fill="#DC2626"
                >
                  {jong}
                </text>
              </g>
              {sparkleBatchim && (
                <>
                  <text
                    x="-34"
                    y="24"
                    textAnchor="middle"
                    fontSize="18"
                    fill="#F59E0B"
                    transform={`scale(${sparklePulse})`}
                  >
                    ✦
                  </text>
                  <text
                    x="34"
                    y="-22"
                    textAnchor="middle"
                    fontSize="18"
                    fill="#F59E0B"
                    transform={`scale(${sparklePulse})`}
                  >
                    ✦
                  </text>
                </>
              )}
            </>
          ) : (
            <>
              <text
                x="0"
                y="2"
                textAnchor="middle"
                fontSize="48"
                fontWeight="900"
                fill="#0F172A"
              >
                {target}
              </text>
              <rect
                x="-30"
                y="14"
                width="60"
                height="18"
                rx="6"
                fill="#FFE4E6"
                stroke="#E11D48"
                strokeWidth="2"
              />
              <text
                x="0"
                y="27"
                textAnchor="middle"
                fontSize="12.5"
                fontWeight="900"
                fill="#BE123C"
              >
                받침 ✕
              </text>
            </>
          )}
        </g>

        {/* [ ? ] or Completed Particle Box */}
        <g transform={`translate(${particleCenterX}, -2) scale(${blankPulse})`}>
          <rect
            x={-particleSlotW / 2}
            y="-28"
            width={particleSlotW}
            height="56"
            rx="14"
            fill={completedMode ? '#D1FAE5' : '#FEF08A'}
            stroke={completedMode ? '#059669' : '#EA580C'}
            strokeWidth="4.2"
          />
          <text
            x="0"
            y="12"
            textAnchor="middle"
            fontSize={completedMode ? (correctParticle.length >= 2 ? '30' : '38') : '38'}
            fontWeight="900"
            fill={completedMode ? '#047857' : '#EA580C'}
          >
            {completedMode ? correctParticle : '?'}
          </text>
        </g>

        {/* Prompt After */}
        <text
          x={afterStartX}
          y="8"
          textAnchor="start"
          fontSize="36"
          fontWeight="900"
          fill="#0F172A"
        >
          {episode.promptAfter}
        </text>
      </g>

      {/* Row 2: Natural English Translation */}
      {episode.englishCue && (
        <text
          x="0"
          y="42"
          textAnchor="middle"
          fontSize="23"
          fontWeight="800"
          fill={completedMode ? '#047857' : '#475569'}
        >
          {episode.englishCue}
        </text>
      )}
    </g>
  );
};

/**
 * 1컷: 선택의 기로 (Large mobile-friendly cards + Thinking Jollaman + sparkling Batchim)
 */
export const TheaterCut1DecisionSvg: React.FC<{
  episode: DecisionTheatrePrompt;
  time: number;
  hoverSide: 'left' | 'right' | null;
  selectedSide: 'left' | 'right' | null;
  onSelectSide: (side: 'left' | 'right') => void;
  onHoverSide: (side: 'left' | 'right' | null) => void;
}> = ({ episode, time, hoverSide, selectedSide, onSelectSide, onHoverSide }) => {
  const leftScale = hoverSide === 'left' || selectedSide === 'left' ? 1.07 : 1;
  const rightScale = hoverSide === 'right' || selectedSide === 'right' ? 1.07 : 1;
  const leftLen = episode.leftOption.length;
  const rightLen = episode.rightOption.length;
  const cardW = 216;
  const cardH = 182;

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
        <rect x="0" y="-65" width="500" height="645" fill="url(#leftBlueGlow)" opacity="0.7" />

        <g transform={`translate(190, 296) scale(${leftScale})`}>
          <rect
            x={-cardW / 2}
            y={-cardH / 2}
            width={cardW}
            height={cardH}
            rx="30"
            fill="#0F172A"
            fillOpacity="0.16"
            transform="translate(5, 7)"
          />
          <rect
            x={-cardW / 2}
            y={-cardH / 2}
            width={cardW}
            height={cardH}
            rx="30"
            fill={selectedSide === 'left' ? '#2563EB' : '#FFFFFF'}
            stroke="#2563EB"
            strokeWidth="7"
          />
          <text
            x="0"
            y={leftLen >= 3 ? 18 : leftLen >= 2 ? 22 : 34}
            textAnchor="middle"
            fontSize={leftLen >= 3 ? 54 : leftLen >= 2 ? 72 : 104}
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
        <rect x="500" y="-65" width="500" height="645" fill="url(#rightRoseGlow)" opacity="0.7" />

        <g transform={`translate(810, 296) scale(${rightScale})`}>
          <rect
            x={-cardW / 2}
            y={-cardH / 2}
            width={cardW}
            height={cardH}
            rx="30"
            fill="#0F172A"
            fillOpacity="0.16"
            transform="translate(5, 7)"
          />
          <rect
            x={-cardW / 2}
            y={-cardH / 2}
            width={cardW}
            height={cardH}
            rx="30"
            fill={selectedSide === 'right' ? '#E11D48' : '#FFFFFF'}
            stroke="#E11D48"
            strokeWidth="7"
          />
          <text
            x="0"
            y={rightLen >= 3 ? 18 : rightLen >= 2 ? 22 : 34}
            textAnchor="middle"
            fontSize={rightLen >= 3 ? 54 : rightLen >= 2 ? 72 : 104}
            fontWeight="900"
            fill={selectedSide === 'right' ? '#FFFFFF' : '#BE123C'}
          >
            {episode.rightOption}
          </text>
        </g>
      </g>

      {/* Clean Minimal Ground */}
      <rect x="0" y="452" width="1000" height="90" fill="#CBD5E1" fillOpacity="0.4" />
      <line x1="0" y1="452" x2="1000" y2="452" stroke="#0F172A" strokeWidth="3.5" strokeOpacity="0.25" />

      <line
        x1="500"
        y1="82"
        x2="500"
        y2="452"
        stroke="#0F172A"
        strokeWidth="5"
        strokeDasharray="14 10"
        strokeOpacity="0.35"
      />

      {/* Big Thinking Jollaman Centered */}
      <g
        transform="translate(500, 386) scale(1.22) translate(-500, -326)"
        className="pointer-events-none"
      >
        <JollamanThinkingFullShotSvg
          time={time}
          hoverSide={hoverSide}
          holdingBouquet={episode.holdingBouquet}
          tapFoot={episode.tapFoot}
        />
      </g>

      {/* Big Readable Speech Bubble: "그래, 결심했어! (Okay, I decided!)" */}
      <g transform="translate(500, 152)" className="pointer-events-none">
        <rect
          x="-240"
          y="-46"
          width="480"
          height="92"
          rx="24"
          fill="#0F172A"
          fillOpacity="0.18"
          transform="translate(4, 6)"
        />
        <rect
          x="-240"
          y="-46"
          width="480"
          height="92"
          rx="24"
          fill="#FFFFFF"
          stroke="#0F172A"
          strokeWidth="4.8"
        />
        <polygon points="-16,44 16,44 0,66" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.2" strokeLinejoin="round" />
        <polygon points="-13,41 13,41 0,51" fill="#FFFFFF" />
        <text x="0" y="-8" textAnchor="middle" fontSize="34" fontWeight="900" fill="#EA580C">
          그래, 결심했어!
        </text>
        <text x="0" y="28" textAnchor="middle" fontSize="22" fontWeight="800" fill="#334155">
          (Okay, I decided!)
        </text>
      </g>
    </g>
  );
};

/**
 * 2컷: 오답 선택 시 - 보라색 몬스터 등장 & 오답 조사 튕겨내기 + 붉은 경고!
 */
export const TheaterCut2WrongMonsterSvg: React.FC<{
  episode: ParticleEpisode;
  progress: number;
  time: number;
}> = ({ episode, progress, time }) => {
  const strobeOn = Math.sin(time * 24) > 0;
  const wrongParticle = episode.breakdown.wrongParticle;
  const slamShake = progress < 0.35 ? Math.sin(time * 52) * 6 : 0;

  // Monster lunges left at progress 0.15..0.45 and smashes wrong card flying!
  const lungeP = progress < 0.15 ? 0 : Math.min(1, (progress - 0.15) / 0.25);
  const monsterX = 725 - Math.sin(lungeP * Math.PI * 0.5) * 145;
  const flingP = Math.max(0, (progress - 0.32) / 0.68);
  const cardX = 395 - flingP * 320;
  const cardY = 305 - Math.sin(flingP * Math.PI) * 165;
  const cardRot = -flingP * 540;

  return (
    <g transform={`translate(${slamShake}, 0)`}>
      {/* Red Strobe Alert Backdrop */}
      <rect x="0" y="-65" width="1000" height="630" fill={strobeOn ? '#FFE4E6' : '#FFF1F2'} />
      <rect x="0" y="440" width="1000" height="105" fill="#FDA4AF" />
      <line x1="0" y1="440" x2="1000" y2="440" stroke="#0F172A" strokeWidth="4" />

      {/* Flashing Crimson Danger Border inside canvas */}
      <rect
        x="10"
        y="-42"
        width="980"
        height="544"
        fill="none"
        stroke={strobeOn ? '#DC2626' : '#FB7185'}
        strokeWidth="12"
        opacity={strobeOn ? 0.9 : 0.45}
      />

      {/* Recoiling Jollaman on Left */}
      <g transform={`translate(${215 - flingP * 45}, 372) rotate(${-flingP * 18}) scale(1.6)`}>
        <JollamanCharacterSvg
          faceMode={flingP > 0.3 ? 'dizzy' : 'panic'}
          isWalking={false}
          legSwing={0}
          armSwing={0}
          walkTime={time}
          activeChar={wrongParticle}
        />
      </g>

      {/* Purple Monster lunging & swatting wrong particle card */}
      <g transform={`translate(${monsterX}, 318) scale(1.32)`}>
        <ParticleMonsterSvg mode={progress > 0.45 ? 'laugh' : 'angry'} time={time} />
      </g>

      {/* Wrong Particle Card being flung off with giant ❌ */}
      <g transform={`translate(${cardX}, ${cardY}) rotate(${cardRot})`}>
        <rect
          x="-62"
          y="-58"
          width="124"
          height="116"
          rx="22"
          fill="#FFFFFF"
          stroke="#DC2626"
          strokeWidth="6.5"
        />
        <text x="0" y="22" textAnchor="middle" fontSize="64" fontWeight="900" fill="#DC2626">
          {wrongParticle}
        </text>
        <path
          d="M-38 -38 L38 38 M38 -38 L-38 38"
          stroke="#DC2626"
          strokeWidth="10"
          strokeLinecap="round"
          opacity="0.88"
        />
      </g>

      {/* Comic Impact Starburst ("튕!!") */}
      {progress >= 0.28 && progress < 0.78 && (
        <g transform="translate(430, 265) rotate(-10)">
          <polygon
            points="-68,-26 -20,-42 6,-22 52,-44 38,-6 74,16 24,24 8,52 -22,24 -66,34 -40,4"
            fill="#FACC15"
            stroke="#DC2626"
            strokeWidth="4.5"
          />
          <text x="2" y="12" textAnchor="middle" fontSize="34" fontWeight="900" fill="#DC2626">
            튕!!
          </text>
        </g>
      )}

      {/* Huge High-Contrast Cut Banner: "크앙!! 졸라맨는?! ❌ (WRONG!)" */}
      <g transform="translate(500, 148)">
        <rect
          x="-290"
          y="-46"
          width="580"
          height="92"
          rx="24"
          fill="#0F172A"
          fillOpacity="0.22"
          transform="translate(4, 6)"
        />
        <rect
          x="-290"
          y="-46"
          width="580"
          height="92"
          rx="24"
          fill="#FFFFFF"
          stroke="#DC2626"
          strokeWidth="5.5"
        />
        <text x="0" y="-8" textAnchor="middle" fontSize="38" fontWeight="900" fill="#DC2626">
          크앙!! {episode.wrongSentenceTag} ❌
        </text>
        <text x="0" y="28" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0F172A">
          (WRONG!)
        </text>
      </g>
    </g>
  );
};

/**
 * 3컷: 받침 X-ray 돋보기 교정 (초성·중성 흐리게, 받침만 빨간 박스 + '[받침 ㄴ] + [은] = ⭕')
 */
export const TheaterCut3XrayLessonSvg: React.FC<{
  episode: { promptBefore: string; breakdown: { correctParticle: string } };
  subProgress: number;
  time: number;
}> = ({ episode, subProgress, time }) => {
  const { target, cho, jung, jong, hasBatchim, vowelLayout } = decomposeLastHangul(
    episode.promptBefore
  );
  const correct = episode.breakdown.correctParticle;
  const pulse = 1 + Math.abs(Math.sin(time * 9)) * 0.08;
  const entrance = Math.min(1, subProgress / 0.18);

  return (
    <g>
      {/* Crisp Dark X-Ray Lab Backdrop for maximum mobile contrast */}
      <rect x="0" y="-65" width="1000" height="630" fill="#0F172A" />
      <g stroke="#1E293B" strokeWidth="2" opacity="0.65">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 90} y1="-65" x2={i * 90} y2="540" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={-40 + i * 80} x2="1000" y2={-40 + i * 80} />
        ))}
      </g>

      {/* Top Cut Banner: "🔍 CHECK BATCHIM! 맨(ㄴ) + 은" */}
      <g transform="translate(500, 14)">
        <rect
          x="-440"
          y="-46"
          width="880"
          height="92"
          rx="22"
          fill="#1E293B"
          stroke="#38BDF8"
          strokeWidth="4.5"
        />
        <text x="0" y="-6" textAnchor="middle" fontSize="37" fontWeight="900" fill="#FDE047">
          🔍 CHECK BATCHIM! {target}({hasBatchim ? jong : '❌'}) + {correct}
        </text>
        <text x="0" y="30" textAnchor="middle" fontSize="22" fontWeight="800" fill="#BAE6FD">
          {hasBatchim
            ? 'Has Batchim (Final Consonant) · 받침 있음'
            : 'No Batchim (Vowel Ending) · 받침 없음'}
        </text>
      </g>

      {/* LEFT-CENTER: GIANT X-RAY MAGNIFYING GLASS */}
      <g transform={`translate(285, 290) scale(${0.86 + entrance * 0.14})`}>
        {/* Thick Magnifier Handle */}
        <line
          x1="-102"
          y1="102"
          x2="-195"
          y2="195"
          stroke="#38BDF8"
          strokeWidth="34"
          strokeLinecap="round"
        />
        <line
          x1="-102"
          y1="102"
          x2="-195"
          y2="195"
          stroke="#0284C7"
          strokeWidth="18"
          strokeLinecap="round"
        />

        {/* Giant Lens Outer Rim & Bright White X-Ray Field */}
        <circle cx="0" cy="0" r="160" fill="#38BDF8" stroke="#FFFFFF" strokeWidth="6" />
        <circle cx="0" cy="0" r="144" fill="#FFFFFF" stroke="#0F172A" strokeWidth="5" />

        {/* Faded Choseong + Jungseong (초성·중성 흐리게) */}
        <g opacity="0.32" fill="#475569">
          {vowelLayout === 'horizontal' ? (
            <>
              <text x="0" y="-64" textAnchor="middle" fontSize="68" fontWeight="900">
                {cho}
              </text>
              <text x="0" y="-12" textAnchor="middle" fontSize="68" fontWeight="900">
                {jung}
              </text>
            </>
          ) : vowelLayout === 'combo' ? (
            <>
              <text x="-38" y="-44" textAnchor="middle" fontSize="76" fontWeight="900">
                {cho}
              </text>
              <text x="34" y="-26" textAnchor="middle" fontSize="76" fontWeight="900">
                {jung}
              </text>
            </>
          ) : (
            <>
              <text x="-46" y="-26" textAnchor="middle" fontSize="92" fontWeight="900">
                {cho}
              </text>
              <text x="42" y="-26" textAnchor="middle" fontSize="92" fontWeight="900">
                {jung}
              </text>
            </>
          )}
        </g>

        {/* Highlighted Red Batchim Box (or Empty No-Batchim Box) */}
        <g transform={`translate(0, 62) scale(${pulse})`}>
          {hasBatchim ? (
            <>
              <rect
                x="-76"
                y="-44"
                width="152"
                height="94"
                rx="20"
                fill="#FEE2E2"
                stroke="#DC2626"
                strokeWidth="7"
              />
              <text x="0" y="25" textAnchor="middle" fontSize="76" fontWeight="900" fill="#DC2626">
                {jong}
              </text>
              <rect x="-46" y="-60" width="92" height="24" rx="8" fill="#DC2626" />
              <text x="0" y="-43" textAnchor="middle" fontSize="15" fontWeight="900" fill="#FFFFFF">
                받침 ON!
              </text>
            </>
          ) : (
            <>
              <rect
                x="-82"
                y="-38"
                width="164"
                height="78"
                rx="18"
                fill="#FFF1F2"
                stroke="#E11D48"
                strokeWidth="5.5"
                strokeDasharray="10 6"
              />
              <text x="0" y="14" textAnchor="middle" fontSize="34" fontWeight="900" fill="#E11D48">
                ❌ 없음
              </text>
            </>
          )}
        </g>
      </g>

      {/* RIGHT-CENTER: GIANT FORMULA CARD '[받침 ㄴ] + [은] = ⭕' */}
      <g transform="translate(715, 290)">
        <rect
          x="-235"
          y="-148"
          width="470"
          height="296"
          rx="28"
          fill="#FFFFFF"
          stroke="#38BDF8"
          strokeWidth="6"
        />

        {/* Formula Tiles */}
        <g transform="translate(0, -48)">
          <rect
            x="-212"
            y="-44"
            width="164"
            height="88"
            rx="18"
            fill={hasBatchim ? '#FEE2E2' : '#FFF1F2'}
            stroke="#DC2626"
            strokeWidth="4.5"
          />
          <text
            x="-130"
            y="12"
            textAnchor="middle"
            fontSize="32"
            fontWeight="900"
            fill="#DC2626"
          >
            {hasBatchim ? `받침 ${jong}` : '받침 ❌'}
          </text>

          <text x="-24" y="14" textAnchor="middle" fontSize="42" fontWeight="900" fill="#64748B">
            +
          </text>

          <rect
            x="2"
            y="-44"
            width="98"
            height="88"
            rx="18"
            fill="#DBEAFE"
            stroke="#2563EB"
            strokeWidth="4.5"
          />
          <text x="51" y="17" textAnchor="middle" fontSize="48" fontWeight="900" fill="#1D4ED8">
            {correct}
          </text>

          <text x="126" y="14" textAnchor="middle" fontSize="40" fontWeight="900" fill="#64748B">
            =
          </text>
          <text x="180" y="18" textAnchor="middle" fontSize="50" fontWeight="900" fill="#059669">
            ⭕
          </text>
        </g>

        <line x1="-195" y1="22" x2="195" y2="22" stroke="#E2E8F0" strokeWidth="3" />

        {/* Clear Bilingual Explanation */}
        <text x="0" y="64" textAnchor="middle" fontSize="24" fontWeight="900" fill="#0F172A">
          {hasBatchim
            ? `Ends with consonant ➔ Use '${correct}'!`
            : `No Batchim (Vowel) ➔ Use '${correct}'!`}
        </text>
        <text x="0" y="108" textAnchor="middle" fontSize="29" fontWeight="900" fill="#2563EB">
          {hasBatchim ? `받침이 있으면 '${correct}'!` : `받침이 없으면 '${correct}'!`}
        </text>
      </g>
    </g>
  );
};

/**
 * 4컷: 정답 선택 시 - 환호 (후광 + 폭죽 + 정답 카드 높이 든 졸라맨 + 완성 문장)
 */
export const TheaterCut4VictorySvg: React.FC<{
  episode: ParticleEpisode;
  progress: number;
  time: number;
}> = ({ episode, progress, time }) => {
  const correct = episode.breakdown.correctParticle;
  const bounce = Math.abs(Math.sin(time * 8)) * 16;
  const rotRays = (time * 36) % 360;

  return (
    <g>
      {/* Celebratory Bright Sky & Lawn */}
      <rect x="0" y="-65" width="1000" height="630" fill="#ECFDF5" />
      <rect x="0" y="440" width="1000" height="105" fill="#A7F3D0" />
      <line x1="0" y1="440" x2="1000" y2="440" stroke="#0F172A" strokeWidth="4" />

      {/* Golden Halo / Sunburst Rays behind Jollaman */}
      <g transform={`translate(500, 340) rotate(${rotRays})`} opacity="0.45">
        {Array.from({ length: 14 }).map((_, i) => (
          <polygon
            key={i}
            points="0,0 -22,-360 22,-360"
            fill={i % 2 === 0 ? '#FDE047' : '#34D399'}
            transform={`rotate(${(i * 360) / 14})`}
          />
        ))}
      </g>

      {/* Festive Fireworks in Left & Right Sky */}
      {[
        { x: 165, y: 170, color: '#EC4899', offset: 0 },
        { x: 835, y: 175, color: '#2563EB', offset: 1.2 },
        { x: 255, y: 315, color: '#F59E0B', offset: 2.1 },
        { x: 745, y: 310, color: '#10B981', offset: 0.7 },
      ].map((fw, idx) => {
        const r = 18 + ((time * 52 + fw.offset * 28) % 58);
        return (
          <g key={idx} transform={`translate(${fw.x}, ${fw.y})`} opacity={Math.max(0.15, 1 - r / 78)}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
              const rad = (ang * Math.PI) / 180;
              return (
                <circle
                  key={ang}
                  cx={Math.cos(rad) * r}
                  cy={Math.sin(rad) * r}
                  r="6"
                  fill={fw.color}
                />
              );
            })}
          </g>
        );
      })}

      {/* KO'd Monster Tumbled Aside */}
      <g transform={`translate(870, 388) rotate(${24 + Math.min(1, progress * 2) * 10}) scale(0.66)`} opacity="0.72">
        <ParticleMonsterSvg mode="ko" time={time} />
      </g>

      {/* Happy Jollaman holding Correct Particle Card High Overhead */}
      <g transform={`translate(500, ${380 - bounce}) scale(1.65)`}>
        <JollamanCharacterSvg
          faceMode="happy"
          isWalking={false}
          legSwing={0}
          armSwing={0}
          walkTime={time}
          activeChar={correct}
        />

        {/* Giant Raised Victory Particle Card */}
        <g transform="translate(0, -80)">
          <rect
            x="-42"
            y="-34"
            width="84"
            height="68"
            rx="16"
            fill="#059669"
            stroke="#FACC15"
            strokeWidth="4"
          />
          <text
            x="0"
            y={correct.length >= 2 ? 10 : 14}
            textAnchor="middle"
            fontSize={correct.length >= 2 ? 30 : 40}
            fontWeight="900"
            fill="#FFFFFF"
          >
            {correct}
          </text>
        </g>
      </g>

      {/* Big Joyful Cut Bubble: "이거야!! (YES!!) / 졸라맨은 남자예요." */}
      <g transform="translate(500, 145)">
        <rect
          x="-290"
          y="-46"
          width="580"
          height="92"
          rx="24"
          fill="#0F172A"
          fillOpacity="0.16"
          transform="translate(4, 6)"
        />
        <rect
          x="-290"
          y="-46"
          width="580"
          height="92"
          rx="24"
          fill="#FFFFFF"
          stroke="#059669"
          strokeWidth="5"
        />
        <text x="0" y="-9" textAnchor="middle" fontSize="34" fontWeight="900" fill="#059669">
          이거야!! (YES!!)
        </text>
        <text x="0" y="29" textAnchor="middle" fontSize="30" fontWeight="900" fill="#0F172A">
          {episode.completedSentence}
        </text>
      </g>
    </g>
  );
};

/**
 * 5컷: 핵심 규칙 요약 카드 (좌: Batchim ⭕ 은/이/을/과 vs 우: No Batchim ❌ 는/가/를/와)
 */
export const TheaterCut5RuleSummarySvg: React.FC<{
  episode: ParticleEpisode;
  time: number;
}> = ({ episode, time }) => {
  const bob = Math.sin(time * 5) * 4;
  const activePairMap: Record<ParticleEpisode['id'], { batchim: string; noBatchim: string; exLeft: string; exRight: string }> = {
    'eun-neun': {
      batchim: '은',
      noBatchim: '는',
      exLeft: '졸라맨 + 은',
      exRight: '나 + 는',
    },
    'i-ga': {
      batchim: '이',
      noBatchim: '가',
      exLeft: '괴물 + 이',
      exRight: '나 + 가',
    },
    'eul-reul': {
      batchim: '을',
      noBatchim: '를',
      exLeft: '괴물 + 을',
      exRight: '나 + 를',
    },
    'wa-gwa': {
      batchim: '과',
      noBatchim: '와',
      exLeft: '밥 + 과',
      exRight: '여자친구 + 와',
    },
  };

  const activeInfo = activePairMap[episode.id];
  const leftParticles = ['은', '이', '을', '과'];
  const rightParticles = ['는', '가', '를', '와'];

  return (
    <g>
      <rect x="0" y="-65" width="1000" height="630" fill="#F8FAFC" />
      <rect x="0" y="456" width="1000" height="90" fill="#E2E8F0" />
      <line x1="0" y1="456" x2="1000" y2="456" stroke="#0F172A" strokeWidth="4" />

      {/* Header Ribbon */}
      <g transform="translate(500, -14)">
        <rect x="-280" y="-26" width="560" height="52" rx="16" fill="#0F172A" />
        <text x="0" y="9" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FDE047">
          핵심 규칙 요약 · Rule Summary
        </text>
      </g>

      {/* Split Left / Right Comparison Board */}
      <g transform={`translate(0, ${bob * 0.4})`}>
        {/* LEFT COLUMN (BLUE: Batchim ⭕) */}
        <rect
          x="36"
          y="28"
          width="448"
          height="332"
          rx="26"
          fill="#EFF6FF"
          stroke="#2563EB"
          strokeWidth="6"
        />
        <rect x="36" y="28" width="448" height="84" rx="22" fill="#2563EB" />
        <text x="260" y="66" textAnchor="middle" fontSize="36" fontWeight="900" fill="#FFFFFF">
          Batchim ⭕
        </text>
        <text x="260" y="98" textAnchor="middle" fontSize="18" fontWeight="800" fill="#DBEAFE">
          Has Batchim (Final Consonant)
        </text>

        {/* Left 4 Particles */}
        {leftParticles.map((p, idx) => {
          const isCurrent = p === activeInfo.batchim;
          const px = 104 + idx * 104;
          return (
            <g key={p} transform={`translate(${px}, 202)`}>
              <rect
                x="-44"
                y="-52"
                width="88"
                height="104"
                rx="18"
                fill={isCurrent ? '#FACC15' : '#FFFFFF'}
                stroke={isCurrent ? '#1D4ED8' : '#93C5FD'}
                strokeWidth={isCurrent ? 6 : 3.5}
              />
              <text
                x="0"
                y="22"
                textAnchor="middle"
                fontSize={isCurrent ? 64 : 46}
                fontWeight="900"
                fill="#1E3A8A"
              >
                {p}
              </text>
            </g>
          );
        })}

        <rect x="86" y="284" width="348" height="54" rx="14" fill="#DBEAFE" stroke="#2563EB" strokeWidth="3" />
        <text x="260" y="320" textAnchor="middle" fontSize="28" fontWeight="900" fill="#1E3A8A">
          예: {activeInfo.exLeft}
        </text>

        {/* RIGHT COLUMN (PINK: No Batchim ❌) */}
        <rect
          x="516"
          y="28"
          width="448"
          height="332"
          rx="26"
          fill="#FFF1F2"
          stroke="#E11D48"
          strokeWidth="6"
        />
        <rect x="516" y="28" width="448" height="84" rx="22" fill="#E11D48" />
        <text x="740" y="66" textAnchor="middle" fontSize="36" fontWeight="900" fill="#FFFFFF">
          No Batchim ❌
        </text>
        <text x="740" y="98" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FFE4E6">
          No Batchim (Vowel Ending)
        </text>

        {/* Right 4 Particles */}
        {rightParticles.map((p, idx) => {
          const isCurrent = p === activeInfo.noBatchim;
          const px = 584 + idx * 104;
          return (
            <g key={p} transform={`translate(${px}, 202)`}>
              <rect
                x="-44"
                y="-52"
                width="88"
                height="104"
                rx="18"
                fill={isCurrent ? '#FACC15' : '#FFFFFF'}
                stroke={isCurrent ? '#BE123C' : '#FDA4AF'}
                strokeWidth={isCurrent ? 6 : 3.5}
              />
              <text
                x="0"
                y="22"
                textAnchor="middle"
                fontSize={isCurrent ? 64 : 46}
                fontWeight="900"
                fill="#881337"
              >
                {p}
              </text>
            </g>
          );
        })}

        <rect x="566" y="284" width="348" height="54" rx="14" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" />
        <text x="740" y="320" textAnchor="middle" fontSize="28" fontWeight="900" fill="#881337">
          예: {activeInfo.exRight}
        </text>
      </g>

      {/* Cheerful Jollaman holding up the Split Board */}
      <g transform={`translate(500, ${418 + bob * 0.25}) scale(1.25)`}>
        <JollamanCharacterSvg
          faceMode="happy"
          isWalking={false}
          legSwing={0}
          armSwing={0}
          walkTime={time}
          activeChar={episode.breakdown.correctParticle}
        />
      </g>
    </g>
  );
};
