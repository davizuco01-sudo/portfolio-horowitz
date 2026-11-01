/**
 * Content model for projects.
 *
 * Conventions used throughout the content files:
 * - `null` means "not provided yet".
 * - An empty array (`[]`) means "nothing written yet".
 * - Empty content renders as a neutral draft placeholder while the portfolio is
 *   in draft mode, and is hidden entirely once it is published.
 */

/** Ordered paragraphs of plain text. One string per paragraph. */
export type Paragraphs = string[];

export type ProjectStatus = 'in-development' | 'prototype' | 'experiment';

/* -------------------------------------------------------------------------- */
/* Media                                                                      */
/* -------------------------------------------------------------------------- */

interface MediaBase {
  /** Optional caption displayed below the media. */
  caption?: string;
  /**
   * CSS aspect ratio of the frame, e.g. "16 / 9" or "4 / 3".
   * Space is reserved before the file loads, which prevents layout shift.
   * Match it to your screenshot's real proportions. Defaults to "16 / 10".
   */
  aspectRatio?: string;
}

/** PNG, JPG or WebP stored under /public/media/... */
export interface ImageMedia extends MediaBase {
  type: 'image';
  /** Path from the site root, e.g. "/media/customs/review-screen.webp". */
  src: string;
  /** Required. Describe what the image shows for people who cannot see it. */
  alt: string;
  /** Intrinsic pixel size. Optional, but recommended. */
  width?: number;
  height?: number;
}

/** Short MP4 clip stored under /public/media/... */
export interface VideoMedia extends MediaBase {
  type: 'video';
  /** Path from the site root, e.g. "/media/printer-ai/demo.mp4". */
  src: string;
  /** Required. Short description of what the video shows. */
  title: string;
  /** Optional still image shown before playback. */
  poster?: string;
  /** Optional WebVTT captions file, e.g. "/media/printer-ai/demo.en.vtt". */
  captions?: string;
}

/** Video hosted elsewhere (YouTube, Vimeo, Loom...). Rendered as a link. */
export interface ExternalVideoMedia extends MediaBase {
  type: 'external-video';
  url: string;
  /** Required. Short description of what the video shows. */
  title: string;
  /** Optional local thumbnail image. */
  thumbnail?: string;
}

export type MediaItem = ImageMedia | VideoMedia | ExternalVideoMedia;

/* -------------------------------------------------------------------------- */
/* Project sections                                                           */
/* -------------------------------------------------------------------------- */

/** Section C: What I Built. */
export interface ProjectBuild {
  /** Functional overview. */
  overview: Paragraphs;
  /** Core features, one per item. */
  features: string[];
  /** What you personally contributed, one per item. */
  contributions: string[];
  /** Important implementation details. */
  implementation: Paragraphs;
}

/** One step in Section D: How It Works. */
export interface ProjectStep {
  title: string;
  description: string | null;
  media?: MediaItem;
}

/** Section D: How It Works. */
export interface ProjectWalkthrough {
  intro: Paragraphs;
  /** Optional numbered steps. */
  steps: ProjectStep[];
  /** Screenshots, clips and diagrams with captions. */
  gallery: MediaItem[];
}

/** One entry in Section E: Challenges & Decisions. */
export interface ProjectChallenge {
  title: string;
  description: string | null;
  /** What made it difficult. */
  difficulty: string | null;
  /** The approach taken. */
  approach: string | null;
  /** The result, or the current limitation. */
  outcome: string | null;
}

/** Section F: What I Learned. */
export interface ProjectLessons {
  technical: string[];
  product: string[];
  research: string[];
  /** Changes in thinking. */
  thinking: string[];
}

/** An award or other recognition, worded exactly as on the official document. */
export interface Recognition {
  /** Award title, e.g. the placement. */
  title: string;
  /** Competition or event name. */
  event: string | null;
  /** Category wording. */
  category: string | null;
  date: string | null;
  /** Certificate path (e.g. "/certificates/award.pdf") or URL. */
  certificateUrl: string | null;
  /**
   * Set to true only after checking every field against the official
   * certificate. Unverified entries are hidden once the site is published.
   */
  verified: boolean;
}

/** Section G: Results & Next Steps. */
export interface ProjectResults {
  /** Results you can demonstrate. */
  demonstrated: string[];
  recognition: Recognition[];
  /** Usage or traction. Only include figures you can document. */
  traction: string[];
  limitations: string[];
  nextSteps: string[];
}

export interface DocumentationLink {
  label: string;
  url: string;
}

/** Section H: Links. Leave as null when there is no real destination. */
export interface ProjectLinks {
  repository: string | null;
  liveDemo: string | null;
  video: string | null;
  documentation: DocumentationLink[];
  // Award certificates are listed automatically from `results.recognition`.
}

/* -------------------------------------------------------------------------- */
/* Project                                                                    */
/* -------------------------------------------------------------------------- */

export interface Project {
  /** URL segment: /projects/<slug>. Must be unique. */
  slug: string;
  title: string;
  category: string | null;
  status: ProjectStatus;
  /** Optional wording that overrides the default status label. */
  statusLabel?: string;
  /** Featured projects appear in "Featured Projects"; the rest in "Other Experiments". */
  featured: boolean;
  /** Generates a /projects/<slug> case-study page. */
  hasDetailPage: boolean;
  /** Free text, e.g. "2025 – present". */
  timeframe: string | null;
  /** One or two sentences used on cards and at the top of the project page. */
  summary: string | null;
  technologies: string[];
  /** Main preview, used on cards and in the project overview. */
  cover: MediaItem | null;

  problem: Paragraphs;
  built: ProjectBuild;
  howItWorks: ProjectWalkthrough;
  challenges: ProjectChallenge[];
  lessons: ProjectLessons;
  results: ProjectResults;
  links: ProjectLinks;
}

/**
 * Input accepted by `defineProject`. Only the identifying fields are required;
 * everything else defaults to empty.
 */
export type ProjectInput = Pick<Project, 'slug' | 'title' | 'status' | 'featured'> &
  Partial<
    Omit<
      Project,
      'slug' | 'title' | 'status' | 'featured' | 'built' | 'howItWorks' | 'lessons' | 'results' | 'links'
    >
  > & {
    built?: Partial<ProjectBuild>;
    howItWorks?: Partial<ProjectWalkthrough>;
    lessons?: Partial<ProjectLessons>;
    results?: Partial<ProjectResults>;
    links?: Partial<ProjectLinks>;
  };
