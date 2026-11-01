import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';

interface SectionHeadingProps {
  /** id of the <h2>, referenced by the section's aria-labelledby. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: ReactNode;
  /** Optional content aligned to the right on larger screens. */
  aside?: ReactNode;
  className?: string;
}

export function SectionHeading({ id, eyebrow, title, description, aside, className }: SectionHeadingProps) {
  return (
    <div className={cn('flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between', className)}>
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="eyebrow flex items-center gap-3">
            <span aria-hidden className="h-px w-8 bg-accent/70" />
            {eyebrow}
          </p>
        )}
        <h2 id={id} className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl">
          {title}
        </h2>
        {description && <div className="mt-4 text-base leading-7 text-fg-secondary">{description}</div>}
      </div>
      {aside && <div className="shrink-0">{aside}</div>}
    </div>
  );
}
