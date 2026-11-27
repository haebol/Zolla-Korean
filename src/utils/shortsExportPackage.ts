// Speed-Synced Timeline Estimator + 8-Language .SRT Generator + YouTube Upload Package Builder

import { ChantStudioMeta, StudioCatalogItem } from '../context/ShortsStudioContext';
import { translateBadgeToEnglish } from './koreanRomanizer';

export type ExportLangCode = 'ko' | 'en' | 'vi' | 'bn' | 'zh' | 'ru' | 'ja' | 'mn';

export interface ExportLanguageMeta {
  code: ExportLangCode;
  flag: string;
  label: string;
  nativeName: string;
}

// Confirmed 8-Language Set: 한국어, 영어, 베트남어, 벵골어, 중국어, 러시아어, 일본어, 몽골어
export const EXPORT_LANGUAGES: ExportLanguageMeta[] = [
  { code: 'ko', flag: '🇰🇷', label: '한국어', nativeName: '한국어' },
  { code: 'en', flag: '🇺🇸', label: '영어', nativeName: 'English' },
  { code: 'vi', flag: '🇻🇳', label: '베트남어', nativeName: 'Tiếng Việt' },
  { code: 'bn', flag: '🇧🇩', label: '벵골어', nativeName: 'বাংলা' },
  { code: 'zh', flag: '🇨🇳', label: '중국어', nativeName: '中文' },
  { code: 'ru', flag: '🇷🇺', label: '러시아어', nativeName: 'Русский' },
  { code: 'ja', flag: '🇯🇵', label: '일본어', nativeName: '日本語' },
  { code: 'mn', flag: '🇲🇳', label: '몽골어', nativeName: 'Монгол' },
];

export interface TimelineSegment {
  index: number;
  item: StudioCatalogItem;
  startSec: number;
  cue1End: number;
  cue2End: number;
  endSec: number;
}

export interface TimelinePlan {
  segments: TimelineSegment[];
  hasCelebration: boolean;
  celebrationStartSec: number;
  totalDurationSec: number;
}

export interface TimelineTimingParams {
  seriesNum: number;
  playbackSpeed: number;
  quickCutMode: boolean;
  aftermathHoldSec: number;
  revealHoldSec: number;
  chantMeta?: ChantStudioMeta;
}

/**
 * Computes exact speed-synced timeline segments and total estimated seconds
 * across standard (Series 1~11), Particle V2 (Series 12), and Rhythm Chant (Series 99) engines.
 */
export function buildSpeedSyncedTimeline(
  selectedItems: StudioCatalogItem[],
  params: TimelineTimingParams
): TimelinePlan {
  const speed = Math.max(0.25, params.playbackSpeed);
  const segments: TimelineSegment[] = [];
  let cursor = 0;

  if (params.seriesNum === 99) {
    const bpm = params.chantMeta?.bpm ?? 100;
    const repeats = params.chantMeta?.repeats ?? 2;
    const effectiveBpm = Math.max(40, bpm * speed);
    const barSec = (60 / effectiveBpm) * 4;

    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      const phraseCount = Math.max(
        1,
        params.chantMeta?.phraseByKey[item.key]?.phrases?.length ?? 1
      );
      const itemDur = barSec * 2 * phraseCount * repeats;
      const startSec = cursor;
      // Split roughly: Call bar -> Response bar (using full cycle as cue window or exact half)
      const cue1End = startSec + itemDur * 0.5;
      const cue2End = startSec + itemDur * 0.75;
      const endSec = startSec + itemDur;
      segments.push({ index: i, item, startSec, cue1End, cue2End, endSec });
      cursor = endSec;
    }

    return {
      segments,
      hasCelebration: false,
      celebrationStartSec: cursor,
      totalDurationSec: cursor,
    };
  }

  if (params.seriesNum === 12) {
    // Jollaman Particle V2 beat timings (wrong slapstick + lesson + right kick + rescue)
    for (let i = 0; i < selectedItems.length; i++) {
      const item = selectedItems[i];
      const hasRightTimeCard = item.key !== 'eun-neun';
      const wrongActionDur = item.key === 'eun-neun' ? 3.9 : 3.6;

      // Hook / wrong choice path + combine lesson + right choice path
      const hookPart = (1.85 + 1.6 + 1.2) / speed;
      const actionPart = (wrongActionDur + 3.5) / speed;
      const revealPart = (1.85 + 1.45 + (hasRightTimeCard ? 1.1 : 0) + 2.15 + 2.8) / speed;

      const startSec = cursor;
      const cue1End = startSec + hookPart;
      const cue2End = cue1End + actionPart;
      const endSec = cue2End + revealPart;
      segments.push({ index: i, item, startSec, cue1End, cue2End, endSec });
      cursor = endSec;
    }

    return {
      segments,
      hasCelebration: false,
      celebrationStartSec: cursor,
      totalDurationSec: cursor,
    };
  }

  // Series 1~11 Standard Stage Engine
  const approachDur = (params.quickCutMode ? Math.min(0.85, 0.42) : 0.85) / speed;
  for (let i = 0; i < selectedItems.length; i++) {
    const item = selectedItems[i];
    const actionDur = (item.actionSec || 2.1) / speed;
    const aftermathDur = params.aftermathHoldSec; // aftermath runs on real-time rawDt in engine
    const revealDur = params.revealHoldSec;

    const startSec = cursor;
    const cue1End = startSec + approachDur + actionDur * 0.45;
    const cue2End = startSec + approachDur + actionDur + aftermathDur;
    const endSec = cue2End + revealDur;

    segments.push({ index: i, item, startSec, cue1End, cue2End, endSec });
    cursor = endSec;
  }

  return {
    segments,
    hasCelebration: false,
    celebrationStartSec: cursor,
    totalDurationSec: cursor,
  };
}

function formatSrtTimestamp(sec: number): string {
  const safe = Math.max(0, sec);
  const totalMs = Math.round(safe * 1000);
  const ms = totalMs % 1000;
  const totalSec = Math.floor(totalMs / 1000);
  const s = totalSec % 60;
  const totalMin = Math.floor(totalSec / 60);
  const m = totalMin % 60;
  const h = Math.floor(totalMin / 60);
  const pad = (n: number, len = 2) => String(n).padStart(len, '0');
  return `${pad(h)}:${pad(m)}:${pad(s)},${pad(ms, 3)}`;
}

export function formatChapterTimestamp(sec: number): string {
  const totalSec = Math.max(0, Math.floor(sec));
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// Particle V2 Episode Multilingual Scripts
const V2_EP_LINES: Record<
  string,
  Record<ExportLangCode, { hook: string; rule: string; answer: string }>
> = {
  'eun-neun': {
    ko: {
      hook: '졸라맨 □ 남자예요. 은 vs 는, 무엇을 고를까?',
      rule: '오답 "는"! 받침 ㄴ 뒤에는 [은]이 와야 해요!',
      answer: '정답: 졸라맨은 남자예요! (상남자 플렉스 성공!)',
    },
    en: {
      hook: 'Jollaman □ a man. Which particle: 은 or 는?',
      rule: 'Wrong pick "는"! Batchim ㄴ takes [은]!',
      answer: 'Answer: 졸라맨은 남자예요! (With final consonant → 은)',
    },
    vi: {
      hook: 'Jollaman □ đàn ông. Chọn 은 hay 는?',
      rule: 'Sai rồi "는"! Có phụ âm cuối (받침 ㄴ) phải dùng [은]!',
      answer: 'Đáp án: 졸라맨은 남자예요! (졸라맨 + 은)',
    },
    bn: {
      hook: 'জোল্লাম্যান □ একজন পুরুষ। কোনটি হবে: 은 নাকি 는?',
      rule: 'ভুল "는"! বাচ্চিম ㄴ-এর পরে [은] বসে!',
      answer: 'সঠিক উত্তর: 졸라맨은 남자예요! (ব্যঞ্জনবর্ণ শেষ → 은)',
    },
    zh: {
      hook: '火柴人 □ 男人。选 은 还是 는？',
      rule: '选错“는”啦！有韵尾(받침 ㄴ)后面要接 [은]！',
      answer: '正确答案：졸라맨은 남자예요！（有收音接 은）',
    },
    ru: {
      hook: 'Джолламэн □ мужчина. Выбираем 은 или 는?',
      rule: 'Ошибка «는»! После патчима ㄴ ставится [은]!',
      answer: 'Ответ: 졸라맨은 남자예요! (После согласной → 은)',
    },
    ja: {
      hook: 'ゾラマン □ 男です。은 と 는、どっち？',
      rule: '不正解「는」！パッチム ㄴ の後ろには [은] が来ます！',
      answer: '正解：졸라맨은 남자예요！（パッチムあり → 은）',
    },
    mn: {
      hook: 'Жолламэн □ эрэгтэй. 은 эсвэл 는 алиныг сонгох вэ?',
      rule: 'Буруу "는"! Патчим ㄴ-ийн ард [은] ордог!',
      answer: 'Зөв хариулт: 졸라맨은 남자예요! (Дэвсгэр үсэгтэй → 은)',
    },
  },
  'i-ga': {
    ko: {
      hook: '괴물 □ 자요. 이 vs 가, 무엇이 정답일까?',
      rule: '사자후 참교육! 받침 ㄹ 뒤에는 [이]가 붙어요!',
      answer: '정답: 괴물이 자요! (까치발 살금살금 탈출!)',
    },
    en: {
      hook: 'The monster □ sleeping. Subject particle: 이 or 가?',
      rule: 'Megaphone blast! Batchim ㄹ takes [이]!',
      answer: 'Answer: 괴물이 자요! (Final consonant → 이)',
    },
    vi: {
      hook: 'Quái vật □ đang ngủ. Dùng 이 hay 가?',
      rule: 'Tiếng hét siêu to! Có 받침 ㄹ phải dùng [이]!',
      answer: 'Đáp án: 괴물이 자요! (Có phụ âm cuối → 이)',
    },
    bn: {
      hook: 'দৈত্য □ ঘুমাচ্ছে। কোনটি হবে: 이 নাকি 가?',
      rule: 'মেগাফোন চিৎকার! বাচ্চিম ㄹ-এর পরে [이] বসে!',
      answer: 'সঠিক উত্তর: 괴물이 자요! (বাচ্চিম থাকলে → 이)',
    },
    zh: {
      hook: '怪物 □ 在睡觉。用 이 还是 가？',
      rule: '大喇叭吼叫！有韵尾 ㄹ 后面要接 [이]！',
      answer: '正确答案：괴물이 자요！（有收音 → 이）',
    },
    ru: {
      hook: 'Монстр □ спит. Частица 이 или 가?',
      rule: 'Рёв в мегафон! После патчима ㄹ нужна [이]!',
      answer: 'Ответ: 괴물이 자요! (Есть патчим → 이)',
    },
    ja: {
      hook: 'モンスター □ 寝ています。이 と 가、どっち？',
      rule: 'メガホン爆音！パッチム ㄹ の後ろには [이]！',
      answer: '正解：괴물이 자요！（パッチムあり → 이）',
    },
    mn: {
      hook: 'Мангас □ унтаж байна. 이 эсвэл 가 уу?',
      rule: 'Мегафоны хашгираан! Патчим ㄹ-ийн ард [이]!',
      answer: 'Зөв хариулт: 괴물이 자요! (Дэвсгэр үсэгтэй → 이)',
    },
  },
  'eul-reul': {
    ko: {
      hook: '괴물 □ 차요. 을 vs 를, 올바른 목적격 조사는?',
      rule: '배 트램펄린 반사! 받침 ㄹ 뒤에는 [을]을 결합해요!',
      answer: '정답: 괴물을 차요! (더블 킥 & 하이파이브!)',
    },
    en: {
      hook: 'Kick □ monster. Object particle: 을 or 를?',
      rule: 'Belly trampoline bounce! Batchim ㄹ takes [을]!',
      answer: 'Answer: 괴물을 차요! (Final consonant → 을)',
    },
    vi: {
      hook: 'Đá □ quái vật. Chọn 을 hay 를?',
      rule: 'Bụng nảy như bạt lò xo! Có 받침 ㄹ phải dùng [을]!',
      answer: 'Đáp án: 괴물을 차요! (Có phụ âm cuối → 을)',
    },
    bn: {
      hook: 'দৈত্য □ লাথি মারো। কোনটি হবে: 을 নাকি 를?',
      rule: 'পেটের ট্রাম্পোলিন ধাক্কা! বাচ্চিম ㄹ-এর পরে [을]!',
      answer: 'সঠিক উত্তর: 괴물을 차요! (বাচ্চিম থাকলে → 을)',
    },
    zh: {
      hook: '踢 □ 怪物。宾格助词用 을 还是 를？',
      rule: '肚皮蹦床反弹！有韵尾 ㄹ 后面要接 [을]！',
      answer: '正确答案：괴물을 차요！（有收音 → 을）',
    },
    ru: {
      hook: 'Пнуть □ монстра. Частица 을 или 를?',
      rule: 'Отскок от живота! После патчима ㄹ ставится [을]!',
      answer: 'Ответ: 괴물을 차요! (Есть патчим → 을)',
    },
    ja: {
      hook: 'モンスター □ 蹴る。을 と 를、どっち？',
      rule: 'お腹トランポリン反射！パッチム ㄹ の後ろには [을]！',
      answer: '正解：괴물을 차요！（パッチムあり → 을）',
    },
    mn: {
      hook: 'Мангасыг □ өшиглөнө. 을 эсвэл 를?',
      rule: 'Гэдэсний трамплин! Патчим ㄹ-ийн ард [을]!',
      answer: 'Зөв хариулт: 괴물을 차요! (Дэвсгэр үсэгтэй → 을)',
    },
  },
  'wa-gwa': {
    ko: {
      hook: '여자친구 □ 춤춰요. 와 vs 과, 짝꿍은 누구?',
      rule: '대왕 파리채 짝! 받침이 없으면 [와]가 와야 해요!',
      answer: '정답: 여자친구와 춤춰요! (신나는 막춤 해피엔딩!)',
    },
    en: {
      hook: 'Dance □ girlfriend. Which one: 와 or 과?',
      rule: 'Giant flyswatter slap! No batchim takes [와]!',
      answer: 'Answer: 여자친구와 춤춰요! (No final consonant → 와)',
    },
    vi: {
      hook: 'Nhảy □ bạn gái. Chọn 와 hay 과?',
      rule: 'Vợt muỗi khổng lồ! Không có 받침 thì dùng [와]!',
      answer: 'Đáp án: 여자친구와 춤춰요! (Không có phụ âm cuối → 와)',
    },
    bn: {
      hook: 'বান্ধবীর □ নাচো। কোনটি হবে: 와 নাকি 과?',
      rule: 'বড় মশামাছির থাপ্পড়! বাচ্চিম না থাকলে [와] বসে!',
      answer: 'সঠিক উত্তর: 여자친구와 춤춰요! (বাচ্চিম নেই → 와)',
    },
    zh: {
      hook: '和女朋友 □ 跳舞。用 와 还是 과？',
      rule: '巨型苍蝇拍暴击！没有韵尾(받침 X)后面接 [와]！',
      answer: '正确答案：여자친구와 춤춰요！（无收音 → 와）',
    },
    ru: {
      hook: 'Танцевать □ девушкой. Частица 와 или 과?',
      rule: 'Удар мухобойкой! Без патчима ставится [와]!',
      answer: 'Ответ: 여자친구와 춤춰요! (Нет патчима → 와)',
    },
    ja: {
      hook: '彼女 □ 踊る。와 と 과、どっち？',
      rule: '巨大ハエたたき！パッチムがないときは [와]！',
      answer: '正解：여자친구와 춤춰요！（パッチムなし → 와）',
    },
    mn: {
      hook: 'Найз охин □ бүжиглэнэ. 와 эсвэл 과?',
      rule: 'Том ялааны цохиур! Патчимгүй бол [와] орно!',
      answer: 'Зөв хариулт: 여자친구와 춤춰요! (Дэвсгэр үсэггүй → 와)',
    },
  },
};

const CELEBRATION_BY_LANG: Record<ExportLangCode, string> = {
  ko: '🎉 참 잘했어요! 끝까지 완주! 구독 & 좋아요 누르고 같이 연습해요!',
  en: '🎉 Great job! Practice complete! Like & Subscribe for more Korean Shorts!',
  vi: '🎉 Tuyệt vời! Hoàn thành rồi! Hãy Like và Đăng ký kênh nhé!',
  bn: '🎉 দারুণ হয়েছে! অনুশীলন শেষ! আরও কোরিয়ান শিখতে লাইক ও সাবস্ক্রাইব করুন!',
  zh: '🎉 做得太棒了！全部学完！点赞订阅一起学韩语！',
  ru: '🎉 Отлично! Всё пройдено! Ставьте лайк и подписывайтесь!',
  ja: '🎉 よくできました！全編クリア！チャンネル登録もよろしくお願いします！',
  mn: '🎉 Маш сайн! Бүгдийг сурлаа! Лайк дарж сувгаа захиалаарай!',
};

function buildStandardCueLines(
  lang: ExportLangCode,
  seriesNum: number,
  item: StudioCatalogItem
): { hook: string; rule: string; answer: string } {
  const rom = item.romanized ? `[${item.romanized}]` : '';
  const enRule = item.badge ? translateBadgeToEnglish(item.badge) : '';
  const cleanCaption = item.caption || item.label;

  if (lang === 'ko') {
    const hookMap =
      seriesNum <= 4
        ? `이 글자 ‘${item.key}’, 어떻게 발음할까?`
        : seriesNum <= 7
        ? `받침 ‘${item.key}’, 진짜 소리는 무엇일까?`
        : seriesNum <= 9
        ? `‘${item.key}’ 그대로 읽으면 틀려요! 진짜 발음은?`
        : seriesNum === 10
        ? `불규칙 활용 ‘${item.key}’ 변신! 어떻게 바뀔까?`
        : seriesNum === 13
        ? `장소·방향·시간 확장 조사 ‘${item.key}’, 1초 만에 끝!`
        : seriesNum === 14
        ? `필수 한국어 동사·회화 ‘${item.key}’! 원어민처럼 말하기!`
        : seriesNum === 15
        ? `만능 K-패턴·숫자·요일 ‘${item.key}’! 문장 통째로 암기!`
        : `헷갈리는 한국어 ‘${item.key}’! 1초 만에 구별하기!`;
    return {
      hook: hookMap,
      rule: `${item.label}${item.badge ? ` · ${item.badge}` : ''}`,
      answer: `${cleanCaption} ${rom}`.trim(),
    };
  }

  switch (lang) {
    case 'en':
      return {
        hook: `How do you pronounce Korean "${item.key}"? 🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `Answer: ${item.label} ${rom} (${cleanCaption})`,
      };
    case 'vi':
      return {
        hook: `Chữ Hàn "${item.key}" đọc như thế nào? 🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `Đáp án: ${item.label} ${rom} (${cleanCaption})`,
      };
    case 'bn':
      return {
        hook: `কোরিয়ান "${item.key}" কীভাবে উচ্চারণ করবেন? 🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `উত্তর: ${item.label} ${rom} (${cleanCaption})`,
      };
    case 'zh':
      return {
        hook: `韩语“${item.key}”怎么读才正确？🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `正确答案：${item.label} ${rom}（${cleanCaption}）`,
      };
    case 'ru':
      return {
        hook: `Как правильно произносить «${item.key}»? 🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `Ответ: ${item.label} ${rom} (${cleanCaption})`,
      };
    case 'ja':
      return {
        hook: `韓国語「${item.key}」はどう発音する？🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `正解：${item.label} ${rom}（${cleanCaption}）`,
      };
    case 'mn':
      return {
        hook: `Солонгос "${item.key}" үсгийг яаж дуудах вэ? 🤔`,
        rule: `${item.label} · ${enRule || item.badge}`,
        answer: `Хариулт: ${item.label} ${rom} (${cleanCaption})`,
      };
  }
}

const CHANT_REPEAT_PROMPT: Record<ExportLangCode, string> = {
  ko: '🎤 따라 해봐요! (박수 짝!)',
  en: '🎤 Repeat on the beat! (Clap!)',
  vi: '🎤 Đọc theo nhịp nhé! (Vỗ tay!)',
  bn: '🎤 তালে তালে বলুন! (তালি!)',
  zh: '🎤 跟着节奏读吧！（拍手！）',
  ru: '🎤 Повторяйте в ритм! (Хлопок!)',
  ja: '🎤 リズムに合わせて言ってね！（パチン！）',
  mn: '🎤 Хэмнэлд тааруулж давтаарай! (Алга таш!)',
};

const CHANT_LISTEN_PREFIX: Record<ExportLangCode, string> = {
  ko: '🔊 듣고 따라해요',
  en: '🔊 Listen',
  vi: '🔊 Nghe',
  bn: '🔊 শুনুন',
  zh: '🔊 听一听',
  ru: '🔊 Слушай',
  ja: '🔊 聞いて',
  mn: '🔊 Сонс',
};

/**
 * Generates an accurate speed-synced .srt string for the requested language.
 */
export function generateSrtForLanguage(
  lang: ExportLangCode,
  seriesNum: number,
  timeline: TimelinePlan,
  chantMeta?: ChantStudioMeta
): string {
  const blocks: string[] = [];
  let seq = 1;

  if (seriesNum === 99) {
    const repeats = chantMeta?.repeats ?? 2;
    for (const seg of timeline.segments) {
      const meta = chantMeta?.phraseByKey[seg.item.key];
      const phrases = meta?.phrases?.length
        ? meta.phrases
        : ([[seg.item.key, seg.item.key, seg.item.badge || seg.item.key]] as [string, string, string][]);
      const meaning = meta?.meaning || seg.item.romanized || '';
      const totalBars = repeats * phrases.length * 2;
      const barSec = (seg.endSec - seg.startSec) / Math.max(1, totalBars);
      let barIdx = 0;

      for (let r = 0; r < repeats; r++) {
        for (const ph of phrases) {
          const callStart = seg.startSec + barIdx * barSec;
          const callEnd = callStart + barSec;
          const respStart = callEnd;
          const respEnd = respStart + barSec;
          const chantLine = `${ph[0]}! ${ph[1]}! ${ph[2]}! 👏`;
          const meaningTag = meaning ? ` (${meaning})` : '';

          blocks.push(
            `${seq++}\n${formatSrtTimestamp(callStart)} --> ${formatSrtTimestamp(callEnd)}\n${CHANT_LISTEN_PREFIX[lang]}: [${seg.item.key}] ${chantLine}${meaningTag}`
          );
          blocks.push(
            `${seq++}\n${formatSrtTimestamp(respStart)} --> ${formatSrtTimestamp(respEnd)}\n${CHANT_REPEAT_PROMPT[lang]} → ${chantLine}`
          );
          barIdx += 2;
        }
      }
    }
    return blocks.join('\n\n') + '\n';
  }

  for (const seg of timeline.segments) {
    const cues =
      seriesNum === 12 && V2_EP_LINES[seg.item.key]
        ? V2_EP_LINES[seg.item.key][lang]
        : buildStandardCueLines(lang, seriesNum, seg.item);

    blocks.push(
      `${seq++}\n${formatSrtTimestamp(seg.startSec)} --> ${formatSrtTimestamp(seg.cue1End)}\n${cues.hook}`
    );
    blocks.push(
      `${seq++}\n${formatSrtTimestamp(seg.cue1End)} --> ${formatSrtTimestamp(seg.cue2End)}\n${cues.rule}`
    );
    blocks.push(
      `${seq++}\n${formatSrtTimestamp(seg.cue2End)} --> ${formatSrtTimestamp(seg.endSec)}\n${cues.answer}`
    );
  }

  if (timeline.hasCelebration) {
    blocks.push(
      `${seq++}\n${formatSrtTimestamp(timeline.celebrationStartSec)} --> ${formatSrtTimestamp(
        timeline.totalDurationSec
      )}\n${CELEBRATION_BY_LANG[lang]}`
    );
  }

  return blocks.join('\n\n') + '\n';
}

export interface LocalizedUploadMeta {
  lang: ExportLanguageMeta;
  title: string;
  description: string;
}

export interface YouTubeUploadPackage {
  patternLabel: string;
  titles: [string, string, string];
  chaptersDescription: string;
  pinnedComment: string;
  tags: string;
  localizedMeta: LocalizedUploadMeta[];
}

export const TITLE_PATTERN_LABELS = [
  '① 도발·퀴즈형 (클릭률 1순위)',
  '② 리듬·챌린지형 (반복시청용)',
  '③ 비밀·치트키형 (검색·저장용)',
  '④ 졸라맨 개그형 (바이럴용)',
  '⑤ 초고속 마스터형 (완주율용)',
];

function buildLocalizedMetaList(
  seriesNum: number,
  keySummary: string,
  secLabel: string,
  appUrl: string,
  patternIdx: number
): LocalizedUploadMeta[] {
  const isChant = seriesNum === 99;
  const variantTag = patternIdx % 2 === 0 ? '🔥' : '⚡';

  const templates: Record<ExportLangCode, { title: string; description: string }> = {
    ko: {
      title: isChant
        ? `${variantTag} [${keySummary}] 4박자 박수 챈트송! (${secLabel}) #한국어 #한글`
        : `${variantTag} 외국인 99% 헷갈리는 [${keySummary}] 졸라맨 1초 컷! (${secLabel})`,
      description: `졸라맨 애니메이션과 함께 쉽고 웃기게 배우는 한국어! 무료 웹앱 연습 👉 ${appUrl}`,
    },
    en: {
      title: isChant
        ? `${variantTag} Don't Miss Beat 4! [${keySummary}] Korean Rhythm Chant (${secLabel}) #LearnKorean`
        : `${variantTag} 99% Mispronounce [${keySummary}]! Stickman Korean Fix (${secLabel}) #Hangul`,
      description: `Learn Korean the fun & unforgettable way with Stickman animation! Try our free interactive web app 👉 ${appUrl}`,
    },
    vi: {
      title: isChant
        ? `${variantTag} Đọc tiếng Hàn theo nhịp 4 phách [${keySummary}] 👏 (${secLabel}) #HocTiengHan`
        : `${variantTag} 99% người học phát âm sai [${keySummary}]! Mẹo nhớ 1 giây 🇰🇷`,
      description: `Học tiếng Hàn cực vui và dễ nhớ cùng hoạt hình Stickman! Luyện tập miễn phí tại 👉 ${appUrl}`,
    },
    bn: {
      title: isChant
        ? `${variantTag} ৪ বিটের তালে কোরিয়ান শিখুন [${keySummary}] 👏 (${secLabel}) #LearnKorean`
        : `${variantTag} ৯৯% মানুষ ভুল উচ্চারণ করে [${keySummary}]! ১ সেকেন্ডে শিখুন 🇰🇷`,
      description: `মজার অ্যানিমেশনের সাথে সহজে কোরিয়ান শিখুন! ফ্রি ওয়েব অ্যাপ 👉 ${appUrl}`,
    },
    zh: {
      title: isChant
        ? `${variantTag} 跟着4拍节奏秒记韩语 [${keySummary}] 👏 (${secLabel}) #学韩语`
        : `${variantTag} 99%的人都读错的韩语 [${keySummary}]！火柴人1秒记住 🇰🇷`,
      description: `看搞笑火柴人动画轻松学韩语！免费互动练习网页 👉 ${appUrl}`,
    },
    ru: {
      title: isChant
        ? `${variantTag} Учи корейский под бит [${keySummary}] 👏 (${secLabel}) #КорейскийЯзык`
        : `${variantTag} 99% ошибаются в [${keySummary}]! Корейский за 1 секунду 🇰🇷`,
      description: `Весёлая анимация для быстрого запоминания корейского! Бесплатное веб-приложение 👉 ${appUrl}`,
    },
    ja: {
      title: isChant
        ? `${variantTag} 4拍子リズムで覚える韓国語 [${keySummary}] 👏 (${secLabel}) #韓国語勉強`
        : `${variantTag} 99%が間違える韓国語 [${keySummary}]！棒人間で1秒マスター 🇰🇷`,
      description: `棒人間アニメで楽しく韓国語をマスター！無料Webアプリはこちら 👉 ${appUrl}`,
    },
    mn: {
      title: isChant
        ? `${variantTag} 4 цохилтын хэмнэлээр Солонгос хэл [${keySummary}] 👏 (${secLabel})`
        : `${variantTag} 99% нь буруу дууддаг [${keySummary}]! 1 секундэд сур 🇰🇷`,
      description: `Хөгжилтэй анимэйшнээр Солонгос хэлийг амархан сураарай! Үнэгүй апп 👉 ${appUrl}`,
    },
  };

  return EXPORT_LANGUAGES.map((lang) => ({
    lang,
    title: templates[lang.code].title,
    description: templates[lang.code].description,
  }));
}

/**
 * Generates 3 rotating viral YouTube Titles, speed-synced Chapter Timestamps Description,
 * Link-funnel Pinned Comment, 500-char Tags, and 8-Language Title/Desc Localization.
 */
export function buildYouTubeUploadPackage(
  seriesNum: number,
  seriesTitle: string,
  timeline: TimelinePlan,
  appUrl: string,
  patternIndex = 0
): YouTubeUploadPackage {
  const items = timeline.segments.map((s) => s.item);
  const firstItem = items[0];
  const keySummary =
    items.length <= 4
      ? items.map((i) => (seriesNum === 12 ? i.label.replace(/^EP\.\d+\s*/, '') : i.key)).join('·')
      : `${firstItem?.key ?? '한글'} 외 ${items.length - 1}개`;

  const secLabel = `${Math.round(timeline.totalDurationSec)}초`;
  const secLabelEn = `${Math.round(timeline.totalDurationSec)}s`;
  const pIdx = ((patternIndex % 5) + 5) % 5;
  const patternLabel = TITLE_PATTERN_LABELS[pIdx];

  const chantPatterns: [string, string, string][] = [
    [
      `99%가 4박자 박수에서 틀림?! [${keySummary}] 리듬 챈트송 👏 (${secLabel}) #Shorts`,
      `Can you clap on Beat 4? [${keySummary}] Korean Rhythm Test! 🤯 #LearnKorean`,
      `[리듬 챈트송] ${keySummary} 3음보+박수 한국어 발음 (${secLabel}) #Hangul`,
    ],
    [
      `Don't miss Beat 4! 👏 [${keySummary}] 중독성 미친 한국어 챈트 챌린지 #Shorts`,
      `이 비트 타면 한글 저절로 외워짐 🥁 [${keySummary}] 따라해보기 (${secLabel})`,
      `Repeat after Stickman! [${keySummary}] ${secLabelEn} Korean Chant #Korean`,
    ],
    [
      `교과서 버리세요! 비트로 끝내는 한국어 [${keySummary}] 치트키 🔥 #Shorts`,
      `Stop memorizing Hangul! Just clap & speak [${keySummary}] 👏 #LearnKorean`,
      `외국인용 한글 [${keySummary}] 4박자 발음 리듬 강의 (${secLabel}) #KLanguage`,
    ],
    [
      `졸라맨이랑 춤추면서 외우는 [${keySummary}] 😂 틀리면 땡! #Shorts`,
      `Funniest Korean Rhythm Lesson! Stickman [${keySummary}] Dance 👏 #Hangul`,
      `왕초보도 10초 만에 따라 부르는 [${keySummary}] 챈트송 (${secLabel})`,
    ],
    [
      `딱 ${secLabel} 투자하면 [${keySummary}] 발음 끝납니다 ⚡ 리듬 챈트 #Shorts`,
      `Master [${keySummary}] in ${secLabelEn}! Fast Korean Beat Practice 🎤 #Shorts`,
      `[풀세트] ${seriesTitle} - ${keySummary} (${secLabel}) #한국어공부`,
    ],
  ];

  const simPatterns: [string, string, string][] = [
    [
      `외국인 99% 틀리는 한국어 [${keySummary}]! 1초 발음 치트키 🤯 #Shorts`,
      `99% of foreigners misread [${keySummary}]! Watch Stickman fix it 👀 #Korean`,
      `${seriesTitle} [${keySummary}] ${secLabel} 완성! #졸라한글맨`,
    ],
    [
      `이거 맞히면 한국어 천재 인정? [${keySummary}] 3초 퀴즈 ⏱️ #Shorts`,
      `Korean Quiz! Can YOU read [${keySummary}] correctly? 🤔 #LearnKorean`,
      `한국어 ${keySummary} 구별 챌린지 (${secLabel}) #Hangul #KLanguage`,
    ],
    [
      `그냥 읽으면 무조건 틀립니다 ❌ 한국어 비밀 규칙 [${keySummary}] #Shorts`,
      `STOP reading [${keySummary}] literally! Native Korean secret 🔥 #Korean`,
      `한글 원리 한 방 정리: ${seriesTitle} (${keySummary})`,
    ],
    [
      `졸라맨이 온몸으로 알려주는 [${keySummary}] ㅋㅋㅋ 안 외워질 수가 없음 #Shorts`,
      `Stickman suffers so you learn Korean [${keySummary}] 😂 #Animation`,
      `웃다가 외우는 ${seriesTitle} [${keySummary}] (${secLabel}) #졸라한글맨`,
    ],
    [
      `딱 ${secLabel} 만에 [${keySummary}] 평생 안 까먹는 그림 암기법 ⚡ #Shorts`,
      `Zero to Pro in ${secLabelEn}: [${keySummary}] Visual Korean Hack! #Hangul`,
      `[총정리] ${seriesTitle} - ${keySummary} (${secLabel}) #한국어`,
    ],
  ];

  const titles: [string, string, string] =
    seriesNum === 99 ? chantPatterns[pIdx] : simPatterns[pIdx];

  const chapterLines = timeline.segments.map((seg) => {
    const ts = formatChapterTimestamp(seg.startSec);
    const rom = seg.item.romanized ? ` [${seg.item.romanized}]` : '';
    return `${ts} ${seg.item.label}${rom}`;
  });
  if (timeline.hasCelebration) {
    chapterLines.push(`${formatChapterTimestamp(timeline.celebrationStartSec)} 🎉 완주 축하 댄스!`);
  }

  const chaptersDescription = [
    `🏃 Jolla Hangul · ${seriesTitle} (${items.length} parts · ${timeline.totalDurationSec.toFixed(1)}s)`,
    seriesNum === 99
      ? `🥁 3-Beat + Beat-4 Clap! Call & Response Korean Rhythm Chant (Listen → Your Turn!)`
      : `Stickman Korean Animation — Visual, funny & unforgettable Korean pronunciation!`,
    ``,
    `📌 Chapters / 챕터`,
    ...chapterLines,
    ``,
    `🎮 Practice with sound in our FREE interactive web app 👉 ${appUrl}`,
    `🌍 8-Language Subtitles (EN/KO/VI/BN/ZH/RU/JA/MN)`,
  ].join('\n');

  const pinnedPool = [
    `👇 Which one (${firstItem?.key ?? 'ㄱ'}) was hardest for you? Comment below!\n▶ Practice free with sound in our Stickman Web App 👉 ${appUrl}\n🇰🇷 다음 편에 나왔으면 하는 한국어 주제를 댓글로 알려주세요!`,
    `👏 Did you hit Beat 4 without missing? Tell us your speed score!\n▶ Play & control Stickman directly in our free web app 👉 ${appUrl}\n💬 헷갈리는 한글·조사 댓글 남겨주시면 바로 애니메이션으로 만들어드려요!`,
    `🔥 Want all 40 Hangul letters & particles in one place?\n▶ Open the free interactive Stickman Hangul App 👉 ${appUrl}\n👇 영상 속 캐릭터 직접 눌러보며 복습해 보세요!`,
  ];
  const pinnedComment = pinnedPool[pIdx % pinnedPool.length];

  const baseTags = [
    '졸라한글맨',
    'StickmanKorean',
    seriesTitle,
    '한국어공부',
    '한글공부',
    '한국어발음',
    'LearnKorean',
    'Korean',
    'Hangul',
    'KoreanShorts',
    'KoreanPronunciation',
    'KLanguage',
    seriesNum === 99
      ? 'KoreanChantSong'
      : seriesNum === 12 || seriesNum === 13
      ? 'KoreanParticles'
      : seriesNum === 14
      ? 'KoreanPhrases'
      : seriesNum === 15
      ? 'KoreanGrammar'
      : 'HangulForBeginners',
    seriesNum === 99
      ? '한국어챈트송'
      : seriesNum === 12 || seriesNum === 13
      ? '한국어조사'
      : seriesNum === 14
      ? '한국어회화'
      : seriesNum === 15
      ? '한국어문법'
      : '외국인한국어',
    ...items.slice(0, 6).map((it) => it.key),
  ];

  const unique = Array.from(new Set(baseTags.map((t) => t.trim()).filter(Boolean)));
  let tags = '';
  for (const tag of unique) {
    const candidate = tags ? `${tags}, ${tag}` : tag;
    if (candidate.length <= 495) {
      tags = candidate;
    } else {
      break;
    }
  }

  const localizedMeta = buildLocalizedMetaList(seriesNum, keySummary, secLabel, appUrl, pIdx);

  return { patternLabel, titles, chaptersDescription, pinnedComment, tags, localizedMeta };
}

export function formatFullUploadPackageTxt(pkg: Pick<YouTubeUploadPackage, 'titles' | 'chaptersDescription' | 'pinnedComment' | 'tags'> & { localizedMeta?: LocalizedUploadMeta[] }): string {
  const sections = [
    '=== [1] 유튜브 추천 제목 3종 ===',
    `1) ${pkg.titles[0]}`,
    `2) ${pkg.titles[1]}`,
    `3) ${pkg.titles[2]}`,
    '',
    '=== [2] 챕터 타임스탬프 & 설명란 ===',
    pkg.chaptersDescription,
    '',
    '=== [3] 고정댓글 (질문 + 무료 웹앱 유입) ===',
    pkg.pinnedComment,
    '',
    `=== [4] 유튜브 태그 (${pkg.tags.length} / 500자) ===`,
    pkg.tags,
  ];

  if (pkg.localizedMeta && pkg.localizedMeta.length > 0) {
    sections.push('', '=== [5] 유튜브 스튜디오 다국어 제목·설명 복사용 (8개국어) ===');
    for (const loc of pkg.localizedMeta) {
      sections.push(`[${loc.lang.flag} ${loc.lang.label}]`);
      sections.push(`제목: ${loc.title}`);
      sections.push(`설명: ${loc.description}`);
      sections.push('');
    }
  }

  return sections.join('\n') + '\n';
}
