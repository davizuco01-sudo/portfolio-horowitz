import { ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { cn } from '../../lib/cn';
import { isDraft, newTabProps } from '../../lib/content';
import { getStatusLabel, projectPath } from '../../lib/projects';
import type { Project } from '../../types/project';
import { StatusBadge, TagList } from '../ui/Badge';
import { Placeholder } from '../ui/Draft';
import { MediaPreview } from './ProjectMedia';

/**
 * Compact card for secondary projects.
 *
 * Linking rules (never links to something that does not exist):
 * - `hasDetailPage: true` → the whole card links to /projects/<slug>.
 * - otherwise, a live demo or repository URL is shown as a small external link.
 * - otherwise, the card is not interactive.
 */
export function ExperimentCard({ project }: { project: Project }) {
  const externalUrl = project.links.liveDemo ?? project.links.repository;
  const externalLabel = project.links.liveDemo ? labels.project.links.liveDemo : labels.project.links.repository;

  return (
    <article
      className={cn(
        'group relative flex gap-4 rounded-2xl border border-line bg-surface/60 p-4 sm:gap-5 sm:p-5',
        project.hasDetailPage &&
          'transition-colors duration-300 hover:border-line-strong has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent',
      )}
    >
      <div className="relative aspect-[4/3] w-24 shrink-0 self-start overflow-hidden rounded-lg border border-line sm:w-36">
        <MediaPreview media={project.cover} compact />
      </div>

      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
          <StatusBadge status={project.status} label={getStatusLabel(project)} />
          {project.category && <span className="font-mono text-xs text-fg-muted">{project.category}</span>}
        </div>

        <h3 className="mt-3 text-lg font-semibold tracking-tight text-fg">
          {project.hasDetailPage ? (
            <Link to={projectPath(project)} className="outline-none after:absolute after:inset-0 after:content-['']">
              {project.title}
            </Link>
          ) : (
            project.title
          )}
        </h3>

        {(project.summary || isDraft) && (
          <p className="mt-2 text-sm leading-6 text-fg-secondary">
            {project.summary ?? <Placeholder>{placeholders.projectSummary}</Placeholder>}
          </p>
        )}

        <TagList items={project.technologies} label={labels.project.facts.technologies} className="mt-4" />

        {!project.hasDetailPage && externalUrl && (
          <a
            href={externalUrl}
            {...newTabProps(externalUrl)}
            className="mt-4 inline-flex items-center gap-1.5 self-start rounded text-sm font-medium text-accent transition-colors hover:text-accent-hover"
          >
            {externalLabel}
            <span className="sr-only"> {labels.newTab}</span>
            <ArrowUpRight aria-hidden className="size-4" />
          </a>
        )}
      </div>
    </article>
  );
}
