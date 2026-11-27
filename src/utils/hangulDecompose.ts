const CHOSEONG_LIST = [
  'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ',
  'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const;

const JUNGSEONG_LIST = [
  'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ', 'ㅙ',
  'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ',
] as const;

const JONGSEONG_LIST = [
  '', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ', 'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ',
  'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ', 'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ',
] as const;

const HORIZONTAL_VOWELS = new Set(['ㅗ', 'ㅛ', 'ㅜ', 'ㅠ', 'ㅡ']);
const COMBO_VOWELS = new Set(['ㅘ', 'ㅙ', 'ㅚ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅢ']);

export interface DecomposedHangulWord {
  prefix: string;
  target: string;
  topPart: string;
  cho: string;
  jung: string;
  jong: string;
  hasBatchim: boolean;
  vowelLayout: 'vertical' | 'horizontal' | 'combo';
}

export function decomposeLastHangul(word: string): DecomposedHangulWord {
  const clean = word.trim();
  if (!clean) {
    return {
      prefix: '',
      target: '',
      topPart: '',
      cho: '',
      jung: '',
      jong: '',
      hasBatchim: false,
      vowelLayout: 'vertical',
    };
  }

  const chars = Array.from(clean);
  const target = chars[chars.length - 1] ?? '';
  const prefix = chars.slice(0, -1).join('');
  const code = target.charCodeAt(0);

  if (code < 0xac00 || code > 0xd7a3) {
    return {
      prefix,
      target,
      topPart: target,
      cho: target,
      jung: '',
      jong: '',
      hasBatchim: false,
      vowelLayout: 'vertical',
    };
  }

  const offset = code - 0xac00;
  const jongIdx = offset % 28;
  const jungIdx = Math.floor(offset / 28) % 21;
  const choIdx = Math.floor(offset / (28 * 21));

  const cho = CHOSEONG_LIST[choIdx] ?? '';
  const jung = JUNGSEONG_LIST[jungIdx] ?? '';
  const jong = JONGSEONG_LIST[jongIdx] ?? '';
  const topPart = String.fromCharCode(0xac00 + (offset - jongIdx));
  const vowelLayout = HORIZONTAL_VOWELS.has(jung)
    ? 'horizontal'
    : COMBO_VOWELS.has(jung)
    ? 'combo'
    : 'vertical';

  return {
    prefix,
    target,
    topPart,
    cho,
    jung,
    jong,
    hasBatchim: jong.length > 0,
    vowelLayout,
  };
}
