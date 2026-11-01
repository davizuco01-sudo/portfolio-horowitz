import { cn } from '../../lib/cn';
import type { Paragraphs } from '../../types/project';

const proseSizes = {
  sm: 'text-[15px] leading-7',
  base: 'text-base leading-7 sm:text-[1.0625rem] sm:leading-8',
  lg: 'text-lg leading-8',
};

/** Renders paragraphs of applicant text at a comfortable reading width. */
export function Prose({
  paragraphs,
  size = 'base',
  className,
}: {
  paragraphs: Paragraphs;
  size?: keyof typeof proseSizes;
  className?: string;
}) {
  const items = paragraphs.filter((p) => p.trim().length > 0);
  if (items.length === 0) return null;
  return (
    <div className={cn('max-w-prose space-y-4 text-fg-secondary', proseSizes[size], className)}>
      {items.map((paragraph, index) => (
        <p key={index}>{paragraph}</p>
      ))}
    </div>
  );
}

/** Simple bulleted list. Renders nothing when empty. */
export function BulletList({ items, className }: { items: string[]; className?: string }) {
  const list = items.filter((item) => item.trim().length > 0);
  if (list.length === 0) return null;
  return (
    <ul className={cn('max-w-prose space-y-3 text-fg-secondary', className)}>
      {list.map((item, index) => (
        <li key={index} className="relative pl-6 leading-7">
          <span aria-hidden className="absolute top-[0.85em] left-0 h-px w-3 bg-accent/80" />
          {item}
        </li>
      ))}
    </ul>
  );
}
