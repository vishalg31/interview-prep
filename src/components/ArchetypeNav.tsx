import Link from 'next/link'
import type { Archetype } from '@/data/types'
import {
  ARCHETYPE_LABELS,
  getOrderedPopulatedArchetypes,
} from '@/data/questions'

const chip =
  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-[0.6875rem] uppercase tracking-wider transition-colors'
const active = 'border-move bg-move-bg text-move-ink'
const idle = 'border-rule text-muted hover:border-move hover:text-move'

// Chips linking to each archetype's list page, led by an "All" chip back to the
// full landing feed. `current` highlights the active one; counts shown per chip.
export function ArchetypeNav({
  current,
  counts,
}: {
  current?: Archetype | 'all'
  counts: Record<string, number>
}) {
  const archetypes = getOrderedPopulatedArchetypes()
  const total = Object.values(counts).reduce((sum, n) => sum + n, 0)

  return (
    <nav aria-label="Browse by question type" className="flex flex-wrap gap-2">
      <Link
        href="/"
        aria-current={current === 'all' ? 'page' : undefined}
        className={`${chip} ${current === 'all' ? active : idle}`}
      >
        All
        <span className="text-[0.625rem] opacity-60">{total}</span>
      </Link>
      {archetypes.map((a) => {
        const isActive = a === current
        return (
          <Link
            key={a}
            href={`/${a}`}
            aria-current={isActive ? 'page' : undefined}
            className={`${chip} ${isActive ? active : idle}`}
          >
            {ARCHETYPE_LABELS[a]}
            <span className="text-[0.625rem] opacity-60">{counts[a]}</span>
          </Link>
        )
      })}
    </nav>
  )
}
