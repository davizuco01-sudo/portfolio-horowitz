import { useEffect } from 'react';
import { useRouteError } from 'react-router';
import { MessagePage } from '../components/layout/MessagePage';
import { Button, ButtonLink } from '../components/ui/Button';
import { labels } from '../data/labels';
import { useDocumentTitle } from '../lib/useDocumentTitle';

/** Shown if a page throws while rendering. Keeps the navigation and footer usable. */
export function ErrorPage() {
  const error = useRouteError();
  const text = labels.error;
  useDocumentTitle(text.title);

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <MessagePage
      eyebrow={text.eyebrow}
      title={text.title}
      body={text.body}
      actions={
        <>
          <Button onClick={() => window.location.reload()}>{text.reload}</Button>
          <ButtonLink to="/" variant="secondary">
            {text.home}
          </ButtonLink>
        </>
      }
    />
  );
}
