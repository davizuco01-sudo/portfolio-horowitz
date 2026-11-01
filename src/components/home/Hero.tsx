import { ArrowDown, ArrowUpRight } from 'lucide-react';
import { Fragment } from 'react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { site } from '../../data/site';
import { cn } from '../../lib/cn';
import { hasText, isDraft, siteTitle } from '../../lib/content';
import {
  experimentProjects,
  featuredProjects,
  getProjectNumber,
  getStatusLabel,
  projectPath,
} from '../../lib/projects';
import { PageContainer } from '../layout/PageContainer';
import { StatusDot } from '../ui/Badge';
import { ButtonLink } from '../ui/Button';
import { Placeholder } from '../ui/Draft';
import { Prose } from '../ui/Prose';

export function Hero() {
  const { name, discipline, interests, hero } = site;
  const labelItems = [discipline, ...interests].filter((item): item is string => Boolean(item));

  return (
    <section aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 bg-blueprint opacity-50 [mask-image:radial-gradient(ellipse_75%_65%_at_15%_0%,black,transparent)]"
      />

      <PageContainer className="pt-16 pb-20 sm:pt-24 sm:pb-24 lg:pt-32 lg:pb-28">
        {labelItems.length > 0 && (
          <p className="eyebrow flex flex-wrap items-center gap-x-3 gap-y-1.5 motion-safe:animate-rise">
            {labelItems.map((item, index) => (
              <Fragment key={item}>
                {index > 0 && (
                  <span aria-hidden className="text-line-strong">
                    /
                  </span>
                )}
                <span>{item}</span>
              </Fragment>
            ))}
          </p>
        )}

        <div className="mt-8 grid gap-14 lg:grid-cols-12 lg:items-end lg:gap-12">
          <div className="motion-safe:animate-rise lg:col-span-7">
            <h1 id="hero-title" className="text-lg font-medium text-fg sm:text-xl">
              {name ?? (isDraft ? <Placeholder>{placeholders.name}</Placeholder> : siteTitle)}
            </h1>

            {(hero.heading || isDraft) && (
              <p className="mt-4 text-4xl leading-[1.08] font-semibold tracking-[-0.025em] text-fg sm:text-5xl lg:text-[3.5rem]">
                {hero.heading ?? <Placeholder>{placeholders.heroHeading}</Placeholder>}
              </p>
            )}

            {hasText(hero.introduction) ? (
              <Prose paragraphs={hero.introduction} size="lg" className="mt-6 max-w-xl" />
            ) : (
              isDraft && (
                <p className="mt-6 max-w-xl text-lg leading-8">
                  <Placeholder>{placeholders.heroIntroduction}</Placeholder>
                </p>
              )
            )}

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <ButtonLink to="/#work" iconEnd={<ArrowDown aria-hidden className="size-4" />}>
                {labels.hero.primaryAction}
              </ButtonLink>
              {hero.secondaryLink && (
                <ButtonLink href={hero.secondaryLink.url} variant="secondary">
                  {hero.secondaryLink.label}
                </ButtonLink>
              )}
            </div>
          </div>

          <ProjectIndex className="motion-safe:animate-rise motion-safe:[animation-delay:120ms] lg:col-span-5" />
        </div>
      </PageContainer>
    </section>
  );
}

/** Compact index of the featured projects, generated from the project data. */
function ProjectIndex({ className }: { className?: string }) {
  return (
    <nav aria-labelledby="project-index-title" className={cn('rounded-2xl border border-line bg-surface/60 p-2', className)}>
      <h2 id="project-index-title" className="eyebrow px-4 pt-3 pb-2">
        {labels.hero.indexTitle}
      </h2>
      <ol className="space-y-0.5">
        {featuredProjects.map((project) => (
          <li key={project.slug}>
            <Link
              to={projectPath(project)}
              className="group flex items-center gap-4 rounded-xl px-4 py-3.5 transition-colors duration-200 hover:bg-surface-2/60"
            >
              <span className="font-mono text-xs text-fg-muted">{getProjectNumber(project)}</span>
              <span className="min-w-0 flex-1">
                <span className="block text-[15px] leading-snug font-medium text-fg">{project.title}</span>
                <span className="mt-1 flex items-center gap-2 text-xs text-fg-muted">
                  <StatusDot status={project.status} />
                  {getStatusLabel(project)}
                </span>
              </span>
              <ArrowUpRight
                aria-hidden
                className="size-4 shrink-0 text-fg-muted transition-colors group-hover:text-accent"
              />
            </Link>
          </li>
        ))}
      </ol>
      {experimentProjects.length > 0 && (
        <div className="mx-2 mt-1 border-t border-line/70 pt-1">
          <Link
            to="/#experiments"
            className="-mx-2 flex items-center justify-between rounded-xl px-4 py-3 text-xs text-fg-muted transition-colors hover:bg-surface-2/60 hover:text-fg"
          >
            {labels.hero.otherExperiments(experimentProjects.length)}
            <ArrowDown aria-hidden className="size-3.5" />
          </Link>
        </div>
      )}
    </nav>
  );
}
