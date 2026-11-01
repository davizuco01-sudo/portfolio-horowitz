import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';
import { Link } from 'react-router';
import { labels } from '../../data/labels';
import { cn } from '../../lib/cn';
import { newTabProps } from '../../lib/content';

type Variant = 'primary' | 'secondary';

const baseClasses =
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-5 text-sm font-medium whitespace-nowrap transition-colors duration-200';

const variantClasses: Record<Variant, string> = {
  primary: 'bg-accent text-canvas hover:bg-accent-hover',
  secondary: 'border border-line-strong bg-canvas/40 text-fg hover:border-fg-muted hover:bg-surface',
};

interface CommonProps {
  variant?: Variant;
  iconStart?: ReactNode;
  iconEnd?: ReactNode;
  className?: string;
  children: ReactNode;
}

type ButtonLinkProps = CommonProps & ({ to: string; href?: never } | { href: string; to?: never });

/**
 * A link styled as a button. Use `to` for pages inside the site and `href`
 * for external pages, files and email. External links open in a new tab and
 * announce it to screen readers.
 */
export function ButtonLink({
  variant = 'primary',
  iconStart,
  iconEnd,
  className,
  children,
  ...target
}: ButtonLinkProps) {
  const classes = cn(baseClasses, variantClasses[variant], className);

  if (target.to !== undefined) {
    return (
      <Link to={target.to} className={classes}>
        {iconStart}
        {children}
        {iconEnd}
      </Link>
    );
  }

  const tabProps = newTabProps(target.href);
  return (
    <a href={target.href} className={classes} {...tabProps}>
      {iconStart}
      {children}
      {tabProps.target && <span className="sr-only"> {labels.newTab}</span>}
      {iconEnd ?? (tabProps.target && <ArrowUpRight aria-hidden className="size-4 opacity-70" />)}
    </a>
  );
}

interface ButtonProps extends CommonProps {
  onClick: () => void;
}

/** A real <button> for actions (not navigation). */
export function Button({ variant = 'primary', iconStart, iconEnd, className, children, onClick }: ButtonProps) {
  return (
    <button type="button" onClick={onClick} className={cn(baseClasses, variantClasses[variant], className)}>
      {iconStart}
      {children}
      {iconEnd}
    </button>
  );
}
