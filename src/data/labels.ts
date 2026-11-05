/**
 * Structural interface copy: navigation, section titles and field labels.
 *
 * This is NOT personal content. It names the parts of the site and is safe to
 * keep as it is. Edit it if you prefer different wording.
 */
export const labels = {
  nav: {
    work: 'Work',
    about: 'About',
    contact: 'Contact',
    github: 'GitHub',
    menu: 'Menu',
    primary: 'Primary',
    skipToContent: 'Skip to content',
    home: 'home',
  },

  hero: {
    primaryAction: 'View featured work',
    indexTitle: 'Selected work',
    otherExperiments: (count: number) =>
      `${count} other experiment${count === 1 ? '' : 's'}`,
  },

  sections: {
    work: { eyebrow: 'Work', title: 'Featured Projects' },
    experiments: {
      eyebrow: 'Experiments',
      title: 'Other Experiments',
      description: 'Smaller projects and early explorations.',
    },
    about: { eyebrow: 'About', title: 'My Journey' },
    contact: { eyebrow: 'Contact', title: 'Contact & Links' },
  },

  status: {
    'in-development': 'In Development',
    prototype: 'Prototype',
    experiment: 'Experiment',
  },

  card: {
    viewProject: 'View project',
    projectCount: (count: number) => `${count} project${count === 1 ? '' : 's'}`,
  },

  journey: {
    relatedProject: 'Related project',
  },

  contact: {
    email: 'Email',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    resume: 'Resume',
    resumeValue: 'Download PDF',
  },

  project: {
    breadcrumb: 'Breadcrumb',
    breadcrumbRoot: 'Work',
    number: (n: string) => `Project ${n}`,
    experiment: 'Experiment',
    onThisPage: 'On this page',
    facts: {
      category: 'Category',
      status: 'Status',
      timeframe: 'Timeframe',
      technologies: 'Technologies',
      recognition: 'Recognition',
    },
    sections: {
      problem: 'The Problem',
      built: 'What I Built',
      howItWorks: 'How It Works',
      challenges: 'Challenges & Decisions',
      lessons: 'What I Learned',
      results: 'Results & Next Steps',
      links: 'Links',
    },
    built: {
      overview: 'Overview',
      features: 'Core features',
      contributions: 'My contributions',
      implementation: 'Implementation details',
    },
    challenge: {
      number: (n: string) => `Challenge ${n}`,
      difficulty: 'What made it difficult',
      approach: 'Approach taken',
      outcome: 'Result or current limitation',
    },
    lessons: {
      technical: 'Technical lessons',
      product: 'Product lessons',
      research: 'Research insights',
      thinking: 'Changes in thinking',
    },
    results: {
      demonstrated: 'Demonstrated results',
      recognition: 'Awards & recognition',
      traction: 'Documented usage',
      limitations: 'Current limitations',
      nextSteps: 'Next steps',
      category: 'Category',
      viewCertificate: 'View certificate',
    },
    links: {
      repository: 'View Source on GitHub',
      liveDemo: 'Live demo',
      video: 'Video demonstration',
      certificate: 'Award certificate',
    },
    navigation: {
      label: 'More projects',
      previous: 'Previous project',
      next: 'Next project',
    },
  },

  media: {
    enlarge: 'Enlarge image',
    close: 'Close image viewer',
    watchVideo: 'Watch video',
  },

  newTab: '(opens in a new tab)',

  notFound: {
    eyebrow: 'Error 404',
    title: 'Page not found',
    body: 'This page does not exist. It may have been moved, or the address may be mistyped.',
    home: 'Back to home',
    projects: 'View projects',
  },

  error: {
    eyebrow: 'Error',
    title: 'Something went wrong',
    body: 'This page could not be displayed. Reloading usually helps.',
    reload: 'Reload page',
    home: 'Back to home',
  },

  footer: {
    navigation: 'Footer',
  },
} as const;
