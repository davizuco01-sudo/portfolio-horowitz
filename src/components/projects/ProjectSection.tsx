import type { ReactNode } from 'react';

/** A titled section of a project page (Sections B–H). */
export function ProjectSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  const headingId = `${id}-title`;
  return (
    <section id={id} aria-labelledby={headingId} className="border-t border-line pt-8 sm:pt-10">
      <h2 id={headingId} className="text-2xl font-semibold tracking-tight sm:text-[1.75rem]">
        {title}
      </h2>
      <div className="mt-6 sm:mt-8">{children}</div>
    </section>
  );
}

/** A titled group inside a project section. */
export function SubSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h3 className="text-base font-semibold text-fg">{title}</h3>
      <div className="mt-3">{children}</div>
    </div>
  );
}
