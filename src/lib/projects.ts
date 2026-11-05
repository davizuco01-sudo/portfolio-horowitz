import { labels } from '../data/labels';
import { projects } from '../data/projects';
import type { Project, Recognition } from '../types/project';
import { formatIndex, isDraft, isMeaningful } from './content';

/** Projects shown in "Featured Projects", in content order. */
export const featuredProjects: Project[] = projects.filter((p) => p.featured);

/** Projects shown in "Other Experiments", in content order. */
export const experimentProjects: Project[] = projects.filter((p) => !p.featured);

/** Projects that have a /projects/<slug> page, in navigation order. */
export const detailProjects: Project[] = [...featuredProjects, ...experimentProjects].filter(
  (p) => p.hasDetailPage,
);

export function projectPath(project: Project): string {
  return `/projects/${project.slug}`;
}

export function getProjectBySlug(slug: string | undefined): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Returns the project only if it has a detail page. */
export function getDetailProject(slug: string | undefined): Project | undefined {
  return detailProjects.find((p) => p.slug === slug);
}

/** Display number for featured projects ("01", "02"...), or null. */
export function getProjectNumber(project: Project): string | null {
  const index = featuredProjects.indexOf(project);
  return index === -1 ? null : formatIndex(index + 1);
}

export function getStatusLabel(project: Project): string {
  return project.statusLabel ?? labels.status[project.status];
}

export function getAdjacentProjects(project: Project): {
  previous: Project | null;
  next: Project | null;
} {
  const index = detailProjects.indexOf(project);
  return {
    previous: index > 0 ? detailProjects[index - 1] : null,
    next: index >= 0 && index < detailProjects.length - 1 ? detailProjects[index + 1] : null,
  };
}

/**
 * Recognition entries that may be shown. Unverified entries are visible only
 * in draft mode, where they carry a "pending verification" marker.
 * This is the ONLY behaviour that `portfolioStatus` controls.
 */
export function getVisibleRecognition(project: Project): Recognition[] {
  return project.results.recognition.filter((r) => r.verified || isDraft);
}

export type ProjectLinkKind = 'repository' | 'liveDemo' | 'video' | 'certificate' | 'documentation';

export interface ResolvedLink {
  kind: ProjectLinkKind;
  label: string;
  url: string;
}

/** All real links for Section H. Missing links are simply absent. */
export function getProjectLinks(project: Project): ResolvedLink[] {
  const { repository, liveDemo, video, documentation } = project.links;
  const linkLabels = labels.project.links;
  const result: ResolvedLink[] = [];

  if (isMeaningful(repository)) result.push({ kind: 'repository', label: linkLabels.repository, url: repository });
  if (isMeaningful(liveDemo)) result.push({ kind: 'liveDemo', label: linkLabels.liveDemo, url: liveDemo });
  if (isMeaningful(video)) result.push({ kind: 'video', label: linkLabels.video, url: video });
  for (const award of getVisibleRecognition(project)) {
    if (isMeaningful(award.certificateUrl)) {
      result.push({ kind: 'certificate', label: linkLabels.certificate, url: award.certificateUrl });
    }
  }
  for (const doc of documentation) {
    if (isMeaningful(doc.url) && isMeaningful(doc.label)) {
      result.push({ kind: 'documentation', label: doc.label, url: doc.url });
    }
  }
  return result;
}

// Development-only sanity check for the content file.
if (import.meta.env.DEV) {
  const seen = new Set<string>();
  for (const project of projects) {
    if (seen.has(project.slug)) {
      console.error(`[content] Duplicate project slug "${project.slug}" in src/data/projects.ts`);
    }
    seen.add(project.slug);
  }
}
