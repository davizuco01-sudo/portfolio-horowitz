import type { ElementType, ReactNode } from 'react';
import { cn } from '../../lib/cn';

/** Centered content column (max 72rem / 1152px) with responsive side padding. */
export function PageContainer({
  as: Tag = 'div',
  className,
  children,
}: {
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  return <Tag className={cn('mx-auto w-full max-w-6xl px-5 sm:px-8', className)}>{children}</Tag>;
}
