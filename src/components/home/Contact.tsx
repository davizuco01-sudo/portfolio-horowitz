import { ArrowUpRight, FileText, Mail } from 'lucide-react';
import type { ReactNode } from 'react';
import { labels } from '../../data/labels';
import { placeholders } from '../../data/placeholders';
import { site } from '../../data/site';
import { hasText, isDraft, newTabProps, prettyUrl } from '../../lib/content';
import { PageContainer } from '../layout/PageContainer';
import { Placeholder } from '../ui/Draft';
import { GithubIcon, LinkedinIcon } from '../ui/Icons';
import { Prose } from '../ui/Prose';
import { SectionHeading } from '../ui/SectionHeading';

interface ContactItem {
  key: string;
  label: string;
  icon: ReactNode;
  /** null when not configured. */
  href: string | null;
  display: string | null;
}

function getContactItems(): ContactItem[] {
  const { email, github, linkedin, resume } = site.contact;
  const text = labels.contact;
  const iconClass = 'size-4';
  return [
    {
      key: 'email',
      label: text.email,
      icon: <Mail aria-hidden className={iconClass} />,
      href: email ? `mailto:${email}` : null,
      display: email,
    },
    {
      key: 'github',
      label: text.github,
      icon: <GithubIcon className={iconClass} />,
      href: github,
      display: github && prettyUrl(github),
    },
    {
      key: 'linkedin',
      label: text.linkedin,
      icon: <LinkedinIcon className={iconClass} />,
      href: linkedin,
      display: linkedin && prettyUrl(linkedin),
    },
    {
      key: 'resume',
      label: text.resume,
      icon: <FileText aria-hidden className={iconClass} />,
      href: resume,
      display: resume && text.resumeValue,
    },
  ];
}

export function Contact() {
  const text = labels.sections.contact;
  const introduction = site.contact.introduction;
  // Only real destinations are shown; draft mode also shows the empty slots.
  const items = getContactItems().filter((item) => item.href || isDraft);

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t border-line/60 py-20 sm:py-24">
      <PageContainer>
        <div className="grid gap-10 rounded-3xl border border-line bg-surface/40 p-6 sm:p-10 lg:grid-cols-12 lg:gap-12 lg:p-12">
          <div className="lg:col-span-5">
            <SectionHeading id="contact-title" eyebrow={text.eyebrow} title={text.title} />
            {hasText(introduction) ? (
              <Prose paragraphs={introduction} className="mt-5" />
            ) : (
              isDraft && (
                <p className="mt-5 leading-7">
                  <Placeholder>{placeholders.contactIntroduction}</Placeholder>
                </p>
              )
            )}
          </div>

          {items.length > 0 && (
            <ul className="grid content-start gap-3 sm:grid-cols-2 lg:col-span-7">
              {items.map((item) => (
                <li key={item.key}>
                  {item.href ? <ContactLink item={item} href={item.href} /> : <ContactSlot item={item} />}
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageContainer>
    </section>
  );
}

const rowClasses = 'flex min-h-[4.5rem] items-center gap-4 rounded-xl border p-4';
const iconBoxClasses = 'flex size-9 shrink-0 items-center justify-center rounded-lg border';

function ContactLink({ item, href }: { item: ContactItem; href: string }) {
  const tabProps = newTabProps(href);
  return (
    <a
      href={href}
      {...tabProps}
      className={`${rowClasses} group border-line bg-canvas/40 transition-colors duration-200 hover:border-line-strong hover:bg-canvas/70`}
    >
      <span className={`${iconBoxClasses} border-line-strong text-fg-secondary group-hover:text-accent`}>
        {item.icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm font-medium text-fg">{item.label}</span>
        <span className="block truncate text-sm text-fg-muted">{item.display}</span>
      </span>
      {tabProps.target && <span className="sr-only"> {labels.newTab}</span>}
      <ArrowUpRight aria-hidden className="size-4 shrink-0 text-fg-muted transition-colors group-hover:text-accent" />
    </a>
  );
}

/** Non-interactive slot shown in draft mode for a link that is not configured yet. */
function ContactSlot({ item }: { item: ContactItem }) {
  return (
    <div className={`${rowClasses} border-dashed border-line text-fg-muted`} data-placeholder="">
      <span className={`${iconBoxClasses} border-line`}>{item.icon}</span>
      <span className="min-w-0">
        <span className="block text-sm font-medium text-fg-secondary">{item.label}</span>
        <span className="block text-sm">{placeholders.contactLink}</span>
      </span>
    </div>
  );
}
