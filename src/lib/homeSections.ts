import { journey } from '../data/journey';
import { site } from '../data/site';
import type { JourneyMilestone } from '../types/site';
import { hasText, isMeaningful } from './content';
import { experimentProjects, featuredProjects } from './projects';

/*
 * Single source of truth for which homepage sections render.
 *
 * A section renders only when it has real content (see `hasText`). The section
 * components AND the navigation (navbar, footer, hero links) read these flags,
 * so a hidden section never leaves a link pointing at a missing anchor.
 */

/** Timeline entries with written text. A title alone is template structure, not content. */
export const visibleJourney: JourneyMilestone[] = journey.filter((milestone) => hasText(milestone.body));

export const homeSections = {
  work: featuredProjects.length > 0,
  experiments: experimentProjects.length > 0,
  about: hasText(site.about.introduction) || visibleJourney.length > 0,
  contact:
    hasText(site.contact.introduction) ||
    [site.contact.email, site.contact.github, site.contact.linkedin, site.contact.resume].some(isMeaningful),
} as const;
