import { labels } from '../../data/labels';
import { hasText } from '../../lib/content';
import type { ProjectChallenge } from '../../types/project';

/** One entry in Section E: Challenges & Decisions. Empty fields are omitted. */
export function ChallengeBlock({ challenge, number }: { challenge: ProjectChallenge; number: string }) {
  const fieldLabels = labels.project.challenge;
  const details: Array<{ label: string; value: string | null }> = [
    { label: fieldLabels.difficulty, value: challenge.difficulty },
    { label: fieldLabels.approach, value: challenge.approach },
    { label: fieldLabels.outcome, value: challenge.outcome },
  ];
  const filled = details.filter((detail): detail is { label: string; value: string } => hasText(detail.value));

  return (
    <article className="rounded-2xl border border-line bg-surface/50 p-6 sm:p-8">
      <p className="eyebrow">{fieldLabels.number(number)}</p>
      <h3 className="mt-2 text-lg font-semibold tracking-tight sm:text-xl">{challenge.title}</h3>
      {hasText(challenge.description) && (
        <p className="mt-3 max-w-prose leading-7 text-fg-secondary">{challenge.description}</p>
      )}
      {filled.length > 0 && (
        <dl className="mt-6 space-y-5 border-t border-line pt-6">
          {filled.map((detail) => (
            <div key={detail.label} className="grid gap-1.5 sm:grid-cols-[11rem_1fr] sm:gap-6">
              <dt className="text-sm font-medium text-fg">{detail.label}</dt>
              <dd className="max-w-prose text-[15px] leading-7 text-fg-secondary">{detail.value}</dd>
            </div>
          ))}
        </dl>
      )}
    </article>
  );
}
