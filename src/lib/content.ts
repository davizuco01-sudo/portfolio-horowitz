import { site } from '../data/site';

/** True while the portfolio is in draft mode (see src/data/site.ts). */
export const isDraft = site.portfolioStatus === 'draft';

/** Name used in titles and the navigation bar. Never invented. */
export const siteTitle = site.name ?? 'Portfolio';

/** 1 → "01" */
export function formatIndex(index: number): string {
  return String(index).padStart(2, '0');
}

/** True when a value contains written content. */
export function hasText(value: string | readonly string[] | null | undefined): boolean {
  if (value == null) return false;
  if (typeof value === 'string') return value.trim().length > 0;
  return value.some((item) => item.trim().length > 0);
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
