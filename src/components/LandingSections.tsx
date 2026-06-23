import Link from 'next/link'
import type { Archetype } from '@/data/types'
import { QuestionCard, type CardQuestion } from './QuestionCard'

interface Section {
  archetype: Archetype
  label: string
  blurb: string
  count: number
  items: CardQuestion[]
}

// Landing feed: each type is a numbered two-column block, its questions in a
// soft bordered card so the sections read as distinct.
export function LandingSections({ sections }: { sections: Section[] }) {
  return (
    <div className="mt-20">
      {sections.map((s, i) => (
        <section
          key={s.archetype}
          aria-labelledby={`group-${s.archetype}`}
          className="border-t-2 border-ink/25 py-10 first:border-t-0 first:pt-0 lg:grid lg:grid-cols-[16rem_1fr] lg:gap-x-12"
        >
          {/* Left: label block */}
          <div className="lg:self-start">
            <span aria-hidden className="font-mono text-sm tabular-nums text-move">
              {String(i + 1).padStart(2, '0')}
            </span>
            <h2
              id={`group-${s.archetype}`}
              className="mt-2 font-display text-[1.625rem] font-semibold leading-tight tracking-tight text-ink"
            >
              <Link href={`/${s.archetype}`} className="hover:text-move">
                {s.label}
              </Link>
            </h2>
            <p className="mt-2 font-body text-[0.9375rem] italic leading-relaxed text-muted">
              {s.blurb}
            </p>
            <Link
              href={`/${s.archetype}`}
              className="mt-3 inline-block font-mono text-[0.6875rem] uppercase tracking-wider text-muted hover:text-move"
            >
              View all {s.count} &rarr;
            </Link>
          </div>

          {/* Right: questions in a card */}
          <div className="mt-6 rounded-xl border border-ink/20 bg-panel/40 px-5 sm:px-6 lg:mt-0 [&>a:first-child]:border-t-0">
            {s.items.map((q) => (
              <QuestionCard key={q.slug} question={q} />
            ))}
          </div>
        </section>
      ))}
    </div>
  )
}
