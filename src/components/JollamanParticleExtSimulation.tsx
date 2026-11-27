import React from 'react';
import {
  playCarHorn,
  playCarWhoosh,
  playCartoonImpact,
  playCartoonSplat,
  playDuckQuack,
  playParticleV2Sfx,
  playScenarioSfx,
  playTrainHorn,
  speakKorean,
} from '../utils/audio';
import { tWordMeaning } from '../utils/i18nSlot';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';
import {
  ComicImpactBurstSvg,
  DizzyStarOrbitSvg,
  JollamanCharacterSvg,
  JollamanFaceMode,
  SparkleBurstSvg,
} from './JollamanSprites';
import { BuddyJollamanSvg } from './JollamanSprites3';
import { FloatingHeartsSvg } from './JollamanSprites4';
import {
  DecisionTheatrePrompt,
  JollamanDecisionResolveSvg,
  ParticleQuizPromptSvg,
  ParticleRuleLessonConfig,
  ParticleRuleXraySvg,
  SplitDecisionSceneSvg,
} from './JollamanSprites13';
import {
  GreenCityBusSvg,
  ParkGooseChaserSvg,
  Series13Backdrop,
  Series13BackdropTheme,
  SpringGiftBoxSvg,
} from './JollamanSprites14';
import {
  ParticleTheaterEpisodeBase,
  useParticleTheaterEngine,
} from '../hooks/useParticleTheaterEngine';
import { ParticleTheaterShell } from './ParticleTheaterShell';

export type ParticleExtKey =
  | '에 (도착)'
  | '에서'
  | '에게·한테'
  | '로 (모음)'
  | '으로'
  | 'ㄹ + 로'
  | '부터~까지'
  | '도 · 만';

export interface ParticleExtItem extends DecisionTheatrePrompt, ParticleTheaterEpisodeBase {
  key: ParticleExtKey;
  skyLabel: string;
  revealGlyph: string;
  ruleBadge: string;
  resultDisplay: string;
  pronunciation: string;
  ttsReveal: string;
  color: string;
  backdrop: Series13BackdropTheme;
  lesson: ParticleRuleLessonConfig;
  englishMeaning: string;
}

const ComicPopTag: React.FC<{
  x: number;
  y: number;
  text: string;
  color?: string;
  rotate?: number;
}> = ({ x, y, text, color = '#DC2626', rotate = -6 }) => (
  <g transform={`translate(${x}, ${y}) rotate(${rotate})`}>
    <rect
      x={-(text.length * 8.5 + 16)}
      y="-16"
      width={text.length * 17 + 32}
      height="32"
      rx="10"
      fill="#FEF08A"
      stroke="#0F172A"
      strokeWidth="2.8"
    />
    <text x="0" y="1" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="900" fill={color}>
      {text}
    </text>
  </g>
);

export const PARTICLE_EXT_ITEMS: ParticleExtItem[] = [
  {
    id: '에 (도착)',
    key: '에 (도착)',
    epNum: 1,
    title: '에 / 에서 (To Home)',
    tabLabel: '에',
    badgeLabel: 'To · 에',
    skyLabel: '에',
    revealGlyph: '집에',
    ruleBadge: '📍 To Place · 에',
    resultDisplay: '집에 가요',
    pronunciation: '집에 가요',
    ttsReveal: '집에. 집에 가요!',
    promptBefore: '집',
    promptAfter: '가요.',
    leftOption: '에',
    rightOption: '에서',
    correctSide: 'left',
    completedSentence: '집에 가요.',
    wrongSentenceTag: '집에서 가요?!',
    wrongHookTag: 'Wrong! From?',
    wrongHeadline: '집에서?! ✕',
    wrongCaption: '에서 = From / Action! (Need To)',
    rightHookTag: 'To Home! 집에!',
    color: '#0EA5E9',
    backdrop: 'suburb',
    englishMeaning: 'Go home (To)',
    englishCue: 'Go home (To)',
    lesson: {
      ruleBadge: '📍 To Place',
      wrongSentence: '집에서 가요',
      wrongParticle: '에서',
      wrongReason: '에서 = From / Action! (Need To)',
      wrongKoreanCue: '에서는 출발·동작 장소예요!',
      wrongReasonTts: '집에서? 에서는 출발 장소예요!',
      prefixWord: '집',
      correctParticle: '에',
      suffixWord: '가요.',
      completedSentence: '집에 가요.',
      englishMeaning: 'Go home (Destination)',
      accentColor: '#0EA5E9',
    },
  },
  {
    id: '에서',
    key: '에서',
    epNum: 2,
    title: '에 / 에서 (At Park)',
    tabLabel: '에서',
    badgeLabel: 'At · 에서',
    skyLabel: '에서',
    revealGlyph: '에서',
    ruleBadge: '🏃 Action Place · 에서',
    resultDisplay: '공원에서 뛰어요',
    pronunciation: '공원에서 뛰어요',
    ttsReveal: '공원에서. 공원에서 뛰어요!',
    promptBefore: '공원',
    promptAfter: '뛰어요.',
    leftOption: '에',
    rightOption: '에서',
    correctSide: 'right',
    completedSentence: '공원에서 뛰어요.',
    wrongSentenceTag: '공원에 뛰어요?!',
    wrongHookTag: 'Wrong! Goose Attack!',
    wrongHeadline: '공원에?! ✕',
    wrongCaption: '에 = Destination only! (Need Action)',
    rightHookTag: 'At Park! 공원에서!',
    color: '#F97316',
    backdrop: 'park',
    englishMeaning: 'Run at the park',
    englishCue: 'Run at the park',
    lesson: {
      ruleBadge: '🏃 Action Place',
      wrongSentence: '공원에 뛰어요',
      wrongParticle: '에',
      wrongReason: '에 = Destination only! (Need Action)',
      wrongKoreanCue: '뛰는 동작 장소가 아니에요!',
      wrongReasonTts: '공원에? 뛰는 동작 장소예요!',
      prefixWord: '공원',
      correctParticle: '에서',
      suffixWord: '뛰어요.',
      completedSentence: '공원에서 뛰어요.',
      englishMeaning: 'Run at the park',
      accentColor: '#F97316',
    },
  },
  {
    id: '에게·한테',
    key: '에게·한테',
    epNum: 3,
    title: '한테 / 에 (To Friend)',
    tabLabel: '한테',
    badgeLabel: 'Person · 한테',
    skyLabel: '한테',
    revealGlyph: '한테',
    ruleBadge: '👤 To Person · 한테',
    resultDisplay: '친구한테 줘요',
    pronunciation: '친구한테 줘요',
    ttsReveal: '친구한테. 친구한테 줘요!',
    promptBefore: '친구',
    promptAfter: '줘요.',
    leftOption: '한테',
    rightOption: '에',
    correctSide: 'left',
    completedSentence: '친구한테 줘요.',
    wrongSentenceTag: '친구에 줘요?!',
    wrongHookTag: 'Wrong! Not a thing!',
    wrongHeadline: '친구에?! ✕',
    wrongCaption: '에 = Things only! (Friend = Person)',
    rightHookTag: 'To Friend! 친구한테!',
    color: '#EC4899',
    backdrop: 'suburb',
    englishMeaning: 'Give to a friend',
    englishCue: 'Give to a friend',
    lesson: {
      ruleBadge: '👤 To Person',
      wrongSentence: '친구에 줘요',
      wrongParticle: '에',
      wrongReason: '에 = Things only! (Friend = Person)',
      wrongKoreanCue: '친구는 사물이 아니라 사람이에요!',
      wrongReasonTts: '친구에? 친구는 사람이에요!',
      prefixWord: '친구',
      correctParticle: '한테',
      suffixWord: '줘요.',
      completedSentence: '친구한테 줘요.',
      englishMeaning: 'Give to a friend',
      accentColor: '#EC4899',
    },
  },
  {
    id: '로 (모음)',
    key: '로 (모음)',
    epNum: 4,
    title: '로 / 으로 (By Bus)',
    tabLabel: '로',
    badgeLabel: 'Vowel + 로',
    skyLabel: '로',
    revealGlyph: '로',
    ruleBadge: '🔤 Vowel + 로',
    resultDisplay: '버스로 가요',
    pronunciation: '버스로 가요',
    ttsReveal: '버스로. 버스로 가요!',
    promptBefore: '버스',
    promptAfter: '가요.',
    leftOption: '으로',
    rightOption: '로',
    correctSide: 'right',
    completedSentence: '버스로 가요.',
    wrongSentenceTag: '버스으로 가요?!',
    wrongHookTag: 'Wrong! Too bumpy!',
    wrongHeadline: '버스으로?! ✕',
    wrongCaption: 'No Batchim (스) · Skip 으',
    rightHookTag: 'By Bus! 버스로!',
    color: '#16A34A',
    backdrop: 'city_bus',
    englishMeaning: 'Go by bus',
    englishCue: 'Go by bus',
    lesson: {
      ruleBadge: '🔤 Vowel Ending',
      wrongSentence: '버스으로 가요',
      wrongParticle: '으로',
      wrongReason: 'No Batchim (스) · Skip 으',
      wrongKoreanCue: '모음 뒤엔 받침이 없어요!',
      wrongReasonTts: '버스으로? 스에 받침 없어요!',
      prefixWord: '버스',
      correctParticle: '로',
      suffixWord: '가요.',
      completedSentence: '버스로 가요.',
      englishMeaning: 'Go by bus',
      accentColor: '#16A34A',
    },
  },
  {
    id: '으로',
    key: '으로',
    epNum: 5,
    title: '로 / 으로 (Toward Home)',
    tabLabel: '으로',
    badgeLabel: 'Batchim + 으로',
    skyLabel: '으로',
    revealGlyph: '으로',
    ruleBadge: '🧱 Batchim + 으로',
    resultDisplay: '집으로 가요',
    pronunciation: '집으로 가요',
    ttsReveal: '집으로. 집으로 가요!',
    promptBefore: '집',
    promptAfter: '가요.',
    leftOption: '로',
    rightOption: '으로',
    correctSide: 'right',
    completedSentence: '집으로 가요.',
    wrongSentenceTag: '집로 가요?!',
    wrongHookTag: 'Wrong! Needs 으!',
    wrongHeadline: '집로?! ✕',
    wrongCaption: 'Has Batchim (Final Consonant: ㅂ) · Needs 으',
    rightHookTag: 'Toward Home! 집으로!',
    color: '#0284C7',
    backdrop: 'suburb',
    englishMeaning: 'Head toward home',
    englishCue: 'Head toward home',
    lesson: {
      ruleBadge: '🧱 Batchim Rule',
      wrongSentence: '집로 가요',
      wrongParticle: '로',
      wrongReason: 'Has Batchim (Final Consonant: ㅂ) · Needs 으',
      wrongKoreanCue: '집에는 받침 ㅂ이 있어요!',
      wrongReasonTts: '집로? 집에 받침 있어요!',
      prefixWord: '집',
      correctParticle: '으로',
      suffixWord: '가요.',
      completedSentence: '집으로 가요.',
      englishMeaning: 'Head toward home',
      accentColor: '#0284C7',
    },
  },
  {
    id: 'ㄹ + 로',
    key: 'ㄹ + 로',
    epNum: 6,
    title: '로 / 으로 (ㄹ Rule)',
    tabLabel: 'ㄹ+로',
    badgeLabel: '⚠️ ㄹ + 로',
    skyLabel: 'ㄹ+로',
    revealGlyph: 'ㄹ + 로',
    ruleBadge: '⚠️ ㄹ Batchim + 로',
    resultDisplay: '서울로 가요',
    pronunciation: '서울로 가요',
    ttsReveal: '서울로. 서울으로 아니고 서울로!',
    promptBefore: '서울',
    promptAfter: '가요.',
    leftOption: '으로',
    rightOption: '로',
    correctSide: 'right',
    completedSentence: '서울로 가요.',
    wrongSentenceTag: '서울으로 가요?!',
    wrongHookTag: 'ㄹ Batchim Trap!',
    wrongHeadline: '서울으로?! ✕',
    wrongCaption: 'ㄹ Batchim Exception! Drop 으',
    rightHookTag: 'KTX 서울로! (ㄹ + 로)',
    color: '#DC2626',
    backdrop: 'ktx_station',
    englishMeaning: 'Go to Seoul (ㄹ rule)',
    englishCue: 'Go to Seoul (ㄹ rule)',
    lesson: {
      ruleBadge: '⚠️ ㄹ Batchim Trap',
      wrongSentence: '서울으로 가요',
      wrongParticle: '으로',
      wrongReason: 'ㄹ Batchim Exception! Drop 으',
      wrongKoreanCue: 'ㄹ 받침 함정! 으를 빼야 해요!',
      wrongReasonTts: '서울으로? ㄹ 받침 함정이에요!',
      prefixWord: '서울',
      correctParticle: '로',
      suffixWord: '가요.',
      completedSentence: '서울로 가요.',
      englishMeaning: 'Go to Seoul (ㄹ rule)',
      accentColor: '#DC2626',
    },
  },
  {
    id: '부터~까지',
    key: '부터~까지',
    epNum: 7,
    title: '부터 / 까지 (From~Until)',
    tabLabel: '까지',
    badgeLabel: 'Start 부터 ~ End 까지',
    skyLabel: '까지',
    revealGlyph: '부터~까지',
    ruleBadge: '⏱️ Start 부터 ~ End 까지',
    resultDisplay: '오늘부터 내일까지',
    pronunciation: '오늘부터 내일까지',
    ttsReveal: '오늘부터 내일까지!',
    promptBefore: '오늘',
    promptAfter: '내일까지',
    leftOption: '부터',
    rightOption: '까지',
    correctSide: 'left',
    completedSentence: '오늘부터 내일까지!',
    wrongSentenceTag: '오늘까지 내일까지?!',
    wrongHookTag: 'Wrong! Missing Start!',
    wrongHeadline: '오늘까지?! ✕',
    wrongCaption: 'Missing Start! (까지 = End only)',
    rightHookTag: '부터 → 까지! Goal!',
    color: '#7C3AED',
    backdrop: 'park',
    englishMeaning: 'From today until tomorrow',
    englishCue: 'From today until tomorrow',
    lesson: {
      ruleBadge: '⏱️ Start vs End',
      wrongSentence: '오늘까지 내일까지',
      wrongParticle: '까지',
      wrongReason: 'Missing Start! (까지 = End only)',
      wrongKoreanCue: '까지는 끝! 시작점이 빠졌어요!',
      wrongReasonTts: '오늘까지? 시작점이 아니에요!',
      prefixWord: '오늘',
      correctParticle: '부터',
      suffixWord: '내일까지',
      completedSentence: '오늘부터 내일까지!',
      englishMeaning: 'From today until tomorrow',
      accentColor: '#7C3AED',
    },
  },
  {
    id: '도 · 만',
    key: '도 · 만',
    epNum: 8,
    title: '도 / 만 (Also · Only)',
    tabLabel: '도·만',
    badgeLabel: '도(Also) · 만(Only)',
    skyLabel: '도·만',
    revealGlyph: '도 · 만',
    ruleBadge: '➕ Also 도 · 🎯 Only 만',
    resultDisplay: '나도! · 우리만!',
    pronunciation: '나도! 우리만!',
    ttsReveal: '나도! 너도! 우리만!',
    promptBefore: '오직 우리',
    promptAfter: 'VIP!',
    leftOption: '도',
    rightOption: '만',
    correctSide: 'right',
    completedSentence: '오직 우리만 VIP!',
    wrongSentenceTag: '오직 우리도 VIP?!',
    wrongHookTag: 'Wrong! Too crowded!',
    wrongHeadline: '우리도?! ✕',
    wrongCaption: '도 = Also / Everyone! (Not Only)',
    rightHookTag: '우리만! (ONLY VIP)',
    color: '#DB2777',
    backdrop: 'spotlight',
    englishMeaning: 'Me too! · Only us!',
    englishCue: 'Only us VIP! (Only)',
    lesson: {
      ruleBadge: '🎯 Only VIP',
      wrongSentence: '오직 우리도 VIP',
      wrongParticle: '도',
      wrongReason: '도 = Also / Everyone! (Not Only)',
      wrongKoreanCue: '도는 여럿 추가! 혼자가 아니에요!',
      wrongReasonTts: '오직 우리도? 혼자가 아니에요!',
      prefixWord: '오직 우리',
      correctParticle: '만',
      suffixWord: 'VIP!',
      completedSentence: '오직 우리만 VIP!',
      englishMeaning: 'Only us VIP! (만 = only)',
      accentColor: '#DB2777',
    },
  },
];

const GROUND_Y = 368;

interface JollamanParticleExtSimulationProps {
  audioEnabled?: boolean;
}

export const JollamanParticleExtSimulation: React.FC<JollamanParticleExtSimulationProps> = ({
  audioEnabled = true,
}) => {
  const {
    episode,
    episodeIdx,
    beat,
    beatProgress,
    walkTime,
    hoverSide,
    setHoverSide,
    selectedSide,
    chosenSideRef,
    clearedEpisodes,
    bgmEnabled,
    setBgmEnabled,
    cutNumber,
    totalCuts,
    handleSelectEpisode,
    handleSelectSide,
    handleCloseReveal,
    handlePrevCut,
    handleNextCut,
    handleStartAutoplay,
    handleStopAutoplay,
    getCameraViewBox,
  } = useParticleTheaterEngine<ParticleExtItem>({
    seriesNum: 13,
    seriesTitle: '13. 졸라확장조사맨 (인생극장 8종)',
    episodes: PARTICLE_EXT_ITEMS,
    audioEnabled,
    bgmTrack: 'memeShorts',
    resolveDuration: 1.05,
    getWrongDuration: () => 2.75,
    lessonDuration: 2.35,
    getRightPrimaryDuration: () => 2.55,
    revealAutoplayDuration: 2.25,
    getTotalCatalogSec: () => 10.2,
    onBeatEnter: (nextBeat, ep) => {
      if (nextBeat === 'rightPrimary') {
        speakKorean(ep.ttsReveal, 1.0);
      }
    },
    onBeatTick: (curBeat, prog, ep, sfxFlags, audioOn) => {
      if (!audioOn) return;
      if (curBeat === 'wrongAction') {
        if (prog > 0.34 && !sfxFlags.wrongImpact) {
          sfxFlags.wrongImpact = true;
          if (ep.key === '에서') playDuckQuack();
          else if (ep.key === '로 (모음)') playCarHorn();
          else if (ep.key === 'ㄹ + 로') playCartoonImpact();
          else if (ep.key === '으로') playCarWhoosh();
          else playCartoonImpact();
        }
        if (prog > 0.65 && !sfxFlags.wrongSplat) {
          sfxFlags.wrongSplat = true;
          playCartoonSplat();
        }
      }

      if (curBeat === 'lesson') {
        if (prog > 0.18 && !sfxFlags.wrongReasonSpoken) {
          sfxFlags.wrongReasonSpoken = true;
          if (ep.lesson.wrongReasonTts) {
            speakKorean(ep.lesson.wrongReasonTts, 1.02);
          }
        }
      }

      if (curBeat === 'rightPrimary') {
        if (prog > 0.32 && !sfxFlags.rightCue) {
          sfxFlags.rightCue = true;
          if (ep.key === '로 (모음)') playCarHorn();
          else if (ep.key === 'ㄹ + 로') playTrainHorn();
          else if (ep.key === '부터~까지' || ep.key === '으로') playCarWhoosh();
          else if (ep.key === '도 · 만') playScenarioSfx('ㅊ');
          else playParticleV2Sfx('fireworksDance');
        }
      }
    },
  });

  const activeKey = episode.key;
  const activeBackdrop: Series13BackdropTheme = episode.backdrop;

  const stageBgClass =
    beat === 'lesson' || beat === 'wrongAction'
      ? 'bg-rose-50'
      : activeBackdrop === 'spotlight'
      ? 'bg-indigo-950'
      : 'bg-sky-100';

  // Compute Jollaman kinematics for wrongAction / rightPrimary / reveal backdrop
  const t = beat === 'reveal' ? 1 : beatProgress;
  let jollaX = 300;
  let jollaY = GROUND_Y - 52;
  let jollaRot = 0;
  let jollaScaleX = 1;
  let jollaScaleY = 1;
  let jollaFaceMode: JollamanFaceMode = 'happy';
  let isWalkingMotion = false;
  let showHeadBump = false;
  let showDizzyStars = false;
  let hideMainJollaman = false;

  if (beat === 'wrongAction') {
    switch (activeKey) {
      case '에 (도착)': {
        // Confused: tries "집에서 가요" -> bounces right BACKWARD out of the house with red bump!
        if (t < 0.38) {
          const p = t / 0.38;
          jollaX = 480 + p * 120;
          jollaY = GROUND_Y - 52;
          isWalkingMotion = true;
          jollaFaceMode = 'panic';
        } else {
          const bounceP = Math.min((t - 0.38) / 0.52, 1);
          jollaX = 600 - bounceP * 280;
          jollaY = GROUND_Y - 52 - Math.sin(bounceP * Math.PI) * 90;
          jollaRot = -bounceP * 360;
          jollaFaceMode = bounceP > 0.7 ? 'dizzy' : 'panic';
          if (bounceP > 0.72) {
            showHeadBump = true;
            showDizzyStars = true;
          }
        }
        break;
      }
      case '에서': {
        // Goose chases & chomps -> 540° somersault crash!
        if (t < 0.44) {
          const p = t / 0.44;
          jollaX = 270 + p * 230;
          jollaY = GROUND_Y - 56 - Math.abs(Math.sin(p * Math.PI * 4)) * 18;
          isWalkingMotion = true;
          jollaFaceMode = p > 0.25 ? 'panic' : 'happy';
        } else {
          const spin = Math.min((t - 0.44) / 0.56, 1);
          jollaX = 500 + spin * 135;
          jollaY = GROUND_Y - 52 - Math.sin(spin * Math.PI) * 95;
          jollaRot = spin * 540;
          jollaFaceMode = spin > 0.75 ? 'dizzy' : 'panic';
          if (spin > 0.8) {
            showHeadBump = true;
            showDizzyStars = true;
          }
        }
        break;
      }
      case '에게·한테': {
        // Spring boxing glove BOINGS Jollaman flying!
        if (t < 0.42) {
          jollaX = 270 + (t / 0.42) * 215;
          jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 20)) * 8;
          isWalkingMotion = true;
        } else {
          const recoil = Math.min((t - 0.42) / 0.58, 1);
          jollaX = 485 - Math.sin(recoil * Math.PI * 0.7) * 165;
          jollaY = GROUND_Y - 52 - Math.sin(recoil * Math.PI) * 72;
          jollaRot = -recoil * 360;
          jollaFaceMode = recoil > 0.7 ? 'dizzy' : 'panic';
          if (recoil > 0.75) {
            showDizzyStars = true;
            showHeadBump = true;
          }
        }
        break;
      }
      case '로 (모음)': {
        // Trips over awkward "으" & gets glassSquish splatted onto bus windshield!
        if (t < 0.34) {
          const p = t / 0.34;
          jollaX = 270 + p * 210;
          jollaY = GROUND_Y - 52 - Math.sin(p * Math.PI) * 58;
          jollaRot = 14;
          jollaFaceMode = 'panic';
        } else {
          const busProg = (t - 0.34) / 0.66;
          const busX = 420 + busProg * 280;
          jollaX = busX + 94;
          jollaY = GROUND_Y - 82;
          jollaScaleX = 1.18;
          jollaScaleY = 0.86;
          jollaFaceMode = 'glassSquish';
        }
        break;
      }
      case '으로': {
        // Misfired magnet yanks Jollaman sideways into wall! CLANK!
        if (t < 0.28) {
          jollaX = 270 + Math.sin(t * 50) * 8;
          jollaFaceMode = 'panic';
        } else {
          const pull = Math.min((t - 0.28) / 0.52, 1);
          jollaX = 270 + pull * 340;
          jollaY = GROUND_Y - 88;
          jollaRot = 88;
          jollaFaceMode = pull >= 0.9 ? 'dizzy' : 'panic';
          if (pull >= 0.9) showDizzyStars = true;
        }
        break;
      }
      case 'ㄹ + 로': {
        // Crashes head-first into Giant '으❌' trap sign!
        if (t < 0.38) {
          const p = t / 0.38;
          jollaX = 240 + p * 195;
          jollaY = GROUND_Y - 52;
          isWalkingMotion = true;
          jollaFaceMode = 'panic';
        } else {
          const rebound = Math.min((t - 0.38) / 0.45, 1);
          jollaX = 435 - rebound * 155;
          jollaY = GROUND_Y - 52 - Math.sin(rebound * Math.PI) * 55;
          jollaRot = -rebound * 270;
          jollaFaceMode = 'dizzy';
          if (rebound > 0.6) {
            showHeadBump = true;
            showDizzyStars = true;
          }
        }
        break;
      }
      case '부터~까지': {
        // Tangled in backwards tape & rattled by alarm clock!
        jollaX = 480 + Math.sin(t * 58) * 18;
        jollaY = GROUND_Y - 52;
        jollaRot = Math.sin(t * 20) * 18;
        jollaFaceMode = 'dizzy';
        showDizzyStars = true;
        break;
      }
      case '도 · 만': {
        // Crowded clones bump Jollaman flat off the VIP spot!
        jollaX = 500 + Math.sin(t * 44) * 16;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * 16)) * 22;
        jollaRot = t > 0.55 ? (t - 0.55) * 180 : 0;
        jollaFaceMode = t > 0.55 ? 'dizzy' : 'panic';
        if (t > 0.65) showDizzyStars = true;
        break;
      }
    }
  } else if (beat === 'rightPrimary' || beat === 'reveal') {
    switch (activeKey) {
      case '에 (도착)': {
        // Happy sprint straight INTO cozy house doorway, kicking joyful red sneakers!
        if (t < 0.46) {
          const p = t / 0.46;
          jollaX = 270 + p * 355;
          jollaY = GROUND_Y - 56 - Math.abs(Math.sin(p * Math.PI * 3)) * 18;
          isWalkingMotion = true;
          jollaRot = 18;
          jollaFaceMode = 'happy';
        } else {
          hideMainJollaman = true;
        }
        break;
      }
      case '에서': {
        // Happy carefree jog across park while goose cheers peacefully!
        jollaX = 240 + Math.min(t, 0.9) * 320;
        jollaY = GROUND_Y - 54 - Math.abs(Math.sin(t * Math.PI * 4)) * 18;
        isWalkingMotion = true;
        jollaFaceMode = 'happy';
        break;
      }
      case '에게·한테': {
        // Delivers gift box warmly to Buddy -> hug!
        jollaX = 270 + Math.min(t / 0.55, 1) * 280;
        jollaY = GROUND_Y - 52;
        isWalkingMotion = t < 0.55;
        jollaFaceMode = 'happy';
        break;
      }
      case '로 (모음)': {
        // Rides comfortably inside/atop the green bus waving happily!
        const busProg = Math.min(t, 1);
        jollaX = 360 + busProg * 280;
        jollaY = GROUND_Y - 98;
        jollaFaceMode = 'happy';
        break;
      }
      case '으로': {
        // Smoothly glides right up to the front door of the cozy red-roofed house!
        const walkP = Math.min(t / 0.72, 1);
        jollaX = 270 + walkP * 440;
        jollaY = GROUND_Y - 54 - Math.abs(Math.sin(walkP * Math.PI * 3)) * 12;
        isWalkingMotion = walkP < 0.95;
        jollaFaceMode = 'happy';
        break;
      }
      case 'ㄹ + 로': {
        // Taekwondo-kicks fake '으❌' trap sign off-screen, surfs KTX!
        if (t < 0.36) {
          const p = t / 0.36;
          jollaX = 270 + p * 175;
          jollaY = GROUND_Y - 52 - Math.sin(p * Math.PI) * 76;
          jollaRot = -18;
          jollaFaceMode = 'happy';
        } else {
          const surf = (t - 0.36) / 0.64;
          jollaX = 505 + surf * 240;
          jollaY = GROUND_Y - 102;
          jollaRot = -8;
          jollaFaceMode = 'happy';
        }
        break;
      }
      case '부터~까지': {
        // Sprints heroically from 오늘부터 & snaps 내일까지 finish ribbon!
        const sprint = Math.min(t / 0.88, 1);
        jollaX = 270 + sprint * 490;
        jollaY = GROUND_Y - 54 - Math.abs(Math.sin(sprint * Math.PI * 4)) * 20;
        jollaRot = 14;
        isWalkingMotion = true;
        jollaFaceMode = 'happy';
        break;
      }
      case '도 · 만': {
        // Happy solo VIP jump inside velvet rope & golden spotlight!
        jollaX = 500;
        jollaY = GROUND_Y - 52 - Math.abs(Math.sin(t * Math.PI * 4)) * 34;
        jollaFaceMode = 'happy';
        break;
      }
    }
  }

  const legSwing = isWalkingMotion ? Math.sin(walkTime * 16) * 18 : 0;
  const armSwing = isWalkingMotion ? Math.sin(walkTime * 16 + Math.PI) * 16 : 0;

  const isActionOrReveal =
    beat === 'wrongAction' || beat === 'rightPrimary' || beat === 'reveal';

  const footerText =
    beat === 'decision'
      ? `EP.${episode.epNum} · ${episode.englishMeaning} — Pick [${episode.leftOption}] or [${episode.rightOption}]`
      : beat === 'wrongAction' || beat === 'lesson'
      ? `🚨 ${episode.wrongHeadline} (${episode.wrongCaption})`
      : `${episode.completedSentence} · ${episode.englishMeaning}`;

  return (
    <ParticleTheaterShell
      title="13. 졸라확장조사맨"
      ariaLabel={`졸라확장조사맨 ${episode.title} 인생극장 무대`}
      stageBgClass={stageBgClass}
      cameraViewBox={getCameraViewBox(500)}
      episodes={PARTICLE_EXT_ITEMS}
      episode={episode}
      episodeIdx={episodeIdx}
      clearedEpisodes={clearedEpisodes}
      beat={beat}
      audioEnabled={audioEnabled}
      bgmTrack="memeShorts"
      bgmEnabled={bgmEnabled}
      onToggleBgm={() => setBgmEnabled((prev) => !prev)}
      onSelectEpisode={handleSelectEpisode}
      onSelectSide={handleSelectSide}
      onStartAutoplay={handleStartAutoplay}
      onStopAutoplay={handleStopAutoplay}
      onCloseReveal={handleCloseReveal}
      footerText={footerText}
      cutStep={{
        current: cutNumber,
        total: totalCuts,
        onPrev: handlePrevCut,
        onNext: handleNextCut,
      }}
      flashcard={{
        glyph: episode.revealGlyph,
        subLabel: episode.ruleBadge,
        accentColor: episode.color,
        headlineNode: <span style={{ color: episode.color }}>{episode.resultDisplay}</span>,
        headlineCharLen: episode.resultDisplay.length,
        meaning: tWordMeaning(13, episode.key, episode.englishMeaning),
        romanization: romanizeKorean(episode.pronunciation),
        cornerIcon: getSeriesCornerIcon(13, episode.key, walkTime),
      }}
      defsSlot={
        <defs>
          <radialGradient id="leftBlueGlow" cx="35%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rightRoseGlow" cx="65%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FFE4E6" stopOpacity="0" />
          </radialGradient>
        </defs>
      }
    >
      {/* 1. SPLIT DECISION SCREEN */}
      {beat === 'decision' && (
        <SplitDecisionSceneSvg
          episode={episode}
          time={walkTime}
          hoverSide={hoverSide}
          selectedSide={selectedSide}
          onSelectSide={handleSelectSide}
          onHoverSide={setHoverSide}
        />
      )}

      {/* 2. DETERMINED FIGHTING GESTURE CUT */}
      {beat === 'resolve' && (
        <JollamanDecisionResolveSvg
          episode={episode}
          chosenSide={chosenSideRef.current}
          progress={beatProgress}
          time={walkTime}
        />
      )}

      {/* 3. MEANING / RULE X-RAY LESSON */}
      {beat === 'lesson' && (
        <ParticleRuleXraySvg lesson={episode.lesson} subProgress={beatProgress} time={walkTime} />
      )}

      {/* 4. WRONG / RIGHT / REVEAL BACKDROP + PROPS + JOLLAMAN */}
      {isActionOrReveal && (
        <g>
          <Series13Backdrop theme={activeBackdrop} walkTime={walkTime} />

          {/* EP.1 에 (도착) */}
          {activeKey === '에 (도착)' && (
            <g transform="translate(725, 290)">
              <rect x="28" y="-118" width="22" height="44" fill="#B91C1C" stroke="#0F172A" strokeWidth="3" />
              <circle cx="38" cy={-132 - ((walkTime * 22) % 18)} r="8" fill="#E2E8F0" opacity="0.85" />
              <rect x="-82" y="-44" width="164" height="122" fill="#FED7AA" stroke="#0F172A" strokeWidth="3.5" />
              <polygon points="-98,-42 0,-116 98,-42" fill="#EF4444" stroke="#0F172A" strokeWidth="3.8" />
              <rect x="24" y="-16" width="40" height="40" rx="5" fill="#FEF08A" stroke="#0F172A" strokeWidth="2.8" />
              <rect x="-56" y="4" width="56" height="74" rx="4" fill="#1E293B" stroke="#78350F" strokeWidth="4" />
              {hideMainJollaman && (
                <g transform={`translate(-64, 38) rotate(${Math.sin(walkTime * 36) * 14})`}>
                  <line x1="22" y1="-8" x2="-16" y2="-16" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
                  <ellipse cx="-20" cy="-16" rx="10" ry="5.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.5" />
                  <line x1="22" y1="6" x2="-18" y2="12" stroke="#0F172A" strokeWidth="5.5" strokeLinecap="round" />
                  <ellipse cx="-22" cy="12" rx="10" ry="5.5" fill="#EF4444" stroke="#0F172A" strokeWidth="2.5" />
                </g>
              )}
              <rect
                x="-64"
                y="-88"
                width="128"
                height="32"
                rx="8"
                fill={beat === 'wrongAction' ? '#E11D48' : '#0EA5E9'}
                stroke="#0F172A"
                strokeWidth="2.6"
              />
              <text x="0" y="-72" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="900" fill="#FFFFFF">
                {beat === 'wrongAction' ? '집에서?! ✕' : '집에! (Home)'}
              </text>
              {beat === 'wrongAction' && t >= 0.38 && (
                <ComicPopTag x={-135} y={-22} text="집에서?! NO!" color="#E11D48" />
              )}
              {beat !== 'wrongAction' && t >= 0.46 && (
                <ComicPopTag x={-115} y={-22} text="집에 ⭕ (To)" color="#0284C7" />
              )}
            </g>
          )}

          {/* EP.2 에서 */}
          {activeKey === '에서' && (
            <g>
              <g transform="translate(755, 336)">
                <rect x="-65" y="-20" width="130" height="16" rx="4" fill="#D97706" stroke="#0F172A" strokeWidth="3" />
                <rect x="-52" y="-4" width="12" height="36" fill="#78350F" />
                <rect x="40" y="-4" width="12" height="36" fill="#78350F" />
              </g>
              <g
                transform={`translate(${
                  beat === 'wrongAction' ? Math.max(jollaX + 62, 650 - t * 210) : 735
                }, 322)`}
              >
                <ParkGooseChaserSvg walkTime={walkTime} biting={beat === 'wrongAction' && t > 0.32} />
              </g>
              {beat === 'wrongAction' && t >= 0.44 && (
                <ComicPopTag x={530} y={195} text="공원에?! ✕" color="#E11D48" />
              )}
              {beat !== 'wrongAction' && (
                <ComicPopTag x={470} y={195} text="공원에서 ⭕ (At)" color="#EA580C" />
              )}
            </g>
          )}

          {/* EP.3 에게·한테 */}
          {activeKey === '에게·한테' && (
            <g transform="translate(650, 316)">
              <BuddyJollamanSvg
                walkTime={walkTime}
                hugging={beat !== 'wrongAction' && t >= 0.5}
                isWalking={false}
              />
              {beat === 'wrongAction' ? (
                <>
                  <g transform="translate(-88, 28)">
                    <SpringGiftBoxSvg
                      sprung={t >= 0.42}
                      progress={Math.max(0, (t - 0.42) * 2.5)}
                    />
                  </g>
                  {t >= 0.42 && (
                    <ComicPopTag x={-135} y={-88} text="친구에?! ✕" color="#E11D48" />
                  )}
                </>
              ) : (
                <>
                  <g transform="translate(-52, 28)">
                    <SpringGiftBoxSvg sprung={false} progress={0} />
                  </g>
                  {t >= 0.48 && (
                    <>
                      <g transform="translate(-25, -78)">
                        <FloatingHeartsSvg walkTime={walkTime} big={true} />
                      </g>
                      <ComicPopTag x={-95} y={-105} text="친구한테 💖 (To)" color="#DB2777" />
                    </>
                  )}
                </>
              )}
            </g>
          )}

          {/* EP.4 로 (모음) */}
          {activeKey === '로 (모음)' && (
            <g>
              <g
                transform={`translate(${
                  beat === 'wrongAction'
                    ? 420 + Math.max(0, t - 0.34) * 425
                    : 300 + t * 425
                }, 306)`}
              >
                <GreenCityBusSvg
                  walkTime={walkTime}
                  label={beat === 'wrongAction' ? '버스으로?! ✕' : '버스로 ⭕'}
                />
              </g>
              {beat === 'wrongAction' && t >= 0.34 && (
                <ComicPopTag x={480} y={185} text="NO 으 → 로!" color="#E11D48" />
              )}
            </g>
          )}

          {/* EP.5 으로 */}
          {activeKey === '으로' && (
            <g>
              <g transform="translate(808, 294)">
                <rect x="20" y="-102" width="18" height="36" fill="#B91C1C" stroke="#0F172A" strokeWidth="2.8" />
                <circle cx="28" cy={-114 - ((walkTime * 20) % 16)} r="6.5" fill="#E2E8F0" opacity="0.85" />
                <rect x="-62" y="-38" width="124" height="112" fill="#FED7AA" stroke="#0F172A" strokeWidth="3.5" />
                <polygon points="-74,-36 0,-96 74,-36" fill="#EF4444" stroke="#0F172A" strokeWidth="3.5" />
                <rect x="-22" y="16" width="38" height="58" rx="4" fill="#78350F" stroke="#0F172A" strokeWidth="3" />
                <rect x="-36" y="-76" width="72" height="28" rx="8" fill="#0284C7" stroke="#0F172A" strokeWidth="2.5" />
                <text x="0" y="-62" textAnchor="middle" dominantBaseline="central" fontSize="14" fontWeight="900" fill="#FFFFFF">
                  HOME
                </text>
              </g>
              <g transform="translate(658, 276)">
                <path
                  d="M-54 -44 H14 A56 56 0 0 1 14 44 H-54 V18 H12 A28 28 0 0 0 12 -18 H-54 Z"
                  fill={beat === 'wrongAction' ? '#E11D48' : '#2563EB'}
                  stroke="#0F172A"
                  strokeWidth="3.8"
                />
                <rect x="-54" y="-44" width="26" height="26" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
                <rect x="-54" y="18" width="26" height="26" fill="#CBD5E1" stroke="#0F172A" strokeWidth="3" />
                <rect
                  x="4"
                  y="-16"
                  width="84"
                  height="32"
                  rx="8"
                  fill={beat === 'wrongAction' ? '#E11D48' : '#0284C7'}
                  stroke="#0F172A"
                  strokeWidth="2.8"
                />
                <text x="46" y="0" textAnchor="middle" dominantBaseline="central" fontSize="15" fontWeight="900" fill="#FFFFFF">
                  {beat === 'wrongAction' ? '집로?!' : '집으로!'}
                </text>
                {beat === 'wrongAction' && t >= 0.28 && (
                  <ComicPopTag x={-155} y={-76} text="집로?! ✕ (Need 으)" color="#E11D48" />
                )}
                {beat !== 'wrongAction' && t >= 0.35 && (
                  <ComicPopTag x={-155} y={-76} text="집으로! ⭕" color="#0284C7" />
                )}
              </g>
            </g>
          )}

          {/* EP.6 ㄹ + 로 */}
          {activeKey === 'ㄹ + 로' && (
            <g>
              <g
                transform={
                  beat === 'wrongAction' || t < 0.36
                    ? 'translate(455, 315)'
                    : `translate(${455 - (t - 0.36) * 580}, ${315 - (t - 0.36) * 420}) rotate(${-(t - 0.36) * 720})`
                }
              >
                <rect x="-42" y="-34" width="84" height="68" rx="12" fill="#FEE2E2" stroke="#DC2626" strokeWidth="3.8" />
                <text x="0" y="-4" textAnchor="middle" fontSize="24" fontWeight="900" fill="#DC2626">
                  으❌
                </text>
                <text x="0" y="20" textAnchor="middle" fontSize="12" fontWeight="900" fill="#7F1D1D">
                  ㄹ TRAP!
                </text>
              </g>
              <g
                transform={`translate(${
                  505 + (beat !== 'wrongAction' && t >= 0.36 ? (t - 0.36) * 380 : 0)
                }, 322)`}
              >
                <path
                  d="M-135 32 H105 Q150 32 135 2 L82 -42 H-135 Z"
                  fill="#F8FAFC"
                  stroke="#0F172A"
                  strokeWidth="3.8"
                />
                <rect x="-128" y="-12" width="230" height="16" fill="#1D4ED8" />
                <polygon points="82,-38 118,-10 72,-10" fill="#0F172A" />
                <rect x="-95" y="-30" width="44" height="14" rx="4" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2" />
                <rect x="-35" y="-30" width="44" height="14" rx="4" fill="#BAE6FD" stroke="#0F172A" strokeWidth="2" />
                <text x="-45" y="20" textAnchor="middle" fontSize="14" fontWeight="900" fill="#DC2626">
                  KTX 서울로
                </text>
              </g>
              {beat === 'wrongAction' && t >= 0.38 && (
                <ComicPopTag x={445} y={196} text="서울으로?! ✕" color="#E11D48" />
              )}
              {beat !== 'wrongAction' && t >= 0.36 && (
                <ComicPopTag x={445} y={196} text="ㄹ + 로! ⭕" color="#DC2626" />
              )}
            </g>
          )}

          {/* EP.7 부터~까지 */}
          {activeKey === '부터~까지' && (
            <g>
              <g
                transform={`translate(215, 294) rotate(${t < 0.45 ? Math.sin(walkTime * 48) * 14 : 0})`}
              >
                <circle cx="-22" cy="-34" r="13" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
                <circle cx="22" cy="-34" r="13" fill="#FACC15" stroke="#0F172A" strokeWidth="3" />
                <circle cx="0" cy="0" r="34" fill="#7C3AED" stroke="#0F172A" strokeWidth="3.5" />
                <circle cx="0" cy="0" r="26" fill="#FFFFFF" stroke="#0F172A" strokeWidth="2.5" />
                <line x1="0" y1="0" x2="0" y2="-16" stroke="#0F172A" strokeWidth="3.2" strokeLinecap="round" />
                <line x1="0" y1="0" x2="14" y2="6" stroke="#DC2626" strokeWidth="3" strokeLinecap="round" />
                <text x="0" y="52" textAnchor="middle" fontSize="15" fontWeight="900" fill="#5B21B6">
                  {beat === 'wrongAction' ? '오늘까지?!' : '오늘부터!'}
                </text>
              </g>
              <g transform="translate(765, 292)">
                <rect x="-5" y="-58" width="10" height="132" fill="#334155" stroke="#0F172A" strokeWidth="2" />
                <rect x="-62" y="-56" width="124" height="36" rx="8" fill="#7C3AED" stroke="#0F172A" strokeWidth="2.8" />
                <text x="0" y="-38" textAnchor="middle" dominantBaseline="central" fontSize="16" fontWeight="900" fill="#FFFFFF">
                  내일까지!
                </text>
                {beat === 'wrongAction' || t < 0.78 ? (
                  <line x1="-88" y1="18" x2="24" y2="18" stroke="#EF4444" strokeWidth="7" strokeLinecap="round" />
                ) : (
                  <>
                    <path d="M-88 18 Q-54 34 -38 56" fill="none" stroke="#EF4444" strokeWidth="7" strokeLinecap="round" />
                    <path d="M24 18 Q54 34 68 52" fill="none" stroke="#EF4444" strokeWidth="7" strokeLinecap="round" />
                  </>
                )}
              </g>
              {beat === 'wrongAction' && (
                <ComicPopTag x={500} y={195} text="Start = 부터!" color="#E11D48" />
              )}
              {beat !== 'wrongAction' && t >= 0.75 && (
                <ComicPopTag x={685} y={205} text="부터 → 까지! ⭕" color="#7C3AED" />
              )}
            </g>
          )}

          {/* EP.8 도 · 만 */}
          {activeKey === '도 · 만' && (
            <g>
              <polygon
                points="500,15 380,368 620,368"
                fill="#FDE047"
                opacity={beat === 'wrongAction' ? 0.16 : 0.45}
              />
              {beat === 'wrongAction' ? (
                <>
                  {[390, 445, 555, 610].map((cx, idx) => (
                    <g
                      key={cx}
                      transform={`translate(${cx}, ${324 - Math.abs(Math.sin(walkTime * 14 + idx)) * 18}) scale(0.82)`}
                    >
                      <JollamanCharacterSvg faceMode="panic" isWalking={false} legSwing={0} armSwing={0} walkTime={walkTime} activeChar="도" />
                    </g>
                  ))}
                  <ComicPopTag x={500} y={182} text="우리도?! (Too many!)" color="#E11D48" />
                </>
              ) : (
                <>
                  <polygon points="365,308 375,308 375,368 365,368" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
                  <polygon points="625,308 635,308 635,368 625,368" fill="#FACC15" stroke="#0F172A" strokeWidth="2.5" />
                  <path d="M270 326 Q320 342 368 320" fill="none" stroke="#E11D48" strokeWidth="7" strokeLinecap="round" />
                  <path d="M632 320 Q680 342 730 326" fill="none" stroke="#E11D48" strokeWidth="7" strokeLinecap="round" />
                  <ComicPopTag x={500} y={182} text="우리만! (ONLY VIP)" color="#DB2777" />
                </>
              )}
            </g>
          )}

          {/* Main Jollaman */}
          {!hideMainJollaman && (
            <g transform={`translate(${jollaX}, ${jollaY}) rotate(${jollaRot}) scale(${jollaScaleX}, ${jollaScaleY})`}>
              <JollamanCharacterSvg
                faceMode={jollaFaceMode}
                isWalking={isWalkingMotion}
                legSwing={legSwing}
                armSwing={armSwing}
                showHeadBump={showHeadBump}
                walkTime={walkTime}
                activeChar={episode.skyLabel}
              />
              {showDizzyStars && <DizzyStarOrbitSvg walkTime={walkTime} cy={-64} radius={22} />}
              {beat === 'wrongAction' && t > 0.34 && t < 0.68 && (
                <g transform="translate(26, -42)">
                  <ComicImpactBurstSvg scale={0.92} fill="#FACC15" stroke="#0F172A" />
                </g>
              )}
              {beat === 'rightPrimary' && t > 0.72 && (
                <g transform="translate(0, -72)">
                  <SparkleBurstSvg color={episode.color} progress={t} />
                </g>
              )}
            </g>
          )}
        </g>
      )}

      {/* PERSISTENT TOP QUIZ PROMPT */}
      {(beat === 'decision' ||
        beat === 'resolve' ||
        beat === 'wrongAction' ||
        beat === 'rightPrimary') && (
        <ParticleQuizPromptSvg episode={episode} time={walkTime} compact={beat !== 'decision'} />
      )}
    </ParticleTheaterShell>
  );
};
