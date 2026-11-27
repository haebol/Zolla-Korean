// Lightweight Translation Slot for External Multi-Language Integration (e.g., 7-language system)
// By default, returns Korean strings cleanly with zero bundle or token overhead.

export interface JollamanTranslationProvider {
  getSummary?: (seriesNum: number, key: string, fallbackKo: string) => string;
  getSubtitle?: (seriesNum: number, key: string, fallbackKo: string) => string;
  getMeaning?: (seriesNum: number, key: string, fallbackKo: string) => string;
}

let activeProvider: JollamanTranslationProvider | null = null;

/**
 * Registers an external translation provider at runtime (e.g. main-account 7-language module).
 */
export function registerJollamanTranslationProvider(
  provider: JollamanTranslationProvider | null
): void {
  activeProvider = provider;
}

/**
 * Resolves a short summary/caption for Shorts Studio & accessibility, defaulting to Korean.
 */
export function tStageSummary(seriesNum: number, key: string, fallbackKo: string): string {
  return activeProvider?.getSummary?.(seriesNum, key, fallbackKo) ?? fallbackKo;
}

/**
 * Resolves the reveal card secondary subtitle line, defaulting to Korean.
 */
export function tRevealSubtitle(seriesNum: number, key: string, fallbackKo: string): string {
  return activeProvider?.getSubtitle?.(seriesNum, key, fallbackKo) ?? fallbackKo;
}

/**
 * Resolves optional word meaning label for the stage footer pill, defaulting to Korean.
 */
export function tWordMeaning(seriesNum: number, key: string, fallbackKo: string): string {
  return activeProvider?.getMeaning?.(seriesNum, key, fallbackKo) ?? fallbackKo;
}
