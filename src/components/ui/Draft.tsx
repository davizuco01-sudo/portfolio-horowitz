import { PenLine } from 'lucide-react';
import type { ReactNode } from 'react';
import { placeholders } from '../../data/placeholders';
import { cn } from '../../lib/cn';
import { isDraft } from '../../lib/content';

/**
 * Inline placeholder text for missing content.
 * Visible only in draft mode; renders nothing once the site is published.
 */
export function Placeholder({ children }: { children: ReactNode }) {
  if (!isDraft) return null;
  return (
    <span className="text-fg-muted" data-placeholder="">
      {children}
    </span>
  );
}

/**
 * Block-level note for an empty section, describing what belongs there.
 * Visible only in draft mode.
 */
export function DraftNote({ children, className }: { children: ReactNode; className?: string }) {
  if (!isDraft) return null;
  return (
    <div
      className={cn(
        'flex max-w-prose items-start gap-3 rounded-xl border border-dashed border-line-strong bg-surface/30 px-4 py-3.5 text-sm leading-6 text-fg-muted',
        className,
      )}
      data-placeholder=""
    >
      <PenLine aria-hidden className="mt-1 size-3.5 shrink-0" />
      <p>
        <span className="mr-2 font-mono text-[11px] tracking-wider text-fg-secondary uppercase">
          {placeholders.draftLabel}
        </span>
        {children}
      </p>
    </div>
  );
}
