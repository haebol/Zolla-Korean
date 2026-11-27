// Chant Song Presets:
//   [PART 1: 100% 1:1 Matched with Existing Jollaman Simulations Series 1 ~ 12]
//   - Series 1 (Sim 1~4): 한글 40자 · 2단 세트 / 이름편 / 단어편 (40)
//   - Series 2 (Sim 5~7): 받침1(7) + 받침2(9) + 겹앞(8) + 겹뒤(7) = 받침·겹받침 31종 1:1 완벽 대응
//   - Series 3 (Sim 8~11): 변동1(10) + 변동2(8) + 불규칙(8) + 첨가(8) = 음운변동·불규칙·첨가 34종 1:1 완벽 대응
//   - Series 4 (Sim 12): 졸라조사맨 4부작 (은/는·이/가·을/를·와/과) 1:1 완벽 대응
//
//   [PART 2: NEW Next Chant Song Series (시뮬 이후 다음 커리큘럼)]
//   - Series 5 (신작): 확장 조사 짝꿍 (에·에서·에게·로·으로·부터·까지·도·만 8종)
//   - Series 6 (신작): 왕초보 필수 동사·형용사 활용 & 생존 회화 (16종)
//   - Series 7 (신작): 실전 K-패턴 & 시제·존댓말 챈트 (-고 싶어요·-지 마세요·숫자·요일 12종)
//
// Fixed 4-Beat Chant Formula: Beat 1 (Sound) -> Beat 2 (Sound) -> Beat 3 (Word/Pronunciation) -> Beat 4 (Rest + Clap 👏!)

import { romanizeKorean } from './koreanRomanizer';

export type ChantHangulGroup =
  // Sim 1~4 groups
  | 'consonant'
  | 'double'
  | 'vowel'
  | 'compound'
  // Sim 5~7 groups
  | 'batchim1'
  | 'batchim2'
  | 'double_front'
  | 'double_back'
  // Sim 8~11 groups
  | 'phonology1'
  | 'phonology2'
  | 'irregular'
  | 'addition'
  // Sim 12 group
  | 'particle_v2'
  // New Series 5~7 groups
  | 'particle_ext'
  | 'particle_tier3'
  | 'daily_verb'
  | 'daily_phrase'
  | 'pattern_honorific'
  | 'pattern_count_day'
  | 'custom';

export type ChantPresetId =
  | 'hangul40_combo'
  | 'hangul40_names'
  | 'hangul40_words'
  | 'batchim_chant'
  | 'phonology_chant'
  | 'particles_chant'
  | 'particles_next_chant'
  | 'particles_tier3_chant'
  | 'daily_verbs_phrases'
  | 'tense_honorific_chant';

export interface ChantPresetOption {
  id: ChantPresetId;
  tier: 'sim_match' | 'next_series';
  seriesBadge: string;
  label: string;
  titleForExport: string;
  groups: { id: ChantHangulGroup | 'all'; label: string }[];
}

export const CHANT_PRESET_OPTIONS: ChantPresetOption[] = [
  // === PART 1: Existing Jollaman Sim 1~12 (1:1 Match) ===
  {
    id: 'hangul40_combo',
    tier: 'sim_match',
    seriesBadge: '시뮬 1~4',
    label: '1탄 · 한글 40자 2단세트',
    titleForExport: '1탄 · 한글 40자 리듬 챈트송 (시뮬 1~4 1:1)',
    groups: [
      { id: 'all', label: '전체 40' },
      { id: 'consonant', label: '자음 14' },
      { id: 'double', label: '쌍자음 5' },
      { id: 'vowel', label: '모음 10' },
      { id: 'compound', label: '복합모음 11' },
    ],
  },
  {
    id: 'hangul40_names',
    tier: 'sim_match',
    seriesBadge: '시뮬 1~4',
    label: '1탄 · 이름편 (40)',
    titleForExport: '1탄 · 한글 40자 이름 챈트송',
    groups: [
      { id: 'all', label: '전체 40' },
      { id: 'consonant', label: '자음 14' },
      { id: 'double', label: '쌍자음 5' },
      { id: 'vowel', label: '모음 10' },
      { id: 'compound', label: '복합모음 11' },
    ],
  },
  {
    id: 'hangul40_words',
    tier: 'sim_match',
    seriesBadge: '시뮬 1~4',
    label: '1탄 · 단어편 (40)',
    titleForExport: '1탄 · 한글 40자 단어 챈트송',
    groups: [
      { id: 'all', label: '전체 40' },
      { id: 'consonant', label: '자음 14' },
      { id: 'double', label: '쌍자음 5' },
      { id: 'vowel', label: '모음 10' },
      { id: 'compound', label: '복합모음 11' },
    ],
  },
  {
    id: 'batchim_chant',
    tier: 'sim_match',
    seriesBadge: '시뮬 5~7',
    label: '🎯 2탄 · 받침·겹받침 (31)',
    titleForExport: '2탄 · 받침·겹받침 31종 챈트송 (시뮬 5~7 1:1)',
    groups: [
      { id: 'all', label: '전체 31' },
      { id: 'batchim1', label: '받침1 (7)' },
      { id: 'batchim2', label: '받침2 (9)' },
      { id: 'double_front', label: '겹자음1 (8)' },
      { id: 'double_back', label: '겹자음2 (7)' },
    ],
  },
  {
    id: 'phonology_chant',
    tier: 'sim_match',
    seriesBadge: '시뮬 8~11',
    label: '🪄 3탄 · 변동·불규칙·첨가 (34)',
    titleForExport: '3탄 · 음운변동·불규칙·첨가 34종 챈트송 (시뮬 8~11 1:1)',
    groups: [
      { id: 'all', label: '전체 34' },
      { id: 'phonology1', label: '변동1 (10)' },
      { id: 'phonology2', label: '변동2 (8)' },
      { id: 'irregular', label: '불규칙 (8)' },
      { id: 'addition', label: '첨가·사잇소리 (8)' },
    ],
  },
  {
    id: 'particles_chant',
    tier: 'sim_match',
    seriesBadge: '시뮬 12',
    label: '⚔️ 4탄 · 졸라조사맨 (4부작)',
    titleForExport: '4탄 · 졸라조사맨 4부작 챈트송 (은·이·을·와 1:1)',
    groups: [
      { id: 'all', label: '전체 4부작' },
    ],
  },

  // === PART 2: Matched 1:1 with Jollaman Sim 13~15 ===
  {
    id: 'particles_next_chant',
    tier: 'next_series',
    seriesBadge: '시뮬 13 (5탄)',
    label: '🧭 5탄 · 확장 조사 (8)',
    titleForExport: '5탄 · 장소·방향·시간 확장 조사 리듬 챈트송 (시뮬 13 1:1)',
    groups: [
      { id: 'all', label: '전체 8' },
    ],
  },
  {
    id: 'particles_tier3_chant',
    tier: 'next_series',
    seriesBadge: '시뮬 16 (조사3)',
    label: '🔥 조사 3 · 심화 필수 (8)',
    titleForExport: '조사 3 · 소유·비교·비유·호격 필수 조사 리듬 챈트송 (시뮬 16 1:1)',
    groups: [
      { id: 'all', label: '전체 8' },
    ],
  },
  {
    id: 'daily_verbs_phrases',
    tier: 'next_series',
    seriesBadge: '시뮬 14 (6탄)',
    label: '🗣️ 6탄 · 필수동사·회화 (16)',
    titleForExport: '6탄 · 왕초보 필수 동사·생존 회화 챈트송 (시뮬 14 1:1)',
    groups: [
      { id: 'all', label: '전체 16' },
      { id: 'daily_verb', label: '필수 동사 8' },
      { id: 'daily_phrase', label: '생존 회화 8' },
    ],
  },
  {
    id: 'tense_honorific_chant',
    tier: 'next_series',
    seriesBadge: '시뮬 15 (7탄)',
    label: '🚀 7탄 · K-패턴·숫자·요일 (12)',
    titleForExport: '7탄 · K-패턴 문형·고유어 숫자·요일 리듬 챈트송 (시뮬 15 1:1)',
    groups: [
      { id: 'all', label: '전체 12' },
      { id: 'pattern_honorific', label: '만능 문형 6' },
      { id: 'pattern_count_day', label: '숫자·요일 6' },
    ],
  },
];

export interface ChantPhrase {
  beats: [string, string, string];
  rawText: string;
}

export interface ChantItem {
  id: string;
  mainChar: string;
  phrases: ChantPhrase[]; // 1 phrase (normal) or 2 phrases ('/' 2단 세트)
  meaning: string;
  group: ChantHangulGroup;
  color: string;
  /** Mapped Jollaman scene visual key or 'prop:EMOJI|LABEL' */
  sceneKey: string;
}

interface Hangul40Seed {
  char: string;
  name: string;
  sound: string;
  word: string;
  meaningWord: string;
  meaningName: string;
  group: ChantHangulGroup;
  color: string;
}

interface ExtraChantSeed {
  char: string;
  line: string;
  meaning: string;
  group: ChantHangulGroup;
  color: string;
  sceneKey: string;
}

// Sim 1~4 Exact 1:1 Data (Consonants 14 + Double 5 + Vowels 10 + Compound 11)
export const HANGUL_40_SEEDS: Hangul40Seed[] = [
  // Sim 1: Consonants (14)
  { char: 'ㄱ', name: '기역', sound: '그', word: '기차', meaningWord: 'train', meaningName: 'giyeok', group: 'consonant', color: '#EF4444' },
  { char: 'ㄴ', name: '니은', sound: '느', word: '나무', meaningWord: 'tree', meaningName: 'nieun', group: 'consonant', color: '#F97316' },
  { char: 'ㄷ', name: '디귿', sound: '드', word: '다리', meaningWord: 'bridge', meaningName: 'digeut', group: 'consonant', color: '#EAB308' },
  { char: 'ㄹ', name: '리을', sound: '르', word: '로켓', meaningWord: 'rocket', meaningName: 'rieul', group: 'consonant', color: '#22C55E' },
  { char: 'ㅁ', name: '미음', sound: '므', word: '모기', meaningWord: 'mosquito', meaningName: 'mieum', group: 'consonant', color: '#10B981' },
  { char: 'ㅂ', name: '비읍', sound: '브', word: '번개', meaningWord: 'lightning', meaningName: 'bieup', group: 'consonant', color: '#06B6D4' },
  { char: 'ㅅ', name: '시옷', sound: '스', word: '사자', meaningWord: 'lion', meaningName: 'siot', group: 'consonant', color: '#0EA5E9' },
  { char: 'ㅇ', name: '이응', sound: '으', word: '오리', meaningWord: 'duck', meaningName: 'ieung', group: 'consonant', color: '#3B82F6' },
  { char: 'ㅈ', name: '지읒', sound: '즈', word: '자동차', meaningWord: 'car', meaningName: 'jieut', group: 'consonant', color: '#6366F1' },
  { char: 'ㅊ', name: '치읓', sound: '츠', word: '춤', meaningWord: 'dance', meaningName: 'chieut', group: 'consonant', color: '#8B5CF6' },
  { char: 'ㅋ', name: '키읔', sound: '크', word: '코끼리', meaningWord: 'elephant', meaningName: 'kieuk', group: 'consonant', color: '#A855F7' },
  { char: 'ㅌ', name: '티읕', sound: '트', word: '토끼', meaningWord: 'rabbit', meaningName: 'tieut', group: 'consonant', color: '#EC4899' },
  { char: 'ㅍ', name: '피읖', sound: '프', word: '풍선', meaningWord: 'balloon', meaningName: 'pieup', group: 'consonant', color: '#F43F5E' },
  { char: 'ㅎ', name: '히읗', sound: '흐', word: '호랑이', meaningWord: 'tiger', meaningName: 'hieut', group: 'consonant', color: '#E11D48' },

  // Sim 3: Double Consonants (5)
  { char: 'ㄲ', name: '쌍기역', sound: '끄', word: '까마귀', meaningWord: 'crow', meaningName: 'ssang-giyeok', group: 'double', color: '#DC2626' },
  { char: 'ㄸ', name: '쌍디귿', sound: '뜨', word: '똥', meaningWord: 'poop', meaningName: 'ssang-digeut', group: 'double', color: '#92400E' },
  { char: 'ㅃ', name: '쌍비읍', sound: '쁘', word: '뽀뽀', meaningWord: 'kiss', meaningName: 'ssang-bieup', group: 'double', color: '#EC4899' },
  { char: 'ㅆ', name: '쌍시옷', sound: '쓰', word: '쓰레기차', meaningWord: 'garbage truck', meaningName: 'ssang-siot', group: 'double', color: '#16A34A' },
  { char: 'ㅉ', name: '쌍지읒', sound: '쯔', word: '짝꿍', meaningWord: 'best buddy', meaningName: 'ssang-jieut', group: 'double', color: '#0D9488' },

  // Sim 2: Basic Vowels (10) — 1:1 with JollamanVowelSimulation (으스스, 이빨괴물!)
  { char: 'ㅏ', name: '아', sound: '아', word: '아기', meaningWord: 'baby', meaningName: 'a', group: 'vowel', color: '#EC4899' },
  { char: 'ㅑ', name: '야', sound: '야', word: '야구공', meaningWord: 'baseball', meaningName: 'ya', group: 'vowel', color: '#F97316' },
  { char: 'ㅓ', name: '어', sound: '어', word: '어항', meaningWord: 'fishbowl', meaningName: 'eo', group: 'vowel', color: '#0EA5E9' },
  { char: 'ㅕ', name: '여', sound: '여', word: '여우', meaningWord: 'fox', meaningName: 'yeo', group: 'vowel', color: '#EA580C' },
  { char: 'ㅗ', name: '오', sound: '오', word: '오징어', meaningWord: 'squid', meaningName: 'o', group: 'vowel', color: '#9333EA' },
  { char: 'ㅛ', name: '요', sound: '요', word: '요요', meaningWord: 'yo-yo', meaningName: 'yo', group: 'vowel', color: '#E11D48' },
  { char: 'ㅜ', name: '우', sound: '우', word: '우주선', meaningWord: 'spaceship', meaningName: 'u', group: 'vowel', color: '#10B981' },
  { char: 'ㅠ', name: '유', sound: '유', word: '유령', meaningWord: 'ghost', meaningName: 'yu', group: 'vowel', color: '#0284C7' },
  { char: 'ㅡ', name: '으', sound: '으', word: '으스스', meaningWord: 'spooky', meaningName: 'eu', group: 'vowel', color: '#475569' },
  { char: 'ㅣ', name: '이', sound: '이', word: '이빨괴물', meaningWord: 'teeth monster', meaningName: 'i', group: 'vowel', color: '#16A34A' },

  // Sim 4: Compound Vowels (11) — 1:1 with JollamanCompoundVowelSimulation (왜, 원!)
  { char: 'ㅐ', name: '애', sound: '애', word: '개구리', meaningWord: 'frog', meaningName: 'ae', group: 'compound', color: '#16A34A' },
  { char: 'ㅒ', name: '얘', sound: '얘', word: '얘기', meaningWord: 'Story / Talk', meaningName: 'yae', group: 'compound', color: '#EC4899' },
  { char: 'ㅔ', name: '에', sound: '에', word: '게', meaningWord: 'crab', meaningName: 'e', group: 'compound', color: '#EF4444' },
  { char: 'ㅖ', name: '예', sound: '예', word: '계란', meaningWord: 'egg', meaningName: 'ye', group: 'compound', color: '#F59E0B' },
  { char: 'ㅘ', name: '와', sound: '와', word: '사과', meaningWord: 'apple', meaningName: 'wa', group: 'compound', color: '#DC2626' },
  { char: 'ㅙ', name: '왜', sound: '왜', word: '왜', meaningWord: 'why?', meaningName: 'wae', group: 'compound', color: '#DB2777' },
  { char: 'ㅚ', name: '외', sound: '외', word: '회오리', meaningWord: 'tornado', meaningName: 'oe', group: 'compound', color: '#0EA5E9' },
  { char: 'ㅝ', name: '워', sound: '워', word: '원숭이', meaningWord: 'monkey', meaningName: 'wo', group: 'compound', color: '#0284C7' },
  { char: 'ㅞ', name: '웨', sound: '웨', word: '웨딩', meaningWord: 'wedding', meaningName: 'we', group: 'compound', color: '#E11D48' },
  { char: 'ㅟ', name: '위', sound: '위', word: '위', meaningWord: 'up', meaningName: 'wi', group: 'compound', color: '#0EA5E9' },
  { char: 'ㅢ', name: '의', sound: '의', word: '의자', meaningWord: 'chair', meaningName: 'ui', group: 'compound', color: '#059669' },
];

// Series 2 (Sim 5 + Sim 6 + Sim 7-1 + Sim 7-2 = 31 Exact 1:1 Items!)
export const BATCHIM_SEEDS: ExtraChantSeed[] = [
  // Sim 5: 받침1 (7대 대표음 — 수박, 눈, 숟가락, 칼, 곰, 삽, 공)
  { char: '받침 ㄱ', line: '받침 ㄱ | 악, 박, 수박 | final [k] · watermelon', meaning: 'final [k] · watermelon', group: 'batchim1', color: '#16A34A', sceneKey: 'prop:🍉|수박' },
  { char: '받침 ㄴ', line: '받침 ㄴ | 안, 눈, 눈 | final [n] · snow', meaning: 'final [n] · snow', group: 'batchim1', color: '#0284C7', sceneKey: 'prop:⛄|눈' },
  { char: '받침 ㄷ', line: '받침 ㄷ | 앋, 숟, 숟가락 | final [t] · spoon', meaning: 'final [t] · spoon', group: 'batchim1', color: '#6366F1', sceneKey: 'prop:🥄|숟가락' },
  { char: '받침 ㄹ', line: '받침 ㄹ | 알, 칼, 칼 | final [l] · sword', meaning: 'final [l] · sword', group: 'batchim1', color: '#EAB308', sceneKey: '칼' },
  { char: '받침 ㅁ', line: '받침 ㅁ | 암, 곰, 곰 | final [m] · bear', meaning: 'final [m] · bear', group: 'batchim1', color: '#B45309', sceneKey: 'prop:🐻|곰' },
  { char: '받침 ㅂ', line: '받침 ㅂ | 압, 삽, 삽 | final [p] · shovel', meaning: 'final [p] · shovel', group: 'batchim1', color: '#EC4899', sceneKey: '삽' },
  { char: '받침 ㅇ', line: '받침 ㅇ | 앙, 공, 공 | final [ng] · bowling ball', meaning: 'final [ng] · bowling ball', group: 'batchim1', color: '#EF4444', sceneKey: 'prop:🎳|공' },

  // Sim 6: 받침2 (끝소리 3대장 변신 9종 — ㄱ: 부엌·밖 / ㄷ: 밭·옷·있다·낮·꽃·히읗 / ㅂ: 숲)
  { char: '부엌', line: '부엌 | 부, 억, [부억] | ㅋ→[k] · kitchen', meaning: 'ㅋ→[k] · kitchen', group: 'batchim2', color: '#0284C7', sceneKey: 'prop:🍳|[부억]' },
  { char: '밖', line: '밖 | 밖, 밖, [박] | ㄲ→[k] · outside', meaning: 'ㄲ→[k] · outside', group: 'batchim2', color: '#2563EB', sceneKey: 'prop:❄️|[박]' },
  { char: '밭', line: '밭 | 밭, 밭, [받] | ㅌ→[t] · field', meaning: 'ㅌ→[t] · field', group: 'batchim2', color: '#D97706', sceneKey: 'prop:🥬|[받]' },
  { char: '옷', line: '옷 | 옷, 옷, [옫] | ㅅ→[t] · clothes', meaning: 'ㅅ→[t] · clothes', group: 'batchim2', color: '#E11D48', sceneKey: 'prop:👕|[옫]' },
  { char: '있다', line: '있다 | 있, 다, [읻따] | ㅆ→[t] · exist', meaning: 'ㅆ→[t] · exist', group: 'batchim2', color: '#DC2626', sceneKey: 'prop:📦|[읻따]' },
  { char: '낮', line: '낮 | 낮, 낮, [낟] | ㅈ→[t] · daytime', meaning: 'ㅈ→[t] · daytime', group: 'batchim2', color: '#EA580C', sceneKey: 'prop:☀️|[낟]' },
  { char: '꽃', line: '꽃 | 꽃, 꽃, [꼳] | ㅊ→[t] · flower', meaning: 'ㅊ→[t] · flower', group: 'batchim2', color: '#DB2777', sceneKey: 'prop:🌸|[꼳]' },
  { char: '히읗', line: '히읗 | 히, 읃, [히읃] | ㅎ→[t] · hieut', meaning: 'ㅎ→[t] · hieut', group: 'batchim2', color: '#B91C1C', sceneKey: 'prop:🪞|[히읃]' },
  { char: '숲', line: '숲 | 숲, 숲, [숩] | ㅍ→[p] · forest', meaning: 'ㅍ→[p] · forest', group: 'batchim2', color: '#059669', sceneKey: 'prop:⛺|[숩]' },

  // Sim 7-1: 겹받침 앞자음 8종 (몫, 앉다, 많다, 여덟, 외곬, 핥다, 싫다, 없다)
  { char: '몫', line: '몫 | 몫, 몫, [목] | ㄳ→ㄱ · share', meaning: 'ㄳ→ㄱ · share', group: 'double_front', color: '#EA580C', sceneKey: 'prop:🍕|[목]' },
  { char: '앉다', line: '앉다 | 앉, 다, [안따] | ㄵ→ㄴ · sit', meaning: 'ㄵ→ㄴ · sit', group: 'double_front', color: '#D97706', sceneKey: 'prop:🪑|[안따]' },
  { char: '많다', line: '많다 | 많, 다, [만타] | ㄶ→ㄴ · many', meaning: 'ㄶ→ㄴ · many', group: 'double_front', color: '#2563EB', sceneKey: 'prop:🍦|[만타]' },
  { char: '여덟', line: '여덟 | 여, 덜, [여덜] | ㄼ→ㄹ · eight', meaning: 'ㄼ→ㄹ · eight', group: 'double_front', color: '#EC4899', sceneKey: 'prop:🥧|[여덜]' },
  { char: '외곬', line: '외곬 | 외, 골, [외골] | ㄽ→ㄹ · one-way', meaning: 'ㄽ→ㄹ · one-way', group: 'double_front', color: '#B91C1C', sceneKey: 'prop:🧱|[외골]' },
  { char: '핥다', line: '핥다 | 핥, 다, [할따] | ㄾ→ㄹ · lick', meaning: 'ㄾ→ㄹ · lick', group: 'double_front', color: '#D97706', sceneKey: 'prop:🐶|[할따]' },
  { char: '싫다', line: '싫다 | 싫, 다, [실타] | ㅀ→ㄹ · dislike', meaning: 'ㅀ→ㄹ · dislike', group: 'double_front', color: '#16A34A', sceneKey: 'prop:🥦|[실타]' },
  { char: '없다', line: '없다 | 없, 다, [업따] | ㅄ→ㅂ · none', meaning: 'ㅄ→ㅂ · none', group: 'double_front', color: '#4F46E5', sceneKey: 'prop:🕸️|[업따]' },

  // Sim 7-2: 겹받침 뒷자음 3종 + 예외 2종 + ㅎ규칙 2종 = 7종 (닭, 굶다, 읊다, 밟다, 읽고, 많아, 많고)
  { char: '닭', line: '닭 | 닭, 닭, [닥] | ㄺ→ㄱ · chicken', meaning: 'ㄺ→ㄱ · chicken', group: 'double_back', color: '#DC2626', sceneKey: 'prop:🐓|[닥]' },
  { char: '굶다', line: '굶다 | 굶, 다, [굼따] | ㄻ→ㅁ · starve', meaning: 'ㄻ→ㅁ · starve', group: 'double_back', color: '#0284C7', sceneKey: 'prop:🌀|[굼따]' },
  { char: '읊다', line: '읊다 | 읊, 다, [읍따] | ㄿ→ㅂ · recite', meaning: 'ㄿ→ㅂ · recite', group: 'double_back', color: '#EA580C', sceneKey: 'prop:🎤|[읍따]' },
  { char: '밟다', line: '밟다 | 밟, 다, [밥따] | EXCEPTION ㄼ→ㅂ · step', meaning: 'EXCEPTION ㄼ→ㅂ · step', group: 'double_back', color: '#DB2777', sceneKey: 'ㄸ' },
  { char: '읽고', line: '읽고 | 읽, 고, [일꼬] | EXCEPTION ㄺ+ㄱ→ㄹ · read', meaning: 'EXCEPTION ㄺ+ㄱ→ㄹ · read', group: 'double_back', color: '#059669', sceneKey: 'prop:📖|[일꼬]' },
  { char: '많아', line: '많아 | 많, 아, [마나] | ㅎ+vowel drop · many', meaning: 'ㅎ+vowel drop · many', group: 'double_back', color: '#0284C7', sceneKey: 'prop:👻|[마나]' },
  { char: '많고', line: '많고 | 많, 고, [만코] | ㅎ+ㄱ→ㅋ · many+and', meaning: 'ㅎ+ㄱ→ㅋ · many+and', group: 'double_back', color: '#B91C1C', sceneKey: 'prop:💣|[만코]' },
];

// Series 3 (Sim 8 + Sim 9 + Sim 10 + Sim 11 = 34 Exact 1:1 Items!)
export const PHONOLOGY_SEEDS: ExtraChantSeed[] = [
  // Sim 8: 변동1 (10종 — 먹어, 앉아, 축하, 좋다, 쓰+어, 가+아, 오+아, 주+어, 학교, 국밥)
  { char: '먹어', line: '먹어 | 먹, 어, [머거] | liaison · eat', meaning: 'liaison · eat', group: 'phonology1', color: '#0284C7', sceneKey: 'prop:😋|[머거]' },
  { char: '앉아', line: '앉아 | 앉, 아, [안자] | liaison · sit', meaning: 'liaison · sit', group: 'phonology1', color: '#0EA5E9', sceneKey: 'prop:🪑|[안자]' },
  { char: '축하', line: '축하 | 축, 하, [추카] | aspiration · congrats', meaning: 'aspiration · congrats', group: 'phonology1', color: '#EA580C', sceneKey: 'prop:🎉|[추카]' },
  { char: '좋다', line: '좋다 | 좋, 다, [조타] | aspiration · good', meaning: 'aspiration · good', group: 'phonology1', color: '#D97706', sceneKey: 'prop:👍|[조타]' },
  { char: '쓰+어', line: '쓰+어 | 쓰, 어, 써 | ㅡ-drop · write/use', meaning: 'ㅡ-drop · write/use', group: 'phonology1', color: '#059669', sceneKey: 'prop:✍️|써' },
  { char: '가+아', line: '가+아 | 가, 아, 가 | ㅏ-drop · go', meaning: 'ㅏ-drop · go', group: 'phonology1', color: '#10B981', sceneKey: 'ㄱ' },
  { char: '오+아', line: '오+아 | 오, 아, 와 | vowel merge · come', meaning: 'vowel merge · come', group: 'phonology1', color: '#DB2777', sceneKey: 'ㅘ' },
  { char: '주+어', line: '주+어 | 주, 어, 줘 | vowel merge · give', meaning: 'vowel merge · give', group: 'phonology1', color: '#9333EA', sceneKey: 'prop:🎁|줘' },
  { char: '학교', line: '학교 | 학, 교, [학꾜] | tensing · school', meaning: 'tensing · school', group: 'phonology1', color: '#6366F1', sceneKey: 'prop:🏫|[학꾜]' },
  { char: '국밥', line: '국밥 | 국, 밥, [국빱] | tensing · rice soup', meaning: 'tensing · rice soup', group: 'phonology1', color: '#7C3AED', sceneKey: 'prop:🍲|[국빱]' },

  // Sim 9: 변동2 (8종 — 국물, 입니다, 연락, 설날, 같이, 굳이, 좋아, 많아)
  { char: '국물', line: '국물 | 국, 물, [궁물] | nasal · broth', meaning: 'nasal · broth', group: 'phonology2', color: '#0D9488', sceneKey: 'prop:👃|[궁물]' },
  { char: '입니다', line: '입니다 | 입, 니, [임니다] | nasal · is/am/are', meaning: 'nasal · is/am/are', group: 'phonology2', color: '#0F766E', sceneKey: 'prop:📦|[임니다]' },
  { char: '연락', line: '연락 | 연, 락, [열락] | liquid · contact', meaning: 'liquid · contact', group: 'phonology2', color: '#0284C7', sceneKey: 'prop:📞|[열락]' },
  { char: '설날', line: '설날 | 설, 날, [설랄] | liquid · Lunar New Year', meaning: 'liquid · Lunar New Year', group: 'phonology2', color: '#0EA5E9', sceneKey: 'prop:🧧|[설랄]' },
  { char: '같이', line: '같이 | 같, 이, [가치] | palatal · together', meaning: 'palatal · together', group: 'phonology2', color: '#E11D48', sceneKey: 'ㅉ' },
  { char: '굳이', line: '굳이 | 굳, 이, [구지] | palatal · insistently', meaning: 'palatal · insistently', group: 'phonology2', color: '#F43F5E', sceneKey: 'prop:📸|[구지]' },
  { char: '좋아', line: '좋아 | 좋, 아, [조아] | ㅎ-drop · like/good', meaning: 'ㅎ-drop · like/good', group: 'phonology2', color: '#7C3AED', sceneKey: 'prop:🫧|[조아]' },
  { char: '많아', line: '많아 | 많, 아, [마나] | ㅎ-drop+liaison · many', meaning: 'ㅎ-drop+liaison · many', group: 'phonology2', color: '#9333EA', sceneKey: 'prop:🌟|[마나]' },

  // Sim 10: 불규칙 (8종 — 춥다, 듣다, 짓다, 부르다, 아프다, 파랗다, 만들다, 하다)
  { char: '춥다', line: '춥다 | 춥, 다, 추워요 | ㅂ-irreg · cold', meaning: 'ㅂ-irreg · cold', group: 'irregular', color: '#0284C7', sceneKey: 'prop:🥶|추워요' },
  { char: '듣다', line: '듣다 | 듣, 다, 들어요 | ㄷ-irreg · listen', meaning: 'ㄷ-irreg · listen', group: 'irregular', color: '#D97706', sceneKey: 'prop:🎧|들어요' },
  { char: '짓다', line: '짓다 | 짓, 다, 지어요 | ㅅ-irreg · build', meaning: 'ㅅ-irreg · build', group: 'irregular', color: '#059669', sceneKey: 'prop:🔨|지어요' },
  { char: '부르다', line: '부르다 | 부, 르, 불러요 | 르-irreg · call/sing', meaning: '르-irreg · call/sing', group: 'irregular', color: '#E11D48', sceneKey: 'prop:📢|불러요' },
  { char: '아프다', line: '아프다 | 아, 프, 아파요 | ㅡ-drop · hurt/sick', meaning: 'ㅡ-drop · hurt/sick', group: 'irregular', color: '#DC2626', sceneKey: 'prop:🩹|아파요' },
  { char: '파랗다', line: '파랗다 | 파, 랗, 파래요 | ㅎ-irreg · blue', meaning: 'ㅎ-irreg · blue', group: 'irregular', color: '#2563EB', sceneKey: 'prop:🎨|파래요' },
  { char: '만들다', line: '만들다 | 만, 들, 만드세요 | ㄹ-drop · make', meaning: 'ㄹ-drop · make', group: 'irregular', color: '#7C3AED', sceneKey: 'prop:🛠️|만드세요' },
  { char: '하다', line: '하다 | 하, 다, 해요 | 여-irreg · do', meaning: '여-irreg · do', group: 'irregular', color: '#EA580C', sceneKey: 'prop:⚡|해요' },

  // Sim 11: 첨가·사잇소리 (8종 — 콧물, 촛불, 깻잎, 한여름, 가다, 푸르다, 푸다, 녀자)
  { char: '콧물', line: '콧물 | 콧, 물, [콘물] | saitsori nasal · runny nose', meaning: 'saitsori nasal · runny nose', group: 'addition', color: '#E11D48', sceneKey: 'prop:🤧|[콘물]' },
  { char: '촛불', line: '촛불 | 촛, 불, [초뿔] | saitsori tense · candlelight', meaning: 'saitsori tense · candlelight', group: 'addition', color: '#EA580C', sceneKey: 'prop:🕯️|[초뿔]' },
  { char: '깻잎', line: '깻잎 | 깻, 잎, [깬닙] | ㄴ-insert · perilla leaf', meaning: 'ㄴ-insert · perilla leaf', group: 'addition', color: '#16A34A', sceneKey: 'prop:🌿|[깬닙]' },
  { char: '한여름', line: '한여름 | 한, 여, [한녀름] | ㄴ-insert · midsummer', meaning: 'ㄴ-insert · midsummer', group: 'addition', color: '#D97706', sceneKey: 'prop:☀️|[한녀름]' },
  { char: '가다', line: '가다 | 가, 다, 가거라 | 거라-irreg · Go!', meaning: '거라-irreg · Go!', group: 'addition', color: '#B45309', sceneKey: 'prop:📜|가거라' },
  { char: '푸르다', line: '푸르다 | 푸, 르, 푸르러 | 러-irreg · deep blue', meaning: '러-irreg · deep blue', group: 'addition', color: '#0284C7', sceneKey: 'prop:🌊|푸르러' },
  { char: '푸다', line: '푸다 | 푸, 다, 퍼 | 우-irreg · scoop', meaning: '우-irreg · scoop', group: 'addition', color: '#0EA5E9', sceneKey: 'prop:🥣|퍼' },
  { char: '녀자', line: '녀자 | 녀, 자, 여자 | initial-law · woman', meaning: 'initial-law · woman', group: 'addition', color: '#7C3AED', sceneKey: 'ㅞ' },
];

// Series 4 (Sim 12: 졸라조사맨 4부작 1:1 — 은/는, 이/가, 을/를, 와/과)
export const PARTICLE_V2_SEEDS: ExtraChantSeed[] = [
  { char: '은 / 는', line: '은 / 는 | 받침, 있네, 졸라맨은 / 남자, 예요, 남자예요 | EP.1 졸라맨은 남자예요', meaning: 'EP.1 졸라맨은 남자예요 (은/는)', group: 'particle_v2', color: '#2563EB', sceneKey: 'prop:💪|졸라맨은' },
  { char: '이 / 가', line: '이 / 가 | 괴물, 이, 괴물이 / 괴물, 이, 자요 | EP.2 괴물이 자요', meaning: 'EP.2 괴물이 자요 (이/가)', group: 'particle_v2', color: '#E11D48', sceneKey: 'prop:👾|괴물이' },
  { char: '을 / 를', line: '을 / 를 | 괴물, 을, 괴물을 / 괴물, 을, 차요 | EP.3 괴물을 차요', meaning: 'EP.3 괴물을 차요 (을/를)', group: 'particle_v2', color: '#059669', sceneKey: 'ㅌ' },
  { char: '와 / 과', line: '와 / 과 | 여자, 친구, 여자친구와 / 우리, 같이, 춤춰요 | EP.4 여자친구와 춤춰요', meaning: 'EP.4 여자친구와 춤춰요 (와/과)', group: 'particle_v2', color: '#7C3AED', sceneKey: 'ㅞ' },
];

// === PART 2: NEW Next Chant Series (Beyond Sim 1~12) ===

// Series 5 (NEW): 확장 조사 짝꿍 (장소·방향·시간·수단 8종)
export const PARTICLE_NEXT_SEEDS: ExtraChantSeed[] = [
  { char: '에 (도착)', line: '에 (도착) | 집, 에, 집에 가요 | to / at (에)', meaning: 'to / at (destination)', group: 'particle_ext', color: '#0EA5E9', sceneKey: 'prop:🏠|집에' },
  { char: '에서', line: '에서 | 공원, 에서, 뛰어요 | action at (에서)', meaning: 'action place (에서)', group: 'particle_ext', color: '#F97316', sceneKey: 'prop:🏞️|에서' },
  { char: '에게·한테', line: '에게·한테 | 친구, 한테, 줘요 | to someone (에게/한테)', meaning: 'to a person (한테)', group: 'particle_ext', color: '#EC4899', sceneKey: 'ㅉ' },
  { char: '로 (모음)', line: '로 (모음) | 버스, 로, 버스로 | by (no batchim → 로)', meaning: 'by (vowel → 로)', group: 'particle_ext', color: '#16A34A', sceneKey: 'prop:🚌|버스로' },
  { char: '으로', line: '으로 | 집, 으로, 집으로 | toward (batchim → 으로)', meaning: 'toward (batchim → 으로)', group: 'particle_ext', color: '#0284C7', sceneKey: 'prop:🧭|집으로' },
  { char: 'ㄹ + 로', line: 'ㄹ + 로 | 서울, 로, 서울로 | ㄹ-trap! takes 로', meaning: 'ㄹ-batchim trap → 로!', group: 'particle_ext', color: '#DC2626', sceneKey: 'prop:🚄|서울로' },
  { char: '부터~까지', line: '부터~까지 | 오늘, 부터, 내일까지 | from ~ until', meaning: 'from ~ until', group: 'particle_ext', color: '#7C3AED', sceneKey: 'prop:⏰|까지' },
  { char: '도 · 만', line: '도 · 만 | 나도, 너도, 우리만 | also(도) · only(만)', meaning: 'too(도) / only(만)', group: 'particle_ext', color: '#DB2777', sceneKey: 'ㅃ' },
];

// Series 8 (시뮬 16 · 조사 3): 심화 필수 조사 8종 (의·이랑·랑·아/야·한테서·보다·처럼·마다)
export const PARTICLE_TIER3_SEEDS: ExtraChantSeed[] = [
  { char: '의 (소유)', line: '의 (소유) | 졸라맨, 의, 졸라맨의 모자 | possessive (의)', meaning: "possessive ('s / of)", group: 'particle_tier3', color: '#2563EB', sceneKey: 'prop:🧢|모자' },
  { char: '이랑', line: '이랑 | 수박, 이랑, 수박이랑 우유 | batchim + 이랑 (and)', meaning: 'and/with (batchim → 이랑)', group: 'particle_tier3', color: '#059669', sceneKey: 'prop:🍉|수박' },
  { char: '랑', line: '랑 | 커피, 랑, 커피랑 케이크 | vowel + 랑 (and)', meaning: 'and/with (vowel → 랑)', group: 'particle_tier3', color: '#D97706', sceneKey: 'prop:☕|커피' },
  { char: '아 · 야', line: '아 · 야 | 괴물, 아, 괴물아 안녕 | hey! (아 / 야)', meaning: 'calling name (아 / 야)', group: 'particle_tier3', color: '#9333EA', sceneKey: 'prop:👾|괴물아' },
  { char: '한테서', line: '한테서 | 친구, 한테서, 받았어요 | from a person (한테서)', meaning: 'from someone (한테서)', group: 'particle_tier3', color: '#EC4899', sceneKey: 'prop:🎁|선물' },
  { char: '보다', line: '보다 | 거북이, 보다, 빨라요 | faster than (보다)', meaning: 'comparison (than · 보다)', group: 'particle_tier3', color: '#16A34A', sceneKey: 'prop:🐢|거북이' },
  { char: '처럼', line: '처럼 | 번개, 처럼, 빨라요 | like lightning (처럼)', meaning: 'simile (like · 처럼)', group: 'particle_tier3', color: '#EAB308', sceneKey: 'ㅂ' },
  { char: '마다', line: '마다 | 아침, 마다, 운동해요 | every morning (마다)', meaning: 'every / each (마다)', group: 'particle_tier3', color: '#DC2626', sceneKey: 'prop:☀️|아침마다' },
];

// Series 6 (NEW): 왕초보 필수 동사 + 생존 회화 (16종)
export const DAILY_VERB_PHRASE_SEEDS: ExtraChantSeed[] = [
  // Essential Verbs (8)
  { char: '가다', line: '가다 | 가다, 가다, 가요 | go', meaning: 'go', group: 'daily_verb', color: '#EF4444', sceneKey: 'ㄱ' },
  { char: '오다', line: '오다 | 오다, 오다, 와요 | come', meaning: 'come', group: 'daily_verb', color: '#F97316', sceneKey: 'prop:👋|와요' },
  { char: '먹다', line: '먹다 | 먹다, 먹다, 먹어요 | eat', meaning: 'eat', group: 'daily_verb', color: '#EAB308', sceneKey: 'prop:🍜|먹어요' },
  { char: '마시다', line: '마시다 | 마시, 다, 마셔요 | drink', meaning: 'drink', group: 'daily_verb', color: '#06B6D4', sceneKey: 'prop:🥤|마셔요' },
  { char: '자다', line: '자다 | 자다, 자다, 자요 | sleep', meaning: 'sleep', group: 'daily_verb', color: '#6366F1', sceneKey: 'prop:😴|자요' },
  { char: '보다', line: '보다 | 보다, 보다, 봐요 | watch / see', meaning: 'watch / see', group: 'daily_verb', color: '#8B5CF6', sceneKey: 'prop:👀|봐요' },
  { char: '주다', line: '주다 | 주다, 주다, 주세요 | please give', meaning: 'please give me', group: 'daily_verb', color: '#10B981', sceneKey: 'prop:🎁|주세요' },
  { char: '좋아하다', line: '좋아하다 | 좋아, 해, 좋아해요 | like', meaning: 'like', group: 'daily_verb', color: '#EC4899', sceneKey: 'ㅃ' },

  // Survival Phrases (8)
  { char: '안녕', line: '안녕 | 안, 녕, 안녕하세요 | hello (polite)', meaning: 'hello (polite)', group: 'daily_phrase', color: '#0EA5E9', sceneKey: 'prop:👋|안녕' },
  { char: '감사', line: '감사 | 감, 사, 감사합니다 | thank you', meaning: 'thank you', group: 'daily_phrase', color: '#22C55E', sceneKey: 'prop:🙇|감사!' },
  { char: '죄송', line: '죄송 | 죄, 송, 죄송해요 | sorry', meaning: 'I am sorry', group: 'daily_phrase', color: '#64748B', sceneKey: 'prop:🙏|죄송해요' },
  { char: '괜찮아', line: '괜찮아 | 괜, 찮, 괜찮아요 | it is okay', meaning: "it's okay / fine", group: 'daily_phrase', color: '#059669', sceneKey: 'prop:👌|괜찮아요' },
  { char: '얼마', line: '얼마 | 얼, 마, 얼마예요? | how much?', meaning: 'how much is it?', group: 'daily_phrase', color: '#D97706', sceneKey: 'prop:💰|얼마예요?' },
  { char: '맛있어', line: '맛있어 | 맛, 있, 맛있어요 | delicious!', meaning: 'delicious!', group: 'daily_phrase', color: '#E11D48', sceneKey: 'prop:😋|맛있어요' },
  { char: '배고파', line: '배고파 | 배, 고, 배고파요 | hungry!', meaning: "I'm hungry!", group: 'daily_phrase', color: '#EA580C', sceneKey: 'prop:🍔|배고파요' },
  { char: '사랑해', line: '사랑해 | 사, 랑, 사랑해요 | I love you', meaning: 'I love you ❤️', group: 'daily_phrase', color: '#F43F5E', sceneKey: 'prop:❤️|사랑해요' },
];

// Series 7 (NEW): 실전 K-패턴 · 시제·존댓말 · 숫자·요일 (12종)
export const TENSE_HONORIFIC_SEEDS: ExtraChantSeed[] = [
  // Essential K-Patterns (6)
  { char: '과거 았/었', line: '과거 았/었 | 먹, 었, 먹었어요 / 갔, 어, 갔어요 | past tense (ate / went)', meaning: 'past tense (ate / went)', group: 'pattern_honorific', color: '#2563EB', sceneKey: 'prop:⏮️|갔어요' },
  { char: '미래 ㄹ래요', line: '미래 ㄹ래요 | 갈, 래, 갈래요 / 먹, 을, 먹을래요 | will / wanna', meaning: 'want to / will', group: 'pattern_honorific', color: '#0EA5E9', sceneKey: 'ㄹ' },
  { char: '-고 싶다', line: '-고 싶다 | 가, 고, 가고 싶어요 / 보, 고, 보고 싶어요 | want to / miss you', meaning: 'want to / miss you', group: 'pattern_honorific', color: '#EC4899', sceneKey: 'prop:💭|싶어요' },
  { char: '-지 마', line: '-지 마 | 울, 지, 울지 마요 / 가, 지, 가지 마요 | please don’t!', meaning: "please don't!", group: 'pattern_honorific', color: '#DC2626', sceneKey: 'prop:🙅|가지 마' },
  { char: '안 (부정)', line: '안 (부정) | 안, 가, 안 가요 / 안, 먹, 안 먹어요 | not (negation)', meaning: "don't (안 + verb)", group: 'pattern_honorific', color: '#7C3AED', sceneKey: 'prop:🚫|안 가요' },
  { char: '-(으)세요', line: '-(으)세요 | 오, 세, 오세요 / 앉, 으, 앉으세요 | polite please!', meaning: 'polite honorific', group: 'pattern_honorific', color: '#059669', sceneKey: 'prop:🙇|오세요' },

  // Numbers & Days (6)
  { char: '하나·둘·셋', line: '하나·둘·셋 | 하, 나, 하나! / 둘, 셋, 둘! 셋! | native 1-2-3', meaning: '1 하나 · 2 둘 · 3 셋', group: 'pattern_count_day', color: '#F97316', sceneKey: 'prop:✌️|하나둘셋' },
  { char: '넷·다섯·여섯', line: '넷·다섯·여섯 | 넷, 다, 다섯! / 여, 섯, 여섯! | native 4-5-6', meaning: '4 넷 · 5 다섯 · 6 여섯', group: 'pattern_count_day', color: '#EAB308', sceneKey: 'prop:🖐️|넷다섯여섯' },
  { char: '일·이·삼', line: '일·이·삼 | 일, 이, 삼! / 사, 오, 육! | sino 1~6 (date/money)', meaning: '1 일 · 2 이 · 3 삼', group: 'pattern_count_day', color: '#16A34A', sceneKey: 'prop:🔢|일이삼' },
  { char: '월·화·수', line: '월·화·수 | 월, 화, 수요일! | Mon · Tue · Wed', meaning: '월(Mon)·화(Tue)·수(Wed)', group: 'pattern_count_day', color: '#0284C7', sceneKey: 'prop:📅|월화수' },
  { char: '목·금·토·일', line: '목·금·토·일 | 목, 금, 토요일! / 일, 요, 일요일! | Thu · Fri · Sat · Sun', meaning: '목·금·토·일요일', group: 'pattern_count_day', color: '#DB2777', sceneKey: 'prop:🗓️|불금주말' },
  { char: '어제·오늘', line: '어제·오늘 | 어, 제, 어제 / 오, 늘, 내일 | yesterday·today·tomorrow', meaning: '어제·오늘·내일', group: 'pattern_count_day', color: '#9333EA', sceneKey: 'prop:⏳|오늘내일' },
];

const HANGUL_SEED_BY_CHAR = new Map(HANGUL_40_SEEDS.map((s) => [s.char, s]));

const SEEDS_BY_PRESET: Partial<Record<ChantPresetId, Map<string, ExtraChantSeed>>> = {
  batchim_chant: new Map(BATCHIM_SEEDS.map((s) => [s.char, s])),
  phonology_chant: new Map(PHONOLOGY_SEEDS.map((s) => [s.char, s])),
  particles_chant: new Map(PARTICLE_V2_SEEDS.map((s) => [s.char, s])),
  particles_next_chant: new Map(PARTICLE_NEXT_SEEDS.map((s) => [s.char, s])),
  particles_tier3_chant: new Map(PARTICLE_TIER3_SEEDS.map((s) => [s.char, s])),
  daily_verbs_phrases: new Map(DAILY_VERB_PHRASE_SEEDS.map((s) => [s.char, s])),
  tense_honorific_chant: new Map(TENSE_HONORIFIC_SEEDS.map((s) => [s.char, s])),
};

const ALL_EXTRA_SEED_BY_CHAR = new Map<string, ExtraChantSeed>(
  [
    ...BATCHIM_SEEDS,
    ...PHONOLOGY_SEEDS,
    ...PARTICLE_V2_SEEDS,
    ...PARTICLE_NEXT_SEEDS,
    ...PARTICLE_TIER3_SEEDS,
    ...DAILY_VERB_PHRASE_SEEDS,
    ...TENSE_HONORIFIC_SEEDS,
  ].map((s) => [s.char, s])
);

const CUSTOM_PALETTE = ['#E11D48', '#2563EB', '#059669', '#D97706', '#7C3AED', '#0891B2'];

export function buildPresetText(presetId: ChantPresetId): string {
  if (presetId === 'batchim_chant') return BATCHIM_SEEDS.map((s) => s.line).join('\n');
  if (presetId === 'phonology_chant') return PHONOLOGY_SEEDS.map((s) => s.line).join('\n');
  if (presetId === 'particles_chant') return PARTICLE_V2_SEEDS.map((s) => s.line).join('\n');
  if (presetId === 'particles_next_chant') return PARTICLE_NEXT_SEEDS.map((s) => s.line).join('\n');
  if (presetId === 'particles_tier3_chant') return PARTICLE_TIER3_SEEDS.map((s) => s.line).join('\n');
  if (presetId === 'daily_verbs_phrases') return DAILY_VERB_PHRASE_SEEDS.map((s) => s.line).join('\n');
  if (presetId === 'tense_honorific_chant') return TENSE_HONORIFIC_SEEDS.map((s) => s.line).join('\n');

  return HANGUL_40_SEEDS.map((s) => {
    if (presetId === 'hangul40_names') {
      return `${s.char} | ${s.sound}, ${s.sound}, ${s.name} | ${s.meaningName}`;
    }
    if (presetId === 'hangul40_words') {
      return `${s.char} | ${s.sound}, ${s.sound}, ${s.word} | ${s.meaningWord}`;
    }
    return `${s.char} | ${s.sound}, ${s.sound}, ${s.name} / ${s.sound}, ${s.sound}, ${s.word} | ${s.meaningWord}`;
  }).join('\n');
}

function parseSinglePhrase(raw: string, fallbackMain: string): ChantPhrase {
  const parts = raw
    .split(',')
    .map((p) => p.trim())
    .filter(Boolean);

  if (parts.length === 0) {
    return {
      beats: [fallbackMain, fallbackMain, fallbackMain],
      rawText: `${fallbackMain}, ${fallbackMain}, ${fallbackMain}`,
    };
  }
  if (parts.length === 1) {
    return {
      beats: [parts[0], parts[0], parts[0]],
      rawText: `${parts[0]}, ${parts[0]}, ${parts[0]}`,
    };
  }
  if (parts.length === 2) {
    return {
      beats: [parts[0], parts[0], parts[1]],
      rawText: `${parts[0]}, ${parts[0]}, ${parts[1]}`,
    };
  }
  return {
    beats: [parts[0], parts[1], parts[2]],
    rawText: `${parts[0]}, ${parts[1]}, ${parts[2]}`,
  };
}

/**
 * Parses lines with simplified 3-column syntax:
 *   글자 | 1박, 2박, 3박 | 뜻
 * or 2-stage:
 *   글자 | 1박, 2박, 3박 / 1박, 2박, 3박 | 뜻
 */
export function parseChantLines(rawText: string, presetId?: ChantPresetId): ChantItem[] {
  const lines = rawText
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0 && !l.startsWith('#'));

  const seenIds = new Map<string, number>();
  const scopedMap = presetId ? SEEDS_BY_PRESET[presetId] : undefined;

  return lines.map((line, idx) => {
    const cols = line.split('|').map((c) => c.trim());
    const mainChar = cols[0] || `항목${idx + 1}`;
    const bodyCol = cols[1] || `${mainChar}, ${mainChar}, ${mainChar}`;
    const meaning = cols[2] ?? '';

    const rawPhrases = bodyCol
      .split('/')
      .map((s) => s.trim())
      .filter(Boolean);

    const phrases = (rawPhrases.length > 0 ? rawPhrases : [bodyCol])
      .slice(0, 2)
      .map((p) => parseSinglePhrase(p, mainChar));

    const hangulSeed = HANGUL_SEED_BY_CHAR.get(mainChar);
    const extraSeed = scopedMap?.get(mainChar) ?? ALL_EXTRA_SEED_BY_CHAR.get(mainChar);

    const count = (seenIds.get(mainChar) ?? 0) + 1;
    seenIds.set(mainChar, count);
    const id = count === 1 ? mainChar : `${mainChar}_${count}`;

    // Prefer exact preset match first so shared chars (e.g. '가다') stay scoped to their series
    const resolvedSeed =
      presetId && (presetId === 'hangul40_combo' || presetId === 'hangul40_names' || presetId === 'hangul40_words')
        ? hangulSeed
        : extraSeed ?? hangulSeed;

    const meaningFallback =
      hangulSeed && resolvedSeed === hangulSeed
        ? hangulSeed.meaningWord
        : (extraSeed?.meaning ?? romanizeKorean(mainChar));

    const sceneFallback =
      hangulSeed && resolvedSeed === hangulSeed
        ? hangulSeed.char
        : (extraSeed?.sceneKey ?? mainChar);

    return {
      id,
      mainChar,
      phrases,
      meaning: meaning || meaningFallback,
      group: resolvedSeed?.group ?? 'custom',
      color: resolvedSeed?.color ?? CUSTOM_PALETTE[idx % CUSTOM_PALETTE.length],
      sceneKey: sceneFallback,
    };
  });
}
