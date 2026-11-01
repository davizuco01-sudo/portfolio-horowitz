import { useParams } from 'react-router';
import { ProjectDetailLayout } from '../components/projects/ProjectDetailLayout';
import { getDetailProject } from '../lib/projects';
import { NotFound } from './NotFound';

/** /projects/:slug — renders the shared template for any project with a detail page. */
export function ProjectDetail() {
  const { slug } = useParams();
  const project = getDetailProject(slug);

  if (!project) return <NotFound />;

  // `key` resets component state (e.g. media errors) when moving between projects.
  return <ProjectDetailLayout key={project.slug} project={project} />;
}
