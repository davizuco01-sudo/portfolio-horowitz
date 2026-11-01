import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { site } from '../../data/site';
import { isDraft } from '../../lib/content';
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
            {site.name && ` ${site.name}`}
          </p>
          {isDraft && (
            <span className="rounded border border-dashed border-line-strong px-2 py-0.5 font-mono text-[11px] tracking-wider text-fg-muted uppercase">
              {labels.footer.draft}
            </span>
          )}
        </div>

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
      </PageContainer>
    </footer>
  );
}
