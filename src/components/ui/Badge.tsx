import type { ReactNode } from 'react';
import { cn } from '../../lib/cn';
import type { ProjectStatus } from '../../types/project';

const statusColor: Record<ProjectStatus, string> = {
  'in-development': 'bg-status-development',
  prototype: 'bg-status-prototype',
  experiment: 'bg-status-experiment',
};

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-line bg-canvas/30 px-2.5 py-0.5 text-xs font-medium text-fg-secondary',
        className,
      )}
    >
      {children}
    </span>
  );
}

/** Coloured dot. Always pair it with a text label; colour alone carries no meaning. */
export function StatusDot({ status, className }: { status: ProjectStatus; className?: string }) {
  return <span aria-hidden className={cn('size-1.5 shrink-0 rounded-full', statusColor[status], className)} />;
}

export function StatusBadge({ status, label }: { status: ProjectStatus; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-line bg-canvas/40 px-2.5 py-1 text-xs font-medium whitespace-nowrap text-fg-secondary">
      <StatusDot status={status} />
      {label}
    </span>
  );
}

/** List of small tags (e.g. technologies). Renders nothing when empty. */
export function TagList({ items, label, className }: { items: string[]; label: string; className?: string }) {
  if (items.length === 0) return null;
  return (
    <ul aria-label={label} className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li key={item}>
          <Badge>{item}</Badge>
        </li>
      ))}
    </ul>
  );
}
