import { labels } from '../../data/labels';
import { homeSections } from '../../lib/homeSections';
import { featuredProjects, getProjectNumber } from '../../lib/projects';
import { PageContainer } from '../layout/PageContainer';
import { ProjectCard } from '../projects/ProjectCard';
import { SectionHeading } from '../ui/SectionHeading';

export function FeaturedProjects() {
  if (!homeSections.work) return null;
  const text = labels.sections.work;

  return (
    <section id="work" aria-labelledby="work-title" className="border-t border-line/60 py-20 sm:py-24">
      <PageContainer>
        <SectionHeading
          id="work-title"
          eyebrow={text.eyebrow}
          title={text.title}
          aside={
            <p className="font-mono text-xs text-fg-muted">{labels.card.projectCount(featuredProjects.length)}</p>
          }
        />
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:mt-14">
          {featuredProjects.map((project, index) => (
            <ProjectCard
              key={project.slug}
              project={project}
              number={getProjectNumber(project) ?? ''}
              prominent={index === 0}
              className={index === 0 ? 'md:col-span-2' : undefined}
            />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
