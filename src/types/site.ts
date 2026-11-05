import type { LucideIcon } from 'lucide-react';
import type { Paragraphs } from './project';

/**
 * Missing content is hidden in BOTH modes; no placeholders are ever rendered.
 * - "draft": unverified awards are shown with a "pending verification" marker.
 * - "published": unverified awards are hidden.
 */
export type PortfolioStatus = 'draft' | 'published';

export interface LabeledLink {
  label: string;
  url: string;
}

export interface SiteConfig {
  portfolioStatus: PortfolioStatus;

  /** Full name as it should appear on the site. */
  name: string | null;
  /** Small educational or disciplinary label shown in the hero. */
  discipline: string | null;
  /** Short interest labels shown next to the discipline. */
  interests: string[];

  hero: {
    /** One introductory sentence, in your own words. */
    heading: string | null;
    /** A short personal introduction. */
    introduction: Paragraphs;
    /** Optional secondary button, e.g. a GitHub profile. */
    secondaryLink: LabeledLink | null;
  };

  about: {
    /** Introductory text shown beside the journey timeline. */
    introduction: Paragraphs;
  };

  contact: {
    introduction: Paragraphs;
    /** Plain address, e.g. "name@example.com" (no "mailto:"). */
    email: string | null;
    /** Full URL, e.g. "https://github.com/username". */
    github: string | null;
    /** Full URL, e.g. "https://www.linkedin.com/in/username". */
    linkedin: string | null;
    /** Path to a PDF in /public (e.g. "/resume.pdf") or a full URL. */
    resume: string | null;
  };
}

export interface JourneyMilestone {
  /** Stable identifier, used as a React key. */
  id: string;
  title: string;
  /** Free text, e.g. "2025". Leave null if you prefer not to show a date. */
  date: string | null;
  body: Paragraphs;
  /** Slug of a related project, if any. */
  relatedProject: string | null;
  /** Any icon from https://lucide.dev/icons. */
  icon: LucideIcon | null;
}
