import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { site } from '../../data/site';
import { isMeaningful } from '../../lib/content';
import { BrandMark } from '../ui/Icons';
import { sectionLinks } from './navigation';
import { PageContainer } from './PageContainer';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="border-t border-line/70">
      <PageContainer className="flex flex-col gap-8 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <BrandMark className="size-6 shrink-0" />
          <p className="text-sm text-fg-muted">
            © {year}
            {isMeaningful(site.name) && ` ${site.name}`}
          </p>
        </div>

        {sectionLinks.length > 0 && (
          <nav aria-label={labels.footer.navigation}>
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
              {sectionLinks.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="rounded text-fg-secondary transition-colors hover:text-fg">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </PageContainer>
    </footer>
  );
}
