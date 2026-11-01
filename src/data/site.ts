import type { SiteConfig } from '../types/site';

/**
 * Site identity, introduction and personal links.
 *
 * Everything in this file is the applicant's own content.
 * - `null` / `[]` = not provided yet. Draft mode shows a neutral placeholder;
 *   published mode hides the element.
 * - Only add real, verified information. Never add example or invented links.
 */
export const site: SiteConfig = {
  /**
   * Switch to "published" once the Pre-Submission Checklist in README.md is
   * complete. Published mode hides every remaining placeholder.
   */
  portfolioStatus: 'draft',

  // TODO(applicant): your full name.
  name: null,

  // Known context from the project brief.
  discipline: 'Mathematical Engineering Student',
  interests: ['Artificial Intelligence', 'Building Software'],

  hero: {
    // TODO(applicant): one sentence, in your own words, about what you build and why.
    heading: null,
    // TODO(applicant): a short personal introduction (one or two short paragraphs).
    introduction: [],
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
