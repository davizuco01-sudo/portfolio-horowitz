import { Contact } from '../components/home/Contact';
import { FeaturedProjects } from '../components/home/FeaturedProjects';
import { Hero } from '../components/home/Hero';
import { Journey } from '../components/home/Journey';
import { OtherExperiments } from '../components/home/OtherExperiments';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function Home() {
  useDocumentTitle();

  return (
    <>
      <Hero />
      <FeaturedProjects />
      <OtherExperiments />
      <Journey />
      <Contact />
    </>
  );
}
