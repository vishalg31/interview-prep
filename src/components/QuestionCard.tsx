import Link from 'next/link'
import type { Question } from '@/data/types'
import { ARCHETYPE_LABELS } from '@/data/questions'
import { DifficultyBadge, FrameworkBadge, VerticalBadge } from './Badges'

// Only the fields a card needs. Lets client lists (the landing) avoid shipping
// full answer bodies to the browser. Full Question objects satisfy this too.
export type CardQuestion = Pick<
  Question,
  'slug' | 'archetype' | 'vertical' | 'difficulty' | 'framework' | 'prompt'
>

// One question in a list. Shows the archetype eyebrow only when the list mixes
// archetypes (the landing's full feed); in a single-archetype group it's omitted.
export function QuestionCard({
  question: q,
  showArchetype = false,
}: {
  question: CardQuestion
  showArchetype?: boolean
}) {
  return (
    <Link
      href={`/${q.archetype}/${q.slug}`}
      className="group block border-t border-rule py-5"
    >
      {showArchetype && (
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          {ARCHETYPE_LABELS[q.archetype]}
        </p>
      )}
      <p
        className={`font-display text-lg font-medium tracking-tight text-ink group-hover:text-move ${
          showArchetype ? 'mt-2' : ''
        }`}
      >
        {q.prompt}
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <VerticalBadge vertical={q.vertical} />
        <DifficultyBadge difficulty={q.difficulty} />
        {q.framework && <FrameworkBadge framework={q.framework} />}
      </div>
    </Link>
  )
}
