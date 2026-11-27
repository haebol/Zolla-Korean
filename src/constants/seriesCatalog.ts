import { ChantHangulGroup, ChantPresetId } from '../utils/chantPresets';

export type MainCategory = 'all' | 'jamo' | 'batchim' | 'phonology' | 'particles';
export type AppMode = 'theater' | 'chant' | 'teacher';
export type TeacherSubTab = 'admin' | 'shorts' | 'chantStudio';

export type SeriesId =
  | 'consonants'
  | 'vowels'
  | 'advanced'
  | 'compound'
  | 'batchim'
  | 'batchim2'
  | 'doubleBatchim1'
  | 'doubleBatchim2'
  | 'phonology'
  | 'phonology2'
  | 'irregular'
  | 'addition'
  | 'particleV2'
  | 'particleExt'
  | 'particle3'
  | 'dailyLife'
  | 'kPattern';

export interface SeriesMeta {
  id: SeriesId;
  category: Exclude<MainCategory, 'all'>;
  label: string;
  mobileLabel: string;
  theaterTitle: string;
  chantTitle: string;
  chantPresetId: ChantPresetId;
  chantGroup: ChantHangulGroup | 'all';
}

export const SERIES_CATALOG: SeriesMeta[] = [
  {
    id: 'consonants',
    category: 'jamo',
    label: '기본자음',
    mobileLabel: '자음',
    theaterTitle: '1. 졸라자음맨',
    chantTitle: '1. 기본자음 챈트송',
    chantPresetId: 'hangul40_combo',
    chantGroup: 'consonant',
  },
  {
    id: 'vowels',
    category: 'jamo',
    label: '기본모음',
    mobileLabel: '모음',
    theaterTitle: '2. 졸라모음맨',
    chantTitle: '2. 기본모음 챈트송',
    chantPresetId: 'hangul40_combo',
    chantGroup: 'vowel',
  },
  {
    id: 'advanced',
    category: 'jamo',
    label: '쌍자음',
    mobileLabel: '쌍자음',
    theaterTitle: '3. 졸라쌍자음맨',
    chantTitle: '3. 쌍자음 챈트송',
    chantPresetId: 'hangul40_combo',
    chantGroup: 'double',
  },
  {
    id: 'compound',
    category: 'jamo',
    label: '복합모음',
    mobileLabel: '복합',
    theaterTitle: '4. 졸라복합모음맨',
    chantTitle: '4. 복합모음 챈트송',
    chantPresetId: 'hangul40_combo',
    chantGroup: 'compound',
  },
  {
    id: 'batchim',
    category: 'batchim',
    label: '받침 1',
    mobileLabel: '받침1',
    theaterTitle: '5. 졸라받침맨 1',
    chantTitle: '5. 받침 1 챈트송',
    chantPresetId: 'batchim_chant',
    chantGroup: 'batchim1',
  },
  {
    id: 'batchim2',
    category: 'batchim',
    label: '받침 2',
    mobileLabel: '받침2',
    theaterTitle: '6. 졸라받침맨 2',
    chantTitle: '6. 받침 2 챈트송',
    chantPresetId: 'batchim_chant',
    chantGroup: 'batchim2',
  },
  {
    id: 'doubleBatchim1',
    category: 'batchim',
    label: '겹자음 1',
    mobileLabel: '겹자음1',
    theaterTitle: '7-1. 졸라겹자음맨 1',
    chantTitle: '7-1. 겹자음 1 챈트송',
    chantPresetId: 'batchim_chant',
    chantGroup: 'double_front',
  },
  {
    id: 'doubleBatchim2',
    category: 'batchim',
    label: '겹자음 2',
    mobileLabel: '겹자음2',
    theaterTitle: '7-2. 졸라겹자음맨 2',
    chantTitle: '7-2. 겹자음 2 챈트송',
    chantPresetId: 'batchim_chant',
    chantGroup: 'double_back',
  },
  {
    id: 'phonology',
    category: 'phonology',
    label: '변동 1',
    mobileLabel: '변동1',
    theaterTitle: '8. 졸라음운변동맨 1',
    chantTitle: '8. 음운변동 1 챈트송',
    chantPresetId: 'phonology_chant',
    chantGroup: 'phonology1',
  },
  {
    id: 'phonology2',
    category: 'phonology',
    label: '변동 2',
    mobileLabel: '변동2',
    theaterTitle: '9. 졸라음운변동맨 2',
    chantTitle: '9. 음운변동 2 챈트송',
    chantPresetId: 'phonology_chant',
    chantGroup: 'phonology2',
  },
  {
    id: 'irregular',
    category: 'phonology',
    label: '불규칙',
    mobileLabel: '불규칙',
    theaterTitle: '10. 졸라불규칙맨',
    chantTitle: '10. 불규칙 챈트송',
    chantPresetId: 'phonology_chant',
    chantGroup: 'irregular',
  },
  {
    id: 'addition',
    category: 'phonology',
    label: '첨가',
    mobileLabel: '첨가',
    theaterTitle: '11. 졸라첨가·사잇소리맨',
    chantTitle: '11. 첨가·사잇소리 챈트송',
    chantPresetId: 'phonology_chant',
    chantGroup: 'addition',
  },
  {
    id: 'particleV2',
    category: 'particles',
    label: '조사 4',
    mobileLabel: '조사',
    theaterTitle: '12. 졸라조사맨',
    chantTitle: '12. 조사 4부작 챈트송',
    chantPresetId: 'particles_chant',
    chantGroup: 'all',
  },
  {
    id: 'particleExt',
    category: 'particles',
    label: '확장 8',
    mobileLabel: '확장',
    theaterTitle: '13. 졸라확장조사맨',
    chantTitle: '13. 확장 조사 챈트송',
    chantPresetId: 'particles_next_chant',
    chantGroup: 'all',
  },
  {
    id: 'particle3',
    category: 'particles',
    label: '조사 3',
    mobileLabel: '조사3',
    theaterTitle: '16. 졸라심화조사맨',
    chantTitle: '16. 조사 3 챈트송',
    chantPresetId: 'particles_tier3_chant',
    chantGroup: 'all',
  },
  {
    id: 'dailyLife',
    category: 'particles',
    label: '회화 16',
    mobileLabel: '회화',
    theaterTitle: '14. 졸라필수동사·회화맨',
    chantTitle: '14. 필수동사·생존회화 챈트송',
    chantPresetId: 'daily_verbs_phrases',
    chantGroup: 'all',
  },
  {
    id: 'kPattern',
    category: 'particles',
    label: 'K패턴',
    mobileLabel: '패턴',
    theaterTitle: '15. 졸라K패턴·숫자·요일맨',
    chantTitle: '15. K패턴·숫자·요일 챈트송',
    chantPresetId: 'tense_honorific_chant',
    chantGroup: 'all',
  },
];

export const PUBLIC_CATEGORIES: ReadonlySet<MainCategory> = new Set<MainCategory>([
  'all',
  'jamo',
]);

export const PUBLIC_SERIES_IDS: ReadonlySet<SeriesId> = new Set<SeriesId>([
  'consonants',
  'vowels',
  'advanced',
  'compound',
]);

export function isCategoryPublic(category: MainCategory): boolean {
  return PUBLIC_CATEGORIES.has(category);
}

export function isSeriesPublic(id: SeriesId): boolean {
  return PUBLIC_SERIES_IDS.has(id);
}

export function getSeriesById(id: SeriesId): SeriesMeta {
  return SERIES_CATALOG.find((s) => s.id === id) ?? SERIES_CATALOG[0];
}

export function getSeriesByCategory(category: MainCategory): SeriesMeta[] {
  if (category === 'all') return SERIES_CATALOG;
  return SERIES_CATALOG.filter((s) => s.category === category);
}

