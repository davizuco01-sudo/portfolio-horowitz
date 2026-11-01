import type { ReactNode } from 'react';
import { PageContainer } from './PageContainer';

/** Simple full-height message, used by the 404 and error pages. */
export function MessagePage({
  eyebrow,
  title,
  body,
  actions,
}: {
  eyebrow: string;
  title: string;
  body: string;
  actions: ReactNode;
}) {
  return (
    <PageContainer className="flex min-h-[65dvh] flex-col justify-center py-24">
      <p className="eyebrow">{eyebrow}</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">{title}</h1>
      <p className="mt-5 max-w-md text-lg leading-8">{body}</p>
      <div className="mt-10 flex flex-wrap gap-3">{actions}</div>
    </PageContainer>
  );
}
