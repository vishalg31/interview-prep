import Link from 'next/link'
import type { Archetype } from '@/data/types'
import { ARCHETYPE_LABELS } from '@/data/questions'

interface RelatedItem {
  archetype: Archetype
  slug: string
  prompt: string
}

// Cross-links the same underlying skill in a different shape, e.g. a
// candidate-led S&O case next to its data-given metric-improvement
// counterpart. Renders nothing if there are no resolved related questions.
export function RelatedQuestions({ items }: { items: RelatedItem[] }) {
  if (items.length === 0) return null

  return (
    <nav aria-label="Related questions" className="mt-16 border-t border-rule pt-8">
      <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
        Related
      </span>
      <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {items.map((item) => (
          <Link
            key={`${item.archetype}/${item.slug}`}
            href={`/${item.archetype}/${item.slug}`}
            className="group rounded-lg border border-rule px-5 py-4 transition-colors hover:border-move"
          >
            <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
              {ARCHETYPE_LABELS[item.archetype]}
            </span>
            <span className="mt-1.5 line-clamp-2 font-display text-base font-medium leading-snug tracking-tight text-ink group-hover:text-move">
              {item.prompt}
            </span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
