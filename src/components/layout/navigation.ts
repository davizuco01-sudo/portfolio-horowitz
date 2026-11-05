import { labels } from '../../data/labels';
import { homeSections } from '../../lib/homeSections';

/**
 * Section links shared by the navigation bar and the footer.
 * Links to homepage sections that are hidden (no content yet) are omitted.
 */
export const sectionLinks = [
  { label: labels.nav.work, to: '/#work', visible: homeSections.work },
  { label: labels.nav.about, to: '/#about', visible: homeSections.about },
  { label: labels.nav.contact, to: '/#contact', visible: homeSections.contact },
]
  .filter((link) => link.visible)
  .map(({ label, to }) => ({ label, to }));
