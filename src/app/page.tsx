import Link from 'next/link'
import type { Metadata } from 'next'
import type { Archetype } from '@/data/types'
import {
  ARCHETYPE_BLURBS,
  ARCHETYPE_LABELS,
  getOrderedPopulatedArchetypes,
  getQuestionsByArchetype,
  questions,
} from '@/data/questions'
import { getReferenceBySlug } from '@/data/reference'
import { ArchetypeNav } from '@/components/ArchetypeNav'
import { LandingSections } from '@/components/LandingSections'

export const metadata: Metadata = {
  title: { absolute: 'Product Interview QnA' },
  description:
    'A library of fully-worked product and strategy interview answers. Each one structures the problem, reasons out loud, makes real tradeoffs, and holds up under pushback. Read them, or listen.',
  alternates: { canonical: '/' },
}

export default function Home() {
  const archetypes = getOrderedPopulatedArchetypes()
  const counts = Object.fromEntries(
    archetypes.map((a) => [a, getQuestionsByArchetype(a).length]),
  ) as Record<Archetype, number>
  const soFramework = getReferenceBySlug('so-framework')

  const sections = archetypes.map((a) => ({
    archetype: a,
    label: ARCHETYPE_LABELS[a],
    blurb: ARCHETYPE_BLURBS[a],
    count: counts[a],
    items: getQuestionsByArchetype(a).map((q) => ({
      slug: q.slug,
      archetype: q.archetype,
      vertical: q.vertical,
      difficulty: q.difficulty,
      framework: q.framework,
      prompt: q.prompt,
    })),
  }))

  return (
    <main className="mx-auto max-w-[64rem] px-6 py-16 sm:py-24">
      {/* Intro region stays at a comfortable reading width. */}
      <div className="max-w-[42rem]">
        <p className="font-mono text-xs uppercase tracking-wider text-muted">
          For product &amp; strategy roles
        </p>
        <h1 className="mt-4 font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
          Product Interview QnA
        </h1>
        <p className="mt-5 prose-answer text-muted">
          A library of fully-worked product and strategy interview answers. Each
          one structures the problem, reasons out loud, makes real tradeoffs,
          and holds up under pushback. Read them, or listen.
        </p>

        {soFramework && (
          <Link
            href={`/reference/${soFramework.slug}`}
            className="group mt-10 block rounded-lg border border-rule bg-panel/60 px-5 py-5 transition-colors hover:border-move sm:px-6"
          >
            <p className="font-mono text-[0.6875rem] uppercase tracking-wider text-muted">
              Start here, the method
            </p>
            <p className="mt-1 font-display text-xl font-semibold tracking-tight text-ink group-hover:text-move">
              {soFramework.title}
            </p>
            <p className="mt-1.5 font-body text-[0.9375rem] leading-relaxed text-muted">
              {soFramework.intro}
            </p>
          </Link>
        )}

        <div className="mt-12">
          <p className="mb-3 font-mono text-xs uppercase tracking-wider text-muted">
            Browse by type, {questions.length} answers
          </p>
          <ArchetypeNav current="all" counts={counts} />
        </div>
      </div>

      {/* Grouped feed. */}
      <LandingSections sections={sections} />

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: 'Product Interview QnA',
            url: 'https://interview.vishalbuilds.com',
            description:
              'A library of fully-worked product and strategy interview answers.',
          }),
        }}
      />
    </main>
  )
}
