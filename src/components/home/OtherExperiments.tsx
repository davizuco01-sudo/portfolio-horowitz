import { labels } from '../../data/labels';
import { experimentProjects } from '../../lib/projects';
import { PageContainer } from '../layout/PageContainer';
import { ExperimentCard } from '../projects/ExperimentCard';
import { SectionHeading } from '../ui/SectionHeading';

export function OtherExperiments() {
  if (experimentProjects.length === 0) return null;
  const text = labels.sections.experiments;

  return (
    <section id="experiments" aria-labelledby="experiments-title" className="border-t border-line/60 py-20 sm:py-24">
      <PageContainer>
        <SectionHeading
          id="experiments-title"
          eyebrow={text.eyebrow}
          title={text.title}
          description={<p>{text.description}</p>}
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {experimentProjects.map((project) => (
            <ExperimentCard key={project.slug} project={project} />
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
