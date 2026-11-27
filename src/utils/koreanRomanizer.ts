// Revised Romanization of Korean + Viral Hook / Comic Bubble helpers for all 11 Jollaman series

const INITIAL_CONSONANTS = [
  'g', 'kk', 'n', 'd', 'tt', 'r', 'm', 'b', 'pp',
  's', 'ss', '', 'j', 'jj', 'ch', 'k', 't', 'p', 'h',
];

const MEDIAL_VOWELS = [
  'a', 'ae', 'ya', 'yae', 'eo', 'e', 'yeo', 'ye',
  'o', 'wa', 'wae', 'oe', 'yo', 'u', 'wo', 'we',
  'wi', 'yu', 'eu', 'ui', 'i',
];

const FINAL_CONSONANTS = [
  '', 'k', 'k', 'k', 'n', 'n', 'n', 't',
  'l', 'k', 'm', 'p', 'l', 'l', 'p', 'l',
  'm', 'p', 'p', 't', 't', 'ng', 't', 't',
  'k', 't', 'p', 't',
];

const STANDALONE_JAMO_ROMAN: Record<string, string> = {
  ㄱ: 'g/k', ㄲ: 'kk', ㄴ: 'n', ㄷ: 'd/t', ㄸ: 'tt', ㄹ: 'r/l',
  ㅁ: 'm', ㅂ: 'b/p', ㅃ: 'pp', ㅅ: 's', ㅆ: 'ss', ㅇ: 'ng',
  ㅈ: 'j', ㅉ: 'jj', ㅊ: 'ch', ㅋ: 'k', ㅌ: 't', ㅍ: 'p', ㅎ: 'h',
  ㅏ: 'a', ㅑ: 'ya', ㅓ: 'eo', ㅕ: 'yeo', ㅗ: 'o', ㅛ: 'yo',
  ㅜ: 'u', ㅠ: 'yu', ㅡ: 'eu', ㅣ: 'i',
  ㅐ: 'ae', ㅒ: 'yae', ㅔ: 'e', ㅖ: 'ye', ㅘ: 'wa', ㅙ: 'wae',
  ㅚ: 'oe', ㅝ: 'wo', ㅞ: 'we', ㅟ: 'wi', ㅢ: 'ui',
  ㄳ: 'k', ㄵ: 'n', ㄶ: 'n', ㄺ: 'k', ㄻ: 'm', ㄼ: 'l',
  ㄽ: 'l', ㄾ: 'l', ㄿ: 'p', ㅀ: 'l', ㅄ: 'p',
  여덟: 'yeo-deol', 밟다: 'bap-tta', 읽고: 'il-kko', 많아: 'ma-na', 많고: 'man-ko',
};

/**
 * Converts Hangul syllables or Jamo into clean Revised Romanization for global learners.
 */
export function romanizeKorean(input: string): string {
  const cleaned = input.replace(/[[\]]/g, '').trim();
  if (!cleaned) return '';

  const parts: string[] = [];
  for (const ch of cleaned) {
    const code = ch.charCodeAt(0);
    if (code >= 0xac00 && code <= 0xd7a3) {
      const offset = code - 0xac00;
      const ini = Math.floor(offset / (21 * 28));
      const med = Math.floor((offset % (21 * 28)) / 28);
      const fin = offset % 28;
      parts.push(`${INITIAL_CONSONANTS[ini]}${MEDIAL_VOWELS[med]}${FINAL_CONSONANTS[fin]}`);
    } else if (STANDALONE_JAMO_ROMAN[ch]) {
      parts.push(STANDALONE_JAMO_ROMAN[ch]);
    } else if (ch === ' ') {
      parts.push(' ');
    }
  }

  return parts
    .join('-')
    .replace(/- -/g, ' ')
    .replace(/^-|-$/g, '');
}

const RULE_BADGE_EN: Record<string, string> = {
  // Series 8
  연음: 'Liaison',
  축약: 'Aspiration',
  'ㅡ탈락': "'ㅡ' Vowel Drop",
  'ㅏ탈락': "'ㅏ' Vowel Drop",
  모음축약: 'Vowel Contraction',
  된소리: 'Tensification',
  // Series 9
  비음화: 'Nasalization',
  유음화: 'Liquidization',
  구개음화: 'Palatalization',
  ㅎ탈락: "'ㅎ' Drop",
  'ㅎ탈락+연음': "'ㅎ' Drop + Liaison",
  // Series 10
  ㅂ불규칙: 'ㅂ-Irregular',
  ㄷ불규칙: 'ㄷ-Irregular',
  ㅅ불규칙: 'ㅅ-Irregular',
  르불규칙: '르-Irregular',
  ㅡ불규칙: 'ㅡ-Drop Irregular',
  ㅎ불규칙: 'ㅎ-Irregular',
  ㄹ탈락: 'ㄹ-Drop',
  여불규칙: '여-Irregular',
  // Series 11
  사잇소리: 'Saitsori (Tensing)',
  ㄴ첨가: 'ㄴ-Insertion',
  거라불규칙: '거라-Irregular',
  러불규칙: '러-Irregular',
  우불규칙: '우-Irregular',
  두음법칙: 'Initial Sound Law',
  // Series 12: Korean Particles
  '주제 조사 은/는': 'Topic Particle (은/는)',
  '주격 조사 이/가': 'Subject Particle (이/가)',
  '목적격 조사 을/를': 'Object Particle (을/를)',
  '접속 조사 와/과': 'And / With (와/과)',
  '장소·도착 에': 'Static Place / To (에)',
  '동작 장소 에서': 'Action Place (에서)',
  '방향·수단 (으)로': 'Direction / By ((으)로)',
  '보조사 도 (추가)': 'Also / Too (도)',
  '사람 대상 에게·한테': 'To Someone (에게/한테)',
  'ㄹ받침 함정 → 로!': 'ㄹ-Trap → 로!',
  '시간·거리 부터~까지': 'From ~ Until (부터~까지)',
  '추가 도 · 단독 만': 'Also(도) · Only(만)',
  '필수 동사': 'Essential Korean Verb',
  '생존 회화': 'Survival Korean Phrase',
  '만능 K-패턴': 'Essential K-Pattern',
  '숫자·요일': 'Korean Numbers & Days',
  // Batchim labels
  '[ㄱ] 대표음': 'Final [k] Sound',
  '[ㄴ] 대표음': 'Final [n] Sound',
  '[ㄷ] 대표음': 'Final [t] Sound',
  '[ㄹ] 대표음': 'Final [l] Sound',
  '[ㅁ] 대표음': 'Final [m] Sound',
  '[ㅂ] 대표음': 'Final [p] Sound',
  '[ㅇ] 대표음': 'Final [ng] Sound',
};

export function translateBadgeToEnglish(badge: string): string {
  if (RULE_BADGE_EN[badge]) return RULE_BADGE_EN[badge];
  if (badge.includes('대표음')) {
    const rom = romanizeKorean(badge);
    return rom ? `Final [${rom}] Sound` : 'Final Consonant';
  }
  if (badge.startsWith('받침 ')) {
    const tail = badge.replace('받침 ', '').trim();
    if (tail.includes('→')) {
      const [from, to] = tail.split('→').map((s) => s.trim());
      return `${from} → [${romanizeKorean(to) || to}]`;
    }
    const rom = romanizeKorean(tail);
    return rom ? `Final [${rom}]` : 'Final Consonant';
  }
  if (badge.includes('→')) {
    const [from, to] = badge.split('→').map((s) => s.trim());
    return `${from} → [${romanizeKorean(to) || to}]`;
  }
  const rom = romanizeKorean(badge);
  return rom ? rom : badge;
}

export interface ViralHookCopy {
  tag: string;
  question: string;
  enQuestion: string;
}

export function buildViralHookCopy(
  seriesNum: number,
  key: string,
  badge: string
): ViralHookCopy {
  if (seriesNum >= 1 && seriesNum <= 4) {
    return {
      tag: '🤯 99% MISS THIS!',
      question: `‘${key}’ 소리, 맞혀볼래요?`,
      enQuestion: `99% miss "${key}" — Can you read it? 🤯`,
    };
  }
  if (seriesNum >= 5 && seriesNum <= 6) {
    return {
      tag: '⚡ 받침 3초 퀴즈',
      question: `받침 ‘${key}’, 무슨 소리 날까?`,
      enQuestion: `Final "${key}" — Wait for the sound! 👂`,
    };
  }
  if (seriesNum === 7) {
    if (key === '읽고' || key === '많아' || key === '많고' || badge.includes('예외')) {
      return {
        tag: '🤯 겹받침 99% 함정',
        question: `‘${key}’ 그냥 읽으면 틀려요!`,
        enQuestion: `Don't read "${key}" literally! Real sound? 🤯`,
      };
    }
    return {
      tag: '🧩 겹받침 생존 퀴즈',
      question: `겹받침 ‘${key}’, 누가 살아남을까?`,
      enQuestion: `Double Batchim "${key}": Who survives? 👀`,
    };
  }
  if (seriesNum === 8 || seriesNum === 9) {
    return {
      tag: '❌ 그대로 읽으면 틀림',
      question: `‘${key}’ 그대로 읽으면 땡! 진짜 발음은?`,
      enQuestion: `Never read "${key}" literally! Real sound? 👀`,
    };
  }
  if (seriesNum === 10) {
    return {
      tag: '🧬 불규칙 변신 퀴즈',
      question: `‘${key}’ + 어요 = 어떻게 변할까?`,
      enQuestion: `"${key}" + -eoyo = How does it mutate?! 🤔`,
    };
  }
  if (seriesNum === 12) {
    if (key === '로/으로') {
      return {
        tag: '⚡ 조사 99% 함정',
        question: '‘지하철’ + 으로? 로? 진짜 정답은?!',
        enQuestion: 'Subway + 으로 or 로?! Guess fast! 🤯',
      };
    }
    if (key === '에' || key === '에서') {
      return {
        tag: '⚡ 에 vs 에서 퀴즈',
        question: `공원 + ‘${key}’ → 행동할 땐 뭘 붙일까?`,
        enQuestion: `Static vs Action: When to use "${key}"? 👀`,
      };
    }
    if (key === '도') {
      return {
        tag: '⚡ 만능 조사 1초 컷',
        question: '받침 있든 없든 ‘나___! 너___!’ = ?',
        enQuestion: 'Say "Me too / You too" in 1 sec! 🔥',
      };
    }
    return {
      tag: '⚡ 조사 3초 골라!',
      question: `‘${key}’ 받침 있으면 누가 붙을까?`,
      enQuestion: `Batchim vs Vowel: Pick the right "${key}"! 👀`,
    };
  }
  if (seriesNum === 13) {
    return {
      tag: '🧭 1초 조사 치트키',
      question: `‘${key}’ 언제 쓸까? 1초 상황 암기!`,
      enQuestion: `When do Koreans use "${key}"? Watch! 👀`,
    };
  }
  if (seriesNum === 14) {
    return {
      tag: '🗣️ 생존 한국어 1초 컷',
      question: `필수 표현 ‘${key}’, 어떻게 말할까?`,
      enQuestion: `How do Koreans say "${key}"? 🇰🇷`,
    };
  }
  if (seriesNum === 15) {
    return {
      tag: '🚀 K-패턴 치트키',
      question: `‘${key}’ 패턴, 진짜 뜻이 뭘까?`,
      enQuestion: `Master "${key}" in 1 second! ⚡`,
    };
  }
  return {
    tag: '🤯 한국인 발음 비밀',
    question: `‘${key}’, 그냥 읽으면 틀린다?!`,
    enQuestion: `Can you read "${key}" like a native? 👀`,
  };
}

export interface IntroHookDefaults {
  title: string;
  titleKo: string;
  subtitle: string;
}

/**
 * Generates initial high-retention 1.5s intro hook headline (English with clean Shorts line breaks),
 * parallel small Korean text, and punchy subtitle tailored to each series for global YouTube Shorts.
 */
export function buildIntroHookDefaults(
  seriesNum: number,
  seriesTitle: string,
  itemKey = ''
): IntroHookDefaults {
  switch (seriesNum) {
    case 1:
      return {
        title: '99% Read\nㄱ–ㅎ WRONG! 🤯',
        titleKo: '외국인 99%가 틀리는 한글 자음!',
        subtitle: '1-sec trick! 👇',
      };
    case 2:
      return {
        title: '아·어·오·우,\nStill Confused? 👀',
        titleKo: '아·어·오·우 아직도 헷갈리나요?',
        subtitle: '1-sec trick! 👇',
      };
    case 3:
      return {
        title: 'ㄱ vs ㄲ:\nHear the Pop! 💥',
        titleKo: 'ㄱ vs ㄲ 소리 차이 1초 컷!',
        subtitle: 'Listen closely! 🔊',
      };
    case 4:
      return {
        title: 'ㅐ vs ㅔ:\nWhat’s Different? 😱',
        titleKo: '한국인도 헷갈리는 ㅐ vs ㅔ!',
        subtitle: 'Watch till end! 👇',
      };
    case 5:
      return {
        title: '1 Bottom Letter\nChanges ALL! 💥',
        titleKo: '받침 하나로 뜻·소리 대폭발!',
        subtitle: '1-sec impact! 👀',
      };
    case 6:
      return {
        title: 'Why All Sound\nLike [ㄷ]? 🤔',
        titleKo: '왜 다 [ㄷ] 소리가 날까?',
        subtitle: '1-sec rule! ⚔️',
      };
    case 7:
      return {
        title: '2 Bottom Letters:\nWho Survives? 🤯',
        titleKo: '겹받침 둘 중 누가 살아남을까?',
        subtitle: 'Don’t blink! 👀',
      };
    case 8:
      return {
        title: '가 + 아 = 가?!\nWhere’d 아 Go? 😱',
        titleKo: '가 + 아 → 가?! 모음 탈락!',
        subtitle: '1-sec shortcut! ⚡',
      };
    case 9:
      return {
        title: 'Don’t Read\nLiterally! ❌',
        titleKo: '써있는 대로 읽으면 100% 땡!',
        subtitle: 'Real native sound! 🇰🇷',
      };
    case 10:
      return {
        title: 'Why ㄷ·ㅂ·ㅅ\nMutate?! 🧬',
        titleKo: 'ㄷ·ㅂ·ㅅ 불규칙 변신 이유!',
        subtitle: '1-sec hack! 👇',
      };
    case 11:
    case 12:
    case 13:
      return {
        title: '은/는 vs 이/가\nin 1 Second! ⚡',
        titleKo: '헷갈리는 조사 1초 구분 치트키!',
        subtitle: 'Stop guessing! 🛑',
      };
    case 14:
    case 15:
      return {
        title: 'Real Korean\nin 1 Second! 🇰🇷',
        titleKo: '한국인 필수 표현 1초 컷!',
        subtitle: 'Say it now! 🗣️',
      };
    case 16:
      return {
        title: '의·랑·보다·처럼\nin 1 Second! 🔥',
        titleKo: '조사 3 심화 필수 1초 구분!',
        subtitle: 'Pick & speak! 👇',
      };
    case 99:
      return {
        title: 'Tap the Beat!\nSpeak Fast! 🥁',
        titleKo: '리듬에 맞춰 바로 말하는 한글!',
        subtitle: 'Clap & repeat! 👏',
      };
    default:
      return {
        title: itemKey
          ? `99% Miss\n“${itemKey}” Sound! 🤯`
          : '1-Sec Korean\nStickman Trick! ⚡',
        titleKo: itemKey
          ? `‘${itemKey}’ 그냥 읽으면 틀린다?!`
          : `${seriesTitle}, 1초 만에 끝!`,
        subtitle: 'Watch till end! 👇',
      };
  }
}

const COMIC_IMPACT_BY_CHAR: Record<string, string> = {
  // Series 1: Consonants
  ㄱ: '뿌우~ 으악!',
  ㄴ: '나무 쓰러져!',
  ㄷ: '어푸푸 풍덩!',
  ㄹ: '로켓 발사!',
  ㅁ: '윙~ 따끔!',
  ㅂ: '찌리리릿!',
  ㅅ: '어흥! 살려줘!',
  ㅇ: '꽥꽥! 아야!',
  ㅈ: '휘리리릭!',
  ㅊ: '둠칫 둠칫!',
  ㅋ: '으아아악!',
  ㅌ: '이단 옆차기!',
  ㅍ: '풍선 펑!',
  ㅎ: '호랑이 댄스!',
  // Series 2: Vowels
  ㅏ: '으아앙~!',
  ㅑ: '홈런 깡!',
  ㅓ: '어푸푸!',
  ㅕ: '뿌우우웅~!',
  ㅗ: '먹물 세례!',
  ㅛ: '아야야야!',
  ㅜ: '우주선 빔?!',
  ㅠ: '유령이다!',
  ㅡ: '으스스스~!',
  ㅣ: '앙! 아야!',
  // Series 3: Double consonants
  ㄲ: '까악! 까악!',
  ㄸ: '으악 밟았어!',
  ㅃ: '짝! 쪽?!',
  ㅆ: '치워주세여!',
  ㅉ: '짝꿍 최고!',
  // Series 4: Compound vowels
  ㅐ: '연못 풍덩!',
  ㅒ: '귀 아파!',
  ㅔ: '꽃게 살려!',
  ㅖ: '계란 폭격!',
  ㅘ: '사과 선물 💖',
  ㅙ: '왜 때려?!',
  ㅚ: '회오리 퓨~!',
  ㅝ: '슈퍼 펀치!!',
  ㅞ: '결혼해줘!',
  ㅟ: '하늘 위로 쭉!',
  ㅢ: '커피 타임 ☕',
};

function getRuleImpactLine(ruleBadge: string): string {
  if (!ruleBadge) return '으아악! 퍽!';
  if (ruleBadge.includes('ㅎ탈락')) return '뽕! 증발!';
  if (ruleBadge.includes('탈락')) return '사라졌어!';
  if (ruleBadge.includes('연음')) return '내 자리야!';
  if (ruleBadge.includes('축약') && ruleBadge.includes('모음')) return '합체 완료!';
  if (ruleBadge.includes('축약')) return '종이장 됐다!';
  if (ruleBadge.includes('된소리')) return '쌍자음 변신!';
  if (ruleBadge.includes('비음화')) return '콧소리 킁킁!';
  if (ruleBadge.includes('유음화')) return '혀가 흐물~';
  if (ruleBadge.includes('구개음화')) return '찰칵! 변신!';
  if (ruleBadge.includes('ㅂ불규칙')) return 'ㅂ → 우 변신!';
  if (ruleBadge.includes('ㄷ불규칙')) return 'ㄷ → ㄹ 변신!';
  if (ruleBadge.includes('ㅅ불규칙')) return 'ㅅ 사라졌다!';
  if (ruleBadge.includes('르불규칙')) return 'ㄹ 두 배!';
  if (ruleBadge.includes('ㅎ불규칙')) return 'ㅎ 탈출!';
  if (ruleBadge.includes('여불규칙')) return '하 → 해 변신!';
  if (ruleBadge.includes('사잇') || ruleBadge.includes('첨가')) return '쏙 끼어들기!';
  if (ruleBadge.includes('거라') || ruleBadge.includes('러불규칙') || ruleBadge.includes('우불규칙')) return '어미 변신!';
  if (ruleBadge.includes('두음')) return '첫소리 탈출!';
  if (ruleBadge.includes('은/는')) return '받침 짝꿍 착!';
  if (ruleBadge.includes('이/가')) return '주어 스포트라이트!';
  if (ruleBadge.includes('을/를')) return '냠냠 목적어!';
  if (ruleBadge.includes('와/과')) return '자리 바꿈 짝!';
  if (ruleBadge.includes('동작 장소')) return '열심히 뛰자!';
  if (ruleBadge.includes('장소·도착')) return '집으로 쏙!';
  if (ruleBadge.includes('사람 대상')) return '선물 뿅!';
  if (ruleBadge.includes('ㄹ받침 함정')) return '으❌ 탈락! 로⭕';
  if (ruleBadge.includes('모음 뒤 로') || ruleBadge.includes('받침 뒤 으로') || ruleBadge.includes('(으)로')) return 'ㄹ 미끄럼틀 슝!';
  if (ruleBadge.includes('부터~까지')) return '출발부터 골인!';
  if (ruleBadge.includes('도 · 만') || ruleBadge.includes('보조사 도')) return '나도! 우리만!';
  if (ruleBadge.includes('필수 동사')) return '온몸으로 열연 중!';
  if (ruleBadge.includes('생존 회화')) return '진짜 한국어 1초 컷!';
  if (ruleBadge.includes('K-패턴')) return '치트키 발동!';
  if (ruleBadge.includes('숫자·요일')) return '1초 만에 세기!';
  return '변신 성공!';
}

/**
 * Generates short, punchy, mute-friendly cartoon speech bubble lines (never long narrator prose).
 */
export function buildComicBubbleLine(
  item: unknown,
  phase: 'walking' | 'approaching' | 'action' | 'aftermath' | 'reveal',
  actionT: number
): string {
  if (phase === 'walking' || phase === 'reveal') return '';
  const rec = (item && typeof item === 'object' ? (item as Record<string, unknown>) : {}) as Record<
    string,
    unknown
  >;

  const charKey = typeof rec.char === 'string' ? rec.char : typeof rec.key === 'string' ? rec.key : '';
  const soundLabel = typeof rec.soundLabel === 'string' ? rec.soundLabel : '';
  const ruleBadge = typeof rec.ruleBadge === 'string' ? rec.ruleBadge : '';
  const triggerWord = typeof rec.triggerWord === 'string' ? rec.triggerWord : '';
  const pronunciation = typeof rec.pronunciation === 'string' ? rec.pronunciation : '';
  const completedWord = typeof rec.completedWord === 'string' ? rec.completedWord : '';
  const repSound = typeof rec.repSound === 'string' ? rec.repSound : '';

  if (phase === 'approaching') {
    if (completedWord) return '어? 뭐가 와!';
    if (ruleBadge) return '잠깐만?!';
    if (triggerWord) return '어? 저게 뭐지?';
    return '어?! 잠깐!';
  }

  if (phase === 'action') {
    if (actionT < 0.34) {
      if (ruleBadge.includes('탈락')) return '어?! 흔들려!';
      if (ruleBadge.includes('연음')) return '어? 밀려나!';
      if (ruleBadge.includes('비음화')) return '킁킁? 냄새!';
      if (ruleBadge.includes('불규칙')) return '받침이 꿈틀!';
      if (ruleBadge) return '어어?! 변해!';
      return '어어?! 조심!';
    }
    if (actionT < 0.72) {
      if (repSound && charKey) {
        const batchim2Bubbles: Record<string, string> = {
          ㄲ: '얼어서 [ㄱ] 합체!',
          ㅅ: '옷이 ㄷ처럼 뻣뻣!',
          ㅈ: '낮 해에 녹아 [ㄷ]!',
          ㅊ: '아야! 벌에 쏘여 꼳!',
          ㅋ: '막대 뚝! 부억!',
          ㅌ: '무 뽑다 밭→받!',
          ㅍ: '텐트가 네모 [ㅂ]!',
          ㅆ: '대왕 [ㄷ]이 있다!',
          ㅎ: 'ㅎ이 [ㄷ] 투구 썼다!',
        };
        if (batchim2Bubbles[charKey]) return batchim2Bubbles[charKey];
      }
      if (soundLabel.startsWith('받침')) {
        const batchimBubbles: Record<string, string> = {
          ㄱ: '수박 헬멧 펑!',
          ㄴ: '눈사람 됐어!',
          ㄷ: '국물 첨벙!',
          ㄹ: '으악! 싹둑!',
          ㅁ: '곰한테 잡혔다!',
          ㅂ: '으악! 파묻힌다!',
          ㅇ: '스트라이크!',
        };
        if (batchimBubbles[charKey]) return batchimBubbles[charKey];
      }
      if (charKey && COMIC_IMPACT_BY_CHAR[charKey]) {
        return COMIC_IMPACT_BY_CHAR[charKey];
      }
      if (ruleBadge) {
        return getRuleImpactLine(ruleBadge);
      }
      return '으아악! 퍽!';
    }
    if (completedWord) return `오! ${completedWord}!`;
    if (pronunciation) return `아하! [${pronunciation}]`;
    if (repSound) return `대표음 [${repSound}]!`;
    if (triggerWord) return `${triggerWord}`;
    return '변신 완료!';
  }

  // aftermath: keep short & non-spoiling for quiz tension
  return completedWord ? '어질어질~!' : '어떻게 읽지?';
}

/**
 * Attempts to extract clean spoken pronunciation word for romanization preview.
 */
export function extractPronunciationTarget(
  key: string,
  revealGlyph: string,
  item: unknown
): string {
  const rec = (item && typeof item === 'object' ? (item as Record<string, unknown>) : {}) as Record<
    string,
    unknown
  >;
  if (typeof rec.pronunciation === 'string' && rec.pronunciation.trim()) {
    return rec.pronunciation.trim();
  }
  if (typeof rec.conjugation === 'string' && rec.conjugation.trim()) {
    return rec.conjugation.trim();
  }
  if (typeof rec.triggerWord === 'string' && rec.triggerWord.trim()) {
    return rec.triggerWord.trim();
  }
  const cleanedGlyph = revealGlyph.replace(/[[\]]/g, '').trim();
  return cleanedGlyph || key;
}
