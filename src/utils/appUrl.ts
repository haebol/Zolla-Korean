export const SHARED_STANDALONE_URL =
  'https://ais-pre-tdj2xw7oe2w6o42smqurnm-838579933875.asia-southeast1.run.app';

/**
 * Returns the public standalone web URL for the app.
 * Inside AI Studio's preview iframe (`ais-dev-*`) or localhost, returns the
 * Shared App URL (`ais-pre-*`) instead of the private dev preview origin,
 * because `ais-dev-*` is tied to the AI Studio iframe session and triggers
 * AI Studio / Not Found redirects when opened directly in a standalone tab.
 * Once running on the deployed/shared origin (or custom domain), returns that origin.
 */
export function getStandaloneAppUrl(): string {
  if (typeof window === 'undefined') return SHARED_STANDALONE_URL;
  const origin = window.location.origin || '';
  if (
    !origin ||
    origin.startsWith('http://localhost') ||
    origin.startsWith('http://127.0.0.1') ||
    origin.includes('ais-dev-')
  ) {
    return SHARED_STANDALONE_URL;
  }
  return origin;
}
