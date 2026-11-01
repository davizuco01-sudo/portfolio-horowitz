import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { cn } from '../../lib/cn';
import { getAdjacentProjects, getStatusLabel, projectPath } from '../../lib/projects';
import type { Project } from '../../types/project';
import { PageContainer } from '../layout/PageContainer';

/** Previous / next links between project pages. */
export function ProjectNavigation({ project }: { project: Project }) {
  const { previous, next } = getAdjacentProjects(project);
  if (!previous && !next) return null;
  const text = labels.project.navigation;

  return (
    <nav aria-label={text.label} className="border-t border-line/60">
      <PageContainer className="grid gap-4 py-12 sm:grid-cols-2 sm:py-16">
        {previous && <AdjacentLink project={previous} label={text.previous} direction="previous" />}
        {next && <AdjacentLink project={next} label={text.next} direction="next" className="sm:col-start-2" />}
      </PageContainer>
    </nav>
  );
}

function AdjacentLink({
  project,
  label,
  direction,
  className,
}: {
  project: Project;
  label: string;
  direction: 'previous' | 'next';
  className?: string;
}) {
  const isNext = direction === 'next';
  const Arrow = isNext ? ArrowRight : ArrowLeft;

  return (
    <Link
      to={projectPath(project)}
      className={cn(
        'group flex flex-col rounded-2xl border border-line bg-surface/40 p-6 transition-colors duration-200 hover:border-line-strong hover:bg-surface',
        isNext && 'sm:items-end sm:text-right',
        className,
      )}
    >
      <span className={cn('eyebrow inline-flex items-center gap-2', isNext && 'flex-row-reverse')}>
        <Arrow
          aria-hidden
          className={cn(
            'size-3.5 transition-transform duration-200',
            isNext ? 'motion-safe:group-hover:translate-x-0.5' : 'motion-safe:group-hover:-translate-x-0.5',
          )}
        />
        {label}
      </span>
      <span className="mt-3 text-lg font-semibold tracking-tight text-fg">{project.title}</span>
      <span className="mt-1 text-sm text-fg-muted">{getStatusLabel(project)}</span>
    </Link>
  );
}
