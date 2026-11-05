import type { Project, ProjectInput } from '../types/project';

/**
 * Builds a complete `Project` record from partial input, filling every
 * omitted field with an empty value (`null` or `[]`).
 *
 * This keeps the content file short and guarantees that every section the
 * templates read exists, even when nothing has been written for it yet.
 */
export function defineProject(input: ProjectInput): Project {
  return {
    category: null,
    hasDetailPage: input.featured,
    timeframe: null,
    summary: null,
    technologies: [],
    cover: null,
    featuredMedia: null,
    sectionTitles: {},
    problem: [],
    challengesOverview: [],
    challenges: [],
    ...input,
    built: {
      overview: [],
      features: [],
      contributions: [],
      implementation: [],
      ...input.built,
    },
    howItWorks: {
      intro: [],
      steps: [],
      gallery: [],
      galleryLayout: 'grid',
      ...input.howItWorks,
    },
    lessons: {
      overview: [],
      technical: [],
      product: [],
      research: [],
      thinking: [],
      ...input.lessons,
    },
    results: {
      overview: [],
      demonstrated: [],
      recognition: [],
      traction: [],
      limitations: [],
      nextSteps: [],
      ...input.results,
    },
    links: {
      repository: null,
      liveDemo: null,
      video: null,
      documentation: [],
      ...input.links,
    },
  };
}
