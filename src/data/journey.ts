import { Code, Compass, Globe, Hammer, Lightbulb } from 'lucide-react';
import type { JourneyMilestone } from '../types/site';

/**
 * About / My Journey timeline.
 *
 * The five titles are structural headings agreed in the brief, not finished
 * biographical claims. Rename, reorder, add or remove milestones freely.
 *
 * TODO(applicant): write each `body` in your own words. Add a `date` only if
 * you want one shown. `relatedProject` takes a project slug from projects.ts.
 */
export const journey: JourneyMilestone[] = [
  {
    id: 'curiosity',
    title: 'Initial curiosity about AI',
    date: null,
    body: [],
    relatedProject: null,
    icon: Lightbulb,
  },
  {
    id: 'independent-projects',
    title: 'Learning through independent software projects',
    date: null,
    body: [],
    relatedProject: null,
    icon: Code,
  },
  {
    id: 'hackathon',
    title: 'Participating in a generative AI hackathon',
    date: null,
    body: [],
    relatedProject: '3d-printer-assistant',
    icon: Hammer,
  },
  {
    id: 'opportunities',
    title: 'Exploring business opportunities',
    date: null,
    body: [],
    relatedProject: 'opportunity-radar',
    icon: Compass,
  },
  {
    id: 'real-world',
    title: 'Working toward real-world applications',
    date: null,
    body: [],
    relatedProject: null,
    icon: Globe,
  },
];
