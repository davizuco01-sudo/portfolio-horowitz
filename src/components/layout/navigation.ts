import { labels } from '../../data/labels';

/** Section links shared by the navigation bar and the footer. */
export const sectionLinks = [
  { label: labels.nav.work, to: '/#work' },
  { label: labels.nav.about, to: '/#about' },
  { label: labels.nav.contact, to: '/#contact' },
] as const;
