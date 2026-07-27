import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import {
  ARCHETYPE_LABELS,
  getAdjacentQuestions,
  getQuestionBySlug,
  getQuestionsBySlugs,
  questions,
} from '@/data/questions'
import { getReferenceBySlug } from '@/data/reference'
import { sectionSpeech } from '@/lib/text'
import { AnswerReader } from '@/components/AnswerReader'
import { PrevNext } from '@/components/PrevNext'
import { ReadingProgress } from '@/components/ReadingProgress'
import { RelatedQuestions } from '@/components/RelatedQuestions'
import {
  DifficultyBadge,
  FrameworkBadge,
  VerticalBadge,
} from '@/components/Badges'

interface Params {
  archetype: string
  slug: string
}

export function generateStaticParams() {
  return questions.map((q) => ({ archetype: q.archetype, slug: q.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>
}): Promise<Metadata> {
  const { archetype, slug } = await params
  const q = getQuestionBySlug(archetype, slug)
  if (!q) return {}

  const label = ARCHETYPE_LABELS[q.archetype]
  const description = `A fully-worked ${label.toLowerCase()} interview answer: ${q.prompt}`
  const url = `/${q.archetype}/${q.slug}`

  return {
    title: q.prompt,
    description,
    alternates: { canonical: url },
    openGraph: {
      type: 'article',
      title: `${q.prompt} · Product Interview Q&A`,
      description,
      url,
    },
  }
}

export default async function AnswerPage({
  params,
}: {
  params: Promise<Params>
}) {
  const { archetype, slug } = await params
  const q = getQuestionBySlug(archetype, slug)
  if (!q) notFound()

  const { prev, next } = getAdjacentQuestions(archetype, slug)

  const refGuide = q.referenceSlug ? getReferenceBySlug(q.referenceSlug) : undefined
  const referenceLink = refGuide
    ? { slug: refGuide.slug, title: refGuide.title }
    : undefined

  const related = q.relatedSlugs ? getQuestionsBySlugs(q.relatedSlugs) : []

  // QAPage JSON-LD: full answer as the accepted answer (snippets, not stages).
  const answerText = q.answer.map((s) => sectionSpeech(s)).join(' ')
  const base = 'https://interview.vishalbuilds.com'
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'QAPage',
    mainEntity: {
      '@type': 'Question',
      name: q.prompt,
      text: q.prompt,
      answerCount: 1,
      acceptedAnswer: {
        '@type': 'Answer',
        text: answerText,
      },
    },
  }
  const breadcrumbs = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Product Interview Q&A', item: base },
      {
        '@type': 'ListItem',
        position: 2,
        name: ARCHETYPE_LABELS[q.archetype],
        item: `${base}/${q.archetype}`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: q.prompt,
        item: `${base}/${q.archetype}/${q.slug}`,
      },
    ],
  }

  return (
    <>
      <ReadingProgress />
      <main className="mx-auto max-w-[70rem] px-6 py-16 sm:py-24">
      <div className="lg:max-w-[46rem]">
        <nav className="mb-10 font-mono text-xs uppercase tracking-wider text-muted">
          <Link href="/" className="hover:text-ink">
            Product Interview Q&A
          </Link>
          <span aria-hidden className="px-2 text-rule">
            /
          </span>
          <Link href={`/${q.archetype}`} className="text-ink hover:text-move">
            {ARCHETYPE_LABELS[q.archetype]}
          </Link>
        </nav>

        <div className="mb-8 flex flex-wrap items-center gap-x-4 gap-y-2">
          <VerticalBadge vertical={q.vertical} />
          <DifficultyBadge difficulty={q.difficulty} />
          {q.framework && <FrameworkBadge framework={q.framework} />}
        </div>
      </div>

      <AnswerReader question={q} referenceLink={referenceLink} />

      <div className="lg:max-w-[46rem]">
        <RelatedQuestions items={related} />

        <PrevNext
          prev={
            prev
              ? { archetype: prev.archetype, slug: prev.slug, prompt: prev.prompt }
              : undefined
          }
          next={
            next
              ? { archetype: next.archetype, slug: next.slug, prompt: next.prompt }
              : undefined
          }
        />
      </div>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbs) }}
      />
      </main>
    </>
  )
}
