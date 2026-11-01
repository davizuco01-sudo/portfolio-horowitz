import { MessagePage } from '../components/layout/MessagePage';
import { ButtonLink } from '../components/ui/Button';
import { labels } from '../data/labels';
import { useDocumentTitle } from '../lib/useDocumentTitle';

export function NotFound() {
  const text = labels.notFound;
  useDocumentTitle(text.title);

  return (
    <MessagePage
      eyebrow={text.eyebrow}
      title={text.title}
      body={text.body}
      actions={
        <>
          <ButtonLink to="/">{text.home}</ButtonLink>
          <ButtonLink to="/#work" variant="secondary">
            {text.projects}
          </ButtonLink>
        </>
      }
    />
  );
}
