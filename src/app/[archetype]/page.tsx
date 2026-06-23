import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Archetype } from '@/data/types'
import {
  ARCHETYPE_BLURBS,
  ARCHETYPE_LABELS,
  getOrderedPopulatedArchetypes,
  getQuestionsByArchetype,
} from '@/data/questions'
import { ArchetypeNav } from '@/components/ArchetypeNav'
import { QuestionCard } from '@/components/QuestionCard'

// Only the populated archetypes resolve; anything else 404s (and /reference,
// a static route, takes precedence over this dynamic segment).
export const dynamicParams = false

interface Params {
  archetype: string
}

export function generateStaticParams() {
  return getOrderedPopulatedArchetypes().map((archetype) => ({ archetype }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { archetype } = await params
  if (!getOrderedPopulatedArchetypes().includes(archetype as Archetype)) {
    return {}
  }
  const label = ARCHETYPE_LABELS[archetype as Archetype]
  const description = ARCHETYPE_BLURBS[archetype as Archetype]
  const url = `/${archetype}`
  return {
    title: `${label} interview questions`,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'website',
      title: `${label} interview questions · Product Interview QnA`,
      description,
      url,
    },
  }
}

export default async function ArchetypeListPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { archetype } = await params
  const all = getOrderedPopulatedArchetypes()
  if (!all.includes(archetype as Archetype)) notFound()

  const a = archetype as Archetype
  const items = getQuestionsByArchetype(a)
  const counts = Object.fromEntries(
    all.map((x) => [x, getQuestionsByArchetype(x).length]),
  ) as Record<Archetype, number>

  return (
    <main className="mx-auto max-w-[46rem] px-6 py-16 sm:py-24">
      <nav className="mb-10 font-mono text-xs uppercase tracking-wider text-muted">
        <Link href="/" className="hover:text-ink">
          Product Interview QnA
        </Link>
        <span aria-hidden className="px-2 text-rule">
          /
        </span>
        <span className="text-ink">{ARCHETYPE_LABELS[a]}</span>
      </nav>

      <h1 className="font-display text-[2rem] font-semibold leading-tight tracking-tight text-ink sm:text-[2.5rem]">
        {ARCHETYPE_LABELS[a]}
      </h1>
      <p className="mt-3 prose-answer text-muted">{ARCHETYPE_BLURBS[a]}</p>

      <div className="mt-10">
        <ArchetypeNav current={a} counts={counts} />
      </div>

      <div className="mt-12">
        {items.map((q) => (
          <QuestionCard key={q.slug} question={q} />
        ))}
      </div>
    </main>
  )
}
