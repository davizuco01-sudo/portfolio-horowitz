/**
 * Neutral draft placeholders.
 *
 * Shown only while `site.portfolioStatus` is "draft", wherever real content
 * has not been provided yet. They are scaffolding, never final content, and
 * they disappear automatically once the site is published.
 */
export const placeholders = {
  name: 'Your Name',
  heroHeading: 'A short explanation of what I build and why',
  heroIntroduction: 'Personal introduction to be added',
  aboutIntroduction: 'Personal background to be added',
  milestoneBody: 'To be written',
  contactIntroduction: 'Contact details to be added',
  contactLink: 'To be added',
  projectSummary: 'Short description to be added',

  media: 'Project preview to be added',
  mediaShort: 'Preview to be added',
  mediaUnavailable: 'Media could not be loaded',

  recognitionPending: 'Pending verification against the certificate',
  recognitionPendingShort: 'Pending verification',
  recognitionCategory: 'Category wording to be confirmed',

  draftLabel: 'Draft',

  /** Guidance shown in empty project sections. Describes what belongs there. */
  sections: {
    problem:
      'What problem motivated this project, why it was interesting, and what made it worth investigating.',
    built:
      'A functional overview, the core features, your personal contributions, and important implementation details.',
    howItWorks:
      'Screenshots, short videos, architecture diagrams or numbered steps showing how the project works, with captions.',
    challenges:
      'Technical difficulties and decisions: what made each one hard, the approach taken, and the result or current limitation.',
    lessons: 'Technical lessons, product lessons, research insights and changes in thinking.',
    results:
      'Demonstrated results, documented recognition or usage, current limitations and planned next steps.',
    links:
      'Links to the repository, a live demo, a video demonstration or documentation will appear here once added.',
  },
} as const;
