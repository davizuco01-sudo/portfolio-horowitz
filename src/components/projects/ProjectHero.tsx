import { ArrowLeft, Award } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { isMeaningful } from '../../lib/content';
import { getProjectNumber, getStatusLabel, getVisibleRecognition } from '../../lib/projects';
import type { Project } from '../../types/project';
import { PageContainer } from '../layout/PageContainer';
import { StatusDot, TagList } from '../ui/Badge';
import { ProjectMedia } from './ProjectMedia';

/** Section A: Project Overview. */
export function ProjectHero({ project }: { project: Project }) {
  const number = getProjectNumber(project);
  const award = getVisibleRecognition(project)[0];
  const factLabels = labels.project.facts;
  const media = project.featuredMedia ?? project.cover;

  const facts: Array<{ label: string; value: ReactNode }> = [];
  if (isMeaningful(project.category)) facts.push({ label: factLabels.category, value: project.category });
  facts.push({
    label: factLabels.status,
    value: (
      <span className="inline-flex items-start gap-2">
        <StatusDot status={project.status} className="mt-[0.55rem]" />
        {getStatusLabel(project)}
      </span>
    ),
  });
  if (isMeaningful(project.timeframe)) facts.push({ label: factLabels.timeframe, value: project.timeframe });
  if (award) {
    facts.push({
      label: factLabels.recognition,
      value: (
        <span className="inline-flex items-start gap-2">
          <Award aria-hidden className="mt-0.5 size-4 shrink-0 text-status-prototype" />
          {award.title}
        </span>
      ),
    });
  }

  return (
    <header className="relative isolate overflow-hidden border-b border-line/60">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-blueprint opacity-40 [mask-image:radial-gradient(ellipse_60%_60%_at_10%_0%,black,transparent)]"
      />
      <PageContainer className="pt-8 pb-14 sm:pt-10 sm:pb-16">
        <nav aria-label={labels.project.breadcrumb}>
          <ol className="flex min-w-0 items-center gap-2 text-sm text-fg-muted">
            <li className="shrink-0">
              <Link to="/#work" className="inline-flex items-center gap-1.5 rounded transition-colors hover:text-fg">
                <ArrowLeft aria-hidden className="size-4" />
                {labels.project.breadcrumbRoot}
              </Link>
            </li>
            <li aria-hidden className="text-line-strong">
              /
            </li>
            <li aria-current="page" className="truncate text-fg-secondary">
              {project.title}
            </li>
          </ol>
        </nav>

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="motion-safe:animate-rise lg:col-span-8">
            <p className="eyebrow">{number ? labels.project.number(number) : labels.project.experiment}</p>
            <h1
              id="project-title"
              className="mt-4 text-4xl leading-[1.08] font-semibold tracking-[-0.025em] sm:text-5xl lg:text-[3.5rem]"
            >
              {project.title}
            </h1>
            {isMeaningful(project.summary) && (
              <p className="mt-6 max-w-2xl text-lg leading-8 text-fg-secondary">{project.summary}</p>
            )}
            <TagList items={project.technologies} label={factLabels.technologies} className="mt-6" />
          </div>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 rounded-2xl border border-line bg-surface/50 p-5 sm:p-6 lg:col-span-4 lg:grid-cols-1">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="eyebrow">{fact.label}</dt>
                <dd className="mt-1.5 text-sm leading-6 text-fg">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        {media && <ProjectMedia media={media} priority defaultAspectRatio="16 / 9" className="mt-12 sm:mt-16" />}
      </PageContainer>
    </header>
  );
}
