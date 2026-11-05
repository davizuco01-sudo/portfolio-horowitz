import { site } from '../data/site';

/**
 * True while the portfolio is in draft mode (see src/data/site.ts).
 *
 * Draft mode does NOT show placeholders: empty content is hidden in both modes.
 * Its only effect is that unverified awards stay visible, marked
 * "Pending verification" (see getVisibleRecognition in lib/projects.ts).
 */
export const isDraft = site.portfolioStatus === 'draft';

/**
 * Leftover scaffolding text that must never reach the page, e.g. "TODO",
 * "TBD", "To be added", "Lorem ipsum". Such strings count as empty.
 */
const PLACEHOLDER_TEXT = /^(todo\b|tbd\b|tba\b|to be (added|written|confirmed|completed)\b|lorem ipsum\b|placeholder\b)/i;

/** True when a single string is real, written content. */
export function isMeaningful(text: string | null | undefined): text is string {
  if (text == null) return false;
  const trimmed = text.trim();
  return trimmed.length > 0 && !PLACEHOLDER_TEXT.test(trimmed);
}

/** Keeps only the strings that are real, written content. */
export function meaningful(items: readonly string[]): string[] {
  return items.filter(isMeaningful);
}

/** Name used in titles and the navigation bar. Never invented. */
export const siteTitle = isMeaningful(site.name) ? site.name.trim() : 'Portfolio';

/** Homepage browser tab title: "<name> | Portfolio", or "Portfolio" until a name is set. */
export const homeDocumentTitle = isMeaningful(site.name) ? `${site.name.trim()} | Portfolio` : 'Portfolio';

/** 1 → "01" */
export function formatIndex(index: number): string {
  return String(index).padStart(2, '0');
}

/**
 * True when a value contains real written content. Whitespace, null, empty
 * arrays and placeholder text (see PLACEHOLDER_TEXT) all count as empty.
 * Every content-driven section uses this to decide whether it renders at all.
 */
export function hasText(value: string | readonly string[] | null | undefined): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return isMeaningful(value);
  return value.some(isMeaningful);
}

/** "https://www.github.com/user/" → "github.com/user" */
export function prettyUrl(url: string): string {
  return url
    .replace(/^mailto:/, '')
    .replace(/^https?:\/\/(www\.)?/, '')
    .replace(/\/$/, '');
}

/**
 * Attributes for links that should open in a new tab: external pages and
 * documents (PDFs). Email links and in-site routes open normally.
 */
export function newTabProps(url: string): { target?: '_blank'; rel?: string } {
  const opensNewTab = /^https?:\/\//.test(url) || /\.pdf($|[?#])/i.test(url);
  return opensNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {};
}
