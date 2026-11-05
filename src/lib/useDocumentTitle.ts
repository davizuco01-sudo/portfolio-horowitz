import { useEffect } from 'react';
import { homeDocumentTitle, siteTitle } from './content';

/** Sets the browser tab title: "<page> · <site>", or "<name> | Portfolio" for the homepage. */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} · ${siteTitle}` : homeDocumentTitle;
  }, [pageTitle]);
}
