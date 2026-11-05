import { ArrowUpRight, Award, BookOpen, FolderGit2, Globe, Play } from 'lucide-react';
import type { ReactNode } from 'react';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { cn } from '../../lib/cn';
import { formatIndex, hasText, isMeaningful, newTabProps } from '../../lib/content';
import type { ProjectLinkKind, ResolvedLink } from '../../lib/projects';
import type {
  ProjectBuild,
  ProjectLessons,
  ProjectResults,
  ProjectWalkthrough,
  Recognition,
} from '../../types/project';
import { ButtonLink } from '../ui/Button';
import { BulletList, Prose } from '../ui/Prose';
import { ProjectMedia } from './ProjectMedia';
import { SubSection } from './ProjectSection';

/*
 * Bodies of the project page sections. Each renders only the parts that have
 * content; whole-section emptiness is handled by ProjectDetailLayout.
 */

/* Section C — What I Built ------------------------------------------------- */

export function BuiltContent({ built }: { built: ProjectBuild }) {
  const text = labels.project.built;
  // The "Overview" sub-heading only helps when other sub-sections follow it.
  const overviewOnly = ![built.features, built.contributions, built.implementation].some(hasText);
  return (
    <div className="space-y-10">
      {hasText(built.overview) &&
        (overviewOnly ? (
          <Prose paragraphs={built.overview} />
        ) : (
          <SubSection title={text.overview}>
            <Prose paragraphs={built.overview} />
          </SubSection>
        ))}
      {hasText(built.features) && (
        <SubSection title={text.features}>
          <BulletList items={built.features} />
        </SubSection>
      )}
      {hasText(built.contributions) && (
        <SubSection title={text.contributions}>
          <BulletList items={built.contributions} />
        </SubSection>
      )}
      {hasText(built.implementation) && (
        <SubSection title={text.implementation}>
          <Prose paragraphs={built.implementation} />
        </SubSection>
      )}
    </div>
  );
}

/* Section D — How It Works ------------------------------------------------- */

export function HowItWorksContent({ walkthrough }: { walkthrough: ProjectWalkthrough }) {
  const { intro, steps, gallery, galleryLayout } = walkthrough;
  return (
    <div className="space-y-12">
      <Prose paragraphs={intro} />

      {steps.length > 0 && (
        <ol className="space-y-10">
          {steps.map((step, index) => (
            <li key={`${index}-${step.title}`} className="grid gap-4 sm:grid-cols-[3rem_1fr]">
              <span
                aria-hidden
                className="flex size-9 items-center justify-center rounded-full border border-line-strong font-mono text-xs text-fg-secondary"
              >
                {formatIndex(index + 1)}
              </span>
              <div className="min-w-0">
                <h3 className="text-base font-semibold sm:pt-1.5">{step.title}</h3>
                {hasText(step.description) && (
                  <p className="mt-2 max-w-prose leading-7 text-fg-secondary">{step.description}</p>
                )}
                {step.media && <ProjectMedia media={step.media} className="mt-5" />}
              </div>
            </li>
          ))}
        </ol>
      )}

      {gallery.length > 0 && (
        <div
          className={cn(
            'grid gap-x-6 gap-y-10',
            galleryLayout === 'grid' && gallery.length > 1 && 'md:grid-cols-2',
          )}
        >
          {gallery.map((media, index) => (
            <ProjectMedia key={index} media={media} />
          ))}
        </div>
      )}
    </div>
  );
}

/* Section F — What I Learned ----------------------------------------------- */

export function LessonsContent({ lessons }: { lessons: ProjectLessons }) {
  const text = labels.project.lessons;
  const groups = [
    { title: text.technical, items: lessons.technical },
    { title: text.product, items: lessons.product },
    { title: text.research, items: lessons.research },
    { title: text.thinking, items: lessons.thinking },
  ].filter((group) => hasText(group.items));

  return (
    <div className="space-y-10">
      <Prose paragraphs={lessons.overview} />
      {groups.length > 0 && (
        <div className={cn('grid gap-5', groups.length > 1 && 'md:grid-cols-2')}>
          {groups.map((group) => (
            <div key={group.title} className="rounded-2xl border border-line bg-surface/40 p-6">
              <h3 className="text-base font-semibold">{group.title}</h3>
              <BulletList items={group.items} className="mt-4 text-[15px]" />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/* Section G — Results & Next Steps ----------------------------------------- */

export function ResultsContent({
  results,
  recognition,
}: {
  results: ProjectResults;
  /** Already filtered for the current portfolio status. */
  recognition: Recognition[];
}) {
  const text = labels.project.results;
  const lists = [
    { title: text.demonstrated, items: results.demonstrated },
    { title: text.traction, items: results.traction },
    { title: text.limitations, items: results.limitations },
    { title: text.nextSteps, items: results.nextSteps },
  ];
  const [demonstrated, ...rest] = lists;

  return (
    <div className="space-y-10">
      <Prose paragraphs={results.overview} />

      {hasText(demonstrated.items) && (
        <SubSection title={demonstrated.title}>
          <BulletList items={demonstrated.items} />
        </SubSection>
      )}

      {recognition.length > 0 && (
        <SubSection title={text.recognition}>
          <ul className="grid gap-4">
            {recognition.map((award) => (
              <RecognitionItem key={`${award.title}-${award.event ?? ''}`} award={award} />
            ))}
          </ul>
        </SubSection>
      )}

      {rest
        .filter((list) => hasText(list.items))
        .map((list) => (
          <SubSection key={list.title} title={list.title}>
            <BulletList items={list.items} />
          </SubSection>
        ))}
    </div>
  );
}

function RecognitionItem({ award }: { award: Recognition }) {
  const text = labels.project.results;
  return (
    <li className="rounded-2xl border border-line bg-surface/50 p-5 sm:p-6">
      <div className="flex gap-4">
        <span
          aria-hidden
          className="flex size-10 shrink-0 items-center justify-center rounded-xl border border-line-strong bg-canvas/60 text-status-prototype"
        >
          <Award className="size-5" />
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-fg">{award.title}</p>
          {isMeaningful(award.event) && <p className="mt-1 text-sm text-fg-secondary">{award.event}</p>}
          {isMeaningful(award.category) && (
            <p className="mt-1 text-sm text-fg-muted">{`${text.category}: ${award.category}`}</p>
          )}
          {isMeaningful(award.date) && <p className="mt-1 font-mono text-xs text-fg-muted">{award.date}</p>}
          {/* Accuracy safeguard, not a placeholder: unverified awards only exist in draft mode. */}
          {!award.verified && (
            <p className="mt-3 inline-flex rounded-full border border-dashed border-status-prototype/50 px-2.5 py-0.5 font-mono text-[11px] tracking-wider text-status-prototype uppercase">
              {placeholders.recognitionPending}
            </p>
          )}
          {isMeaningful(award.certificateUrl) && (
            <p className="mt-3">
              <a
                href={award.certificateUrl}
                {...newTabProps(award.certificateUrl)}
                className="inline-flex items-center gap-1.5 rounded text-sm font-medium text-accent transition-colors hover:text-accent-hover"
              >
                {text.viewCertificate}
                <span className="sr-only"> {labels.newTab}</span>
                <ArrowUpRight aria-hidden className="size-4" />
              </a>
            </p>
          )}
        </div>
      </div>
      {/* Full card width on small screens; aligned with the text column (icon 2.5rem + gap 1rem) above. */}
      {award.certificatePreview && (
        <ProjectMedia media={award.certificatePreview} className="mt-5 max-w-xl sm:ml-14" />
      )}
    </li>
  );
}

/* Section H — Links -------------------------------------------------------- */

const linkIcons: Record<ProjectLinkKind, ReactNode> = {
  repository: <FolderGit2 aria-hidden className="size-4" />,
  liveDemo: <Globe aria-hidden className="size-4" />,
  video: <Play aria-hidden className="size-4" />,
  certificate: <Award aria-hidden className="size-4" />,
  documentation: <BookOpen aria-hidden className="size-4" />,
};

export function LinksContent({ links }: { links: ResolvedLink[] }) {
  return (
    <ul className="flex flex-wrap gap-3">
      {links.map((link) => (
        <li key={`${link.kind}-${link.url}`}>
          <ButtonLink href={link.url} variant="secondary" iconStart={linkIcons[link.kind]}>
            {link.label}
          </ButtonLink>
        </li>
      ))}
    </ul>
  );
}
