import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { formatIndex, hasText, isMeaningful } from '../../lib/content';
import { getProjectLinks, getVisibleRecognition } from '../../lib/projects';
import { useDocumentTitle } from '../../lib/useDocumentTitle';
import type { Project, ProjectSectionId } from '../../types/project';
import { PageContainer } from '../layout/PageContainer';
import { Prose } from '../ui/Prose';
import { ChallengeBlock } from './ChallengeBlock';
import { ProjectHero } from './ProjectHero';
import { ProjectNavigation } from './ProjectNavigation';
import { ProjectSection } from './ProjectSection';
import {
  BuiltContent,
  HowItWorksContent,
  LessonsContent,
  LinksContent,
  ResultsContent,
} from './ProjectSectionContent';

interface SectionDefinition {
  id: string;
  title: string;
  /** True when the section has real content. Sections without content are not rendered. */
  hasContent: boolean;
  render: () => ReactNode;
}

/**
 * The shared case-study template used by every project page.
 *
 * Section order (see PORTFOLIO_SPEC.md §8):
 *   A Overview · B The Problem · C What I Built · D How It Works ·
 *   E Challenges & Decisions · F What I Learned · G Results & Next Steps · H Links
 *
 * Only sections with real content render, in draft and published mode alike.
 * "On this page" is built from the same filtered list, so it never links to a
 * hidden section.
 */
export function ProjectDetailLayout({ project }: { project: Project }) {
  useDocumentTitle(project.title);

  const { built, howItWorks, lessons, results } = project;
  const recognition = getVisibleRecognition(project);
  const links = getProjectLinks(project);
  const titles: Record<ProjectSectionId, string> = { ...labels.project.sections };
  for (const [id, title] of Object.entries(project.sectionTitles) as Array<[ProjectSectionId, string]>) {
    if (isMeaningful(title)) titles[id] = title;
  }
  const walkthrough = { ...howItWorks, steps: howItWorks.steps.filter((step) => isMeaningful(step.title)) };
  const challenges = project.challenges.filter((challenge) => isMeaningful(challenge.title));

  const sections: SectionDefinition[] = [
    {
      id: 'problem',
      title: titles.problem,
      hasContent: hasText(project.problem),
      render: () => <Prose paragraphs={project.problem} />,
    },
    {
      id: 'built',
      title: titles.built,
      hasContent: [built.overview, built.features, built.contributions, built.implementation].some(hasText),
      render: () => <BuiltContent built={built} />,
    },
    {
      id: 'how-it-works',
      title: titles.howItWorks,
      hasContent: hasText(walkthrough.intro) || walkthrough.steps.length > 0 || walkthrough.gallery.length > 0,
      render: () => <HowItWorksContent walkthrough={walkthrough} />,
    },
    {
      id: 'challenges',
      title: titles.challenges,
      hasContent: hasText(project.challengesOverview) || challenges.length > 0,
      render: () => (
        <div className="space-y-10">
          <Prose paragraphs={project.challengesOverview} />
          {challenges.length > 0 && (
            <div className="space-y-5">
              {challenges.map((challenge, index) => (
                <ChallengeBlock
                  key={`${index}-${challenge.title}`}
                  challenge={challenge}
                  number={formatIndex(index + 1)}
                />
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      id: 'lessons',
      title: titles.lessons,
      hasContent: [lessons.overview, lessons.technical, lessons.product, lessons.research, lessons.thinking].some(
        hasText,
      ),
      render: () => <LessonsContent lessons={lessons} />,
    },
    {
      id: 'results',
      title: titles.results,
      hasContent:
        recognition.length > 0 ||
        [results.overview, results.demonstrated, results.traction, results.limitations, results.nextSteps].some(
          hasText,
        ),
      render: () => <ResultsContent results={results} recognition={recognition} />,
    },
    {
      id: 'links',
      title: titles.links,
      hasContent: links.length > 0,
      render: () => <LinksContent links={links} />,
    },
  ];

  const visibleSections = sections.filter((section) => section.hasContent);

  return (
    <>
      <article aria-labelledby="project-title">
        <ProjectHero project={project} />

        {visibleSections.length > 0 && (
          <PageContainer className="grid gap-12 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
            <aside className="hidden lg:col-span-3 lg:block">
              <TableOfContents sections={visibleSections} />
            </aside>
            <div className="min-w-0 space-y-16 sm:space-y-20 lg:col-span-9">
              {visibleSections.map((section) => (
                <ProjectSection key={section.id} id={section.id} title={section.title}>
                  {section.render()}
                </ProjectSection>
              ))}
            </div>
          </PageContainer>
        )}
      </article>

      <ProjectNavigation project={project} />
    </>
  );
}

function TableOfContents({ sections }: { sections: SectionDefinition[] }) {
  return (
    <nav aria-labelledby="toc-title" className="sticky top-28">
      <h2 id="toc-title" className="eyebrow">
        {labels.project.onThisPage}
      </h2>
      <ol className="mt-4 border-l border-line">
        {sections.map((section) => (
          <li key={section.id}>
            <Link
              to={`#${section.id}`}
              className="-ml-px block border-l border-transparent py-1.5 pl-4 text-sm text-fg-muted transition-colors hover:border-fg-muted hover:text-fg"
            >
              {section.title}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
