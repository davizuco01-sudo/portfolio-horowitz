import { defineProject } from '../lib/defineProject';

/**
 * All projects shown on the site.
 *
 * - Order matters: featured projects are numbered 01, 02, 03... in this order.
 * - `featured: true` → Featured Projects section; `false` → Other Experiments.
 * - `hasDetailPage: true` → a case-study page is generated at /projects/<slug>.
 * - Unknown content stays `null` or `[]`. Never fill gaps with guesses.
 * - Media files live in /public/media/<folder>/ and are referenced as
 *   "/media/<folder>/<file>". See README.md → "Replacing media placeholders".
 *
 * The one-line summaries below come from the project brief.
 * TODO(applicant): confirm each summary or rewrite it in your own words.
 */
export const projects = [
  /* ------------------------------------------------------------------------ */
  /* 01 — Customs Documentation AI                                            */
  /* Media folder: /public/media/customs/                                     */
  /* ------------------------------------------------------------------------ */
  defineProject({
    slug: 'customs-documentation',
    title: 'Customs Documentation AI',
    category: 'Applied AI / Document Processing',
    status: 'in-development',
    featured: true,
    hasDetailPage: true,
    timeframe: null, // TODO(applicant): e.g. '2025 – present'
    summary:
      'An application under development for extracting and structuring information from heterogeneous customs documents, with automated validation and human review.',
    technologies: [], // TODO(applicant): only technologies you actually used.
    cover: null, // TODO(applicant): { type: 'image', src: '/media/customs/<file>.webp', alt: '...' }

    // TODO(applicant): every section below is yours to write.
    problem: [],
    built: { overview: [], features: [], contributions: [], implementation: [] },
    howItWorks: { intro: [], steps: [], gallery: [] },
    challenges: [],
    lessons: { technical: [], product: [], research: [], thinking: [] },
    results: { demonstrated: [], recognition: [], traction: [], limitations: [], nextSteps: [] },
    links: { repository: null, liveDemo: null, video: null, documentation: [] },
  }),

  /* ------------------------------------------------------------------------ */
  /* 02 — 3D Printer AI Diagnostic Assistant                                  */
  /* Media folder: /public/media/printer-ai/                                  */
  /* ------------------------------------------------------------------------ */
  defineProject({
    slug: '3d-printer-assistant',
    title: '3D Printer AI Diagnostic Assistant',
    category: 'Multimodal AI / Rapid Prototyping',
    status: 'prototype',
    statusLabel: 'Hackathon Prototype',
    featured: true,
    hasDetailPage: true,
    timeframe: null,
    summary:
      'A prototype designed to assist users troubleshooting 3D printers using visual input and conversational assistance.',
    technologies: [],
    cover: null, // TODO(applicant): /media/printer-ai/<file>

    problem: [],
    built: { overview: [], features: [], contributions: [], implementation: [] },
    howItWorks: { intro: [], steps: [], gallery: [] },
    challenges: [],
    lessons: { technical: [], product: [], research: [], thinking: [] },
    results: {
      demonstrated: [],
      recognition: [
        {
          // Known fact: third place in a category of a national AWS generative AI competition.
          // TODO(applicant): replace `title`, `event` and `category` with the exact wording on the
          // certificate, add `date` and `certificateUrl` (e.g. '/certificates/<file>.pdf'),
          // then set `verified: true`. Unverified awards are hidden when the site is published.
          title: 'Third place (category award)',
          event: 'National AWS generative AI competition',
          category: null,
          date: null,
          certificateUrl: null,
          verified: false,
        },
      ],
      traction: [],
      limitations: [],
      nextSteps: [],
    },
    links: { repository: null, liveDemo: null, video: null, documentation: [] },
  }),

  /* ------------------------------------------------------------------------ */
  /* 03 — Business Opportunity Radar                                          */
  /* Media folder: /public/media/opportunity-radar/                           */
  /* ------------------------------------------------------------------------ */
  defineProject({
    slug: 'opportunity-radar',
    title: 'Business Opportunity Radar',
    category: 'Research Tools / Automation',
    status: 'experiment',
    statusLabel: 'Independent Experiment',
    featured: true,
    hasDetailPage: true,
    timeframe: null,
    summary:
      'An experimental system for collecting and analyzing publicly available signals about potential business problems.',
    technologies: [],
    cover: null, // TODO(applicant): /media/opportunity-radar/<file>

    problem: [],
    built: { overview: [], features: [], contributions: [], implementation: [] },
    howItWorks: { intro: [], steps: [], gallery: [] },
    challenges: [],
    lessons: { technical: [], product: [], research: [], thinking: [] },
    // Do not describe proven demand or revenue unless it can be documented.
    results: { demonstrated: [], recognition: [], traction: [], limitations: [], nextSteps: [] },
    links: { repository: null, liveDemo: null, video: null, documentation: [] },
  }),

  /* ------------------------------------------------------------------------ */
  /* Other Experiments (no detail pages yet)                                  */
  /* To give one a page later, set `hasDetailPage: true` and fill in sections.*/
  /* ------------------------------------------------------------------------ */
  defineProject({
    slug: 'mathematical-assistant',
    title: 'Mathematical AI Assistant',
    category: null, // TODO(applicant)
    status: 'experiment',
    featured: false,
    summary:
      'An early experiment involving AI-assisted mathematical problem solving and PDF explanations.',
    cover: null, // TODO(applicant): /media/mathematical-assistant/<file>
  }),

  defineProject({
    slug: 'safety-simulation',
    title: 'Multi-Agent Safety Simulation',
    category: null, // TODO(applicant)
    status: 'experiment',
    featured: false,
    summary: 'An experiment involving multiple AI agents analyzing or debating safety scenarios.',
    cover: null, // TODO(applicant): /media/safety-simulation/<file>
  }),
];
