import React from 'react';
import {
  playParticleV2Sfx,
  playSuccessChime,
  speakKorean,
  speakMixedSegments,
} from '../utils/audio';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { tWordMeaning } from '../utils/i18nSlot';
import { ParticleEpisode } from './JollamanSprites13';
import {
  BatchimPromptBannerSvg,
  TheaterCut1DecisionSvg,
  TheaterCut2WrongMonsterSvg,
  TheaterCut3XrayLessonSvg,
  TheaterCut4VictorySvg,
  TheaterCut5RuleSummarySvg,
} from './ParticleTheaterCuts';
import {
  ParticleTheaterEpisodeBase,
  useParticleTheaterEngine,
} from '../hooks/useParticleTheaterEngine';
import { ParticleTheaterShell } from './ParticleTheaterShell';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

interface ParticleV2TheaterEpisode
  extends ParticleEpisode,
    Omit<ParticleTheaterEpisodeBase, 'id'> {
  accentColor: string;
  englishMeaning: string;
  batchimParticle: string;
  noBatchimParticle: string;
}

const SERIES12_MEANINGS: Record<ParticleEpisode['id'], string> = {
  'eun-neun': 'Jollaman is a man.',
  'i-ga': 'The monster is sleeping.',
  'eul-reul': 'Kick the monster!',
  'wa-gwa': 'Dance with girlfriend!',
};

const SERIES12_COLORS: Record<ParticleEpisode['id'], string> = {
  'eun-neun': '#2563EB',
  'i-ga': '#0EA5E9',
  'eul-reul': '#7C3AED',
  'wa-gwa': '#EC4899',
};

export const PARTICLE_EPISODES: ParticleEpisode[] = [
  {
    id: 'eun-neun',
    epNum: 1,
    title: '은 / 는 (상남자 플렉스편)',
    promptBefore: '졸라맨',
    promptAfter: '남자예요.',
    leftOption: '은',
    rightOption: '는',
    correctSide: 'left',
    completedSentence: '졸라맨은 남자예요.',
    englishCue: 'Jollaman is a man.',
    wrongSentenceTag: '졸라맨는?!',
    monsterLine1: '졸라맨는?! ❌',
    monsterLine2: 'Has Batchim (Final Consonant)',
    wrongKoreanCue: '받침(ㄴ)이 있어요!',
    wrongEnglishCue: 'Has Batchim (Final Consonant) · NOT 는',
    wrongReasonTts: '땡! 졸라맨는? 아니에요!',
    happyTag: 'Jollaman is a man!',
    monsterIdleHabit: 'sleep',
    kickStyle: 'flying',
    breakdown: {
      prefixChars: ['졸', '라'],
      targetWord: '맨',
      topPart: '매',
      batchimChar: 'ㄴ',
      badgeLabel: 'Has Batchim (ㄴ)',
      correctParticle: '은',
      wrongParticle: '는',
      wordAfter: '남자예요.',
      mergedWord: '졸라맨은',
      combineStyle: 'standard',
    },
  },
  {
    id: 'i-ga',
    epNum: 2,
    title: '이 / 가 (괴물 메가폰편)',
    promptBefore: '괴물',
    promptAfter: '자요.',
    leftOption: '이',
    rightOption: '가',
    correctSide: 'left',
    completedSentence: '괴물이 자요.',
    englishCue: 'The monster is sleeping.',
    wrongSentenceTag: '괴물가?!',
    monsterLine1: '괴물가?! ❌',
    monsterLine2: 'Has Batchim (Final Consonant)',
    wrongKoreanCue: '받침(ㄹ)이 있어요!',
    wrongEnglishCue: 'Has Batchim (Final Consonant) · NOT 가',
    wrongReasonTts: '땡! 괴물가? 아니에요!',
    happyTag: 'The monster is sleeping!',
    tapFoot: true,
    monsterIdleHabit: 'sleep',
    kickStyle: 'double',
    breakdown: {
      prefixChars: ['괴'],
      targetWord: '물',
      topPart: '무',
      batchimChar: 'ㄹ',
      badgeLabel: 'Has Batchim (ㄹ)',
      correctParticle: '이',
      wrongParticle: '가',
      wordAfter: '자요.',
      mergedWord: '괴물이',
      combineStyle: 'magnet',
    },
  },
  {
    id: 'eul-reul',
    epNum: 3,
    title: '을 / 를 (배트램펄린편)',
    promptBefore: '괴물',
    promptAfter: '차요.',
    leftOption: '을',
    rightOption: '를',
    correctSide: 'left',
    completedSentence: '괴물을 차요.',
    englishCue: 'Kick the monster!',
    wrongSentenceTag: '괴물를?!',
    monsterLine1: '괴물를?! ❌',
    monsterLine2: 'Has Batchim (Final Consonant)',
    wrongKoreanCue: '받침(ㄹ)이 있어요!',
    wrongEnglishCue: 'Has Batchim (Final Consonant) · NOT 를',
    wrongReasonTts: '땡! 괴물를? 아니에요!',
    happyTag: 'Kick the monster!',
    tapFoot: true,
    monsterIdleHabit: 'nosePick',
    kickStyle: 'tornado',
    breakdown: {
      prefixChars: ['괴'],
      targetWord: '물',
      topPart: '무',
      batchimChar: 'ㄹ',
      badgeLabel: 'Has Batchim (ㄹ)',
      correctParticle: '을',
      wrongParticle: '를',
      wordAfter: '차요.',
      mergedWord: '괴물을',
      combineStyle: 'hammer',
    },
  },
  {
    id: 'wa-gwa',
    epNum: 4,
    title: '와 / 과 (왕파리채 & 막춤편)',
    promptBefore: '여자친구',
    promptAfter: '춤춰요.',
    leftOption: '과',
    rightOption: '와',
    correctSide: 'right',
    completedSentence: '여자친구와 춤춰요.',
    englishCue: 'Dance with girlfriend!',
    wrongSentenceTag: '여자친구과?!',
    monsterLine1: '여자친구과?! ❌',
    monsterLine2: 'No Batchim',
    wrongKoreanCue: '받침이 없어요!',
    wrongEnglishCue: 'No Batchim · NOT 과',
    wrongReasonTts: '땡! 여자친구과? 아니에요!',
    happyTag: 'Dance with girlfriend!',
    holdingBouquet: true,
    monsterIdleHabit: 'doze',
    kickStyle: 'fire',
    breakdown: {
      prefixChars: ['여', '자', '친'],
      targetWord: '구',
      topPart: '구',
      batchimChar: '',
      badgeLabel: 'No Batchim',
      correctParticle: '와',
      wrongParticle: '과',
      wordAfter: '춤춰요.',
      mergedWord: '여자친구와',
      combineStyle: 'gear',
    },
  },
];

const THEATER_EPISODES: ParticleV2TheaterEpisode[] = PARTICLE_EPISODES.map((ep) => {
  const hasBatchim = ep.breakdown.batchimChar.length > 0;
  return {
    ...ep,
    tabLabel: ep.title.split('(')[0].replace(/\s+/g, ''),
    badgeLabel: ep.breakdown.badgeLabel,
    wrongHookTag: 'WRONG!',
    wrongHeadline: ep.monsterLine1,
    wrongCaption: ep.monsterLine2,
    rightHookTag: ep.happyTag,
    accentColor: SERIES12_COLORS[ep.id],
    englishMeaning: SERIES12_MEANINGS[ep.id],
    batchimParticle: hasBatchim ? ep.breakdown.correctParticle : ep.breakdown.wrongParticle,
    noBatchimParticle: hasBatchim ? ep.breakdown.wrongParticle : ep.breakdown.correctParticle,
  };
});

interface JollamanParticleV2SimulationProps {
  audioEnabled?: boolean;
}

export const JollamanParticleV2Simulation: React.FC<JollamanParticleV2SimulationProps> = ({
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
  } = useParticleTheaterEngine<ParticleV2TheaterEpisode>({
    seriesNum: 12,
    seriesTitle: '12. 졸라조사맨 (5컷 극장)',
    episodes: THEATER_EPISODES,
    audioEnabled,
    bgmTrack: 'latin',
    cutSequence: ['decision', 'wrongAction', 'lesson', 'rightPrimary', 'ruleSummary'],
    skipResolveBeat: true,
    suppressDefaultAudio: true,
    decisionAutoplayDuration: 2.8,
    getWrongDuration: () => 2.75,
    lessonDuration: 3.3,
    getRightPrimaryDuration: () => 2.8,
    ruleSummaryDuration: 3.2,
    getTotalCatalogSec: () => 14.8,
    onBeatEnter: (nextBeat, ep, _chosen, userInitiated) => {
      if (nextBeat === 'decision') {
        if (userInitiated) {
          playParticleV2Sfx('decisionSuspense');
          speakKorean(`${ep.promptBefore}, ${ep.promptAfter} 그래, 결심했어!`, 1.0);
        }
      } else if (nextBeat === 'wrongAction') {
        playParticleV2Sfx('monsterRoar');
        const wrongRead = `${ep.promptBefore}${ep.breakdown.wrongParticle}`;
        speakKorean(`땡! ${wrongRead}? 아니에요!`, 1.02);
      } else if (nextBeat === 'lesson') {
        playParticleV2Sfx('wrongBuzzer');
        const hasBatchim = ep.breakdown.batchimChar.length > 0;
        speakMixedSegments([
          { text: 'Look at', lang: 'en-US', rate: 0.96 },
          { text: ep.breakdown.targetWord, lang: 'ko-KR', rate: 0.88 },
          {
            text: hasBatchim
              ? 'It has a Batchim. So, use'
              : 'It has no Batchim. So, use',
            lang: 'en-US',
            rate: 0.96,
          },
          { text: ep.breakdown.correctParticle, lang: 'ko-KR', rate: 0.9 },
        ]);
      } else if (nextBeat === 'rightPrimary') {
        playSuccessChime();
        speakKorean(`정답! ${ep.completedSentence}`, 1.0);
      } else if (nextBeat === 'ruleSummary') {
        playParticleV2Sfx('eojeolMerge');
        speakKorean(
          `받침이 있으면 ${ep.batchimParticle}, 없으면 ${ep.noBatchimParticle}! 참 쉽죠?`,
          1.0
        );
      }
    },
    onBeatTick: (curBeat, prog, _ep, sfxFlags, audioOn) => {
      if (!audioOn) return;
      if (curBeat === 'wrongAction' && prog > 0.3 && !sfxFlags.flingHit) {
        sfxFlags.flingHit = true;
        playParticleV2Sfx('wrongBuzzer');
      }
      if (curBeat === 'rightPrimary' && prog > 0.25 && !sfxFlags.victoryFanfare) {
        sfxFlags.victoryFanfare = true;
        playParticleV2Sfx('fireworksDance');
      }
    },
  });

  const stageBgClass =
    beat === 'wrongAction'
      ? 'bg-rose-50'
      : beat === 'lesson'
      ? 'bg-slate-900'
      : beat === 'rightPrimary'
      ? 'bg-emerald-50'
      : beat === 'ruleSummary'
      ? 'bg-slate-50'
      : 'bg-sky-50';

  const hasBatchim = episode.breakdown.batchimChar.length > 0;
  const correct = episode.breakdown.correctParticle;

  const getFooterCopy = (): { main: string; sub?: string } => {
    switch (beat) {
      case 'decision':
        return {
          main: 'Choose the right particle! (알맞은 조사를 고르세요!)',
        };
      case 'wrongAction':
        return {
          main: hasBatchim
            ? `❌ '${episode.promptBefore}' has a Batchim (${episode.breakdown.batchimChar})! (받침이 있어요!)`
            : `❌ '${episode.promptBefore}' has No Batchim! (받침이 없어요!)`,
          sub: 'Has Batchim (Final Consonant) vs No Batchim',
        };
      case 'lesson':
        return {
          main: hasBatchim
            ? `Ends with a consonant (Batchim) ➔ Use '${correct}'! (받침이 있으면 '${correct}'!)`
            : `No Batchim (Ends with a vowel) ➔ Use '${correct}'! (받침이 없으면 '${correct}'!)`,
        };
      case 'rightPrimary':
        return {
          main: `⭕ ${episode.completedSentence} (${episode.englishMeaning})`,
        };
      case 'ruleSummary':
      default:
        return {
          main: `Rule Summary: Batchim ⭕ = ${episode.batchimParticle} / Batchim ❌ = ${episode.noBatchimParticle}`,
        };
    }
  };

  const footerCopy = getFooterCopy();

  return (
    <ParticleTheaterShell
      title="12. 졸라조사맨"
      ariaLabel={`졸라조사맨 ${episode.title} 5컷 극장 무대`}
      stageBgClass={stageBgClass}
      cameraViewBox={getCameraViewBox(500)}
      episodes={THEATER_EPISODES}
      episode={episode}
      episodeIdx={episodeIdx}
      clearedEpisodes={clearedEpisodes}
      beat={beat}
      audioEnabled={audioEnabled}
      bgmTrack="latin"
      bgmEnabled={bgmEnabled}
      onToggleBgm={() => setBgmEnabled((prev) => !prev)}
      onSelectEpisode={handleSelectEpisode}
      onSelectSide={handleSelectSide}
      onStartAutoplay={handleStartAutoplay}
      onStopAutoplay={handleStopAutoplay}
      onCloseReveal={handleCloseReveal}
      footerText={footerCopy.main}
      footerSubText={footerCopy.sub}
      cutStep={{
        current: cutNumber,
        total: totalCuts,
        onPrev: handlePrevCut,
        onNext: handleNextCut,
      }}
      flashcard={{
        glyph: episode.breakdown.correctParticle,
        subLabel: `${episode.breakdown.badgeLabel} + ${episode.breakdown.correctParticle}`,
        accentColor: episode.accentColor,
        headlineNode: (
          <>
            <span style={{ color: episode.accentColor }}>{episode.breakdown.mergedWord}</span>{' '}
            <span>{episode.breakdown.wordAfter}</span>
          </>
        ),
        headlineCharLen: episode.completedSentence.length,
        meaning: tWordMeaning(12, episode.id, episode.englishMeaning),
        romanization: romanizeKorean(episode.completedSentence),
        cornerIcon: getSeriesCornerIcon(12, episode.id, walkTime),
      }}
      defsSlot={
        <defs>
          <radialGradient id="leftBlueGlow" cx="35%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#DBEAFE" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="rightRoseGlow" cx="65%" cy="45%" r="65%">
            <stop offset="0%" stopColor="#FDA4AF" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FFE4E6" stopOpacity="0" />
          </radialGradient>
        </defs>
      }
    >
      {/* 1컷: 선택의 기로 */}
      {beat === 'decision' && (
        <TheaterCut1DecisionSvg
          episode={episode}
          time={walkTime}
          hoverSide={hoverSide}
          selectedSide={selectedSide}
          onSelectSide={handleSelectSide}
          onHoverSide={setHoverSide}
        />
      )}

      {/* 2컷: 오답 선택 시 - 몬스터 등장 */}
      {beat === 'wrongAction' && (
        <TheaterCut2WrongMonsterSvg
          episode={episode}
          progress={beatProgress}
          time={walkTime}
        />
      )}

      {/* 3컷: 받침 X-ray 돋보기 교정 */}
      {beat === 'lesson' && (
        <TheaterCut3XrayLessonSvg
          episode={episode}
          subProgress={beatProgress}
          time={walkTime}
        />
      )}

      {/* 4컷: 정답 선택 시 - 환호 */}
      {beat === 'rightPrimary' && (
        <TheaterCut4VictorySvg
          episode={episode}
          progress={beatProgress}
          time={walkTime}
        />
      )}

      {/* 5컷: 핵심 규칙 요약 카드 */}
      {beat === 'ruleSummary' && (
        <TheaterCut5RuleSummarySvg episode={episode} time={walkTime} />
      )}

      {/* Persistent Top Batchim Prompt on Cuts 1, 2, 4 */}
      {(beat === 'decision' || beat === 'wrongAction' || beat === 'rightPrimary') && (
        <BatchimPromptBannerSvg
          episode={episode}
          time={walkTime}
          completedMode={beat === 'rightPrimary'}
          sparkleBatchim={beat === 'decision'}
        />
      )}
    </ParticleTheaterShell>
  );
};
