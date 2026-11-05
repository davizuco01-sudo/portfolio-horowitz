import type { SiteConfig } from '../types/site';

/**
 * Site identity, introduction and personal links.
 *
 * Everything in this file is the applicant's own content.
 * - `null` / `[]` = not provided yet. The element, and its whole section when
 *   nothing else is filled in, is hidden in both draft and published mode.
 * - Only add real, verified information. Never add example or invented links.
 */
export const site: SiteConfig = {
  /**
   * Switch to "published" once the Pre-Submission Checklist in README.md is
   * complete. Its only effect: unverified awards are hidden when published.
   */
  portfolioStatus: 'draft',

  // Navbar, footer and browser tab title ("David Gala | Portfolio" on the homepage).
  name: 'David Gala',

  // Small label above the hero heading, shown as "MATHEMATICAL ENGINEERING · AI · SOFTWARE".
  discipline: 'Mathematical Engineering',
  interests: ['AI', 'Software'],

  hero: {
    // The large homepage heading (the page's <h1>). Text approved by the applicant.
    heading: 'David Gala',
    // Approved by the applicant; copy verbatim.
    introduction: [
      "I'm a Mathematical Engineering student who started building with AI out of curiosity. I've been exploring how to turn what I learn into useful software.",
    ],
    // Optional, e.g. { label: 'GitHub profile', url: 'https://github.com/<username>' }
    secondaryLink: null,
  },

  about: {
    // TODO(applicant): a short introduction to your background and how your interests evolved.
    introduction: [],
  },

  contact: {
    // TODO(applicant): optional sentence about how you prefer to be contacted.
    introduction: [],
    // TODO(applicant): add only real destinations. Unset links are not shown.
    email: null,
    github: null,
    linkedin: null,
    resume: null,
  },
};
