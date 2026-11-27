import React from 'react';
import {
  playParticleV2Sfx,
  playSuccessChime,
  speakKorean,
  speakMixedSegments,
} from '../utils/audio';
import { romanizeKorean } from '../utils/koreanRomanizer';
import { tWordMeaning } from '../utils/i18nSlot';
import { JollamanCharacterSvg } from './JollamanSprites';
import { BuddyJollamanSvg } from './JollamanSprites3';
import {
  DecisionTheatrePrompt,
  ParticleBreakdownConfig,
  ParticleMonsterSvg,
} from './JollamanSprites13';
import {
  BatchimPromptBannerSvg,
  TheaterCut1DecisionSvg,
  TheaterCut3XrayLessonSvg,
} from './ParticleTheaterCuts';
import {
  ParticleTheaterEpisodeBase,
  useParticleTheaterEngine,
} from '../hooks/useParticleTheaterEngine';
import { ParticleTheaterShell } from './ParticleTheaterShell';
import { getSeriesCornerIcon } from './JollamanFlashcardIcons';

type Particle3RuleKind = 'batchim' | 'meaning';

interface Particle3Episode extends DecisionTheatrePrompt, Omit<ParticleTheaterEpisodeBase, 'id'> {
  id:
    | 'ui-possessive'
    | 'irang-batchim'
    | 'rang-vowel'
    | 'a-ya-vocative'
    | 'hanteseo-from'
    | 'boda-than'
    | 'cheoreom-like'
    | 'mada-every';
  accentColor: string;
  englishMeaning: string;
  ruleKind: Particle3RuleKind;
  wrongTtsReason: string;
  xrayTitleEn: string;
  xrayCorrectLabel: string;
  xrayCorrectDescKo: string;
  xrayCorrectDescEn: string;
  xrayWrongLabel: string;
  xrayWrongDescKo: string;
  xrayWrongDescEn: string;
  xrayEnglishTtsSegments: { text: string; lang: 'en-US' | 'ko-KR'; rate?: number }[];
  summaryLeftHeader: string;
  summaryLeftSub: string;
  summaryLeftPills: string[];
  summaryLeftEx: string;
  summaryRightHeader: string;
  summaryRightSub: string;
  summaryRightPills: string[];
  summaryRightEx: string;
  ruleSummaryFooter: string;
  ruleSummaryTts: string;
  breakdown: ParticleBreakdownConfig;
}

const PARTICLE3_EPISODES: Particle3Episode[] = [
  {
    id: 'ui-possessive',
    epNum: 1,
    title: '의 / 에 (소유 · Possessive)',
    tabLabel: '의',
    badgeLabel: "Possessive · 의 ('s)",
    promptBefore: '졸라맨',
    promptAfter: '모자예요.',
    leftOption: '의',
    rightOption: '에',
    correctSide: 'left',
    completedSentence: '졸라맨의 모자예요.',
    englishCue: "It's Jollaman's hat.",
    englishMeaning: "It's Jollaman's hat.",
    wrongSentenceTag: '졸라맨에 모자?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '졸라맨에 모자?! ❌',
    wrongCaption: "에 = Place / Time! Need 의 ('s)",
    wrongTtsReason: '에는 장소예요!',
    rightHookTag: "Jollaman's hat!",
    accentColor: '#2563EB',
    ruleKind: 'meaning',
    xrayTitleEn: "POSSESSIVE ('s) vs PLACE",
    xrayCorrectLabel: "의 ('s / of)",
    xrayCorrectDescKo: '누구의 물건 (소유)',
    xrayCorrectDescEn: "Owner's item (Possession)",
    xrayWrongLabel: '에 (at / to)',
    xrayWrongDescKo: '장소 · 시간에만 사용',
    xrayWrongDescEn: 'Place or Time only',
    xrayEnglishTtsSegments: [
      { text: 'Use', lang: 'en-US', rate: 0.96 },
      { text: '의', lang: 'ko-KR', rate: 0.88 },
      { text: 'for possession, like Jollaman’s hat. Not', lang: 'en-US', rate: 0.96 },
      { text: '에', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: '의 ⭕',
    summaryLeftSub: "Possessive ('s / of)",
    summaryLeftPills: ['의'],
    summaryLeftEx: '예: 졸라맨의 모자',
    summaryRightHeader: '에 ❌',
    summaryRightSub: 'Place / Time (at / to)',
    summaryRightPills: ['에'],
    summaryRightEx: '예: 집에 가요',
    ruleSummaryFooter: "Rule Summary: 의 = 's (Possession) / 에 = Place or Time",
    ruleSummaryTts: '소유를 말할 땐 의! 장소는 에! 참 쉽죠?',
    breakdown: {
      prefixChars: ['졸', '라'],
      targetWord: '맨',
      topPart: '매',
      batchimChar: 'ㄴ',
      badgeLabel: "Possessive · 의 ('s)",
      correctParticle: '의',
      wrongParticle: '에',
      wordAfter: '모자예요.',
      mergedWord: '졸라맨의',
      combineStyle: 'standard',
    },
  },
  {
    id: 'irang-batchim',
    epNum: 2,
    title: '이랑 / 랑 (받침 ⭕ · with/and)',
    tabLabel: '이랑',
    badgeLabel: 'Has Batchim (ㄱ) + 이랑',
    promptBefore: '수박',
    promptAfter: '우유예요.',
    leftOption: '이랑',
    rightOption: '랑',
    correctSide: 'left',
    completedSentence: '수박이랑 우유예요.',
    englishCue: 'Watermelon and milk.',
    englishMeaning: 'Watermelon and milk.',
    wrongSentenceTag: '수박랑?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '수박랑?! ❌',
    wrongCaption: 'Has Batchim (Final Consonant) ㄱ!',
    wrongTtsReason: '받침이 있어요!',
    rightHookTag: 'Watermelon & milk!',
    accentColor: '#059669',
    ruleKind: 'batchim',
    xrayTitleEn: 'BATCHIM + 이랑',
    xrayCorrectLabel: '받침 ⭕ + 이랑',
    xrayCorrectDescKo: '받침이 있으면 이랑!',
    xrayCorrectDescEn: 'Has Batchim (Final Consonant) ➔ 이랑',
    xrayWrongLabel: '받침 ❌ + 랑',
    xrayWrongDescKo: '받침이 없으면 랑!',
    xrayWrongDescEn: 'No Batchim ➔ 랑',
    xrayEnglishTtsSegments: [
      { text: 'Look at', lang: 'en-US', rate: 0.96 },
      { text: '박', lang: 'ko-KR', rate: 0.88 },
      { text: 'It has a Batchim. So, use', lang: 'en-US', rate: 0.96 },
      { text: '이랑', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: 'Batchim ⭕',
    summaryLeftSub: 'Has Batchim (Final Consonant)',
    summaryLeftPills: ['이랑', '아', '은', '과'],
    summaryLeftEx: '예: 수박 + 이랑',
    summaryRightHeader: 'No Batchim ❌',
    summaryRightSub: 'No Batchim (Vowel Ending)',
    summaryRightPills: ['랑', '야', '는', '와'],
    summaryRightEx: '예: 커피 + 랑',
    ruleSummaryFooter: 'Rule Summary: Batchim ⭕ = 이랑 / Batchim ❌ = 랑',
    ruleSummaryTts: '받침이 있으면 이랑, 없으면 랑! 참 쉽죠?',
    breakdown: {
      prefixChars: ['수'],
      targetWord: '박',
      topPart: '바',
      batchimChar: 'ㄱ',
      badgeLabel: 'Has Batchim (ㄱ)',
      correctParticle: '이랑',
      wrongParticle: '랑',
      wordAfter: '우유예요.',
      mergedWord: '수박이랑',
      combineStyle: 'magnet',
    },
  },
  {
    id: 'rang-vowel',
    epNum: 3,
    title: '랑 / 이랑 (받침 ❌ · with/and)',
    tabLabel: '랑',
    badgeLabel: 'No Batchim + 랑',
    promptBefore: '커피',
    promptAfter: '케이크예요.',
    leftOption: '이랑',
    rightOption: '랑',
    correctSide: 'right',
    completedSentence: '커피랑 케이크예요.',
    englishCue: 'Coffee and cake.',
    englishMeaning: 'Coffee and cake.',
    wrongSentenceTag: '커피이랑?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '커피이랑?! ❌',
    wrongCaption: 'No Batchim (Vowel Ending 피)!',
    wrongTtsReason: '받침이 없어요!',
    rightHookTag: 'Coffee & cake!',
    accentColor: '#D97706',
    ruleKind: 'batchim',
    xrayTitleEn: 'NO BATCHIM + 랑',
    xrayCorrectLabel: '받침 ❌ + 랑',
    xrayCorrectDescKo: '받침이 없으면 랑!',
    xrayCorrectDescEn: 'No Batchim ➔ 랑',
    xrayWrongLabel: '받침 ⭕ + 이랑',
    xrayWrongDescKo: '받침이 있을 때 이랑!',
    xrayWrongDescEn: 'Has Batchim ➔ 이랑',
    xrayEnglishTtsSegments: [
      { text: 'Look at', lang: 'en-US', rate: 0.96 },
      { text: '피', lang: 'ko-KR', rate: 0.88 },
      { text: 'It has no Batchim. So, use', lang: 'en-US', rate: 0.96 },
      { text: '랑', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: 'Batchim ⭕',
    summaryLeftSub: 'Has Batchim (Final Consonant)',
    summaryLeftPills: ['이랑', '아', '은', '과'],
    summaryLeftEx: '예: 수박 + 이랑',
    summaryRightHeader: 'No Batchim ❌',
    summaryRightSub: 'No Batchim (Vowel Ending)',
    summaryRightPills: ['랑', '야', '는', '와'],
    summaryRightEx: '예: 커피 + 랑',
    ruleSummaryFooter: 'Rule Summary: Batchim ⭕ = 이랑 / Batchim ❌ = 랑',
    ruleSummaryTts: '받침이 있으면 이랑, 없으면 랑! 참 쉽죠?',
    breakdown: {
      prefixChars: ['커'],
      targetWord: '피',
      topPart: '피',
      batchimChar: '',
      badgeLabel: 'No Batchim',
      correctParticle: '랑',
      wrongParticle: '이랑',
      wordAfter: '케이크예요.',
      mergedWord: '커피랑',
      combineStyle: 'gear',
    },
  },
  {
    id: 'a-ya-vocative',
    epNum: 4,
    title: '아 / 야 (호격 · Calling Name)',
    tabLabel: '아·야',
    badgeLabel: 'Has Batchim (ㄹ) + 아',
    promptBefore: '괴물',
    promptAfter: '안녕!',
    leftOption: '아',
    rightOption: '야',
    correctSide: 'left',
    completedSentence: '괴물아, 안녕!',
    englishCue: 'Hey Monster, hi!',
    englishMeaning: 'Hey Monster, hi!',
    wrongSentenceTag: '괴물야?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '괴물야?! ❌',
    wrongCaption: 'Has Batchim (Final Consonant) ㄹ!',
    wrongTtsReason: '받침이 있어요!',
    rightHookTag: 'Hey Monster!',
    accentColor: '#9333EA',
    ruleKind: 'batchim',
    xrayTitleEn: 'CALLING NAME: 아 vs 야',
    xrayCorrectLabel: '받침 ⭕ + 아',
    xrayCorrectDescKo: '받침 있는 이름 + 아!',
    xrayCorrectDescEn: 'Has Batchim ➔ 아',
    xrayWrongLabel: '받침 ❌ + 야',
    xrayWrongDescKo: '받침 없는 이름 + 야!',
    xrayWrongDescEn: 'No Batchim ➔ 야',
    xrayEnglishTtsSegments: [
      { text: 'Look at', lang: 'en-US', rate: 0.96 },
      { text: '물', lang: 'ko-KR', rate: 0.88 },
      { text: 'It has a Batchim. So, call with', lang: 'en-US', rate: 0.96 },
      { text: '아', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: 'Batchim ⭕',
    summaryLeftSub: 'Has Batchim (Final Consonant)',
    summaryLeftPills: ['아', '이랑', '은', '이'],
    summaryLeftEx: '예: 괴물 + 아',
    summaryRightHeader: 'No Batchim ❌',
    summaryRightSub: 'No Batchim (Vowel Ending)',
    summaryRightPills: ['야', '랑', '는', '가'],
    summaryRightEx: '예: 친구 + 야',
    ruleSummaryFooter: 'Rule Summary: Batchim ⭕ = 아 / Batchim ❌ = 야',
    ruleSummaryTts: '이름 부를 때 받침 있으면 아, 없으면 야! 참 쉽죠?',
    breakdown: {
      prefixChars: ['괴'],
      targetWord: '물',
      topPart: '무',
      batchimChar: 'ㄹ',
      badgeLabel: 'Has Batchim (ㄹ)',
      correctParticle: '아',
      wrongParticle: '야',
      wordAfter: '안녕!',
      mergedWord: '괴물아',
      combineStyle: 'hammer',
    },
  },
  {
    id: 'hanteseo-from',
    epNum: 5,
    title: '한테서 / 한테 (From vs To)',
    tabLabel: '한테서',
    badgeLabel: 'From Person · 한테서',
    promptBefore: '친구',
    promptAfter: '받았어요.',
    leftOption: '한테서',
    rightOption: '한테',
    correctSide: 'left',
    completedSentence: '친구한테서 받았어요.',
    englishCue: 'Got a gift from a friend.',
    englishMeaning: 'Got a gift from a friend.',
    wrongSentenceTag: '친구한테 받았어요?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '친구한테 받았어요?! ❌',
    wrongCaption: '한테 = To! Receiving needs 한테서 (From)!',
    wrongTtsReason: '한테는 주는 방향이에요!',
    rightHookTag: 'From Friend!',
    accentColor: '#EC4899',
    ruleKind: 'meaning',
    xrayTitleEn: 'FROM PERSON vs TO PERSON',
    xrayCorrectLabel: '한테서 (From)',
    xrayCorrectDescKo: '사람에게서 받을 때 (출발)',
    xrayCorrectDescEn: 'Receiving FROM a person',
    xrayWrongLabel: '한테 (To)',
    xrayWrongDescKo: '사람에게 줄 때 (도착)',
    xrayWrongDescEn: 'Giving TO a person',
    xrayEnglishTtsSegments: [
      { text: 'Use', lang: 'en-US', rate: 0.96 },
      { text: '한테서', lang: 'ko-KR', rate: 0.88 },
      { text: 'for receiving from someone. Not', lang: 'en-US', rate: 0.96 },
      { text: '한테', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: '한테서 ⭕',
    summaryLeftSub: 'From a Person (⬅️ Receive)',
    summaryLeftPills: ['한테서'],
    summaryLeftEx: '예: 친구한테서 받았어요',
    summaryRightHeader: '한테 ❌',
    summaryRightSub: 'To a Person (➡️ Give)',
    summaryRightPills: ['한테'],
    summaryRightEx: '예: 친구한테 줬어요',
    ruleSummaryFooter: 'Rule Summary: 한테서 = From someone / 한테 = To someone',
    ruleSummaryTts: '사람에게서 받을 땐 한테서! 줄 땐 한테! 참 쉽죠?',
    breakdown: {
      prefixChars: ['친'],
      targetWord: '구',
      topPart: '구',
      batchimChar: '',
      badgeLabel: 'From · 한테서',
      correctParticle: '한테서',
      wrongParticle: '한테',
      wordAfter: '받았어요.',
      mergedWord: '친구한테서',
      combineStyle: 'standard',
    },
  },
  {
    id: 'boda-than',
    epNum: 6,
    title: '보다 / 처럼 (비교 · Than)',
    tabLabel: '보다',
    badgeLabel: 'Comparison · 보다 (Than)',
    promptBefore: '거북이',
    promptAfter: '빨라요!',
    leftOption: '보다',
    rightOption: '처럼',
    correctSide: 'left',
    completedSentence: '거북이보다 빨라요!',
    englishCue: 'Faster than a turtle!',
    englishMeaning: 'Faster than a turtle!',
    wrongSentenceTag: '거북이처럼 빨라요?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '거북이처럼 빨라요?! ❌',
    wrongCaption: 'Turtles are slow! Use 보다 (Than)!',
    wrongTtsReason: '거북이는 느려요!',
    rightHookTag: 'Faster than a turtle!',
    accentColor: '#16A34A',
    ruleKind: 'meaning',
    xrayTitleEn: 'COMPARISON (THAN) vs SIMILE (LIKE)',
    xrayCorrectLabel: '보다 (Than)',
    xrayCorrectDescKo: '둘을 비교할 때 (~보다 더)',
    xrayCorrectDescEn: 'Comparing two things (-er than)',
    xrayWrongLabel: '처럼 (Like)',
    xrayWrongDescKo: '비슷한 모습을 비유할 때',
    xrayWrongDescEn: 'Like / Similar to',
    xrayEnglishTtsSegments: [
      { text: 'Use', lang: 'en-US', rate: 0.96 },
      { text: '보다', lang: 'ko-KR', rate: 0.88 },
      { text: 'for comparison, faster than a turtle! Not', lang: 'en-US', rate: 0.96 },
      { text: '처럼', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: '보다 ⭕',
    summaryLeftSub: 'Comparison (More ~ than)',
    summaryLeftPills: ['보다'],
    summaryLeftEx: '예: 거북이보다 빨라요',
    summaryRightHeader: '처럼 ❌',
    summaryRightSub: 'Simile (Like / Just like)',
    summaryRightPills: ['처럼'],
    summaryRightEx: '예: 번개처럼 빨라요',
    ruleSummaryFooter: 'Rule Summary: 보다 = Than (Compare) / 처럼 = Like (Simile)',
    ruleSummaryTts: '비교할 땐 보다! 비슷할 땐 처럼! 참 쉽죠?',
    breakdown: {
      prefixChars: ['거', '북'],
      targetWord: '이',
      topPart: '이',
      batchimChar: '',
      badgeLabel: 'Than · 보다',
      correctParticle: '보다',
      wrongParticle: '처럼',
      wordAfter: '빨라요!',
      mergedWord: '거북이보다',
      combineStyle: 'standard',
    },
  },
  {
    id: 'cheoreom-like',
    epNum: 7,
    title: '처럼 / 보다 (비유 · Like)',
    tabLabel: '처럼',
    badgeLabel: 'Simile · 처럼 (Like)',
    promptBefore: '번개',
    promptAfter: '빨라요!',
    leftOption: '보다',
    rightOption: '처럼',
    correctSide: 'right',
    completedSentence: '번개처럼 빨라요!',
    englishCue: 'Fast like lightning!',
    englishMeaning: 'Fast like lightning!',
    wrongSentenceTag: '번개보다 빨라요?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '번개보다 빨라요?! ❌',
    wrongCaption: 'Hard to beat lightning! Use 처럼 (Like)!',
    wrongTtsReason: '번개와 같을 땐 처럼!',
    rightHookTag: 'Fast like lightning!',
    accentColor: '#EAB308',
    ruleKind: 'meaning',
    xrayTitleEn: 'SIMILE (LIKE) vs COMPARISON (THAN)',
    xrayCorrectLabel: '처럼 (Like)',
    xrayCorrectDescKo: '~와 똑같이 (비유)',
    xrayCorrectDescEn: 'Just like lightning (Simile)',
    xrayWrongLabel: '보다 (Than)',
    xrayWrongDescKo: '둘을 비교할 때 (비교)',
    xrayWrongDescEn: 'Comparing A > B',
    xrayEnglishTtsSegments: [
      { text: 'Use', lang: 'en-US', rate: 0.96 },
      { text: '처럼', lang: 'ko-KR', rate: 0.88 },
      { text: 'to say fast like lightning! Not', lang: 'en-US', rate: 0.96 },
      { text: '보다', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: '보다 ❌',
    summaryLeftSub: 'Comparison (More ~ than)',
    summaryLeftPills: ['보다'],
    summaryLeftEx: '예: 거북이보다 빨라요',
    summaryRightHeader: '처럼 ⭕',
    summaryRightSub: 'Simile (Like / Just like)',
    summaryRightPills: ['처럼'],
    summaryRightEx: '예: 번개처럼 빨라요',
    ruleSummaryFooter: 'Rule Summary: 처럼 = Like (Simile) / 보다 = Than (Compare)',
    ruleSummaryTts: '비슷할 땐 처럼! 비교할 땐 보다! 참 쉽죠?',
    breakdown: {
      prefixChars: ['번'],
      targetWord: '개',
      topPart: '개',
      batchimChar: '',
      badgeLabel: 'Like · 처럼',
      correctParticle: '처럼',
      wrongParticle: '보다',
      wordAfter: '빨라요!',
      mergedWord: '번개처럼',
      combineStyle: 'standard',
    },
  },
  {
    id: 'mada-every',
    epNum: 8,
    title: '마다 / 만 (반복 · Every)',
    tabLabel: '마다',
    badgeLabel: 'Every · 마다',
    promptBefore: '아침',
    promptAfter: '운동해요!',
    leftOption: '마다',
    rightOption: '만',
    correctSide: 'left',
    completedSentence: '아침마다 운동해요!',
    englishCue: 'Work out every morning!',
    englishMeaning: 'Work out every morning!',
    wrongSentenceTag: '아침만 운동해요?!',
    wrongHookTag: 'WRONG!',
    wrongHeadline: '아침만?! ❌',
    wrongCaption: '만 = Only once! Routine needs 마다 (Every)!',
    wrongTtsReason: '만은 하나뿐이에요!',
    rightHookTag: 'Every morning!',
    accentColor: '#DC2626',
    ruleKind: 'meaning',
    xrayTitleEn: 'EVERY (마다) vs ONLY (만)',
    xrayCorrectLabel: '마다 (Every)',
    xrayCorrectDescKo: '빠짐없이 매번 반복',
    xrayCorrectDescEn: 'Every single time (Routine)',
    xrayWrongLabel: '만 (Only)',
    xrayWrongDescKo: '딱 그것 하나뿐일 때',
    xrayWrongDescEn: 'Only that one (Exclude rest)',
    xrayEnglishTtsSegments: [
      { text: 'Use', lang: 'en-US', rate: 0.96 },
      { text: '마다', lang: 'ko-KR', rate: 0.88 },
      { text: 'for every morning without skipping. Not', lang: 'en-US', rate: 0.96 },
      { text: '만', lang: 'ko-KR', rate: 0.9 },
    ],
    summaryLeftHeader: '마다 ⭕',
    summaryLeftSub: 'Every / Each (Repeat)',
    summaryLeftPills: ['마다'],
    summaryLeftEx: '예: 아침마다 운동해요',
    summaryRightHeader: '만 ❌',
    summaryRightSub: 'Only (Just one)',
    summaryRightPills: ['만'],
    summaryRightEx: '예: 나만 좋아요',
    ruleSummaryFooter: 'Rule Summary: 마다 = Every / 만 = Only',
    ruleSummaryTts: '매번 반복할 땐 마다! 딱 하나만은 만! 참 쉽죠?',
    breakdown: {
      prefixChars: ['아'],
      targetWord: '침',
      topPart: '치',
      batchimChar: 'ㅁ',
      badgeLabel: 'Every · 마다',
      correctParticle: '마다',
      wrongParticle: '만',
      wordAfter: '운동해요!',
      mergedWord: '아침마다',
      combineStyle: 'standard',
    },
  },
];

/**
 * Custom Episode-Specific Visual Prop rendered nicely alongside Jollaman in Cut 2 & Cut 4.
 */
const EpisodeVisualPropSvg: React.FC<{
  id: Particle3Episode['id'];
  mode: 'wrong' | 'right';
  time: number;
  progress: number;
}> = ({ id, mode, time, progress }) => {
  switch (id) {
    case 'ui-possessive':
      return mode === 'wrong' ? (
        <g transform="translate(740, 322)">
          {/* Tiny House stolen by '에' with hat stuck on chimney! */}
          <rect x="-70" y="-34" width="140" height="106" fill="#FED7AA" stroke="#0F172A" strokeWidth="4" />
          <polygon points="-86,-32 0,-94 86,-32" fill="#EF4444" stroke="#0F172A" strokeWidth="4" />
          <g transform="translate(0, -108) rotate(-14)">
            <path d="M-34 8 Q0 -26 34 8 Z" fill="#2563EB" stroke="#0F172A" strokeWidth="3.5" />
            <rect x="-40" y="6" width="80" height="11" rx="5" fill="#1D4ED8" stroke="#0F172A" strokeWidth="3" />
          </g>
        </g>
      ) : (
        <g transform="translate(500, 224) scale(1.18)">
          {/* Cool Golden-Star Cap right above Jollaman's head! */}
          <path d="M-38 8 Q0 -34 38 8 Z" fill="#2563EB" stroke="#0F172A" strokeWidth="3.5" />
          <rect x="-46" y="6" width="92" height="12" rx="6" fill="#1D4ED8" stroke="#0F172A" strokeWidth="3" />
          <text x="0" y="-4" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FACC15">
            ★
          </text>
        </g>
      );

    case 'irang-batchim':
      return mode === 'right' ? (
        <g transform="translate(730, 345)">
          {/* Giant Watermelon Slice + Milk Carton */}
          <g transform="translate(-45, 0) rotate(-10)">
            <path d="M-55 0 A55 55 0 0 0 55 0 Z" fill="#16A34A" stroke="#0F172A" strokeWidth="4" />
            <path d="M-44 0 A44 44 0 0 0 44 0 Z" fill="#EF4444" />
            <circle cx="-16" cy="18" r="3.5" fill="#0F172A" />
            <circle cx="0" cy="24" r="3.5" fill="#0F172A" />
            <circle cx="16" cy="18" r="3.5" fill="#0F172A" />
          </g>
          <g transform="translate(58, -12)">
            <rect x="-26" y="-26" width="52" height="72" rx="6" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4" />
            <polygon points="-26,-26 0,-46 26,-26" fill="#38BDF8" stroke="#0F172A" strokeWidth="3.5" />
            <rect x="-26" y="4" width="52" height="22" fill="#38BDF8" />
            <text x="0" y="19" textAnchor="middle" fontSize="14" fontWeight="900" fill="#FFFFFF">
              MILK
            </text>
          </g>
        </g>
      ) : null;

    case 'rang-vowel':
      return mode === 'right' ? (
        <g transform="translate(740, 355)">
          {/* Warm Coffee Cup + Berry Cake Slice */}
          <g transform="translate(-52, 0)">
            <rect x="-26" y="-24" width="52" height="58" rx="10" fill="#92400E" stroke="#0F172A" strokeWidth="4" />
            <path d="M26 -14 Q44 -14 44 4 Q44 22 26 22" fill="none" stroke="#0F172A" strokeWidth="5" />
            <path
              d={`M-8 -34 Q-16 -48 -6 ${-58 - Math.sin(time * 6) * 4}`}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="4"
              strokeLinecap="round"
            />
            <path
              d={`M10 -34 Q18 -48 8 ${-58 + Math.sin(time * 6) * 4}`}
              fill="none"
              stroke="#94A3B8"
              strokeWidth="4"
              strokeLinecap="round"
            />
          </g>
          <g transform="translate(56, 4)">
            <polygon points="-44,28 44,28 44,-22 -44,-4" fill="#FDE047" stroke="#0F172A" strokeWidth="4" />
            <rect x="-44" y="6" width="88" height="10" fill="#FB7185" />
            <circle cx="8" cy="-22" r="10" fill="#E11D48" stroke="#0F172A" strokeWidth="3" />
          </g>
        </g>
      ) : null;

    case 'a-ya-vocative':
      return mode === 'right' ? (
        <g transform="translate(730, 342) scale(1.15)">
          <ParticleMonsterSvg mode="laugh" time={time} />
          <text x="-66" y="-44" fontSize="34" fontWeight="900" fill="#9333EA">
            ♥
          </text>
        </g>
      ) : null;

    case 'hanteseo-from':
      return mode === 'wrong' ? (
        <g transform={`translate(${540 + progress * 260}, ${295 - Math.sin(progress * Math.PI) * 90}) rotate(${progress * 360})`}>
          <rect x="-28" y="-26" width="56" height="52" rx="8" fill="#F43F5E" stroke="#0F172A" strokeWidth="4" />
          <line x1="0" y1="-26" x2="0" y2="26" stroke="#FDE047" strokeWidth="8" />
          <line x1="-28" y1="0" x2="28" y2="0" stroke="#FDE047" strokeWidth="8" />
        </g>
      ) : (
        <g>
          {/* Buddy Jollaman handing shiny Gift Box LEFT to Jollaman */}
          <g transform="translate(745, 368) scale(1.5)">
            <BuddyJollamanSvg walkTime={time} isWalking={false} hugging={false} />
          </g>
          <g transform={`translate(${660 - Math.min(1, progress * 1.4) * 105}, ${334 - Math.sin(Math.min(1, progress * 1.4) * Math.PI) * 38})`}>
            <rect x="-26" y="-24" width="52" height="48" rx="8" fill="#EC4899" stroke="#0F172A" strokeWidth="4" />
            <line x1="0" y1="-24" x2="0" y2="24" stroke="#FDE047" strokeWidth="8" />
            <line x1="-26" y1="0" x2="26" y2="0" stroke="#FDE047" strokeWidth="8" />
          </g>
        </g>
      );

    case 'boda-than':
      return (
        <g transform={`translate(${mode === 'wrong' ? 320 : 755}, 382)`}>
          {/* Cute Green Turtle */}
          <path d="M-56 10 C-56 -40, 56 -40, 56 10 Z" fill="#16A34A" stroke="#0F172A" strokeWidth="4.5" />
          <circle cx="-18" cy="-14" r="9" fill="#4ADE80" stroke="#0F172A" strokeWidth="2.5" />
          <circle cx="18" cy="-14" r="9" fill="#4ADE80" stroke="#0F172A" strokeWidth="2.5" />
          <ellipse cx="64" cy="-2" rx="22" ry="16" fill="#4ADE80" stroke="#0F172A" strokeWidth="4" />
          <circle cx="70" cy="-6" r="4" fill="#0F172A" />
          <rect x="-42" y="10" width="22" height="18" rx="6" fill="#4ADE80" stroke="#0F172A" strokeWidth="3.5" />
          <rect x="20" y="10" width="22" height="18" rx="6" fill="#4ADE80" stroke="#0F172A" strokeWidth="3.5" />
        </g>
      );

    case 'cheoreom-like':
      return (
        <g transform={`translate(${mode === 'wrong' ? 740 : 750}, 280) scale(${1 + Math.sin(time * 10) * 0.06})`}>
          <polygon
            points="10,-96 -42,8 2,8 -18,96 48,-12 4,-12"
            fill="#FACC15"
            stroke="#0F172A"
            strokeWidth="5"
            strokeLinejoin="round"
          />
        </g>
      );

    case 'mada-every':
      return (
        <g transform="translate(755, 315)">
          <rect x="-110" y="-76" width="220" height="148" rx="18" fill="#FFFFFF" stroke="#0F172A" strokeWidth="4.5" />
          <rect x="-110" y="-76" width="220" height="42" rx="14" fill="#DC2626" />
          <text x="0" y="-48" textAnchor="middle" fontSize="22" fontWeight="900" fill="#FFFFFF">
            월 · 화 · 수 · 목 · 금
          </text>
          {['월', '화', '수', '목', '금'].map((d, i) => {
            const cx = -76 + i * 38;
            const ok = mode === 'right' || i === 0;
            return (
              <g key={d} transform={`translate(${cx}, 18)`}>
                <circle cx="0" cy="0" r="16" fill={ok ? '#DCFCE7' : '#FEE2E2'} stroke={ok ? '#16A34A' : '#DC2626'} strokeWidth="3" />
                <text x="0" y="8" textAnchor="middle" fontSize="22" fontWeight="900" fill={ok ? '#15803D' : '#DC2626'}>
                  {ok ? '⭕' : '❌'}
                </text>
              </g>
            );
          })}
        </g>
      );
  }
};

/**
 * 2컷: 오답 선택 시 - 보라색 몬스터 & 오답 조사 튕겨내기 + 상황 코미디!
 */
const Particle3WrongCutSvg: React.FC<{
  episode: Particle3Episode;
  progress: number;
  time: number;
}> = ({ episode, progress, time }) => {
  const strobeOn = Math.sin(time * 24) > 0;
  const wrongParticle = episode.breakdown.wrongParticle;
  const slamShake = progress < 0.35 ? Math.sin(time * 52) * 6 : 0;

  const lungeP = progress < 0.15 ? 0 : Math.min(1, (progress - 0.15) / 0.25);
  const monsterX = 725 - Math.sin(lungeP * Math.PI * 0.5) * 145;
  const flingP = Math.max(0, (progress - 0.32) / 0.68);
  const cardX = 395 - flingP * 320;
  const cardY = 305 - Math.sin(flingP * Math.PI) * 165;
  const cardRot = -flingP * 540;

  return (
    <g transform={`translate(${slamShake}, 0)`}>
      <rect x="0" y="-65" width="1000" height="630" fill={strobeOn ? '#FFE4E6' : '#FFF1F2'} />
      <rect x="0" y="440" width="1000" height="105" fill="#FDA4AF" />
      <line x1="0" y1="440" x2="1000" y2="440" stroke="#0F172A" strokeWidth="4" />

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

      {/* Recoiling Jollaman */}
      <g transform={`translate(${215 - flingP * 40}, 372) rotate(${-flingP * 18}) scale(1.6)`}>
        <JollamanCharacterSvg
          faceMode={flingP > 0.3 ? 'dizzy' : 'panic'}
          isWalking={false}
          legSwing={0}
          armSwing={0}
          walkTime={time}
          activeChar={wrongParticle}
        />
      </g>

      {/* Visual prop if episode uses scenic comedy on wrong cut; else roaring monster */}
      {episode.ruleKind === 'batchim' ? (
        <g transform={`translate(${monsterX}, 318) scale(1.32)`}>
          <ParticleMonsterSvg mode={progress > 0.45 ? 'laugh' : 'angry'} time={time} />
        </g>
      ) : (
        <>
          <EpisodeVisualPropSvg id={episode.id} mode="wrong" time={time} progress={progress} />
          <g transform={`translate(${monsterX + 120}, 355) scale(0.95)`}>
            <ParticleMonsterSvg mode="laugh" time={time} />
          </g>
        </>
      )}

      {/* Wrong Card Flung Away */}
      <g transform={`translate(${cardX}, ${cardY}) rotate(${cardRot})`}>
        <rect
          x="-68"
          y="-58"
          width="136"
          height="116"
          rx="22"
          fill="#FFFFFF"
          stroke="#DC2626"
          strokeWidth="6.5"
        />
        <text
          x="0"
          y={wrongParticle.length >= 2 ? 16 : 22}
          textAnchor="middle"
          fontSize={wrongParticle.length >= 3 ? 40 : wrongParticle.length === 2 ? 48 : 64}
          fontWeight="900"
          fill="#DC2626"
        >
          {wrongParticle}
        </text>
        <path d="M-38 -38 L38 38 M38 -38 L-38 38" stroke="#DC2626" strokeWidth="10" strokeLinecap="round" opacity="0.88" />
      </g>

      {/* Big Cut Banner */}
      <g transform="translate(500, 148)">
        <rect x="-310" y="-46" width="620" height="92" rx="24" fill="#0F172A" fillOpacity="0.22" transform="translate(4, 6)" />
        <rect x="-310" y="-46" width="620" height="92" rx="24" fill="#FFFFFF" stroke="#DC2626" strokeWidth="5.5" />
        <text x="0" y="-8" textAnchor="middle" fontSize="34" fontWeight="900" fill="#DC2626">
          크앙!! {episode.wrongSentenceTag} ❌
        </text>
        <text x="0" y="28" textAnchor="middle" fontSize="22" fontWeight="900" fill="#0F172A">
          (WRONG!)
        </text>
      </g>
    </g>
  );
};

/**
 * 3컷: 의미/규칙 비교 X-ray 교정 (비받침 에피소드용 대형 대비 카드)
 */
const Particle3MeaningXraySvg: React.FC<{
  episode: Particle3Episode;
  time: number;
}> = ({ episode, time }) => {
  const pulse = 1 + Math.abs(Math.sin(time * 7)) * 0.04;

  return (
    <g>
      <rect x="0" y="-65" width="1000" height="630" fill="#0F172A" />
      <g stroke="#1E293B" strokeWidth="2" opacity="0.65">
        {Array.from({ length: 12 }).map((_, i) => (
          <line key={`v-${i}`} x1={i * 90} y1="-65" x2={i * 90} y2="540" />
        ))}
        {Array.from({ length: 8 }).map((_, i) => (
          <line key={`h-${i}`} x1="0" y1={-40 + i * 80} x2="1000" y2={-40 + i * 80} />
        ))}
      </g>

      {/* Header */}
      <g transform="translate(500, 14)">
        <rect x="-440" y="-44" width="880" height="88" rx="22" fill="#1E293B" stroke="#38BDF8" strokeWidth="4.5" />
        <text x="0" y="-4" textAnchor="middle" fontSize="34" fontWeight="900" fill="#FDE047">
          🔍 {episode.xrayTitleEn}
        </text>
        <text x="0" y="29" textAnchor="middle" fontSize="22" fontWeight="800" fill="#BAE6FD">
          {episode.completedSentence} ({episode.englishMeaning})
        </text>
      </g>

      {/* Left: Correct Particle Spotlight Card */}
      <g transform={`translate(268, 285) scale(${pulse})`}>
        <rect x="-215" y="-145" width="430" height="290" rx="28" fill="#ECFDF5" stroke="#10B981" strokeWidth="7" />
        <rect x="-215" y="-145" width="430" height="64" rx="24" fill="#059669" />
        <text x="0" y="-103" textAnchor="middle" fontSize="30" fontWeight="900" fill="#FFFFFF">
          ⭕ USE THIS!
        </text>
        <text x="0" y="-8" textAnchor="middle" fontSize="64" fontWeight="900" fill="#047857">
          {episode.xrayCorrectLabel}
        </text>
        <text x="0" y="54" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F172A">
          {episode.xrayCorrectDescKo}
        </text>
        <text x="0" y="98" textAnchor="middle" fontSize="22" fontWeight="800" fill="#047857">
          {episode.xrayCorrectDescEn}
        </text>
      </g>

      {/* Right: Wrong Contrast Card */}
      <g transform="translate(732, 285)">
        <rect x="-215" y="-145" width="430" height="290" rx="28" fill="#FFF1F2" stroke="#E11D48" strokeWidth="6" />
        <rect x="-215" y="-145" width="430" height="64" rx="24" fill="#E11D48" />
        <text x="0" y="-103" textAnchor="middle" fontSize="30" fontWeight="900" fill="#FFFFFF">
          ❌ NOT THIS!
        </text>
        <text x="0" y="-8" textAnchor="middle" fontSize="58" fontWeight="900" fill="#BE123C">
          {episode.xrayWrongLabel}
        </text>
        <text x="0" y="54" textAnchor="middle" fontSize="26" fontWeight="900" fill="#0F172A">
          {episode.xrayWrongDescKo}
        </text>
        <text x="0" y="98" textAnchor="middle" fontSize="22" fontWeight="800" fill="#BE123C">
          {episode.xrayWrongDescEn}
        </text>
      </g>
    </g>
  );
};

/**
 * 4컷: 정답 선택 시 - 환호 + 에피소드별 맞춤 소품!
 */
const Particle3VictoryCutSvg: React.FC<{
  episode: Particle3Episode;
  progress: number;
  time: number;
}> = ({ episode, progress, time }) => {
  const correct = episode.breakdown.correctParticle;
  const bounce = Math.abs(Math.sin(time * 8)) * 16;
  const rotRays = (time * 36) % 360;

  return (
    <g>
      <rect x="0" y="-65" width="1000" height="630" fill="#ECFDF5" />
      <rect x="0" y="440" width="1000" height="105" fill="#A7F3D0" />
      <line x1="0" y1="440" x2="1000" y2="440" stroke="#0F172A" strokeWidth="4" />

      {/* Golden Sunburst Halo */}
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

      {/* Fireworks */}
      {[
        { x: 165, y: 170, color: '#EC4899', offset: 0 },
        { x: 835, y: 175, color: '#2563EB', offset: 1.2 },
      ].map((fw, idx) => {
        const r = 18 + ((time * 52 + fw.offset * 28) % 58);
        return (
          <g key={idx} transform={`translate(${fw.x}, ${fw.y})`} opacity={Math.max(0.15, 1 - r / 78)}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map((ang) => {
              const rad = (ang * Math.PI) / 180;
              return <circle key={ang} cx={Math.cos(rad) * r} cy={Math.sin(rad) * r} r="6" fill={fw.color} />;
            })}
          </g>
        );
      })}

      {/* Episode-Specific Celebratory Prop */}
      <EpisodeVisualPropSvg id={episode.id} mode="right" time={time} progress={progress} />

      {/* Happy Jollaman holding Correct Card */}
      <g transform={`translate(${episode.id === 'ui-possessive' ? 500 : 410}, ${380 - bounce}) scale(1.6)`}>
        <JollamanCharacterSvg
          faceMode="happy"
          isWalking={false}
          legSwing={0}
          armSwing={0}
          walkTime={time}
          activeChar={correct}
        />
        {episode.id !== 'ui-possessive' && (
          <g transform="translate(0, -80)">
            <rect x="-48" y="-34" width="96" height="68" rx="16" fill="#059669" stroke="#FACC15" strokeWidth="4" />
            <text
              x="0"
              y={correct.length >= 2 ? 10 : 14}
              textAnchor="middle"
              fontSize={correct.length >= 3 ? 25 : correct.length === 2 ? 30 : 40}
              fontWeight="900"
              fill="#FFFFFF"
            >
              {correct}
            </text>
          </g>
        )}
      </g>

      {/* Joyful Speech Banner */}
      <g transform="translate(500, 145)">
        <rect x="-305" y="-46" width="610" height="92" rx="24" fill="#0F172A" fillOpacity="0.16" transform="translate(4, 6)" />
        <rect x="-305" y="-46" width="610" height="92" rx="24" fill="#FFFFFF" stroke="#059669" strokeWidth="5" />
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
 * 5컷: 핵심 규칙 요약 카드 (좌 Blue vs 우 Pink 비교)
 */
const Particle3RuleSummaryCutSvg: React.FC<{
  episode: Particle3Episode;
  time: number;
}> = ({ episode, time }) => {
  const bob = Math.sin(time * 5) * 4;
  const renderPills = (pills: string[], pxBase: number, textColor: string, highlightBorder: string, inactiveBorder: string) => {
    const count = pills.length;
    const width = count === 1 ? 260 : 88;
    const spacing = 104;
    return pills.map((p, idx) => {
      const px = count === 1 ? pxBase + 156 : pxBase + idx * spacing;
      const isCurrent = p === episode.breakdown.correctParticle;
      return (
        <g key={p} transform={`translate(${px}, 202)`}>
          <rect
            x={-width / 2}
            y="-52"
            width={width}
            height="104"
            rx="18"
            fill={isCurrent ? '#FACC15' : '#FFFFFF'}
            stroke={isCurrent ? highlightBorder : inactiveBorder}
            strokeWidth={isCurrent ? 6 : 3.5}
          />
          <text
            x="0"
            y="22"
            textAnchor="middle"
            fontSize={p.length >= 3 ? 44 : isCurrent ? 58 : 44}
            fontWeight="900"
            fill={textColor}
          >
            {p}
          </text>
        </g>
      );
    });
  };

  return (
    <g>
      <rect x="0" y="-65" width="1000" height="630" fill="#F8FAFC" />
      <rect x="0" y="456" width="1000" height="90" fill="#E2E8F0" />
      <line x1="0" y1="456" x2="1000" y2="456" stroke="#0F172A" strokeWidth="4" />

      <g transform="translate(500, -14)">
        <rect x="-290" y="-26" width="580" height="52" rx="16" fill="#0F172A" />
        <text x="0" y="9" textAnchor="middle" fontSize="28" fontWeight="900" fill="#FDE047">
          핵심 규칙 요약 · Rule Summary
        </text>
      </g>

      <g transform={`translate(0, ${bob * 0.4})`}>
        {/* LEFT COLUMN (BLUE) */}
        <rect x="36" y="28" width="448" height="332" rx="26" fill="#EFF6FF" stroke="#2563EB" strokeWidth="6" />
        <rect x="36" y="28" width="448" height="84" rx="22" fill="#2563EB" />
        <text x="260" y="66" textAnchor="middle" fontSize="34" fontWeight="900" fill="#FFFFFF">
          {episode.summaryLeftHeader}
        </text>
        <text x="260" y="98" textAnchor="middle" fontSize="18" fontWeight="800" fill="#DBEAFE">
          {episode.summaryLeftSub}
        </text>

        {renderPills(episode.summaryLeftPills, 104, '#1E3A8A', '#1D4ED8', '#93C5FD')}

        <rect x="70" y="284" width="380" height="54" rx="14" fill="#DBEAFE" stroke="#2563EB" strokeWidth="3" />
        <text x="260" y="320" textAnchor="middle" fontSize="26" fontWeight="900" fill="#1E3A8A">
          {episode.summaryLeftEx}
        </text>

        {/* RIGHT COLUMN (PINK) */}
        <rect x="516" y="28" width="448" height="332" rx="26" fill="#FFF1F2" stroke="#E11D48" strokeWidth="6" />
        <rect x="516" y="28" width="448" height="84" rx="22" fill="#E11D48" />
        <text x="740" y="66" textAnchor="middle" fontSize="34" fontWeight="900" fill="#FFFFFF">
          {episode.summaryRightHeader}
        </text>
        <text x="740" y="98" textAnchor="middle" fontSize="18" fontWeight="800" fill="#FFE4E6">
          {episode.summaryRightSub}
        </text>

        {renderPills(episode.summaryRightPills, 584, '#881337', '#BE123C', '#FDA4AF')}

        <rect x="550" y="284" width="380" height="54" rx="14" fill="#FFE4E6" stroke="#E11D48" strokeWidth="3" />
        <text x="740" y="320" textAnchor="middle" fontSize="26" fontWeight="900" fill="#881337">
          {episode.summaryRightEx}
        </text>
      </g>

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

interface JollamanParticle3SimulationProps {
  audioEnabled?: boolean;
}

export const JollamanParticle3Simulation: React.FC<JollamanParticle3SimulationProps> = ({
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
  } = useParticleTheaterEngine<Particle3Episode>({
    seriesNum: 16,
    seriesTitle: '16. 졸라심화조사맨 (조사 3)',
    episodes: PARTICLE3_EPISODES,
    audioEnabled,
    bgmTrack: 'carol',
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
        speakMixedSegments(ep.xrayEnglishTtsSegments);
      } else if (nextBeat === 'rightPrimary') {
        playSuccessChime();
        speakKorean(`정답! ${ep.completedSentence}`, 1.0);
      } else if (nextBeat === 'ruleSummary') {
        playParticleV2Sfx('eojeolMerge');
        speakKorean(ep.ruleSummaryTts, 1.0);
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
          main: `❌ ${episode.wrongSentenceTag} (${episode.wrongCaption})`,
          sub:
            episode.ruleKind === 'batchim'
              ? hasBatchim
                ? `Has Batchim (Final Consonant) · ${episode.breakdown.targetWord}(${episode.breakdown.batchimChar})`
                : `No Batchim · ${episode.breakdown.targetWord}`
              : episode.xrayWrongDescEn,
        };
      case 'lesson':
        return {
          main:
            episode.ruleKind === 'batchim'
              ? `${episode.xrayCorrectDescEn} (${episode.xrayCorrectDescKo})`
              : `${episode.xrayCorrectDescEn} — Use '${correct}'! (${episode.xrayCorrectDescKo})`,
        };
      case 'rightPrimary':
        return {
          main: `⭕ ${episode.completedSentence} (${episode.englishMeaning})`,
        };
      case 'ruleSummary':
      default:
        return {
          main: episode.ruleSummaryFooter,
        };
    }
  };

  const footerCopy = getFooterCopy();

  return (
    <ParticleTheaterShell
      title="16. 졸라심화조사맨 (조사 3)"
      ariaLabel={`졸라심화조사맨 ${episode.title} 5컷 극장 무대`}
      stageBgClass={stageBgClass}
      cameraViewBox={getCameraViewBox(500)}
      episodes={PARTICLE3_EPISODES}
      episode={episode}
      episodeIdx={episodeIdx}
      clearedEpisodes={clearedEpisodes}
      beat={beat}
      audioEnabled={audioEnabled}
      bgmTrack="carol"
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
        meaning: tWordMeaning(16, episode.id, episode.englishMeaning),
        romanization: romanizeKorean(episode.completedSentence),
        cornerIcon: getSeriesCornerIcon(16, episode.id, walkTime),
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

      {/* 2컷: 오답 선택 시 - 몬스터 & 상황 코미디 */}
      {beat === 'wrongAction' && (
        <Particle3WrongCutSvg episode={episode} progress={beatProgress} time={walkTime} />
      )}

      {/* 3컷: 받침 X-ray 돋보기 OR 의미 비교 X-ray */}
      {beat === 'lesson' &&
        (episode.ruleKind === 'batchim' ? (
          <TheaterCut3XrayLessonSvg episode={episode} subProgress={beatProgress} time={walkTime} />
        ) : (
          <Particle3MeaningXraySvg episode={episode} time={walkTime} />
        ))}

      {/* 4컷: 정답 선택 시 - 환호 */}
      {beat === 'rightPrimary' && (
        <Particle3VictoryCutSvg episode={episode} progress={beatProgress} time={walkTime} />
      )}

      {/* 5컷: 핵심 규칙 요약 카드 */}
      {beat === 'ruleSummary' && (
        <Particle3RuleSummaryCutSvg episode={episode} time={walkTime} />
      )}

      {/* Persistent Top Prompt on Cuts 1, 2, 4 */}
      {(beat === 'decision' || beat === 'wrongAction' || beat === 'rightPrimary') && (
        <BatchimPromptBannerSvg
          episode={episode}
          time={walkTime}
          completedMode={beat === 'rightPrimary'}
          sparkleBatchim={beat === 'decision' && episode.ruleKind === 'batchim'}
        />
      )}
    </ParticleTheaterShell>
  );
};
