/**
 * Status messages that may appear on the site.
 *
 * IMPORTANT: this file must NOT hold "to be added" style placeholder copy.
 * Missing content is never rendered: empty sections, fields and media are
 * hidden in both draft and published mode (see `hasText` in lib/content.ts).
 * What belongs in each empty field is documented in src/types/project.ts,
 * src/types/site.ts and README.md, not on the page.
 */
export const placeholders = {
  /** Shown only when a media file referenced in the content fails to load (a broken path). */
  mediaUnavailable: 'Media could not be loaded',

  /** Accuracy markers on unverified awards. Unverified awards only appear in draft mode. */
  recognitionPending: 'Pending verification against the certificate',
  recognitionPendingShort: 'Pending verification',
} as const;
