import { Image as ImageIcon } from 'lucide-react';
import { cn } from '../../lib/cn';

interface MediaPlaceholderProps {
  label: string;
  /** Smaller icon and text, for thumbnails. */
  compact?: boolean;
  className?: string;
}

const cornerBase = 'absolute border-line-strong';

/**
 * Neutral frame shown when a referenced media file fails to load (a broken
 * path). It is never used for media that has not been added: in that case the
 * frame is not rendered at all. It fills its parent, which sets the aspect ratio.
 */
export function MediaPlaceholder({ label, compact = false, className }: MediaPlaceholderProps) {
  const corner = cn(cornerBase, compact ? 'm-1.5 size-2' : 'm-3 size-3');
  return (
    <div
      className={cn(
        'relative isolate flex h-full w-full items-center justify-center overflow-hidden bg-surface-2/30',
        className,
      )}
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-blueprint opacity-80 [mask-image:radial-gradient(ellipse_at_center,black_15%,transparent_80%)]"
      />
      <span aria-hidden className={cn(corner, 'top-0 left-0 border-t border-l')} />
      <span aria-hidden className={cn(corner, 'top-0 right-0 border-t border-r')} />
      <span aria-hidden className={cn(corner, 'bottom-0 left-0 border-b border-l')} />
      <span aria-hidden className={cn(corner, 'right-0 bottom-0 border-r border-b')} />

      <div className={cn('flex flex-col items-center text-center', compact ? 'gap-2 px-2' : 'gap-3 px-4')}>
        <span
          aria-hidden
          className={cn(
            'flex items-center justify-center rounded-lg border border-line-strong bg-canvas/70 text-fg-muted',
            compact ? 'size-8' : 'size-11',
          )}
        >
          <ImageIcon className={compact ? 'size-3.5' : 'size-4'} strokeWidth={1.75} />
        </span>
        <p
          className={cn(
            'font-mono text-fg-muted',
            // Thumbnails are too small for text on phones; the icon alone signals the problem.
            compact ? 'sr-only text-[10px] leading-tight sm:not-sr-only' : 'text-xs tracking-wide',
          )}
        >
          {label}
        </p>
      </div>
    </div>
  );
}
