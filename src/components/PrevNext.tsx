import Link from 'next/link'
import type { Archetype } from '@/data/types'
import { ARCHETYPE_LABELS } from '@/data/questions'

interface NavItem {
  archetype: Archetype
  slug: string
  prompt: string
}

// End-of-answer navigation: hop to the previous or next answer in reading order
// without going back to the landing. Empty slots keep the layout balanced.
export function PrevNext({
  prev,
  next,
}: {
  prev?: NavItem
  next?: NavItem
}) {
  return (
    <nav
      aria-label="Previous and next answers"
      className="mt-16 grid grid-cols-1 gap-4 border-t border-rule pt-8 sm:grid-cols-2"
    >
      {prev ? (
        <Link
          href={`/${prev.archetype}/${prev.slug}`}
          className="group rounded-lg border border-rule px-5 py-4 transition-colors hover:border-move"
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
            &larr; Previous &middot; {ARCHETYPE_LABELS[prev.archetype]}
          </span>
          <span className="mt-1.5 line-clamp-2 font-display text-base font-medium leading-snug tracking-tight text-ink group-hover:text-move">
            {prev.prompt}
          </span>
        </Link>
      ) : (
        <span aria-hidden />
      )}

      {next ? (
        <Link
          href={`/${next.archetype}/${next.slug}`}
          className="group rounded-lg border border-rule px-5 py-4 text-right transition-colors hover:border-move sm:col-start-2"
        >
          <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted">
            Next &middot; {ARCHETYPE_LABELS[next.archetype]} &rarr;
          </span>
          <span className="mt-1.5 line-clamp-2 font-display text-base font-medium leading-snug tracking-tight text-ink group-hover:text-move">
            {next.prompt}
          </span>
        </Link>
      ) : (
        <span aria-hidden className="sm:col-start-2" />
      )}
    </nav>
  )
}
