import { Menu, X } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { site } from '../../data/site';
import { newTabProps, siteTitle } from '../../lib/content';
import { BrandMark, GithubIcon } from '../ui/Icons';
import { sectionLinks } from './navigation';
import { PageContainer } from './PageContainer';

const linkClasses = 'rounded-md text-fg-secondary transition-colors duration-200 hover:text-fg';

export function Navbar() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const github = site.contact.github;
  const close = () => setOpen(false);

  // Close the mobile menu with Escape and return focus to the toggle.
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <header className="sticky top-0 z-40 border-b border-line/70 bg-canvas/90 backdrop-blur-md">
      <PageContainer className="flex h-16 items-center justify-between gap-6">
        <Link to="/" onClick={close} className="flex min-w-0 items-center gap-3 rounded-md">
          <BrandMark className="size-7 shrink-0" />
          <span className="truncate text-[15px] font-semibold tracking-tight text-fg">
            {siteTitle}
          </span>
          <span className="sr-only">({labels.nav.home})</span>
        </Link>

        {/* Desktop and tablet */}
        <nav aria-label={labels.nav.primary} className="hidden sm:block">
          <ul className="flex items-center gap-1">
            {sectionLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} className={`${linkClasses} px-3 py-2 text-sm`}>
                  {item.label}
                </Link>
              </li>
            ))}
            {github && (
              <li className="ml-2 border-l border-line pl-3">
                <a href={github} {...newTabProps(github)} className={`${linkClasses} flex items-center gap-2 px-2 py-2 text-sm`}>
                  <GithubIcon className="size-4" />
                  {labels.nav.github}
                  <span className="sr-only"> {labels.newTab}</span>
                </a>
              </li>
            )}
          </ul>
        </nav>

        {/* Mobile */}
        <button
          ref={toggleRef}
          type="button"
          className="-mr-2 flex size-11 items-center justify-center rounded-md text-fg-secondary transition-colors hover:text-fg sm:hidden"
          aria-label={labels.nav.menu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </PageContainer>

      <div id="mobile-menu" hidden={!open} className="border-t border-line/70 sm:hidden">
        <nav aria-label={labels.nav.primary}>
          <ul className="mx-auto flex max-w-6xl flex-col px-3 py-3">
            {sectionLinks.map((item) => (
              <li key={item.to}>
                <Link to={item.to} onClick={close} className={`${linkClasses} block px-2 py-3 text-base`}>
                  {item.label}
                </Link>
              </li>
            ))}
            {github && (
              <li>
                <a
                  href={github}
                  {...newTabProps(github)}
                  onClick={close}
                  className={`${linkClasses} flex items-center gap-2 px-2 py-3 text-base`}
                >
                  <GithubIcon className="size-4" />
                  {labels.nav.github}
                  <span className="sr-only"> {labels.newTab}</span>
                </a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
}
