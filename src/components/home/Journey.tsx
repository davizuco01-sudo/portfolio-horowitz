import { ArrowRight, Circle } from 'lucide-react';
import { Link } from 'react-router';
import { journey } from '../../data/journey';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { site } from '../../data/site';
import { formatIndex, hasText, isDraft } from '../../lib/content';
import { getProjectBySlug, projectPath } from '../../lib/projects';
import type { JourneyMilestone } from '../../types/site';
import { PageContainer } from '../layout/PageContainer';
import { Placeholder } from '../ui/Draft';
import { Prose } from '../ui/Prose';
import { SectionHeading } from '../ui/SectionHeading';

export function Journey() {
  const text = labels.sections.about;
  const introduction = site.about.introduction;

  return (
    <section id="about" aria-labelledby="about-title" className="border-t border-line/60 py-20 sm:py-24">
      <PageContainer className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading id="about-title" eyebrow={text.eyebrow} title={text.title} />
            {hasText(introduction) ? (
              <Prose paragraphs={introduction} className="mt-5" />
            ) : (
              isDraft && (
                <p className="mt-5 leading-7">
                  <Placeholder>{placeholders.aboutIntroduction}</Placeholder>
                </p>
              )
            )}
          </div>
        </div>

        <ol className="lg:col-span-8">
          {journey.map((milestone, index) => (
            <Milestone
              key={milestone.id}
              milestone={milestone}
              number={formatIndex(index + 1)}
              isLast={index === journey.length - 1}
            />
          ))}
        </ol>
      </PageContainer>
    </section>
  );
}

function Milestone({
  milestone,
  number,
  isLast,
}: {
  milestone: JourneyMilestone;
  number: string;
  isLast: boolean;
}) {
  const Icon = milestone.icon ?? Circle;
  const related = getProjectBySlug(milestone.relatedProject ?? undefined);

  return (
    <li className="grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7">
      <div className="flex flex-col items-center">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-full border border-line-strong bg-surface text-accent">
          <Icon aria-hidden className="size-4" strokeWidth={1.75} />
        </span>
        {!isLast && <span aria-hidden className="my-2 w-px flex-1 bg-line" />}
      </div>

      <div className={isLast ? 'pb-0' : 'pb-12'}>
        <p className="flex flex-wrap items-baseline gap-x-3 pt-2.5 font-mono text-xs text-fg-muted">
          <span>{number}</span>
          {milestone.date && <span>{milestone.date}</span>}
        </p>
        <h3 className="mt-1.5 text-lg font-semibold tracking-tight sm:text-xl">{milestone.title}</h3>

        {hasText(milestone.body) ? (
          <Prose paragraphs={milestone.body} size="sm" className="mt-3" />
        ) : (
          isDraft && (
            <p className="mt-2 text-[15px] leading-7">
              <Placeholder>{placeholders.milestoneBody}</Placeholder>
            </p>
          )
        )}

        {related && (
          <p className="mt-4 text-sm leading-6">
            <span className="text-fg-muted">{labels.journey.relatedProject}: </span>
            {related.hasDetailPage ? (
              <Link
                to={projectPath(related)}
                className="group rounded font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {related.title}
                <ArrowRight
                  aria-hidden
                  className="ml-1.5 inline size-3.5 align-[-0.15em] transition-transform motion-safe:group-hover:translate-x-0.5"
                />
              </Link>
            ) : (
              <span className="text-fg-secondary">{related.title}</span>
            )}
          </p>
        )}
      </div>
    </li>
  );
}
