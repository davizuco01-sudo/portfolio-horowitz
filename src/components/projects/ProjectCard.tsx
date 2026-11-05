import { ArrowRight, Award } from 'lucide-react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { cn } from '../../lib/cn';
import { isMeaningful } from '../../lib/content';
import { getStatusLabel, getVisibleRecognition, projectPath } from '../../lib/projects';
import type { Project } from '../../types/project';
import { StatusBadge, TagList } from '../ui/Badge';
import { hasMediaPreview } from '../../lib/media';
import { MediaPreview } from './ProjectMedia';

interface ProjectCardProps {
  project: Project;
  /** Display number, e.g. "01". */
  number: string;
  /** Larger horizontal layout for the lead project. */
  prominent?: boolean;
  className?: string;
}

/**
 * Featured project card. The whole card is clickable through a single real
 * link (the title), stretched over the card with a pseudo-element.
 */
export function ProjectCard({ project, number, prominent = false, className }: ProjectCardProps) {
  const award = getVisibleRecognition(project)[0];
  const cover = hasMediaPreview(project.cover) ? project.cover : null;
  // The split image/text layout only makes sense when there is an image.
  const split = prominent && cover !== null;

  return (
    <article
      className={cn(
        'group relative flex flex-col overflow-hidden rounded-2xl border border-line bg-surface transition-[border-color,translate] duration-300 ease-out-soft hover:border-line-strong motion-safe:hover:-translate-y-0.5',
        'has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-4 has-[a:focus-visible]:outline-accent',
        split && 'lg:grid lg:grid-cols-12',
        className,
      )}
    >
      {cover && (
        <div
          className={cn(
            'relative overflow-hidden border-b border-line',
            split
              ? 'aspect-[16/10] md:aspect-[2/1] lg:col-span-7 lg:aspect-auto lg:min-h-[26rem] lg:border-r lg:border-b-0'
              : 'aspect-[16/10]',
          )}
        >
          <MediaPreview media={cover} />
        </div>
      )}

      <div className={cn('flex flex-1 flex-col p-6 sm:p-7', split && 'lg:col-span-5 lg:p-10')}>
        <div className="flex items-center justify-between gap-4">
          <span className="font-mono text-xs text-fg-muted">{number}</span>
          <StatusBadge status={project.status} label={getStatusLabel(project)} />
        </div>

        <h3
          className={cn(
            'mt-6 font-semibold tracking-tight text-fg',
            prominent ? 'text-2xl sm:text-3xl' : 'text-xl sm:text-2xl',
          )}
        >
          <Link
            to={projectPath(project)}
            className="outline-none after:absolute after:inset-0 after:content-['']"
          >
            {project.title}
          </Link>
        </h3>

        {isMeaningful(project.category) && (
          <p className="mt-2 font-mono text-xs tracking-wide text-fg-muted">{project.category}</p>
        )}

        {isMeaningful(project.summary) && (
          <p className="mt-4 text-[15px] leading-7 text-fg-secondary">{project.summary}</p>
        )}

        {award && (
          <p className="mt-5 flex items-start gap-2.5 text-sm leading-6 text-fg-secondary">
            <Award aria-hidden className="mt-0.5 size-4 shrink-0 text-status-prototype" />
            <span>
              {award.title}
              {award.event && <span className="text-fg-muted"> · {award.event}</span>}
              {!award.verified && (
                <span className="ml-2 font-mono text-[11px] tracking-wider whitespace-nowrap text-fg-muted uppercase">
                  {placeholders.recognitionPendingShort}
                </span>
              )}
            </span>
          </p>
        )}

        <TagList items={project.technologies} label={labels.project.facts.technologies} className="mt-5" />

        <span
          aria-hidden
          className="mt-auto inline-flex items-center gap-1.5 pt-8 text-sm font-medium text-accent"
        >
          {labels.card.viewProject}
          <ArrowRight className="size-4 transition-transform duration-300 motion-safe:group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
