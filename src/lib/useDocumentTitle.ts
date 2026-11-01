import { useEffect } from 'react';
import { siteTitle } from './content';

/** Sets the browser tab title: "<page> · <site>" or just "<site>". */
export function useDocumentTitle(pageTitle?: string): void {
  useEffect(() => {
    document.title = pageTitle ? `${pageTitle} · ${siteTitle}` : siteTitle;
  }, [pageTitle]);
}
