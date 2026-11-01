import { useEffect, useRef, type MouseEvent } from 'react';
import { Outlet, ScrollRestoration, useLocation } from 'react-router';
import { labels } from '../../data/labels';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

function findHashTarget(hash: string): HTMLElement | null {
  if (!hash) return null;
  try {
    return document.getElementById(decodeURIComponent(hash.slice(1)));
  } catch {
    return null;
  }
}

/**
 * Shared page frame: skip link, navigation, main content and footer.
 *
 * Scrolling is handled by React Router's <ScrollRestoration>: new pages start
 * at the top, "#section" links scroll to their target, and back/forward
 * navigation restores the previous position.
 */
export function RootLayout() {
  const location = useLocation();
  const mainRef = useRef<HTMLElement>(null);
  const lastLocationKey = useRef(location.key);

  // After client-side navigation, move keyboard focus to the new content
  // (the targeted section, or the top of <main>) so keyboard and screen
  // reader users do not have to start again from the top of the page.
  useEffect(() => {
    if (lastLocationKey.current === location.key) return;
    lastLocationKey.current = location.key;

    const target = findHashTarget(location.hash) ?? mainRef.current;
    if (!target) return;
    if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
    target.focus({ preventScroll: true });
  }, [location.key, location.hash]);

  const skipToContent = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    mainRef.current?.focus();
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <a
        href="#main"
        onClick={skipToContent}
        className="sr-only rounded-md bg-accent px-4 py-2 text-sm font-medium text-canvas focus:not-sr-only focus:fixed focus:top-3 focus:left-4 focus:z-50"
      >
        {labels.nav.skipToContent}
      </a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <ScrollRestoration />
    </div>
  );
}
